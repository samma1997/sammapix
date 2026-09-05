import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { getAllRatios, namedSizes, ratioDecimal } from "@/lib/aspect-ratios";
import { APP_URL } from "@/lib/constants";
import AspectRatioClient from "@/components/tools/AspectRatioClient";

export const metadata: Metadata = {
  title: "Aspect Ratio in Pixels: Sizes for 16:9, 9:16, 4:3, 1:1 & Calculator",
  description:
    "Look up any aspect ratio in pixels — 16:9, 9:16, 4:3, 1:1, 4:5, 3:2, 21:9, A4 and more. Exact sizes, full pixel tables, and a free ratio-to-pixels calculator. No signup.",
  alternates: { canonical: `${APP_URL}/aspect-ratio` },
  keywords: [
    "aspect ratio in pixels",
    "aspect ratio calculator",
    "16:9 in pixels",
    "9:16 in pixels",
    "4:3 in pixels",
    "1:1 in pixels",
    "aspect ratio sizes",
    "ratio to pixels",
  ],
  openGraph: {
    title: "Aspect Ratio in Pixels — Sizes & Free Calculator",
    description:
      "Exact pixel sizes for every common aspect ratio, plus a free ratio-to-pixels calculator.",
    url: `${APP_URL}/aspect-ratio`,
    siteName: "SammaPix",
    type: "website",
  },
};

const itemListSchema = (ratios: ReturnType<typeof getAllRatios>) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Aspect ratios in pixels",
  numberOfItems: ratios.length,
  itemListElement: ratios.map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${r.ratioLabel} in pixels`,
    url: `${APP_URL}/aspect-ratio/${r.slug}`,
  })),
});

export default function AspectRatioIndexPage() {
  const ratios = getAllRatios();

  return (
    <main className="min-h-screen bg-white dark:bg-[#191919]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema(ratios)) }}
      />

      {/* Hero */}
      <section className="px-4 sm:px-6 pt-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Aspect Ratio in Pixels
          </h1>
          <p className="text-sm text-[#737373] leading-relaxed mb-6 max-w-xl">
            Every common aspect ratio, with its exact pixel sizes and a free calculator.
            Pick a ratio to see its full dimensions table, or convert any ratio to pixels below.
          </p>
          <a
            href="#calculator"
            className="inline-flex items-center gap-2 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md px-4 py-2 text-sm font-medium hover:bg-[#262626] dark:hover:bg-white transition-colors"
          >
            <Calculator className="h-3.5 w-3.5" strokeWidth={1.5} />
            Ratio to pixels calculator
          </a>
        </div>
      </section>

      {/* Ratio grid */}
      <section className="px-4 sm:px-6 py-8 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ratios.map((r) => {
              const primary = namedSizes(r.slug)[0]?.px;
              return (
                <Link
                  key={r.slug}
                  href={`/aspect-ratio/${r.slug}`}
                  className="group flex items-center justify-between p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] dark:hover:border-[#404040] transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
                      {r.ratioLabel}{" "}
                      <span className="text-[#A3A3A3] font-normal">({ratioDecimal(r.aspectW, r.aspectH)}:1)</span>
                    </p>
                    <p className="text-xs text-[#A3A3A3] mt-0.5 font-mono">
                      {primary ? `${primary} px` : "in pixels"}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#A3A3A3] group-hover:text-[#525252] transition-colors" strokeWidth={1.5} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-0 mb-1">
            Aspect ratio calculator
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-6">
            Convert any ratio to pixel dimensions, pixels back to a ratio, or resize while keeping
            the ratio locked.
          </p>
        </div>
        <AspectRatioClient />
      </section>

      {/* More tools */}
      <section className="px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">More tools</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/crop" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#6366F1]/30 dark:border-[#6366F1]/20 rounded-md text-[#6366F1] hover:bg-[#6366F1]/5 bg-white dark:bg-[#1E1E1E] transition-colors">
              Crop to any ratio
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/resize/instagram" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Resize for platforms
            </Link>
            <Link href="/compress-to" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to exact size
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
