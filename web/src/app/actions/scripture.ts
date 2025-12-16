"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveVerse(
  reference: string,
  text: string,
  translation: string = "WEB"
) {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    return { error: "You must be logged in to save verses." };
  }

  if (!reference || !text) {
    return { error: "Invalid verse data." };
  }

  const { error } = await supabase.from("saved_verses").insert({
    user_id: user.id,
    reference,
    text,
    translation,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "You have already saved this verse." };
    }
    return { error: error.message };
  }

  revalidatePath("/app/scripture");
  return { success: true };
}

export async function deleteVerse(id: string) {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("saved_verses")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/app/scripture");
  return { success: true };
}

export async function getSavedVerses() {
  const supabase = await createClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    return [];
  }

  const { data } = await supabase
    .from("saved_verses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

export async function searchVerses(query: string) {
  if (!query) {
    return { error: "Query is required." };
  }

  try {
    const isReference =
      (/[0-9]/.test(query) && /:|chapter|verse|v\./i.test(query)) ||
      /^\w+ \d+$/.test(query) ||
      /^\w+ \d+:\d+$/.test(query);

    // Heuristic: If it has numbers and looks like a reference (John 3:16, John 3, 1 Cor), treat as reference.
    // Bible-API.com is great for references.
    if (isReference || query.match(/\d/)) {
      const response = await fetch(
        `https://bible-api.com/${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        // If reference lookup fails (e.g. they searched "1love" or something weird), fall back to keyword?
        // For now, let's treat 404 as "No results found" or try keyword.
        // Actually, let's just return empty or error.
        if (response.status === 404) return { error: "Verse not found." };
        return { error: "Failed to fetch from Bible API." };
      }

      const data = await response.json();

      // Map to uniform format
      const verses = data.verses.map((v: any) => ({
        id: `${v.book_id}-${v.chapter}-${v.verse}`,
        reference: `${v.book_name} ${v.chapter}:${v.verse}`,
        text: v.text.trim(),
        book_name: v.book_name,
        chapter: v.chapter,
        verse: v.verse,
        translation: "WEB",
      }));

      return { data: { verses } };
    }

    // Keyword Search (Bolls.life)
    else {
      // 1. Fetch Book Names Mapping
      const booksResponse = await fetch("https://bolls.life/get-books/WEB/");
      if (!booksResponse.ok) throw new Error("Failed to fetch book metadata");
      const booksData = await booksResponse.json();
      const bookMap = new Map();
      booksData.forEach((b: any) => bookMap.set(b.bookid, b.name));

      // 2. Search
      const searchResponse = await fetch(
        `https://bolls.life/find/WEB/?search=${encodeURIComponent(
          query
        )}&limit=20`
      );
      if (!searchResponse.ok) return { error: "Search failed." };
      const searchData = await searchResponse.json();

      const verses = searchData.map((v: any) => ({
        id: `bolls-${v.pk}`,
        reference: `${bookMap.get(v.book) || "Unknown"} ${v.chapter}:${
          v.verse
        }`,
        text: v.text.replace(/<[^>]*>/g, ""), // Remove HTML tags like <mark>
        book_name: bookMap.get(v.book),
        chapter: v.chapter,
        verse: v.verse,
        translation: "WEB",
      }));

      return { data: { verses } };
    }
  } catch (error) {
    console.error("Search Exception:", error);
    return { error: "An unexpected error occurred." };
  }
}
