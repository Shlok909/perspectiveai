'use client';

import { useState, useTransition, useRef, useEffect, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Loader2, Send, Settings, Lightbulb } from 'lucide-react';

import { getChatResponseAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { MentorProfile, ChatMessage } from '@/lib/types';
import { ChatMessageComponent } from '@/components/chat/chat-message';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ChatClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [mentor, setMentor] = useState<MentorProfile | null>(() => {
    const mentorJson = searchParams.get('mentor');
    return mentorJson ? JSON.parse(mentorJson) : null;
  });
  const [instructions, setInstructions] = useState(() => searchParams.get('instructions') || '');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A slight delay to allow the DOM to update fully
        setTimeout(() => {
            const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }, 100);
    }
  }, [messages]);


  const handleGoBack = () => {
    if (mentor) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !mentor) return;

    const userMessage: ChatMessage = {
      id: new Date().toISOString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const aiResponse = await getChatResponseAction(input, mentor, instructions, messages);
      setMessages((prev) => [...prev, aiResponse]);
    });
  };

  if (!mentor) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-lg text-destructive">Mentor information is missing.</p>
        <Button asChild className="mt-4">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-muted/20">
      <header className="flex items-center justify-between p-3 border-b bg-background shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleGoBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Image
            src={mentor.photoUrl}
            alt={`Photo of ${mentor.name}`}
            width={40}
            height={40}
            className="rounded-full object-cover"
            unoptimized
          />
          <div>
            <h1 className="font-bold">{mentor.name}</h1>
            <p className="text-xs text-muted-foreground truncate max-w-[150px] sm:max-w-xs">
              Mode: {instructions}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </header>
      
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 space-y-6">
            {messages.map((msg) => (
                <ChatMessageComponent key={msg.id} message={msg} mentorImage={mentor.photoUrl} />
            ))}
            {isPending && (
                <div className="flex items-start gap-4">
                    <Image src={mentor.photoUrl} alt="Mentor" width={32} height={32} className="rounded-full" unoptimized/>
                    <div className="p-4 rounded-lg bg-background shadow-md border w-fit max-w-lg animate-pulse">
                        <Loader2 className="h-5 w-5 text-primary animate-spin" />
                    </div>
                </div>
            )}
        </div>
      </ScrollArea>

      <footer className="p-4 border-t bg-background">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${mentor.name} a question...`}
            className="flex-1 min-h-[48px] max-h-48 resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            disabled={isPending}
          />
          <Button type="submit" size="icon" className="h-12 w-12" disabled={!input.trim() || isPending}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </footer>
    </div>
  );
}
