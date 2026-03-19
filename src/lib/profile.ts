import { prisma } from "@/lib/db";

type ProfileInput = {
  id: string;
  email?: string | null;
  displayName?: string | null;
  avatarUrl?: string | null;
};

export async function profileContent({
  id,
  email,
  displayName,
  avatarUrl,
}: ProfileInput) {
  return prisma.profile.upsert({
    where: { id },
    update: {
      email,
      displayName,
      avatarUrl,
    },
    create: {
      id,
      email,
      displayName,
      avatarUrl,
    },
  });
}

export const profileInput = profileContent;
