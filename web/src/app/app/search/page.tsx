import { searchGlobal } from "@/app/actions/search";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemberCard } from "@/components/search/member-card";
import { SearchPostCard } from "@/components/search/search-post-card";
import { SearchHeader } from "@/components/search/search-header";

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

  // Cast posts to any to avoid strict type mismatch
  const formattedPosts = posts.map((p) => ({
    ...p,
    profiles: Array.isArray(p.profiles) ? p.profiles[0] : p.profiles,
    comments_count: 0, // Ideally fetched from DB count, using 0 for now as placeholder
  }));

  return (
    <div className="flex flex-col min-h-screen pb-10">
      {/* 1. New Hero Header (Componentized or inline) */}
      <SearchHeader query={query} resultCount={users.length + posts.length} />

      <div className="w-full max-w-[1000px] mx-auto px-4 mt-8">
        {/* 2. Breadcrumbs / Title */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 font-medium">
          <span className="font-bold text-[#4A4A4A]">Search Results</span>
          <span>›</span>
          <span>Search Results for: &apos;{query}&apos;</span>
        </div>

        {/* 3. Tabs */}
        <Tabs defaultValue="members" className="w-full">
          <TabsList className="bg-transparent border-b border-border/60 w-full justify-start rounded-none h-auto p-0 mb-6 gap-6">
            <TabsTrigger
              value="members"
              className="rounded-t-md rounded-b-none border border-transparent data-[state=active]:border-border/60 data-[state=active]:bg-[#5C5C54] data-[state=active]:text-white px-6 py-2 shadow-none font-bold text-muted-foreground transition-all uppercase tracking-wide text-xs"
            >
              Members
            </TabsTrigger>
            <TabsTrigger
              value="posts"
              className="rounded-t-md rounded-b-none border border-transparent data-[state=active]:border-border/60 data-[state=active]:bg-[#5C5C54] data-[state=active]:text-white px-6 py-2 shadow-none font-bold text-muted-foreground transition-all uppercase tracking-wide text-xs"
            >
              Posts
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="members"
            className="space-y-4 animate-in fade-in-50 duration-500"
          >
            {users.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground bg-white/50 rounded-lg border border-dashed">
                No members found matching &quot;{query}&quot;.
              </div>
            ) : (
              users.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))
            )}
            {/* Pagination (Visual Only for now) */}
            {users.length > 5 && (
              <div className="flex justify-end gap-2 mt-8 text-sm font-medium">
                <button className="h-8 w-8 flex items-center justify-center bg-[#C9A24D] text-white rounded shadow-sm">
                  1
                </button>
                <button className="h-8 w-8 flex items-center justify-center bg-white border hover:bg-muted rounded shadow-sm">
                  2
                </button>
                <button className="px-3 h-8 flex items-center justify-center bg-white border hover:bg-muted rounded shadow-sm">
                  Next ›
                </button>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="posts"
            className="space-y-6 animate-in fade-in-50 duration-500"
          >
            {formattedPosts.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground bg-white/50 rounded-lg border border-dashed">
                No posts found matching &quot;{query}&quot;.
              </div>
            ) : (
              formattedPosts.map((post) => (
                <div
                  key={post.id}
                  className="border-b last:border-0 pb-6 last:pb-0 border-border/40"
                >
                  <SearchPostCard post={post as any} />
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
