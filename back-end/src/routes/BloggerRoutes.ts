import express from "express";
import {
  registerBlogger,
  updatedBlogger,


} from "../../controllers/bloggerController";


const router = express.Router();

router.post("/register", registerBlogger);
router.put("/editBlogger/:id", updatedBlogger);
// router.get("/bloggerDetails/:id", getBloggerWithDetails);
// router.get("/allBloggers", getAllBloggers);
// router.post("/search", searchController);

export default router;
