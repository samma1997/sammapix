import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL, APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Optimize Images for Every Platform — Free Online | ${APP_NAME}`,
  description:
    "Optimize images for Shopify, WordPress, Wix, Etsy, and more. Reduce file size, convert to WebP, resize to exact platform requirements.",
  keywords: [
    "optimize images for shopify",
    "image optimization wordpress",
    "optimize photos for etsy",
  ],
  alternates: {
    canonical: `${APP_URL}/optimize-for`,
  },
  openGraph: {
    title: `Optimize Images for Every Platform | ${APP_NAME}`,
    description:
      "Optimize images for Shopify, WordPress, Wix, Etsy, and more. 100% browser-based — no upload, no signup, no cost.",
    type: "website",
    url: `${APP_URL}/optimize-for`,
    siteName: APP_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Optimize Images for Every Platform — ${APP_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Optimize Images for Every Platform — Free Online | ${APP_NAME}`,
    description:
      "Optimize images for Shopify, WordPress, Wix, Etsy, and more. Reduce file size, convert to WebP, resize to exact platform requirements.",
  },
};

const PLATFORMS = [
  { slug: "shopify", label: "Shopify", description: "Optimize product images for Shopify stores." },
  { slug: "wordpress", label: "WordPress", description: "Optimize images for faster WordPress page load." },
  { slug: "wix", label: "Wix", description: "Optimize images for Wix websites and portfolios." },
  { slug: "etsy", label: "Etsy", description: "Optimize listing photos for Etsy marketplace." },
  { slug: "webflow", label: "Webflow", description: "Optimize images for Webflow projects." },
  { slug: "squarespace", label: "Squarespace", description: "Optimize images for Squarespace websites." },
  { slug: "ghost", label: "Ghost", description: "Optimize images for Ghost blog posts." },
  { slug: "magento", label: "Magento", description: "Optimize product images for Magento e-commerce." },
  { slug: "hubspot", label: "HubSpot", description: "Optimize images for HubSpot landing pages." },
  { slug: "notion", label: "Notion", description: "Optimize images for Notion pages and databases." },
];

export default function OptimizeForIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#A3A3A3] mb-10">
        <Link href="/" className="hover:text-[#525252] transition-colors">
          {APP_NAME}
        </Link>
        <span>/</span>
        <span className="text-[#525252]">Optimize For</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-3">
        Optimize Images for Every Platform
      </h1>
      <p className="text-sm text-[#737373] leading-relaxed mb-10">
        Optimize images for your favourite platform. Reduce file size, convert to WebP, resize to exact requirements — all inside your browser.
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
                name: "Optimize For",
                item: `${APP_URL}/optimize-for`,
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
            name: "Optimize Images for Every Platform",
            description:
              "Optimize images for Shopify, WordPress, Wix, Etsy, and more. Reduce file size, convert to WebP, resize to exact platform requirements.",
            url: `${APP_URL}/optimize-for`,
            publisher: {
              "@type": "Organization",
              name: APP_NAME,
              url: APP_URL,
            },
            mainEntity: {
              "@type": "ItemList",
              name: "Image Optimization Platforms",
              numberOfItems: PLATFORMS.length,
              itemListElement: PLATFORMS.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: `Optimize for ${p.label}`,
                url: `${APP_URL}/optimize-for/${p.slug}`,
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
            href={`/optimize-for/${slug}`}
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
            { name: "Resize for platforms", href: "/resize" },
            { name: "Convert formats", href: "/convert" },
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
