import { model, Model, models, Schema } from "mongoose";

export type ReplyCommentModelType = {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  commentId: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

const ReplyCommentSchema = new Schema<ReplyCommentModelType>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
  commentId: { type: Schema.Types.ObjectId, required: true, ref: "comment" },
  content: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

export const ReplyCommentModel: Model<ReplyCommentModelType> =
  models["reply"] || model<ReplyCommentModelType>("reply", ReplyCommentSchema);
