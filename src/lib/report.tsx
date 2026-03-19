import { prisma } from "@/lib/db";

export async function getAllReports() {
  return prisma.report.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      reporter: true,
      review: {
        include: {
          user: true,
        },
      },
    },
  });
}
