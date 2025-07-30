import { isValidObjectId } from "mongoose";
import DailyActivities from "../models/Activities.js";

export const addDailyActivities = async (req, res) => {
  const {
    sanitizedBody: { note, activities, emotion, date },
    userId,
  } = req;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const existingEntry = await DailyActivities.findOne({ userId, date });

    if (existingEntry) {
      existingEntry.note = note;
      existingEntry.activities = activities;
      existingEntry.emotion = emotion;
      await existingEntry.save();

      return res.status(200).json({
        message: "Entry for this day has been updated.",
        entry: existingEntry,
      });
    }

    const newEntry = await DailyActivities.create({
      userId,
      note,
      activities,
      emotion,
      date,
    });
    return res.status(201).json({
      message: "Entry for this day has been created.",
      entry: newEntry,
    });
  } catch (error) {
    res.status(400).json({ error: "Invalid data", details: error.message });
  }
};

export const getAllDailyActivities = async (req, res) => {
  const { userId } = req;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const existingEntries = await DailyActivities.find({ userId }).lean();

    return res.status(200).json({ existingEntries });
  } catch (error) {
    res.status(400).json({ error: "Invalid data", details: error.message });
  }
};

export const getDailyActivitiesById = async (req, res) => {
  const {
    params: { date },
    userId,
  } = req;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const existingEntry = await DailyActivities.findOne({
      userId,
      date,
    }).lean();

    return res.status(200).json({ existingEntry });
  } catch (error) {
    res.status(400).json({ error: "Invalid data", details: error.message });
  }
};

export const updateDailyActivities = async (req, res) => {
  const { sanitizedBody, userId } = req;

  if (!Array.isArray(sanitizedBody) || sanitizedBody.length === 0) {
    return res.status(400).json({ error: "No updates provided" });
  }

  try {
    const results = await Promise.all(
      sanitizedBody.map(({ date, emotion }) =>
        DailyActivities.findOneAndUpdate(
          { userId, date },
          { emotion: emotion },
          { upsert: true }
        )
      )
    );

    return res
      .status(200)
      .json({ message: "Emotions updated", results: results });
  } catch (error) {
    res.status(400).json({ error: "Invalid data", details: error.message });
  }
};
