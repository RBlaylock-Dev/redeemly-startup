"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DashboardHero() {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-black text-white shadow-xl">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 z-0 bg-[url('/hero3.png')] bg-cover bg-center opacity-60 mix-blend-overlay"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 flex flex-col items-start gap-4 p-8 md:p-12 lg:p-16">
        <h1 className="text-3xl font-bold font-serif tracking-tight sm:text-4xl md:text-5xl lg:text-5xl text-amber-50 drop-shadow-md">
          Redeemly Ministries Community
        </h1>
        <p className="max-w-xl text-lg text-gray-200 md:text-xl font-medium drop-shadow-sm">
          Walk with us on the path to new life in Christ.
        </p>
        <div className="mt-4">
          <Button
            size="lg"
            className="bg-[#2c4e3a] hover:bg-[#1f3d2b] text-white border border-[#6F8F72] shadow-lg font-semibold"
          >
            Join the Discussion
          </Button>
        </div>
      </div>
    </div>
  );
}
