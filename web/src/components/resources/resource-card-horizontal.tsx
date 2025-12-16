"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, FileText, Play } from "lucide-react";

interface ResourceCardHorizontalProps {
  id: string;
  title: string;
  description: string;
  type: "Article" | "Video" | "Study";
  date: string;
  imageUrl?: string;
  author?: string;
}

export function ResourceCardHorizontal({
  id,
  title,
  description,
  type,
  date,
  imageUrl,
  author,
}: ResourceCardHorizontalProps) {
  const isVideo = type === "Video";
  const ButtonIcon = isVideo ? Play : FileText;
  const buttonText = isVideo ? "Watch Video" : "Read Article";
  const buttonLink = isVideo
    ? `/app/resources/video/${id}`
    : `/app/resources/article/${id}`;

  return (
    <div className="group flex flex-col md:flex-row overflow-hidden rounded-xl bg-white shadow-sm border border-transparent hover:shadow-md hover:border-border/50 transition-all duration-300">
      {/* Image Section - Scale on Hover */}
      <div className="relative md:w-1/3 min-h-[200px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${imageUrl || "/hero3.png"})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />

        {/* Type Badge Overlay */}
        <div className="absolute top-3 left-3">
          <Badge
            className={`uppercase text-[10px] font-bold tracking-wider rounded-sm ${
              isVideo ? "bg-[#C9A24D] text-black" : "bg-[#5C5C54] text-white"
            }`}
          >
            {type}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold font-serif text-primary mb-2 group-hover:text-[#8C2F39] transition-colors leading-tight">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mb-4">
            {description}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded">
              <CalendarDays className="h-3 w-3" /> {date}
            </span>
            {author && <span>by {author}</span>}
          </div>
        </div>

        {/* Action Row */}
        <div className="flex justify-end pt-2">
          <Button
            className={`${
              isVideo
                ? "bg-[#5C5C54] hover:bg-[#4a4a44] text-white"
                : "bg-[#C9A24D] hover:bg-[#b08d42] text-black"
            } shadow-sm w-full md:w-auto font-bold`}
            asChild
          >
            <Link href={buttonLink}>
              {isVideo && <Play className="h-3 w-3 mr-2" />}
              {!isVideo && <FileText className="h-3 w-3 mr-2" />}
              {buttonText}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
