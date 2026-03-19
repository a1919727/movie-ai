"use server";

import { profileContent } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";

type UpdateProfile = {
  email: string;
  displayName: string;
  avatarUrl?: string | null;
};

export async function updateProfile({
  email,
  displayName,
  avatarUrl,
}: UpdateProfile) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");
  return profileContent({
    id: user.id,
    email,
    displayName,
    avatarUrl,
  });
}
