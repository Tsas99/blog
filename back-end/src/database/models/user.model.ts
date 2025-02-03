
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  authId: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isReviewer:boolean;
  role: "blogger" | "reader";
}

const UserSchema = new Schema<IUser>({
  authId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, required: false },
  isReviewer: { type: Boolean, default: false, ref: "ReviewerDetail" },
  role: { type: String, enum: ["blogger", "reader"], required: true },
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);