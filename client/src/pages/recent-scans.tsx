import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock, Search } from "lucide-react";
import { Link } from "wouter";
import { formatTimeAgo } from "@/lib/scan-utils";
import type { Scan } from "@shared/schema";
import { Helmet } from "react-helmet";
import RecentScansList from "@/components/RecentScansList";

export default function RecentScans() {
  // We don't actually need recentScans since RecentScansList component handles the data fetching
  const { isLoading, error } = useQuery({
    queryKey: ['/api/scans/recent'],
  });

  return (
    <>
      <Helmet>
        <title>Recent Website Scans | TrustGuard</title>
        <meta name="description" content="View recently scanned websites and their security analysis. See which websites are safe and which ones might be potential scams." />
      </Helmet>
      
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="mx-auto text-center mb-8">
              {/* Icon with particle effects */}
              <div className="inline-block relative mb-6">
                <div className="absolute -inset-6 bg-violet-500/10 rounded-full blur-xl"></div>
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  {/* Small decorative dots */}
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-purple-400 rounded-full animate-pulse"></span>
                  <span className="absolute -bottom-1 -left-1 h-2 w-2 bg-violet-300 rounded-full animate-ping"></span>
                </div>
              </div>
            </div>
            
            {/* Title with gradient text */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-transparent bg-clip-text">
              Recently Analyzed Websites
            </h1>
            
            {/* Decorative underline */}
            <div className="w-32 h-1.5 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full mx-auto mb-6"></div>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse the latest websites analyzed by our security scanner. See trust scores, domain details, and potential security threats.
            </p>
          </div>
          
          {isLoading ? (
            <div className="py-8 text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-100 text-violet-700">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-violet-700" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading recent scans...
              </div>
            </div>
          ) : error ? (
            <div className="py-8 text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-rose-100 text-rose-700">
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Failed to load recent scans. Please try again later.
              </div>
            </div>
          ) : (
            <div>
              <RecentScansList noContainer={true} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
