"use client";

import { AuthHero } from "@/components/auth/auth-hero";
import { SignupForm } from "@/components/auth/signup-form";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#F0EFEC] font-sans text-gray-900 pb-20">
      {/* 1. Hero Section */}
      <AuthHero
        title="Join Our Community"
        subtitle="Sign up for free to connect and grow in faith"
        actionButton={
          <Link href="/login">
            <Button className="bg-[#8B7355] hover:bg-[#6d5a43] text-white shadow-lg border border-white/20">
              Login
            </Button>
          </Link>
        }
      />

      <div className="container px-4 -mt-16 md:-mt-24 relative z-20">
        <div className="flex flex-col items-center gap-12">
          {/* 2. Signup Form (Centered) */}
          <div className="w-full max-w-lg">
            <SignupForm />
          </div>

          {/* 3. Enhanced Features Checklist (Centered below form) */}
          <div className="w-full max-w-2xl bg-[#EBE9E4]/50 p-8 rounded-xl border border-[#D6D4CE]/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold font-serif text-[#4A443E] mb-6 border-b border-[#D6D4CE] pb-2">
              Enhanced Features:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Connect with a faith-centered community",
                "Share testimonies and prayer requests",
                "Access exclusive Christian resources",
                "Grow in Christ through support groups and Bible study",
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[#5C5855] text-lg"
                >
                  <Check className="h-6 w-6 text-[#4A443E] mt-0.5 shrink-0" />
                  <span className="leading-tight">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Reuse or Custom Footer */}
      <footer className="mt-20 py-8 bg-[#1a1a1a] text-white/60 text-center">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/groups" className="hover:text-white transition-colors">
              Groups
            </Link>
            <Link
              href="/resources"
              className="hover:text-white transition-colors"
            >
              Resources
            </Link>
          </div>
          <p>&copy; 2024 Redeemly Ministries. All Rights Reserved.</p>
          <div className="flex gap-4">
            {/* Social Icons Placeholder */}
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
              f
            </div>
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
              in
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
