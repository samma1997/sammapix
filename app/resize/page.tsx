import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL, APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Resize Images for Every Platform — Free Online | ${APP_NAME}`,
  description:
    "Resize images for Instagram, Facebook, YouTube, LinkedIn, and 20+ platforms. Free, instant, browser-based.",
  keywords: [
    "resize image for social media",
    "image resizer for instagram",
    "resize photo for facebook",
  ],
  alternates: {
    canonical: `${APP_URL}/resize`,
  },
  openGraph: {
    title: `Resize Images for Every Platform | ${APP_NAME}`,
    description:
      "Resize images for Instagram, Facebook, YouTube, LinkedIn, and 20+ platforms. 100% browser-based — no upload, no signup, no cost.",
    type: "website",
    url: `${APP_URL}/resize`,
    siteName: APP_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Resize Images for Every Platform — ${APP_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Resize Images for Every Platform — Free Online | ${APP_NAME}`,
    description:
      "Resize images for Instagram, Facebook, YouTube, LinkedIn, and 20+ platforms. Free, instant, browser-based.",
  },
};

const PLATFORMS = [
  { slug: "instagram", label: "Instagram", description: "Resize for Instagram posts, stories, reels, and profile." },
  { slug: "facebook", label: "Facebook", description: "Resize for Facebook posts, cover, profile, and ads." },
  { slug: "twitter", label: "Twitter / X", description: "Resize for Twitter posts, header, and profile." },
  { slug: "linkedin", label: "LinkedIn", description: "Resize for LinkedIn posts, banner, and profile." },
  { slug: "youtube-thumbnail", label: "YouTube", description: "Resize for YouTube thumbnails, channel art, and banners." },
  { slug: "pinterest", label: "Pinterest", description: "Resize for Pinterest pins and board covers." },
  { slug: "tiktok", label: "TikTok", description: "Resize for TikTok posts, profile, and ads." },
  { slug: "discord", label: "Discord", description: "Resize for Discord avatars, server icons, and emojis." },
  { slug: "slack", label: "Slack", description: "Resize for Slack profile and workspace icons." },
  { slug: "twitch", label: "Twitch", description: "Resize for Twitch banners, panels, and profile." },
  { slug: "telegram", label: "Telegram", description: "Resize for Telegram stickers and profile photos." },
  { slug: "threads", label: "Threads", description: "Resize for Threads posts and profile." },
  { slug: "mastodon", label: "Mastodon", description: "Resize for Mastodon posts and profile." },
  { slug: "snapchat", label: "Snapchat", description: "Resize for Snapchat ads and profile." },
  { slug: "whatsapp", label: "WhatsApp", description: "Resize for WhatsApp profile and status." },
  { slug: "email-header", label: "Email Header", description: "Resize for email newsletter headers and banners." },
  { slug: "ebay", label: "eBay", description: "Resize for eBay product listings." },
  { slug: "amazon", label: "Amazon", description: "Resize for Amazon product images." },
  { slug: "shopify-product", label: "Shopify Product", description: "Resize for Shopify product listings." },
  { slug: "etsy-listing", label: "Etsy Listing", description: "Resize for Etsy product listings." },
  { slug: "blog-header", label: "Blog Header", description: "Resize for blog post hero images." },
  { slug: "passport", label: "Passport Photo", description: "Resize for passport photos worldwide." },
  { slug: "visa", label: "Visa Photo", description: "Resize for visa application photos." },
];

export default function ResizeIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#A3A3A3] mb-10">
        <Link href="/" className="hover:text-[#525252] transition-colors">
          {APP_NAME}
        </Link>
        <span>/</span>
        <span className="text-[#525252]">Resize</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-3">
        Resize Images for Every Platform
      </h1>
      <p className="text-sm text-[#737373] leading-relaxed mb-10">
        Resize images for social media, e-commerce, and documents. All processing happens inside your browser — your images never leave your device.
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
                name: "Resize",
                item: `${APP_URL}/resize`,
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
            name: "Resize Images for Every Platform",
            description:
              "Resize images for Instagram, Facebook, YouTube, LinkedIn, and 20+ platforms. Free, instant, browser-based.",
            url: `${APP_URL}/resize`,
            publisher: {
              "@type": "Organization",
              name: APP_NAME,
              url: APP_URL,
            },
            mainEntity: {
              "@type": "ItemList",
              name: "Image Resize Platforms",
              numberOfItems: PLATFORMS.length,
              itemListElement: PLATFORMS.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: `Resize for ${p.label}`,
                url: `${APP_URL}/resize/${p.slug}`,
                description: p.description,
              })),
            },
          }),
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PLATFORMS.map(({ slug, label, description }) => (
          <Link
            key={slug}
            href={`/resize/${slug}`}
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
            { name: "Compress to size", href: "/compress-to" },
            { name: "Convert formats", href: "/convert" },
            { name: "Optimize for CMS", href: "/optimize-for" },
            { name: "Image size guides", href: "/image-size" },
            { name: "Passport photos", href: "/passport-photo" },
          ].map(l => (
            <Link key={l.href} href={l.href} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              {l.name} <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
