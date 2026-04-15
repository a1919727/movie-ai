"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { login, signup } from "@/lib/action";
import { signInWithGoogle } from "@/lib/auth";
import { FaGoogle } from "react-icons/fa";

type AuthFormProps = {
  error?: string;
  message?: string;
  mode: "login" | "signup";
  next: string;
};

export function AuthForm({ error, message, mode, next }: AuthFormProps) {
  async function handleGoogleSignIn() {
    await signInWithGoogle(next);
  }

  return (
    <Card className="w-full max-w-xl gap-6 rounded-2 border border-zinc-100 bg-white px-5 py-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:gap-8 sm:rounded-3xl sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <div className="flex w-full max-w-lg items-center">
        <div className="w-full">
          <CardHeader className="space-y-4 px-0">
            <CardTitle className="mb-6 text-center text-3xl font-bold sm:mb-8 sm:text-4xl">
              Movie.ai
            </CardTitle>
            <Tabs defaultValue={mode} className="w-full">
              <TabsList className="grid h-12 w-full grid-cols-2 rounded-full bg-muted/80 p-1 dark:bg-zinc-800 sm:h-14">
                <TabsTrigger
                  className="rounded-full dark:data-active:bg-zinc-900 dark:data-active:text-zinc-100"
                  value="login"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  className="rounded-full dark:data-active:bg-zinc-900 dark:data-active:text-zinc-100"
                  value="signup"
                >
                  Sign up
                </TabsTrigger>
              </TabsList>

              <CardContent className="px-0 pt-6 sm:pt-8">
                {error ? (
                  <p className="mb-4 rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </p>
                ) : null}
                {message ? (
                  <p className="mb-4 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700">
                    {message}
                  </p>
                ) : null}

                <TabsContent value="login">
                  <form action={login} className="space-y-5 sm:space-y-6">
                    <input type="hidden" name="next" value={next} />
                    <div className="grid gap-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="Please enter your email"
                        className="h-11 w-full sm:h-12"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="Please enter your password"
                        className="h-11 w-full sm:h-12"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="mt-5 h-11 w-full sm:mt-6 sm:h-12"
                    >
                      Login
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form action={signup} className="space-y-5 sm:space-y-6">
                    <input type="hidden" name="next" value={next} />
                    <div className="grid gap-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="Please enter your email"
                        className="h-11 w-full sm:h-12"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        placeholder="Please enter your password"
                        className="h-11 w-full sm:h-12"
                        minLength={6}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="mt-5 h-11 w-full sm:mt-6 sm:h-12"
                    >
                      Create an account
                    </Button>
                  </form>
                </TabsContent>
                <Button
                  variant="outline"
                  className="mt-5 h-11 w-full sm:mt-6 sm:h-12"
                  onClick={handleGoogleSignIn}
                >
                  <FaGoogle />
                  Continue with Google
                </Button>
              </CardContent>
            </Tabs>
          </CardHeader>
        </div>
      </div>
    </Card>
  );
}
