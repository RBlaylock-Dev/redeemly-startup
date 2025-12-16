"use client";

import { MapPin, Phone, Mail, PlayCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function ProfileSidebar() {
  return (
    <div className="space-y-8">
      {/* Visual Connect Widget - Reusing style from Contact page but adapted for sidebar */}
      <div className="bg-[#F9F9F7] rounded-xl p-6 border border-[#E5E5E5] shadow-sm">
        <h3 className="text-xl font-bold font-serif text-gray-900 mb-4 border-b pb-2">
          Visit or Connect
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-[#8C7A5E] shrink-0 mt-0.5" />
            <div className="text-sm text-gray-600">
              <strong className="block text-gray-900 mb-0.5">
                Redeemly Ministries
              </strong>
              <p>123 Redemption Rd, Suite 400</p>
              <p>Hometown, USA 56789</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-[#8C7A5E] shrink-0" />
            <span className="text-sm text-gray-600 tracking-wide">
              (123) 456-7890
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-[#8C7A5E] shrink-0" />
            <span className="text-sm text-gray-600 truncate">
              info@redeemlyministries.org
            </span>
          </div>
        </div>
      </div>

      {/* Bible Study Promo */}
      <div className="bg-white rounded-xl overflow-hidden border border-[#E5E5E5] shadow-sm group hover:shadow-md transition-shadow">
        <div className="p-4 border-b border-gray-100 bg-[#F9F9F7]">
          <h3 className="text-xl font-bold font-serif text-gray-900">
            Bible Study Guide
          </h3>
        </div>
        <div className="relative h-48 w-full cursor-pointer">
          <Image
            src="https://images.unsplash.com/photo-1510936111840-65e151ad71bb?q=80&w=800&auto=format&fit=crop"
            alt="Bible Study"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <Button
              variant="secondary"
              className="bg-[#4a3a2a]/90 hover:bg-[#4a3a2a] text-white border-none shadow-lg backdrop-blur-sm gap-2"
            >
              <PlayCircle className="h-4 w-4" /> Watch Now
            </Button>
          </div>
        </div>
        <div className="p-4 bg-[#F5F2EB]">
          <h4 className="font-bold text-gray-900 mb-1">
            Faith in the Midst of Trials
          </h4>
          <p className="text-xs text-secondary-foreground mb-4 opacity-70">
            God uses our trials for His glory.
          </p>
          <Button className="w-full bg-[#5C5C54] hover:bg-[#4a4a44] text-white text-xs h-9">
            Start Study
          </Button>
        </div>
      </div>

      {/* Ad / Promo */}
      <div className="bg-white rounded-xl overflow-hidden border border-[#E5E5E5] shadow-sm">
        <div className="relative h-40 w-full">
          <Image
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop"
            alt="Promo"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 text-white">
            <h4 className="font-serif font-bold text-lg">
              Faith in the Midst of Trials
            </h4>
            <Button
              size="sm"
              className="mt-2 bg-[#6b4c3e] hover:bg-[#5a3f33] text-white w-fit"
            >
              Watch Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
