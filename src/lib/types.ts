import type { CreateMentorProfileOutput } from "@/ai/flows/dynamic-mentor-profile-creation";

export interface MentorProfile extends CreateMentorProfileOutput {
  id: string;
  category: string;
}

export interface Source {
  source_type: string;
  source_name: string;
  source_detail: string;
  original_quote: string;
  context: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  confidence?: string;
  timestamp: string;
}
