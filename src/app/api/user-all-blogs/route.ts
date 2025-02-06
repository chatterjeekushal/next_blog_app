
import dbConnect from "@/lib/dbConnect";
import NewBlogModel from "@/model/newBlog";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// fetch current user blogs
export async function GET() {
    await dbConnect();

    const session = await getServerSession(authOptions);

    console.log("my user session", session);

    try {
        // Fetch all blogs with the current user's username
        const allblogs = await NewBlogModel.find({ username: session?.user?.username }).sort({ createdAt: -1 });

        console.log("allblogs", allblogs);

        return Response.json({ message: "user blogs fetched successfully", success: true, blogs: allblogs }, { status: 200 });

    } catch (error) {
        console.error(error);

        return Response.json({ message: "user blogs fetching failed", success: false }, { status: 500 });
    }
}
