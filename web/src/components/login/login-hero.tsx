import Image from "next/image";

export function LoginHero() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero3.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#F9F9F7]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 pt-10">
        <div className="flex flex-col items-center gap-2 mb-6">
          {/* Logo Icon logic could go here, or just the text */}
          <div className="relative h-12 w-12 md:h-16 md:w-16 mb-2">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain invert"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-wide text-white drop-shadow-lg">
            Redeemly
            <span className="block text-xs md:text-sm font-sans font-normal tracking-[0.2em] opacity-80 mt-1">
              MINISTRIES
            </span>
          </h1>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold font-serif drop-shadow-xl mb-4">
          Welcome Back
        </h2>
        <p className="text-lg md:text-xl text-white/90 font-medium drop-shadow-md">
          Log in to your account
        </p>
      </div>
    </div>
  );
}
