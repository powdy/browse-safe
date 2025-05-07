import React from 'react';
import { Helmet } from 'react-helmet';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | BrowseSafe Website Security Scanner</title>
        <meta 
          name="description" 
          content="Read our Privacy Policy to understand how BrowseSafe collects, uses, and protects your personal information when you use our website security scanning service."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: May 7, 2025</p>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-gray-700">
                BrowseSafe ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our website security scanning service. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
              <p className="text-gray-700 mb-3">
                We collect information that you provide directly to us when using our service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>URLs of websites you submit for scanning</li>
                <li>Information about your device including IP address, browser type, and operating system</li>
                <li>Usage patterns when interacting with our website</li>
                <li>Information you provide when reporting websites</li>
                <li>Communications you send to us directly</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-3">
                We use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Perform security scans on the URLs you submit</li>
                <li>Build a database of website security assessments</li>
                <li>Detect and prevent fraudulent use of our service</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-3">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              <p className="text-gray-700">
                We use the following types of cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Essential cookies:</strong> Necessary for the website to function properly</li>
                <li><strong>Analytical/performance cookies:</strong> Allow us to recognize and count visitors and see how they move around our website</li>
                <li><strong>Functionality cookies:</strong> Used to recognize you when you return to our website</li>
                <li><strong>Targeting cookies:</strong> Record your visit to our website, the pages you visit, and the links you follow</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Third-Party Services</h2>
              <p className="text-gray-700 mb-3">
                We may use third-party services such as Google Analytics, VirusTotal, AbuseIPDB, and Google Safe Browsing API that collect, monitor, and analyze user data to help us improve our service and protect against threats. These third parties have their own privacy policies addressing how they use the information they collect.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Data Retention</h2>
              <p className="text-gray-700">
                We will retain your information for as long as your account is active or as needed to provide you services. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
              <p className="text-gray-700 mb-3">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>The right to access personal information we hold about you</li>
                <li>The right to request correction of inaccurate information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to object to processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Children's Privacy</h2>
              <p className="text-gray-700">
                Our service is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Changes to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at webmaster@browse-safe.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}