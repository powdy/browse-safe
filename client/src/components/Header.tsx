import { Link, useLocation } from "wouter";
import { ShieldCheck } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/recent-scans", label: "Recent Scans" },
    { href: "/report", label: "Report Website" }
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <Link href="/">
          <a className="flex items-center mb-4 md:mb-0">
            <div className="text-accent-600 mr-2">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-primary-900">TrustGuard</h1>
              <p className="text-sm text-primary-500">Website Security Scanner</p>
            </div>
          </a>
        </Link>
        
        <nav className="flex space-x-6">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}>
              <a className={`text-primary-700 hover:text-accent-600 font-medium text-sm ${
                location === link.href ? "text-accent-600" : ""
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
