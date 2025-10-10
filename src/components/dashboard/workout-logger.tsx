'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTimer } from '@/hooks/use-timer';
import { Play, Square, Timer } from 'lucide-react';
import { toast } from '@/hooks/use-toast';


export default function WorkoutLogger() {
    const { time, start, stop, reset, isActive, formattedTime } = useTimer();

    const handleLogWorkout = () => {
        if (time === 0) {
            toast({
                variant: 'destructive',
                title: 'Cannot log workout',
                description: 'Timer was not started.',
            });
            return;
        }

        toast({
            title: 'Workout Logged!',
            description: `You logged a workout of ${formattedTime}.`,
        });
        reset();
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Log Workout</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4">
                <div className="flex items-center space-x-2 text-6xl font-bold font-mono text-primary">
                    <Timer className="h-12 w-12" />
                    <span>{formattedTime}</span>
                </div>
                <div className="flex space-x-4">
                    {!isActive ? (
                        <Button onClick={start} size="lg" className="bg-green-600 hover:bg-green-700">
                            <Play className="mr-2 h-5 w-5" />
                            Start Workout
                        </Button>
                    ) : (
                        <Button onClick={stop} size="lg" variant="destructive">
                            <Square className="mr-2 h-5 w-5" />
                            Stop Workout
                        </Button>
                    )}
                </div>
                 <Button onClick={handleLogWorkout} disabled={isActive} variant="outline" className="w-full">
                    Log Workout & Reset
                </Button>
            </CardContent>
        </Card>
    );
}
