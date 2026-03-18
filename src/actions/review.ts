"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";

export async function saveReview(movieId: number, content: string) {
  const trimmedContent = content.trim();

  if (!trimmedContent) throw new Error("Failed to save review");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  await prisma.review.upsert({
    where: {
      userId_movieId: {
        userId: user.id,
        movieId,
      },
    },
    update: {
      content: trimmedContent,
    },
    create: {
      userId: user.id,
      movieId,
      content: trimmedContent,
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
