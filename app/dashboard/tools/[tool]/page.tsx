"use client";

import React from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import HowToUse from "@/components/tools/HowToUse";
import {
  IconCompress,
  IconWebP,
  IconPngToJpg,
  IconWebpToJpg,
  IconWebpToPng,
  IconSvgToPng,
  IconAIRename,
  IconEXIF,
  IconFilmLab,
  IconStampIt,
  IconCropRatio,
  IconTwinHunt,
  IconGeoSort,
  IconTravelMap,
  IconResizePack,
  IconCull,
  IconHEIC,
  IconRemoveBg,
  IconUpscale,
  IconPassportPhoto,
  IconJpgToPdf,
  IconJxl,
} from "@/components/ui/ToolCard";

// ─── Lazy-load tool components to keep bundle lean ──────────────────────────

const CompressClient = dynamic(() => import("@/components/tools/CompressClient"));
const WebpClient = dynamic(() => import("@/components/tools/WebpClient"));
const PngToJpgClient = dynamic(() => import("@/components/tools/PngToJpgClient"));
const WebpToJpgClient = dynamic(() => import("@/components/tools/WebpToJpgClient"));
const WebpToPngClient = dynamic(() => import("@/components/tools/WebpToPngClient"));
const SvgToPngClient = dynamic(() => import("@/components/tools/SvgToPngClient"));
const AiRenameClient = dynamic(() => import("@/components/tools/AiRenameClient"));
const AltTextClient = dynamic(() => import("@/components/tools/AltTextClient"));
const ExifClient = dynamic(() => import("@/components/tools/ExifClient"));
const FilmLabClient = dynamic(() => import("@/components/tools/FilmLabClient"));
const StampItClient = dynamic(() => import("@/components/tools/StampItClient"));
const CropRatioClient = dynamic(() => import("@/components/tools/CropRatioClient"));
const TwinHuntClient = dynamic(() => import("@/components/tools/TwinHuntClient"));
const GeoSortClient = dynamic(() => import("@/components/tools/GeoSortClientWrapper"));
const TravelMapClient = dynamic(() => import("@/components/tools/TravelMapClientWrapper"));
const ResizePackClient = dynamic(() => import("@/components/tools/ResizePackClient"));
const CullClient = dynamic(() => import("@/components/tools/CullClientWrapper"));
const HeicClient = dynamic(() => import("@/components/tools/HeicClient"));
const PdfToImageClient = dynamic(() => import("@/components/tools/PdfToImageClient"));
const TranscribeClient = dynamic(() => import("@/components/tools/TranscribeClient"));
const ComboClient = dynamic(() => import("@/components/tools/ComboClient"));
const BatchNameClient = dynamic(() => import("@/components/tools/BatchNameClient"));
const SmartSortClient = dynamic(() => import("@/components/tools/SmartSortClient"));
const AiOrganizeClient = dynamic(() => import("@/components/tools/AiOrganizeClient"));
const RemoveBgClient = dynamic(() => import("@/components/tools/RemoveBgClient"));
const UpscaleClient = dynamic(() => import("@/components/tools/UpscaleClient"));
const PassportPhotoClient = dynamic(() => import("@/components/tools/PassportPhotoClient"));
const ImageToTextClient = dynamic(() => import("@/components/tools/ImageToTextClient"));
const JpgToPdfClient = dynamic(() => import("@/components/tools/JpgToPdfClient"));
const JxlConverterClient = dynamic(() => import("@/components/tools/JxlConverterClient"));

// ─── Tool component map ──────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TOOL_MAP: Record<string, React.ComponentType<any>> = {
  compress:    CompressClient,
  webp:        WebpClient,
  "png-to-jpg": PngToJpgClient,
  "webp-to-jpg": WebpToJpgClient,
  "webp-to-png": WebpToPngClient,
  "svg-to-png":  SvgToPngClient,
  "ai-rename": AiRenameClient,
  "alt-text":  AltTextClient,
  exif:        ExifClient,
  filmlab:     FilmLabClient,
  stampit:     StampItClient,
  croproatio:  CropRatioClient,
  twinhunt:    TwinHuntClient,
  geosort:     GeoSortClient,
  travelmap:   TravelMapClient,
  resizepack:  ResizePackClient,
  cull:        CullClient,
  heic:        HeicClient,
  "pdf-to-image": PdfToImageClient,
  transcribe:  TranscribeClient,
  batchname:   BatchNameClient,
  smartsort:   SmartSortClient,
  "ai-organize": AiOrganizeClient,
  "remove-bg":   RemoveBgClient,
  upscale:       UpscaleClient,
  "passport-photo": PassportPhotoClient,
  "image-to-text": ImageToTextClient,
  "jpg-to-pdf": JpgToPdfClient,
  jxl: JxlConverterClient,
};

// ─── Extra icons not in ToolCard.tsx ──────────────────────────────────────────

const IconSmartSort: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes ss-sort { 0%, 100% { transform: translateX(0); opacity: 0.5; } 50% { transform: translateX(4px); opacity: 1; } }
      .ss-a { animation: ss-sort 2s ease-in-out infinite; }
      .ss-b { animation: ss-sort 2s ease-in-out 0.3s infinite; }
    `}</style>
    <rect x="2" y="6" width="14" height="12" rx="2" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.25"/>
    <rect x="4" y="8" width="6" height="4" rx="1" fill={accent} fillOpacity="0.3"/>
    <rect x="2" y="22" width="14" height="12" rx="2" fill={accent} fillOpacity="0.15" stroke={accent} strokeWidth="1.25"/>
    <g className="ss-a"><path d="M20 12 L26 8" stroke={accent} strokeWidth="1.25" strokeLinecap="round"/></g>
    <g className="ss-b"><path d="M20 28 L26 22" stroke={accent} strokeWidth="1.25" strokeLinecap="round"/></g>
    <rect x="28" y="4" width="18" height="14" rx="2.5" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
    <text x="37" y="13" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">A</text>
    <rect x="28" y="22" width="18" height="14" rx="2.5" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.25"/>
    <text x="37" y="31" fontSize="5" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">B</text>
  </svg>
);

// ─── Tool icon + accent color map ────────────────────────────────────────────

const TOOL_ICONS: Record<string, { Icon: React.FC<{ accent: string }>; accent: string }> = {
  compress:    { Icon: IconCompress,   accent: "#6366F1" },
  webp:        { Icon: IconWebP,       accent: "#10B981" },
  "png-to-jpg": { Icon: IconPngToJpg, accent: "#6366F1" },
  "webp-to-jpg": { Icon: IconWebpToJpg, accent: "#10B981" },
  "webp-to-png": { Icon: IconWebpToPng, accent: "#8B5CF6" },
  "svg-to-png": { Icon: IconSvgToPng,  accent: "#F97316" },
  "ai-rename": { Icon: IconAIRename,   accent: "#8B5CF6" },
  "alt-text":  { Icon: IconAIRename,   accent: "#8B5CF6" },
  exif:        { Icon: IconEXIF,       accent: "#EF4444" },
  filmlab:     { Icon: IconFilmLab,    accent: "#F59E0B" },
  stampit:     { Icon: IconStampIt,    accent: "#06B6D4" },
  croproatio:  { Icon: IconCropRatio,  accent: "#EC4899" },
  twinhunt:    { Icon: IconTwinHunt,   accent: "#F97316" },
  geosort:     { Icon: IconGeoSort,    accent: "#22C55E" },
  travelmap:   { Icon: IconTravelMap,  accent: "#3B82F6" },
  resizepack:  { Icon: IconResizePack, accent: "#14B8A6" },
  cull:        { Icon: IconCull,       accent: "#F43F5E" },
  heic:        { Icon: IconHEIC,       accent: "#6366F1" },
  smartsort:   { Icon: IconSmartSort,   accent: "#22C55E" },
  weblift:     { Icon: IconWebP,       accent: "#3B82F6" },
  blogdrop:    { Icon: IconCompress,   accent: "#8B5CF6" },
  transcribe:  { Icon: IconEXIF,       accent: "#0891B2" },
  batchname:   { Icon: IconResizePack, accent: "#F59E0B" },
  "ai-organize": { Icon: IconAIRename, accent: "#8B5CF6" },
  "remove-bg":   { Icon: IconRemoveBg, accent: "#EC4899" },
  upscale:       { Icon: IconUpscale,  accent: "#8B5CF6" },
  "passport-photo": { Icon: IconPassportPhoto, accent: "#3B82F6" },
  "image-to-text": { Icon: IconAIRename, accent: "#F59E0B" },
  "jpg-to-pdf": { Icon: IconJpgToPdf, accent: "#DC2626" },
  jxl: { Icon: IconJxl, accent: "#F59E0B" },
};

// ─── Combo tool configs ──────────────────────────────────────────────────────

interface ComboConfig {
  toolName: string;
  steps: { id: string; label: string; enabled: boolean; isAi: boolean }[];
  requiresLogin: boolean;
  hasAiSteps: boolean;
}

const COMBO_CONFIGS: Record<string, ComboConfig> = {
  weblift: {
    toolName: "WebLift",
    steps: [
      { id: "compress", label: "Compress (80%)", enabled: true, isAi: false },
      { id: "webp", label: "Convert to WebP", enabled: true, isAi: false },
      { id: "ai-rename", label: "AI Rename (SEO)", enabled: true, isAi: true },
    ],
    requiresLogin: true,
    hasAiSteps: true,
  },
  blogdrop: {
    toolName: "BlogDrop",
    steps: [
      { id: "compress", label: "Compress (80%)", enabled: true, isAi: false },
      { id: "resize", label: "Resize (max 1200px)", enabled: true, isAi: false },
      { id: "webp", label: "Convert to WebP", enabled: true, isAi: false },
      { id: "ai-rename", label: "AI Rename (SEO blog)", enabled: true, isAi: true },
    ],
    requiresLogin: true,
    hasAiSteps: true,
  },
};

// ─── Tool data ───────────────────────────────────────────────────────────────

interface ToolData {
  label: string;
  tagline: string;
  steps: { title: string; desc: string }[];
  proTip: { text: string; linkLabel: string; linkHref: string };
}

const TOOL_DATA: Record<string, ToolData> = {
  compress: {
    label: "Compress",
    tagline: "Shrink JPG, PNG, WebP, GIF -- no quality loss.",
    steps: [
      { title: "Drop your images", desc: "Drag & drop JPG, PNG, WebP, or GIF files." },
      { title: "Adjust quality", desc: "Use the slider to set compression level." },
      { title: "Download", desc: "Get compressed files individually or as ZIP." },
    ],
    proTip: { text: "Try WebLift to compress + rename + convert in one step.", linkLabel: "Try WebLift", linkHref: "/dashboard/tools/weblift" },
  },
  webp: {
    label: "WebP Converter",
    tagline: "Convert any image to WebP. 25-34% smaller than JPEG.",
    steps: [
      { title: "Drop images", desc: "Add JPG, PNG, or GIF files." },
      { title: "Auto convert", desc: "Files convert to WebP automatically." },
      { title: "Download", desc: "Get WebP files ready for your site." },
    ],
    proTip: { text: "Combine with Compress for maximum file size reduction.", linkLabel: "Go to Compress", linkHref: "/dashboard/tools/compress" },
  },
  "png-to-jpg": {
    label: "PNG to JPG",
    tagline: "Convert PNG to JPG. 70-90% smaller for photos.",
    steps: [
      { title: "Drop PNG files", desc: "Add PNG images (up to 20 per batch on Free, 200 on Pro)." },
      { title: "Adjust settings", desc: "Set quality (50-100%) + background for transparent PNGs." },
      { title: "Download", desc: "Get JPG files individually or all as ZIP." },
    ],
    proTip: { text: "For files that need transparency, convert to WebP instead.", linkLabel: "Go to WebP", linkHref: "/dashboard/tools/webp" },
  },
  "webp-to-jpg": {
    label: "WebP to JPG",
    tagline: "Convert WebP to JPG for universal compatibility with older apps.",
    steps: [
      { title: "Drop WebP files", desc: "Add WebP images (up to 20 per batch on Free, 200 on Pro)." },
      { title: "Adjust settings", desc: "Set quality (50-100%) + background for transparent WebPs." },
      { title: "Download", desc: "Get JPG files individually or all as ZIP." },
    ],
    proTip: { text: "Keep modern web images in WebP — it's 25-35% smaller. Convert only for legacy compatibility.", linkLabel: "Convert to WebP", linkHref: "/dashboard/tools/webp" },
  },
  "webp-to-png": {
    label: "WebP to PNG",
    tagline: "Convert WebP to PNG — lossless, transparency preserved.",
    steps: [
      { title: "Drop WebP files", desc: "Add WebP images (up to 20 per batch on Free, 200 on Pro). Transparent WebPs welcome." },
      { title: "Automatic lossless conversion", desc: "PNG is lossless — no settings needed. Alpha channel preserved pixel-perfect." },
      { title: "Download", desc: "Get PNG files individually or all as ZIP. Ready for any app." },
    ],
    proTip: { text: "If you don't need transparency, WebP to JPG produces 70-80% smaller files.", linkLabel: "WebP to JPG", linkHref: "/dashboard/tools/webp-to-jpg" },
  },
  "svg-to-png": {
    label: "SVG to PNG",
    tagline: "Rasterize SVG vectors to PNG at any resolution.",
    steps: [
      { title: "Drop SVG files", desc: "Add .svg files (up to 20 per batch on Free, 200 on Pro)." },
      { title: "Choose output size & background", desc: "Pick 1x-4x scale or enter custom width up to 8192 px. Transparent, white, or black background." },
      { title: "Download", desc: "PNG files individually or all as ZIP. Alpha channel fully preserved." },
    ],
    proTip: { text: "For app icons, pick custom width 512 or 1024 px. Keep the SVG for web — it stays crisp at any zoom.", linkLabel: "Learn image formats", linkHref: "/blog/best-image-format-for-web-2026" },
  },
  "ai-rename": {
    label: "AI Rename",
    tagline: "AI generates SEO-optimized filenames in seconds.",
    steps: [
      { title: "Drop images", desc: "Add photos you want to rename." },
      { title: "AI analyzes", desc: "Gemini AI generates descriptive filenames." },
      { title: "Download renamed", desc: "Get SEO-ready filenames + alt text." },
    ],
    proTip: { text: "Unlimited renames on Pro. Free gets 10/day.", linkLabel: "Upgrade to Pro", linkHref: "/dashboard/upgrade" },
  },
  "alt-text": {
    label: "AI Alt Text",
    tagline: "Generate accessibility-compliant alt text with AI.",
    steps: [
      { title: "Drop images", desc: "Add photos that need alt text." },
      { title: "AI generates", desc: "Gemini creates descriptive alt text." },
      { title: "Copy or export", desc: "Copy all or download as CSV." },
    ],
    proTip: { text: "Perfect for WCAG compliance and SEO.", linkLabel: "See Pro features", linkHref: "/dashboard/upgrade" },
  },
  exif: {
    label: "EXIF Viewer",
    tagline: "Strip GPS, camera data and all metadata.",
    steps: [
      { title: "Drop photos", desc: "Add images with EXIF data." },
      { title: "View metadata", desc: "See all GPS, camera, and date info." },
      { title: "Download clean", desc: "Get files with metadata removed." },
    ],
    proTip: { text: "Always strip EXIF before sharing photos online for privacy.", linkLabel: "Learn more", linkHref: "/blog" },
  },
  filmlab: {
    label: "Film Filters",
    tagline: "14 analog film presets -- Kodak, Fuji, Ilford.",
    steps: [
      { title: "Drop photos", desc: "Add images to apply film looks." },
      { title: "Choose preset", desc: "Pick from 14 analog film styles." },
      { title: "Download", desc: "Get photos with the film look applied." },
    ],
    proTip: { text: "Try Kodak Gold for warm tones or Ilford HP5 for B&W.", linkLabel: "See all presets", linkHref: "/dashboard/tools/filmlab" },
  },
  stampit: {
    label: "Watermark",
    tagline: "Batch watermark with text or logo.",
    steps: [
      { title: "Drop photos", desc: "Add images to watermark." },
      { title: "Configure", desc: "Add text/logo, choose position." },
      { title: "Download", desc: "Get watermarked images." },
    ],
    proTip: { text: "Use tiled filigrana mode for maximum protection.", linkLabel: "Upgrade to Pro", linkHref: "/dashboard/upgrade" },
  },
  croproatio: {
    label: "Crop & Ratio",
    tagline: "Crop to exact ratios -- 1:1, 16:9, 4:3, A4.",
    steps: [
      { title: "Drop image", desc: "Add the photo to crop." },
      { title: "Select ratio", desc: "Choose 1:1, 16:9, 4:3, or custom." },
      { title: "Adjust & download", desc: "Position the crop and save." },
    ],
    proTip: { text: "Use 4:5 for Instagram portrait posts.", linkLabel: "Try ResizePack", linkHref: "/dashboard/tools/resizepack" },
  },
  twinhunt: {
    label: "Find Duplicates",
    tagline: "Find exact and near-duplicate photos.",
    steps: [
      { title: "Drop photos", desc: "Add a batch of similar photos." },
      { title: "Scan duplicates", desc: "Perceptual hashing finds matches." },
      { title: "Review & delete", desc: "Keep the best, remove copies." },
    ],
    proTip: { text: "Run this before Compress to avoid compressing duplicates.", linkLabel: "Go to Compress", linkHref: "/dashboard/tools/compress" },
  },
  geosort: {
    label: "Sort by Location",
    tagline: "Sort photos by country using GPS data.",
    steps: [
      { title: "Drop photos", desc: "Add photos with GPS EXIF data." },
      { title: "Auto-sort", desc: "Photos organized by country." },
      { title: "Download sorted", desc: "Get organized folders." },
    ],
    proTip: { text: "Works great after a multi-country trip.", linkLabel: "Try TravelMap", linkHref: "/dashboard/tools/travelmap" },
  },
  travelmap: {
    label: "Photo Map",
    tagline: "Generate an interactive map from your photos.",
    steps: [
      { title: "Drop photos", desc: "Add travel photos with GPS." },
      { title: "Map generates", desc: "See pins on an interactive map." },
      { title: "Explore", desc: "Click pins to see photos at each location." },
    ],
    proTip: { text: "Combine with GeoSort to organize and visualize your trips.", linkLabel: "Try GeoSort", linkHref: "/dashboard/tools/geosort" },
  },
  resizepack: {
    label: "Batch Resize",
    tagline: "Resize for Instagram, Twitter, LinkedIn with one click.",
    steps: [
      { title: "Drop photos", desc: "Add images to resize." },
      { title: "Select platform", desc: "Choose social media preset." },
      { title: "Download", desc: "Get perfectly sized images." },
    ],
    proTip: { text: "Use the Instagram preset for Stories (1080x1920).", linkLabel: "See all presets", linkHref: "/dashboard/tools/resizepack" },
  },
  cull: {
    label: "Photo Cull",
    tagline: "Rate and cull a shoot in minutes.",
    steps: [
      { title: "Drop shoot", desc: "Add all photos from a session." },
      { title: "Rate with stars", desc: "Use keyboard shortcuts to rate." },
      { title: "Export keepers", desc: "Download only the best shots." },
    ],
    proTip: { text: "Use keyboard shortcuts: 1-5 for stars, X to reject.", linkLabel: "See Pro features", linkHref: "/dashboard/upgrade" },
  },
  "pdf-to-image": {
    label: "PDF to Image",
    tagline: "Convert each PDF page to JPG, PNG, or WebP.",
    steps: [
      { title: "Drop a PDF", desc: "Add a PDF file to convert." },
      { title: "Choose format and resolution", desc: "Select JPG, PNG, or WebP, and 1x/2x/3x scale." },
      { title: "Download images", desc: "Save each page individually or download all as ZIP." },
    ],
    proTip: { text: "After converting, compress your JPG or PNG images for web use.", linkLabel: "Compress images", linkHref: "/dashboard/tools/compress" },
  },
  heic: {
    label: "HEIC Converter",
    tagline: "Convert iPhone HEIC photos to JPG or WebP.",
    steps: [
      { title: "Drop HEIC files", desc: "Add iPhone photos." },
      { title: "Choose format", desc: "Select JPG or WebP output." },
      { title: "Download", desc: "Get converted files." },
    ],
    proTip: { text: "Choose WebP for 25% smaller files than JPG.", linkLabel: "Try WebP converter", linkHref: "/dashboard/tools/webp" },
  },
  transcribe: {
    label: "Transcribe",
    tagline: "AI transcription with timestamps. SRT subtitles in seconds.",
    steps: [
      { title: "Drop your video or audio", desc: "Add an MP4, WebM, MOV, or MP3 file." },
      { title: "AI transcribes", desc: "Gemini Flash generates text with timestamps." },
      { title: "Export SRT or TXT", desc: "Download subtitles or plain transcription." },
    ],
    proTip: { text: "Unlimited AI transcriptions on Pro. Free gets 10/day.", linkLabel: "Upgrade to Pro", linkHref: "/dashboard/upgrade" },
  },
  // Combo tools
  weblift: {
    label: "Web Optimize",
    tagline: "Compress, convert to WebP, and AI-rename in one click.",
    steps: [
      { title: "Drop your images", desc: "Drag and drop images onto the upload area." },
      { title: "Toggle steps", desc: "Enable or disable individual pipeline steps." },
      { title: "Download optimized", desc: "Download each file or grab everything as ZIP." },
    ],
    proTip: { text: "Disable AI Rename to use without login.", linkLabel: "Try Compress", linkHref: "/dashboard/tools/compress" },
  },
  blogdrop: {
    label: "Blog Ready",
    tagline: "Blog-ready images in one drop.",
    steps: [
      { title: "Drop blog images", desc: "Add photos destined for your blog posts." },
      { title: "Toggle steps", desc: "Enable or disable individual pipeline steps." },
      { title: "Download and publish", desc: "Upload directly to WordPress, Ghost, or any CMS." },
    ],
    proTip: { text: "Disable AI Rename to use without login.", linkLabel: "Try AI Rename", linkHref: "/dashboard/tools/ai-rename" },
  },
  batchname: {
    label: "Batch Rename",
    tagline: "Rename files with a custom pattern. No AI needed.",
    steps: [
      { title: "Drop your files", desc: "Add any files you want to rename." },
      { title: "Set your pattern", desc: "Use {001}, {date}, or {original} tokens." },
      { title: "Download renamed", desc: "Get all files with new names." },
    ],
    proTip: { text: "Use {001} for auto-incrementing numbers.", linkLabel: "Try AI Rename", linkHref: "/dashboard/tools/ai-rename" },
  },
  smartsort: {
    label: "AI Photo Sort",
    tagline: "AI analyzes images and sorts them into categories.",
    steps: [
      { title: "Drop your images", desc: "Add photos, screenshots, or documents." },
      { title: "AI categorizes", desc: "Gemini AI assigns a category to each file." },
      { title: "Download sorted", desc: "Get ZIP with folder structure by category." },
    ],
    proTip: { text: "Perfect for organizing mixed photo collections.", linkLabel: "Try GeoSort", linkHref: "/dashboard/tools/geosort" },
  },
  "ai-organize": {
    label: "AI Organize",
    tagline: "Sort, dedupe & rename hundreds of photos in one click.",
    steps: [
      { title: "Drop your photos", desc: "Drag & drop up to 500 photos at once." },
      { title: "AI analyzes everything", desc: "Photos are categorized, duplicates found, SEO names generated." },
      { title: "Review & download", desc: "Browse by category, remove dupes, download organized ZIP." },
    ],
    proTip: { text: "Works best with 50+ photos. The more you add, the smarter the sorting.", linkLabel: "Upgrade to Pro", linkHref: "/dashboard/upgrade" },
  },
  "remove-bg": {
    label: "Clean Background",
    tagline: "Remove image background instantly with AI.",
    steps: [
      { title: "Drop your image", desc: "Add a photo with any background." },
      { title: "AI removes background", desc: "Background is removed automatically in your browser." },
      { title: "Download", desc: "Get a transparent PNG or white-background image." },
    ],
    proTip: { text: "Works great for product photos and profile pictures.", linkLabel: "Try Passport Photo", linkHref: "/dashboard/tools/passport-photo" },
  },
  upscale: {
    label: "Enhance Resolution",
    tagline: "AI upscale images 2x or 4x without losing quality.",
    steps: [
      { title: "Drop your image", desc: "Add a low-resolution photo." },
      { title: "Choose scale", desc: "Select 2x or 4x upscaling." },
      { title: "Download enhanced", desc: "Get a higher-resolution image." },
    ],
    proTip: { text: "Best results with photos under 1500px. Pro allows larger images.", linkLabel: "Upgrade to Pro", linkHref: "/dashboard/upgrade" },
  },
  "passport-photo": {
    label: "Passport Photo",
    tagline: "AI passport & visa photo maker for 140+ countries.",
    steps: [
      { title: "Drop your photo", desc: "Upload any photo of yourself." },
      { title: "Select country", desc: "Choose from 140+ country presets." },
      { title: "Download", desc: "Get a print-ready passport photo with white background." },
    ],
    proTip: { text: "Take the photo against any background — AI removes it automatically.", linkLabel: "View all countries", linkHref: "/passport-photo/us" },
  },
  "image-to-text": {
    label: "Image to Text",
    tagline: "Extract text from images with AI-powered OCR.",
    steps: [
      { title: "Drop your image", desc: "Add a photo, screenshot, or document scan." },
      { title: "AI extracts text", desc: "Gemini AI reads and extracts all text." },
      { title: "Copy or download", desc: "Copy text to clipboard or download as TXT." },
    ],
    proTip: { text: "Works with 50+ languages including handwritten text.", linkLabel: "Try AI Rename", linkHref: "/dashboard/tools/ai-rename" },
  },
  "jpg-to-pdf": {
    label: "JPG to PDF",
    tagline: "Merge multiple images into a single PDF document.",
    steps: [
      { title: "Drop images", desc: "Add JPG, PNG, or WebP files." },
      { title: "Reorder & configure", desc: "Drag to reorder. Pick page size." },
      { title: "Download PDF", desc: "Get a single merged PDF file." },
    ],
    proTip: { text: "Use Compress first to reduce image sizes before creating the PDF.", linkLabel: "Go to Compress", linkHref: "/dashboard/tools/compress" },
  },
  jxl: {
    label: "JXL Converter",
    tagline: "Convert JPEG XL to JPG/PNG/WebP or vice versa.",
    steps: [
      { title: "Choose direction", desc: "JXL to Image or Image to JXL." },
      { title: "Drop files", desc: "Add .jxl files or standard images." },
      { title: "Convert & download", desc: "Get converted files individually or as ZIP." },
    ],
    proTip: { text: "JPEG XL offers 30-60% better compression than JPEG.", linkLabel: "Try WebP Converter", linkHref: "/dashboard/tools/webp" },
  },
};

// ─── Combo wrapper component ─────────────────────────────────────────────────

function ComboWrapper({ config }: { config: ComboConfig }) {
  return (
    <ComboClient
      toolName={config.toolName}
      steps={config.steps}
      requiresLogin={config.requiresLogin}
      hasAiSteps={config.hasAiSteps}
    />
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DashboardToolPage() {
  const params = useParams();
  const slug = params.tool as string;

  // Check if it's a combo tool
  const comboConfig = COMBO_CONFIGS[slug];
  const ToolComponent = TOOL_MAP[slug];
  const data = TOOL_DATA[slug];

  if (!data || (!ToolComponent && !comboConfig)) {
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
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-xs text-[#737373] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-4"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            Back to tools
          </Link>
          {TOOL_ICONS[slug] && (
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `${TOOL_ICONS[slug].accent}14` }}
            >
              {React.createElement(TOOL_ICONS[slug].Icon, { accent: TOOL_ICONS[slug].accent })}
            </div>
          )}
          <h1 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">
            {data.label}
          </h1>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
            {data.tagline}
          </p>
        </div>
      </div>

      {/* Tool component */}
      {comboConfig ? (
        <ComboWrapper config={comboConfig} />
      ) : ToolComponent ? (
        <ToolComponent />
      ) : null}

      {/* How to use */}
      <HowToUse toolName={data.label} steps={data.steps} proTip={data.proTip} />
    </div>
  );
}
