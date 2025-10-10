'use server';
/**
 * @fileOverview Generates a motivational quote related to fitness.
 *
 * - generateMotivationalQuote - A function that generates a motivational quote.
 * - MotivationalQuoteOutput - The return type for the generateMotivationalQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MotivationalQuoteOutputSchema = z.object({
  quote: z.string().describe('A motivational quote related to fitness.'),
});
export type MotivationalQuoteOutput = z.infer<typeof MotivationalQuoteOutputSchema>;

export async function generateMotivationalQuote(): Promise<MotivationalQuoteOutput> {
  return generateMotivationalQuoteFlow({});
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
