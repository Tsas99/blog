import { Request, Response } from "express";
import { CommentModel } from "../../src/database/models/comment.model";

export const deleteCommentController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedComment = await CommentModel.findByIdAndDelete({ _id: id });

    if (!deletedComment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Comment deleted successfully", deletedComment });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};
