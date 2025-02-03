import { model, Model, models, Schema } from "mongoose";

export type ReadersModelType = {
    _id:Schema.Types.ObjectId;
    authId: string;
    username:string;
    profile_picture: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    isAdmin: boolean;
};

const ReaderSchema = new Schema<ReadersModelType>({
    authId: { type: String, required: true, unique: true },
    username: { type: String, required: false },
    profile_picture: { type: String, required: false },
    isAdmin: { type: Boolean, default: false },
    role: {
        type: String,
        enum: ["reader"], 
        default: "reader",
        required: true,
      },
      createdAt: { type: Date, default: Date.now, required: true, immutable: true },
      updatedAt: { type: Date, default: Date.now, required: true },
});
export const ReaderModel: Model<ReadersModelType> =
  models["Reader"] || model<ReadersModelType>("Clients", ReaderSchema);