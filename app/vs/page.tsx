import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, ExternalLink } from "lucide-react";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "SammaPix vs Competitors: Honest Free Image Tool Comparisons | SammaPix",
  description:
    "See how SammaPix compares to TinyPNG, Squoosh, Canva, iLoveIMG, and 8 other image tools. Unbiased feature-by-feature comparisons with privacy, speed, and quality analysis.",
  alternates: { canonical: `${APP_URL}/vs` },
  keywords: [
    "tinypng alternative",
    "squoosh alternative",
    "free image compressor comparison",
    "best image optimizer",
    "sammapix vs",
  ],
  openGraph: {
    title: "SammaPix vs Competitors: Honest Comparisons",
    description:
      "Feature-by-feature comparisons of SammaPix against 12 popular image tools.",
    url: `${APP_URL}/vs`,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix" }],
  },
};

const competitors = [
  {
    slug: "tinypng",
    name: "TinyPNG",
    tagline: "The most popular image compressor",
    highlight:
      "SammaPix processes locally - TinyPNG uploads to their servers",
    category: "Compression",
  },
  {
    slug: "squoosh",
    name: "Squoosh",
    tagline: "Google's image optimizer",
    highlight:
      "SammaPix handles batch processing - Squoosh is single-file only",
    category: "Compression",
  },
  {
    slug: "canva",
    name: "Canva",
    tagline: "Design platform with compression",
    highlight:
      "SammaPix is purpose-built for optimization- no account needed",
    category: "Design",
  },
  {
    slug: "shortpixel",
    name: "ShortPixel",
    tagline: "WordPress image optimizer",
    highlight:
      "SammaPix is free with no monthly limits - ShortPixel charges per image",
    category: "Compression",
  },
  {
    slug: "photopea",
    name: "Photopea",
    tagline: "Free Photoshop alternative",
    highlight:
      "SammaPix focuses on batch optimization - Photopea is a full editor",
    category: "Editor",
  },
  {
    slug: "optimizilla",
    name: "Optimizilla",
    tagline: "Online image compressor",
    highlight:
      "SammaPix supports 20 tools - Optimizilla only compresses",
    category: "Compression",
  },
  {
    slug: "birme",
    name: "BIRME",
    tagline: "Bulk image resizer",
    highlight:
      "SammaPix adds AI rename, EXIF strip, and more - BIRME only resizes",
    category: "Resize",
  },
  {
    slug: "compressor-io",
    name: "Compressor.io",
    tagline: "Lossy and lossless compression",
    highlight:
      "SammaPix never uploads your files - Compressor.io requires server upload",
    category: "Compression",
  },
  {
    slug: "iloveimg",
    name: "iLoveIMG",
    tagline: "All-in-one image tool suite",
    highlight:
      "SammaPix is 100% browser-based- iLoveIMG uploads to servers",
    category: "Suite",
  },
  {
    slug: "imageoptim",
    name: "ImageOptim",
    tagline: "Mac-only image optimizer",
    highlight:
      "SammaPix works on any device - ImageOptim is Mac-only",
    category: "Desktop",
  },
  {
    slug: "filterpixel",
    name: "FilterPixel",
    tagline: "AI photo culling tool",
    highlight:
      "SammaPix culling is free and private - FilterPixel requires upload and payment",
    category: "AI / Culling",
  },
  {
    slug: "vsco",
    name: "VSCO",
    tagline: "Photo editing and filters",
    highlight:
      "SammaPix Film Filters is free - VSCO requires subscription for premium filters",
    category: "Filters",
  },
];

// Summary table data- rows are features, columns are tools
type FeatureValue = boolean | string;

interface SummaryRow {
  feature: string;
  sammapix: FeatureValue;
  tinypng: FeatureValue;
  squoosh: FeatureValue;
  iloveimg: FeatureValue;
  canva: FeatureValue;
}

const summaryRows: SummaryRow[] = [
  {
    feature: "Client-side processing",
    sammapix: true,
    tinypng: false,
    squoosh: true,
    iloveimg: false,
    canva: false,
  },
  {
    feature: "Batch support",
    sammapix: true,
    tinypng: true,
    squoosh: false,
    iloveimg: true,
    canva: "Limited",
  },
  {
    feature: "Free tier limits",
    sammapix: "Unlimited",
    tinypng: "20/month",
    squoosh: "Unlimited",
    iloveimg: "20 files",
    canva: "Limited",
  },
  {
    feature: "Privacy (no upload)",
    sammapix: true,
    tinypng: false,
    squoosh: true,
    iloveimg: false,
    canva: false,
  },
  {
    feature: "Number of tools",
    sammapix: "20",
    tinypng: "1",
    squoosh: "1",
    iloveimg: "10+",
    canva: "20+",
  },
];

function CheckCell({ value }: { value: FeatureValue }) {
  if (value === true)
    return <Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} />;
  if (value === false)
    return <X className="h-4 w-4 text-gray-300 dark:text-gray-600 mx-auto" strokeWidth={2} />;
  return (
    <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
      {value}
    </span>
  );
}

export default function VsHubPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 mb-10">
        <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          SammaPix
        </Link>
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300">Comparisons</span>
      </nav>

      {/* Page header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs text-gray-500 dark:text-gray-400 font-medium mb-6">
          Honest comparison- no sponsored ranking
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-[#E5E5E5] tracking-tight mb-4 leading-tight">
          SammaPix vs Competitors
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
          We believe in transparency. Here&apos;s how SammaPix stacks up against 12
          popular image tools- no marketing spin, just facts.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/tools">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
              Try SammaPix free
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </Link>
          <Link href="/blog">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-transparent text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Read our blog
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </Link>
        </div>
      </div>

      {/* Competitors grid */}
      <section aria-labelledby="comparisons-heading" className="mb-16">
        <h2
          id="comparisons-heading"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2"
        >
          All 12 comparisons
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Each page includes a full feature table, key differences, and an honest verdict.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {competitors.map((c) => (
            <Link
              key={c.slug}
              href={`/vs/${c.slug}`}
              className="group block p-5 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-[#1f1f1f] hover:bg-gray-50 dark:hover:bg-[#252525] hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-150"
            >
              {/* Category badge */}
              <span className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-[10px] font-medium uppercase tracking-widest rounded mb-3">
                {c.category}
              </span>

              {/* Title row */}
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] leading-snug">
                  SammaPix vs {c.name}
                </h3>
                <ArrowRight
                  className="h-4 w-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 shrink-0 mt-0.5 transition-colors"
                  strokeWidth={1.5}
                />
              </div>

              {/* Competitor tagline */}
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
                {c.tagline}
              </p>

              {/* Key differentiator */}
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700/60 pt-3">
                {c.highlight}
              </p>

              {/* Read link */}
              <span className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-indigo-600 dark:text-indigo-400 group-hover:underline">
                Read comparison
                <ArrowRight className="h-3 w-3" strokeWidth={2} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Summary comparison table */}
      <section aria-labelledby="summary-table-heading" className="mb-16">
        <h2
          id="summary-table-heading"
          className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2"
        >
          Quick feature overview
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          A high-level look at how the five most-compared tools stack up on the features that matter most.
        </p>

        <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 dark:bg-[#252525] border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-gray-400 w-[34%]">
                    Feature
                  </th>
                  <th className="text-center px-3 py-3 font-semibold text-gray-900 dark:text-[#E5E5E5] w-[13%]">
                    SammaPix
                  </th>
                  <th className="text-center px-3 py-3 font-medium text-gray-500 dark:text-gray-400 w-[13%]">
                    <Link href="/vs/tinypng" className="hover:underline">
                      TinyPNG
                    </Link>
                  </th>
                  <th className="text-center px-3 py-3 font-medium text-gray-500 dark:text-gray-400 w-[13%]">
                    <Link href="/vs/squoosh" className="hover:underline">
                      Squoosh
                    </Link>
                  </th>
                  <th className="text-center px-3 py-3 font-medium text-gray-500 dark:text-gray-400 w-[13%]">
                    <Link href="/vs/iloveimg" className="hover:underline">
                      iLoveIMG
                    </Link>
                  </th>
                  <th className="text-center px-3 py-3 font-medium text-gray-500 dark:text-gray-400 w-[14%]">
                    <Link href="/vs/canva" className="hover:underline">
                      Canva
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {summaryRows.map((row, i) => (
                  <tr
                    key={i}
                    className={
                      i % 2 === 0
                        ? "bg-white dark:bg-[#1f1f1f]"
                        : "bg-gray-50/50 dark:bg-[#222222]"
                    }
                  >
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 font-medium">
                      {row.feature}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <CheckCell value={row.sammapix} />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <CheckCell value={row.tinypng} />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <CheckCell value={row.squoosh} />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <CheckCell value={row.iloveimg} />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <CheckCell value={row.canva} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
          Data accurate as of March 2026. We update these comparisons regularly.{" "}
          <Link
            href="/blog"
            className="underline hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            See our blog for in-depth guides.
          </Link>
        </p>
      </section>

      {/* Bottom CTA */}
      <section className="border border-gray-200 dark:border-gray-700 rounded-md p-8 sm:p-10 text-center bg-gray-50 dark:bg-[#1f1f1f]">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
          Ready to try the alternative?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
          20 free tools. No signup for core features. 100% browser-based.
          Your images never leave your device.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/tools">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
              Explore all 20 tools
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </Link>
          <Link href="/blog">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-transparent text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Read optimization guides
            </button>
          </Link>
        </div>
      </section>

      {/* JSON-LD - BreadcrumbList */}
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
                name: "Comparisons",
                item: `${APP_URL}/vs`,
              },
            ],
          }),
        }}
      />

      {/* JSON-LD - WebPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "SammaPix vs Competitors - Honest Image Tool Comparisons",
            description:
              "Feature-by-feature comparisons of SammaPix against 12 popular image tools including TinyPNG, Squoosh, Canva, iLoveIMG, ShortPixel, and more.",
            url: `${APP_URL}/vs`,
            publisher: {
              "@type": "Organization",
              name: "SammaPix",
              url: APP_URL,
            },
            mainEntity: {
              "@type": "ItemList",
              name: "SammaPix Competitor Comparisons",
              numberOfItems: 12,
              itemListElement: competitors.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: `SammaPix vs ${c.name}`,
                url: `${APP_URL}/vs/${c.slug}`,
                description: c.highlight,
              })),
            },
          }),
        }}
      />
    </div>
  );
}
