
'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import sanitizeHtml from 'sanitize-html';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import Image from 'next/image'; // Added import for Image

interface BlogPost {
  blogImage: any;
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

interface comment {
  comment: string;
  blogcommentowner: string;
  blogtitle: string;
  blogid: string;
}

interface PageProps {
  params: {
    slug: string;
  };
}

const formSchema = z.object({
  comment: z.string().min(3, { message: "Comment must be at least 3 characters" }),
});

export default function Page({ params }: PageProps) {
  const [isShaking, setIsShaking] = useState(false);
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<comment[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const slug = params.slug;
  const newSlug = slug.replace(/-/g, " "); // Changed let to const

  useEffect(() => {
    setIsShaking(true);

    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/add-views?slug=${slug}`);
        const response2 = await axios.get(`/api/all-comment?slug=${newSlug}`);

        if (response.data && response.data.blog) {
          setBlog(response.data.blog);
          setComments(response2.data.blogs);
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
  }, [slug, newSlug]);

  const customSanitizeOptions = {
    allowedTags: ['h1', 'h2', 'h3', 'h4', 'p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'u', 'img', 'br', 'blockquote', 'code'],
    allowedAttributes: {
      '*': ['class', 'style'],
      'a': ['href', 'target', 'rel'],
      'img': ['src', 'alt', 'width', 'height'],
    },
    allowedIframeHostnames: ['www.youtube.com', 'www.vimeo.com'],
    selfClosing: ['img', 'br'],
  };

  if (isShaking) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div className="text-center text-xl">Blog not found</div>;
  }

  const sanitizedContent = sanitizeHtml(blog.blogcontent, customSanitizeOptions);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const blogtitale = blog.blogtitle.trim().toLowerCase();
    const updatedata = { ...data, blogtitale };
    axios.post('/api/add-blog-comment', updatedata);
    toast({
      title: 'Success',
      description: 'Comment added successfully',
    });
  };

  return (
    <section className="pt-8 pb-16 lg:pt-16 lg:pb-24 mt-20 bg-white dark:bg-gray-900 antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <div
            className="relative w-full mt-5 sm:w-9/12 lg:w-full h-64 sm:h-80 lg:h-96 mx-auto bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${blog.blogImage})` }}
          ></div>

          <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic mt-10">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <Image
                  className="mr-4 w-16 h-16 rounded-full"
                  src={blog.authorImage}
                  alt={blog.author}
                  width={64}
                  height={64}
                />
                <div>
                  <a href={`/profile/${blog.author}`} rel="author" className="text-xl font-bold text-gray-900 dark:text-white">
                    {blog.author}
                  </a>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    Verified author OF BlogHub
                  </p>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    <time
                      dateTime={blog.createdAt}
                      title={new Date(blog.createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    >
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  </p>
                </div>
              </div>
            </address>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {blog.blogtitle}
            </h1>
          </header>

          <p className="lead text-lg text-gray-600 dark:text-gray-400">
            {blog.blogdescription}
          </p>

          <div className="prose w-full max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-black text-white m-9">Add Comment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] mx-auto">
              <DialogHeader>
                <DialogTitle>Add Comment</DialogTitle>
                <DialogDescription>Add your comment</DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField control={form.control} name="comment" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormDescription>Enter your comment</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full sm:w-auto">Submit</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <div className="text-3xl font-bold mb-2 ml-4 md:mt-12 bg-gray-50 dark:bg-gray-800">Comments</div>

          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="flex w-full p-4 max-w-lg flex-col rounded-lg bg-white shadow-sm border border-slate-200 my-6">
                <div className="flex items-center gap-4 text-slate-800">
                  <div className="flex w-full flex-col">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xl font-semibold text-slate-800">{comment.blogcommentowner}</h5>
                    </div>
                    <p className="text-xs uppercase font-bold text-slate-500 mt-0.5">@{comment.blogcommentowner}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-base text-slate-600 font-light leading-normal">{comment.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No comments yet.</p>
          )}
        </article>
      </div>
    </section>
  );
}
