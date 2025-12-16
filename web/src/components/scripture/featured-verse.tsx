"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, FileText, BookOpen, Copy } from "lucide-react";
import { toast } from "sonner";

interface FeaturedVerseProps {
  verse: {
    reference: string;
    text: string;
    translation?: string;
  } | null;
  onSave?: () => void;
}

export function FeaturedVerse({ verse, onSave }: FeaturedVerseProps) {
  if (!verse) {
    // Empty state / Verse of the Day placeholder
    return (
      <Card className="bg-[#FBFBF9] border-none shadow-sm min-h-[300px] flex items-center justify-center text-center p-8">
        <CardContent className="max-w-md space-y-4">
          <h2 className="text-3xl font-serif font-bold text-primary/80">
            Verse of the Day
          </h2>
          <p className="text-xl font-serif italic text-foreground/80 leading-relaxed">
            "For I know the plans I have for you," declares the Lord, "plans to
            prosper you and not to harm you, plans to give you hope and a
            future."
          </p>
          <p className="font-bold text-primary">— Jeremiah 29:11 (ESV)</p>
          <div className="flex gap-2 justify-center pt-4">
            <Button size="sm" variant="outline" className="gap-2">
              {" "}
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`${verse.text} - ${verse.reference}`);
    toast.success("Verse copied to clipboard");
  };

  return (
    <Card className="bg-[#FBFBF9] border-none shadow-sm overflow-hidden">
      <CardContent className="p-8 md:p-12 space-y-6">
        <div className="flex justify-between items-start">
          <h2 className="text-4xl font-serif font-bold text-foreground">
            {verse.reference}
          </h2>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              title="Copy"
            >
              <Copy className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>

        <div className="relative">
          {/* Decorative highlight effect behind text */}
          <div className="absolute -inset-2 bg-yellow-100/50 blur-xl rounded-full opacity-50 pointer-events-none" />

          <p className="relative text-2xl md:text-3xl font-serif leading-relaxed text-foreground/90">
            &quot;{verse.text}&quot;
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-black/5 mt-8">
          <Button
            variant="secondary"
            className="gap-2 bg-[#5C5C54] text-white hover:bg-[#4a4a44]"
          >
            <FileText className="h-4 w-4" /> Save to Notes
          </Button>
          <Button
            variant="outline"
            className="gap-2 bg-white/50"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" /> Copy
          </Button>
          <Button
            variant="outline"
            className="gap-2 bg-white/50"
            onClick={onSave}
            disabled={!onSave}
          >
            <BookOpen className="h-4 w-4" /> Save to Favorites
          </Button>
          <Button variant="outline" className="gap-2 bg-white/50">
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
