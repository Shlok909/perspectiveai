'use server';

/**
 * @fileOverview This file defines a Genkit flow for dynamically creating a mentor profile.
 *
 * The flow identifies the person, builds a knowledge base from their works,
 * extracts key teachings, and identifies their communication style.
 *
 * - `createMentorProfile` -  The function that triggers the mentor profile creation flow.
 * - `CreateMentorProfileInput` - The input type for the `createMentorProfile` function.
 * - `CreateMentorProfileOutput` - The output type for the `createMentorProfile` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateMentorProfileInputSchema = z.object({
  mentorName: z.string().describe('The name of the mentor to create a profile for.'),
});
export type CreateMentorProfileInput = z.infer<typeof CreateMentorProfileInputSchema>;

const CreateMentorProfileOutputSchema = z.object({
  name: z.string().describe('The full name of the mentor.'),
  field: z.string().describe('The field of expertise of the mentor.'),
  era: z.string().describe('The era in which the mentor lived/lives.'),
  isFictional: z.boolean().describe('Whether the character is fictional or a real person.'),
  knowledgeSources: z.array(
    z.object({
      type: z.string().describe('The type of knowledge source (e.g., book, podcast, interview).'),
      title: z.string().describe('The title of the knowledge source.'),
      author: z.string().optional().describe('The author of the knowledge source, if applicable.'),
      episodes: z.string().optional().describe('The number of episodes, if applicable.'),
      notable: z.array(z.string()).optional().describe('Notable interviews, if applicable.'),
      year: z.number().optional().describe('The year the knowledge source was published, if applicable.'),
    })
  ).describe('A list of knowledge sources for the mentor.'),
  thinkingStyle: z.string().describe('The thinking style of the mentor.'),
  communicationStyle: z.string().describe('The communication style of the mentor.'),
  bio: z.string().describe('A brief biography of the mentor.'),
  photoUrl: z.string().describe('A URL of the mentor photo.'),
});
export type CreateMentorProfileOutput = z.infer<typeof CreateMentorProfileOutputSchema>;

export async function createMentorProfile(input: CreateMentorProfileInput): Promise<CreateMentorProfileOutput> {
  return createMentorProfileFlow(input);
}

const mentorProfilePrompt = ai.definePrompt({
  name: 'mentorProfilePrompt',
  input: {schema: CreateMentorProfileInputSchema},
  output: {schema: CreateMentorProfileOutputSchema},
  prompt: `Identify this person: "{{mentorName}}"\nDetermine if they are a fictional character.\nProvide:\nFull name and background\nField of expertise\nKey knowledge sources (books, podcasts, interviews)\nCore philosophy and thinking patterns\nCommunication style\nFamous quotes or teachings\nA brief biography\nA URL of the mentor photo.\nFormat as JSON.`,
});

const createMentorProfileFlow = ai.defineFlow(
  {
    name: 'createMentorProfileFlow',
    inputSchema: CreateMentorProfileInputSchema,
    outputSchema: CreateMentorProfileOutputSchema,
  },
  async input => {
    const {output} = await mentorProfilePrompt(input);
    return output!;
  }
);
