'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bot, BookOpen, BrainCircuit, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import type { MentorProfile } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

type ConfigureClientProps = {
  mentorProfile: MentorProfile;
};

const quickTemplates = [
  'Philosophical & deep',
  'Practical & actionable',
  'Gentle & supportive',
  'Direct & honest',
];

export default function ConfigureClient({ mentorProfile }: ConfigureClientProps) {
  const [instructions, setInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStartConversation = () => {
    setIsLoading(true);
    const params = new URLSearchParams({
      mentor: JSON.stringify(mentorProfile),
      instructions: instructions || 'Act as a helpful mentor.',
    });
    router.push(`/chat?${params.toString()}`);
  };

  const totalKnowledgeSources = mentorProfile.knowledgeSources.length;

  return (
    <div className="container mx-auto max-w-2xl py-8 md:py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Search
        </Link>
      </Button>

      <Card className="w-full shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Image
              src={mentorProfile.photoUrl}
              alt={`Photo of ${mentorProfile.name}`}
              width={96}
              height={96}
              className="rounded-full border-4 border-primary/20 object-cover"
              unoptimized
            />
            <div className="pt-2">
              <h1 className="text-3xl font-bold tracking-tight">{mentorProfile.name}</h1>
              <p className="text-muted-foreground">{mentorProfile.field}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="p-4 rounded-lg border bg-muted/30">
            <div className="flex items-center gap-3 text-sm font-medium text-primary">
              <Bot />
              <span>Profile Ready</span>
            </div>
            <div className="mt-2 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <BookOpen className="h-4 w-4 mt-1 shrink-0" />
                <span>
                  Knowledge base includes {totalKnowledgeSources} core source{totalKnowledgeSources === 1 ? '' : 's'}.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <BrainCircuit className="h-4 w-4 mt-1 shrink-0" />
                <span>
                  Thinking style identified as: {mentorProfile.thinkingStyle}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label htmlFor="instructions" className="text-lg font-semibold flex items-center gap-2">
              How should {mentorProfile.name} help you? 💬
            </label>
            <Textarea
              id="instructions"
              placeholder="Describe what kind of guidance you want..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="min-h-[100px] text-base"
            />
            <div className="flex flex-wrap gap-2">
              {quickTemplates.map((template) => (
                <Badge
                  key={template}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary/20"
                  onClick={() => setInstructions(template)}
                >
                  {template}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button
            size="lg"
            className="w-full h-12 text-lg"
            onClick={handleStartConversation}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              'Start Conversation →'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
