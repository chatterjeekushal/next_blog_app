
import dbConnect from "@/lib/dbConnect";

import BlogComment from "@/model/blogcomment"

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";


export async function POST(req: Request){

    await dbConnect();

    const session = await getServerSession(authOptions);

    console.log("session", session);

    const { comment , blogtitale } = await req.json();

    console.log("comment", comment);
    console.log("blogtitale", blogtitale);


    const blogcomment = new BlogComment({
        blogid: blogtitale,
        comment: comment,
        blogtitle: blogtitale,
        blogcommentowner: session?.user?.name || session?.user?.username ,
    });

    await blogcomment.save();

    return Response.json({ message: "Comment added successfully", success: true }, { status: 200 });

}