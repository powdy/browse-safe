import axios from 'axios';

interface SafeBrowsingResult {
  isUrlMalicious: boolean;
  threats: string[];
  threatTypes: string[];
  cacheDuration: string;
}

/**
 * Checks a URL against Google Safe Browsing API
 * @param url The URL to check
 * @returns Results of the safe browsing check
 */
export async function checkSafeBrowsing(url: string): Promise<SafeBrowsingResult> {
  const apiKey = process.env.GOOGLE_SAFEBROWSING_API_KEY;
  
  if (!apiKey) {
    console.warn("Google Safe Browsing API key not found, skipping check");
    return {
      isUrlMalicious: false,
      threats: [],
      threatTypes: [],
      cacheDuration: "0s"
    };
  }

  try {
    console.log(`Checking URL ${url} with Google Safe Browsing API...`);
    
    // Clean the URL and ensure we have the full domain
    let cleanUrl = url.trim().toLowerCase();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'http://' + cleanUrl;
    }
    
    const response = await axios.post(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
      {
        client: {
          clientId: "website-trust-analyzer",
          clientVersion: "1.0.0"
        },
        threatInfo: {
          threatTypes: [
            "MALWARE", 
            "SOCIAL_ENGINEERING", 
            "UNWANTED_SOFTWARE", 
            "POTENTIALLY_HARMFUL_APPLICATION"
          ],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url: cleanUrl }]
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 5000
      }
    );

    console.log('Google Safe Browsing API response:', JSON.stringify(response.data, null, 2));
    
    // If matches are found, the URL is unsafe
    if (response.data && response.data.matches && response.data.matches.length > 0) {
      const threats = response.data.matches.map((match: any) => match.threat.url);
      const threatTypes = response.data.matches.map((match: any) => match.threatType);
      const cacheDuration = response.data.matches[0].cacheDuration || "300s";
      
      return {
        isUrlMalicious: true,
        threats,
        threatTypes,
        cacheDuration
      };
    }
    
    // No matches found, URL is safe
    return {
      isUrlMalicious: false,
      threats: [],
      threatTypes: [],
      cacheDuration: "300s"
    };
  } catch (error) {
    console.error('Error querying Google Safe Browsing API:', error);
    
    // Return a safe result on error to avoid false positives
    return {
      isUrlMalicious: false,
      threats: [],
      threatTypes: [],
      cacheDuration: "0s"
    };
  }
}

/**
 * Calculate a safety score based on Google Safe Browsing results
 * @param result The Safe Browsing check result
 * @returns A score from 0-100 (higher is better/safer)
 */
export function calculateSafeBrowsingScore(result: SafeBrowsingResult): number {
  if (!result.isUrlMalicious) {
    return 100; // Perfect score for safe URLs
  }
  
  // If malicious, start with a low score
  let score = 20;
  
  // Different threat types have different severity
  const threatCounts = {
    MALWARE: 0,
    SOCIAL_ENGINEERING: 0,
    UNWANTED_SOFTWARE: 0,
    POTENTIALLY_HARMFUL_APPLICATION: 0
  };
  
  // Count occurrences of each threat type
  result.threatTypes.forEach(type => {
    if (type in threatCounts) {
      threatCounts[type as keyof typeof threatCounts]++;
    }
  });
  
  // Malware and phishing (social engineering) are the most serious
  if (threatCounts.MALWARE > 0) {
    score -= Math.min(15, threatCounts.MALWARE * 5);
  }
  
  if (threatCounts.SOCIAL_ENGINEERING > 0) {
    score -= Math.min(15, threatCounts.SOCIAL_ENGINEERING * 5);
  }
  
  // Unwanted software is less serious
  if (threatCounts.UNWANTED_SOFTWARE > 0) {
    score -= Math.min(10, threatCounts.UNWANTED_SOFTWARE * 3);
  }
  
  // Potentially harmful applications are the least serious
  if (threatCounts.POTENTIALLY_HARMFUL_APPLICATION > 0) {
    score -= Math.min(5, threatCounts.POTENTIALLY_HARMFUL_APPLICATION * 2);
  }
  
  // Ensure the score doesn't go below 0
  return Math.max(0, score);
}