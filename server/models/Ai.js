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
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("AISummary", aiSummarySchema);
