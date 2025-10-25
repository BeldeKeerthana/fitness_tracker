
'use client';

import { useSearchParams } from 'next/navigation';
import { handleOnboarding } from '@/app/actions';
import { Button } from '@/components/ui/button';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import Logo from '@/components/logo';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect_to');
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Reading cookie on client
    const emailCookie = document.cookie.split('; ').find(row => row.startsWith('user-email='))?.split('=')[1];
    setEmail(emailCookie || null);
  }, []);


  return (
    <div className="container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-1 lg:px-0 min-h-screen">
      <div className="py-12">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[600px]">
          <div className="flex flex-col space-y-2 text-center">
            <Logo />
            <h1 className="text-2xl font-semibold tracking-tight font-headline">
              Create your profile
            </h1>
            <p className="text-sm text-muted-foreground">
              Tell us a bit about yourself to get personalized recommendations.
            </p>
          </div>
          <form action={handleOnboarding} className="space-y-8">
            {email && <input type="hidden" name="email" value={email} />}
            {redirectTo && <input type="hidden" name="redirect_to" value={redirectTo} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your Name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" name="age" type="number" defaultValue="25" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" name="weight" type="number" defaultValue="70" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" name="height" type="number" defaultValue="175" required />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Gender</Label>
              <RadioGroup name="gender" defaultValue="male" className="flex flex-col space-y-1">
                <div className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="font-normal">Male</Label>
                </div>
                <div className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="font-normal">Female</Label>
                </div>
                <div className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="font-normal">Other</Label>
                </div>
              </RadioGroup>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <Label htmlFor="fitnessGoals">Fitness Goals</Label>
                    <Textarea
                        id="fitnessGoals"
                        name="fitnessGoals"
                        placeholder="e.g., lose weight, build muscle"
                        defaultValue="I want to lose weight and build lean muscle."
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="workoutPreferences">Workout Preferences</Label>
                    <Textarea
                        id="workoutPreferences"
                        name="workoutPreferences"
                        placeholder="e.g., cardio, strength training, yoga"
                        defaultValue="A mix of cardio and strength training."
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="availableTime">Daily time available for exercise (minutes)</Label>
                <Input
                    id="availableTime"
                    name="availableTime"
                    type="number"
                    defaultValue="60"
                    required
                />
            </div>

            <Button type="submit" className="w-full">
              Complete Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
