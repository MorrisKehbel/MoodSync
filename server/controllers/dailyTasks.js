import { isValidObjectId } from "mongoose";
import DailyTask from "../models/DailyTasks.js";

export const addDailyTask = async (req, res) => {
  const {
    sanitizedBody: { title, date },
    userId,
  } = req;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const newTask = await DailyTask.create({
      userId,
      title,
      date,
      completed: false,
    });

    return res.status(201).json({
      message: "Daily task created successfully",
      task: newTask,
    });
  } catch (error) {
    res.status(400).json({ error: "Invalid data", details: error.message });
  }
};

export const getDailyTasks = async (req, res) => {
  const { userId } = req;
  const { date } = req.query;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const query = { userId };
    if (date) {
      query.date = date;
    }

    const tasks = await DailyTask.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Daily tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

export const updateDailyTask = async (req, res) => {
  const { taskId } = req.params;
  const {
    sanitizedBody: { title, completed },
    userId,
  } = req;

  if (!isValidObjectId(userId) || !isValidObjectId(taskId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const task = await DailyTask.findOne({ _id: taskId, userId });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    await task.save();

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(400).json({ error: "Invalid data", details: error.message });
  }
};

export const deleteDailyTask = async (req, res) => {
  const { taskId } = req.params;
  const { userId } = req;

  if (!isValidObjectId(userId) || !isValidObjectId(taskId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const task = await DailyTask.findOneAndDelete({ _id: taskId, userId });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
