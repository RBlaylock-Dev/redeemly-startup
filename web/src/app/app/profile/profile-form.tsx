"use client";

import { useState } from "react";
import { updateProfile } from "@/app/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AvatarUpload } from "./avatar-upload";
import { Loader2 } from "lucide-react";

interface ProfileFormProps {
  profile: any;
  userEmail?: string;
}

export function ProfileForm({ profile, userEmail }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      const result = await updateProfile(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form action={onSubmit} className="grid gap-4">
      <AvatarUpload
        currentAvatarUrl={profile.avatar_url}
        username={profile.username}
        email={userEmail}
      />

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={userEmail} disabled className="bg-muted" />
        <p className="text-[0.8rem] text-muted-foreground">
          {" "}
          Email cannot be changed.
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          defaultValue={profile.username || ""}
          placeholder="johndoe"
          minLength={3}
          required
        />
        <p className="text-[0.8rem] text-muted-foreground">
          This is your public display name.
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          defaultValue={profile.full_name || ""}
          placeholder="John Doe"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          defaultValue={profile.bio || ""}
          placeholder="Tell us a little bit about yourself"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="testimony">Testimony</Label>
        <Textarea
          id="testimony"
          name="testimony"
          defaultValue={profile.testimony || ""}
          placeholder="Share how Jesus has impacted your life (optional)"
          className="min-h-[120px]"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          defaultValue={profile.website || ""}
          placeholder="https://example.com"
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Changes
      </Button>
    </form>
  );
}
