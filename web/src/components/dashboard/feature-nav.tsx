"use client";

import Link from "next/link";
import { Users, MessageCircle, BookOpen, Search, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FeatureNavProps {
  isAdmin?: boolean;
}

export function FeatureNav({ isAdmin }: FeatureNavProps) {
  const features = [
    {
      name: "Groups",
      description: "Find support in faith-based groups.",
      icon: Users,
      href: "/app/groups",
      color: "bg-[#8C2F39]", // Red/Crimson
    },
    {
      name: "Chat",
      description: "Connect through real-time chat.",
      icon: MessageCircle,
      href: "/app/chat", // Or trigger drawer
      color: "bg-[#1F3D2B]", // Green
    },
    {
      name: "Resources",
      description: "Access articles, videos, and bible studies.",
      icon: BookOpen,
      href: "/app/resources",
      color: "bg-[#C9A24D]", // Gold
    },
    {
      name: "Bible Lookup",
      description: "Search and read scripture together.",
      icon: Search, // Or Book icon
      href: "/app/scripture",
      color: "bg-[#c47e5b]", // Clay/Books
    },
  ];

  if (isAdmin) {
    features.push({
      name: "Admin Dashboard",
      description: "Manage content, reports, and users.",
      icon: Shield,
      href: "/app/admin",
      color: "bg-black",
    });
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {features.map((feature) => (
        <Link key={feature.name} href={feature.href} className="group">
          <Card className="flex h-full items-center gap-4 border-none bg-[#F6F4EF] p-4 shadow-sm transition-all hover:shadow-md hover:bg-white">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-sm ${feature.color}`}
            >
              <feature.icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                {feature.name}
              </h3>
              <p className="text-xs text-muted-foreground leading-tight">
                {feature.description}
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
