import { Request, Response } from "express";
import { ReplyCommentModel } from "../../src/database/models/replyComment.model";

export const fetchReplyCommentsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { commentId } = req.params;
  try {
    const replyComments = await ReplyCommentModel.find({ commentId: commentId })
      .populate("userId")
      .sort({ createdAt: -1 });

    res.status(200).send(replyComments);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to fetch comments" });
  }
};
