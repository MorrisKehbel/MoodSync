import { Router } from "express";

import verifyToken from "../middlewares/verifyToken.js";
import { generateAISummary, getAISummary } from "../controllers/ai.js";

const aiRouter = Router();

aiRouter
  .route("/summary")
  .post(verifyToken, generateAISummary)
  .get(verifyToken, getAISummary);

export default aiRouter;
