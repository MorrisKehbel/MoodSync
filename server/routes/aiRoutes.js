import { Router } from "express";

import verifyToken from "../middlewares/verifyToken.js";
import {
  generateAISummary,
  generateDailyInsight,
  generateGoalsInsight,
  getAISummary,
} from "../controllers/ai.js";

const aiRouter = Router();

aiRouter
  .route("/summary")
  .post(verifyToken, generateAISummary)
  .get(verifyToken, getAISummary);

aiRouter.route("/dailyinsight").post(verifyToken, generateDailyInsight);

aiRouter.route("/goalsinsight").post(verifyToken, generateGoalsInsight);

export default aiRouter;
