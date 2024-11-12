

'use client'

import React from 'react'
import * as z from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from 'next/link'

import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { singInSchema } from '@/schemas/singInSchema'




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

function page() {

    const [isSubmiting, setIsSubmiting] = React.useState(false)

    const { toast } = useToast()

    const router = useRouter()

    // zod implementation

    const form = useForm({
        resolver: z.zodResolver(singInSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const onsubmit = async (data: any) => {

        const result = await signIn('credentials', { username: data.username, password: data.password, redirect: false })

        if (result?.error) {

            toast({
                title: 'Login failed',
                description: result.error,
                variant: 'destructive'
            })
        }

        if (result?.url) {

            toast({
                title: 'Login success',
                description: "You are logged in",
                variant: 'default'
            })

            router.replace("/dashboard")

        }

    }

    return (
        
        <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Join Mistry</h1>
          <p className="text-gray-600 text-lg">Sign In to start your journey</p>
        </div>
  
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
  
  
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                      className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
  
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
                  <FormDescription className="text-sm text-gray-500">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <Button
              type="submit"
              disabled={isSubmiting}
              className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
            Signin 
            </Button>
          </form>
        </Form>
  
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="text-indigo-600 hover:text-indigo-800">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
  
    )
}

export default page
