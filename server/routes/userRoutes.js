import { Router } from "express";

import verifyToken from "../middlewares/verifyToken.js";
import rateLimiter from "../middlewares/rateLimiter.js";
import validateSchema from "../middlewares/validateSchema.js";
import {
  DailyActivitiesSchema,
  SingleEmotionUpdateSchema,
} from "../schemas/userSchemas.js";

import {
  addDailyActivities,
  getAllDailyActivities,
  getDailyActivitiesById,
  updateDailyActivities,
} from "../controllers/user.js";

const userRouter = Router();

userRouter
  .route("/daily-entry")
  .post(verifyToken, validateSchema(DailyActivitiesSchema), addDailyActivities)
  .get(verifyToken, getAllDailyActivities)
  .put(
    verifyToken,
    validateSchema(SingleEmotionUpdateSchema),
    updateDailyActivities
  );

userRouter.route("/daily-entry/:date").get(verifyToken, getDailyActivitiesById);

export default userRouter;
