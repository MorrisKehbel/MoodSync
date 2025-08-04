import { Schema, model } from "mongoose";

const dailyTaskSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Task title is required"],
      maxlength: [200, "Task title must be at most 200 characters long."],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

dailyTaskSchema.index({ userId: 1, date: 1 });

export default model("DailyTask", dailyTaskSchema);
