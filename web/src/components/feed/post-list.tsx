import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Post {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    full_name: string;
    username: string;
    avatar_url: string;
  };
}

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No posts yet. Be the first to share!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="border-0 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-800"
        >
          <CardHeader className="flex flex-row items-start gap-4 p-4">
            <Avatar>
              <AvatarImage src={post.profiles?.avatar_url} />
              <AvatarFallback>
                {post.profiles?.full_name?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {post.profiles?.full_name || "Unknown User"}
                </span>
                <span className="text-sm text-muted-foreground">
                  @{post.profiles?.username || "user"}
                </span>
                <span className="text-sm text-muted-foreground">
                  · {formatDistanceToNow(new Date(post.created_at))} ago
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </CardContent>
          <CardFooter className="p-2 border-t flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground"
            >
              <Heart className="h-4 w-4" />
              Like
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground"
            >
              <MessageSquare className="h-4 w-4" />
              Comment
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
