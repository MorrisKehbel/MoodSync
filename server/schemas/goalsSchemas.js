import { z } from "zod/v4";

const progressSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Progress title is required")
    .max(100, "Progress title must not exceed 100 characters"),
  desc: z
    .string()
    .trim()
    .min(1, "Progress description is required")
    .max(500, "Progress description must not exceed 500 characters"),
});

export const createGoalSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Goal title is required")
    .max(100, "Goal title must not exceed 100 characters"),
  desc: z
    .string()
    .trim()
    .min(1, "Goal description is required")
    .max(1000, "Goal description must not exceed 1000 characters"),
  status: z.enum(["active", "completed"]).default("active"),
  progress: progressSchema.optional(),
});

export const updateGoalSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Goal title is required")
    .max(100, "Goal title must not exceed 100 characters")
    .optional(),
  desc: z
    .string()
    .trim()
    .min(1, "Goal description is required")
    .max(1000, "Goal description must not exceed 1000 characters")
    .optional(),
  status: z.enum(["active", "completed"]).optional(),
  progress: progressSchema.optional(),
});

export const updateGoalStatusSchema = z.object({
  status: z.enum(["active", "completed"]),
});

export const updateGoalProgressSchema = z.object({
  progress: progressSchema,
});
