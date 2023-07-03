import express from "express";
import { updateProgress, getUserProgress } from "../controllers/userprogress.js";

const router = express.Router();

router.post("/update/:courseId", updateProgress);
router.get("/show/:courseId", getUserProgress);

export default router;