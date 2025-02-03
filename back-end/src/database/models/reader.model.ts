import { Model, Schema, models, model } from "mongoose";

export type ReadersModelType = {
  _id: Schema.Types.ObjectId;
  authId: string;
  username: string;
  email: string;
  phoneNumber: string;
  profile_picture: string;
  address: string;
  isAdmin: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

const ReaderSchema = new Schema<ReadersModelType>({
  authId: { type: String, required: true, unique: true },
  username: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: false },
  profile_picture: { type: String, required: false },
  address: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["reader"], // Define the allowed roles
    default: "reader", // Default role for this model
    required: true,
  },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

export const ReaderModel: Model<ReadersModelType> =
  models["Readers"] || model<ReadersModelType>("Readers", ReaderSchema);
