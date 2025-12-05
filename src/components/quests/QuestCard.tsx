'use client';

import { QuestTemplate } from '@/lib/quests/templates';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Star, Zap, Check } from 'lucide-react';
import { LiquidGlassCard } from '../ui/LiquidGlassCard';
import { LiquidGlassButton } from '../ui/LiquidGlassButton';
import { cn } from '@/lib/utils';

interface QuestCardProps {
  quest: QuestTemplate;
  onSelect: (questId: string) => void;
  isRecommended?: boolean;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest, onSelect, isRecommended }) => {
  return (
    <LiquidGlassCard className={cn("p-6 flex flex-col h-full", isRecommended && "border-primary/50")}>
      <CardHeader className="p-0 mb-4">
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline text-xl text-white">{quest.icon} {quest.title}</CardTitle>
                <CardDescription className="mt-1">{quest.description}</CardDescription>
            </div>
            {isRecommended && <Badge>Recommended</Badge>}
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        <div className="flex flex-wrap gap-2">
            {quest.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
      </CardContent>
      <CardFooter className="p-0 mt-6 flex justify-between items-center">
        <div className='flex gap-4'>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="font-semibold text-white">{quest.totalXP} XP</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="font-semibold text-white">{quest.estimatedTotalTime} min</span>
            </div>
             <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="w-4 h-4" />
                <span className="font-semibold text-white">Diff: {quest.difficulty}/5</span>
            </div>
        </div>
        <LiquidGlassButton size="sm" onClick={() => onSelect(quest.id)}>
          <Check className="mr-2 h-4 w-4"/>
          Select
        </LiquidGlassButton>
      </CardFooter>
    </LiquidGlassCard>
  );
};
