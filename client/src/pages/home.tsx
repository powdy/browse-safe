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
      
      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Background gradient with animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-violet-900 z-0 opacity-90">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDEyODB2NzY4SDB6Ii8+PGNpcmNsZSBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBjeD0iNjk2IiBjeT0iMTIiIHI9IjIiLz48Y2lyY2xlIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIGN4PSI3MTYiIGN5PSIyMTIiIHI9IjIiLz48Y2lyY2xlIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIGN4PSI3NDYiIGN5PSI0MTIiIHI9IjIiLz48Y2lyY2xlIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIGN4PSI3OTYiIGN5PSI2MTIiIHI9IjIiLz48Y2lyY2xlIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIGN4PSIxOTYiIGN5PSIxMiIgcj0iMiIvPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgY3g9IjIxNiIgY3k9IjIxMiIgcj0iMiIvPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgY3g9IjI0NiIgY3k9IjQxMiIgcj0iMiIvPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgY3g9IjI5NiIgY3k9IjYxMiIgcj0iMiIvPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgY3g9IjM5NiIgY3k9IjEyIiByPSIyIi8+PGNpcmNsZSBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBjeD0iOTk2IiBjeT0iMTIiIHI9IjIiLz48Y2lyY2xlIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIGN4PSI0OTYiIGN5PSIxMiIgcj0iMiIvPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgY3g9IjU5NiIgY3k9IjEyIiByPSIyIi8+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        
        {/* Content */}
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Shield Icon with Glow */}
            <div className="inline-flex items-center justify-center p-2 mb-6 bg-blue-500/20 backdrop-blur-sm rounded-full">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full shadow-lg">
                <SecurityIcon type="DomainVerification" className="w-8 h-8 text-white" />
              </div>
            </div>
            
            {/* Heading with Gradient Text */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              <span className="bg-gradient-to-r from-blue-200 via-indigo-100 to-white text-transparent bg-clip-text">
                Is That Website Safe or a Scam?
              </span>
            </h1>
            
            <p className="text-blue-100 mb-10 text-lg md:text-xl">
              Protect yourself from online fraud with our advanced AI-powered website security analyzer
            </p>
            
            {/* Search Form with Enhanced Styling */}
            <div className="backdrop-blur-sm bg-white/10 p-6 rounded-xl shadow-2xl mb-12 border border-white/20">
              <SearchForm className="mb-4" darkMode={true} />
              <p className="text-blue-200 text-sm">
                Enter any website URL to get an instant security analysis and trust score
              </p>
            </div>
            
            {/* Key Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-900/80 to-indigo-900/80 backdrop-blur-sm p-5 rounded-xl border border-blue-700/50 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <SecurityIcon type="DomainVerification" className="w-12 h-12 mx-auto mb-3 text-blue-300" />
                <h3 className="text-sm font-medium text-white">Domain Analysis</h3>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-sm p-5 rounded-xl border border-indigo-700/50 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <SecurityIcon type="WhoisAnalysis" className="w-12 h-12 mx-auto mb-3 text-indigo-300" />
                <h3 className="text-sm font-medium text-white">WHOIS Verification</h3>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/80 to-violet-900/80 backdrop-blur-sm p-5 rounded-xl border border-purple-700/50 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <SecurityIcon type="IpVerification" className="w-12 h-12 mx-auto mb-3 text-purple-300" />
                <h3 className="text-sm font-medium text-white">Server Analysis</h3>
              </div>
              
              <div className="bg-gradient-to-br from-violet-900/80 to-blue-900/80 backdrop-blur-sm p-5 rounded-xl border border-violet-700/50 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <SecurityIcon type="MalwareCheck" className="w-12 h-12 mx-auto mb-3 text-violet-300" />
                <h3 className="text-sm font-medium text-white">Malware Detection</h3>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center mt-16 gap-8 md:gap-12">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 text-transparent bg-clip-text">3.5M+</p>
                <p className="text-blue-200 text-sm">Websites Analyzed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-300 text-transparent bg-clip-text">98.7%</p>
                <p className="text-blue-200 text-sm">Accuracy Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-300 text-transparent bg-clip-text">247K+</p>
                <p className="text-blue-200 text-sm">Frauds Detected</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f9fafb" fillOpacity="1" d="M0,224L48,218.7C96,213,192,203,288,213.3C384,224,480,256,576,245.3C672,235,768,181,864,181.3C960,181,1056,235,1152,245.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Enhanced Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block p-2 bg-blue-50 rounded-full mb-4">
              <div className="p-1 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 text-transparent bg-clip-text">
              Why Choose TrustGuard?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive security analysis helps you make informed decisions 
              before sharing personal information or making purchases online
            </p>
          </div>
          
          <FeaturesSection />
        </div>
      </section>
      
      {/* Trust Indicators Section with Improved Styling */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/50 relative">
        <div className="absolute top-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full rotate-180">
            <path fill="#fff" fillOpacity="1" d="M0,224L48,218.7C96,213,192,203,288,213.3C384,224,480,256,576,245.3C672,235,768,181,864,181.3C960,181,1056,235,1152,245.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 pt-10">
          <div className="text-center mb-16">
            <div className="inline-block p-2 bg-indigo-50 rounded-full mb-4">
              <div className="p-1 bg-indigo-100 rounded-full">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-700 via-purple-700 to-violet-700 text-transparent bg-clip-text">
              How to Identify Safe vs. Scam Websites
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn to recognize the signs of legitimate websites and potential fraud attempts
            </p>
          </div>
          
          <TrustIndicators />
        </div>
      </section>
      
      {/* Recent Scans Section with Enhanced Design */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block p-2 bg-purple-50 rounded-full mb-4">
              <div className="p-1 bg-purple-100 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-700 text-transparent bg-clip-text">
              Recently Analyzed Websites
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our latest website security checks and view comprehensive analysis reports
            </p>
          </div>
          
          <RecentScansList />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Protecting Yourself Online Today
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Don't become a victim of online scams and fraud. Use TrustGuard to check website 
              security before sharing your personal information.
            </p>
            <SearchForm className="max-w-lg mx-auto" darkMode={true} />
          </div>
        </div>
      </section>
    </>
  );
}
