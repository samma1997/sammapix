import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL, APP_NAME } from "@/lib/constants";
import { PASSPORT_PRESETS } from "@/lib/passport-presets";

export const metadata: Metadata = {
  title: `Free Passport Photo Maker — 140+ Countries | ${APP_NAME}`,
  description:
    "Create passport and visa photos for 140+ countries. AI background removal, exact size compliance, 100% browser-based. Free, no signup.",
  keywords: [
    "passport photo maker free",
    "passport photo online",
    "visa photo generator",
  ],
  alternates: {
    canonical: `${APP_URL}/passport-photo`,
  },
  openGraph: {
    title: `Free Passport Photo Maker — 140+ Countries | ${APP_NAME}`,
    description:
      "Create passport and visa photos for 140+ countries. AI background removal, exact size compliance, 100% browser-based. Free, no signup.",
    type: "website",
    url: `${APP_URL}/passport-photo`,
    siteName: APP_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Passport Photo Maker — ${APP_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Passport Photo Maker — 140+ Countries | ${APP_NAME}`,
    description:
      "Create passport and visa photos for 140+ countries. AI background removal, exact size compliance, 100% browser-based. Free, no signup.",
  },
};

export default function PassportPhotoIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#A3A3A3] mb-10">
        <Link href="/" className="hover:text-[#525252] transition-colors">
          {APP_NAME}
        </Link>
        <span>/</span>
        <span className="text-[#525252]">Passport Photo</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-3">
        Free Passport Photo Maker — {PASSPORT_PRESETS.length}+ Countries
      </h1>
      <p className="text-sm text-[#737373] leading-relaxed mb-10">
        Create passport and visa photos for {PASSPORT_PRESETS.length}+ countries. AI background removal, exact size compliance — all inside your browser.
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
                name: "Passport Photo",
                item: `${APP_URL}/passport-photo`,
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
            name: `Free Passport Photo Maker — ${PASSPORT_PRESETS.length}+ Countries`,
            description:
              "Create passport and visa photos for 140+ countries. AI background removal, exact size compliance, 100% browser-based.",
            url: `${APP_URL}/passport-photo`,
            publisher: {
              "@type": "Organization",
              name: APP_NAME,
              url: APP_URL,
            },
            mainEntity: {
              "@type": "ItemList",
              name: "Passport Photo Countries",
              numberOfItems: PASSPORT_PRESETS.length,
              itemListElement: PASSPORT_PRESETS.map((preset, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: preset.label,
                url: `${APP_URL}/passport-photo/${preset.country}`,
                description: preset.description,
              })),
            },
          }),
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PASSPORT_PRESETS.map((preset) => (
          <Link
            key={preset.country}
            href={`/passport-photo/${preset.country}`}
            className="group p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#191919] hover:bg-[#FAFAFA] dark:hover:bg-[#1F1F1F] transition-colors"
          >
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                {preset.flag} {preset.label}
              </p>
              <ArrowRight
                className="h-3.5 w-3.5 text-[#A3A3A3] group-hover:text-[#525252] dark:group-hover:text-[#A3A3A3] transition-colors"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-xs text-[#737373] leading-relaxed">{preset.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
