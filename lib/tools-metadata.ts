export interface ToolMeta {
  id: string;
  name: string;
  shortDesc: string;
  slug: string;
  category: "optimize" | "ai" | "organize" | "edit" | "content";
  relatedTools: string[];
  relatedBlogSlugs: string[];
}

export const TOOLS: Record<string, ToolMeta> = {
  compress: {
    id: "compress",
    name: "Compress Images",
    shortDesc: "Reduce file size up to 90%",
    slug: "/tools/compress",
    category: "optimize",
    relatedTools: ["webp", "resizepack", "exif", "croproatio"],
    relatedBlogSlugs: [
      "compress-images-without-losing-quality",
      "best-image-compression-tools-2026",
    ],
  },
  webp: {
    id: "webp",
    name: "Convert to WebP",
    shortDesc: "Smaller files with modern format",
    slug: "/tools/webp",
    category: "optimize",
    relatedTools: ["compress", "resizepack", "heic", "exif"],
    relatedBlogSlugs: [
      "best-image-format-for-web-2026",
      "compress-images-without-losing-quality",
    ],
  },
  "ai-rename": {
    id: "ai-rename",
    name: "AI Rename",
    shortDesc: "SEO-friendly filenames with AI",
    slug: "/tools/ai-rename",
    category: "ai",
    relatedTools: ["alt-text", "smartsort", "compress", "batchname"],
    relatedBlogSlugs: [
      "ai-image-renaming-seo-guide",
      "image-seo-best-practices",
    ],
  },
  "alt-text": {
    id: "alt-text",
    name: "AI Alt Text",
    shortDesc: "Generate accessible alt text with AI",
    slug: "/tools/alt-text",
    category: "ai",
    relatedTools: ["ai-rename", "compress", "webp", "blogdrop"],
    relatedBlogSlugs: [
      "ai-image-renaming-seo-guide",
      "image-seo-best-practices",
    ],
  },
  resizepack: {
    id: "resizepack",
    name: "Batch Resize",
    shortDesc: "Resize for social media & web",
    slug: "/tools/resizepack",
    category: "optimize",
    relatedTools: ["croproatio", "compress", "webp", "weblift"],
    relatedBlogSlugs: [
      "resize-images-for-social-media",
      "compress-images-without-losing-quality",
    ],
  },
  geosort: {
    id: "geosort",
    name: "Sort by Location",
    shortDesc: "Organize photos by GPS data",
    slug: "/tools/geosort",
    category: "organize",
    relatedTools: ["travelmap", "smartsort", "batchname", "exif"],
    relatedBlogSlugs: [],
  },
  travelmap: {
    id: "travelmap",
    name: "Travel Map",
    shortDesc: "Plot photos on a world map",
    slug: "/tools/travelmap",
    category: "organize",
    relatedTools: ["geosort", "smartsort", "exif", "ai-rename"],
    relatedBlogSlugs: [],
  },
  twinhunt: {
    id: "twinhunt",
    name: "Duplicate Finder",
    shortDesc: "Find and remove duplicate photos",
    slug: "/tools/twinhunt",
    category: "organize",
    relatedTools: ["cull", "batchname", "smartsort", "compress"],
    relatedBlogSlugs: [],
  },
  cull: {
    id: "cull",
    name: "Photo Culler",
    shortDesc: "AI-powered photo selection",
    slug: "/tools/cull",
    category: "ai",
    relatedTools: ["twinhunt", "smartsort", "compress", "ai-rename"],
    relatedBlogSlugs: [],
  },
  batchname: {
    id: "batchname",
    name: "Batch Rename",
    shortDesc: "Rename files with patterns",
    slug: "/tools/batchname",
    category: "organize",
    relatedTools: ["ai-rename", "twinhunt", "smartsort", "geosort"],
    relatedBlogSlugs: [],
  },
  filmlab: {
    id: "filmlab",
    name: "Film Lab",
    shortDesc: "Apply film-style color grading",
    slug: "/tools/filmlab",
    category: "edit",
    relatedTools: ["stampit", "compress", "webp", "croproatio"],
    relatedBlogSlugs: [],
  },
  stampit: {
    id: "stampit",
    name: "Watermark",
    shortDesc: "Add text or image watermarks",
    slug: "/tools/stampit",
    category: "edit",
    relatedTools: ["filmlab", "compress", "resizepack", "croproatio"],
    relatedBlogSlugs: [],
  },
  heic: {
    id: "heic",
    name: "HEIC Converter",
    shortDesc: "Convert iPhone HEIC to JPG/PNG",
    slug: "/tools/heic",
    category: "optimize",
    relatedTools: ["webp", "compress", "exif", "resizepack"],
    relatedBlogSlugs: [
      "best-image-format-for-web-2026",
    ],
  },
  exif: {
    id: "exif",
    name: "EXIF Viewer",
    shortDesc: "View and strip image metadata",
    slug: "/tools/exif",
    category: "organize",
    relatedTools: ["compress", "heic", "geosort", "ai-rename"],
    relatedBlogSlugs: [],
  },
  blogdrop: {
    id: "blogdrop",
    name: "BlogDrop",
    shortDesc: "Optimize images for blog posts",
    slug: "/tools/blogdrop",
    category: "content",
    relatedTools: ["compress", "webp", "resizepack", "alt-text"],
    relatedBlogSlugs: [
      "compress-images-without-losing-quality",
    ],
  },
  transcribe: {
    id: "transcribe",
    name: "Transcribe",
    shortDesc: "Extract text from images with OCR",
    slug: "/tools/transcribe",
    category: "ai",
    relatedTools: ["blogdrop", "ai-rename", "alt-text", "compress"],
    relatedBlogSlugs: [],
  },
  weblift: {
    id: "weblift",
    name: "WebLift",
    shortDesc: "Full web optimization pipeline",
    slug: "/tools/weblift",
    category: "optimize",
    relatedTools: ["compress", "webp", "resizepack", "ai-rename"],
    relatedBlogSlugs: [
      "compress-images-without-losing-quality",
      "best-image-format-for-web-2026",
    ],
  },
  smartsort: {
    id: "smartsort",
    name: "Smart Sort",
    shortDesc: "AI-powered photo organization",
    slug: "/tools/smartsort",
    category: "ai",
    relatedTools: ["ai-rename", "geosort", "cull", "batchname"],
    relatedBlogSlugs: [],
  },
  croproatio: {
    id: "croproatio",
    name: "Crop to Ratio",
    shortDesc: "Crop images to exact aspect ratios",
    slug: "/tools/croproatio",
    category: "edit",
    relatedTools: ["resizepack", "compress", "webp", "filmlab"],
    relatedBlogSlugs: [
      "resize-images-for-social-media",
    ],
  },
  "ai-organize": {
    id: "ai-organize",
    name: "AI Organize",
    shortDesc: "Auto-sort photos into folders",
    slug: "/tools/ai-organize",
    category: "ai",
    relatedTools: ["smartsort", "geosort", "batchname", "cull"],
    relatedBlogSlugs: [],
  },
  "pdf-to-image": {
    id: "pdf-to-image",
    name: "PDF to Image",
    shortDesc: "Convert PDF pages to images",
    slug: "/tools/pdf-to-image",
    category: "optimize",
    relatedTools: ["compress", "webp", "resizepack", "blogdrop"],
    relatedBlogSlugs: [],
  },
};

export function getRelatedTools(toolId: string, max = 4): ToolMeta[] {
  const tool = TOOLS[toolId];
  if (!tool) return [];
  return tool.relatedTools
    .map((id) => TOOLS[id])
    .filter(Boolean)
    .slice(0, max);
}
