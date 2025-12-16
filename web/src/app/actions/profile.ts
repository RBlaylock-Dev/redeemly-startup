"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fullName = formData.get("fullName") as string;
  const username = formData.get("username") as string;
  const bio = formData.get("bio") as string;
  const testimony = formData.get("testimony") as string;
  const website = formData.get("website") as string;

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      username,
      bio,
      testimony,
      website,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  const avatarFile = formData.get("avatar") as File | null;
  if (avatarFile && avatarFile.size > 0 && avatarFile.name !== "undefined") {
    const fileExt = avatarFile.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, { upsert: true });

    if (uploadError) {
      // If the bucket doesn't exist, we might fail here.
      // Ideally we check/create bucket but RLS usually prevents creation.
      // We will just log/return error but not block the profile update.
      console.error("Avatar upload error:", uploadError);
      return { error: "Profile updated, but avatar upload failed." };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    // Update the profile with the new avatar URL
    await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", user.id);
  }

  revalidatePath("/app/profile");
  revalidatePath("/app");
  return { success: true };
}
