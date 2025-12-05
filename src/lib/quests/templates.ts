
/**
 * Pre-designed Quest Templates
 * 
 * Quests are categorized by:
 * - Personality Type (based on user preferences)
 * - Level Range (beginner, intermediate, advanced)
 * - Behavior Pattern (productivity style)
 * 
 * Benefits over AI generation:
 * - Instant loading (no API calls)
 * - Consistent quality
 * - No API costs
 * - Tested and balanced rewards
 * - Predictable difficulty
 */

// ============================================
// TYPES & INTERFACES
// ============================================

export type PersonalityType = 
  | 'achiever'      // Goal-oriented, competitive
  | 'explorer'      // Curious, variety-seeking
  | 'socializer'    // Community-focused, collaborative
  | 'creator'       // Artistic, building things
  | 'scholar'       // Learning-focused, knowledge-seeking
  | 'warrior';      // Challenge-seeking, discipline-focused

export type LevelTier = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type BehaviorPattern = 
  | 'morning_person'    // Active in mornings
  | 'night_owl'         // Productive at night
  | 'consistent'        // Regular daily habits
  | 'burst'             // Intense work periods
  | 'balanced'          // Mix of everything
  | 'social';           // Prefers collaborative tasks

export interface QuestChallenge {
  title: string;
  description: string;
  estimatedTime: number;        // minutes
  xpReward: number;
  category: string;
  difficultyLevel: number;      // 1-5
  prerequisite?: number;        // Index of required challenge
  tags: string[];               // For filtering/search
}

export interface QuestTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  
  // Targeting
  personalityTypes: PersonalityType[];
  levelTier: LevelTier;
  behaviorPatterns?: BehaviorPattern[];
  
  // Quest details
  totalXP: number;
  estimatedTotalTime: number;   // minutes
  difficulty: number;            // 1-5
  challenges: QuestChallenge[];
  
  // Metadata
  tags: string[];
  icon?: string;                 // Emoji or icon name
  color?: string;
  unlockRequirements?: {
    minLevel?: number;
    requiredAchievements?: string[];
    completedQuests?: string[];
  };
}

// ============================================
// QUEST TEMPLATES BY PERSONALITY
// ============================================

export const QUEST_TEMPLATES: QuestTemplate[] = [
  
  // ==========================================
  // ACHIEVER QUESTS
  // ==========================================
  
  {
    id: 'achiever_productivity_master_1',
    title: '⚡ Productivity Blitz: Morning Warrior',
    description: 'Master your morning routine and conquer the day before lunch. Perfect for goal-crushers who love checking boxes.',
    category: 'Productivity',
    personalityTypes: ['achiever', 'warrior'],
    levelTier: 'beginner',
    behaviorPatterns: ['morning_person', 'consistent'],
    totalXP: 200,
    estimatedTotalTime: 90,
    difficulty: 2,
    icon: '⚡',
    color: 'yellow',
    tags: ['morning', 'routine', 'productivity', 'habits'],
    challenges: [
      {
        title: 'Wake Up Victory: Early Bird Conquest',
        description: 'Wake up 30 minutes earlier than usual for 3 consecutive days. Use a physical alarm clock placed across the room.',
        estimatedTime: 5,
        xpReward: 40,
        category: 'Habits',
        difficultyLevel: 2,
        tags: ['morning', 'discipline'],
      },
      {
        title: 'Morning Quest: Power Hour Setup',
        description: 'Create a detailed morning routine checklist with 5-7 items (e.g., make bed, exercise, breakfast, review goals). Test it tomorrow morning.',
        estimatedTime: 20,
        xpReward: 50,
        category: 'Planning',
        difficultyLevel: 1,
        prerequisite: 0,
        tags: ['planning', 'routine'],
      },
      {
        title: 'Champion\'s Sprint: Complete 3 Tasks Before Noon',
        description: 'Identify your 3 most important tasks for tomorrow. Complete all 3 before 12 PM. No distractions allowed during execution.',
        estimatedTime: 60,
        xpReward: 80,
        category: 'Execution',
        difficultyLevel: 3,
        prerequisite: 1,
        tags: ['focus', 'deep-work', 'completion'],
      },
      {
        title: 'Victory Reflection: Morning Mastery Review',
        description: 'Journal for 5 minutes about what worked in your morning routine and what to improve. Set one improvement goal for next week.',
        estimatedTime: 5,
        xpReward: 30,
        category: 'Reflection',
        difficultyLevel: 1,
        tags: ['journaling', 'reflection'],
      },
    ],
  },

  {
    id: 'achiever_goal_crusher_2',
    title: '🎯 Goal Annihilation: Weekly Domination',
    description: 'Set and obliterate your weekly goals with military precision. For achievers who thrive on clear targets and measurable wins.',
    category: 'Goal Setting',
    personalityTypes: ['achiever'],
    levelTier: 'intermediate',
    behaviorPatterns: ['consistent', 'burst'],
    totalXP: 350,
    estimatedTotalTime: 120,
    difficulty: 3,
    icon: '🎯',
    color: 'red',
    tags: ['goals', 'planning', 'achievement'],
    unlockRequirements: {
      minLevel: 5,
    },
    challenges: [
      {
        title: 'Strategic Planning: Define Your Targets',
        description: 'Set 3 SMART goals for this week (Specific, Measurable, Achievable, Relevant, Time-bound). Write them down with success criteria.',
        estimatedTime: 30,
        xpReward: 70,
        category: 'Planning',
        difficultyLevel: 2,
        tags: ['goal-setting', 'smart-goals'],
      },
      {
        title: 'Battle Plan: Break Down Your Goals',
        description: 'For each goal, create 3-5 actionable tasks. Assign each task a specific day and time slot this week.',
        estimatedTime: 25,
        xpReward: 60,
        category: 'Planning',
        difficultyLevel: 2,
        prerequisite: 0,
        tags: ['task-breakdown', 'scheduling'],
      },
      {
        title: 'Execute and Conquer: Complete 75% of Tasks',
        description: 'Execute your plan and complete at least 75% of your scheduled tasks this week. Track progress daily.',
        estimatedTime: 60,
        xpReward: 150,
        category: 'Execution',
        difficultyLevel: 4,
        prerequisite: 1,
        tags: ['execution', 'consistency'],
      },
      {
        title: 'Victory Analysis: Weekly Review',
        description: 'Review your week: What goals did you hit? What blocked you? What will you do differently next week? Document insights.',
        estimatedTime: 15,
        xpReward: 70,
        category: 'Reflection',
        difficultyLevel: 2,
        tags: ['review', 'reflection', 'improvement'],
      },
    ],
  },

  // ==========================================
  // EXPLORER QUESTS
  // ==========================================

  {
    id: 'explorer_skill_sampler_1',
    title: '🌍 Skill Explorer: Try 3 New Things',
    description: 'Venture beyond your comfort zone and sample different skills. Perfect for curious minds who love variety.',
    category: 'Learning',
    personalityTypes: ['explorer', 'scholar'],
    levelTier: 'beginner',
    behaviorPatterns: ['balanced'],
    totalXP: 180,
    estimatedTotalTime: 75,
    difficulty: 2,
    icon: '🌍',
    color: 'blue',
    tags: ['learning', 'variety', 'exploration'],
    challenges: [
      {
        title: 'Discovery Quest: Find 3 Interesting Skills',
        description: 'Research and identify 3 skills you\'ve never tried before (e.g., digital art, cooking a new cuisine, coding, language learning). Watch intro videos for each.',
        estimatedTime: 20,
        xpReward: 40,
        category: 'Research',
        difficultyLevel: 1,
        tags: ['research', 'curiosity'],
      },
      {
        title: 'First Steps: Skill #1 Trial',
        description: 'Spend 15 minutes trying the first skill. Follow a beginner tutorial or guide. Document what you learned.',
        estimatedTime: 15,
        xpReward: 45,
        category: 'Learning',
        difficultyLevel: 2,
        prerequisite: 0,
        tags: ['hands-on', 'beginner'],
      },
      {
        title: 'New Territory: Skill #2 Trial',
        description: 'Spend 15 minutes on the second skill. Compare it to the first skill - which do you prefer and why?',
        estimatedTime: 15,
        xpReward: 45,
        category: 'Learning',
        difficultyLevel: 2,
        prerequisite: 0,
        tags: ['hands-on', 'comparison'],
      },
      {
        title: 'Final Frontier: Skill #3 Trial',
        description: 'Complete the trilogy by spending 15 minutes on the third skill. Create a mini-project or exercise in it.',
        estimatedTime: 15,
        xpReward: 45,
        category: 'Learning',
        difficultyLevel: 2,
        prerequisite: 0,
        tags: ['hands-on', 'creation'],
      },
    ],
  },

  {
    id: 'explorer_habit_experiment_2',
    title: '🧪 Habit Laboratory: 7-Day Experiment',
    description: 'Test-drive a completely new habit for a week. Track results scientifically and decide if it\'s worth keeping.',
    category: 'Habits',
    personalityTypes: ['explorer', 'scholar'],
    levelTier: 'intermediate',
    behaviorPatterns: ['consistent', 'balanced'],
    totalXP: 280,
    estimatedTotalTime: 105,
    difficulty: 3,
    icon: '🧪',
    color: 'purple',
    tags: ['habits', 'experiment', 'tracking'],
    unlockRequirements: {
      minLevel: 8,
    },
    challenges: [
      {
        title: 'Hypothesis: Choose Your Experiment',
        description: 'Select one new habit to try for 7 days (e.g., meditation, cold showers, no phone in bed, 10k steps). Define what success looks like.',
        estimatedTime: 15,
        xpReward: 50,
        category: 'Planning',
        difficultyLevel: 2,
        tags: ['habit-selection', 'planning'],
      },
      {
        title: 'Setup: Create Tracking System',
        description: 'Set up a simple tracking method (app, journal, or spreadsheet). Define metrics to measure (consistency, mood impact, energy levels, etc.).',
        estimatedTime: 10,
        xpReward: 40,
        category: 'Planning',
        difficultyLevel: 1,
        prerequisite: 0,
        tags: ['tracking', 'metrics'],
      },
      {
        title: 'Experiment: Execute 7-Day Trial',
        description: 'Perform the habit daily for 7 consecutive days. Log your experience each day (difficulty, how you felt, observations).',
        estimatedTime: 70,
        xpReward: 140,
        category: 'Execution',
        difficultyLevel: 4,
        prerequisite: 1,
        tags: ['consistency', 'daily-practice'],
      },
      {
        title: 'Analysis: Review & Decide',
        description: 'Review your 7-day data. Did it improve your life? Will you continue? Write a "lab report" with your findings and decision.',
        estimatedTime: 10,
        xpReward: 50,
        category: 'Reflection',
        difficultyLevel: 2,
        prerequisite: 2,
        tags: ['analysis', 'reflection', 'decision'],
      },
    ],
  },

  // ==========================================
  // CREATOR QUESTS
  // ==========================================

  {
    id: 'creator_mini_project_1',
    title: '🎨 Creator\'s Challenge: Build Something Today',
    description: 'Channel your creative energy into a completed mini-project. No perfection required - just make something real.',
    category: 'Creativity',
    personalityTypes: ['creator', 'explorer'],
    levelTier: 'beginner',
    behaviorPatterns: ['burst', 'balanced'],
    totalXP: 220,
    estimatedTotalTime: 90,
    difficulty: 2,
    icon: '🎨',
    color: 'pink',
    tags: ['creativity', 'project', 'building'],
    challenges: [
      {
        title: 'Inspiration Hunt: Find Your Project Idea',
        description: 'Browse 3 different sources for inspiration (Pinterest, Behance, GitHub, etc.). Choose ONE project you can complete today (art, code, writing, design).',
        estimatedTime: 15,
        xpReward: 35,
        category: 'Research',
        difficultyLevel: 1,
        tags: ['inspiration', 'ideation'],
      },
      {
        title: 'Blueprint: Quick Planning',
        description: 'Sketch or outline your project. List materials/tools needed. Set a time limit (no more than 60 minutes for execution).',
        estimatedTime: 10,
        xpReward: 30,
        category: 'Planning',
        difficultyLevel: 1,
        prerequisite: 0,
        tags: ['planning', 'design'],
      },
      {
        title: 'Creation Mode: Build It',
        description: 'Execute your project. Don\'t overthink - embrace imperfection. Focus on completing it, not perfecting it.',
        estimatedTime: 60,
        xpReward: 120,
        category: 'Creation',
        difficultyLevel: 3,
        prerequisite: 1,
        tags: ['execution', 'hands-on', 'flow'],
      },
      {
        title: 'Showcase: Share Your Work',
        description: 'Take a photo/screenshot of your creation. Share it somewhere (social media, friends, or just save it in a portfolio folder). Celebrate completion!',
        estimatedTime: 5,
        xpReward: 35,
        category: 'Sharing',
        difficultyLevel: 1,
        prerequisite: 2,
        tags: ['sharing', 'completion'],
      },
    ],
  },

  {
    id: 'creator_30day_challenge_3',
    title: '🚀 30-Day Creator Sprint: Daily Making',
    description: 'Commit to creating something small every day for 30 days. Build your creative muscle through consistent practice.',
    category: 'Creativity',
    personalityTypes: ['creator'],
    levelTier: 'advanced',
    behaviorPatterns: ['consistent', 'burst'],
    totalXP: 800,
    estimatedTotalTime: 300,
    difficulty: 5,
    icon: '🚀',
    color: 'orange',
    tags: ['creativity', '30-day-challenge', 'consistency'],
    unlockRequirements: {
      minLevel: 15,
      completedQuests: ['creator_mini_project_1'],
    },
    challenges: [
      {
        title: 'Challenge Design: Set Your Rules',
        description: 'Define your 30-day challenge: What will you create daily? (sketches, code snippets, poems, photos, etc.) Set duration (5-30 min/day). Create tracking sheet.',
        estimatedTime: 20,
        xpReward: 80,
        category: 'Planning',
        difficultyLevel: 2,
        tags: ['challenge-design', 'commitment'],
      },
      {
        title: 'Week 1: Momentum Building (Days 1-7)',
        description: 'Create something every day for 7 days. Focus on showing up, not perfection. Document each day\'s creation.',
        estimatedTime: 70,
        xpReward: 180,
        category: 'Execution',
        difficultyLevel: 3,
        prerequisite: 0,
        tags: ['week-1', 'momentum'],
      },
      {
        title: 'Week 2-3: Consistency Push (Days 8-21)',
        description: 'Continue daily creation through the challenging middle weeks. Experiment with variations. Don\'t break the chain!',
        estimatedTime: 140,
        xpReward: 350,
        category: 'Execution',
        difficultyLevel: 5,
        prerequisite: 1,
        tags: ['consistency', 'perseverance'],
      },
      {
        title: 'Week 4: Victory Lap (Days 22-30)',
        description: 'Finish strong with the final 9 days. Compile your 30 creations into a showcase (portfolio, video, blog post). Reflect on growth.',
        estimatedTime: 70,
        xpReward: 190,
        category: 'Execution',
        difficultyLevel: 4,
        prerequisite: 2,
        tags: ['completion', 'showcase', 'reflection'],
      },
    ],
  },

  // ==========================================
  // SCHOLAR QUESTS
  // ==========================================

  {
    id: 'scholar_deep_dive_1',
    title: '📚 Knowledge Quest: Master One Topic',
    description: 'Deep dive into a single topic for focused learning. Perfect for knowledge seekers who love thorough understanding.',
    category: 'Learning',
    personalityTypes: ['scholar', 'achiever'],
    levelTier: 'beginner',
    behaviorPatterns: ['balanced', 'consistent'],
    totalXP: 250,
    estimatedTotalTime: 120,
    difficulty: 3,
    icon: '📚',
    color: 'blue',
    tags: ['learning', 'deep-dive', 'knowledge'],
    challenges: [
      {
        title: 'Topic Selection: Choose Your Subject',
        description: 'Pick ONE specific topic you want to master this week (e.g., "React Hooks", "Personal Finance Basics", "Photography Composition"). Define learning goals.',
        estimatedTime: 10,
        xpReward: 40,
        category: 'Planning',
        difficultyLevel: 1,
        tags: ['topic-selection', 'goal-setting'],
      },
      {
        title: 'Resource Gathering: Build Your Library',
        description: 'Find 3-5 quality resources (articles, videos, courses, books). Create a learning plan: what to study each day this week.',
        estimatedTime: 20,
        xpReward: 50,
        category: 'Research',
        difficultyLevel: 2,
        prerequisite: 0,
        tags: ['research', 'curation'],
      },
      {
        title: 'Study Session 1: Foundation Building',
        description: 'Complete first learning session (30-45 min). Take notes using active recall method. Summarize key concepts in your own words.',
        estimatedTime: 45,
        xpReward: 80,
        category: 'Learning',
        difficultyLevel: 3,
        prerequisite: 1,
        tags: ['study', 'note-taking', 'active-learning'],
      },
      {
        title: 'Study Session 2: Practice & Application',
        description: 'Second learning session (30-45 min). Apply what you learned through exercises, examples, or teaching someone else.',
        estimatedTime: 45,
        xpReward: 80,
        category: 'Learning',
        difficultyLevel: 3,
        prerequisite: 2,
        tags: ['practice', 'application', 'teaching'],
      },
    ],
  },

  // ==========================================
  // WARRIOR QUESTS
  // ==========================================

  {
    id: 'warrior_discipline_forge_1',
    title: '⚔️ Warrior\'s Path: Forge Discipline',
    description: 'Build unbreakable discipline through challenging daily commitments. For those who thrive on mental toughness.',
    category: 'Discipline',
    personalityTypes: ['warrior', 'achiever'],
    levelTier: 'intermediate',
    behaviorPatterns: ['consistent', 'morning_person'],
    totalXP: 400,
    estimatedTotalTime: 140,
    difficulty: 4,
    icon: '⚔️',
    color: 'gray',
    tags: ['discipline', 'challenge', 'mental-toughness'],
    unlockRequirements: {
      minLevel: 10,
    },
    challenges: [
      {
        title: 'Commitment Ceremony: Choose Your Challenge',
        description: 'Select one difficult habit to maintain for 21 days (e.g., no snooze button, cold showers, daily exercise, no social media before noon). Write a commitment letter to yourself.',
        estimatedTime: 15,
        xpReward: 60,
        category: 'Planning',
        difficultyLevel: 2,
        tags: ['commitment', 'planning'],
      },
      {
        title: 'Week 1: Breaking Resistance (Days 1-7)',
        description: 'Execute your challenge daily for the first week. This is the hardest part. Track each day. No excuses, no exceptions.',
        estimatedTime: 35,
        xpReward: 120,
        category: 'Execution',
        difficultyLevel: 4,
        prerequisite: 0,
        tags: ['week-1', 'resistance', 'discipline'],
      },
      {
        title: 'Week 2-3: Building the Habit (Days 8-21)',
        description: 'Continue for 14 more days. Notice it getting easier. Document your mental shifts and physical changes. Push through the dips.',
        estimatedTime: 70,
        xpReward: 180,
        category: 'Execution',
        difficultyLevel: 5,
        prerequisite: 1,
        tags: ['habit-formation', 'perseverance'],
      },
      {
        title: 'Warrior\'s Reflection: Growth Assessment',
        description: 'Reflect on 21 days of discipline. How has it changed you? What did you learn about your limits? Set your next challenge.',
        estimatedTime: 20,
        xpReward: 40,
        category: 'Reflection',
        difficultyLevel: 2,
        prerequisite: 2,
        tags: ['reflection', 'growth'],
      },
    ],
  },

  // ==========================================
  // SOCIALIZER QUESTS
  // ==========================================

  {
    id: 'socializer_community_builder_1',
    title: '🤝 Community Builder: Connect & Contribute',
    description: 'Strengthen your community connections through meaningful interactions. For those who thrive on relationships.',
    category: 'Social',
    personalityTypes: ['socializer'],
    levelTier: 'beginner',
    behaviorPatterns: ['social', 'balanced'],
    totalXP: 190,
    estimatedTotalTime: 60,
    difficulty: 2,
    icon: '🤝',
    color: 'green',
    tags: ['community', 'social', 'connection'],
    challenges: [
      {
        title: 'Community Mapping: Find Your Tribes',
        description: 'List 3 communities you\'re part of or want to join (online forums, local groups, professional networks). Choose one to engage with this week.',
        estimatedTime: 10,
        xpReward: 35,
        category: 'Planning',
        difficultyLevel: 1,
        tags: ['community', 'networking'],
      },
      {
        title: 'Helpful Hand: Provide Value',
        description: 'Help 3 people in your chosen community. Answer questions, share resources, offer encouragement. Focus on giving, not getting.',
        estimatedTime: 30,
        xpReward: 80,
        category: 'Contribution',
        difficultyLevel: 2,
        prerequisite: 0,
        tags: ['helping', 'value', 'giving'],
      },
      {
        title: 'Deep Connection: Quality Conversation',
        description: 'Have a meaningful 1-on-1 conversation with someone from your community (video call, coffee, or long message). Learn their story.',
        estimatedTime: 30,
        xpReward: 75,
        category: 'Connection',
        difficultyLevel: 2,
        prerequisite: 0,
        tags: ['conversation', 'connection', 'relationship'],
      },
    ],
  },

  // ==========================================
  // BALANCED/WELLNESS QUESTS
  // ==========================================

  {
    id: 'wellness_mindful_week_1',
    title: '🧘 Mindful Reset: 7-Day Wellness',
    description: 'Rebalance your mind and body with a structured wellness week. Suitable for all personality types needing a reset.',
    category: 'Wellness',
    personalityTypes: ['achiever', 'explorer', 'scholar', 'warrior', 'creator', 'socializer'],
    levelTier: 'beginner',
    behaviorPatterns: ['balanced'],
    totalXP: 300,
    estimatedTotalTime: 105,
    difficulty: 3,
    icon: '🧘',
    color: 'teal',
    tags: ['wellness', 'mindfulness', 'balance', 'health'],
    challenges: [
      {
        title: 'Wellness Audit: Assess Current State',
        description: 'Rate yourself 1-10 in: sleep quality, nutrition, exercise, stress level, social connection. Identify your weakest area to focus on.',
        estimatedTime: 10,
        xpReward: 40,
        category: 'Assessment',
        difficultyLevel: 1,
        tags: ['self-assessment', 'awareness'],
      },
      {
        title: 'Daily Practice: Mindfulness Routine',
        description: 'Practice 5-10 minutes of mindfulness daily for 7 days (meditation, breathing exercises, or mindful walking). Track how you feel each day.',
        estimatedTime: 70,
        xpReward: 140,
        category: 'Practice',
        difficultyLevel: 3,
        prerequisite: 0,
        tags: ['meditation', 'mindfulness', 'daily-practice'],
      },
      {
        title: 'Movement Medicine: Active Recovery',
        description: 'Exercise or move your body for 20+ minutes, 3 times this week. Choose activities you enjoy (walk, yoga, dance, sports).',
        estimatedTime: 60,
        xpReward: 100,
        category: 'Physical',
        difficultyLevel: 3,
        tags: ['exercise', 'movement', 'physical-health'],
      },
      {
        title: 'Reflection Ritual: Weekly Review',
        description: 'Journal about your wellness week. What improved? What habits will you keep? Set one wellness goal for next week.',
        estimatedTime: 15,
        xpReward: 20,
        category: 'Reflection',
        difficultyLevel: 1,
        tags: ['journaling', 'reflection', 'goal-setting'],
      },
    ],
  },

  // Add more templates here...
  // You can create 20-30 total quests across different combinations

];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get level tier from user level
 */
export function getLevelTier(level: number): LevelTier {
  if (level <= 5) return 'beginner';
  if (level <= 15) return 'intermediate';
  if (level <= 30) return 'advanced';
  return 'expert';
}

/**
 * Filter quests by user profile
 */
export function getRecommendedQuests(
  userPersonality: PersonalityType,
  userLevel: number,
  userBehavior?: BehaviorPattern,
  options: {
    includeCompleted?: string[];
    limit?: number;
  } = {}
): QuestTemplate[] {
  const levelTier = getLevelTier(userLevel);
  const { includeCompleted = [], limit = 10 } = options;

  let filtered = QUEST_TEMPLATES.filter(quest => {
    // Check if already completed
    if (includeCompleted.includes(quest.id)) return false;

    // Check unlock requirements
    if (quest.unlockRequirements) {
      if (quest.unlockRequirements.minLevel && userLevel < quest.unlockRequirements.minLevel) {
        return false;
      }
      // Add more requirement checks here
    }

    // Check personality match
    if (!quest.personalityTypes.includes(userPersonality)) {
      return false;
    }

    // Prefer same level tier, but allow ±1 tier
    const tierOrder: LevelTier[] = ['beginner', 'intermediate', 'advanced', 'expert'];
    const userTierIndex = tierOrder.indexOf(levelTier);
    const questTierIndex = tierOrder.indexOf(quest.levelTier);
    const tierDiff = Math.abs(userTierIndex - questTierIndex);
    if (tierDiff > 1) return false;

    // Optional: match behavior pattern if provided
    if (userBehavior && quest.behaviorPatterns) {
      if (!quest.behaviorPatterns.includes(userBehavior)) {
        // Don't exclude, just deprioritize in sorting
      }
    }

    return true;
  });

  // Sort by relevance
  filtered = filtered.sort((a, b) => {
    // Prioritize exact level tier match
    const aTierMatch = a.levelTier === levelTier ? 1 : 0;
    const bTierMatch = b.levelTier === levelTier ? 1 : 0;
    if (aTierMatch !== bTierMatch) return bTierMatch - aTierMatch;

    // Then by behavior pattern match
    if (userBehavior) {
      const aBehaviorMatch = a.behaviorPatterns?.includes(userBehavior) ? 1 : 0;
      const bBehaviorMatch = b.behaviorPatterns?.includes(userBehavior) ? 1 : 0;
      if (aBehaviorMatch !== bBehaviorMatch) return bBehaviorMatch - aBehaviorMatch;
    }

    // Then by difficulty (prefer slightly challenging)
    return Math.abs(a.difficulty - 3) - Math.abs(b.difficulty - 3);
  });

  return filtered.slice(0, limit);
}

/**
 * Get a specific quest by ID
 */
export function getQuestById(id: string): QuestTemplate | undefined {
  return QUEST_TEMPLATES.find(quest => quest.id === id);
}

/**
 * Search quests by tags or category
 */
export function searchQuests(query: string): QuestTemplate[] {
  const lowerQuery = query.toLowerCase();
  return QUEST_TEMPLATES.filter(quest => 
    quest.title.toLowerCase().includes(lowerQuery) ||
    quest.description.toLowerCase().includes(lowerQuery) ||
    quest.category.toLowerCase().includes(lowerQuery) ||
    quest.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get random daily quest
 */
export function getDailyQuest(
  userPersonality: PersonalityType,
  userLevel: number,
  seed?: number
): QuestTemplate {
  const recommended = getRecommendedQuests(userPersonality, userLevel, undefined, { limit: 5 });
  
  // Use seed for consistent "daily" quest (same quest all day)
  const today = seed || new Date().setHours(0, 0, 0, 0);
  const index = today % recommended.length;
  
  return recommended[index] || QUEST_TEMPLATES[0];
}
