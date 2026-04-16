import { prisma } from "@/lib/db/prisma";
import { IncomeInput } from "@/lib/validators/income";

const DEV_USER_EMAIL = "dev-user@budgeting-app.local";

/* Finds or creates the development user used until authentication is implemented. */
async function getOrCreateDevelopmentUser() {
  const existingUser = await prisma.user.findUnique({
    where: { email: DEV_USER_EMAIL },
  });

  if (existingUser) {
    return existingUser;
  }

  return prisma.user.create({
    data: {
      email: DEV_USER_EMAIL,
      name: "Development User",
    },
  });
}

/* Creates a new income record for the current development user */
export async function createIncome(data: IncomeInput) {
  const user = await getOrCreateDevelopmentUser();

  return prisma.income.create({
    data: {
      userId: user.id,
      sourceName: data.sourceName,
      amount: data.amount,
      frequency: data.frequency,
      nextExpectedDate: data.nextExpectedDate
        ? new Date(data.nextExpectedDate)
        : null,
      hourlyHours: data.hourlyHours ?? null,
      hourlyPaySchedule: data.hourlyPaySchedule ?? null,
    },
  });
}

/* Retrieves all income records for the current development user. */
export async function getIncomes() {
  const user = await getOrCreateDevelopmentUser();

  return prisma.income.findMany({
    where: { userId: user.id },
    orderBy: {
      createdAt: "desc",
    },
  });
}
