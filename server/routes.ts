import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { getWhoisData, calculateWhoisReputation } from "./services/whois-service";
import { getDomainInfo, estimateDomainReputation, checkSuspiciousPatterns, estimateSSLSecurity } from "./services/domain-service";
import axios from "axios";
import { getIpFromDomain, getIpInfo, calculateIpReputation } from "./services/ip-service";
import { checkBlacklist } from "./services/blacklist-service";
import { sendReportEmail } from "./services/email-service";

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
  
  // Email service is initialized in server/index.ts
  
  // Helper function to safely format a date string
  function formatDateSafely(dateString: string | undefined) {
    if (!dateString) return "Unknown";
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) return "Unknown";
      return date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch (e) {
      console.error("Date formatting error:", e);
      return "Unknown";
    }
  }

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
      
      // Clean the URL for scanning
      const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '').trim();
      
      // Check if we already have a scan for this URL and whether to force a new scan
      const existingScan = await storage.getScanByUrl(cleanUrl);
      const forceNewScan = req.query.force === 'true';
      
      if (existingScan && !forceNewScan) {
        // If scan is less than 1 hour old, return it (reduced from 24 hours for more frequent updates)
        const lastScanned = new Date(existingScan.lastScanned);
        const now = new Date();
        const hoursSinceLastScan = (now.getTime() - lastScanned.getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceLastScan < 1) {
          return res.json(existingScan);
        }
      }
      
      try {
        // 1. Get domain info - checking if domain exists
        const domainInfo = await getDomainInfo(cleanUrl);
        
        // If we couldn't resolve any IPs, the domain likely doesn't exist
        // We'll still proceed with analysis but with a lower score
        const domainExists = domainInfo.ipAddresses.length > 0;
        if (!domainExists) {
          console.log(`Domain likely doesn't exist: ${cleanUrl} (no IP addresses found)`);
        }
        
        const domainScore = estimateDomainReputation(domainInfo);
        const suspiciousPatterns = checkSuspiciousPatterns(cleanUrl);
        
        // 2. Get WHOIS data
        let whoisData;
        try {
          console.log(`Fetching WHOIS data for ${cleanUrl}`);
          whoisData = await getWhoisData(cleanUrl);
          console.log(`WHOIS data received:`, JSON.stringify(whoisData, null, 2));
        } catch (whoisError) {
          console.error(`WHOIS error: ${whoisError}`);
          whoisData = { domainName: cleanUrl, error: "Could not retrieve WHOIS data" };
        }
        const whoisScore = calculateWhoisReputation(whoisData);
        
        // 3. Check SSL
        let hasValidSSL = false;
        try {
          hasValidSSL = await estimateSSLSecurity(cleanUrl);
        } catch (sslError) {
          console.error(`SSL verification error: ${sslError}`);
        }
        
        // 4. Get IP info
        const ip = await getIpFromDomain(cleanUrl);
        let ipInfo = null;
        let ipScore = 50; // Default score if IP can't be resolved
        
        if (ip) {
          try {
            ipInfo = await getIpInfo(ip);
            ipScore = calculateIpReputation(ipInfo);
          } catch (ipError) {
            console.error(`IP info error: ${ipError}`);
          }
        }
        
        // 5. Check blacklists using VirusTotal API if available
        let blacklistResult;
        try {
          blacklistResult = await checkBlacklist(cleanUrl);
        } catch (blacklistError) {
          console.error(`Blacklist check error: ${blacklistError}`);
          blacklistResult = {
            isBlacklisted: false,
            blacklistedOn: [],
            hasMalware: false,
            hasPhishing: false,
            suspiciousContent: false,
            score: 50
          };
        }
        
        // 6. Check security headers
        let hasSecurityHeaders = false;
        try {
          hasSecurityHeaders = await checkSecurityHeaders(cleanUrl);
        } catch (headersError) {
          console.error(`Security headers check error: ${headersError}`);
        }
        
        // 7. Calculate overall trust score
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
          // Use our helper function to safely format dates
          registrationDate: formatDateSafely(whoisData.creationDate),
          expirationDate: formatDateSafely(whoisData.expirationDate),
          registrar: whoisData.registrar || "Unknown",
          registrantCountry: whoisData.registrantCountry || "Unknown",
          ipAddress: ip || "Unknown",
          ipLocation: ipInfo?.country || "Unknown",
          nameServers: whoisData.nameServers?.join(", ") || domainInfo.nameservers.join(", ") || "Unknown",
          hasValidSSL,
          hasDNSSEC: domainInfo.hasDNSSEC,
          hasSecurityHeaders,
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
      } catch (processingError) {
        console.error(`Error processing website scan for ${cleanUrl}:`, processingError);
        res.status(500).json({ 
          message: "Failed to analyze website. This may be due to the domain not being accessible or valid." 
        });
      }
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
      
      // Send email notification
      try {
        await sendReportEmail(reportData);
        console.log(`Email notification sent for reported website: ${reportData.url}`);
      } catch (emailError) {
        // Don't fail the API response if sending email fails
        console.error("Failed to send email notification:", emailError);
      }
      
      res.status(201).json(report);
    } catch (error) {
      console.error("Error creating report:", error);
      res.status(500).json({ message: "Failed to create report" });
    }
  });

  return httpServer;
}
