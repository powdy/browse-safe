// List of known malware and phishing URL patterns (simplified for demo)
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

// Simulated blacklist service
interface BlacklistCheckResult {
  isBlacklisted: boolean;
  blacklistedOn: string[];
  hasMalware: boolean;
  hasPhishing: boolean;
  suspiciousContent: boolean;
  score: number;
}

export function checkBlacklist(domain: string): BlacklistCheckResult {
  // Normalize domain to just the domain without protocol or www
  const normalizedDomain = domain.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
  
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
  
  // Random but weighted blacklist status based on the domain
  const hasSuspiciousTLD = normalizedDomain.endsWith('.xyz') || 
                          normalizedDomain.endsWith('.info') || 
                          normalizedDomain.endsWith('.top') || 
                          normalizedDomain.endsWith('.tk');
  
  // Calculate probability of being blacklisted based on factors
  let blacklistProbability = 0;
  if (hasMaliciousPattern) blacklistProbability += 0.7;
  if (possibleTyposquatting) blacklistProbability += 0.5;
  if (hasSuspiciousTLD) blacklistProbability += 0.3;
  
  // Add some randomness
  blacklistProbability = Math.min(1, blacklistProbability + Math.random() * 0.2);
  
  // Determine if blacklisted
  const isBlacklisted = Math.random() < blacklistProbability;
  
  // Simulate which blacklists might have flagged this domain
  const possibleBlacklists = [
    'Google Safe Browsing',
    'PhishTank',
    'SURBL',
    'Spamhaus DBL',
    'URIBL',
    'OpenPhish',
    'Malware Domain List',
    'MalwareURL',
    'Kaspersky',
    'McAfee',
    'Norton Safe Web',
    'Bitdefender'
  ];
  
  // Select some blacklists based on probability
  const blacklistedOn = isBlacklisted 
    ? possibleBlacklists.filter(() => Math.random() < blacklistProbability)
    : [];
  
  // Ensure at least one blacklist if isBlacklisted is true
  if (isBlacklisted && blacklistedOn.length === 0) {
    blacklistedOn.push(possibleBlacklists[Math.floor(Math.random() * possibleBlacklists.length)]);
  }
  
  // Determine other security flags
  const hasMalware = isBlacklisted && Math.random() < 0.7;
  const hasPhishing = isBlacklisted && Math.random() < (hasMaliciousPattern ? 0.9 : 0.5);
  const suspiciousContent = isBlacklisted || hasMaliciousPattern || possibleTyposquatting;
  
  // Calculate a score (0-100, higher is better)
  let score = 100;
  if (isBlacklisted) score -= 50;
  if (hasMalware) score -= 20;
  if (hasPhishing) score -= 20;
  if (suspiciousContent) score -= 10;
  if (possibleTyposquatting) score -= 15;
  if (hasSuspiciousTLD) score -= 5;
  
  // Adjust score based on number of blacklists
  score -= Math.min(50, blacklistedOn.length * 5);
  
  return {
    isBlacklisted,
    blacklistedOn,
    hasMalware,
    hasPhishing,
    suspiciousContent,
    score: Math.max(0, score)
  };
}
