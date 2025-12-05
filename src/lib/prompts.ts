
/**
 * AI Prompt Engineering for Gemini Integration
 * 
 * This module contains prompt templates and utilities for interacting
 * with Google's Gemini AI for various features like journal analysis,
 * smart suggestions, and AI coaching.
 * 
 * Prompt Engineering Patterns Used:
 * 1. Few-shot learning: Provide examples in prompts
 * 2. Context injection: Include user data and preferences
 * 3. Structured output: Request JSON responses for parsing
 * 4. Temperature control: Adjust creativity vs. consistency
 * 5. Safety settings: Filter inappropriate content
 */

import { FEATURES, isFeatureEnabled } from '@/config/features';

// ============================================
// PROMPT TEMPLATES
// ============================================

/**
 * System prompts define the AI's role and behavior
 * These are prepended to all conversations
 */
export const SYSTEM_PROMPTS = {
  AI_COACH: `You are an empathetic and motivating life coach integrated into OdysseyDaily, a gamified productivity app. 

Your role:
- Provide personalized productivity advice based on user's goals and habits
- Celebrate achievements and progress
- Offer constructive feedback on missed goals
- Suggest actionable next steps
- Use gamification terminology (XP, quests, levels)
- Be concise (2-3 sentences) but encouraging

Tone: Friendly, supportive, and slightly playful
Format: Always respond in JSON with { message, suggestion?, encouragement }`,

  JOURNAL_ANALYZER: `You are an AI journal analyst for OdysseyDaily. Analyze user's journal entries to extract:
- Emotional tone (positive, neutral, negative, mixed)
- Key themes and topics mentioned
- Productivity insights
- Potential goals or action items
- Mood patterns

Always respond in JSON format:
{
  "tone": "positive" | "neutral" | "negative" | "mixed",
  "themes": string[],
  "insights": string[],
  "suggestedActions": string[],
  "moodScore": number (1-10)
}

Be empathetic and non-judgmental.`,

  SMART_SUGGESTIONS: `You are a smart task and habit suggestion engine for OdysseyDaily.

Based on user's:
- Current habits and tasks
- Completion patterns
- Goals and preferences
- Time of day
- Streak status

Suggest 3-5 relevant tasks or habits that would benefit the user.

Response format:
{
  "suggestions": [
    {
      "title": string,
      "description": string,
      "difficulty": "EASY" | "MEDIUM" | "HARD",
      "estimatedTime": number (minutes),
      "category": string,
      "reasoning": string
    }
  ]
}`,

  ACHIEVEMENT_CELEBRATE: `You are the achievement celebration bot for OdysseyDaily. When a user unlocks an achievement:
- Congratulate them enthusiastically
- Highlight what they accomplished
- Encourage continued progress
- Suggest next milestone

Keep it brief (1-2 sentences) and exciting. Use emojis sparingly.`,
};

// ============================================
// CONTEXT BUILDERS
// ============================================

/**
 * Build context string from user progress data
 * This provides the AI with necessary background information
 * 
 * @param userData - User's current progress and stats
 * @returns Formatted context string
 */
export interface UserContextData {
  level: number;
  totalXP: number;
  coins: number;
  streakDays: number;
  tasksCompleted: number;
  habitsCompleted: number;
  recentTasks?: string[];
  recentHabits?: string[];
  goals?: string[];
}

export const buildUserContext = (userData: UserContextData): string => {
  return `
User Stats:
- Level: ${userData.level}
- Total XP: ${userData.totalXP}
- Coins: ${userData.coins}
- Current Streak: ${userData.streakDays} days
- Tasks Completed: ${userData.tasksCompleted}
- Habits Completed: ${userData.habitsCompleted}

${userData.recentTasks ? `Recent Tasks: ${userData.recentTasks.join(', ')}` : ''}
${userData.recentHabits ? `Active Habits: ${userData.recentHabits.join(', ')}` : ''}
${userData.goals ? `User Goals: ${userData.goals.join(', ')}` : ''}
`.trim();
};

// ============================================
// PROMPT GENERATORS
// ============================================

/**
 * Generate AI coach prompt with user context
 * 
 * @param userMessage - User's question or request
 * @param context - User progress data
 * @returns Complete prompt for Gemini
 */
export const generateCoachPrompt = (
  userMessage: string,
  context: UserContextData
): string => {
  if (!isFeatureEnabled('AI_COACH')) {
    throw new Error('AI Coach feature is disabled');
  }

  return `${SYSTEM_PROMPTS.AI_COACH}

${buildUserContext(context)}

User Message: ${userMessage}

Provide encouraging, actionable advice in JSON format.`;
};

/**
 * Generate journal analysis prompt
 * 
 * @param journalEntry - User's journal text
 * @param previousMood - Optional previous mood score for comparison
 * @returns Prompt for journal analysis
 */
export const generateJournalAnalysisPrompt = (
  journalEntry: string,
  previousMood?: number
): string => {
  if (!isFeatureEnabled('AI_JOURNAL_ANALYSIS')) {
    throw new Error('AI Journal Analysis feature is disabled');
  }

  return `${SYSTEM_PROMPTS.JOURNAL_ANALYZER}

${previousMood ? `Previous Mood Score: ${previousMood}/10\n` : ''}
Journal Entry:
"""
${journalEntry}
"""

Analyze this entry and provide insights in JSON format.`;
};

/**
 * Generate smart suggestion prompt
 * 
 * @param context - User's current state and preferences
 * @param timeOfDay - Current time for context-aware suggestions
 * @returns Prompt for task/habit suggestions
 */
export const generateSmartSuggestionPrompt = (
  context: UserContextData,
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
): string => {
  if (!isFeatureEnabled('AI_SMART_SUGGESTIONS')) {
    throw new Error('AI Smart Suggestions feature is disabled');
  }

  return `${SYSTEM_PROMPTS.SMART_SUGGESTIONS}

${buildUserContext(context)}

Time of Day: ${timeOfDay}

Suggest 3-5 tasks or habits appropriate for this time and user's progress.`;
};

// ============================================
// RESPONSE PARSERS
// ============================================

/**
 * Parse AI response with error handling
 * Gemini should return JSON, but this handles malformed responses
 * 
 * @param response - Raw AI response text
 * @returns Parsed JSON object
 */
export const parseAIResponse = <T>(response: string): T | null => {
  try {
    // Remove markdown code blocks if present
    const cleaned = response
      .replace(/```json\n/g, '')
      .replace(/```\n?/g, '')
      .trim();

    return JSON.parse(cleaned) as T;
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    console.log('Raw response:', response);
    return null;
  }
};

// ============================================
// GEMINI CONFIGURATION
// ============================================

/**
 * Gemini model configuration for different use cases
 * Different features need different temperature/creativity levels
 */
export const GEMINI_CONFIGS = {
  // Coaching needs creativity and empathy
  COACH: {
    model: 'gemini-pro',
    temperature: 0.8,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 512,
  },

  // Analysis needs consistency and accuracy
  JOURNAL_ANALYSIS: {
    model: 'gemini-pro',
    temperature: 0.3,
    topK: 20,
    topP: 0.9,
    maxOutputTokens: 1024,
  },

  // Suggestions need balance of creativity and relevance
  SUGGESTIONS: {
    model: 'gemini-pro',
    temperature: 0.6,
    topK: 30,
    topP: 0.9,
    maxOutputTokens: 768,
  },

  // Celebrations need high creativity
  CELEBRATION: {
    model: 'gemini-pro',
    temperature: 0.9,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 256,
  },
};
