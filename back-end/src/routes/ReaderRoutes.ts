import { Router } from "express";
import { registerReader, getReaders} from "../../controllers/readerControlller";

const router = Router();
router.post("/register", registerReader);
router.get("/readerDetails/:id", getReaders)

export default router;