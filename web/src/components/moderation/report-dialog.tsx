"use client";

import { useState } from "react";
import { submitReport } from "@/app/actions/admin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Flag, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ReportDialogProps {
  postId: string;
  trigger?: React.ReactNode;
}

const REPORT_REASONS = [
  "Inappropriate Content",
  "Spam or Scam",
  "Harassment or Hate Speech",
  "Violence or Physical Harm",
  "False Information",
  "Other",
];

export function ReportDialog({ postId, trigger }: ReportDialogProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    if (!reason) {
      toast.error("Please select a reason.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("postId", postId);
      formData.append("reason", reason);

      const result = await submitReport(formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Report submitted for review.");
        setOpen(false);
        setReason("");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-destructive hover:text-destructive"
          >
            <Flag className="mr-2 h-4 w-4" />
            Report Post
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report Content</DialogTitle>
          <DialogDescription>
            Help us keep the community safe. Reports are anonymous.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Select value={reason} onValueChange={setReason}>
            <SelectTrigger>
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent>
              {REPORT_REASONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !reason}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
