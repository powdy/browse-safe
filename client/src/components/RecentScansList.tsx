import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { Link } from "wouter";
import { StatusBadge } from "@/components/icons";
import { formatTimeAgo } from "@/lib/scan-utils";
import type { Scan } from "@shared/schema";

interface ScanCardProps {
  scan: Scan;
}

function ScanCard({ scan }: ScanCardProps) {
  // Determine gradient colors based on trust score
  const getGradientColors = () => {
    if (scan.trustScore >= 80) return 'from-green-400 to-emerald-600'; // Safe
    if (scan.trustScore >= 40) return 'from-yellow-400 to-amber-600';  // Suspicious
    return 'from-red-400 to-rose-600';  // Dangerous
  };
  
  // Determine background color for the status badge
  const getStatusBackground = () => {
    if (scan.status === 'safe') return 'bg-gradient-to-r from-green-500 to-emerald-600';
    if (scan.status === 'suspicious') return 'bg-gradient-to-r from-yellow-500 to-amber-600';
    return 'bg-gradient-to-r from-red-500 to-rose-600';
  };
  
  return (
    <Card className="bg-white rounded-xl shadow-lg border-0 overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Top accent gradient */}
      <div className={`h-1.5 bg-gradient-to-r ${getGradientColors()}`}></div>
      
      <CardContent className="p-5">
        {/* URL and Status */}
        <div className="flex flex-col mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="mr-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 truncate text-base">{scan.url}</h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs text-white font-bold ml-2 shadow-sm ${getStatusBackground()}`}>
              {scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
            </div>
          </div>
        </div>
        
        {/* Trust Score */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Trust Score</span>
            <div className={`text-sm font-bold ${
              scan.trustScore >= 80 ? "text-green-600" : 
              scan.trustScore >= 40 ? "text-amber-600" : "text-rose-600"
            }`}>{scan.trustScore}/100</div>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                scan.trustScore >= 80 ? "bg-gradient-to-r from-green-400 to-emerald-600" : 
                scan.trustScore >= 40 ? "bg-gradient-to-r from-yellow-400 to-amber-600" : "bg-gradient-to-r from-red-400 to-rose-600"
              }`} 
              style={{ width: `${scan.trustScore}%` }}
            ></div>
          </div>
        </div>
        
        {/* Scan Time */}
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Scanned {formatTimeAgo(new Date(scan.lastScanned))}
        </div>
        
        {/* Security Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 p-2 rounded-md flex items-center">
            {scan.hasValidSSL ? (
              <div className="mr-2 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600 h-3.5 w-3.5" />
              </div>
            ) : (
              <div className="mr-2 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="text-red-600 h-3.5 w-3.5" />
              </div>
            )}
            <span className="text-xs font-medium">SSL {scan.hasValidSSL ? "Secure" : "Invalid"}</span>
          </div>
          
          <div className="bg-gray-50 p-2 rounded-md flex items-center">
            {scan.registrationDate !== "Unknown" ? (
              <div className="mr-2 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600 h-3.5 w-3.5" />
              </div>
            ) : (
              <div className="mr-2 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="text-red-600 h-3.5 w-3.5" />
              </div>
            )}
            <span className="text-xs font-medium">WHOIS {scan.registrationDate !== "Unknown" ? "Valid" : "Hidden"}</span>
          </div>
          
          <div className="bg-gray-50 p-2 rounded-md flex items-center">
            {!scan.hasMalware ? (
              <div className="mr-2 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600 h-3.5 w-3.5" />
              </div>
            ) : (
              <div className="mr-2 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="text-red-600 h-3.5 w-3.5" />
              </div>
            )}
            <span className="text-xs font-medium">{scan.hasMalware ? "Malware" : "No Malware"}</span>
          </div>
          
          <div className="bg-gray-50 p-2 rounded-md flex items-center">
            {scan.blacklistStatus && scan.blacklistStatus.includes("Not") ? (
              <div className="mr-2 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600 h-3.5 w-3.5" />
              </div>
            ) : (
              <div className="mr-2 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="text-red-600 h-3.5 w-3.5" />
              </div>
            )}
            <span className="text-xs font-medium">{scan.blacklistStatus && scan.blacklistStatus.includes("Not") ? "Not Blacklisted" : "Blacklisted"}</span>
          </div>
        </div>
        
        {/* Action Button */}
        <Link href={`/scan?url=${encodeURIComponent(scan.url)}`}>
          <a className={`block text-center py-2 rounded-lg text-white font-medium text-sm mt-4 bg-gradient-to-r ${getGradientColors()} hover:opacity-90 transition-opacity`}>
            View Detailed Report
          </a>
        </Link>
      </CardContent>
    </Card>
  );
}

// Main component with full section and heading
export default function RecentScansList({ noContainer = false }: { noContainer?: boolean }) {
  const { data: recentScans, isLoading, error } = useQuery({
    queryKey: ['/api/scans/recent'],
  });

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <p>Loading recent scans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-danger">
        <p>Error loading recent scans. Please try again later.</p>
      </div>
    );
  }
  
  // If noContainer is true, just render the cards without section wrapper
  if (noContainer) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(recentScans) && recentScans.map((scan: Scan) => (
          <ScanCard key={scan.id} scan={scan} />
        ))}
      </div>
    );
  }

  // Default view with full container
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-heading font-bold">Recently Scanned Websites</h2>
          <Link href="/recent-scans">
            <a className="text-accent-600 hover:text-accent-700 font-medium text-sm">View All</a>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(recentScans) && recentScans.map((scan: Scan) => (
            <ScanCard key={scan.id} scan={scan} />
          ))}
        </div>
      </div>
    </section>
  );
}
