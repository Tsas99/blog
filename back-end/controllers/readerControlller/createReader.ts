import { BloggerModel } from "../../src/database/models/blogger.model";
import { ReaderModel } from "../../src/database/models/reader.model";

const findExistingUser = async (authId: string, email: string) => {
    const blogger = await BloggerModel.findOne({ $or: [{ authId }, { email }] });
    const reader = await ReaderModel.findOne({ $or: [{ authId }, { email }] });
    return blogger || reader;
};

export const registerReader = async (req: any, res: any) => {
    const { authId, username, email, role } = req.body;

    if (!authId || !username || !email || role !== "reader") {
        return res.status(400).json({ message: "Invalid reader data" });
    }
    try {
        const existingUser = await findExistingUser(authId, email);
        if (existingUser) {
            return res.status(400).json({ message: "User already registered" });
        }
        const newReader = await ReaderModel.create({
            authId,
            username,
            email,
            role,
        });
        return res
           .status(201)
           .json({message:"Reader registered successfully", reader:newReader});
    } catch (error) {
        console.error("Error registering reader", error);
        return res.status(500).json({message:"Internal server error", error});
    }
};