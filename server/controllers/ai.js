import OpenAI from "openai";
import DailyActivities from "../models/Activities.js";
import Goals from "../models/Goals.js";
import User from "../models/User.js";
import DailyTask from "../models/DailyTasks.js";
import AISummary from "../models/Ai.js";
import { buildAIPrompt } from "../utils/openAiUtils.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

export const generateDailyTaskSuggestions = async (req, res) => {
  const { userId } = req;

  const isAllowed = await checkAIEnabled(req, res);
  if (!isAllowed) return;

  try {
    const today = new Date().toISOString().split("T")[0];
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const activityEntries = await DailyActivities.find({ userId })
      .sort({ date: -1 })
      .select("note activities emotion -_id")
      .limit(7)
      .lean();

    const taskEntries = await DailyTask.find({
      userId,
      date: today,
    }).lean();

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
      .sort({ date: -1 })
      .lean();

    if (!latestActivity) {
      return res.status(404).json({ error: "No activity entries found." });
    }

    const latestSummary = await AISummary.findOne({ userId }).lean();

    if (latestSummary?.activityInsightUpdatedAt && latestActivity?.updatedAt) {
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
    }

    const activityEntries = await DailyActivities.find({ userId })
      .sort({ date: -1 })
      .select("note activities emotion -_id")
      .limit(7)
      .lean();

    if (activityEntries.length === 0) {
      return res.status(200).json({
        message: "There are no new activities to summarize.",
        activityInsight: latestSummary?.activityInsight || null,
        activityInsightUpdatedAt:
          latestSummary?.activityInsightUpdatedAt || null,
        reused: true,
      });
    }

    const taskEntries = await DailyTask.find({ userId })
      .sort({ createdAt: -1 })
      .select("title completed date -_id")
      .limit(7)
      .lean();

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
                role: "assistant",
                content: `This was your previous summary (for reference): ${previousResponse} Use it only for reference to track user progress, tone, and structure.`,
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

export const generateAiChat = async (req, res) => {
  const {
    sanitizedBody: { messages },
    userId,
  } = req;

  const isAllowed = await checkAIEnabled(req, res);
  if (!isAllowed) return;

  res.writeHead(200, {
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
  });

  try {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const twoWeeksAgoDate = new Date(now);
    twoWeeksAgoDate.setDate(now.getDate() - 14);
    const twoWeeksAgoStr = twoWeeksAgoDate.toISOString().slice(0, 10);

    const user = await User.findById(userId).select("username firstname -_id");

    const ActivitiesData = await DailyActivities.find({
      userId: userId,
      date: { $gte: twoWeeksAgoStr },
    })
      .sort({ date: -1 })
      .select("note activities emotion -_id")
      .lean();

    const GoalsData = await Goals.find({ userId })
      .select("title description -_id")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const userPrompt = `
The user has provided the following information:

Name of the user: ${user?.firstname || user?.username || "Unknown"}

Recent Activities (last 14 days): ${JSON.stringify(ActivitiesData, null, 2)}

Current Goals: ${JSON.stringify(GoalsData, null, 2)}

Latest message:
${messages[messages.length - 1]?.content || "No message"}

Please analyze the user's current state and respond directly to their message in a helpful way.
`;

    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
You are a friendly, psychologically informed AI assistant.
You can analyze a user's emotional well-being and life balance based on their recent activity logs and goals, but only if the user's question is about them or related to well-being, emotions, or balance.
Use psychological frameworks and research-based reasoning.
If balance is lacking, suggest realistic, specific improvements, offer at most one simple, realistic suggestion.
Respond briefly, clearly, and in a solution-focused conversational tone.
Stay motivating, accessible, and avoid unnecessary summaries or repetition.
          `,
        },
        { role: "user", content: userPrompt },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
