
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GlassWater, Minus, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const WATER_GOAL = 8;

export default function WaterIntakeCard() {
  const [glasses, setGlasses] = useState(5);

  const handleAddGlass = () => {
    setGlasses((prev) => prev + 1);
  };

  const handleRemoveGlass = () => {
    setGlasses((prev) => Math.max(0, prev - 1));
  };

  const handleLog = () => {
    toast({
        title: 'Water Intake Logged!',
        description: `You logged ${glasses} glasses of water. Keep it up!`,
    });
    setGlasses(0);
  }

  const progress = (glasses / WATER_GOAL) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <GlassWater className="h-5 w-5 text-primary" />
            Water Intake
        </CardTitle>
        <CardDescription>Your goal is to drink {WATER_GOAL} glasses of water today.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div className="w-full space-y-2">
            <div className="flex items-center justify-center space-x-4 text-6xl font-bold font-mono text-primary">
                <span>{glasses}</span>
                <GlassWater className="h-12 w-12" />
            </div>
            <Progress value={progress} />
            <p className="text-center text-sm text-muted-foreground">{glasses} / {WATER_GOAL} glasses</p>
        </div>
        <div className="flex space-x-4 pt-4">
            <Button onClick={handleRemoveGlass} variant="outline" size="icon" aria-label="Remove one glass">
                <Minus className="h-5 w-5" />
            </Button>
            <Button onClick={handleAddGlass} variant="outline" size="icon" aria-label="Add one glass">
                <Plus className="h-5 w-5" />
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
