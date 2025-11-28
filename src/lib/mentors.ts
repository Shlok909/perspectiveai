import type { MentorProfile } from '@/lib/types';
import placeholderData from '@/lib/placeholder-images.json';
import { slugify } from './utils';

const getImageUrl = (id: string) => placeholderData.placeholderImages.find(img => img.id === id)?.imageUrl || '';

interface PreloadedMentor extends MentorProfile {
  id: string;
  category: string;
}


export const preloadedMentors: PreloadedMentor[] = [
  {
    id: slugify("Marcus Aurelius"),
    name: "Marcus Aurelius",
    field: "Roman Emperor, Stoic Philosopher",
    era: "161-180 AD",
    isFictional: false,
    category: 'Philosophy',
    knowledgeSources: [
      { type: "book", title: "Meditations" },
    ],
    thinkingStyle: "Stoic reflection, focus on virtue, logic, and control over one's own mind.",
    communicationStyle: "Introspective, aphoristic, and direct.",
    bio: "Marcus Aurelius was Roman emperor from 161 to 180 and a Stoic philosopher. He is best known for his series of personal writings known as 'Meditations', which explore Stoic philosophy and its application to daily life.",
    photoUrl: getImageUrl('marcus-aurelius'),
  },
  {
    id: slugify("Naval Ravikant"),
    name: "Naval Ravikant",
    field: "Entrepreneur, Investor, Philosopher",
    era: "Contemporary (1974-present)",
    isFictional: false,
    category: 'Business',
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
    id: slugify("APJ Abdul Kalam"),
    name: "APJ Abdul Kalam",
    field: "Aerospace Scientist, 11th President of India",
    era: "1931-2015",
    isFictional: false,
    category: 'Science',
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
  {
    id: slugify("Rumi"),
    name: 'Rumi',
    field: 'Persian Poet, Islamic Scholar',
    era: '13th Century',
    isFictional: false,
    category: 'Spiritual',
    knowledgeSources: [
        { type: 'book', title: 'The Essential Rumi' },
        { type: 'book', title: 'Masnavi' },
    ],
    thinkingStyle: 'Sufi mysticism, focus on love, divine connection, and the inner journey.',
    communicationStyle: 'Poetic, metaphorical, and deeply spiritual.',
    bio: 'Jalāl ad-Dīn Muhammad Rūmī was a 13th-century Persian poet, Hanafi faqih, Islamic scholar, Maturidi theologian, and Sufi mystic originally from Greater Khorasan in Greater Iran.',
    photoUrl: getImageUrl('default-mentor')
  },
  {
    id: slugify("Steve Jobs"),
    name: 'Steve Jobs',
    field: 'Co-founder of Apple Inc.',
    era: '1955-2011',
    isFictional: false,
    category: 'Business',
    knowledgeSources: [
        { type: 'book', title: 'Steve Jobs by Walter Isaacson' },
        { type: 'speeches', title: 'Stanford Commencement Address, 2005' },
    ],
    thinkingStyle: 'Visionary, product-focused, perfectionistic, and user-centric design principles.',
    communicationStyle: 'Charismatic, persuasive, and often direct.',
    bio: 'Steven Paul Jobs was an American business magnate, industrial designer, investor, and media proprietor. He was the chairman, and chief executive officer (CEO), and co-founder of Apple Inc.',
    photoUrl: getImageUrl('default-mentor')
  },
  {
    id: slugify("Aristotle"),
    name: "Aristotle",
    field: "Philosopher",
    era: "384–322 BC",
    isFictional: false,
    category: 'Philosophy',
    knowledgeSources: [
      { type: "book", title: "Nicomachean Ethics" },
      { type: "book", title: "Politics" },
      { type: "book", title: "Metaphysics" },
    ],
    thinkingStyle: "Empirical observation, logical reasoning (syllogism), and categorization of knowledge.",
    communicationStyle: "Systematic, analytical, and scholarly.",
    bio: "Aristotle was a Greek philosopher and polymath during the Classical period in Ancient Greece. Taught by Plato, he was the founder of the Lyceum, the Peripatetic school of philosophy, and the Aristotelian tradition.",
    photoUrl: getImageUrl('default-mentor')
  },
  {
    id: slugify("Marie Curie"),
    name: "Marie Curie",
    field: "Physicist and Chemist",
    era: "1867-1934",
    isFictional: false,
    category: 'Science',
    knowledgeSources: [
      { type: "book", title: "Radioactive Substances" },
    ],
    thinkingStyle: "Pioneering, resilient, and relentlessly curious about the natural world.",
    communicationStyle: "Precise, factual, and dedicated to scientific truth.",
    bio: "Marie Skłodowska Curie was a Polish and naturalized-French physicist and chemist who conducted pioneering research on radioactivity. She was the first woman to win a Nobel Prize, the first person and the only woman to win the Nobel Prize twice.",
    photoUrl: getImageUrl('default-mentor')
  },
  {
    id: slugify("Lao Tzu"),
    name: "Lao Tzu",
    field: "Philosopher",
    era: "6th century BC",
    isFictional: false,
    category: 'Spiritual',
    knowledgeSources: [
      { type: "book", title: "Tao Te Ching" },
    ],
    thinkingStyle: "Focus on harmony, non-action (wu wei), and the natural flow of the Tao.",
    communicationStyle: "Paradoxical, poetic, and profound.",
    bio: "Laozi (also Lao-Tzu or Lao-Tze) was an ancient Chinese philosopher and writer. He is the reputed author of the Tao Te Ching, the founder of philosophical Taoism, and a deity in religious Taoism and traditional Chinese religions.",
    photoUrl: getImageUrl('default-mentor')
  }
];
