import { Helmet } from "react-helmet";
import { ShieldCheck, Lock, AlertTriangle, Eye, Globe, CreditCard, Key, FileWarning, Users, Link2, SmartphoneCharging } from "lucide-react";

export default function OnlineSafetyGuide() {
  return (
    <>
      <Helmet>
        <title>Online Safety Guide | BrowseSafe</title>
        <meta 
          name="description" 
          content="Learn essential online safety tips, how to recognize scams, protect your personal information, and browse the web securely. Get practical advice on safe online shopping, password security, and more."
        />
        <meta
          name="keywords"
          content="online safety, internet security, cybersecurity tips, phishing prevention, secure browsing, password protection, scam detection, safe online shopping, data privacy"
        />
      </Helmet>
      
      <div className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="mx-auto text-center mb-8">
              {/* Icon with particle effects */}
              <div className="inline-block relative mb-6">
                <div className="absolute -inset-6 bg-violet-500/10 rounded-full blur-xl"></div>
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full shadow-lg">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  {/* Small decorative dots */}
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-purple-400 rounded-full animate-pulse"></span>
                  <span className="absolute -bottom-1 -left-1 h-2 w-2 bg-violet-300 rounded-full animate-ping"></span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-transparent bg-clip-text">
              Online Safety Guide
            </h1>
            
            {/* Decorative underline */}
            <div className="w-32 h-1.5 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full mx-auto mb-6"></div>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Essential knowledge and practical tips to help you stay safe online, protect your personal information, and avoid common internet scams and threats.
            </p>
          </div>
          
          {/* Table of Contents */}
          <div className="mb-12 bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">In This Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <a href="#recognizing-scams" className="flex items-center p-3 rounded-lg hover:bg-indigo-50 transition-colors">
                <AlertTriangle className="w-5 h-5 text-orange-500 mr-3" />
                <span>Recognizing Online Scams</span>
              </a>
              <a href="#secure-browsing" className="flex items-center p-3 rounded-lg hover:bg-indigo-50 transition-colors">
                <Globe className="w-5 h-5 text-blue-500 mr-3" />
                <span>Secure Browsing Practices</span>
              </a>
              <a href="#password-security" className="flex items-center p-3 rounded-lg hover:bg-indigo-50 transition-colors">
                <Key className="w-5 h-5 text-green-500 mr-3" />
                <span>Password Security</span>
              </a>
              <a href="#safe-shopping" className="flex items-center p-3 rounded-lg hover:bg-indigo-50 transition-colors">
                <CreditCard className="w-5 h-5 text-purple-500 mr-3" />
                <span>Safe Online Shopping</span>
              </a>
              <a href="#privacy-protection" className="flex items-center p-3 rounded-lg hover:bg-indigo-50 transition-colors">
                <Eye className="w-5 h-5 text-indigo-500 mr-3" />
                <span>Privacy Protection</span>
              </a>
              <a href="#device-security" className="flex items-center p-3 rounded-lg hover:bg-indigo-50 transition-colors">
                <SmartphoneCharging className="w-5 h-5 text-red-500 mr-3" />
                <span>Device Security</span>
              </a>
            </div>
          </div>
          
          {/* Recognizing Online Scams Section */}
          <section id="recognizing-scams" className="mb-20">
            <div className="flex items-center mb-6">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Recognizing Online Scams</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
              <p className="text-lg text-gray-600 mb-6">
                Cybercriminals are constantly developing sophisticated scams to steal personal information or money. Being able to identify the warning signs is your first line of defense.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Common Types of Online Scams</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                  <h4 className="font-bold text-lg mb-2 text-orange-700">Phishing Attacks</h4>
                  <p className="text-gray-700">
                    Fraudulent attempts to obtain sensitive information by disguising as a trustworthy entity. These often arrive as emails claiming to be from banks, payment processors, or popular services.
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold text-orange-700 mb-2">Warning Signs:</p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Urgent calls to action ("Your account will be suspended")</li>
                      <li>Sender email addresses that don't match the claimed organization</li>
                      <li>Poor grammar and spelling errors</li>
                      <li>Requests for personal information or login credentials</li>
                      <li>Links that lead to suspicious URLs</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                  <h4 className="font-bold text-lg mb-2 text-red-700">Fake Shopping Websites</h4>
                  <p className="text-gray-700">
                    Fake e-commerce sites designed to steal payment information or sell counterfeit goods. These sites often advertise popular items at unusually low prices.
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold text-red-700 mb-2">Warning Signs:</p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Prices that seem too good to be true</li>
                      <li>Recently registered domain names (less than 6 months old)</li>
                      <li>No physical address or contact information</li>
                      <li>No SSL certificate (missing https or padlock icon)</li>
                      <li>Poor website design and broken functionality</li>
                      <li>Limited payment options (especially wire transfers only)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
                  <h4 className="font-bold text-lg mb-2 text-yellow-700">Tech Support Scams</h4>
                  <p className="text-gray-700">
                    Scammers pose as tech support agents from well-known companies claiming your device is infected with malware or has technical issues.
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold text-yellow-700 mb-2">Warning Signs:</p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Unsolicited calls about computer problems</li>
                      <li>Pop-up warnings with phone numbers to call</li>
                      <li>Requests for remote access to your device</li>
                      <li>Pressure to buy unnecessary software or services</li>
                      <li>Demands for payment via gift cards or wire transfers</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h4 className="font-bold text-lg mb-2 text-blue-700">Investment Scams</h4>
                  <p className="text-gray-700">
                    Fraudulent investment opportunities promising high returns with little or no risk, often involving cryptocurrency, forex trading, or real estate.
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold text-blue-700 mb-2">Warning Signs:</p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Guaranteed returns or "risk-free" investments</li>
                      <li>Pressure to "act fast" to not miss opportunities</li>
                      <li>Unregistered investment professionals</li>
                      <li>Complex strategies that can't be explained clearly</li>
                      <li>Difficulty withdrawing money once invested</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-5 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100">
                <h3 className="flex items-center text-xl font-semibold mb-3 text-orange-800">
                  <FileWarning className="h-5 w-5 mr-2" />
                  Best Practice: Verify Before Trusting
                </h3>
                <p className="text-gray-700">
                  Always independently verify any communication requesting personal information or money. Contact the organization directly using their official contact information—not the contact details provided in the suspicious message. Use BrowseSafe's website scanner to check if an unfamiliar website is legitimate before sharing any information.
                </p>
              </div>
            </div>
          </section>
          
          {/* Secure Browsing Practices Section */}
          <section id="secure-browsing" className="mb-20">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Secure Browsing Practices</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
              <p className="text-lg text-gray-600 mb-6">
                How you browse the internet significantly impacts your online security. Follow these practices to minimize risks while navigating the web.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-700">Look for HTTPS</h3>
                    <p className="text-gray-700">
                      Always check that websites use HTTPS (look for a padlock icon in your browser's address bar), especially when entering personal or financial information. HTTPS encrypts data between your browser and the website, protecting it from eavesdropping.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-700">Use Private Browsing When Needed</h3>
                    <p className="text-gray-700">
                      Private or incognito browsing modes prevent your browser from saving your browsing history, cookies, site data, and information entered in forms. This is useful when using public computers or for sensitive research.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-700">Keep Browsers and Extensions Updated</h3>
                    <p className="text-gray-700">
                      Browser updates often include security patches for recently discovered vulnerabilities. Enable automatic updates for your browser and review installed extensions regularly, removing any you no longer use or don't recognize.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="font-bold text-blue-600">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-700">Be Cautious with Downloads</h3>
                    <p className="text-gray-700">
                      Only download files and applications from trusted sources. Verify the website is legitimate before downloading anything, and scan downloads with antivirus software before opening them, even if they appear to come from a trusted source.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="font-bold text-blue-600">5</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-700">Consider Using a VPN</h3>
                    <p className="text-gray-700">
                      A Virtual Private Network (VPN) encrypts your internet connection, protecting your data when using public Wi-Fi networks. This helps prevent hackers from intercepting your information when you're connected to public networks in places like cafes, airports, or hotels.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-xl font-semibold mb-4 text-blue-700">Recommended Security Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                    <h4 className="font-bold mb-2 text-blue-700">Ad Blockers</h4>
                    <p className="text-gray-700">
                      Block intrusive advertisements that could potentially contain malware. Popular options include uBlock Origin and AdBlock Plus.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                    <h4 className="font-bold mb-2 text-blue-700">Script Blockers</h4>
                    <p className="text-gray-700">
                      Control which scripts can run on websites you visit. Tools like NoScript or uMatrix provide granular control over website content.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                    <h4 className="font-bold mb-2 text-blue-700">Website Safety Checkers</h4>
                    <p className="text-gray-700">
                      Use BrowseSafe's website scanner before visiting unfamiliar websites to evaluate their security posture and reputation.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                    <h4 className="font-bold mb-2 text-blue-700">Password Managers</h4>
                    <p className="text-gray-700">
                      Generate and store complex, unique passwords for all your accounts, reducing the risk of credential-based attacks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Password Security Section */}
          <section id="password-security" className="mb-20">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Key className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Password Security</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
              <p className="text-lg text-gray-600 mb-6">
                Strong password practices are fundamental to online security. A single compromised password can lead to multiple account breaches if you reuse passwords across services.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-700">Creating Strong Passwords</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-green-600">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700"><span className="font-semibold">Length:</span> Use at least 12 characters—the longer, the better.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-green-600">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700"><span className="font-semibold">Complexity:</span> Include a mix of uppercase and lowercase letters, numbers, and special characters.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-green-600">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700"><span className="font-semibold">Uniqueness:</span> Use different passwords for different accounts, especially for email, banking, and other sensitive services.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-green-600">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700"><span className="font-semibold">Avoid personal information:</span> Don't use easily guessable information like birthdates, names of family members, or pet names.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-700">Password Management Best Practices</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-green-600">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700"><span className="font-semibold">Use a password manager:</span> Services like 1Password, LastPass, or Bitwarden can generate and store complex passwords securely.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-green-600">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700"><span className="font-semibold">Enable two-factor authentication (2FA):</span> Add an extra layer of security beyond just passwords for your important accounts.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-green-600">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700"><span className="font-semibold">Regular updates:</span> Change passwords periodically, especially for critical accounts, and immediately if there's any suspicion of compromise.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-green-600">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700"><span className="font-semibold">Check for breaches:</span> Use services like Have I Been Pwned to check if your accounts have been compromised in data breaches.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <h3 className="text-xl font-semibold mb-4 text-green-700">The Passphrase Approach</h3>
                <p className="text-gray-700 mb-4">
                  Instead of trying to remember complex, hard-to-remember passwords, consider using passphrases—a sequence of random words that are easier to remember but still provide strong security.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-green-100">
                    <p className="font-mono text-gray-700 font-semibold">correct-horse-battery-staple</p>
                    <p className="text-sm text-gray-500 mt-2">Four random words</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-green-100">
                    <p className="font-mono text-gray-700 font-semibold">Ocean5-Violin-Jumper!</p>
                    <p className="text-sm text-gray-500 mt-2">Words with numbers and symbols</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-green-100">
                    <p className="font-mono text-gray-700 font-semibold">tR@vel*BOOK*coffee2023</p>
                    <p className="text-sm text-gray-500 mt-2">Modified words with varied capitalization</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm">
                  These examples are much stronger than typical "complex" passwords like "P@ssw0rd1" while being easier to remember.
                </p>
              </div>
            </div>
          </section>
          
          {/* Safe Online Shopping Section */}
          <section id="safe-shopping" className="mb-20">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Safe Online Shopping</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
              <p className="text-lg text-gray-600 mb-6">
                Online shopping offers convenience but comes with risks. Follow these guidelines to protect your financial information and avoid fraudulent sellers.
              </p>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                    <h3 className="text-xl font-semibold mb-4 text-purple-700">Before You Shop</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3">
                          <span className="font-semibold text-sm text-purple-600">1</span>
                        </div>
                        <p className="text-gray-700">Research unfamiliar retailers by checking independent reviews and trust scores.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3">
                          <span className="font-semibold text-sm text-purple-600">2</span>
                        </div>
                        <p className="text-gray-700">Verify website security using BrowseSafe's scanner, checking for HTTPS and examining the site's registration age.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3">
                          <span className="font-semibold text-sm text-purple-600">3</span>
                        </div>
                        <p className="text-gray-700">Be skeptical of deals that seem too good to be true—extraordinarily low prices are often signs of counterfeit goods or scams.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3">
                          <span className="font-semibold text-sm text-purple-600">4</span>
                        </div>
                        <p className="text-gray-700">Look for clear contact information, return policies, and physical addresses on the retailer's website.</p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                    <h3 className="text-xl font-semibold mb-4 text-purple-700">Payment Safety</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3">
                          <span className="font-semibold text-sm text-purple-600">1</span>
                        </div>
                        <p className="text-gray-700">Use credit cards rather than debit cards for better fraud protection and dispute options.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3">
                          <span className="font-semibold text-sm text-purple-600">2</span>
                        </div>
                        <p className="text-gray-700">Consider using virtual payment cards or services like PayPal that don't share your actual card details with merchants.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3">
                          <span className="font-semibold text-sm text-purple-600">3</span>
                        </div>
                        <p className="text-gray-700">Avoid payment methods with no protection, such as wire transfers, cryptocurrency, or gift cards.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5 mr-3">
                          <span className="font-semibold text-sm text-purple-600">4</span>
                        </div>
                        <p className="text-gray-700">Check your account statements regularly to catch unauthorized transactions quickly.</p>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                  <h3 className="flex items-center text-xl font-semibold mb-4 text-red-700">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Red Flags When Shopping Online
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
                      <p className="text-gray-700 font-semibold">No secure payment options</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
                      <p className="text-gray-700 font-semibold">Missing privacy policy or terms</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
                      <p className="text-gray-700 font-semibold">Poor quality product images</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
                      <p className="text-gray-700 font-semibold">Excessive shipping costs</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
                      <p className="text-gray-700 font-semibold">Unprofessional site design</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
                      <p className="text-gray-700 font-semibold">No customer reviews or all perfect 5-star reviews</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-purple-200 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4 text-purple-700">After Purchase Protection</h3>
                  <p className="text-gray-700 mb-4">
                    Keep all records of your online purchases, including order confirmations, receipts, and communication with the seller. These are essential if you need to file a dispute or report fraud.
                  </p>
                  <p className="text-gray-700">
                    If you believe you've been scammed, act quickly:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Contact your payment provider to dispute the charge</li>
                      <li>Report the incident to your country's consumer protection agency</li>
                      <li>Leave reviews warning other shoppers about your experience</li>
                      <li>Report the website through BrowseSafe's reporting feature</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Privacy Protection Section */}
          <section id="privacy-protection" className="mb-20">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <Eye className="h-8 w-8 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Privacy Protection</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
              <p className="text-lg text-gray-600 mb-6">
                Your personal data is valuable and worth protecting. Learn how to maintain your privacy online and control what information you share with websites and services.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-indigo-700">Managing Your Digital Footprint</h3>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-indigo-600">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Review Privacy Settings</h4>
                        <p className="text-gray-700">
                          Regularly check and update privacy settings on social media accounts, search engines, and email services. Limit who can see your posts and personal information.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-indigo-600">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Manage Cookies</h4>
                        <p className="text-gray-700">
                          Use browser settings to control cookies that track your online activities. Consider accepting only essential cookies and regularly clearing browsing data.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-indigo-600">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Be Selective with App Permissions</h4>
                        <p className="text-gray-700">
                          Only grant necessary permissions to mobile apps and web applications. Regularly review which apps have access to your location, contacts, camera, and microphone.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-indigo-700">Advanced Privacy Measures</h3>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-indigo-600">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Use Privacy-Focused Tools</h4>
                        <p className="text-gray-700">
                          Consider privacy-oriented browsers like Firefox or Brave, search engines like DuckDuckGo, and email providers with end-to-end encryption.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-indigo-600">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Enable Do Not Track</h4>
                        <p className="text-gray-700">
                          Turn on the "Do Not Track" feature in your browser, although be aware that websites aren't required to honor this request.
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-indigo-600">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Consider Data Removal Services</h4>
                        <p className="text-gray-700">
                          Services exist that can help remove your personal information from data broker websites that collect and sell your data.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">Social Media Privacy</h3>
                <p className="text-gray-700 mb-4">
                  Social media platforms are designed to encourage sharing, but oversharing can lead to privacy and security issues:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5 mr-3">
                      <AlertTriangle className="h-3 w-3 text-indigo-600" />
                    </div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Avoid sharing identifiable information</span> such as your full birth date, address, phone number, or when you'll be away from home.
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5 mr-3">
                      <AlertTriangle className="h-3 w-3 text-indigo-600" />
                    </div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Think before you post</span> – consider the long-term implications of your content, as even deleted posts might exist in archives or screenshots.
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5 mr-3">
                      <AlertTriangle className="h-3 w-3 text-indigo-600" />
                    </div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Review tagged photos</span> and enable the option to review tags before they appear on your profile.
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5 mr-3">
                      <AlertTriangle className="h-3 w-3 text-indigo-600" />
                    </div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Be cautious with quizzes and apps</span> that require access to your profile—they can collect more data than you might expect.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Device Security Section */}
          <section id="device-security" className="mb-20">
            <div className="flex items-center mb-6">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <SmartphoneCharging className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Device Security</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
              <p className="text-lg text-gray-600 mb-6">
                Your devices store valuable personal information and provide access to your online accounts. Keeping them secure is an essential part of your overall online security.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                  <h3 className="text-xl font-semibold mb-4 text-red-700">Computer Security</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-red-600">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700 font-semibold">Keep software updated</p>
                        <p className="text-gray-600 text-sm">Enable automatic updates for your operating system, applications, and antivirus software to patch security vulnerabilities.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-red-600">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700 font-semibold">Use antivirus and anti-malware protection</p>
                        <p className="text-gray-600 text-sm">Install reputable security software and perform regular scans to detect and remove malicious software.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-red-600">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700 font-semibold">Enable firewall protection</p>
                        <p className="text-gray-600 text-sm">Firewalls monitor network traffic and block suspicious connections to protect against unauthorized access.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-red-600">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700 font-semibold">Secure your Wi-Fi network</p>
                        <p className="text-gray-600 text-sm">Use WPA3 encryption if available, create a strong network password, and change the default admin credentials on your router.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                  <h3 className="text-xl font-semibold mb-4 text-orange-700">Mobile Device Security</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-orange-600">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700 font-semibold">Use screen locks and biometric protection</p>
                        <p className="text-gray-600 text-sm">Protect your phone with a strong PIN, pattern, password, or biometric authentication (fingerprint, face recognition).</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-orange-600">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700 font-semibold">Only download apps from official sources</p>
                        <p className="text-gray-600 text-sm">Stick to the Google Play Store or Apple App Store to reduce the risk of installing malicious applications.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-orange-600">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700 font-semibold">Enable remote tracking and wiping</p>
                        <p className="text-gray-600 text-sm">Configure features like Find My iPhone or Find My Device to locate, lock, or erase your device if it's lost or stolen.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5 mr-3">
                        <span className="font-semibold text-sm text-orange-600">✓</span>
                      </div>
                      <div>
                        <p className="text-gray-700 font-semibold">Be cautious with public charging stations</p>
                        <p className="text-gray-600 text-sm">Use charging cables with data blockers or bring your own charger to avoid "juice jacking" attacks that can steal data through charging ports.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Data Backup Strategy</h3>
                <p className="text-gray-700 mb-4">
                  Protecting your data against loss is just as important as securing your devices. Implement a comprehensive backup strategy:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-2">3-2-1 Backup Rule</h4>
                    <p className="text-gray-600 text-sm">
                      Keep at least 3 copies of your data, on 2 different types of storage media, with 1 copy stored off-site or in the cloud.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-2">Automatic Backups</h4>
                    <p className="text-gray-600 text-sm">
                      Configure automated backups to ensure they happen regularly without manual intervention.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-2">Encrypted Backups</h4>
                    <p className="text-gray-600 text-sm">
                      Protect your backups with encryption, especially if they contain sensitive personal or financial information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Final CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 shadow-lg text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Protected Online</h2>
            <p className="text-lg text-blue-100 mb-6 max-w-3xl mx-auto">
              The digital landscape is constantly evolving, and so are the threats. Make online safety a priority by implementing these guidelines and regularly checking websites with TrustGuard before sharing any personal information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/" className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:bg-blue-50 transition-colors">
                Scan a Website Now
              </a>
              <a href="/how-it-works" className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-colors">
                Learn How TrustGuard Works
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}