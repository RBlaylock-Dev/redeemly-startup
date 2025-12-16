import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { GroupsHero } from "@/components/groups/groups-hero";
import { GroupFilters } from "@/components/groups/group-filters";
import { GroupDirectory } from "@/components/groups/group-directory";
import { CommunityInfoSidebar } from "@/components/groups/community-info-sidebar";

export default async function GroupsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: groups } = await supabase
    .from("groups")
    .select("*, group_members(count)")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto pb-10">
      {/* 1. Hero Section */}
      <GroupsHero />

      {/* 2. Filter Bar */}
      <GroupFilters />

      {/* 3. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Group List) - Spans 8 columns */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <GroupDirectory groups={groups || []} />
        </div>

        {/* Right Column (Sidebar) - Spans 4 columns */}
        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
          <CommunityInfoSidebar />
        </div>
      </div>
    </div>
  );
}
