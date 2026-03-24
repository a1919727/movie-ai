import { prisma } from "@/lib/db";

type GetReportsParams = {
  page: number;
  limit: number;
};

export async function getReports({ page, limit }: GetReportsParams) {
  const currentPage = Math.max(1, page);
  const take = Math.max(1, limit);
  const skip = (currentPage - 1) * take;
  const [reports, totalCount] = await Promise.all([
    prisma.report.findMany({
      where: { status: "open" },
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: {
        reporter: true,
        review: {
          include: {
            user: true,
          },
        },
      },
    }),
    prisma.report.count({
      where: { status: "open" },
    }),
  ]);

  return {
    reports,
    totalCount,
    totalPages: Math.max(1, Math.ceil(totalCount / take)),
    currentPage,
  };
}
