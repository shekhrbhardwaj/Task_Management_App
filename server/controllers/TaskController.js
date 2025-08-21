import { validationResult } from "express-validator";
import {
  taskCreate,
  taskDelete,
  getTask,
  taskUpdate,
  getUsersTasks,
} from "../services/TaskService.js";

export const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { title, description, status } = req.body;

  const task = await taskCreate({
    title,
    description,
    status,
    user: req.user._id,
  });

  return res.status(201).json({ task });
};

export const deleteTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { taskId } = req.body;

  const task = await taskDelete({
    taskId,
  });
  return res.status(200).json({ task });
};

export const readTask = async (req, res) => {
  const { id } = req.params;
  const task = await getTask({
    id,
  });
  if (!task) {
    return res.status(400).json({ task });
  }
  return res.status(200).json({ task });
};

export const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const id = req.params.id;
  const { title, description, status } = req.body;
  const task = await taskUpdate({ id, title, description, status });
  if (!task) {
    return res.status(400).json({ task });
  }
  return res.status(200).json({ task });
};

export const userTasks = async (req, res) => {
  const user = req.user;
  const status = req.query.status;
  if (!user) {
    return res.status(400).json({});
  }
  const tasks = await getUsersTasks({
    user,
    status,
  });
  if (!tasks) {
    return res.status(400).json({ tasks });
  }
  return res.status(200).json({ tasks });
};
