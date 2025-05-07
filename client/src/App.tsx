import { Switch, Route } from "wouter";
import { Helmet } from "react-helmet";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
