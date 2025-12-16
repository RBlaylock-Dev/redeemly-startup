"use client";

import { signup } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full bg-[#4A4F44] hover:bg-[#3b3f36] text-white h-12 text-lg font-bold shadow-md transition-all mt-6"
      disabled={pending}
    >
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
    </Button>
  );
}

export function SignupForm() {
  return (
    <div className="bg-[#EBE9E4] p-8 md:p-10 rounded-sm shadow-lg border border-[#D6D4CE] w-full max-w-lg mx-auto">
      <h3 className="text-3xl font-bold font-serif text-[#4A443E] mb-8 text-center drop-shadow-sm">
        Create Your Account
      </h3>

      <div className="space-y-6">
        <form className="space-y-5" action={signup}>
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-[#5C5855] font-semibold">
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full Name"
              required
              className="bg-[#F6F4EF] border-[#D6D4CE] h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#5C5855] font-semibold">
              Email Address or Username
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              required
              className="bg-[#F6F4EF] border-[#D6D4CE] h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#5C5855] font-semibold">
              Create Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create Password"
              required
              className="bg-[#F6F4EF] border-[#D6D4CE] h-12"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-[#5C5855] font-semibold"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
              className="bg-[#F6F4EF] border-[#D6D4CE] h-12"
            />
          </div>

          <div className="grid gap-4 py-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="robot"
                className="h-5 w-5 border-[#8C8885] data-[state=checked]:bg-[#4A4F44]"
              />
              <label htmlFor="robot" className="text-sm text-[#5C5855]">
                I am not a robot
              </label>
              {/* Mock reCAPTCHA logo could go here */}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                required
                className="h-5 w-5 border-[#8C8885] data-[state=checked]:bg-[#4A4F44]"
              />
              <label
                htmlFor="terms"
                className="text-sm text-[#5C5855] font-medium"
              >
                I agree to the{" "}
                <Link
                  href="/terms-of-service"
                  className="underline hover:text-black"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="underline hover:text-black"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>

          <SubmitButton />
        </form>

        <p className="text-center text-sm text-[#5C5855] mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold font-serif text-[#4A443E] text-base hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
