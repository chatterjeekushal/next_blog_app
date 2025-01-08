
'use client'

import Link from 'next/link';
import React from 'react';

const ExploreCategories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:mt-20 mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate__animated animate__fadeIn">Explore Categories</h2>
        <p className="text-gray-600 dark:text-gray-300 animate__animated animate__fadeIn">Discover content that matters to you</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">


        {/* Technology Category */}
        <div className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl animate__animated animate__fadeInUp">
          <div className="p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">250+ articles</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Technology</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Latest in tech, AI, and digital transformation</p>
            <Link href="/catagary-blog/travel" className="inline-flex items-center text-blue-500 hover:text-blue-600">
              Explore More
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>




        {/* Lifestyle Category */}
        <div className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">180+ articles</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Lifestyle</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Wellness, personal growth, and daily living</p>
            <a href="#" className="inline-flex items-center text-green-500 hover:text-green-600">
              Explore More
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Travel Category */}
        <div className="group bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
          <div className="p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"></path>
                </svg>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">150+ articles</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Travel</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Adventures, destinations, and travel tips</p>
            <a href="#" className="inline-flex items-center text-purple-500 hover:text-purple-600">
              Explore More
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg text-center animate__animated animate__fadeIn">
          <span className="block text-2xl font-bold text-gray-900 dark:text-white">1,200+</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Total Articles</span>
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg text-center animate__animated animate__fadeIn">
          <span className="block text-2xl font-bold text-gray-900 dark:text-white">8</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Categories</span>
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg text-center animate__animated animate__fadeIn">
          <span className="block text-2xl font-bold text-gray-900 dark:text-white">50k+</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Monthly Readers</span>
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg text-center animate__animated animate__fadeIn">
          <span className="block text-2xl font-bold text-gray-900 dark:text-white">24/7</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Content Updates</span>
        </div>
      </div>
    </div>
  );
}

export default ExploreCategories;
