import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const CookieConsent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always enabled
    analytics: false,
    marketing: false,
    preferences: false
  });

  // Check if consent has been given before
  useEffect(() => {
    const consentGiven = localStorage.getItem('cookieConsentGiven');
    if (!consentGiven) {
      // Show cookie banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Save cookie preferences to localStorage
  const saveCookiePreferences = () => {
    localStorage.setItem('cookieConsentGiven', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    
    // If analytics is enabled, initialize analytics (example)
    if (cookiePreferences.analytics) {
      // Initialize analytics (this is just a placeholder)
      console.log('Analytics enabled');
      // window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    
    // If marketing is enabled, initialize marketing cookies (example)
    if (cookiePreferences.marketing) {
      // Initialize marketing (this is just a placeholder)
      console.log('Marketing enabled');
      // window.gtag('consent', 'update', { ad_storage: 'granted' });
    }
    
    setShowBanner(false);
  };

  // Accept all cookies
  const acceptAllCookies = () => {
    setCookiePreferences({
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true
    });
    setTimeout(() => {
      saveCookiePreferences();
    }, 100);
  };

  // Accept only essential cookies
  const acceptEssentialCookies = () => {
    setCookiePreferences({
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false
    });
    setTimeout(() => {
      saveCookiePreferences();
    }, 100);
  };

  return (
    <>
      {/* Cookie Settings button in footer */}
      <button 
        onClick={() => setOpenDialog(true)} 
        className="text-primary-300 hover:text-white text-sm"
      >
        Cookie Settings
      </button>
      
      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200 p-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="mb-4 md:mb-0 pr-4">
                <h3 className="text-lg font-semibold mb-2">We Value Your Privacy</h3>
                <p className="text-sm text-gray-600 max-w-2xl">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies as described in our{' '}
                  <Link href="/cookie-policy">
                    <a className="text-blue-600 hover:underline">Cookie Policy</a>
                  </Link>.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setOpenDialog(true)}
                  className="border-gray-400 bg-white text-gray-800 hover:bg-gray-100"
                >
                  Customize
                </Button>
                <Button 
                  variant="outline" 
                  onClick={acceptEssentialCookies}
                  className="border-gray-400 bg-white text-gray-800 hover:bg-gray-100"
                >
                  Essential Only
                </Button>
                <Button 
                  variant="default" 
                  onClick={acceptAllCookies}
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Cookie Settings Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cookie Settings</DialogTitle>
            <DialogDescription>
              Customize your cookie preferences. You can enable or disable different types of cookies below.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="summary">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="detail">Detailed Information</TabsTrigger>
              <TabsTrigger value="manage">Manage Consent</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="space-y-4 py-4">
              <div className="text-sm text-gray-700 space-y-4">
                <p>
                  We use cookies and similar technologies on our website to improve performance, enhance your user experience, and provide more personalized content for you.
                </p>
                <p>
                  Some cookies are essential for the site to function properly, while others are used for analytics, marketing, and personalization purposes.
                </p>
                <p>
                  You can customize your cookie preferences at any time by clicking on "Cookie Settings" in the footer of our website.
                </p>
                <p>
                  For more information about the cookies we use and your choices, please see our{' '}
                  <Link href="/cookie-policy">
                    <a className="text-blue-600 hover:underline">Cookie Policy</a>
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy">
                    <a className="text-blue-600 hover:underline">Privacy Policy</a>
                  </Link>.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="detail" className="space-y-4 py-4">
              <div>
                <h4 className="font-semibold mb-2">Essential Cookies</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Essential cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Analytics cookies help us understand how visitors interact with our website. These cookies help us gather information about the number of visitors, where visitors come from, and which pages they visit. All information these cookies collect is aggregated and anonymous.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Marketing Cookies</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Preference Cookies</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Preference cookies enable a website to remember information that changes the way the website behaves or looks, like your preferred language or the region that you are in.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="manage" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <h4 className="font-semibold">Essential Cookies</h4>
                    <p className="text-sm text-gray-600">Always active and necessary for the site to work properly</p>
                  </div>
                  <Switch checked={true} disabled={true} />
                </div>
                
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <h4 className="font-semibold">Analytics Cookies</h4>
                    <p className="text-sm text-gray-600">Help us improve our website by collecting anonymous usage information</p>
                  </div>
                  <Switch 
                    checked={cookiePreferences.analytics} 
                    onCheckedChange={(checked) => setCookiePreferences({...cookiePreferences, analytics: checked})} 
                  />
                </div>
                
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <h4 className="font-semibold">Marketing Cookies</h4>
                    <p className="text-sm text-gray-600">Allow us to provide you with relevant advertisements</p>
                  </div>
                  <Switch 
                    checked={cookiePreferences.marketing} 
                    onCheckedChange={(checked) => setCookiePreferences({...cookiePreferences, marketing: checked})} 
                  />
                </div>
                
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <h4 className="font-semibold">Preference Cookies</h4>
                    <p className="text-sm text-gray-600">Remember your settings and preferences</p>
                  </div>
                  <Switch 
                    checked={cookiePreferences.preferences} 
                    onCheckedChange={(checked) => setCookiePreferences({...cookiePreferences, preferences: checked})} 
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={acceptEssentialCookies}
                className="border-gray-400 bg-white text-gray-800 hover:bg-gray-100"
              >
                Essential Only
              </Button>
              <Button 
                variant="default" 
                onClick={acceptAllCookies}
                className="bg-primary-600 hover:bg-primary-700 text-white"
              >
                Accept All
              </Button>
            </div>
            <DialogClose asChild>
              <Button 
                onClick={saveCookiePreferences}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Preferences
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;