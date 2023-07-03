import express from "express";
import { createCourse, deleteCourse, getCourse } from "../controllers/course.js";

const router = express.Router();

router.get("/", getCourse);
router.post("/create", createCourse);
router.delete("/delete/:id", deleteCourse);

export default router;