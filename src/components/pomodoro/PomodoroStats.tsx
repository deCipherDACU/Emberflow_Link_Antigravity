
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
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
        const savedSessionsRaw = localStorage.getItem('pomodoro_sessions');
        if (savedSessionsRaw) {
            const savedSessions = JSON.parse(savedSessionsRaw);
            setSessions(savedSessions.map((s: PomodoroSession) => ({
                ...s,
                completedAt: new Date(s.completedAt)
            })));
        }
    } catch(e) {
        console.error("Failed to load pomodoro sessions", e);
    }
  }, []);

  const thisWeekData = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
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
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                        cursor={{ fill: 'hsl(var(--accent))', fillOpacity: 0.1 }}
                        contentStyle={{
                            background: 'hsl(var(--background))',
                            borderColor: 'hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                        }}
                    />
                    <Bar dataKey="focus" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
        
        <Button onClick={onClose} className="w-full">Close</Button>
      </CardContent>
    </Card>
  );
}
