import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { cn } from '@/lib/utils';

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
    if (score <= 40) return 'var(--lime-500)'; // Mostly safe - lime green
    if (score <= 60) return 'var(--yellow-500)'; // Moderate - yellow
    if (score <= 80) return 'var(--orange-500)'; // Suspicious - orange
    return 'var(--red-600)'; // Dangerous - red
  };
  
  // Determine label based on threat level
  const getThreatLabel = (score: number) => {
    if (score <= 20) return 'Very Low';
    if (score <= 40) return 'Low';
    if (score <= 60) return 'Moderate';
    if (score <= 80) return 'High';
    return 'Very High';
  };
  
  // Create data for the bar chart
  const data = [
    { 
      name: 'Threat Level', 
      value: threatLevel,
      label: getThreatLabel(threatLevel)
    }
  ];
  
  // Determine the height based on size
  const getHeight = () => {
    switch(size) {
      case 'sm': return 40;
      case 'lg': return 80;
      default: return 60;
    }
  };
  
  // Formatting for label
  const renderCustomizedLabel = (props: any) => {
    const { x, y, width, value, index } = props;
    const label = data[index].label;
    
    return (
      <text 
        x={x + width / 2} 
        y={y + (size === 'sm' ? 10 : 16)}
        fill="#fff" 
        textAnchor="middle" 
        dominantBaseline="middle"
        fontWeight="bold"
        fontSize={size === 'sm' ? 12 : 14}
      >
        {showLabel ? `${label} (${value}%)` : `${value}%`}
      </text>
    );
  };
  
  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1 flex justify-between text-sm">
          <span className="font-medium">Threat Level</span>
          <span className="font-bold" style={{ color: getColor(threatLevel) }}>
            {getThreatLabel(threatLevel)}
          </span>
        </div>
      )}
      <ResponsiveContainer width="100%" height={getHeight()}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <Bar 
            dataKey="value" 
            radius={[4, 4, 4, 4]} 
            barSize={size === 'sm' ? 16 : 24}
          >
            <Cell fill={getColor(threatLevel)} />
            <LabelList content={renderCustomizedLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="w-full flex justify-between text-xs mt-1">
        <span className="text-green-600 font-medium">Low Risk</span>
        <span className="text-yellow-500 font-medium">Medium</span>
        <span className="text-red-600 font-medium">High Risk</span>
      </div>
    </div>
  );
}