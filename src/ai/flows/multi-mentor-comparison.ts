'use server';

/**
 * @fileOverview Allows users to compare insights from multiple mentors on a given topic.
 *
 * - compareMentors - A function that compares the perspectives of multiple mentors.
 * - CompareMentorsInput - The input type for the compareMentors function.
 * - CompareMentorsOutput - The return type for the compareMentors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CompareMentorsInputSchema = z.object({
  mentors: z.array(z.string()).describe('The names of the mentors to compare.'),
  topic: z.string().describe('The topic or question to get advice on.'),
});
export type CompareMentorsInput = z.infer<typeof CompareMentorsInputSchema>;

const CompareMentorsOutputSchema = z.object({
  comparison: z.array(
    z.object({
      mentor: z.string().describe('The name of the mentor.'),
      advice: z.string().describe('The advice from the mentor on the topic.'),
      sources: z.array(
        z.object({
          type: z.string().describe('The type of source (e.g., book, podcast, interview).'),
          name: z.string().describe('The name of the source.'),
          detail: z.string().describe('The specific detail (e.g., chapter, episode, timestamp).'),
        })
      ).describe('The sources used to generate the advice.'),
      confidence: z.string().describe('The confidence level in the accuracy of the advice.'),
    })
  ).describe('The comparison of advice from multiple mentors.'),
});
export type CompareMentorsOutput = z.infer<typeof CompareMentorsOutputSchema>;

export async function compareMentors(input: CompareMentorsInput): Promise<CompareMentorsOutput> {
  return compareMentorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'compareMentorsPrompt',
  input: {schema: CompareMentorsInputSchema},
  output: {schema: CompareMentorsOutputSchema},
  prompt: `You are an AI assistant designed to compare advice from multiple mentors on a given topic.  For each mentor, provide their advice, sources, and a confidence level.

Mentors: {{mentors}}
Topic: {{topic}}

Instructions: Analyze the provided mentors and topic.  For each mentor, generate advice in their style, citing relevant sources.  Include a confidence level for each mentor's advice.

Output Format: The output should be a JSON array of mentor comparisons, including advice, sources, and confidence levels.

Example Output:
[
  {
    "mentor": "Naval Ravikant",
    "advice": "Ask yourself three questions: Can you be the best in the world at this? If not, keep searching. Are customers desperate for this, or just mildly interested? Does this leverage your specific knowledge?",
    "sources": [
      { "type": "book", "name": "The Almanack of Naval Ravikant", "detail": "Building Wealth chapter" },
      { "type": "podcast", "name": "Naval Podcast", "detail": "How to Get Rich, 18:45" }
    ],
    "confidence": "High"
  },
  {
    "mentor": "Marcus Aurelius",
    "advice": "You have power over your mind - not outside events. Realize this, and you will find strength.",
    "sources": [
      { "type": "book", "name": "Meditations", "detail": "Section 4.3" }
    ],
    "confidence": "High"
  }
]

Follow the output format exactly. Do not include any other text.  Ensure the response is valid JSON.
`,
});

const compareMentorsFlow = ai.defineFlow(
  {
    name: 'compareMentorsFlow',
    inputSchema: CompareMentorsInputSchema,
    outputSchema: CompareMentorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
