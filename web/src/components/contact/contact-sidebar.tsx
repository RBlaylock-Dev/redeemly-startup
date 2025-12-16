"use client";

import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ContactSidebar() {
  return (
    <div className="space-y-8">
      {/* Contact Info */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold font-serif text-primary">
          Visit or Connect
        </h2>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <MapPin className="h-6 w-6 text-muted-foreground shrink-0 mt-1" />
            <div className="text-sm text-foreground/80">
              <p className="font-bold">Redeemly Ministries</p>
              <p>123 Redemption Rd, Suite 400</p>
              <p>Hometown, USA 56789</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
            <span className="text-sm font-medium text-foreground/80">
              (123) 456-7890
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
            <span className="text-sm font-medium text-foreground/80">
              info@redeemlyministries.org
            </span>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="rounded-xl overflow-hidden shadow-md border border-white/50 h-[200px] relative bg-[#E5E3DD]">
        {/* Visual simulation of a map */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Neighborhood_Map_1002.svg/1024px-Neighborhood_Map_1002.svg.png')] bg-cover bg-center" />
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin
            className="h-10 w-10 text-primary drop-shadow-md pb-1"
            fill="currentColor"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4 pt-4">
        <h2 className="text-2xl font-bold font-serif text-primary">
          Connect With Us
        </h2>
        <div className="flex gap-4">
          <Link
            href="#"
            className="h-10 w-10 bg-[#7B766C] rounded-full flex items-center justify-center text-white hover:bg-[#6b675e] transition-colors shadow-sm"
          >
            <Facebook className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="h-10 w-10 bg-[#7B766C] rounded-full flex items-center justify-center text-white hover:bg-[#6b675e] transition-colors shadow-sm"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="h-10 w-10 bg-[#7B766C] rounded-full flex items-center justify-center text-white hover:bg-[#6b675e] transition-colors shadow-sm"
          >
            <Youtube className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
