/**
 * Time-Based Quest Generation System
 * Generates quests based on day of week, time of day, and user patterns
 */

import { QuestTemplate } from './adaptiveQuestGenerator';
import { UserLifeBalance } from '@/config/lifeBalanceCategories';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export interface TimeBasedQuest extends QuestTemplate {
  preferredDays: DayOfWeek[];
  preferredTime: TimeOfDay[];
  isWeekendQuest: boolean;
  isWeekdayQuest: boolean;
  recurring: 'daily' | 'weekly' | 'weekdays' | 'weekends' | 'specific';
}

// Morning Quests (6 AM - 12 PM)
export const MORNING_QUESTS: TimeBasedQuest[] = [
  {
    id: 'morning_exercise',
    category: 'physical',
    subCategory: 'Exercise',
    title: 'Morning Movement Routine',
    description: 'Start your day with 15 minutes of exercise (yoga, stretching, or cardio)',
    difficulty: 'easy',
    estimatedTime: 15,
    xpReward: 40,
    benefits: ['Energy boost', 'Metabolism', 'Mental clarity'],
    preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    preferredTime: ['morning'],
    isWeekendQuest: true,
    isWeekdayQuest: true,
    recurring: 'daily',
  },
  {
    id: 'morning_planning',
    category: 'personal',
    subCategory: 'Life Goals',
    title: 'Plan Your Day',
    description: 'Review your calendar and set top 3 priorities for today',
    difficulty: 'easy',
    estimatedTime: 10,
    xpReward: 30,
    benefits: ['Focus', 'Productivity', 'Clarity'],
    preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    preferredTime: ['morning'],
    isWeekendQuest: false,
    isWeekdayQuest: true,
    recurring: 'weekdays',
  },
  {
    id: 'morning_meditation',
    category: 'spiritual',
    subCategory: 'Meditation',
    title: 'Morning Meditation',
    description: 'Start with 10 minutes of mindfulness meditation',
    difficulty: 'easy',
    estimatedTime: 10,
    xpReward: 35,
    benefits: ['Calm', 'Focus', 'Presence'],
    preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    preferredTime: ['morning'],
    isWeekendQuest: true,
    isWeekdayQuest: true,
    recurring: 'daily',
  },
  {
    id: 'morning_hydration',
    category: 'physical',
    subCategory: 'Nutrition',
    title: 'Hydrate & Healthy Breakfast',
    description: 'Drink 500ml water and eat a nutritious breakfast',
    difficulty: 'easy',
    estimatedTime: 15,
    xpReward: 25,
    benefits: ['Energy', 'Hydration', 'Nutrition'],
    preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    preferredTime: ['morning'],
    isWeekendQuest: true,
    isWeekdayQuest: true,
    recurring: 'daily',
  },
];

// Afternoon Quests (12 PM - 6 PM)
export const AFTERNOON_QUESTS: TimeBasedQuest[] = [
  {
    id: 'afternoon_learning',
    category: 'intellectual',
    subCategory: 'Professional Learning',
    title: 'Skill Development Session',
    description: 'Spend 30 minutes learning something new for your career',
    difficulty: 'medium',
    estimatedTime: 30,
    xpReward: 50,
    benefits: ['Growth', 'Skills', 'Career advancement'],
    preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    preferredTime: ['afternoon'],
    isWeekendQuest: false,
    isWeekdayQuest: true,
    recurring: 'weekdays',
  },
  {
    id: 'afternoon_deep_work',
    category: 'intellectual',
    subCategory: 'Focus',
    title: 'Deep Work Block',
    description: 'Complete 1 Pomodoro session (25 min) of focused work',
    difficulty: 'medium',
    estimatedTime: 25,
    xpReward: 45,
    benefits: ['Productivity', 'Focus', 'Achievement'],
    preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    preferredTime: ['afternoon'],
    isWeekendQuest: false,
    isWeekdayQuest: true,
    recurring: 'weekdays',
  },
  {
    id: 'afternoon_networking',
    category: 'social',
    subCategory: 'Networking',
    title: 'Professional Connection',
    description: 'Reach out to one professional contact or colleague',
    difficulty: 'easy',
    estimatedTime: 15,
    xpReward: 35,
    benefits: ['Network', 'Relationships', 'Opportunities'],
    preferredDays: ['tuesday', 'wednesday', 'thursday'],
    preferredTime: ['afternoon'],
    isWeekendQuest: false,
    isWeekdayQuest: true,
    recurring: 'specific',
  },
  {
    id: 'afternoon_movement',
    category: 'physical',
    subCategory: 'Exercise',
    title: 'Afternoon Energy Break',
    description: 'Take a 10-minute walk or do light stretching',
    difficulty: 'easy',
    estimatedTime: 10,
    xpReward: 20,
    benefits: ['Energy', 'Movement', 'Refresh'],
    preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    preferredTime: ['afternoon'],
    isWeekendQuest: false,
    isWeekdayQuest: true,
    recurring: 'weekdays',
  },
];

// Evening Quests (6 PM - 10 PM)
export const EVENING_QUESTS: TimeBasedQuest[] = [
  {
    id: 'evening_reflection',
    category: 'personal',
    subCategory: 'Self-Care',
    title: 'Evening Journal Reflection',
    description: 'Write about your day - wins, challenges, and gratitude',
    difficulty: 'easy',
    estimatedTime: 15,
    xpReward: 35,
    benefits: ['Self-awareness', 'Growth', 'Gratitude'],
    preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    preferredTime: ['evening'],
    isWeekendQuest: true,
    isWeekdayQuest: true,
    recurring: 'daily',
  },
  {
    id: 'evening_family',
    category: 'social',
    subCategory: 'Family Time',
    title: 'Quality Family Time',
    description: 'Spend 30 minutes of focused time with family (no phones)',
    difficulty: 'easy',
    estimatedTime: 30,
    xpReward: 40,
    benefits: ['Connection', 'Love', 'Relationships'],
    preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    preferredTime: ['evening'],
    isWeekendQuest: true,
    isWeekdayQuest: true,
    recurring: 'daily',
  },
  {
    id: 'evening_reading',
    category: 'personal',
    subCategory: 'Reading',
    title: 'Evening Reading Session',
    description: 'Read for 20 minutes before bed',
    difficulty: 'easy',
    estimatedTime: 20,
    xpReward: 30,
    benefits: ['Knowledge', 'Relaxation', 'Growth'],
    preferredDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    preferredTime: ['evening'],
    isWeekendQuest: true,
    isWeekdayQuest: true,
    recurring: 'daily',
  },
  {
    id: 'evening_planning',
    category: 'personal',
    subCategory: 'Life Goals',
    title: 'Tomorrow Planning',
    description: 'Review tomorrow\'s schedule and set top 3 priorities',
    difficulty: 'easy',
    estimatedTime: 10,
    xpReward: 25,
    benefits: ['Preparation', 'Clarity', 'Productivity'],
    preferredDays: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'],
    preferredTime: ['evening'],
    isWeekendQuest: false,
    isWeekdayQuest: true,
    recurring: 'weekdays',
  },
];

// Weekend-Specific Quests
export const WEEKEND_QUESTS: TimeBasedQuest[] = [
  {
    id: 'weekend_adventure',
    category: 'personal',
    subCategory: 'Hobbies',
    title: 'Weekend Adventure',
    description: 'Explore a new place, try a new restaurant, or visit a local attraction',
    difficulty: 'medium',
    estimatedTime: 120,
    xpReward: 80,
    benefits: ['Experience', 'Joy', 'Exploration'],
    preferredDays: ['saturday', 'sunday'],
    preferredTime: ['afternoon'],
    isWeekendQuest: true,
    isWeekdayQuest: false,
    recurring: 'weekends',
  },
  {
    id: 'weekend_deep_clean',
    category: 'personal',
    subCategory: 'Self-Care',
    title: 'Weekend Reset & Organize',
    description: 'Deep clean and organize one area of your home',
    difficulty: 'medium',
    estimatedTime: 60,
    xpReward: 50,
    benefits: ['Order', 'Clarity', 'Environment'],
    preferredDays: ['saturday', 'sunday'],
    preferredTime: ['morning', 'afternoon'],
    isWeekendQuest: true,
    isWeekdayQuest: false,
    recurring: 'weekends',
  },
  {
    id: 'weekend_creative',
    category: 'personal',
    subCategory: 'Creativity',
    title: 'Creative Project Time',
    description: 'Spend 1 hour on a creative hobby (art, music, writing, crafts)',
    difficulty: 'medium',
    estimatedTime: 60,
    xpReward: 60,
    benefits: ['Creativity', 'Expression', 'Joy'],
    preferredDays: ['saturday', 'sunday'],
    preferredTime: ['afternoon', 'evening'],
    isWeekendQuest: true,
    isWeekdayQuest: false,
    recurring: 'weekends',
  },
  {
    id: 'weekend_social',
    category: 'social',
    subCategory: 'Friendships',
    title: 'Social Connection Time',
    description: 'Meet up with friends or schedule a social activity',
    difficulty: 'easy',
    estimatedTime: 90,
    xpReward: 55,
    benefits: ['Connection', 'Fun', 'Relationships'],
    preferredDays: ['friday', 'saturday', 'sunday'],
    preferredTime: ['evening'],
    isWeekendQuest: true,
    isWeekdayQuest: false,
    recurring: 'weekends',
  },
  {
    id: 'weekend_review',
    category: 'personal',
    subCategory: 'Life Goals',
    title: 'Weekly Review & Planning',
    description: 'Review last week\'s progress and plan goals for next week',
    difficulty: 'medium',
    estimatedTime: 30,
    xpReward: 50,
    benefits: ['Clarity', 'Direction', 'Growth'],
    preferredDays: ['sunday'],
    preferredTime: ['evening'],
    isWeekendQuest: true,
    isWeekdayQuest: false,
    recurring: 'weekly',
  },
  {
    id: 'weekend_finances',
    category: 'financial',
    subCategory: 'Budgeting',
    title: 'Weekend Financial Check-in',
    description: 'Review weekly spending and update budget',
    difficulty: 'medium',
    estimatedTime: 25,
    xpReward: 45,
    benefits: ['Awareness', 'Control', 'Financial health'],
    preferredDays: ['sunday'],
    preferredTime: ['afternoon'],
    isWeekendQuest: true,
    isWeekdayQuest: false,
    recurring: 'weekly',
  },
];

// Monday-Specific Quests
export const MONDAY_QUESTS: TimeBasedQuest[] = [
  {
    id: 'monday_week_planning',
    category: 'personal',
    subCategory: 'Life Goals',
    title: 'Monday Week Planning',
    description: 'Set your top 5 goals for the week ahead',
    difficulty: 'easy',
    estimatedTime: 15,
    xpReward: 40,
    benefits: ['Focus', 'Direction', 'Motivation'],
    preferredDays: ['monday'],
    preferredTime: ['morning'],
    isWeekendQuest: false,
    isWeekdayQuest: true,
    recurring: 'weekly',
  },
  {
    id: 'monday_momentum',
    category: 'personal',
    subCategory: 'Self-Care',
    title: 'Monday Momentum Builder',
    description: 'Complete your most important task before noon',
    difficulty: 'medium',
    estimatedTime: 45,
    xpReward: 60,
    benefits: ['Achievement', 'Momentum', 'Confidence'],
    preferredDays: ['monday'],
    preferredTime: ['morning'],
    isWeekendQuest: false,
    isWeekdayQuest: true,
    recurring: 'weekly',
  },
];

// Friday-Specific Quests
export const FRIDAY_QUESTS: TimeBasedQuest[] = [
  {
    id: 'friday_celebration',
    category: 'personal',
    subCategory: 'Self-Care',
    title: 'Friday Wins Celebration',
    description: 'List 5 wins from this week and celebrate your progress',
    difficulty: 'easy',
    estimatedTime: 10,
    xpReward: 35,
    benefits: ['Gratitude', 'Recognition', 'Motivation'],
    preferredDays: ['friday'],
    preferredTime: ['evening'],
    isWeekendQuest: false,
    isWeekdayQuest: true,
    recurring: 'weekly',
  },
  {
    id: 'friday_inbox_zero',
    category: 'intellectual',
    subCategory: 'Focus',
    title: 'Friday Cleanup',
    description: 'Clean inbox, organize files, close open loops',
    difficulty: 'medium',
    estimatedTime: 30,
    xpReward: 45,
    benefits: ['Clarity', 'Organization', 'Peace'],
    preferredDays: ['friday'],
    preferredTime: ['afternoon'],
    isWeekendQuest: false,
    isWeekdayQuest: true,
    recurring: 'weekly',
  },
];

// Get current time context
export function getCurrentTimeContext(): {
  dayOfWeek: DayOfWeek;
  timeOfDay: TimeOfDay;
  isWeekend: boolean;
} {
  const now = new Date();
  const dayIndex = now.getDay(); // 0 = Sunday
  const hour = now.getHours();
  
  const dayMap: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayOfWeek = dayMap[dayIndex];
  const isWeekend = dayIndex === 0 || dayIndex === 6;
  
  let timeOfDay: TimeOfDay;
  if (hour >= 6 && hour < 12) timeOfDay = 'morning';
  else if (hour >= 12 && hour < 18) timeOfDay = 'afternoon';
  else if (hour >= 18 && hour < 22) timeOfDay = 'evening';
  else timeOfDay = 'night';
  
  return { dayOfWeek, timeOfDay, isWeekend };
}

// Generate quests for today
export function generateDailyQuests(
  userBalance?: UserLifeBalance,
  mbtiType?: string
): TimeBasedQuest[] {
  const { dayOfWeek, timeOfDay, isWeekend } = getCurrentTimeContext();
  
  let todaysQuests: TimeBasedQuest[] = [];
  
  // Always include morning quests if it's morning
  if (timeOfDay === 'morning') {
    todaysQuests.push(...MORNING_QUESTS.filter(q => 
      q.preferredDays.includes(dayOfWeek)
    ));
  }
  
  // Add afternoon quests
  if (timeOfDay === 'afternoon' || timeOfDay === 'morning') {
    todaysQuests.push(...AFTERNOON_QUESTS.filter(q => 
      q.preferredDays.includes(dayOfWeek)
    ));
  }
  
  // Add evening quests
  if (timeOfDay === 'evening' || timeOfDay === 'afternoon') {
    todaysQuests.push(...EVENING_QUESTS.filter(q => 
      q.preferredDays.includes(dayOfWeek)
    ));
  }
  
  // Add weekend-specific quests
  if (isWeekend) {
    todaysQuests.push(...WEEKEND_QUESTS.filter(q => 
      q.preferredDays.includes(dayOfWeek)
    ));
  }
  
  // Add day-specific quests
  if (dayOfWeek === 'monday') {
    todaysQuests.push(...MONDAY_QUESTS);
  }
  
  if (dayOfWeek === 'friday') {
    todaysQuests.push(...FRIDAY_QUESTS);
  }
  
  // Remove duplicates
  const uniqueQuests = Array.from(new Map(todaysQuests.map(q => [q.id, q])).values());
  
  // Sort by time relevance and difficulty
  return uniqueQuests.sort((a, b) => {
    // Prioritize current time slot
    const aTimeMatch = a.preferredTime.includes(timeOfDay) ? 1 : 0;
    const bTimeMatch = b.preferredTime.includes(timeOfDay) ? 1 : 0;
    if (aTimeMatch !== bTimeMatch) return bTimeMatch - aTimeMatch;
    
    // Then by difficulty (easy first)
    const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  });
}

// Get recommended quests for specific time
export function getQuestsForTime(timeOfDay: TimeOfDay, dayOfWeek: DayOfWeek): TimeBasedQuest[] {
  const allQuests = [
    ...MORNING_QUESTS,
    ...AFTERNOON_QUESTS,
    ...EVENING_QUESTS,
    ...WEEKEND_QUESTS,
    ...MONDAY_QUESTS,
    ...FRIDAY_QUESTS,
  ];
  
  return allQuests.filter(q => 
    q.preferredTime.includes(timeOfDay) && 
    q.preferredDays.includes(dayOfWeek)
  );
}
