import { Request, Response } from "express";
import { LikeModel } from "../../src/database/models/like.model";

export const fetchLikesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id: postId } = req.params;
  try {
    const likes = await LikeModel.find({ postId: postId }).populate("userId");

    res.status(200).send(likes);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to fetch likes" });
  }
};
