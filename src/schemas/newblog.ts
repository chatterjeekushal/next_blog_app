

import { z } from "zod";


export const newblogSchema =z.object({
    
    blogtitle: z
    .string()
    .min(3, {message: "Blogtitle must be at least 3 characters"} )
    .max(100, { message: "Blogtitle must be less than 20 characters" })
    .trim(),


    blogdescription: z
    .string()
    .min(3, {message: "Blogdescription must be at least 3 characters"} )
    .max(100, { message: "Blogdescription must be less than 100 characters" })
    .trim(),

    blogcontent: z
    .string()
    
    .max(1000, { message: "Blogcontent must be less than 1000 characters" })
    .trim(),

    

})
