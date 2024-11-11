
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";



export async function POST(request: Request) {

    await dbConnect();

    try {
        const body = await request.json();

        const { username, code } = await body;

        const decodedUsername = decodeURIComponent(username);

        const user = await UserModel.findOne({ username: decodedUsername });

        if (!user) {

            return Response.json({ message: "User not found", success: false }, { status: 404 },);
        }


        const iscodevalid = user?.verified === code;

        const iscodenotexpired = new Date(user?.verifyexpires || '') > new Date();


        if (!iscodevalid || !iscodenotexpired) {

            return Response.json({ message: "Invalid verification code", success: false }, { status: 400 },);
        }
        else if (iscodevalid && !iscodenotexpired) {

            return Response.json({ message: "Verification code has expired", success: false }, { status: 400 },);
        }
        else {

            user.isverified = true;

            await user?.save();

            return Response.json({ success: true, message: "User verified successfully" }, { status: 200 },);
        }
    } catch (error) {

        console.error("verify user error", error);

        return Response.json({ error: error, success: false, message: "verify user error" }, { status: 500 },);
    }


}