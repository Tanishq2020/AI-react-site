import type { StoreState, TaskItem, Achievement } from '../types';
import { create } from 'zustand';

export const useProductivityStore = create<StoreState>((set) => ({
  // Task Management
  tasks: [],
  addTask: (task: TaskItem) => set((state) => ({ 
    tasks: [...state.tasks, { ...task, id: Date.now().toString() }] 
  })),
  updateTask: (id: string, updates: Partial<TaskItem>) => 
    set((state) => ({
      tasks: state.tasks.map((task) => 
        task.id === id ? { ...task, ...updates } : task
      ),
    })),
  deleteTask: (id: string) => 
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  // Focus Timer
  focusSessions: 0,
  totalFocusTime: 0,
  addFocusSession: (duration: number) =>
    set((state) => ({
      focusSessions: state.focusSessions + 1,
      totalFocusTime: state.totalFocusTime + duration,
    })),

  // Forest & Trees
  trees: 0,
  forestScore: 0,
  addTree: () =>
    set((state) => ({
      trees: state.trees + 1,
      forestScore: state.forestScore + 10,
    })),

  // Streak
  currentStreak: 0,
  longestStreak: 0,
  updateStreak: (streak: number) =>
    set((state) => ({
      currentStreak: streak,
      longestStreak: Math.max(state.longestStreak, streak),
    })),

  // Achievements
  achievements: [],
  unlockAchievement: (achievement: Achievement) =>
    set((state) => ({
      achievements: [...state.achievements, achievement],
    })),

  // Theme
  isDarkMode: false,
  toggleDarkMode: () =>
    set((state) => ({ isDarkMode: !state.isDarkMode })),

  // Persistence
  loadFromStorage: () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('studyForest');
      if (saved) {
        const data = JSON.parse(saved);
        set(data);
      }
    }
  },
  saveToStorage: () => {
    if (typeof window !== 'undefined') {
      set((state) => {
        localStorage.setItem('studyForest', JSON.stringify(state));
        return state;
      });
    }
  },
}));
