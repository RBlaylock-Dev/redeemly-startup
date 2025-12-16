"use client";

import { Button } from "@/components/ui/button";

export function GroupsHero() {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-black text-white shadow-xl min-h-[300px] flex flex-col justify-center">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 z-0 bg-[url('/hero3.png')] bg-cover bg-center opacity-70 mix-blend-overlay"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 flex flex-col items-start gap-4 p-8 md:p-12 lg:p-16">
        <h1 className="text-4xl font-bold font-serif tracking-tight sm:text-5xl md:text-6xl text-amber-50 drop-shadow-md">
          Join a Group
          <br />
          Grow in Faith Together
        </h1>
        <p className="max-w-xl text-lg text-gray-200 md:text-xl font-medium drop-shadow-sm">
          Supportive, faith-centered groups tailored to meet your specific
          needs.
        </p>
        <div className="mt-4">
          <Button
            size="lg"
            className="bg-[#1F3D2B] hover:bg-[#2c4e3a] text-white border border-[#6F8F72] shadow-lg font-semibold px-8"
          >
            Search Groups...
          </Button>
        </div>
      </div>
    </div>
  );
}
