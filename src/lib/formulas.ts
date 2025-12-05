
import { 
    getXPRequiredForLevel, 
    getDifficultyMultiplier,
    LEVEL_DATA, 
    getLevelData, 
    getProgressToNextLevel, 
    calculateLevelFromXP, 
    TIERS 
} from '@/config/levelProgression';
import type { Difficulty } from '@/lib/types';

// XP Required for Level
export function xpForLevel(level: number): number {
  if (level > LEVEL_DATA.length) {
    return getXPRequiredForLevel(LEVEL_DATA.length);
  }
  return getXPRequiredForLevel(level);
}


// Task XP Calculation
export function calculateTaskXP(difficulty: Difficulty): number {
  const difficultyMultiplier: Record<Difficulty, number> = {
    'Easy': 20,
    'Medium': 40,
    'Hard': 60,
    'N/A': 0
  };
  
  return difficultyMultiplier[difficulty] || 0;
}

// Task Coin Calculation
export function calculateTaskCoins(difficulty: Difficulty, userLevel: number): number {
    const levelMultiplier = getDifficultyMultiplier(userLevel);
    const BASE_COINS = 5;

    const difficultyMultiplier: Record<Difficulty, number> = {
        'Easy': 1.0,
        'Medium': 1.5,
        'Hard': 2.0,
        'N/A': 0
    };
    
    const coins = BASE_COINS * difficultyMultiplier[difficulty] * levelMultiplier;
    return Math.floor(coins);
}

// Re-export all necessary functions from the new leveling system
export { getProgressToNextLevel, calculateLevelFromXP, getLevelData, TIERS, getDifficultyMultiplier };
export { getDailyTargetForLevel } from '@/config/dailyXPTargets';
export { getPerksForLevel, getNextPerk } from '@/config/levelPerks';
export type { UserProgress } from '@/utils/gamification';
