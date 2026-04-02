"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  Minimize2,
  FileImage,
  Sparkles,
  Maximize2,
  ScanSearch,
  Clapperboard,
  Stamp,
  Scissors,
  ThumbsUp,
  ScanFace,
  MapPin,
  Map,
  CheckCircle2,
  Share2,
  Check,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useImageStore } from "@/store/imageStore";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface NextStepProps {
  /** Tool identifier matching the keys in NEXT_STEPS_MAP */
  currentTool: string;
  /** Optionally override the file count displayed (falls back to store count) */
  fileCount?: number;
}

// ── Suggestion definition ─────────────────────────────────────────────────────

interface Suggestion {
  label: string;
  href: string;
  Icon: React.FC<{ className?: string }>;
}

// ── Icon helpers (thin wrappers around Lucide) ────────────────────────────────

const IconCompress = ({ className }: { className?: string }) => (
  <Minimize2 className={className} strokeWidth={1.5} />
);
const IconWebP = ({ className }: { className?: string }) => (
  <FileImage className={className} strokeWidth={1.5} />
);
const IconAIRename = ({ className }: { className?: string }) => (
  <Sparkles className={className} strokeWidth={1.5} />
);
const IconResize = ({ className }: { className?: string }) => (
  <Maximize2 className={className} strokeWidth={1.5} />
);
const IconExif = ({ className }: { className?: string }) => (
  <ScanSearch className={className} strokeWidth={1.5} />
);
const IconFilmLab = ({ className }: { className?: string }) => (
  <Clapperboard className={className} strokeWidth={1.5} />
);
const IconStampIt = ({ className }: { className?: string }) => (
  <Stamp className={className} strokeWidth={1.5} />
);
const IconCrop = ({ className }: { className?: string }) => (
  <Scissors className={className} strokeWidth={1.5} />
);
const IconCull = ({ className }: { className?: string }) => (
  <ThumbsUp className={className} strokeWidth={1.5} />
);
const IconTwinHunt = ({ className }: { className?: string }) => (
  <ScanFace className={className} strokeWidth={1.5} />
);
const IconGeoSort = ({ className }: { className?: string }) => (
  <MapPin className={className} strokeWidth={1.5} />
);
const IconTravelMap = ({ className }: { className?: string }) => (
  <Map className={className} strokeWidth={1.5} />
);
const IconHeic = ({ className }: { className?: string }) => (
  <FileImage className={className} strokeWidth={1.5} />
);

// ── Suggestion catalogue ──────────────────────────────────────────────────────

const SUGGESTIONS = {
  compress: {
    label: "Compress for web",
    href: "/tools/compress",
    Icon: IconCompress,
  },
  webp: {
    label: "Convert to WebP",
    href: "/tools/webp",
    Icon: IconWebP,
  },
  "ai-rename": {
    label: "AI Rename for SEO",
    href: "/tools/ai-rename",
    Icon: IconAIRename,
  },
  resize: {
    label: "Resize for social",
    href: "/tools/resizepack",
    Icon: IconResize,
  },
  watermark: {
    label: "Add watermark",
    href: "/tools/stampit",
    Icon: IconStampIt,
  },
  exif: {
    label: "EXIF Viewer",
    href: "/tools/exif",
    Icon: IconExif,
  },
  filmlab: {
    label: "Film Filters",
    href: "/tools/filmlab",
    Icon: IconFilmLab,
  },
  croproatio: {
    label: "Crop to ratio",
    href: "/tools/croproatio",
    Icon: IconCrop,
  },
  cull: {
    label: "Cull photos",
    href: "/tools/cull",
    Icon: IconCull,
  },
  twinhunt: {
    label: "Find duplicates",
    href: "/tools/twinhunt",
    Icon: IconTwinHunt,
  },
  geosort: {
    label: "Sort by Location",
    href: "/tools/geosort",
    Icon: IconGeoSort,
  },
  travelmap: {
    label: "Photo Map",
    href: "/tools/travelmap",
    Icon: IconTravelMap,
  },
  heic: {
    label: "Convert HEIC",
    href: "/tools/heic",
    Icon: IconHeic,
  },
  "pdf-to-image": {
    label: "PDF to Image",
    href: "/tools/pdf-to-image",
    Icon: IconHeic,
  },
  upscale: {
    label: "Upscale image",
    href: "/tools/upscale",
    Icon: IconResize,
  },
} as const;

type SuggestionKey = keyof typeof SUGGESTIONS;

// ── Flow mapping ──────────────────────────────────────────────────────────────

const NEXT_STEPS_MAP: Record<string, SuggestionKey[]> = {
  compress: ["ai-rename", "webp", "resize"],
  webp: ["ai-rename", "watermark"],
  "ai-rename": ["compress", "resize"],
  exif: ["compress", "ai-rename"],
  resizepack: ["compress", "watermark"],
  croproatio: ["compress", "resize"],
  filmlab: ["compress", "watermark"],
  stampit: ["compress", "resize"],
  cull: ["compress", "ai-rename"],
  twinhunt: ["compress", "exif"],
  geosort: ["ai-rename", "travelmap"],
  travelmap: ["geosort", "filmlab"],
  heic: ["compress", "ai-rename"],
  "pdf-to-image": ["compress", "webp", "ai-rename"],
  upscale: ["compress", "ai-rename", "resize"],
};

// ── Completion summary line ───────────────────────────────────────────────────

function completionLabel(tool: string, count: number): string {
  const noun = count === 1 ? "image" : "images";
  const verbs: Record<string, string> = {
    compress: "compressed",
    webp: "converted to WebP",
    "ai-rename": "AI renamed",
    exif: "EXIF stripped",
    resizepack: "resized",
    croproatio: "cropped",
    filmlab: "processed",
    stampit: "watermarked",
    cull: "culled",
    twinhunt: "duplicates found",
    geosort: "sorted by location",
    travelmap: "mapped",
    heic: "converted",
    "pdf-to-image": "converted to images",
    upscale: "upscaled",
  };
  const verb = verbs[tool] ?? "processed";
  return `${count} ${noun} ${verb}`;
}

// ── Share button ──────────────────────────────────────────────────────────────

function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "SammaPix - Free Image Tools",
          text: "I just optimized my images with SammaPix \u2014 27 free browser-based tools, no uploads needed!",
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed silently
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <button
      onClick={handleShare}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5",
        "text-sm font-medium text-[#525252] dark:text-[#A3A3A3]",
        "border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md",
        "bg-white dark:bg-[#252525]",
        "hover:border-[#A3A3A3] dark:hover:border-[#444]",
        "hover:text-[#171717] dark:hover:text-[#E5E5E5]",
        "hover:bg-[#F5F5F5] dark:hover:bg-[#2E2E2E]",
        "transition-colors duration-150"
      )}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={1.75} />
      ) : (
        <Share2 className="h-3.5 w-3.5" strokeWidth={1.5} />
      )}
      {copied ? "Link copied!" : "Share SammaPix"}
    </button>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function NextStepSuggestions({
  currentTool,
  fileCount: fileCountProp,
}: NextStepProps) {
  const { data: session } = useSession();
  const isPro =
    (session?.user as { plan?: string } | undefined)?.plan === "pro";

  const items = useImageStore((s) => s.items);

  const doneCount = items.filter((i) => i.status === "done").length;
  const isProcessing = useImageStore((s) => s.isProcessing);
  const allDone = items.length > 0 && doneCount === items.length && !isProcessing;

  // Resolve file count: prop takes precedence, otherwise derive from store
  const displayCount = fileCountProp ?? doneCount;

  const suggestionKeys = NEXT_STEPS_MAP[currentTool] ?? [];

  // Nothing to show until all files are done
  if (!allDone || suggestionKeys.length === 0) return null;

  return (
    <div
      className={cn(
        "mt-4 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A]",
        "bg-[#FAFAFA] dark:bg-[#1E1E1E] p-4 sm:p-5",
        "animate-in fade-in slide-in-from-bottom-2 duration-300"
      )}
      role="complementary"
      aria-label="Next step suggestions"
    >
      {/* Completion badge */}
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2
          className="h-4 w-4 text-[#16A34A] shrink-0"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
          {completionLabel(currentTool, displayCount)}
        </span>
      </div>

      {/* "What's next" heading */}
      <p className="text-xs font-semibold text-[#737373] dark:text-[#A3A3A3] uppercase tracking-wide mb-3">
        What&apos;s next?
      </p>

      {/* Suggestion buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestionKeys.map((key) => {
          const s = SUGGESTIONS[key] as Suggestion;
          return (
            <Link
              key={key}
              href={s.href}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5",
                "text-sm font-medium text-[#525252] dark:text-[#A3A3A3]",
                "border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md",
                "bg-white dark:bg-[#252525]",
                "hover:border-[#A3A3A3] dark:hover:border-[#444]",
                "hover:text-[#171717] dark:hover:text-[#E5E5E5]",
                "hover:bg-[#F5F5F5] dark:hover:bg-[#2E2E2E]",
                "transition-colors duration-150"
              )}
            >
              <s.Icon className="h-3.5 w-3.5" />
              {s.label}
            </Link>
          );
        })}
      </div>

      {/* Share button */}
      <ShareButton />

    </div>
  );
}
