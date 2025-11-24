'use server';

/**
 * @fileOverview Knowledge base flow for storing and retrieving mentor information.
 *
 * - storeMentorKnowledge - Stores mentor knowledge in a structured format.
 * - retrieveMentorKnowledge - Retrieves mentor knowledge based on a query.
 * - StoreMentorKnowledgeInput - The input type for the storeMentorKnowledge function.
 * - StoreMentorKnowledgeOutput - The return type for the storeMentorKnowledge function.
 * - RetrieveMentorKnowledgeInput - The input type for the retrieveMentorKnowledge function.
 * - RetrieveMentorKnowledgeOutput - The return type for the retrieveMentorKnowledge function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define schemas for storing mentor knowledge
const KnowledgeSourceSchema = z.object({
  type: z.enum(['book', 'podcast', 'interview', 'tweet', 'speech']),
  title: z.string().describe('Title of the source'),
  detail: z.string().optional().describe('Chapter/episode/timestamp details'),
  url: z.string().optional().describe('Link to the original source'),
});

const KnowledgeChunkSchema = z.object({
  mentorId: z.string().describe('ID of the mentor'),
  content: z.string().describe('Actual quote/teaching'),
  source: KnowledgeSourceSchema.describe('Source of the knowledge chunk'),
  category: z.string().optional().describe('Theme of the content'),
  embedding: z.array(z.number()).optional().describe('Vector embedding for similarity search'),
});

export type KnowledgeChunk = z.infer<typeof KnowledgeChunkSchema>;

const StoreMentorKnowledgeInputSchema = z.object({
  mentorId: z.string().describe('ID of the mentor'),
  knowledgeChunks: z.array(KnowledgeChunkSchema).describe('Array of knowledge chunks to store'),
});

export type StoreMentorKnowledgeInput = z.infer<typeof StoreMentorKnowledgeInputSchema>;

const StoreMentorKnowledgeOutputSchema = z.object({
  success: z.boolean().describe('Indicates if the storage was successful'),
  message: z.string().describe('Storage confirmation message'),
});

export type StoreMentorKnowledgeOutput = z.infer<typeof StoreMentorKnowledgeOutputSchema>;

// Define schemas for retrieving mentor knowledge
const RetrieveMentorKnowledgeInputSchema = z.object({
  mentorId: z.string().describe('ID of the mentor'),
  query: z.string().describe('Query to search for in the knowledge base'),
  limit: z.number().default(5).describe('Maximum number of knowledge chunks to retrieve'),
});

export type RetrieveMentorKnowledgeInput = z.infer<typeof RetrieveMentorKnowledgeInputSchema>;

const RetrievedKnowledgeChunkSchema = KnowledgeChunkSchema.extend({
  similarityScore: z.number().optional().describe('Similarity score for the retrieved chunk'),
});

const RetrieveMentorKnowledgeOutputSchema = z.object({
  results: z.array(RetrievedKnowledgeChunkSchema).describe('Retrieved knowledge chunks'),
});

export type RetrieveMentorKnowledgeOutput = z.infer<typeof RetrieveMentorKnowledgeOutputSchema>;

// Flow for storing mentor knowledge
const storeMentorKnowledgeFlow = ai.defineFlow(
  {
    name: 'storeMentorKnowledgeFlow',
    inputSchema: StoreMentorKnowledgeInputSchema,
    outputSchema: StoreMentorKnowledgeOutputSchema,
  },
  async input => {
    // In a real implementation, this would store the knowledge chunks in Firestore
    // and potentially index them for vector search.

    console.log(`Storing ${input.knowledgeChunks.length} knowledge chunks for mentor ${input.mentorId}`);

    return {
      success: true,
      message: `Successfully stored ${input.knowledgeChunks.length} knowledge chunks for mentor ${input.mentorId}`, // Changed this line to match the successful store message
    };
  }
);

// Flow for retrieving mentor knowledge
const retrieveMentorKnowledgeFlow = ai.defineFlow(
  {
    name: 'retrieveMentorKnowledgeFlow',
    inputSchema: RetrieveMentorKnowledgeInputSchema,
    outputSchema: RetrieveMentorKnowledgeOutputSchema,
  },
  async input => {
    // In a real implementation, this would query Firestore for knowledge chunks
    // matching the query, using vector search if embeddings are available.

    console.log(`Retrieving knowledge for mentor ${input.mentorId} with query: ${input.query}`);

    // Mocked results for now
    const mockedResults: RetrievedKnowledgeChunkSchema[] = [];

    return {
      results: mockedResults,
    };
  }
);

/**
 * Stores mentor knowledge in Firestore.
 * @param input - The input containing the mentor ID and knowledge chunks.
 * @returns The output indicating success or failure.
 */
export async function storeMentorKnowledge(input: StoreMentorKnowledgeInput): Promise<StoreMentorKnowledgeOutput> {
  return storeMentorKnowledgeFlow(input);
}

/**
 * Retrieves mentor knowledge from Firestore based on a query.
 * @param input - The input containing the mentor ID, query, and limit.
 * @returns The output containing the retrieved knowledge chunks.
 */
export async function retrieveMentorKnowledge(input: RetrieveMentorKnowledgeInput): Promise<RetrieveMentorKnowledgeOutput> {
  return retrieveMentorKnowledgeFlow(input);
}

export type {
  KnowledgeSourceSchema as KnowledgeSourceSchema,
  KnowledgeChunkSchema as KnowledgeChunkSchema,
  RetrievedKnowledgeChunkSchema as RetrievedKnowledgeChunkSchema,
};
