
'use server';

import { unstable_cache as cache } from 'next/cache';

import { recommendWorkouts, type WorkoutRecommendationInput } from '@/ai/flows/personalized-workout-recommendations';
import { summarizeDailyActivity, type DailyActivityInput } from '@/ai/flows/summarize-daily-activity';
import { generateFitnessPlan, type FitnessPlanInput } from '@/ai/flows/generate-fitness-plan';


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
