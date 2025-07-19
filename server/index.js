import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";

import "./db/index.js";
import errorHandler from "./middlewares/errorHandler.js";

import authRouter from "./routes/authRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

const CLIENT = process.env.CLIENT_URL;

app.use(
  cors({
    origin: CLIENT,
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", authRouter);
app.use("/ai", aiRouter);

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
