
import dbConnect from "@/lib/dbConnect";
import NewBlogModel from "@/model/newBlog";

export async function GET(req: Request) {
    await dbConnect();


  

    try {
        // Fetch all blogs sorted by creation date
        const allblogs = await NewBlogModel.find({}).sort({ createdAt: -1 });

     

        return Response.json({ message: "Blogs fetched successfully", success: true, blogs: allblogs }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Blogs fetching failed", success: false }, { status: 500 });
    }
}
