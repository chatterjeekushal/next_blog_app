

'use client';

import React, { useState, useRef } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { newblogSchema } from '@/schemas/newblog';
import axios, { AxiosError } from 'axios';
import { ApiResponce } from '@/types/ApiResponce';
import { Editor } from '@tinymce/tinymce-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

// Define type for form data based on schema
type BlogFormData = z.infer<typeof newblogSchema>;

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const editorRef = useRef<Editor | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');

  const form = useForm<BlogFormData>({
    resolver: zodResolver(newblogSchema),
    defaultValues: {
      blogtitle: '',
      blogdescription: '',
      blogcontent: '',
      blogcatagory: '',
    },
  });

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  // Define proper types for `data`
  const handleSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('blogtitle', data.blogtitle);
    formData.append('blogdescription', data.blogdescription);
    formData.append('blogcontent', editorContent); // Use editor content
    formData.append('blogcatagory', data.blogcatagory);

    if (blogImage) {
      formData.append('blogImage', blogImage);
    }

    try {
      const response = await axios.post('/api/new-blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: 'Blog Created!',
        description: 'Your blog has been successfully created.',
      });

      router.push('/blog');
    } catch (error) {
      console.error('Error creating blog:', error);
      const axiosError = error as AxiosError<ApiResponce>;

      if (axiosError.response) {
        const serverMessage = axiosError.response.data.error?.[0] || axiosError.response.data.message;

        toast({
          title: 'Error',
          description: serverMessage || 'Blog creation failed.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 lg:pt-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Blog</h1>

      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="blogtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormDescription>Give your blog a title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="blogdescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog description" {...field} />
                  </FormControl>
                  <FormDescription>Describe the content of your blog.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="blogcatagory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="health">Health & Lifestyle</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="politics">Politics</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Blog Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setBlogImage(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="blogcontent"
              render={() => (
                <FormItem>
                  <FormLabel>Blog Content</FormLabel>
                  <FormControl>
                    <Editor
                      apiKey="7i6hkkszamf97bvcdsd1r8b2f4hnfbfy113b17sulfit8hyc"
                      onInit={(_evt, editor) => (editorRef.current = editor)}
                      initialValue="<p>This is the initial content of the editor.</p>"
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          'advlist',
                          'autolink',
                          'lists',
                          'link',
                          'image',
                          'charmap',
                          'preview',
                          'anchor',
                          'searchreplace',
                          'visualblocks',
                          'code',
                          'fullscreen',
                          'insertdatetime',
                          'media',
                          'table',
                          'code',
                          'help',
                          'wordcount',
                        ],
                        toolbar:
                          'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | media | image|code ',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                      }}
                      onEditorChange={handleEditorChange}
                    />
                  </FormControl>
                  <FormDescription>Enter the full content for your blog.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white">
              {isSubmitting ? 'Submitting...' : 'Create Blog'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
