
'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import sanitizeHtml from 'sanitize-html';
import { Button } from "@/components/ui/button"


import { useRouter } from 'next/navigation';

import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"

interface BlogPost {
  slug: string;
  blogtitle: string;
  blogdescription: string;
  blogcontent: string;
}

interface PageProps {
  params: {
    slug: string;
  };
}

const formSchema = z.object({
  comment: z.string().min(3, { message: "Comment must be at least 3 characters" })
})

export default function Page({ params }: PageProps) {
  const [isShaking, setIsShaking] = useState(false);
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const slug = params.slug;

  useEffect(() => {
    setIsShaking(true);

    // Async function to fetch blog data
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/add-views?slug=${slug}`);

        if (response.data && response.data.blog) {
          setBlog(response.data.blog);
          toast({
            title: 'Success',
            description: response.data.message,
          });
        }
      } catch (error) {
        console.error('Error fetching blog', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch blog.',
          variant: 'destructive',
        });
      } finally {
        setIsShaking(false);
      }
    };

    fetchBlog();
  }, [slug]); // Re-run effect when slug changes

  // Customize the sanitization process
  const customSanitizeOptions = {
    allowedTags: ['h1', 'h2', 'h3', 'h4', 'p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'u', 'img', 'br', 'blockquote', 'code'],
    allowedAttributes: {
      '*': ['class', 'style'], // Allow class and style attributes for all tags
      'a': ['href', 'target', 'rel'], // Allow specific attributes for <a> tag
      'img': ['src', 'alt', 'width', 'height'], // Allow image-specific attributes
    },
    allowedIframeHostnames: ['www.youtube.com', 'www.vimeo.com'], // Allow embedded iframes from these sites
    selfClosing: ['img', 'br'], // Make sure self-closing tags like <img> and <br> are allowed
  };

  // Show loading state while fetching data
  if (isShaking) {
    return <div>Loading...</div>;
  }

  // Handle case where blog isn't found
  if (!blog) {
    return <div className="text-center text-xl">Blog not found</div>;
  }

  // Sanitize the blog content before displaying it
  const sanitizedContent = sanitizeHtml(blog.blogcontent, customSanitizeOptions);



  // Handle form submission
  const onSubmit = (data: any) => {
   
    let blogtitale= blog.blogtitle.trim();

    let updatedata = {...data, blogtitale:blogtitale};
    
    console.log('Form submitted with data:', updatedata);
    // Handle form submission logic here

    const responce = axios.post('/api/add-blog-comment', updatedata)

    toast({
      title: 'Success',
      description: 'Comment added successfully',
    });

  };

  
  return (
    <section className="bg-white w-full mt-20 min-h-screen m-auto border-t-4 dark:bg-gray-900">
      {/* Dialog for Editing Profile */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className='bg-black text-white'>Add Comment</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle> Add Comment </DialogTitle>
            <DialogDescription>
              Add your comment
            </DialogDescription>
          </DialogHeader>

          {/* Form inside dialog */}
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your comment
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="py-8 px-4 w-full mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="flex flex-col justify-center items-start space-y-6 sm:space-y-8 lg:space-y-12">
          <h2 className="text-4xl w-full font-extrabold text-gray-900 dark:text-white">
            {blog.blogtitle}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {blog.blogdescription}
          </p>

          <div className="prose w-full max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
        </div>
      </div>
    </section>
  );
}

