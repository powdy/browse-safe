import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { 
  CheckCircle, 
  Search, 
  Server, 
  Globe, 
  Lock, 
  Database,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  CircleCheck,
  Radar,
  Link,
  Code,
  BarChart,
  ExternalLink,
  Fingerprint,
  History,
  Scale,
  Timer,
  Network,
  CreditCard
} from "lucide-react";

export default function HowItWorks() {
  return (
    <>
      <Helmet>
        <title>How TrustGuard Works | Website Security Scanner</title>
        <meta name="description" content="Learn how TrustGuard analyzes websites for security risks. Our comprehensive security scanner checks domain age, WHOIS data, IP reputation, and more to determine trustworthiness." />
        <meta name="keywords" content="website scanner, security analysis, domain verification, trustguard technology, website safety, online security, SSL verification, domain age check" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="mx-auto text-center mb-8">
              {/* Icon with particle effects */}
              <div className="inline-block relative mb-6">
                <div className="absolute -inset-6 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg">
                    <Radar className="w-8 h-8 text-white" />
                  </div>
                  {/* Small decorative dots */}
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-400 rounded-full animate-pulse"></span>
                  <span className="absolute -bottom-1 -left-1 h-2 w-2 bg-indigo-300 rounded-full animate-ping"></span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
              How TrustGuard Works
            </h1>
            
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mx-auto mb-6"></div>
            
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our advanced multi-factor analysis technology evaluates websites across numerous security dimensions to protect you from online threats
            </p>
          </div>
          
          {/* Introduction Section */}
          <div className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-sm border border-blue-100">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">The TrustGuard Technology</h2>
            
            <p className="text-gray-700 mb-6">
              When you enter a website URL for analysis, TrustGuard initiates a comprehensive security assessment using multiple specialized modules that work in parallel to evaluate different aspects of the site's safety and legitimacy. Our technology combines:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-blue-100">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-blue-100 rounded-md mr-3">
                    <Network className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-blue-800">API Integrations</h3>
                </div>
                <p className="text-sm text-gray-600">
                  TrustGuard connects to multiple external security databases and services including VirusTotal, AbuseIPDB, and Google Safe Browsing to check for known malicious domains.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-blue-100">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-blue-100 rounded-md mr-3">
                    <Fingerprint className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-blue-800">Proprietary Algorithms</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Our custom-built pattern recognition and risk assessment algorithms evaluate multiple security factors to identify even sophisticated scam websites and security vulnerabilities.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-blue-100">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-blue-100 rounded-md mr-3">
                    <History className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-blue-800">Historical Data</h3>
                </div>
                <p className="text-sm text-gray-600">
                  We maintain a database of past scans and known threats, allowing our system to recognize patterns in malicious websites and improve detection accuracy over time.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm border border-blue-100">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-blue-100 rounded-md mr-3">
                    <Timer className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-blue-800">Real-Time Analysis</h3>
                </div>
                <p className="text-sm text-gray-600">
                  TrustGuard performs all security checks in real-time, giving you immediate insight into a website's current security status rather than relying solely on cached or outdated information.
                </p>
              </div>
            </div>
          </div>
          
          {/* Main steps */}
          <div className="space-y-6 mb-12">
            <div className="relative">
              <div className="absolute left-4 inset-y-0 w-0.5 bg-accent-200 z-0"></div>
              
              <Card className="relative z-10 border-accent-200">
                <CardContent className="p-6">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-100 text-accent-600">
                        <Search className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-medium mb-2">Step 1: Domain Analysis</h2>
                      <p className="text-primary-700 mb-4">
                        We start by examining the domain's basic information to assess its legitimacy.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Verify the domain's age (newer domains are higher risk)</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Check registration and expiration dates</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Analyze domain name for suspicious patterns</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Compare against known brand impersonations</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <div className="absolute left-4 inset-y-0 w-0.5 bg-accent-200 z-0"></div>
              
              <Card className="relative z-10 border-accent-200">
                <CardContent className="p-6">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-100 text-accent-600">
                        <Server className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-medium mb-2">Step 2: WHOIS Data Verification</h2>
                      <p className="text-primary-700 mb-4">
                        We check the domain's WHOIS information to verify ownership and registration details.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Validate registrar information</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Check for privacy protection services</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Analyze registrant country and organization</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Check consistency of registration information</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <div className="absolute left-4 inset-y-0 w-0.5 bg-accent-200 z-0"></div>
              
              <Card className="relative z-10 border-accent-200">
                <CardContent className="p-6">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-100 text-accent-600">
                        <Globe className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-medium mb-2">Step 3: IP Address & Server Analysis</h2>
                      <p className="text-primary-700 mb-4">
                        We analyze the website's hosting infrastructure to identify potential risks.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Check IP reputation and location</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Verify nameserver configuration</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Detect proxy or VPN usage</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Check hosting provider reputation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <div className="absolute left-4 inset-y-0 w-0.5 bg-accent-200 z-0"></div>
              
              <Card className="relative z-10 border-accent-200">
                <CardContent className="p-6">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-100 text-accent-600">
                        <Lock className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-medium mb-2">Step 4: SSL & Security Implementation</h2>
                      <p className="text-primary-700 mb-4">
                        We check the website's security measures to ensure your data is protected.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Verify SSL certificate validity</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Check HTTPS implementation</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Analyze DNSSEC implementation</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Check security headers and best practices</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <div className="absolute left-4 inset-y-0 w-0.5 bg-accent-200 z-0"></div>
              
              <Card className="relative z-10 border-accent-200">
                <CardContent className="p-6">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-100 text-accent-600">
                        <Database className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-medium mb-2">Step 5: Blacklist & Reputation Check</h2>
                      <p className="text-primary-700 mb-4">
                        We verify if the website has been reported for malicious activity.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Cross-check against malware databases</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Check phishing detection systems</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Analyze user reports and feedback</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Check multiple security blacklists</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <Card className="relative z-10 border-accent-200">
                <CardContent className="p-6">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-100 text-accent-600">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-medium mb-2">Final Step: Trust Score Calculation</h2>
                      <p className="text-primary-700 mb-4">
                        We compile all analysis data to generate a comprehensive trust score and assessment.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Weighted scoring algorithm</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Risk factor identification</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Detailed security recommendations</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>Continuous learning system</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Trust Score Explanation */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-12">
            <h2 className="text-2xl font-heading font-bold mb-4">Understanding Trust Scores</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-success-light rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl font-bold text-success">80+</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-success">Safe (80-100)</h3>
                  <p className="text-primary-700 text-sm">
                    These websites have established histories, strong security measures, and no significant 
                    suspicious signals. They are generally safe for browsing and transactions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-16 h-16 bg-warning-light rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl font-bold text-warning">40-79</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-warning">Suspicious (40-79)</h3>
                  <p className="text-primary-700 text-sm">
                    These websites have some concerning elements that warrant caution. They may be legitimate 
                    but have security issues or questionable practices. Use caution when providing information.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-16 h-16 bg-danger-light rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl font-bold text-danger">0-39</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-danger">Dangerous (0-39)</h3>
                  <p className="text-primary-700 text-sm">
                    These websites show strong indicators of fraudulent activity, malware, or phishing attempts. 
                    They likely pose a significant risk and should be avoided.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Technology Behind Our Analysis Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">The Technology Behind Our Analysis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-400 to-green-500 rounded-full mr-4 text-white">
                    <Scale className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Weighted Scoring</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  TrustGuard's proprietary scoring algorithm assigns different weights to various security factors based on their importance and reliability as trust indicators.
                </p>
                <p className="text-gray-600">
                  For example, domains with very recent registration dates receive significant negative weight in the overall score, as this is a common characteristic of scam websites created just before launching attacks.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full mr-4 text-white">
                    <Link className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">API Architecture</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Our scanner employs a microservices architecture that allows parallel processing of multiple security checks simultaneously, reducing scan times while increasing thoroughness.
                </p>
                <p className="text-gray-600">
                  The system integrates with multiple trusted third-party security services including VirusTotal for malware detection, AbuseIPDB for IP reputation checks, and Google Safe Browsing for phishing assessment.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full mr-4 text-white">
                    <Code className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Pattern Recognition</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  TrustGuard employs advanced pattern recognition to identify suspicious domain naming patterns that often indicate impersonation or phishing attempts.
                </p>
                <p className="text-gray-600">
                  Our system can detect techniques like typosquatting (e.g., "paypa1.com" vs "paypal.com"), brand impersonation, and the use of misleading subdomains that are commonly used in phishing attacks.
                </p>
              </div>
            </div>
          </div>
          
          {/* Database & Continuous Learning */}
          <div className="mb-16 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8 shadow-sm border border-indigo-100">
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                <div className="p-4 bg-white rounded-lg shadow-sm mb-4 inline-block">
                  <BarChart className="h-10 w-10 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-indigo-800">Continuous Improvement</h2>
                <p className="text-gray-600">
                  Our system gets smarter with every scan, continuously learning from new threats and adapting to evolving security challenges.
                </p>
              </div>
              
              <div className="md:w-2/3 bg-white rounded-lg p-6 shadow-sm border border-indigo-100">
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">How We Improve Over Time</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5 mr-3">
                      <span className="font-semibold text-sm text-indigo-600">1</span>
                    </div>
                    <div>
                      <p className="text-gray-700"><span className="font-semibold">Database Updates:</span> Our security database is constantly updated with new threat intelligence, malware signatures, and phishing patterns from multiple sources.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5 mr-3">
                      <span className="font-semibold text-sm text-indigo-600">2</span>
                    </div>
                    <div>
                      <p className="text-gray-700"><span className="font-semibold">User Reports:</span> We incorporate user-submitted reports about malicious websites, allowing our community to help identify new threats that automated systems might miss.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5 mr-3">
                      <span className="font-semibold text-sm text-indigo-600">3</span>
                    </div>
                    <div>
                      <p className="text-gray-700"><span className="font-semibold">Algorithmic Refinement:</span> Our scoring algorithms are regularly refined based on performance analysis and changing threat landscapes to ensure they accurately identify both new and established risks.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5 mr-3">
                      <span className="font-semibold text-sm text-indigo-600">4</span>
                    </div>
                    <div>
                      <p className="text-gray-700"><span className="font-semibold">Historical Analysis:</span> By tracking websites over time, we can detect changes in behavior that might indicate a legitimate site has been compromised or a previously safe domain has been repurposed for malicious activity.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Practical Applications */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">Practical Applications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full mr-4">
                    <ExternalLink className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Before Clicking Links</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Use TrustGuard to check unfamiliar links you receive in emails, messages, or social media before clicking on them to avoid phishing attempts and malware downloads.
                </p>
                <ul className="text-gray-600 space-y-2 list-disc pl-5">
                  <li>Verify suspicious links in emails claiming to be from your bank or other services</li>
                  <li>Check shortened URLs (bit.ly, tinyurl, etc.) to see their real destination</li>
                  <li>Evaluate links shared on social media before visiting them</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full mr-4">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Before Online Purchases</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Before entering payment information on an unfamiliar online store, run it through TrustGuard to verify its legitimacy and security measures.
                </p>
                <ul className="text-gray-600 space-y-2 list-disc pl-5">
                  <li>Verify new online stores before creating an account</li>
                  <li>Check websites offering unusually low prices on popular products</li>
                  <li>Assess the security of payment processing pages</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Warning Box */}
          <div className="bg-warning-light rounded-xl p-6 border border-warning mb-12">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-warning mr-4" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Important Disclaimer</h3>
                <p className="text-primary-700 text-sm">
                  While TrustGuard provides an extensive security analysis, no scanning tool can guarantee 
                  100% accuracy. A high trust score doesn't guarantee a website is completely safe, and a low score 
                  may occasionally flag legitimate sites. Always use your best judgment and take additional 
                  precautions when sharing sensitive information online.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Try TrustGuard Today</h2>
            <p className="text-lg text-blue-100 mb-6 max-w-3xl mx-auto">
              Start scanning websites to protect yourself from online threats, phishing attempts, and malicious websites. No registration required.
            </p>
            <a href="/" className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:bg-blue-50 transition-colors">
              Scan a Website Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
