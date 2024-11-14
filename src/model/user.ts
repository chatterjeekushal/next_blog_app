
import mongoose, { Schema, Document } from "mongoose";


export interface User extends Document {

    username: string;
    email: string;
    password: string;
    verified: string;
    verifyexpires: Date;
    isverified: boolean;
    isactive: boolean;

}



const userSchema = new Schema<User>({

    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
    },
    
    verified: {
        type: String,
        required: [true, "Verified is required"],
    },

    verifyexpires: {
        type: Date,
        required: [true, "Verifyexpires is required"],
    },

    isverified: {
        type: Boolean,
        default: false
    },

    isactive: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export default UserModel;