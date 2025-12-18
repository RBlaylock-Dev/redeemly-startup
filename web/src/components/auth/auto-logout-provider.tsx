"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

interface AutoLogoutProviderProps {
  children: React.ReactNode;
  timeoutMs?: number; // Default 30 minutes
}

export function AutoLogoutProvider({
  children,
  timeoutMs = 30 * 60 * 1000,
}: AutoLogoutProviderProps) {
  const router = useRouter();
  const supabase = createClient();
  const lastActivityRef = useRef(Date.now());
  const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    // Events to track activity
    const events = ["mousemove", "click", "keypress", "scroll", "touchstart"];

    const handleActivity = () => {
      lastActivityRef.current = Date.now();
    };

    // Attach listeners
    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    // Check for inactivity periodically
    const checkInactivity = async () => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivityRef.current;

      if (timeSinceLastActivity > timeoutMs) {
        // Timeout reached
        await supabase.auth.signOut();
        toast.info("You have been signed out due to inactivity.");
        router.push("/login");
        router.refresh();
      }
    };

    // Check every minute (or more frequently if timeout is small)
    // For a 30 min timeout, checking every 1 min is fine.
    const intervalId = setInterval(checkInactivity, 60 * 1000);

    return () => {
      // Cleanup
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      clearInterval(intervalId);
    };
  }, [router, supabase, timeoutMs]);

  return <>{children}</>;
}
