import { 
  ShieldCheck, 
  Search, 
  Clock, 
  ExternalLink, 
  Flag, 
  Share2,
  CheckCircle,
  AlertTriangle,
  XCircle, 
  Gauge,
  Zap,
  Database,
  Lock,
  Globe,
  Server,
  FileCheck
} from "lucide-react";

export {
  ShieldCheck,
  Search,
  Clock,
  ExternalLink,
  Flag,
  Share2,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Gauge,
  Zap,
  Database,
  Lock,
  Globe,
  Server,
  FileCheck
};

export interface SecurityIconProps {
  type: "DomainVerification" | "WhoisAnalysis" | "IpVerification" | "MalwareCheck";
  className?: string;
}

export function SecurityIcon({ type, className = "w-12 h-12" }: SecurityIconProps) {
  switch (type) {
    case "DomainVerification":
      return <ShieldCheck className={`${className} text-accent-500`} />;
    case "WhoisAnalysis":
      return <Search className={`${className} text-accent-500`} />;
    case "IpVerification":
      return <Globe className={`${className} text-accent-500`} />;
    case "MalwareCheck":
      return <FileCheck className={`${className} text-accent-500`} />;
    default:
      return <ShieldCheck className={`${className} text-accent-500`} />;
  }
}

export interface StatusBadgeProps {
  status: "safe" | "suspicious" | "dangerous";
  size?: "sm" | "md" | "lg";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  let bgColor = "bg-success-light text-success";
  let text = "Safe";
  let Icon = CheckCircle;
  
  if (status === "suspicious") {
    bgColor = "bg-warning-light text-warning";
    text = "Suspicious";
    Icon = AlertTriangle;
  } else if (status === "dangerous") {
    bgColor = "bg-danger-light text-danger";
    text = "Dangerous";
    Icon = XCircle;
  }
  
  const sizeClasses = {
    sm: "py-1 px-2 text-xs",
    md: "py-1 px-3 text-sm",
    lg: "py-2 px-4 text-base"
  };
  
  return (
    <div className={`${bgColor} ${sizeClasses[size]} rounded-full font-medium flex items-center gap-1`}>
      <Icon className="w-3 h-3" />
      <span>{text}</span>
    </div>
  );
}
