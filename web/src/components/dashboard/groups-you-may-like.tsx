"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

const groups = [
  {
    name: "Women's Healing & Prayer Group",
    members: "2.2K",
    activity: "2.4K posts",
    image: "/hero3.png", // placeholder
  },
  {
    name: "Young Adults in Faith",
    members: "428",
    activity: "11.2K posts",
    image: "/hero3.png", // placeholder
  },
];

export function GroupsYouMayLike() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-lg font-bold font-serif text-primary">
          Groups You May Like
        </h3>
        <Button
          variant="link"
          size="sm"
          className="text-muted-foreground h-auto p-0"
        >
          View All Groups
        </Button>
      </div>

      <div className="grid gap-4">
        {groups.map((group, i) => (
          <Card
            key={i}
            className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow group cursor-pointer bg-white"
          >
            <div className="h-24 bg-muted relative">
              {/* Placeholder Background */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{ backgroundImage: `url(${group.image})` }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>
            <CardContent className="p-3">
              <h4 className="font-bold text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
                {group.name}
              </h4>
              <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                <span className="flex items-center gap-1 font-medium">
                  <Users className="h-3 w-3" /> {group.members} Members
                </span>
                <span>{group.activity}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
