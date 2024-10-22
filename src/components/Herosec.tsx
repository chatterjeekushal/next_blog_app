import React from 'react';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
function HeroSection() {

  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "apps",
    },
    {
      text: "with",
    },
    {
      text: "Aceternity.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <>
      {/* Large screens */}

      <div className="hidden lg:flex justify-center items-center">
      <BackgroundBeamsWithCollision>
      <div className="flex flex-col items-center justify-center w-full h-screen text-center lg:flex-row mt-10 md:mt-24 lg:mt-28">
        <div className="lg:w-1/2 lg:-mt-8 md:ml-10 px-4 flex flex-col items-center justify-center ">
          <h1 className="text-2xl leading-snug text-gray-800 dark:text-gray-200 md:text-3xl lg:text-4xl">
            Welcome to <span className="font-semibold">Kushal's Blog</span> for Update <br className="hidden lg:block" />
            Blog and Learn <span className="font-semibold underline decoration-primary">Something New</span>
          </h1>
          <p className="mt-4  text-base text-gray-500 dark:text-gray-300 md:text-lg">
            Open source Tailwind UI components and templates to <br className="hidden lg:block" />
            bootstrap your new apps, projects or landing sites!
          </p>
          <div className="mt-6  bg-transparent border border-black rounded-lg dark:border-gray-700 lg:w-2/3 focus-within:border-primary focus-within:ring focus-within:ring-primary dark:focus-within:border-primary focus-within:ring-opacity-20 w-full md:w-96">
            <form action="https://www.creative-tim.com/twcomponents/search" className="flex flex-col md:flex-row">
              <input
                type="search"
                name="query"
                placeholder="Search Blog"
                required
                className="flex-1 h-10 px-4 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none lg:h-12 dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"
              />
              <button
                type="submit"
                className="flex items-center justify-center w-full p-2 m-1 text-white transition-colors duration-300 transform rounded-lg bg-primary hover:bg-primary/70 focus:outline-none focus:bg-primary/70 md:w-12 lg:w-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
          <img
            src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
            alt="Tailwind CSS components"
            className="w-full h-full max-w-md mx-auto"
          />
        </div>
      </div>
    </BackgroundBeamsWithCollision>
      </div>

      {/* Small screens */}
      <div className="flex lg:hidden flex-col items-center justify-center w-full h-screen text-center mt-20">
        <div className="px-4">
          <h1 className="text-2xl leading-snug text-gray-800 dark:text-gray-200 md:text-3xl">
            Welcome to <span className="font-semibold">Kushal's Blog</span> for Update <br />
            Blog and Learn <span className="font-semibold underline decoration-primary">Something New</span>
          </h1>
          <p className="mt-4 text-base text-gray-500 dark:text-gray-300 md:text-lg">
            Open source Tailwind UI components and templates to bootstrap your new apps, projects or landing sites!
          </p>
          <div className="mt-6 bg-transparent border rounded-lg dark:border-gray-700 w-full md:w-96">
            <form action="https://www.creative-tim.com/twcomponents/search" className="flex flex-col">
              <input
                type="search"
                name="query"
                placeholder="Search Blog"
                required
                className="flex-1 h-10 px-4 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"
              />
              <button
                type="submit"
                className="flex items-center justify-center w-full p-2 m-1 text-white transition-colors duration-300 transform rounded-lg bg-primary hover:bg-primary/70 focus:outline-none focus:bg-primary/70"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div className="w-full mt-4">
          <img
            src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
            alt="Tailwind CSS components"
            className="w-full h-full max-w-md mx-auto"
          />
        </div>
      </div>
    </>
  );
}

export default HeroSection;
