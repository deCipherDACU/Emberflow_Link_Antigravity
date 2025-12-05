'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { LIFE_CATEGORIES, calculateLifeBalance } from '@/config/lifeBalanceCategories';
import { TrendingUp, CheckCircle2 } from 'lucide-react';

interface LifeBalanceWheelProps {
  userId: string;
  onComplete: (scores: Record<string, number>) => void;
}

export function LifeBalanceWheel({ userId, onComplete }: LifeBalanceWheelProps) {
  const [scores, setScores] = useState<Record<string, number>>({
    personal: 5,
    intellectual: 5,
    social: 5,
    financial: 5,
    spiritual: 5,
    physical: 5,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const categories = Object.values(LIFE_CATEGORIES);

  const handleScoreChange = (categoryId: string, value: number[]) => {
    setScores(prev => ({ ...prev, [categoryId]: value[0] }));
  };

  const handleNext = () => {
    if (currentStep < categories.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(scores);
    }
  };

  const currentCategory = categories[currentStep];
  const CategoryIcon = currentCategory.icon;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-purple-600" />
          Life Balance Assessment
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Rate your satisfaction in each life area (1 = Need improvement, 10 = Excellent)
        </p>
      </CardHeader>
      <CardContent>
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{currentStep + 1} / {categories.length}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
              style={{ width: `${((currentStep + 1) / categories.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Category */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${currentCategory.gradient} flex items-center justify-center shadow-lg`}>
              <CategoryIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{currentCategory.name}</h3>
              <p className="text-sm text-muted-foreground">{currentCategory.description}</p>
            </div>
          </div>

          {/* Slider */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Current Rating</span>
              <span className="text-2xl font-bold text-purple-600">{scores[currentCategory.id]}/10</span>
            </div>
            <Slider
              value={[scores[currentCategory.id]]}
              onValueChange={(value) => handleScoreChange(currentCategory.id, value)}
              min={1}
              max={10}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Need Improvement</span>
              <span>Excellent</span>
            </div>
          </div>

          {/* Sub-categories */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium mb-2">Consider these aspects:</p>
            <div className="grid grid-cols-2 gap-2">
              {currentCategory.subCategories.map(sub => (
                <div key={sub} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-purple-500" />
                  {sub}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentStep < categories.length - 1 ? 'Next' : 'Complete Assessment'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
