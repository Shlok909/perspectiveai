'use server';

/**
 * @fileOverview A chat system that provides advice in the style of a chosen mentor, with source citations and confidence levels.
 *
 * - intelligentChat - A function that handles the chat process.
 * - IntelligentChatInput - The input type for the intelligentChat function.
 * - IntelligentChatOutput - The return type for the intelligentChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CitationSchema = z.object({
  source_type: z.string().describe('The type of the source (e.g., book, podcast, interview).'),
  source_name: z.string().describe('The name of the source.'),
  source_detail: z.string().describe('Details about the source (e.g., chapter, episode, timestamp).'),
  original_quote: z.string().describe('The original quote from the source.'),
  context: z.string().describe('The context of the quote.'),
});

const IntelligentChatInputSchema = z.object({
  mentorProfile: z.object({
    name: z.string().describe('The name of the mentor.'),
    field: z.string().describe('The field of expertise of the mentor.'),
    era: z.string().describe('The era of the mentor.'),
    knowledge_sources: z.array(
      z.object({
        type: z.string(),
        title: z.string(),
      })
    ),
    thinking_style: z.string().describe('The mentor thinking style'),
    communication_style: z.string().describe('The mentor communication style'),
  }).describe('The profile of the mentor.'),
  customInstructions: z.string().describe('The user custom instructions on how the mentor should help.'),
  userQuestion: z.string().describe('The user question.'),
  knowledgeChunks: z.array(z.object({
    content: z.string(),
    source_type: z.string(),
    source_name: z.string(),
    source_detail: z.string(),
  })).describe('Relevant knowledge chunks from the knowledge base.'),
});

export type IntelligentChatInput = z.infer<typeof IntelligentChatInputSchema>;

const IntelligentChatOutputSchema = z.object({
  advice: z.string().describe('The mentor advice in their style.'),
  sources: z.array(CitationSchema).describe('The sources cited in the advice.'),
  confidence: z.string().describe('The confidence level of the advice (High/Medium/Low).'),
});

export type IntelligentChatOutput = z.infer<typeof IntelligentChatOutputSchema>;

export async function intelligentChat(input: IntelligentChatInput): Promise<IntelligentChatOutput> {
  return intelligentChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentChatPrompt',
  input: {schema: IntelligentChatInputSchema},
  output: {schema: IntelligentChatOutputSchema},
  prompt: `You are {{mentorProfile.name}} - a {{mentorProfile.field}} known for insights on various topics.\n\nKNOWLEDGE SOURCES (cite these):\n{{#each knowledgeChunks}}\n  * {{{this.source_name}}}, {{{this.source_detail}}}\n{{/each}}\n\nUSER'S CUSTOM INSTRUCTIONS:\n{{customInstructions}}\n\nTHINKING STYLE:\n{{mentorProfile.thinking_style}}\n\nCOMMUNICATION STYLE:\n{{mentorProfile.communication_style}}\n\nUSER QUESTION:\n{{userQuestion}}\n\nINSTRUCTIONS:\nThink as {{mentorProfile.name}} would, using the knowledge sources provided above.\nCite each source with the source name after statements.\nFollow user's instruction: {{customInstructions}}\nMatch {{mentorProfile.name}}'s communication style.\n\nRESPONSE:
`,
});

const intelligentChatFlow = ai.defineFlow(
  {
    name: 'intelligentChatFlow',
    inputSchema: IntelligentChatInputSchema,
    outputSchema: IntelligentChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
