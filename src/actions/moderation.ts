"use server";

import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function deleteReviewByAdmin(reviewId: string) {
  await requireAdmin();

  await prisma.review.delete({
    where: { id: reviewId },
  });
}

export async function approveReview(reviewId: string) {
  await requireAdmin();

  await prisma.review.update({
    where: { id: reviewId },
    data: {
      aiStatus: "approve",
    },
  });
}
