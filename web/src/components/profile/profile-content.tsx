"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock Data for Resources
const RESOURCES = [
  {
    id: 1,
    title: "Overcoming Shame with God's Truth",
    description:
      "How to break free from guilt and embrace God's love and forgiveness.",
    type: "Blog",
    date: "Oct 8, 2024",
    stats: "573 views",
    image:
      "https://images.unsplash.com/photo-1507537297725-24a1c434e3dd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Finding Hope & Healing After Brokenness",
    description:
      "Steps to finding hope and restoration through Christ after pain and loss.",
    type: "Video",
    date: "March 27, 2024",
    stats: "1.2k views",
    image:
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=800&auto=format&fit=crop",
  },
];

export function ProfileResources() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-serif text-primary">
        My Resources
      </h2>
      <div className="space-y-4">
        {RESOURCES.map((resource) => (
          <div
            key={resource.id}
            className="relative group overflow-hidden rounded-xl bg-[#F9F9F7] border border-[#E5E5E5] shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row h-auto sm:h-48"
          >
            {/* Image */}
            <div className="relative w-full sm:w-1/3 min-h-[160px] sm:min-h-full">
              <Image
                src={resource.image}
                alt={resource.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-2 left-2 text-xs text-white/90 font-medium drop-shadow-md">
                {resource.stats}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {resource.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Badge
                    variant="secondary"
                    className="bg-[#E5E3DD] text-gray-700 hover:bg-[#d5d3cd] rounded-md px-2 py-0.5 font-normal"
                  >
                    {resource.type}
                  </Badge>
                  <span>{resource.date}</span>
                </div>

                <Button
                  size="sm"
                  className="bg-[#5C5C54] hover:bg-[#4a4a44] text-white text-xs h-8 px-4 rounded-md shadow-sm"
                >
                  {resource.type === "Video" ? "Watch Video" : "Read Article"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfileTestimonies() {
  return (
    <div className="space-y-6 mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-serif text-primary">
          Testimonies
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="bg-[#4A4F44] text-white hover:bg-[#3b3f36] border-none text-xs"
        >
          View All Resources &raquo;
        </Button>
      </div>

      <div className="bg-[#F9F9F7] p-6 rounded-xl border border-[#E5E5E5] shadow-sm">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 border border-gray-300">
            <AvatarImage src="https://images.unsplash.com/photo-1554151228-14d9def656ec?q=80&w=200&auto=format&fit=crop" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-gray-900 font-serif">
                Sarah&apos;s Story{" "}
                <span className="text-muted-foreground font-sans font-normal text-xs ml-2">
                  • New Member
                </span>
              </h4>
              <span className="text-xs text-muted-foreground">5 days ago</span>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              From addiction to freedom in Christ.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed italic">
              &quot;God saved me when I was at my lowest. Now I&apos;m living in
              His grace. He&apos;s so good!&quot;
            </p>

            <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground font-medium">
              <span>💬 573 Likes</span>
              <span>🗨️ 145 Comments</span>
              <span className="ml-auto text-lg leading-none pb-2 text-gray-400">
                ...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
