"use client";

import Image from "next/image";

interface WelcomeBannerProps {
  userName: string;
}

export function WelcomeBanner({ userName }: WelcomeBannerProps) {
  // Parsing the first name
  const firstName = userName.split(" ")[0];

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-[#2c4e3a] text-white shadow-md">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
        aria-hidden="true"
      >
        <Image
          src="/hero3.png" // Using existing asset as placeholder for the "hands on bible" image
          alt="Bible Background"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#2c4e3a] via-[#2c4e3a]/80 to-transparent" />

      <div className="relative z-10 flex flex-col justify-center p-8 py-10">
        <h2 className="text-3xl font-serif font-bold text-amber-50">
          Welcome Back, {firstName}.
        </h2>
        <p className="mt-2 max-w-lg text-lg text-gray-100 font-medium">
          Let&apos;s walk this journey of transformation, healing, and hope
          together.
        </p>
      </div>
    </div>
  );
}
