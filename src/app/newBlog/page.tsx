
'use client';

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { newblogSchema } from '@/schemas/newblog';
import axios, { AxiosError } from 'axios';
import { ApiResponce } from '@/types/ApiResponce';
import { Editor } from '@tinymce/tinymce-react'; // ✅ Correct TinyMCE import
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
  blogcatagory: string;
};

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const editorRef = useRef<any>(null); // ✅ Fixed TypeScript issue

  const form = useForm<BlogFormData>({
    resolver: zodResolver(newblogSchema),
    defaultValues: {
      blogtitle: '',
      blogdescription: '',
      blogcatagory: '',
    },
  });

  const handleSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('blogtitle', data.blogtitle);
    formData.append('blogdescription', data.blogdescription);
    formData.append('blogcatagory', data.blogcatagory);

    const content = editorRef.current ? editorRef.current.getContent() : ''; // ✅ Fetch content safely
    formData.append('blogcontent', content);

    if (blogImage) {
      formData.append('blogImage', blogImage);
    }

    try {
      await axios.post('/api/new-blog', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast({ title: 'Blog Created!', description: 'Your blog has been successfully created.' });
      router.push('/blog');
    } catch (error) {
      console.error('Error creating blog:', error);
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const serverResponse = axiosError.response.data as ApiResponce;
        const serverMessage = serverResponse.error?.[0] || serverResponse.message;
        toast({ title: 'Error', description: serverMessage || 'Blog creation failed.' });
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
            
            {/* Blog Title */}
            <FormField control={form.control} name="blogtitle" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Blog Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter blog title" {...field} className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                </FormControl>
                <FormDescription>Give your blog a title.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            {/* Blog Description */}
            <FormField control={form.control} name="blogdescription" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Blog Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter blog description" {...field} className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                </FormControl>
                <FormDescription>Describe the content of your blog.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            {/* Blog Category */}
            <FormField control={form.control} name="blogcatagory" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Blog Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select a category" /></SelectTrigger>
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
            )} />

            {/* Blog Image Upload */}
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Blog Image</FormLabel>
              <FormControl>
                <Input type="file" onChange={(e) => setBlogImage(e.target.files?.[0] || null)} className="mt-1 p-3 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500" />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Blog Content Editor */}
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Blog Content</FormLabel>
              <FormControl>
                <Editor
                  apiKey="YOUR_TINYMCE_API_KEY"
                  onInit={(_, editor) => (editorRef.current = editor)}
                  initialValue="<p>Start writing...</p>"
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: ['advlist autolink lists link image preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount'],
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | removeformat | image media code',
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Submit Button */}
            <Button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              {isSubmitting ? 'Submitting...' : 'Create Blog'}
            </Button>

          </form>
        </Form>
      </div>
    </div>
  );
}
