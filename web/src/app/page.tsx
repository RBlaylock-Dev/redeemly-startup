import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, Heart, Shield, ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9F7]">
      <header className="sticky top-0 z-50 w-full border-b bg-black/95 text-white backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image
                  src="/logo.png"
                  alt="Redeemly Logo"
                  fill
                  className="object-contain invert"
                />
              </div>
              <span className="font-bold font-serif text-lg tracking-tight">
                Redeemly Ministries
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  Contact
                </Link>
                <Link href="/app">
                  <Button className="bg-[#C9A24D] hover:bg-[#b08d42] text-black font-bold">
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
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
        <section className="relative w-full py-20 md:py-32 lg:py-48 bg-black">
          <div className="absolute inset-0 z-0 opacity-60">
            <Image
              src="/hero3.png"
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

          <div className="container relative z-10 flex flex-col items-center gap-6 text-center text-white">
            <h1 className="text-4xl font-bold font-serif tracking-tight sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
              Redeemed & Restored
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl font-medium leading-relaxed drop-shadow-md">
              A movement of healing and hope. Join a Christ-centered community
              for discipleship, accountability, and encouragement.
            </p>
            <div className="space-x-4 mt-4">
              {user ? (
                <Link href="/app">
                  <Button className="bg-[#C9A24D] text-black font-bold hover:bg-[#b08d42] shadow-lg shadow-[#C9A24D]/20 h-12 px-8 text-lg">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/signup">
                  <Button className="bg-[#C9A24D] text-black font-bold hover:bg-[#b08d42] shadow-lg shadow-[#C9A24D]/20 h-12 px-8 text-lg">
                    Join the Community
                  </Button>
                </Link>
              )}

              <Link href="/about">
                <Button
                  variant="outline"
                  className="text-white border-white bg-transparent hover:bg-white/10 hover:text-white h-12 px-8 text-lg"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif text-primary mb-4">
              Why Redeemly?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in the power of community and God&apos;s Word to
              transform lives.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <Users className="h-10 w-10 mb-2 text-[#C9A24D]" />
                <CardTitle className="font-serif text-xl">Community</CardTitle>
                <CardDescription>
                  Connect with others in a safe, moderated environment.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                Share your journey, ask for prayer, and find encouragement in
                our feed and groups.
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <BookOpen className="h-10 w-10 mb-2 text-[#C9A24D]" />
                <CardTitle className="font-serif text-xl">Resources</CardTitle>
                <CardDescription>
                  Curated Bible studies and materials.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                Access a library of resources to help you grow in your faith and
                walk with Jesus.
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <Heart className="h-10 w-10 mb-2 text-[#C9A24D]" />
                <CardTitle className="font-serif text-xl">Scripture</CardTitle>
                <CardDescription>
                  Save and share verses that speak to you.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                Integrate God&apos;s Word into your daily life and share it with
                your community.
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
              <CardHeader>
                <Shield className="h-10 w-10 mb-2 text-[#C9A24D]" />
                <CardTitle className="font-serif text-xl">Safe Place</CardTitle>
                <CardDescription>Privacy and safety first.</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                A protected space with strong moderation and privacy controls
                for your peace of mind.
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
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
