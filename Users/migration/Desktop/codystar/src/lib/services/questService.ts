
import { generateDungeonCrawl } from '@/ai/flows/generate-dungeon-crawl';
import { buildQuestContext } from '@/utils/ai-quest-context';

export async function createPersonalizedQuest(userId: string, theme: string, difficulty: number) {
  // Step 1: Build user context
  const userContext = await buildQuestContext(userId, {
    availableTime: 120, // User has 2 hours
    preferredWorkStyle: 'sequential',
    energyPeaks: ['morning', 'afternoon'],
  });

  // Step 2: Generate quest with context
  const quest = await generateDungeonCrawl({
    theme,
    difficulty,
    goal: "Improve coding skills", // Optional: from user's stated goals
    userContext,
  });

  console.log('Generated Quest:', quest);
  console.log('Relevance:', quest.relevanceExplanation);
  
  return quest;
}
