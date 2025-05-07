import React from 'react';
import { Helmet } from 'react-helmet';

export default function CookiePolicy() {
  return (
    <>
      <Helmet>
        <title>Cookie Policy | BrowseSafe Website Security Scanner</title>
        <meta 
          name="description" 
          content="Learn about how BrowseSafe uses cookies and similar technologies to enhance your experience with our website security scanning service." 
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: May 7, 2025</p>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. What Are Cookies</h2>
              <p className="text-gray-700">
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site. Cookies help provide a better and more personalized user experience.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. How We Use Cookies</h2>
              <p className="text-gray-700 mb-3">
                BrowseSafe uses cookies for various purposes, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Essential cookies:</strong> These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You may disable these by changing your browser settings, but this may affect how the website functions.</li>
                <li><strong>Analytics cookies:</strong> We use analytics cookies to collect information about how visitors use our website. This helps us improve our website and services. The information collected is aggregated and anonymized.</li>
                <li><strong>Functionality cookies:</strong> These cookies enable us to personalize your experience on our website. They can remember your preferences and choices to provide enhanced, personalized features.</li>
                <li><strong>Advertising cookies:</strong> These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.</li>
                <li><strong>Performance cookies:</strong> These cookies collect information about how visitors use a website, for instance which pages visitors go to most often. These cookies don't collect information that identifies a visitor.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Types of Cookies We Use</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Session cookies</td>
                      <td className="border border-gray-300 px-4 py-2">To remember your selections and preferences during your current visit</td>
                      <td className="border border-gray-300 px-4 py-2">Session (deleted when you close your browser)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-medium">Persistent cookies</td>
                      <td className="border border-gray-300 px-4 py-2">To remember your preferences for future visits and improve user experience</td>
                      <td className="border border-gray-300 px-4 py-2">From 30 days up to 2 years</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-medium">Google Analytics</td>
                      <td className="border border-gray-300 px-4 py-2">To analyze website usage and improve our services</td>
                      <td className="border border-gray-300 px-4 py-2">Up to 2 years</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-medium">Security cookies</td>
                      <td className="border border-gray-300 px-4 py-2">To authenticate users, prevent fraudulent use of accounts, and protect user data</td>
                      <td className="border border-gray-300 px-4 py-2">Session to 1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Third-Party Cookies</h2>
              <p className="text-gray-700 mb-3">
                Some cookies are placed by third parties on our website. These third parties may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Google Analytics (for website traffic analysis)</li>
                <li>Google AdSense (for displaying advertisements)</li>
                <li>Social media platforms (to enable sharing functionality)</li>
                <li>Security service providers (to protect against fraud and security threats)</li>
              </ul>
              <p className="text-gray-700 mt-3">
                These third parties have their own privacy policies and we encourage you to read them on their respective websites.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Cookie Consent</h2>
              <p className="text-gray-700">
                When you first visit our website, you will be shown a cookie banner that allows you to consent to our use of cookies. You can choose to accept all cookies, only essential cookies, or customize your preferences. You can change your cookie preferences at any time by clicking on the "Cookie Settings" link in the footer of our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Managing Cookies</h2>
              <p className="text-gray-700 mb-3">
                Most web browsers allow you to manage your cookie preferences through their settings. You can:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Delete cookies from your device</li>
                <li>Block cookies by activating the setting on your browser that allows you to refuse all or some cookies</li>
                <li>Set your browser to notify you when you receive a cookie</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Please note that if you choose to block or delete cookies, some features of our website may not function properly.
              </p>
              <p className="text-gray-700 mt-3">
                You can find information on how to manage cookies in your browser at the following links:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Google Analytics Opt-Out</h2>
              <p className="text-gray-700">
                To provide website visitors more choice on how their data is collected by Google Analytics, Google has developed the Google Analytics Opt-out Browser Add-on. This add-on communicates with the Google Analytics JavaScript to indicate that information about the website visit should not be sent to Google Analytics. The Google Analytics Opt-out Browser Add-on does not prevent information from being sent to the website itself or to other web analytics services.
              </p>
              <p className="text-gray-700 mt-3">
                <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Download Google Analytics Opt-out Browser Add-on</a>
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Changes to This Cookie Policy</h2>
              <p className="text-gray-700">
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date. You are advised to review this Cookie Policy periodically for any changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about our Cookie Policy, please contact us at webmaster@browse-safe.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}