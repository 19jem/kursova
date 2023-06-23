import mongoose, { Schema } from "mongoose";


const questionSchema = new mongoose.Schema({
    questionText: {
      type: String,
      required: true
    },
    options: [{
      optionText: {
        type: String,
        required: true
      },
      isCorrect: {
        type: Boolean,
        required: true
      }
    }]
});

const CourseSchema = new mongoose.Schema({

    courseName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },

    description: {
        type: String,
        required: true,
        min: 2,
        max: 200,
    },

    question: [questionSchema]

},


    { timestamps: true }
);

const Course = mongoose.model('Course', CourseSchema);
export default Course;