import { LifeArea } from "./life-areas";
import { TaskCategory, TaskDifficulty } from "../types";

export interface Habit {
  id: string;
  userId: string;
  title: string;
  description?: string;
  icon: string; // Emoji or icon name
  color: string;
  area: string; // LifeArea ID
  category: TaskCategory;
  
  // Schedule
  trackingType: 'binary' | 'count' | 'duration' | 'time' | 'rating' | 'scale';
  frequency: 'daily' | 'weekdays' | 'weekends' | 'weekly' | 'monthly' | 'custom' | 'x-per-week' | 'interval' | 'specific-days';
  schedule: Schedule;
  
  // Rewards
  xpReward: number;
  coinReward: number;
  
  // B=MAP Model
  tinyVersion: string; // Minimum viable action
  triggers: HabitTrigger[];
  barriers: string[]; // Common obstacles
  
  // Smart Features
  reminders: Reminder[];
  
  // Template Integration
  templateId?: string;
  templateStackOrder?: number;
  
  // Grace & Autonomy
  graceSettings: GraceSettings;
  autonomySettings: AutonomySettings;
  
  // Progress
  habitStrength: number; // 0-100
  streak: number;
  longestStreak: number;
  successRate: number; // Overall percentage
  priority: number; // 1-5
  difficulty: TaskDifficulty;
  
  // State
  isActive: boolean;
  isPaused: boolean;
  vacationMode: boolean; // Is currently on vacation
  
  // History & Notes
  completionHistory: EnhancedCompletion[];
  notes: HabitNote[];
  missReasons: { [date: string]: string };
  bestDaysOfWeek: number[]; // 0 (Sun) - 6 (Sat)
  analytics: HabitAnalytics;

  createdAt: Date;
  updatedAt: Date;
  
  streaks: {
    current: number;
    longest: number;
  };
}

export interface HabitCompletion {
  date: string; // YYYY-MM-DD
  completed: boolean;
}

export interface EnhancedCompletion {
  date: string; // YYYY-MM-DD
  completed: boolean;
  completedAt: Date;
  value?: number;
  notes?: string;
  difficulty: 'tiny' | 'normal' | 'stretch';
  completionMethod: 'manual' | 'auto' | 'batch';
  xpEarned: number;
  coinEarned: number;
}

export interface HabitNote {
  id: string;
  date: Date;
  text: string;
}

export interface HabitAnalytics {
  totalCompletions: number;
  // More analytics can be added here
}

export interface Schedule {
  type: Habit['frequency'];
  targetValue?: number | null; // For count/duration
  targetDays?: number[]; // For custom days [0-6]
  timesPerWeek?: number;
  dayOfMonth?: number;
  intervalDays?: number;
  allowPartialCompletion?: boolean;
  timeWindows?: TimeWindow[];
}

export interface TimeWindow {
  start: string; // "HH:MM"
  end: string;
  preferred: boolean;
}

export interface HabitTrigger {
  type: 'time' | 'location' | 'context' | 'habit';
  value: string; // e.g., "08:00", "gym", "after waking up", "habit_id"
  enabled: boolean;
}

export interface Reminder {
  id: string;
  type: 'time' | 'location' | 'smart';
  trigger: string;
  message: string;
  enabled: boolean;
  sticky: boolean;
  snoozeOptions: number[]; // in minutes
}

export interface GraceSettings {
  enabled: boolean;
  graceDays: number; // Allowed misses per month
  vacationMode: boolean; // Allow pausing without penalty
  sickDayProtection: boolean;
  weekendGrace: boolean;
  comebackBonus: boolean;
}

export interface AutonomySettings {
  allowCustomization: boolean;
  userDefinedRewards: any[]; // Define a structure for this
  skipWithoutPenalty: boolean;
  pauseOption: boolean;
}

export interface Challenge {
    id: string;
    userId: string;
    title: string;
    description: string;
    category: string;
    duration: number; // in days
    startDate: Date;
    endDate: Date;
    difficulty: TaskDifficulty;
    status: 'active' | 'completed' | 'failed';
    
    rewards: {
      xp: number;
      coins: number;
      gems: number;
      items: string[];
      achievements: string[];
    };
    
    requirements: string[]; // e.g., level requirement
    
    progress: {
      currentDay: number;
      completedDays: number;
      successRate: number;
      dailyCompletions: { [date: string]: boolean };
      milestoneRewards: { [day: number]: boolean }; // Track if milestone rewards were given
    };
    
    createdAt?: Date;
    updatedAt?: Date;
}
