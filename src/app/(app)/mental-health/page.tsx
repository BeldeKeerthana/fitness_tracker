'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTimer } from '@/hooks/use-timer';
import { Play, Square, Timer } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const meditationSteps = [
    'Find a comfortable and quiet place to sit.',
    'Set a time limit for your meditation session.',
    'Close your eyes gently and take a few deep breaths.',
    'Focus on your breath, noticing the sensation of each inhale and exhale.',
    'When your mind wanders, gently guide your focus back to your breath.',
    'Continue for the duration of your timer.',
    'When the timer goes off, gently open your eyes and take a moment to notice your surroundings.'
];

export default function MentalHealthPage() {
    const { time, start, stop, isActive, formattedTime } = useTimer();
    const meditationImage = PlaceHolderImages.find((img) => img.id === 'meditation');

    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Find Your Inner Peace
                </h1>
                <p className="text-xl font-bold font-headline text-muted-foreground">
                    &ldquo;The mind is everything. What you think you become.&rdquo;
                </p>
            </div>

            <Card className="overflow-hidden">
                <div className="relative h-64 md:h-96">
                    {meditationImage && (
                        <Image
                            src={meditationImage.imageUrl}
                            alt={meditationImage.description}
                            fill
                            data-ai-hint={meditationImage.imageHint}
                            className="object-cover"
                        />
                    )}
                </div>
                <CardHeader>
                    <CardTitle className="font-headline">Meditation Guide</CardTitle>
                    <CardDescription>Follow these steps to start your meditation practice.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ol className="list-decimal list-inside space-y-2">
                        {meditationSteps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Meditation Timer</CardTitle>
                    <CardDescription>Use the timer to focus on your practice.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                    <div className="flex items-center justify-center rounded-lg bg-muted w-full p-4">
                        <div className="flex items-center space-x-2 text-6xl font-bold font-mono text-primary">
                            <Timer className="h-12 w-12" />
                            <span>{formattedTime}</span>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        {!isActive ? (
                            <Button onClick={start} size="lg" className="bg-green-600 hover:bg-green-700">
                                <Play className="mr-2 h-5 w-5" />
                                Start Meditation
                            </Button>
                        ) : (
                            <Button onClick={stop} size="lg" variant="destructive">
                                <Square className="mr-2 h-5 w-5" />
                                Stop Meditation
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
