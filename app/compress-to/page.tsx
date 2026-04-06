import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL, APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Compress Image to Exact File Size — Free Online | ${APP_NAME}`,
  description:
    "Compress images to exact file sizes — 20KB, 50KB, 100KB, 200KB, 500KB, 1MB, 2MB and more. Free, browser-based, private. Your images never leave your device.",
  keywords: [
    "compress image to specific size",
    "reduce image size to kb",
    "image compressor to exact size",
  ],
  alternates: {
    canonical: `${APP_URL}/compress-to`,
  },
  openGraph: {
    title: `Compress Image to Exact File Size | ${APP_NAME}`,
    description:
      "Compress images to exact file sizes — 20KB, 50KB, 100KB, 200KB, 500KB, 1MB, 2MB and more. 100% browser-based — no upload, no signup, no cost.",
    type: "website",
    url: `${APP_URL}/compress-to`,
    siteName: APP_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Compress Image to Exact Size — ${APP_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Compress Image to Exact File Size — Free Online | ${APP_NAME}`,
    description:
      "Compress images to exact file sizes — 20KB, 50KB, 100KB, 200KB, 500KB, 1MB, 2MB and more. Free, browser-based, private. Your images never leave your device.",
  },
};

const SIZES = [
  { slug: "3kb", label: "3 KB", description: "Compress to 3 KB for micro-thumbnails and favicons." },
  { slug: "5kb", label: "5 KB", description: "Compress to 5 KB for email icons and tiny web assets." },
  { slug: "8kb", label: "8 KB", description: "Compress to 8 KB for small thumbnails and badges." },
  { slug: "10kb", label: "10 KB", description: "Compress to 10 KB for web thumbnails and avatars." },
  { slug: "15kb", label: "15 KB", description: "Compress to 15 KB for small product thumbnails." },
  { slug: "20kb", label: "20 KB", description: "Compress to 20 KB for exam forms and signature uploads." },
  { slug: "25kb", label: "25 KB", description: "Compress to 25 KB for government document uploads." },
  { slug: "30kb", label: "30 KB", description: "Compress to 30 KB for exam signature requirements." },
  { slug: "40kb", label: "40 KB", description: "Compress to 40 KB for application form photos." },
  { slug: "50kb", label: "50 KB", description: "Compress to 50 KB for JEE, NEET, and exam applications." },
  { slug: "100kb", label: "100 KB", description: "Compress to 100 KB for passport and ID photo uploads." },
  { slug: "200kb", label: "200 KB", description: "Compress to 200 KB for visa and government form uploads." },
  { slug: "300kb", label: "300 KB", description: "Compress to 300 KB for certificate and document scans." },
  { slug: "500kb", label: "500 KB", description: "Compress to 500 KB for high-quality web images." },
  { slug: "1mb", label: "1 MB", description: "Compress to 1 MB for email attachments and sharing." },
  { slug: "2mb", label: "2 MB", description: "Compress to 2 MB for LMS uploads and presentations." },
];

export default function CompressToIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#A3A3A3] mb-10">
        <Link href="/" className="hover:text-[#525252] transition-colors">
          {APP_NAME}
        </Link>
        <span>/</span>
        <span className="text-[#525252]">Compress To</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-3">
        Compress Image to Exact File Size
      </h1>
      <p className="text-sm text-[#737373] leading-relaxed mb-10">
        Compress images to exact file sizes for free. All processing happens inside your browser — your images never leave your device.
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
                name: "Compress To",
                item: `${APP_URL}/compress-to`,
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
            name: "Compress Image to Exact File Size",
            description:
              "Compress images to exact file sizes — 20KB, 50KB, 100KB, 200KB, 500KB, 1MB, 2MB and more. Free, browser-based, private.",
            url: `${APP_URL}/compress-to`,
            publisher: {
              "@type": "Organization",
              name: APP_NAME,
              url: APP_URL,
            },
            mainEntity: {
              "@type": "ItemList",
              name: "Image Compression Sizes",
              numberOfItems: SIZES.length,
              itemListElement: SIZES.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: `Compress to ${s.label}`,
                url: `${APP_URL}/compress-to/${s.slug}`,
                description: s.description,
              })),
            },
          }),
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SIZES.map(({ slug, label, description }) => (
          <Link
            key={slug}
            href={`/compress-to/${slug}`}
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
            { name: "Resize for platforms", href: "/resize" },
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
