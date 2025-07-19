import { isValidObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
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

export { signUp, signIn, me, signOut };
