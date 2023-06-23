import Course from "../models/Courses.js";


export const getCourse = async (req, res) => {
    try {
       // const { id } = req.params;
        const course = await Course.find();
        res.status(200).json(course);
    }catch (err) {
        res.status(404).json({ message: error.message });
    }
};  
/** Creat new course */
export const createCourse = async (req, res) => {
    try {
        const {
            courseName,
            description,
            question,
        } = req.body;

        const newCourse = new Course({
            courseName,
            description,
            question,
        });

        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
        

    } catch(err) {
        res.status(500).json({error: err.message });

    }


}

