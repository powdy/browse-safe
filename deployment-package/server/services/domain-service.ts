import dns from 'dns';
import { promisify } from 'util';
import { exec } from 'child_process';

// Promisify functions
const resolveMx = promisify(dns.resolveMx);
const resolveTxt = promisify(dns.resolveTxt);
const resolveNs = promisify(dns.resolveNs);
const resolve4 = promisify(dns.resolve4);
const reverse = promisify(dns.reverse);
const execAsync = promisify(exec);

interface DomainInfo {
  ipAddresses: string[];
  nameservers: string[];
  mxRecords: dns.MxRecord[];
  txtRecords: string[][];
  reverseDns: Record<string, string[]>;
  hasDNSSEC: boolean;
}

export async function getDomainInfo(domain: string): Promise<DomainInfo> {
  // Remove protocol and www if present
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').trim();
  
  try {
    // First check if domain exists by trying to resolve IP addresses
    let ipAddresses: string[] = [];
    try {
      ipAddresses = await resolve4(cleanDomain);
    } catch (error) {
      console.log(`Could not resolve IP for domain ${cleanDomain}: ${error}`);
      ipAddresses = [];
    }
    
    // If we can't resolve any IPs, the domain might not exist
    if (ipAddresses.length === 0) {
      console.log(`No IP addresses found for domain: ${cleanDomain}`);
    }
    
    // Try to get other DNS records even if IP resolution failed
    
    // Get nameservers
    let nameservers = [];
    try {
      nameservers = await resolveNs(cleanDomain);
    } catch (err) {
      if (err.code === 'ENOTFOUND' || err.code === 'ENODATA') {
        console.log(`Domain likely doesn't exist (${err.code}): ${cleanDomain}`);
      } else {
        console.log(`Could not resolve nameservers for ${cleanDomain}: ${err}`);
      }
    }
    
    // Get MX records
    let mxRecords = [];
    try {
      mxRecords = await resolveMx(cleanDomain);
    } catch (err) {
      if (err.code === 'ENOTFOUND' || err.code === 'ENODATA') {
        console.log(`Domain likely doesn't exist (${err.code}) - MX check: ${cleanDomain}`);
      } else {
        console.log(`Could not resolve MX records for ${cleanDomain}: ${err}`);
      }
    }
    
    // Get TXT records
    let txtRecords = [];
    try {
      txtRecords = await resolveTxt(cleanDomain);
    } catch (err) {
      if (err.code === 'ENOTFOUND' || err.code === 'ENODATA') {
        console.log(`Domain likely doesn't exist (${err.code}) - TXT check: ${cleanDomain}`);
      } else {
        console.log(`Could not resolve TXT records for ${cleanDomain}: ${err}`);
      }
    }
    
    // Get reverse DNS for each IP
    const reverseDns: Record<string, string[]> = {};
    for (const ip of ipAddresses) {
      try {
        reverseDns[ip] = await reverse(ip);
      } catch (error) {
        console.log(`Could not resolve reverse DNS for IP ${ip}: ${error}`);
        reverseDns[ip] = [];
      }
    }
    
    // Check for DNSSEC (simplified check based on TXT records)
    // A more accurate check would require DNSSEC-specific queries
    const hasDNSSEC = txtRecords.some(record => 
      record.some(txt => txt.includes('DNSSEC') || txt.includes('dnssec'))
    );
    
    return {
      ipAddresses,
      nameservers,
      mxRecords,
      txtRecords,
      reverseDns,
      hasDNSSEC
    };
  } catch (error) {
    console.error(`Error getting domain info for ${cleanDomain}:`, error);
    
    // Return empty data instead of throwing
    return {
      ipAddresses: [],
      nameservers: [],
      mxRecords: [],
      txtRecords: [],
      reverseDns: {},
      hasDNSSEC: false
    };
  }
}

// Estimate domain reputation based on various factors
export function estimateDomainReputation(domainInfo: DomainInfo): number {
  let score = 50; // Start with a neutral score
  
  // Nameservers - established domains typically have their own nameservers
  if (domainInfo.nameservers.length > 0) {
    score += 5;
    
    // Check if nameservers match the domain
    if (domainInfo.nameservers.length > 0) {
      const domainParts = domainInfo.nameservers[0].split('.');
      const rootDomain = domainParts.slice(-2).join('.');
      if (domainInfo.nameservers.some(ns => ns.includes(rootDomain))) {
        score += 5; // Custom nameservers matching the domain is a good sign
      }
    }
  }
  
  // MX records - legitimate domains have proper email setup
  if (domainInfo.mxRecords.length > 0) {
    score += 5;
  }
  
  // DNSSEC - security-conscious domains implement DNSSEC
  if (domainInfo.hasDNSSEC) {
    score += 10;
  }
  
  // Multiple IP addresses can indicate a more established site
  if (domainInfo.ipAddresses.length > 1) {
    score += 5;
  }
  
  // TXT records often indicate legitimate domain configuration
  if (domainInfo.txtRecords.length > 0) {
    score += 5;
    
    // Check for SPF, DKIM, DMARC which are good email security practices
    if (domainInfo.txtRecords.some(record => record.some(txt => 
      txt.includes('v=spf1') || 
      txt.includes('DKIM') || 
      txt.includes('v=DMARC')
    ))) {
      score += 5;
    }
  }
  
  return Math.min(100, Math.max(0, score)); // Ensure score is between 0-100
}

export function checkSuspiciousPatterns(domain: string): string[] {
  const patterns: string[] = [];
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').toLowerCase();
  
  // Check for excessive hyphens (common in phishing domains)
  if ((cleanDomain.match(/-/g) || []).length > 2) {
    patterns.push('Excessive hyphens in domain name');
  }
  
  // Check for number substitution (e.g., amaz0n instead of amazon)
  if (/[a-z]+[0-9]+[a-z]+/.test(cleanDomain)) {
    patterns.push('Number substitution in brand name');
  }
  
  // Check for popular brand names with additions
  const popularBrands = ['paypal', 'amazon', 'apple', 'microsoft', 'google', 'facebook', 'netflix', 'ebay'];
  for (const brand of popularBrands) {
    if (cleanDomain.includes(brand) && !cleanDomain.startsWith(brand)) {
      patterns.push(`Possible brand impersonation (${brand})`);
    }
  }
  
  // Check for suspicious TLDs often used in phishing
  const suspiciousTLDs = ['.xyz', '.top', '.club', '.online', '.site'];
  if (suspiciousTLDs.some(tld => cleanDomain.endsWith(tld))) {
    patterns.push('Domain uses a TLD commonly associated with malicious sites');
  }
  
  // Check for misspellings of popular domains (simple check)
  const brandMisspellings = [
    { brand: 'paypal', misspellings: ['paypa1l', 'paypol', 'paypayl'] },
    { brand: 'amazon', misspellings: ['amazn', 'amazom', 'amason'] },
    { brand: 'microsoft', misspellings: ['microsft', 'micosoft', 'microsofe'] }
  ];
  
  for (const { brand, misspellings } of brandMisspellings) {
    if (misspellings.some(misspelling => cleanDomain.includes(misspelling))) {
      patterns.push(`Possible typosquatting of ${brand}`);
    }
  }
  
  return patterns;
}

export async function estimateSSLSecurity(domain: string): Promise<boolean> {
  // This uses OpenSSL to check if the domain has a valid SSL certificate
  try {
    // Clean the domain
    const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
    
    // Try to get certificate information using OpenSSL
    const command = `echo | openssl s_client -connect ${cleanDomain}:443 -servername ${cleanDomain} 2>/dev/null | openssl x509 -noout -dates`;
    
    try {
      const { stdout } = await execAsync(command, { timeout: 5000 });
      
      // If we get output, then the SSL certificate exists
      if (stdout && stdout.includes('notBefore') && stdout.includes('notAfter')) {
        // Get expiration date
        const expiryMatch = stdout.match(/notAfter=(.+)/);
        if (expiryMatch) {
          const expiryDateStr = expiryMatch[1].trim();
          const expiryDate = new Date(expiryDateStr);
          
          // Check if certificate is still valid (not expired)
          const now = new Date();
          return expiryDate > now;
        }
      }
      
      return false;
    } catch (error) {
      console.error(`SSL check error for ${cleanDomain}:`, error);
      return false;
    }
  } catch (error) {
    console.error(`Error in SSL security check:`, error);
    return false;
  }
}