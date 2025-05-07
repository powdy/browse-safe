import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import ThreatLevelIndicator from './ThreatLevelIndicator';
import { Shield, ShieldAlert, ShieldX, AlertTriangle, Lock, LockOpen, CheckCircle, XCircle, Info } from 'lucide-react';
import { StatusBadge } from './icons';
import { Button } from '@/components/ui/button';

interface ThreatLevelPageProps {
  trustScore: number;
  status: "safe" | "suspicious" | "dangerous";
  domainInfo: {
    domainAge: string;
    hasValidSSL: boolean;
    hasMalware: boolean;
    hasPhishing: boolean;
    blacklistStatus: string;
    suspiciousPatterns: string;
  };
}

export default function ThreatLevelPage({
  trustScore,
  status,
  domainInfo
}: ThreatLevelPageProps) {
  const threatLevel = 100 - trustScore;
  
  // Function to get threat level text
  const getThreatLevelText = () => {
    if (threatLevel <= 20) return { 
      title: 'Very Low Threat', 
      description: 'This website appears to be safe and trustworthy.', 
      icon: <Shield className="h-6 w-6 text-green-600" /> 
    };
    
    if (threatLevel <= 40) return { 
      title: 'Low Threat', 
      description: 'This website seems legitimate but has some minor concerns.',
      icon: <Shield className="h-6 w-6 text-green-500" /> 
    };
    
    if (threatLevel <= 60) return { 
      title: 'Moderate Threat', 
      description: 'This website has some suspicious characteristics. Exercise caution.',
      icon: <ShieldAlert className="h-6 w-6 text-yellow-500" /> 
    };
    
    if (threatLevel <= 80) return { 
      title: 'High Threat', 
      description: 'This website has several red flags. Be very careful and consider avoiding it.',
      icon: <ShieldAlert className="h-6 w-6 text-orange-500" /> 
    };
    
    return { 
      title: 'Very High Threat', 
      description: 'This website is likely fraudulent or malicious. Do not proceed.',
      icon: <ShieldX className="h-6 w-6 text-red-600" /> 
    };
  };
  
  // Get threat text info
  const threatInfo = getThreatLevelText();
  
  // Generate risk factors list
  const getRiskFactors = () => {
    const factors = [];
    
    if (domainInfo.domainAge.includes("month") || domainInfo.domainAge.includes("day") || domainInfo.domainAge === "Unknown") {
      factors.push({
        name: "New Domain", 
        description: "Recently registered domains have a higher likelihood of being fraudulent.",
        icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
        severity: "warning"
      });
    }
    
    if (!domainInfo.hasValidSSL) {
      factors.push({
        name: "No Secure Connection", 
        description: "This website does not use proper SSL encryption to protect your data.",
        icon: <LockOpen className="h-5 w-5 text-red-500" />,
        severity: "danger"
      });
    }
    
    if (domainInfo.hasMalware) {
      factors.push({
        name: "Malware Detected", 
        description: "This website may contain malicious software that could harm your device.",
        icon: <XCircle className="h-5 w-5 text-red-600" />,
        severity: "danger"
      });
    }
    
    if (domainInfo.hasPhishing) {
      factors.push({
        name: "Phishing Attempt", 
        description: "This website may be trying to steal your personal or financial information.",
        icon: <XCircle className="h-5 w-5 text-red-600" />,
        severity: "danger"
      });
    }
    
    if (!domainInfo.blacklistStatus.includes("Not")) {
      factors.push({
        name: "Blacklisted", 
        description: `This website appears on security blacklists: ${domainInfo.blacklistStatus}`,
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        severity: "danger"
      });
    }
    
    if (domainInfo.suspiciousPatterns && domainInfo.suspiciousPatterns !== "None") {
      factors.push({
        name: "Suspicious URL Patterns", 
        description: `The URL contains potentially misleading patterns: ${domainInfo.suspiciousPatterns}`,
        icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
        severity: "warning"
      });
    }
    
    // If no risk factors but low trust score, add a generic caution
    if (factors.length === 0 && trustScore < 80) {
      factors.push({
        name: "General Caution", 
        description: "While no specific threats were identified, this site has characteristics that warrant caution.",
        icon: <Info className="h-5 w-5 text-yellow-500" />,
        severity: "warning"
      });
    }
    
    // If no risk factors at all, show it's safe
    if (factors.length === 0) {
      factors.push({
        name: "No Threats Detected", 
        description: "This website appears to be safe and legitimate based on our analysis.",
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        severity: "success"
      });
    }
    
    return factors;
  };
  
  const riskFactors = getRiskFactors();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              {threatInfo.icon}
              <CardTitle>{threatInfo.title}</CardTitle>
            </div>
            <StatusBadge status={status} size="md" />
          </div>
          <CardDescription>
            {threatInfo.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ThreatLevelIndicator 
            trustScore={trustScore} 
            size="lg"
          />
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">What This Means</h3>
            <p className="text-gray-700 mb-4">
              {threatLevel > 60 ? (
                "This website poses significant security concerns. Proceeding to this site may put your personal information or device at risk."
              ) : threatLevel > 30 ? (
                "This website has some security concerns. Be cautious when sharing any personal information."
              ) : (
                "This website appears to be trustworthy based on our security analysis."
              )}
            </p>
            
            <div className="flex gap-3 mt-5">
              {status === "dangerous" && (
                <Button variant="destructive">
                  <ShieldX className="mr-2 h-4 w-4" /> 
                  Not Recommended to Visit
                </Button>
              )}
              
              {status === "suspicious" && (
                <Button variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300 hover:bg-yellow-100">
                  <ShieldAlert className="mr-2 h-4 w-4" /> 
                  Proceed with Caution
                </Button>
              )}
              
              {status === "safe" && (
                <Button variant="outline" className="bg-green-50 text-green-800 border-green-300 hover:bg-green-100">
                  <Shield className="mr-2 h-4 w-4" /> 
                  Safe to Visit
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Risk Factors</CardTitle>
          <CardDescription>
            Issues that contributed to this threat assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {riskFactors.map((factor, index) => (
              <li key={index} className="p-3 rounded-lg bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {factor.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{factor.name}</h4>
                      <Badge 
                        variant={factor.severity === "danger" ? "destructive" : 
                                factor.severity === "warning" ? "outline" : "default"}
                        className={factor.severity === "success" ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}
                      >
                        {factor.severity === "danger" ? "High Risk" : 
                          factor.severity === "warning" ? "Warning" : "Safe"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{factor.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}