
'use client'

import React from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { verifySchema } from '@/schemas/verifySchema'
import axios, { AxiosError } from 'axios'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { Button } from "@/components/ui/button"

function Page() {
    const params = useParams<{ username: string }>()
    console.log("username", params.username)

    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<{ code: string }>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            code: "",
        },
    })

    const onSubmit = async (data: { code: string }) => {
        console.log("data", data.code)
        try {
            const response = await axios.post('/api/verify-code', { username: params.username, code: data.code })

            router.replace(`/sign-in`)

            toast({
                title: 'Success',
                description: response.data.message,
            })
        } catch (error) {
            console.log("Error in verify code", error)

            const axiosError = error as AxiosError<{ message?: string }>
            const errorMessage = axiosError.response?.data?.message || 'Something went wrong'

            console.log("Error message", errorMessage)

            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'destructive',
            })
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-700">Enter your OTP</h2>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium text-gray-700">One-Time Password</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup className="flex justify-between space-x-2">
                                                {[...Array(6)].map((_, index) => (
                                                    <InputOTPSlot 
                                                        key={index} 
                                                        index={index} 
                                                        className="w-12 h-12 border border-gray-300 rounded text-center text-xl font-semibold" 
                                                    />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription className="mt-2 text-sm text-gray-500">
                                        Please enter the one-time password sent to your phone.
                                    </FormDescription>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page