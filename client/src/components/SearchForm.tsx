import { useState, FormEvent } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "@/components/icons";

interface SearchFormProps {
  className?: string;
  darkMode?: boolean;
}

export default function SearchForm({ className = "", darkMode = false }: SearchFormProps) {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [, setLocation] = useLocation();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    
    if (!websiteUrl.trim()) return;
    
    // Basic URL validation
    let url = websiteUrl.trim();
    
    // Prepend https:// if not present
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    
    // Encode the URL and navigate to scan page
    const encodedUrl = encodeURIComponent(url);
    setLocation(`/scan?url=${encodedUrl}`);
  };

  const popularSearches = [
    "amazon-scam.com",
    "paypal-verify.net",
    "facebook.com"
  ];

  const handlePopularSearch = (url: string) => {
    setWebsiteUrl(url);
  };

  const inputBgColor = darkMode ? "bg-primary-800/60 border-primary-700" : "bg-white border-gray-300";
  const textColor = "text-primary-900"; // Always use dark text for better visibility
  const placeholderColor = "placeholder:text-primary-500"; // Consistent placeholder color
  const linkColor = darkMode ? "text-primary-300 hover:text-white" : "text-primary-600 hover:text-accent-600";

  return (
    <div className={`${className} ${darkMode ? "bg-primary-800/40" : "bg-white"} rounded-lg shadow-lg p-6`}>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Enter website URL (e.g., example.com)"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          className={`flex-grow ${inputBgColor} ${textColor} ${placeholderColor} px-4 py-3`}
        />
        <Button 
          type="submit" 
          className="bg-accent-600 hover:bg-accent-700 text-white font-medium px-6 py-3"
        >
          <Search className="mr-2 h-4 w-4" />
          Scan Website
        </Button>
      </form>
      
      <div className={`flex flex-wrap justify-center mt-4 ${darkMode ? "text-primary-400" : "text-primary-600"} text-sm`}>
        <p>Popular searches:</p>
        <div className="flex flex-wrap gap-2 ml-2">
          {popularSearches.map((url, index) => (
            <div key={url} className="flex items-center">
              <button 
                type="button"
                onClick={() => handlePopularSearch(url)}
                className={linkColor}
              >
                {url}
              </button>
              {index < popularSearches.length - 1 && (
                <span className={darkMode ? "text-primary-600 mx-1" : "text-primary-300 mx-1"}>•</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
