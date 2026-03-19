import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileForm } from "@/components/profile-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth?next=/profile");

  const displayName =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email ??
    "User";
  const avatarUrl =
    user.user_metadata?.avatar_url ?? user.user_metadata?.picture ?? "";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <main className="mx-auto w-full max-w-2xl py-20">
      <div className="flex flex-col gap-10">
        <Card>
          <CardContent>
            <div className="space-y-6 flex items-center gap-10">
              <Avatar className="size-20 md:size-24">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback className="text-2xl font-bold">
                  {initial}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <p className="text-sm font-medium uppercase text-muted-foreground">
                  Profile
                </p>
                <h1 className="text-3xl font-bold text-foreground">
                  {displayName}
                </h1>
                <p className="text-sm text-muted-foreground md:text-base">
                  {user.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <ProfileForm
          initialName={displayName}
          initialEmail={user.email ?? ""}
        />
      </div>
    </main>
  );
}
