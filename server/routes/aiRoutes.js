import { Router } from "express";

import verifyToken from "../middlewares/verifyToken.js";
import validateSchema from "../middlewares/validateSchema.js";
import {
  generateDailyInsight,
  generateDailyTaskSuggestions,
  generateDailyMotivation,
  generatePersonalizedReminder,
  getAISummary,
  generateAiChat,
} from "../controllers/ai.js";

import { userMessageSchema } from "../schemas/chat.js";

const aiRouter = Router();

aiRouter.route("/summary").get(verifyToken, getAISummary);

aiRouter.route("/dailyinsight").post(verifyToken, generateDailyInsight);

aiRouter
  .route("/task-suggestions")
  .post(verifyToken, generateDailyTaskSuggestions);

aiRouter.route("/motivation").post(verifyToken, generateDailyMotivation);

aiRouter.route("/reminder").post(verifyToken, generatePersonalizedReminder);
aiRouter
  .route("/chat")
  .post(verifyToken, validateSchema(userMessageSchema), generateAiChat);

export default aiRouter;
