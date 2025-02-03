import { Schema, model, models } from "mongoose";

export type BloggerModelType = {
  _id: Schema.Types.ObjectId;
  authId: string;
  username: string;
  gender: string;
  bio: string;
  profile_picture: string;
  email: string;
  password: string;
  profession:string
  role: string;
  rating:number;
  comment:string;
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

    password: { type: String, required: false },
  
    profession: { type: String, required: false },
    rating:{type:Number, required:false},
    comment:{ type: String, required: false },
    role: {
      type: String,
      enum: ["blogger"], 
      default: "blogger", 
      required: true,
    },
  },
  { timestamps: true }
);

export const BloggerModel =
  models.Blogger || model<BloggerModelType>("Blogger", BloggerSchema);
