import Link from "next/link";
import { PerspectiveLogo } from "@/components/icons/perspective-logo";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";

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
            {/* Placeholder for future auth */}
            <UserAvatar />
          </nav>
        </div>
      </div>
    </header>
  );
}
