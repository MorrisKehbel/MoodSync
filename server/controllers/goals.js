import { isValidObjectId } from "mongoose";
import Goals from "../models/Goals.js";
import User from "../models/User.js";
import { openAiImageGen } from "../utils/openAiImageGen.js";
import { uploadGoalImageFromUrl } from "../utils/uploadGoalImageFromUrl.js";

export const createGoal = async (req, res) => {
  const {
    sanitizedBody: { title, desc, category, status, progress },
    userId,
  } = req;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  try {
    const user = await User.findById(userId);
    let tempImageUrl = null;

    const newGoal = await Goals.create({
      userId,
      title,
      desc,
      category,
      status: status || "active",
      progress,
      imageUrl: null,
    });

    if (user?.settings?.aiTips !== false) {
      const CATEGORY_COLORS = {
        Social: "soft purple, peach, light pink",
        "Physical health": "gold, warm beige, muted green",
        Finances: "soft green, aqua blue, mint",
        "Job satisfaction": "light blue, lavender, warm pink",
        Personal: "light blue, soft yellow, peach, neutral tones",
        default: "light blue, peach, soft green",
      };

      const getCategoryColors = (category) => {
        return CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
      };

      const colors = getCategoryColors(category);

      const prompt = `
Create a symbolic digital illustration with the following visual requirements:

- Style: clean, flat vector style with soft gradients, pastel colors (e.g. ${colors}), minimalistic design, soft shadows
- Composition: centered or isometric layout, balanced and calm
- No text, no logos, no realistic faces or photo elements
- Focus: motivational, optimistic mood

Represent this personal goal visually:

Title: "${title || "Personal growth"}"
Description: "${desc || "A general goal to improve oneself."}"

Use simple symbolic elements (e.g. nature, abstract objects, characters with no facial detail) to convey the goal meaningfully and visually. The image should feel like part of a consistent visual series.
`;

      try {
        tempImageUrl = await openAiImageGen({ prompt });

        const result = await uploadGoalImageFromUrl({
          imageUrl: tempImageUrl,
          goalId: newGoal._id,
        });

        newGoal.imageUrl = result.secure_url;
        await newGoal.save();
      } catch (err) {
        console.warn("Image generation or upload failed:", err.message);
      }
    }

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
    const goal = await Goals.findOne({ _id: goalId, userId });

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    const publicId = `goals/goal_${goalId}`;
    const result = await cloudinary.v2.uploader.destroy(publicId);

    if (result.result !== "ok" && result.result !== "not found") {
      return res.status(500).json({
        message: "Failed to delete image from Cloudinary",
      });
    }

    await Goals.deleteOne({ _id: goalId, userId });

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
