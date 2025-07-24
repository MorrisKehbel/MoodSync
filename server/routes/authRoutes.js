import { Router } from "express";

import verifyToken from "../middlewares/verifyToken.js";
import rateLimiter from "../middlewares/rateLimiter.js";
import validateSchema from "../middlewares/validateSchema.js";
import {
  userSchema,
  signInSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../schemas/userSchemas.js";
import {
  signUp,
  signIn,
  me,
  signOut,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.js";

const authRouter = Router();

authRouter
  .route("/signup")
  .post(rateLimiter, validateSchema(userSchema), signUp);

authRouter
  .route("/signin")
  .post(rateLimiter, validateSchema(signInSchema), signIn);

authRouter.route("/me").get(verifyToken, me);

authRouter.route("/signout").delete(signOut);

authRouter
  .route("/forgot-password")
  .post(rateLimiter, validateSchema(forgotPasswordSchema), forgotPassword);

authRouter
  .route("/reset-password")
  .post(rateLimiter, validateSchema(resetPasswordSchema), resetPassword);

export default authRouter;
