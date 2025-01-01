
import React from "react";

const TrendingTopics = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:mt-40 mt-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate__animated animate__fadeIn">
          Trending Topics
        </h2>
        <p className="text-gray-600 dark:text-gray-300 animate__animated animate__fadeIn">
          Explore what's hot in our community
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Topic 1 */}
        <div className="group relative overflow-hidden rounded-xl animate__animated animate__fadeInUp">
          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-6 h-full transform transition-transform group-hover:scale-105">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <div className="text-center">
              <span className="text-2xl mb-2 block text-indigo-600 dark:text-indigo-400">#</span>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Technology</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">2.5k posts</p>
            </div>
          </div>
        </div>

        {/* Topic 2 */}
        <div
          className="group relative overflow-hidden rounded-xl animate__animated animate__fadeInUp"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="bg-green-100 dark:bg-green-900/50 p-6 h-full transform transition-transform group-hover:scale-105">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
            <div className="text-center">
              <span className="text-2xl mb-2 block text-green-600 dark:text-green-400">#</span>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Lifestyle</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">1.8k posts</p>
            </div>
          </div>
        </div>

        {/* Topic 3 */}
        <div
          className="group relative overflow-hidden rounded-xl animate__animated animate__fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="bg-purple-100 dark:bg-purple-900/50 p-6 h-full transform transition-transform group-hover:scale-105">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <div className="text-center">
              <span className="text-2xl mb-2 block text-purple-600 dark:text-purple-400">#</span>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Health</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">1.5k posts</p>
            </div>
          </div>
        </div>

        {/* Topic 4 */}
        <div
          className="group relative overflow-hidden rounded-xl animate__animated animate__fadeInUp"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="bg-rose-100 dark:bg-rose-900/50 p-6 h-full transform transition-transform group-hover:scale-105">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-red-500"></div>
            <div className="text-center">
              <span className="text-2xl mb-2 block text-rose-600 dark:text-rose-400">#</span>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Travel</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">1.2k posts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center animate__animated animate__fadeIn">
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h4 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">24k+</h4>
          <p className="text-gray-600 dark:text-gray-300">Active Users</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h4 className="text-2xl font-bold text-green-600 dark:text-green-400">15k+</h4>
          <p className="text-gray-600 dark:text-gray-300">Articles</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h4 className="text-2xl font-bold text-purple-600 dark:text-purple-400">8k+</h4>
          <p className="text-gray-600 dark:text-gray-300">Writers</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h4 className="text-2xl font-bold text-rose-600 dark:text-rose-400">100+</h4>
          <p className="text-gray-600 dark:text-gray-300">Topics</p>
        </div>
      </div>
    </div>
  );
};

export default TrendingTopics;
