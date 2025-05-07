import SearchForm from "@/components/SearchForm";
import FeaturesSection from "@/components/FeaturesSection";
import TrustIndicators from "@/components/TrustIndicators";
import RecentScansList from "@/components/RecentScansList";
import { SecurityIcon } from "@/components/icons";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>TrustGuard - Website Security Scanner</title>
        <meta name="description" content="Check if a website is safe or a scam with our comprehensive website security analyzer. Protect yourself from online fraud with domain age, WHOIS data, and IP reputation analysis." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Check if a Website is Safe or a Scam</h1>
            <p className="text-primary-200 mb-8 text-lg">Protect yourself from online fraud with our comprehensive website security analyzer</p>
            
            {/* Search Form */}
            <SearchForm className="mb-8" darkMode={true} />
            
            {/* Security Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-primary-800/60 p-4 rounded-lg text-center">
                <SecurityIcon type="DomainVerification" className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-sm font-medium">Domain Verification</h3>
              </div>
              
              <div className="bg-primary-800/60 p-4 rounded-lg text-center">
                <SecurityIcon type="WhoisAnalysis" className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-sm font-medium">WHOIS Analysis</h3>
              </div>
              
              <div className="bg-primary-800/60 p-4 rounded-lg text-center">
                <SecurityIcon type="IpVerification" className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-sm font-medium">IP Verification</h3>
              </div>
              
              <div className="bg-primary-800/60 p-4 rounded-lg text-center">
                <SecurityIcon type="MalwareCheck" className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-sm font-medium">Malware Check</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Trust Indicators Section */}
      <TrustIndicators />
      
      {/* Recent Scans Section */}
      <RecentScansList />
    </>
  );
}
