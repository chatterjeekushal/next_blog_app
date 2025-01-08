
'use client'

import React, { useState, useRef } from 'react'
import * as z from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { newblogSchema } from '@/schemas/newblog'
import axios, { AxiosError } from 'axios'
import { ApiResponce } from '@/types/ApiResponce'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'

import { Editor } from '@tinymce/tinymce-react'

function Page() {
    const { toast } = useToast()
    const router = useRouter()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [blogImage, setBlogImage] = useState<File | null>(null)

    const editorRef = useRef<any>(null)

    // zod form validation schema
    const form = useForm({
        resolver: z.zodResolver(newblogSchema),
        defaultValues: {
            blogtitle: "",
            blogdescription: "",
            blogcontent: "",
           
                      
        }
    })

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true)

        // get the editor content
        const content = editorRef.current.getContent()

        const formData = new FormData()

        // Append the data to the FormData
        formData.append('blogtitle', data.blogtitle)
        formData.append('blogdescription', data.blogdescription)
        formData.append('blogcontent', content)
        
        // Make sure blogImage is attached before sending it
        if (blogImage) {
            formData.append('blogImage', blogImage)
        }

        console.log("data", formData)

        try {
            // Send data to your backend using axios with FormData
            const response = await axios.post('/api/new-blog', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Make sure this is set
                }
            })

            console.log("response", response)

            toast({
                title: 'Blog Created!',
                description: 'Your blog has been successfully created.',
            })

          
        } catch (error) {
            console.log("error in creating blog", error)

            const axiosError = error as AxiosError

            if (axiosError.response) {
                const serverResponse = axiosError.response.data as ApiResponce
                const serverMessage = serverResponse.error?.[0] || serverResponse.message

                if (serverMessage) {
                    toast({ title: 'Error', description: serverMessage })
                } else {
                    toast({ title: 'Error', description: "Blog creation failed." })
                }
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-50 py-12 px-4 sm:px-6 md:px-8 lg:px-10 mt-64 md:mt-96">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Create New Blog</h1>

            <div className="flex flex-col items-center justify-center w-full">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-full max-w-3xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 bg-white rounded-lg shadow-lg p-8">

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
                                            className="mt-2 p-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
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
                                            className="mt-2 p-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-gray-500">
                                        Describe the content of your blog.
                                    </FormDescription>
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
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            setBlogImage(file)
                                        }
                                    }}
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
                                            onInit={(_evt, editor) => editorRef.current = editor}
                                            initialValue="<p>This is the initial content of the editor.</p>"
                                            init={{
                                                height: 500,
                                                menubar: false,
                                                plugins: [
                                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                                ],
                                                toolbar: 'undo redo | blocks | ' +
                                                    'bold italic forecolor | alignleft aligncenter ' +
                                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                                    'removeformat | help',
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                            }}
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
                            className="w-full mt-4 mb-4 md:mb-20 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            {isSubmitting ? 'Submitting...' : 'Create Blog'}
                        </Button>

                    </form>
                </Form>

            </div>

        </div>
    )
}

export default Page
