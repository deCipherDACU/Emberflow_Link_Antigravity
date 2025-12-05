/**
 * Life Balance Wheel Assessment
 * 6 core life dimensions for holistic growth
 */

import { 
  Heart, 
  Brain, 
  Users, 
  DollarSign, 
  Sparkles, 
  Dumbbell,
  type LucideIcon 
} from 'lucide-react';

export interface LifeCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  description: string;
  subCategories: string[];
  importanceWeight: number; // 1-10 scale
}

export const LIFE_CATEGORIES: Record<string, LifeCategory> = {
  personal: {
    id: 'personal',
    name: 'Personal Development',
    icon: Sparkles,
    color: '#a855f7',
    gradient: 'from-purple-400 to-purple-600',
    description: 'Self-improvement, hobbies, creativity, and personal growth',
    subCategories: [
      'Self-Care',
      'Hobbies',
      'Creativity',
      'Skills Development',
      'Reading',
      'Life Goals',
    ],
    importanceWeight: 8,
  },
  
  intellectual: {
    id: 'intellectual',
    name: 'Intellectual Growth',
    icon: Brain,
    color: '#3b82f6',
    gradient: 'from-blue-400 to-blue-600',
    description: 'Learning, knowledge acquisition, mental challenges',
    subCategories: [
      'Education',
      'Professional Learning',
      'Problem Solving',
      'Critical Thinking',
      'Language Learning',
      'Research',
    ],
    importanceWeight: 9,
  },
  
  social: {
    id: 'social',
    name: 'Social & Relationships',
    icon: Users,
    color: '#22c55e',
    gradient: 'from-green-400 to-emerald-500',
    description: 'Family, friends, community, and meaningful connections',
    subCategories: [
      'Family Time',
      'Friendships',
      'Networking',
      'Community Service',
      'Social Events',
      'Communication',
    ],
    importanceWeight: 9,
  },
  
  financial: {
    id: 'financial',
    name: 'Financial Health',
    icon: DollarSign,
    color: '#eab308',
    gradient: 'from-yellow-400 to-orange-500',
    description: 'Career, income, savings, investments, and financial planning',
    subCategories: [
      'Career Development',
      'Income Growth',
      'Savings',
      'Investments',
      'Budgeting',
      'Financial Literacy',
    ],
    importanceWeight: 8,
  },
  
  spiritual: {
    id: 'spiritual',
    name: 'Spiritual & Mindfulness',
    icon: Heart,
    color: '#ec4899',
    gradient: 'from-pink-400 to-rose-500',
    description: 'Inner peace, purpose, values, meditation, and reflection',
    subCategories: [
      'Meditation',
      'Mindfulness',
      'Purpose',
      'Values Alignment',
      'Gratitude Practice',
      'Inner Peace',
    ],
    importanceWeight: 7,
  },
  
  physical: {
    id: 'physical',
    name: 'Physical Health',
    icon: Dumbbell,
    color: '#f97316',
    gradient: 'from-orange-400 to-red-500',
    description: 'Fitness, nutrition, sleep, and overall physical wellbeing',
    subCategories: [
      'Exercise',
      'Nutrition',
      'Sleep Quality',
      'Energy Levels',
      'Medical Checkups',
      'Recovery',
    ],
    importanceWeight: 10,
  },
};

export interface UserLifeBalance {
  userId: string;
  assessmentDate: Date;
  scores: Record<string, number>; // Category ID -> Score (1-10)
  weakestAreas: string[]; // Category IDs sorted by score
  strongestAreas: string[];
  overallBalance: number; // 1-100
  recommendedFocus: string[]; // Top 3 categories to focus on
}

// Calculate life balance score
export function calculateLifeBalance(scores: Record<string, number>): {
  overallBalance: number;
  weakestAreas: string[];
  strongestAreas: string[];
  recommendedFocus: string[];
} {
  const entries = Object.entries(scores);
  const sortedByScore = [...entries].sort((a, b) => a[1] - b[1]);
  
  // Overall balance: how evenly distributed are the scores?
  const average = entries.reduce((sum, [_, score]) => sum + score, 0) / entries.length;
  const variance = entries.reduce((sum, [_, score]) => sum + Math.pow(score - average, 2), 0) / entries.length;
  const balance = Math.max(0, 100 - (variance * 10)); // Lower variance = better balance
  
  const weakest = sortedByScore.slice(0, 3).map(([id]) => id);
  const strongest = sortedByScore.slice(-3).reverse().map(([id]) => id);
  
  // Recommend focusing on weakest areas with high importance
  const recommended = weakest
    .map(id => ({
      id,
      priority: (10 - scores[id]) * LIFE_CATEGORIES[id].importanceWeight,
    }))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3)
    .map(item => item.id);
  
  return {
    overallBalance: Math.round(balance),
    weakestAreas: weakest,
    strongestAreas: strongest,
    recommendedFocus: recommended,
  };
}
