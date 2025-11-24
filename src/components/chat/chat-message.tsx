'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Lightbulb, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChatMessage, Source } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import SourceCitationDialog from './source-citation-dialog';
import placeholderData from '@/lib/placeholder-images.json';

interface ChatMessageProps {
  message: ChatMessage;
  mentorImage: string;
}

export function ChatMessageComponent({ message, mentorImage }: ChatMessageProps) {
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  const isUser = message.role === 'user';
  const userImage = placeholderData.placeholderImages.find(p => p.id === 'user-avatar');

  // Regex to find citation markers like [1], [2], etc.
  const citationRegex = /\[(\d+)\]/g;
  
  const renderContent = () => {
    if (!message.sources || message.sources.length === 0) {
      return message.content;
    }

    const parts = message.content.split(citationRegex);
    return parts.map((part, index) => {
      if (index % 2 === 1) { // This is a citation number
        const sourceIndex = parseInt(part, 10) - 1;
        const source = message.sources?.[sourceIndex];
        if (source) {
          return (
            <button
              key={index}
              onClick={() => setSelectedSource(source)}
              className="inline-block align-super mx-0.5 text-xs h-5 w-5 bg-primary/20 text-primary rounded-full font-bold hover:bg-primary/30 transition-colors"
            >
              {part}
            </button>
          );
        }
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
      <div className={cn('flex items-start gap-4', isUser ? 'justify-end' : 'justify-start')}>
        {!isUser && (
          <Avatar className="h-8 w-8">
            <AvatarImage src={mentorImage} alt="Mentor" />
            <AvatarFallback>{message.role.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        )}
        <div
          className={cn(
            'p-4 rounded-lg shadow-md border w-fit max-w-lg',
            isUser ? 'bg-primary text-primary-foreground' : 'bg-background'
          )}
        >
          <div className="prose prose-sm text-foreground dark:text-foreground max-w-none whitespace-pre-wrap">
            {isUser ? message.content : renderContent()}
          </div>
          {!isUser && (
            <div className="mt-4 pt-2 border-t border-border/50">
                {message.sources && message.sources.length > 0 && (
                     <div className="flex flex-wrap items-center gap-2 mb-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        {message.sources.map((source, index) => (
                            <button key={index} onClick={() => setSelectedSource(source)} className="text-xs text-primary underline-offset-2 hover:underline">
                                Source [{index + 1}]
                            </button>
                        ))}
                    </div>
                )}
                {message.confidence && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                        <span>Confidence: </span>
                        <Badge variant={message.confidence === 'High' ? 'default' : 'secondary'} className={cn(
                            message.confidence === 'High' && 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
                            message.confidence === 'Medium' && 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30'
                        )}>
                            {message.confidence}
                        </Badge>
                    </div>
                )}
            </div>
          )}
        </div>
        {isUser && (
            <Avatar className="h-8 w-8">
                <AvatarImage src={userImage?.imageUrl} alt="User" />
                <AvatarFallback>Y</AvatarFallback>
            </Avatar>
        )}
      </div>
      <SourceCitationDialog source={selectedSource} open={!!selectedSource} onOpenChange={() => setSelectedSource(null)} />
    </>
  );
}
