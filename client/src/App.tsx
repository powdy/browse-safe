import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { Helmet } from "react-helmet";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Home from "@/pages/home";
import ScanResults from "@/pages/scan-results";
import RecentScans from "@/pages/recent-scans";
import ReportWebsite from "@/pages/report-website";
import HowItWorks from "@/pages/how-it-works";
import NotFound from "@/pages/not-found";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsConditions from "@/pages/terms-conditions";
import Disclaimer from "@/pages/disclaimer";
import CookiePolicy from "@/pages/cookie-policy";

function Router() {
  // State to manage cookie consent banner visibility
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  
  useEffect(() => {
    // Check if user has already given cookie consent
    const consentGiven = localStorage.getItem('cookieConsentGiven');
    if (!consentGiven) {
      // Show cookie banner after a short delay
      const timer = setTimeout(() => {
        setShowCookieBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle accepting all cookies
  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsentGiven', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true
    }));
    setShowCookieBanner(false);
  };

  // Handle accepting only essential cookies
  const handleEssentialOnly = () => {
    localStorage.setItem('cookieConsentGiven', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify({
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false
    }));
    setShowCookieBanner(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <meta charSet="utf-8" />
        <title>TrustGuard - Website Security Scanner</title>
        <meta name="description" content="Scan and analyze websites for potential security threats with TrustGuard. Check domain age, SSL certificates, and blacklist status to ensure safe browsing." />
        <link rel="canonical" href="https://trustguard.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <Header />
      <div className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/scan" component={ScanResults} />
          <Route path="/recent-scans" component={RecentScans} />
          <Route path="/report" component={ReportWebsite} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-conditions" component={TermsConditions} />
          <Route path="/disclaimer" component={Disclaimer} />
          <Route path="/cookie-policy" component={CookiePolicy} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
      
      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200 p-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="mb-4 md:mb-0 pr-4">
                <h3 className="text-lg font-semibold mb-2">We Value Your Privacy</h3>
                <p className="text-sm text-gray-600 max-w-2xl">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies as described in our{' '}
                  <a href="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</a>.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setShowCookieBanner(false)}
                  className="px-4 py-2 text-sm font-medium border border-gray-400 bg-white text-gray-800 hover:bg-gray-100 rounded-md"
                >
                  Customize
                </button>
                <button 
                  onClick={handleEssentialOnly}
                  className="px-4 py-2 text-sm font-medium border border-gray-400 bg-white text-gray-800 hover:bg-gray-100 rounded-md"
                >
                  Essential Only
                </button>
                <button 
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white rounded-md"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
