"use server";
// Since getSavedVerses is a server action, this list can be a server component
// BUT we want to handle deletion interactively.
// The pattern used in this project seems to be client components triggering server actions.
// Let's make this a client component that takes initial data or fetches it.
// Actually, simple list with "delete" button requires client interactivity.

import { deleteVerse } from "@/app/actions/scripture";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
// We need to use a client wrapper or just make this a client component that receives props?
// Let's receive props from the page, which fetches initial data.

interface SavedVersesListProps {
  initialVerses: any[];
}

import { SavedVerseItem } from "./saved-verse-item";

export async function SavedVersesList({ initialVerses }: SavedVersesListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {initialVerses.map((verse) => (
        <SavedVerseItem key={verse.id} verse={verse} />
      ))}
      {initialVerses.length === 0 && (
        <div className="col-span-full py-10 text-center text-muted-foreground">
          No saved verses yet.
        </div>
      )}
    </div>
  );
}
