import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactSidebar } from "@/components/contact/contact-sidebar";

export default async function ContactPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9F7]">
      {/* Reusing Home Page Header for consistency on public pages */}
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
              <Link href="/app">
                <Button className="bg-[#C9A24D] hover:bg-[#b08d42] text-black font-bold">
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
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
        <ContactHero />

        {/* Diagonal paper texture or subtle noise could be added to body/main bg */}
        <div className="container py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            <ContactForm />
            <ContactSidebar />
          </div>
        </div>
      </main>

      {/* Reusing Footer */}
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
