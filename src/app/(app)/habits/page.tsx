'use client';
import { useState } from 'react';
import PageHeader from "@/components/shared/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flame, Target, CalendarCheck, History, Plus } from "lucide-react";
import { MinimalistTodayView } from '@/components/habits/MinimalistTodayView';
import { IntegratedTodayView } from '@/components/habits/IntegratedTodayView';
import { RetroLogging } from '@/components/habits/RetroLogging';
import { TemplateLibrary } from '@/components/habits/TemplateLibrary';
import { OptimizedHabitsProvider } from '@/context/OptimizedHabitsContext';
import { LiquidGlassButton } from '@/components/ui/LiquidGlassButton';
import { CreateHabitDialog } from '@/components/habits/CreateHabitDialog';

export default function HabitsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <OptimizedHabitsProvider>
      <PageHeader
        title="Habit Dashboard"
        description="Build powerful routines and conquer your long-term goals."
        actions={
          <LiquidGlassButton onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2" /> Add New Habit
          </LiquidGlassButton>
        }
      />
      <Tabs defaultValue="today-view" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 max-w-2xl">
          <TabsTrigger value="today-view">
            <Flame className="mr-2"/>
            Today
          </TabsTrigger>
          <TabsTrigger value="minimalist-view">
            <CalendarCheck className="mr-2"/>
            Quick Log
          </TabsTrigger>
          <TabsTrigger value="retro-log">
            <History className="mr-2"/>
            Retro Log
          </TabsTrigger>
          <TabsTrigger value="templates">
            <Target className="mr-2"/>
            Templates
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="today-view">
          <IntegratedTodayView />
        </TabsContent>
        <TabsContent value="minimalist-view">
          <MinimalistTodayView />
        </TabsContent>
        <TabsContent value="retro-log">
          <RetroLogging />
        </TabsContent>
        <TabsContent value="templates">
          <TemplateLibrary />
        </TabsContent>
      </Tabs>
      <CreateHabitDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
    </OptimizedHabitsProvider>
  );
}
