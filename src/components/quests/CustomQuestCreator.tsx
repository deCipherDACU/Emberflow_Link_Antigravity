'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LIFE_CATEGORIES } from '@/config/lifeBalanceCategories';
import { Plus, X, Sparkles, Save, Calendar, Clock } from 'lucide-react';
import { TimeBasedQuest, DayOfWeek, TimeOfDay } from '@/utils/timeBasedQuestGenerator';

interface CustomQuestCreatorProps {
  onSave: (quest: Partial<TimeBasedQuest>) => void;
  onCancel: () => void;
}

export function CustomQuestCreator({ onSave, onCancel }: CustomQuestCreatorProps) {
  const [questData, setQuestData] = useState<Partial<TimeBasedQuest>>({
    title: '',
    description: '',
    category: 'personal',
    subCategory: '',
    difficulty: 'medium',
    estimatedTime: 30,
    xpReward: 50,
    preferredDays: [],
    preferredTime: [],
    isWeekendQuest: false,
    isWeekdayQuest: false,
    recurring: 'daily',
    benefits: [],
  });

  const [benefitInput, setBenefitInput] = useState('');

  const categories = Object.values(LIFE_CATEGORIES);
  const selectedCategory = LIFE_CATEGORIES[questData.category || 'personal'];

  const dayOptions: { value: DayOfWeek; label: string }[] = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
  ];

  const timeOptions: { value: TimeOfDay; label: string }[] = [
    { value: 'morning', label: 'Morning (6 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 6 PM)' },
    { value: 'evening', label: 'Evening (6 PM - 10 PM)' },
    { value: 'night', label: 'Night (10 PM - 6 AM)' },
  ];

  const toggleDay = (day: DayOfWeek) => {
    const currentDays = questData.preferredDays || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    
    setQuestData({
      ...questData,
      preferredDays: newDays,
      isWeekendQuest: newDays.some(d => d === 'saturday' || d === 'sunday'),
      isWeekdayQuest: newDays.some(d => !['saturday', 'sunday'].includes(d)),
    });
  };

  const toggleTime = (time: TimeOfDay) => {
    const currentTimes = questData.preferredTime || [];
    const newTimes = currentTimes.includes(time)
      ? currentTimes.filter(t => t !== time)
      : [...currentTimes, time];
    
    setQuestData({ ...questData, preferredTime: newTimes });
  };

  const addBenefit = () => {
    if (benefitInput.trim()) {
      setQuestData({
        ...questData,
        benefits: [...(questData.benefits || []), benefitInput.trim()],
      });
      setBenefitInput('');
    }
  };

  const removeBenefit = (index: number) => {
    const newBenefits = [...(questData.benefits || [])];
    newBenefits.splice(index, 1);
    setQuestData({ ...questData, benefits: newBenefits });
  };

  const calculateXPReward = () => {
    const baseXP = {
      easy: 30,
      medium: 50,
      hard: 80,
    };
    
    const timeMultiplier = (questData.estimatedTime || 30) / 30;
    const xp = Math.floor(baseXP[questData.difficulty || 'medium'] * timeMultiplier);
    
    setQuestData({ ...questData, xpReward: xp });
  };

  const handleSave = () => {
    if (!questData.title || !questData.description) {
      alert('Please fill in title and description');
      return;
    }
    
    if (!questData.preferredDays?.length || !questData.preferredTime?.length) {
      alert('Please select at least one day and time');
      return;
    }

    onSave({
      ...questData,
      id: `custom_${Date.now()}`,
    });
  };

  const CategoryIcon = selectedCategory.icon;

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-purple-600" />
          Create Custom Quest
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Design your own personalized quest with custom rewards and scheduling
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Quest Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Complete Morning Workout"
              value={questData.title}
              onChange={(e) => setQuestData({ ...questData, title: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe what needs to be done..."
              value={questData.description}
              onChange={(e) => setQuestData({ ...questData, description: e.target.value })}
              className="mt-1"
              rows={3}
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Category *</Label>
            <Select
              value={questData.category}
              onValueChange={(value) => setQuestData({ ...questData, category: value, subCategory: '' })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" style={{ color: cat.color }} />
                        {cat.name}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Sub-Category</Label>
            <Select
              value={questData.subCategory}
              onValueChange={(value) => setQuestData({ ...questData, subCategory: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select sub-category" />
              </SelectTrigger>
              <SelectContent>
                {selectedCategory.subCategories.map((sub) => (
                  <SelectItem key={sub} value={sub}>
                    {sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quest Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Difficulty</Label>
            <Select
              value={questData.difficulty}
              onValueChange={(value: any) => {
                setQuestData({ ...questData, difficulty: value });
                calculateXPReward();
              }}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Estimated Time (minutes)</Label>
            <Input
              type="number"
              value={questData.estimatedTime}
              onChange={(e) => {
                const time = parseInt(e.target.value) || 30;
                setQuestData({ ...questData, estimatedTime: time });
                calculateXPReward();
              }}
              min={5}
              max={300}
              className="mt-1"
            />
          </div>
        </div>

        {/* XP Reward Display */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-purple-900">XP Reward</span>
            <span className="text-2xl font-bold text-purple-600">{questData.xpReward} XP</span>
          </div>
          <p className="text-xs text-purple-700 mt-1">
            Based on difficulty and estimated time
          </p>
        </div>

        {/* Schedule Selection */}
        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4" />
            Preferred Days *
          </Label>
          <div className="grid grid-cols-4 gap-2">
            {dayOptions.map((day) => (
              <Button
                key={day.value}
                type="button"
                variant={questData.preferredDays?.includes(day.value) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleDay(day.value)}
              >
                {day.label.slice(0, 3)}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4" />
            Preferred Time *
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {timeOptions.map((time) => (
              <Button
                key={time.value}
                type="button"
                variant={questData.preferredTime?.includes(time.value) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleTime(time.value)}
                className="justify-start"
              >
                {time.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Recurring Type */}
        <div>
          <Label>Recurring Pattern</Label>
          <Select
            value={questData.recurring}
            onValueChange={(value: any) => setQuestData({ ...questData, recurring: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekdays">Weekdays Only</SelectItem>
              <SelectItem value="weekends">Weekends Only</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="specific">Specific Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Benefits */}
        <div>
          <Label>Benefits</Label>
          <div className="flex gap-2 mt-1">
            <Input
              placeholder="Add a benefit (e.g., Energy boost)"
              value={benefitInput}
              onChange={(e) => setBenefitInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addBenefit()}
            />
            <Button type="button" onClick={addBenefit} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {questData.benefits?.map((benefit, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {benefit}
                <button onClick={() => removeBenefit(index)} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={handleSave} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save Custom Quest
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
