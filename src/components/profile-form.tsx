"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

type ProfileFormProps = {
  initialName: string;
  initialEmail: string;
};

export function ProfileForm({ initialName, initialEmail }: ProfileFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSubmitted(true);
    setMessage(null);
    setError(null);

    try {
      const supabase = createClient();
      const payload: {
        email?: string;
        password?: string;
        data: {
          full_name: string;
        };
      } = {
        data: {
          full_name: name.trim() || initialName,
        },
      };

      if (!name.trim() || name.trim().length < 2) {
        throw new Error("Display name must be at least 2 characters.");
      }
      if (!email.trim()) throw new Error("Email is required.");
      if (email.trim() !== initialEmail) payload.email = email.trim();
      if (password.trim()) payload.password = password.trim();
      const { error: updateError } = await supabase.auth.updateUser(payload);

      if (updateError) throw updateError;

      setPassword("");
      setMessage("Profile has been updated");
      router.refresh();
    } catch (errorMessage) {
      console.log(errorMessage);
      setError("Failed to update profile");
    } finally {
      setIsSubmitted(false);
    }
  }

  function handleReset() {
    setName(initialName);
    setEmail(initialEmail);
    setPassword("");
    setMessage(null);
    setError(null);
  }

  return (
    <Card>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-5">
            <Label htmlFor="display-name" className="font-bold">
              Display name
            </Label>
            <Input
              id="display-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your display name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="font-bold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="font-bold">
              New password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep your current password"
            />
          </div>

          {message ? (
            <p className="text-sm text-foreground">{message}</p>
          ) : null}
          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit" disabled={isSubmitted}>
              {isSubmitted ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
