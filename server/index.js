import dotenv from "dotenv";
dotenv.config();
console.log("CLIENT_URL:", process.env.CLIENT_URL);

import cors from "cors";
import express from "express";

import "./db/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import rateLimiter from "./middlewares/rateLimiter.js";

import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
import goalsRouter from "./routes/goalsRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

const CLIENT = process.env.CLIENT_URL;

app.set("trust proxy", true);
// app.use(rateLimiter); // Temporarily disabled for development

app.use(
  cors({
    origin: CLIENT,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/ai", aiRouter);
app.use("/users", usersRouter);
app.use("/goals", goalsRouter);

app.get("/", (_req, res) => {
  res.send("Running");
});

app.use("/*splat", (req, res) => {
  throw new Error("Page not found", { cause: 404 });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
