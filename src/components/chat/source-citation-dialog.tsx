'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import type { Source } from '@/lib/types';
import { Book, Mic, Quote } from 'lucide-react';

interface SourceCitationDialogProps {
  source: Source | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getIconForType = (type: string) => {
    switch(type.toLowerCase()){
        case 'book': return <Book className="h-4 w-4" />;
        case 'podcast': return <Mic className="h-4 w-4" />;
        default: return <Quote className="h-4 w-4" />;
    }
}

export default function SourceCitationDialog({ source, open, onOpenChange }: SourceCitationDialogProps) {
  if (!source) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIconForType(source.source_type)}
            Source Citation
          </DialogTitle>
          <DialogDescription>
            Details for the cited source material.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Type</p>
                <Badge variant="secondary" className="capitalize">{source.source_type}</Badge>
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="font-semibold">{source.source_name}</p>
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Detail</p>
                <p className="text-sm">{source.source_detail}</p>
            </div>
          <div className="p-4 bg-muted/50 rounded-lg border">
            <p className="text-sm font-medium text-muted-foreground mb-2">Original Quote</p>
            <blockquote className="italic border-l-2 pl-4">
              "{source.original_quote}"
            </blockquote>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Context</p>
            <p className="text-sm">{source.context}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
