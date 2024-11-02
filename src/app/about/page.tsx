import React from 'react';
import Image from 'next/image';
import AboutSection from '@/components/Ceo';
import Ourstory from '@/components/Ourstory';
import TeamSection from '@/components/Ourteam';
import Jointeam from '@/components/Jointeam';

const ConnectionComponent = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between p-6 mt-20">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">We’re changing the way people connect</h1>
          <p className="text-xl text-neutral-600 mb-6 dark:text-neutral-300">
            Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in quis cupidatat mollit aute velit. 
            Et labore commodo nulla aliqua proident mollit ullamco exercitation tempor. 
            Sint aliqua anim nulla sunt mollit id pariatur in voluptate cillum. 
            Eu voluptate tempor esse minim amet fugiat veniam occaecat aliqua.
          </p>
        </div>
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <Image
            alt=""
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
            className="w-full h-auto rounded-lg"
            width={400}
            height={528}
          />
          <Image
            alt=""
            src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
            className="w-full h-auto rounded-lg"
            width={400}
            height={528}
          />
          <Image
            alt=""
            src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
            className="w-full h-auto rounded-lg"
            width={396}
            height={528}
          />
          <Image
            alt=""
            src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
            className="w-full h-auto rounded-lg"
            width={400}
            height={528}
          />
        </div>
      </div>

      <Ourstory />
      <AboutSection />
      <Jointeam />
      <TeamSection />
    </>
  );
};

export default ConnectionComponent;
