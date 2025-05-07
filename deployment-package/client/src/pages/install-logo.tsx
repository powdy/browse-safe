import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function InstallLogo() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // URLs for the logo images and site link
  const baseUrl = "https://browse-safe.com";
  
  // Logo variations
  const logoVariations = [
    {
      name: "Default Logo",
      description: "Standard logo with text",
      htmlCode: `<a href="${baseUrl}" target="_blank" rel="noopener" title="This website is verified by BrowseSafe">
  <div style="display: flex; align-items: center; margin: 10px 0; font-family: Arial, sans-serif;">
    <div style="position: relative; width: 36px; height: 40px; margin-right: 10px;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="40" fill="#e11d48" stroke="#be123c" stroke-width="1">
        <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.95C5.258 16.84 4.524 9.35 4.525 7.15l7.475-3.737 7.475 3.737c0 2.218-.764 9.675-7.475 12.8z"></path>
        <path d="M16.4 9.42 11 7.84v2.255l2.75.68L11 12.43v2.31l5.4-2.734c.35-.19.6-.425.6-1.284 0-.865-.25-1.11-.6-1.3z"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" stroke-width="3" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <div>
      <div style="font-weight: bold; font-size: 16px; color: #1e3a8a;">BrowseSafe</div>
      <div style="font-size: 12px; color: #64748b;">Verified Secure</div>
    </div>
  </div>
</a>`,
      jsCode: `// Add BrowseSafe verification badge to your website
(function() {
  const badgeContainer = document.createElement('div');
  badgeContainer.innerHTML = \`<a href="${baseUrl}" target="_blank" rel="noopener" title="This website is verified by BrowseSafe">
  <div style="display: flex; align-items: center; margin: 10px 0; font-family: Arial, sans-serif;">
    <div style="position: relative; width: 36px; height: 40px; margin-right: 10px;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="40" fill="#e11d48" stroke="#be123c" stroke-width="1">
        <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.95C5.258 16.84 4.524 9.35 4.525 7.15l7.475-3.737 7.475 3.737c0 2.218-.764 9.675-7.475 12.8z"></path>
        <path d="M16.4 9.42 11 7.84v2.255l2.75.68L11 12.43v2.31l5.4-2.734c.35-.19.6-.425.6-1.284 0-.865-.25-1.11-.6-1.3z"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" stroke-width="3" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <div>
      <div style="font-weight: bold; font-size: 16px; color: #1e3a8a;">BrowseSafe</div>
      <div style="font-size: 12px; color: #64748b;">Verified Secure</div>
    </div>
  </div>
</a>\`;
  
  // Append to your preferred container
  document.getElementById('browsesafe-badge') || document.body.appendChild(badgeContainer);
})();`
    },
    {
      name: "Compact Badge",
      description: "Simple shield badge for smaller spaces",
      htmlCode: `<a href="${baseUrl}" target="_blank" rel="noopener" title="This website is verified by BrowseSafe">
  <div style="display: flex; align-items: center; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 12px; max-width: 180px; font-family: Arial, sans-serif;">
    <div style="position: relative; width: 24px; height: 24px; margin-right: 8px;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#e11d48" stroke="#be123c" stroke-width="1">
        <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.95C5.258 16.84 4.524 9.35 4.525 7.15l7.475-3.737 7.475 3.737c0 2.218-.764 9.675-7.475 12.8z"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="white" stroke-width="3" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <div style="font-size: 12px; font-weight: 600; color: #1e3a8a;">BrowseSafe Verified</div>
  </div>
</a>`,
      jsCode: `// Add BrowseSafe compact badge to your website
(function() {
  const badgeContainer = document.createElement('div');
  badgeContainer.innerHTML = \`<a href="${baseUrl}" target="_blank" rel="noopener" title="This website is verified by BrowseSafe">
  <div style="display: flex; align-items: center; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 12px; max-width: 180px; font-family: Arial, sans-serif;">
    <div style="position: relative; width: 24px; height: 24px; margin-right: 8px;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#e11d48" stroke="#be123c" stroke-width="1">
        <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.95C5.258 16.84 4.524 9.35 4.525 7.15l7.475-3.737 7.475 3.737c0 2.218-.764 9.675-7.475 12.8z"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="white" stroke-width="3" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <div style="font-size: 12px; font-weight: 600; color: #1e3a8a;">BrowseSafe Verified</div>
  </div>
</a>\`;
  
  // Append to your preferred container
  document.getElementById('browsesafe-badge') || document.body.appendChild(badgeContainer);
})();`
    }
  ];

  // Preview function
  const renderPreview = (htmlCode: string) => {
    return { __html: htmlCode };
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Helmet>
        <title>Install Our Logo | BrowseSafe</title>
        <meta name="description" content="Install the BrowseSafe verification logo on your website to show visitors that your site has been verified as secure and trustworthy." />
      </Helmet>
      
      <h1 className="text-3xl font-bold text-primary-900 mb-6">Install Our Logo</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="prose max-w-none mb-6">
          <p className="text-lg">
            Display a BrowseSafe verification badge on your website to increase visitor trust and confidence.
            Our badges are designed to seamlessly integrate with any website design and indicate that your site
            has been verified through our comprehensive security checks.
          </p>
          <p>
            Choose from several badge styles below and copy the code to add it to your website.
            Each badge links back to your BrowseSafe verification profile, allowing visitors to verify your site's security status.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {logoVariations.map((variation, index) => (
            <div key={index} className="border rounded-lg overflow-hidden bg-gray-50">
              <div className="p-4 bg-white border-b">
                <h3 className="font-bold text-lg mb-1">{variation.name}</h3>
                <p className="text-sm text-gray-600">{variation.description}</p>
              </div>
              
              <div 
                className="p-6 flex items-center justify-center bg-gradient-to-tr from-slate-50 to-gray-100"
                dangerouslySetInnerHTML={renderPreview(variation.htmlCode)}
              />
              
              <div className="p-4">
                <Tabs defaultValue="html">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="html">HTML</TabsTrigger>
                    <TabsTrigger value="js">JavaScript</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="html" className="relative">
                    <Textarea
                      className="h-32 font-mono text-xs"
                      readOnly
                      value={variation.htmlCode}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={() => copyToClipboard(variation.htmlCode, index * 2)}
                    >
                      {copiedIndex === index * 2 ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copy HTML</span>
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="js" className="relative">
                    <Textarea
                      className="h-32 font-mono text-xs"
                      readOnly
                      value={variation.jsCode}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={() => copyToClipboard(variation.jsCode, index * 2 + 1)}
                    >
                      {copiedIndex === index * 2 + 1 ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copy JavaScript</span>
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-primary-900 mb-4">Installation Instructions</h2>
        <div className="prose max-w-none">
          <h3 className="text-xl font-semibold mt-6 mb-3">Using HTML</h3>
          <ol className="list-decimal pl-5 space-y-3">
            <li>Copy the HTML code for your preferred badge style.</li>
            <li>Paste the code into your website's HTML where you want the badge to appear.</li>
          </ol>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Using JavaScript</h3>
          <ol className="list-decimal pl-5 space-y-3">
            <li>Copy the JavaScript code for your preferred badge style.</li>
            <li>Add the code to your website's JavaScript file or inside a <code>&lt;script&gt;</code> tag.</li>
            <li>The script will automatically append the badge to your page's body.</li>
            <li>Alternatively, add a <code>&lt;div id="browsesafe-badge"&gt;&lt;/div&gt;</code> element where you want the badge to appear.</li>
          </ol>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Placement Recommendations</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Footer section - A common location that doesn't interfere with main content</li>
            <li>About or Contact pages - Builds trust on pages where visitors seek information about your business</li>
            <li>Checkout pages - Increases confidence during critical transaction moments</li>
            <li>Sidebar - Visible throughout the visitor's journey on your site</li>
          </ul>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> By adding our logo to your website, you agree to our terms of service and 
              acknowledge that the logo may only be used on websites that have been verified through BrowseSafe's
              security checks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}