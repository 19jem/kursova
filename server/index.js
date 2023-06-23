import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js"; 
import { verifyToken } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import courseRoutes from "./routes/course.js";
import User from "./models/User.js";
import {users, courses } from "./data/index.js";



/* Configuration */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy( { policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */

/* END OF FILE STORAGE */

/* ROUTES IDK */
app.post("/auth/register", register);

/* ROUTES */
app.use("/course", courseRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);


/* MONGODB SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server start on PORT: ${PORT}`));

    //User.insertMany(users);
}).catch((error) => console.log(`${error} server not connect`));




