'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, eachDayOfInterval, startOfWeek, endOfWeek, parseISO } from 'date-fns';

interface PomodoroSession {
  mode: 'focus' | 'short-break' | 'long-break';
  duration: number;
  completedAt: Date | string;
}

interface PomodoroStatsProps {
  onClose: () => void;
}

export function PomodoroStats({ onClose }: PomodoroStatsProps) {
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);

  useEffect(() => {
    try {
        const savedSessions = JSON.parse(localStorage.getItem('pomodoro_sessions') || '[]');
        setSessions(savedSessions.map((s: PomodoroSession) => ({
            ...s,
            completedAt: new Date(s.completedAt)
        })));
    } catch(e) {
        console.error("Failed to load pomodoro sessions", e);
    }
  }, []);

  const thisWeekData = eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date()),
  }).map(day => {
    const dayStr = format(day, 'yyyy-MM-dd');
    const focusMinutes = sessions
      .filter(s => s.mode === 'focus' && format(new Date(s.completedAt), 'yyyy-MM-dd') === dayStr)
      .reduce((sum, s) => sum + s.duration, 0);
    return {
      name: format(day, 'EEE'),
      focus: focusMinutes,
    };
  });

  const totalFocusTime = sessions
    .filter(s => s.mode === 'focus')
    .reduce((sum, s) => sum + s.duration, 0);
  
  const totalFocusSessions = sessions.filter(s => s.mode === 'focus').length;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Pomodoro Statistics</CardTitle>
        <CardDescription>Your focus trends and history.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-center">
            <div className='p-4 bg-muted rounded-lg'>
                <p className="text-sm text-muted-foreground">Total Focus Time</p>
                <p className="text-2xl font-bold">{(totalFocusTime / 60).toFixed(1)} hrs</p>
            </div>
             <div className='p-4 bg-muted rounded-lg'>
                <p className="text-sm text-muted-foreground">Focus Sessions</p>
                <p className="text-2xl font-bold">{totalFocusSessions}</p>
            </div>
        </div>

        <div>
            <h3 className="font-semibold mb-2">This Week's Focus (in minutes)</h3>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={thisWeekData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="focus" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
        
        <Button onClick={onClose} className="w-full">Close</Button>
      </CardContent>
    </Card>
  );
}
