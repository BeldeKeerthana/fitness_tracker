
'use server';
/**
 * @fileOverview Summarizes daily activity and provides suggestions.
 *
 * - summarizeDailyActivity - A function that generates a summary and suggestions.
 * - DailyActivityInput - The input type for the summarizeDailyActivity function.
 * - DailyActivityOutput - The return type for the summarizeDailyActivity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyActivityInputSchema = z.object({
  sleep: z.string().describe('Total sleep time for the last night (e.g., "7h 30m").'),
  steps: z.string().describe('Total steps taken today (e.g., "8,452").'),
  water: z.string().describe('Total water intake for today (e.g., "5 glasses").'),
});
export type DailyActivityInput = z.infer<typeof DailyActivityInputSchema>;

const DailyActivityOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise, encouraging summary of the day\'s activity formatted as a single paragraph.'
    ),
  suggestions: z
    .array(z.string())
    .describe('A list of 2-3 actionable suggestions for improvement.'),
});
export type DailyActivityOutput = z.infer<typeof DailyActivityOutputSchema>;

export async function summarizeDailyActivity(
  input: DailyActivityInput
): Promise<DailyActivityOutput> {
  return summarizeDailyActivityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyActivitySummaryPrompt',
  input: {schema: DailyActivityInputSchema},
  output: {schema: DailyActivityOutputSchema},
  prompt: `You are a friendly and encouraging fitness coach. Your user has provided their daily activity data.
Provide a concise, positive summary of their day and offer 2-3 simple, actionable suggestions for tomorrow.
Assume a daily goal of 8 hours of sleep, 10,000 steps, and 8 glasses of water.
Keep the tone light and motivational. Format the output as requested.

Today's Activity:
- Sleep: {{{sleep}}}
- Steps: {{{steps}}}
- Water Intake: {{{water}}}
`,
});

const summarizeDailyActivityFlow = ai.defineFlow(
  {
    name: 'summarizeDailyActivityFlow',
    inputSchema: DailyActivityInputSchema,
    outputSchema: DailyActivityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
