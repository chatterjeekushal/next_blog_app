'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const cardData = [
  {
    id: 1,
    imageUrl: "https://img.freepik.com/free-photo/programming-background-collage_23-2149901791.jpg?t=st=1729497357~exp=1729500957~hmac=b2fbb95041e6ffa9a6ff21dd09f3a14bdd9986739c5d91e7c18e808a376c21ad&w=740",
    title: "Full Stack Web Development",
    description: "Explore the latest trends in full stack web development, including frameworks, libraries, and best practices for building robust applications.",
    author: "Robate Thomas",
    date: "January 10, 2024",
    authorImage: "https://img.freepik.com/free-photo/close-up-portrait-curly-handsome-european-male_176532-8133.jpg?t=st=1729497643~exp=1729501243~hmac=7a2a52c26dde2558338ea0009e7b739c8f9cc5fdb0442bd671df037a7bb66b71&w=740"
  },
  {
    id: 2,
    imageUrl: "https://img.freepik.com/free-photo/analysis-strategy-study-information-business-planning_53876-132197.jpg?t=st=1729497441~exp=1729501041~hmac=ad0de4f5b4eb2475163d4786785b60898d2e41e946c78da9f6cb3f0a740fa04c&w=740",
    title: "Data Analytics",
    description: "A comprehensive guide to data analytics, covering tools and techniques for extracting insights from data to drive decision-making.",
    author: "Lorie marks",
    date: "February 23, 2024",
    authorImage: "https://img.freepik.com/free-photo/portrait-smiling-blonde-woman_23-2148316635.jpg?t=st=1729744633~exp=1729748233~hmac=b98bad1c9bee3fd75e20c1b60c1d838e8078ca742a1dca7fa4fe317de364096d&w=740"
  },
  {
    id: 3,
    imageUrl: "https://img.freepik.com/free-photo/close-up-anthropomorphic-robot-working-computer_23-2150865895.jpg?t=st=1729497521~exp=1729501121~hmac=3239de20c3082843245a812ee0542a618609ff132edeb0db9ee3f8698048db61&w=826",
    title: "Machine Learning and AI",
    description: "Dive into the world of machine learning and AI, exploring algorithms, applications, and the future of intelligent systems.",
    author: "John Smith",
    date: "March 15, 2024",
    authorImage: "https://img.freepik.com/free-photo/close-up-portrait-handsome-man-smiling_176420-3855.jpg?t=st=1729497711~exp=1729501311~hmac=fa15c9074c41f9ac2fd9c14e93e69d46bd455343d99eaec4aa9ad6369fac7e6e&w=360"
  }
];

const Card = () => {
  return (
    <div className='flex flex-col justify-center items-center flex-wrap gap-5'>
      <h2 className="text-3xl font-bold text-center mb-2 md:mt-12 bg-gray-50 dark:bg-gray-800">Explore Our Top Blogs</h2>
      <p className="text-center text-lg mb-8 dark:text-gray-300">
        Choose the plan that fits your needs best and unlock amazing features.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-fit 2xl:gap-40 2xl:mr-24'>
        {cardData.map((card) => (

<Link href="/dashboard">

          <div key={card.id} className="my-6 2xl:w-auto">
            <a 
              href="#" 
              className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-full md:w-96 lg:w-96 px-2 transition-transform transform hover:scale-105 hover:border-purple-600 duration-300 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                <Image 
                  src={card.imageUrl} 
                  alt={card.title} 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-md" 
                />
              </div>
              <div className="p-4">
                <div className="mb-4 rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
                  POPULAR
                </div>
                <h6 className="mb-2 text-slate-800 dark:text-gray-200 text-xl font-semibold">{card.title}</h6>
                <p className="text-slate-600 dark:text-gray-400 leading-normal font-light">{card.description}</p>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <Image
                    alt={card.author}
                    src={card.authorImage}
                    width={32}
                    height={32}
                    className="relative inline-block rounded-full"
                  />
                  <div className="flex flex-col ml-3 text-sm">
                    <span className="text-slate-800 dark:text-gray-200 font-semibold">{card.author}</span>
                    <span className="text-slate-600 dark:text-gray-400">{card.date}</span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          </Link>      
        ))}
      </div>
    </div>
  );
};

export default Card;
