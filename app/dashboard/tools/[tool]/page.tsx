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
  IconGifToMp4,
  IconIcoGenerator,
  IconPdfMerge,
  IconColorPicker,
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
  IconUnrar,
  IconOpen7z,
  IconPdfCompress,
  IconPdfRotate,
  IconPdfUnlock,
  IconPdfPageNumbers,
  IconPdfProtect,
  IconRotateImage,
  IconFlipImage,
  IconAddBorder,
  IconRoundImage,
  IconAddText,
  IconImageToBase64,
  IconCollageMaker,
  IconRemovePdfPages,
  IconPdfWatermark,
  IconPdfSign,
  IconPdfOrganize,
  IconCropPdf,
  IconFlattenPdf,
  IconTxtToPdf,
  IconRarToZip,
  IconSevenZToZip,
  IconTarToZip,
  IconMinecraftExtractor,
  IconApkExtractor,
  IconIpaExtractor,
  IconIsoExtractor,
  IconBarcodeGenerator,
  IconQrCodeGenerator,
  IconQrCodeReader,
  IconBarcodeReader,
  IconHashGenerator,
  IconUrlEncodeDecode,
  IconPasswordGenerator,
} from "@/components/ui/ToolCard";

// ─── Lazy-load tool components to keep bundle lean ──────────────────────────

const CompressClient = dynamic(() => import("@/components/tools/CompressClient"));
const WebpClient = dynamic(() => import("@/components/tools/WebpClient"));
const PngToJpgClient = dynamic(() => import("@/components/tools/PngToJpgClient"));
const WebpToJpgClient = dynamic(() => import("@/components/tools/WebpToJpgClient"));
const WebpToPngClient = dynamic(() => import("@/components/tools/WebpToPngClient"));
const SvgToPngClient = dynamic(() => import("@/components/tools/SvgToPngClient"));
const GifToMp4Client = dynamic(() => import("@/components/tools/GifToMp4Client"));
const IcoGeneratorClient = dynamic(() => import("@/components/tools/IcoGeneratorClient"));
const PdfMergeClient = dynamic(() => import("@/components/tools/PdfMergeClient"));
const ColorPickerClient = dynamic(() => import("@/components/tools/ColorPickerClient"));
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
const ColorMatchClient = dynamic(() => import("@/components/tools/ColorMatchClient"));
const PhotoEnhanceClient = dynamic(() => import("@/components/tools/PhotoEnhanceClient"));
const UnrarClient = dynamic(() => import("@/components/tools/UnrarClient"));
const PdfCompressClient = dynamic(() => import("@/components/tools/PdfCompressClient"));
const PdfRotateClient = dynamic(() => import("@/components/tools/PdfRotateClient"));
const PdfUnlockClient = dynamic(() => import("@/components/tools/PdfUnlockClient"));
const PdfPageNumbersClient = dynamic(() => import("@/components/tools/PdfPageNumbersClient"));
const PdfProtectClient = dynamic(() => import("@/components/tools/PdfProtectClient"));
const RotateImageClient = dynamic(() => import("@/components/tools/RotateImageClient"));
const FlipImageClient = dynamic(() => import("@/components/tools/FlipImageClient"));
const AddBorderClient = dynamic(() => import("@/components/tools/AddBorderClient"));
const RoundImageClient = dynamic(() => import("@/components/tools/RoundImageClient"));
const AddTextToImageClient = dynamic(() => import("@/components/tools/AddTextToImageClient"));
const ImageToBase64Client = dynamic(() => import("@/components/tools/ImageToBase64Client"));
const CollageMakerClient = dynamic(() => import("@/components/tools/CollageMakerClient"));
const RemovePdfPagesClient = dynamic(() => import("@/components/tools/RemovePdfPagesClient"));
const PdfWatermarkClient = dynamic(() => import("@/components/tools/PdfWatermarkClient"));
const PdfSignClient = dynamic(() => import("@/components/tools/PdfSignClient"));
const PdfOrganizeClient = dynamic(() => import("@/components/tools/PdfOrganizeClient"));
const CropPdfClient = dynamic(() => import("@/components/tools/CropPdfClient"));
const FlattenPdfClient = dynamic(() => import("@/components/tools/FlattenPdfClient"));
const TxtToPdfClient = dynamic(() => import("@/components/tools/TxtToPdfClient"));
const RarToZipClient = dynamic(() => import("@/components/tools/RarToZipClient"));
const SevenZToZipClient = dynamic(() => import("@/components/tools/SevenZToZipClient"));
const TarToZipClient = dynamic(() => import("@/components/tools/TarToZipClient"));
const MinecraftExtractorClient = dynamic(() => import("@/components/tools/MinecraftExtractorClient"));
const ApkExtractorClient = dynamic(() => import("@/components/tools/ApkExtractorClient"));
const IpaExtractorClient = dynamic(() => import("@/components/tools/IpaExtractorClient"));
const IsoExtractorClient = dynamic(() => import("@/components/tools/IsoExtractorClient"));
const BarcodeGeneratorClient = dynamic(() => import("@/components/tools/BarcodeGeneratorClient"));
const QrCodeGeneratorClient = dynamic(() => import("@/components/tools/QrCodeGeneratorClient"));
const QrCodeReaderClient = dynamic(() => import("@/components/tools/QrCodeReaderClient"));
const BarcodeReaderClient = dynamic(() => import("@/components/tools/BarcodeReaderClient"));
const HashGeneratorClient = dynamic(() => import("@/components/tools/HashGeneratorClient"));
const UrlEncodeDecodeClient = dynamic(() => import("@/components/tools/UrlEncodeDecodeClient"));
const PasswordGeneratorClient = dynamic(() => import("@/components/tools/PasswordGeneratorClient"));

// ─── Tool component map ──────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TOOL_MAP: Record<string, React.ComponentType<any>> = {
  compress:    CompressClient,
  webp:        WebpClient,
  "png-to-jpg": PngToJpgClient,
  "webp-to-jpg": WebpToJpgClient,
  "webp-to-png": WebpToPngClient,
  "svg-to-png":  SvgToPngClient,
  "gif-to-mp4":  GifToMp4Client,
  "ico-generator": IcoGeneratorClient,
  "pdf-merge":  PdfMergeClient,
  "color-picker": ColorPickerClient,
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
  "color-match": ColorMatchClient,
  "photo-enhance": PhotoEnhanceClient,
  unrar: UnrarClient,
  "open-7z": dynamic(() => import("@/components/tools/Open7zClient")),
  "pdf-compress": PdfCompressClient,
  "pdf-rotate":   PdfRotateClient,
  "pdf-unlock":   PdfUnlockClient,
  "pdf-page-numbers": PdfPageNumbersClient,
  "pdf-protect":      PdfProtectClient,
  "rotate-image":     RotateImageClient,
  "flip-image":       FlipImageClient,
  "add-border":       AddBorderClient,
  "round-image":      RoundImageClient,
  "add-text-to-image": AddTextToImageClient,
  "image-to-base64": ImageToBase64Client,
  "collage-maker": CollageMakerClient,
  "remove-pdf-pages": RemovePdfPagesClient,
  "pdf-watermark":    PdfWatermarkClient,
  "pdf-sign":         PdfSignClient,
  "pdf-organize":     PdfOrganizeClient,
  "crop-pdf":         CropPdfClient,
  "flatten-pdf":      FlattenPdfClient,
  "txt-to-pdf":       TxtToPdfClient,
  "rar-to-zip":           RarToZipClient,
  "7z-to-zip":            SevenZToZipClient,
  "tar-to-zip":           TarToZipClient,
  "minecraft-extractor":  MinecraftExtractorClient,
  "apk-extractor":        ApkExtractorClient,
  "ipa-extractor":        IpaExtractorClient,
  "iso-extractor":        IsoExtractorClient,
  "barcode-generator":   BarcodeGeneratorClient,
  "qr-code-generator":   QrCodeGeneratorClient,
  "qr-code-reader":      QrCodeReaderClient,
  "barcode-reader":      BarcodeReaderClient,
  "hash-generator":      HashGeneratorClient,
  "url-encode-decode":   UrlEncodeDecodeClient,
  "password-generator":  PasswordGeneratorClient,
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

const IconBatchName: React.FC<{ accent: string }> = ({ accent }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <style>{`
      @keyframes dt-bn-count { 0%, 33% { opacity: 1; } 34%, 66% { opacity: 0.4; } 67%, 100% { opacity: 1; } }
      .dt-bn-n1 { animation: dt-bn-count 3s ease-in-out 0s infinite; }
      .dt-bn-n2 { animation: dt-bn-count 3s ease-in-out 1s infinite; }
      .dt-bn-n3 { animation: dt-bn-count 3s ease-in-out 2s infinite; }
    `}</style>
    <rect x="6" y="4" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text className="dt-bn-n1" x="20" y="12" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">001</text>
    <rect x="6" y="18" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text className="dt-bn-n2" x="20" y="26" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">002</text>
    <rect x="6" y="32" width="28" height="10" rx="2" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1.25"/>
    <text className="dt-bn-n3" x="20" y="40" fontSize="6" fill={accent} textAnchor="middle" fontWeight="700" fontFamily="monospace">003</text>
    <path d="M38 14 L42 14 M38 24 L42 24 M38 34 L42 34" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
    <path d="M40 10 L40 38" stroke={accent} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.2"/>
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
  "gif-to-mp4": { Icon: IconGifToMp4,  accent: "#EC4899" },
  "ico-generator": { Icon: IconIcoGenerator, accent: "#0EA5E9" },
  "pdf-merge": { Icon: IconPdfMerge,   accent: "#DC2626" },
  "color-picker": { Icon: IconColorPicker, accent: "#A855F7" },
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
  batchname:   { Icon: IconBatchName, accent: "#F59E0B" },
  "ai-organize": { Icon: IconAIRename, accent: "#8B5CF6" },
  "remove-bg":   { Icon: IconRemoveBg, accent: "#EC4899" },
  upscale:       { Icon: IconUpscale,  accent: "#8B5CF6" },
  "passport-photo": { Icon: IconPassportPhoto, accent: "#3B82F6" },
  "image-to-text": { Icon: IconAIRename, accent: "#F59E0B" },
  "jpg-to-pdf": { Icon: IconJpgToPdf, accent: "#DC2626" },
  jxl: { Icon: IconJxl, accent: "#F59E0B" },
  "color-match": { Icon: IconColorPicker, accent: "#F59E0B" },
  "photo-enhance": { Icon: IconUpscale, accent: "#8B5CF6" },
  unrar: { Icon: IconUnrar, accent: "#0EA5E9" },
  "open-7z": { Icon: IconOpen7z, accent: "#8B5CF6" },
  "pdf-compress": { Icon: IconPdfCompress, accent: "#EF4444" },
  "pdf-rotate":   { Icon: IconPdfRotate,   accent: "#EF4444" },
  "pdf-unlock":   { Icon: IconPdfUnlock,   accent: "#EF4444" },
  "pdf-page-numbers": { Icon: IconPdfPageNumbers, accent: "#EF4444" },
  "pdf-protect":      { Icon: IconPdfProtect,     accent: "#EF4444" },
  "rotate-image":     { Icon: IconRotateImage,    accent: "#0EA5E9" },
  "flip-image":       { Icon: IconFlipImage,      accent: "#0EA5E9" },
  "add-border":       { Icon: IconAddBorder,      accent: "#0EA5E9" },
  "round-image":      { Icon: IconRoundImage,     accent: "#0EA5E9" },
  "add-text-to-image": { Icon: IconAddText,       accent: "#0EA5E9" },
  "image-to-base64":   { Icon: IconImageToBase64, accent: "#6366F1" },
  "collage-maker":     { Icon: IconCollageMaker,  accent: "#0EA5E9" },
  "remove-pdf-pages":  { Icon: IconRemovePdfPages, accent: "#EF4444" },
  "pdf-watermark":     { Icon: IconPdfWatermark,   accent: "#EF4444" },
  "pdf-sign":          { Icon: IconPdfSign,        accent: "#EF4444" },
  "pdf-organize":      { Icon: IconPdfOrganize,    accent: "#EF4444" },
  "crop-pdf":          { Icon: IconCropPdf,        accent: "#EF4444" },
  "flatten-pdf":       { Icon: IconFlattenPdf,     accent: "#EF4444" },
  "txt-to-pdf":        { Icon: IconTxtToPdf,       accent: "#EF4444" },
  "rar-to-zip":           { Icon: IconRarToZip,             accent: "#0EA5E9" },
  "7z-to-zip":            { Icon: IconSevenZToZip,          accent: "#0EA5E9" },
  "tar-to-zip":           { Icon: IconTarToZip,             accent: "#0EA5E9" },
  "minecraft-extractor":  { Icon: IconMinecraftExtractor,   accent: "#0EA5E9" },
  "apk-extractor":        { Icon: IconApkExtractor,         accent: "#0EA5E9" },
  "ipa-extractor":        { Icon: IconIpaExtractor,         accent: "#0EA5E9" },
  "iso-extractor":        { Icon: IconIsoExtractor,         accent: "#0EA5E9" },
  "barcode-generator":   { Icon: IconBarcodeGenerator,     accent: "#6366F1" },
  "qr-code-generator":   { Icon: IconQrCodeGenerator,      accent: "#6366F1" },
  "qr-code-reader":      { Icon: IconQrCodeReader,         accent: "#6366F1" },
  "barcode-reader":      { Icon: IconBarcodeReader,        accent: "#6366F1" },
  "hash-generator":      { Icon: IconHashGenerator,        accent: "#6366F1" },
  "url-encode-decode":   { Icon: IconUrlEncodeDecode,      accent: "#6366F1" },
  "password-generator":  { Icon: IconPasswordGenerator,    accent: "#6366F1" },
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
  "gif-to-mp4": {
    label: "GIF to MP4",
    tagline: "Animated GIF to MP4 or WebM — 80-90% smaller files.",
    steps: [
      { title: "Drop GIF files", desc: "Add .gif files (up to 10 per batch on Free, 100 on Pro). Max 50 MB each." },
      { title: "Pick a quality preset", desc: "High (8 Mbps) / Balanced (3.5 Mbps) / Small (1.5 Mbps)." },
      { title: "Download", desc: "MP4 where supported, WebM fallback otherwise. Individually or all as ZIP." },
    ],
    proTip: { text: "Keep the tab active during conversion — MediaRecorder throttles in background tabs.", linkLabel: "Compress more", linkHref: "/dashboard/tools/compress" },
  },
  "ico-generator": {
    label: "Favicon Generator",
    tagline: "Multi-size favicon.ico from PNG, SVG, JPG, WebP or GIF.",
    steps: [
      { title: "Upload source image", desc: "Square 512×512 PNG or SVG works best. JPG, WebP and GIF also supported." },
      { title: "Pick sizes", desc: "16/32/48 recommended. Add 64/128/256 for HiDPI Windows shortcuts." },
      { title: "Download favicon.ico", desc: "Drop it in your site root and add a single <link> tag to <head>." },
    ],
    proTip: { text: "Also ship a SVG favicon for modern browsers — smaller and perfect at any scale.", linkLabel: "SVG to PNG", linkHref: "/dashboard/tools/svg-to-png" },
  },
  "pdf-merge": {
    label: "Merge PDF",
    tagline: "Combine multiple PDFs into one — drag to reorder.",
    steps: [
      { title: "Drop PDF files", desc: "Up to 10 per batch on Free, 50 on Pro. Max 100 MB each." },
      { title: "Drag rows to reorder", desc: "Set the final page order. Remove files you don't want." },
      { title: "Merge and download", desc: "One combined PDF built locally in your browser." },
    ],
    proTip: { text: "Need to turn images into a PDF first? Use JPG to PDF, then merge.", linkLabel: "JPG to PDF", linkHref: "/dashboard/tools/jpg-to-pdf" },
  },
  "color-picker": {
    label: "Color Picker",
    tagline: "Eyedrop HEX/RGB/HSL from any image + auto 6-color palette.",
    steps: [
      { title: "Upload an image", desc: "JPG, PNG, WebP or GIF up to 20 MB." },
      { title: "Hover and click", desc: "Preview the color under your cursor, click to pick." },
      { title: "Copy HEX/RGB/HSL", desc: "Toggle format, copy with one click. Palette auto-generated." },
    ],
    proTip: { text: "Pull brand colors from a logo? Remove the background first for cleaner samples.", linkLabel: "Remove background", linkHref: "/dashboard/tools/remove-bg" },
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
    tagline: "13 pattern tokens, EXIF dates, find & replace, case conversion.",
    steps: [
      { title: "Drop your files", desc: "Add unlimited files. EXIF metadata reads automatically for photos." },
      { title: "Pick mode + pattern", desc: "Pattern (e.g. {exif:date}-trip-{n:3}), Find & Replace (with regex), or Case Convert." },
      { title: "Preview & download", desc: "Sort by date or name, preview every rename, then download single file or ZIP." },
    ],
    proTip: { text: "ZIP download with multiple files requires Pro.", linkLabel: "Upgrade to Pro", linkHref: "/dashboard/upgrade" },
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
  "color-match": {
    label: "LUT Generator",
    tagline: "Extract a 3D LUT from any photo, apply to a batch, export .cube.",
    steps: [
      { title: "Pick source", desc: "Drop a reference photo or upload a .cube file." },
      { title: "Drop the batch", desc: "Up to 50 photos (300 Pro). They inherit the look." },
      { title: "Download ZIP or .cube", desc: "Get the batch processed, or the LUT for Lightroom." },
    ],
    proTip: { text: "Use FilmLab presets if you want a pre-baked look instead of extracting one.", linkLabel: "Go to FilmLab", linkHref: "/dashboard/tools/filmlab" },
  },
  "photo-enhance": {
    label: "Batch Photo Enhancer",
    tagline: "AI cleans JPEG artifacts + 2x super-resolution on a batch of photos.",
    steps: [
      { title: "Drop multiple photos", desc: "Up to 20 (100 Pro). All processed sequentially in your browser." },
      { title: "Click Enhance", desc: "Swin2SR AI runs locally — no upload. ~5-12s per photo." },
      { title: "Download ZIP", desc: "Grab all enhanced PNGs in a single archive." },
    ],
    proTip: { text: "Run Compress after to shrink the enhanced batch for the web.", linkLabel: "Go to Compress", linkHref: "/dashboard/tools/compress" },
  },
  unrar: {
    label: "Open RAR Online",
    tagline: "Extract RAR files in your browser. Files never leave your device.",
    steps: [
      { title: "Drop a .rar file", desc: "Drag & drop a RAR archive (up to 200 MB free). Supports RAR4 and RAR5." },
      { title: "View and download", desc: "See the file list instantly. Click any file to download it individually." },
      { title: "Export as ZIP (optional)", desc: "Click \"Download all as .zip\" to convert the entire RAR archive to ZIP." },
    ],
    proTip: { text: "Use EXIF Viewer after extracting to strip metadata from photos before sharing.", linkLabel: "EXIF Viewer", linkHref: "/dashboard/tools/exif" },
  },
  "open-7z": {
    label: "Open 7z Online",
    tagline: "Extract .7z files in your browser. Files never leave your device.",
    steps: [
      { title: "Drop a .7z file", desc: "Drag & drop a .7z archive (up to 200 MB free). Supports standard and password-protected archives." },
      { title: "View and download", desc: "See the file list instantly. Click any file to download it individually." },
      { title: "Export as ZIP (optional)", desc: "Click \"Download all as .zip\" to convert the entire .7z archive to ZIP." },
    ],
    proTip: { text: "Need to open a RAR archive instead? Use Open RAR Online.", linkLabel: "Open RAR Online", linkHref: "/dashboard/tools/unrar" },
  },
  "pdf-compress": {
    label: "Compress PDF",
    tagline: "Reduce PDF file size in your browser. See before/after, no upload.",
    steps: [
      { title: "Drop your PDF", desc: "Add a PDF file (up to 100 MB). Reads page count instantly, no upload." },
      { title: "Choose quality level", desc: "Pick Low for maximum compression, Medium for balance, or High for minimal loss." },
      { title: "Download compressed PDF", desc: "See the before/after file size and percentage reduction, then download." },
    ],
    proTip: { text: "Need fewer pages instead? Split the PDF to keep only what you need.", linkLabel: "PDF Split", linkHref: "/dashboard/tools/pdf-split" },
  },
  "pdf-rotate": {
    label: "Rotate PDF",
    tagline: "Rotate PDF pages in your browser. Text stays selectable, no upload.",
    steps: [
      { title: "Drop your PDF", desc: "Add a PDF (up to 100 MB). Thumbnails of every page are rendered instantly in your browser." },
      { title: "Choose rotations", desc: "Rotate all pages at once (90° CW, CCW, 180°) or rotate individual pages using the per-page buttons." },
      { title: "Apply and download", desc: "Click Apply rotations. Text stays fully selectable — rotation is metadata, not rasterization." },
    ],
    proTip: { text: "Need to reduce the file size too? Compress PDF works great after rotating.", linkLabel: "Compress PDF", linkHref: "/dashboard/tools/pdf-compress" },
  },
  "pdf-unlock": {
    label: "Unlock PDF",
    tagline: "Remove PDF usage restrictions in your browser. No upload, no password cracking.",
    steps: [
      { title: "Drop your PDF", desc: "Add a PDF (up to 100 MB) that opens freely but has printing, copying or editing locked." },
      { title: "Read the honest note", desc: "Works on owner-password restrictions only. Cannot bypass a password required to open the file." },
      { title: "Download the unlocked PDF", desc: "Click Remove Restrictions. The unlocked PDF downloads directly — printing, copying and editing re-enabled." },
    ],
    proTip: { text: "Want to reduce the size of your unlocked PDF too? Compress PDF is next.", linkLabel: "Compress PDF", linkHref: "/dashboard/tools/pdf-compress" },
  },
  "pdf-page-numbers": {
    label: "PDF Page Numbers",
    tagline: "Add page numbers to every page of a PDF in your browser. No upload.",
    steps: [
      { title: "Drop your PDF", desc: "Add a PDF (up to 100 MB). The file is read instantly in your browser — no server upload." },
      { title: "Choose position and format", desc: "Pick one of 6 positions and one of 3 formats (number only, number/total, Page X of N). Adjust font size and margin if needed." },
      { title: "Download the numbered PDF", desc: "Click Add Page Numbers. Page numbers are stamped as real text on every page and the file downloads instantly." },
    ],
    proTip: { text: "Want to reduce the file size of your numbered PDF? Compress PDF works great after.", linkLabel: "Compress PDF", linkHref: "/dashboard/tools/pdf-compress" },
  },
  "pdf-protect": {
    label: "Password Protect PDF",
    tagline: "Add a password to any PDF in your browser. Encrypted locally — never uploaded.",
    steps: [
      { title: "Drop your PDF", desc: "Add a PDF (up to 100 MB). Reads the file instantly in your browser — nothing is sent to any server." },
      { title: "Set and confirm a password", desc: "Enter a password and confirm it. Both fields must match. The password will be required by any PDF viewer to open the file." },
      { title: "Download the protected PDF", desc: "Click Protect PDF. Encryption runs locally and the protected file downloads to your device immediately." },
    ],
    proTip: { text: "Want to remove a password from a PDF instead? Unlock PDF can remove owner-password restrictions.", linkLabel: "Unlock PDF", linkHref: "/dashboard/tools/pdf-unlock" },
  },
  "rotate-image": {
    label: "Rotate Image",
    tagline: "Rotate photos 90°, 180° or any custom angle. Files never leave your browser.",
    steps: [
      { title: "Drop your images", desc: "Add JPG, PNG or WebP files (up to 20 per batch on Free, 200 on Pro). No size limit up to 50 MB per file." },
      { title: "Choose a rotation angle", desc: "Click 90° CW, 90° CCW, or 180° for standard rotations. Use the slider for any angle from -180° to +180°." },
      { title: "Download rotated images", desc: "Click Rotate, then download each image individually or grab all as a ZIP archive." },
    ],
    proTip: { text: "After rotating, crop to an exact ratio for social media or print.", linkLabel: "Try Crop to Ratio", linkHref: "/dashboard/tools/croproatio" },
  },
  "flip-image": {
    label: "Flip Image",
    tagline: "Mirror photos horizontally or vertically. Files never leave your browser.",
    steps: [
      { title: "Drop your images", desc: "Add JPG, PNG or WebP files (up to 20 per batch on Free, 200 on Pro). No size limit up to 50 MB per file." },
      { title: "Choose flip direction", desc: "Click Flip Horizontal to mirror left-right, Flip Vertical to mirror top-bottom, or enable both at once." },
      { title: "Download flipped images", desc: "Click Flip, then download each image individually or grab all as a ZIP archive." },
    ],
    proTip: { text: "Need to rotate after flipping? Rotate Image supports any angle from -180° to +180°.", linkLabel: "Try Rotate Image", linkHref: "/dashboard/tools/rotate-image" },
  },
  "add-border": {
    label: "Add Border to Image",
    tagline: "Add a colored border or frame to photos. Custom color and width. Files never leave your browser.",
    steps: [
      { title: "Drop your images", desc: "Add JPG, PNG or WebP files (up to 20 per batch on Free, 200 on Pro). No size limit up to 50 MB per file." },
      { title: "Choose color and width", desc: "Set border width with the slider (1-200 px). Pick a preset color or use the color picker. Toggle advanced mode for per-side control." },
      { title: "Download bordered images", desc: "Click Add border, then download each image individually or grab all as a ZIP archive." },
    ],
    proTip: { text: "For a polaroid effect, enable advanced mode and set bottom border wider than the others with white color.", linkLabel: "Try Flip Image", linkHref: "/dashboard/tools/flip-image" },
  },
  "round-image": {
    label: "Round Image",
    tagline: "Circle crop or rounded corners with transparent PNG output. Files never leave your browser.",
    steps: [
      { title: "Drop your images", desc: "Add JPG, PNG or WebP files (up to 20 per batch on Free, 200 on Pro). No size limit up to 50 MB per file." },
      { title: "Choose shape and radius", desc: "Select Circle for a perfect circular crop, or Rounded corners and adjust the corner radius with the slider (4–400 px)." },
      { title: "Download transparent PNGs", desc: "Click Round images, then download each PNG individually or grab all as a ZIP archive." },
    ],
    proTip: { text: "For profile pictures use Circle mode. For card thumbnails, try Rounded corners at 32–80 px.", linkLabel: "Try Add Border", linkHref: "/dashboard/tools/add-border" },
  },
  "add-text-to-image": {
    label: "Add Text to Image",
    tagline: "Write text on any photo. Font, size, color, outline, position grid, live preview. Files never leave your browser.",
    steps: [
      { title: "Drop your image", desc: "Add one JPG, PNG or WebP file. The tool works on a single image so you can customize the text for each photo." },
      { title: "Type text and set style", desc: "Enter your text, choose font family, size (10-200 px), text color, outline color and width. Enable shadow for readability. Pick position from the 9-point grid and fine-tune with X/Y offset sliders." },
      { title: "Download the result", desc: "Click Add text to image to render at full resolution, then download. Output format matches input. Files never leave your browser." },
    ],
    proTip: { text: "For captions, set text to bottom-center with white color and black outline 3 px for maximum readability on any background.", linkLabel: "Try Watermark", linkHref: "/dashboard/tools/stampit" },
  },
  "image-to-base64": {
    label: "Image to Base64",
    tagline: "Encode any image to a Base64 Data URI — or decode a base64 string back to an image. Files never leave your browser.",
    steps: [
      { title: "Drop your image", desc: "Add any JPG, PNG, WebP, SVG or other image (max 10 MB). Encoding runs instantly via FileReader in your browser — no upload." },
      { title: "Choose output format", desc: "Select from four formats: full Data URI, plain base64 string, CSS background-image rule, or an HTML <img> tag. Switch between them in one click." },
      { title: "Copy and use", desc: "Click Copy to send the string to your clipboard. Paste it directly into your CSS file, HTML template or API payload. Use the decode tab to preview a base64 string as an image." },
    ],
    proTip: { text: "Compress the image first to reduce the base64 string size by up to 80%.", linkLabel: "Compress Images", linkHref: "/dashboard/tools/compress" },
  },
  "collage-maker": {
    label: "Photo Collage Maker",
    tagline: "Combine 2-9 photos into a grid collage. 8 layouts, custom gap and color. Files never leave your browser.",
    steps: [
      { title: "Load your photos", desc: "Drop 2-9 JPG, PNG or WebP photos onto the upload area. Up to 20 photos on Free, 200 on Pro. Compatible grid layouts appear automatically." },
      { title: "Choose layout and settings", desc: "Pick a grid preset (2×2, 3×3, etc.), set gap between cells, pick a background color, and choose Cover (fill & crop) or Contain (show full photo) fit mode." },
      { title: "Create and download", desc: "Click Create collage. A preview appears instantly. Download as JPG (smaller) or PNG (lossless) at 720, 1080, 1440 or 2048 px." },
    ],
    proTip: { text: "For Instagram carousel grids, use a 3×3 layout at 1080 px with 0 gap and cover mode for a seamless puzzle effect.", linkLabel: "Try Instagram Grid Splitter", linkHref: "/dashboard/tools/instagram-grid-splitter" },
  },
  "pdf-watermark": {
    label: "Watermark PDF",
    tagline: "Stamp CONFIDENTIAL, DRAFT or your logo on every PDF page. Opacity, rotation, tile. No upload.",
    steps: [
      { title: "Drop your PDF", desc: "Add a PDF (up to 100 MB). The file is read instantly in your browser — nothing is uploaded." },
      { title: "Choose watermark type and settings", desc: "Select Text (CONFIDENTIAL, DRAFT, custom) or Image (PNG/JPG logo). Set color, opacity, rotation and position: Center, Tile or Bottom." },
      { title: "Download the watermarked PDF", desc: "Click Add Watermark. The stamp is applied on every page and the file downloads immediately." },
    ],
    proTip: { text: "Need to add a password after watermarking? Protect PDF keeps your watermarked document secure.", linkLabel: "Password Protect PDF", linkHref: "/dashboard/tools/pdf-protect" },
  },
  "pdf-sign": {
    label: "Sign PDF",
    tagline: "Add a visual signature to any PDF page in your browser. No upload, no account.",
    steps: [
      { title: "Drop your PDF", desc: "Add a PDF (up to 100 MB). Page thumbnails render instantly in your browser — nothing is uploaded." },
      { title: "Draw or upload your signature", desc: "Choose Draw to sign with mouse/touch on the canvas, or Upload to use a PNG/JPG of your handwritten signature. Select the target page and position." },
      { title: "Download the signed PDF", desc: "Click Sign PDF. The signature is embedded as an image on your chosen page and the file downloads immediately. Visual signature only — not a cryptographic digital signature." },
    ],
    proTip: { text: "After signing, add a password to protect the document from edits.", linkLabel: "Password Protect PDF", linkHref: "/dashboard/tools/pdf-protect" },
  },
  "pdf-organize": {
    label: "Organize PDF Pages",
    tagline: "Drag thumbnails or use arrow buttons to reorder PDF pages. Rebuilt locally — no upload, no quality loss.",
    steps: [
      { title: "Drop your PDF", desc: "Add a PDF (up to 100 MB). Thumbnails of every page are rendered instantly in your browser — nothing is uploaded." },
      { title: "Rearrange the pages", desc: "Drag page thumbnails into the order you want. Or use the arrow buttons on each card to move a page up, down, to the top, or to the bottom." },
      { title: "Save and download", desc: "Click Save reordered PDF. The rebuilt PDF downloads immediately with your custom page order and no quality loss." },
    ],
    proTip: { text: "Need to delete unwanted pages too? Use Delete PDF Pages after organizing.", linkLabel: "Delete PDF Pages", linkHref: "/dashboard/tools/remove-pdf-pages" },
  },
  "remove-pdf-pages": {
    label: "Delete PDF Pages",
    tagline: "Remove specific pages from a PDF in your browser. Click thumbnails or type a range. No upload.",
    steps: [
      { title: "Drop your PDF", desc: "Add a PDF (up to 100 MB). Thumbnails of every page are rendered instantly in your browser — nothing is uploaded." },
      { title: "Mark pages for deletion", desc: "Click any page thumbnail to mark it with a red overlay. Or type a range like \"2, 5-7\" in the quick-select box. Click again to unmark." },
      { title: "Remove and download", desc: "Click Remove N pages. A new PDF with only the pages you kept downloads immediately. At least 1 page must remain." },
    ],
    proTip: { text: "After removing pages, compress the resulting PDF to reduce its file size further.", linkLabel: "Compress PDF", linkHref: "/dashboard/tools/pdf-compress" },
  },
  "crop-pdf": {
    label: "Crop PDF",
    tagline: "Trim Top, Right, Bottom, Left margins from every PDF page in your browser. Live preview. No upload.",
    steps: [
      { title: "Drop your PDF", desc: "Add a PDF (up to 100 MB). A live preview of the first page renders instantly in your browser — nothing is uploaded." },
      { title: "Set the margins", desc: "Use the sliders or type values for Top, Right, Bottom, and Left. Choose points (pt) or percentage (%). The red crop rectangle on the preview updates live." },
      { title: "Download the cropped PDF", desc: "Click Crop PDF. The margins are removed from every page using PDF CropBox/MediaBox and the file downloads immediately. Text stays fully selectable." },
    ],
    proTip: { text: "After cropping, compress the PDF to reduce file size further.", linkLabel: "Compress PDF", linkHref: "/dashboard/tools/pdf-compress" },
  },
  "txt-to-pdf": {
    label: "TXT to PDF",
    tagline: "Convert any .txt file or pasted text to a PDF in your browser. Word-wrap, A4/Letter, Courier or Helvetica. No upload.",
    steps: [
      { title: "Load your text", desc: "Drop a .txt file or switch to Paste mode and paste your text directly." },
      { title: "Choose options", desc: "Pick A4 or Letter page size, Courier or Helvetica font, font size and margins." },
      { title: "Download the PDF", desc: "Click Convert to PDF. Text is word-wrapped, paginated and downloads immediately." },
    ],
    proTip: { text: "Add page numbers to your converted PDF with PDF Page Numbers.", linkLabel: "PDF Page Numbers", linkHref: "/dashboard/tools/pdf-page-numbers" },
  },
  "flatten-pdf": {
    label: "Flatten PDF",
    tagline: "Merge form fields into the page — filled values become permanent, non-editable. No upload.",
    steps: [
      { title: "Drop your PDF", desc: "Add a PDF (up to 100 MB). The tool reads the file in your browser and instantly detects whether it has interactive form fields — nothing is uploaded." },
      { title: "Click Flatten PDF", desc: "pdf-lib merges all text boxes, checkboxes, radio buttons and dropdowns into the static page content. If no fields are found, it honestly tells you and still produces a clean re-saved copy." },
      { title: "Download the flattened PDF", desc: "Click Download. The filled values are now a permanent part of every page and the document looks identical on every PDF reader and printer." },
    ],
    proTip: { text: "After flattening, add a password to prevent any further editing of the document.", linkLabel: "Password Protect PDF", linkHref: "/dashboard/tools/pdf-protect" },
  },
  "minecraft-extractor": {
    label: "Minecraft File Extractor",
    tagline: "Open .mcpack, .mcworld and .mctemplate files in your browser. Files never leave your device.",
    steps: [
      { title: "Drop your Minecraft file", desc: "Drag & drop a .mcpack, .mcworld or .mctemplate file. It is a ZIP archive — this tool opens it entirely in your browser." },
      { title: "Browse the contents", desc: "See every file and folder inside: manifest.json, textures, models, sounds and scripts. No Minecraft installation needed." },
      { title: "Download what you need", desc: "Click any file to download it individually, or use 'Download all as ZIP' to export everything at once." },
    ],
    proTip: { text: "Need to open a RAR archive? Open RAR Online handles .rar files the same way.", linkLabel: "Open RAR Online", linkHref: "/dashboard/tools/unrar" },
  },
  "rar-to-zip": {
    label: "RAR to ZIP",
    tagline: "Convert RAR to ZIP in your browser. Extract + repackage, no upload.",
    steps: [
      { title: "Drop your RAR file", desc: "Drag and drop a .rar file (RAR4 or RAR5, with or without password). Up to 200 MB free." },
      { title: "Extraction and repackaging", desc: "libarchive (WebAssembly) extracts the RAR contents in your browser, then JSZip repackages them into a ZIP preserving the full folder structure." },
      { title: "Download the ZIP", desc: "Click Download ZIP. The archive opens natively on Windows, macOS, Linux and mobile — no extra software needed." },
    ],
    proTip: { text: "Need to open the RAR and download files individually instead? Use Open RAR Online.", linkLabel: "Open RAR Online", linkHref: "/dashboard/tools/unrar" },
  },
  "7z-to-zip": {
    label: "7Z to ZIP",
    tagline: "Convert 7Z to ZIP in your browser. Extract + repackage, no upload.",
    steps: [
      { title: "Drop your 7Z file", desc: "Drag and drop a .7z file (with or without password). Up to 200 MB free. Multi-volume archives (.7z.001) are not supported." },
      { title: "Extraction and repackaging", desc: "libarchive (WebAssembly) extracts the 7Z contents in your browser, then JSZip repackages them into a ZIP preserving the full folder structure." },
      { title: "Download the ZIP", desc: "Click Download ZIP. The archive opens natively on Windows, macOS, Linux and mobile — no extra software needed." },
    ],
    proTip: { text: "Need to open the 7Z and download files individually instead? Use Open 7Z Online.", linkLabel: "Open 7Z Online", linkHref: "/dashboard/tools/open-7z" },
  },
  "tar-to-zip": {
    label: "TAR to ZIP",
    tagline: "Convert TAR archives to ZIP in your browser. Supports .tar, .tar.gz, .tgz, .tar.bz2, .tar.xz — no upload.",
    steps: [
      { title: "Drop your TAR file", desc: "Drag and drop a .tar, .tar.gz, .tgz, .tar.bz2, or .tar.xz file. Up to 200 MB free. libarchive detects the compression automatically." },
      { title: "Extraction and repackaging", desc: "libarchive (WebAssembly) decompresses and extracts the TAR contents in your browser, then JSZip repackages them into a ZIP preserving the full folder structure." },
      { title: "Download the ZIP", desc: "Click Download ZIP. The archive opens natively on Windows, macOS, Linux and mobile — no extra software needed." },
    ],
    proTip: { text: "Need to convert a RAR or 7Z archive instead? SammaPix has dedicated tools for those too.", linkLabel: "RAR to ZIP", linkHref: "/dashboard/tools/rar-to-zip" },
  },
  "apk-extractor": {
    label: "APK Extractor",
    tagline: "An APK is a ZIP archive. Open and extract its contents in your browser. Files never leave your device.",
    steps: [
      { title: "Drop your APK file", desc: "Drag & drop a .apk or .xapk file. Both are ZIP archives — this tool opens them entirely in your browser without any upload." },
      { title: "Browse the contents", desc: "See every file and folder inside: AndroidManifest.xml, classes.dex, resources.arsc, res/, assets/, META-INF/ and lib/. Note: binary files are shown as-is, not decompiled." },
      { title: "Download what you need", desc: "Click any file to download it individually, or use 'Download all as ZIP' to export everything at once." },
    ],
    proTip: { text: "Need to open a RAR or 7z archive? SammaPix has dedicated tools for those too.", linkLabel: "Open RAR Online", linkHref: "/dashboard/tools/unrar" },
  },
  "ipa-extractor": {
    label: "IPA Extractor",
    tagline: "An IPA is a ZIP archive. Open and extract the contents of an iOS .ipa app package in your browser. Files never leave your device.",
    steps: [
      { title: "Drop your IPA file", desc: "Drag & drop a .ipa file. IPA packages are standard ZIP archives — this tool opens them entirely in your browser without any upload." },
      { title: "Browse the contents", desc: "See every file and folder inside: Payload/, Info.plist, frameworks, asset catalogs, resources, and META-INF signature data. When Info.plist is XML-encoded, the app name and bundle ID are displayed automatically." },
      { title: "Download what you need", desc: "Click any file to download it individually, or use 'Download all as ZIP' to export everything at once (Day Pass or Pro)." },
    ],
    proTip: { text: "Need to open an Android APK? SammaPix has a dedicated tool for that too.", linkLabel: "APK Extractor", linkHref: "/dashboard/tools/apk-extractor" },
  },
  "iso-extractor": {
    label: "ISO Extractor",
    tagline: "Browse and extract files from an ISO disc image in your browser. No upload, no mounting, no software to install.",
    steps: [
      { title: "Drop your ISO file", desc: "Drag & drop a .iso disc image. libarchive (WebAssembly) reads the ISO9660 filesystem directly in your browser — your file never leaves your device." },
      { title: "Browse the contents", desc: "See every file and folder stored on the disc. Works with ISO9660 images (Linux distros, Windows installers, software CDs, game discs). UDF-only discs may not be readable." },
      { title: "Download what you need", desc: "Click any file to download it individually for free, or use 'Download all as ZIP' (Day Pass or Pro) to export everything at once with folder structure preserved." },
    ],
    proTip: { text: "Need to open a 7z or RAR archive? SammaPix has dedicated tools for those too.", linkLabel: "Open 7z Online", linkHref: "/dashboard/tools/open-7z" },
  },
  "barcode-generator": {
    label: "Barcode Generator",
    tagline: "Generate CODE128, EAN-13, UPC-A, CODE39, ITF-14 and more barcodes entirely in your browser — download PNG or SVG, no upload, no account.",
    steps: [
      { title: "Choose a format", desc: "Select the barcode standard that matches your use case from the dropdown — CODE128 for general text, EAN-13 for retail products internationally, UPC-A for North American retail, or ITF-14 for shipping cartons." },
      { title: "Enter your value and adjust options", desc: "Type the text or number to encode. Adjust bar height, bar width, colors and whether to show the human-readable text beneath the bars. The preview updates live as you type." },
      { title: "Download PNG or SVG", desc: "Click Download PNG for a high-resolution raster image, or Download SVG for a scalable vector that stays crisp on product labels, large-format prints and packaging artwork." },
    ],
    proTip: { text: "Need QR codes instead of barcodes? SammaPix has a free QR Code Generator too.", linkLabel: "QR Code Generator", linkHref: "/dashboard/tools/qr-code-generator" },
  },
  "qr-code-generator": {
    label: "QR Code Generator",
    tagline: "Generate QR codes for URLs, text, Wi-Fi networks and email addresses — download PNG or SVG.",
    steps: [
      { title: "Choose a content type", desc: "Select URL, Text, Wi-Fi or Email from the preset tabs. Each preset builds the correct QR data format automatically." },
      { title: "Enter your content and tweak options", desc: "Type the URL or text, set error correction level, size, margin and colors. The preview updates live as you type." },
      { title: "Download PNG or SVG", desc: "Click Download PNG for an image ready for web or print, or Download SVG for a vector that scales perfectly on posters and packaging." },
    ],
    proTip: { text: "For print use, pick error correction H (30%) and download SVG — the code stays scannable even if partially covered by a logo.", linkLabel: "Add text to images", linkHref: "/dashboard/tools/add-text-to-image" },
  },
  "qr-code-reader": {
    label: "QR Code Reader",
    tagline: "Decode any QR code from an image file or your camera — no upload, no app, 100% in your browser.",
    steps: [
      { title: "Upload an image or open the camera", desc: "Drag and drop a PNG, JPG, WebP or GIF containing a QR code, or switch to the Camera tab to scan a physical QR code live." },
      { title: "Automatic decoding", desc: "The tool reads the pixel data from your image using jsQR and decodes the QR code instantly in your browser. Nothing is sent to any server." },
      { title: "Copy or open the result", desc: "The decoded content appears immediately. Click Copy to grab it, or click Open URL if the QR encodes a web address." },
    ],
    proTip: { text: "Need to create a QR code? SammaPix has a free generator too.", linkLabel: "QR Code Generator", linkHref: "/dashboard/tools/qr-code-generator" },
  },
  "barcode-reader": {
    label: "Barcode Reader",
    tagline: "Decode EAN-13, UPC-A, CODE128, CODE39, QR and more from an image or your camera — no upload, no app, 100% in your browser.",
    steps: [
      { title: "Upload an image or open the camera", desc: "Drag and drop a PNG, JPG, WebP or GIF containing a barcode, or switch to the Camera tab to scan a physical barcode in real time." },
      { title: "Automatic decoding", desc: "The tool draws your image on an offscreen canvas, extracts pixel data, and runs the ZXing decoder entirely in your browser. Nothing is sent to any server." },
      { title: "Copy the decoded value", desc: "The barcode value and format (e.g. EAN-13, CODE128) appear instantly. Click Copy to copy the value to your clipboard." },
    ],
    proTip: { text: "Need to generate a barcode instead? SammaPix has a free Barcode Generator.", linkLabel: "Barcode Generator", linkHref: "/dashboard/tools/barcode-generator" },
  },
  "hash-generator": {
    label: "Hash Generator",
    tagline: "Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512 hashes from text or any file — 100% client-side, no upload.",
    steps: [
      { title: "Choose Text or File mode", desc: "Switch to Text to hash a string (updates live as you type) or to File to hash any local file up to 500 MB." },
      { title: "Select algorithms", desc: "Tick which hash functions you need. SHA-256 is recommended for integrity checks. MD5 is provided for legacy use only." },
      { title: "Copy your hash", desc: "Each result appears in a monospace row with its own Copy button. Click to copy the hex digest to your clipboard." },
    ],
    proTip: { text: "SHA-256 is the modern standard. Use MD5 only for legacy checksums or file deduplication — it is not secure for cryptography.", linkLabel: "Learn more", linkHref: "/tools/hash-generator" },
  },
  "url-encode-decode": {
    label: "URL Encoder / Decoder",
    tagline: "Encode or decode URL percent-encoded text instantly in your browser — no upload, no signup.",
    steps: [
      { title: "Choose Encode or Decode mode", desc: "Click Encode to convert plain text to percent-encoded form, or Decode to convert percent-encoded text back to readable form." },
      { title: "Select mode and type input", desc: "Pick encodeURIComponent (default, for query params) or encodeURI (for a full URL). Type or paste your text — output updates live." },
      { title: "Copy or Swap", desc: "Click Copy to copy the output to your clipboard. Use Swap to pipe the output back as input in the opposite mode." },
    ],
    proTip: { text: "Use encodeURIComponent for query string values — it encodes & = ? # and more. Use encodeURI only when encoding a complete URL.", linkLabel: "Image to Base64", linkHref: "/dashboard/tools/image-to-base64" },
  },
  "password-generator": {
    label: "Password Generator",
    tagline: "Generate strong, random passwords using CSPRNG. Choose length, character sets, see entropy. Nothing is sent anywhere.",
    steps: [
      { title: "Set length and character sets", desc: "Use the slider (4-64 chars, default 20). Enable uppercase, lowercase, numbers and symbols. Optionally exclude ambiguous chars like l, 1, I, O, 0." },
      { title: "Check the strength meter", desc: "The entropy in bits updates live. Aim for 90+ bits (Very strong) for important accounts like email, banking or a password manager master password." },
      { title: "Copy and save", desc: "Click Copy next to any password to copy it instantly. Click Regenerate for a new one. Store it immediately in your password manager." },
    ],
    proTip: { text: "Aim for 20+ characters with all four sets enabled — that gives ~130 bits of entropy, effectively unbreakable.", linkLabel: "Hash Generator", linkHref: "/dashboard/tools/hash-generator" },
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

  // Wide tools (multi-zone layouts) need a wider header to align with their content.
  const isWideTool = slug === "color-match" || slug === "photo-enhance";
  const headerWidthClass = isWideTool ? "max-w-6xl" : "max-w-3xl";

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919]">
      {/* Tool header */}
      <div className="px-4 sm:px-6 pt-8 pb-6">
        <div className={`${headerWidthClass} mx-auto`}>
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
