import React from 'react';
import { Helmet } from 'react-helmet';

export default function TermsConditions() {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions | BrowseSafe Website Security Scanner</title>
        <meta 
          name="description" 
          content="Read our Terms and Conditions to understand the rules and guidelines for using BrowseSafe's Website Security Scanner service." 
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
          <p className="text-gray-500 mb-8">Last updated: May 7, 2025</p>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Agreement to Terms</h2>
              <p className="text-gray-700">
                By accessing and using BrowseSafe's website security scanning service, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you disagree with any part of these terms, you may not access the service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
              <p className="text-gray-700">
                BrowseSafe provides a website security scanning service that helps users assess the trustworthiness and security of websites by analyzing various factors including domain age, security features, and presence on blacklists. The service is provided on an "as is" and "as available" basis.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Use of the Service</h2>
              <p className="text-gray-700 mb-3">
                You agree to use the service only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use of the service. Prohibited uses include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Using the service to scan websites without proper authorization</li>
                <li>Attempting to bypass any security measures of our service</li>
                <li>Using our service for any illegal or unauthorized purpose</li>
                <li>Interfering with or disrupting the functionality of our service</li>
                <li>Scraping or collecting data from our service using automated means</li>
                <li>Impersonating another person or entity</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Account Responsibility</h2>
              <p className="text-gray-700">
                If you create an account with us, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Intellectual Property</h2>
              <p className="text-gray-700">
                The service and its original content, features, and functionality are owned by TrustGuard and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not copy, modify, create derivative works, publicly display, publicly perform, republish, or transmit any of the material without our explicit permission.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
              <p className="text-gray-700">
                In no event shall TrustGuard, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the service; (ii) any conduct or content of any third party on the service; (iii) any content obtained from the service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Accuracy Disclaimer</h2>
              <p className="text-gray-700">
                While we strive to provide accurate information about the websites we scan, we make no warranties or representations about the accuracy or completeness of the service's content. The security assessment provided is based on available data and automated analysis, and should not be the sole factor in determining whether to trust a website. You acknowledge that you use the service at your own risk.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Third-Party Services</h2>
              <p className="text-gray-700">
                Our service may use third-party services for website security analysis. We are not responsible for the content, privacy policies, or practices of any third-party services. These third parties have their own terms and conditions and privacy policies governing the use of their services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Indemnification</h2>
              <p className="text-gray-700">
                You agree to defend, indemnify, and hold harmless TrustGuard, its directors, employees, partners, agents, suppliers, and affiliates, from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including attorneys' fees) arising out of or relating to your violation of these Terms or your use of the service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">10. Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">11. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">12. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms, please contact us at terms@trustguard.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}