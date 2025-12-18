"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useRef } from "react";
import { createResource } from "@/app/actions/resources";
import { createClient } from "@/utils/supabase/client";
import { Loader2, Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Assuming sonner is used, or use generic alert if not sure

export function ResourceUploadDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const supabase = createClient();

      let publicUrl = "";

      // 1. Upload File if present
      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()
          .toString(36)
          .substring(2)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("resource-files")
          .upload(filePath, file);

        if (uploadError) {
          throw new Error("Error uploading file: " + uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from("resource-files")
          .getPublicUrl(filePath);

        publicUrl = publicUrlData.publicUrl;
      } else {
        // If no file, check if URL was provided manually
        publicUrl = formData.get("url") as string;
        if (!publicUrl) {
          throw new Error("Please provide a URL or upload a file.");
        }
      }

      // 2. Create Resource Record
      formData.set("url", publicUrl);

      const result = await createResource(formData);

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success("Resource created successfully!");
      setOpen(false);
      formRef.current?.reset();
      setFile(null);
      router.refresh();
      window.location.reload();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Resource</DialogTitle>
          <DialogDescription>
            Share a resource with the community. You can upload a file or
            provide a link.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Resource Title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select name="type" required defaultValue="Article">
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Article">Article</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
                <SelectItem value="Study">Study</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" required defaultValue="General">
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Theology">Theology</SelectItem>
                <SelectItem value="Christian Living">
                  Christian Living
                </SelectItem>
                <SelectItem value="Bible Study">Bible Study</SelectItem>
                <SelectItem value="Mental Health">Mental Health</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief description of the resource..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Resource Content</Label>
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <Label
                  htmlFor="url"
                  className="text-xs text-muted-foreground mb-1 block"
                >
                  External URL (optional if uploading)
                </Label>
                <Input
                  id="url"
                  name="url"
                  placeholder="https://..."
                  disabled={!!file}
                />
              </div>
              <div className="flex items-center justify-center pt-6">
                <span className="text-sm font-medium text-muted-foreground">
                  - OR -
                </span>
              </div>
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Upload File
                </Label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {file ? (
                    <span className="truncate max-w-[100px]">{file.name}</span>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Resource
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
