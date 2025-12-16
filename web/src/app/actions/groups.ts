"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createGroup(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const user = (await supabase.auth.getUser()).data.user;

  if (!user || !name) {
    return { error: "Name is required." };
  }

  // 1. Create Group
  const { data: group, error: groupError } = await supabase
    .from("groups")
    .insert({
      name,
      description,
      creator_id: user.id,
      is_public: true, // Default to true for MVP
    })
    .select()
    .single();

  if (groupError) {
    return { error: groupError.message };
  }

  // 2. Add Creator as Admin Member
  const { error: memberError } = await supabase.from("group_members").insert({
    group_id: group.id,
    user_id: user.id,
    role: "admin",
  });

  if (memberError) {
    // In a real app we might want to transactions or cleanup, for MVP logging is ok
    console.error("Failed to add creator to group:", memberError);
    return { error: "Group created but failed to join as admin." };
  }

  revalidatePath("/app/groups");
  return { success: true, groupId: group.id };
}

export async function joinGroup(groupId: string) {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("group_members").insert({
    group_id: groupId,
    user_id: user.id,
    role: "member",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/app/groups/${groupId}`);
  revalidatePath("/app/groups");
  return { success: true };
}

export async function leaveGroup(groupId: string) {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("group_members")
    .delete()
    .eq("group_id", groupId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/app/groups/${groupId}`);
  revalidatePath("/app/groups");
  return { success: true };
}

export async function updateGroup(formData: FormData) {
  const supabase = await createClient();
  const groupId = formData.get("groupId") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const user = (await supabase.auth.getUser()).data.user;

  if (!user || !groupId || !name) {
    return { error: "Missing required fields." };
  }

  // Verify ownership/admin status
  const { data: membership } = await supabase
    .from("group_members")
    .select("role")
    .eq("group_id", groupId)
    .eq("user_id", user.id)
    .single();

  if (!membership || membership.role !== "admin") {
    return { error: "Unauthorized." };
  }

  const { error } = await supabase
    .from("groups")
    .update({ name, description })
    .eq("id", groupId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/app/groups/${groupId}`);
  revalidatePath("/app/groups");
  return { success: true };
}
