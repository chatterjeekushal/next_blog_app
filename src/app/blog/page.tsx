'use client'

import React, { useEffect } from 'react';
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
    date: string;
    blogImage: string;
    slug: string;
}

export default function Blog() {
    const [isShaking, setIsShaking] = React.useState(false);
    const [allBlogs, setBlogs] = React.useState<Blog[]>([]);
    const { toast } = useToast();
    const router = useRouter();

    // UseEffect hook to fetch blogs asynchronously
    useEffect(() => {
        setIsShaking(true);

        // Async function to fetch blog data
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`/api/all-blogs`);

                setBlogs(response.data.blogs);  // Store fetched blogs in the state

                console.log("response", response);

                toast({
                    title: 'Success',
                    description: response.data.message,
                });
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
                    No blogs here
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
                                    <p className="text-xs">Uploaded on: {blog.date}</p>
                                </div>
                            </div>

                            <div className="flex justify-end items-end mt-4">
                                <a
                                    href={`/blog/${blog.slug}`}
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold transition-colors duration-300 hover:bg-gray-800 dark:hover:bg-gray-200"
                                >
                                    Read More
                                </a>
                            </div>
                        </CardBody>
                    </CardContainer>
                ))
            )}
        </div>
    );
}
