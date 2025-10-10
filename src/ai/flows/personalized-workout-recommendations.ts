'use server';
/**
 * @fileOverview Recommends personalized workouts based on user data and preferences.
 *
 * - recommendWorkouts - A function that generates workout recommendations.
 * - WorkoutRecommendationInput - The input type for the recommendWorkouts function.
 * - WorkoutRecommendationOutput - The return type for the recommendWorkouts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WorkoutRecommendationInputSchema = z.object({
  name: z.string().describe('The user\'s name.'),
  age: z.number().describe('The user\'s age.'),
  weight: z.number().describe('The user\'s weight in kilograms.'),
  height: z.number().describe('The user\'s height in centimeters.'),
  gender: z.enum(['male', 'female', 'other']).describe('The user\'s gender.'),
  fitnessGoals: z
    .string()
    .describe('The user\'s fitness goals (e.g., lose weight, build muscle).'),
  workoutPreferences: z
    .string()
    .describe('The user\'s preferred workout types (e.g., cardio, strength training).'),
  availableTime: z
    .string()
    .describe('The time user has available in minutes (e.g., 30 minutes).'),
});
export type WorkoutRecommendationInput = z.infer<
  typeof WorkoutRecommendationInputSchema
>;

const WorkoutRecommendationOutputSchema = z.object({
  workoutRecommendations: z
    .string()
    .describe('A list of workout recommendations tailored to the user.'),
});
export type WorkoutRecommendationOutput = z.infer<
  typeof WorkoutRecommendationOutputSchema
>;

export async function recommendWorkouts(
  input: WorkoutRecommendationInput
): Promise<WorkoutRecommendationOutput> {
  return recommendWorkoutsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'workoutRecommendationPrompt',
  input: {schema: WorkoutRecommendationInputSchema},
  output: {schema: WorkoutRecommendationOutputSchema},
  prompt: `You are a personal fitness trainer. Based on the user's personal information, fitness goals, workout preferences and time availability, recommend workouts tailored to the user.

User Name: {{{name}}}
User Age: {{{age}}}
User Weight: {{{weight}}} kg
User Height: {{{height}}} cm
User Gender: {{{gender}}}
Fitness Goals: {{{fitnessGoals}}}
Workout Preferences: {{{workoutPreferences}}}
Available Time: {{{availableTime}}} minutes

Workout Recommendations:`,
});

const recommendWorkoutsFlow = ai.defineFlow(
  {
    name: 'recommendWorkoutsFlow',
    inputSchema: WorkoutRecommendationInputSchema,
    outputSchema: WorkoutRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
