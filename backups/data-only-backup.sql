-- Data-only import for BrowseSafe database
-- Import sample scans

-- Sample scan data
INSERT INTO public.scans (url, trust_score, domain_age, registration_date, expiration_date, registrar, registrant_country, ip_address, ip_location, name_servers, has_valid_ssl, has_dnssec, has_security_headers, has_malware, has_phishing, blacklist_status, suspicious_patterns, user_reports, related_sites, last_scanned, status, details)
VALUES
('amazon.com', 98, '27 years, 5 months', '1995-05-15', '2028-05-15', 'Amazon Registrar, Inc.', 'United States', '176.32.103.205', 'United States', 'ns1.amazon.com, ns2.amazon.com', true, true, true, false, false, 'Not blacklisted', 'None', 0, 0, '2025-05-07 15:01:23.031', 'safe', '{}')
ON CONFLICT (url) DO UPDATE SET
  trust_score = EXCLUDED.trust_score,
  domain_age = EXCLUDED.domain_age,
  registration_date = EXCLUDED.registration_date,
  expiration_date = EXCLUDED.expiration_date,
  registrar = EXCLUDED.registrar,
  registrant_country = EXCLUDED.registrant_country,
  ip_address = EXCLUDED.ip_address,
  ip_location = EXCLUDED.ip_location,
  name_servers = EXCLUDED.name_servers,
  has_valid_ssl = EXCLUDED.has_valid_ssl,
  has_dnssec = EXCLUDED.has_dnssec,
  has_security_headers = EXCLUDED.has_security_headers,
  has_malware = EXCLUDED.has_malware,
  has_phishing = EXCLUDED.has_phishing,
  blacklist_status = EXCLUDED.blacklist_status,
  suspicious_patterns = EXCLUDED.suspicious_patterns,
  last_scanned = EXCLUDED.last_scanned,
  status = EXCLUDED.status,
  details = EXCLUDED.details;

INSERT INTO public.scans (url, trust_score, domain_age, registration_date, expiration_date, registrar, registrant_country, ip_address, ip_location, name_servers, has_valid_ssl, has_dnssec, has_security_headers, has_malware, has_phishing, blacklist_status, suspicious_patterns, user_reports, related_sites, last_scanned, status, details)
VALUES
('paypal-secure-login.com', 12, '2 days', '2023-08-08', '2024-08-08', 'NameCheap Inc.', 'Panama', '185.224.138.29', 'Netherlands', 'ns1.namecheap.com, ns2.namecheap.com', false, false, false, true, true, 'Blacklisted on 12 services', 'Brand impersonation', 28, 5, '2025-05-07 15:01:23.031', 'dangerous', '{}')
ON CONFLICT (url) DO UPDATE SET
  trust_score = EXCLUDED.trust_score,
  domain_age = EXCLUDED.domain_age,
  registration_date = EXCLUDED.registration_date,
  expiration_date = EXCLUDED.expiration_date,
  registrar = EXCLUDED.registrar,
  registrant_country = EXCLUDED.registrant_country,
  ip_address = EXCLUDED.ip_address,
  ip_location = EXCLUDED.ip_location,
  name_servers = EXCLUDED.name_servers,
  has_valid_ssl = EXCLUDED.has_valid_ssl,
  has_dnssec = EXCLUDED.has_dnssec,
  has_security_headers = EXCLUDED.has_security_headers,
  has_malware = EXCLUDED.has_malware,
  has_phishing = EXCLUDED.has_phishing,
  blacklist_status = EXCLUDED.blacklist_status,
  suspicious_patterns = EXCLUDED.suspicious_patterns,
  user_reports = EXCLUDED.user_reports,
  related_sites = EXCLUDED.related_sites,
  last_scanned = EXCLUDED.last_scanned,
  status = EXCLUDED.status,
  details = EXCLUDED.details;

INSERT INTO public.scans (url, trust_score, domain_age, registration_date, expiration_date, registrar, registrant_country, ip_address, ip_location, name_servers, has_valid_ssl, has_dnssec, has_security_headers, has_malware, has_phishing, blacklist_status, suspicious_patterns, user_reports, related_sites, last_scanned, status, details)
VALUES
('ebay.com', 96, '25 years, 8 months', '1995-09-12', '2026-09-12', 'CSC Corporate Domains, Inc.', 'United States', '66.135.202.236', 'United States', 'ns1.ebay.com, ns2.ebay.com', true, true, true, false, false, 'Not blacklisted', 'None', 0, 0, '2025-05-06 15:01:23.031', 'safe', '{}')
ON CONFLICT (url) DO UPDATE SET
  trust_score = EXCLUDED.trust_score,
  domain_age = EXCLUDED.domain_age,
  registration_date = EXCLUDED.registration_date,
  expiration_date = EXCLUDED.expiration_date,
  registrar = EXCLUDED.registrar,
  registrant_country = EXCLUDED.registrant_country,
  ip_address = EXCLUDED.ip_address,
  ip_location = EXCLUDED.ip_location,
  name_servers = EXCLUDED.name_servers,
  has_valid_ssl = EXCLUDED.has_valid_ssl,
  has_dnssec = EXCLUDED.has_dnssec,
  has_security_headers = EXCLUDED.has_security_headers,
  has_malware = EXCLUDED.has_malware,
  has_phishing = EXCLUDED.has_phishing,
  blacklist_status = EXCLUDED.blacklist_status,
  suspicious_patterns = EXCLUDED.suspicious_patterns,
  last_scanned = EXCLUDED.last_scanned,
  status = EXCLUDED.status,
  details = EXCLUDED.details;

INSERT INTO public.scans (url, trust_score, domain_age, registration_date, expiration_date, registrar, registrant_country, ip_address, ip_location, name_servers, has_valid_ssl, has_dnssec, has_security_headers, has_malware, has_phishing, blacklist_status, suspicious_patterns, user_reports, related_sites, last_scanned, status, details)
VALUES
('google.com', 85, '27 years, 7 months', 'September 15, 1997', 'September 14, 2028', 'MarkMonitor Inc.', 'Unknown', '173.194.202.102', 'US', 'NS1.GOOGLE.COM, NS2.GOOGLE.COM, NS3.GOOGLE.COM, NS4.GOOGLE.COM', true, false, true, false, false, 'Not blacklisted', 'None', 0, 0, '2025-05-07 15:02:14.994', 'safe', '{"whoisData":{"domainName":"google.com","registrar":"MarkMonitor Inc.","creationDate":"1997-09-15T04:00:00Z","domainAge":"27 years, 7 months","expirationDate":"2028-09-14T04:00:00Z","nameServers":["NS1.GOOGLE.COM","NS2.GOOGLE.COM","NS3.GOOGLE.COM","NS4.GOOGLE.COM"]},"domainInfo":{"ipAddresses":["173.194.202.102","173.194.202.100","173.194.202.113","173.194.202.139","173.194.202.101","173.194.202.138"],"nameservers":["ns3.google.com","ns1.google.com","ns4.google.com","ns2.google.com"],"mxRecords":[{"exchange":"smtp.google.com","priority":10}],"txtRecords":[["docusign=05958488-4752-4ef2-95eb-aa7ba8a3bd0e"],["globalsign-smime-dv=CDYX+XFHUw2wml6/Gb8+59BsH31KzUr6c1l2BPvqKX8="],["docusign=1b0a6754-49b1-4db5-8540-d2c12664b289"],["onetrust-domain-verification=de01ed21f2fa4d8781cbc3ffb89cf4ef"],["apple-domain-verification=30afIBcvSuDV2PLX"],["google-site-verification=4ibFUgB-wXLQ_S7vsXVomSTVamuOXBiVAzpR5IZ87D0"],["google-site-verification=TV9-DBe4R80X4v0M4U_bd_J9cpOJM0nikft0jAgjmsQ"],["cisco-ci-domain-verification=479146de172eb01ddee38b1a455ab9e8bb51542ddd7f1fa298557dfa7b22d963"],["v=spf1 include:_spf.google.com ~all"],["google-site-verification=wD8N7i1JTNTkezJ49swvWW48f8_9xveREV4oB-0Hf5o"],["MS=E4A68B9AB2BB9670BCE15412F62916164C0B20BB"],["facebook-domain-verification=22rm551cu4k0ab0bxsw536tlds4h95"]],"reverseDns":{"173.194.202.102":["pf-in-f102.1e100.net"],"173.194.202.100":["pf-in-f100.1e100.net"],"173.194.202.113":["pf-in-f113.1e100.net"],"173.194.202.139":["pf-in-f139.1e100.net"],"173.194.202.101":["pf-in-f101.1e100.net"],"173.194.202.138":["pf-in-f138.1e100.net"]},"hasDNSSEC":false},"ipInfo":{"ip":"173.194.202.102","hostname":["pf-in-f102.1e100.net"],"country":"US","isp":"Google LLC","isProxy":false,"isTor":false,"isHosting":false,"blacklisted":false,"abuseReports":0},"blacklistResult":{"isBlacklisted":false,"blacklistedOn":[],"hasMalware":false,"hasPhishing":false,"suspiciousContent":false,"score":100}}')
ON CONFLICT (url) DO UPDATE SET
  trust_score = EXCLUDED.trust_score,
  domain_age = EXCLUDED.domain_age,
  registration_date = EXCLUDED.registration_date,
  expiration_date = EXCLUDED.expiration_date,
  registrar = EXCLUDED.registrar,
  registrant_country = EXCLUDED.registrant_country,
  ip_address = EXCLUDED.ip_address,
  ip_location = EXCLUDED.ip_location,
  name_servers = EXCLUDED.name_servers,
  has_valid_ssl = EXCLUDED.has_valid_ssl,
  has_dnssec = EXCLUDED.has_dnssec,
  has_security_headers = EXCLUDED.has_security_headers,
  has_malware = EXCLUDED.has_malware,
  has_phishing = EXCLUDED.has_phishing,
  blacklist_status = EXCLUDED.blacklist_status,
  suspicious_patterns = EXCLUDED.suspicious_patterns,
  last_scanned = EXCLUDED.last_scanned,
  status = EXCLUDED.status,
  details = EXCLUDED.details;