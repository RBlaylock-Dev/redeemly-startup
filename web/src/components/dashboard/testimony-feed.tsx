"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Heart, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonies = [
  {
    author: "Sarah Jordan",
    time: "5:23h",
    avatar: "/avatars/sarah.jpg",
    verse: "Romans 1:27",
    content:
      "Today marks one year since I gave my life to Jesus and began my journey of recovery and healing. The Lord has done so much in my life, and I am grateful beyond words. God is so good! #testimony #grace.",
    likes: 573,
    comments: 145,
    hasImage: false,
  },
  {
    author: "Jason Mitchell",
    time: "80 m",
    avatar: "/avatars/jason.jpg",
    content:
      "Praise God! So happy for you, Sarah. Your testimony is inspiring.",
    likes: 24,
    comments: 2,
    hasImage: false,
    isReply: true,
  },
  {
    author: "James Peterson",
    time: "2h",
    avatar: "/avatars/james.jpg",
    content: "From addiction to freedom in Christ. Read my story...",
    hasImage: true,
    image: "/testimony-james.jpg",
    likes: 32,
    comments: 5,
  },
];

export function TestimonyFeed() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif font-bold text-primary">
          Popular Testimonies
        </h2>
        <Button
          variant="link"
          className="text-sm text-muted-foreground p-0 h-auto"
        >
          View All Testimonies
        </Button>
      </div>

      {testimonies.slice(0, 1).map((post, i) => (
        <Card
          key={i}
          className="bg-[#FBFBF9] border-none shadow-sm overflow-hidden"
        >
          <CardContent className="p-6 pb-2">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                  <AvatarImage src={post.avatar} />
                  <AvatarFallback className="bg-[#C9A24D] text-white">
                    {post.author[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-foreground leading-none">
                      {post.author}
                    </h3>
                    <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      {post.time}
                    </span>
                  </div>
                  {post.verse && (
                    <p className="text-xs font-medium text-secondary mt-1">
                      {post.verse}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>

            <p className="text-base leading-relaxed text-foreground/90 mb-4 font-serif">
              {post.content}
            </p>

            <div className="border-t border-border/50 py-3 mt-4 flex justify-between items-center text-muted-foreground text-sm">
              <div className="flex gap-4">
                <div className="flex -space-x-2 mr-2">
                  {/* Mock user stack */}
                  <div className="h-6 w-6 rounded-full bg-blue-100 border border-white"></div>
                  <div className="h-6 w-6 rounded-full bg-green-100 border border-white"></div>
                  <div className="h-6 w-6 rounded-full bg-secondary text-white text-[10px] flex items-center justify-center border border-white">
                    <Heart className="h-3 w-3 fill-current" />
                  </div>
                </div>
                <span>{post.likes} Likes</span>
                <span>{post.comments} Comments</span>
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <MessageSquare className="h-4 w-4" />{" "}
                  <span className="hidden sm:inline">Comment</span>
                </button>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <Share2 className="h-4 w-4" />{" "}
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>
          </CardContent>
          <div className="bg-white p-4 border-t border-border/50 flex gap-3 items-center">
            <Avatar className="h-8 w-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 bg-muted/30 rounded-full px-4 py-2 text-sm text-muted-foreground border border-transparent hover:border-border cursor-text transition-colors">
              Add a comment...
            </div>
          </div>
        </Card>
      ))}

      {/* Reply Card */}
      <Card className="bg-white border-none shadow-sm p-4 pl-10 opacity-90 relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border/40"></div>
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm shrink-0">
            <AvatarFallback className="bg-[#1f3d2b] text-white">
              JM
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-bold text-sm">
              Jason Mitchell{" "}
              <span className="font-normal text-muted-foreground text-xs ml-2">
                80 m ago
              </span>
            </h4>
            <p className="text-sm mt-1">
              Praise God! So happy for you, Sarah. Your testimony is inspiring.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
