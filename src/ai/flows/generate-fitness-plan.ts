
'use server';
/**
 * @fileOverview Generates a fitness plan to reach a target weight.
 *
 * - generateFitnessPlan - A function that generates the plan.
 * - FitnessPlanInput - The input type for the generateFitnessPlan function.
 * - FitnessPlanOutput - The return type for the generateFitnessPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FitnessPlanInputSchema = z.object({
  currentWeight: z.number().describe('The user\'s current weight in kg.'),
  targetWeight: z.number().describe('The user\'s target weight in kg.'),
  timeframe: z.string().describe('The timeframe to reach the goal (e.g., "3 months").'),
  gender: z.enum(['male', 'female', 'other']).describe('The user\'s gender.'),
  age: z.number().describe("The user's age."),
  height: z.number().describe("The user's height in cm."),
  workoutPreferences: z
    .string()
    .describe('The user\'s preferred workout types (e.g., cardio, strength training).'),
});
export type FitnessPlanInput = z.infer<typeof FitnessPlanInputSchema>;

const FitnessPlanOutputSchema = z.object({
  plan: z
    .string()
    .describe('A detailed fitness and diet plan formatted in Markdown.'),
});
export type FitnessPlanOutput = z.infer<typeof FitnessPlanOutputSchema>;

export async function generateFitnessPlan(
  input: FitnessPlanInput
): Promise<FitnessPlanOutput> {
  return generateFitnessPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFitnessPlanPrompt',
  input: {schema: FitnessPlanInputSchema},
  output: {schema: FitnessPlanOutputSchema},
  prompt: `You are an expert personal trainer and nutritionist. Create a comprehensive, realistic, and safe fitness and diet plan for a user based on the following details.

The plan should be structured, easy to follow, and include:
1.  **Overview:** A brief motivational summary of the goal.
2.  **Weekly Workout Schedule:** A sample weekly schedule with a mix of activities based on their preferences.
3.  **Dietary Guidelines:** General advice on what to eat, what to avoid, and sample meal ideas.
4.  **Key Milestones:** Break down the goal into smaller, achievable milestones.
5.  **Disclaimer:** Include a sentence advising the user to consult a healthcare professional.

Format the entire output as a single Markdown string.

User Details:
- Current Weight: {{{currentWeight}}} kg
- Target Weight: {{{targetWeight}}} kg
- Timeframe: {{{timeframe}}}
- Age: {{{age}}}
- Height: {{{height}}} cm
- Gender: {{{gender}}}
- Workout Preferences: {{{workoutPreferences}}}
`,
});

const generateFitnessPlanFlow = ai.defineFlow(
  {
    name: 'generateFitnessPlanFlow',
    inputSchema: FitnessPlanInputSchema,
    outputSchema: FitnessPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
