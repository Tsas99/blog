import { Request, Response } from "express";
import mongoose from "mongoose";
import { BloggerModel } from "../../src/database/models/blogger.model";

export const updateBlogger = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; 
    console.log("Updating blogger with ID:", id);

    const { username, gender, bio, profile_picture, email } = req.body;

    try {
       
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: "Invalid Blogger ID format" });
            return;
        }

     
        const existingBlogger = await BloggerModel.findOne({ authId: id });

        if (!existingBlogger) {
            res.status(404).json({ error: "Blogger not found" });
            return;
        }

     
        const updatedBlogger = await BloggerModel.findOneAndUpdate(
            { authId: id }, 
            { username, gender, bio, profile_picture, email },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: "Blogger updated successfully", blogger: updatedBlogger });
    } catch (error) {
        console.error("Error updating blogger:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
