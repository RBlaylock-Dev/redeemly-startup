"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, BookOpen, Heart, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProfileHeader({
  profile,
  isOwnProfile,
}: {
  profile: any;
  isOwnProfile: boolean;
}) {
  return (
    <div className="relative w-full bg-white shadow-sm mb-6">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 w-full bg-gray-200">
        <div className="absolute inset-0 bg-[url('/hero3.png')] bg-cover bg-center opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Profile Info Section */}
      <div className="container relative px-4 pb-4">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-20 mb-4">
          {/* Avatar */}
          <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white shadow-lg bg-gray-100 overflow-hidden shrink-0">
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.full_name || "User"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground text-4xl font-serif">
                {profile?.full_name?.[0] || profile?.username?.[0] || "?"}
              </div>
            )}
          </div>

          {/* Name & Headline */}
          <div className="flex-1 text-center md:text-left mb-2 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 drop-shadow-sm">
              {profile?.full_name || "Unknown User"}
            </h1>
            <p className="text-gray-600 font-medium mt-1">
              {profile?.bio || "Seeking Christ, Sharing Hope"} • Joined{" "}
              {profile?.created_at
                ? new Date(profile.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : "Recently"}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-4 md:mb-6 shrink-0">
            {isOwnProfile ? (
              <Button className="bg-[#4A4F44] hover:bg-[#3b3f36] text-white shadow-md">
                Edit Profile
              </Button>
            ) : (
              <>
                <Button className="bg-[#4A4F44] hover:bg-[#3b3f36] text-white shadow-md">
                  Follow
                </Button>
                <Button
                  variant="secondary"
                  className="bg-[#bda06d] hover:bg-[#a88d5e] text-black shadow-md border-none"
                >
                  Message
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center md:justify-start gap-8 border-t border-gray-200 mt-2 pt-4 text-sm font-semibold text-gray-500 overflow-x-auto">
          <button className="pb-2 border-b-2 border-[#4A4F44] text-[#4A4F44]">
            Profile
          </button>
          <button className="pb-2 border-b-2 border-transparent hover:text-gray-800 transition-colors">
            Activity
          </button>
          <button className="pb-2 border-b-2 border-transparent hover:text-gray-800 transition-colors">
            Saved
          </button>
          <button className="pb-2 border-b-2 border-transparent hover:text-gray-800 transition-colors">
            Groups
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProfileAbout({ profile }: { profile: any }) {
  return (
    <div className="bg-[#F9F9F7] rounded-xl p-6 shadow-sm border border-[#E5E5E5] relative overflow-hidden">
      {/* Paper texture overlay could go here */}

      <h2 className="text-2xl font-bold font-serif text-primary mb-6">
        About Me
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Featured Image / Bible Image from Mockup */}
        <div className="w-full md:w-1/3 aspect-video relative rounded-lg overflow-hidden shadow-inner">
          <Image
            src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1000&auto=format&fit=crop"
            alt="Bible Study"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-4 text-gray-700">
          <div>
            <h3 className="text-lg font-bold font-serif mb-1 text-gray-900">
              Redeemed by God&apos;s grace.
            </h3>
            <p className="leading-relaxed text-sm">
              {profile?.testimony ||
                "Walking in new life and sharing His truth. God brought me out of addiction and hopelessness, and now I'm passionate about helping others find freedom and healing in Christ."}
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-600 mt-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>
                Location:{" "}
                <span className="text-gray-900 font-medium">Hometown, USA</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                Joined:{" "}
                <span className="text-gray-900 font-medium">August 2024</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>
                Favorite Verse:{" "}
                <span className="text-gray-900 font-medium">
                  2 Corinthians 5:17
                </span>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Heart className="h-4 w-4 mt-0.5" />
              <span>
                Faith Journey:{" "}
                <span className="text-gray-900 font-medium">
                  Seeking redemption and healing through Christ, one day at a
                  time.
                </span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {["#faith", "#recovery", "#healing", "#inChrist"].map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-gray-200 text-gray-700 hover:bg-gray-300 font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
