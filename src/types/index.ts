export interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'in-progress';
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface FocusSession {
  id: string;
  duration: number;
  date: string;
  completed: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface ForestElement {
  id: string;
  type: 'tree' | 'flower' | 'bush' | 'animal';
  unlocked: boolean;
  level: number;
}

export interface DailyStats {
  date: string;
  tasksCompleted: number;
  focusHours: number;
  streakDays: number;
}

export interface StoreState {
  tasks: TaskItem[];
  addTask: (task: Omit<TaskItem, 'id'>) => void;
  updateTask: (id: string, updates: Partial<TaskItem>) => void;
  deleteTask: (id: string) => void;

  focusSessions: number;
  totalFocusTime: number;
  addFocusSession: (duration: number) => void;

  trees: number;
  forestScore: number;
  addTree: () => void;

  currentStreak: number;
  longestStreak: number;
  updateStreak: (streak: number) => void;

  achievements: Achievement[];
  unlockAchievement: (achievement: Achievement) => void;

  isDarkMode: boolean;
  toggleDarkMode: () => void;

  loadFromStorage: () => void;
  saveToStorage: () => void;
}
