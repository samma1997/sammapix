"use client";

import React from "react";
import { Sparkles, Zap } from "lucide-react";
import { useImageStore } from "@/store/imageStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { AI_RENAME_FREE_PER_DAY } from "@/lib/constants";

interface SettingsToolbarProps {
  onAiRenameClick?: () => void;
}

export default function SettingsToolbar({ onAiRenameClick }: SettingsToolbarProps) {
  const {
    settings,
    isProcessing,
    items,
    setQuality,
    setConvertToWebP,
    setAiRenameEnabled,
    processAll,
  } = useImageStore();

  const { data: session } = useSession();
  const hasQueuedItems = items.some((i) => i.status === "queued");
  const allDone = items.length > 0 && items.every((i) => i.status === "done" || i.status === "error");

  const handleAiRenameToggle = () => {
    if (!session) {
      // Prompt sign-in
      onAiRenameClick?.();
      return;
    }
    setAiRenameEnabled(!settings.aiRenameEnabled);
  };

  return (
    <div className="animate-slide-down border border-gray-200 rounded-md bg-white p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Quality slider */}
        <div className="flex-1 min-w-[160px]">
          <Slider
            label="Quality"
            showValue
            min={1}
            max={100}
            step={1}
            value={[settings.quality]}
            onValueChange={(val) => setQuality(val[0])}
          />
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Convert to WebP */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              className={cn(
                "relative w-9 h-5 rounded-full transition-colors duration-150",
                settings.convertToWebP ? "bg-gray-900" : "bg-gray-200"
              )}
              onClick={() => setConvertToWebP(!settings.convertToWebP)}
            >
              <div
                className={cn(
                  "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-150",
                  settings.convertToWebP && "translate-x-4"
                )}
              />
            </div>
            <span className="text-sm text-gray-600">Convert to WebP</span>
          </label>

          {/* AI Rename */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              className={cn(
                "relative w-9 h-5 rounded-full transition-colors duration-150",
                settings.aiRenameEnabled ? "bg-brand" : "bg-gray-200"
              )}
              onClick={handleAiRenameToggle}
            >
              <div
                className={cn(
                  "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-150",
                  settings.aiRenameEnabled && "translate-x-4"
                )}
              />
            </div>
            <span className="text-sm text-gray-600 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-brand" strokeWidth={1.5} />
              AI Rename
            </span>
            {session ? (
              <Badge variant="brand">{AI_RENAME_FREE_PER_DAY}/day</Badge>
            ) : (
              <Badge variant="default">Login</Badge>
            )}
          </label>
        </div>

        {/* Process button */}
        <Button
          variant="primary"
          size="md"
          className="shrink-0"
          disabled={!hasQueuedItems || isProcessing}
          loading={isProcessing}
          onClick={processAll}
        >
          {isProcessing ? (
            "Compressing..."
          ) : allDone ? (
            "Reprocess"
          ) : (
            <>
              <Zap className="h-4 w-4" strokeWidth={1.5} />
              Compress all
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
