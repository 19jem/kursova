import express from "express";
import { createCourse, getCourse } from "../controllers/course.js";

const router = express.Router();

router.get("/", getCourse);
router.post("/create", createCourse);

export default router;