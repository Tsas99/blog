import { Model, Schema, model, models } from "mongoose";
export type BloggerModelType = {
    _id: Schema.Types.ObjectId;
    authId: string;
    username: string;
    email: string;
    gender:string;
    bio:string;
    profile_picture:string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
};

const BloggerSchema = new Schema<BloggerModelType>(
    {
      authId: { type: String, required: true, unique: true },
      username: { type: String, required: true },
      gender: { type: String, required: false },
      bio: { type: String, required: false },
      profile_picture: { type: String, default: "" },
      email: { type: String, required: true, unique: true },
      role: {
        type: String,
        enum: ["blogger"], 
        default: "blogger", 
        required: true,
      },
    },
    { timestamps: true }
);

export const BloggerModel: Model<BloggerModelType> =
 models["Bloggers"] || model<BloggerModelType>("Blogger", BloggerSchema);