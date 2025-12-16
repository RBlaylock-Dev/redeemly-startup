"use server";

import { createClient } from "@/utils/supabase/server";

export async function searchGlobal(query: string) {
  const supabase = await createClient();

  if (!query || query.trim().length === 0) {
    return { users: [], posts: [] };
  }

  const searchTerm = `%${query}%`;

  // Search Users
  const { data: users } = await supabase
    .from("profiles")
    .select("id, username, full_name, avatar_url")
    .or(`username.ilike.${searchTerm},full_name.ilike.${searchTerm}`)
    .limit(5);

  // Search Posts
  const { data: posts } = await supabase
    .from("posts")
    .select(
      `
      id,
      content,
      created_at,
      user_id,
      image_url,
      profiles (
        username,
        full_name,
        avatar_url
      )
    `
    )
    .ilike("content", searchTerm)
    .limit(5);

  return {
    users: users || [],
    posts: posts || [],
  };
}
