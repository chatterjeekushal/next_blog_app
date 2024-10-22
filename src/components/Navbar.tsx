'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


import { Button } from "@/components/ui/button";

import { ModeToggle } from "./Theme-btn";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-40 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="flex space-x-3 rtl:space-x-reverse">
                <Button asChild>
                    <Link href="/signup">Signup</Link>
                </Button>
                <Button asChild className='hidden md:block'>
                    <Link href="/login">Login</Link>
                </Button>
                <ModeToggle />
            </div>

            <Sheet>
                <SheetTrigger>
                
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Blog Menu</SheetTitle>
                        <SheetDescription>
                            <div className="p-4 flex flex-col justify-center items-center rounded-lg bg-white dark:bg-gray-800">
                                <ul className="flex flex-col gap-10 mt-4 justify-center items-center text-sm font-bold text-gray-700 dark:text-gray-300">
                                    <li>
                                        <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-neutral-500 dark:hover:text-neutral-400 hover:border-b-2 hover:border-black dark:hover:border-gray-600 transition-colors duration-200">Home</Link>
                                    </li>
                                    <li>
                                        <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-neutral-500 dark:hover:text-neutral-400 hover:border-b-2 hover:border-black dark:hover:border-gray-600 transition-colors duration-200">About</Link>
                                    </li>
                                    <li>
                                        <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-neutral-500 dark:hover:text-neutral-400 hover:border-b-2 hover:border-black dark:hover:border-gray-600 transition-colors duration-200">Blog</Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-neutral-500 dark:hover:text-neutral-400 hover:border-b-2 hover:border-black dark:hover:border-gray-600 transition-colors duration-200">Contact</Link>
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
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <Link href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                        About
                    </Link>
                </li>
                <li>
                    <Link href="/blog" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                        Blog
                    </Link>
                </li>
                <li>
                    <Link href="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
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
