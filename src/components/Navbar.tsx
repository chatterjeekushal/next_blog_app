'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    // Remove unused imports
    // SheetClose,
    // SheetFooter,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "./Theme-btn";
import LoadingBar from 'react-top-loading-bar';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
function Navbar() {
    const [progress, setProgress] = useState(0);
    const pathname = usePathname();

    useEffect(() => {
        setProgress(30);
        setTimeout(() => setProgress(70), 100);
        setTimeout(() => setProgress(100), 400);
        return () => { };
    }, [pathname]);

    useEffect(() => {
        setTimeout(() => setProgress(0), 500);
    }, []);

    const isActive = (path: string) => pathname === path;


    const { data: session } = useSession()

    const user: User = session?.user as User

    console.log("user", user)
    console.log("session", session?.user.email)

    const imageSrc = session?.user?.image || session?.user?.userImage || '/default-avatar.png';


    return (
        <nav className="bg-white/[0.95] backdrop-blur-sm dark:bg-gray-900 fixed w-full z-40 top-0 start-0 border-b border-gray-200 dark:border-gray-600 ">
            <LoadingBar color='#BF77F6' height={3} progress={progress} />
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
                <div className="flex items-center md:order-2 space-x-6 md:space-x-0 rtl:space-x-reverse">

                    <Avatar className='mr-5 hidden md:block md:w-10 h-10'>
                        <AvatarImage src={`${imageSrc}`} alt="@shadcn" />
                        <AvatarFallback>cn</AvatarFallback>
                    </Avatar>

                    <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button asChild className='hidden md:block'>
                            <Link href="/signup">Signup</Link>
                        </Button>

                        {session?.user ? (<> <Button onClick={() => signOut()} className="text-white bg-black hover:bg-red-600 px-4 py-2 rounded-md">
                            Logout
                        </Button></>) : (<> <Button asChild className=''>
                            <Link href="/sign-in">Login</Link>
                        </Button></>)}

                        <ModeToggle />
                    </div>

                    <Sheet>
                        <SheetTrigger>
                            <div className='mr-0 md:mr-5 '>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:hidden">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </div>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Blog Menu</SheetTitle>
                                <SheetDescription>
                                    <div className="p-4 flex flex-col justify-center items-center rounded-lg bg-white dark:bg-gray-800">
                                        <ul className="flex flex-col gap-9 mt-4 justify-center items-center text-sm font-bold text-gray-700 dark:text-gray-300">
                                            <li>
                                                <Link href="/" className={`hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-200 ${isActive('/') ? 'text-blue-700' : 'dark:text-gray-300'}`}>Home</Link>
                                            </li>
                                            <li>
                                                <Link href="/about" className={`hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-200 ${isActive('/about') ? 'text-blue-700' : 'dark:text-gray-300'}`}>About</Link>
                                            </li>
                                            <li>
                                                <Link href="/blog" className={`hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-200 ${isActive('/blog') ? 'text-blue-700' : 'dark:text-gray-300'}`}>Blog</Link>
                                            </li>
                                            <li>
                                                <Link href="/dashboard" className={`hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors duration-200 ${isActive('/contact') ? 'text-blue-700' : 'dark:text-gray-300'}`}>Dashboard</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="flex justify-center items-center mt-4 space-x-3 rtl:space-x-reverse">
                                        <Button asChild>
                                            <Link href="/signup" className="text-gray-700 dark:bg-black dark:text-gray-300 hover:text-neutral-500 dark:hover:text-neutral-400">Signup</Link>
                                        </Button>
                                        <Button asChild className='md:hidden'>
                                            <Link href="/login" className="text-gray-700 dark:bg-black dark:text-gray-300 hover:text-neutral-500 dark:hover:text-neutral-400">Login</Link>
                                        </Button>
                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="items-center justify-center hidden w-full md:flex md:w-auto md:order-1 2xl:space-x-4" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 text-lg">
                        <li>
                            <Link href="/" className={`block py-2 px-3 rounded md:p-0 ${isActive('/') ? ' text-purple-600' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:text-black'} md:dark:text-blue-500`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className={`block py-2 px-3 rounded md:p-0 ${isActive('/about') ? ' text-purple-600' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:text-black'} md:dark:text-white`}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" className={`block py-2 px-3 rounded md:p-0 ${isActive('/blog') ? ' text-purple-600' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:text-black'} md:dark:text-white`}>
                                Blogs
                            </Link>
                        </li>
                        
                        <li>
                            <Link href="/dashboard" className={`block py-2 px-3 rounded md:p-0 ${isActive('/dashboard') ? ' text-purple-600' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:text-black'} md:dark:text-white`}>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className={`block py-2 px-3 rounded md:p-0 ${isActive('/contact') ? ' text-purple-600' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:text-black'} md:dark:text-white`}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
