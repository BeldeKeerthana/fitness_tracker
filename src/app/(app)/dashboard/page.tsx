import WelcomeHeader from '@/components/dashboard/welcome-header';
import StatCard from '@/components/dashboard/stat-card';
import WorkoutLogger from '@/components/dashboard/workout-logger';
import WorkoutHistory from '@/components/dashboard/workout-history';
import { Bed, Flame, Footprints, Heart } from 'lucide-react';
import type { Stat } from '@/lib/types';

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

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4">
      <WelcomeHeader />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <WorkoutLogger />
        <WorkoutHistory />
      </div>
    </div>
  );
}
