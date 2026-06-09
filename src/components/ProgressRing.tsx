'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  label,
  color = '#10b981',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          stroke="#e5e7eb"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-2xl font-bold text-forest-dark dark:text-cream">
          {percentage}%
        </p>
        {label && <p className="text-sm text-sage">{label}</p>}
      </div>
    </div>
  );
};
