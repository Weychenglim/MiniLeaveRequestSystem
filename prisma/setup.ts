import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "LeaveRequest" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "name" TEXT NOT NULL,
      "startDate" DATETIME NOT NULL,
      "endDate" DATETIME NOT NULL,
      "reason" TEXT NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'PENDING',
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const existingCount = await prisma.leaveRequest.count();

  if (existingCount === 0) {
    await prisma.leaveRequest.createMany({
      data: [
        {
          name: "Aina Rahman",
          startDate: new Date("2026-06-17"),
          endDate: new Date("2026-06-19"),
          reason: "Family trip arranged before project planning.",
          status: "PENDING"
        },
        {
          name: "Daniel Lim",
          startDate: new Date("2026-06-22"),
          endDate: new Date("2026-06-22"),
          reason: "Medical appointment.",
          status: "APPROVED"
        },
        {
          name: "Priya Nair",
          startDate: new Date("2026-06-25"),
          endDate: new Date("2026-06-26"),
          reason: "Personal matters.",
          status: "REJECTED"
        }
      ]
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
