import { Helmet } from "react-helmet";
import { ShieldCheck, Users, Award, Clock, Globe, Lock } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Helmet>
        <title>About Us | BrowseSafe - Website Security Scanner</title>
        <meta name="description" content="Learn about BrowseSafe's mission to make the internet safer through our advanced website security scanning technology and expert team." />
      </Helmet>

      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
          About BrowseSafe
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Making the internet safer through advanced website security analysis and threat detection
        </p>
      </div>

      {/* Our Mission */}
      <div className="mb-20">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
          <p className="text-lg text-gray-600 mb-4">
            At BrowseSafe, our mission is to create a safer online environment by providing users with reliable, accurate, and comprehensive website security assessments.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            In today's digital landscape, online scams and fraudulent websites are becoming increasingly sophisticated, making it difficult for the average user to distinguish between legitimate and malicious sites.
          </p>
          <p className="text-lg text-gray-600">
            We believe that everyone deserves to browse the internet with confidence, knowing that the websites they visit are safe and trustworthy. Our cutting-edge technology and expert insights empower users to make informed decisions about the websites they interact with.
          </p>
        </div>
      </div>

      {/* Our Team */}
      <div className="mb-20">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Our Team</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
          <p className="text-lg text-gray-600 mb-4">
            BrowseSafe was founded by a team of cybersecurity experts, data scientists, and web developers with a shared passion for online safety and security.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            Our diverse team brings together decades of combined experience in threat intelligence, malware analysis, domain verification, and user experience design. This multidisciplinary approach allows us to deliver a comprehensive security assessment service that considers all aspects of website trustworthiness.
          </p>
          <p className="text-lg text-gray-600">
            We continuously monitor emerging threats and scamming techniques to ensure our detection systems remain at the cutting edge of cybersecurity protection.
          </p>
        </div>
      </div>

      {/* How TrustGuard Works */}
      <div className="mb-20">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">How BrowseSafe Works</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4">1</div>
                <h3 className="text-xl font-semibold">Domain Analysis</h3>
              </div>
              <p className="text-gray-600 ml-14">
                We analyze domain registration information, age, and WHOIS data to determine if a website has an established presence online. Newly registered domains often pose a higher risk.
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4">2</div>
                <h3 className="text-xl font-semibold">SSL Verification</h3>
              </div>
              <p className="text-gray-600 ml-14">
                We check if the website uses secure connections (HTTPS) and verify the validity of SSL certificates, which are essential for secure data transmission.
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4">3</div>
                <h3 className="text-xl font-semibold">Blacklist Checking</h3>
              </div>
              <p className="text-gray-600 ml-14">
                We check the website against multiple blacklists and security databases to see if it has been reported for malware, phishing, or other malicious activities.
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4">4</div>
                <h3 className="text-xl font-semibold">IP and Server Analysis</h3>
              </div>
              <p className="text-gray-600 ml-14">
                We evaluate the hosting provider, server location, and IP reputation to identify potential red flags typically associated with fraudulent websites.
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4">5</div>
                <h3 className="text-xl font-semibold">Content Analysis</h3>
              </div>
              <p className="text-gray-600 ml-14">
                Our system examines website content for suspicious patterns, harmful scripts, and phishing indicators that might suggest fraudulent intent.
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-4">6</div>
                <h3 className="text-xl font-semibold">Trust Score Calculation</h3>
              </div>
              <p className="text-gray-600 ml-14">
                We combine all these factors using our proprietary algorithm to generate a comprehensive trust score and detailed security recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Technology */}
      <div className="mb-20">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Globe className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Our Technology</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
          <p className="text-lg text-gray-600 mb-4">
            BrowseSafe leverages multiple API integrations with leading security providers to deliver comprehensive website analysis:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600 space-y-2">
            <li><span className="font-semibold">VirusTotal API:</span> Checks websites against 70+ antivirus scanners and URL/domain blacklisting services</li>
            <li><span className="font-semibold">Google Safe Browsing API:</span> Identifies websites that Google has flagged as unsafe</li>
            <li><span className="font-semibold">AbuseIPDB:</span> Checks if hosting IPs have been reported for abusive or malicious activity</li>
            <li><span className="font-semibold">WHOIS Database:</span> Retrieves domain registration information to verify legitimacy</li>
            <li><span className="font-semibold">SSL Certificate Analyzers:</span> Verifies the security and validity of website encryption</li>
          </ul>
          <p className="text-lg text-gray-600">
            Our technology continuously evolves, with our team regularly updating our algorithms to detect new scamming techniques and threat vectors as they emerge.
          </p>
        </div>
      </div>

      {/* Why Choose TrustGuard */}
      <div>
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Award className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Why Choose BrowseSafe</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Comprehensive Analysis</h3>
            <p className="text-gray-600">
              We evaluate websites across multiple security factors to provide a complete risk assessment.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Real-time Results</h3>
            <p className="text-gray-600">
              Get instant security assessments with detailed explanations of potential threats.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">User-Friendly</h3>
            <p className="text-gray-600">
              Complex security information presented in an easy-to-understand format for all users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}