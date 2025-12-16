"use client";

import { useState } from "react";
import { createPost } from "@/app/actions/feed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

interface CreatePostProps {
  user: any;
  groupId?: string;
}

export function CreatePost({ user, groupId }: CreatePostProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  function removeImage() {
    setImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }

  async function onSubmit() {
    if (!content.trim() && !image) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("content", content);
      if (groupId) {
        formData.append("groupId", groupId);
      }
      if (image) {
        formData.append("image", image);
      }

      const result = await createPost(formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Post created!");
        setContent("");
        removeImage();
      }
    } catch (error) {
      toast.error("Failed to create post.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback>
              {user.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <Textarea
              placeholder="Share something with the community..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="resize-none"
            />

            {previewUrl && (
              <div className="relative mt-2 inline-block">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-64 rounded-md object-cover border"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-sm hover:bg-destructive/90"
                  type="button"
                >
                  <span className="sr-only">Remove image</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <input
                  type="file"
                  id="image-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  Add Image
                </Button>
              </div>

              <Button
                onClick={onSubmit}
                disabled={isLoading || (!content.trim() && !image)}
                size="sm"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
