import { Schema, model } from "mongoose";

const dailyActivitiesSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    note: {
      type: String,
      maxlength: [1000, "Note must be at most 1000 characters long."],
      default: "",
    },
    activities: {
      type: [String],
      default: [],
    },
    emotion: {
      type: String,
      required: [true, "Please select one emotion."],
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

export default model("DailyActivities", dailyActivitiesSchema);
