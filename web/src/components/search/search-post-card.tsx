"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface SearchPostCardProps {
  post: {
    id: string;
    content: string;
    created_at: string;
    comment_count?: number; // Requires backend to count
    profiles: {
      username: string;
      full_name: string;
      avatar_url: string;
    };
  };
}

export function SearchPostCard({ post }: SearchPostCardProps) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg bg-white/50 backdrop-blur-sm border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <Link
          href={`/app/profile/${post.profiles.username}`}
          className="shrink-0"
        >
          <Avatar className="h-10 w-10 border border-white shadow-sm">
            <AvatarImage src={post.profiles.avatar_url} />
            <AvatarFallback>
              {post.profiles.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>

        {/* Content */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <Link
                href={`/app/profile/${post.profiles.username}`}
                className="font-bold text-[#4A4A4A] hover:underline font-serif text-lg"
              >
                {post.profiles.full_name}
              </Link>
              <span className="text-sm font-medium text-muted-foreground/80">
                · {post.content.slice(0, 40)}...
              </span>
            </div>
            {/* Date */}
            <span className="text-xs text-muted-foreground shrink-0 pl-2">
              {formatDistanceToNow(new Date(post.created_at), {
                addSuffix: true,
              })}
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {post.content.length > 200
              ? `${post.content.slice(0, 200)}...`
              : post.content}
          </p>
        </div>
      </div>

      {/* Footer / Comment Count */}
      <div className="flex justify-end border-t pt-2 border-border/40">
        <Link
          href={`/app/feed?post=${post.id}`}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <div className="bg-[#5C5C54] text-white rounded px-1.5 py-0.5 text-[10px] font-bold">
            {(post as any).comments_count || 0}
          </div>
          <span>Comments</span>
        </Link>
      </div>
    </div>
  );
}
