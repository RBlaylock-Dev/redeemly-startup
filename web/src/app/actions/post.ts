"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to post." };
  }

  const content = formData.get("content") as string;
  const image = formData.get("image") as File;
  const groupId = formData.get("groupId") as string;

  if ((!content || content.trim().length === 0) && !image) {
    return { error: "Post must have content or an image." };
  }

  let imageUrl = null;

  if (image) {
    const fileExt = image.name.split(".").pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(fileName, image);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return { error: "Failed to upload image." };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("post-images").getPublicUrl(fileName);

    imageUrl = publicUrl;
  }

  const { error } = await supabase.from("posts").insert({
    user_id: user.id,
    content: content || "",
    image_url: imageUrl,
    group_id: groupId || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/app");
  if (groupId) {
    revalidatePath(`/app/groups/${groupId}`);
  }
  return { success: true };
}

export async function getPosts() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles (
        full_name,
        username,
        avatar_url
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return posts;
}
