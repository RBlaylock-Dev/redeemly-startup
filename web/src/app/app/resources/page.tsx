"use client";

import { ResourcesHero } from "@/components/resources/resources-hero";
import { ResourceFilters } from "@/components/resources/resource-filters";
import { ResourceCardHorizontal } from "@/components/resources/resource-card-horizontal";
import { ResourceSidebar } from "@/components/resources/resource-sidebar";

// Mock Data matching the design
const resources = [
  {
    id: "1",
    title: "Overcoming Shame with God's Truth",
    description:
      "How to break free from guilt and embrace God's love and forgiveness. A deep dive into Romans 8.",
    type: "Article" as const,
    date: "April 5, 2024",
    imageUrl: "/hero3.png",
    author: "Dr. Sarah Jenkins",
  },
  {
    id: "2",
    title: "Finding Hope & Healing After Brokenness",
    description:
      "Steps to finding hope and restoration through Christ after suffering pain and loss.",
    type: "Video" as const,
    date: "March 12, 2024",
    imageUrl: "/hero3.png",
  },
  {
    id: "3",
    title: "Daily Bible Reading Plan (April)",
    description:
      "Stay on track with a daily guide to reading and reflecting on Scripture. This month focuses on the Psalms.",
    type: "Study" as const,
    date: "April 1, 2024",
    imageUrl: "/hero3.png",
  },
  {
    id: "4",
    title: "Faith in the Midst of Trials",
    description:
      "Video on holding fast to faith during difficult seasons. Interview with Pastor Jamison.",
    type: "Video" as const,
    date: "Feb 28, 2024",
    imageUrl: "/hero3.png",
  },
  {
    id: "5",
    title: "God's Grace is Sufficient",
    description:
      "Discovering the boundless power of God's grace for every situation in your life.",
    type: "Article" as const,
    date: "Feb 15, 2024",
    imageUrl: "/hero3.png",
    author: "Rev. Mark Davis",
  },
  {
    id: "6",
    title: "How to Forgive Those Who Hurt You",
    description:
      "Biblical steps to forgive and find peace in the pain. Learning from the example of Joseph.",
    type: "Study" as const,
    date: "Jan 30, 2024",
    imageUrl: "/hero3.png",
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto pb-10">
      {/* 1. Hero Section */}
      <ResourcesHero />

      {/* 2. Filter Bar */}
      <ResourceFilters />

      {/* 3. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Resource List) - Spans 8 columns */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {resources.map((resource) => (
            <ResourceCardHorizontal
              key={resource.id}
              id={resource.id}
              title={resource.title}
              description={resource.description}
              type={resource.type}
              date={resource.date}
              imageUrl={resource.imageUrl}
              author={resource.author}
            />
          ))}

          {/* Pagination visual */}
          <div className="flex justify-center mt-8">
            <button className="px-4 py-2 bg-white border border-border rounded-l-md text-sm font-medium hover:bg-muted">
              Previous
            </button>
            <button className="px-4 py-2 bg-primary text-white text-sm font-medium">
              1
            </button>
            <button className="px-4 py-2 bg-white border border-border border-l-0 text-sm font-medium hover:bg-muted">
              2
            </button>
            <button className="px-4 py-2 bg-white border border-border border-l-0 text-sm font-medium hover:bg-muted">
              3
            </button>
            <button className="px-4 py-2 bg-white border border-border border-l-0 rounded-r-md text-sm font-medium hover:bg-muted">
              Next
            </button>
          </div>
        </div>

        {/* Right Column (Sidebar) - Spans 4 columns */}
        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
          <ResourceSidebar />
        </div>
      </div>
    </div>
  );
}
