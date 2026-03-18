import { prisma } from "@/lib/db";

export async function getMovieReviews(movieId: number) {
  return prisma.review.findMany({
    where: { movieId },
    orderBy: { createdAt: "desc" },
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
  });
}
