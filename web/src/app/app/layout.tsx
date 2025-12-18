import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home, Users, BookOpen, LogOut, Menu, Shield } from "lucide-react";
import { NotificationBell } from "@/components/notifications/notification-bell";
import { ChatDrawer } from "@/components/chat/chat-drawer";
import { SearchInput } from "@/components/search/search-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AutoLogoutProvider } from "@/components/auth/auto-logout-provider";

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
    .select("role, avatar_url, full_name")
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
    <AutoLogoutProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40 md:flex-row">
        <AppSidebar userId={user.id} isAdmin={isAdmin} />

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
                <Link href="/app/profile">
                  <Avatar className="h-8 w-8 cursor-pointer border border-border">
                    <AvatarImage
                      src={
                        profile?.avatar_url || user.user_metadata?.avatar_url
                      }
                    />
                    <AvatarFallback>
                      {profile?.full_name?.charAt(0) ||
                        user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            </div>
          </header>

          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>

          <ChatDrawer currentUserId={user.id} />
        </div>
      </div>
    </AutoLogoutProvider>
  );
}
