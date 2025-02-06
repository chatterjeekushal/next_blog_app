
import dbConnect from "@/lib/dbConnect";
import NewBlogModel from "@/model/newBlog";

export async function GET(req: Request) {
  try {
    // Ensure the database connection is established
    await dbConnect();

    // Parse the slug from the request URL's search parameters
    const { searchParams } = new URL(req.url);
    const blogcategory = searchParams.get("blogcategory");

    // If no slug is provided, return an error
    if (!blogcategory) {
      return Response.json(
        { message: "blogcategory is required", success: false },
        { status: 400 }
      );
    }

    // Find the blog by the slug
    const blog = await NewBlogModel.find({ blogcategory });

    // If the blog doesn't exist, return a 404 error
    if (!blog) {
      return Response.json(
        { message: "Blog not found", success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Blog fetched successfully", success: true, catagoryblog: blog },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { message: "Blog fetching failed", success: false },
      { status: 500 }
    );
  }
}
