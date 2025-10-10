import Image from 'next/image';
import type { Challenge } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

function formatMetric(metric: string, value: number) {
  if (metric === 'Workout Time') {
    return `${value} min`;
  }
  return value.toLocaleString();
}

export default function ChallengeCard({ challenge }: { challenge: Challenge }) {
  // Mocking progress for demonstration purposes.
  const progressValue = Math.floor(Math.random() * 80) + 10;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="aspect-[4/3] relative mb-4">
          <Image
            src={challenge.image.url}
            alt={challenge.title}
            fill
            data-ai-hint={challenge.image.hint}
            className="rounded-lg object-cover"
          />
        </div>
        <CardTitle className="font-headline">{challenge.title}</CardTitle>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Target className="h-4 w-4" />
            <span>Goal: {formatMetric(challenge.metric, challenge.goal)} {challenge.metric}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{challenge.participants.toLocaleString()} participants</span>
          </div>
        </div>
        <div>
            <Progress value={progressValue} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{progressValue}% of goal completed by leaders.</p>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full">Join Challenge</Button>
      </CardFooter>
    </Card>
  );
}
