
'use client'

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

interface Blog {
    blogid: string | number;
    blogtitle: string;
    blogdescription: string;
    blogcontent: string;
    authorImage: string;
    author: string;
    date: string; // Date is stored as string from the backend
    blogImage: string;
    slug: string;
    viewCount: number;
    likes: number;
}

export default function Blog() {
    const [isShaking, setIsShaking] = useState(false);
    const [allBlogs, setBlogs] = useState<Blog[]>([]);
    const { toast } = useToast();
    const router = useRouter();

    // Function to format date and time
    const formatDate = (dateString: string) => {
        const date = new Date(dateString); // Convert the date string into a Date object
        const optionsDate: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-GB', optionsDate); // Format date as dd/mm/yy

        const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedTime = date.toLocaleTimeString('en-GB', optionsTime); // Format time as hh:mm AM/PM

        return `${formattedDate} : ${formattedTime}`;
    };

    // UseEffect hook to fetch blogs asynchronously
    useEffect(() => {
        setIsShaking(true);

        // Async function to fetch blog data
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`/api/all-blogs`);

                if (response.data.success) {
                    setBlogs(response.data.blogs);  // Store fetched blogs in the state

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
    }, []); // Empty dependency array ensures this runs once when component mounts

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 mt-10">
            {allBlogs.length === 0 ? (
                <div className="col-span-full text-center text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                    No blogs available
                </div>
            ) : (
                allBlogs.map((blog: Blog) => (
                    <CardContainer key={blog.blogid} className="inter-var w-full md:w-full lg:w-full">
                        <CardBody className="bg-gray-100 relative group dark:bg-black dark:border-white/[0.2] border border-black/[0.1] sm:w-[30rem] h-auto rounded-xl p-6 shadow-sm dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
                            <CardItem translateZ="100" className="w-full mt-4">
                                <Image
                                    src={blog.blogImage.startsWith('http') || blog.blogImage.startsWith('https')
                                        ? blog.blogImage
                                        : `/${blog.blogImage}`}   // Handle missing image scenario
                                    height={1000}
                                    width={1000}
                                    className="h-60 w-full object-cover rounded-xl group-hover:shadow-xl transition-shadow duration-300"
                                    alt="thumbnail"
                                />
                            </CardItem>

                            {/* Blog Title */}
                            <CardItem translateZ="50" className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mt-4">
                                {blog.blogtitle}
                            </CardItem>

                            {/* Blog Description */}
                            <CardItem as="p" translateZ="60" className="text-neutral-700 dark:text-neutral-300 mt-2">
                                {blog.blogdescription}
                            </CardItem>

                            {/* Author Info */}
                            <div className="flex items-center mt-10">
                                <Image
                                    src={blog.authorImage.startsWith('http') || blog.authorImage.startsWith('https')
                                        ? blog.authorImage
                                        : `/${blog.authorImage}`}
                                    height={40}
                                    width={40}
                                    className="rounded-full mr-2"
                                    alt="Author"
                                />
                                <div className="text-neutral-700 dark:text-neutral-300">
                                    <p className="font-bold">{blog.author}</p>
                                    <p className="text-xs">Uploaded on: {formatDate(blog.date)}</p>
                                </div>
                            </div>

                            {/* Like and Views */}
                            <div className="flex justify-start gap-5 items-center mt-4">
                                {/* Likes */}
                                <div className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                                    </svg>
                                    <span>599</span>
                                </div>

                                {/* Views */}
                                <div className="flex items-center text-sm text-neutral-700 dark:text-neutral-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 5c-7.18 0-13 5.82-13 13s5.82 13 13 13 13-5.82 13-13-5.82-13-13-13zm0 24c-6.08 0-11-4.92-11-11s4.92-11 11-11 11 4.92 11 11-4.92 11-11 11zm0-15c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path>
                                    </svg>
                                    <span>{blog.viewCount}</span>
                                </div>
                            </div>

                            <div className="flex justify-end items-end mt-4">
                                <a
                                    href={`/blog/${blog.slug}`}
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold transition-colors duration-300 hover:bg-gray-800 dark:hover:bg-gray-200"
                                >
                                    Explore Blog
                                </a>
                            </div>
                        </CardBody>
                    </CardContainer>



                ))
            )}
        </div>
    );
}
