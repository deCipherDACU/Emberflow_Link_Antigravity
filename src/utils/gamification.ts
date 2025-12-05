/**
 * Gamification System - OdysseyDaily
 * 
 * This module handles all XP, coins, and reward calculations
 * for the gamified productivity system.
 * 
 * Core Concepts:
 * - XP (Experience Points): Earned for completing tasks, habits, quests
 * - Coins: Currency for purchasing items in the reward shop
 * - Level: Calculated from total XP using exponential scaling
 * - Streaks: Consecutive days of completing habits/tasks
 */

import { FEATURES, isFeatureEnabled } from '@/config/features';

// ============================================
// CONSTANTS & CONFIGURATION
// ============================================

/**
 * Base XP values for different actions
 * These are multiplied by difficulty/priority modifiers
 */
export const XP_REWARDS = {
  TASK_COMPLETE: 10,        // Base XP for completing a task
  HABIT_COMPLETE: 15,       // Base XP for completing a habit
  QUEST_COMPLETE: 50,       // Base XP for completing a quest
  POMODORO_SESSION: 5,      // XP per completed Pomodoro session
  JOURNAL_ENTRY: 8,         // XP for writing a journal entry
  BREATHING_EXERCISE: 3,    // XP for completing breathing exercise
  STREAK_BONUS: 5,          // Additional XP per streak day
} as const;

/**
 * Coin rewards for different actions
 * Coins are the premium currency for the shop
 */
export const COIN_REWARDS = {
  TASK_COMPLETE: 5,
  HABIT_COMPLETE: 8,
  QUEST_COMPLETE: 25,
  DAILY_LOGIN: 2,
  WEEKLY_STREAK: 20,
  ACHIEVEMENT_UNLOCK: 15,
  LEVEL_UP: 10,
} as const;

/**
 * Difficulty multipliers affect XP rewards
 * Higher difficulty = more XP
 */
export const DIFFICULTY_MULTIPLIERS = {
  EASY: 1.0,
  MEDIUM: 1.5,
  HARD: 2.0,
  EPIC: 3.0,
} as const;

/**
 * Priority multipliers for tasks
 * Urgent/important tasks give bonus XP
 */
export const PRIORITY_MULTIPLIERS = {
  LOW: 1.0,
  MEDIUM: 1.2,
  HIGH: 1.5,
  URGENT: 2.0,
} as const;

// ============================================
// TYPES & INTERFACES
// ============================================

export type Difficulty = keyof typeof DIFFICULTY_MULTIPLIERS;
export type Priority = keyof typeof PRIORITY_MULTIPLIERS;

export interface XPCalculationInput {
  baseAction: keyof typeof XP_REWARDS;
  difficulty?: Difficulty;
  priority?: Priority;
  streakDays?: number;
  completionTime?: number; // milliseconds (for Pomodoro)
  isFirstTime?: boolean;   // First time completing this type
}

export interface RewardResult {
  xpEarned: number;
  coinsEarned: number;
  leveledUp: boolean;
  newLevel?: number;
  achievements?: string[]; // IDs of unlocked achievements
  breakdown: string[];     // Human-readable breakdown of rewards
}

export interface UserProgress {
  totalXP: number;
  currentLevel: number;
  coins: number;
  streakDays: number;
  tasksCompleted: number;
  habitsCompleted: number;
  questsCompleted: number;
}

// ============================================
// LEVEL CALCULATION
// ============================================

/**
 * Calculate level from total XP using exponential scaling
 * 
 * Formula: XP needed = 100 * (level^1.5)
 * This creates a smooth progression curve where:
 * - Level 1 → 2: 100 XP
 * - Level 2 → 3: 282 XP
 * - Level 5 → 6: 1118 XP
 * - Level 10 → 11: 3162 XP
 * 
 * @param totalXP - Total XP accumulated by user
 * @returns Current level based on XP
 */
export const calculateLevel = (totalXP: number): number => {
  if (totalXP < 0) return 1;
  
  // Using inverse of exponential formula
  const level = Math.floor(Math.pow(totalXP / 100, 1 / 1.5)) + 1;
  return Math.max(1, level);
};

/**
 * Calculate XP needed to reach next level
 * 
 * @param currentLevel - User's current level
 * @returns XP required to level up
 */
export const getXPForNextLevel = (currentLevel: number): number => {
  return Math.floor(100 * Math.pow(currentLevel + 1, 1.5));
};

/**
 * Get progress percentage to next level
 * 
 * @param totalXP - Total XP accumulated
 * @param currentLevel - Current level
 * @returns Percentage (0-100) of progress to next level
 */
export const getLevelProgress = (totalXP: number, currentLevel: number): number => {
  const currentLevelXP = Math.floor(100 * Math.pow(currentLevel, 1.5));
  const nextLevelXP = getXPForNextLevel(currentLevel);
  const xpInCurrentLevel = totalXP - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  
  return Math.min(100, Math.floor((xpInCurrentLevel / xpNeededForLevel) * 100));
};

// ============================================
// XP & COIN CALCULATION
// ============================================

/**
 * Calculate XP reward for completing an action
 * 
 * Applies multipliers based on:
 * 1. Base action type (task, habit, quest, etc.)
 * 2. Difficulty level
 * 3. Priority level
 * 4. Streak bonuses
 * 5. First-time completion bonus
 * 
 * @param input - Configuration for XP calculation
 * @returns Total XP earned after all multipliers
 */
export const calculateXP = (input: XPCalculationInput): number => {
  if (!isFeatureEnabled('XP_SYSTEM')) return 0;

  let baseXP = XP_REWARDS[input.baseAction];

  // Apply difficulty multiplier
  if (input.difficulty) {
    baseXP *= DIFFICULTY_MULTIPLIERS[input.difficulty];
  }

  // Apply priority multiplier
  if (input.priority) {
    baseXP *= PRIORITY_MULTIPLIERS[input.priority];
  }

  // Add streak bonus (5 XP per day of streak)
  if (input.streakDays && input.streakDays > 0) {
    baseXP += XP_REWARDS.STREAK_BONUS * input.streakDays;
  }

  // First-time bonus (50% extra XP)
  if (input.isFirstTime) {
    baseXP *= 1.5;
  }

  // Round to nearest integer
  return Math.floor(baseXP);
};

/**
 * Calculate coin reward based on action
 * 
 * @param action - Type of action completed
 * @param difficulty - Optional difficulty multiplier
 * @returns Coins earned
 */
export const calculateCoins = (
  action: keyof typeof COIN_REWARDS,
  difficulty?: Difficulty
): number => {
  if (!isFeatureEnabled('COIN_REWARD_SYSTEM')) return 0;

  let coins = COIN_REWARDS[action];

  // Apply difficulty multiplier for tasks/habits/quests
  if (difficulty && ['TASK_COMPLETE', 'HABIT_COMPLETE', 'QUEST_COMPLETE'].includes(action)) {
    coins *= DIFFICULTY_MULTIPLIERS[difficulty];
  }

  return Math.floor(coins);
};

// ============================================
// REWARD PROCESSING
// ============================================

/**
 * Process a completed action and calculate all rewards
 * 
 * This is the main function called when user completes any action.
 * It calculates XP, coins, checks for level up, and achievement unlocks.
 * 
 * Firebase Data Structure Expected:
 * users/{userId}/progress: {
 *   totalXP: number,
 *   currentLevel: number,
 *   coins: number,
 *   streakDays: number,
 *   tasksCompleted: number,
 *   habitsCompleted: number,
 *   questsCompleted: number,
 *   lastActivityDate: timestamp
 * }
 * 
 * @param input - XP calculation input
 * @param currentProgress - User's current progress
 * @returns Complete reward result with breakdowns
 */
export const processReward = (
  input: XPCalculationInput,
  currentProgress: UserProgress
): RewardResult => {
  const xpEarned = calculateXP(input);
  
  // Determine coin action based on base action
  let coinAction: keyof typeof COIN_REWARDS = 'TASK_COMPLETE';
  if (input.baseAction === 'HABIT_COMPLETE') coinAction = 'HABIT_COMPLETE';
  if (input.baseAction === 'QUEST_COMPLETE') coinAction = 'QUEST_COMPLETE';
  
  const coinsEarned = calculateCoins(coinAction, input.difficulty);

  // Calculate new totals
  const newTotalXP = currentProgress.totalXP + xpEarned;
  const oldLevel = currentProgress.currentLevel;
  const newLevel = calculateLevel(newTotalXP);
  const leveledUp = newLevel > oldLevel;

  // Add level-up bonus coins
  const totalCoins = coinsEarned + (leveledUp ? COIN_REWARDS.LEVEL_UP : 0);

  // Create breakdown for UI display
  const breakdown: string[] = [
    `Base ${input.baseAction.toLowerCase().replace('_', ' ')}: +${XP_REWARDS[input.baseAction]} XP`,
  ];

  if (input.difficulty && input.difficulty !== 'EASY') {
    breakdown.push(`${input.difficulty} difficulty: ×${DIFFICULTY_MULTIPLIERS[input.difficulty]}`);
  }

  if (input.priority && input.priority !== 'LOW') {
    breakdown.push(`${input.priority} priority: ×${PRIORITY_MULTIPLIERS[input.priority]}`);
  }

  if (input.streakDays && input.streakDays > 0) {
    breakdown.push(`${input.streakDays}-day streak: +${XP_REWARDS.STREAK_BONUS * input.streakDays} XP`);
  }

  if (leveledUp) {
    breakdown.push(`🎉 Level up! ${oldLevel} → ${newLevel}`);
    breakdown.push(`Level up bonus: +${COIN_REWARDS.LEVEL_UP} coins`);
  }

  return {
    xpEarned,
    coinsEarned: totalCoins,
    leveledUp,
    newLevel: leveledUp ? newLevel : undefined,
    breakdown,
  };
};

// ============================================
// ACHIEVEMENT CHECKING
// ============================================

/**
 * Check if user unlocked any new achievements
 * 
 * Achievement Firebase Structure:
 * users/{userId}/achievements: {
 *   [achievementId]: {
 *     unlockedAt: timestamp,
 *     progress: number (0-100)
 *   }
 * }
 * 
 * @param progress - Updated user progress
 * @returns Array of newly unlocked achievement IDs
 */
export const checkAchievements = (progress: UserProgress): string[] => {
  if (!isFeatureEnabled('ACHIEVEMENT_BADGES')) return [];

  const unlockedAchievements: string[] = [];

  // First task achievement
  if (progress.tasksCompleted === 1) {
    unlockedAchievements.push('first_task');
  }

  // Task milestones
  if (progress.tasksCompleted === 10) unlockedAchievements.push('task_10');
  if (progress.tasksCompleted === 50) unlockedAchievements.push('task_50');
  if (progress.tasksCompleted === 100) unlockedAchievements.push('task_100');

  // Habit milestones
  if (progress.habitsCompleted === 1) unlockedAchievements.push('first_habit');
  if (progress.habitsCompleted === 30) unlockedAchievements.push('habit_30');

  // Streak achievements
  if (progress.streakDays === 7) unlockedAchievements.push('week_streak');
  if (progress.streakDays === 30) unlockedAchievements.push('month_streak');
  if (progress.streakDays === 100) unlockedAchievements.push('century_streak');

  // Level achievements
  if (progress.currentLevel === 10) unlockedAchievements.push('level_10');
  if (progress.currentLevel === 25) unlockedAchievements.push('level_25');
  if (progress.currentLevel === 50) unlockedAchievements.push('level_50');

  return unlockedAchievements;
};

// ============================================
// STREAK CALCULATION
// ============================================

/**
 * Calculate streak based on last activity date
 * 
 * Streak is maintained if user completes at least one task/habit per day.
 * If user misses a day, streak resets to 0.
 * 
 * @param lastActivityDate - Timestamp of last activity
 * @param currentStreak - Current streak count
 * @returns Updated streak count
 */
export const calculateStreak = (
  lastActivityDate: Date,
  currentStreak: number
): number => {
  const now = new Date();
  const lastActivity = new Date(lastActivityDate);
  
  // Reset time to midnight for date comparison
  now.setHours(0, 0, 0, 0);
  lastActivity.setHours(0, 0, 0, 0);
  
  const daysDifference = Math.floor(
    (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDifference === 0) {
    // Same day - maintain streak
    return currentStreak;
  } else if (daysDifference === 1) {
    // Next day - increment streak
    return currentStreak + 1;
  } else {
    // Missed days - reset streak
    return 1; // Start new streak
  }
};
