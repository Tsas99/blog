import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes"
import bloggerRoutes from "./routes/BloggerRoutes"
import readerRoutes from "./routes/ReaderRoutes"
import { connectDatabase } from "./database/config";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());



app.use("api/bloggers", bloggerRoutes);
app.use("api/readers", readerRoutes);
app.use("/api/users", userRoutes)

const startServer = async () =>{
    await connectDatabase ();
    app.listen(PORT, () =>{
        console.log(`Server running at http://localhost:${PORT}`);
        
    });
};

startServer();