'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Timer, PenLine } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { Progress } from '@/components/ui/progress';
import { isToday, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard';
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton';
import { Skeleton } from '@/components/ui/skeleton';

export default function SimplifiedDashboard() {
  const { user, tasks, loading } = useUser();

  const [todayTasks, setTodayTasks] = useState(tasks.filter(task => task.dueDate && isToday(new Date(task.dueDate))));

  useEffect(() => {
    setTodayTasks(tasks.filter(task => task.dueDate && isToday(new Date(task.dueDate))));
  }, [tasks]);

  if (loading || !user) {
    return (
        <div className="space-y-6 p-6 max-w-4xl mx-auto">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-64 w-full" />
            <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
            <Skeleton className="h-48 w-full" />
        </div>
    );
  }

  const toggleTask = (taskId: string) => {
    // This would ideally be handled by the UserContext
    setTodayTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());
  const tasksThisWeek = tasks.filter(task => task.dueDate && isWithinInterval(new Date(task.dueDate), { start: weekStart, end: weekEnd }));
  const completedThisWeek = tasksThisWeek.filter(t => t.completed).length;
  const weekCompletionRate = tasksThisWeek.length > 0 ? (completedThisWeek / tasksThisWeek.length) * 100 : 0;
  const dailyCompletion = Array.from({ length: 7 }).map((_, i) => {
    const day = new Date(weekStart);
    day.setDate(day.getDate() + i);
    return tasks.some(t => t.lastCompleted && isToday(new Date(t.lastCompleted)) && new Date(t.lastCompleted).getDay() === day.getDay());
  });


  const xpProgress = (user.xp / user.xpToNextLevel) * 100;

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Welcome Header */}
      <LiquidGlassCard className="bg-gradient-to-br from-primary to-accent text-white border-none">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-headline">👋 Welcome, {user.name}</h1>
              <p className="text-lg mt-1 opacity-90">
                Level {user.level} • {user.xp}/{user.xpToNextLevel} XP
              </p>
              <div className="mt-3">
                <Progress value={xpProgress} className="h-3 bg-white/20" />
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-2xl font-bold">
                🔥 {user.streak} Day{user.streak !== 1 ? 's' : ''}
              </div>
              <div className="text-lg mt-1 opacity-90">
                💰 {user.coins} Coins
              </div>
            </div>
          </div>
        </div>
      </LiquidGlassCard>

      {/* Today's Focus */}
      <LiquidGlassCard>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-headline font-bold">Today's Focus</h2>
            <span className="text-sm font-normal text-muted-foreground">
              {todayTasks.filter(t => t.completed).length}/{todayTasks.length} completed
            </span>
          </div>
        </div>
        <div className="px-6 pb-6 space-y-3">
          {todayTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No tasks for today yet!</p>
              <Button className="mt-4" asChild>
                <Link href="/tasks">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Task
                </Link>
              </Button>
            </div>
          ) : (
            todayTasks.map(task => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  task.completed
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-card/50 border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-5 w-5 rounded cursor-pointer"
                  />
                  <div className="flex-1">
                    <h3
                      className={`font-medium ${
                        task.completed ? 'line-through text-muted-foreground' : ''
                      }`}
                    >
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="text-primary font-medium">
                        +{task.xpReward} XP
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </LiquidGlassCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <LiquidGlassButton
          variant="glass"
          className="h-20 flex flex-col items-center justify-center gap-2"
          asChild
        >
          <Link href="/tasks">
            <Plus className="h-6 w-6" />
            <span>Add Task</span>
          </Link>
        </LiquidGlassButton>
        <LiquidGlassButton
          variant="glass"
          className="h-20 flex flex-col items-center justify-center gap-2"
          asChild
        >
          <Link href="/pomodoro">
            <Timer className="h-6 w-6" />
            <span>Pomodoro</span>
          </Link>
        </LiquidGlassButton>
        <LiquidGlassButton
          variant="glass"
          className="h-20 flex flex-col items-center justify-center gap-2"
          asChild
        >
          <Link href="/journal">
            <PenLine className="h-6 w-6" />
            <span>Journal</span>
          </Link>
        </LiquidGlassButton>
      </div>

      {/* This Week */}
      <LiquidGlassCard>
        <div className="p-6">
          <h2 className="text-xl font-headline font-bold">This Week</h2>
        </div>
        <div className="px-6 pb-6 space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Weekly Progress</span>
              <span className="font-medium">
                {completedThisWeek}/{tasksThisWeek.length} tasks
              </span>
            </div>
            <Progress value={weekCompletionRate} className="h-2" />
            <p className="text-sm text-muted-foreground mt-1">
              {Math.round(weekCompletionRate)}% completion rate
            </p>
          </div>

          {/* 7-Day Heatmap */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Activity Streak</p>
            <div className="flex gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="flex-1 text-center">
                  <div
                    className={`h-12 rounded-md flex items-center justify-center text-xs font-medium ${
                      dailyCompletion[index]
                        ? 'bg-green-500/80 text-white'
                        : 'bg-muted/50 text-muted-foreground'
                    }`}
                  >
                    {dailyCompletion[index] ? '✓' : '—'}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{day}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LiquidGlassCard>
    </div>
  );
}