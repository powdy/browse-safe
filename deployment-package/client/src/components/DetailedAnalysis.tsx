import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DetailedAnalysisProps {
  domainInfo: {
    domainName: string;
    registrationDate: string;
    domainAge: string;
    expirationDate: string;
    registrar: string;
    registrantCountry: string;
  };
  technicalInfo: {
    ipAddress: string;
    ipLocation: string;
    nameServers: string;
    hasValidSSL: boolean;
    hasDNSSEC: boolean;
    hasSecurityHeaders: boolean;
  };
  contentAnalysis: {
    hasMalware: boolean;
    hasPhishing: boolean;
    blacklistStatus: string;
    suspiciousPatterns: string;
    userReports: number;
    relatedSites: number;
  };
}

export default function DetailedAnalysis({
  domainInfo,
  technicalInfo,
  contentAnalysis
}: DetailedAnalysisProps) {
  return (
    <div className="space-y-6">
      {/* Domain Info Card */}
      <Card className="bg-white rounded-xl shadow-md">
        <CardContent className="p-6">
          <h3 className="text-xl font-heading font-semibold mb-4">Domain Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <h4 className="text-sm text-primary-500 mb-1">Domain Name</h4>
              <p className="font-medium">{domainInfo.domainName}</p>
            </div>
            
            <div>
              <h4 className="text-sm text-primary-500 mb-1">Registration Date</h4>
              <p className="font-medium">{domainInfo.registrationDate}</p>
            </div>
            
            <div>
              <h4 className="text-sm text-primary-500 mb-1">Domain Age</h4>
              <p className={`font-medium ${
                domainInfo.domainAge.includes("years") && parseInt(domainInfo.domainAge) >= 2 
                  ? "text-success" 
                  : "text-warning"
              }`}>
                {domainInfo.domainAge}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm text-primary-500 mb-1">Expiration Date</h4>
              <p className="font-medium">{domainInfo.expirationDate}</p>
            </div>
            
            <div>
              <h4 className="text-sm text-primary-500 mb-1">Registrar</h4>
              <p className="font-medium">{domainInfo.registrar}</p>
            </div>
            
            <div>
              <h4 className="text-sm text-primary-500 mb-1">Registrant Country</h4>
              <p className="font-medium">{domainInfo.registrantCountry}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm text-primary-500 mb-2">Risk Assessment</h4>
            <p className="text-sm">
              {domainInfo.domainAge.includes("years") && parseInt(domainInfo.domainAge) >= 2 
                ? `This domain has been registered for over ${parseInt(domainInfo.domainAge)} years, which is a positive sign. Established domains are less likely to be fraudulent compared to newly registered domains.`
                : `This domain is relatively new (${domainInfo.domainAge}). Newer domains should be approached with more caution, especially when they request personal or financial information.`
              }
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Technical Analysis Card */}
      <Card className="bg-white rounded-xl shadow-md">
        <CardContent className="p-6">
          <h3 className="text-xl font-heading font-semibold mb-4">Technical Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <h4 className="text-sm text-primary-500 mb-1">IP Address</h4>
              <p className="font-medium">{technicalInfo.ipAddress}</p>
            </div>
            
            <div>
              <h4 className="text-sm text-primary-500 mb-1">IP Location</h4>
              <p className="font-medium">{technicalInfo.ipLocation}</p>
            </div>
            
            <div>
              <h4 className="text-sm text-primary-500 mb-1">Name Servers</h4>
              {technicalInfo.nameServers.split(',').map((server, index) => (
                <p key={index} className="font-medium">{server.trim()}</p>
              ))}
            </div>
            
            <div>
              <h4 className="text-sm text-primary-500 mb-1">SSL Certificate</h4>
              <div className="flex items-center">
                {technicalInfo.hasValidSSL 
                  ? <CheckCircle className="text-success mr-2 h-4 w-4" />
                  : <XCircle className="text-danger mr-2 h-4 w-4" />
                }
                <p className="font-medium">
                  {technicalInfo.hasValidSSL ? "Valid (SHA-256 with RSA)" : "Invalid or Missing"}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-primary-500 mb-1">DNSSEC</h4>
              <div className="flex items-center">
                {technicalInfo.hasDNSSEC 
                  ? <CheckCircle className="text-success mr-2 h-4 w-4" />
                  : <XCircle className="text-danger mr-2 h-4 w-4" />
                }
                <p className="font-medium">
                  {technicalInfo.hasDNSSEC ? "Enabled" : "Disabled"}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-primary-500 mb-1">HTTP Security Headers</h4>
              <div className="flex items-center">
                {technicalInfo.hasSecurityHeaders 
                  ? <CheckCircle className="text-success mr-2 h-4 w-4" />
                  : <AlertTriangle className="text-warning mr-2 h-4 w-4" />
                }
                <p className="font-medium">
                  {technicalInfo.hasSecurityHeaders ? "Fully Implemented" : "Partially Implemented"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm text-primary-500 mb-2">Risk Assessment</h4>
            <p className="text-sm">
              {technicalInfo.hasValidSSL 
                ? "The website uses proper SSL encryption"
                : "The website lacks proper SSL encryption, which is a security concern"
              }
              {technicalInfo.hasDNSSEC ? " and has DNSSEC enabled," : ", but doesn't use DNSSEC,"}
              {" which "}
              {(technicalInfo.hasValidSSL && technicalInfo.hasDNSSEC) ? "are good security practices." : "indicates potential security issues."}
              {technicalInfo.hasSecurityHeaders 
                ? " All recommended HTTP security headers are properly implemented."
                : " Some recommended HTTP security headers are missing, which could be improved."
              }
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Content Analysis Card */}
      <Card className="bg-white rounded-xl shadow-md">
        <CardContent className="p-6">
          <h3 className="text-xl font-heading font-semibold mb-4">Content Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <h4 className="text-sm text-primary-500 mb-1">Malware Detection</h4>
              <div className="flex items-center">
                {!contentAnalysis.hasMalware 
                  ? <CheckCircle className="text-success mr-2 h-4 w-4" />
                  : <XCircle className="text-danger mr-2 h-4 w-4" />
                }
                <p className="font-medium">
                  {contentAnalysis.hasMalware ? "Malware Detected" : "No Malware Detected"}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-primary-500 mb-1">Phishing Detection</h4>
              <div className="flex items-center">
                {!contentAnalysis.hasPhishing 
                  ? <CheckCircle className="text-success mr-2 h-4 w-4" />
                  : <XCircle className="text-danger mr-2 h-4 w-4" />
                }
                <p className="font-medium">
                  {contentAnalysis.hasPhishing ? "Phishing Detected" : "No Phishing Detected"}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-primary-500 mb-1">Blacklist Status</h4>
              <div className="flex items-center">
                {contentAnalysis.blacklistStatus.includes("Not") 
                  ? <CheckCircle className="text-success mr-2 h-4 w-4" />
                  : <AlertTriangle className="text-warning mr-2 h-4 w-4" />
                }
                <p className="font-medium">{contentAnalysis.blacklistStatus}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-primary-500 mb-1">Suspicious Patterns</h4>
              <div className="flex items-center">
                {contentAnalysis.suspiciousPatterns === "None" 
                  ? <CheckCircle className="text-success mr-2 h-4 w-4" />
                  : <AlertTriangle className="text-warning mr-2 h-4 w-4" />
                }
                <p className="font-medium">{contentAnalysis.suspiciousPatterns}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-primary-500 mb-1">User Reports</h4>
              <p className="font-medium">
                {contentAnalysis.userReports === 0 
                  ? "No reports" 
                  : contentAnalysis.userReports === 1 
                    ? "1 report in the last 30 days"
                    : `${contentAnalysis.userReports} reports in the last 30 days`
                }
              </p>
            </div>
            
            <div>
              <h4 className="text-sm text-primary-500 mb-1">Related Sites</h4>
              <p className="font-medium">
                {contentAnalysis.relatedSites === 0 
                  ? "No similar domains detected" 
                  : contentAnalysis.relatedSites === 1 
                    ? "1 similar domain detected"
                    : `${contentAnalysis.relatedSites} similar domains detected`
                }
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm text-primary-500 mb-2">Risk Assessment</h4>
            <p className="text-sm">
              {!contentAnalysis.hasMalware && !contentAnalysis.hasPhishing 
                ? "The website content appears to be legitimate with no malware or phishing attempts detected."
                : contentAnalysis.hasMalware && contentAnalysis.hasPhishing
                  ? "The website has serious security issues with both malware and phishing detected. It is highly recommended to avoid this site."
                  : contentAnalysis.hasMalware
                    ? "The website appears to contain malware, which poses a significant security risk."
                    : "The website appears to contain phishing content, which is designed to steal sensitive information."
              }
              {" "}
              {contentAnalysis.blacklistStatus.includes("Not")
                ? "The site is not blacklisted on any security services."
                : "The site appears on security blacklists, indicating potential security risks."
              }
              {contentAnalysis.userReports > 0 
                ? ` There ${contentAnalysis.userReports === 1 ? 'is' : 'are'} ${contentAnalysis.userReports} user report${contentAnalysis.userReports === 1 ? '' : 's'} for this site, which should be considered.`
                : " No users have reported issues with this site."
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
