import axios from 'axios';
import * as dns from 'dns';
import { promisify } from 'util';

// List of legitimate trusted domains
const trustedDomains = [
  'google.com',
  'facebook.com',
  'microsoft.com',
  'apple.com',
  'amazon.com',
  'netflix.com',
  'paypal.com',
  'ebay.com',
  'linkedin.com',
  'twitter.com',
  'instagram.com',
  'youtube.com',
  'github.com',
  'reddit.com',
  'wikipedia.org'
];

// List of known malware and phishing URL patterns
const maliciousPatterns = [
  /paypal.*confirm/i,
  /amazon.*verify/i,
  /apple.*login/i,
  /microsoft.*password/i,
  /netflix.*account/i,
  /bank.*login/i,
  /verify.*account/i,
  /secure.*login/i,
  /update.*payment/i,
  /wallet.*restore/i
];

// Define result interface
interface BlacklistCheckResult {
  isBlacklisted: boolean;
  blacklistedOn: string[];
  hasMalware: boolean;
  hasPhishing: boolean;
  suspiciousContent: boolean;
  score: number;
}

// Promisify DNS functions
const dnsLookup = promisify(dns.lookup);
const dnsReverse = promisify(dns.reverse);

// Function to check if domain has DNS records (basic existence check)
async function domainExists(domain: string): Promise<boolean> {
  try {
    await dnsLookup(domain);
    return true;
  } catch (error) {
    return false;
  }
}

// Function to check domain with VirusTotal API
async function checkVirusTotal(domain: string): Promise<BlacklistCheckResult | null> {
  const apiKey = process.env.VIRUSTOTAL_API_KEY;
  if (!apiKey) {
    console.log("No VirusTotal API key found");
    return null;
  }

  try {
    // Format domain properly
    const normalizedDomain = domain.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');

    // Make API request to VirusTotal
    const response = await axios.get(`https://www.virustotal.com/api/v3/domains/${normalizedDomain}`, {
      headers: {
        "x-apikey": apiKey
      }
    });

    // Process the response
    if (response.data && response.data.data) {
      const data = response.data.data;
      const attributes = data.attributes;
      
      // Initialize result
      const result: BlacklistCheckResult = {
        isBlacklisted: false,
        blacklistedOn: [],
        hasMalware: false,
        hasPhishing: false,
        suspiciousContent: false,
        score: 100
      };

      // Process last analysis stats
      if (attributes.last_analysis_stats) {
        const stats = attributes.last_analysis_stats;
        const totalEngines = stats.harmless + stats.malicious + stats.suspicious + stats.undetected;
        const maliciousCount = stats.malicious + stats.suspicious;
        
        // Calculate score based on detection ratio
        if (maliciousCount > 0) {
          result.isBlacklisted = true;
          // Calculate a score where 0 = all engines detected it as malicious, 100 = no engines detected it
          result.score = Math.max(0, 100 - Math.round((maliciousCount / totalEngines) * 100));
          
          // Get the security vendors that marked it as malicious
          if (attributes.last_analysis_results) {
            Object.entries(attributes.last_analysis_results).forEach(([vendor, vendorResult]: [string, any]) => {
              if (vendorResult.category === 'malicious' || vendorResult.category === 'suspicious') {
                result.blacklistedOn.push(vendor);
              }
            });
          }
        }
      }

      // Check for categories
      if (attributes.categories) {
        const categories = Object.values(attributes.categories) as string[];
        result.hasMalware = categories.some(cat => 
          cat.includes('malware') || cat.includes('malicious'));
        result.hasPhishing = categories.some(cat => 
          cat.includes('phishing') || cat.includes('scam'));
        
        // Any security category suggests suspicious content
        result.suspiciousContent = categories.some(cat => 
          cat.includes('malware') || cat.includes('phishing') || 
          cat.includes('scam') || cat.includes('suspicious') || 
          cat.includes('malicious'));
      }

      return result;
    }
    
    return null;
  } catch (error) {
    console.error("Error checking VirusTotal:", error);
    return null;
  }
}

// Main function to check blacklisting 
export async function checkBlacklist(domain: string): Promise<BlacklistCheckResult> {
  // Normalize domain to just the domain without protocol or www
  const normalizedDomain = domain.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
  
  // Check if domain exists
  const exists = await domainExists(normalizedDomain);
  
  // Check if it's a known trusted domain
  const isTrustedDomain = trustedDomains.some(trusted => 
    normalizedDomain === trusted || normalizedDomain.endsWith('.' + trusted)
  );
  
  // If it's a trusted domain, return clean result
  if (isTrustedDomain) {
    return {
      isBlacklisted: false,
      blacklistedOn: [],
      hasMalware: false,
      hasPhishing: false,
      suspiciousContent: false,
      score: 100
    };
  }
  
  // If domain doesn't exist, it's somewhat suspicious
  if (!exists) {
    return {
      isBlacklisted: false,
      blacklistedOn: [],
      hasMalware: false,
      hasPhishing: false,
      suspiciousContent: true,
      score: 50  // Non-existent domains get a medium score
    };
  }
  
  // Try VirusTotal first
  const vtResult = await checkVirusTotal(normalizedDomain);
  if (vtResult) {
    console.log(`VirusTotal results for ${normalizedDomain}:`, vtResult);
    return vtResult;
  }
  
  // Fallback to pattern-based detection
  console.log(`Using pattern-based detection for ${normalizedDomain}`);
  
  // Check for malicious patterns in the domain
  const hasMaliciousPattern = maliciousPatterns.some(pattern => pattern.test(normalizedDomain));
  
  // Check if domain appears to be impersonating a trusted domain through typosquatting
  const possibleTyposquatting = trustedDomains.some(trusted => {
    // Simple Levenshtein distance check (1-2 characters different)
    const domainWithoutTLD = normalizedDomain.split('.')[0];
    const trustedWithoutTLD = trusted.split('.')[0];
    
    if (Math.abs(domainWithoutTLD.length - trustedWithoutTLD.length) > 2) return false;
    
    let diff = 0;
    for (let i = 0; i < Math.min(domainWithoutTLD.length, trustedWithoutTLD.length); i++) {
      if (domainWithoutTLD[i] !== trustedWithoutTLD[i]) diff++;
    }
    
    diff += Math.abs(domainWithoutTLD.length - trustedWithoutTLD.length);
    return diff <= 2 && diff > 0; // 1-2 characters different
  });
  
  // Check for suspicious TLDs
  const hasSuspiciousTLD = normalizedDomain.endsWith('.xyz') || 
                          normalizedDomain.endsWith('.info') || 
                          normalizedDomain.endsWith('.top') || 
                          normalizedDomain.endsWith('.tk');
  
  // Determine blacklist flags based on patterns, not random
  const isBlacklisted = hasMaliciousPattern || possibleTyposquatting;
  
  // Determine blacklists based on specific patterns
  const blacklistedOn: string[] = [];
  if (hasMaliciousPattern) {
    blacklistedOn.push('Pattern Analysis');
  }
  if (possibleTyposquatting) {
    blacklistedOn.push('Typosquatting Detection');
  }
  if (hasSuspiciousTLD) {
    blacklistedOn.push('Suspicious TLD');
  }
  
  // Determine threat types based on patterns
  const suspiciousContent = isBlacklisted || hasMaliciousPattern || possibleTyposquatting || hasSuspiciousTLD;
  const hasMalware = hasMaliciousPattern && normalizedDomain.includes('download');
  const hasPhishing = hasMaliciousPattern || possibleTyposquatting;
  
  // Calculate a score (0-100, higher is better)
  let score = 100;
  if (isBlacklisted) score -= 50;
  if (hasMalware) score -= 20;
  if (hasPhishing) score -= 20;
  if (suspiciousContent) score -= 10;
  if (possibleTyposquatting) score -= 15;
  if (hasSuspiciousTLD) score -= 5;
  
  return {
    isBlacklisted,
    blacklistedOn,
    hasMalware,
    hasPhishing,
    suspiciousContent,
    score: Math.max(0, score)
  };
}
