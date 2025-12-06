import Link from "next/link";
import { PerspectiveLogo } from "@/components/icons/perspective-logo";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HelpCircle } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <PerspectiveLogo className="h-6 w-6 text-primary" />
          <span className="font-bold">
            Perspective
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5" />
                  <span className="sr-only">Help</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <p className="text-sm font-medium">CEO :- Shlok Sane</p>
              </PopoverContent>
            </Popover>
            <UserAvatar />
          </nav>
        </div>
      </div>
    </header>
  );
}
