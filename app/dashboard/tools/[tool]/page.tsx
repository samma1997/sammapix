"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import HowToUse from "@/components/tools/HowToUse";

// ─── Lazy-load tool components to keep bundle lean ──────────────────────────

const TOOL_MAP: Record<string, React.ComponentType> = {
  compress:      dynamic(() => import("@/components/tools/CompressClient")),
  webp:          dynamic(() => import("@/components/tools/WebpClient")),
  "ai-rename":   dynamic(() => import("@/components/tools/AiRenameClient")),
  "alt-text":    dynamic(() => import("@/components/tools/AltTextClient")),
  exif:          dynamic(() => import("@/components/tools/ExifClient")),
  filmlab:       dynamic(() => import("@/components/tools/FilmLabClient")),
  stampit:       dynamic(() => import("@/components/tools/StampItClient")),
  croproatio:    dynamic(() => import("@/components/tools/CropRatioClient")),
  twinhunt:      dynamic(() => import("@/components/tools/TwinHuntClient")),
  geosort:       dynamic(() => import("@/components/tools/GeoSortClientWrapper")),
  travelmap:     dynamic(() => import("@/components/tools/TravelMapClientWrapper")),
  resizepack:    dynamic(() => import("@/components/tools/ResizePackClient")),
  cull:          dynamic(() => import("@/components/tools/CullClientWrapper")),
  heic:          dynamic(() => import("@/components/tools/HeicClient")),
  "video-thumb": dynamic(() => import("@/components/tools/VideoThumbClient")),
  workflow:      dynamic(() => import("@/components/tools/WorkflowPipeline")),
};

interface ToolData {
  label: string;
  tagline: string;
  steps: { title: string; desc: string }[];
  proTip: { text: string; linkLabel: string; linkHref: string };
}

const TOOL_DATA: Record<string, ToolData> = {
  compress: {
    label: "Compress",
    tagline: "Shrink JPG, PNG, WebP, GIF — no quality loss.",
    steps: [
      { title: "Drop your images", desc: "Drag & drop JPG, PNG, WebP, or GIF files." },
      { title: "Adjust quality", desc: "Use the slider to set compression level." },
      { title: "Download", desc: "Get compressed files individually or as ZIP." },
    ],
    proTip: {
      text: "Use AI Workflow to compress + rename + resize in one step.",
      linkLabel: "Try AI Workflow",
      linkHref: "/dashboard/tools/workflow",
    },
  },
  webp: {
    label: "WebP",
    tagline: "Convert any image to WebP. 25–34% smaller than JPEG.",
    steps: [
      { title: "Drop images", desc: "Add JPG, PNG, or GIF files." },
      { title: "Auto convert", desc: "Files convert to WebP automatically." },
      { title: "Download", desc: "Get WebP files ready for your site." },
    ],
    proTip: {
      text: "Combine with Compress for maximum file size reduction.",
      linkLabel: "Go to Compress",
      linkHref: "/dashboard/tools/compress",
    },
  },
  "ai-rename": {
    label: "AI Rename",
    tagline: "AI generates SEO-optimized filenames in seconds.",
    steps: [
      { title: "Drop images", desc: "Add photos you want to rename." },
      { title: "AI analyzes", desc: "Gemini AI generates descriptive filenames." },
      { title: "Download renamed", desc: "Get SEO-ready filenames + alt text." },
    ],
    proTip: {
      text: "200 renames/day on Pro. Free gets 5/day.",
      linkLabel: "Upgrade to Pro",
      linkHref: "/pricing",
    },
  },
  "alt-text": {
    label: "AI Alt Text",
    tagline: "Generate accessibility-compliant alt text with AI.",
    steps: [
      { title: "Drop images", desc: "Add photos that need alt text." },
      { title: "AI generates", desc: "Gemini creates descriptive alt text." },
      { title: "Copy or export", desc: "Copy all or download as CSV." },
    ],
    proTip: {
      text: "Perfect for WCAG compliance and SEO.",
      linkLabel: "See Pro features",
      linkHref: "/pricing",
    },
  },
  exif: {
    label: "EXIF Lens",
    tagline: "Strip GPS, camera data and all metadata.",
    steps: [
      { title: "Drop photos", desc: "Add images with EXIF data." },
      { title: "View metadata", desc: "See all GPS, camera, and date info." },
      { title: "Download clean", desc: "Get files with metadata removed." },
    ],
    proTip: {
      text: "Always strip EXIF before sharing photos online for privacy.",
      linkLabel: "Learn more",
      linkHref: "/blog",
    },
  },
  filmlab: {
    label: "FilmLab",
    tagline: "14 analog film presets — Kodak, Fuji, Ilford.",
    steps: [
      { title: "Drop photos", desc: "Add images to apply film looks." },
      { title: "Choose preset", desc: "Pick from 14 analog film styles." },
      { title: "Download", desc: "Get photos with the film look applied." },
    ],
    proTip: {
      text: "Try Kodak Gold for warm tones or Ilford HP5 for B&W.",
      linkLabel: "See all presets",
      linkHref: "/dashboard/tools/filmlab",
    },
  },
  stampit: {
    label: "StampIt",
    tagline: "Batch watermark with text or logo.",
    steps: [
      { title: "Drop photos", desc: "Add images to watermark." },
      { title: "Configure", desc: "Add text/logo, choose position." },
      { title: "Download", desc: "Get watermarked images." },
    ],
    proTip: {
      text: "Use tiled filigrana mode for maximum protection.",
      linkLabel: "Upgrade to Pro",
      linkHref: "/pricing",
    },
  },
  croproatio: {
    label: "CropRatio",
    tagline: "Crop to exact ratios — 1:1, 16:9, 4:3, A4.",
    steps: [
      { title: "Drop image", desc: "Add the photo to crop." },
      { title: "Select ratio", desc: "Choose 1:1, 16:9, 4:3, or custom." },
      { title: "Adjust & download", desc: "Position the crop and save." },
    ],
    proTip: {
      text: "Use 4:5 for Instagram portrait posts.",
      linkLabel: "Try ResizePack",
      linkHref: "/dashboard/tools/resizepack",
    },
  },
  twinhunt: {
    label: "TwinHunt",
    tagline: "Find exact and near-duplicate photos.",
    steps: [
      { title: "Drop photos", desc: "Add a batch of similar photos." },
      { title: "Scan duplicates", desc: "Perceptual hashing finds matches." },
      { title: "Review & delete", desc: "Keep the best, remove copies." },
    ],
    proTip: {
      text: "Run this before Compress to avoid compressing duplicates.",
      linkLabel: "Go to Compress",
      linkHref: "/dashboard/tools/compress",
    },
  },
  geosort: {
    label: "GeoSort",
    tagline: "Sort photos by country using GPS data.",
    steps: [
      { title: "Drop photos", desc: "Add photos with GPS EXIF data." },
      { title: "Auto-sort", desc: "Photos organized by country." },
      { title: "Download sorted", desc: "Get organized folders." },
    ],
    proTip: {
      text: "Works great after a multi-country trip.",
      linkLabel: "Try TravelMap",
      linkHref: "/dashboard/tools/travelmap",
    },
  },
  travelmap: {
    label: "TravelMap",
    tagline: "Generate an interactive map from your photos.",
    steps: [
      { title: "Drop photos", desc: "Add travel photos with GPS." },
      { title: "Map generates", desc: "See pins on an interactive map." },
      { title: "Explore", desc: "Click pins to see photos at each location." },
    ],
    proTip: {
      text: "Combine with GeoSort to organize and visualize your trips.",
      linkLabel: "Try GeoSort",
      linkHref: "/dashboard/tools/geosort",
    },
  },
  resizepack: {
    label: "ResizePack",
    tagline: "Resize for Instagram, Twitter, LinkedIn with one click.",
    steps: [
      { title: "Drop photos", desc: "Add images to resize." },
      { title: "Select platform", desc: "Choose social media preset." },
      { title: "Download", desc: "Get perfectly sized images." },
    ],
    proTip: {
      text: "Use the Instagram preset for Stories (1080x1920).",
      linkLabel: "See all presets",
      linkHref: "/dashboard/tools/resizepack",
    },
  },
  cull: {
    label: "Cull",
    tagline: "Rate and cull a shoot in minutes.",
    steps: [
      { title: "Drop shoot", desc: "Add all photos from a session." },
      { title: "Rate with stars", desc: "Use keyboard shortcuts to rate." },
      { title: "Export keepers", desc: "Download only the best shots." },
    ],
    proTip: {
      text: "Use keyboard shortcuts: 1-5 for stars, X to reject.",
      linkLabel: "See Pro features",
      linkHref: "/pricing",
    },
  },
  heic: {
    label: "HEIC Converter",
    tagline: "Convert iPhone HEIC photos to JPG or WebP.",
    steps: [
      { title: "Drop HEIC files", desc: "Add iPhone photos." },
      { title: "Choose format", desc: "Select JPG or WebP output." },
      { title: "Download", desc: "Get converted files." },
    ],
    proTip: {
      text: "Choose WebP for 25% smaller files than JPG.",
      linkLabel: "Try WebP converter",
      linkHref: "/dashboard/tools/webp",
    },
  },
  "video-thumb": {
    label: "Video Thumbnail",
    tagline: "Extract the best frame from any video.",
    steps: [
      { title: "Drop video", desc: "Add MP4, WebM, or MOV file." },
      { title: "Pick frame", desc: "Browse extracted frames." },
      { title: "Download", desc: "Save as JPG, PNG, or WebP." },
    ],
    proTip: {
      text: "AI can pick the best frame automatically on Pro.",
      linkLabel: "Upgrade to Pro",
      linkHref: "/pricing",
    },
  },
  workflow: {
    label: "AI Workflow",
    tagline: "Run the full pipeline in one click.",
    steps: [
      { title: "Choose preset", desc: "Blog, Instagram, E-commerce, or Client." },
      { title: "Drop photos", desc: "Add up to 500 files." },
      { title: "Run & download", desc: "Get everything processed as ZIP." },
    ],
    proTip: {
      text: "This is the Pro killer feature — saves hours per shoot.",
      linkLabel: "Upgrade to Pro",
      linkHref: "/pricing",
    },
  },
};

export default function DashboardToolPage() {
  const params = useParams();
  const slug = params.tool as string;
  const ToolComponent = TOOL_MAP[slug];
  const data = TOOL_DATA[slug];

  if (!ToolComponent || !data) {
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

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919]">
      {/* Tool header */}
      <div className="px-4 sm:px-6 pt-8 pb-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
            {data.label}
          </h1>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
            {data.tagline}
          </p>
        </div>
      </div>

      {/* Tool component */}
      <ToolComponent />

      {/* How to use */}
      <HowToUse toolName={data.label} steps={data.steps} proTip={data.proTip} />
    </div>
  );
}
