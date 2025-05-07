import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle } from "lucide-react";

export default function TrustIndicators() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4">How to Identify Trustworthy Websites</h2>
          <p className="text-lg text-primary-600 max-w-3xl mx-auto">Learn to recognize the signs of legitimate websites and potential scams</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-heading font-semibold mb-6 flex items-center">
              <CheckCircle className="text-success mr-2 h-5 w-5" />
              Trust Indicators
            </h3>
            
            <div className="space-y-6">
              <Card className="border-none shadow-sm">
                <CardContent className="p-4 flex">
                  <div className="w-16 h-16 bg-accent-100 rounded flex items-center justify-center shrink-0 mr-4">
                    <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Secure Connection (HTTPS)</h4>
                    <p className="text-sm text-primary-600">Legitimate websites use SSL certificates to encrypt data, visible as a padlock icon in your browser address bar.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-sm">
                <CardContent className="p-4 flex">
                  <div className="w-16 h-16 bg-accent-100 rounded flex items-center justify-center shrink-0 mr-4">
                    <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Clear Contact Information</h4>
                    <p className="text-sm text-primary-600">Legitimate businesses provide complete contact details, including physical address, phone number, and email.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-sm">
                <CardContent className="p-4 flex">
                  <div className="w-16 h-16 bg-accent-100 rounded flex items-center justify-center shrink-0 mr-4">
                    <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Authentic Reviews</h4>
                    <p className="text-sm text-primary-600">Look for websites with genuine customer feedback and reviews on external platforms like Trustpilot or Google.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-sm">
                <CardContent className="p-4 flex">
                  <div className="w-16 h-16 bg-accent-100 rounded flex items-center justify-center shrink-0 mr-4">
                    <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Professional Design & Policies</h4>
                    <p className="text-sm text-primary-600">Reputable sites have professional design, functional navigation, and clear privacy/return policies.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-semibold mb-6 flex items-center">
              <AlertTriangle className="text-danger mr-2 h-5 w-5" />
              Warning Signs
            </h3>
            
            <div className="space-y-6">
              <Card className="border-none shadow-sm">
                <CardContent className="p-4 flex">
                  <div className="w-16 h-16 bg-danger-light rounded flex items-center justify-center shrink-0 mr-4">
                    <svg className="w-8 h-8 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Suspicious URLs</h4>
                    <p className="text-sm text-primary-600">Watch for domains with misspellings of known brands, extra hyphens, or unusual TLDs (.xyz, .info when unexpected).</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-sm">
                <CardContent className="p-4 flex">
                  <div className="w-16 h-16 bg-danger-light rounded flex items-center justify-center shrink-0 mr-4">
                    <svg className="w-8 h-8 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Too-Good-To-Be-True Offers</h4>
                    <p className="text-sm text-primary-600">Extreme discounts, free high-value items, or unrealistic promises are often signs of a scam.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-sm">
                <CardContent className="p-4 flex">
                  <div className="w-16 h-16 bg-danger-light rounded flex items-center justify-center shrink-0 mr-4">
                    <svg className="w-8 h-8 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Poor Grammar & Design</h4>
                    <p className="text-sm text-primary-600">Legitimate businesses invest in proper writing and design. Multiple spelling errors are red flags.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-none shadow-sm">
                <CardContent className="p-4 flex">
                  <div className="w-16 h-16 bg-danger-light rounded flex items-center justify-center shrink-0 mr-4">
                    <svg className="w-8 h-8 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Pressure Tactics</h4>
                    <p className="text-sm text-primary-600">Be wary of sites creating urgency with countdown timers or claims of "only 2 items left."</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
