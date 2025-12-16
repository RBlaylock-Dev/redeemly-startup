"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Loader2, X } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

interface AvatarUploadProps {
  currentAvatarUrl?: string | null;
  username?: string;
  email?: string;
}

export function AvatarUpload({
  currentAvatarUrl,
  username,
  email,
}: AvatarUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={previewUrl || currentAvatarUrl || ""}
            alt="Profile picture"
            className="object-cover"
          />
          <AvatarFallback className="text-2xl">
            {username?.charAt(0).toUpperCase() ||
              email?.charAt(0).toUpperCase() ||
              "?"}
          </AvatarFallback>
        </Avatar>
        {previewUrl && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
            onClick={handleClear}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Clear preview</span>
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera className="mr-2 h-4 w-4" />
          Change Avatar
        </Button>
        <input
          type="file"
          id="avatar"
          name="avatar"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      {previewUrl && (
        <p className="text-xs text-muted-foreground">
          Click &quot;Save Changes&quot; to apply.
        </p>
      )}
    </div>
  );
}
