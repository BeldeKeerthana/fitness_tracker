import WorkoutLogger from '@/components/log-workout/workout-logger';

export default function LogWorkoutPage() {
  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Log a Workout</h1>
          <p className="text-muted-foreground">
            Use the timer below to track and log your workout session.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <WorkoutLogger />
          </div>
        </div>
      </div>
  );
}
