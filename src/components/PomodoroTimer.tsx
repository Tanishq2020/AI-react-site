'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useProductivityStore } from '../store/productivityStore';

interface PomodoroTimerProps {
  onComplete?: () => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ onComplete }) => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const { addFocusSession } = useProductivityStore();

  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      if (!isBreak) {
        addFocusSession(25 * 60);
        onComplete?.();
      }
      setIsBreak(!isBreak);
      setSeconds(isBreak ? 25 * 60 : 5 * 60);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, isBreak, addFocusSession, onComplete]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setSeconds(25 * 60);
    setIsBreak(false);
  };

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative w-48 h-48">
        <motion.svg
          className="absolute inset-0"
          viewBox="0 0 200 200"
          animate={{ rotate: isActive ? 360 : 0 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            opacity="0.2"
          />
        </motion.svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold text-forest-dark dark:text-cream">
            {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </div>
          <div className="text-sm text-sage mt-2">
            {isBreak ? 'Break Time' : 'Focus Time'}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggle}
          className="p-4 rounded-full bg-gradient-to-br from-emerald to-forest-green text-cream hover:shadow-lg transition"
        >
          {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="p-4 rounded-full bg-forest-green/20 text-forest-dark dark:text-cream hover:bg-forest-green/30 transition"
        >
          <RotateCcw className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
};
