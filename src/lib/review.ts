import { prisma } from "@/lib/db";

type GetFlaggedReviewsParams = {
  page: number;
  limit: number;
};

export async function getMovieReviews(movieId: number) {
  return prisma.review.findMany({
    where: { movieId },
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
    },
  });
}

export async function getUserReview(userId: string, movieId: number) {
  return prisma.review.findUnique({
    where: {
      userId_movieId: {
        userId,
        movieId,
      },
    },
    include: {
      user: true,
    },
  });
}

export async function getFlaggedReviews({
  page,
  limit,
}: GetFlaggedReviewsParams) {
  const currentPage = Math.max(1, page);
  const take = Math.max(1, limit);
  const skip = (currentPage - 1) * take;
  const [reviews, totalCount] = await Promise.all([
    prisma.review.findMany({
      where: {
        aiLabel: {
          in: ["spam", "negative"],
        },
        aiStatus: "flagged",
      },
      orderBy: {
        aiCheckedAt: "desc",
      },
      skip,
      take,
      include: {
        user: true,
      },
    }),
    prisma.review.count({
      where: {
        aiLabel: {
          in: ["spam", "negative"],
        },
        aiStatus: "flagged",
      },
    }),
  ]);
  return {
    reviews,
    totalCount,
    totalPages: Math.max(1, Math.ceil(totalCount / take)),
    currentPage,
  };
}
