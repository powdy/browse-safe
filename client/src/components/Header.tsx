import { Link, useLocation } from "wouter";
import { Check, ShieldCheck } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about-us", label: "About Us" },
    { href: "/online-safety-guide", label: "Safety Guide" },
    { href: "/recent-scans", label: "Recent Scans" },
    { href: "/report", label: "Report Website" }
  ];

  return (
    <header className="bg-white shadow-md border-b border-primary-100">
      <div className="container mx-auto px-4 py-4 md:py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/">
          <a className="flex items-center mb-4 md:mb-0 group">
            <div className="flex items-center justify-center h-16 w-14 mr-3 transition-all duration-300 relative">
              <ShieldCheck className="h-14 w-14 text-red-600 fill-red-600 stroke-red-700 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-extrabold text-primary-700 group-hover:text-accent-600 transition-all duration-300">BrowseSafe</h1>
              <p className="text-sm font-medium text-primary-500 group-hover:text-primary-600 transition-colors duration-300">Website Security Scanner</p>
            </div>
          </a>
        </Link>
        
        <nav className="flex flex-wrap justify-center md:justify-end gap-1 md:gap-2">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}>
              <a className={`px-3 py-2 rounded-md transition-all duration-300 font-medium text-sm
                ${location === link.href 
                  ? "bg-primary-50 text-accent-600 font-semibold" 
                  : "text-primary-600 hover:bg-primary-50/80 hover:text-primary-700"
                }`}>
                {link.label}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
