"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, FileText, ArrowRight } from "lucide-react";

export function ResourceSidebar() {
  return (
    <div className="flex flex-col gap-6">
      {/* Featured Video Card */}
      <div className="flex flex-col gap-3">
        <h3 className="font-serif font-bold text-xl text-primary">
          Featured Videos
        </h3>
        <Card className="bg-white border-none shadow-sm overflow-hidden group">
          <div className="relative h-48 bg-muted">
            <div className="absolute inset-0 bg-[url('/hero3.png')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform cursor-pointer border border-white/50">
                <Play className="h-5 w-5 fill-white text-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3">
              <Button
                size="sm"
                className="h-7 text-xs bg-[#C9A24D] hover:bg-[#b08d42] text-black font-bold"
              >
                Watch Now
              </Button>
            </div>
          </div>
          <CardContent className="p-4">
            <h4 className="font-bold text-foreground leading-tight mb-2">
              Faith in the Midst of Trials
            </h4>
            <p className="text-xs text-muted-foreground line-clamp-2">
              Video on holding fast to faith through difficult seasons and
              trusting God&apos;s plan.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Popular Articles Widget */}
      <div className="flex flex-col gap-3">
        <h3 className="font-serif font-bold text-xl text-primary">
          Popular Articles
        </h3>
        <div className="bg-[#F6F4EF] rounded-lg p-5">
          <div className="flex flex-col gap-4">
            {[
              "5 Steps to Strengthening Your Faith",
              "Walking Through Grief Community",
              "Trusting God's Plan in Difficult Times",
            ].map((title, i) => (
              <div
                key={i}
                className="flex gap-2 items-start group cursor-pointer"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <p className="text-sm font-medium leading-tight group-hover:text-primary transition-colors">
                  {title}
                </p>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full mt-6 bg-[#5C5C54] hover:bg-[#4a4a44] text-white border-transparent h-9 gap-2"
          >
            <Play className="h-3 w-3" /> Watch Now
          </Button>
        </div>
      </div>

      {/* Recently Added (Placeholder reuse style) */}
      <div className="flex flex-col gap-3">
        <h3 className="font-serif font-bold text-xl text-primary">
          Recently Added
        </h3>
        <div className="bg-white rounded-lg p-5 shadow-sm border border-border/50">
          <div className="flex flex-col gap-4">
            {[
              { title: "Of the Sorrow & 5:13", type: "Video" },
              { title: "Matthew 3:11", type: "Study" },
              { title: "Jeremiah 29:44", type: "Article" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center group cursor-pointer border-b border-border/30 last:border-0 pb-2 last:pb-0"
              >
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm font-medium group-hover:text-primary transition-colors truncate max-w-[150px]">
                    {item.title}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground bg-muted px-1 rounded">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4 bg-[#5C5C54] hover:bg-[#4a4a44] text-white font-bold h-9">
            Look Up Now
          </Button>
        </div>
      </div>
    </div>
  );
}
