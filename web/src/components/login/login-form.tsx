"use client";

import { login } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import Image from "next/image";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full bg-[#4A4F44] hover:bg-[#3b3f36] text-white h-12 text-lg font-bold shadow-md transition-all"
      disabled={pending}
    >
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
    </Button>
  );
}

export function LoginForm({
  handleGoogleLogin,
}: {
  handleGoogleLogin: () => void;
}) {
  return (
    <div className="bg-[#EBE9E4] p-6 md:p-8 rounded-sm shadow-sm border border-[#D6D4CE]">
      <h3 className="text-2xl font-bold font-serif text-[#4A443E] mb-6">
        Account Login
      </h3>

      <div className="space-y-6">
        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#5C5855] font-semibold">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              className="bg-[#F6F4EF] border-[#D6D4CE] h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#5C5855] font-semibold">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              className="bg-[#F6F4EF] border-[#D6D4CE] h-12"
            />
          </div>

          <div className="flex items-center space-x-2 py-2">
            <Checkbox
              id="remember"
              className="border-[#8C8885] data-[state=checked]:bg-[#4A4F44] data-[state=checked]:border-[#4A4F44]"
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#5C5855]"
            >
              Remember me
            </label>
          </div>

          {/* Using client-side submission logic from original page or just form action */}
          <div className="pt-2">
            <Button
              formAction={login}
              className="w-full bg-[#4A4F44] hover:bg-[#3b3f36] text-white h-12 text-lg font-bold shadow-md transition-all"
            >
              Login
            </Button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#EBE9E4] px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          className="w-full h-12 border-[#D6D4CE] bg-[#F6F4EF] hover:bg-white text-[#4A443E]"
          onClick={handleGoogleLogin}
        >
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Login with Google
        </Button>

        <p className="text-center text-sm text-[#5C5855]">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-bold underline hover:text-[#4A4F44]"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
