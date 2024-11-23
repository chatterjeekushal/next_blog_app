
import dbConnect from "@/lib/dbConnect";

import NewBlogModel from "@/model/newBlog";

import { getServerSession } from "next-auth/next"

import { authOptions } from "@/app/api/auth/[...nextauth]/options"

import UserModel from "@/model/user";

export async function POST(req: Request) {

    await dbConnect();

    const session = await getServerSession(authOptions)

    console.log("session", session);

    try {

        // Get the data from the request
        const { blogtitle, blogcontent, blogdescription,blogImage } = await req.json();

  
        const user = await UserModel.findOne({ username: session?.user?.username || session?.user?.name });

        if (!user) {
            return Response.json({ message: "User not found", success: false }, { status: 404 },);
        }

        console.log("user", user);


        const slug = blogtitle.replace(/\s+/g, '-').toLowerCase();

        console.log("slug", slug);

        const exgistblog=await NewBlogModel.findOne({slug:slug,blogtitle:blogtitle,})

        if(exgistblog){
            return Response.json({ message: "Blog already exists This title try another title ", success: false }, { status: 500 },);
        }else{
        const newblog = new NewBlogModel({ blogid:user?._id,blogtitle:blogtitle,blogdescription: blogdescription,blogcontent:blogcontent,slug:slug,author:user?.username,authorImage:session?.user?.image||"image",blogImage:blogImage, date:new Date()});

        // Save the new user to the database
        await newblog.save();
        
        return Response.json({ message: "Blog created successfully", success: true }, { status: 200 },);

        }
    } catch (error) {

        console.log("error in new blog", error);

    }



}

