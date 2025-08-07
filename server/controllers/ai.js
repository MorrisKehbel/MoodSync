import OpenAI from "openai";
import DailyActivities from "../models/Activities.js";
import Goals from "../models/Goals.js";
import User from "../models/User.js";
import DailyTask from "../models/DailyTasks.js";
import AISummary from "../models/Ai.js";
import { buildAIPrompt, ACTIVITY_CATEGORIES } from "../utils/openAiUtils.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const calculateFallbackScore = (entries, categoryMap) => {
  const covered = new Set();

  for (const entry of entries) {
    for (const activity of entry.activities ?? []) {
      const category = categoryMap[activity];
      if (category) covered.add(category);
    }
  }

  const totalCategories = new Set(Object.values(categoryMap));
  const ratio = covered.size / totalCategories.size;
  return Math.round(ratio * 100);
};

const checkAIEnabled = async (req, res) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    if (user.settings.aiTips === false) {
      res.status(403).json({
        error: "Data processing not allowed due to privacy settings.",
      });
      return false;
    }
    return true;
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
    return false;
  }
};

export const generateAISummary = async (req, res) => {
  const { userId } = req;

  const isAllowed = await checkAIEnabled(req, res);
  if (!isAllowed) return;

  try {
    const latestActivity = await DailyActivities.findOne({ userId })
      .sort({ updatedAt: -1 })
      .lean();

    if (!latestActivity) {
      return res.status(404).json({ error: "No activity entries found." });
    }

    const latestSummary = await AISummary.findOne({ userId }).lean();

    let activityEntries = [];
    let goalsEntries = [];
    let taskEntries = [];

    if (!latestSummary || !latestSummary?.summaryUpdatedAt) {
      activityEntries = await DailyActivities.find({ userId }).lean();
      goalsEntries = await Goals.find({ userId }).lean();
      taskEntries = await DailyTask.find({ userId }).lean();
    } else {
      const activityDate = new Date(latestActivity.updatedAt);
      const summaryDate = new Date(latestSummary.summaryUpdatedAt);

      const diffInDays = (activityDate - summaryDate) / (1000 * 60 * 60 * 24);

      if (diffInDays >= 3.99) {
        activityEntries = await DailyActivities.find({
          userId,
          updatedAt: { $gt: summaryDate },
        }).lean();
        taskEntries = await DailyTask.find({
          userId,
          updatedAt: { $gt: summaryDate },
        }).lean();
        goalsEntries = await Goals.find({
          userId,
          updatedAt: { $gt: summaryDate },
        }).lean();
      }
    }

    if (activityEntries.length === 0) {
      return res
        .status(204)
        .json({ message: "No new activities to summarize." });
    }

    const prompt = buildAIPrompt(
      { activities: activityEntries, goals: goalsEntries, tasks: taskEntries },
      "AISummary"
    );

    const previousRaw = latestSummary?.summary;
    const previousResponse =
      typeof previousRaw === "string" && previousRaw.trim().length > 0
        ? previousRaw.trim()
        : null;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
        You are a helpful and psychologically informed assistant that analyzes a user's emotional well-being and life balance based on their recent journal entries.
        Use scientific frameworks (e.g. PERMA, WHO-5) and research-based reasoning to evaluate how balanced their activities are.
        Be empathetic, concise, and solution-focused. Recommend realistic improvements if balance is lacking.
      `,
        },
        { role: "user", content: prompt },
        ...(previousResponse
          ? [
              {
                role: "user",
                content: `This was your previous summary: ${previousResponse} Use it only for reference to track user progress, tone, and structure.`,
              },
            ]
          : []),
      ],
      temperature: 0.6,
      user: userId?.toString(),
    });

    const advice = completion.choices[0]?.message?.content;

    if (!advice) {
      return res.status(500).json({ error: "No response from OpenAI." });
    }

    const scoreMatch = advice.match(/Balance Score:\s*(\d{1,3})/i);
    let score = scoreMatch ? parseInt(scoreMatch[1], 10) : null;

    if (score === null || isNaN(score) || score < 0 || score > 100) {
      console.warn("AI response missing or invalid score. Fallback applied.");
      score = calculateFallbackScore(activityEntries, ACTIVITY_CATEGORIES);
    }

    const updated = await AISummary.findOneAndUpdate(
      { userId },
      { summary: advice, summaryUpdatedAt: new Date(), score: score },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      summary: updated.summary,
      score: updated.score,
      summaryUpdatedAt: updated.summaryUpdatedAt,
    });
  } catch (error) {
    console.error("AI summary generation failed:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

export const getAISummary = async (req, res) => {
  const { userId } = req;

  try {
    const summary = await AISummary.findOne({ userId });

    if (!summary) {
      return res.status(404).json({ error: "No AI Summary found." });
    }

    return res.status(200).json(summary);
  } catch (error) {
    console.error("Error getting AI summary:", error);
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
};

export const generateGoalsInsight = async (req, res) => {
  const { userId } = req;

  const isAllowed = await checkAIEnabled(req, res);
  if (!isAllowed) return;

  try {
    const latestGoal = await Goals.findOne({ userId })
      .sort({ updatedAt: -1 })
      .lean();

    if (!latestGoal) {
      return res.status(404).json({ error: "No goals entries found." });
    }

    const latestSummary = await AISummary.findOne({ userId }).lean();

    let goalsEntries = [];

    if (!latestSummary || !latestSummary?.goalInsightUpdatedAt) {
      goalsEntries = await Goals.find({ userId }).lean();
    } else {
      const goalDate = new Date(latestGoal.updatedAt);
      const summaryDate = new Date(latestSummary.goalInsightUpdatedAt);

      const diffInDays = (goalDate - summaryDate) / (1000 * 60 * 60 * 24);

      if (diffInDays >= 0.99) {
        goalsEntries = await Goals.find({
          userId,
          updatedAt: { $gt: summaryDate },
        }).lean();
      }
    }

    if (goalsEntries.length === 0) {
      return res.status(204).json({ message: "No new goals to summarize." });
    }

    const prompt = buildAIPrompt({ goals: goalsEntries }, "goalInsight");

    const previousRaw = latestSummary?.goalInsight;
    const previousResponse =
      typeof previousRaw === "string" && previousRaw.trim().length > 0
        ? previousRaw.trim()
        : null;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
        You are a helpful and psychologically informed assistant that analyzes a user's well-being and life balance based on their recent goals entries.
        Use scientific frameworks (e.g. PERMA, WHO-5) and research-based reasoning. Your goal is to help the user improve their overall wellbeing by balancing life domains and achieving their personal goals.
        Be empathetic, concise, and solution-focused.
      `,
        },
        { role: "user", content: prompt },
        ...(previousResponse
          ? [
              {
                role: "user",
                content: `This was your previous summary: ${previousResponse} Use it only for reference to track user progress, tone, and structure.`,
              },
            ]
          : []),
      ],
      temperature: 0.6,
      user: userId?.toString(),
    });

    const advice = completion.choices[0]?.message?.content;

    if (!advice) {
      return res.status(500).json({ error: "No response from OpenAI." });
    }

    const updated = await AISummary.findOneAndUpdate(
      { userId },
      { goalInsight: advice, goalInsightUpdatedAt: new Date() },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      goalInsight: updated.goalInsight,
      updatedAt: updated.goalInsightUpdatedAt,
    });
  } catch (error) {
    console.error("AI goals summary generation failed:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

export const generateDailyTaskSuggestions = async (req, res) => {
  const { userId } = req;

  const isAllowed = await checkAIEnabled(req, res);
  if (!isAllowed) return;

  try {
    const today = new Date().toISOString().split("T")[0];
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const activityEntries = await DailyActivities.find({
      userId,
      updatedAt: { $gte: threeDaysAgo },
    }).lean();

    const taskEntries = await DailyTask.find({
      userId,
      date: today,
    }).lean();

    if (activityEntries.length === 0) {
      return res
        .status(404)
        .json({ error: "No recent activity entries found for suggestions." });
    }

    const prompt = buildAIPrompt(
      { activities: activityEntries, tasks: taskEntries },
      "dailyTaskSuggestions"
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
        You are a helpful and psychologically informed AI assistant that suggests personalized daily tasks to improve user well-being.
        Use scientific frameworks (e.g. PERMA, WHO-5) and research-based reasoning to suggest tasks that will help balance their life activities.
        Be practical, empathetic, and focus on achievable tasks that fit into a daily routine.
      `,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      user: userId?.toString(),
    });

    const suggestions = completion.choices[0]?.message?.content;

    if (!suggestions) {
      return res.status(500).json({ error: "No response from OpenAI." });
    }

    const taskSuggestions = suggestions
      .split("\n")
      .filter((line) => line.trim().startsWith("-"))
      .map((line) => line.replace(/^-\s*/, "").trim())
      .filter((task) => task.length > 0);

    return res.status(200).json({
      suggestions: taskSuggestions,
      generatedAt: new Date(),
    });
  } catch (error) {
    console.error("AI task suggestions generation failed:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

export const generateDailyMotivation = async (req, res) => {
  const { userId } = req;

  const isAllowed = await checkAIEnabled(req, res);
  if (!isAllowed) return;

  try {
    const today = new Date().toISOString().split("T")[0];
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const activityEntries = await DailyActivities.find({
      userId,
      updatedAt: { $gte: threeDaysAgo },
    }).lean();
    const goalsEntries = await Goals.find({ userId }).lean();
    const taskEntries = await DailyTask.find({
      userId,
      date: today,
      completed: false,
    }).lean();

    const prompt = buildAIPrompt(
      { activities: activityEntries, goals: goalsEntries, tasks: taskEntries },
      "dailyMotivation"
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
        You are an empathetic and encouraging AI motivational coach. Generate a very short, personalized daily motivation message (maximum 6-8 words) based on the user's recent activities, goals, and pending tasks.
        Be positive, inspiring, and specific to their situation. Focus on their strengths and encourage progress towards their goals.
        Keep it extremely concise and uplifting, like "Keep building those healthy habits!" or "Your progress is inspiring today!"
      `,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      user: userId?.toString(),
    });

    const motivation = completion.choices[0]?.message?.content;

    if (!motivation) {
      return res.status(500).json({ error: "No response from OpenAI." });
    }

    return res.status(200).json({
      motivation: motivation.trim(),
      generatedAt: new Date(),
    });
  } catch (error) {
    console.error("AI motivation generation failed:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

export const generatePersonalizedReminder = async (req, res) => {
  const { userId } = req;

  const isAllowed = await checkAIEnabled(req, res);
  if (!isAllowed) return;

  try {
    const today = new Date().toISOString().split("T")[0];
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const incompleteTasks = await DailyTask.find({
      userId,
      date: today,
      completed: false,
    }).lean();

    const activityEntries = await DailyActivities.find({
      userId,
      updatedAt: { $gte: threeDaysAgo },
    }).lean();

    const goalsEntries = await Goals.find({ userId }).lean();

    if (incompleteTasks.length === 0) {
      return res.status(200).json({
        reminder: "Great! All tasks completed for today.",
        generatedAt: new Date(),
      });
    }

    const prompt = buildAIPrompt(
      {
        activities: activityEntries,
        goals: goalsEntries,
        tasks: incompleteTasks,
      },
      "personalizedReminder"
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that creates gentle, action-oriented reminders for users to help them with their wellness journey. Keep responses very short and focused on encouraging action.`,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      user: userId?.toString(),
    });

    const reminder = completion.choices[0]?.message?.content;

    if (!reminder) {
      return res.status(500).json({ error: "No response from OpenAI." });
    }

    return res.status(200).json({
      reminder: reminder.trim(),
      generatedAt: new Date(),
    });
  } catch (error) {
    console.error("AI personalized reminder generation failed:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

export const generateDailyInsight = async (req, res) => {
  const { userId } = req;

  const isAllowed = await checkAIEnabled(req, res);
  if (!isAllowed) return;

  try {
    const latestActivity = await DailyActivities.findOne({ userId })
      .sort({ updatedAt: -1 })
      .lean();

    if (!latestActivity) {
      return res.status(404).json({ error: "No activity entries found." });
    }

    const latestSummary = await AISummary.findOne({ userId }).lean();

    let activityEntries = [];
    let taskEntries = [];

    if (!latestSummary || !latestSummary?.activityInsightUpdatedAt) {
      activityEntries = await DailyActivities.find({ userId })
        .sort({ date: -1 })
        .lean();
      taskEntries = await DailyTask.find({ userId }).lean();
    } else {
      const activityDate = new Date(latestActivity.updatedAt);
      const summaryDate = new Date(latestSummary.activityInsightUpdatedAt);

      const diffInDays = (activityDate - summaryDate) / (1000 * 60 * 60 * 24);

      if (diffInDays < 1) {
        return res.status(200).json({
          message: "There are no new activities to summarize.",
          activityInsight: latestSummary?.activityInsight || null,
          activityInsightUpdatedAt:
            latestSummary?.activityInsightUpdatedAt || null,
          reused: true,
        });
      }

      activityEntries = await DailyActivities.find({
        userId,
        updatedAt: { $gt: summaryDate },
      })
        .sort({ date: -1 })
        .lean();

      taskEntries = await DailyTask.find({
        userId,
        updatedAt: { $gt: summaryDate },
      }).lean();

      if (activityEntries.length < 3) {
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

        const fallbackActivities = await DailyActivities.find({
          userId,
          date: { $gte: twoWeeksAgo },
        })
          .sort({ date: -1 })
          .lean();

        const existingIds = activityEntries.map((entry) =>
          entry._id.toString()
        );

        const fallbackToAdd = fallbackActivities.filter(
          (entry) => !existingIds.includes(entry._id.toString())
        );

        const needed = 3 - activityEntries.length;
        activityEntries = [
          ...activityEntries,
          ...fallbackToAdd.slice(0, needed),
        ];
      }
    }

    if (activityEntries.length === 0) {
      return res.status(200).json({
        message: "There are no new activities to summarize.",
        activityInsight: latestSummary?.activityInsight || null,
        activityInsightUpdatedAt:
          latestSummary?.activityInsightUpdatedAt || null,
        reused: true,
      });
    }

    const prompt = buildAIPrompt(
      { activities: activityEntries, tasks: taskEntries },
      "dailyInsight"
    );

    const previousRaw = latestSummary?.activityInsight;
    const previousResponse =
      typeof previousRaw === "string" && previousRaw.trim().length > 0
        ? previousRaw.trim()
        : null;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
        You are a helpful and psychologically informed AI assistant that analyzes a user's emotional well-being and life balance based on their recent journal entries.
        Use scientific frameworks (e.g. PERMA, WHO-5) and research-based reasoning to evaluate how balanced their activities are.
        Be empathetic, concise, and solution-focused. Recommend realistic improvements if balance is lacking.
      `,
        },
        { role: "user", content: prompt },
        ...(previousResponse
          ? [
              {
                role: "user",
                content: `This was your previous summary: ${previousResponse} Use it only for reference to track user progress, tone, and structure.`,
              },
            ]
          : []),
      ],
      temperature: 0.6,
      user: userId?.toString(),
    });

    const advice = completion.choices[0]?.message?.content;

    if (!advice) {
      return res.status(500).json({ error: "No response from OpenAI." });
    }

    const updated = await AISummary.findOneAndUpdate(
      { userId },
      { activityInsight: advice, activityInsightUpdatedAt: new Date() },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      activityInsight: updated.activityInsight,
      activityInsightUpdatedAt: updated.activityInsightUpdatedAt,
    });
  } catch (error) {
    console.error("AI activities summary generation failed:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};
