

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
import mailSender from "@/helpers/sendverifyemail";
import { singupSchema } from "@/schemas/singupSchema";

// Handler for POST request to register a new user
export async function POST(req: Request) {
    // Connect to the database
    await dbConnect();

    try {
        // Get the data from the request
        const { username, password, email } = await req.json();

        // Validate input data with the signup schema



        const validData = singupSchema.parse({
            username,
            password,
            email,
        })

        if (!validData) {
            return Response.json({ message: "Invalid data", success: false }, { status: 500 },);
        }

        // Check if the username already exists in the database and is verified
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isverified: true,
        });

        // If user exists and is verified, return an error
        if (existingUserVerifiedByUsername) {

            return Response.json({ message: "User already exists", success: false }, { status: 500 },);
        }

        // Generate a verification code (6 digits)
        const verifyCode = Math.floor(100000 + Math.random() * 900000);

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Set expiry date for the verification code (1 hour from now)
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        // Create the new user object
        const newUser = new UserModel({
            username: validData.username,
            email: validData.email,
            password: hashedPassword,
            verified: verifyCode,
            verifyexpires: expiryDate,
            isverified: false,
            isactive: false,
        });

        // Save the new user to the database
        await newUser.save();

        // Send the verification email
        const emailResponse = await mailSender(
            validData.email,
            validData.username,
            verifyCode.toString()
        );

       console.log("emailResponse", emailResponse);

        // Return a success response
        return  Response.json({ message: "User registered successfully", success: true }, { status: 200 });
        
    } catch (error) {
        // Handle validation or other errors
        console.error("Error registering user:", error);

        return new Response(
            JSON.stringify({ menubar: "Failed to register user", success: false }),
            { status: 500 }
        );
    }
}