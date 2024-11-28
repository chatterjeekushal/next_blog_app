
import dbConnect from "@/lib/dbConnect";
import NewBlogModel from "@/model/newBlog";

export async function GET(req: Request) {
  try {
    // Ensure the database connection is established
    await dbConnect();

    // Parse the slug from the request URL's search parameters
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    // If no slug is provided, return an error
    if (!slug) {
      return Response.json(
        { message: "Slug is required", success: false },
        { status: 400 }
      );
    }

    // Find the blog by the slug
    const blog = await NewBlogModel.findOne({ slug });

    // If the blog doesn't exist, return a 404 error
    if (!blog) {
      return Response.json(
        { message: "Blog not found", success: false },
        { status: 404 }
      );
    }

    // Increment the view count
    blog.viewCount = (blog.viewCount || 0) + 1;

    // Save the updated blog document
    await blog.save();

    // Return a success response
    return Response.json(
      { message: "Views added successfully", blog: blog, success: true },
      { status: 200 }
    );
  } catch (error) {
    // Catch any errors and return a 500 error
    console.error("Error handling GET request:", error);
    return Response.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
