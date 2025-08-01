import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected successfully.");
} catch (error) {
  console.error("Unable to connect to MongoDB:", error);
  process.exit(1);
}
