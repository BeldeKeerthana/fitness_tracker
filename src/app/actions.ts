
// @/app/actions.ts
'use server';

import { redirect } from 'next/navigation';
import { recommendWorkouts, type WorkoutRecommendationInput } from '@/ai/flows/personalized-workout-recommendations';
import { summarizeDailyActivity, type DailyActivityInput } from '@/ai/flows/summarize-daily-activity';
import { generateFitnessPlan, type FitnessPlanInput } from '@/ai/flows/generate-fitness-plan';

export async function handleLogin(formData: FormData) {
  const email = formData.get('email');
  console.log('Logging in with email:', email);
  // In a real app, you'd handle authentication here.
  // We'll redirect to the onboarding page as if it's a new user.
  redirect('/dashboard');
}


export async function handleOnboarding(formData: FormData) {
  const name = formData.get('name');
  console.log('Onboarding user:', name);
  // In a real app, you'd save this data to your database.
  redirect('/dashboard');
}

export async function getWorkoutRecommendations(input: WorkoutRecommendationInput) {
    const recommendations = await recommendWorkouts(input);
    return recommendations;
}

export async function getDailySummary(input: DailyActivityInput) {
    const summary = await summarizeDailyActivity(input);
    return summary;
}

export async function getFitnessPlan(input: FitnessPlanInput) {
    const plan = await generateFitnessPlan(input);
    return plan;
}
