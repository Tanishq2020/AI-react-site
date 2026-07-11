'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import { useProductivityStore } from '../store/productivityStore';
import { TaskCard } from './TaskCard';
import type { TaskItem } from '../types';

type TaskFilter = 'all' | 'pending' | 'in-progress' | 'completed';
type SortBy = 'dueDate' | 'priority' | 'createdAt';

export const TaskList: React.FC = () => {
  const { tasks, updateTask, deleteTask } = useProductivityStore();
  const [filterStatus, setFilterStatus] = useState<TaskFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('dueDate');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter((task) => task.status === filterStatus);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority': {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return sorted;
  }, [tasks, filterStatus, sortBy]);

  const handleToggleComplete = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      updateTask(taskId, { status: newStatus });
    }
  };

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
  };

  // Stats
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-forest-dark/50 border-2 border-emerald/20"
        >
          <p className="text-xs text-sage mb-1">Total Tasks</p>
          <p className="text-2xl font-bold text-forest-dark dark:text-cream">{stats.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-forest-dark/50 border-2 border-emerald/20"
        >
          <p className="text-xs text-sage mb-1">Completed</p>
          <p className="text-2xl font-bold text-emerald">{stats.completed}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-forest-dark/50 border-2 border-emerald/20"
        >
          <p className="text-xs text-sage mb-1">In Progress</p>
          <p className="text-2xl font-bold text-amber-600">{stats.inProgress}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-forest-dark/50 border-2 border-emerald/20"
        >
          <p className="text-xs text-sage mb-1">Pending</p>
          <p className="text-2xl font-bold text-red-500">{stats.pending}</p>
        </motion.div>
      </div>

      {/* Filter and Sort Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-4 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-forest-dark/50 border-2 border-emerald/20"
      >
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald/10 hover:bg-emerald/20 transition text-forest-dark dark:text-cream font-semibold text-sm"
          >
            <Filter className="w-4 h-4" />
            Filters & Sort
          </button>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full space-y-4 pt-4 border-t border-emerald/20"
            >
              {/* Status Filter */}
              <div>
                <p className="text-sm font-semibold text-forest-dark dark:text-cream mb-2">
                  Filter by Status
                </p>
                <div className="flex flex-wrap gap-2">
                  {(['all', 'pending', 'in-progress', 'completed'] as TaskFilter[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                        filterStatus === status
                          ? 'bg-emerald text-cream'
                          : 'bg-emerald/10 text-forest-dark dark:text-cream hover:bg-emerald/20'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <p className="text-sm font-semibold text-forest-dark dark:text-cream mb-2">
                  Sort by
                </p>
                <div className="flex flex-wrap gap-2">
                  {(['dueDate', 'priority', 'createdAt'] as SortBy[]).map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setSortBy(sort)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                        sortBy === sort
                          ? 'bg-forest-green text-cream'
                          : 'bg-forest-green/10 text-forest-dark dark:text-cream hover:bg-forest-green/20'
                      }`}
                    >
                      {sort === 'dueDate' && 'Due Date'}
                      {sort === 'priority' && 'Priority'}
                      {sort === 'createdAt' && 'Newest'}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Task List */}
      <div>
        {filteredAndSortedTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-forest-dark/50 border-2 border-emerald/20"
          >
            <p className="text-5xl mb-2">🌱</p>
            <p className="text-forest-dark dark:text-cream font-semibold mb-1">
              {filterStatus === 'all' ? 'No tasks yet!' : 'No tasks in this category'}
            </p>
            <p className="text-sage text-sm">
              {filterStatus === 'all' ? 'Create your first task to get started' : 'Change filter to see other tasks'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="space-y-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredAndSortedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={() => handleToggleComplete(task.id)}
                  onDelete={() => handleDelete(task.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};
