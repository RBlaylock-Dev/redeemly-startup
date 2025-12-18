"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, Users, BookOpen, LogOut, Menu, Shield } from "lucide-react";
import { NotificationBell } from "@/components/notifications/notification-bell";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  userId: string;
  isAdmin: boolean;
}

export function AppSidebar({ userId, isAdmin }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const isActive = (path: string) => {
    if (path === "/app" && pathname === "/app") return true;
    if (path !== "/app" && pathname?.startsWith(path)) return true;
    return false;
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex md:w-64 transition-all duration-300">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link
          href="/app"
          className="flex items-center gap-2 font-semibold cursor-pointer"
        >
          <div className="relative h-28 w-28">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <span className="hidden md:inline"></span>
        </Link>
        <Button
          variant="outline"
          size="icon"
          className="ml-auto h-8 w-8 md:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>
        <div className="hidden md:block ml-auto">
          <NotificationBell userId={userId} />
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-2 p-4 pt-8">
        <Link
          href="/app"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            isActive("/app")
              ? "bg-muted text-primary font-medium"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <Home className="h-4 w-4" />
          <span className="hidden md:inline">Home</span>
        </Link>
        <Link
          href="/app/groups"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            isActive("/app/groups")
              ? "bg-muted text-primary font-medium"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <Users className="h-4 w-4" />
          <span className="hidden md:inline">Groups</span>
        </Link>
        <Link
          href="/app/resources"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            isActive("/app/resources")
              ? "bg-muted text-primary font-medium"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <BookOpen className="h-4 w-4" />
          <span className="hidden md:inline">Resources</span>
        </Link>
        <Link
          href="/app/scripture"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            isActive("/app/scripture")
              ? "bg-muted text-primary font-medium"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <BookOpen className="h-4 w-4" />
          <span className="hidden md:inline">Scripture</span>
        </Link>
        <Link
          href="/contact"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
            isActive("/contact")
              ? "bg-muted text-primary font-medium"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <BookOpen className="h-4 w-4" />
          <span className="hidden md:inline">Contact</span>
        </Link>

        {isAdmin && (
          <Link
            href="/app/admin"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all mt-4 border border-primary/20",
              isActive("/app/admin")
                ? "bg-primary/10 text-primary font-bold"
                : "text-primary hover:bg-primary/10"
            )}
          >
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Admin</span>
          </Link>
        )}
      </nav>
      <div className="mt-auto p-4 flex flex-col gap-2">
        <Link href="/app/profile">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start gap-3 px-3",
              isActive("/app/profile")
                ? "text-primary font-medium"
                : "text-muted-foreground"
            )}
          >
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">My Profile</span>
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="w-full justify-start gap-3 text-muted-foreground px-3"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden md:inline">Sign Out</span>
        </Button>
      </div>
    </aside>
  );
}
