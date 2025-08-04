import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import verifyToken from "../middlewares/verifyToken.js";
import {
  addDailyTaskSchema,
  updateDailyTaskSchema,
} from "../schemas/dailyTasksSchemas.js";
import {
  addDailyTask,
  getDailyTasks,
  updateDailyTask,
  deleteDailyTask,
} from "../controllers/dailyTasks.js";

const router = Router();
router.post("/", verifyToken, validateSchema(addDailyTaskSchema), addDailyTask);
router.get("/", verifyToken, getDailyTasks);
router.patch(
  "/:taskId",
  verifyToken,
  validateSchema(updateDailyTaskSchema),
  updateDailyTask
);
router.delete("/:taskId", verifyToken, deleteDailyTask);

export default router;
