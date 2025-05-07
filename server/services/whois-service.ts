import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

interface WhoisData {
  domainName?: string;
  registrar?: string;
  registrarUrl?: string;
  creationDate?: string;
  expirationDate?: string;
  updatedDate?: string;
  registrantName?: string;
  registrantOrganization?: string;
  registrantCountry?: string;
  registrantState?: string;
  registrantCity?: string;
  domainAge?: string;
  domainStatus?: string[];
  nameServers?: string[];
  error?: string;
}

export async function getWhoisData(domain: string): Promise<WhoisData> {
  // Clean the domain
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
  
  try {
    // Execute the whois command
    const { stdout } = await execPromise(`whois ${cleanDomain}`);
    return parseWhoisData(stdout);
  } catch (error) {
    console.error(`WHOIS error for ${cleanDomain}:`, error);
    
    // Return partial data with error message
    return {
      domainName: cleanDomain,
      error: "Could not retrieve WHOIS data"
    };
  }
}

function parseWhoisData(whoisText: string): WhoisData {
  const whoisData: WhoisData = {};
  
  // Extract domain name
  const domainNameMatch = whoisText.match(/Domain Name:\s*(.+)/i);
  if (domainNameMatch) whoisData.domainName = domainNameMatch[1].trim();
  
  // Extract registrar
  const registrarMatch = whoisText.match(/Registrar:\s*(.+)/i);
  if (registrarMatch) whoisData.registrar = registrarMatch[1].trim();
  
  // Extract registrar URL
  const registrarUrlMatch = whoisText.match(/Registrar URL:\s*(.+)/i);
  if (registrarUrlMatch) whoisData.registrarUrl = registrarUrlMatch[1].trim();
  
  // Extract creation date
  const creationDateMatch = whoisText.match(/Creation Date:\s*(.+)/i);
  if (creationDateMatch) whoisData.creationDate = creationDateMatch[1].trim();
  
  // Extract expiration date
  const expirationDateMatch = whoisText.match(/Registry Expiry Date:\s*(.+)/i);
  if (expirationDateMatch) whoisData.expirationDate = expirationDateMatch[1].trim();
  
  // Extract registrant information
  const registrantMatch = whoisText.match(/Registrant Organization:\s*(.+)/i);
  if (registrantMatch) whoisData.registrantOrganization = registrantMatch[1].trim();
  
  const registrantCountryMatch = whoisText.match(/Registrant Country:\s*(.+)/i);
  if (registrantCountryMatch) whoisData.registrantCountry = registrantCountryMatch[1].trim();
  
  // Extract nameservers
  const nameServerMatches = whoisText.match(/Name Server:\s*(.+)/ig);
  if (nameServerMatches) {
    whoisData.nameServers = nameServerMatches.map(match => {
      const server = match.replace(/Name Server:\s*/i, '').trim();
      return server;
    });
  }
  
  // Calculate domain age if creation date is available
  if (whoisData.creationDate) {
    const creationDate = new Date(whoisData.creationDate);
    const currentDate = new Date();
    const ageInMilliseconds = currentDate.getTime() - creationDate.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    const years = Math.floor(ageInYears);
    const months = Math.floor((ageInYears - years) * 12);
    whoisData.domainAge = `${years} years, ${months} months`;
  }
  
  return whoisData;
}

// Simulate WHOIS data for testing or when the whois command is not available
function simulateWhoisData(domain: string): WhoisData {
  // Popular domains with known data
  const knownDomains: Record<string, WhoisData> = {
    'amazon.com': {
      domainName: 'amazon.com',
      registrar: 'Amazon Registrar, Inc.',
      registrarUrl: 'https://registrar.amazon.com',
      creationDate: '1995-05-15T04:00:00Z',
      expirationDate: '2028-05-15T04:00:00Z',
      updatedDate: '2023-05-15T04:00:00Z',
      registrantOrganization: 'Amazon Technologies, Inc.',
      registrantCountry: 'United States',
      domainAge: '28 years, 3 months',
      nameServers: ['ns1.amazon.com', 'ns2.amazon.com', 'ns3.amazon.com', 'ns4.amazon.com']
    },
    'google.com': {
      domainName: 'google.com',
      registrar: 'MarkMonitor Inc.',
      registrarUrl: 'http://www.markmonitor.com',
      creationDate: '1997-09-15T04:00:00Z',
      expirationDate: '2028-09-14T04:00:00Z',
      updatedDate: '2022-09-09T09:39:03Z',
      registrantOrganization: 'Google LLC',
      registrantCountry: 'United States',
      domainAge: '26 years, 0 months',
      nameServers: ['ns1.google.com', 'ns2.google.com', 'ns3.google.com', 'ns4.google.com']
    },
    'facebook.com': {
      domainName: 'facebook.com',
      registrar: 'RegistrarSafe, LLC',
      registrarUrl: 'http://www.registrarsafe.com',
      creationDate: '1997-03-29T05:00:00Z',
      expirationDate: '2028-03-30T04:00:00Z',
      updatedDate: '2022-03-28T09:32:14Z',
      registrantOrganization: 'Meta Platforms, Inc.',
      registrantCountry: 'United States',
      domainAge: '26 years, 5 months',
      nameServers: ['a.ns.facebook.com', 'b.ns.facebook.com', 'c.ns.facebook.com', 'd.ns.facebook.com']
    },
    'microsoft.com': {
      domainName: 'microsoft.com',
      registrar: 'MarkMonitor Inc.',
      registrarUrl: 'http://www.markmonitor.com',
      creationDate: '1991-05-02T04:00:00Z',
      expirationDate: '2025-05-03T04:00:00Z',
      updatedDate: '2021-04-02T09:10:53Z',
      registrantOrganization: 'Microsoft Corporation',
      registrantCountry: 'United States',
      domainAge: '32 years, 3 months',
      nameServers: ['ns1.msft.net', 'ns2.msft.net', 'ns3.msft.net', 'ns4.msft.net']
    },
    'ebay.com': {
      domainName: 'ebay.com',
      registrar: 'CSC Corporate Domains, Inc.',
      registrarUrl: 'http://www.cscprotectsbrands.com',
      creationDate: '1995-09-12T04:00:00Z',
      expirationDate: '2026-09-13T04:00:00Z',
      updatedDate: '2022-08-10T08:47:21Z',
      registrantOrganization: 'eBay Inc.',
      registrantCountry: 'United States',
      domainAge: '28 years, 0 months',
      nameServers: ['ns1.ebay.com', 'ns2.ebay.com', 'ns3.ebay.com', 'ns4.ebay.com']
    }
  };
  
  // Check if we have known data for this domain
  for (const knownDomain in knownDomains) {
    if (domain.includes(knownDomain)) {
      return knownDomains[knownDomain];
    }
  }
  
  // Generate data for unknown domains
  const currentDate = new Date();
  const creationDate = new Date();
  // Randomly decide if this is a new domain (suspicious) or older domain (more trustworthy)
  const isNewDomain = Math.random() < 0.4;
  
  if (isNewDomain) {
    // Domain registered in the last 30 days (suspicious)
    creationDate.setDate(currentDate.getDate() - Math.floor(Math.random() * 30));
  } else {
    // Domain registered 1-5 years ago
    const yearsAgo = 1 + Math.floor(Math.random() * 5);
    creationDate.setFullYear(currentDate.getFullYear() - yearsAgo);
    // Add some randomness to month and day
    creationDate.setMonth(Math.floor(Math.random() * 12));
    creationDate.setDate(1 + Math.floor(Math.random() * 28));
  }
  
  const expirationDate = new Date(creationDate);
  expirationDate.setFullYear(expirationDate.getFullYear() + 1); // Most domains are registered for 1 year initially
  
  const ageInMilliseconds = currentDate.getTime() - creationDate.getTime();
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
  const years = Math.floor(ageInYears);
  const months = Math.floor((ageInYears - years) * 12);
  const domainAge = `${years} years, ${months} months`;
  
  const isoCreationDate = creationDate.toISOString();
  const isoExpirationDate = expirationDate.toISOString();
  
  // Common registrars
  const registrars = [
    'GoDaddy.com, LLC',
    'Namecheap, Inc.',
    'Network Solutions, LLC',
    'Cloudflare, Inc.',
    'NameSilo, LLC',
    'Google LLC',
    'Tucows Domains Inc.'
  ];
  
  // Common nameserver patterns
  const nameServerPatterns = [
    [`ns1.${domain}`, `ns2.${domain}`],
    [`dns1.registrar-servers.com`, `dns2.registrar-servers.com`],
    [`ns1.domaincontrol.com`, `ns2.domaincontrol.com`],
    [`ns-cloud-a1.googledomains.com`, `ns-cloud-a2.googledomains.com`],
    [`j.ns.cloudflare.com`, `k.ns.cloudflare.com`]
  ];
  
  return {
    domainName: domain,
    registrar: registrars[Math.floor(Math.random() * registrars.length)],
    creationDate: isoCreationDate,
    expirationDate: isoExpirationDate,
    updatedDate: isNewDomain ? isoCreationDate : new Date(currentDate.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    registrantOrganization: `${domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1)} Organization`,
    registrantCountry: isNewDomain ? ['Panama', 'Russia', 'China', 'Nigeria'][Math.floor(Math.random() * 4)] : ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia'][Math.floor(Math.random() * 6)],
    domainAge,
    nameServers: nameServerPatterns[Math.floor(Math.random() * nameServerPatterns.length)]
  };
}

// Calculate domain reputation based on WHOIS data
export function calculateWhoisReputation(whoisData: WhoisData): number {
  let score = 50; // Start with a neutral score
  
  // Older domains are generally more trustworthy
  if (whoisData.domainAge) {
    const [years, months] = whoisData.domainAge.split(',')[0].trim().split(' ');
    const ageInYears = parseInt(years, 10);
    
    if (ageInYears >= 5) {
      score += 25; // 5+ years is very good
    } else if (ageInYears >= 2) {
      score += 15; // 2-5 years is good
    } else if (ageInYears >= 1) {
      score += 5; // 1-2 years is neutral to slightly good
    } else if (ageInYears < 1) {
      score -= 15; // Less than 1 year is suspicious
    }
    
    // If domain is less than 30 days old, it's very suspicious
    if (ageInYears === 0 && parseInt(months, 10) < 1) {
      score -= 15; // Additional penalty for very new domains
    }
  }
  
  // Well-known registrars are generally better
  const trustedRegistrars = [
    'godaddy', 'namecheap', 'network solutions', 'tucows', 'markmonitor',
    'cloudflare', 'amazon', 'google', 'fastdomain', 'name.com', 'enom'
  ];
  
  if (whoisData.registrar && trustedRegistrars.some(reg => whoisData.registrar!.toLowerCase().includes(reg))) {
    score += 5;
  }
  
  // Domains from certain countries might be more trustworthy
  // This is a simplification and could be expanded with more nuanced country scoring
  const trustedCountries = [
    'united states', 'canada', 'united kingdom', 'australia', 'new zealand',
    'japan', 'germany', 'france', 'spain', 'italy', 'switzerland', 'norway',
    'sweden', 'finland', 'denmark', 'netherlands', 'belgium'
  ];
  
  if (whoisData.registrantCountry && trustedCountries.includes(whoisData.registrantCountry.toLowerCase())) {
    score += 5;
  }
  
  // If domain expiration is far in the future, it indicates commitment and legitimacy
  if (whoisData.expirationDate) {
    const expirationDate = new Date(whoisData.expirationDate);
    const currentDate = new Date();
    const yearsUntilExpiration = (expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    
    if (yearsUntilExpiration > 3) {
      score += 5; // Good sign if registered for more than 3 years in the future
    }
  }
  
  // If organization name is provided, that's a good sign
  if (whoisData.registrantOrganization && whoisData.registrantOrganization.length > 0) {
    score += 5;
  }
  
  // Having multiple nameservers is a good sign
  if (whoisData.nameServers && whoisData.nameServers.length >= 2) {
    score += 5;
  }
  
  return Math.min(100, Math.max(0, score)); // Ensure score is between 0-100
}
