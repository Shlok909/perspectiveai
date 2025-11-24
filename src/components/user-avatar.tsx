'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import placeholderData from '@/lib/placeholder-images.json';
import { LogIn } from "lucide-react";
import { useState } from "react";

export function UserAvatar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userImage = placeholderData.placeholderImages.find(p => p.id === 'user-avatar');

  if (!isLoggedIn) {
    return (
      <Button variant="ghost" onClick={() => setIsLoggedIn(true)}>
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    )
  }

  return (
    <Avatar className="h-8 w-8 cursor-pointer" onClick={() => setIsLoggedIn(false)}>
      <AvatarImage src={userImage?.imageUrl} alt="User avatar" />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
}
