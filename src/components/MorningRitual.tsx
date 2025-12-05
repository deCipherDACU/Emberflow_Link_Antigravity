'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

// Placeholder for the recommended tasks view
function RecommendedTasksView({ mood, timeAvailable }: { mood: string, timeAvailable: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Here are your recommended tasks:</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Based on your mood ({mood}) and time available ({timeAvailable} mins), we'll show some tasks here.</p>
        {/* Task list would go here */}
      </CardContent>
    </Card>
  )
}

export function MorningRitual() {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState<'great' | 'good' | 'okay' | 'tired'>('good');
  const [priority, setPriority] = useState<string>('');
  const [timeAvailable, setTimeAvailable] = useState<number>(60);

  const moods = [
    { value: 'great', emoji: '🤩', label: 'Energized!' },
    { value: 'good', emoji: '😊', label: 'Good' },
    { value: 'okay', emoji: '😐', label: 'Okay' },
    { value: 'tired', emoji: '😴', label: 'Tired' },
  ] as const;

  if (step === 1) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Good Morning! How are you feeling?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {moods.map(m => (
              <Button
                key={m.value}
                variant={mood === m.value ? 'default' : 'outline'}
                onClick={() => {
                  setMood(m.value);
                  setStep(2);
                }}
                className="h-20 text-lg"
              >
                <span className="text-3xl mr-2">{m.emoji}</span>
                {m.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>How much time do you have today?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={[timeAvailable]}
              onValueChange={([val]) => setTimeAvailable(val)}
              min={15}
              max={240}
              step={15}
            />
            <p className="text-center text-2xl font-bold">{timeAvailable} minutes</p>
            <Button onClick={() => setStep(3)} className="w-full">
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Step 3: Show recommended tasks based on mood + time
  return <RecommendedTasksView mood={mood} timeAvailable={timeAvailable} />;
}
