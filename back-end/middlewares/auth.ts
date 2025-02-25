import { BloggerModel } from "../src/database/models/blogger.model";
import env from "dotenv";
env.config();

export const authMiddleware = async (req: any, res: any, next: any) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({ message: "Id not provided" });
  }
  try {
    const user = await BloggerModel.findOne({ authId: id });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    res.locals.userId = user._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};