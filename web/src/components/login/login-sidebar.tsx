import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, Users, BookOpen } from "lucide-react";
import Image from "next/image";

export function LoginSidebar() {
  return (
    <div className="space-y-6">
      {/* Community Hub Preview */}
      <div className="bg-[#EBE9E4] rounded-sm p-4 shadow-sm border border-[#D6D4CE]">
        <h3 className="font-serif font-bold text-xl text-[#4A443E] mb-4 border-b border-[#D6D4CE] pb-2">
          Community Hub
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[#5C5855] p-2 hover:bg-white/50 rounded transition-colors cursor-default">
            <Users className="h-5 w-5" />
            <span className="font-medium">Connect with Believers</span>
          </div>
          <div className="flex items-center gap-3 text-[#5C5855] p-2 hover:bg-white/50 rounded transition-colors cursor-default">
            <BookOpen className="h-5 w-5" />
            <span className="font-medium">Daily Devotions & Resources</span>
          </div>
        </div>
      </div>

      {/* Featured Groups Preview */}
      <div className="bg-[#EBE9E4] rounded-sm p-4 shadow-sm border border-[#D6D4CE]">
        <h3 className="font-serif font-bold text-xl text-[#4A443E] mb-4 border-b border-[#D6D4CE] pb-2">
          Featured Groups
        </h3>

        <div className="space-y-4">
          {/* Group 1 */}
          <div className="bg-[#F6F4EF] rounded border border-[#D6D4CE] overflow-hidden">
            <div className="relative h-32 w-full">
              <Image
                src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=600&auto=format&fit=crop"
                alt="Group"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <h4 className="font-bold text-[#4A443E] mb-1">
                Recovery & Discipleship
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span>1.7k Members</span>
                <span>• Online</span>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant="secondary"
                  className="text-[10px] px-1 py-0 h-5 bg-[#EBE9E4]"
                >
                  Video
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-[10px] px-1 py-0 h-5 bg-[#EBE9E4]"
                >
                  Support
                </Badge>
              </div>
            </div>
          </div>

          {/* Group 2 */}
          <div className="bg-[#F6F4EF] rounded border border-[#D6D4CE] overflow-hidden">
            <div className="relative h-32 w-full">
              <Image
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop"
                alt="Group"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white text-xs h-7"
                >
                  <PlayCircle className="h-3 w-3 mr-1" /> Watch Intro
                </Button>
              </div>
            </div>
            <div className="p-3">
              <h4 className="font-bold text-[#4A443E] mb-1">
                Women&apos;s Healing & Encouragement
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>2.2k Members</span>
                <span>• Active Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
