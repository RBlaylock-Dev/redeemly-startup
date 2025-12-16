"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Flame } from "lucide-react";

export function RecentVersesWidget() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="bg-white border-none shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-bold font-serif text-lg mb-4 text-primary">
            Recently Viewed
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { ref: "1 Thessalonians 5:11", time: "2m ago" },
              { ref: "Matthew 11:28", time: "15m ago" },
              { ref: "Cross References 5:17", time: "1h ago" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center group cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.ref}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button size="sm" className="bg-[#5C5C54] hover:bg-[#4a4a44]">
              Look Up
            </Button>
            <Button size="sm" variant="outline">
              History
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#F6F4EF] border-none shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-bold font-serif text-lg mb-4 text-primary">
            Trending Verses
          </h3>
          <div className="flex flex-col gap-3">
            {["2 Corinthians 5:17", "Jeremiah 29:11", "Isaiah 41:10"].map(
              (ref, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center p-2 rounded ${
                    i === 1 ? "bg-[#C9A24D]/20 border border-[#C9A24D]/30" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Flame
                      className={`h-3 w-3 ${
                        i === 1 ? "text-[#C9A24D]" : "text-muted-foreground"
                      }`}
                    />
                    <span className="text-sm font-medium">{ref}</span>
                  </div>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
