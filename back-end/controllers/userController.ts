import { Request, Response } from "express";
import { ReaderModel } from "../src/database/models/reader.model";
import {BloggerModel} from "../src/database/models/blogger.model"



export const getUserByAuthId = async (req: any, res: any) => {
  const { authId } = req.query;

  if (!authId) {
    return res.status(400).json({ error: "authId is required" });
  }

  try {
    const blogger = await BloggerModel.findOne({ authId });
    if (blogger) {
      return res.status(200).json(blogger);
    }

    const client = await ReaderModel.findOne({ authId });
    if (client) {
      return res.status(200).json(client);
    }

    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.error("Error fetching user by authId:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
