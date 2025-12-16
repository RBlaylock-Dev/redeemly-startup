import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CreatePost } from "@/components/feed/create-post";
import { PostCard } from "@/components/feed/post-card";

export default async function FeedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch posts with profiles, reactions, and comments count
  const { data: posts } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles (
        username,
        full_name,
        avatar_url
      ),
      reactions (
        user_id,
        type
      ),
      comments (count)
    `
    )
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Community Feed</h1>
        <p className="text-muted-foreground">
          Encourage one another and build each other up.
        </p>
      </div>

      <div className="mx-auto w-full max-w-2xl space-y-6">
        <CreatePost user={user} />

        <div className="space-y-4">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} currentUserId={user.id} />
          ))}
          {posts?.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No posts yet. Be the first to share something!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
