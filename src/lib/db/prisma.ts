import { PrismaClient } from "@prisma/client";

/* Global Prisma client reference for development hot-reload protection */
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

/* Shared Prisma client instance used throughout the application */
export const prisma = 
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ["warn", "error"],
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}