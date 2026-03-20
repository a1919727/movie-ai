import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { moderateReview } from "../src/lib/gemini";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const reviews = await prisma.review.findMany({
    where: {
      aiLabel: null,
    },
  });

  for (const review of reviews) {
    const moderation = await moderateReview(review.content);

    await prisma.review.update({
      where: { id: review.id },
      data: {
        aiLabel: moderation.label,
        aiReason: moderation.reason,
        aiCheckedAt: new Date(),
      },
    });
    console.log(`Updated review ${review.id}: ${moderation.label}`);
  }
}

main()
  .catch((error) => {
    console.error("Failed to detect review:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
