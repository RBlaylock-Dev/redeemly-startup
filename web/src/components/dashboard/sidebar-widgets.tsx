"use client";

import Link from "next/link";
import { ArrowRight, Play, Book, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SidebarWidgets() {
  return (
    <div className="flex flex-col gap-6">
      {/* Trending Bible Verses */}
      <Card className="bg-white shadow-sm border-none">
        <CardHeader className="pb-3 border-b border-border/50">
          <CardTitle className="text-lg font-bold font-serif text-primary">
            Trending Bible Verses
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid gap-4">
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <p className="font-bold text-sm text-foreground">
                2 Corinthians 5:17
              </p>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" /> 1.4k
              </span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1 italic">
              &quot;Therefore, if anyone is in Christ...&quot;
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <p className="font-bold text-sm text-foreground">
                Jeremiah 29:11
              </p>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" /> 3.5k
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <p className="font-bold text-sm text-foreground">Isaiah 41:10</p>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" /> 1.9k
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2 group"
            asChild
          >
            <Link href="/app/scripture">
              Look up Verse{" "}
              <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Featured Group */}
      <Card className="bg-white shadow-sm border-none overflow-hidden">
        <CardHeader className="pb-2 bg-[#F6F4EF]">
          <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
            Featured Group
          </span>
          <h3 className="text-lg font-bold text-primary font-serif">
            Recovery & Discipleship
          </h3>
        </CardHeader>
        <CardContent className="pt-4 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 bg-muted rounded-md shrink-0 bg-[url('/hero3.png')] bg-cover bg-center"></div>
            <p className="text-sm text-muted-foreground">
              Grow in faith and find support on your journey of healing.
            </p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <Button size="sm" className="bg-[#1f3d2b] hover:bg-[#2c4e3a]">
              Join Group
            </Button>
            <span className="text-xs text-muted-foreground">1.4k members</span>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Resources */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-bold font-serif text-primary">
          Recommended Resources
        </h3>

        <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
          <div className="h-10 w-10 flex items-center justify-center rounded bg-[#8C2F39]/10 text-[#8C2F39]">
            <Book className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold leading-tight">
              Overcoming Shame with God&apos;s Truth
            </p>
            <span className="text-[10px] uppercase font-bold text-muted-foreground border px-1 rounded mt-1 inline-block">
              Blog
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
          <div className="h-10 w-10 flex items-center justify-center rounded bg-[#1f3d2b]/10 text-[#1f3d2b]">
            <Play className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold leading-tight">
              Finding Healing in Christ: A Step-by-Step Guide
            </p>
            <span className="text-[10px] uppercase font-bold text-muted-foreground border px-1 rounded mt-1 inline-block">
              Video
            </span>
          </div>
        </div>
      </div>

      {/* Bible Study Guide */}
      <Card className="bg-[#1f3d2b] text-white shadow-sm border-none overflow-hidden">
        <div className="h-32 bg-gray-800 relative">
          {/* Placeholder for video thumbnail */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
              <Play className="h-5 w-5 fill-white text-white ml-1" />
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg font-serif">
            Faith in the Midst of Trials
          </h3>
          <Button
            size="sm"
            className="w-fit mt-3 bg-[#C9A24D] hover:bg-[#b08d42] text-black font-semibold"
          >
            Watch Now
          </Button>
        </CardContent>
      </Card>

      {/* Join Community CTA */}
      <div className="relative overflow-hidden rounded-xl bg-[#1f3d2b] p-6 text-center text-white shadow-md mt-4">
        <h3 className="text-2xl font-serif font-bold mb-2">
          Join the Community
        </h3>
        <p className="text-sm text-gray-200 mb-4 text-balance">
          Connect, share, and grow together in Christ.
        </p>
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white/10"
          >
            Get Started
          </Button>
          <Button className="bg-[#C9A24D] hover:bg-[#b08d42] text-black font-bold">
            Donate
          </Button>
        </div>
      </div>
    </div>
  );
}
