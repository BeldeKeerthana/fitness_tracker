'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2 } from 'lucide-react';

import { getWorkoutRecommendations } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Skeleton } from '../ui/skeleton';

const recommendationSchema = z.object({
  name: z.string().default('Alex'),
  age: z.coerce.number().int().positive().default(30),
  weight: z.coerce.number().positive().default(75),
  height: z.coerce.number().positive().default(180),
  gender: z.enum(['male', 'female', 'other']).default('male'),
  fitnessGoals: z.string().default('Build muscle and improve cardio'),
  workoutPreferences: z.string().default('HIIT and weightlifting'),
  availableTime: z.string().default('45'),
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

export default function WorkoutRecommender() {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      name: 'Alex',
      age: 30,
      weight: 75,
      height: 180,
      gender: 'male',
      fitnessGoals: 'Build muscle and improve cardio',
      workoutPreferences: 'HIIT and weightlifting',
      availableTime: '45',
    },
  });

  async function onSubmit(data: RecommendationFormValues) {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await getWorkoutRecommendations({
        ...data,
        availableTime: data.availableTime.toString(),
      });
      setRecommendation(result.workoutRecommendations);
    } catch (error) {
      console.error(error);
      setRecommendation('Sorry, we couldn\'t generate recommendations at this time.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Wand2 className="text-primary" />
            AI Workout Recommender
          </CardTitle>
          <CardDescription>
            Fill in your details to get a personalized workout plan from our AI trainer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Form fields can be added here if we want them to be editable */}
              <FormField
                control={form.control}
                name="fitnessGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Fitness Goal</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What's your main goal?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availableTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time available (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="45" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate My Workout'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Personalized Plan</CardTitle>
          <CardDescription>
            Here is a workout plan tailored just for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          {isLoading && (
            <div className="space-y-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
          )}
          {recommendation && (
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: recommendation }}
            />
          )}
          {!recommendation && !isLoading && (
            <p className="text-muted-foreground">
              Your workout plan will appear here once generated.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
