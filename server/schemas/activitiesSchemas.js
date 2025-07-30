import { z } from "zod/v4";

export const DailyActivitiesSchema = z.object({
  note: z.string().max(1000, "Note is too long").optional(),
  activities: z.array(z.string()).optional(),
  emotion: z.string().min(1, "Please select one emotion."),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

export const SingleEmotionUpdateSchema = z.array(
  DailyActivitiesSchema.pick({
    emotion: true,
    date: true,
  })
);
