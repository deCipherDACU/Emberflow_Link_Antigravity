
/**
 * Personality & Behavior Pattern Assessment
 * Determines user's quest personality type and behavior patterns
 */

import { PersonalityType, BehaviorPattern } from '@/lib/quests/templates';

export interface PersonalityScore {
  achiever: number;
  explorer: number;
  socializer: number;
  creator: number;
  scholar: number;
  warrior: number;
}

/**
 * Analyze user's task/habit history to determine personality type
 */
export function analyzePersonalityFromHistory(userData: {
  completedTasks: Array<{ category: string; completed: boolean; difficulty?: 'Easy' | 'Medium' | 'Hard' | 'N/A' }>;
  activeHabits: Array<{ name: string; category: string; frequency: string }>;
  streakDays: number;
  completionRate: number;
}): PersonalityType {
  const scores: PersonalityScore = {
    achiever: 0,
    explorer: 0,
    socializer: 0,
    creator: 0,
    scholar: 0,
    warrior: 0,
  };

  // High completion rate = achiever
  if (userData.completionRate > 75) scores.achiever += 3;
  if (userData.completionRate > 90) scores.achiever += 2;

  // Long streaks = warrior
  if (userData.streakDays > 7) scores.warrior += 2;
  if (userData.streakDays > 30) scores.warrior += 3;

  // Variety in categories = explorer
  const categories = new Set(userData.completedTasks.map(t => t.category));
  if (categories.size > 5) scores.explorer += 3;
  if (categories.size > 8) scores.explorer += 2;

  // Creative categories = creator
  const creativeCount = userData.completedTasks.filter(t => 
    ['Hobbies', 'Art', 'Design', 'Writing', 'Music', 'Creativity'].includes(t.category)
  ).length;
  if (creativeCount > 5) scores.creator += 3;

  // Learning categories = scholar
  const learningCount = userData.completedTasks.filter(t =>
    ['Education', 'Learning', 'Study', 'Research'].includes(t.category)
  ).length;
  if (learningCount > 5) scores.scholar += 3;

  // Social categories = socializer
  const socialCount = userData.completedTasks.filter(t =>
    ['Social', 'Community', 'Networking', 'Collaboration'].includes(t.category)
  ).length;
  if (socialCount > 3) scores.socializer += 3;

  // Difficult tasks = warrior
  const hardTaskCount = userData.completedTasks.filter(t => t.difficulty === 'Hard').length;
  if (hardTaskCount > 10) scores.warrior += 2;

  // Return highest scoring personality
  return Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0] as PersonalityType;
}

/**
 * Determine behavior pattern from usage data
 */
export function determineBehaviorPattern(userData: {
  taskCompletionTimes: Array<{ hour: number }>;
  consistencyScore: number;
}): BehaviorPattern {
  // Analyze completion times
  const hours = userData.taskCompletionTimes.map(t => t.hour);
  const morningCount = hours.filter(h => h >= 5 && h < 12).length;
  const nightCount = hours.filter(h => h >= 21 || h < 5).length;

  if (morningCount > hours.length * 0.6) return 'morning_person';
  if (nightCount > hours.length * 0.4) return 'night_owl';
  if (userData.consistencyScore > 0.8) return 'consistent';
  
  // Check for burst pattern (lots of activity in short periods)
  // Add more sophisticated logic here

  return 'balanced';
}

/**
 * Quick personality quiz for new users
 */
export const PERSONALITY_QUIZ = [
  {
    question: "When starting a new project, you prefer to:",
    options: [
      { text: "Set clear goals and track progress", personality: 'achiever' as PersonalityType, weight: 3 },
      { text: "Experiment with different approaches", personality: 'explorer' as PersonalityType, weight: 3 },
      { text: "Collaborate with others", personality: 'socializer' as PersonalityType, weight: 3 },
      { text: "Create something unique and original", personality: 'creator' as PersonalityType, weight: 3 },
      { text: "Research thoroughly first", personality: 'scholar' as PersonalityType, weight: 3 },
      { text: "Push through challenges no matter what", personality: 'warrior' as PersonalityType, weight: 3 },
    ],
  },
  {
    question: "What motivates you most?",
    options: [
      { text: "Achieving measurable results", personality: 'achiever' as PersonalityType, weight: 2 },
      { text: "Learning new things", personality: 'explorer' as PersonalityType, weight: 2 },
      { text: "Helping and connecting with others", personality: 'socializer' as PersonalityType, weight: 2 },
      { text: "Making something beautiful or useful", personality: 'creator' as PersonalityType, weight: 2 },
      { text: "Mastering complex topics", personality: 'scholar' as PersonalityType, weight: 2 },
      { text: "Overcoming difficult challenges", personality: 'warrior' as PersonalityType, weight: 2 },
    ],
  },
  {
    question: "Your ideal weekend activity:",
    options: [
      { text: "Completing a personal project", personality: 'achiever' as PersonalityType, weight: 2 },
      { text: "Trying something you've never done", personality: 'explorer' as PersonalityType, weight: 2 },
      { text: "Hanging out with friends", personality: 'socializer' as PersonalityType, weight: 2 },
      { text: "Working on a creative hobby", personality: 'creator' as PersonalityType, weight: 2 },
      { text: "Reading or taking an online course", personality: 'scholar' as PersonalityType, weight: 2 },
      { text: "Intense workout or physical challenge", personality: 'warrior' as PersonalityType, weight: 2 },
    ],
  },
];

export function calculateQuizResult(answers: number[]): PersonalityType {
  const scores: PersonalityScore = {
    achiever: 0,
    explorer: 0,
    socializer: 0,
    creator: 0,
    scholar: 0,
    warrior: 0,
  };

  answers.forEach((answerIndex, questionIndex) => {
    const answer = PERSONALITY_QUIZ[questionIndex].options[answerIndex];
    scores[answer.personality] += answer.weight;
  });

  return Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0] as PersonalityType;
}
