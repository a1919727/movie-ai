import { prisma } from "@/lib/db";

export async function getUserRating(userId: string, movieId: number) {
  return prisma.rating.findUnique({
    where: {
      userId_movieId: {
        userId,
        movieId,
      },
    },
  });
}

export async function getCommunityRating(movieId: number) {
  const result = await prisma.rating.aggregate({
    where: { movieId },
    _avg: { value: true },
  });

  return result._avg.value;
}
