"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ResourceFilters() {
  return (
    <div className="flex flex-col gap-6">
      {/* Search Bar Row */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Resources..."
            className="pl-10 h-11 bg-[#F6F4EF]"
          />
        </div>
        <div className="flex items-center bg-[#F6F4EF] rounded-md p-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-4 rounded-sm bg-white shadow-sm text-foreground"
          >
            Blog
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-4 rounded-sm text-muted-foreground hover:text-foreground"
          >
            Videos
          </Button>
        </div>
        <Button
          variant="outline"
          className="h-11 px-4 gap-2 bg-[#5C5C54] text-white hover:bg-[#4a4a44] border-transparent"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="w-full overflow-x-auto pb-2 md:pb-0">
        <div className="flex gap-8 border-b border-border/40 px-4 min-w-max">
          <button className="pb-3 border-b-2 border-primary font-bold text-primary text-sm uppercase tracking-wide">
            Blog
          </button>
          <button className="pb-3 border-b-2 border-transparent hover:border-border font-medium text-muted-foreground text-sm uppercase tracking-wide hover:text-foreground transition-colors">
            Videos
          </button>
          <button className="pb-3 border-b-2 border-transparent hover:border-border font-medium text-muted-foreground text-sm uppercase tracking-wide hover:text-foreground transition-colors">
            Bible Study
          </button>
          <button className="pb-3 border-b-2 border-transparent hover:border-border font-medium text-muted-foreground text-sm uppercase tracking-wide hover:text-foreground transition-colors">
            Motivational
          </button>
          <button className="pb-3 border-b-2 border-transparent hover:border-border font-medium text-muted-foreground text-sm uppercase tracking-wide hover:text-foreground transition-colors">
            Counseling
          </button>
        </div>
      </div>
    </div>
  );
}
