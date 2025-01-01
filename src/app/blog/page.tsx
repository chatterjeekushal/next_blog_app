
'use client'

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
       
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 mt-20 ml-4 lg:ml-10">
    {allBlogs.length === 0 ? (
        <div className="col-span-full text-center text-xl font-semibold text-neutral-700 dark:text-neutral-300">
            No blogs available
        </div>
    ) : (
        allBlogs.map((blog: Blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug}>
                <div className="relative flex flex-col my-6 bg-white dark:bg-neutral-800 shadow-sm border border-slate-200 dark:border-neutral-700 rounded-lg w-96">
                    <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                        <img 
                            src={`${blog.blogImage}`}
                            alt="card-image" 
                        />
                    </div>
                    <div className="p-4">
                        <div className="mb-4 rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
                            POPULAR
                        </div>
                        <h6 className="mb-2 text-slate-800 dark:text-neutral-100 text-xl font-semibold">
                            {blog.blogtitle}
                        </h6>
                        <p className="text-slate-600 dark:text-neutral-300 leading-normal font-light">
                            {blog.blogdescription}
                        </p>
                    </div>
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <img
                                alt="Tania Andrew"
                                src={`${blog.authorImage}`}
                                className="relative inline-block h-8 w-8 rounded-full"
                            />
                            <div className="flex flex-col ml-3 text-sm">
                                <span className="text-slate-800 dark:text-neutral-100 font-semibold">{blog.author}</span>
                                <span className="text-slate-600 dark:text-neutral-300">{formatDate(blog.date)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        ))
    )}
</div>

    );
}
