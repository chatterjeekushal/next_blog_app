

import mongoose, { Schema, Document } from "mongoose";


export interface BlogComment extends Document {

    blogid: string,
    comment: string,
    blogtitle: string,
    blogcommentowner: string,
    
}

const blogcommentschema = new Schema<BlogComment>({

    blogid: {
        type: String,
        required: [true, "Blogid is required"],
        trim: true,
    },

    comment: {
        type: String,
        required: [true, "Comment is required"],
        trim: true,
    },

    blogtitle: {
        type: String,
        required: [true, "Blogtitle is required"],
        trim: true,
    },

    blogcommentowner: {
        type: String,
        required: [true, "Blogcommentowner is required"],
        trim: true,
    },

})

const BlogComment = (mongoose.models.BlogComment as mongoose.Model<BlogComment>) || mongoose.model<BlogComment>("BlogComment", blogcommentschema);

export default BlogComment