"use server";

import { createClient } from "@/lib/supabase/server";
import { moderateReview } from "@/lib/gemini";
import { prisma } from "@/lib/db";

export async function saveReview(movieId: number, content: string) {
  const trimmedContent = content.trim();

  if (!trimmedContent) throw new Error("Failed to save review");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const moderation = await moderateReview(trimmedContent);
  await prisma.review.upsert({
    where: {
      userId_movieId: {
        userId: user.id,
        movieId,
      },
    },
    update: {
      content: trimmedContent,
      aiLabel: moderation.label,
      aiReason: moderation.reason,
      aiCheckedAt: new Date(),
    },
    create: {
      userId: user.id,
      movieId,
      content: trimmedContent,
      aiLabel: moderation.label,
      aiReason: moderation.reason,
      aiCheckedAt: new Date(),
    },
  });
}

export async function deleteReview(movieId: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  await prisma.review.delete({
    where: {
      userId_movieId: {
        userId: user.id,
        movieId,
      },
    },
  });
}
