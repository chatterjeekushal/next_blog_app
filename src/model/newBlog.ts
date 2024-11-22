

import mongoose, { Schema, Document } from "mongoose";


export interface NewBlog extends Document {

    blogid: string;
    blogtitle: string;
    blogdescription: string;
    blogcontent: string;
    slug: string;
    author: string;
    authorImage: string;
    blogImage: string;
    date: Date;
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
        unique: true
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
        trim: true,
    },

    date: {
        type: Date,
        required: [true, "Date is required"],
        trim: true,
    },

}, { timestamps: true });


export const NewBlogModel = mongoose.model<NewBlog>("NewBlog", newBlogSchema);

export default NewBlogModel;