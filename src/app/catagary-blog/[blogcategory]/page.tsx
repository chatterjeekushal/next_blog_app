
'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

interface BlogPost {
  blogImage: string; // Update this with a more specific type than `any`
  slug: string;
  blogtitle: string;
  blogdescription: string;
  blogcategory: string;
  blogcontent: string;
  author: string;
  blogid: string;
  date: string;
  viewCount: number;
  likes: number;
  createdAt: string;
  authorImage: string;
}

interface PageProps {
  params: {
    blogcategory: string;
  };
}

export default function Page({ params }: PageProps) {
  const [blog, setBlog] = useState<BlogPost | null>(null); // Optional: You can use this later to set the fetched data

  const { toast } = useToast(); // You can use this to show a toast message later if needed

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/catagory-blog?blogcategory=${params.blogcategory}`);
        console.log("response", response.data);
        // Assuming you want to set the blog data here
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog', error);
        toast({ title: 'Error', description: 'Failed to fetch blog data', variant: 'destructive' });
      }
    };

    fetchBlog();
  }, [params.blogcategory]);

  return (
    <>
      <h1>Blog Category: {params.blogcategory}</h1>
      {blog && (
        <div>
          <h2>{blog.blogtitle}</h2>
          <p>{blog.blogdescription}</p>
          <p>{blog.blogcontent}</p>
        </div>
      )}
    </>
  );
}
