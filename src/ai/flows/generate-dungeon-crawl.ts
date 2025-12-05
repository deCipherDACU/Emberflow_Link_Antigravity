
'use server';
/**
 * @fileOverview Enhanced Dungeon Crawl generation with user context awareness.
 * 
 * IMPROVEMENTS:
 * - Uses user's active habits, tasks, and goals for relevance
 * - Considers user's level and progress for difficulty scaling
 * - Analyzes completion patterns to suggest realistic tasks
 * - Ensures challenges align with user's actual life/work context
 * - Provides time estimates based on user's historical data
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// ============================================
// INPUT SCHEMA - Now includes user context
// ============================================

const GenerateDungeonCrawlInputSchema = z.object({
  theme: z.string().describe('The theme for the dungeon crawl (e.g., "The Goblin Mines", "The Enchanted Library").'),
  difficulty: z.number().min(1).max(5).describe('The difficulty level of the dungeon, from 1 (easiest) to 5 (hardest).'),
  goal: z.string().optional().describe('An optional goal the user wants to accomplish, which should influence the theme and challenges.'),
  
  // NEW: User context for personalization
  userContext: z.object({
    level: z.number().describe('User\'s current level in the app'),
    activeHabits: z.array(z.string()).optional().describe('List of user\'s active habit names'),
    recentTasks: z.array(z.string()).optional().describe('Recently completed task titles'),
    userGoals: z.array(z.string()).optional().describe('User\'s stated long-term goals'),
    preferredCategories: z.array(z.string()).optional().describe('Categories user engages with most (e.g., "fitness", "learning", "productivity")'),
    averageTaskDuration: z.number().optional().describe('Average time user takes to complete tasks (in minutes)'),
    completionRate: z.number().optional().describe('User\'s task completion rate (0-100)'),
    timeOfDay: z.enum(['morning', 'afternoon', 'evening', 'night']).optional(),
    availableTime: z.number().optional().describe('How much time user has available (in minutes)'),
  }).optional().describe('User\'s current state and preferences for context-aware generation'),
});

export type GenerateDungeonCrawlInput = z.infer<typeof GenerateDungeonCrawlInputSchema>;

// ============================================
// OUTPUT SCHEMA - Enhanced with metadata
// ============================================

const GenerateDungeonCrawlOutputSchema = z.object({
  title: z.string().describe('A creative and engaging title for the dungeon.'),
  description: z.string().describe('A short, thematic description of the dungeon.'),
  xp: z.number().describe('The total XP reward for completing the dungeon, scaled by difficulty.'),
  estimatedTotalTime: z.number().describe('Estimated total time to complete all challenges (in minutes)'),
  category: z.string().describe('Primary category this dungeon belongs to (e.g., "productivity", "fitness", "learning")'),
  
  challenges: z.array(z.object({
    title: z.string().describe('The title of the individual challenge.'),
    description: z.string().describe('Detailed, actionable description of what user needs to do'),
    estimatedTime: z.number().describe('Estimated time to complete this challenge (in minutes)'),
    xpReward: z.number().describe('XP reward for this individual challenge'),
    difficultyLevel: z.number().min(1).max(5).describe('Difficulty of this specific challenge'),
    category: z.string().describe('Category tag for this challenge'),
    prerequisite: z.number().optional().describe('Index of challenge that must be completed first (if any)'),
  })).min(3).max(5).describe('A list of 3-5 challenges that fit the dungeon theme.'),
  
  // NEW: Relevance explanation
  relevanceExplanation: z.string().describe('Brief explanation of why this quest is relevant to the user\'s current goals and habits'),
});

export type GenerateDungeonCrawlOutput = z.infer<typeof GenerateDungeonCrawlOutputSchema>;

// ============================================
// MAIN FUNCTION
// ============================================

export async function generateDungeonCrawl(input: GenerateDungeonCrawlInput): Promise<GenerateDungeonCrawlOutput> {
  return generateDungeonCrawlFlow(input);
}

// ============================================
// ENHANCED PROMPT WITH USER CONTEXT
// ============================================

const prompt = ai.definePrompt({
  name: 'generateDungeonCrawlPrompt',
  input: { schema: GenerateDungeonCrawlInputSchema },
  output: { schema: GenerateDungeonCrawlOutputSchema },
  config: {
    temperature: 0.7, // Balanced creativity and consistency
  },
  prompt: `You are an AI Dungeon Master for OdysseyDaily, a gamified productivity app. Your task is to create a PERSONALIZED "Dungeon Crawl" (mini-project) consisting of 3-5 related tasks.

**CRITICAL: Make this quest RELEVANT to the user's actual life, not random generic tasks.**

## User-Provided Details:
- Theme: "{{theme}}"
- Difficulty: {{difficulty}} out of 5
{{#if goal}}- User's Goal: "{{goal}}"{{/if}}

## User Context (USE THIS to make quests RELEVANT):
{{#if userContext}}
- User Level: {{userContext.level}}
{{#if userContext.activeHabits}}- Active Habits: {{userContext.activeHabits}}{{/if}}
{{#if userContext.recentTasks}}- Recent Tasks: {{userContext.recentTasks}}{{/if}}
{{#if userContext.userGoals}}- Long-term Goals: {{userContext.userGoals}}{{/if}}
{{#if userContext.preferredCategories}}- Preferred Categories: {{userContext.preferredCategories}}{{/if}}
{{#if userContext.averageTaskDuration}}- Typical Task Duration: {{userContext.averageTaskDuration}} minutes{{/if}}
{{#if userContext.completionRate}}- Completion Rate: {{userContext.completionRate}}%{{/if}}
{{#if userContext.timeOfDay}}- Time of Day: {{userContext.timeOfDay}}{{/if}}
{{#if userContext.availableTime}}- Available Time: {{userContext.availableTime}} minutes{{/if}}
{{/if}}

## Instructions:

### 1. RELEVANCE FIRST
- Analyze the user's active habits, recent tasks, and goals
- Create challenges that BUILD UPON or COMPLEMENT their existing routines
- If they have fitness habits, include related challenges
- If they're learning something, create progressive learning tasks
- Make challenges ACTIONABLE and SPECIFIC to their context

### 2. SMART TIME ESTIMATION
- Use user's average task duration as a baseline
- If user has {{userContext.availableTime}} minutes, total time should fit within that
- Distribute time realistically across challenges
- Consider time of day (morning tasks should be energizing, evening tasks calming)

### 3. DIFFICULTY SCALING
- Match difficulty to user's level ({{userContext.level}})
- Low-level users (1-5): Easier, more guidance
- Mid-level users (6-15): Moderate challenge
- High-level users (16+): Complex, multi-step challenges
- If completion rate is low, slightly reduce difficulty

### 4. PROGRESSIVE STRUCTURE
- Order challenges logically (simple → complex)
- Use "prerequisite" field to create dependencies
- Each challenge should build toward the goal

### 5. CATEGORY ALIGNMENT
- Use user's preferred categories when possible
- Match theme to categories they engage with most
- Cross-category quests are okay if they align with goals

### 6. XP REWARDS (Scale with difficulty AND user level)
Base XP by difficulty:
- Difficulty 1: 100-150 XP total
- Difficulty 2: 200-300 XP total
- Difficulty 3: 350-450 XP total
- Difficulty 4: 500-650 XP total
- Difficulty 5: 700-900 XP total

Individual challenge XP should sum to total XP.

### 7. THEMATIC IMMERSION
- Wrap real-world tasks in fantasy/adventure language
- Examples:
  * "Read chapter 5" → "Decipher the Ancient Scroll of Knowledge"
  * "Exercise for 30 min" → "Train at the Warrior's Dojo"
  * "Write 500 words" → "Craft the Tome of Legends"
  * "Clean workspace" → "Purify the Sacred Chamber"

### 8. ACTIONABLE DESCRIPTIONS
Each challenge description must include:
- Specific action (verb + object)
- Clear completion criteria
- Time estimate
- Any tools/resources needed

### Example Good vs Bad:

**BAD (Generic):**
Title: "The Productivity Dungeon"
Challenges: ["Complete a task", "Do exercise", "Learn something"]
❌ Too vague, not personalized

**GOOD (Contextual):**
Title: "The Scholar's Ascent: JavaScript Mastery"
(User is learning web dev, has coding in recent tasks)
Challenges: 
1. "Study the Runes of React Hooks" - Complete Codecademy React Hooks module (45 min)
2. "Forge the Component Sword" - Build a reusable Button component (30 min)
3. "Battle the Bug Dragon" - Debug your portfolio project's nav bar (25 min)
✅ Specific, builds on user's actual learning path

Return the complete JSON structure with all required fields.

**RELEVANCE EXPLANATION:** In 1-2 sentences, explain WHY this quest suits the user's current situation.`,
});

// ============================================
// GENKIT FLOW
// ============================================

const generateDungeonCrawlFlow = ai.defineFlow(
  {
    name: 'generateDungeonCrawlFlow',
    inputSchema: GenerateDungeonCrawlInputSchema,
    outputSchema: GenerateDungeonCrawlOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
