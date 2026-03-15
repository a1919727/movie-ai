"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function GoogleSignInButton() {
  async function handleGoogleSignIn() {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
      Login with Google
    </Button>
  );
}
