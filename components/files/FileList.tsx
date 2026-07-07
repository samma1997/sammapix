"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Download, Trash2, ImageOff, Lock } from "lucide-react";
import { useImageStore } from "@/store/imageStore";
import { Button } from "@/components/ui/button";
import FileCard from "./FileCard";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import ProUpsellModal from "@/components/ui/ProUpsellModal";

interface FileListProps {
  onAiRename?: (fileId: string) => void;
}

export default function FileList({ onAiRename }: FileListProps) {
  const { items, clearAll, downloadAll, isZipping } = useImageStore();
  const isIt = (usePathname() || "").startsWith("/it");
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";
  const [showUpsell, setShowUpsell] = useState(false);
  const doneFiles = items.filter((i) => i.status === "done");
  const hasDoneFiles = doneFiles.length > 0;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-10 w-10 rounded-lg border border-gray-200 dark:border-[#2A2A2A] flex items-center justify-center mb-3 bg-gray-50 dark:bg-[#1E1E1E]">
          <ImageOff className="h-5 w-5 text-gray-300 dark:text-[#525252]" strokeWidth={1.5} />
        </div>
        <p className="text-sm text-gray-400 dark:text-[#525252]">{isIt ? "Ancora nessuna immagine" : "No images yet"}</p>
        <p className="text-xs text-gray-300 dark:text-[#525252] mt-1">{isIt ? "Trascina qui sopra delle immagini per iniziare" : "Drop some images above to get started"}</p>
      </div>
    );
  }

  const handleDownloadAll = async () => {
    if (!isPro) {
      setShowUpsell(true);
      return;
    }
    await downloadAll();
  };

  return (
    <div className="space-y-3 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700 dark:text-[#E5E5E5]">
          {items.length} {items.length === 1 ? "file" : "file"}
          {hasDoneFiles && (
            <span className="text-gray-400 dark:text-[#525252] font-normal ml-1">
             - {doneFiles.length} {isIt ? "pronti" : "done"}
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
          {isIt ? "Svuota tutto" : "Clear all"}
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
              {doneFiles.length} {doneFiles.length === 1 ? (isIt ? "file pronto" : "file ready") : (isIt ? "file pronti" : "files ready")}
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={handleDownloadAll}
              loading={isZipping}
              className="gap-1.5"
            >
              {!isZipping && !isPro && <Lock className="h-3 w-3" strokeWidth={1.5} />}
              {!isZipping && isPro && <Download className="h-3.5 w-3.5" strokeWidth={1.5} />}
              {isZipping ? (isIt ? "Creazione ZIP..." : "Zipping...") : (isIt ? "Scarica tutto in ZIP" : "Download all ZIP")}
            </Button>
          </div>
        </div>
      )}

      {/* Pro upsell modal for ZIP download */}
      <ProUpsellModal
        open={showUpsell}
        onClose={() => setShowUpsell(false)}
        trigger="zip"
      />
    </div>
  );
}
