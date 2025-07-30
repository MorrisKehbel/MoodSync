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

export const DailyActivitiesSchema = z.object({
  note: z.string().max(1000, "Note is too long"),
  activities: z.array(z.string()),
  emotion: z.string().min(1, "Please select one emotion."),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

export const SingleEmotionUpdateSchema = z.array(
  z.object({
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    emotion: z.string(),
  })
);


//settings

export const usersUpdateSchema = z.object({
  username: z.string().min(3).max(32).optional(),
  firstname: z.string().max(32).optional(),
  lastname: z.string().max(32).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).max(128).optional(),
  settings: z.object({
    theme: z.enum(["light", "dark"]).optional(),
    aiTips: z.boolean().optional(),
    notifications: z.boolean().optional(),  
  })
  .optional(),
})
