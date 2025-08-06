import { Router } from "express";

import verifyToken from "../middlewares/verifyToken.js";
import {
  generateAISummary,
  generateDailyInsight,
  generateGoalsInsight,
  generateDailyTaskSuggestions,
  generateDailyMotivation,
  generatePersonalizedReminder,
  getAISummary,
} from "../controllers/ai.js";

const aiRouter = Router();

aiRouter
  .route("/summary")
  .post(verifyToken, generateAISummary)
  .get(verifyToken, getAISummary);

aiRouter.route("/dailyinsight").post(verifyToken, generateDailyInsight);

aiRouter.route("/goalsinsight").post(verifyToken, generateGoalsInsight);

aiRouter
  .route("/task-suggestions")
  .post(verifyToken, generateDailyTaskSuggestions);

aiRouter.route("/motivation").post(verifyToken, generateDailyMotivation);

aiRouter.route("/reminder").post(verifyToken, generatePersonalizedReminder);

export default aiRouter;
