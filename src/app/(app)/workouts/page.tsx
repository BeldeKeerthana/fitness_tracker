import WorkoutCategoryList from '@/components/workouts/workout-category-list';
import WorkoutRecommender from '@/components/workouts/workout-recommender';
import { Separator } from '@/components/ui/separator';

export default function WorkoutsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Workouts</h1>
        <p className="text-muted-foreground">
          Discover new exercises or get a personalized plan from our AI trainer.
        </p>
      </div>

      <WorkoutRecommender />
      
      <Separator className="my-8" />
      
      <WorkoutCategoryList />
    </div>
  );
}
