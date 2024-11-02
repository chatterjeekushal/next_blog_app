import React from 'react';
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import blogs from "@/content/blog.json";

interface Blog {
    id: string | number; // Depending on how your IDs are structured
    imageupload: string;
    blogtitle: string;
    blogdescription: string;
    authorImage: string;
    author: string;
    date: string;
    blograting: number;
    slug: string;
}


export default async function Blog() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 mt-10">
            {blogs.map((blog: Blog) => (
                <CardContainer key={blog.id} className="inter-var w-80 md:w-full lg:w-full">
                    <CardBody className="bg-gray-100 relative group dark:bg-black dark:border-white/[0.2] border border-black/[0.1] sm:w-[30rem] h-auto rounded-xl p-6 shadow-sm dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
                        <CardItem translateZ="100" className="w-full mt-4">
                            <Image
                                src={blog.imageupload}
                                height="1000"
                                width="1000"
                                className="h-60 w-full object-cover rounded-xl group-hover:shadow-xl transition-shadow duration-300"
                                alt="thumbnail"
                            />
                        </CardItem>

                        {/* Blog Title */}
                        <CardItem translateZ="50" className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mt-4">
                            {blog.blogtitle}
                        </CardItem>

                        {/* Blog Content */}
                        <CardItem as="p" translateZ="60" className="text-neutral-700 dark:text-neutral-300 mt-2">
                            {blog.blogdescription}
                        </CardItem>

                        {/* Author Info */}
                        <div className="flex items-center mt-10">
                            <Image
                                src={blog.authorImage}
                                height="40"
                                width="40"
                                className="rounded-full mr-2"
                                alt="Author"
                            />
                            <div className="text-neutral-700 dark:text-neutral-300">
                                <p className="font-bold">{blog.author}</p>
                                <p className="text-xs">Uploaded on: {blog.date}</p>
                            </div>
                        </div>

                        {/* Blog Rating */}
                        <div className="flex items-center mt-2">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.round(blog.blograting) ? "text-yellow-500" : "text-yellow-800"}>&#9733;</span>
                            ))}
                            <span className="text-sm ml-2 text-neutral-600 dark:text-neutral-300">{blog.blograting}/5</span>
                        </div>

                        <div className="flex justify-end items-end mt-4">
    { /* Use a standard anchor tag for the link */ }
    <a
        href={`/blog/${blog.slug}`}
        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold transition-colors duration-300 hover:bg-gray-800 dark:hover:bg-gray-200"
    >
        Read More
    </a>
</div>

                    </CardBody>
                </CardContainer>
            ))}
        </div>
    );
}
