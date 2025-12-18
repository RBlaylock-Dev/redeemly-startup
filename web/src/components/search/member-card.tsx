"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LinkIcon, MapPin } from "lucide-react";
import Link from "next/link";

interface MemberCardProps {
  member: {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string;
    bio?: string;
    location?: string;
    website?: string;
  };
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 rounded-lg bg-white/50 backdrop-blur-sm border shadow-sm hover:shadow-md transition-shadow items-start md:items-center">
      {/* Avatar */}
      <Link href={`/app/profile/${member.username}`} className="shrink-0">
        <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-white shadow-sm">
          <AvatarImage src={member.avatar_url} />
          <AvatarFallback className="text-xl">
            {member.username?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>

      {/* Info */}
      <div className="flex-1 space-y-1">
        <Link
          href={`/app/profile/${member.username}`}
          className="hover:underline"
        >
          <h3 className="text-xl font-bold font-serif text-[#4A4A4A]">
            {member.full_name}
          </h3>
        </Link>
        {member.bio && (
          <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-1 max-w-2xl">
            {member.bio}
          </p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground pt-1">
          {member.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {member.location}
            </span>
          )}
          {member.website && (
            <a
              href={
                member.website.startsWith("http")
                  ? member.website
                  : `https://${member.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <LinkIcon className="h-3 w-3" /> Website
            </a>
          )}
          <span className="text-xs text-muted-foreground/60 italic">
            Joined from {member.location || "Unknown"}
          </span>
        </div>
      </div>

      {/* Action */}
      <div className="md:ml-auto shrink-0 w-full md:w-auto mt-2 md:mt-0">
        <Link href={`/app/profile/${member.username}`} className="w-full">
          <Button
            className="w-full bg-[#5C5C54] hover:bg-[#4a4a44] text-white shadow-sm font-medium"
            size="sm"
          >
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}
