

'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import sanitizeHtml from 'sanitize-html';
import { Button } from "@/components/ui/button"

import { useRouter } from 'next/navigation';

import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"

interface BlogPost {
    blogImage: any;
    slug: string;
    blogtitle: string;
    blogdescription: string;
    blogcategory: string
    blogcontent: string;
    author: string;
    blogid: string;
    date: string;
    viewCount: number;
    likes: number;
    createdAt: string;
    authorImage: string
  }

  interface PageProps {
    params: {
      blogcategory: string;
    };
  }

  export default function Page({ params }: PageProps) {

    const [blog, setBlog] = useState<BlogPost | null>(null);

    const { toast } = useToast();

    const [isShaking, setIsShaking] = useState(false);

    
  const router = useRouter();

  const blogcategory = params.blogcategory;

  useEffect(() => {

    setIsShaking(true);

    const fetchBlog = async () => {

        try {

            const response = await axios.get(`/api/catagory-blog?blogcategory=${blogcategory}`);

            console.log("response", response);
            
        } catch (error) {
            
            console.error('Error fetching blog', error);
        }finally{

            setIsShaking(false);
        }

    }

    fetchBlog();

  },[])


  return (

    <>
    
    <h1>blog catagory</h1>

    </>

  )


  }