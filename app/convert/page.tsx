import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL, APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Free Image Format Converter - Convert Any Format | ${APP_NAME}`,
  description:
    "Convert HEIC to JPG, PNG to WebP, JPG to WebP, and more. All conversions are free, browser-based, and private- your images never leave your device.",
  keywords: [
    "image converter online free",
    "heic to jpg",
    "png to webp",
    "jpg to webp",
    "webp to jpg",
    "image format converter",
    "free online image conversion",
  ],
  alternates: {
    canonical: `${APP_URL}/convert`,
  },
  openGraph: {
    title: `Free Image Format Converter | ${APP_NAME}`,
    description:
      "Convert HEIC to JPG, PNG to WebP, JPG to WebP and more. 100 % browser-based- no upload, no signup, no cost.",
    type: "website",
    url: `${APP_URL}/convert`,
    siteName: APP_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Image Format Converter- ${APP_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Image Format Converter - Convert Any Format | ${APP_NAME}`,
    description:
      "Convert HEIC to JPG, PNG to WebP, JPG to WebP, and more. All conversions are free, browser-based, and private- your images never leave your device.",
  },
};

const CONVERSIONS = [
  {
    pair: "heic-to-jpg",
    from: "HEIC",
    to: "JPG",
    description: "Convert iPhone photos to universally-compatible JPG.",
  },
  {
    pair: "heic-to-png",
    from: "HEIC",
    to: "PNG",
    description: "Convert iPhone HEIC photos to lossless PNG.",
  },
  {
    pair: "png-to-webp",
    from: "PNG",
    to: "WebP",
    description: "Shrink PNG files by up to 80 % with WebP.",
  },
  {
    pair: "jpg-to-webp",
    from: "JPG",
    to: "WebP",
    description: "Cut JPG file size by 25–35 % with WebP.",
  },
  {
    pair: "jpeg-to-webp",
    from: "JPEG",
    to: "WebP",
    description: "Convert JPEG to WebP for faster web delivery.",
  },
  {
    pair: "webp-to-jpg",
    from: "WebP",
    to: "JPG",
    description: "Convert WebP back to JPG for maximum compatibility.",
  },
  {
    pair: "png-to-jpg",
    from: "PNG",
    to: "JPG",
    description: "Reduce PNG file size by 60–80 % by converting to JPG.",
  },
];

export default function ConvertIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#A3A3A3] mb-10">
        <Link href="/" className="hover:text-[#525252] transition-colors">
          {APP_NAME}
        </Link>
        <span>/</span>
        <span className="text-[#525252]">Convert</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-3">
        Free Image Format Converter
      </h1>
      <p className="text-sm text-[#737373] leading-relaxed mb-10">
        Convert between image formats for free. All processing happens inside your browser- your images never leave your device.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CONVERSIONS.map(({ pair, from, to, description }) => (
          <Link
            key={pair}
            href={`/convert/${pair}`}
            className="group p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#191919] hover:bg-[#FAFAFA] dark:hover:bg-[#1F1F1F] transition-colors"
          >
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                {from} → {to}
              </p>
              <ArrowRight
                className="h-3.5 w-3.5 text-[#A3A3A3] group-hover:text-[#525252] dark:group-hover:text-[#A3A3A3] transition-colors"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-xs text-[#737373] leading-relaxed">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
