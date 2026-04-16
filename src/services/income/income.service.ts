import { prisma } from "@/lib/db/prisma";
import { IncomeInput } from "@/lib/validators/income";

/* Creates a new income record for a specific user */
export async function createIncome(userId: string, data: IncomeInput) {
    return prisma.income.create({
        data: {
            userId,
            sourceName: data.sourceName,
            amount: data.amount,
            frequency: data.frequency,
            nextExpectedDate: data.nextExpectatedDate
                ? new Date(data.nextExpectatedDate)
                : null,
        },
    });
}