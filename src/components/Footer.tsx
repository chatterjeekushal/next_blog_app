'use client';

import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://flowbite.com/" className="flex items-center">
             
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Flowbite
              </span>
            </a>
            <form className="mt-4">
              <div className="flex">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="flex-grow p-2 border border-gray-300 rounded-l-md"
                />
                <button
                  type="submit"
                  className="p-2 bg-black text-white rounded-r-md hover:bg-blue-700"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          {/* ...rest of your code remains unchanged... */}
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
          </span>
          {/* ...social media icons... */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
