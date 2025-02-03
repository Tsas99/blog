import express from "express";
import {registerBlogger, updateBlogger} from "../../controllers/bloggerController"

const router = express.Router();

router.post("/bloggers/register", registerBlogger);
router.put("/editBlogger/:id", updateBlogger)

export default router;