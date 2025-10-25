import { Suspense } from 'react';
import WelcomeHeader from '@/components/dashboard/welcome-header';
import StatCard from '@/components/dashboard/stat-card';
import WorkoutHistory from '@/components/dashboard/workout-history';
import { Bed, Flame, Footprints, Heart, Activity } from 'lucide-react';
import type { Stat } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { user } from '@/lib/data';
import WaterIntakeCard from '@/components/dashboard/water-intake-card';
import DailySummary from '@/app/(app)/dashboard/daily-summary';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cookies } from 'next/headers';

const stats: Stat[] = [
    {
      title: 'Sleep',
      value: '7h 30m',
      icon: Bed,
      description: 'Last night',
    },
    {
      title: 'Calories Burnt',
      value: '450 kcal',
      icon: Flame,
      description: 'Today',
    },
    {
      title: 'Heart Rate',
      value: '72 bpm',
      icon: Heart,
      description: 'Average resting',
    },
    {
      title: 'Steps',
      value: '8,452',
      icon: Footprints,
      description: 'Today',
    },
  ];

function WelcomeHeaderSkeleton() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold font-headline">Hello!</h1>
      <Skeleton className="h-6 w-3/4 mt-2" />
    </div>
  );
}

function DailySummarySkeleton() {
    return (
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Activity />
                    Daily Health Summary
                </CardTitle>
                <CardDescription>
                    Here is a summary of your activity and AI-powered suggestions.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </CardContent>
        </Card>
    )
}

export default function DashboardPage() {
  const userName = cookies().get('user-name')?.value || user.name;

  return (
      <div className="flex-1 space-y-4">
        <Suspense fallback={<WelcomeHeaderSkeleton />}>
          <WelcomeHeader name={userName} />
        </Suspense>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} stat={stat} />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-3">
            <Suspense fallback={<DailySummarySkeleton />}>
              <DailySummary />
            </Suspense>
          </div>
          <div className="col-span-2">
              <WaterIntakeCard />
          </div>
          <div className="col-span-5">
              <WorkoutHistory />
          </div>
        </div>
      </div>
  );
}
