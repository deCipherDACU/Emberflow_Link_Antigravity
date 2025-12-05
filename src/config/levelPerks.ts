/**
 * Unlockable Perks by Level
 * NO FEATURES ARE LOCKED - only cosmetic/convenience perks
 */

import { Palette, BarChart3, Sparkles, Crown, Zap, Shield, Award } from 'lucide-react';

export interface LevelPerk {
  level: number;
  name: string;
  description: string;
  icon: any;
  category: 'cosmetic' | 'analytics' | 'customization' | 'convenience';
  benefit: string;
}

export const LEVEL_PERKS: LevelPerk[] = [
  {
    level: 10,
    name: 'Custom Quest Colors',
    description: 'Customize the colors of your quests and categories',
    icon: Palette,
    category: 'customization',
    benefit: 'Visual personalization for better organization',
  },
  {
    level: 15,
    name: 'Extended Streak Stats',
    description: 'View detailed streak analytics and predictions',
    icon: BarChart3,
    category: 'analytics',
    benefit: 'Better insight into your consistency',
  },
  {
    level: 20,
    name: 'Advanced Analytics Dashboard',
    description: 'Unlock productivity heatmaps and trend analysis',
    icon: BarChart3,
    category: 'analytics',
    benefit: 'Deep insights into your progress patterns',
  },
  {
    level: 25,
    name: 'Priority Quest Markers',
    description: 'Special visual markers for high-priority tasks',
    icon: Zap,
    category: 'customization',
    benefit: 'Quickly identify important tasks at a glance',
  },
  {
    level: 30,
    name: 'Custom Habit Templates',
    description: 'Create and save custom habit templates',
    icon: Sparkles,
    category: 'convenience',
    benefit: 'Faster habit creation with saved templates',
  },
  {
    level: 35,
    name: 'Achievement Showcase',
    description: 'Display your top 5 achievements on profile',
    icon: Award,
    category: 'cosmetic',
    benefit: 'Show off your accomplishments',
  },
  {
    level: 40,
    name: 'AI Quest Suggestions',
    description: 'Get AI-powered quest recommendations based on your history',
    icon: Sparkles,
    category: 'convenience',
    benefit: 'Smart suggestions to keep you productive',
  },
  {
    level: 45,
    name: 'Custom Notification Sounds',
    description: 'Upload your own notification sounds',
    icon: Sparkles,
    category: 'customization',
    benefit: 'Personalized audio feedback',
  },
  {
    level: 50,
    name: 'Premium Profile Themes',
    description: 'Access 10+ premium profile theme designs',
    icon: Palette,
    category: 'cosmetic',
    benefit: 'Stand out with exclusive themes',
  },
  {
    level: 55,
    name: 'Export Data Premium',
    description: 'Export your data in multiple formats (CSV, JSON, PDF)',
    icon: BarChart3,
    category: 'convenience',
    benefit: 'Advanced data portability',
  },
  {
    level: 60,
    name: 'Boss Difficulty Selector',
    description: 'Choose your preferred boss fight difficulty level',
    icon: Shield,
    category: 'convenience',
    benefit: 'Customize challenge to your preference',
  },
  {
    level: 65,
    name: 'Animated Profile Borders',
    description: 'Animated borders and effects for your profile',
    icon: Sparkles,
    category: 'cosmetic',
    benefit: 'Show your prestige with animated visuals',
  },
  {
    level: 70,
    name: 'Legendary Quest Creator',
    description: 'Create and share custom quest templates with community',
    icon: Crown,
    category: 'convenience',
    benefit: 'Share your productivity strategies',
  },
  {
    level: 75,
    name: 'Advanced Goal Tracking',
    description: 'Set multi-month goals with milestone tracking',
    icon: BarChart3,
    category: 'analytics',
    benefit: 'Track long-term objectives',
  },
  {
    level: 80,
    name: 'Mythic Profile Border',
    description: 'Exclusive mythic-tier animated profile border',
    icon: Crown,
    category: 'cosmetic',
    benefit: 'Elite visual distinction',
  },
  {
    level: 85,
    name: 'Custom Boss Challenges',
    description: 'Create custom boss challenges for yourself',
    icon: Shield,
    category: 'convenience',
    benefit: 'Personalized difficulty challenges',
  },
  {
    level: 90,
    name: 'Ultimate Customization Suite',
    description: 'Full UI customization including fonts, spacing, and layout',
    icon: Palette,
    category: 'customization',
    benefit: 'Total control over your experience',
  },
  {
    level: 95,
    name: 'Legacy Title System',
    description: 'Earn and display custom titles on your profile',
    icon: Crown,
    category: 'cosmetic',
    benefit: 'Show your journey with custom titles',
  },
  {
    level: 99,
    name: 'Odyssey Master Crown',
    description: 'Exclusive max-level crown + ALL PERKS UNLOCKED',
    icon: Crown,
    category: 'cosmetic',
    benefit: 'Ultimate prestige and all features',
  },
];

export function getPerksForLevel(level: number): LevelPerk[] {
  return LEVEL_PERKS.filter(perk => perk.level <= level);
}

export function getNextPerk(currentLevel: number): LevelPerk | null {
  return LEVEL_PERKS.find(perk => perk.level > currentLevel) || null;
}
