import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AvatarDropdown } from "./avatar-dropdown";
import { SearchBar } from "./search-bar";
import { Clapperboard } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export async function NavBar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <header className="fixed w-full z-10 bg-background">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-10 py-4 gap-2">
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
            <Button variant="outline" asChild>
              <Link href="/auth">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
      <Separator />
    </header>
  );
}
