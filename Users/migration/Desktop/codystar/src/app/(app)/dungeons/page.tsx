
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { DungeonCrawl } from '@/lib/types';
import PageHeader from '@/components/shared/PageHeader';
import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard';

export default function ProjectsView() {
  const { dungeons, setDungeons } = useUser();
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const toggleTask = (projectId: string, taskId: string) => {
    const newDungeons = dungeons.map(project =>
        project.id === projectId
          ? {
              ...project,
              challenges: project.challenges.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : project
      )
    // This is a temporary way to update state. In a real app, you'd use the context function.
    // For this prototype, we'll just log it.
    console.log("Updating dungeons state:", newDungeons);
  };

  const getProjectProgress = (project: DungeonCrawl) => {
    const completed = project.challenges.filter(t => t.completed).length;
    return (completed / project.challenges.length) * 100;
  };

  const getEarnedXP = (project: DungeonCrawl) => {
    const completedChallenges = project.challenges.filter(t => t.completed);
    const progress = completedChallenges.length / project.challenges.length;
    return Math.floor(project.xp * progress);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Multi-Day Projects"
        description="Complete structured journeys to level up your skills."
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Start New Project
          </Button>
        }
      />

      {/* Active Projects */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Active Projects</h2>
        {dungeons.map(project => {
          const progress = getProjectProgress(project);
          const earnedXP = getEarnedXP(project);
          const isExpanded = expandedProject === project.id;

          return (
            <LiquidGlassCard key={project.id} className="p-0 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => toggleProject(project.id)}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                      <h3 className="text-xl font-headline text-white">{project.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 ml-8">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < project.difficulty ? "text-yellow-400" : "text-muted-foreground"}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 ml-8 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {project.challenges.filter(t => t.completed).length}/{project.challenges.length}{' '}
                      tasks completed
                    </span>
                    <span className="font-medium text-primary">
                      {earnedXP}/{project.xp} XP
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{Math.round(progress)}% complete</span>
                  </div>
                </div>
              </div>

              {/* Task List (Expanded) */}
              {isExpanded && (
                <div className="px-6 pb-6">
                  <div className="ml-8 space-y-2">
                    {project.challenges.map((task, index) => (
                      <div
                        key={task.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          task.completed
                            ? 'bg-green-500/10 border-green-500/30'
                            : 'bg-card/50 border-border'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(project.id, task.id)}
                          className="h-4 w-4 rounded cursor-pointer"
                        />
                        <div className="flex-1">
                          <span
                            className={`text-sm font-medium ${
                              task.completed ? 'line-through text-muted-foreground' : ''
                            }`}
                          >
                            {index + 1}. {task.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </LiquidGlassCard>
          );
        })}
      </div>

      {/* Browse More Projects */}
      <LiquidGlassCard>
        <CardHeader>
          <CardTitle>Start a New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Choose from pre-designed projects tailored to your personality and goals
          </p>
          <Button variant="outline" className="w-full" asChild>
            <a href="/dungeons">Browse Project Templates</a>
          </Button>
        </CardContent>
      </LiquidGlassCard>
    </div>
  );
}
