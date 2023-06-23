import mongoose from "mongoose";

const UserProgressSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
      },
      courseId: {
        type: String,
        required: true
      },
      progress: {
        type: Number,
        required: true,
        default: 0
      }
});

const UserProgress = mongoose.model('UserProgress', UserProgressSchema);

export default UserProgress;