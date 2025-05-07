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
  return (
    <Card className="bg-white rounded-xl shadow-md">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium truncate">{scan.url}</h3>
          <StatusBadge status={scan.status as "safe" | "suspicious" | "dangerous"} size="sm" />
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Trust Score</span>
            <span className="font-medium">{scan.trustScore}/100</span>
          </div>
          <div className="trust-score-indicator h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`trust-score-fill h-full ${
                scan.trustScore >= 80 ? "bg-success" : 
                scan.trustScore >= 40 ? "bg-warning" : "bg-danger"
              }`} 
              style={{ width: `${scan.trustScore}%` }}
            ></div>
          </div>
        </div>
        
        <div className="text-xs text-primary-500 mb-4">
          Scanned {formatTimeAgo(new Date(scan.lastScanned))}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center">
            {scan.hasValidSSL ? (
              <CheckCircle className="text-success mr-1 h-3 w-3" />
            ) : (
              <XCircle className="text-danger mr-1 h-3 w-3" />
            )}
            <span>SSL {scan.hasValidSSL ? "Secure" : "Invalid"}</span>
          </div>
          
          <div className="flex items-center">
            {scan.registrationDate !== "Unknown" ? (
              <CheckCircle className="text-success mr-1 h-3 w-3" />
            ) : (
              <XCircle className="text-danger mr-1 h-3 w-3" />
            )}
            <span>WHOIS {scan.registrationDate !== "Unknown" ? "Valid" : "Hidden"}</span>
          </div>
          
          <div className="flex items-center">
            {!scan.hasMalware ? (
              <CheckCircle className="text-success mr-1 h-3 w-3" />
            ) : (
              <XCircle className="text-danger mr-1 h-3 w-3" />
            )}
            <span>{scan.hasMalware ? "Malware" : "No Malware"}</span>
          </div>
          
          <div className="flex items-center">
            {scan.blacklistStatus.includes("Not") ? (
              <CheckCircle className="text-success mr-1 h-3 w-3" />
            ) : (
              <XCircle className="text-danger mr-1 h-3 w-3" />
            )}
            <span>{scan.blacklistStatus.includes("Not") ? "Not Blacklisted" : "Blacklisted"}</span>
          </div>
        </div>
        
        <Link href={`/scan?url=${encodeURIComponent(scan.url)}`}>
          <a className="block text-center text-accent-600 hover:text-accent-700 text-sm font-medium mt-4">
            View Detailed Report
          </a>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function RecentScansList() {
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
          {recentScans?.map((scan: Scan) => (
            <ScanCard key={scan.id} scan={scan} />
          ))}
        </div>
      </div>
    </section>
  );
}
