"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { createComment } from "@/app/actions/feed";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

interface CommentSectionProps {
  postId: string;
  currentUserAvatarUrl?: string | null;
}

export function CommentSection({
  postId,
  currentUserAvatarUrl,
}: CommentSectionProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchComments() {
      const { data } = await supabase
        .from("comments")
        .select(
          `
          *,
          profiles (
            full_name,
            avatar_url,
            username
          )
        `
        )
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (data) setComments(data);
      setIsInitialLoading(false);
    }

    fetchComments();

    // Subscribe to new comments
    const channel = supabase
      .channel(`comments:${postId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `post_id=eq.${postId}`,
        },
        async (payload) => {
          // Fetch the full comment with profile to add to state
          const { data } = await supabase
            .from("comments")
            .select(`*, profiles(full_name, avatar_url, username)`)
            .eq("id", payload.new.id)
            .single();

          if (data) {
            setComments((prev) => [...prev, data]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, supabase]);

  async function onSubmit() {
    if (!content.trim()) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("postId", postId);
      formData.append("content", content);

      const result = await createComment(formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        setContent("");
      }
    } catch {
      toast.error("Failed to post comment.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isInitialLoading) {
    return (
      <div className="text-center text-sm text-muted-foreground py-2">
        Loading comments...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* List Comments */}
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 text-sm">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.profiles?.avatar_url} />
              <AvatarFallback>
                {comment.profiles?.full_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted p-3 rounded-lg flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">
                  {comment.profiles?.full_name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.created_at), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment */}
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={onSubmit}
          disabled={!content.trim() || isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
