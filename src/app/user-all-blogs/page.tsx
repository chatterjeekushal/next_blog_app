
'use client'

import React, { useEffect , useState} from 'react'
import * as z from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from 'next/link'
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { singupSchema } from '@/schemas/singupSchema'
import axios, { AxiosError } from 'axios'
import { ApiResponce } from '@/types/ApiResponce'


interface blogs {
    blogid: string | number
    blogtitle: string
    blogdescription: string
    blogcontent: string
    authorImage: string
    author: string
    date: string
    blogImage: string
    slug: string
    viewCount: number
    likes: number
}




const CardComponent = () => {


    const [userallblog, setBlogs] = useState<blogs[]>([]);


useEffect(()=>{

    const userallcard = async()=>{

        try {
            
            const response = await axios.get(`/api/user-all-blogs`);

            console.log("response", response);

            setBlogs(response.data.blogs);

            console.log("allblogs", userallblog);

        } catch (error) {
            
            console.log("error in singup", error);

        }
    
    }

    userallcard()

},[])


return (

<div className='flex flex-col justify-center items-center mt-28'>
  
<h1 className='text-3xl font-bold mb-4'>Your Blogs</h1>

  <div className="flex flex-wrap justify-start items-center">

    {userallblog.map((blog) => (
      <div className="flex justify-center items-center w-full sm:w-1/2 lg:w-1/3 p-4">
        <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full">
          <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
            <img 
              src={blog.blogImage} 
              alt={blog.blogtitle} 
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4">
            <h6 className="mb-2 text-slate-800 text-xl font-semibold">
              {blog.blogtitle}
            </h6>
            <p className="text-slate-600 leading-normal font-light">
              {blog.blogdescription}
            </p>
          </div>
          <div className="px-4 pb-4 pt-0 mt-2">
            <button 
              className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
              type="button"

            >
              <Link href={`/blog/${blog.slug}`}>Read More</Link>
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>

  <div/>

</div>
);


 
};

export default CardComponent;
