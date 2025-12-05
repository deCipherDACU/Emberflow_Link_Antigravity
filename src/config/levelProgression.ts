/**
 * OdysseyDaily Level Progression System (Levels 1-99)
 * Designed for ~365 days to reach max level
 * Progressive difficulty with unlockable perks (no feature locks)
 */

export interface LevelData {
  level: number;
  xpRequired: number;
  totalXPFromStart: number;
  estimatedDays: number;
  tierName: string;
  rewardCoins: number;
  rewardBadge?: string;
  unlockPerk?: string;
  difficultyMultiplier: number;
  description: string;
}

// Tier System (Visual/cosmetic progression)
export const TIERS = {
  NOVICE: { name: 'Novice', range: [1, 9], color: '#94a3b8' },
  APPRENTICE: { name: 'Apprentice', range: [10, 19], color: '#60a5fa' },
  ADEPT: { name: 'Adept', range: [20, 29], color: '#34d399' },
  EXPERT: { name: 'Expert', range: [30, 39], color: '#fbbf24' },
  MASTER: { name: 'Master', range: [40, 49], color: '#f97316' },
  GRANDMASTER: { name: 'Grandmaster', range: [50, 59], color: '#ec4899' },
  CHAMPION: { name: 'Champion', range: [60, 69], color: '#a855f7' },
  LEGEND: { name: 'Legend', range: [70, 79], color: '#8b5cf6' },
  MYTHIC: { name: 'Mythic', range: [80, 89], color: '#6366f1' },
  TRANSCENDENT: { name: 'Transcendent', range: [90, 99], color: '#ef4444' },
};

// XP Curve Formula: base * (1 + level * growth)^exponent
const BASE_XP = 100;
const GROWTH_RATE = 0.08;
const EXPONENT = 1.5;

// Calculate XP required for each level
function calculateXPForLevel(level: number): number {
  if (level === 1) return 0; // Level 1 starts at 0
  
  // Exponential curve with controlled growth
  const xp = Math.floor(BASE_XP * Math.pow(1 + (level - 1) * GROWTH_RATE, EXPONENT));
  return xp;
}

// Calculate total XP needed from level 1 to target level
function calculateTotalXP(targetLevel: number): number {
  let total = 0;
  for (let i = 2; i <= targetLevel; i++) {
    total += calculateXPForLevel(i);
  }
  return total;
}

// Get tier for level
function getTierForLevel(level: number): string {
  for (const [key, tier] of Object.entries(TIERS)) {
    if (level >= tier.range[0] && level <= tier.range[1]) {
      return tier.name;
    }
  }
  return TIERS.NOVICE.name;
}

// Difficulty multiplier (affects task difficulty, not features)
export function getDifficultyMultiplier(level: number): number {
  if (level < 10) return 1.0;
  if (level < 20) return 1.1;
  if (level < 30) return 1.2;
  if (level < 40) return 1.3;
  if (level < 50) return 1.4;
  if (level < 60) return 1.5;
  if (level < 70) return 1.6;
  if (level < 80) return 1.7;
  if (level < 90) return 1.8;
  return 2.0; // Max difficulty for levels 90-99
}

// Generate level data
export function generateLevelData(): LevelData[] {
  const levels: LevelData[] = [];
  
  // Average daily XP: ~150-200 (3-4 tasks per day at 50 XP each)
  const AVERAGE_DAILY_XP = 175;
  
  for (let level = 1; level <= 99; level++) {
    const xpRequired = calculateXPForLevel(level);
    const totalXP = calculateTotalXP(level);
    const estimatedDays = Math.ceil(totalXP / AVERAGE_DAILY_XP);
    const tierName = getTierForLevel(level);
    const difficultyMultiplier = getDifficultyMultiplier(level);
    
    // Rewards scale with level
    const rewardCoins = Math.floor(50 + (level * 10) + (level * level * 0.5));
    
    // Milestone rewards
    let rewardBadge: string | undefined;
    let unlockPerk: string | undefined;
    let description = '';
    
    if (level === 1) {
      description = 'Your journey begins! Welcome to OdysseyDaily.';
    } else if (level === 10) {
      rewardBadge = 'Apprentice Badge';
      unlockPerk = 'Custom Quest Colors';
      description = 'You\'ve reached Apprentice! Unlock custom quest colors.';
    } else if (level === 20) {
      rewardBadge = 'Adept Badge';
      unlockPerk = 'Advanced Analytics Dashboard';
      description = 'Welcome to Adept tier! Advanced analytics unlocked.';
    } else if (level === 30) {
      rewardBadge = 'Expert Badge';
      unlockPerk = 'Custom Habit Templates';
      description = 'Expert achieved! Create custom habit templates.';
    } else if (level === 40) {
      rewardBadge = 'Master Badge';
      unlockPerk = 'AI Quest Suggestions';
      description = 'Master tier! AI-powered quest suggestions enabled.';
    } else if (level === 50) {
      rewardBadge = 'Grandmaster Badge';
      unlockPerk = 'Premium Profile Themes';
      description = 'Grandmaster! Premium profile themes unlocked.';
    } else if (level === 60) {
      rewardBadge = 'Champion Badge';
      unlockPerk = 'Boss Fight Difficulty Selector';
      description = 'Champion status! Choose your boss fight difficulty.';
    } else if (level === 70) {
      rewardBadge = 'Legend Badge';
      unlockPerk = 'Legendary Quest Creator';
      description = 'Legend! Create and share custom quest templates.';
    } else if (level === 80) {
      rewardBadge = 'Mythic Badge';
      unlockPerk = 'Mythic Profile Border';
      description = 'Mythic tier! Show off with exclusive profile borders.';
    } else if (level === 90) {
      rewardBadge = 'Transcendent Badge';
      unlockPerk = 'Ultimate Customization Suite';
      description = 'Transcendent! Full customization suite unlocked.';
    } else if (level === 99) {
      rewardBadge = 'Odyssey Master Badge';
      unlockPerk = 'Max Level Crown + All Perks';
      description = 'MAX LEVEL! You are an Odyssey Master!';
    } else if (level % 5 === 0) {
      rewardBadge = `Level ${level} Milestone Badge`;
      description = `Milestone ${level} reached! Keep pushing forward.`;
    } else {
      description = `Level ${level} - ${tierName} tier. ${100 - level} levels to mastery.`;
    }
    
    levels.push({
      level,
      xpRequired,
      totalXPFromStart: totalXP,
      estimatedDays,
      tierName,
      rewardCoins,
      rewardBadge,
      unlockPerk,
      difficultyMultiplier,
      description,
    });
  }
  
  return levels;
}

// Export the complete level data
export const LEVEL_DATA = generateLevelData();

// Helper functions
export function getLevelData(level: number): LevelData | undefined {
  return LEVEL_DATA.find(l => l.level === level);
}

export function getXPRequiredForLevel(level: number): number {
  const data = getLevelData(level);
  return data?.xpRequired || 0;
}

export function getTotalXPForLevel(level: number): number {
  const data = getLevelData(level);
  return data?.totalXPFromStart || 0;
}

export function getCurrentTier(level: number): typeof TIERS[keyof typeof TIERS] | null {
  for (const tier of Object.values(TIERS)) {
    if (level >= tier.range[0] && level <= tier.range[1]) {
      return tier;
    }
  }
  return null;
}

export function getProgressToNextLevel(currentXP: number, currentLevel: number): {
  xpToNext: number;
  percentComplete: number;
  currentLevelXP: number;
} {
  const nextLevel = currentLevel + 1;
  const xpRequired = getXPRequiredForLevel(nextLevel);
  const totalCurrentLevel = getTotalXPForLevel(currentLevel);
  const currentLevelXP = currentXP - totalCurrentLevel;
  const percentComplete = Math.min(100, (currentLevelXP / xpRequired) * 100);
  const xpToNext = Math.max(0, xpRequired - currentLevelXP);
  
  return {
    xpToNext,
    percentComplete,
    currentLevelXP,
  };
}

// Calculate what level user should be at based on XP
export function calculateLevelFromXP(totalXP: number): number {
  for (let level = 99; level >= 1; level--) {
    const requiredXP = getTotalXPForLevel(level);
    if (totalXP >= requiredXP) {
      return level;
    }
  }
  return 1;
}
