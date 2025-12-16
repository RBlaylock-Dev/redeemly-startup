import { createClient } from "@/utils/supabase/server";
import { getPosts } from "@/app/actions/post";
import { CreatePostForm } from "@/components/feed/create-post-form";
import { PostList } from "@/components/feed/post-list";
import { redirect } from "next/navigation";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { FeatureNav } from "@/components/dashboard/feature-nav";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { SidebarWidgets } from "@/components/dashboard/sidebar-widgets";
import { TestimonyFeed } from "@/components/dashboard/testimony-feed";
import { GroupsYouMayLike } from "@/components/dashboard/groups-you-may-like";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  // Fetch current user's profile for the create post form
  const { data: profile } = await supabase
    .from("profiles")
    .select("avatar_url, full_name, role")
    .eq("id", user.id)
    .single();

  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto pb-10">
      {/* 1. Hero Section */}
      <DashboardHero />

      {/* 2. Feature Navigation Bar */}
      <FeatureNav isAdmin={profile?.role === "admin"} />

      {/* 3. Welcome Banner */}
      <WelcomeBanner userName={profile?.full_name || user.email || "Friend"} />

      {/* 4. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Feed) - Spans 8 columns */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <h2 className="text-2xl font-serif font-bold text-primary border-b pb-2">
            Community Feed
          </h2>

          <div className="bg-white p-4 rounded-xl shadow-sm border mb-4">
            <CreatePostForm
              userAvatarUrl={profile?.avatar_url}
              userInitials={
                profile?.full_name?.charAt(0) || user.email?.charAt(0)
              }
              placeholder="What's on your heart today?"
            />
          </div>

          {/* Popular Testimonies Widget */}
          <TestimonyFeed />

          {/* Main Post Feed */}
          <PostList posts={posts} />
        </div>

        {/* Right Column (Sidebar) - Spans 4 columns */}
        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
          <SidebarWidgets />
          <GroupsYouMayLike />
        </div>
      </div>
    </div>
  );
}
