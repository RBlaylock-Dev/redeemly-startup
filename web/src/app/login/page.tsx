"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { AuthHero } from "@/components/auth/auth-hero";
import { LoginForm } from "@/components/login/login-form";
import { LoginSidebar } from "@/components/login/login-sidebar";
import { Check } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback?next=/app`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EFEC] font-sans text-gray-900 pb-20">
      {/* 1. Hero Section */}
      <AuthHero title="Welcome Back" subtitle="Log in to your account" />

      <div className="container px-4 -mt-20 md:-mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 2. Left Column: Login Form & Features */}
          <div className="lg:col-span-7 space-y-10">
            <LoginForm handleGoogleLogin={handleGoogleLogin} />

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {/* Enhanced Features Checklist */}
            <div className="space-y-4 pl-2">
              <h3 className="text-2xl font-bold font-serif text-[#4A443E]">
                Enhanced Features:
              </h3>
              <ul className="space-y-3">
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
                    <Check className="h-6 w-6 text-[#4A443E] mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Right Column: Sidebar */}
          <div className="lg:col-span-5 hidden lg:block sticky top-8">
            <LoginSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
