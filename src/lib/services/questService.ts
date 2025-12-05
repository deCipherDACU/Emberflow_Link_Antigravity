
'use client';
import { generateDungeonCrawl } from '@/ai/flows/generate-dungeon-crawl';
import { buildQuestContext } from '@/utils/ai-quest-context';
import { getRecommendedQuests, QuestTemplate, PersonalityType } from '@/lib/quests/templates';
import { analyzePersonalityFromHistory } from '@/lib/quests/assessment';
import { useState, useEffect } from 'react';
import { QuestCard } from '@/components/quests/QuestCard';

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


export function QuestSelector({ userId }: { userId: string }) {
  const [userPersonality, setUserPersonality] = useState<PersonalityType>('achiever');
  const [userLevel, setUserLevel] = useState(1);
  const [recommendedQuests, setRecommendedQuests] = useState<QuestTemplate[]>([]);

  useEffect(() => {
    // Get user data from Firebase
    const fetchUserData = async () => {
      // Analyze personality from history
      const personality = analyzePersonalityFromHistory({
        completedTasks: [], // Fetch from Firebase
        activeHabits: [],
        streakDays: 5,
        completionRate: 80,
      });
      
      setUserPersonality(personality);
      
      // Get recommended quests
      const quests = getRecommendedQuests(personality, userLevel);
      setRecommendedQuests(quests);
    };

    fetchUserData();
  }, [userId, userLevel]);

  return (
    <div>
      <h2>Recommended Quests for You</h2>
      <p>Your Type: {userPersonality}</p>
      
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {recommendedQuests.map(quest => (
            <QuestCard key={quest.id} quest={quest} onSelect={() => console.log('quest selected')} isRecommended={true} />
        ))}
       </div>
    </div>
  );
}
