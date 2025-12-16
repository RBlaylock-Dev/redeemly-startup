import { searchGlobal } from "@/app/actions/search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostCard } from "@/components/feed/post-card";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SearchPage(props: {
  searchParams: Promise<{ q: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.q;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { users, posts } = await searchGlobal(query || "");

  // Cast posts to any to avoid strict type mismatch with PostCard if interface isn't exact
  const formattedPosts = posts.map((p) => ({
    ...p,
    profiles: Array.isArray(p.profiles) ? p.profiles[0] : p.profiles,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Search Results</h1>
        <p className="text-muted-foreground">Results for &quot;{query}&quot;</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Users Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">People ({users.length})</h2>
          {users.length === 0 ? (
            <div className="p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground">
              No people found.
            </div>
          ) : (
            <div className="space-y-2">
              {users.map((u) => (
                <Link href={`/app/profile/${u.username}`} key={u.id}>
                  <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors bg-card">
                    <Avatar>
                      <AvatarImage src={u.avatar_url} />
                      <AvatarFallback>
                        {u.username?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{u.full_name}</p>
                      <p className="text-sm text-muted-foreground">
                        @{u.username}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Posts ({posts.length})</h2>
          {posts.length === 0 ? (
            <div className="p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground">
              No posts found.
            </div>
          ) : (
            <div className="space-y-4">
              {formattedPosts.map((post) => (
                <PostCard key={post.id} post={post} currentUserId={user.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
