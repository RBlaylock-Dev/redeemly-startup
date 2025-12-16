import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ProfileHeader, ProfileAbout } from "@/components/profile/profile-components";
import { ProfileResources, ProfileTestimonies } from "@/components/profile/profile-content";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="w-full max-w-[1400px] mx-auto pb-12">
      {/* 1. Profile Header (Full Width) */}
      <ProfileHeader profile={profile} isOwnProfile={true} />

      <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
             
             {/* 2. Main Content (Left Column) */}
             <div className="lg:col-span-8 flex flex-col gap-8">
                 <ProfileAbout profile={profile} />
                 <ProfileResources />
                 <ProfileTestimonies />
             </div>

             {/* 3. Sidebar (Right Column) */}
             <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
                 <ProfileSidebar />
             </div>

          </div>
      </div>
    </div>
  );
}
