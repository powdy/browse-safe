import { Link } from "wouter";
import { ShieldCheck } from "lucide-react";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import CookieConsent from "./CookieConsent";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white py-12" style={{ backgroundColor: '#0F172A' }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="text-accent-500 mr-2">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold">TrustGuard</h2>
                <p className="text-xs text-primary-400">Website Security Scanner</p>
              </div>
            </div>
            
            <p className="text-primary-300 text-sm mb-4">
              Helping you navigate the web safely by identifying potentially fraudulent websites and online scams.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-primary-300 hover:text-white">
                <FaTwitter />
              </a>
              <a href="#" className="text-primary-300 hover:text-white">
                <FaFacebook />
              </a>
              <a href="#" className="text-primary-300 hover:text-white">
                <FaLinkedin />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-primary-100 font-medium mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-primary-300">
              <li><Link href="/"><a className="hover:text-white">Website Scanner</a></Link></li>
              <li><Link href="/how-it-works"><a className="hover:text-white">Domain Analysis</a></Link></li>
              <li><Link href="/how-it-works"><a className="hover:text-white">Blacklist Checker</a></Link></li>
              <li><Link href="/how-it-works"><a className="hover:text-white">SSL Verification</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-primary-100 font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-primary-300">
              <li><Link href="/how-it-works"><a className="hover:text-white">How It Works</a></Link></li>
              <li><Link href="/about-us"><a className="hover:text-white">About Us</a></Link></li>
              <li><Link href="/online-safety-guide"><a className="hover:text-white">Online Safety Guide</a></Link></li>
              <li><a href="#" className="hover:text-white">Security Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-primary-100 font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-primary-300">
              <li><Link href="/privacy-policy"><a className="hover:text-white">Privacy Policy</a></Link></li>
              <li><Link href="/terms-conditions"><a className="hover:text-white">Terms & Conditions</a></Link></li>
              <li><Link href="/disclaimer"><a className="hover:text-white">Disclaimer</a></Link></li>
              <li><Link href="/cookie-policy"><a className="hover:text-white">Cookie Policy</a></Link></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-primary-400 mb-4 md:mb-0">&copy; {new Date().getFullYear()} TrustGuard. All rights reserved.</p>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-400">
              <CookieConsent />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
