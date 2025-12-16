import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CreatePost } from "@/components/feed/create-post";
import { PostCard } from "@/components/feed/post-card";
import { Button } from "@/components/ui/button";
import { joinGroup, leaveGroup } from "@/app/actions/groups";
import { Users, LogOut, LogIn } from "lucide-react";
import { EditGroupDialog } from "@/components/groups/edit-group-dialog";

export default async function GroupPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { id } = await params;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: group } = await supabase
    .from("groups")
    .select("*, group_members(count)")
    .eq("id", id)
    .single();

  if (!group) {
    return <div>Group not found</div>;
  }

  // Check membership
  const { data: membership } = await supabase
    .from("group_members")
    .select("role")
    .eq("group_id", id)
    .eq("user_id", user.id)
    .single();

  const isMember = !!membership;

  // Fetch group posts
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
    .eq("group_id", id)
    .order("created_at", { ascending: false });

  // Server Actions for buttons
  async function joinAction() {
    "use server";
    await joinGroup(id);
  }

  async function leaveAction() {
    "use server";
    await leaveGroup(id);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Group Header */}
      <div className="bg-card rounded-xl border p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{group.name}</h1>
            <p className="text-muted-foreground max-w-2xl">
              {group.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
              <Users className="h-4 w-4" />
              <span>{group.group_members[0]?.count || 0} members</span>
            </div>
          </div>
          <div>
            <div className="flex gap-2">
              {membership?.role === "admin" && (
                <EditGroupDialog group={group} />
              )}
              {isMember ? (
                <form action={leaveAction}>
                  <Button variant="outline" type="submit">
                    <LogOut className="mr-2 h-4 w-4" />
                    Leave Group
                  </Button>
                </form>
              ) : (
                <form action={joinAction}>
                  <Button type="submit">
                    <LogIn className="mr-2 h-4 w-4" />
                    Join Group
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Main Feed */}
        <div className="flex-1 space-y-6 max-w-2xl mx-auto w-full">
          {isMember ? (
            <CreatePost user={user} groupId={id} />
          ) : (
            <div className="bg-muted p-4 rounded-lg text-center text-sm text-muted-foreground">
              Join this group to post and comment.
            </div>
          )}

          <div className="space-y-4">
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} currentUserId={user.id} />
            ))}
            {posts?.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                No posts in this group yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
