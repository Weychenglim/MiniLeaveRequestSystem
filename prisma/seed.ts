import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingCount = await prisma.leaveRequest.count();

  if (existingCount > 0) {
    return;
  }

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

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
