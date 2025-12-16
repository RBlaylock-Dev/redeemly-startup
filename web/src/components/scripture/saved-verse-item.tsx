"use client";

import { deleteVerse } from "@/app/actions/scripture";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";

export function SavedVerseItem({ verse }: { verse: any }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const { error } = await deleteVerse(verse.id);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Verse removed.");
      }
    });
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{verse.reference}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          disabled={isPending}
          className="text-destructive hover:text-destructive/90"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {/* We might need to render HTML if it's from the API, but saved text is usually plain text or limited HTML */}
        <div
          className="text-sm text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: verse.text }}
        />
        <div className="mt-2 text-xs text-muted-foreground">
          {verse.translation}
        </div>
      </CardContent>
    </Card>
  );
}
