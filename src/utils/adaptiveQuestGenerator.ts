/**
 * Adaptive Quest Generator
 * Creates personalized quests based on life balance + MBTI
 */

import { LIFE_CATEGORIES, UserLifeBalance } from '@/config/lifeBalanceCategories';
import { MBTI_QUEST_PREFERENCES } from '@/config/mbtiQuestPreferences';

export interface QuestTemplate {
  id: string;
  category: string;
  subCategory: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // minutes
  xpReward: number;
  benefits: string[];
  mbtiPreference?: string[]; // Which MBTI types prefer this
}

// Quest templates by category
export const QUEST_TEMPLATES: Record<string, QuestTemplate[]> = {
  personal: [
    {
      id: 'personal_journal_1',
      category: 'personal',
      subCategory: 'Self-Care',
      title: 'Morning Reflection Journal',
      description: 'Spend 10 minutes writing about your thoughts, feelings, and intentions for the day',
      difficulty: 'easy',
      estimatedTime: 10,
      xpReward: 30,
      benefits: ['Self-awareness', 'Clarity', 'Emotional processing'],
      mbtiPreference: ['INFJ', 'INFP', 'INTJ', 'INTP'],
    },
    {
      id: 'personal_hobby_1',
      category: 'personal',
      subCategory: 'Hobbies',
      title: 'Explore a New Creative Skill',
      description: 'Dedicate 30 minutes to learning a new creative skill (drawing, music, writing, etc.)',
      difficulty: 'medium',
      estimatedTime: 30,
      xpReward: 50,
      benefits: ['Creativity', 'Skill development', 'Joy'],
      mbtiPreference: ['ISFP', 'INFP', 'ENFP', 'ESFP'],
    },
    {
      id: 'personal_goals_1',
      category: 'personal',
      subCategory: 'Life Goals',
      title: 'Define Your 90-Day Goals',
      description: 'Write down 3 specific goals you want to achieve in the next 90 days',
      difficulty: 'medium',
      estimatedTime: 20,
      xpReward: 40,
      benefits: ['Direction', 'Motivation', 'Focus'],
      mbtiPreference: ['INTJ', 'ENTJ', 'ISTJ', 'ESTJ'],
    },
    {
      id: 'personal_reading_1',
      category: 'personal',
      subCategory: 'Reading',
      title: 'Read for Personal Growth',
      description: 'Read 20 pages of a personal development or self-help book',
      difficulty: 'easy',
      estimatedTime: 25,
      xpReward: 35,
      benefits: ['Knowledge', 'Perspective', 'Growth'],
      mbtiPreference: ['INTJ', 'INFJ', 'INTP', 'INFP'],
    },
  ],
  
  intellectual: [
    {
      id: 'intellectual_learn_1',
      category: 'intellectual',
      subCategory: 'Professional Learning',
      title: 'Complete an Online Course Module',
      description: 'Finish one module or lesson from an online course in your field',
      difficulty: 'medium',
      estimatedTime: 45,
      xpReward: 60,
      benefits: ['Skill advancement', 'Career growth', 'Competence'],
      mbtiPreference: ['INTJ', 'ENTJ', 'INTP', 'ENTP'],
    },
    {
      id: 'intellectual_problem_1',
      category: 'intellectual',
      subCategory: 'Problem Solving',
      title: 'Solve Complex Problems',
      description: 'Tackle 5 challenging logic puzzles or coding problems',
      difficulty: 'hard',
      estimatedTime: 60,
      xpReward: 80,
      benefits: ['Mental agility', 'Problem-solving', 'Confidence'],
      mbtiPreference: ['INTP', 'INTJ', 'ENTP', 'ENTJ'],
    },
    {
      id: 'intellectual_language_1',
      category: 'intellectual',
      subCategory: 'Language Learning',
      title: 'Practice a New Language',
      description: 'Complete a 20-minute language learning session (Duolingo, Babbel, etc.)',
      difficulty: 'easy',
      estimatedTime: 20,
      xpReward: 35,
      benefits: ['Communication', 'Cultural awareness', 'Cognitive flexibility'],
      mbtiPreference: ['ENFP', 'INFP', 'ENTP', 'INTP'],
    },
    {
      id: 'intellectual_critical_1',
      category: 'intellectual',
      subCategory: 'Critical Thinking',
      title: 'Analyze and Debate',
      description: 'Research a controversial topic and write a balanced analysis of both sides',
      difficulty: 'hard',
      estimatedTime: 50,
      xpReward: 75,
      benefits: ['Critical thinking', 'Objectivity', 'Research skills'],
      mbtiPreference: ['ENTP', 'INTJ', 'ENTJ', 'INTP'],
    },
  ],
  
  social: [
    {
      id: 'social_family_1',
      category: 'social',
      subCategory: 'Family Time',
      title: 'Quality Family Connection',
      description: 'Spend 30 minutes of focused, phone-free time with family',
      difficulty: 'easy',
      estimatedTime: 30,
      xpReward: 40,
      benefits: ['Connection', 'Relationships', 'Love'],
      mbtiPreference: ['ESFJ', 'ENFJ', 'ISFJ', 'ESFP'],
    },
    {
      id: 'social_friends_1',
      category: 'social',
      subCategory: 'Friendships',
      title: 'Reach Out to a Friend',
      description: 'Call or video chat with a friend you haven\'t talked to in a while',
      difficulty: 'easy',
      estimatedTime: 20,
      xpReward: 35,
      benefits: ['Connection', 'Support', 'Joy'],
      mbtiPreference: ['ENFP', 'ESFP', 'ENFJ', 'ESFJ'],
    },
    {
      id: 'social_network_1',
      category: 'social',
      subCategory: 'Networking',
      title: 'Professional Networking',
      description: 'Connect with 3 new professionals on LinkedIn and send personalized messages',
      difficulty: 'medium',
      estimatedTime: 25,
      xpReward: 45,
      benefits: ['Career opportunities', 'Relationships', 'Growth'],
      mbtiPreference: ['ENTJ', 'ENFJ', 'ESTJ', 'ENTP'],
    },
    {
      id: 'social_community_1',
      category: 'social',
      subCategory: 'Community Service',
      title: 'Volunteer or Help Others',
      description: 'Dedicate 1 hour to helping someone or volunteering for a cause',
      difficulty: 'medium',
      estimatedTime: 60,
      xpReward: 70,
      benefits: ['Purpose', 'Community', 'Contribution'],
      mbtiPreference: ['ENFJ', 'INFJ', 'ESFJ', 'ISFJ'],
    },
  ],
  
  financial: [
    {
      id: 'financial_budget_1',
      category: 'financial',
      subCategory: 'Budgeting',
      title: 'Review Monthly Budget',
      description: 'Analyze your spending for the month and adjust budget categories',
      difficulty: 'medium',
      estimatedTime: 30,
      xpReward: 50,
      benefits: ['Financial awareness', 'Control', 'Savings'],
      mbtiPreference: ['ISTJ', 'ESTJ', 'INTJ', 'ENTJ'],
    },
    {
      id: 'financial_income_1',
      category: 'financial',
      subCategory: 'Income Growth',
      title: 'Explore Side Income Opportunity',
      description: 'Research and outline a potential side hustle or passive income stream',
      difficulty: 'hard',
      estimatedTime: 60,
      xpReward: 80,
      benefits: ['Financial growth', 'Security', 'Opportunity'],
      mbtiPreference: ['ENTJ', 'ENTP', 'ESTJ', 'ESTP'],
    },
    {
      id: 'financial_invest_1',
      category: 'financial',
      subCategory: 'Investments',
      title: 'Learn Investment Basics',
      description: 'Complete a lesson on investing fundamentals (stocks, ETFs, retirement)',
      difficulty: 'medium',
      estimatedTime: 40,
      xpReward: 55,
      benefits: ['Financial literacy', 'Wealth building', 'Security'],
      mbtiPreference: ['INTJ', 'ENTJ', 'ISTJ', 'INTP'],
    },
    {
      id: 'financial_career_1',
      category: 'financial',
      subCategory: 'Career Development',
      title: 'Update Your Resume/Portfolio',
      description: 'Refresh your resume or portfolio with recent accomplishments',
      difficulty: 'medium',
      estimatedTime: 45,
      xpReward: 60,
      benefits: ['Career readiness', 'Confidence', 'Opportunity'],
      mbtiPreference: ['ENTJ', 'ESTJ', 'INTJ', 'ISTJ'],
    },
  ],
  
  spiritual: [
    {
      id: 'spiritual_meditate_1',
      category: 'spiritual',
      subCategory: 'Meditation',
      title: 'Guided Meditation Session',
      description: 'Complete a 15-minute guided meditation focusing on breath and presence',
      difficulty: 'easy',
      estimatedTime: 15,
      xpReward: 30,
      benefits: ['Inner peace', 'Clarity', 'Stress reduction'],
      mbtiPreference: ['INFJ', 'INFP', 'ISFP', 'ENFP'],
    },
    {
      id: 'spiritual_gratitude_1',
      category: 'spiritual',
      subCategory: 'Gratitude Practice',
      title: 'Gratitude Journaling',
      description: 'Write down 10 things you\'re grateful for today',
      difficulty: 'easy',
      estimatedTime: 10,
      xpReward: 25,
      benefits: ['Positivity', 'Perspective', 'Happiness'],
      mbtiPreference: ['INFJ', 'ENFJ', 'INFP', 'ENFP'],
    },
    {
      id: 'spiritual_purpose_1',
      category: 'spiritual',
      subCategory: 'Purpose',
      title: 'Define Your Core Values',
      description: 'Identify and write down your top 5 core values and why they matter',
      difficulty: 'medium',
      estimatedTime: 25,
      xpReward: 45,
      benefits: ['Clarity', 'Alignment', 'Direction'],
      mbtiPreference: ['INFJ', 'INTJ', 'INFP', 'ENFJ'],
    },
    {
      id: 'spiritual_mindful_1',
      category: 'spiritual',
      subCategory: 'Mindfulness',
      title: 'Mindful Nature Walk',
      description: 'Take a 20-minute walk in nature, focusing on sensory awareness',
      difficulty: 'easy',
      estimatedTime: 20,
      xpReward: 35,
      benefits: ['Presence', 'Connection', 'Peace'],
      mbtiPreference: ['ISFP', 'INFP', 'ISFJ', 'INFJ'],
    },
  ],
  
  physical: [
    {
      id: 'physical_exercise_1',
      category: 'physical',
      subCategory: 'Exercise',
      title: '30-Minute Workout Session',
      description: 'Complete a 30-minute workout (cardio, strength, or flexibility)',
      difficulty: 'medium',
      estimatedTime: 30,
      xpReward: 50,
      benefits: ['Energy', 'Health', 'Strength'],
      mbtiPreference: ['ESTP', 'ISTP', 'ESFP', 'ISTJ'],
    },
    {
      id: 'physical_nutrition_1',
      category: 'physical',
      subCategory: 'Nutrition',
      title: 'Prepare a Healthy Meal',
      description: 'Cook a nutritious meal from scratch with whole foods',
      difficulty: 'medium',
      estimatedTime: 40,
      xpReward: 45,
      benefits: ['Health', 'Energy', 'Self-care'],
      mbtiPreference: ['ISFJ', 'ISTJ', 'ESFJ', 'ESTJ'],
    },
    {
      id: 'physical_sleep_1',
      category: 'physical',
      subCategory: 'Sleep Quality',
      title: 'Optimize Sleep Routine',
      description: 'Create and follow a consistent bedtime routine tonight',
      difficulty: 'easy',
      estimatedTime: 30,
      xpReward: 35,
      benefits: ['Rest', 'Recovery', 'Energy'],
      mbtiPreference: ['ISTJ', 'ISFJ', 'INTJ', 'INFJ'],
    },
    {
      id: 'physical_energy_1',
      category: 'physical',
      subCategory: 'Energy Levels',
      title: 'Morning Energizer Routine',
      description: 'Do a 10-minute morning routine (stretching, cold shower, breathing)',
      difficulty: 'easy',
      estimatedTime: 10,
      xpReward: 30,
      benefits: ['Energy', 'Alertness', 'Vitality'],
      mbtiPreference: ['ESTP', 'ESFP', 'ISTP', 'ISFP'],
    },
  ],
};

// Generate personalized quest recommendations
export function generatePersonalizedQuests(
  lifeBalance: UserLifeBalance,
  mbtiType: string,
  count: number = 5
): QuestTemplate[] {
  const mbtiPrefs = MBTI_QUEST_PREFERENCES[mbtiType];
  const focusAreas = lifeBalance.recommendedFocus;
  
  // Get all quests for recommended focus areas
  let availableQuests: QuestTemplate[] = [];
  
  focusAreas.forEach(category => {
    if (QUEST_TEMPLATES[category]) {
      availableQuests.push(...QUEST_TEMPLATES[category]);
    }
  });
  
  // Score each quest based on MBTI preference
  const scoredQuests = availableQuests.map(quest => {
    let score = 0;
    
    // Higher score for MBTI-preferred quests
    if (quest.mbtiPreference?.includes(mbtiType)) {
      score += 3;
    }
    
    // Higher score for recommended categories
    if (focusAreas.includes(quest.category)) {
      const categoryIndex = focusAreas.indexOf(quest.category);
      score += (3 - categoryIndex); // First recommended = +3, second = +2, third = +1
    }
    
    // Bonus for matching MBTI preferred quest types
    if (mbtiPrefs && mbtiPrefs.preferredQuestTypes.includes(quest.category)) {
      score += 2;
    }
    
    // Penalty for avoided quest types
    if (mbtiPrefs && mbtiPrefs.avoidedQuestTypes.includes(quest.category)) {
      score -= 2;
    }
    
    return { quest, score };
  });
  
  // Sort by score and return top quests
  return scoredQuests
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(item => item.quest);
}

// Get quest recommendations for weakest area
export function getWeakAreaQuests(
  category: string,
  difficulty: 'easy' | 'medium' | 'hard' = 'easy'
): QuestTemplate[] {
  const categoryQuests = QUEST_TEMPLATES[category] || [];
  return categoryQuests.filter(q => q.difficulty === difficulty);
}
