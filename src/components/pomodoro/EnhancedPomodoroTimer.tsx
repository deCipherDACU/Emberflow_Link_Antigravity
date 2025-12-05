
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { MusicPlayer } from './MusicPlayer';
import { PomodoroSettings } from './PomodoroSettings';
import { PomodoroStats } from './PomodoroStats';
import { DEFAULT_POMODORO_SETTINGS, PomodoroSettings as Settings } from '@/config/pomodoroSettings';
import {
  Play,
  Pause,
  RotateCcw,
  Settings as SettingsIcon,
  Coffee,
  Target,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { LiquidGlassCard } from '../ui/LiquidGlassCard';
import { LiquidGlassButton } from '../ui/LiquidGlassButton';

type TimerMode = 'focus' | 'short-break' | 'long-break';

interface PomodoroSession {
  mode: TimerMode;
  duration: number;
  completedAt: Date;
  taskId?: string;
}

export function EnhancedPomodoroTimer() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_POMODORO_SETTINGS);
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    if (typeof window !== 'undefined') {
        audioRef.current = new Audio();
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  // Update time when mode changes
  useEffect(() => {
    const duration = {
      focus: settings.focusDuration,
      'short-break': settings.shortBreakDuration,
      'long-break': settings.longBreakDuration,
    }[mode];
    
    setTimeLeft(duration * 60);
    setIsRunning(false);
  }, [mode, settings]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    // Play sound
    if (settings.enableSounds && audioRef.current) {
      audioRef.current.src = `/sounds/${settings.endSoundType}.mp3`;
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }

    // Show notification
    if (settings.enableNotifications && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(
          mode === 'focus' ? 'Focus session complete!' : 'Break time over!',
          {
            body: mode === 'focus' ? 'Time for a break!' : 'Ready to focus again?',
            icon: '/logo.png', // Ensure you have a logo in your public folder
          }
        );
      }
    }

    // Save session
    const session: PomodoroSession = {
      mode,
      duration: mode === 'focus' ? settings.focusDuration : settings.shortBreakDuration,
      completedAt: new Date(),
    };
    saveSession(session);

    // Auto-switch modes
    if (mode === 'focus') {
      const newSessions = sessionsCompleted + 1;
      setSessionsCompleted(newSessions);
      
      const nextMode = newSessions % settings.sessionsBeforeLongBreak === 0
        ? 'long-break'
        : 'short-break';
      
      setMode(nextMode);
      
      if (settings.autoStartBreaks) {
        setTimeout(() => setIsRunning(true), 1000);
      }
    } else {
      setMode('focus');
      
      if (settings.autoStartPomodoros) {
        setTimeout(() => setIsRunning(true), 1000);
      }
    }
  };

  const saveSession = (session: PomodoroSession) => {
    try {
        const sessions = JSON.parse(localStorage.getItem('pomodoro_sessions') || '[]');
        sessions.push(session);
        localStorage.setItem('pomodoro_sessions', JSON.stringify(sessions));
    } catch(e) {
        console.error("Failed to save session to localStorage", e)
    }
  };

  const toggleTimer = () => {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    const duration = {
      focus: settings.focusDuration,
      'short-break': settings.shortBreakDuration,
      'long-break': settings.longBreakDuration,
    }[mode];
    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSeconds = {
    focus: settings.focusDuration * 60,
    'short-break': settings.shortBreakDuration * 60,
    'long-break': settings.longBreakDuration * 60,
  }[mode];

  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  const modeConfig = {
    focus: {
      title: 'Focus Time',
      icon: Target,
      color: 'from-purple-500 to-blue-600',
    },
    'short-break': {
      title: 'Short Break',
      icon: Coffee,
      color: 'from-green-500 to-emerald-600',
    },
    'long-break': {
      title: 'Long Break',
      icon: Zap,
      color: 'from-orange-500 to-red-600',
    },
  }[mode];

  const ModeIcon = modeConfig.icon;

  if (showSettings) {
    return (
      <PomodoroSettings
        settings={settings}
        onSave={(newSettings) => {
          setSettings(newSettings);
          setShowSettings(false);
        }}
        onCancel={() => setShowSettings(false)}
      />
    );
  }

  if (showStats) {
    return <PomodoroStats onClose={() => setShowStats(false)} />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main Timer Card */}
      <LiquidGlassCard className="p-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 font-headline text-white">
              <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${modeConfig.color} flex items-center justify-center shadow-lg`}>
                <ModeIcon className="h-5 w-5 text-white" />
              </div>
              {modeConfig.title}
            </CardTitle>
            <div className="flex gap-2">
              <LiquidGlassButton
                variant="glass"
                size="sm"
                onClick={() => setShowStats(true)}
              >
                <TrendingUp className="h-4 w-4" />
              </LiquidGlassButton>
              <LiquidGlassButton
                variant="glass"
                size="sm"
                onClick={() => setShowSettings(true)}
              >
                <SettingsIcon className="h-4 w-4" />
              </LiquidGlassButton>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Timer Display */}
          <div className="text-center">
            <div className="text-8xl font-bold mb-4 tabular-nums text-white">
              {formatTime(timeLeft)}
            </div>
            <Progress value={progress} className="h-3 mb-4" />
            <p className="text-muted-foreground">
              Session {sessionsCompleted + 1} • {sessionsCompleted % settings.sessionsBeforeLongBreak + 1}/{settings.sessionsBeforeLongBreak} until long break
            </p>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <LiquidGlassButton
              onClick={toggleTimer}
              size="lg"
              className="h-16 px-8 text-lg"
              variant='gradient'
            >
              {isRunning ? (
                <>
                  <Pause className="h-6 w-6 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-6 w-6 mr-2" />
                  Start
                </>
              )}
            </LiquidGlassButton>
            <LiquidGlassButton
              onClick={resetTimer}
              size="lg"
              variant="glass"
              className="h-16 px-8"
            >
              <RotateCcw className="h-6 w-6" />
            </LiquidGlassButton>
          </div>

          {/* Mode Selector */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={mode === 'focus' ? 'default' : 'outline'}
              onClick={() => setMode('focus')}
              disabled={isRunning}
            >
              Focus
            </Button>
            <Button
              variant={mode === 'short-break' ? 'default' : 'outline'}
              onClick={() => setMode('short-break')}
              disabled={isRunning}
            >
              Short Break
            </Button>
            <Button
              variant={mode === 'long-break' ? 'default' : 'outline'}
              onClick={() => setMode('long-break')}
              disabled={isRunning}
            >
              Long Break
            </Button>
          </div>
        </CardContent>
      </LiquidGlassCard>

      {/* Music Player */}
      {mode === 'focus' && (
        <MusicPlayer
          isPlaying={isRunning && settings.enableMusic}
          volume={settings.volume}
          onVolumeChange={(vol) => setSettings({ ...settings, volume: vol })}
          provider={settings.musicProvider}
          onProviderChange={(provider) => setSettings({ ...settings, musicProvider: provider })}
        />
      )}

      {/* Today's Progress */}
      <LiquidGlassCard>
        <CardHeader>
          <CardTitle className="text-lg text-white">Today's Focus Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {Array.from({ length: settings.sessionsBeforeLongBreak }).map((_, i) => (
              <div
                key={i}
                className={`h-8 flex-1 rounded ${
                  i < (sessionsCompleted % settings.sessionsBeforeLongBreak)
                    ? 'bg-primary'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            {sessionsCompleted} sessions completed today
          </p>
        </CardContent>
      </LiquidGlassCard>
    </div>
  );
}
