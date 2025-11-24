'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { slugify } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function MentorSearchForm() {
  const [mentorName, setMentorName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!mentorName.trim()) {
      toast({
        title: "No name entered",
        description: "Please enter the name of a person you admire.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    const mentorSlug = slugify(mentorName);
    router.push(`/configure/${mentorSlug}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col sm:flex-row items-center gap-2">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Who do you want guidance from?"
          value={mentorName}
          onChange={(e) => setMentorName(e.target.value)}
          className="h-12 text-lg pl-10"
          disabled={isLoading}
        />
      </div>
      <Button type="submit" size="lg" className="h-12 w-full sm:w-auto" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <Search className="h-6 w-6" />
        )}
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
