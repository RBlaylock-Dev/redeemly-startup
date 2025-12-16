"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Hand, Heart, MessageSquare } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReportDialog } from "@/components/moderation/report-dialog";
import { CommentSection } from "@/components/feed/comment-section";
import { toggleReaction } from "@/app/actions/feed";
import { toast } from "sonner";

interface Profile {
  full_name: string;
  username: string;
  avatar_url: string;
}

interface Reaction {
  user_id: string;
  type: "AMEN" | "PRAYED";
}

interface Post {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  image_url?: string | null;
  profiles: Profile | null;
  // Assuming these might be passed or we handle them locally
  reactions?: Reaction[];
  comments_count?: number;
}

export interface PostCardProps {
  post: Post;
  currentUserId: string;
}

export function PostCard({ post, currentUserId }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [optimisticReactions, setOptimisticReactions] = useState<Reaction[]>(
    post.reactions || []
  );

  const userReaction = optimisticReactions.find(
    (r) => r.user_id === currentUserId
  );

  const getReactionCount = (type: "AMEN" | "PRAYED") => {
    return optimisticReactions.filter((r) => r.type === type).length;
  };

  const commentCount = post.comments_count || 0;

  async function handleReaction(type: "AMEN" | "PRAYED") {
    // Optimistic update
    const previousReactions = [...optimisticReactions];

    setOptimisticReactions((current) => {
      const existing = current.find((r) => r.user_id === currentUserId);

      if (existing) {
        if (existing.type === type) {
          // Remove reaction
          return current.filter((r) => r.user_id !== currentUserId);
        } else {
          // Change reaction
          return current.map((r) =>
            r.user_id === currentUserId ? { ...r, type } : r
          );
        }
      } else {
        // Add reaction
        return [...current, { user_id: currentUserId, type }];
      }
    });

    try {
      await toggleReaction(post.id, type);
    } catch {
      // Revert on error
      setOptimisticReactions(previousReactions);
      toast.error("Failed to update reaction");
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4 py-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={post.profiles?.avatar_url} />
            <AvatarFallback>
              {post.profiles?.full_name?.charAt(0) ||
                post.profiles?.username?.charAt(0) ||
                "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">
              {post.profiles?.full_name || "Unknown"}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.created_at), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>

        {currentUserId !== post.user_id && <ReportDialog postId={post.id} />}
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="whitespace-pre-wrap">{post.content}</p>

        {post.image_url && (
          <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
            <Image
              src={post.image_url}
              alt="Post attachment"
              fill
              className="object-cover"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col pt-4">
        <div className="flex w-full items-center justify-between border-t py-2">
          <div className="flex gap-2">
            {/* Reactions Buttons */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "gap-1",
                userReaction?.type === "AMEN" && "text-blue-600"
              )}
              onClick={() => handleReaction("AMEN")}
            >
              <Hand className="h-4 w-4" />
              <span className="text-xs">
                {getReactionCount("AMEN") || ""} Amen
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "gap-1",
                userReaction?.type === "PRAYED" && "text-purple-600"
              )}
              onClick={() => handleReaction("PRAYED")}
            >
              <Heart className="h-4 w-4" />
              <span className="text-xs">
                {getReactionCount("PRAYED") || ""} Prayed
              </span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">{commentCount} Comments</span>
          </Button>
        </div>

        {showComments && (
          <div className="w-full pt-4 border-t mt-2">
            <CommentSection postId={post.id} currentUserAvatarUrl={null} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
