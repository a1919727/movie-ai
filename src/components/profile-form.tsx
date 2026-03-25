"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSubmitted(true);
    try {
      const supabase = createClient();
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      const payload: {
        email?: string;
        password?: string;
        data: {
          full_name: string;
          name: string;
        };
      } = {
        data: {
          full_name: trimmedName || initialName,
          name: trimmedName || initialName,
        },
      };

      if (!trimmedName || trimmedName.length < 2) {
        throw new Error("Display name must be at least 2 characters.");
      }
      if (!trimmedEmail) throw new Error("Email is required.");
      if (trimmedEmail !== initialEmail) payload.email = trimmedEmail;
      if (password.trim()) payload.password = password.trim();
      const { error: updateError } = await supabase.auth.updateUser(payload);

      if (updateError) throw updateError;
      await updateProfile({
        email: trimmedEmail,
        displayName: trimmedName,
      });

      setPassword("");
      router.refresh();
      toast.success("Profile has been updated");
    } catch (errorMessage) {
      console.log(errorMessage);
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitted(false);
    }
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

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitted}>
              {isSubmitted ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
