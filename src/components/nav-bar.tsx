import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AvatarDropdown } from "./avatar-dropdown";
import { SearchBar } from "./search-bar";
import { Clapperboard } from "lucide-react";
import { Separator } from "./ui/separator";

export async function NavBar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <header className="fixed w-full z-10 bg-background">
      <div className="mx-auto flex items-center justify-between gap-3 px-10 py-4">
        <div className="flex items-center gap-1">
          <Clapperboard />
          <Link href="/" className="font-bold">
            Movie.ai
          </Link>
        </div>

        <SearchBar />
        <div className="flex items-center gap-3">
          {user ? (
            <AvatarDropdown user={user} isAdmin={isAdmin} />
          ) : (
            <Link href="/auth">Sign in</Link>
          )}
        </div>
      </div>
      <Separator />
    </header>
  );
}
