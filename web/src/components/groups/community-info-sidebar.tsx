"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, MessageCircle, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CommunityInfoSidebar() {
  return (
    <div className="flex flex-col gap-6">
      {/* Community Info Card */}
      <Card className="bg-[#F6F4EF] border-none shadow-sm">
        <CardContent className="p-6">
          <h3 className="font-serif font-bold text-xl mb-4 text-primary">
            Community Info
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" /> Members
              </span>
              <span className="font-bold">2,465</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Layers className="h-4 w-4" /> Groups
              </span>
              <span className="font-bold">112</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <MessageCircle className="h-4 w-4" /> Active Chats
              </span>
              <span className="font-bold">347</span>
            </div>

            <Button className="w-full mt-2 bg-[#C9A24D] hover:bg-[#b08d42] text-black font-bold shadow-sm">
              Start Here
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Featured Sidebar Groups */}
      <div className="flex flex-col gap-4">
        <h4 className="font-serif font-bold text-lg text-primary">
          Featured Groups
        </h4>

        {/* Card 1 */}
        <div className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">
          <div className="absolute inset-0 bg-[url('/hero3.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
          <div className="relative p-6 text-white min-h-[160px] flex flex-col justify-end">
            <h5 className="font-bold text-lg mb-1">
              Marriage Support & Renewal
            </h5>
            <p className="text-xs text-gray-200 line-clamp-2 mb-3">
              Biblical encouragement and support for marriages.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-[10px] bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                2.1k Members
              </span>
              <Button
                size="sm"
                className="bg-[#C9A24D] hover:bg-[#b08d42] text-black h-7 text-xs font-bold"
              >
                Join Group
              </Button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">
          <div className="absolute inset-0 bg-[url('/hero3.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
          <div className="relative p-6 text-white min-h-[160px] flex flex-col justify-end">
            <h5 className="font-bold text-lg mb-1">Single Parents Support</h5>
            <p className="text-xs text-gray-200 line-clamp-2 mb-3">
              Community and support for single parents raising children.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-[10px] bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                Local
              </span>
              <Button
                size="sm"
                className="bg-[#C9A24D] hover:bg-[#b08d42] text-black h-7 text-xs font-bold"
              >
                Join Group
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
