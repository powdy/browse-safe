import { Helmet } from "react-helmet";
import { Mail, Phone, MapPin, Clock, Shield, AlertTriangle, HelpCircle, Send } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <Helmet>
        <title>Contact Us | BrowseSafe</title>
        <meta name="description" content="Get in touch with the BrowseSafe team. We're here to help you with any questions about our website security scanning service." />
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-900 to-primary-700 text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yOS41IDIyLjVMNDMuNSA1NS4zTTM0LjUgMi41TDQ5LjUgMzRNMTQuNSA1LjVMMjcuNSA0MC41IiBzdHJva2U9IndoaXRlIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz4KPC9zdmc+')]"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              We're dedicated to making the web safer. Have questions, feedback, or need assistance? We're here to help.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12 -mt-8">
        <div className="max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10 transform hover:scale-[1.01] transition-transform duration-300">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="p-8 text-center hover:bg-slate-50 transition-colors duration-300">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h3>
                <p className="text-gray-500 mb-3">For inquiries and support</p>
                <a 
                  href="mailto:webmaster@browse-safe.com" 
                  className="text-primary-600 hover:text-primary-800 font-medium flex items-center justify-center gap-1 group"
                >
                  webmaster@browse-safe.com
                  <Send className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <div className="p-8 text-center hover:bg-slate-50 transition-colors duration-300">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Report a Website</h3>
                <p className="text-gray-500 mb-3">Help protect others from scams</p>
                <a 
                  href="/report-website" 
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Submit a Report
                </a>
              </div>
              
              <div className="p-8 text-center hover:bg-slate-50 transition-colors duration-300">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Support</h3>
                <p className="text-gray-500 mb-3">Response within 24-48 hours</p>
                <div className="text-gray-700">
                  <Clock className="w-4 h-4 inline mr-1" /> Monday-Friday
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQs */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                <div className="py-5">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">How accurate are your website safety ratings?</h3>
                  <p className="text-gray-600">
                    Our ratings combine data from multiple security factors including domain age, SSL certificates, blacklist status, and more. 
                    While we strive for accuracy using state-of-the-art analysis methods, we recommend using our service as one of several tools 
                    to evaluate website security.
                  </p>
                </div>
                
                <div className="py-5">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Why did my website receive a low trust score?</h3>
                  <p className="text-gray-600">
                    Trust scores are calculated based on numerous factors. New domains, missing SSL certificates, or suspicious patterns 
                    can all contribute to lower scores. Contact us if you believe your site was incorrectly flagged.
                  </p>
                </div>
                
                <div className="py-5">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Can I use your logo on my website?</h3>
                  <p className="text-gray-600">
                    Yes! If your website receives a positive trust score, you can add our trust badge to your site. 
                    Visit our <a href="/install-logo" className="text-primary-600 hover:text-primary-500 underline">Install Logo</a> page for instructions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl overflow-hidden mb-10">
            <div className="p-8 md:p-10 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Stay Protected Online</h2>
                <p className="text-xl text-blue-100 mb-6">
                  Learn about the latest security threats and how to protect yourself and your business.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="/online-safety-guide" 
                    className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-200"
                  >
                    Read Our Safety Guide
                  </a>
                  <a 
                    href="https://blog.browse-safe.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition duration-200"
                  >
                    Visit Our Blog
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}