
'use server';

import { redirect } from 'next/navigation';
import { unstable_cache as cache } from 'next/cache';
import { cookies } from 'next/headers';
import { recommendWorkouts, type WorkoutRecommendationInput } from '@/ai/flows/personalized-workout-recommendations';
import { summarizeDailyActivity, type DailyActivityInput } from '@/ai/flows/summarize-daily-activity';
import { generateFitnessPlan, type FitnessPlanInput } from '@/ai/flows/generate-fitness-plan';

export async function handleLogin(formData: FormData) {
  const email = formData.get('email') as string;
  console.log('Logging in with email:', email);
  
  // Set email cookie
  cookies().set('user-email', email, { path: '/', maxAge: 3600 });
  
  // In a real app, you'd handle authentication here.
  // We'll redirect to the onboarding page as if it's a new user.
  redirect(`/onboarding`);
}


export async function handleOnboarding(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const redirectTo = formData.get('redirect_to') as string || '/dashboard';
  console.log('Onboarding user:', name, Object.fromEntries(formData));
  // In a real app, you'd save this data to your database.
  
  // Set cookies for name and email
  cookies().set('user-name', name, { path: '/', maxAge: 60 * 60 * 24 * 7 }); // 7 days
  cookies().set('user-email', email, { path: '/', maxAge: 60 * 60 * 24 * 7 }); // 7 days

  redirect(redirectTo);
}

export async function getWorkoutRecommendations(input: WorkoutRecommendationInput) {
    const recommendations = await recommendWorkouts(input);
    return recommendations;
}

export async function getDailySummary(input: DailyActivityInput) {
    const getCachedSummary = cache(
        async (data: DailyActivityInput) => summarizeDailyActivity(data),
        ['daily-summary', JSON.stringify(input)], // Unique key for the cache
        {
          revalidate: 3600, // Revalidate every hour
        }
      );
    return getCachedSummary(input);
}

export async function getFitnessPlan(input: FitnessPlanInput) {
    const plan = await generateFitnessPlan(input);
    return plan;
}
