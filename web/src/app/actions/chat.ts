"use server";

import { createClient } from "@/utils/supabase/server";

export async function sendMessage(formData: FormData) {
  const supabase = await createClient();
  const content = formData.get("content") as string;
  const receiverId = formData.get("receiverId") as string;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !content || !receiverId) {
    return { error: "Missing required fields" };
  }

  const { error } = await supabase.from("messages").insert({
    content,
    sender_id: user.id,
    receiver_id: receiverId,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function getMessages(otherUserId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("messages")
    .select("*")
    .or(
      `and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`
    )
    .order("created_at", { ascending: true });

  return data || [];
}

export async function getAllUsers() {
  const supabase = await createClient();

  // In a real app we might want to paginate or filter
  // For now, get all profiles except current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from("profiles")
    .select("id, full_name, username, avatar_url");

  if (user) {
    query = query.neq("id", user.id);
  }

  const { data } = await query;

  return data || [];
}
