"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GroupCardHorizontalProps {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  tags: string[];
  imageUrl?: string;
}

export function GroupCardHorizontal({
  id,
  name,
  description,
  memberCount,
  tags,
  imageUrl,
}: GroupCardHorizontalProps) {
  return (
    <div className="group flex flex-col md:flex-row overflow-hidden rounded-xl bg-white shadow-sm border border-transparent hover:shadow-md hover:border-border/50 transition-all duration-300">
      {/* Image Section - Scale on Hover */}
      <div className="relative md:w-1/3 min-h-[180px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${imageUrl || "/hero3.png"})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold font-serif text-primary mb-2 group-hover:text-[#8C2F39] transition-colors">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 md:line-clamp-3 mb-4 leading-relaxed">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="secondary"
              className="rounded-md font-normal bg-muted text-foreground/80"
            >
              {memberCount} Members
            </Badge>
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-md font-normal bg-muted text-foreground/80"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="flex justify-end pt-2">
          <Button
            className="bg-[#5C5C54] hover:bg-[#4a4a44] text-white shadow-sm w-full md:w-auto"
            asChild
          >
            <Link href={`/app/groups/${id}`}>Join Group</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
