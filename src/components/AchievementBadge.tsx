'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import type { Achievement } from '../types';

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  unlocked,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative group ${unlocked ? 'cursor-default' : 'opacity-50'}`}
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald/20 to-forest-green/20 backdrop-blur-sm border-2 border-emerald/50">
        <Award className={`w-8 h-8 ${unlocked ? 'text-emerald' : 'text-sage'}`} />
      </div>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-forest-dark dark:bg-cream text-cream dark:text-forest-dark rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
        {achievement.name}
      </div>
    </motion.div>
  );
};
