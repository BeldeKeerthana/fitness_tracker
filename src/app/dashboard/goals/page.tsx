'use client';

import { useState } from 'react';
import { Target, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


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
  const [plan, setPlan] = useState<string | null>(staticPlan);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();


  async function generatePlan() {
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Set Your Goal</h1>
          <p className="text-muted-foreground">
            Follow the generated plan to help you succeed.
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
                This is a sample plan. In a real application, you could fill out a form to generate a personalized one.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={generatePlan} disabled={isLoading} className="w-full">
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isLoading ? 'Generating Plan...' : 'Re-generate Plan'}
                </Button>
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
                  dangerouslySetInnerHTML={{ __html: plan.replace(/\\n/g, '<br />') }}
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
  );
}
