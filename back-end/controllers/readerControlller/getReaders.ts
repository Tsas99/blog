import { Request, Response } from "express";
import {ReaderModel} from "../../src/database/models/reader.model"

export const getReaders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const client = await ReaderModel.findOne({ authId: req.params.id });

    if (!client) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    res.status(200).json(client);
  } catch (error) {
    console.error("Error fetching client:", error);
    res.status(500).json({ message: "Failed to fetch client" });
  }
};