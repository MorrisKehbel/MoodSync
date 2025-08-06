import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const progressSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Progress title is required"],
      maxlength: 100,
    },
    desc: {
      type: String,
      required: [true, "Progress description is required"],
      maxlength: 500,
    },
  },
  { _id: false }
);

const goalsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    title: {
      type: String,
      required: [true, "Goal title is required"],
      trim: true,
      maxlength: 100,
    },
    desc: {
      type: String,
      required: [true, "Goal description is required"],
      trim: true,
      maxlength: 1000,
    },
    category: {
      type: String,
      enum: [
        "Social",
        "Physical health",
        "Finances",
        "Job satisfaction",
        "Personal",
      ],
      required: [true, "Category is required"],
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
      required: true,
    },
    progress: {
      type: progressSchema,
      required: false,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Goals", goalsSchema, "goals_entries");
