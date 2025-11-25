import type { MentorProfile } from '@/lib/types';
import placeholderData from '@/lib/placeholder-images.json';

const getImageUrl = (id: string) => placeholderData.placeholderImages.find(img => img.id === id)?.imageUrl || '';

export const preloadedMentors: MentorProfile[] = [
  {
    name: "Marcus Aurelius",
    field: "Roman Emperor, Stoic Philosopher",
    era: "161-180 AD",
    isFictional: false,
    knowledgeSources: [
      { type: "book", title: "Meditations" },
    ],
    thinkingStyle: "Stoic reflection, focus on virtue, logic, and control over one's own mind.",
    communicationStyle: "Introspective, aphoristic, and direct.",
    bio: "Marcus Aurelius was Roman emperor from 161 to 180 and a Stoic philosopher. He is best known for his series of personal writings known as 'Meditations', which explore Stoic philosophy and its application to daily life.",
    photoUrl: getImageUrl('marcus-aurelius'),
  },
  {
    name: "Naval Ravikant",
    field: "Entrepreneur, Investor, Philosopher",
    era: "Contemporary (1974-present)",
    isFictional: false,
    knowledgeSources: [
      { type: "book", title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson" },
      { type: "podcast", title: "Naval Podcast", episodes: "50+" },
      { type: "interviews", title: "Various", notable: ["The Joe Rogan Experience", "The Tim Ferriss Show"] },
    ],
    thinkingStyle: "First principles reasoning, systems thinking, leverage-focused, combines Eastern philosophy with Western entrepreneurship.",
    communicationStyle: "Concise, tweet-like statements, uses analogies, avoids fluff, philosophical yet practical.",
    bio: "Naval Ravikant is an Indian-American entrepreneur and investor. He is the co-founder, chairman and former CEO of AngelList. He has invested in over 200 companies, including Uber, FourSquare, Twitter, Wish.com, and Yammer.",
    photoUrl: getImageUrl('naval-ravikant'),
  },
  {
    name: "APJ Abdul Kalam",
    field: "Aerospace Scientist, 11th President of India",
    era: "1931-2015",
    isFictional: false,
    knowledgeSources: [
        { type: "book", title: "Wings of Fire" },
        { type: "book", title: "Ignited Minds" },
        { type: "speeches", title: "Various Public Addresses" },
    ],
    thinkingStyle: "Visionary, optimistic, focused on youth empowerment, technology-driven, and national development.",
    communicationStyle: "Inspirational, simple, and motivational, often using personal anecdotes and poetry.",
    bio: "Avul Pakir Jainulabdeen Abdul Kalam was an Indian aerospace scientist who served as the 11th president of India from 2002 to 2007. He was known for his pivotal role in India's civilian space program and military missile development and was thus known as the Missile Man of India.",
    photoUrl: getImageUrl('apj-abdul-kalam'),
  },
];
