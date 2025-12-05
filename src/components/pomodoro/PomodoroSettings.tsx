
'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PomodoroSettings as Settings } from '@/config/pomodoroSettings';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField } from '../ui/form';

const settingsSchema = z.object({
  focusDuration: z.coerce.number().min(5).max(90),
  shortBreakDuration: z.coerce.number().min(1).max(30),
  longBreakDuration: z.coerce.number().min(5).max(60),
  sessionsBeforeLongBreak: z.coerce.number().min(2).max(8),
  autoStartBreaks: z.boolean(),
  autoStartPomodoros: z.boolean(),
  enableNotifications: z.boolean(),
  enableSounds: z.boolean(),
  endSoundType: z.enum(['bell', 'chime', 'alarm', 'gentle']),
  enableMusic: z.boolean(),
  musicProvider: z.enum(['spotify', 'youtube', 'none']),
  volume: z.coerce.number().min(0).max(100),
});

interface PomodoroSettingsProps {
  settings: Settings;
  onSave: (newSettings: Settings) => void;
  onCancel: () => void;
}

export function PomodoroSettings({ settings, onSave, onCancel }: PomodoroSettingsProps) {
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
  });

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Pomodoro Settings</CardTitle>
        <CardDescription>Customize your focus and break sessions.</CardDescription>
      </CardHeader>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)}>
        <CardContent className="space-y-6">
          {/* Timer Durations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="focusDuration">Focus (mins)</Label>
              <Input id="focusDuration" type="number" {...form.register('focusDuration')} />
              {form.formState.errors.focusDuration && <p className="text-sm text-destructive">{form.formState.errors.focusDuration.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortBreakDuration">Short Break (mins)</Label>
              <Input id="shortBreakDuration" type="number" {...form.register('shortBreakDuration')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longBreakDuration">Long Break (mins)</Label>
              <Input id="longBreakDuration" type="number" {...form.register('longBreakDuration')} />
            </div>
          </div>
          <div className="space-y-2">
              <Label htmlFor="sessionsBeforeLongBreak">Sessions before long break</Label>
              <Input id="sessionsBeforeLongBreak" type="number" {...form.register('sessionsBeforeLongBreak')} />
          </div>

          {/* Automation */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="autoStartBreaks"
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoStartBreaks">Auto-start Breaks</Label>
                  <Switch id="autoStartBreaks" checked={field.value} onCheckedChange={field.onChange} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="autoStartPomodoros"
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoStartPomodoros">Auto-start Focus Sessions</Label>
                  <Switch id="autoStartPomodoros" checked={field.value} onCheckedChange={field.onChange} />
                </div>
              )}
            />
          </div>
          
          {/* Sound & Notifications */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="enableSounds"
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableSounds">Enable Timer Sounds</Label>
                  <Switch id="enableSounds" checked={field.value} onCheckedChange={field.onChange} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="endSoundType"
              render={({ field }) => (
                <div className='flex items-center justify-between'>
                  <Label>End Sound</Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bell">Bell</SelectItem>
                      <SelectItem value="chime">Chime</SelectItem>
                      <SelectItem value="alarm">Alarm</SelectItem>
                      <SelectItem value="gentle">Gentle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>

        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Save Settings</Button>
        </CardFooter>
      </form>
      </Form>
    </Card>
  );
}
