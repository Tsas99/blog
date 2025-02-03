import env from "dotenv";
import {UserModel} from "../../src/database/models/user.model"
import { ReplyCommentModel } from "../../src/database/models/replyComment.model";

env.config();

export const createReplyCommentController = async (req: any, res: any) => {
  const { content, authId, _id } = req.body;
  const isUserExist = await UserModel.findOne({ authId });

  if (!isUserExist) {
    res.status(500).send({ message: "authorization error" });
    return;
  }

  try {
    const newReplyComment = await ReplyCommentModel.create({
      userId: isUserExist._id,
      commentId: _id,
      content,
    });
    res
      .status(201)
      .send({ message: "reply comment created successfully", newReplyComment });
  } catch (error) {
    console.log(error);

    res.status(500).send({ message: "Failed to create reply comment" });
  }
};
