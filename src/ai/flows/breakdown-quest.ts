'use server';
/**
 * @fileOverview Enhanced quest breakdown with user context and smart task sequencing.
 * 
 * IMPROVEMENTS:
 * - Analyzes user's historical task completion patterns
 * - Creates realistic time estimates based on user data
 * - Orders tasks by logical dependencies
 * - Suggests optimal timing based on user's schedule
 * - Provides difficulty assessment for each sub-task
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// ============================================
// ENHANCED INPUT SCHEMA
// ============================================

const BreakdownQuestInputSchema = z.object({
  title: z.string().describe('The title of the large quest to be broken down.'),
  description: z.string().optional().describe('Additional context about what the user wants to achieve'),
  
  // NEW: User context
  userContext: z.object({
    level: z.number().optional(),
    completedSimilarTasks: z.array(z.string()).optional().describe('Previously completed similar tasks'),
    averageTaskDuration: z.number().optional(),
    preferredWorkStyle: z.enum(['sequential', 'parallel', 'flexible']).optional(),
    energyPeaks: z.array(z.enum(['morning', 'afternoon', 'evening'])).optional(),
    availableDaysPerWeek: z.number().optional(),
  }).optional(),
});

export type BreakdownQuestInput = z.infer<typeof BreakdownQuestInputSchema>;

// ============================================
// ENHANCED OUTPUT SCHEMA
// ============================================

const BreakdownQuestOutputSchema = z.object({
  totalEstimatedTime: z.number().describe('Total estimated time for all sub-tasks (minutes)'),
  recommendedSchedule: z.string().describe('Suggested timeline (e.g., "1 week", "2-3 days")'),
  
  subtasks: z.array(
    z.object({
      title: z.string().describe('The title of the sub-task.'),
      description: z.string().describe('A detailed, actionable description of the sub-task.'),
      estimatedTime: z.number().describe('Estimated time in minutes'),
      difficulty: z.number().min(1).max(5).describe('Difficulty rating'),
      order: z.number().describe('Recommended completion order (1-based)'),
      dependencies: z.array(z.number()).optional().describe('Indices of sub-tasks that must be completed first'),
      recommendedTime: z.enum(['morning', 'afternoon', 'evening', 'anytime']).describe('Best time of day to tackle this'),
      category: z.string().describe('Category/skill area'),
      xpReward: z.number().describe('XP earned for completing this sub-task'),
    })
  ).min(3).max(7).describe('Ordered list of 3-7 actionable sub-tasks'),
  
  tips: z.array(z.string()).optional().describe('2-3 tips for successfully completing this quest'),
});

export type BreakdownQuestOutput = z.infer<typeof BreakdownQuestOutputSchema>;

// ============================================
// MAIN FUNCTION
// ============================================

export async function breakdownQuest(input: BreakdownQuestInput): Promise<BreakdownQuestOutput> {
  return breakdownQuestFlow(input);
}

// ============================================
// ENHANCED PROMPT
// ============================================

const prompt = ai.definePrompt({
  name: 'breakdownQuestPrompt',
  input: { schema: BreakdownQuestInputSchema },
  output: { schema: BreakdownQuestOutputSchema },
  config: {
    temperature: 0.6, // More consistent for project planning
  },
  prompt: `You are an expert project manager and productivity coach for OdysseyDaily. Break down complex goals into achievable sub-tasks that feel REALISTIC and MOTIVATING.

## Quest to Break Down:
**"{{title}}"**
{{#if description}}
Description: {{description}}
{{/if}}

## User Context:
{{#if userContext}}
{{#if userContext.level}}- User Level: {{userContext.level}}{{/if}}
{{#if userContext.completedSimilarTasks}}- Similar Tasks Completed: {{userContext.completedSimilarTasks}}{{/if}}
{{#if userContext.averageTaskDuration}}- Typical Task Duration: {{userContext.averageTaskDuration}} minutes{{/if}}
{{#if userContext.preferredWorkStyle}}- Work Style: {{userContext.preferredWorkStyle}}{{/if}}
{{#if userContext.energyPeaks}}- Energy Peaks: {{userContext.energyPeaks}}{{/if}}
{{#if userContext.availableDaysPerWeek}}- Available Days/Week: {{userContext.availableDaysPerWeek}}{{/if}}
{{/if}}

## Your Task:
Create 3-7 sub-tasks that:

### 1. FOLLOW A LOGICAL SEQUENCE
- Start with foundational/research tasks
- Build complexity progressively
- End with integration/completion tasks
- Use "dependencies" to show which tasks must come first

### 2. ARE SPECIFIC AND ACTIONABLE
- Use clear action verbs (Create, Research, Write, Build, Test, etc.)
- Include deliverables ("Write 3 pages", not just "Write")
- Provide enough detail that user knows exactly what to do
- No vague tasks like "Plan" or "Think about"

### 3. HAVE REALISTIC TIME ESTIMATES
{{#if userContext.averageTaskDuration}}
- User typically spends {{userContext.averageTaskDuration}} minutes on tasks
- Scale estimates accordingly
{{else}}
- Research/planning tasks: 20-40 minutes
- Creation/building tasks: 30-90 minutes
- Review/polish tasks: 15-30 minutes
{{/if}}

### 4. MATCH USER'S WORK STYLE
{{#if userContext.preferredWorkStyle}}
{{#if (eq userContext.preferredWorkStyle 'sequential')}}
- Create linear progression with clear dependencies
- Each task builds directly on the previous
{{else if (eq userContext.preferredWorkStyle 'parallel')}}
- Allow multiple tasks to be done simultaneously
- Minimize dependencies where possible
{{else}}
- Balance between sequential and parallel options
{{/if}}
{{/if}}

### 5. OPTIMIZE FOR ENERGY LEVELS
{{#if userContext.energyPeaks}}
- Schedule creative/difficult tasks for: {{userContext.energyPeaks}}
- Routine/administrative tasks for other times
{{else}}
- Morning: High-focus, creative work
- Afternoon: Collaboration, implementation
- Evening: Review, planning, light work
{{/if}}

### 6. PROVIDE APPROPRIATE XP REWARDS
Base XP on:
- Estimated time (longer = more XP)
- Difficulty (harder = bonus XP)
- Completeness (well-defined = more XP)

Formula: (estimatedTime / 10) * difficulty * 2

### 7. ADD MOTIVATING TIPS
Include 2-3 practical tips like:
- "Start with the research phase when your mind is fresh"
- "Block 90-minute sessions for deep work tasks"
- "Celebrate after completing each milestone"

## Example Breakdown:

**INPUT:** "Learn React.js"

**BAD OUTPUT:**
1. Study React
2. Build something
3. Practice more
❌ Too vague, no clear path

**GOOD OUTPUT:**
1. **"Complete React Fundamentals Tutorial"** (60 min, Difficulty 2, Morning)
   - Follow official React docs "Quick Start" section
   - Build the Tic-Tac-Toe example
   - Take notes on components, props, state
   - XP: 24

2. **"Set Up Development Environment"** (30 min, Difficulty 1, Anytime)
   - Install Node.js and create-react-app
   - Configure VS Code with React extensions
   - Create first React project scaffold
   - Depends on: [1]
   - XP: 12

3. **"Build a Simple To-Do App"** (90 min, Difficulty 3, Afternoon)
   - Create component structure (App, TodoList, TodoItem)
   - Implement add/delete functionality
   - Style with CSS modules
   - Depends on: [2]
   - XP: 54

Tips:
- "Code along with tutorials instead of just watching"
- "Break coding sessions into 25-minute Pomodoros"
- "Join React communities for motivation and help"

✅ Specific, achievable, progressively complex

Return complete JSON structure. Be thorough and practical.`,
});

// ============================================
// GENKIT FLOW
// ============================================

const breakdownQuestFlow = ai.defineFlow(
  {
    name: 'breakdownQuestFlow',
    inputSchema: BreakdownQuestInputSchema,
    outputSchema: BreakdownQuestOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
