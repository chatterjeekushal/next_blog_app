
'use client'

import React, { useEffect } from 'react'
import * as z from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from 'next/link'
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { singupSchema } from '@/schemas/singupSchema'
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
import { signIn } from 'next-auth/react'

type FormData = {
    username: string;
    email: string;
    password: string;
};

function Page() {
    const [username, setUsername] = React.useState('')
    const [usernameMessage, setUsernameMessage] = React.useState('')
    const [isChecking, setIsChecking] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const debounced = useDebounceCallback(setUsername, 300)

    // React Hook Form setup with Zod validation
    const form = useForm<FormData>({
        resolver: z.zodResolver(singupSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })

    useEffect(() => {
        const checkUsername = async () => {
            if (username) {
                setIsChecking(true)
                setUsernameMessage('')
                try {
                    const response = await axios.get(`/api/check-username-unique?username=${username}`)
                    setUsernameMessage(response.data.message)
                } catch (error) {
                    const axiosError = error as AxiosError;
                    if (axiosError.response) {
                        const serverResponse = axiosError.response.data as ApiResponce;
                        const serverMessage = serverResponse.error?.[0] || serverResponse.message;
                        setUsernameMessage(serverMessage || "An unexpected error occurred");
                    } else {
                        setUsernameMessage("Network or request error occurred");
                    }
                } finally {
                    setIsChecking(false)
                }
            }
        }
        checkUsername()
    }, [username])

    const onsubmit = async (data: FormData) => {
        setIsSubmitting(true)

        try {
            await axios.post('/api/sign-up', data)
            toast({
                title: 'Success',
                description: "User created successfully",
            })
            router.replace(`/verify/${data.username}`)
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                const serverResponse = axiosError.response.data as ApiResponce;
                const serverMessage = serverResponse.error?.[0] || serverResponse.message;
                toast({ title: 'Error', description: serverMessage || "User not created" })
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-semibold text-gray-800">Join Mistry</h1>
                <p className="text-gray-600 text-lg">Sign up to start your journey</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
                    {/* Username field */}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Username"
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            debounced(e.target.value);
                                        }}
                                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </FormControl>
                                {isChecking ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                                    </svg>
                                ) : (
                                    <p className={`text-sm mt-2 ${usernameMessage === "Username is unique" ? 'text-green-500' : 'text-red-500'}`}>
                                        {usernameMessage}
                                    </p>
                                )}
                                <FormDescription className="text-sm text-gray-500">
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Email"
                                        {...field}
                                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password field */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                        className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {isSubmitting ? '...please wait' : 'Sign Up'}
                    </Button>
                </form>
            </Form>

            {/* GitHub Sign-In Button */}
            <div className="mt-4">
                <Button
                    onClick={() => signIn('github', { redirect: false })}
                    className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                    Sign in with GitHub
                </Button>
            </div>

            {/* Already have an account */}
            <div className="mt-4 text-center">
                <p className="text-gray-600 text-sm">
                    Already have an account?{' '}
                    <Link href="/sign-in" className="text-indigo-600 hover:text-indigo-800">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Page;
