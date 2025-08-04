import { Schema, model } from "mongoose";

const aiSummarySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    summary: {
      type: String,
    },
    summaryUpdatedAt: {
      type: Date,
    },

    activityInsight: {
      type: String,
    },
    activityInsightUpdatedAt: {
      type: Date,
    },

    goalInsight: {
      type: String,
    },
    goalInsightUpdatedAt: {
      type: Date,
    },

    score: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("AISummary", aiSummarySchema);
