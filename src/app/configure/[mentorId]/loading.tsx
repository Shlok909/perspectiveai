import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, BookOpen, BrainCircuit } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto max-w-2xl py-8 md:py-12">
      <Skeleton className="h-8 w-24 mb-8" />
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="p-4 rounded-lg border bg-muted/50">
            <div className="flex items-center gap-3 text-sm font-medium text-primary">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="mt-2 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <Skeleton className="h-4 w-4 mt-1" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex items-start gap-3">
                <Skeleton className="h-4 w-4 mt-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
             <Skeleton className="h-6 w-64" />
            <Skeleton className="h-24 w-full" />
          </div>

          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
