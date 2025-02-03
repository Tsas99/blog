import { model, Model, models, Schema } from "mongoose";

export type LikeModelType = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  postId: Schema.Types.ObjectId;
  likeCount: String;
  createdAt: Date;
  updatedAt: Date;
};

const LikeSchema = new Schema<LikeModelType>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
  postId: { type: Schema.Types.ObjectId, required: true, ref: "posts" },
  likeCount: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

export const LikeModel: Model<LikeModelType> =
  models["like"] || model<LikeModelType>("like", LikeSchema);
