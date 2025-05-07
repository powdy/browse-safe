import { Helmet } from "react-helmet";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Helmet>
        <title>Contact Us | BrowseSafe</title>
        <meta name="description" content="Get in touch with the BrowseSafe team. We're here to help you with any questions about our website security scanning service." />
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Contact Us</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
          <p className="text-lg mb-6">
            We appreciate your feedback and are here to help with any questions or concerns regarding online security.
            Our team is committed to making the web a safer place and would love to hear from you.
          </p>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-start">
              <Mail className="w-6 h-6 text-primary-600 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Email Us</h3>
                <p className="text-gray-600 mb-1">For general inquiries, feedback, or support:</p>
                <a 
                  href="mailto:webmaster@browse-safe.com" 
                  className="text-primary-600 hover:text-primary-800 font-medium"
                >
                  webmaster@browse-safe.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="w-6 h-6 text-primary-600 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Response Time</h3>
                <p className="text-gray-600">We strive to respond to all inquiries within 24-48 hours during business days.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Report a Suspicious Website</h2>
            <p className="mb-4">
              Found a website you suspect is fraudulent or malicious? Help protect others by reporting it through our 
              dedicated reporting system.
            </p>
            <a 
              href="/report-website" 
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded transition duration-150"
            >
              Report a Website
            </a>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800">How accurate are your website safety ratings?</h3>
              <p className="text-gray-600">
                Our ratings are based on multiple security factors including domain age, SSL certificates, blacklist status, and more. 
                While we strive for accuracy, we recommend using our service as one of several tools to evaluate website security.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800">Why did my website receive a low trust score?</h3>
              <p className="text-gray-600">
                Trust scores are calculated based on numerous factors. New domains, missing SSL certificates, or suspicious patterns 
                can all contribute to lower scores. Contact us if you believe your site was incorrectly flagged.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800">Can I use your logo on my website?</h3>
              <p className="text-gray-600">
                Yes! If your website receives a positive trust score, you can add our trust badge to your site. 
                Visit our <a href="/install-logo" className="text-primary-600 hover:underline">Install Logo</a> page for instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}