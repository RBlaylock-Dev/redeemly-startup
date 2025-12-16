"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search } from "lucide-react";

interface GroupListProps {
  initialGroups: any[];
}

export function GroupList({ initialGroups }: GroupListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGroups = initialGroups.filter((group) => {
    return (
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Find a group..."
          className="pl-10 h-11 shadow-sm border-secondary/20 focus-visible:ring-secondary/30 bg-background/80 backdrop-blur-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map((group) => (
          <Card
            key={group.id}
            className="flex flex-col group hover:shadow-lg transition-all duration-300 border-t-4 border-t-secondary overflow-hidden bg-background/60 backdrop-blur-sm hover:bg-background/80"
          >
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-xl font-bold text-secondary group-hover:text-secondary/80 transition-colors">
                  {group.name}
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <Users className="h-4 w-4 text-secondary" />
                </div>
              </div>
              <CardDescription className="line-clamp-2 text-base mt-2">
                {group.description || "No description provided."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 w-fit px-3 py-1 rounded-full">
                <Users className="h-3 w-3" />
                <span>{group.group_members[0]?.count || 0} members</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button
                asChild
                className="w-full bg-secondary/90 hover:bg-secondary text-secondary-foreground shadow-sm group-hover:shadow-md transition-all"
              >
                <Link href={`/app/groups/${group.id}`}>Join Fellowship</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        {filteredGroups.length === 0 && (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            {initialGroups.length === 0
              ? "No groups yet. Be the first to start one!"
              : "No groups found matching your search."}
          </div>
        )}
      </div>
    </div>
  );
}
