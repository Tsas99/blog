import env from "dotenv";
import { UserModel } from "../../src/database/models/user.model";
import { LikeModel } from "../../src/database/models/like.model";

env.config();

export const createLikeController = async (req: any, res: any) => {
  const { authId, _id } = req.body;
  const { id } = req.params;

  const isUserExist = await UserModel.findOne({ authId });
  if (!isUserExist) {
    return res
      .status(500)
      .send({ message: "Authorization error: User not found." });
  }

  const isUserLiked = await LikeModel.findOne({
    userId: isUserExist._id,
    postId: _id,
  });

  if (isUserLiked) {
    const deletedLike = await LikeModel.findOneAndDelete({
      userId: isUserExist._id,
      postId: _id,
    });

    if (!deletedLike) {
      return res.status(404).json({ message: "Like not found." });
    }
    const likes = await LikeModel.find({ postId: _id }).populate("userId");

    return res
      .status(200)
      .send({ message: "Like removed successfully.", likes });
  }

  try {
    await LikeModel.create({
      userId: isUserExist._id,
      postId: _id,
    });

    const likes = await LikeModel.find({ postId: _id }).populate("userId");
    return res
      .status(201)
      .send({ message: "Like created successfully", likes });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Failed to create like" });
  }
};
