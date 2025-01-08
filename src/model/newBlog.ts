

import mongoose, { Schema, Document } from "mongoose";
import { fileURLToPath } from "url";
import { string } from "zod";


export interface NewBlog extends Document {

    blogid: string;
    blogtitle: string;
    blogdescription: string;
    blogcontent: string;
    slug: string;
    author: string;
    authorImage: string;
    blogImage: File;
    date: string;
    viewCount: number;
    likes: number;
    blogcategory: string
}


const newBlogSchema = new Schema<NewBlog>({

    blogid: {
        type: String,
        required: [true, "Blogid is required"],
        trim: true,
    },

    blogtitle: {
        type: String,
        required: [true, "Blogtitle is required"],
        trim: true,
    },

    blogcategory: {
        type: String,
        
        trim: true,
    },

    blogdescription: {
        type: String,
        required: [true, "Blogdescription is required"],
        trim: true,
    },

    blogcontent: {
        type: String,
        required: [true, "Blogcontent is required"],
        trim: true,
    },

    slug: {
        type: String,
        required: [true, "Slug is required"],
        trim: true,
    
    },

    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true,
    },

    authorImage: {
        type: String,
        trim: true,
    },

    blogImage: {
        type: String,
        required: [true, "Imageupload is required"],
    },

    date: {
        type: String,
        required: [true, "Date is required"],
        trim: true,
    },
    viewCount: {
        type: Number,
        default: 0,
    },

    likes: {
        type: Number,
        default: 0,
    },

}, { timestamps: true });


export const NewBlogModel = (mongoose.models.NewBlog as mongoose.Model<NewBlog>) || mongoose.model<NewBlog>("NewBlog", newBlogSchema);

export default NewBlogModel;