import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/">Movie.ai</Link>

        <nav className="flex items-center gap-4">
          <Link href="/">Home</Link>
          <Link href="/search">Search</Link>
          <Link href="/movies">Movies</Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* <button type="button">Theme</button> */}
          <ModeToggle />
          <Link href="/auth">Sign in</Link>
        </div>
      </div>
    </header>
  );
}
