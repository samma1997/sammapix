import type { LucideIcon } from "lucide-react";
import { Globe, MessageCircle, Shield, Grid3x3, Search } from "lucide-react";
import type { PipelineStepId } from "@/lib/pipeline-engine";

// Settings mirror only the keys that WorkflowStep actually uses.
// quality     = compress quality 10-100
// maxPx       = resize longest side in px
// webpQuality = webp quality 50-100 (UI scale; toEngineSteps divides by 100)
// locale      = ai-rename locale string
export interface RecipeStepSettings {
  quality?: number;
  maxPx?: number;
  webpQuality?: number;
  locale?: string;
}

export interface WorkflowRecipe {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  steps: Array<{
    id: PipelineStepId;
    settings?: RecipeStepSettings;
  }>;
  proOnly?: boolean;
}

export const WORKFLOW_RECIPES: WorkflowRecipe[] = [
  {
    id: "web-ready",
    label: "Web Ready",
    description: "Resize, compress and convert for fast page loads",
    icon: Globe,
    steps: [
      { id: "resize", settings: { maxPx: 1080 } },
      { id: "compress", settings: { quality: 80 } },
      { id: "webp", settings: { webpQuality: 85 } },
    ],
  },
  {
    id: "whatsapp-batch",
    label: "WhatsApp Batch",
    description: "Keep full resolution with aggressive compression",
    icon: MessageCircle,
    steps: [
      { id: "resize", settings: { maxPx: 2048 } },
      { id: "compress", settings: { quality: 70 } },
    ],
  },
  {
    id: "privacy-clean",
    label: "Privacy Clean",
    description: "Strip metadata and compress before sharing",
    icon: Shield,
    steps: [
      { id: "exif-strip" },
      { id: "compress", settings: { quality: 85 } },
    ],
  },
  {
    id: "instagram-grid",
    label: "Instagram Grid",
    description: "Square-ready, privacy safe, feed optimised",
    icon: Grid3x3,
    steps: [
      { id: "resize", settings: { maxPx: 1080 } },
      { id: "exif-strip" },
      { id: "compress", settings: { quality: 82 } },
    ],
  },
  {
    id: "seo-batch",
    label: "SEO Batch",
    description: "Resize, convert to WebP and rename files for search",
    icon: Search,
    proOnly: true,
    steps: [
      { id: "resize", settings: { maxPx: 1200 } },
      { id: "webp", settings: { webpQuality: 88 } },
      { id: "ai-rename", settings: { locale: "en" } },
    ],
  },
];
