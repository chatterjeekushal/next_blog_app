

'use client';

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { newblogSchema } from '@/schemas/newblog';
import axios, { AxiosError } from 'axios';
import { ApiResponce } from '@/types/ApiResponce';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
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

type BlogFormData = {
  blogtitle: string;
  blogdescription: string;
  blogcontent: string;
  blogcatagory: string;
};

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');

  // Zod form validation schema
  const form = useForm<BlogFormData>({
    resolver: zodResolver(newblogSchema),
    defaultValues: {
      blogtitle: '',
      blogdescription: '',
      blogcontent: '',
      blogcatagory: '',
    },
  });

  // Handle editor content changes
  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  // Handle form submission
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
      await axios.post('/api/new-blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: 'Blog Created!',
        description: 'Your blog has been successfully created.',
      });

      router.push('/blog'); // Redirect after successful blog creation
    } catch (error) {
      console.error('Error creating blog:', error);
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const serverResponse = axiosError.response.data as ApiResponce;
        const serverMessage = serverResponse.error?.[0] || serverResponse.message;

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
            {/* Blog Title Field */}
            <FormField
              control={form.control}
              name="blogtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Blog Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter blog title"
                      {...field}
                      className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Give your blog a title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Blog Description Field */}
            <FormField
              control={form.control}
              name="blogdescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Blog Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter blog description"
                      {...field}
                      className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Describe the content of your blog.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Blog Category Field */}
            <FormField
              control={form.control}
              name="blogcatagory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Blog Category</FormLabel>
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

            {/* Blog Image Field */}
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Blog Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setBlogImage(file);
                    }
                  }}
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Blog Content Field */}
            <FormField
              control={form.control}
              name="blogcontent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Blog Content</FormLabel>
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
                          'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | media | image|code ',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                      }}
                      onEditorChange={handleEditorChange}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Enter the full content for your blog.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            >
              {isSubmitting ? 'Submitting...' : 'Create Blog'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
