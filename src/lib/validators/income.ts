import { z } from "zod";

/* Validation schema for creating a new income source. */
export const incomeSchema = z.object({
    sourceName: z
        .string()
        .min(2, "Source name must be at lease 2 characters long."),
    amount: z.number().positive("Amount must be greater than zero."),
    frequency: z.string().min(1, "Frequency is required."),
    nextExpectatedDate: z.string().optional(),
});

/* Type derived from the income validation schema. */
export type IncomeInput = z.infer<typeof incomeSchema>;