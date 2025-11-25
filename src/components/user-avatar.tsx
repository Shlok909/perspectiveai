'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import placeholderData from '@/lib/placeholder-images.json';
import { useState } from "react";

export function UserAvatar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userImage = placeholderData.placeholderImages.find(p => p.id === 'user-avatar');

  if (!isLoggedIn) {
    // The Sign In button was here. It has been removed as requested.
    // An empty fragment is returned to render nothing when not logged in.
    return <></>;
  }

  return (
    <Avatar className="h-8 w-8 cursor-pointer" onClick={() => setIsLoggedIn(false)}>
      <AvatarImage src={userImage?.imageUrl} alt="User avatar" />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
}
