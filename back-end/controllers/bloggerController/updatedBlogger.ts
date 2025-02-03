import { Request, Response } from "express";
import { BloggerModel } from "../../src/database/models/blogger.model";
import mongoose from "mongoose";

export const updatedBlogger = async (
  req: Request,
  res: Response
): Promise<void> => {
  const authId = req.params.id;
  console.log(authId);
  const {
    username,
    gender,
    bio,
    profile_picture,
    profession,
  } = req.body;

  try {
    const updatedBloggerData = {
      username,
      profession,
      gender,
      bio,
      profile_picture,
      updatedAt: new Date(),
    };

    const blogger = await BloggerModel.findOneAndUpdate(
      { authId },
      { ...updatedBloggerData },
      { new: true }
    );

    if (!blogger) {
      res.status(404).json({ message: "Blogger not found" });
      return;
    }

    res.status(200).json({ message: "Blogger updated successfully", blogger });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
