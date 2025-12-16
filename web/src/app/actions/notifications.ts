"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("notifications")
    .select(
      `
      *,
      sender:profiles!actor_id (
        full_name,
        username,
        avatar_url
      )
    `
    )
    .eq("recipient_id", user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function markAsRead(notificationId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", notificationId)
    .eq("recipient_id", user.id);

  revalidatePath("/app");
}

export async function markAllAsRead() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from("notifications")
    .update({ read: true })
    .eq("recipient_id", user.id)
    .eq("read", false);

  revalidatePath("/app");
}

export async function createNotification({
  recipientId,
  type,
  entityId,
  entityType,
}: {
  recipientId: string;
  type: "reaction" | "comment" | "system";
  entityId: string;
  entityType: "post" | "comment" | "group";
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.id === recipientId) return; // Don't notify self

  await supabase.from("notifications").insert({
    recipient_id: recipientId,
    actor_id: user.id,
    type,
    entity_id: entityId,
    entity_type: entityType,
  });
}
