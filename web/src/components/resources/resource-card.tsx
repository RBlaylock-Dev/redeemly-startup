"use client";

import { useState } from "react";
import { toggleBookmark } from "@/app/actions/resources";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bookmark, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  resource: any;
  currentUserId: string;
}

export function ResourceCard({ resource, currentUserId }: ResourceCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(
    resource.resource_bookmarks?.some((b: any) => b.user_id === currentUserId)
  );

  async function handleBookmark() {
    setIsBookmarked(!isBookmarked); // Optimistic
    await toggleBookmark(resource.id);
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <Badge variant="secondary">{resource.category}</Badge>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8",
              isBookmarked && "text-yellow-500 fill-yellow-500"
            )}
            onClick={handleBookmark}
          >
            <Bookmark
              className={cn("h-4 w-4", isBookmarked && "fill-current")}
            />
          </Button>
        </div>
        <CardTitle className="pt-2 line-clamp-2">{resource.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {resource.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">
          Shared by {resource.profiles?.full_name || "Unknown"}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={resource.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit Resource
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
