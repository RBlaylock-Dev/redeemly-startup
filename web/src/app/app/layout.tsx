import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home, Users, BookOpen, LogOut, Menu, Shield } from "lucide-react";
import { NotificationBell } from "@/components/notifications/notification-bell";
import { ChatDrawer } from "@/components/chat/chat-drawer";
import { SearchInput } from "@/components/search/search-input";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch verified profile role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";

  const signOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 md:flex-row">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex md:w-64 transition-all duration-300">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/app" className="flex items-center gap-2 font-semibold cursor-pointer">
            <div className="relative h-28 w-28">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
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
          {/* Sidebar Notifications for Desktop (Optional, but better in header) */}
          {/* Placing in mobile header and desktop sidebar header makes sense */}
          <div className="hidden md:block ml-auto">
            <NotificationBell userId={user.id} />
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-2 p-4 pt-8">
          <Link
            href="/app"
            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
          >
            <Home className="h-4 w-4" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <Link
            href="/app/groups"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Groups</span>
          </Link>
          <Link
            href="/app/resources"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden md:inline">Resources</span>
          </Link>
          <Link
            href="/app/scripture"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden md:inline">Scripture</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden md:inline">Contact</span>
          </Link>

          {isAdmin && (
            <Link
              href="/app/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary font-bold transition-all hover:bg-primary/10 mt-4 border border-primary/20"
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
              className="w-full justify-start gap-3 text-muted-foreground px-3"
            >
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">My Profile</span>
            </Button>
          </Link>
          <form action={signOut}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-3 text-muted-foreground px-3"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Sign Out</span>
            </Button>
          </form>
        </div>
      </aside>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 md:pl-64">
        {/* Mobile Header would go here if we wanted a separate one */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex flex-1 items-center justify-between">
            {/* Mobile Logo */}
            <Link
              href="/app"
              className="flex items-center gap-2 font-semibold md:hidden"
            >
              <div className="relative h-10 w-10">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span>Redeemly</span>
            </Link>

            {/* Spacer for desktop to align right */}
            <div className="hidden md:block"></div>

            <div className="flex items-center gap-4">
              <SearchInput className="hidden md:block" />
              <NotificationBell userId={user.id} />
            </div>
          </div>
        </header>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>

        <ChatDrawer currentUserId={user.id} />
      </div>
    </div>
  );
}
