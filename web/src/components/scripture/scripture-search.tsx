"use strict";
"use client";

import { useState } from "react";
import { searchVerses, saveVerse } from "@/app/actions/scripture";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search, BookmarkPlus } from "lucide-react";
import { toast } from "sonner";

export function ScriptureSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResults(null);
    try {
      const { data, error } = await searchVerses(query);
      if (error) {
        toast.error(error);
      } else {
        setResults(data);
      }
    } catch (err) {
      toast.error("Failed to search.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave(verse: any) {
    setIsSaving(true);
    try {
      const reference = verse.reference;
      const text = verse.text || verse.content; // API structure varies slightly

      const { error } = await saveVerse(reference, text);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Verse saved!");
      }
    } catch (err) {
      toast.error("Failed to save verse.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSearch} className="flex gap-2 relative">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search scripture (e.g., 'John 3:16' or 'love')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            className="pl-10 h-12 text-lg shadow-sm border-primary/20 focus-visible:ring-primary/30"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          size="lg"
          className="h-12 px-8 shadow-sm"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Search"}
        </Button>
      </form>

      {results && (
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Search Results</h3>
          {results.verses ? (
            <div className="grid gap-4">
              {results.verses.map((verse: any) => (
                <Card
                  key={verse.id}
                  className="border-l-4 border-l-primary/40 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6 flex justify-between items-start gap-4">
                    <div className="space-y-2">
                      <h4 className="font-bold text-xl text-primary font-serif">
                        {verse.reference}
                      </h4>
                      <p className="text-lg leading-relaxed text-foreground/90 font-serif italic">
                        &quot;{verse.text}&quot;
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleSave(verse)}
                      disabled={isSaving}
                      className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                      title="Save Verse"
                    >
                      <BookmarkPlus className="h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : results.passages ? (
            <div className="grid gap-4">
              {results.passages.map((passage: any) => (
                <Card
                  key={passage.id}
                  className="border-l-4 border-l-secondary/40 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6 flex justify-between items-start gap-4">
                    <div
                      className="prose dark:prose-invert max-w-none font-serif text-lg leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: passage.content }}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        handleSave({
                          reference: passage.reference,
                          text: passage.content,
                        })
                      }
                      disabled={isSaving}
                      className="text-muted-foreground hover:text-secondary hover:bg-secondary/10"
                    >
                      <BookmarkPlus className="h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}
