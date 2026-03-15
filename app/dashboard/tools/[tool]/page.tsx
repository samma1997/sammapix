"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// ─── Lazy-load tool components to keep bundle lean ──────────────────────────

const TOOL_MAP: Record<string, { component: React.ComponentType; label: string }> = {
  compress:    { component: dynamic(() => import("@/components/tools/CompressClient")),          label: "Compress" },
  webp:        { component: dynamic(() => import("@/components/tools/WebpClient")),              label: "WebP" },
  "ai-rename": { component: dynamic(() => import("@/components/tools/AiRenameClient")),          label: "AI Rename" },
  "alt-text":  { component: dynamic(() => import("@/components/tools/AltTextClient")),           label: "AI Alt Text" },
  exif:        { component: dynamic(() => import("@/components/tools/ExifClient")),              label: "EXIF Lens" },
  filmlab:     { component: dynamic(() => import("@/components/tools/FilmLabClient")),           label: "FilmLab" },
  stampit:     { component: dynamic(() => import("@/components/tools/StampItClient")),           label: "StampIt" },
  croproatio:  { component: dynamic(() => import("@/components/tools/CropRatioClient")),         label: "CropRatio" },
  twinhunt:    { component: dynamic(() => import("@/components/tools/TwinHuntClient")),          label: "TwinHunt" },
  geosort:     { component: dynamic(() => import("@/components/tools/GeoSortClientWrapper")),    label: "GeoSort" },
  travelmap:   { component: dynamic(() => import("@/components/tools/TravelMapClientWrapper")),  label: "TravelMap" },
  resizepack:  { component: dynamic(() => import("@/components/tools/ResizePackClient")),        label: "ResizePack" },
  cull:        { component: dynamic(() => import("@/components/tools/CullClientWrapper")),       label: "Cull" },
  heic:        { component: dynamic(() => import("@/components/tools/HeicClient")),              label: "HEIC Converter" },
  "video-thumb": { component: dynamic(() => import("@/components/tools/VideoThumbClient")),      label: "Video Thumbnail" },
  workflow:      { component: dynamic(() => import("@/components/tools/WorkflowPipeline")),       label: "AI Workflow" },
};

export default function DashboardToolPage() {
  const params = useParams();
  const slug = params.tool as string;
  const entry = TOOL_MAP[slug];

  if (!entry) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <p className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
          Tool not found
        </p>
        <Link
          href="/dashboard"
          className="text-sm text-[#6366F1] hover:underline"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const ToolComponent = entry.component;

  return (
    <div className="min-h-screen">
      {/* Header bar */}
      <div className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#191919] px-4 sm:px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            Dashboard
          </Link>
          <span className="text-[#D4D4D4] dark:text-[#404040]">/</span>
          <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
            {entry.label}
          </span>
        </div>
      </div>

      {/* Tool */}
      <ToolComponent />
    </div>
  );
}
