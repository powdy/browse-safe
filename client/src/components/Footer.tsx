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
                <h2 className="text-xl font-heading font-bold">BrowseSafe</h2>
                <p className="text-xs text-primary-400">Website Security Scanner</p>
              </div>
            </div>
            
            <p className="text-primary-300 text-sm mb-4">
              Helping you navigate the web safely by identifying potentially fraudulent websites and online scams.
            </p>
            
            <div className="flex space-x-4">
              <span className="text-primary-300 hover:text-white cursor-pointer">
                <FaTwitter />
              </span>
              <span className="text-primary-300 hover:text-white cursor-pointer">
                <FaFacebook />
              </span>
              <span className="text-primary-300 hover:text-white cursor-pointer">
                <FaLinkedin />
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="text-primary-100 font-medium mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-primary-300">
              <li><Link href="/"><span className="hover:text-white cursor-pointer">Website Scanner</span></Link></li>
              <li><Link href="/install-logo"><span className="hover:text-white cursor-pointer">Install Our Logo</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-primary-100 font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-primary-300">
              <li><Link href="/how-it-works"><span className="hover:text-white cursor-pointer">How It Works</span></Link></li>
              <li><Link href="/about-us"><span className="hover:text-white cursor-pointer">About Us</span></Link></li>
              <li><Link href="/online-safety-guide"><span className="hover:text-white cursor-pointer">Online Safety Guide</span></Link></li>
              <li><a href="https://blog.browse-safe.com" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer">Security Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-primary-100 font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-primary-300">
              <li><Link href="/privacy-policy"><span className="hover:text-white cursor-pointer">Privacy Policy</span></Link></li>
              <li><Link href="/terms-conditions"><span className="hover:text-white cursor-pointer">Terms & Conditions</span></Link></li>
              <li><Link href="/disclaimer"><span className="hover:text-white cursor-pointer">Disclaimer</span></Link></li>
              <li><Link href="/cookie-policy"><span className="hover:text-white cursor-pointer">Cookie Policy</span></Link></li>
              <li><Link href="/contact-us"><span className="hover:text-white cursor-pointer">Contact Us</span></Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-primary-400 mb-4 md:mb-0">&copy; {new Date().getFullYear()} BrowseSafe. All rights reserved.</p>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-400">
              <CookieConsent />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
