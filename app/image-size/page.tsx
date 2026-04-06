import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL, APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Image Size Guide for Ads & Social Media — Free Tools | ${APP_NAME}`,
  description:
    "Exact image dimensions for LinkedIn, Facebook, Google Ads, Pinterest, and more. Free resize tools included.",
  keywords: [
    "image size for ads",
    "social media image dimensions",
    "ad creative size guide",
  ],
  alternates: {
    canonical: `${APP_URL}/image-size`,
  },
  openGraph: {
    title: `Image Size Guide for Ads & Social Media | ${APP_NAME}`,
    description:
      "Exact image dimensions for LinkedIn, Facebook, Google Ads, Pinterest, and more. Free resize tools included.",
    type: "website",
    url: `${APP_URL}/image-size`,
    siteName: APP_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Image Size Guide — ${APP_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Image Size Guide for Ads & Social Media — Free Tools | ${APP_NAME}`,
    description:
      "Exact image dimensions for LinkedIn, Facebook, Google Ads, Pinterest, and more. Free resize tools included.",
  },
};

const GUIDES = [
  { slug: "linkedin-post", label: "LinkedIn Post", description: "Exact image sizes for LinkedIn posts and articles." },
  { slug: "facebook-ad", label: "Facebook Ad", description: "Image dimensions for Facebook ad creatives." },
  { slug: "google-ads", label: "Google Ads", description: "Image sizes for Google Ads and Performance Max." },
  { slug: "pinterest-pin", label: "Pinterest Pin", description: "Optimal dimensions for Pinterest pins." },
  { slug: "twitter-post", label: "Twitter/X Post", description: "Image sizes for Twitter/X posts and cards." },
  { slug: "youtube-channel", label: "YouTube Channel", description: "Image sizes for YouTube banners and thumbnails." },
  { slug: "tiktok-ad", label: "TikTok Ad", description: "Image dimensions for TikTok ad creatives." },
  { slug: "instagram-ad", label: "Instagram Ad", description: "Image sizes for Instagram ad placements." },
];

export default function ImageSizeIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#A3A3A3] mb-10">
        <Link href="/" className="hover:text-[#525252] transition-colors">
          {APP_NAME}
        </Link>
        <span>/</span>
        <span className="text-[#525252]">Image Size</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-3">
        Image Size Guide for Ads & Social Media
      </h1>
      <p className="text-sm text-[#737373] leading-relaxed mb-10">
        Find the exact image dimensions for every ad platform and social network. Free resize tools included with every guide.
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
                name: "Image Size",
                item: `${APP_URL}/image-size`,
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
            name: "Image Size Guide for Ads & Social Media",
            description:
              "Exact image dimensions for LinkedIn, Facebook, Google Ads, Pinterest, and more. Free resize tools included.",
            url: `${APP_URL}/image-size`,
            publisher: {
              "@type": "Organization",
              name: APP_NAME,
              url: APP_URL,
            },
            mainEntity: {
              "@type": "ItemList",
              name: "Image Size Guides",
              numberOfItems: GUIDES.length,
              itemListElement: GUIDES.map((g, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: `${g.label} Image Size`,
                url: `${APP_URL}/image-size/${g.slug}`,
                description: g.description,
              })),
            },
          }),
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {GUIDES.map(({ slug, label, description }) => (
          <Link
            key={slug}
            href={`/image-size/${slug}`}
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
    </div>
  );
}
