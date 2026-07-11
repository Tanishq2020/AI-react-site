'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useProductivityStore } from '../store/productivityStore';
import type { TaskItem } from '../types';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as TaskItem['priority'],
  });

  const { addTask } = useProductivityStore();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    if (!formData.dueDate) {
      alert('Please select a due date');
      return;
    }

    addTask({
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    setFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-md p-6 rounded-2xl backdrop-blur-sm bg-white/90 dark:bg-forest-dark/90 border-2 border-emerald/30 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-forest-dark dark:text-cream flex items-center gap-2">
            <Plus className="w-6 h-6 text-emerald" />
            Add New Task
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-emerald/10 transition text-sage hover:text-forest-dark dark:hover:text-cream"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-forest-dark dark:text-cream mb-2">
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter task title..."
              className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-forest-dark/50 border-2 border-emerald/20 focus:border-emerald focus:outline-none text-forest-dark dark:text-cream placeholder-sage transition"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-semibold text-forest-dark dark:text-cream mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter task description (optional)..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-forest-dark/50 border-2 border-emerald/20 focus:border-emerald focus:outline-none text-forest-dark dark:text-cream placeholder-sage transition resize-none"
            />
          </div>

          {/* Due Date Input */}
          <div>
            <label className="block text-sm font-semibold text-forest-dark dark:text-cream mb-2">
              Due Date *
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-forest-dark/50 border-2 border-emerald/20 focus:border-emerald focus:outline-none text-forest-dark dark:text-cream transition"
            />
          </div>

          {/* Priority Select */}
          <div>
            <label className="block text-sm font-semibold text-forest-dark dark:text-cream mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-forest-dark/50 border-2 border-emerald/20 focus:border-emerald focus:outline-none text-forest-dark dark:text-cream transition"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg bg-white/50 dark:bg-forest-dark/50 border-2 border-emerald/20 text-forest-dark dark:text-cream font-semibold hover:bg-emerald/10 transition"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-br from-emerald to-forest-green text-cream font-semibold hover:shadow-lg transition"
            >
              Add Task
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
