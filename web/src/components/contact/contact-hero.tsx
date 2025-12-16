"use client";

import Image from "next/image";

export function ContactHero() {
  return (
    <div className="relative w-full overflow-hidden bg-black text-white shadow-xl min-h-[300px] flex flex-col justify-center items-center">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 z-0 bg-[url('/hero3.png')] bg-cover bg-center opacity-80 mix-blend-overlay"
        aria-hidden="true"
      />
      {/* Cross Imagery (Mocked with text/icon or specific image if available, using placeholder logic for now) */}
      {/* Ideally we'd have a specific cross image. For now, we'll use a subtle overlay or just the text focus as requested. 
           The mockup shows a cross silhouette against a sunset. I will assume hero3.png is generic.
           I'll add a gradient to simulate the sunset vibe.
       */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#C5A880]/40 via-transparent to-black/60" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left gap-4 p-8 md:p-16 max-w-6xl w-full mx-auto">
        <h1 className="text-4xl font-bold font-serif tracking-tight sm:text-5xl md:text-6xl text-amber-50 drop-shadow-lg">
          Contact Us
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-white/90 drop-shadow-md">
          We&apos;re Here to Help and Support You
        </h2>
        <p className="max-w-xl text-lg text-gray-200 font-medium drop-shadow-sm mt-2">
          Reach out to us with any questions, prayer requests, or to learn more
          about Redeemly Ministries.
        </p>
      </div>
    </div>
  );
}
