

import React from 'react';

const FeaturedAuthors = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:mt-24 mt-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate__animated animate__fadeIn">
          Featured Authors
        </h2>
        <p className="text-gray-600 dark:text-gray-300 animate__animated animate__fadeIn">
          Meet the minds behind our top stories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Author 1 */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate__animated animate__fadeInUp">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-1">
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Sarah Johnson</h3>
            <p className="text-indigo-600 dark:text-indigo-400">Tech Editor</p>
            <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
              Specializing in AI and emerging technologies with over 10 years of experience.
            </p>
            <div className="mt-4 flex space-x-3">
              <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                AI
              </span>
              <span className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                Tech
              </span>
            </div>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Author 2 */}
        <div
          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate__animated animate__fadeInUp"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-1">
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Michael Chen</h3>
            <p className="text-green-600 dark:text-green-400">Lifestyle Writer</p>
            <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
              Passionate about sustainable living and mindful practices in modern life.
            </p>
            <div className="mt-4 flex space-x-3">
              <span className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                Wellness
              </span>
              <span className="px-3 py-1 text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                Lifestyle
              </span>
            </div>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Author 3 */}
        <div
          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate__animated animate__fadeInUp"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1">
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Emily Rodriguez</h3>
            <p className="text-purple-600 dark:text-purple-400">Travel Expert</p>
            <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
              Globe-trotter sharing authentic travel experiences and cultural insights.
            </p>
            <div className="mt-4 flex space-x-3">
              <span className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                Travel
              </span>
              <span className="px-3 py-1 text-sm bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full">
                Culture
              </span>
            </div>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 animate__animated animate__fadeInUp">
          View All Authors
        </button>
      </div>
    </div>
  );
};

export default FeaturedAuthors;
