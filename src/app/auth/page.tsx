import Image from "next/image";
import { AuthForm } from "@/components/auth-form";
import bg from "../../public/bg.jpg";

type AuthPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
    mode?: string;
    next?: string;
  }>;
};

export default async function Auth({ searchParams }: AuthPageProps) {
  const params = await searchParams;
  const mode = params.mode === "signup" ? "signup" : "login";
  const next = params.next?.startsWith("/") ? params.next : "/profile";

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 lg:grid lg:grid-cols-2">
      <div className="relative min-h-[32vh] sm:min-h-[38vh] lg:min-h-screen">
        <Image
          src={bg}
          alt="Movie background"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1023px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/45 to-black/15" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 lg:bottom-20 lg:p-14">
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base lg:text-2xl lg:leading-9 lg:text-white/50">
            Sign in to search, rate movies, and write your reviews.
          </p>
        </div>
      </div>

      <div className="flex min-h-[68vh] items-start justify-center bg-zinc-50 px-4 py-6 dark:bg-zinc-950 sm:px-6 sm:py-8 lg:min-h-screen lg:items-center lg:px-16">
        <AuthForm
          error={params.error}
          message={params.message}
          mode={mode}
          next={next}
        />
      </div>
    </main>
  );
}
