/**
 * Daily XP Targets and Recommendations
 * Scales with player level for progressive difficulty
 */

import { getDifficultyMultiplier } from './levelProgression';

export interface DailyTarget {
  level: number;
  baseXP: number;
  recommendedTasks: number;
  recommendedHabits: number;
  optimalPomodoroSessions: number;
  journalBonus: number;
  estimatedTimeMinutes: number;
}

// Base daily targets (Level 1-9)
const BASE_DAILY_XP = 150;
const BASE_TASKS = 3;
const BASE_HABITS = 2;
const BASE_POMODORO = 2;

export function getDailyTargetForLevel(level: number): DailyTarget {
  // Scale difficulty gradually
  const diffMultiplier = getDifficultyMultiplier(level);
  
  const baseXP = Math.floor(BASE_DAILY_XP * diffMultiplier);
  const recommendedTasks = Math.min(8, Math.floor(BASE_TASKS * diffMultiplier));
  const recommendedHabits = Math.min(6, Math.floor(BASE_HABITS * diffMultiplier));
  const optimalPomodoroSessions = Math.min(8, Math.floor(BASE_POMODORO * diffMultiplier));
  
  // Journal bonus increases with level
  const journalBonus = Math.floor(15 + (level * 0.5));
  
  // Estimated time based on recommended activities
  const estimatedTimeMinutes = 
    (recommendedTasks * 20) + // 20 min per task avg
    (recommendedHabits * 5) + // 5 min per habit
    (optimalPomodoroSessions * 25) + // 25 min per pomodoro
    10; // Journal time
  
  return {
    level,
    baseXP,
    recommendedTasks,
    recommendedHabits,
    optimalPomodoroSessions,
    journalBonus,
    estimatedTimeMinutes: Math.min(180, estimatedTimeMinutes), // Cap at 3 hours
  };
}

// XP Rewards Configuration (scales with difficulty)
export function getTaskXPReward(taskDifficulty: 'easy' | 'medium' | 'hard', playerLevel: number): number {
  const baseRewards = {
    easy: 25,
    medium: 50,
    hard: 100,
  };
  
  const multiplier = getDifficultyMultiplier(playerLevel);
  return Math.floor(baseRewards[taskDifficulty] * multiplier);
}

export function getHabitXPReward(streakDays: number, playerLevel: number): number {
  const baseXP = 15;
  const streakBonus = Math.min(streakDays * 2, 50); // Max 50 bonus
  const multiplier = getDifficultyMultiplier(playerLevel);
  
  return Math.floor((baseXP + streakBonus) * multiplier);
}

export function getPomodoroXPReward(sessionCount: number, playerLevel: number): number {
  const baseXP = 20;
  const sessionBonus = (sessionCount - 1) * 5; // Bonus for consecutive sessions
  const multiplier = getDifficultyMultiplier(playerLevel);
  
  return Math.floor((baseXP + sessionBonus) * multiplier);
}
