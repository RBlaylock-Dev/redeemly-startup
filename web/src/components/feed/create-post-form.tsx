"use client";

import { useState } from "react";
import { createPost } from "@/app/actions/post";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CreatePostFormProps {
  userAvatarUrl?: string | null;
  userInitials?: string | null;
  placeholder?: string;
}

export function CreatePostForm({
  userAvatarUrl,
  userInitials,
  placeholder = "Share something...",
}: CreatePostFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      const result = await createPost(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Post shared!");
        // Reset form manually since we're using uncontrolled inputs effectively
        const form = document.getElementById(
          "create-post-form"
        ) as HTMLFormElement;
        form.reset();
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex gap-4 p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
      <Avatar className="h-10 w-10">
        <AvatarImage src={userAvatarUrl || undefined} />
        <AvatarFallback>{userInitials}</AvatarFallback>
      </Avatar>
      <form
        id="create-post-form"
        action={onSubmit}
        className="flex-1 flex flex-col gap-3"
      >
        <Textarea
          name="content"
          placeholder={placeholder}
          className="min-h-[80px] resize-none border-none focus-visible:ring-0 px-0 py-2 text-base"
        />
        <div className="flex justify-between items-center border-t pt-3">
          <div className="text-sm text-muted-foreground">
            {/* Optional: Add char count or attachments specific buttons later */}
          </div>
          <Button
            type="submit"
            size="sm"
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
