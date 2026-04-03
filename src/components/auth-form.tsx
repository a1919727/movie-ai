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
    <Card className="w-full max-w-sm gap-6 px-5 py-10">
      <CardHeader className="space-y-4">
        <CardTitle className="text-center text-2xl font-bold">
          Movie.ai
        </CardTitle>
        <Tabs defaultValue={mode} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>

          <CardContent className="px-0 pt-6">
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
              <form action={login} className="space-y-6">
                <input type="hidden" name="next" value={next} />
                <div className="grid gap-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="Please enter your email"
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
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form action={signup} className="space-y-6">
                <input type="hidden" name="next" value={next} />
                <div className="grid gap-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="Please enter your email"
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
                    minLength={6}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create account
                </Button>
              </form>
            </TabsContent>
            <Button
              variant="outline"
              className="w-full mt-5"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle />
              Continue with Google
            </Button>
          </CardContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
}
