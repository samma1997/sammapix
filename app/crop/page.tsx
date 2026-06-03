import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL, APP_NAME } from "@/lib/constants";
import { getAllRatios } from "@/lib/crop-ratios";

export const metadata: Metadata = {
  title: `Crop Image to Any Aspect Ratio — Free Online | ${APP_NAME}`,
  description:
    "Crop images to exact aspect ratios — 16:9, 9:16, 1:1, 4:5, 3:2, 4:3, 21:9, A4 and more. Free, browser-based, private. Your images never leave your device.",
  keywords: [
    "crop image to aspect ratio",
    "aspect ratio cropper",
    "crop image online free",
  ],
  alternates: {
    canonical: `${APP_URL}/crop`,
  },
  openGraph: {
    title: `Crop Image to Any Aspect Ratio | ${APP_NAME}`,
    description:
      "Crop images to exact aspect ratios — 16:9, 9:16, 1:1, 4:5, 3:2, 4:3, 21:9, A4 and more. 100% browser-based — no upload, no signup, no cost.",
    type: "website",
    url: `${APP_URL}/crop`,
    siteName: APP_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Crop Image to Any Aspect Ratio — ${APP_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Crop Image to Any Aspect Ratio — Free Online | ${APP_NAME}`,
    description:
      "Crop images to exact aspect ratios — 16:9, 9:16, 1:1, 4:5, 3:2, 4:3, 21:9, A4 and more. Free, browser-based, private.",
  },
};

const BLURBS: Record<string, string> = {
  "16-9": "Crop to 16:9 for YouTube thumbnails, video, and widescreen.",
  "9-16": "Crop to 9:16 for Reels, Stories, TikTok, and Shorts.",
  "1-1": "Crop to 1:1 square for Instagram posts and profile pictures.",
  "4-5": "Crop to 4:5 for tall Instagram portrait feed posts.",
  "3-2": "Crop to 3:2 for DSLR photography and 4×6 prints.",
  "2-3": "Crop to 2:3 for Pinterest pins and portrait prints.",
  "4-3": "Crop to 4:3 for classic photos, iPads, and slides.",
  "3-4": "Crop to 3:4 for mobile portraits and product photos.",
  "5-4": "Crop to 5:4 for 8×10 framed photo prints.",
  "21-9": "Crop to 21:9 for cinematic shots and ultrawide wallpapers.",
  "2-1": "Crop to 2:1 for X (Twitter) cards and web banners.",
  a4: "Crop to A4 for printable flyers, documents, and posters.",
};

const RATIOS = getAllRatios().map((r) => ({
  slug: r.slug,
  label: r.ratioLabel,
  description: BLURBS[r.slug] ?? `Crop your image to a ${r.ratioLabel} aspect ratio.`,
}));

export default function CropIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#A3A3A3] mb-10">
        <Link href="/" className="hover:text-[#525252] transition-colors">
          {APP_NAME}
        </Link>
        <span>/</span>
        <span className="text-[#525252]">Crop</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-3">
        Crop Image to Any Aspect Ratio
      </h1>
      <p className="text-sm text-[#737373] leading-relaxed mb-10">
        Crop images to exact aspect ratios for free. All processing happens inside your browser — your images never leave your device.
      </p>

      {/* JSON-LD BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${APP_URL}` },
              { "@type": "ListItem", position: 2, name: "Crop", item: `${APP_URL}/crop` },
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
            name: "Crop Image to Any Aspect Ratio",
            description:
              "Crop images to exact aspect ratios — 16:9, 9:16, 1:1, 4:5, 3:2, 4:3, 21:9, A4 and more. Free, browser-based, private.",
            url: `${APP_URL}/crop`,
            publisher: {
              "@type": "Organization",
              name: APP_NAME,
              url: APP_URL,
            },
            mainEntity: {
              "@type": "ItemList",
              name: "Crop Aspect Ratios",
              numberOfItems: RATIOS.length,
              itemListElement: RATIOS.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: `Crop to ${s.label}`,
                url: `${APP_URL}/crop/${s.slug}`,
                description: s.description,
              })),
            },
          }),
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {RATIOS.map(({ slug, label, description }) => (
          <Link
            key={slug}
            href={`/crop/${slug}`}
            className="group p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#191919] hover:bg-[#FAFAFA] dark:hover:bg-[#1F1F1F] transition-colors"
          >
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                {label}
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

      {/* ── Explore more ── */}
      <div className="mt-12 pt-8 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">Explore more</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "Compress to exact size", href: "/compress-to" },
            { name: "Resize for platforms", href: "/resize" },
            { name: "Convert formats", href: "/convert" },
            { name: "Crop tool", href: "/tools/croproatio" },
            { name: "Image size guides", href: "/image-size" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              {l.name} <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
