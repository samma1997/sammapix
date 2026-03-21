"use client";

import React, { useState } from "react";
import { Download, Trash2, ImageOff, Lock } from "lucide-react";
import { useImageStore } from "@/store/imageStore";
import { Button } from "@/components/ui/button";
import FileCard from "./FileCard";
import { cn } from "@/lib/utils";
import { useSession, signIn } from "next-auth/react";

interface FileListProps {
  onAiRename?: (fileId: string) => void;
}

export default function FileList({ onAiRename }: FileListProps) {
  const { items, clearAll, downloadAll, isZipping } = useImageStore();
  const { data: session } = useSession();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const doneFiles = items.filter((i) => i.status === "done");
  const hasDoneFiles = doneFiles.length > 0;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-10 w-10 rounded-lg border border-gray-200 dark:border-[#2A2A2A] flex items-center justify-center mb-3 bg-gray-50 dark:bg-[#1E1E1E]">
          <ImageOff className="h-5 w-5 text-gray-300 dark:text-[#525252]" strokeWidth={1.5} />
        </div>
        <p className="text-sm text-gray-400 dark:text-[#525252]">No images yet</p>
        <p className="text-xs text-gray-300 dark:text-[#525252] mt-1">Drop some images above to get started</p>
      </div>
    );
  }

  const handleDownloadAll = async () => {
    if (!session) {
      setShowLoginPrompt(true);
      return;
    }
    setShowLoginPrompt(false);
    await downloadAll();
  };

  return (
    <div className="space-y-3 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700 dark:text-[#E5E5E5]">
          {items.length} {items.length === 1 ? "file" : "files"}
          {hasDoneFiles && (
            <span className="text-gray-400 dark:text-[#525252] font-normal ml-1">
             - {doneFiles.length} done
            </span>
          )}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          className="text-gray-400 dark:text-[#525252] hover:text-gray-700 dark:hover:text-[#A3A3A3] text-xs"
        >
          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
          Clear all
        </Button>
      </div>

      {/* File cards */}
      <div className="flex flex-col gap-2">
        {items.map((file) => (
          <FileCard key={file.id} file={file} onAiRename={onAiRename} />
        ))}
      </div>

      {/* Download all ZIP */}
      {hasDoneFiles && (
        <div
          className={cn(
            "pt-3 border-t border-gray-100 dark:border-[#2A2A2A] flex flex-col gap-2",
            "animate-slide-up"
          )}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400 dark:text-[#525252]">
              {doneFiles.length} {doneFiles.length === 1 ? "file" : "files"} ready
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={handleDownloadAll}
              loading={isZipping}
              className="gap-1.5"
            >
              {!isZipping && !session && <Lock className="h-3 w-3" strokeWidth={1.5} />}
              {!isZipping && session && <Download className="h-3.5 w-3.5" strokeWidth={1.5} />}
              {isZipping ? "Zipping..." : "Download all ZIP"}
            </Button>
          </div>
          {/* Login prompt shown when unauthenticated user clicks ZIP */}
          {showLoginPrompt && (
            <div className="flex items-center justify-between gap-3 px-3 py-2.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-[#FAFAFA] dark:bg-[#1E1E1E]">
              <p className="text-xs text-[#525252] dark:text-[#A3A3A3]">
                Sign in to download all files as ZIP — it&apos;s free.
              </p>
              <button
                onClick={() => signIn()}
                className="shrink-0 text-xs font-medium text-white bg-[#171717] dark:bg-white dark:text-[#171717] px-3 py-1.5 rounded-md hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
