import dns from 'dns';
import { promisify } from 'util';
import axios from 'axios';

const resolve4 = promisify(dns.resolve4);
const reverse = promisify(dns.reverse);

interface IpInfo {
  ip: string;
  hostname: string[];
  country: string;
  isp: string;
  isProxy: boolean;
  isTor: boolean;
  isHosting: boolean;
  blacklisted: boolean;
  abuseReports: number;
}

// List of known malicious or suspicious IP ranges (simplified for demo)
const suspiciousIpRanges = [
  { start: '176.119.0.0', end: '176.119.255.255' },  // Example range 1
  { start: '185.220.0.0', end: '185.220.255.255' },  // Example range 2 (TOR exit nodes)
  { start: '192.42.113.0', end: '192.42.116.255' },  // Example range 3
  { start: '94.130.0.0', end: '94.130.255.255' }     // Example range 4
];

// List of known hosting/VPS providers
const hostingProviders = [
  'amazon', 'aws', 'microsoft', 'azure', 'google cloud', 'gcp',
  'digitalocean', 'linode', 'vultr', 'ovh', 'hetzner', 'cloudflare',
  'leaseweb', 'godaddy', 'hostgator', 'bluehost', 'dreamhost'
];

export async function getIpFromDomain(domain: string): Promise<string | null> {
  try {
    // Remove protocol and www if present
    const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
    const ips = await resolve4(cleanDomain);
    return ips.length > 0 ? ips[0] : null;
  } catch (error) {
    console.error(`Error resolving IP for ${domain}:`, error);
    return null;
  }
}

export async function getHostnameFromIp(ip: string): Promise<string[]> {
  try {
    return await reverse(ip);
  } catch (error) {
    console.error(`Error getting hostname for ${ip}:`, error);
    return [];
  }
}

// Convert IP string to number for range comparison
function ipToLong(ip: string): number {
  const parts = ip.split('.');
  return (
    (parseInt(parts[0], 10) << 24) +
    (parseInt(parts[1], 10) << 16) +
    (parseInt(parts[2], 10) << 8) +
    parseInt(parts[3], 10)
  );
}

// Check if IP is within a suspicious range
function isInSuspiciousRange(ip: string): boolean {
  const ipLong = ipToLong(ip);
  return suspiciousIpRanges.some(range => {
    const startLong = ipToLong(range.start);
    const endLong = ipToLong(range.end);
    return ipLong >= startLong && ipLong <= endLong;
  });
}

// Get IP country and ISP information (simulated)
function getIpGeoInfo(ip: string): { country: string; isp: string } {
  // In a real implementation, this would query a database or API
  // For this demo, we'll simulate based on the IP
  const firstOctet = parseInt(ip.split('.')[0], 10);
  
  let country: string;
  let isp: string;
  
  // Very rough simulation based on IP range
  if (firstOctet < 100) {
    country = 'United States';
    if (firstOctet < 50) {
      isp = 'Verizon Communications';
    } else {
      isp = 'Comcast Cable Communications';
    }
  } else if (firstOctet < 150) {
    country = 'United Kingdom';
    isp = 'British Telecom';
  } else if (firstOctet < 180) {
    country = 'Germany';
    isp = 'Deutsche Telekom';
  } else if (firstOctet < 200) {
    country = 'Russia';
    isp = 'Rostelecom';
  } else {
    country = 'China';
    isp = 'China Telecom';
  }
  
  // Override with known hosting providers based on IP patterns
  if (ip.startsWith('34.') || ip.startsWith('35.')) {
    isp = 'Google Cloud Platform';
  } else if (ip.startsWith('52.') || ip.startsWith('54.') || ip.startsWith('3.')) {
    isp = 'Amazon Web Services';
  } else if (ip.startsWith('104.')) {
    isp = 'Cloudflare';
  } else if (ip.startsWith('13.') || ip.startsWith('40.')) {
    isp = 'Microsoft Azure';
  }
  
  return { country, isp };
}

// Check if ISP is a hosting provider
function isHostingProvider(isp: string): boolean {
  return hostingProviders.some(provider => isp.toLowerCase().includes(provider));
}

// Get abuse reports from AbuseIPDB
async function getAbuseReports(ip: string): Promise<{
  reports: number;
  country: string | null;
  isp: string | null;
  isProxy: boolean;
  isTor: boolean;
  isHosting: boolean;
}> {
  const apiKey = process.env.ABUSEIPDB_API_KEY;
  if (!apiKey) {
    console.warn("AbuseIPDB API key not found, using simulated data");
    // Return simulated data if no API key
    return {
      reports: isInSuspiciousRange(ip) ? Math.floor(Math.random() * 30) + 5 : Math.floor(Math.random() * 3),
      country: null,
      isp: null,
      isProxy: isInSuspiciousRange(ip),
      isTor: isInSuspiciousRange(ip),
      isHosting: false
    };
  }

  try {
    console.log(`Checking IP ${ip} with AbuseIPDB...`);
    const response = await axios.get('https://api.abuseipdb.com/api/v2/check', {
      params: {
        ipAddress: ip,
        maxAgeInDays: 90,
        verbose: true
      },
      headers: {
        'Key': apiKey,
        'Accept': 'application/json'
      },
      timeout: 5000
    });

    if (response.data && response.data.data) {
      const data = response.data.data;
      console.log('AbuseIPDB report for IP:', ip, JSON.stringify(data, null, 2));
      
      // Extract the relevant data
      const reports = data.totalReports || 0;
      const country = data.countryCode || null;
      const isp = data.isp || null;
      const isProxy = data.usageType?.toLowerCase().includes('proxy') || 
                     data.usageType?.toLowerCase().includes('vpn') || 
                     false;
      const isTor = data.usageType?.toLowerCase().includes('tor') || false;
      const isHosting = data.usageType?.toLowerCase().includes('hosting') || 
                       data.usageType?.toLowerCase().includes('data center') || 
                       data.usageType?.toLowerCase().includes('server') || 
                       false;
      
      return { reports, country, isp, isProxy, isTor, isHosting };
    }
  } catch (error) {
    console.error('Error querying AbuseIPDB:', error);
  }
  
  // Fallback to simulated data on error
  return {
    reports: isInSuspiciousRange(ip) ? Math.floor(Math.random() * 30) + 5 : Math.floor(Math.random() * 3),
    country: null,
    isp: null,
    isProxy: isInSuspiciousRange(ip),
    isTor: isInSuspiciousRange(ip),
    isHosting: false
  };
}

export async function getIpInfo(ip: string): Promise<IpInfo> {
  try {
    const hostname = await getHostnameFromIp(ip);
    const { country, isp } = getIpGeoInfo(ip);
    const isInBadRange = isInSuspiciousRange(ip);
    const hosting = isHostingProvider(isp);
    const abuseReports = getAbuseReports(ip);
    
    return {
      ip,
      hostname,
      country,
      isp,
      isProxy: isInBadRange, // Simplified proxy detection
      isTor: isp.toLowerCase().includes('tor') || isInBadRange, // Simplified TOR detection
      isHosting: hosting,
      blacklisted: abuseReports > 10, // Consider blacklisted if many abuse reports
      abuseReports
    };
  } catch (error) {
    console.error(`Error getting IP info for ${ip}:`, error);
    throw new Error(`Failed to retrieve IP information: ${(error as Error).message}`);
  }
}

// Calculate reputation score for an IP address
export function calculateIpReputation(ipInfo: IpInfo): number {
  let score = 50; // Start with a neutral score
  
  // Blacklisted IPs are bad
  if (ipInfo.blacklisted) {
    score -= 30;
  }
  
  // TOR exit nodes are often used for malicious purposes
  if (ipInfo.isTor) {
    score -= 20;
  }
  
  // Proxies can be suspicious
  if (ipInfo.isProxy) {
    score -= 15;
  }
  
  // Hosting providers are slightly suspicious for certain sites, but normal for others
  if (ipInfo.isHosting) {
    score -= 5; // Small penalty as many legitimate sites use hosting providers
  }
  
  // Abuse reports are bad
  if (ipInfo.abuseReports > 0) {
    score -= Math.min(25, ipInfo.abuseReports); // Cap the penalty at 25
  }
  
  // Certain countries might be associated with more cyber threats
  // This is a simplification and could be more nuanced
  const higherRiskCountries = [
    'Russia', 'China', 'North Korea', 'Iran', 'Nigeria', 'Vietnam', 'Indonesia', 'Pakistan'
  ];
  
  if (higherRiskCountries.includes(ipInfo.country)) {
    score -= 10;
  }
  
  // Having a reverse DNS record is good
  if (ipInfo.hostname.length > 0) {
    score += 10;
  }
  
  return Math.min(100, Math.max(0, score)); // Ensure score is between 0-100
}
