import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ScripturePageClient } from "./scripture-page-client";

export default async function ScripturePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <ScripturePageClient userId={user.id} />;
}
