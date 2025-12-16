"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createResource(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const url = formData.get("url") as string;
  const category = formData.get("category") as string;

  const user = (await supabase.auth.getUser()).data.user;

  if (!user || !title || !url || !category) {
    return { error: "Missing required fields." };
  }

  const { error } = await supabase.from("resources").insert({
    title,
    description,
    url,
    category,
    user_id: user.id,
    tags: [], // Could parse tags from a string if needed
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/app/resources");
  return { success: true };
}

export async function toggleBookmark(resourceId: string) {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) return;

  // Check if bookmark exists
  const { data: existingBookmark } = await supabase
    .from("resource_bookmarks")
    .select("id")
    .eq("resource_id", resourceId)
    .eq("user_id", user.id)
    .single();

  if (existingBookmark) {
    // Remove it
    await supabase
      .from("resource_bookmarks")
      .delete()
      .eq("id", existingBookmark.id);
  } else {
    // Create it
    await supabase.from("resource_bookmarks").insert({
      resource_id: resourceId,
      user_id: user.id,
    });
  }

  revalidatePath("/app/resources");
}
