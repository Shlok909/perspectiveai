
'use server';

import { createMentorProfile } from '@/ai/flows/dynamic-mentor-profile-creation';
import { intelligentChat } from '@/ai/flows/intelligent-chat-system';
import { preloadedMentors } from '@/lib/mentors';
import type { MentorProfile, ChatMessage } from '@/lib/types';
import { slugify } from '@/lib/utils';
import placeholderData from '@/lib/placeholder-images.json';

export async function getMentorProfileAction(mentorName: string): Promise<MentorProfile> {
  const mentorSlug = slugify(mentorName);
  const preloaded = preloadedMentors.find(m => slugify(m.name) === mentorSlug);

  if (preloaded) {
    return preloaded;
  }

  try {
    const newProfile = await createMentorProfile({ mentorName });
    if (!newProfile.photoUrl) {
      newProfile.photoUrl = placeholderData.placeholderImages.find(p => p.id === 'default-mentor')?.imageUrl || '';
    }
    return newProfile;
  } catch (error) {
    console.error('Error creating mentor profile:', error);
    // Return a default/error profile
    return {
      name: mentorName,
      field: 'Unknown',
      era: 'Unknown',
      knowledgeSources: [],
      thinkingStyle: 'Unknown',
      communicationStyle: 'Unknown',
      bio: 'Could not generate a profile for this mentor. Please try a different name.',
      photoUrl: placeholderData.placeholderImages.find(p => p.id === 'default-mentor')?.imageUrl || '',
    };
  }
}

export async function getChatResponseAction(
  userQuestion: string,
  mentorProfile: MentorProfile,
  customInstructions: string,
  // In a real app, history would be passed and used
  chatHistory: ChatMessage[] 
): Promise<ChatMessage> {
  
  // In a real app, this would perform a vector search on the knowledge base
  const knowledgeChunks = mentorProfile.knowledgeSources.map(ks => ({
    content: `Knowledge from ${ks.title}`,
    source_type: ks.type,
    source_name: ks.title,
    source_detail: `Chapter/Episode 1 (mocked)`
  }));

  const input = {
    mentorProfile: {
      name: mentorProfile.name,
      field: mentorProfile.field,
      era: mentorProfile.era,
      knowledge_sources: mentorProfile.knowledgeSources.map(ks => ({ type: ks.type, title: ks.title })),
      thinking_style: mentorProfile.thinkingStyle,
      communication_style: mentorProfile.communicationStyle,
    },
    customInstructions,
    userQuestion,
    knowledgeChunks,
  };

  const aiResponse = await intelligentChat(input);

  return {
    id: new Date().toISOString(),
    role: 'assistant',
    content: aiResponse.advice,
    sources: aiResponse.sources,
    confidence: aiResponse.confidence,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}
