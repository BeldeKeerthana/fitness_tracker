import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { workoutCategories, exercises } from '@/lib/data';
import ExerciseCard from '@/components/workouts/exercise-card';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  return workoutCategories.map((category) => ({
    slug: category.id,
  }));
}

export default function WorkoutCategoryPage({ params }: { params: { slug: string } }) {
  const category = workoutCategories.find((c) => c.id === params.slug);
  const categoryExercises = exercises[params.slug] || [];

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <Button asChild variant="ghost" className="mb-4">
            <Link href="/workouts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workouts
            </Link>
        </Button>
        <h1 className="text-4xl font-bold font-headline">{category.title}</h1>
        <p className="text-lg text-muted-foreground mt-2">{category.description}</p>
      </div>

      <div className="space-y-6">
        {categoryExercises.length > 0 ? (
          categoryExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))
        ) : (
          <p>No exercises found for this category yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
}
