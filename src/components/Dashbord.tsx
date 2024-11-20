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
const Dashbord = () => {
  return (
    
    <>

    <div className="flex mt-10 flex-col md:flex-row  gap-4">
    

    <Avatar className='h-32 w-32 md:h-40 md:w-40'>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>

    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle className='text-4xl md:text-5xl'><span className='font-semibold '>kushal chatterjee</span></AlertTitle>
      <AlertDescription className='text-sm mt-5'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem excepturi nobis, reprehenderit molestiae maxime adipisci vel impedit ullam sed veniam pariatur quas ea natus aut sit repellat 
      </AlertDescription>

      <div className='flex gap-4 mt-5'><Button>Edit Profile</Button> <Button>Profile details</Button></div>

    </Alert>

  </div>


  <TabContent />

  </>
  );
};

export default Dashbord;
