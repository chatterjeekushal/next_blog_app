
'use client'

import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { Terminal } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { Button } from "@/components/ui/button"
import TabContent from './Usertab';

import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'

const Dashbord = () => {
  const { data: session } = useSession()

  // Check for undefined session or user data
  if (!session?.user) {
    return <div>Loading...</div> // Handle loading or error state
  }

  const user: User = session.user as User

  console.log("My GitHub user", user);
  console.log("Data from my session", session);

  // Determine the image source based on session.user.image or fallback to userImage
  const imageSrc = session?.user?.image || session?.user?.userImage || '/default-avatar.png';

  return (
    <>
      <div className="flex mt-10 flex-col md:flex-row gap-4">
        <Avatar className='h-32 w-32 md:h-40 md:w-40'>
          <AvatarImage 
            src={imageSrc} // Use the determined image source
            alt={session?.user?.name || 'User Avatar'} 
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle className='text-4xl md:text-5xl'>
            <span className='font-semibold'>{session?.user?.name || session?.user?.username}</span>
          </AlertTitle>
          <AlertDescription className='text-sm mt-5'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem excepturi nobis, reprehenderit molestiae maxime adipisci vel impedit ullam sed veniam pariatur quas ea natus aut sit repellat.
          </AlertDescription>

          <div className='flex gap-4 mt-5'>
            <Button>Edit Profile</Button> 
            <Button>Profile Details</Button>
            {/* Sign out button */}
            <Button onClick={() => signOut()}>Sign Out</Button>
          </div>
        </Alert>
      </div>

      {/* You can decide if you want to render the BlogtextEditor or any other components */}
      <TabContent />
    </>
  );
};

export default Dashbord;
