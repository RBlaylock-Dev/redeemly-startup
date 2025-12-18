import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import {
  ProfileHeader,
  ProfileAbout,
} from "@/components/profile/profile-components";
import {
  ProfileResources,
  ProfileTestimonies,
} from "@/components/profile/profile-content";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";

export default async function UserProfilePage(props: {
  params: Promise<{ username: string }>;
}) {
  const params = await props.params;
  const username = params.username;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Fetch profile by username
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) {
    return notFound();
  }

  const isOwnProfile = user.id === profile.id;

  return (
    <div className="w-full max-w-[1400px] mx-auto pb-12">
      {/* 1. Profile Header (Full Width) */}
      <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 2. Main Content (Left Column) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <ProfileAbout profile={profile} />

            {/* 
                    Ideally these would be filtered by user, but currently use mock data.
                    For MVP/Demo, it's acceptable to show the same placeholder content 
                    or we could hide them for other users if they aren't relevant.
                    Based on "Resource Upload" task, we might want to eventually show
                    real resources here, but for now we'll match the main profile layout.
                 */}
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
