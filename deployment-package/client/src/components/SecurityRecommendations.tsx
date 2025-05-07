import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Shield, Flag } from "lucide-react";
import { Link } from "wouter";

interface SecurityRecommendationsProps {
  domainName: string;
  trustScore: number;
  status: "safe" | "suspicious" | "dangerous";
  hasEstablishedDomain: boolean;
  hasValidSSL: boolean;
  hasMalware: boolean;
  hasBlacklistIssues: boolean;
}

export default function SecurityRecommendations({
  domainName,
  trustScore,
  status,
  hasEstablishedDomain,
  hasValidSSL,
  hasMalware,
  hasBlacklistIssues
}: SecurityRecommendationsProps) {
  return (
    <Card className="mt-8 bg-white rounded-xl shadow-md">
      <CardContent className="p-6">
        <h3 className="text-xl font-heading font-semibold mb-4">Security Recommendations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium mb-2">What This Means</h4>
            <p className="text-primary-700 mb-4">
              {status === "safe" 
                ? `Based on our analysis, ${domainName} appears to be a legitimate website with good security practices.`
                : status === "suspicious"
                  ? `Based on our analysis, ${domainName} has some concerning security issues that warrant caution.`
                  : `Based on our analysis, ${domainName} appears to be dangerous and should be avoided.`
              }
              {status !== "dangerous" && " However, there are a few issues that could be addressed."}
            </p>
            
            {hasEstablishedDomain && (
              <div className="flex items-start space-x-3 mb-3">
                <div className="text-success mt-0.5">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-medium">Established Domain</h5>
                  <p className="text-sm text-primary-600">The domain has been registered for several years, which reduces the likelihood of it being a scam site.</p>
                </div>
              </div>
            )}
            
            {hasValidSSL && (
              <div className="flex items-start space-x-3 mb-3">
                <div className="text-success mt-0.5">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-medium">Valid SSL Certificate</h5>
                  <p className="text-sm text-primary-600">The site uses proper encryption, helping to protect your data during transmission.</p>
                </div>
              </div>
            )}
            
            {hasMalware && (
              <div className="flex items-start space-x-3 mb-3">
                <div className="text-danger mt-0.5">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-medium">Malware Detected</h5>
                  <p className="text-sm text-primary-600">Our scan detected malware on this website, which is a serious security concern.</p>
                </div>
              </div>
            )}
            
            {hasBlacklistIssues && (
              <div className="flex items-start space-x-3">
                <div className="text-warning mt-0.5">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-medium">Blacklist Issues</h5>
                  <p className="text-sm text-primary-600">The domain appears on one or more blacklists, which could indicate past security issues.</p>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-2">Browsing Recommendations</h4>
            
            <div className="flex items-start space-x-3 mb-3">
              <div className="text-accent-600 mt-0.5">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-medium">Use Caution with Personal Information</h5>
                <p className="text-sm text-primary-600">
                  {status === "safe" 
                    ? "While the site appears legitimate, always be cautious when sharing sensitive personal or financial information."
                    : status === "suspicious"
                      ? "Due to some security concerns, be extremely careful when sharing any personal information with this site."
                      : "Do not share any personal or financial information with this site as it appears to be malicious."
                  }
                </p>
              </div>
            </div>
            
            {status !== "dangerous" && (
              <div className="flex items-start space-x-3 mb-3">
                <div className="text-accent-600 mt-0.5">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="font-medium">Check Return Policy</h5>
                  <p className="text-sm text-primary-600">If making a purchase, review the site's return policy and contact information for legitimacy.</p>
                </div>
              </div>
            )}
            
            <div className="flex items-start space-x-3">
              <div className="text-accent-600 mt-0.5">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h5 className="font-medium">Use Secure Payment Methods</h5>
                <p className="text-sm text-primary-600">
                  {status === "dangerous" 
                    ? "We strongly advise against making any purchases from this site due to security concerns."
                    : "When possible, use payment methods that offer buyer protection, such as credit cards or PayPal."
                  }
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <Link href="/report">
                <Button className="bg-primary-900 hover:bg-primary-800 text-white font-medium">
                  <Flag className="mr-1 h-4 w-4" /> Report This Website
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
