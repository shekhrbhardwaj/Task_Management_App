import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import CookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import taskRoutes from "./routes/taskRoute.js";
import { authUser } from "./middlewares/authMiddleware.js";

const app = express();

const PORT = process.env.PORT;
const DATABASE = process.env.monodbURI;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser());

mongoose
  .connect(DATABASE)
  .then(() => {
    console.log(`Database Connected successfully.`);
    app.listen(PORT, () => {
      console.log(`Server connected to ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Database connection error ${error}`);
  });
// user Router
app.use("/api/users", userRoutes);

// Task router
app.use("/api/tasks", authUser, taskRoutes);
