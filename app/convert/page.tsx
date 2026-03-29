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
  {
    pair: "gif-to-webp",
    from: "GIF",
    to: "WebP",
    description: "Convert animated or static GIFs to smaller WebP files.",
  },
  {
    pair: "webp-to-png",
    from: "WebP",
    to: "PNG",
    description: "Convert WebP images to lossless PNG for editing or print.",
  },
  {
    pair: "avif-to-jpg",
    from: "AVIF",
    to: "JPG",
    description: "Convert next-gen AVIF images to universally-supported JPG.",
  },
  {
    pair: "tiff-to-jpg",
    from: "TIFF",
    to: "JPG",
    description: "Convert large TIFF files to lightweight JPG for sharing.",
  },
  {
    pair: "svg-to-png",
    from: "SVG",
    to: "PNG",
    description: "Rasterize SVG vector graphics into pixel-based PNG images.",
  },
  {
    pair: "bmp-to-jpg",
    from: "BMP",
    to: "JPG",
    description: "Convert legacy BMP bitmaps to compressed JPG format.",
  },
  {
    pair: "jpg-to-png",
    from: "JPG",
    to: "PNG",
    description: "Convert JPG photos to lossless PNG for editing and design.",
  },
  {
    pair: "png-to-ico",
    from: "PNG",
    to: "ICO",
    description: "Convert PNG images to ICO favicon format for websites.",
  },
  {
    pair: "webp-to-gif",
    from: "WebP",
    to: "GIF",
    description: "Convert WebP images to universally-compatible GIF format.",
  },
  {
    pair: "raw-to-jpg",
    from: "RAW",
    to: "JPG",
    description: "Convert RAW camera files (CR2, NEF, ARW) to shareable JPG.",
  },
  {
    pair: "tiff-to-png",
    from: "TIFF",
    to: "PNG",
    description: "Convert TIFF files to lossless, web-friendly PNG format.",
  },
  {
    pair: "bmp-to-png",
    from: "BMP",
    to: "PNG",
    description: "Convert uncompressed BMP bitmaps to lossless PNG.",
  },
  {
    pair: "gif-to-jpg",
    from: "GIF",
    to: "JPG",
    description: "Convert static GIF images to JPG with better colour support.",
  },
  {
    pair: "avif-to-png",
    from: "AVIF",
    to: "PNG",
    description: "Convert next-gen AVIF images to lossless, editable PNG.",
  },
  {
    pair: "heic-to-webp",
    from: "HEIC",
    to: "WebP",
    description: "Convert iPhone HEIC photos to optimized WebP for the web.",
  },
  {
    pair: "svg-to-jpg",
    from: "SVG",
    to: "JPG",
    description: "Rasterize SVG vector graphics to compact JPG images.",
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

      {/* JSON-LD BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${APP_URL}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Convert",
                item: `${APP_URL}/convert`,
              },
            ],
          }),
        }}
      />

      {/* JSON-LD CollectionPage + ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Free Image Format Converter",
            description:
              "Convert HEIC to JPG, PNG to WebP, JPG to WebP, and more. All conversions are free, browser-based, and private.",
            url: `${APP_URL}/convert`,
            publisher: {
              "@type": "Organization",
              name: APP_NAME,
              url: APP_URL,
            },
            mainEntity: {
              "@type": "ItemList",
              name: "Image Format Conversions",
              numberOfItems: CONVERSIONS.length,
              itemListElement: CONVERSIONS.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: `${c.from} to ${c.to}`,
                url: `${APP_URL}/convert/${c.pair}`,
                description: c.description,
              })),
            },
          }),
        }}
      />

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
