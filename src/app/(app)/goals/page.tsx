'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Target, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/components/AppLayout';

const goalSchema = z.object({
  currentWeight: z.coerce.number().positive('Must be a positive number.'),
  targetWeight: z.coerce.number().positive('Must be a positive number.'),
  timeframe: z.string().min(2, 'Please enter a timeframe.'),
  // Hard-coded user data for now
  gender: z.enum(['male', 'female', 'other']).default('male'),
  age: z.coerce.number().int().positive().default(30),
  height: z.coerce.number().positive().default(180),
  workoutPreferences: z.string().default('A mix of cardio and strength training.'),
});

type GoalFormValues = z.infer<typeof goalSchema>;

// NOTE: AI functionality has been temporarily removed to fix deployment issues.
const staticPlan = `
### Your Fitness Plan

**Overview:**
This plan is designed to help you reach your weight goal in a healthy and sustainable way.

**Weekly Workout Schedule:**
- **Monday:** 30-45 minutes of Cardio (running, cycling)
- **Tuesday:** 45 minutes of Strength Training (full body)
- **Wednesday:** Active Recovery (light walk, stretching)
- **Thursday:** 30 minutes of HIIT (High-Intensity Interval Training)
- **Friday:** 45 minutes of Strength Training (upper body focus)
- **Saturday:** 60 minutes of your favorite activity (hiking, swimming)
- **Sunday:** Rest

**Dietary Guidelines:**
- Focus on whole foods: lean proteins, fruits, vegetables, and whole grains.
- Drink at least 8 glasses of water per day.
- Limit processed foods, sugary drinks, and excessive saturated fats.

**Disclaimer:**
Please consult with a healthcare professional before starting any new fitness or diet plan.
`;


export default function GoalsPage() {
  const [plan, setPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      currentWeight: 75,
      targetWeight: 70,
      timeframe: '3 months',
      age: 30,
      height: 180,
      gender: 'male',
      workoutPreferences: 'A mix of cardio and strength training.',
    },
  });

  async function onSubmit(data: GoalFormValues) {
    setIsLoading(true);
    setPlan(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setPlan(staticPlan);
    setIsLoading(false);
    toast({
        title: "Plan Generated",
        description: "Your personalized fitness plan is ready.",
    });
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Set Your Goal</h1>
          <p className="text-muted-foreground">
            Define your target weight and get a plan to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Target className="text-primary" />
                Your Weight Goal
              </CardTitle>
              <CardDescription>
                Tell us your goal, and we'll generate a personalized plan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="currentWeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Weight (kg)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="75" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="targetWeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Weight (kg)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="70" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="timeframe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timeframe</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a timeframe" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1 month">1 Month</SelectItem>
                            <SelectItem value="3 months">3 Months</SelectItem>
                            <SelectItem value="6 months">6 Months</SelectItem>
                            <SelectItem value="1 year">1 Year</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="workoutPreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Workout Preferences</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., cardio, strength training..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isLoading ? 'Generating Plan...' : 'Generate My Plan'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Your Personalized Plan</CardTitle>
              <CardDescription>
                Follow this plan to reach your target weight.
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none prose-headings:font-headline prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2">
              {isLoading && (
                <div className="space-y-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-3/4 mt-4" />
                    <Skeleton className="h-4 w-full" />
                </div>
              )}
              {plan && (
                <div
                  dangerouslySetInnerHTML={{ __html: plan.replace(/\n/g, '<br />') }}
                />
              )}
              {!plan && !isLoading && (
                <p className="text-muted-foreground">
                  Your personalized fitness plan will appear here.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
