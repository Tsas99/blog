import { Request, Response } from "express";
import { CommentModel } from "../../src/database/models/comment.model";

export const fetchCommenttController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const comment = await CommentModel.findById({ _id: id });

    if (!comment) {
      res.status(404).send({ message: "Comment not found" });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).send({ message: "Failed to fetch comment" });
  }
};
