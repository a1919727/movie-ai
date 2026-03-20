import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const profiles = [
    {
      id: "user-1",
      email: "user1@gamil.com",
      displayName: "Ava",
      avatarUrl: null,
    },
    {
      id: "user-2",
      email: "user2@gamil.com",
      displayName: "Li",
      avatarUrl: null,
    },
    {
      id: "user-3",
      email: "user3@gmail.com",
      displayName: "Juli",
      avatarUrl: null,
    },
    {
      id: "user-4",
      email: "user4@gamil.com",
      displayName: "Chen",
      avatarUrl: null,
    },
    {
      id: "user-5",
      email: "user5@gamil.com",
      displayName: "Lay",
      avatarUrl: null,
    },
    {
      id: "user-6",
      email: "user3@gmail.com",
      displayName: "Herny",
      avatarUrl: null,
    },
  ];

  for (const profile of profiles) {
    const existingProfile = await prisma.profile.findUnique({
      where: { email: profile.email },
    });

    if (existingProfile) {
      await prisma.profile.update({
        where: { id: existingProfile.id },
        data: {
          displayName: profile.displayName,
          avatarUrl: profile.avatarUrl,
        },
      });
    } else {
      await prisma.profile.create({
        data: profile,
      });
    }
  }

  const ratings = [
    {
      userId: "user-1",
      movieId: 1265609,
      value: 4,
    },
    {
      userId: "user-2",
      movieId: 1290821,
      value: 2,
    },
    {
      userId: "user-3",
      movieId: 83533,
      value: 5,
    },
    {
      userId: "user-4",
      movieId: 1523145,
      value: 3,
    },
    {
      userId: "user-6",
      movieId: 1523145,
      value: 4,
    },
    {
      userId: "user-5",
      movieId: 1290821,
      value: 4,
    },
    {
      userId: "user-3",
      movieId: 1290821,
      value: 2,
    },
    {
      userId: "user-6",
      movieId: 83533,
      value: 5,
    },
    {
      userId: "user-4",
      movieId: 1523145,
      value: 3,
    },
    {
      userId: "user-5",
      movieId: 1084242,
      value: 4,
    },
  ];

  for (const rating of ratings) {
    await prisma.rating.upsert({
      where: {
        userId_movieId: {
          userId: rating.userId,
          movieId: rating.movieId,
        },
      },
      update: {
        value: rating.value,
      },
      create: rating,
    });
  }

  const reviews = [
    {
      userId: "user-1",
      movieId: 1265609,
      content: "Worst film I've seen this year. The plot made no sense.",
    },
    {
      userId: "user-2",
      movieId: 1523145,
      content:
        "I really enjoyed this movie. The storyline was engaging and the acting was great.",
    },
    {
      userId: "user-3",
      movieId: 83533,
      content: "Check out this amazing crypto opportunity!!! www.crhpti.com",
    },
    {
      userId: "user-4",
      movieId: 1290821,
      content: "Great movie! Also check out www.scam.com for free gifts!",
    },
    {
      userId: "user-5",
      movieId: 1265609,
      content: "I liked the ending, it was unexpected but satisfying.",
    },
  ];

  for (const review of reviews) {
    await prisma.review.upsert({
      where: {
        userId_movieId: {
          userId: review.userId,
          movieId: review.movieId,
        },
      },
      update: {
        content: review.content,
      },
      create: review,
    });
  }

  console.log("Mock users, ratings, and reviews seeded.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
