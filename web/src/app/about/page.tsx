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
                I grew up in a home marked by pain. My father was an alcoholic,
                and the sexual and mental abuse I experienced shaped my
                childhood in ways no child should ever have to endure. At 16, I
                had a child out of wedlock, but because of the circumstances
                around me, I wasn’t allowed to be in her life. The heartbreak of
                that loss stayed with me for years.
              </p>
              <p>
                At the same age, I came out as gay and spent years deeply
                immersed in that community. I was searching for identity,
                belonging, and love anywhere I could find it. By the age of 20,
                I married a man, still trying to fill a void I didn’t know how
                to name. Yet even in my confusion, sexuality, and brokenness, I
                felt something tugging at me — a gentle cling from God that I
                didn’t fully understand.
              </p>
              <p>
                At 21, I became addicted to pain pills, which eventually led me
                to meth. My addiction came and went in cycles for years. Around
                the age of 25, my addiction led me into legal trouble. The
                consequences of my choices caught up with me, and I found myself
                facing situations that reinforced the lie that my life was
                permanently derailed. Shame, fear, and hopelessness set in, and
                I truly believed I had ruined any chance at a meaningful future.
              </p>
              <p>
                But even in that season — in my addiction, my legal trouble, and
                my brokenness — God never released His grip on me.
              </p>
              <p>
                When I was 28, everything came to a halt. I spent 60 days in the
                hospital on my deathbed. I was diagnosed with HIV, Kaposi
                sarcoma, and Castleman’s disease. My viral load was over
                750,000, and my CD4 count was just 13. I was placed on a
                ventilator for eight days and went through chemotherapy and
                intense treatments just to stay alive.
              </p>
              <p>
                While I was on the ventilator, I experienced terrifying demonic
                visions of hell — visions that were dark, vivid, and real. But
                even in those visions, I felt a love I couldn’t explain. Jesus
                was with me, walking beside me through every moment of that
                darkness. It was as if God was showing me the path I was headed
                toward, but Jesus was saying, “This is where you’re going… but
                I’m pulling you back.”
              </p>
              <p>
                When I came out of the hospital, I still struggled. I still
                tried to stray. But God had marked me. And slowly, He began
                restoring the things I thought were lost forever.
              </p>
              <p>
                After 14 years — a dream I had completely given up on — my
                daughter came back into my life. God also delivered me from
                addiction, pornography, and homosexuality. Today, I am no longer
                attracted to the same sex. God didn’t just change my behavior;
                He transformed my heart and renewed my desires.
              </p>
              <p>
                I am now part of a healthy, life-giving church community — a
                tribe that loves me, walks with me, and calls me higher. In May,
                I begin ministry school, stepping into the calling God had
                placed on my life years ago — the path I ran from for so long.
              </p>
              <p>
                There is another part of my testimony I never want to leave out.
                For as long as I can remember, I dreamed of being a developer.
                For years, because of trauma, addiction, legal trouble, and the
                lies spoken over my life, I believed I would be stuck in a
                dead-end job forever. I believed my past disqualified me from a
                future.
              </p>
              <p>
                But when I fully surrendered my life to God, He redeemed not
                only my soul — He redeemed my future. God gave me clarity,
                discipline, and confidence. Today, I am a Senior Software
                Engineer working for a company I absolutely love. I love my job.
                I love my coworkers. And I am surrounded by wonderful friends
                and people who are now part of my support system — people who
                speak life, accountability, and encouragement into my life every
                day.
              </p>
              <p>
                Today, I am free — free from addiction, free from shame, and
                free from the legal consequences that once defined me. What once
                felt like a permanent stain has become a testimony of God’s
                mercy and grace.
              </p>
              <p>
                The enemy will always try to entice the flesh and make sin look
                desirable. But it is an illusion that leads to destruction.
                God’s way leads to life.
              </p>
              <p>
                God loves you. No matter what you’ve done or where you’ve been,
                He will forgive you if you surrender it all to Him. If God can
                rescue me from abuse, addiction, legal trouble, sickness,
                confusion, and the gates of hell — and then restore my family,
                my calling, my community, and my future — He can do it for you.
              </p>
              <p className="font-bold">
                I serve the God of the impossible. And my life is living proof.
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
