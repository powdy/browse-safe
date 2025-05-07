import React from 'react';
import { Helmet } from 'react-helmet';

export default function Disclaimer() {
  return (
    <>
      <Helmet>
        <title>Disclaimer | BrowseSafe Website Security Scanner</title>
        <meta 
          name="description" 
          content="Important disclaimers regarding BrowseSafe's Website Security Scanner service, including limitations and usage guidelines." 
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
          <p className="text-gray-500 mb-8">Last updated: May 7, 2025</p>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Website Information Disclaimer</h2>
              <p className="text-gray-700">
                The information provided by BrowseSafe's Website Security Scanner ("we," "us," or "our") is for general informational and educational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Security Assessment Limitations</h2>
              <p className="text-gray-700">
                Our website security scanning service provides an assessment based on various factors including domain age, security features, and presence on blacklists. However, this assessment has limitations:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>It may not detect all security issues or malicious content on a website</li>
                <li>It relies on third-party data sources which may have their own limitations</li>
                <li>It provides a point-in-time assessment that may not reflect current website status</li>
                <li>It cannot guarantee that a website is completely safe or completely dangerous</li>
                <li>It should be used as one of several factors in your decision-making process</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. No Professional Advice</h2>
              <p className="text-gray-700">
                The content on our website is not intended to be a substitute for professional cybersecurity advice, diagnosis, or treatment. Always seek the advice of qualified IT security professionals with any questions you may have regarding security matters. Never disregard professional advice or delay in seeking it because of something you have read on our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. No Responsibility for Third-Party Websites</h2>
              <p className="text-gray-700">
                Our service allows you to scan third-party websites to assess their security. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites. By using our service, you acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
              <p className="text-gray-700">
                In no event shall TrustGuard, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Your access to or use of or inability to access or use the service</li>
                <li>Any decisions made based on the security assessments provided by our service</li>
                <li>Any conduct or content of any third party on the service</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                <li>Any information provided by our service being inaccurate, incomplete, or out of date</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. "As Is" and "As Available" Disclaimer</h2>
              <p className="text-gray-700">
                The Service is provided to you on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. External Data Sources</h2>
              <p className="text-gray-700">
                Our service relies on external data sources and APIs such as domain registries, WHOIS databases, IP reputation services, and security threat feeds. We do not guarantee the accuracy, timeliness, or availability of these external data sources. Changes to these external sources may affect the quality or availability of our security assessments.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Changes to Disclaimer</h2>
              <p className="text-gray-700">
                We reserve the right to make changes to this Disclaimer at any time for any reason. We will notify users of any changes by updating the "Last Updated" date of this Disclaimer. You are encouraged to review this Disclaimer periodically for any changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this Disclaimer, please contact us at disclaimer@trustguard.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}