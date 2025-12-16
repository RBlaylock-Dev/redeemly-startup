"use client";

import { useState } from "react";
import { ScriptureHero } from "@/components/scripture/scripture-hero";
import { ScriptureSearchBar } from "@/components/scripture/scripture-search-bar";
import { FeaturedVerse } from "@/components/scripture/featured-verse";
import { RecentVersesWidget } from "@/components/scripture/recent-verses-widget";
import { CommunityInfoSidebar } from "@/components/groups/community-info-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ScripturePageClientProps {
  userId: string;
}

export function ScripturePageClient({ userId }: ScripturePageClientProps) {
  const [currentVerse, setCurrentVerse] = useState<{
    reference: string;
    text: string;
    translation?: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto pb-10">
      {/* 1. Hero Section */}
      <ScriptureHero />

      {/* 2. Search Bar */}
      <ScriptureSearchBar
        onSearchResults={(data) => {
          // data structure matches return from searchVerses: { verses: [...] }
          if (data && data.verses && data.verses.length > 0) {
            const firstVerse = data.verses[0];
            setCurrentVerse({
              reference: firstVerse.reference,
              text: firstVerse.text,
              translation: firstVerse.translation,
            });
          }
        }}
        isLoading={isLoading}
      />

      {/* 3. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Study Area) - Spans 8 columns */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <FeaturedVerse verse={currentVerse} />

          {/* Tabbed Study Area */}
          <div className="mt-4">
            <Tabs defaultValue="favorites" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-[#F6F4EF]">
                <TabsTrigger
                  value="favorites"
                  className="data-[state=active]:bg-[#5C5C54] data-[state=active]:text-white data-[state=active]:font-semibold font-serif"
                >
                  Favorites
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className="data-[state=active]:bg-[#5C5C54] data-[state=active]:text-white data-[state=active]:font-semibold font-serif"
                >
                  Notes
                </TabsTrigger>
                <TabsTrigger
                  value="study"
                  className="data-[state=active]:bg-[#5C5C54] data-[state=active]:text-white data-[state=active]:font-semibold font-serif"
                >
                  Study Bible
                </TabsTrigger>
                <TabsTrigger
                  value="devotionals"
                  className="data-[state=active]:bg-[#5C5C54] data-[state=active]:text-white data-[state=active]:font-semibold font-serif"
                >
                  Devotionals
                </TabsTrigger>
              </TabsList>

              <TabsContent value="favorites" className="mt-6">
                <Card className="border-none shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <ScriptureListItem
                      reference="Romans 8:28"
                      text="And we know that in all things God works for the good of those who love him..."
                      date="Added Today"
                    />
                    <div className="h-px bg-border/50" />
                    <ScriptureListItem
                      reference="Isaiah 41:10"
                      text="So do not fear, for I am with you; do not be dismayed, for I am your God."
                      date="Added Yesterday"
                    />
                    <div className="h-px bg-border/50" />
                    <ScriptureListItem
                      reference="Philippians 4:6"
                      text="Do not be anxious about anything, but in every situation, by prayer and petition..."
                      date="Added 2 days ago"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes">
                <div className="p-8 text-center text-muted-foreground bg-white rounded-xl shadow-sm">
                  No notes yet. Start studying to add your thoughts!
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Column (Sidebar) - Spans 4 columns */}
        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
          <CommunityInfoSidebar />

          {/* Reuse CTA Button style from mockup */}
          <Button className="w-full h-12 bg-[#C9A24D] hover:bg-[#b08d42] text-black font-bold shadow-sm text-lg font-serif">
            Share Verse
          </Button>

          <RecentVersesWidget />
        </div>
      </div>
    </div>
  );
}

function ScriptureListItem({
  reference,
  text,
  date,
}: {
  reference: string;
  text: string;
  date: string;
}) {
  return (
    <div className="group">
      <div className="flex justify-between items-baseline mb-1">
        <h4 className="text-lg font-bold font-serif text-primary">
          {reference}
        </h4>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {date}
        </span>
      </div>
      <p className="text-muted-foreground line-clamp-2 md:line-clamp-1 group-hover:line-clamp-none transition-all duration-300">
        "{text}"
      </p>
    </div>
  );
}
