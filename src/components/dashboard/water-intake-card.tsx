
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GlassWater, Minus, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function WaterIntakeCard() {
  const [glasses, setGlasses] = useState(0);

  const handleAddGlass = () => {
    setGlasses((prev) => prev + 1);
  };

  const handleRemoveGlass = () => {
    setGlasses((prev) => Math.max(0, prev - 1));
  };

  const handleLog = () => {
    toast({
        title: 'Water Intake Logged!',
        description: `You logged ${glasses} glasses of water.`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <GlassWater className="h-5 w-5 text-primary" />
            Water Intake
        </CardTitle>
        <CardDescription>Track how many glasses of water you drink today.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center justify-center rounded-lg bg-muted w-full p-4">
            <div className="flex items-center space-x-4 text-6xl font-bold font-mono text-primary">
                <span>{glasses}</span>
                <GlassWater className="h-12 w-12" />
            </div>
        </div>
        <div className="flex space-x-4">
            <Button onClick={handleRemoveGlass} variant="outline" size="icon" aria-label="Remove one glass">
                <Minus className="h-5 w-5" />
            </Button>
            <Button onClick={handleAddGlass} variant="outline" size="icon" aria-label="Add one glass">
                <Plus className="h-5 w-5" />
            </Button>
        </div>
         <Button onClick={handleLog} disabled={glasses === 0} variant="outline" className="w-full">
            Log Intake & Reset
        </Button>
      </CardContent>
    </Card>
  );
}
