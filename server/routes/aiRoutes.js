import { Router } from "express";

import verifyToken from "../middlewares/verifyToken.js";
import validateSchema from "../middlewares/validateSchema.js";

import { runAiScore, runAiDecisions, getAiHistory } from "../controllers/ai.js";

const aiRouter = Router();

aiRouter.route("/score").post(verifyToken, validateSchema(), runAiScore);

aiRouter
  .route("/personal/:id")
  .post(verifyToken, validateSchema(), runAiDecisions)
  .get(verifyToken, getAiHistory);

export default aiRouter;
