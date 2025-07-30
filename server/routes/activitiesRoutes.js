import { Router } from "express";

import verifyToken from "../middlewares/verifyToken.js";
import rateLimiter from "../middlewares/rateLimiter.js";
import validateSchema from "../middlewares/validateSchema.js";
import {
  DailyActivitiesSchema,
  SingleEmotionUpdateSchema,
} from "../schemas/activitiesSchemas.js";

import {
  addDailyActivities,
  getAllDailyActivities,
  getDailyActivitiesById,
  updateDailyActivities,
} from "../controllers/activities.js";

const activitiesRouter = Router();

activitiesRouter
  .route("/daily-entry")
  .post(verifyToken, validateSchema(DailyActivitiesSchema), addDailyActivities)
  .get(verifyToken, getAllDailyActivities)
  .put(
    verifyToken,
    validateSchema(SingleEmotionUpdateSchema),
    updateDailyActivities
  );

activitiesRouter
  .route("/daily-entry/:date")
  .get(verifyToken, getDailyActivitiesById);

export default activitiesRouter;
