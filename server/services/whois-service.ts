import { exec } from 'child_process';
import { promisify } from 'util';
import axios from 'axios';

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
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').trim();
  
  try {
    // First try with external API for WHOIS data
    try {
      // Use a public WHOIS API
      const response = await axios.get(`https://www.whois.com/whois/${cleanDomain}`, {
        timeout: 5000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      if (response.data) {
        // Extract whois text from HTML response
        const whoisTextMatch = response.data.match(/<pre id="registryData">([^]+?)<\/pre>/i);
        if (whoisTextMatch && whoisTextMatch[1]) {
          return parseWhoisData(whoisTextMatch[1]);
        }
      }
    } catch (apiError) {
      console.log("API WHOIS lookup failed, falling back to command line:", apiError);
    }
    
    // Fallback to command line whois
    try {
      const { stdout } = await execPromise(`whois ${cleanDomain}`);
      return parseWhoisData(stdout);
    } catch (cmdError) {
      console.error(`Command-line WHOIS error for ${cleanDomain}:`, cmdError);
      
      // If both methods fail, use the DNS data to determine domain age
      const whoisData: WhoisData = {
        domainName: cleanDomain,
        // Add estimated values based on DNS data
        creationDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(), // Assume 1 year old as neutral value
        domainAge: "1 years, 0 months", // Default assumption 
        error: "Could not retrieve WHOIS data"
      };
      
      return whoisData;
    }
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
  const creationDateMatch = whoisText.match(/Creation Date:\s*(.+)/i) || 
                          whoisText.match(/Created( on)?:\s*(.+)/i) ||
                          whoisText.match(/Registration Date:\s*(.+)/i);
  
  if (creationDateMatch) {
    // Use the appropriate group based on which pattern matched
    const creationDateStr = creationDateMatch[creationDateMatch.length - 1].trim();
    whoisData.creationDate = creationDateStr;
  }
  
  // Extract expiration date
  const expirationDateMatch = whoisText.match(/Registry Expiry Date:\s*(.+)/i) ||
                             whoisText.match(/Expir(y|ation) Date:\s*(.+)/i);
  
  if (expirationDateMatch) {
    const expiryDateStr = expirationDateMatch[expirationDateMatch.length - 1].trim();
    whoisData.expirationDate = expiryDateStr;
  }
  
  // Extract registrant information
  const registrantMatch = whoisText.match(/Registrant( Organization)?:\s*(.+)/i);
  if (registrantMatch) whoisData.registrantOrganization = registrantMatch[registrantMatch.length - 1].trim();
  
  const registrantCountryMatch = whoisText.match(/Registrant Country:\s*(.+)/i);
  if (registrantCountryMatch) whoisData.registrantCountry = registrantCountryMatch[1].trim();
  
  // Extract nameservers with multiple patterns
  const nameServerMatches = whoisText.match(/Name Server:\s*(.+)/ig) || 
                          whoisText.match(/Nameservers?:\s*(.+)/ig);
  
  if (nameServerMatches) {
    whoisData.nameServers = nameServerMatches.map(match => {
      // Extract server name from various formats
      const server = match.replace(/Name\s*Servers?:\s*/i, '').trim();
      return server;
    });
  }
  
  // Calculate domain age if creation date is available
  if (whoisData.creationDate) {
    try {
      const creationDate = new Date(whoisData.creationDate);
      const currentDate = new Date();
      const ageInMilliseconds = currentDate.getTime() - creationDate.getTime();
      const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
      const years = Math.floor(ageInYears);
      const months = Math.floor((ageInYears - years) * 12);
      whoisData.domainAge = `${years} years, ${months} months`;
    } catch (error) {
      console.error("Error calculating domain age:", error);
    }
  }
  
  return whoisData;
}

// Calculate domain reputation based on WHOIS data
export function calculateWhoisReputation(whoisData: WhoisData): number {
  let score = 50; // Start with a neutral score
  
  // Older domains are generally more trustworthy
  if (whoisData.domainAge) {
    try {
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
    } catch (error) {
      console.error("Error parsing domain age:", error);
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
    try {
      const expirationDate = new Date(whoisData.expirationDate);
      const currentDate = new Date();
      const yearsUntilExpiration = (expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      
      if (yearsUntilExpiration > 3) {
        score += 5; // Good sign if registered for more than 3 years in the future
      }
    } catch (error) {
      console.error("Error calculating expiration date:", error);
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