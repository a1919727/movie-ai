"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function buildAuthRedirect(
  mode: "login" | "signup",
  params: Record<string, string | undefined>,
) {
  const searchParams = new URLSearchParams();

  searchParams.set("mode", mode);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  return `/auth?${searchParams.toString()}`;
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  const next = (formData.get("next") as string) || "/profile";
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    redirect(
      buildAuthRedirect("login", {
        error: error.message,
        next,
      }),
    );
  }

  revalidatePath("/", "layout");
  redirect(next);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const next = (formData.get("next") as string) || "/profile";
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: authData, error } = await supabase.auth.signUp(data);

  if (error) {
    redirect(
      buildAuthRedirect("signup", {
        error: error.message,
        next,
      }),
    );
  }

  revalidatePath("/", "layout");

  if (!authData.session) {
    redirect(
      buildAuthRedirect("signup", {
        message: "Check your email to confirm sign up.",
        next,
      }),
    );
  }

  redirect(next);
}
