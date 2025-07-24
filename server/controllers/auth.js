import { isValidObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js";

const secret = process.env.JWT_SECRET;
const tokenOptions = { expiresIn: "14d" };
const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? "None" : "Lax",
  secure: isProduction,
  maxAge: 3 * 24 * 60 * 60 * 1000,
};

const signUp = async (req, res, next) => {
  try {
    const { username, password } = req.sanitizedBody;

    const found = await User.findOne({ username });
    if (found) throw new Error("Username already exists", { cause: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...req.sanitizedBody,
      password: hashedPassword,
    });

    const payload = { userId: user._id, userRole: user.role || "user" };

    const token = jwt.sign(payload, secret, tokenOptions);

    res.cookie("token", token, cookieOptions);

    res.status(201).json({ message: "Welcome" });
  } catch (error) {
    return next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const {
      sanitizedBody: { login, password, rememberme },
    } = req;

    const user = await User.findOne({
      $or: [{ username: login }, { email: login }],
    }).select("+password");

    if (!user) throw new Error("Invalid email or password", { cause: 401 });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      throw new Error("Invalid email or password", { cause: 401 });

    const payload = { userId: user._id, userRole: user.role || "user" };

    const token = jwt.sign(payload, secret, tokenOptions);

    const adjCookieOptions = {
      ...cookieOptions,
      maxAge: rememberme ? 28 * 24 * 60 * 60 * 1000 : 3 * 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, adjCookieOptions);

    res.status(201).json({ message: "Welcome back" });
  } catch (error) {
    return next(error);
  }
};

const me = async (req, res, next) => {
  try {
    const { userId } = req;

    if (!isValidObjectId(userId)) throw new Error("Invalid id", { cause: 400 });

    const user = await User.findById(userId).lean();

    if (!user) throw new Error("User not found", { cause: 404 });

    res.json(user);
  } catch (error) {
    return next(error);
  }
};

const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token", cookieOptions);

    res.json({ message: "You have logged out." });
  } catch (error) {
    return next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.sanitizedBody;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message:
          "If the email exists in our system, you will receive a password reset link.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000;
    await user.save();

    res.json({
      message: "Password reset token generated",
      resetToken,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    return next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.sanitizedBody;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Token is invalid or has expired", { cause: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    return next(error);
  }
};

export { signUp, signIn, me, signOut, forgotPassword, resetPassword };
