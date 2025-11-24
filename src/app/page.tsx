import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, BookOpen, BrainCircuit, MessageSquareQuote, Rocket } from 'lucide-react';
import MentorSearchForm from '@/components/home/mentor-search-form';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

const exampleMentors = ['Marcus Aurelius', 'Naval Ravikant', 'Steve Jobs', 'APJ Abdul Kalam', 'Rumi'];
const categories = [
  { name: 'Business', icon: <Rocket className="h-5 w-5" /> },
  { name: 'Philosophy', icon: <BrainCircuit className="h-5 w-5" /> },
  { name: 'Science', icon: <BookOpen className="h-5 w-5" /> },
  { name: 'Spiritual', icon: <MessageSquareQuote className="h-5 w-5" /> },
];
const popularMentors = [
  { name: 'Marcus Aurelius', chats: '1.2k chats today' },
  { name: 'Naval Ravikant', chats: '890 chats' },
  { name: 'Bruce Lee', chats: '650 chats' },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto text-center mt-8 md:mt-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
          Get advice from anyone you admire.
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          "Talk to your role models, backed by their real wisdom"
        </p>

        <Card className="mt-8 md:mt-12 p-4 md:p-6 shadow-lg border-2 border-primary/20">
          <MentorSearchForm />
          <div className="mt-4 text-sm text-muted-foreground">
            <span className="font-semibold">Examples:</span> {exampleMentors.join(', ')}...
          </div>
        </Card>

        <div className="mt-16 w-full text-left">
          <h2 className="text-center text-sm font-semibold uppercase text-muted-foreground tracking-wider">
            Or Browse by Category
          </h2>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Button key={category.name} variant="outline" className="h-12 text-base justify-start gap-3">
                {category.icon}
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-16 w-full text-left mb-16">
          <h2 className="text-center text-sm font-semibold uppercase text-muted-foreground tracking-wider">
            Recently Popular
          </h2>
          <div className="mt-4 space-y-2">
            {popularMentors.map((mentor) => (
              <Link href={`/configure/${slugify(mentor.name)}`} key={mentor.name}>
                <Card className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer">
                  <div>
                    <p className="font-semibold">{mentor.name}</p>
                    <p className="text-sm text-muted-foreground">{mentor.chats}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
