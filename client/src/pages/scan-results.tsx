import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Flag, Shield } from "lucide-react";
import LoadingState from "@/components/LoadingState";
import TrustScoreCard from "@/components/TrustScoreCard";
import DetailedAnalysis from "@/components/DetailedAnalysis";
import SecurityRecommendations from "@/components/SecurityRecommendations";
import { formatDate } from "@/lib/scan-utils";
import type { Scan } from "@shared/schema";

export default function ScanResults() {
  const [location, setLocation] = useLocation();
  // Fix URL parameter extraction with a more robust approach
  const urlSearchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams("");
  const url = urlSearchParams.get("url");
  
  console.log("Current location:", location);
  console.log("URL parameter:", url);
  const [showSharePopup, setShowSharePopup] = useState(false);
  
  useEffect(() => {
    // Hide share popup after 3 seconds
    if (showSharePopup) {
      const timer = setTimeout(() => setShowSharePopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSharePopup]);
  
  // Clean URL for display (remove protocol)
  const displayUrl = url ? url.replace(/^https?:\/\//, "") : "";
  
  // Query for scan results
  const { data: scanResult, isLoading, isError } = useQuery({
    queryKey: [`/api/scans?url=${encodeURIComponent(url || "")}`],
    enabled: !!url, // Only run if we have a URL
  });
  
  // Copy URL to clipboard
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowSharePopup(true);
  };
  
  if (!url) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-bold mb-2">No Website Provided</h2>
          <p className="mb-4">Please provide a website URL to scan.</p>
          <Button onClick={() => setLocation("/")}>
            Go Home
          </Button>
        </Card>
      </div>
    );
  }
  
  if (isLoading) {
    return <LoadingState url={displayUrl} />;
  }
  
  if (isError || !scanResult) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-bold text-danger mb-2">Error Scanning Website</h2>
          <p className="mb-4">We encountered an error while scanning {displayUrl}. Please try again later.</p>
          <Button onClick={() => setLocation("/")}>
            Try Another Website
          </Button>
        </Card>
      </div>
    );
  }
  
  const scan = scanResult as Scan;
  
  // Prepare data for detailed analysis
  const domainInfo = {
    domainName: scan.url,
    registrationDate: scan.registrationDate || "Unknown",
    domainAge: scan.domainAge || "Unknown",
    expirationDate: scan.expirationDate || "Unknown",
    registrar: scan.registrar || "Unknown",
    registrantCountry: scan.registrantCountry || "Unknown"
  };
  
  const technicalInfo = {
    ipAddress: scan.ipAddress || "Unknown",
    ipLocation: scan.ipLocation || "Unknown",
    nameServers: scan.nameServers || "Unknown",
    hasValidSSL: scan.hasValidSSL || false,
    hasDNSSEC: scan.hasDNSSEC || false,
    hasSecurityHeaders: scan.hasSecurityHeaders || false
  };
  
  const contentAnalysis = {
    hasMalware: scan.hasMalware || false,
    hasPhishing: scan.hasPhishing || false,
    blacklistStatus: scan.blacklistStatus || "Unknown",
    suspiciousPatterns: scan.suspiciousPatterns || "None",
    userReports: scan.userReports || 0,
    relatedSites: scan.relatedSites || 0
  };
  
  // Determine if domain is established (over 2 years)
  const hasEstablishedDomain = scan.domainAge?.includes("years") && 
    parseInt(scan.domainAge?.split(' ')[0] || '0') >= 2;
  
  // Check if has blacklist issues
  const hasBlacklistIssues = !scan.blacklistStatus?.includes("Not");

  return (
    <>
      <title>Scan Results for {displayUrl} | TrustGuard</title>
      
      <section className="py-10">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary-900 mb-1">{displayUrl}</h2>
                <p className="text-primary-500">Scanned on {formatDate(new Date(scan.lastScanned))}</p>
              </div>
              <div className="mt-4 md:mt-0 flex">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={handleShare}
                >
                  <Share2 className="mr-1 h-4 w-4" /> Share
                </Button>
                <Button variant="outline" onClick={() => setLocation("/report-website")}>
                  <Flag className="mr-1 h-4 w-4" /> Report
                </Button>
                
                {showSharePopup && (
                  <div className="absolute mt-10 mr-2 py-2 px-4 bg-primary-900 text-white text-sm rounded shadow-lg">
                    Link copied to clipboard!
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trust Score Card */}
            <div className="lg:col-span-1">
              <TrustScoreCard
                trustScore={scan.trustScore}
                domainAge={scan.domainAge}
                whoisStatus={scan.registrationDate !== "Unknown" ? "Verified" : "Partially Verified"}
                sslStatus={scan.hasValidSSL}
                malwareStatus={scan.hasMalware}
                blacklistStatus={scan.blacklistStatus}
                userReports={scan.userReports}
                lastScanned={new Date(scan.lastScanned)}
                status={scan.status as "safe" | "suspicious" | "dangerous"}
              />
            </div>
            
            {/* Detailed Analysis */}
            <div className="lg:col-span-2">
              <DetailedAnalysis
                domainInfo={domainInfo}
                technicalInfo={technicalInfo}
                contentAnalysis={contentAnalysis}
              />
            </div>
          </div>
          
          {/* Security Recommendations */}
          <div className="mt-6">
            <SecurityRecommendations
              domainName={scan.url}
              trustScore={scan.trustScore}
              status={scan.status as "safe" | "suspicious" | "dangerous"}
              hasEstablishedDomain={hasEstablishedDomain}
              hasValidSSL={scan.hasValidSSL || false}
              hasMalware={scan.hasMalware || false}
              hasBlacklistIssues={hasBlacklistIssues}
            />
          </div>
        </div>
      </section>
    </>
  );
}
