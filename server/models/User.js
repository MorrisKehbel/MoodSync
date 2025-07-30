import mongoose from "mongoose";
import { Schema, model } from "mongoose";


// export const User= mongoose.model("User", userSchema); // Exporting the User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minlength: 3,
      maxlength: 32,
    },
    firstname: { type: String },
    lastname: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },

    settings: {
      theme: { type: String, enum: ["light", "dark"], default: "light" },
      aiTips: { type: Boolean, default: true },
      notifications: { type: Boolean, default: true },
    },
    profilePicture: {
      url: { type: String },
      public_id: { type: String },
    },

    role: { type: String, enum: ["user", "admin"], default: "user" },
    resetPasswordToken: { type: String ,default: "" },
    resetPasswordExpires: { type: Date, default: ""  },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
