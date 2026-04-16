import { z } from "zod";

const incomeFrequencies = [
  "hourly",
  "weekly",
  "biweekly",
  "semimonthly",
  "monthly",
  "one-time",
] as const;

const hourlySchedules = ["weekly", "biweekly"] as const;

/* Validation schema for creating a new income source. */
export const incomeSchema = z
  .object({
    sourceName: z
      .string()
      .min(2, "Source name must be at least 2 characters long.")
      .max(100, "Source name must be 100 characters or fewer."),
    amount: z
      .number()
      .positive("Amount must be greater than zero.")
      .max(1000000, "Amount is too large."),
    frequency: z.enum(incomeFrequencies, {
      error: "Please select a valid income frequency.",
    }),
    nextExpectedDate: z.string().optional(),
    hourlyHours: z
      .number()
      .positive("Number of hours must be greater than zero.")
      .optional(),
    hourlyPaySchedule: z.enum(hourlySchedules).optional(),
  })
  .superRefine((data, context) => {
    if (data.frequency === "hourly") {
      if (data.hourlyHours === undefined) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["hourlyHours"],
          message: "Number of hours is required for hourly income.",
        });
      }

      if (!data.hourlyPaySchedule) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["hourlyPaySchedule"],
          message: "Hourly pay schedule is required for hourly income.",
        });
      }
    }
  });

/* Type derived from the income validation schema. */
export type IncomeInput = z.infer<typeof incomeSchema>;
