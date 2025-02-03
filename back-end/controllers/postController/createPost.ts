
import env from "dotenv";
import { PostModel } from "../../src/database/models/post.model";
import { UserModel } from "../../src/database/models/user.model";

env.config();

export const createPostController = async (req: any, res: any) => {
  const { content, image, authId } = req.body;

  const isUserExist = await UserModel.findOne({ authId });

  if (!isUserExist) {
    res.status(500).send({ message: "authorization error" });
    return;
  }

  try {
    const newPost = await PostModel.create({
      userId: isUserExist._id,
      content,
      image,
    });
    res.status(201).send({ message: "Post created successfully", newPost });
  } catch (error) {
    console.log(error);

    res.status(500).send({ message: "Failed to create post" });
  }
};
