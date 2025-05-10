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
    
    console.log("Searching for URL:", url);
    
    // Encode the URL and navigate to scan page with force=true to ensure fresh data
    const encodedUrl = encodeURIComponent(url);
    console.log("Encoded URL:", encodedUrl);
    console.log("Navigating to:", `/scan?url=${encodedUrl}&force=true`);
    
    setLocation(`/scan?url=${encodedUrl}&force=true`);
  };

  const popularSearches = [
    "amazon-scam.com",
    "paypal-verify.net",
    "facebook.com"
  ];

  const handlePopularSearch = (url: string) => {
    // Set the URL in the input field
    setWebsiteUrl(url);
    
    // Then immediately submit the search
    // Basic URL validation
    let searchUrl = url.trim();
    
    // Prepend https:// if not present
    if (!/^https?:\/\//i.test(searchUrl)) {
      searchUrl = `https://${searchUrl}`;
    }
    
    console.log("Popular search for URL:", searchUrl);
    
    // Encode the URL and navigate to scan page with force=true to ensure fresh data
    const encodedUrl = encodeURIComponent(searchUrl);
    console.log("Encoded URL:", encodedUrl);
    console.log("Navigating to:", `/scan?url=${encodedUrl}&force=true`);
    
    setLocation(`/scan?url=${encodedUrl}&force=true`);
  };

  // Set very clear background and text colors for all modes
  const inputBgColor = darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300";
  const textColor = darkMode ? "text-white" : "text-black"; // Ensures maximum contrast in both modes
  const placeholderColor = darkMode ? "placeholder:text-gray-400" : "placeholder:text-gray-500";
  const linkColor = darkMode ? "text-primary-300 hover:text-white" : "text-primary-600 hover:text-accent-600";

  return (
    <div className={`${className} ${darkMode ? "bg-primary-800/40" : "bg-white"} rounded-lg shadow-lg p-6`}>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Enter website URL (e.g., example.com)"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          className={`flex-grow ${inputBgColor} ${textColor} ${placeholderColor} px-4 py-3 focus:ring-2 focus:ring-accent focus:border-accent`}
        />
        <Button 
          type="submit" 
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-3 shadow-lg"
        >
          <Search className="mr-2 h-5 w-5" />
          Scan Website
        </Button>
      </form>
      
      <div className={`flex flex-wrap justify-center mt-4 ${darkMode ? "bg-indigo-900/80 backdrop-blur-md" : "bg-gray-100"} px-4 py-2 rounded-lg border ${darkMode ? "border-blue-700/80" : "border-gray-300"} text-sm shadow-md`}>
        <p className={`font-medium ${darkMode ? "text-white" : "text-gray-700"}`}>Popular searches:</p>
        <div className="flex flex-wrap gap-2 ml-2">
          {popularSearches.map((url, index) => (
            <div key={url} className="flex items-center">
              <button 
                type="button"
                onClick={() => handlePopularSearch(url)}
                className={`font-medium ${darkMode ? "text-blue-300 hover:text-white" : "text-blue-600 hover:text-blue-800"}`}
              >
                {url}
              </button>
              {index < popularSearches.length - 1 && (
                <span className={darkMode ? "text-blue-400 mx-1" : "text-blue-300 mx-1"}>•</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
