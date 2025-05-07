import { useEffect, useState } from "react";
import { ShieldCheck } from "@/components/icons";

interface LoadingStateProps {
  url: string;
}

export default function LoadingState({ url }: LoadingStateProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Checking domain information...");
  
  const scanSteps = [
    'Checking domain information...',
    'Analyzing WHOIS data...',
    'Verifying SSL certificate...',
    'Checking blacklist status...',
    'Scanning for malware...',
    'Analyzing content...',
    'Checking user reports...',
    'Calculating trust score...'
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 700);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const stepIndex = Math.min(Math.floor(progress / 13), scanSteps.length - 1);
    setCurrentStep(scanSteps[stepIndex]);
  }, [progress]);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="mb-6">
            <div className="animate-pulse inline-block text-accent-500 mb-4">
              <ShieldCheck className="w-16 h-16" />
            </div>
            <h3 className="text-2xl font-heading font-bold mb-2">Analyzing Website Security</h3>
            <p className="text-primary-600">
              We're scanning <span className="font-medium">{url}</span> for potential security issues
            </p>
          </div>
          
          <div className="max-w-md mx-auto mb-8">
            <div className="h-2 bg-gray-200 rounded-full mb-4">
              <div 
                className="h-2 bg-accent-500 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="text-sm text-primary-500">
              <span>{currentStep}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto text-sm">
            <div className="p-3 rounded-lg bg-gray-50">
              <span className="text-success mb-1 block text-lg">✓</span>
              <p>Domain Lookup</p>
            </div>
            <div className={`p-3 rounded-lg bg-gray-50 ${progress >= 25 ? "text-accent-500" : "text-primary-400 animate-pulse"}`}>
              <span className="mb-1 block text-lg">{progress >= 25 ? "✓" : "⟳"}</span>
              <p>WHOIS Data</p>
            </div>
            <div className={`p-3 rounded-lg bg-gray-50 ${progress >= 50 ? "text-accent-500" : "text-primary-400"}`}>
              <span className="mb-1 block text-lg">{progress >= 50 ? "✓" : "⟳"}</span>
              <p>Blacklist Check</p>
            </div>
            <div className={`p-3 rounded-lg bg-gray-50 ${progress >= 75 ? "text-accent-500" : "text-primary-400"}`}>
              <span className="mb-1 block text-lg">{progress >= 75 ? "✓" : "⟳"}</span>
              <p>Content Analysis</p>
            </div>
          </div>
          
          <p className="text-xs text-primary-400 mt-8">This analysis typically takes 30-60 seconds to complete</p>
        </div>
      </div>
    </section>
  );
}
