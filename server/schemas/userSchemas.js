import { z } from "zod/v4";

export const userSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must have at least 3 characters")
    .max(32, "Limit username to a maximum of 32 characters")
    .regex(/^[A-Za-z0-9]+$/, "Only letters and numbers are allowed"),
  firstname: z
    .string()
    .trim()
    .min(1, "First name must have at least 3 characters")
    .max(32, "Limit first name to a maximum of 32 characters")
    .optional(),
  lastname: z
    .string()
    .trim()
    .min(1, "Last name must have at least 3 characters")
    .max(32, "Limit last name to a maximum of 32 characters")
    .optional(),
  email: z
    .string()
    .trim()
    .email("Invalid e-mail address format")
    .transform((v) => v.toLowerCase()),
  password: z
    .string()
    .min(8, "Password must have at least 8 characters")
    .max(128, "Limit password to a maximum of 128 characters"),
  role: z.enum(["admin", "user"]).default("user"),
});

export const signInSchema = z.object({
  login: z.string().trim(),
  password: z
    .string()
    .min(8, "Password must have at least 8 characters")
    .max(128, "Limit password to a maximum of 128 characters"),
  rememberme: z.boolean().optional().default(false),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid e-mail address format")
    .transform((v) => v.toLowerCase()),
});

export const resetPasswordSchema = z.object({
  token: z.string().trim().min(1, "Reset token is required"),
  newPassword: z
    .string()
    .min(8, "Password must have at least 8 characters")
    .max(128, "Limit password to a maximum of 128 characters"),
});
