'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  generateDailyQuests,
  getCurrentTimeContext,
  TimeBasedQuest,
} from '@/utils/timeBasedQuestGenerator';
import { CustomQuestCreator } from './CustomQuestCreator';
import {
  Calendar,
  Clock,
  Star,
  Plus,
  CheckCircle2,
  Circle,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { getCategoryIcon } from '@/config/iconMap';
import { useUser } from '@/context/UserContext';

interface DailyQuestDashboardProps {
  userId: string;
}

export function DailyQuestDashboard({ userId }: DailyQuestDashboardProps) {
    const { tasks, addTask, updateTask } = useUser();
    const [dailyQuests, setDailyQuests] = useState<TimeBasedQuest[]>([]);
    const [completedQuests, setCompletedQuests] = useState<Set<string>>(new Set());
    const [showCreator, setShowCreator] = useState(false);
    const { dayOfWeek, timeOfDay, isWeekend } = getCurrentTimeContext();

    useEffect(() => {
        loadDailyQuests();
        // Load completed quests from the main tasks state
        const completed = new Set(
            tasks.filter(t => t.completed).map(t => t.id)
        );
        setCompletedQuests(completed);
    }, [tasks]);

    const loadDailyQuests = () => {
        const quests = generateDailyQuests();
        setDailyQuests(quests);
    };

    const toggleQuest = (questId: string) => {
        const task = allQuests.find(q => q.id === questId);
        if (task) {
             const isCompleted = completedQuests.has(questId);
             if (isCompleted) {
                completedQuests.delete(questId);
             } else {
                completedQuests.add(questId);
             }
             setCompletedQuests(new Set(completedQuests));
             // The Task type from types.ts is compatible enough
             updateTask({ ...task, completed: !isCompleted } as any);
        }
    };

    const handleSaveCustomQuest = (quest: Partial<TimeBasedQuest>) => {
        addTask(quest);
        setShowCreator(false);
    };

    const allQuests = [...dailyQuests, ...tasks.filter(t => t.type !== 'One-time')];
    const completedCount = allQuests.filter(q => completedQuests.has(q.id!)).length;
    const totalXPEarned = allQuests
        .filter(q => completedQuests.has(q.id!))
        .reduce((sum, q) => sum + (q.xp || 0), 0);
    const progress = allQuests.length > 0 ? (completedCount / allQuests.length) * 100 : 0;

    const morningQuests = allQuests.filter(q => (q as TimeBasedQuest).preferredTime?.includes('morning'));
    const afternoonQuests = allQuests.filter(q => (q as TimeBasedQuest).preferredTime?.includes('afternoon'));
    const eveningQuests = allQuests.filter(q => (q as TimeBasedQuest).preferredTime?.includes('evening'));

    const QuestCard = ({ quest }: { quest: (TimeBasedQuest | Partial<TimeBasedQuest> | any) }) => {
        const isCompleted = completedQuests.has(quest.id!);
        const CategoryIcon = getCategoryIcon(quest.category || 'personal');

        return (
        <div
            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
            isCompleted
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-card border-border hover:border-primary/50'
            }`}
            onClick={() => toggleQuest(quest.id!)}
        >
            <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
                {isCompleted ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                <Circle className="h-6 w-6 text-muted-foreground" />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <h3
                className={`font-semibold mb-1 ${
                    isCompleted ? 'line-through text-muted-foreground' : ''
                }`}
                >
                {quest.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{quest.description}</p>

                <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                    <CategoryIcon className="h-3 w-3" />
                    {quest.category}
                </Badge>
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {quest.estimatedTime || quest.pomodoros * 25 || 'N/A'}m
                </Badge>
                <Badge
                    variant="secondary"
                    className="text-xs font-semibold text-primary flex items-center gap-1"
                >
                    <Star className="h-3 w-3" />
                    {quest.xp || quest.xpReward} XP
                </Badge>
                <Badge
                    variant={
                    quest.difficulty === 'Easy'
                        ? 'secondary'
                        : quest.difficulty === 'Hard'
                        ? 'destructive'
                        : 'default'
                    }
                    className="text-xs"
                >
                    {quest.difficulty?.toUpperCase()}
                </Badge>
                </div>

                {(quest.benefits && quest.benefits.length > 0) && (
                <div className="mt-2 text-xs text-muted-foreground">
                    <Sparkles className="h-3 w-3 inline mr-1" />
                    {quest.benefits.join(', ')}
                </div>
                )}
            </div>
            </div>
        </div>
        );
    };

    if (showCreator) {
        return (
        <CustomQuestCreator
            onSave={handleSaveCustomQuest}
            onCancel={() => setShowCreator(false)}
        />
        );
    }

    return (
        <div className="space-y-6">
        <Card className="bg-gradient-to-br from-primary/80 to-accent/80 text-white">
            <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5" />
                    <h2 className="text-2xl font-bold capitalize">
                    {dayOfWeek} {isWeekend && '(Weekend)'}
                    </h2>
                </div>
                <p className="text-purple-100 capitalize">
                    {timeOfDay} Quests • {completedCount}/{allQuests.length} Completed
                </p>
                </div>
                <div className="text-right">
                <div className="text-4xl font-bold">{totalXPEarned}</div>
                <div className="text-sm text-purple-100">XP Earned Today</div>
                </div>
            </div>

            <Progress value={progress} className="h-3 bg-white/20" />
            <p className="text-sm text-purple-100 mt-2">{Math.round(progress)}% Daily Progress</p>
            </CardContent>
        </Card>

        <Button
            onClick={() => setShowCreator(true)}
            className="w-full h-14 text-lg"
            variant="outline"
        >
            <Plus className="h-5 w-5 mr-2" />
            Create Custom Quest
        </Button>

        {morningQuests.length > 0 && (
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                </div>
                Morning Quests
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {morningQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} />
                ))}
            </CardContent>
            </Card>
        )}

        {afternoonQuests.length > 0 && (
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                </div>
                Afternoon Quests
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {afternoonQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} />
                ))}
            </CardContent>
            </Card>
        )}

        {eveningQuests.length > 0 && (
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                </div>
                Evening Quests
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {eveningQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} />
                ))}
            </CardContent>
            </Card>
        )}
        </div>
    );
}