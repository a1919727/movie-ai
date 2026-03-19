import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ModeToggle } from "@/components/mode-toggle";
import { AvatarDropdown } from "./avatar-dropdown";
import { SearchBar } from "./search-bar";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold">
          Movie.ai
        </Link>

        <SearchBar />
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-5">
            <Link href="/movies">Movies</Link>
          </nav>

          <div className="flex items-center gap-3">
            <ModeToggle />
            {user ? (
              <AvatarDropdown user={user} />
            ) : (
              <Link href="/auth">Sign in</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
