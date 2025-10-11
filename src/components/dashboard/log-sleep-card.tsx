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
import { Bed, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LogSleepCard() {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const { toast } = useToast();

  const handleLogSleep = () => {
    if (!hours && !minutes) {
      toast({
        variant: 'destructive',
        title: 'Invalid Input',
        description: 'Please enter your sleep duration.',
      });
      return;
    }

    const totalHours = parseInt(hours, 10) || 0;
    const totalMinutes = parseInt(minutes, 10) || 0;
    
    if (totalHours < 0 || totalMinutes < 0 || totalMinutes >= 60) {
        toast({
            variant: 'destructive',
            title: 'Invalid Time',
            description: 'Please enter a valid time. Minutes should be less than 60.',
        });
        return;
    }

    toast({
      title: 'Sleep Logged!',
      description: `You logged ${totalHours} hours and ${totalMinutes} minutes of sleep. Sweet dreams!`,
    });
    setHours('');
    setMinutes('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Bed className="text-primary" />
          Log Your Sleep
        </CardTitle>
        <CardDescription>Enter how long you slept last night.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="sleep-hours">Hours</Label>
                <Input 
                    id="sleep-hours" 
                    type="number" 
                    placeholder="e.g., 7" 
                    value={hours} 
                    onChange={(e) => setHours(e.target.value)}
                    min="0"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="sleep-minutes">Minutes</Label>
                <Input 
                    id="sleep-minutes" 
                    type="number" 
                    placeholder="e.g., 30" 
                    value={minutes} 
                    onChange={(e) => setMinutes(e.target.value)}
                    min="0"
                    max="59"
                />
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogSleep} className="w-full">
          <LogIn className="mr-2" />
          Log Sleep
        </Button>
      </CardFooter>
    </Card>
  );
}
