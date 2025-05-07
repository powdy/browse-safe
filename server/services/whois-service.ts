import { exec } from 'child_process';
import { promisify } from 'util';
import axios from 'axios';
import dns from 'dns';

const execPromise = promisify(exec);
const dnsLookup = promisify(dns.lookup);

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
    // First check if domain actually exists by doing a DNS lookup
    try {
      await dnsLookup(cleanDomain);
    } catch (dnsError) {
      console.log(`Domain ${cleanDomain} does not exist or cannot be resolved:`, dnsError);
      return {
        domainName: cleanDomain,
        error: "Domain does not exist or cannot be resolved"
      };
    }
    
    // Try RDAP API first (more reliable than WHOIS)
    try {
      // RDAP is a modern JSON API for domain registration data 
      // Try .com/.net/.org first with Verisign
      let rdapResponse = null;
      
      try {
        rdapResponse = await axios.get(`https://rdap.verisign.com/com/v1/domain/${cleanDomain}`, {
          timeout: 3000
        });
      } catch (e) {
        // Try public RDAP bootstrap service
        try {
          rdapResponse = await axios.get(`https://rdap.org/domain/${cleanDomain}`, {
            timeout: 3000
          });
        } catch (e2) {
          // Try IANA bootstrap
          try {
            rdapResponse = await axios.get(`https://data.iana.org/rdap/dns.json`, {
              timeout: 3000
            });
            
            // Find appropriate RDAP server from bootstrap
            if (rdapResponse.data && rdapResponse.data.services) {
              const tld = cleanDomain.split('.').pop();
              let rdapServer = null;
              
              for (const service of rdapResponse.data.services) {
                if (service[0].includes(`.${tld}`)) {
                  rdapServer = service[1][0];
                  break;
                }
              }
              
              if (rdapServer) {
                rdapResponse = await axios.get(`${rdapServer}/domain/${cleanDomain}`, {
                  timeout: 3000
                });
              }
            }
          } catch (e3) {
            // Continue to next method if all RDAP attempts fail
            console.log("RDAP lookup failed completely");
          }
        }
      }
      
      if (rdapResponse && rdapResponse.data) {
        console.log("Successfully retrieved RDAP data");
        const data = rdapResponse.data;
        
        const whoisData: WhoisData = {
          domainName: cleanDomain,
          registrar: data.entities?.[0]?.vcardArray?.[1]?.[1]?.[3] || 
                    data.entities?.[0]?.vcardArray?.[1]?.find((v: any) => v[0] === 'fn')?.[3] || 
                    data.entities?.[0]?.handle,
        };
        
        // Extract creation date
        if (data.events) {
          const registrationEvent = data.events.find((event: any) => 
            event.eventAction === 'registration');
            
          if (registrationEvent) {
            whoisData.creationDate = registrationEvent.eventDate;
            
            // Calculate domain age
            const creationDate = new Date(registrationEvent.eventDate);
            const currentDate = new Date();
            const ageInMilliseconds = currentDate.getTime() - creationDate.getTime();
            const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
            const years = Math.floor(ageInYears);
            const months = Math.floor((ageInYears - years) * 12);
            whoisData.domainAge = `${years} years, ${months} months`;
          }
          
          // Extract expiration date
          const expirationEvent = data.events.find((event: any) => 
            event.eventAction === 'expiration');
            
          if (expirationEvent) {
            whoisData.expirationDate = expirationEvent.eventDate;
          }
        }
        
        // Extract registrant information if available
        if (data.entities) {
          const registrant = data.entities.find((entity: any) => 
            entity.roles && entity.roles.includes('registrant'));
            
          if (registrant && registrant.vcardArray && registrant.vcardArray[1]) {
            const vcard = registrant.vcardArray[1];
            
            // Extract organization
            const orgField = vcard.find((field: any) => field[0] === 'org');
            if (orgField) {
              whoisData.registrantOrganization = orgField[3];
            }
            
            // Extract country
            const addrField = vcard.find((field: any) => field[0] === 'adr');
            if (addrField && addrField[3] && addrField[3].country) {
              whoisData.registrantCountry = addrField[3].country;
            }
          }
        }
        
        // Extract nameservers
        if (data.nameservers) {
          whoisData.nameServers = data.nameservers.map((ns: any) => ns.ldhName);
        }
        
        return whoisData;
      }
    } catch (rdapError) {
      console.log("RDAP error:", rdapError);
    }
    
    // Try WHOIS API as a fallback (using proper API key)
    try {
      const apiKey = process.env.WHOISXML_API_KEY || 'at_demo';
      console.log(`Using WhoisXML API with key ${apiKey.substring(0, 5)}...`);
      const response = await axios.get(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${cleanDomain}&outputFormat=json`, {
        timeout: 5000
      });
      
      if (response.data && response.data.WhoisRecord) {
        console.log("Successfully retrieved WHOIS XML API data for domain:", cleanDomain);
        const record = response.data.WhoisRecord;
        
        // Log the key data we've received
        console.log(`WHOIS data: Domain: ${record.domainName}, Created: ${record.createdDate}, Expires: ${record.expiresDate}, Registrar: ${record.registrarName}`);
        
        const whoisData: WhoisData = {
          domainName: cleanDomain,
          registrar: record.registrarName || undefined,
          registrarUrl: record.registrarUrl || undefined,
          creationDate: record.createdDate || undefined,
          expirationDate: record.expiresDate || undefined,
          updatedDate: record.updatedDate || undefined,
          registrantOrganization: record.registrant?.organization || undefined,
          registrantCountry: record.registrant?.country || undefined
        };
        
        // Extract name servers
        if (record.nameServers && record.nameServers.hostNames) {
          whoisData.nameServers = record.nameServers.hostNames;
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
    } catch (apiError) {
      console.log("WHOIS XML API lookup failed:", apiError);
    }
    
    // Last resort: Try IP-API for general domain information
    // This won't give us WHOIS data but will give us some info
    try {
      const ipApiResponse = await axios.get(`http://ip-api.com/json/${cleanDomain}`, {
        timeout: 3000
      });
      
      if (ipApiResponse.data && ipApiResponse.data.status === "success") {
        console.log("Successfully retrieved IP-API data");
        const data = ipApiResponse.data;
        
        return {
          domainName: cleanDomain,
          registrantCountry: data.country || undefined,
          error: "Limited domain information available"
        };
      }
    } catch (ipApiError) {
      console.log("IP-API lookup failed:", ipApiError);
    }
    
    // If all external APIs fail, try command line as last resort
    try {
      console.log("Trying command line WHOIS as last resort");
      const { stdout } = await execPromise(`whois ${cleanDomain}`);
      return parseWhoisData(stdout);
    } catch (cmdError) {
      console.error(`Command-line WHOIS error for ${cleanDomain}:`, cmdError);
      
      // Return basic data with error message
      return {
        domainName: cleanDomain,
        error: "Could not retrieve domain registration data"
      };
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