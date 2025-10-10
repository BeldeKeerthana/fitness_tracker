import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { workoutCategories } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function WorkoutCategoryList() {
  return (
    <div>
      <h2 className="text-2xl font-bold font-headline mb-4">Workout Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workoutCategories.map((category) => (
          <Card key={category.id} className="flex flex-col">
            <CardHeader>
              <div className="aspect-[4/3] relative mb-4">
                <Image
                  src={category.image.url}
                  alt={category.title}
                  fill
                  data-ai-hint={category.image.hint}
                  className="rounded-lg object-cover"
                />
              </div>
              <CardTitle className='font-headline'>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/workouts/${category.id}`}>
                  View Exercises <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
