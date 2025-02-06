

import dbConnect from "@/lib/dbConnect";
import NewBlogModel from "@/model/newBlog";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import UserModel from "@/model/user";
import { v2 as cloudinary } from 'cloudinary';



// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
    public_id: string;
    url: string;  // Use the URL for storing the image URL
}

export async function POST(req: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);

    console.log("session", session);


    function formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const isAM = hours < 12;
        if (hours === 0) hours = 12; 
        else if (hours > 12) hours -= 12;
        const period = isAM ? 'AM' : 'PM';
        return `${day}/${month}/${year} ${hours}:${minutes} ${period}`;
    }


    const formData = await req.formData();
    const blogtitle = formData.get("blogtitle") as string;
    const blogcontent = formData.get("blogcontent");
    const blogdescription = formData.get("blogdescription");
    const blogImage = formData.get("blogImage") as File | null;
    const blogcatagory = formData.get("blogcatagory") as string;

    if (!blogtitle || !blogcontent || !blogdescription || !blogImage) {
        return new Response(
            JSON.stringify({ message: "Please fill all the fields" }),
            { status: 400 }
        );
    }



    const currentDate = new Date();

    // Format the current date
    const formattedDate = formatDate(currentDate);




    // Handle the image upload
    try {


        const bytes = await blogImage.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload the image to Cloudinary
        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto", 
                    folder: "blog-images", 
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result as CloudinaryUploadResult);
                }
            );
            uploadStream.end(buffer);
        });


        const user = await UserModel.findOne({ username: session?.user?.username || session?.user?.name });


        if (!user) {
            return new Response(
                JSON.stringify({ message: "User not found", success: false }),
                { status: 404 }
            );
        }

        console.log("user", user);


        const slug = blogtitle
        .replace(/[.?]/g, '-')         // Replace question marks and periods with hyphens
        .replace(/\s+/g, '-')          // Replace spaces with hyphens
        .toLowerCase();                // Convert to lowercase

        console.log("slug", slug);
      
        const existingBlog = await NewBlogModel.findOne({ slug: slug, blogtitle: blogtitle });
       
        if (existingBlog) {
            return new Response(
                JSON.stringify({ message: "Blog already exists, try another title.", success: false }),
                { status: 500 }
            );
        }else {
           
            const newBlog = new NewBlogModel({
                blogid: user?._id,
                blogtitle: blogtitle,
                blogdescription: blogdescription,
                blogcontent: blogcontent,
                blogcategory: blogcatagory,
                slug: slug,
                author: user?.username,
                authorImage: session?.user?.image || "default_image", 
                blogImage: result.url, 
                date: formattedDate, // Use formattedDate instead of currentDate
            });
            
         
             // Save the new blog to the database
             await newBlog.save();

            return new Response(
                JSON.stringify({ message: "Blog created successfully", blogImage: result.url }),
                { status: 200 }
            );
        }


    } catch (error) {
        console.error("Error while uploading the image:", error);
        return new Response(
            JSON.stringify({ message: "An error occurred while uploading the image." }),
            { status: 500 }
        );
    }
}
