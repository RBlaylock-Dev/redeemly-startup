"use client";

import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const filters = [
  { label: "Recovery", icon: MapPin },
  { label: "Counseling", icon: null },
  { label: "Marriage", icon: null },
  { label: "Young Adults", icon: null },
  { label: "Prayer", icon: null },
  { label: "Men", icon: null },
  { label: "Parents", icon: null },
];

export function GroupFilters() {
  return (
    <div className="flex flex-col gap-4">
      {/* Search Bar Row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Groups..."
            className="pl-10 h-11 bg-[#F6F4EF]"
          />
        </div>
        <Button
          variant="outline"
          className="h-11 px-4 gap-2 bg-[#F6F4EF] border-input"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filter
        </Button>
      </div>

      {/* Filter Chips Row */}
      <div className="flex flex-wrap gap-2 items-center">
        {filters.map((filter) => (
          <Badge
            key={filter.label}
            variant="secondary"
            className="rounded-md px-3 py-1.5 text-sm font-normal bg-[#EAE8E2] hover:bg-[#d8d6d0] text-foreground cursor-pointer flex items-center gap-1.5"
          >
            {filter.icon && <filter.icon className="h-3 w-3" />}
            {filter.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
