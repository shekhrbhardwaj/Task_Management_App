import taskModel from "../models/taskModel.js";
import mongoose from "mongoose";

export const taskCreate = async ({ title, description, status, user }) => {
  if (!title || !description) {
    throw new Error("All fields are required.");
  }

  const task = await taskModel.create({
    title,
    description,
    status,
    user,
  });

  return task;
};

export const taskDelete = async ({ taskId }) => {
  const task = await taskModel.findByIdAndDelete(taskId);
  return task;
};

export const getTask = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    const task = await taskModel.findById(id);
    return task;
  } catch (error) {
    return error;
  }
};

export const taskUpdate = async ({ id, title, description, status }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const updatedTask = await taskModel.findByIdAndUpdate(
    id,
    { title, description, status },
    { new: true, runValidators: true }
  );
  return updatedTask;
};

export const getUsersTasks = async ({ user, status }) => {
  const userId = user._id;
  const query = { user: userId };
  if (status) {
    query.status = status;
  }
  const tasks = await taskModel.find(query);
  return tasks;
};
