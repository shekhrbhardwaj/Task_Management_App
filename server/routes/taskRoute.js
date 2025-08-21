import express from "express";
import { body } from "express-validator";
import {
  createTask,
  deleteTask,
  readTask,
  updateTask,
  userTasks,
} from "../controllers/TaskController.js";

const router = express.Router();

router.post(
  "/create",
  [
    body("title").notEmpty().withMessage("Title can not be empty."),
    body("description").notEmpty().withMessage("Description can not be empty."),
  ],
  createTask
);

router.post(
  "/delete",
  [body("taskId").notEmpty().withMessage("Task Id can not be empty.")],
  deleteTask
);

router.get("/:id", readTask);

router.put(
  "/:id",
  [
    body("title").notEmpty().withMessage("Title can not be empty."),
    body("description").notEmpty().withMessage("Description can not be empty."),
  ],
  updateTask
);

router.get("/", userTasks);

export default router;
