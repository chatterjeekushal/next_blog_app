
'use client'

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import Blogcard from '@/components/Blogcard';

interface Blog {
    blogid: string | number;
    blogtitle: string;
    blogdescription: string;
    blogcontent: string;
    authorImage: string;
    author: string;
    date: string;
    blogImage: string;
    slug: string;
    viewCount: number;
    likes: number;
    blogcategory?: string;
}

export default function Blog() {
    const [isShaking, setIsShaking] = useState(false);
    const [allBlogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState<string>('');
   

    const { toast } = useToast();
    const router = useRouter();

    // Handler for the search input change
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

 

    // Fetch blogs and apply filters when the component mounts or when any filter changes
    useEffect(() => {
        setIsShaking(true);

        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`/api/all-blogs`);

                if (response.data.success) {
                    setBlogs(response.data.blogs); // Store fetched blogs in the state
                    toast({
                        title: 'Success',
                        description: response.data.message,
                    });
                } else {
                    toast({
                        title: 'Error',
                        description: 'No blogs found.',
                        variant: 'destructive',
                    });
                }
            } catch (error) {
                console.error("Error fetching blogs", error);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch blogs.',
                    variant: 'destructive',
                });
            } finally {
                setIsShaking(false);
            }
        };

        fetchBlogs();
    }, []); // This only runs once on mount




    // Function to filter blogs based on current filters
    const filterBlogs = () => {
        let filtered = allBlogs;

        // Apply category filter
        if (category) {
            filtered = filtered.filter(blog => blog.blogcategory == category);
  
        }

        // Apply search query filter
        if (searchQuery) {
            filtered = filtered.filter(blog =>
                blog.blogtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.blogdescription.toLowerCase().includes(searchQuery.toLowerCase()) 
                
            );
        }

      

       
        setFilteredBlogs(filtered);

        console.log("filteredBlogs", filteredBlogs);
    };

    // Trigger filter on changes
    useEffect(() => {
        filterBlogs();
    }, [allBlogs, category,  searchQuery]); // Runs on changes to any of the filters

    return (
        <>
            <section className='w-full mx-auto px-4 py-36 bg-black text-white rounded-lg shadow-lg animate__animated animate__fadeIn'>
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate__animated animate__fadeIn">
                        Explore Our Blog {category} 
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate__animated animate__fadeIn animate__delay-1s">
                        Discover insightful articles, expert opinions, and the latest trends in technology, design, and development.
                    </p>
                    <div className="flex justify-center space-x-4 animate__animated animate__fadeIn animate__delay-2s">
                        <div className="bg-neutral-800 p-4 rounded-lg text-center">
                            <span className="block text-3xl font-bold text-white">500+</span>
                            <span className="text-gray-400">Articles</span>
                        </div>
                        <div className="bg-neutral-800 p-4 rounded-lg text-center">
                            <span className="block text-3xl font-bold text-white">50k+</span>
                            <span className="text-gray-400">Readers</span>
                        </div>
                        <div className="bg-neutral-800 p-4 rounded-lg text-center">
                            <span className="block text-3xl font-bold text-white">100+</span>
                            <span className="text-gray-400">Authors</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full mx-auto px-4 py-12 bg-white text-black rounded-lg shadow-lg animate__animated animate__fadeIn'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="w-full md:w-1/2">
                            <div className="relative">
                                <input
                                    type="search"
                                    id="searchInput"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-full p-4 pl-12 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                                    placeholder="Search articles..."
                                />
                                <svg
                                    className="absolute left-4 top-4 h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 w-full md:w-auto">
                            <select
                                id="categoryFilter"
                                value={category}
                                onChange={handleCategoryChange}
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                            >
                                <option value="">All Categories</option>
                                <option value="technology">Technology</option>
                                <option value="business">Business</option>
                                <option value="health">Health & Lifestyle</option>
                                <option value="travel">Travel</option>
                                <option value="politics">Politics</option>
                            </select>

                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full mx-auto px-4 py-12 bg-white text-black rounded-lg shadow-lg animate__animated animate__fadeIn '>
                <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-2 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-auto animate__animated animate__fadeIn animate__delay-1s">
                        {filteredBlogs.map((blog) => (
                            <Blogcard key={blog.blogid} blog={blog} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
