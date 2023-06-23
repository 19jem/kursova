import UserProgress from "../models/Progress.js";
import User from "../models/User.js";
import Courses from "../models/Courses.js";

export const updateProgress = async (req, res) => {
    try{
        const {userId, courseId} = req.params;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "Користувача не знайдено" });  
        }

        const course = await Courses.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: "Курс не знайдено" });   
        }

        const updatedProgress = await UserProgress.findOneAndUpdate(
            { userId, courseId },
            { progress },
            { upsert: true }
        );
        res.status(200).json(updatedProgress);
        
    }catch(err) {
        res.status(500).json({ error: err.message });
    }
};
export const getUserProgress = async (req, res) => {
    try{
        const {userId, courseId} = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "Користувача не знайдено" });  
        }

        const course = await Courses.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: "Курс не знайдено" });   
        }

        const progress = await UserProgress.findOne({ userId, courseId });
        if (progress) {
            res.status(200).json(progress.progress);
        }


    }catch (err) {
        res.status(404).json({message: error.message});
    }
};
        