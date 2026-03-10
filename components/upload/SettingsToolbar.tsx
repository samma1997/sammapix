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
import { Globe } from "lucide-react";

const AI_RENAME_LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
];

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
    setAiRenameLocale,
    processAll,
    aiRenameUsedToday,
  } = useImageStore();

  const { data: session } = useSession();
  const hasQueuedItems = items.some((i) => i.status === "queued");
  const allDone = items.length > 0 && items.every((i) => i.status === "done" || i.status === "error");
  const remaining = Math.max(0, AI_RENAME_FREE_PER_DAY - aiRenameUsedToday);

  const handleAiRenameToggle = () => {
    if (!session) {
      // Prompt sign-in
      onAiRenameClick?.();
      return;
    }
    if (remaining === 0 && session) {
      // Don't toggle — limit reached
      return;
    }
    setAiRenameEnabled(!settings.aiRenameEnabled);
  };

  return (
    <div className="animate-slide-down border border-gray-200 dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] p-4">
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
                settings.convertToWebP ? "bg-gray-900" : "bg-gray-200 dark:bg-[#3A3A3A]"
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
            <span className="text-sm text-gray-600 dark:text-[#A3A3A3]">Convert to WebP</span>
          </label>

          {/* AI Rename */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              className={cn(
                "relative w-9 h-5 rounded-full transition-colors duration-150",
                settings.aiRenameEnabled ? "bg-brand" : "bg-gray-200 dark:bg-[#3A3A3A]"
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
            <span className="text-sm text-gray-600 dark:text-[#A3A3A3] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-brand" strokeWidth={1.5} />
              AI Rename
            </span>
            {session ? (
              <span
                className={cn(
                  "text-xs font-semibold tabular-nums px-1.5 py-0.5 rounded",
                  remaining === 0
                    ? "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                    : remaining <= 2
                    ? "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400"
                    : "bg-gray-100 text-gray-500 dark:bg-[#2A2A2A] dark:text-[#737373]"
                )}
              >
                {remaining}/{AI_RENAME_FREE_PER_DAY}
              </span>
            ) : (
              <Badge variant="default">Login</Badge>
            )}
          </label>
          {/* Language selector — visible when AI Rename is enabled */}
          {settings.aiRenameEnabled && session && (
            <div className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-[#737373]" strokeWidth={1.5} />
              <select
                value={settings.aiRenameLocale}
                onChange={(e) => setAiRenameLocale(e.target.value)}
                className="text-xs bg-transparent border border-gray-200 dark:border-[#2A2A2A] rounded px-1.5 py-1 text-gray-600 dark:text-[#A3A3A3] focus:outline-none focus:border-[#6366F1] cursor-pointer"
              >
                {AI_RENAME_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {remaining === 0 && session && (
            <span className="text-[10px] text-red-500">
              Limit reached &middot;{" "}
              <a href="/pricing" className="underline">Go Pro</a>
            </span>
          )}
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
            "..."
          ) : allDone ? (
            "Compress all"
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
