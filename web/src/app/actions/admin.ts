"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitReport(data: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to report content." };
  }

  const postId = data.get("postId") as string;
  const reason = data.get("reason") as string;

  if (!postId || !reason) {
    return { error: "Missing required fields." };
  }

  const { error } = await supabase.from("reports").insert({
    reporter_id: user.id,
    post_id: postId,
    reason,
  });

  if (error) {
    console.error("Error submitting report:", error);
    return { error: "Failed to submit report." };
  }

  return { success: true };
}

export async function getReports() {
  const supabase = await createClient();

  // Check if admin
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return [];
  }

  const { data: reports } = await supabase
    .from("reports")
    .select(
      `
      *,
      posts (
        content,
        image_url,
        profiles (
           username,
           full_name
        )
      ),
      profiles (
        username,
        full_name
      )
    `
    )
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  return reports || [];
}

export async function resolveReport(
  reportId: string,
  action: "resolve" | "dismiss"
) {
  const supabase = await createClient();

  // Check if admin
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { error: "Unauthorized" };
  }

  const status = action === "resolve" ? "resolved" : "dismissed";

  const { error } = await supabase
    .from("reports")
    .update({ status })
    .eq("id", reportId);

  if (error) {
    return { error: "Failed to update report." };
  }

  revalidatePath("/app/admin");
  return { success: true };
}

export async function deleteContent(
  type: "post",
  contentId: string,
  reportId?: string
) {
  const supabase = await createClient();

  // Check if admin
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { error: "Unauthorized" };
  }

  if (type === "post") {
    const { error } = await supabase.from("posts").delete().eq("id", contentId);
    if (error) return { error: "Failed to delete post." };
  }

  // If there was an associated report, mark it resolved
  if (reportId) {
    await supabase
      .from("reports")
      .update({ status: "resolved" })
      .eq("id", reportId);
  }

  revalidatePath("/app");
  revalidatePath("/app/admin");
  return { success: true };
}
