'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle, Clock } from 'lucide-react';
import type { TaskItem } from '../types';
import { formatDate } from '../utils/productivity';

interface TaskCardProps {
  task: TaskItem;
  onToggleComplete: () => void;
  onDelete: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onDelete,
}) => {
  const priorityColors = {
    low: 'bg-emerald/20 text-emerald',
    medium: 'bg-amber-500/20 text-amber-600',
    high: 'bg-red-500/20 text-red-600',
  };

  const isCompleted = task.status === 'completed';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`relative p-4 rounded-xl backdrop-blur-sm border-2 transition-all ${
        isCompleted
          ? 'bg-emerald/10 border-emerald/50'
          : 'bg-white/50 dark:bg-forest-dark/50 border-forest-light/50'
      } hover:shadow-lg`}
    >
      <div className="flex gap-3 items-start">
        <button
          onClick={onToggleComplete}
          className="mt-1 flex-shrink-0 focus:outline-none"
        >
          <motion.div
            animate={{ scale: isCompleted ? 1.1 : 1 }}
            className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
              isCompleted
                ? 'bg-emerald border-emerald'
                : 'border-sage hover:border-emerald'
            }`}
          >
            {isCompleted && <CheckCircle className="w-4 h-4 text-cream" />}
          </motion.div>
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-sm break-words ${
              isCompleted
                ? 'line-through text-sage'
                : 'text-forest-dark dark:text-cream'
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-sage mt-1 break-words">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>
            <div className="flex items-center gap-1 text-xs text-sage">
              <Clock className="w-3 h-3" />
              {formatDate(task.dueDate)}
            </div>
          </div>
        </div>

        <button
          onClick={onDelete}
          className="flex-shrink-0 p-2 rounded-lg hover:bg-red-500/20 transition text-sage hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
