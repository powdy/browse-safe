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
        <title>How BrowseSafe Works | Website Security Scanner</title>
        <meta name="description" content="Learn how BrowseSafe analyzes websites for security risks. Our comprehensive security scanner checks domain age, WHOIS data, IP reputation, and more to determine trustworthiness." />
        <meta name="keywords" content="website scanner, security analysis, domain verification, browsesafe technology, website safety, online security, SSL verification, domain age check" />
        <meta property="og:title" content="How BrowseSafe Works | Website Security Scanner" />
        <meta property="og:description" content="Learn how BrowseSafe analyzes websites for security risks using domain age, WHOIS data, IP reputation, and more to protect you from scams." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://browse-safe.com/how-it-works" />
        <meta property="og:image" content="/favicon.svg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="How BrowseSafe Works | Website Security Scanner" />
        <meta name="twitter:description" content="Learn how BrowseSafe scans websites for security threats using multiple verification methods." />
        <link rel="canonical" href="https://browse-safe.com/how-it-works" />
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
              How BrowseSafe Works
            </h1>
            
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mx-auto mb-6"></div>
            
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our advanced multi-factor analysis technology evaluates websites across numerous security dimensions to protect you from online threats
            </p>
          </div>
          
          {/* Introduction Section */}
          <div className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-sm border border-blue-100">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">The BrowseSafe Technology</h2>
            
            <p className="text-gray-700 mb-6">
              When you enter a website URL for analysis, BrowseSafe initiates a comprehensive security assessment using multiple specialized modules that work in parallel to evaluate different aspects of the site's safety and legitimacy. Our technology combines:
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
                  BrowseSafe connects to multiple external security databases and services including VirusTotal, AbuseIPDB, and Google Safe Browsing to check for known malicious domains.
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
                  BrowseSafe performs all security checks in real-time, giving you immediate insight into a website's current security status rather than relying solely on cached or outdated information.
                </p>
              </div>
            </div>
          </div>
          
          {/* Security Analysis Process */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">Our 6-Step Security Analysis Process</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden shadow-md transform transition-transform hover:scale-[1.02] hover:shadow-lg border border-blue-200">
                <div className="relative h-16 flex justify-center">
                  <div className="absolute top-4 bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 flex items-center justify-center rounded-full shadow-lg border-4 border-white">
                    <Search className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="p-6 pt-10">
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 mb-4">
                    <h3 className="text-xl font-bold text-blue-700 mb-2 flex items-center">
                      <span className="bg-blue-100 text-blue-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mr-2">1</span>
                      Domain Analysis
                    </h3>
                    <p className="text-gray-700 mb-3 text-sm">
                      We thoroughly examine the domain's registration information to determine its legitimacy and identify potential red flags.
                    </p>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Verify domain age and history</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Check registration and expiration</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Analyze for typosquatting patterns</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Compare against known scams</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl overflow-hidden shadow-md transform transition-transform hover:scale-[1.02] hover:shadow-lg border border-indigo-200">
                <div className="relative h-16 flex justify-center">
                  <div className="absolute top-4 bg-gradient-to-br from-indigo-500 to-indigo-600 w-16 h-16 flex items-center justify-center rounded-full shadow-lg border-4 border-white">
                    <Server className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="p-6 pt-10">
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 mb-4">
                    <h3 className="text-xl font-bold text-indigo-700 mb-2 flex items-center">
                      <span className="bg-indigo-100 text-indigo-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mr-2">2</span>
                      WHOIS Verification
                    </h3>
                    <p className="text-gray-700 mb-3 text-sm">
                      We examine the domain's ownership records to verify authenticity and detect suspicious registration patterns.
                    </p>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Verify registrar reputation</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Analyze privacy protection usage</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Check registrant location/country</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Identify inconsistent information</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl overflow-hidden shadow-md transform transition-transform hover:scale-[1.02] hover:shadow-lg border border-purple-200">
                <div className="relative h-16 flex justify-center">
                  <div className="absolute top-4 bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 flex items-center justify-center rounded-full shadow-lg border-4 border-white">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="p-6 pt-10">
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 mb-4">
                    <h3 className="text-xl font-bold text-purple-700 mb-2 flex items-center">
                      <span className="bg-purple-100 text-purple-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mr-2">3</span>
                      Infrastructure Analysis
                    </h3>
                    <p className="text-gray-700 mb-3 text-sm">
                      We analyze the site's hosting environment and network configuration to detect suspicious infrastructure.
                    </p>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Check IP reputation & geography</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Analyze nameserver configuration</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Identify proxy or VPN masking</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Evaluate hosting provider history</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl overflow-hidden shadow-md transform transition-transform hover:scale-[1.02] hover:shadow-lg border border-green-200">
                <div className="relative h-16 flex justify-center">
                  <div className="absolute top-4 bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 flex items-center justify-center rounded-full shadow-lg border-4 border-white">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="p-6 pt-10">
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 mb-4">
                    <h3 className="text-xl font-bold text-green-700 mb-2 flex items-center">
                      <span className="bg-green-100 text-green-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mr-2">4</span>
                      Security Implementation
                    </h3>
                    <p className="text-gray-700 mb-3 text-sm">
                      We examine the website's encryption and security practices to ensure your data will be properly protected.
                    </p>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Verify SSL certificate authenticity</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Assess HTTPS implementation</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Check for DNSSEC protection</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Test security headers & configs</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl overflow-hidden shadow-md transform transition-transform hover:scale-[1.02] hover:shadow-lg border border-red-200">
                <div className="relative h-16 flex justify-center">
                  <div className="absolute top-4 bg-gradient-to-br from-red-500 to-red-600 w-16 h-16 flex items-center justify-center rounded-full shadow-lg border-4 border-white">
                    <Database className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="p-6 pt-10">
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 mb-4">
                    <h3 className="text-xl font-bold text-red-700 mb-2 flex items-center">
                      <span className="bg-red-100 text-red-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mr-2">5</span>
                      Threat Intelligence
                    </h3>
                    <p className="text-gray-700 mb-3 text-sm">
                      We check multiple security databases to see if the website has been reported for malicious activity or scams.
                    </p>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Scan malware intelligence databases</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Check phishing detection systems</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Analyze community fraud reports</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Query multiple security blacklists</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Step 6 */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl overflow-hidden shadow-md transform transition-transform hover:scale-[1.02] hover:shadow-lg border border-amber-200">
                <div className="relative h-16 flex justify-center">
                  <div className="absolute top-4 bg-gradient-to-br from-amber-500 to-amber-600 w-16 h-16 flex items-center justify-center rounded-full shadow-lg border-4 border-white">
                    <ShieldCheck className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="p-6 pt-10">
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 mb-4">
                    <h3 className="text-xl font-bold text-amber-700 mb-2 flex items-center">
                      <span className="bg-amber-100 text-amber-700 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mr-2">6</span>
                      Trust Score Generation
                    </h3>
                    <p className="text-gray-700 mb-3 text-sm">
                      We combine all analysis data using advanced algorithms to generate a comprehensive trust score and security assessment.
                    </p>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Apply sophisticated scoring model</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Identify specific security risks</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Generate custom recommendations</span>
                    </li>
                    <li className="flex items-start bg-white/40 rounded-lg p-2">
                      <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Apply machine learning insights</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Trust Score Explanation */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">Understanding Trust Scores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Safe */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl border border-green-200">
                <div className="h-3 bg-gradient-to-r from-green-500 to-green-400"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg mr-3">
                        <CheckCircle className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-green-700">Safe</h3>
                    </div>
                    <div className="px-4 py-1 bg-green-100 rounded-full text-green-700 font-bold text-sm">
                      80-100
                    </div>
                  </div>
                  
                  <div className="relative mb-4">
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full w-full"></div>
                    </div>
                    <div className="absolute -top-1 right-0 transform translate-x-1/2 w-4 h-4 bg-white border-2 border-green-500 rounded-full"></div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    These websites have established histories, strong security measures, and no significant 
                    suspicious signals. They are generally safe for browsing and transactions.
                  </p>
                  
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-green-100 text-green-600 flex-shrink-0 mr-2 flex items-center justify-center">✓</span>
                      <span className="text-gray-600">Established domain with history</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-green-100 text-green-600 flex-shrink-0 mr-2 flex items-center justify-center">✓</span>
                      <span className="text-gray-600">Proper security implementations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-green-100 text-green-600 flex-shrink-0 mr-2 flex items-center justify-center">✓</span>
                      <span className="text-gray-600">No blacklist appearances</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Suspicious */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl border border-amber-200">
                <div className="h-3 bg-gradient-to-r from-amber-500 to-amber-400"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg mr-3">
                        <AlertTriangle className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-amber-700">Suspicious</h3>
                    </div>
                    <div className="px-4 py-1 bg-amber-100 rounded-full text-amber-700 font-bold text-sm">
                      40-79
                    </div>
                  </div>
                  
                  <div className="relative mb-4">
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full w-3/4"></div>
                    </div>
                    <div className="absolute -top-1 right-1/4 transform translate-x-1/2 w-4 h-4 bg-white border-2 border-amber-500 rounded-full"></div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    These websites have some concerning elements that warrant caution. They may be legitimate 
                    but have security issues or questionable practices.
                  </p>
                  
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex-shrink-0 mr-2 flex items-center justify-center">!</span>
                      <span className="text-gray-600">New or recently registered domain</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex-shrink-0 mr-2 flex items-center justify-center">!</span>
                      <span className="text-gray-600">Security issues or misconfigurations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex-shrink-0 mr-2 flex items-center justify-center">!</span>
                      <span className="text-gray-600">Hosted on questionable infrastructure</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Dangerous */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl border border-red-200">
                <div className="h-3 bg-gradient-to-r from-red-500 to-red-400"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg mr-3">
                        <AlertTriangle className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-red-700">Dangerous</h3>
                    </div>
                    <div className="px-4 py-1 bg-red-100 rounded-full text-red-700 font-bold text-sm">
                      0-39
                    </div>
                  </div>
                  
                  <div className="relative mb-4">
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full w-1/3"></div>
                    </div>
                    <div className="absolute -top-1 right-2/3 transform translate-x-1/2 w-4 h-4 bg-white border-2 border-red-500 rounded-full"></div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    These websites show strong indicators of fraudulent activity, malware, or phishing attempts. 
                    They likely pose a significant risk and should be avoided.
                  </p>
                  
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-red-100 text-red-600 flex-shrink-0 mr-2 flex items-center justify-center">✗</span>
                      <span className="text-gray-600">Appears on multiple blacklists</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-red-100 text-red-600 flex-shrink-0 mr-2 flex items-center justify-center">✗</span>
                      <span className="text-gray-600">Brand impersonation or typosquatting</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-5 h-5 rounded-full bg-red-100 text-red-600 flex-shrink-0 mr-2 flex items-center justify-center">✗</span>
                      <span className="text-gray-600">Malware or phishing detected</span>
                    </li>
                  </ul>
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
