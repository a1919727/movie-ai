import { AuthForm } from "@/components/auth-form";

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
    <main className="flex min-h-screen items-center justify-center px-6">
      <AuthForm
        error={params.error}
        message={params.message}
        mode={mode}
        next={next}
      />
    </main>
  );
}
