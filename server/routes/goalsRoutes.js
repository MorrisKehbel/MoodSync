import { Router } from "express";

import verifyToken from "../middlewares/verifyToken.js";
import rateLimiter from "../middlewares/rateLimiter.js";
import validateSchema from "../middlewares/validateSchema.js";

import {
  createGoalSchema,
  updateGoalSchema,
  updateGoalStatusSchema,
  updateGoalProgressSchema,
} from "../schemas/goalsSchemas.js";

import {
  createGoal,
  getAllGoals,
  getGoalById,
  updateGoal,
  updateGoalStatus,
  updateGoalProgress,
  deleteGoal,
  getGoalsStats,
} from "../controllers/goals.js";

const goalsRouter = Router();

goalsRouter
  .route("/")
  .post(verifyToken, validateSchema(createGoalSchema), createGoal)
  .get(verifyToken, getAllGoals);

goalsRouter.route("/stats").get(verifyToken, getGoalsStats);

goalsRouter
  .route("/:goalId")
  .get(verifyToken, getGoalById)
  .put(verifyToken, validateSchema(updateGoalSchema), updateGoal)
  .delete(verifyToken, deleteGoal);

goalsRouter
  .route("/:goalId/status")
  .patch(verifyToken, validateSchema(updateGoalStatusSchema), updateGoalStatus);

goalsRouter
  .route("/:goalId/progress")
  .patch(
    verifyToken,
    validateSchema(updateGoalProgressSchema),
    updateGoalProgress
  );

export default goalsRouter;
