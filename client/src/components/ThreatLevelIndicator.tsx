import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, LabelList, PieChart, Pie, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle, Shield, ShieldAlert, ShieldCheck, ShieldQuestion, ShieldX } from 'lucide-react';

interface ThreatLevelIndicatorProps {
  trustScore: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function ThreatLevelIndicator({ 
  trustScore, 
  className = "", 
  showLabel = true,
  size = 'md'
}: ThreatLevelIndicatorProps) {
  // Calculate the threat level (inverse of trust score)
  const threatLevel = 100 - trustScore;
  
  // Determine color based on threat level
  const getColor = (score: number) => {
    if (score <= 20) return 'var(--green-600)'; // Safe - green
    if (score <= 40) return 'var(--green-500)'; // Mostly safe - lighter green
    if (score <= 60) return 'var(--yellow-500)'; // Moderate - yellow
    if (score <= 80) return 'var(--orange-500)'; // Suspicious - orange
    return 'var(--red-600)'; // Dangerous - red
  };
  
  // Get color for the gradient (lighter variant)
  const getGradientColor = (score: number) => {
    if (score <= 20) return 'var(--green-400)'; // Safe - light green
    if (score <= 40) return 'var(--green-300)'; // Mostly safe - lighter green
    if (score <= 60) return 'var(--yellow-300)'; // Moderate - light yellow
    if (score <= 80) return 'var(--orange-300)'; // Suspicious - light orange
    return 'var(--red-400)'; // Dangerous - light red
  };
  
  // Determine label based on threat level
  const getThreatLabel = (score: number) => {
    if (score <= 20) return 'Very Low';
    if (score <= 40) return 'Low';
    if (score <= 60) return 'Moderate';
    if (score <= 80) return 'High';
    return 'Very High';
  };
  
  // Get appropriate icon based on threat level
  const getThreatIcon = (score: number) => {
    if (score <= 20) return <ShieldCheck size={size === 'sm' ? 18 : 24} className="text-green-600" />;
    if (score <= 40) return <Shield size={size === 'sm' ? 18 : 24} className="text-green-500" />;
    if (score <= 60) return <ShieldQuestion size={size === 'sm' ? 18 : 24} className="text-yellow-500" />;
    if (score <= 80) return <ShieldAlert size={size === 'sm' ? 18 : 24} className="text-orange-500" />;
    return <ShieldX size={size === 'sm' ? 18 : 24} className="text-red-600" />;
  };
  
  // Create data for the gauge chart
  const data = [
    { 
      name: 'Threat Level', 
      value: threatLevel,
      label: getThreatLabel(threatLevel),
      color: getColor(threatLevel),
      gradientColor: getGradientColor(threatLevel)
    }
  ];
  
  // Data for the pie chart segments
  const pieData = [
    { name: 'Safe', value: 20, color: 'var(--green-600)' },
    { name: 'Low', value: 20, color: 'var(--green-500)' },
    { name: 'Moderate', value: 20, color: 'var(--yellow-500)' },
    { name: 'High', value: 20, color: 'var(--orange-500)' },
    { name: 'Danger', value: 20, color: 'var(--red-600)' }
  ];

  // Determine the height based on size
  const getHeight = () => {
    switch(size) {
      case 'sm': return 60;
      case 'lg': return 120;
      default: return 90;
    }
  };
  
  // Custom label for the gauge
  const renderGaugeLabel = (props: any) => {
    const { x, y, width, value, index } = props;
    const label = data[index].label;
    
    // Position the text within the bar
    return (
      <text 
        x={x + width / 2} 
        y={y + (size === 'sm' ? 10 : 16)}
        fill="#fff" 
        textAnchor="middle" 
        dominantBaseline="middle"
        fontWeight="bold"
        fontSize={size === 'sm' ? 12 : 14}
        strokeWidth="0.5"
        stroke="#00000020"
      >
        {showLabel ? `${label} (${value}%)` : `${value}%`}
      </text>
    );
  };

  // Render a gauge meter with gradient and animated appearance
  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-2 flex justify-between items-center text-sm">
          <span className="font-medium">Threat Level</span>
          <div className="flex items-center gap-2">
            {getThreatIcon(threatLevel)}
            <span className="font-bold" style={{ color: getColor(threatLevel) }}>
              {getThreatLabel(threatLevel)} ({threatLevel}%)
            </span>
          </div>
        </div>
      )}
      
      {/* Modern gauge-style visualization */}
      <div className="relative">
        <div className="w-full h-12 bg-gray-200 rounded-full overflow-hidden mb-1 shadow-inner border border-gray-300">
          <div 
            className="h-full flex items-center justify-center transition-all duration-500 ease-out"
            style={{ 
              width: `${threatLevel}%`,
              background: `linear-gradient(90deg, ${getColor(threatLevel)} 0%, ${getColor(threatLevel)} 100%)`,
              boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)'
            }}
          >
            {threatLevel > 15 && (
              <span className="text-white font-bold text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                {getThreatLabel(threatLevel)} ({threatLevel}%)
              </span>
            )}
          </div>
        </div>
        
        <div className="w-full grid grid-cols-5 gap-0.5 mb-3">
          {[
            { color: 'bg-green-600', label: 'Very Low' },
            { color: 'bg-green-500', label: 'Low' },
            { color: 'bg-yellow-500', label: 'Medium' },
            { color: 'bg-orange-500', label: 'High' },
            { color: 'bg-red-600', label: 'Very High' }
          ].map((segment, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`h-2.5 w-full ${segment.color} ${index === 0 ? 'rounded-l-full' : ''} ${index === 4 ? 'rounded-r-full' : ''} border border-gray-200 shadow-sm`}
              ></div>
              <span className="text-xs font-medium mt-1" style={{ color: segment.color.replace('bg-', 'var(--') + ')' }}>{segment.label}</span>
            </div>
          ))}
        </div>

        {/* Risk indicators */}
        <div className="flex justify-between text-xs">
          <div className="flex items-center">
            <CheckCircle size={14} className="text-green-600 mr-1" />
            <span className="text-green-700 font-medium">Low Risk</span>
          </div>
          <div className="flex items-center">
            <AlertTriangle size={14} className="text-yellow-500 mr-1" />
            <span className="text-yellow-600 font-medium">Medium</span>
          </div>
          <div className="flex items-center">
            <ShieldX size={14} className="text-red-600 mr-1" />
            <span className="text-red-700 font-medium">High Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
}