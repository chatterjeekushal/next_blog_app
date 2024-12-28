

import dbConnect from "@/lib/dbConnect";
import BlogComment from "@/model/blogcomment";

// all blogs get

export async function GET(req: Request) {
    await dbConnect();

    try {

        // Parse the slug from the request URL's search parameters
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    console.log("slug", slug);

        // Fetch all blogs sorted by creation date
        const allblogs_comment = await BlogComment.find({blogid: slug
})

        console.log("allblogs", allblogs_comment);


        return Response.json({ message: "Blogs fetched successfully", success: true, blogs: allblogs_comment }, { status: 200 });
        
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Blogs comment fetching failed", success: false }, { status: 500 });
    }
}