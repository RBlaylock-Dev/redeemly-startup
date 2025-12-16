"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold font-serif text-primary">
        Get In Touch
      </h2>

      <form className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="text-sm font-bold text-foreground/80"
          >
            Full Name
          </label>
          <Input
            id="fullName"
            placeholder="Full Name"
            className="bg-[#F6F4EF] border-transparent shadow-sm h-12"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-bold text-foreground/80"
          >
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Email Address"
            className="bg-[#F6F4EF] border-transparent shadow-sm h-12"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="text-sm font-bold text-foreground/80"
          >
            Phone Number{" "}
            <span className="text-muted-foreground font-normal">
              (optional)
            </span>
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="Message"
            className="bg-[#F6F4EF] border-transparent shadow-sm h-12"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-bold text-foreground/80"
          >
            Message
          </label>
          <Textarea
            id="message"
            placeholder=""
            className="bg-[#F6F4EF] border-transparent shadow-sm min-h-[150px] resize-none"
          />
        </div>

        {/* Mock Captcha */}
        <div className="h-16 w-[200px] bg-[#F0F0F0] border border-[#d3d3d3] rounded-sm flex items-center justify-between px-3 shadow-inner select-none">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 border-2 border-[#c1c1c1] bg-white rounded-sm" />
            <span className="text-sm text-black/70 font-medium">
              I am not a robot
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 bg-[url('https://www.gstatic.com/recaptcha/api2/logo_48.png')] bg-contain bg-no-repeat opacity-60"></div>
            <span className="text-[8px] text-muted-foreground">reCAPTCHA</span>
          </div>
        </div>

        <Button className="h-12 px-8 bg-[#4A4F44] hover:bg-[#3b3f36] text-white font-bold text-lg shadow-md w-full md:w-auto">
          Send Message
        </Button>
      </form>
    </div>
  );
}
