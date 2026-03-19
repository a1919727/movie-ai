"use server";

import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

export async function saveReport(
  reviewId: string,
  reason: string,
  description?: string,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");
  const trimmedReason = reason.trim();
  const trimmedDescription = description?.trim() || null;

  if (!trimmedReason) throw new Error("Report reason is required");

  await prisma.report.upsert({
    where: {
      reporterId_reviewId: {
        reporterId: user.id,
        reviewId,
      },
    },
    update: {
      reason: trimmedReason,
      description: trimmedDescription,
    },
    create: {
      reporterId: user.id,
      reviewId,
      reason: trimmedReason,
      description: trimmedDescription,
    },
  });
}
