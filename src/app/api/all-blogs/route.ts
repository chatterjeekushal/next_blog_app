
import dbConnect from "@/lib/dbConnect";
import NewBlogModel from "@/model/newBlog";



export async function GET(req: Request) {

    await dbConnect();

    try {
        const allblogs = await NewBlogModel.find({});

        console.log(allblogs)

        return Response.json({ message: "blogs fetched successfully", success: true, blogs: allblogs }, { status: 200 });
    } catch (error) {

        return Response.json({ message: "blogs fetching failed", success: false }, { status: 500 });
    }


}