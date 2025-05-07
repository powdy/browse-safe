import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { getWhoisData, calculateWhoisReputation } from "./services/whois-service";
import { getDomainInfo, estimateDomainReputation, checkSuspiciousPatterns, estimateSSLSecurity } from "./services/domain-service";
import axios from "axios";
import { getIpFromDomain, getIpInfo, calculateIpReputation } from "./services/ip-service";
import { checkBlacklist } from "./services/blacklist-service";

// URL validation schema
const urlSchema = z.object({
  url: z.string().url().or(z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/))
});

// Function to check for security headers
async function checkSecurityHeaders(domain: string): Promise<boolean> {
  try {
    // Try to make a request to the domain
    const url = `https://${domain}`;
    const response = await axios.get(url, { 
      timeout: 5000,
      validateStatus: () => true, // Don't throw on any status code
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    // Check for security headers
    const headers = response.headers;
    const securityHeaders = [
      'strict-transport-security',
      'content-security-policy',
      'x-content-type-options',
      'x-frame-options',
      'x-xss-protection'
    ];
    
    // Count how many security headers are present
    const securityHeaderCount = securityHeaders.filter(header => 
      headers[header] !== undefined && headers[header] !== null
    ).length;
    
    // Return true if at least 2 security headers are present
    return securityHeaderCount >= 2;
  } catch (error) {
    console.error(`Error checking security headers for ${domain}:`, error);
    return false;
  }
}

// Report schema
const reportSchema = z.object({
  url: z.string().url().or(z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/)),
  reason: z.string().min(5).max(200),
  details: z.string().max(1000).optional(),
  reportedBy: z.string().optional()
});

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Endpoint to get recent scans
  app.get("/api/scans/recent", async (_req: Request, res: Response) => {
    try {
      const recentScans = await storage.getRecentScans(10);
      res.json(recentScans);
    } catch (error) {
      console.error("Error fetching recent scans:", error);
      res.status(500).json({ message: "Failed to fetch recent scans" });
    }
  });

  // Endpoint to get a specific scan by URL
  app.get("/api/scans", async (req: Request, res: Response) => {
    try {
      const { url } = req.query;
      
      if (!url || typeof url !== "string") {
        return res.status(400).json({ message: "URL parameter is required" });
      }
      
      // Try to validate the URL
      try {
        urlSchema.parse({ url });
      } catch (validationError) {
        return res.status(400).json({ message: "Invalid URL format" });
      }
      
      // Check if we already have a scan for this URL
      const existingScan = await storage.getScanByUrl(url);
      
      if (existingScan) {
        // If scan is less than 24 hours old, return it
        const lastScanned = new Date(existingScan.lastScanned);
        const now = new Date();
        const hoursSinceLastScan = (now.getTime() - lastScanned.getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceLastScan < 24) {
          return res.json(existingScan);
        }
      }
      
      // We need to create a new scan or update an existing one
      const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');
      
      // 1. Get WHOIS data
      const whoisData = await getWhoisData(cleanUrl);
      const whoisScore = calculateWhoisReputation(whoisData);
      
      // 2. Get domain info
      const domainInfo = await getDomainInfo(cleanUrl);
      const domainScore = estimateDomainReputation(domainInfo);
      const suspiciousPatterns = checkSuspiciousPatterns(cleanUrl);
      const hasValidSSL = await estimateSSLSecurity(cleanUrl);
      
      // 3. Get IP info
      const ip = await getIpFromDomain(cleanUrl);
      let ipInfo = null;
      let ipScore = 50; // Default score if IP can't be resolved
      
      if (ip) {
        ipInfo = await getIpInfo(ip);
        ipScore = calculateIpReputation(ipInfo);
      }
      
      // 4. Check blacklists using VirusTotal API if available
      const blacklistResult = await checkBlacklist(cleanUrl);
      
      // 5. Calculate overall trust score
      // Weight each component based on importance
      const trustScore = Math.round(
        whoisScore * 0.3 +
        domainScore * 0.2 +
        ipScore * 0.2 +
        blacklistResult.score * 0.3
      );
      
      // Determine status based on trust score
      let status = "suspicious";
      if (trustScore >= 80) {
        status = "safe";
      } else if (trustScore < 40) {
        status = "dangerous";
      }
      
      // Create scan object  
      const scanData = {
        url: cleanUrl,
        trustScore,
        domainAge: whoisData.domainAge || "Unknown",
        registrationDate: whoisData.creationDate || "Unknown",
        expirationDate: whoisData.expirationDate || "Unknown",
        registrar: whoisData.registrar || "Unknown",
        registrantCountry: whoisData.registrantCountry || "Unknown",
        ipAddress: ip || "Unknown",
        ipLocation: ipInfo?.country || "Unknown",
        nameServers: whoisData.nameServers?.join(", ") || domainInfo.nameservers.join(", ") || "Unknown",
        hasValidSSL,
        hasDNSSEC: domainInfo.hasDNSSEC,
        hasSecurityHeaders: await checkSecurityHeaders(cleanUrl),
        hasMalware: blacklistResult.hasMalware,
        hasPhishing: blacklistResult.hasPhishing,
        blacklistStatus: blacklistResult.isBlacklisted 
          ? `Listed on ${blacklistResult.blacklistedOn.length} blacklist${blacklistResult.blacklistedOn.length !== 1 ? 's' : ''}` 
          : "Not blacklisted",
        suspiciousPatterns: suspiciousPatterns.length > 0 ? suspiciousPatterns.join(", ") : "None",
        userReports: 0, // Will be populated from actual reports
        relatedSites: 0, // Will be populated from actual related sites
        status,
        lastScanned: new Date(),
        details: JSON.stringify({
          whoisData,
          domainInfo: {
            ...domainInfo,
            nameservers: domainInfo.nameservers
          },
          ipInfo,
          blacklistResult
        })
      };
      
      // Save or update the scan
      let scan;
      if (existingScan) {
        scan = await storage.updateScan(existingScan.id, scanData);
      } else {
        scan = await storage.createScan(scanData);
      }
      
      res.json(scan);
    } catch (error) {
      console.error("Error scanning website:", error);
      res.status(500).json({ message: "Failed to scan website" });
    }
  });

  // Endpoint to report a website
  app.post("/api/reports", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validationResult = reportSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid report data", 
          errors: validationResult.error.errors 
        });
      }
      
      const reportData = validationResult.data;
      
      // Create the report
      const report = await storage.createReport({
        ...reportData,
        reportedAt: new Date(),
        status: "pending"
      });
      
      res.status(201).json(report);
    } catch (error) {
      console.error("Error creating report:", error);
      res.status(500).json({ message: "Failed to create report" });
    }
  });

  return httpServer;
}
