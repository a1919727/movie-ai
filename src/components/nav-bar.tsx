import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AvatarDropdown } from "./avatar-dropdown";
import { SearchBar } from "./search-bar";
import { Clapperboard } from "lucide-react";

export async function NavBar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <header className="mt-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 gap-3">
        <div className="flex gap-1">
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
    </header>
  );
}
