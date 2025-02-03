import { Request, Response } from "express";
import { LikeModel } from "../../src/database/models/like.model";

export const deleteLikeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedLike = await LikeModel.findByIdAndDelete({ _id: id });

    if (!deletedLike) {
      res.status(404).json({ message: "Like not found" });
      return;
    }

    res.status(200).json({ message: "Like deleted successfully", deletedLike });
  } catch (error) {
    console.error("Error deleting like:", error);
    res.status(500).json({ message: "Failed to delete like" });
  }
};
