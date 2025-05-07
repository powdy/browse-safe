import { CheckCircle, AlertTriangle, XCircle, Shield, ShieldAlert, ShieldX } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/icons";
import { formatDate } from "@/lib/scan-utils";
import ThreatLevelIndicator from "./ThreatLevelIndicator";

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
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="mr-3 relative">
                {/* Circular progress indicator */}
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center relative">
                  {/* Circular background */}
                  <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#f0f0f0" 
                      strokeWidth="8"
                    />
                    {/* Foreground circle with stroke-dasharray animation */}
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke={trustScore >= 80 ? "#10b981" : trustScore >= 40 ? "#f59e0b" : "#ef4444"} 
                      strokeWidth="8" 
                      strokeLinecap="round"
                      strokeDasharray={`${trustScore * 2.83}, 1000`} 
                      transform="rotate(-90 50 50)"
                      style={{ transition: "stroke-dasharray 0.8s ease-in-out" }}
                    />
                  </svg>
                  {/* Score number */}
                  <div className="z-10 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold">{trustScore}</span>
                    <span className="text-xs text-gray-500">/100</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-lg font-medium">Trust Score</span>
                <span className="text-sm text-gray-500">
                  {status === "safe" ? "Trustworthy" : status === "suspicious" ? "Needs Caution" : "Potentially Harmful"}
                </span>
              </div>
            </div>
            
            <StatusBadge status={status} size="lg" />
          </div>
          
          {/* Gradient progress bar */}
          <div className="trust-score-indicator h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="trust-score-fill h-full" 
              style={{ 
                width: `${trustScore}%`, 
                transition: "width 0.5s ease-in-out",
                background: `linear-gradient(90deg, 
                  ${trustScore >= 80 ? 'var(--green-400)' : trustScore >= 40 ? 'var(--yellow-400)' : 'var(--red-400)'} 0%, 
                  ${trustScore >= 80 ? 'var(--green-600)' : trustScore >= 40 ? 'var(--yellow-600)' : 'var(--red-600)'} 100%)`,
              }}
            ></div>
          </div>
        </div>
        
        {/* Enhanced Threat Level Indicator */}
        <div className="mb-6 p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-sm border border-gray-100">
          <div className="flex gap-3 items-center mb-3">
            {status === "safe" ? (
              <Shield className="h-6 w-6 text-green-600" />
            ) : status === "suspicious" ? (
              <ShieldAlert className="h-6 w-6 text-yellow-600" />
            ) : (
              <ShieldX className="h-6 w-6 text-red-600" />
            )}
            <h4 className="font-semibold text-lg">Threat Analysis</h4>
          </div>
          <ThreatLevelIndicator trustScore={trustScore} showLabel={true} size="lg" />
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold mb-2">Security Factors</h4>
          
          {/* Domain Age */}
          <div className="p-3 rounded-lg bg-white border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center text-sm mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${domainAge.includes("years") && parseInt(domainAge) >= 2 ? "bg-green-600" : domainAge === "Unknown" ? "bg-gray-400" : "bg-yellow-500"}`}></div>
                <span className="font-medium">Domain Age</span>
              </div>
              <span className={`font-medium ${getScoreCategory("domainAge", domainAge)}`}>{domainAge}</span>
            </div>
            <div className="trust-score-indicator h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="trust-score-fill h-full" 
                style={{ 
                  width: domainAge === "Unknown" ? "30%" : `${domainAge.includes("years") ? (parseInt(domainAge) * 10 + 50) : 30}%`,
                  background: domainAge.includes("years") && parseInt(domainAge) >= 2 
                    ? "linear-gradient(90deg, var(--green-400) 0%, var(--green-600) 100%)" 
                    : domainAge === "Unknown"
                      ? "linear-gradient(90deg, var(--gray-300) 0%, var(--gray-500) 100%)"
                      : "linear-gradient(90deg, var(--yellow-300) 0%, var(--yellow-500) 100%)"
                }}
              ></div>
            </div>
          </div>
          
          {/* WHOIS Data */}
          <div className="p-3 rounded-lg bg-white border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center text-sm mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${formattedWhoisStatus === "Verified" ? "bg-green-600" : formattedWhoisStatus === "Unknown" ? "bg-gray-400" : "bg-yellow-500"}`}></div>
                <span className="font-medium">WHOIS Data</span>
              </div>
              <span className={`font-medium ${getScoreCategory("whois", formattedWhoisStatus)}`}>{formattedWhoisStatus}</span>
            </div>
            <div className="trust-score-indicator h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="trust-score-fill h-full" 
                style={{ 
                  width: `${formattedWhoisStatus === "Verified" ? 95 : formattedWhoisStatus === "Unknown" ? 30 : 60}%`,
                  background: formattedWhoisStatus === "Verified" 
                    ? "linear-gradient(90deg, var(--green-400) 0%, var(--green-600) 100%)" 
                    : formattedWhoisStatus === "Unknown"
                      ? "linear-gradient(90deg, var(--gray-300) 0%, var(--gray-500) 100%)"
                      : "linear-gradient(90deg, var(--yellow-300) 0%, var(--yellow-500) 100%)"
                }}
              ></div>
            </div>
          </div>
          
          {/* SSL Certificate */}
          <div className="p-3 rounded-lg bg-white border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center text-sm mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${sslStatus ? "bg-green-600" : "bg-red-600"}`}></div>
                <span className="font-medium">SSL Certificate</span>
              </div>
              <span className={`font-medium ${getScoreCategory("ssl", sslStatus)}`}>{formattedSslStatus}</span>
            </div>
            <div className="trust-score-indicator h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="trust-score-fill h-full" 
                style={{ 
                  width: `${sslStatus ? 100 : 20}%`,
                  background: sslStatus 
                    ? "linear-gradient(90deg, var(--green-400) 0%, var(--green-600) 100%)" 
                    : "linear-gradient(90deg, var(--red-400) 0%, var(--red-600) 100%)"
                }}
              ></div>
            </div>
          </div>
          
          {/* Malware Detection */}
          <div className="p-3 rounded-lg bg-white border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center text-sm mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${!malwareStatus ? "bg-green-600" : "bg-red-600"}`}></div>
                <span className="font-medium">Malware Detection</span>
              </div>
              <span className={`font-medium ${getScoreCategory("malware", !malwareStatus)}`}>{formattedMalwareStatus}</span>
            </div>
            <div className="trust-score-indicator h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="trust-score-fill h-full" 
                style={{ 
                  width: `${!malwareStatus ? 100 : 10}%`,
                  background: !malwareStatus 
                    ? "linear-gradient(90deg, var(--green-400) 0%, var(--green-600) 100%)" 
                    : "linear-gradient(90deg, var(--red-400) 0%, var(--red-600) 100%)"
                }}
              ></div>
            </div>
          </div>
          
          {/* Blacklist Status */}
          <div className="p-3 rounded-lg bg-white border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center text-sm mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${blacklistStatus.includes("Not") ? "bg-green-600" : "bg-yellow-500"}`}></div>
                <span className="font-medium">Blacklist Status</span>
              </div>
              <span className={`font-medium ${getScoreCategory("blacklist", blacklistStatus)}`}>
                {blacklistStatus.includes("Not") ? "Not Listed" : "Listed"}
              </span>
            </div>
            <div className="trust-score-indicator h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="trust-score-fill h-full" 
                style={{ 
                  width: `${blacklistStatus.includes("Not") ? 100 : 30}%`,
                  background: blacklistStatus.includes("Not") 
                    ? "linear-gradient(90deg, var(--green-400) 0%, var(--green-600) 100%)" 
                    : "linear-gradient(90deg, var(--yellow-300) 0%, var(--yellow-500) 100%)"
                }}
              ></div>
            </div>
          </div>
          
          {/* User Reports */}
          <div className="p-3 rounded-lg bg-white border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center text-sm mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  userReports === 0 ? "bg-green-600" : userReports < 5 ? "bg-yellow-500" : "bg-red-600"
                }`}></div>
                <span className="font-medium">User Reports</span>
              </div>
              <span className={`font-medium ${getScoreCategory("userReports", userReports)}`}>{formattedUserReports}</span>
            </div>
            <div className="trust-score-indicator h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="trust-score-fill h-full" 
                style={{ 
                  width: `${100 - (userReports * 5)}%`,
                  background: userReports === 0 
                    ? "linear-gradient(90deg, var(--green-400) 0%, var(--green-600) 100%)" 
                    : userReports < 5 
                      ? "linear-gradient(90deg, var(--yellow-300) 0%, var(--yellow-500) 100%)"
                      : "linear-gradient(90deg, var(--red-400) 0%, var(--red-600) 100%)"
                }}
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
