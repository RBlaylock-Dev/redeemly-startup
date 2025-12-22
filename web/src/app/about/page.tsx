import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { ArrowRight } from "lucide-react";

export default async function AboutPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F4EF]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-black/95 text-white backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-20 w-24">
                <Image
                  src="/logo.png"
                  alt="Redeemly Logo"
                  fill
                  className="object-contain invert"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold font-serif text-lg tracking-tight">
                  Redeemly
                </span>
                <span className="text-[10px] tracking-widest uppercase text-gray-400">
                  Ministries
                </span>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            {user && (
              <>
                <Link
                  href="/app/resources"
                  className="hover:text-white transition-colors"
                >
                  Resources
                </Link>
                <Link
                  href="/app/scripture"
                  className="hover:text-white transition-colors"
                >
                  Bible
                </Link>
              </>
            )}
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="https://upcurve.life/fundraiser/5/build-ministry-website">
              <Button className="bg-[#C9A24D] hover:bg-[#b08d42] text-black font-bold">
                Donate
              </Button>
            </Link>
            {user ? (
              <Link href="/app">
                <Button
                  variant="outline"
                  className="text-white border-white bg-transparent hover:bg-white/10 hover:text-white"
                >
                  Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="bg-[#5C5C54] hover:bg-[#4a4a44] text-white"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-32 md:py-48 flex flex-col justify-center items-center text-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero3.png" // Using existing hero image as background
              alt="Background Cross"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#F6F4EF]" />
          </div>

          <div className="container relative z-10 space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold font-serif text-[#2a2a2a] drop-shadow-sm">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-[#2a2a2a]/80 font-medium max-w-2xl mx-auto">
              Robert Blaylock, Founder of Redeemly Ministries
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="container py-16 md:py-24 max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-[#2a2a2a]">
            My Testimony
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image Column */}
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto shadow-xl rounded-sm overflow-hidden border-8 border-white bg-white rotate-1 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/testimony.jpg"
                alt="Baptism Testimony"
                fill
                className="object-cover sepia-[0.1]"
              />
            </div>

            {/* Text Column */}
            <div className="space-y-6 text-lg leading-relaxed text-[#2a2a2a]/90 font-serif">
              <p>
                I grew up in a home marked by pain, abuse, and alcoholism. By
                16, I was a teenage father denied access to my daughter, and I
                had immersed myself in the gay community searching for
                belonging. My search for identity led me down a dark path of
                addiction to pain pills and meth, culminating in legal trouble
                that convinced me my future was permanently destroyed.
              </p>
              <p>
                At 28, everything stopped. I spent 60 days in the hospital
                fighting HIV, Kaposi sarcoma, and Castleman’s disease. On a
                ventilator and near death, I experienced terrifying visions of
                hell, yet Jesus met me in that darkness, pulling me back from
                the brink. That moment marked the beginning of my restoration.
              </p>
              <p>
                God has since redeemed every part of my life. He restored my
                relationship with my daughter after 14 years and delivered me
                from addiction and my past lifestyle. He even revived my
                forgotten dream of being a developer—today, I am a Senior
                Software Engineer surrounded by a supportive community. I am
                living proof that God can rescue anyone from the impossible and
                give them a future filled with hope and purpose.
              </p>
            </div>
          </div>

          {/* Quote Section */}
          <div className="mt-24 text-center space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 text-[#C9A24D]/60 mb-8">
              <span className="h-px w-24 bg-current" />
              <span className="text-2xl">✤</span>
              <span className="h-px w-24 bg-current" />
            </div>

            <blockquote className="text-3xl md:text-4xl font-serif italic text-[#8C2F39] leading-tight">
              “With God, all things are possible.”
            </blockquote>

            <div className="flex items-center justify-center gap-4 text-[#C9A24D]/60 mt-8">
              <span className="h-px w-24 bg-current" />
              <span className="text-2xl">✤</span>
              <span className="h-px w-24 bg-current" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 md:px-8 border-t bg-black text-white/60">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose md:text-left">
            Built by Redeemly Ministry. &copy; 2025.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
