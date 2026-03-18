"use server";

import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

export async function saveRating(movieId: number, value: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  return prisma.rating.upsert({
    where: {
      userId_movieId: {
        userId: user.id,
        movieId,
      },
    },
    update: {
      value,
    },
    create: {
      userId: user.id,
      movieId,
      value,
    },
  });
}
