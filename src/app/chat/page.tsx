import { Suspense } from 'react';
import ChatClient from './chat-client';
import { Skeleton } from '@/components/ui/skeleton';

function ChatLoadingSkeleton() {
    return (
        <div className="flex flex-col h-screen">
            <header className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                </div>
                <Skeleton className="h-8 w-8 rounded-md" />
            </header>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                <div className="flex justify-end">
                    <Skeleton className="h-12 w-3/5 rounded-lg" />
                </div>
                <div className="flex justify-start">
                    <Skeleton className="h-24 w-4/5 rounded-lg" />
                </div>
            </div>
            <footer className="p-4 border-t">
                <div className="flex items-center gap-2">
                    <Skeleton className="flex-1 h-12 rounded-lg" />
                    <Skeleton className="h-12 w-12 rounded-lg" />
                </div>
            </footer>
        </div>
    )
}

export default function ChatPage() {
  return (
    <Suspense fallback={<ChatLoadingSkeleton />}>
      <ChatClient />
    </Suspense>
  );
}
