import OpenAI from "openai";
import DailyActivities from "../models/Activities.js";
import User from "../models/User.js";
import AISummary from "../models/Ai.js";
import { buildAIPrompt, ACTIVITY_CATEGORIES } from "../utils/openAiUtils.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const calculateFallbackScore = (entries, categoryMap) => {
  const covered = new Set();

  for (const entry of entries) {
    for (const activity of entry.activities) {
      const category = categoryMap[activity];
      if (category) covered.add(category);
    }
  }

  const totalCategories = new Set(Object.values(categoryMap));
  const ratio = covered.size / totalCategories.size;
  return Math.round(ratio * 100);
};

export const generateAISummary = async (req, res) => {
  const { userId } = req;

  const today = new Date();
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 2);
  const isoDate = threeDaysAgo.toISOString().split("T")[0];

  try {
    const user = await User.findById(userId);
    if (user.settings.aiTips === false) {
      return res.status(403).json({
        error: "Data processing not allowed due to privacy settings.",
      });
    }

    const entries = await DailyActivities.find({
      userId,
      date: { $gte: isoDate },
    });

    if (!entries.length) {
      return res
        .status(404)
        .json({ error: "No activity entries found for the last 3 days." });
    }

    const prompt = buildAIPrompt(entries);

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
      ],
      temperature: 0.7,
    });

    const advice = completion.choices[0]?.message?.content;

    if (!advice) {
      return res.status(500).json({ error: "No response from OpenAI." });
    }

    const scoreMatch = advice.match(/Balance Score:\s*(\d{1,3})/i);
    let score = scoreMatch ? parseInt(scoreMatch[1], 10) : null;

    if (score === null || isNaN(score) || score < 0 || score > 100) {
      console.warn("AI response missing or invalid score. Fallback applied.");
      score = calculateFallbackScore(entries, ACTIVITY_CATEGORIES);
    }

    const updated = await AISummary.findOneAndUpdate(
      { userId },
      { summary: advice, score },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      summary: updated.summary,
      score: updated.score,
      updatedAt: updated.updatedAt,
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
    let summary = await AISummary.findOne({ userId });

    const now = new Date();
    const threeDaysAgo = new Date(now);
    threeDaysAgo.setDate(now.getDate() - 3);

    if (!summary || new Date(summary.updatedAt) < threeDaysAgo) {
      req.userId = userId;
      return await generateAISummary(req, res);
    }

    return res.status(200).json(summary);
  } catch (error) {
    console.error("Error getting AI summary:", error);
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
};
