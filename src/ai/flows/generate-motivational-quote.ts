
'use server';
/**
 * @fileOverview Generates a motivational quote related to fitness.
 *
 * - generateMotivationalQuote - A function that generates a motivational quote.
 * - MotivationalQuoteOutput - The return type for the generateMotivationalQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { unstable_cache as cache } from 'next/cache';

const MotivationalQuoteOutputSchema = z.object({
  quote: z.string().describe('A motivational quote related to fitness.'),
});
export type MotivationalQuoteOutput = z.infer<typeof MotivationalQuoteOutputSchema>;

export async function generateMotivationalQuote(): Promise<MotivationalQuoteOutput> {
  return cache(
    async () => {
      return generateMotivationalQuoteFlow({});
    },
    ['motivational-quote'],
    {
      revalidate: 60 * 60 * 24, // Revalidate once per day
    }
  )();
}

const prompt = ai.definePrompt({
  name: 'motivationalQuotePrompt',
  output: {schema: MotivationalQuoteOutputSchema},
  prompt: `You are a fitness motivation expert. Generate a short and inspiring motivational quote related to fitness. Focus on encouragement and positivity.`,
});

const generateMotivationalQuoteFlow = ai.defineFlow(
  {
    name: 'generateMotivationalQuoteFlow',
    outputSchema: MotivationalQuoteOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
