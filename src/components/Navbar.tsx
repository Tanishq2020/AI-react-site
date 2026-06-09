'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useProductivityStore } from '../store/productivityStore';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useProductivityStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-forest-dark/70 border-b border-emerald/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald to-forest-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌲</span>
              </div>
              <span className="font-bold text-xl text-forest-dark dark:text-cream hidden sm:inline">
                Study Forest
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/dashboard" className="text-forest-dark dark:text-cream hover:text-emerald transition">
              Dashboard
            </a>
            <a href="/tasks" className="text-forest-dark dark:text-cream hover:text-emerald transition">
              Tasks
            </a>
            <a href="/focus" className="text-forest-dark dark:text-cream hover:text-emerald transition">
              Focus Timer
            </a>
            <a href="/forest" className="text-forest-dark dark:text-cream hover:text-emerald transition">
              Forest
            </a>
            <a href="/stats" className="text-forest-dark dark:text-cream hover:text-emerald transition">
              Stats
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-emerald/10 hover:bg-emerald/20 transition"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-forest-dark" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-emerald/10 hover:bg-emerald/20 transition"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-forest-dark" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-emerald/10 hover:bg-emerald/20 transition"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-forest-dark dark:text-cream" />
              ) : (
                <Menu className="w-6 h-6 text-forest-dark dark:text-cream" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-2"
          >
            <a
              href="/dashboard"
              className="block px-4 py-2 rounded-lg text-forest-dark dark:text-cream hover:bg-emerald/10 transition"
            >
              Dashboard
            </a>
            <a
              href="/tasks"
              className="block px-4 py-2 rounded-lg text-forest-dark dark:text-cream hover:bg-emerald/10 transition"
            >
              Tasks
            </a>
            <a
              href="/focus"
              className="block px-4 py-2 rounded-lg text-forest-dark dark:text-cream hover:bg-emerald/10 transition"
            >
              Focus Timer
            </a>
            <a
              href="/forest"
              className="block px-4 py-2 rounded-lg text-forest-dark dark:text-cream hover:bg-emerald/10 transition"
            >
              Forest
            </a>
            <a
              href="/stats"
              className="block px-4 py-2 rounded-lg text-forest-dark dark:text-cream hover:bg-emerald/10 transition"
            >
              Stats
            </a>
          </motion.div>
        )}
      </div>
    </nav>
  );
};
