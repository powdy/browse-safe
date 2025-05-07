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
  ShieldCheck 
} from "lucide-react";

export default function HowItWorks() {
  return (
    <>
      <Helmet>
        <title>How TrustGuard Works | Website Security Scanner</title>
        <meta name="description" content="Learn how TrustGuard analyzes websites for security risks. Our comprehensive security scanner checks domain age, WHOIS data, IP reputation, and more to determine trustworthiness." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-heading font-bold mb-4">How TrustGuard Works</h1>
            <p className="text-lg text-primary-600">
              Our comprehensive analysis involves multiple security checks to determine if a website is legitimate or potentially fraudulent
            </p>
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
          
          {/* Warning Box */}
          <div className="bg-warning-light rounded-xl p-6 border border-warning">
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
        </div>
      </div>
    </>
  );
}
