"use client";

export function ScriptureHero() {
  return (
    <div className="relative w-full overflow-hidden rounded-b-3xl md:rounded-3xl bg-black text-white shadow-xl min-h-[200px] flex flex-col justify-center">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 z-0 bg-[url('/hero3.png')] bg-cover bg-center opacity-80 mix-blend-overlay"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#C5A880]/40 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

      <div className="relative z-10 flex flex-col items-center text-center gap-2 p-8 md:p-12">
        <h1 className="text-4xl font-bold font-serif tracking-tight sm:text-5xl text-amber-50 drop-shadow-md">
          Bible Lookup
        </h1>
        <p className="max-w-xl text-lg text-gray-200 font-medium drop-shadow-sm">
          Search the Scriptures for Truth & Hope
        </p>
      </div>
    </div>
  );
}
