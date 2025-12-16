"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { createNotification } from "./notifications";

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const content = formData.get("content") as string;
  const groupId = formData.get("groupId") as string;

  if (!content) {
    return { error: "Content is required." };
  }

  const { error } = await supabase.from("posts").insert({
    content,
    user_id: (await supabase.auth.getUser()).data.user?.id,
    group_id: groupId || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/app/feed");
  return { success: true };
}

export async function createComment(formData: FormData) {
  const supabase = await createClient();
  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;
  const user = (await supabase.auth.getUser()).data.user;

  if (!content || !postId || !user) {
    return { error: "Missing required fields." };
  }

  const { error } = await supabase.from("comments").insert({
    content,
    post_id: postId,
    user_id: user.id,
  });

  if (error) {
    return { error: error.message };
  }

  // Notify post owner
  const { data: post } = await supabase
    .from("posts")
    .select("user_id")
    .eq("id", postId)
    .single();

  if (post && post.user_id !== user.id) {
    await createNotification({
      recipientId: post.user_id,
      type: "comment",
      entityId: postId, // Link to the post
      entityType: "post",
    });
  }

  // We don't strictly need to revalidate path if we rely on realtime or client-side fetch,
  // but it's good practice for initial loads.
  revalidatePath("/app/feed");
  return { success: true };
}

export async function toggleReaction(postId: string, type: string) {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user || !postId || !type) return;

  // Check if reaction exists
  const { data: existingReaction } = await supabase
    .from("reactions")
    .select("id, type")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .single();

  if (existingReaction) {
    if (existingReaction.type === type) {
      // Remove it
      await supabase.from("reactions").delete().eq("id", existingReaction.id);
    } else {
      // Update it (change reaction type)
      await supabase
        .from("reactions")
        .update({ type })
        .eq("id", existingReaction.id);
    }
  } else {
    // Create it
    await supabase.from("reactions").insert({
      post_id: postId,
      user_id: user.id,
      type,
    });

    // Notify post owner
    const { data: post } = await supabase
      .from("posts")
      .select("user_id")
      .eq("id", postId)
      .single();

    if (post && post.user_id !== user.id) {
      await createNotification({
        recipientId: post.user_id,
        type: "reaction",
        entityId: postId,
        entityType: "post",
      });
    }
  }

  revalidatePath("/app/feed");
}
