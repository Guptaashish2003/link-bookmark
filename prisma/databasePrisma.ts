// databasePrisma.ts
import dns from "dns";
dns.setDefaultResultOrder("ipv4first"); // 👈 Important fix

import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent hot-reload issue in Next.js
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const dataBasePrisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = dataBasePrisma;
