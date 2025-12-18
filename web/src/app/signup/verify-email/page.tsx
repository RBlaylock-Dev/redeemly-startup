import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#EBE9E4] p-4">
      <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center space-y-6 text-center bg-[#F9F9F7] p-8 rounded-xl shadow-lg border border-[#D6D4CE]">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EBE9E4]">
            <Mail className="h-8 w-8 text-[#4A443E]" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-[#4A443E]">
            Check Your Email
          </h1>
          <p className="text-balance text-muted-foreground">
            We&apos;ve sent a verification link to your email address. Please
            check your inbox (and spam folder) to complete your registration.
          </p>
        </div>
        <div className="grid gap-4">
          <Link href="/login">
            <Button className="w-full bg-[#4A4F44] hover:bg-[#3b3f36] text-white">
              Back to Log In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
