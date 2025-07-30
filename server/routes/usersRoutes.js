import {
  getUserById,
  updateUser,
  deleteUser,
  uploadProfilePicture,
  deleteProfilePicture,
} from "../controllers/users.js";
import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import multer from "multer";
import rateLimiter from "../middlewares/rateLimiter.js";
import validateSchema from "../middlewares/validateSchema.js";
import { usersUpdateSchema } from "../schemas/userSchemas.js";
import path from "path";
import fs from "fs";

const usersRouter = Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

usersRouter
  .route("/")
  .get(verifyToken, getUserById)
  .put(verifyToken, validateSchema(usersUpdateSchema), updateUser)
  .delete(verifyToken, deleteUser);

usersRouter
  .route("/upload-profile-picture")
  .put(verifyToken, upload.single("profilePicture"), uploadProfilePicture);

usersRouter
  .route("/delete-profile-picture")
  .delete(verifyToken, deleteProfilePicture);

export default usersRouter;
