import SearchForm from "@/components/SearchForm";
import FeaturesSection from "@/components/FeaturesSection";
import TrustIndicators from "@/components/TrustIndicators";
import RecentScansList from "@/components/RecentScansList";
import { SecurityIcon } from "@/components/icons";
import { Helmet } from "react-helmet";
import { Link } from "wouter";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>TrustGuard - Website Security Scanner | Check If Websites Are Safe</title>
        <meta name="description" content="Check if any website is safe or a potential scam with TrustGuard's free website security scanner. Analyze domain age, WHOIS data, SSL certificates, and blacklist status to protect yourself from online fraud." />
        <meta name="keywords" content="website security scanner, check if website is safe, website safety checker, phishing detector, scam website checker, domain age checker, website trust score, website blacklist checker, online fraud protection, is this website safe, safe website checker" />
        <meta property="og:title" content="TrustGuard - Website Security Scanner | Check If Websites Are Safe" />
        <meta property="og:description" content="Check if any website is safe or a potential scam with TrustGuard's free website security scanner. Analyze domain age, WHOIS data, SSL certificates, and blacklist status." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://trustguard.com" />
        <meta property="og:image" content="https://trustguard.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TrustGuard - Check If Websites Are Safe or Scams" />
        <meta name="twitter:description" content="Free website security scanner to analyze domain age, SSL certificates, blacklist status and detect online scams before they can harm you." />
        <meta name="twitter:image" content="https://trustguard.com/twitter-image.jpg" />
        <link rel="canonical" href="https://trustguard.com" />
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
      
      {/* SEO Optimized Detailed Information Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 text-transparent bg-clip-text">
              Protect Yourself From Online Scams and Fraud
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p>
                In today's digital world, <strong>website security scanners</strong> like TrustGuard are essential tools for protecting yourself from online fraud. With the increasing sophistication of phishing websites and scams, it's becoming harder to distinguish between legitimate and malicious websites at first glance.
              </p>
              
              <p>
                Our <strong>comprehensive website security analyzer</strong> examines multiple crucial factors to determine if a website is trustworthy or potentially dangerous. The TrustGuard scanner analyzes <strong>domain age, WHOIS data, SSL certificates, blacklist status, malware detection</strong>, and numerous other security indicators to generate an accurate trust score.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">How Our Website Safety Checker Works</h3>
              
              <p>
                Unlike basic phishing detectors, TrustGuard performs a deep analysis of websites by checking:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Domain Verification:</strong> We analyze when the website was registered, who owns it, and if the ownership information is hidden—newly registered domains with hidden ownership are often red flags for scams.</li>
                <li><strong>SSL Certificate Analysis:</strong> Legitimate websites use proper SSL certificates to secure your data. We verify not just if an SSL certificate exists, but also its validity and issuer.</li>
                <li><strong>Blacklist Checks:</strong> We scan multiple security databases to see if the website has been reported for malicious activity, phishing attempts, or scam operations.</li>
                <li><strong>Technical Infrastructure:</strong> Our scanner examines the hosting provider, server location, and technical setup that can reveal suspicious patterns typical of fraudulent websites.</li>
                <li><strong>Content Analysis:</strong> Advanced algorithms detect content patterns common in scam websites, including pressure tactics, suspicious offers, and other warning signs.</li>
              </ul>
              
              <p>
                After this comprehensive scan, TrustGuard generates a <strong>website trust score</strong> from 0-100, with detailed explanations of any security issues found. This helps you make informed decisions before sharing personal information, making purchases, or downloading content from websites.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Why Website Security Scanning Is Essential</h3>
              
              <p>
                Cybercriminals create increasingly convincing fake websites that mimic legitimate businesses. These can appear in search results, advertisements, or be sent directly through phishing emails. The consequences of interacting with these fraudulent sites include:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Identity Theft:</strong> Your personal information can be stolen and used for fraudulent purposes.</li>
                <li><strong>Financial Fraud:</strong> Credit card details and banking information can be compromised.</li>
                <li><strong>Malware Infection:</strong> Malicious websites can install harmful software on your device.</li>
                <li><strong>Data Breaches:</strong> Your login credentials for other services may be compromised.</li>
              </ul>
              
              <p>
                Using TrustGuard's <strong>website security scanner</strong> before engaging with unfamiliar websites provides an essential layer of protection against these threats. Our technology has already identified thousands of fraudulent websites, helping users avoid potential scams before they become victims.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Features Section */}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-700 via-purple-700 to-violet-700 text-transparent bg-clip-text">
              Key Security Features
            </h2>
          </div>
          
          <FeaturesSection />
        </div>
      </section>
      
      {/* Recent Scans Section with Enhanced Design */}
      <section className="py-20 bg-white relative">
        {/* Top wave decoration */}
        <div className="absolute top-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f9fafb" fillOpacity="1" d="M0,160L48,149.3C96,139,192,117,288,122.7C384,128,480,160,576,186.7C672,213,768,235,864,224C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 pt-10">
          <div className="text-center mb-10">
            {/* Icon with particle effects */}
            <div className="inline-block relative mb-6">
              <div className="absolute -inset-6 bg-violet-500/10 rounded-full blur-xl"></div>
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                {/* Small decorative dots */}
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-purple-400 rounded-full animate-pulse"></span>
                <span className="absolute -bottom-1 -left-1 h-2 w-2 bg-violet-300 rounded-full animate-ping"></span>
              </div>
            </div>
            
            {/* Title with gradient text */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-transparent bg-clip-text">
              Real-Time Website Security Scans
            </h2>
            
            {/* Decorative underline */}
            <div className="w-24 h-1.5 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full mx-auto mb-6"></div>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our latest website security checks and discover potential threats before visiting unfamiliar sites
            </p>
          </div>
          
          {/* Recent scans will be displayed here */}
          <RecentScansList noContainer={true} />
          
          {/* View all button */}
          <div className="text-center mt-10">
            <Link href="/recent-scans">
              <a className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow">
                View All Recent Scans
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </Link>
          </div>
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
