import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/icons";
import { formatDate } from "@/lib/scan-utils";

interface TrustScoreCardProps {
  trustScore: number;
  domainAge?: string;
  whoisStatus?: string;
  sslStatus?: boolean;
  malwareStatus?: boolean;
  blacklistStatus?: string;
  userReports?: number;
  lastScanned: Date;
  status: "safe" | "suspicious" | "dangerous";
}

export default function TrustScoreCard({
  trustScore,
  domainAge = "Unknown",
  whoisStatus = "Unknown",
  sslStatus = false,
  malwareStatus = false,
  blacklistStatus = "Unknown",
  userReports = 0,
  lastScanned,
  status
}: TrustScoreCardProps) {
  // Helper function to determine the color and status icon based on score
  const getScoreIndicator = (score: number) => {
    if (score >= 80) return { color: "bg-success", icon: <CheckCircle className="h-4 w-4 text-success" /> };
    if (score >= 40) return { color: "bg-warning", icon: <AlertTriangle className="h-4 w-4 text-warning" /> };
    return { color: "bg-danger", icon: <XCircle className="h-4 w-4 text-danger" /> };
  };
  
  // Helper for score categories
  const getScoreCategory = (type: string, value: string | boolean | number) => {
    if (type === "domainAge") {
      if (value.toString().includes("years") && parseInt(value.toString()) >= 2) return "text-success";
      if (value.toString().includes("year")) return "text-warning";
      return "text-danger";
    }
    
    if (type === "whois") {
      return value === "Verified" ? "text-success" : "text-warning";
    }
    
    if (type === "ssl" || type === "malware") {
      return value ? "text-success" : "text-danger";
    }
    
    if (type === "blacklist") {
      return value === "Not blacklisted" ? "text-success" : "text-warning";
    }
    
    if (type === "userReports") {
      if (value === 0) return "text-success";
      if (typeof value === "number" && value < 5) return "text-accent-600";
      return "text-warning";
    }
    
    return "text-primary";
  };
  
  // Format the SSL status
  const formattedSslStatus = sslStatus ? "Valid" : "Invalid";
  
  // Format the malware status
  const formattedMalwareStatus = malwareStatus ? "Infected" : "Clean";
  
  // Format the WHOIS status
  const formattedWhoisStatus = whoisStatus === "Unknown" ? "Partially Verified" : whoisStatus;
  
  // Format user reports
  const formattedUserReports = userReports === 0 
    ? "No Reports" 
    : userReports === 1 
      ? "1 Report" 
      : `${userReports} Reports`;
  
  return (
    <Card className="bg-white rounded-xl shadow-md">
      <CardContent className="p-6">
        <h3 className="text-xl font-heading font-semibold mb-4">Trust Score</h3>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-4xl font-bold">{trustScore}</span>
              <span className="text-lg">/100</span>
            </div>
            
            <StatusBadge status={status} size="md" />
          </div>
          
          <div className="trust-score-indicator h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`trust-score-fill h-full ${getScoreIndicator(trustScore).color}`} 
              style={{ width: `${trustScore}%`, transition: "width 0.5s ease-in-out" }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Domain Age</span>
              <span className={`font-medium ${getScoreCategory("domainAge", domainAge)}`}>{domainAge}</span>
            </div>
            <div className="trust-score-indicator h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`trust-score-fill h-full ${domainAge.includes("years") && parseInt(domainAge) >= 2 ? "bg-success" : "bg-warning"}`} 
                style={{ width: `${domainAge.includes("years") ? (parseInt(domainAge) * 10 + 50) : 30}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>WHOIS Data</span>
              <span className={`font-medium ${getScoreCategory("whois", formattedWhoisStatus)}`}>{formattedWhoisStatus}</span>
            </div>
            <div className="trust-score-indicator h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`trust-score-fill h-full ${formattedWhoisStatus === "Verified" ? "bg-success" : "bg-warning"}`} 
                style={{ width: `${formattedWhoisStatus === "Verified" ? 95 : 60}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>SSL Certificate</span>
              <span className={`font-medium ${getScoreCategory("ssl", sslStatus)}`}>{formattedSslStatus}</span>
            </div>
            <div className="trust-score-indicator h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`trust-score-fill h-full ${sslStatus ? "bg-success" : "bg-danger"}`} 
                style={{ width: `${sslStatus ? 100 : 20}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Malware Detection</span>
              <span className={`font-medium ${getScoreCategory("malware", !malwareStatus)}`}>{formattedMalwareStatus}</span>
            </div>
            <div className="trust-score-indicator h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`trust-score-fill h-full ${!malwareStatus ? "bg-success" : "bg-danger"}`} 
                style={{ width: `${!malwareStatus ? 100 : 10}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Blacklist Status</span>
              <span className={`font-medium ${getScoreCategory("blacklist", blacklistStatus)}`}>
                {blacklistStatus.includes("Not") ? "Not Listed" : "Listed"}
              </span>
            </div>
            <div className="trust-score-indicator h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`trust-score-fill h-full ${blacklistStatus.includes("Not") ? "bg-success" : "bg-warning"}`} 
                style={{ width: `${blacklistStatus.includes("Not") ? 100 : 30}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>User Reports</span>
              <span className={`font-medium ${getScoreCategory("userReports", userReports)}`}>{formattedUserReports}</span>
            </div>
            <div className="trust-score-indicator h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`trust-score-fill h-full ${
                  userReports === 0 ? "bg-success" : userReports < 5 ? "bg-accent-500" : "bg-warning"
                }`} 
                style={{ width: `${100 - (userReports * 5)}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-primary-500">
          <p>Last updated: <span>{formatDate(lastScanned)}</span></p>
        </div>
      </CardContent>
    </Card>
  );
}
