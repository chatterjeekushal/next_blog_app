
import dbConnect from "@/lib/dbConnect";
import NewBlogModel from "@/model/newBlog";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import UserModel from "@/model/user";

export async function POST(req: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);

    console.log("session", session);

    function formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for day
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const isAM = hours < 12;

        // Convert to 12-hour format
        if (hours === 0) {
            hours = 12; // Midnight case
        } else if (hours > 12) {
            hours -= 12; // Convert hours to 12-hour format
        }

        const period = isAM ? 'AM' : 'PM';

        // Return formatted date as dd/mm/yy hh:mm AM/PM
        return `${day}/${month}/${year} ${hours}:${minutes} ${period}`;
    }

    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    try {
        // Get the data from the request
        const { blogtitle, blogcontent, blogdescription, blogImage } = await req.json();

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
        } else {
            const newBlog = new NewBlogModel({
                blogid: user?._id,
                blogtitle: blogtitle,
                blogdescription: blogdescription,
                blogcontent: blogcontent,
                slug: slug,
                author: user?.username,
                authorImage: session?.user?.image || "default_image", // fallback for authorImage
                blogImage: blogImage,
                date: currentDate, // Assign the formatted date here
            });

            // Save the new blog to the database
            await newBlog.save();

            return new Response(
                JSON.stringify({ message: "Blog created successfully", success: true }),
                { status: 200 }
            );
        }
    } catch (error) {
        console.log("Error in creating blog:", error);

        return new Response(
            JSON.stringify({ message: "Internal server error", success: false }),
            { status: 500 }
        );
    }
}
