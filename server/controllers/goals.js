import { isValidObjectId } from "mongoose";
import Goals from "../models/Goals.js";

export const createGoal = async (req, res) => {
  const {
    sanitizedBody: { title, desc, category, status, progress },
    userId,
  } = req;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const newGoal = await Goals.create({
      userId,
      title,
      desc,
      category,
      status: status || "active",
      progress,
    });

    return res.status(201).json({
      message: "Goal created successfully",
      goal: newGoal,
    });
  } catch (error) {
    res.status(400).json({ error: "Invalid data", details: error.message });
  }
};

export const getAllGoals = async (req, res) => {
  const { userId } = req;
  const { status, page = 1, limit = 10 } = req.query;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const filter = { userId };
    if (status && ["active", "completed"].includes(status)) {
      filter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const goals = await Goals.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Goals.countDocuments(filter);

    return res.status(200).json({
      message: "Goals retrieved successfully",
      goals,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalGoals: total,
        hasMore: skip + goals.length < total,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch goals", details: error.message });
  }
};

export const getGoalById = async (req, res) => {
  const { userId } = req;
  const { goalId } = req.params;

  if (!isValidObjectId(userId) || !isValidObjectId(goalId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const goal = await Goals.findOne({ _id: goalId, userId });

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    return res.status(200).json({
      message: "Goal retrieved successfully",
      goal,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch goal", details: error.message });
  }
};

export const updateGoal = async (req, res) => {
  const { userId } = req;
  const { goalId } = req.params;
  const { sanitizedBody } = req;

  if (!isValidObjectId(userId) || !isValidObjectId(goalId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const goal = await Goals.findOneAndUpdate(
      { _id: goalId, userId },
      { ...sanitizedBody },
      { new: true, runValidators: true }
    );

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    return res.status(200).json({
      message: "Goal updated successfully",
      goal,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to update goal", details: error.message });
  }
};

export const updateGoalStatus = async (req, res) => {
  const { userId } = req;
  const { goalId } = req.params;
  const {
    sanitizedBody: { status },
  } = req;

  if (!isValidObjectId(userId) || !isValidObjectId(goalId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const goal = await Goals.findOneAndUpdate(
      { _id: goalId, userId },
      { status },
      { new: true, runValidators: true }
    );

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    return res.status(200).json({
      message: `Goal marked as ${status}`,
      goal,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to update goal status", details: error.message });
  }
};

export const updateGoalProgress = async (req, res) => {
  const { userId } = req;
  const { goalId } = req.params;
  const {
    sanitizedBody: { progress },
  } = req;

  if (!isValidObjectId(userId) || !isValidObjectId(goalId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const goal = await Goals.findOneAndUpdate(
      { _id: goalId, userId },
      { progress },
      { new: true, runValidators: true }
    );

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    return res.status(200).json({
      message: "Goal progress updated successfully",
      goal,
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to update goal progress",
      details: error.message,
    });
  }
};

export const deleteGoal = async (req, res) => {
  const { userId } = req;
  const { goalId } = req.params;

  if (!isValidObjectId(userId) || !isValidObjectId(goalId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const goal = await Goals.findOneAndDelete({ _id: goalId, userId });

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    return res.status(200).json({
      message: "Goal deleted successfully",
      deletedGoal: goal,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete goal", details: error.message });
  }
};

export const getGoalsStats = async (req, res) => {
  const { userId } = req;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const totalGoals = await Goals.countDocuments({ userId });
    const activeGoals = await Goals.countDocuments({
      userId,
      status: "active",
    });
    const completedGoals = await Goals.countDocuments({
      userId,
      status: "completed",
    });

    const completionRate =
      totalGoals > 0 ? ((completedGoals / totalGoals) * 100).toFixed(1) : 0;

    return res.status(200).json({
      message: "Goals statistics retrieved successfully",
      stats: {
        totalGoals,
        activeGoals,
        completedGoals,
        completionRate: parseFloat(completionRate),
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch goals statistics",
      details: error.message,
    });
  }
};
