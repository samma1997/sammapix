"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Sparkles,
  Image,
  FileImage,
  Globe,
  Scissors,
  Camera,
  ScanEye,
  MapPin,
  Map,
  Copy,
  Stamp,
  Tv,
  Captions,
  Search,
  Eraser,
  Maximize2,
  UserCheck,
  ScanText,
  User,
  Crown,
  Menu,
  X,
  Gift,
  Coins,
  FileText,
  Film,
  Layers,
  Zap,
  Settings,
  HelpCircle,
  LogOut,
  ChevronUp,
  ChevronDown,
  FolderArchive,
  Type,
  LayoutGrid,
  PenLine,
  Crop,
  ScanLine,
  Hash,
  Video,
  RefreshCw,
  Code,
  Shield,
  FolderCog,
  Lock,
  Key,
  Link as LinkIcon,
  Archive,
  Scissors as ScissorsIcon,
  VolumeX,
  Music,
  Maximize,
  Mic,
  QrCode,
  Barcode,
  EyeOff,
  SortAsc,
  FlipHorizontal,
  Square,
  Circle,
  AlignLeft,
  Binary,
  FileOutput,
  FileMinus,
  FileX,
  Grid,
  Split,
  Calculator,
  Workflow,
} from "lucide-react";
import { ADMIN_EMAILS } from "@/lib/constants";
import SidebarReferralBadge from "@/components/referral/SidebarReferralBadge";
import type { Persona } from "@/types/persona";

const LS_PERSONA_KEY = "sammapix-persona";

// ─── Persona -> tool mappings (same as DashboardHome) ────────────────────────

const PERSONA_TOOL_MAP: Record<Persona, string[]> = {
  photographer: ["cull", "compress", "ai-rename", "filmlab", "geosort", "travelmap", "exif", "weblift", "smartsort", "remove-bg", "upscale"],
  blogger: ["compress", "ai-rename", "alt-text", "webp", "blogdrop", "resizepack", "batchname", "image-to-text", "upscale", "unrar", "open-7z", "minecraft-extractor", "apk-extractor", "ipa-extractor", "iso-extractor", "ai-label", "ai-label-video", "avif-to-jpg", "convert-to-avif"],
  ecommerce: ["compress", "ai-rename", "resizepack", "stampit", "webp", "batchname", "remove-bg", "passport-photo"],
  developer: ["compress", "webp", "png-to-jpg", "avif-to-jpg", "convert-to-avif", "svg-to-png", "ico-generator", "resizepack", "exif", "croproatio", "batchname", "image-to-text", "upscale", "unrar", "open-7z", "minecraft-extractor", "apk-extractor", "ipa-extractor", "iso-extractor", "extract-jar", "open-gz", "open-xz", "rotate-image", "flip-image", "add-border", "round-image", "add-text-to-image", "image-to-base64", "barcode-generator", "qr-code-reader", "barcode-reader", "hash-generator", "url-encode-decode", "password-generator", "json-formatter", "3d-viewer"],
  social: ["compress", "resizepack", "croproatio", "filmlab", "stampit", "gif-to-mp4", "color-picker", "batchname", "remove-bg", "upscale", "rotate-image", "flip-image", "add-border", "round-image", "add-text-to-image", "collage-maker", "ai-label", "ai-label-video"],
};

// ─── Tool definitions ─────────────────────────────────────────────────────────

interface SidebarTool {
  name: string;
  slug: string;
  href: string;
  icon: React.ReactNode;
}

const ALL_SIDEBAR_TOOLS: SidebarTool[] = [
  // ── Image ──────────────────────────────────────────────────────────────────
  { name: "Compress", slug: "compress", href: "/dashboard/tools/compress", icon: <Image className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Batch Resize", slug: "resizepack", href: "/dashboard/tools/resizepack", icon: <Scissors className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Crop & Ratio", slug: "croproatio", href: "/dashboard/tools/croproatio", icon: <Crop className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Rotate Image", slug: "rotate-image", href: "/dashboard/tools/rotate-image", icon: <RefreshCw className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Flip Image", slug: "flip-image", href: "/dashboard/tools/flip-image", icon: <FlipHorizontal className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Add Border", slug: "add-border", href: "/dashboard/tools/add-border", icon: <Square className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Round Image", slug: "round-image", href: "/dashboard/tools/round-image", icon: <Circle className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Add Text to Image", slug: "add-text-to-image", href: "/dashboard/tools/add-text-to-image", icon: <Type className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Photo Collage", slug: "collage-maker", href: "/dashboard/tools/collage-maker", icon: <LayoutGrid className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Remove Background", slug: "remove-bg", href: "/dashboard/tools/remove-bg", icon: <Eraser className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Enhance Resolution", slug: "upscale", href: "/dashboard/tools/upscale", icon: <Maximize2 className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Passport Photo", slug: "passport-photo", href: "/dashboard/tools/passport-photo", icon: <UserCheck className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Instagram Grid Splitter", slug: "instagram-grid-splitter", href: "/dashboard/tools/instagram-grid-splitter", icon: <Grid className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Blur & Censor", slug: "blur-censor", href: "/dashboard/tools/blur-censor", icon: <EyeOff className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Film Filters", slug: "filmlab", href: "/dashboard/tools/filmlab", icon: <Film className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Watermark", slug: "stampit", href: "/dashboard/tools/stampit", icon: <Stamp className="h-4 w-4" strokeWidth={1.5} /> },

  // ── Convert ────────────────────────────────────────────────────────────────
  { name: "HEIC Converter", slug: "heic", href: "/dashboard/tools/heic", icon: <Tv className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "WebP Converter", slug: "webp", href: "/dashboard/tools/webp", icon: <FileImage className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "PNG to JPG", slug: "png-to-jpg", href: "/dashboard/tools/png-to-jpg", icon: <FileImage className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "WebP to JPG", slug: "webp-to-jpg", href: "/dashboard/tools/webp-to-jpg", icon: <FileImage className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "WebP to PNG", slug: "webp-to-png", href: "/dashboard/tools/webp-to-png", icon: <Layers className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "AVIF to JPG", slug: "avif-to-jpg", href: "/dashboard/tools/avif-to-jpg", icon: <FileImage className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Convert to AVIF", slug: "convert-to-avif", href: "/dashboard/tools/convert-to-avif", icon: <FileImage className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "SVG to PNG", slug: "svg-to-png", href: "/dashboard/tools/svg-to-png", icon: <FileImage className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "JXL Converter", slug: "jxl", href: "/dashboard/tools/jxl", icon: <Sparkles className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "JPG to PDF", slug: "jpg-to-pdf", href: "/dashboard/tools/jpg-to-pdf", icon: <FileOutput className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "GIF to MP4", slug: "gif-to-mp4", href: "/dashboard/tools/gif-to-mp4", icon: <Video className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Image to Base64", slug: "image-to-base64", href: "/dashboard/tools/image-to-base64", icon: <Binary className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "RAW Converter", slug: "raw-converter", href: "/dashboard/tools/raw-converter", icon: <Camera className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "PDF to Image", slug: "pdf-to-image", href: "/dashboard/tools/pdf-to-image", icon: <FileImage className="h-4 w-4" strokeWidth={1.5} /> },

  // ── PDF ────────────────────────────────────────────────────────────────────
  { name: "Merge PDF", slug: "pdf-merge", href: "/dashboard/tools/pdf-merge", icon: <FileText className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Split PDF", slug: "pdf-split", href: "/dashboard/tools/pdf-split", icon: <Split className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Compress PDF", slug: "pdf-compress", href: "/dashboard/tools/pdf-compress", icon: <FileText className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Rotate PDF", slug: "pdf-rotate", href: "/dashboard/tools/pdf-rotate", icon: <RefreshCw className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Unlock PDF", slug: "pdf-unlock", href: "/dashboard/tools/pdf-unlock", icon: <Lock className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Protect PDF", slug: "pdf-protect", href: "/dashboard/tools/pdf-protect", icon: <Key className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "PDF Page Numbers", slug: "pdf-page-numbers", href: "/dashboard/tools/pdf-page-numbers", icon: <FileText className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Delete PDF Pages", slug: "remove-pdf-pages", href: "/dashboard/tools/remove-pdf-pages", icon: <FileMinus className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Watermark PDF", slug: "pdf-watermark", href: "/dashboard/tools/pdf-watermark", icon: <Stamp className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Sign PDF", slug: "pdf-sign", href: "/dashboard/tools/pdf-sign", icon: <PenLine className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Organize PDF Pages", slug: "pdf-organize", href: "/dashboard/tools/pdf-organize", icon: <AlignLeft className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Crop PDF", slug: "crop-pdf", href: "/dashboard/tools/crop-pdf", icon: <Crop className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Flatten PDF", slug: "flatten-pdf", href: "/dashboard/tools/flatten-pdf", icon: <FileText className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "TXT to PDF", slug: "txt-to-pdf", href: "/dashboard/tools/txt-to-pdf", icon: <FileOutput className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Word to PDF", slug: "word-to-pdf", href: "/dashboard/tools/word-to-pdf", icon: <FileOutput className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Redact PDF", slug: "redact-pdf", href: "/dashboard/tools/redact-pdf", icon: <FileX className="h-4 w-4" strokeWidth={1.5} /> },

  // ── Video ──────────────────────────────────────────────────────────────────
  { name: "Compress Video", slug: "compress-video", href: "/dashboard/tools/compress-video", icon: <Video className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Convert Video", slug: "convert-video", href: "/dashboard/tools/convert-video", icon: <RefreshCw className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Trim Video", slug: "trim-video", href: "/dashboard/tools/trim-video", icon: <ScissorsIcon className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Mute Video", slug: "mute-video", href: "/dashboard/tools/mute-video", icon: <VolumeX className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Resize Video", slug: "resize-video", href: "/dashboard/tools/resize-video", icon: <Maximize className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Video to GIF", slug: "video-to-gif", href: "/dashboard/tools/video-to-gif", icon: <Film className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Extract Audio", slug: "extract-audio", href: "/dashboard/tools/extract-audio", icon: <Music className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Transcribe", slug: "transcribe", href: "/dashboard/tools/transcribe", icon: <Captions className="h-4 w-4" strokeWidth={1.5} /> },

  // ── Archive ────────────────────────────────────────────────────────────────
  { name: "Open RAR Online", slug: "unrar", href: "/dashboard/tools/unrar", icon: <FolderArchive className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Open 7z Online", slug: "open-7z", href: "/dashboard/tools/open-7z", icon: <FolderArchive className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "CAB File Opener", slug: "open-cab", href: "/dashboard/tools/open-cab", icon: <FolderArchive className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "RAR to ZIP", slug: "rar-to-zip", href: "/dashboard/tools/rar-to-zip", icon: <Archive className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "7Z to ZIP", slug: "7z-to-zip", href: "/dashboard/tools/7z-to-zip", icon: <Archive className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "TAR to ZIP", slug: "tar-to-zip", href: "/dashboard/tools/tar-to-zip", icon: <Archive className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Open tar.gz", slug: "tar-gz", href: "/dashboard/tools/tar-gz", icon: <FolderArchive className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Create ZIP", slug: "zip-creator", href: "/dashboard/tools/zip-creator", icon: <Archive className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "ISO Extractor", slug: "iso-extractor", href: "/dashboard/tools/iso-extractor", icon: <FolderArchive className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "APK Extractor", slug: "apk-extractor", href: "/dashboard/tools/apk-extractor", icon: <FolderArchive className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "IPA Extractor", slug: "ipa-extractor", href: "/dashboard/tools/ipa-extractor", icon: <FolderArchive className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Minecraft Extractor", slug: "minecraft-extractor", href: "/dashboard/tools/minecraft-extractor", icon: <FolderArchive className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "JAR File Extractor", slug: "extract-jar", href: "/dashboard/tools/extract-jar", icon: <FolderArchive className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "GZ File Opener", slug: "open-gz", href: "/dashboard/tools/open-gz", icon: <FolderArchive className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "XZ File Opener", slug: "open-xz", href: "/dashboard/tools/open-xz", icon: <FolderArchive className="h-4 w-4" strokeWidth={1.5} /> },

  // ── Generate & Dev ─────────────────────────────────────────────────────────
  { name: "QR Code Generator", slug: "qr-code-generator", href: "/dashboard/tools/qr-code-generator", icon: <QrCode className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "QR Code Reader", slug: "qr-code-reader", href: "/dashboard/tools/qr-code-reader", icon: <ScanLine className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Barcode Generator", slug: "barcode-generator", href: "/dashboard/tools/barcode-generator", icon: <Barcode className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Barcode Reader", slug: "barcode-reader", href: "/dashboard/tools/barcode-reader", icon: <ScanLine className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Hash Generator", slug: "hash-generator", href: "/dashboard/tools/hash-generator", icon: <Hash className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Password Generator", slug: "password-generator", href: "/dashboard/tools/password-generator", icon: <Key className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "URL Encoder / Decoder", slug: "url-encode-decode", href: "/dashboard/tools/url-encode-decode", icon: <LinkIcon className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Favicon Generator", slug: "ico-generator", href: "/dashboard/tools/ico-generator", icon: <Zap className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Color Picker", slug: "color-picker", href: "/dashboard/tools/color-picker", icon: <Code className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "JSON Formatter", slug: "json-formatter", href: "/dashboard/tools/json-formatter", icon: <Code className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "3D Model Viewer", slug: "3d-viewer", href: "/dashboard/tools/3d-viewer", icon: <Layers className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Aspect Ratio Calculator", slug: "aspect-ratio", href: "/dashboard/tools/aspect-ratio", icon: <Calculator className="h-4 w-4" strokeWidth={1.5} /> },

  // ── AI ─────────────────────────────────────────────────────────────────────
  { name: "AI Rename", slug: "ai-rename", href: "/dashboard/tools/ai-rename", icon: <Zap className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "AI Alt Text", slug: "alt-text", href: "/dashboard/tools/alt-text", icon: <Globe className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "AI Photo Sort", slug: "smartsort", href: "/dashboard/tools/smartsort", icon: <SortAsc className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "AI Organize", slug: "ai-organize", href: "/dashboard/tools/ai-organize", icon: <Sparkles className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Image to Text", slug: "image-to-text", href: "/dashboard/tools/image-to-text", icon: <ScanText className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Made with AI Label", slug: "ai-label", href: "/dashboard/tools/ai-label", icon: <Sparkles className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "AI Label for Video", slug: "ai-label-video", href: "/dashboard/tools/ai-label-video", icon: <Mic className="h-4 w-4" strokeWidth={1.5} /> },

  // ── Organize & Privacy ─────────────────────────────────────────────────────
  { name: "EXIF Viewer", slug: "exif", href: "/dashboard/tools/exif", icon: <ScanEye className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Find Duplicates", slug: "twinhunt", href: "/dashboard/tools/twinhunt", icon: <Search className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Sort by Location", slug: "geosort", href: "/dashboard/tools/geosort", icon: <MapPin className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Photo Map", slug: "travelmap", href: "/dashboard/tools/travelmap", icon: <Map className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Cull", slug: "cull", href: "/dashboard/tools/cull", icon: <Camera className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Batch Rename", slug: "batchname", href: "/dashboard/tools/batchname", icon: <FileText className="h-4 w-4" strokeWidth={1.5} /> },

  // ── Multi-step (kept in ALL_SIDEBAR_TOOLS for getToolBySlug lookups) ────────
  { name: "Web Optimize", slug: "weblift", href: "/dashboard/tools/weblift", icon: <Layers className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Blog Ready", slug: "blogdrop", href: "/dashboard/tools/blogdrop", icon: <FileText className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Workflow Builder", slug: "workflow-builder", href: "/dashboard/workflow", icon: <Workflow className="h-4 w-4" strokeWidth={1.5} /> },
  { name: "Node Studio", slug: "node-studio", href: "/dashboard/studio", icon: <Workflow className="h-4 w-4" strokeWidth={1.5} /> },
];

// ─── Category definitions ─────────────────────────────────────────────────────

interface ToolCategory {
  label: string;
  icon: React.ReactNode;
  slugs: string[];
}

const TOOL_CATEGORIES: ToolCategory[] = [
  {
    label: "Image",
    icon: <Image className="h-3.5 w-3.5" strokeWidth={1.5} />,
    slugs: ["compress", "resizepack", "croproatio", "rotate-image", "flip-image", "add-border", "round-image", "add-text-to-image", "collage-maker", "remove-bg", "upscale", "passport-photo", "instagram-grid-splitter", "blur-censor", "filmlab", "stampit"],
  },
  {
    label: "Convert",
    icon: <RefreshCw className="h-3.5 w-3.5" strokeWidth={1.5} />,
    slugs: ["heic", "webp", "png-to-jpg", "webp-to-jpg", "webp-to-png", "avif-to-jpg", "convert-to-avif", "svg-to-png", "jxl", "jpg-to-pdf", "gif-to-mp4", "image-to-base64", "raw-converter", "pdf-to-image"],
  },
  {
    label: "PDF",
    icon: <FileText className="h-3.5 w-3.5" strokeWidth={1.5} />,
    slugs: ["pdf-merge", "pdf-split", "pdf-compress", "pdf-rotate", "pdf-unlock", "pdf-protect", "pdf-page-numbers", "remove-pdf-pages", "pdf-watermark", "pdf-sign", "pdf-organize", "crop-pdf", "flatten-pdf", "txt-to-pdf", "word-to-pdf", "redact-pdf"],
  },
  {
    label: "Video",
    icon: <Video className="h-3.5 w-3.5" strokeWidth={1.5} />,
    slugs: ["compress-video", "convert-video", "trim-video", "mute-video", "resize-video", "video-to-gif", "extract-audio", "transcribe", "ai-label-video"],
  },
  {
    label: "Archive",
    icon: <FolderArchive className="h-3.5 w-3.5" strokeWidth={1.5} />,
    slugs: ["unrar", "open-7z", "open-cab", "rar-to-zip", "7z-to-zip", "tar-to-zip", "tar-gz", "zip-creator", "iso-extractor", "apk-extractor", "ipa-extractor", "minecraft-extractor", "extract-jar", "open-gz", "open-xz"],
  },
  {
    label: "Generate & Dev",
    icon: <Code className="h-3.5 w-3.5" strokeWidth={1.5} />,
    slugs: ["qr-code-generator", "qr-code-reader", "barcode-generator", "barcode-reader", "hash-generator", "password-generator", "url-encode-decode", "ico-generator", "color-picker", "json-formatter", "3d-viewer", "aspect-ratio"],
  },
  {
    label: "AI",
    icon: <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />,
    slugs: ["ai-rename", "alt-text", "smartsort", "ai-organize", "image-to-text", "ai-label", "ai-label-video"],
  },
  {
    label: "Organize & Privacy",
    icon: <Shield className="h-3.5 w-3.5" strokeWidth={1.5} />,
    slugs: ["exif", "twinhunt", "geosort", "travelmap", "cull", "batchname"],
  },
];

// Niche categories tucked under a collapsed "More" group to keep the sidebar
// focused on the core image/PDF workflow. All tools stay reachable (search + URL).
const MORE_CATEGORY_LABELS = new Set(["Archive", "Generate & Dev"]);

// Tools that use AI (show badge)
const AI_TOOL_SLUGS = new Set(["ai-rename", "alt-text", "transcribe", "smartsort", "ai-organize", "image-to-text", "passport-photo"]);

function getToolBySlug(slug: string): SidebarTool | undefined {
  return ALL_SIDEBAR_TOOLS.find((t) => t.slug === slug);
}

// ─── Props ───────────────────────────────────────────────────────────────────

interface DashboardSidebarProps {
  userName: string | null;
  userEmail: string | null;
  userImage: string | null;
  userPlan: string;
}

export default function DashboardSidebar({
  userName,
  userEmail,
  userImage,
  userPlan,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isPro = userPlan === "pro";
  const [mobileOpen, setMobileOpen] = useState(false);

  /** Navigate and close mobile sidebar — ensures navigation completes on mobile */
  const mobileNav = useCallback((href: string) => {
    setMobileOpen(false);
    setProfileMenuOpen(false);
    router.push(href);
  }, [router]);

  const [persona, setPersona] = useState<Persona | null>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Accordion state: set of open category labels
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  // Whether the collapsed "More" group (niche categories) is expanded
  const [showMore, setShowMore] = useState(false);

  // Search query
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCategory = useCallback((label: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }, []);

  // Read persona from localStorage and listen for changes
  const readPersona = useCallback(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(LS_PERSONA_KEY);
    if (stored && stored !== "skipped") {
      setPersona(stored as Persona);
    } else {
      setPersona(null);
    }
  }, []);

  useEffect(() => {
    readPersona();
    const handler = () => readPersona();
    window.addEventListener("sammapix-persona-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("sammapix-persona-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, [readPersona]);

  // Close profile menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    if (profileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [profileMenuOpen]);

  // "For You" tools based on persona — MAX 3
  const forYouTools: SidebarTool[] = persona
    ? (PERSONA_TOOL_MAP[persona] ?? [])
        .slice(0, 3)
        .map((slug) => getToolBySlug(slug))
        .filter(Boolean) as SidebarTool[]
    : [];

  // Search results — all tools matching query, flat, excluding multi-step
  const multiStepSlugs = new Set(["node-studio"]);
  const searchableTools = ALL_SIDEBAR_TOOLS.filter((t) => !multiStepSlugs.has(t.slug));
  const trimmedQuery = searchQuery.trim().toLowerCase();
  const searchResults = trimmedQuery
    ? searchableTools.filter(
        (t) =>
          t.name.toLowerCase().includes(trimmedQuery) ||
          t.slug.toLowerCase().includes(trimmedQuery)
      )
    : [];
  const isSearching = trimmedQuery.length > 0;

  const linkClasses = (href: string, prefix?: boolean) => [
    "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors duration-150",
    (prefix ? pathname.startsWith(href) : pathname === href)
      ? "bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#171717] dark:text-[#E5E5E5] font-medium"
      : "text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] hover:text-[#171717] dark:hover:text-[#E5E5E5]",
  ].join(" ");

  // Render one collapsible tool category (used for both core and "More" groups)
  const renderCategory = (category: ToolCategory) => {
    const isOpen = openCategories.has(category.label);
    const tools = category.slugs
      .map((s) => getToolBySlug(s))
      .filter(Boolean) as SidebarTool[];
    return (
      <div key={category.label}>
        <button
          onClick={() => toggleCategory(category.label)}
          className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-md text-sm transition-colors duration-150 text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
        >
          <span className="shrink-0">{category.icon}</span>
          <span className="flex-1 text-left font-medium">{category.label}</span>
          <span className="text-[9px] font-medium text-[#A3A3A3] dark:text-[#525252] mr-1">
            {tools.length}
          </span>
          {isOpen ? (
            <ChevronUp className="h-3 w-3 shrink-0 text-[#A3A3A3]" strokeWidth={2} />
          ) : (
            <ChevronDown className="h-3 w-3 shrink-0 text-[#A3A3A3]" strokeWidth={2} />
          )}
        </button>
        {isOpen && (
          <div className="ml-3 border-l border-[#E5E5E5] dark:border-[#2A2A2A] pl-1 mb-0.5">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                onClick={() => setMobileOpen(false)}
                className={linkClasses(tool.href)}
              >
                <span className="shrink-0">{tool.icon}</span>
                {tool.name}
                {AI_TOOL_SLUGS.has(tool.slug) && (
                  <span className="ml-auto text-[8px] font-bold uppercase tracking-wider text-[#6366F1] bg-[#6366F1]/10 px-1.5 py-0.5 rounded">AI</span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-[#E5E5E5] dark:border-[#2A2A2A] shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 group select-none"
          aria-label="SammaPix -- dashboard"
          onClick={() => setMobileOpen(false)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="[--sp-fill:#171717] dark:[--sp-fill:#E5E5E5]"
          >
            <rect x="2" y="2" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="6" y="2" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="10" y="2" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="14" y="2" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="2" y="6" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="14" y="6" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="2" y="10" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="14" y="10" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="2" y="14" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="6" y="14" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="10" y="14" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="14" y="14" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="6" y="6" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="10" y="6" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="6" y="10" width="3" height="3" fill="var(--sp-fill,#171717)" />
            <rect x="10" y="10" width="3" height="3" fill="var(--sp-fill,#171717)" />
          </svg>
          <span className="font-semibold text-[#171717] dark:text-[#E5E5E5] text-sm tracking-tight">
            SammaPix
          </span>
        </Link>
        <button
          className="md:hidden p-1 text-[#A3A3A3] hover:text-[#525252] rounded"
          onClick={() => setMobileOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {/* Top section: Home */}
        <Link
          href="/dashboard"
          onClick={() => setMobileOpen(false)}
          className={linkClasses("/dashboard")}
        >
          <LayoutDashboard className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          Home
        </Link>

        {userEmail && ADMIN_EMAILS.includes(userEmail) && (
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className={linkClasses("/admin")}
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            Admin Panel
          </Link>
        )}

        {/* Multi-step — always visible, separate section */}
        <div className="pt-3">
          <p className="px-2.5 mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252]">
            Multi-step
          </p>
          {(["node-studio"] as const).map((slug) => {
            const tool = getToolBySlug(slug);
            if (!tool) return null;
            return (
              <Link
                key={tool.slug}
                href={tool.href}
                onClick={() => setMobileOpen(false)}
                className={linkClasses(tool.href)}
              >
                <span className="shrink-0">{tool.icon}</span>
                {tool.name}
              </Link>
            );
          })}
        </div>

        {/* Search bar */}
        <div className="pt-4 pb-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#A3A3A3] pointer-events-none" strokeWidth={1.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-8 pr-8 py-1.5 text-sm bg-[#F5F5F5] dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] placeholder-[#A3A3A3] border border-[#E5E5E5] dark:border-[#333] rounded-md focus:outline-none focus:ring-1 focus:ring-[#6366F1]/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#525252] transition-colors"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>

        {/* ── SEARCH MODE ── */}
        {isSearching ? (
          <div className="pt-1">
            {searchResults.length === 0 ? (
              <p className="px-2.5 py-3 text-xs text-[#A3A3A3]">No tools found.</p>
            ) : (
              searchResults.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.href}
                  onClick={() => { setMobileOpen(false); setSearchQuery(""); }}
                  className={linkClasses(tool.href)}
                >
                  <span className="shrink-0">{tool.icon}</span>
                  {tool.name}
                  {AI_TOOL_SLUGS.has(tool.slug) && (
                    <span className="ml-auto text-[8px] font-bold uppercase tracking-wider text-[#6366F1] bg-[#6366F1]/10 px-1.5 py-0.5 rounded">AI</span>
                  )}
                </Link>
              ))
            )}
          </div>
        ) : (
          <>
            {/* ── FOR YOU ── (persona-based, MAX 3, only if persona set) */}
            {forYouTools.length > 0 && (
              <div className="pt-3">
                <p className="px-2.5 mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252]">
                  For You
                </p>
                {forYouTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    onClick={() => setMobileOpen(false)}
                    className={linkClasses(tool.href)}
                  >
                    <span className="shrink-0">{tool.icon}</span>
                    {tool.name}
                    {AI_TOOL_SLUGS.has(tool.slug) && (
                      <span className="ml-auto text-[8px] font-bold uppercase tracking-wider text-[#6366F1] bg-[#6366F1]/10 px-1.5 py-0.5 rounded">AI</span>
                    )}
                  </Link>
                ))}
              </div>
            )}

            {/* ── ALL TOOLS — core categories + collapsed "More" group ── */}
            <div className="pt-3">
              <p className="px-2.5 mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#A3A3A3] dark:text-[#525252]">
                All Tools
              </p>

              {/* Core categories */}
              {TOOL_CATEGORIES.filter((c) => !MORE_CATEGORY_LABELS.has(c.label)).map(renderCategory)}

              {/* More: niche categories, collapsed by default */}
              <button
                onClick={() => setShowMore((v) => !v)}
                className="flex items-center gap-2 w-full px-2.5 py-1.5 mt-1 rounded-md text-sm transition-colors duration-150 text-[#A3A3A3] dark:text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] hover:text-[#171717] dark:hover:text-[#E5E5E5]"
              >
                <span className="flex-1 text-left font-medium">More</span>
                {showMore ? (
                  <ChevronUp className="h-3 w-3 shrink-0" strokeWidth={2} />
                ) : (
                  <ChevronDown className="h-3 w-3 shrink-0" strokeWidth={2} />
                )}
              </button>
              {showMore &&
                TOOL_CATEGORIES.filter((c) => MORE_CATEGORY_LABELS.has(c.label)).map(renderCategory)}
            </div>
          </>
        )}
      </nav>

      {/* Bottom fixed section */}
      <div className="shrink-0 border-t border-[#E5E5E5] dark:border-[#2A2A2A] px-2 py-2 space-y-0.5">
        {/* Referral badge */}
        <SidebarReferralBadge />

        {/* Upgrade to Pro (if free) */}
        {!isPro && (
          <button
            onClick={() => mobileNav("/dashboard/upgrade")}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-medium rounded-md transition-colors duration-150"
          >
            <Crown className="h-3.5 w-3.5" strokeWidth={1.5} />
            Upgrade to Pro
          </button>
        )}

        {/* Credits */}
        <Link
          href="/dashboard/credits"
          onClick={() => setMobileOpen(false)}
          className={linkClasses("/dashboard/credits")}
        >
          <Coins className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          Credits
        </Link>
      </div>

      {/* User profile section with hover menu */}
      <div ref={profileRef} className="shrink-0 border-t border-[#E5E5E5] dark:border-[#2A2A2A] relative pb-[max(env(safe-area-inset-bottom,0px),32px)] md:pb-2">
        <button
          onClick={() => setProfileMenuOpen((v) => !v)}
          className="w-full px-3 py-3 flex items-center gap-2.5 hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors duration-150"
        >
          {userImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={userImage}
              alt={userName ?? ""}
              className="h-7 w-7 rounded-full border border-[#E5E5E5] dark:border-[#2A2A2A] shrink-0"
            />
          ) : (
            <div className="h-7 w-7 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center shrink-0">
              <User className="h-3.5 w-3.5 text-[#737373]" strokeWidth={1.5} />
            </div>
          )}
          <div className="flex-1 min-w-0 text-left">
            <p className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
              {userName ?? userEmail ?? "User"}
            </p>
            <p className="text-[10px] text-[#A3A3A3] truncate">{userEmail ?? ""}</p>
          </div>
          <ChevronUp
            className={[
              "h-3.5 w-3.5 text-[#A3A3A3] shrink-0 transition-transform duration-150",
              profileMenuOpen ? "" : "rotate-180",
            ].join(" ")}
            strokeWidth={1.5}
          />
        </button>

        {/* Profile popover menu */}
        {profileMenuOpen && (
          <div className="absolute bottom-full left-2 right-2 mb-1 bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] py-1 z-50">
            {userEmail && ADMIN_EMAILS.includes(userEmail) && (
              <button
                onClick={() => mobileNav("/admin")}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#10b981] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors duration-150 w-full text-left font-medium"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                Admin Panel
              </button>
            )}
            <button
              onClick={() => mobileNav("/dashboard/settings")}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors duration-150 w-full text-left"
            >
              <Settings className="h-4 w-4" strokeWidth={1.5} />
              Settings
            </button>
            <button
              onClick={() => mobileNav("/dashboard/upgrade")}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors duration-150 w-full text-left"
            >
              <Crown className="h-4 w-4" strokeWidth={1.5} />
              Upgrade Plan
            </button>
            <button
              onClick={() => mobileNav("/dashboard/gifts")}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors duration-150 w-full text-left"
            >
              <Gift className="h-4 w-4" strokeWidth={1.5} />
              Gift a subscription
            </button>
            <button
              onClick={() => mobileNav("/glossary")}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors duration-150 w-full text-left"
            >
              <HelpCircle className="h-4 w-4" strokeWidth={1.5} />
              Help
            </button>
            <button
              onClick={() => {
                const isDark = document.documentElement.classList.contains("dark");
                if (isDark) {
                  document.documentElement.classList.remove("dark");
                  localStorage.setItem("theme", "light");
                } else {
                  document.documentElement.classList.add("dark");
                  localStorage.setItem("theme", "dark");
                }
                setProfileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 px-3 py-2 w-full text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors duration-150"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              Toggle theme
            </button>
            <div className="my-1 border-t border-[#E5E5E5] dark:border-[#2A2A2A]" />
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2.5 px-3 py-2 w-full text-sm text-[#737373] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] hover:text-[#DC2626] transition-colors duration-150"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar — logo left, hamburger right */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-12 flex items-center justify-between px-3 bg-white dark:bg-[#191919] border-b border-[#E5E5E5] dark:border-[#333]">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 select-none"
          aria-label="SammaPix — dashboard"
          onClick={() => setMobileOpen(false)}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="[--sp-fill:#171717] dark:[--sp-fill:#E5E5E5]">
            <rect x="2" y="2" width="3" height="3" fill="var(--sp-fill)"/><rect x="6" y="2" width="3" height="3" fill="var(--sp-fill)"/>
            <rect x="10" y="2" width="3" height="3" fill="var(--sp-fill)"/><rect x="14" y="2" width="3" height="3" fill="var(--sp-fill)"/>
            <rect x="2" y="6" width="3" height="3" fill="var(--sp-fill)"/><rect x="14" y="6" width="3" height="3" fill="var(--sp-fill)"/>
            <rect x="2" y="10" width="3" height="3" fill="var(--sp-fill)"/><rect x="14" y="10" width="3" height="3" fill="var(--sp-fill)"/>
            <rect x="2" y="14" width="3" height="3" fill="var(--sp-fill)"/><rect x="6" y="14" width="3" height="3" fill="var(--sp-fill)"/>
            <rect x="10" y="14" width="3" height="3" fill="var(--sp-fill)"/><rect x="14" y="14" width="3" height="3" fill="var(--sp-fill)"/>
            <rect x="6" y="6" width="3" height="3" fill="var(--sp-fill)"/><rect x="10" y="6" width="3" height="3" fill="var(--sp-fill)"/>
            <rect x="6" y="10" width="3" height="3" fill="var(--sp-fill)"/><rect x="10" y="10" width="3" height="3" fill="var(--sp-fill)"/>
          </svg>
          <span className="font-semibold text-[#171717] dark:text-[#E5E5E5] text-sm tracking-tight">SammaPix</span>
        </Link>
        <button
          className="p-2 rounded-md text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — slides from RIGHT on mobile */}
      <aside
        className={[
          "fixed md:static inset-y-0 z-50",
          "right-0 md:right-auto md:left-0",
          "w-[240px] shrink-0",
          "bg-[#FAFAFA] dark:bg-[#1E1E1E]",
          "border-l md:border-l-0 md:border-r border-[#E5E5E5] dark:border-[#2A2A2A]",
          "flex flex-col h-screen",
          "transition-transform duration-200 ease-in-out",
          mobileOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
