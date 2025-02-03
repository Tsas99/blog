import { Request, Response } from "express";
import { ReplyCommentModel } from "../../src/database/models/replyComment.model";

export const deleteReplyCommentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedreplyComment = await ReplyCommentModel.findByIdAndDelete({
      _id: id,
    });

    if (!deletedreplyComment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Comment deleted successfully", deletedreplyComment });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};