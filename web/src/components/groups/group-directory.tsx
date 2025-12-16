"use client";

import { GroupCardHorizontal } from "./group-card-horizontal";

interface GroupDirectoryProps {
  groups: any[];
}

export function GroupDirectory({ groups }: GroupDirectoryProps) {
  // Mocking some extra data to match the rich UI for now
  const enrichedGroups = groups.map((group) => ({
    ...group,
    tags: ["Recovery", "Bible Study"], // Default tags for MVP
    memberCount: group.group_members?.[0]?.count || 0,
    imageUrl: "/hero3.png", // Default image
  }));

  // Using mocked data if no real groups exist, just to show the UI
  const displayGroups =
    enrichedGroups.length > 0
      ? enrichedGroups
      : [
          {
            id: "mock-1",
            name: "Recovery & Discipleship",
            description:
              "Find encouragement as we grow in faith higher after brokenness.",
            memberCount: 1500,
            tags: ["Recovery", "Bible Study"],
            imageUrl: "/hero3.png",
          },
          {
            id: "mock-2",
            name: "Women's Healing & Encouragement",
            description:
              "Christ centered support and prayer for women seeking encouragement and healing.",
            memberCount: 2300,
            tags: ["Counseling", "Prayer"],
            imageUrl: "/hero3.png",
          },
          {
            id: "mock-3",
            name: "Young Adults in Faith",
            description:
              "Connect with other young believers navigating life's challenges.",
            memberCount: 1800,
            tags: ["Young Adults", "Fellowship"],
            imageUrl: "/hero3.png",
          },
          {
            id: "mock-4",
            name: "Men's Accountability & Faith",
            description:
              "Strengthen your walk with Christ alongside other men of faith.",
            memberCount: 1100,
            tags: ["Men", "Accountability"],
            imageUrl: "/hero3.png",
          },
        ];

  return (
    <div className="flex flex-col gap-6">
      {displayGroups.map((group) => (
        <GroupCardHorizontal
          key={group.id}
          id={group.id}
          name={group.name}
          description={group.description}
          memberCount={group.memberCount}
          tags={group.tags}
          imageUrl={group.imageUrl}
        />
      ))}
    </div>
  );
}
