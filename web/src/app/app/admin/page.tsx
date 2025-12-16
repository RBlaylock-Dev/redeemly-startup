"use client";

import { useEffect, useState, useCallback } from "react";
import { getReports, resolveReport, deleteContent } from "@/app/actions/admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, Trash2, XCircle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReports = useCallback(async () => {
    setLoading(true);
    const data = await getReports();
    setReports(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  async function handleDismiss(id: string) {
    const result = await resolveReport(id, "dismiss");
    if (result.success) {
      toast.success("Report dismissed");
      setReports((prev) => prev.filter((r) => r.id !== id));
    } else {
      toast.error("Failed to dismiss report");
    }
  }

  async function handleDelete(report: any) {
    if (
      !confirm(
        "Are you sure you want to delete this content? This cannot be undone."
      )
    )
      return;

    // Assuming post for now based on implementation
    const result = await deleteContent("post", report.post_id, report.id);
    if (result.success) {
      toast.success("Content deleted and report resolved");
      setReports((prev) => prev.filter((r) => r.id !== report.id));
    } else {
      toast.error("Failed to delete content");
    }
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage reports and community safety.
          </p>
        </div>
        <Button onClick={loadReports} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      <div className="grid gap-4">
        {reports.length === 0 ? (
          <div className="text-center py-12 bg-muted/50 rounded-lg">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
            <h3 className="text-lg font-medium">All Clear!</h3>
            <p className="text-muted-foreground">No pending reports found.</p>
          </div>
        ) : (
          reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base font-medium flex items-center gap-2">
                      Report Reason:{" "}
                      <Badge variant="destructive">{report.reason}</Badge>
                    </CardTitle>
                    <CardDescription>
                      Reported by @{report.profiles?.username || "Unknown"} •{" "}
                      {new Date(report.created_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm">
                  <p className="font-semibold mb-2">Reported Content (Post):</p>
                  <p className="italic">&quot;{report.posts?.content}&quot;</p>
                  {report.posts?.image_url && (
                    <div className="mt-2 text-xs text-blue-500 underline">
                      <Link href={report.posts.image_url} target="_blank">
                        View Image
                      </Link>
                    </div>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">
                    Posted by @{report.posts?.profiles?.username || "Unknown"}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDismiss(report.id)}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Dismiss
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(report)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Content
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
