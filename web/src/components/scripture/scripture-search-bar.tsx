"use client";

import { useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { searchVerses } from "@/app/actions/scripture";

// Defining types locally since we're not exporting them broadly yet
interface ScriptureSearchBarProps {
  onSearchResults: (results: any) => void;
  isLoading: boolean;
}

export function ScriptureSearchBar({
  onSearchResults,
  isLoading,
}: ScriptureSearchBarProps) {
  const [query, setQuery] = useState("");
  const [translation, setTranslation] = useState("ESV"); // Default mock

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    onSearchResults(null); // Clear previous
    // Trigger parent loading state if possible or handle locally
    // For now we assume parent manages loading via props, but we need to trigger the action here
    // In a real app, strict state lifting or URL params would be better, but this matches the "widget" feel

    // We actually need data fetching here, or pass a handler.
    // Let's modify to call the server action here and pass data up.

    // Note: The prop says `isLoading` is passed in, implies parent controls state?
    // Let's keep it simple: WE fetch here, pass results up. Parent sets loading=true before we return?
    // Actually, cleaner pattern:
    // Parent passes `onSearch(query)` handler.
    // Wait, let's just do the fetch here and pass results.

    try {
      // We can't set parent loading state easily without a discrete handler.
      // Let's just do it:
      const { data, error } = await searchVerses(query);
      if (error) {
        toast.error(error);
      } else {
        onSearchResults(data);
      }
    } catch (err) {
      toast.error("Failed to search.");
    }
  }

  return (
    <div className="bg-[#EAE6DD] p-2 rounded-xl shadow-inner flex flex-col md:flex-row gap-2 items-center -mt-8 relative z-20 mx-4 md:mx-auto max-w-4xl border border-white/50 backdrop-blur-sm">
      {/* Translation Dropdown (Mock) */}
      <div className="relative w-full md:w-auto">
        <button className="flex items-center justify-between w-full md:w-[120px] px-4 py-3 bg-[#F6F4EF] rounded-lg text-sm font-semibold text-foreground shadow-sm hover:bg-white transition-colors">
          {translation} <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
        </button>
      </div>

      {/* Search Inputs (Book/Chapter split in mockup, but we use single global search for now) */}
      {/* We'll make it look like the mockup but strictly use one input logic for MVP */}
      <div className="flex-1 flex gap-2 w-full">
        <div className="relative flex-1 group">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Reference (e.g. Jeremiah 29:11)...."
            className="h-12 border-none shadow-sm bg-[#F6F4EF] pl-4 text-base placeholder:text-muted-foreground/60 focus-visible:ring-0 group-hover:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        disabled={isLoading}
        className="h-12 w-full md:w-[160px] bg-[#5C5C54] hover:bg-[#4a4a44] text-white shadow-sm font-semibold"
      >
        <Search className="h-4 w-4 mr-2" /> Search
      </Button>
    </div>
  );
}
