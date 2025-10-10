'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

const onboardingSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.coerce.number().int().positive({ message: 'Please enter a valid age.' }),
  weight: z.coerce.number().positive({ message: 'Please enter a valid weight.' }),
  height: z.coerce.number().positive({ message: 'Please enter a valid height.' }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a gender.',
  }),
  fitnessGoals: z.string().min(10, {
    message: 'Please describe your fitness goals (at least 10 characters).',
  }),
  workoutPreferences: z.string().min(5, {
    message: 'Please describe your workout preferences (at least 5 characters).',
  }),
  availableTime: z.coerce.number().int().positive({
    message: 'Please enter your available time in minutes.',
  }),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

export default function OnboardingPage() {
  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: '',
      age: 25,
      weight: 70,
      height: 175,
      gender: undefined,
      fitnessGoals: 'I want to lose weight and build lean muscle.',
      workoutPreferences: 'A mix of cardio and strength training.',
      availableTime: 60,
    },
  });

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
          <Form {...form}>
            <form action={handleOnboarding} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="25" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="70" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="175" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                        name={field.name}
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">Female</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal">Other</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="fitnessGoals"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Fitness Goals</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="e.g., lose weight, build muscle"
                            {...field}
                            />
                        </FormControl>
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
                            <Textarea
                            placeholder="e.g., cardio, strength training, yoga"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              </div>

              <FormField
                control={form.control}
                name="availableTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daily time available for exercise (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="60" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Complete Profile
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
