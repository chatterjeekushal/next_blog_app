
import React from 'react';

const PricingPlans = () => {
 



  return (

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate__animated animate__fadeIn">Featured Posts</h2>
        <p className="text-gray-600 dark:text-gray-300 animate__animated animate__fadeIn">Discover our most popular and trending articles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Featured Post 1 */}
        <article className="bg-neutral-100 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transform hover:translate-y-[-4px] transition-all duration-300 animate__animated animate__fadeInUp">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm font-medium px-3 py-1 rounded-full">Technology</span>
              <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">5 min read</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">The Future of Artificial Intelligence</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Exploring the latest developments in AI and their impact on society...</p>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mar 16, 2024</p>
              </div>
            </div>
          </div>
        </article>

        {/* Featured Post 2 */}
        <article className="bg-neutral-100 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transform hover:translate-y-[-4px] transition-all duration-300 animate__animated animate__fadeInUp animation-delay-200">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium px-3 py-1 rounded-full">Lifestyle</span>
              <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">3 min read</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sustainable Living in 2024</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Practical tips for reducing your carbon footprint and living sustainably...</p>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Jane Smith</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mar 15, 2024</p>
              </div>
            </div>
          </div>
        </article>

        {/* Featured Post 3 */}
        <article className="bg-neutral-100 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transform hover:translate-y-[-4px] transition-all duration-300 animate__animated animate__fadeInUp animation-delay-400">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm font-medium px-3 py-1 rounded-full">Health</span>
              <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">4 min read</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mental Wellness in Digital Age</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Maintaining mental health in an increasingly connected world...</p>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Mike Johnson</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mar 14, 2024</p>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="text-center mt-12">
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 animate__animated animate__fadeInUp">
          View All Posts
        </button>
      </div>
    </div>
  
  );
};

export default PricingPlans;




