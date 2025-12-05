/**
 * Utility to build user context for AI quest generation
 * Aggregates user data from various sources to provide rich context
 */

import { UserProgress } from '@/lib/formulas';

export interface QuestGenerationContext {
  level: number;
  activeHabits?: string[];
  recentTasks?: string[];
  userGoals?: string[];
  preferredCategories?: string[];
  averageTaskDuration?: number;
  completionRate?: number;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  availableTime?: number;
  completedSimilarTasks?: string[];
  preferredWorkStyle?: 'sequential' | 'parallel' | 'flexible';
  energyPeaks?: Array<'morning' | 'afternoon' | 'evening'>;
  availableDaysPerWeek?: number;
}

/**
 * Build context from user's Firebase data
 * Call this before generating quests to gather relevant user information
 */
export async function buildQuestContext(
  userId: string,
  additionalData?: Partial<QuestGenerationContext>
): Promise<QuestGenerationContext> {
  
  // TODO: Fetch from Firebase
  // This is a template - replace with actual Firebase queries
  
  const context: QuestGenerationContext = {
    level: 1, // Fetch from users/{userId}/progress
    ...additionalData,
  };

  try {
    // Example Firebase queries (implement based on your data structure):
    
    // Get active habits
    // const habitsSnapshot = await db.collection('users').doc(userId).collection('habits')
    //   .where('active', '==', true).limit(5).get();
    // context.activeHabits = habitsSnapshot.docs.map(doc => doc.data().name);

    // Get recent completed tasks
    // const tasksSnapshot = await db.collection('users').doc(userId).collection('tasks')
    //   .where('completed', '==', true)
    //   .orderBy('completedAt', 'desc').limit(10).get();
    // context.recentTasks = tasksSnapshot.docs.map(doc => doc.data().title);

    // Calculate completion rate
    // const allTasks = await db.collection('users').doc(userId).collection('tasks').get();
    // const completedCount = allTasks.docs.filter(doc => doc.data().completed).length;
    // context.completionRate = (completedCount / allTasks.size) * 100;

    // Get user goals
    // const userDoc = await db.collection('users').doc(userId).get();
    // context.userGoals = userDoc.data()?.goals || [];

    // Determine time of day
    const hour = new Date().getHours();
    if (hour < 12) context.timeOfDay = 'morning';
    else if (hour < 17) context.timeOfDay = 'afternoon';
    else if (hour < 21) context.timeOfDay = 'evening';
    else context.timeOfDay = 'night';

  } catch (error) {
    console.error('Error building quest context:', error);
  }

  return context;
}

/**
 * Get preferred categories based on user's task history
 */
export function analyzePreferredCategories(tasks: Array<{ category: string }>): string[] {
  const categoryCounts = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([category]) => category);
}

/**
 * Calculate average task duration from completed tasks
 */
export function calculateAverageTaskDuration(
  tasks: Array<{ startTime?: Date; endTime?: Date; estimatedTime?: number }>
): number {
  const durationsWithTime = tasks
    .filter(task => task.startTime && task.endTime)
    .map(task => {
      const duration = task.endTime!.getTime() - task.startTime!.getTime();
      return duration / (1000 * 60); // Convert to minutes
    });

  const estimatedTimes = tasks
    .filter(task => task.estimatedTime)
    .map(task => task.estimatedTime!);

  const allDurations = [...durationsWithTime, ...estimatedTimes];
  
  if (allDurations.length === 0) return 30; // Default 30 minutes

  return Math.round(
    allDurations.reduce((sum, duration) => sum + duration, 0) / allDurations.length
  );
}
