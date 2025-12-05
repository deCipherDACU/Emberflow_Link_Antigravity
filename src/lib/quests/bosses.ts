
/**
 * Boss Fight System - Behavior-Triggered Challenges
 * 
 * Bosses appear when:
 * - User hasn't completed tasks for 2+ days (Procrastination Boss)
 * - User skips habits for 3+ days (Habit Boss)
 * - User breaks a long streak (Relapse Boss)
 * - User reaches milestones (Level Boss)
 * 
 * Boss Types match user's weak areas:
 * - Intellect (for learning/productivity tasks)
 * - Physical (for fitness/health tasks)
 * - Spiritual (for mindfulness/balance tasks)
 */

import { PersonalityType, BehaviorPattern } from '@/lib/quests/templates';

export type BossType = 'intellect' | 'physical' | 'spiritual';
export type BossTrigger = 'inactivity' | 'broken_streak' | 'milestone' | 'challenge';

export interface BossChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  coinReward: number;
  difficulty: number; // 1-5
  category: string;
  timeEstimate: number; // minutes
}

export interface BossTemplate {
  id: string;
  name: string;
  title: string; // e.g., "The Procrastination Demon"
  emoji: string;
  description: string;
  type: BossType;
  triggerCondition: BossTrigger;
  
  // Level scaling
  minLevel: number;
  maxLevel: number;
  
  // Boss stats (for flavor)
  personality: string; // Short description of boss personality
  weaknesses: string[]; // What defeats this boss
  
  // Challenges to defeat boss (3-5 tasks)
  challenges: BossChallenge[];
  
  // Rewards
  totalXP: number;
  totalCoins: number;
  specialReward?: string; // Badge, title, or item
  
  // Visual
  color: string; // For UI theming
  difficulty: number; // Overall boss difficulty 1-5
}

// ============================================
// INTELLECT BOSSES (Learning, Productivity, Mental Work)
// ============================================

const INTELLECT_BOSSES: BossTemplate[] = [
  // BEGINNER LEVEL (1-5)
  {
    id: 'procrastination_imp',
    name: 'Procrastination Imp',
    title: 'The Delay Demon',
    emoji: '😈',
    description: 'A mischievous imp that thrives on your postponed tasks. It grows stronger each day you delay.',
    type: 'intellect',
    triggerCondition: 'inactivity',
    minLevel: 1,
    maxLevel: 5,
    personality: 'Playful but persistent. Loves to whisper "You can do it tomorrow..."',
    weaknesses: ['Quick action', 'Starting small', 'Breaking tasks into chunks'],
    color: 'red',
    difficulty: 1,
    totalXP: 150,
    totalCoins: 50,
    specialReward: 'First Victory Badge',
    challenges: [
      {
        id: 'imp_1',
        title: 'Quick Win: Complete Your Oldest Task',
        description: 'Defeat the imp by completing the task you\'ve been avoiding the longest. Start NOW, not tomorrow!',
        xpReward: 60,
        coinReward: 20,
        difficulty: 2,
        category: 'Productivity',
        timeEstimate: 30,
      },
      {
        id: 'imp_2',
        title: 'Momentum Strike: 3 Small Tasks in a Row',
        description: 'Build unstoppable momentum by completing 3 quick tasks (under 15 min each) without breaks.',
        xpReward: 50,
        coinReward: 15,
        difficulty: 2,
        category: 'Productivity',
        timeEstimate: 45,
      },
      {
        id: 'imp_3',
        title: 'Final Blow: Plan Tomorrow Today',
        description: 'Seal the imp away by creating tomorrow\'s task list right now. Choose your top 3 priorities.',
        xpReward: 40,
        coinReward: 15,
        difficulty: 1,
        category: 'Planning',
        timeEstimate: 10,
      },
    ],
  },

  {
    id: 'focus_thief',
    name: 'Focus Thief',
    title: 'The Distraction Master',
    emoji: '🎭',
    description: 'A shadowy figure that steals your concentration and scatters your attention across a thousand distractions.',
    type: 'intellect',
    triggerCondition: 'inactivity',
    minLevel: 3,
    maxLevel: 10,
    personality: 'Chaotic and flashy. Loves notifications, social media, and "just one more video".',
    weaknesses: ['Deep focus sessions', 'Phone on silent', 'Single-tasking'],
    color: 'purple',
    difficulty: 2,
    totalXP: 250,
    totalCoins: 80,
    specialReward: 'Focus Warrior Title',
    challenges: [
      {
        id: 'thief_1',
        title: 'Silence the Noise: 25-Minute Focus Session',
        description: 'Complete one full Pomodoro session (25 min) with ZERO distractions. Phone on silent, notifications off.',
        xpReward: 80,
        coinReward: 25,
        difficulty: 3,
        category: 'Focus',
        timeEstimate: 25,
      },
      {
        id: 'thief_2',
        title: 'Digital Detox: 2 Hours Phone-Free',
        description: 'Go completely phone-free for 2 hours while working on your most important task. The Thief hates this!',
        xpReward: 100,
        coinReward: 30,
        difficulty: 4,
        category: 'Focus',
        timeEstimate: 120,
      },
      {
        id: 'thief_3',
        title: 'Victory Ritual: Reflect on Deep Work',
        description: 'Journal about what you accomplished during focused time. How did it feel? What helped you stay focused?',
        xpReward: 70,
        coinReward: 25,
        difficulty: 2,
        category: 'Reflection',
        timeEstimate: 10,
      },
    ],
  },

  // INTERMEDIATE LEVEL (6-15)
  {
    id: 'analysis_paralysis_golem',
    name: 'Analysis Paralysis Golem',
    title: 'The Overthinker',
    emoji: '🗿',
    description: 'A massive stone golem that freezes you in endless planning and research, preventing you from taking action.',
    type: 'intellect',
    triggerCondition: 'inactivity',
    minLevel: 6,
    maxLevel: 15,
    personality: 'Slow and methodical. Convinces you that you need "just a bit more research" before starting.',
    weaknesses: ['Imperfect action', 'Time limits', 'Done is better than perfect'],
    color: 'gray',
    difficulty: 3,
    totalXP: 400,
    totalCoins: 120,
    specialReward: 'Action Taker Badge',
    challenges: [
      {
        id: 'golem_1',
        title: 'Imperfect Start: Begin Without Full Planning',
        description: 'Start working on a project you\'ve been "planning to plan". Give yourself max 15 min to plan, then START.',
        xpReward: 100,
        coinReward: 35,
        difficulty: 3,
        category: 'Execution',
        timeEstimate: 60,
      },
      {
        id: 'golem_2',
        title: 'Time Box Challenge: 90-Minute Deep Dive',
        description: 'Set a timer for 90 minutes and work intensely on ONE project. No switching allowed. Embrace imperfection.',
        xpReward: 150,
        coinReward: 45,
        difficulty: 4,
        category: 'Focus',
        timeEstimate: 90,
      },
      {
        id: 'golem_3',
        title: 'Ship It: Complete and Share One Thing',
        description: 'Finish something (anything!) and share it publicly or with someone. Done beats perfect.',
        xpReward: 150,
        coinReward: 40,
        difficulty: 4,
        category: 'Completion',
        timeEstimate: 30,
      },
    ],
  },

  // ADVANCED LEVEL (16-30)
  {
    id: 'burnout_dragon',
    name: 'Burnout Dragon',
    title: 'The Exhaustion Wyrm',
    emoji: '🐉',
    description: 'An ancient dragon that breathes flames of exhaustion. You\'ve been pushing too hard without rest.',
    type: 'intellect',
    triggerCondition: 'challenge',
    minLevel: 16,
    maxLevel: 30,
    personality: 'Powerful but not evil. A wake-up call that you need balance and rest.',
    weaknesses: ['Strategic rest', 'Delegation', 'Saying no', 'Self-care'],
    color: 'orange',
    difficulty: 4,
    totalXP: 600,
    totalCoins: 200,
    specialReward: 'Balance Master Title',
    challenges: [
      {
        id: 'dragon_1',
        title: 'Rest Day: Complete Zero Work Tasks',
        description: 'Take a FULL day off. No work tasks allowed. The dragon respects those who know when to rest.',
        xpReward: 200,
        coinReward: 70,
        difficulty: 5,
        category: 'Rest',
        timeEstimate: 0,
      },
      {
        id: 'dragon_2',
        title: 'Boundary Setting: Say No to 3 Things',
        description: 'Decline or delegate 3 tasks/requests this week. Protect your energy and time.',
        xpReward: 200,
        coinReward: 65,
        difficulty: 4,
        category: 'Boundaries',
        timeEstimate: 60,
      },
      {
        id: 'dragon_3',
        title: 'Energy Audit: Identify What Drains You',
        description: 'Journal about what tasks/activities drain your energy vs. energize you. Plan to do less of the draining ones.',
        xpReward: 200,
        coinReward: 65,
        difficulty: 3,
        category: 'Reflection',
        timeEstimate: 20,
      },
    ],
  },

  // EXPERT LEVEL (31+)
  {
    id: 'perfectionism_lich',
    name: 'Perfectionism Lich',
    title: 'The Never-Good-Enough',
    emoji: '💀',
    description: 'An undead sorcerer that curses your work to never feel complete. Nothing is ever "good enough" under its spell.',
    type: 'intellect',
    triggerCondition: 'broken_streak',
    minLevel: 31,
    maxLevel: 100,
    personality: 'Cold and critical. Whispers that your work isn\'t ready, polished, or perfect enough to share.',
    weaknesses: ['Shipping imperfect work', 'Time constraints', 'External accountability'],
    color: 'black',
    difficulty: 5,
    totalXP: 1000,
    totalCoins: 350,
    specialReward: 'Legendary Completer Badge',
    challenges: [
      {
        id: 'lich_1',
        title: 'The 24-Hour Challenge: Create and Ship',
        description: 'Create something from scratch and publish/share it within 24 hours. No editing after time expires.',
        xpReward: 350,
        coinReward: 120,
        difficulty: 5,
        category: 'Creation',
        timeEstimate: 240,
      },
      {
        id: 'lich_2',
        title: 'Good Enough Manifesto: Define Your Standards',
        description: 'Write down what "good enough" means for your projects. Commit to shipping when you hit that bar, not perfection.',
        xpReward: 300,
        coinReward: 100,
        difficulty: 4,
        category: 'Mindset',
        timeEstimate: 30,
      },
      {
        id: 'lich_3',
        title: 'Public Commitment: Announce a Deadline',
        description: 'Publicly announce a completion deadline for a project. The Lich fears external accountability.',
        xpReward: 350,
        coinReward: 130,
        difficulty: 5,
        category: 'Accountability',
        timeEstimate: 15,
      },
    ],
  },
];

// ============================================
// PHYSICAL BOSSES (Fitness, Health, Energy)
// ============================================

const PHYSICAL_BOSSES: BossTemplate[] = [
  {
    id: 'couch_potato_troll',
    name: 'Couch Potato Troll',
    title: 'The Sedentary Sentinel',
    emoji: '🥔',
    description: 'A lazy troll that wants you to stay glued to your couch. It grows stronger with each day you skip exercise.',
    type: 'physical',
    triggerCondition: 'inactivity',
    minLevel: 1,
    maxLevel: 8,
    personality: 'Sluggish and persuasive. Convinces you that "tomorrow" is better for starting exercise.',
    weaknesses: ['Any movement', 'Short workouts', 'Walking'],
    color: 'brown',
    difficulty: 2,
    totalXP: 200,
    totalCoins: 60,
    specialReward: 'Movement Warrior Badge',
    challenges: [
      {
        id: 'troll_1',
        title: 'Get Moving: 20-Minute Walk',
        description: 'Defeat the troll with a simple 20-minute walk. Outside preferably, but indoor pacing counts too!',
        xpReward: 70,
        coinReward: 20,
        difficulty: 1,
        category: 'Fitness',
        timeEstimate: 20,
      },
      {
        id: 'troll_2',
        title: 'Consistency Strike: 3 Days of Movement',
        description: 'Move your body for at least 15 minutes for 3 consecutive days. Any activity counts!',
        xpReward: 80,
        coinReward: 25,
        difficulty: 3,
        category: 'Fitness',
        timeEstimate: 45,
      },
      {
        id: 'troll_3',
        title: 'Victory Dance: Celebrate with Stretching',
        description: 'Complete a 10-minute stretching routine. The troll hates flexibility!',
        xpReward: 50,
        coinReward: 15,
        difficulty: 1,
        category: 'Wellness',
        timeEstimate: 10,
      },
    ],
  },

  {
    id: 'exhaustion_wraith',
    name: 'Exhaustion Wraith',
    title: 'The Sleep Thief',
    emoji: '👻',
    description: 'A spectral figure that haunts your nights, stealing your sleep and leaving you drained.',
    type: 'physical',
    triggerCondition: 'inactivity',
    minLevel: 5,
    maxLevel: 15,
    personality: 'Nocturnal and persistent. Loves late-night scrolling and "just one more episode".',
    weaknesses: ['Sleep schedule', 'Evening routine', 'No screens before bed'],
    color: 'blue',
    difficulty: 3,
    totalXP: 350,
    totalCoins: 100,
    specialReward: 'Sleep Guardian Title',
    challenges: [
      {
        id: 'wraith_1',
        title: 'Bedtime Ritual: Create Evening Routine',
        description: 'Design and write down a calming 30-minute bedtime routine. No screens allowed in it!',
        xpReward: 100,
        coinReward: 30,
        difficulty: 2,
        category: 'Wellness',
        timeEstimate: 15,
      },
      {
        id: 'wraith_2',
        title: 'Sleep Schedule: 7 Nights Consistent Bedtime',
        description: 'Go to bed at the SAME time for 7 consecutive nights. Set an alarm 30 min before bedtime.',
        xpReward: 150,
        coinReward: 45,
        difficulty: 4,
        category: 'Habits',
        timeEstimate: 0,
      },
      {
        id: 'wraith_3',
        title: 'Screen Sunset: 1 Hour Phone-Free Before Bed',
        description: 'For 3 nights, put your phone away 1 hour before sleep. Read a book or journal instead.',
        xpReward: 100,
        coinReward: 25,
        difficulty: 3,
        category: 'Digital Detox',
        timeEstimate: 0,
      },
    ],
  },

  {
    id: 'junk_food_beast',
    name: 'Junk Food Beast',
    title: 'The Sugar Demon',
    emoji: '🍔',
    description: 'A ravenous beast powered by processed foods and sugar. It weakens your body with every unhealthy meal.',
    type: 'physical',
    triggerCondition: 'challenge',
    minLevel: 8,
    maxLevel: 20,
    personality: 'Impulsive and tempting. Lives in drive-thrus and vending machines.',
    weaknesses: ['Meal prep', 'Hydration', 'Whole foods'],
    color: 'yellow',
    difficulty: 4,
    totalXP: 500,
    totalCoins: 150,
    specialReward: 'Nutrition Warrior Badge',
    challenges: [
      {
        id: 'beast_1',
        title: 'Meal Prep Victory: Cook 3 Healthy Meals',
        description: 'Prepare 3 nutritious meals from scratch this week. Bonus points for batch cooking!',
        xpReward: 150,
        coinReward: 50,
        difficulty: 3,
        category: 'Nutrition',
        timeEstimate: 90,
      },
      {
        id: 'beast_2',
        title: 'Hydration Quest: 8 Glasses Daily for 5 Days',
        description: 'Drink 8 glasses of water every day for 5 consecutive days. Track it!',
        xpReward: 150,
        coinReward: 45,
        difficulty: 3,
        category: 'Health',
        timeEstimate: 0,
      },
      {
        id: 'beast_3',
        title: 'Sugar Strike: 3 Days No Added Sugar',
        description: 'Go 3 full days without added sugar (candy, soda, desserts). Natural fruit sugars are okay.',
        xpReward: 200,
        coinReward: 55,
        difficulty: 5,
        category: 'Nutrition',
        timeEstimate: 0,
      },
    ],
  },

  {
    id: 'injury_hydra',
    name: 'Injury Hydra',
    title: 'The Overtraining Monster',
    emoji: '🐍',
    description: 'A multi-headed beast that appears when you push your body too hard without recovery. Each head represents a different pain point.',
    type: 'physical',
    triggerCondition: 'broken_streak',
    minLevel: 15,
    maxLevel: 100,
    personality: 'Aggressive but preventable. A reminder that rest is part of training.',
    weaknesses: ['Rest days', 'Stretching', 'Listening to your body'],
    color: 'green',
    difficulty: 4,
    totalXP: 700,
    totalCoins: 220,
    specialReward: 'Recovery Master Title',
    challenges: [
      {
        id: 'hydra_1',
        title: 'Active Recovery: Gentle Movement Week',
        description: 'Take a full week of LIGHT activity only. Walking, stretching, yoga - no intense workouts.',
        xpReward: 250,
        coinReward: 80,
        difficulty: 4,
        category: 'Recovery',
        timeEstimate: 0,
      },
      {
        id: 'hydra_2',
        title: 'Mobility Work: Daily Stretching Routine',
        description: 'Complete 15 minutes of stretching/mobility work every day for 7 days.',
        xpReward: 200,
        coinReward: 70,
        difficulty: 3,
        category: 'Wellness',
        timeEstimate: 105,
      },
      {
        id: 'hydra_3',
        title: 'Body Wisdom: Schedule Rest Days',
        description: 'Plan 2 complete rest days per week for the next month. Add them to your calendar now.',
        xpReward: 250,
        coinReward: 70,
        difficulty: 3,
        category: 'Planning',
        timeEstimate: 15,
      },
    ],
  },
];

// ============================================
// SPIRITUAL BOSSES (Mindfulness, Balance, Mental Health)
// ============================================

const SPIRITUAL_BOSSES: BossTemplate[] = [
  {
    id: 'anxiety_shadow',
    name: 'Anxiety Shadow',
    title: 'The Worry Weaver',
    emoji: '🌑',
    description: 'A dark shadow that feeds on your worries and what-ifs. It grows larger the more you ruminate on future fears.',
    type: 'spiritual',
    triggerCondition: 'inactivity',
    minLevel: 1,
    maxLevel: 10,
    personality: 'Intrusive and persistent. Lives in racing thoughts and worst-case scenarios.',
    weaknesses: ['Present moment', 'Breathing exercises', 'Gratitude'],
    color: 'indigo',
    difficulty: 2,
    totalXP: 220,
    totalCoins: 70,
    specialReward: 'Calm Mind Badge',
    challenges: [
      {
        id: 'shadow_1',
        title: 'Breath Work: 5-Minute Breathing Exercise',
        description: 'Complete a 5-minute box breathing session (4-4-4-4 pattern). Focus only on breath.',
        xpReward: 70,
        coinReward: 25,
        difficulty: 2,
        category: 'Mindfulness',
        timeEstimate: 5,
      },
      {
        id: 'shadow_2',
        title: 'Gratitude Shield: List 10 Things You\'re Grateful For',
        description: 'Write down 10 specific things you\'re grateful for RIGHT NOW. Be detailed.',
        xpReward: 80,
        coinReward: 25,
        difficulty: 2,
        category: 'Mindfulness',
        timeEstimate: 10,
      },
      {
        id: 'shadow_3',
        title: 'Present Moment: 10-Minute Meditation',
        description: 'Sit in meditation for 10 minutes. Use a guided meditation if needed. When thoughts arise, gently return to breath.',
        xpReward: 70,
        coinReward: 20,
        difficulty: 2,
        category: 'Meditation',
        timeEstimate: 10,
      },
    ],
  },

  {
    id: 'comparison_demon',
    name: 'Comparison Demon',
    title: 'The Never-Enough',
    emoji: '😔',
    description: 'A demon that constantly shows you others\' highlight reels, making you feel inadequate and behind.',
    type: 'spiritual',
    triggerCondition: 'challenge',
    minLevel: 5,
    maxLevel: 18,
    personality: 'Judgmental and cruel. Lives on social media and in your inner critic.',
    weaknesses: ['Self-compassion', 'Digital detox', 'Personal wins celebration'],
    color: 'pink',
    difficulty: 3,
    totalXP: 400,
    totalCoins: 120,
    specialReward: 'Self-Love Champion Title',
    challenges: [
      {
        id: 'demon_1',
        title: 'Social Media Detox: 3 Days Offline',
        description: 'Stay off ALL social media for 3 full days. Delete apps from your phone if needed.',
        xpReward: 150,
        coinReward: 45,
        difficulty: 4,
        category: 'Digital Detox',
        timeEstimate: 0,
      },
      {
        id: 'demon_2',
        title: 'Win List: Celebrate Your Achievements',
        description: 'Write down 20 things you\'ve accomplished in the past year. No achievement too small!',
        xpReward: 100,
        coinReward: 35,
        difficulty: 2,
        category: 'Reflection',
        timeEstimate: 20,
      },
      {
        id: 'demon_3',
        title: 'Self-Compassion Letter: Write to Yourself',
        description: 'Write a kind letter to yourself as if you were your own best friend. What would you tell yourself?',
        xpReward: 150,
        coinReward: 40,
        difficulty: 3,
        category: 'Self-Care',
        timeEstimate: 15,
      },
    ],
  },

  {
    id: 'disconnection_void',
    name: 'Disconnection Void',
    title: 'The Isolation Echo',
    emoji: '🕳️',
    description: 'An empty void that grows when you isolate yourself from others. It whispers that you\'re better off alone.',
    type: 'spiritual',
    triggerCondition: 'inactivity',
    minLevel: 8,
    maxLevel: 25,
    personality: 'Quiet and cold. Feeds on loneliness and canceled plans.',
    weaknesses: ['Human connection', 'Reaching out', 'Vulnerability'],
    color: 'cyan',
    difficulty: 3,
    totalXP: 450,
    totalCoins: 140,
    specialReward: 'Connection Keeper Badge',
    challenges: [
      {
        id: 'void_1',
        title: 'Reach Out: Message 3 Friends',
        description: 'Send meaningful messages to 3 people you care about. Ask how they\'re doing. Have real conversations.',
        xpReward: 150,
        coinReward: 45,
        difficulty: 3,
        category: 'Social',
        timeEstimate: 30,
      },
      {
        id: 'void_2',
        title: 'Quality Time: Schedule a Hangout',
        description: 'Make concrete plans to spend time with someone (coffee, call, activity). Put it on the calendar.',
        xpReward: 150,
        coinReward: 50,
        difficulty: 3,
        category: 'Social',
        timeEstimate: 15,
      },
      {
        id: 'void_3',
        title: 'Vulnerability Practice: Share Something Real',
        description: 'Share something you\'re struggling with or working on with someone you trust. Practice being seen.',
        xpReward: 150,
        coinReward: 45,
        difficulty: 4,
        category: 'Connection',
        timeEstimate: 30,
      },
    ],
  },

  {
    id: 'meaning_crisis_titan',
    name: 'Meaning Crisis Titan',
    title: 'The Purpose Void',
    emoji: '🌌',
    description: 'A cosmic entity that appears when you question the meaning of your efforts. "What\'s the point?" it asks.',
    type: 'spiritual',
    triggerCondition: 'milestone',
    minLevel: 20,
    maxLevel: 100,
    personality: 'Philosophical and existential. Makes you question everything.',
    weaknesses: ['Value clarity', 'Purpose statement', 'Legacy thinking'],
    color: 'violet',
    difficulty: 5,
    totalXP: 800,
    totalCoins: 280,
    specialReward: 'Purpose Finder Title',
    challenges: [
      {
        id: 'titan_1',
        title: 'Values Audit: Define Your Core 5',
        description: 'Identify your 5 core values (what truly matters to you). Write why each one is important.',
        xpReward: 250,
        coinReward: 90,
        difficulty: 4,
        category: 'Reflection',
        timeEstimate: 45,
      },
      {
        id: 'titan_2',
        title: 'Purpose Statement: Write Your Why',
        description: 'Craft a personal mission statement. What impact do you want to have? What legacy will you leave?',
        xpReward: 300,
        coinReward: 100,
        difficulty: 5,
        category: 'Purpose',
        timeEstimate: 60,
      },
      {
        id: 'titan_3',
        title: 'Alignment Check: Connect Tasks to Values',
        description: 'Review your current goals/tasks. Which align with your values? Which don\'t? Adjust accordingly.',
        xpReward: 250,
        coinReward: 90,
        difficulty: 4,
        category: 'Planning',
        timeEstimate: 30,
      },
    ],
  },
];

// ============================================
// ALL BOSSES COMBINED
// ============================================

export const ALL_BOSS_TEMPLATES: BossTemplate[] = [
  ...INTELLECT_BOSSES,
  ...PHYSICAL_BOSSES,
  ...SPIRITUAL_BOSSES,
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get boss based on user's weakest area and level
 */
export function selectBossForUser(userData: {
  level: number;
  tasksCompletedByCategory: Record<string, number>;
  habitsCompletedByCategory: Record<string, number>;
  inactiveDays: number;
  brokenStreaks: number;
}): BossTemplate | null {
  // Determine user's weakest type
  const intellectScore = 
    (userData.tasksCompletedByCategory['Learning'] || 0) +
    (userData.tasksCompletedByCategory['Productivity'] || 0);
  
  const physicalScore =
    (userData.habitsCompletedByCategory['Fitness'] || 0) +
    (userData.habitsCompletedByCategory['Health'] || 0);
  
  const spiritualScore =
    (userData.habitsCompletedByCategory['Mindfulness'] || 0) +
    (userData.habitsCompletedByCategory['Wellness'] || 0);

  let weakestType: BossType = 'intellect';
  const minScore = Math.min(intellectScore, physicalScore, spiritualScore);
  
  if (minScore === physicalScore) weakestType = 'physical';
  else if (minScore === spiritualScore) weakestType = 'spiritual';

  // Determine trigger
  let trigger: BossTrigger = 'inactivity';
  if (userData.inactiveDays >= 3) trigger = 'inactivity';
  else if (userData.brokenStreaks > 0) trigger = 'broken_streak';
  else if (userData.level % 10 === 0) trigger = 'milestone';

  // Find appropriate boss
  const eligibleBosses = ALL_BOSS_TEMPLATES.filter(
    boss =>
      boss.type === weakestType &&
      boss.minLevel <= userData.level &&
      boss.maxLevel >= userData.level &&
      boss.triggerCondition === trigger
  );

  if (eligibleBosses.length === 0) return null;

  // Return random eligible boss
  return eligibleBosses[Math.floor(Math.random() * eligibleBosses.length)];
}

/**
 * Check if user should face a boss
 */
export function shouldTriggerBoss(userData: {
  inactiveDays: number;
  brokenStreaks: number;
  level: number;
  lastBossFightDate?: Date;
}): boolean {
  // Don't trigger boss if fought recently (within 3 days)
  if (userData.lastBossFightDate) {
    const daysSinceLastBoss =
      (Date.now() - userData.lastBossFightDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceLastBoss < 3) return false;
  }

  // Trigger conditions
  if (userData.inactiveDays >= 2) return true; // 2+ days inactive
  if (userData.brokenStreaks > 0) return true; // Broken a streak
  if (userData.level % 10 === 0) return true; // Milestone level

  return false;
}

/**
 * Get boss by ID
 */
export function getBossById(id: string): BossTemplate | undefined {
  return ALL_BOSS_TEMPLATES.find(boss => boss.id === id);
}

/**
 * Get all bosses of a specific type
 */
export function getBossesByType(type: BossType): BossTemplate[] {
  return ALL_BOSS_TEMPLATES.filter(boss => boss.type === type);
}
