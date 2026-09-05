import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Crop, Calculator, Ruler } from "lucide-react";
import {
  getAllRatios,
  getRatio,
  getAspectCanonical,
  namedSizes,
  pixelRows,
  ratioDecimal,
} from "@/lib/aspect-ratios";
import { APP_URL } from "@/lib/constants";
import AspectRatioClient from "@/components/tools/AspectRatioClient";

// ─── Static params ─────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllRatios().map((r) => ({ ratio: r.slug }));
}

// ─── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ratio: string }>;
}): Promise<Metadata> {
  const { ratio: slug } = await params;
  const r = getRatio(slug);
  if (!r) return {};

  const rl = r.ratioLabel;
  const title = `${rl} Aspect Ratio in Pixels: Sizes & Free Calculator`;
  const description = `What is the ${rl} aspect ratio in pixels? See the exact ${rl} sizes (${namedSizes(slug)[0]?.px ?? ""}), a full pixel dimensions table, and a free calculator to convert any ${rl} ratio to width × height. No signup.`;
  const canonical = getAspectCanonical(slug);

  return {
    title,
    description,
    keywords: [
      `${rl} in pixels`,
      `${rl} aspect ratio`,
      `${rl} size`,
      `${rl} in px`,
      `${rl} ratio`,
      `what size is ${rl}`,
      `${rl} dimensions`,
      `${rl} resolution`,
      `${rl} pixel size`,
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "SammaPix",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${rl} aspect ratio in pixels`,
        },
      ],
    },
  };
}

// ─── JSON-LD ────────────────────────────────────────────────────────────────

function buildFaqs(slug: string) {
  const r = getRatio(slug)!;
  const rl = r.ratioLabel;
  const named = namedSizes(slug);
  const primary = named[0]?.px ?? "";
  const dec = ratioDecimal(r.aspectW, r.aspectH);
  const flipped = `${r.aspectH}:${r.aspectW}`;

  return [
    {
      q: `What is the ${rl} aspect ratio in pixels?`,
      a: `${rl} is a ratio, not a single size — any width and height that divide to ${dec} is ${rl}.${primary ? ` The most common ${rl} pixel size is ${primary}.` : ""} To get exact pixels, pick a width and multiply by ${r.aspectH}/${r.aspectW} for the height (or use the calculator on this page).`,
    },
    {
      q: `What size is ${rl}?`,
      a: `${rl} means the width is ${r.aspectW} units for every ${r.aspectH} units of height (a decimal ratio of ${dec}:1).${named.length ? ` Popular ${rl} sizes are ${named.slice(0, 3).map((n) => n.px).join(", ")}.` : ""}`,
    },
    {
      q: `How do I convert ${rl} to width and height in pixels?`,
      a: `Enter any width in the calculator above and it returns the exact ${rl} height instantly (height = width × ${r.aspectH} ÷ ${r.aspectW}), or enter a height to get the width. It also works in reverse: paste any pixel size and it tells you the ratio.`,
    },
    {
      q: `Is ${rl} the same as ${flipped}?`,
      a: `No. ${rl} and ${flipped} use the same numbers but swapped, so one is landscape and the other portrait. ${r.aspectW >= r.aspectH ? `${rl} is wider than it is tall; ${flipped} is the portrait version.` : `${rl} is taller than it is wide; ${flipped} is the landscape version.`}`,
    },
    {
      q: `How do I crop a photo to ${rl}?`,
      a: `Use the free SammaPix crop tool: open it, choose the ${rl} preset, drag the box over the area to keep, and download. It locks to ${rl} so the proportions are always exact, and it runs 100% in your browser.`,
    },
  ];
}

function buildJsonLd(slug: string) {
  const r = getRatio(slug)!;
  const rl = r.ratioLabel;
  const canonical = getAspectCanonical(slug);

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${canonical}#app`,
    name: `${rl} Aspect Ratio Calculator — SammaPix`,
    description: `Convert the ${rl} aspect ratio to exact pixel dimensions, and pixels back to a ratio.`,
    url: canonical,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    creator: { "@type": "Organization", name: "SammaPix", url: APP_URL },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: buildFaqs(slug).map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
      { "@type": "ListItem", position: 2, name: "Aspect Ratio", item: `${APP_URL}/aspect-ratio` },
      { "@type": "ListItem", position: 3, name: `${rl} in Pixels`, item: canonical },
    ],
  };

  return [webPage, faqPage, breadcrumb];
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function AspectRatioPixelsPage({
  params,
}: {
  params: Promise<{ ratio: string }>;
}) {
  const { ratio: slug } = await params;
  const r = getRatio(slug);
  if (!r) notFound();

  const rl = r.ratioLabel;
  const dec = ratioDecimal(r.aspectW, r.aspectH);
  const named = namedSizes(slug);
  const rows = pixelRows(r.aspectW, r.aspectH);
  const faqs = buildFaqs(slug);
  const schemas = buildJsonLd(slug);
  const related = (r.related ?? [])
    .map((x) => getRatio(x))
    .filter(Boolean) as NonNullable<ReturnType<typeof getRatio>>[];

  return (
    <main className="min-h-screen bg-white dark:bg-[#191919]">
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="px-4 sm:px-6 pt-6 pb-0">
        <div className="max-w-3xl mx-auto">
          <ol className="flex items-center gap-1.5 text-xs text-[#A3A3A3]">
            <li>
              <Link href="/" className="hover:text-[#525252] transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/aspect-ratio" className="hover:text-[#525252] transition-colors">Aspect Ratio</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#525252]">{rl} in Pixels</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-4 sm:px-6 pt-10 pb-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-4">
            {rl} Aspect Ratio in Pixels
          </h1>
          <p className="text-sm text-[#737373] leading-relaxed mb-6 max-w-xl">
            The {rl} aspect ratio means {r.aspectW} units wide for every {r.aspectH} units
            tall (a decimal ratio of {dec}:1). Below are the exact {rl} pixel sizes, a full
            dimensions table, and a free calculator to convert any {rl} ratio to width × height.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md px-4 py-2 text-sm font-medium hover:bg-[#262626] dark:hover:bg-white transition-colors"
            >
              <Calculator className="h-3.5 w-3.5" strokeWidth={1.5} />
              {rl} calculator
            </a>
            <Link
              href={`/crop/${slug}`}
              className="inline-flex items-center gap-2 border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] rounded-md px-4 py-2 text-sm hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <Crop className="h-3.5 w-3.5" strokeWidth={1.5} />
              Crop an image to {rl}
            </Link>
          </div>
        </div>
      </section>

      {/* Quick answer — AI citation hook */}
      <section className="px-4 sm:px-6 pb-4">
        <div className="max-w-3xl mx-auto">
          <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5">
            <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
              Quick answer
            </h2>
            <p className="text-sm text-[#525252] dark:text-[#E5E5E5] leading-relaxed">
              <strong>{rl}</strong> is an aspect ratio, not a fixed pixel size — any width and
              height that divide to <strong>{dec}</strong> is {rl}.
              {named[0] ? (
                <>
                  {" "}The most common {rl} size is <strong>{named[0].px}</strong> px.
                </>
              ) : null}{" "}
              To get exact pixels, use the calculator below, or multiply your chosen width by{" "}
              {r.aspectH}/{r.aspectW} to get the height.
            </p>
          </div>
        </div>
      </section>

      {/* Named sizes */}
      {named.length > 0 && (
        <section className="px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-0 mb-4">
              Common {rl} sizes
            </h2>
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F5F5F5] dark:bg-[#1E1E1E]">
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Use</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Pixels (W × H)</th>
                  </tr>
                </thead>
                <tbody>
                  {named.map((s, i) => (
                    <tr key={s.use + i} className={i % 2 === 0 ? "bg-white dark:bg-[#191919]" : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"}>
                      <td className="px-4 py-3 font-medium text-[#171717] dark:text-[#E5E5E5] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">{s.use}</td>
                      <td className="px-4 py-3 text-[#525252] dark:text-[#A3A3A3] font-mono border-b border-[#E5E5E5] dark:border-[#2A2A2A]">{s.px}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Full pixel table */}
      {rows.length > 0 && (
        <section className="px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-0 mb-4">
              {rl} pixel dimensions table
            </h2>
            <p className="text-sm text-[#737373] leading-relaxed mb-6">
              Every row below is a perfect {rl} ratio. Pick the resolution you need, or enter your
              own numbers in the calculator.
            </p>
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F5F5F5] dark:bg-[#1E1E1E]">
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Tier</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Width</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Height</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Pixels</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((s, i) => (
                    <tr key={`${s.w}x${s.h}`} className={i % 2 === 0 ? "bg-white dark:bg-[#191919]" : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"}>
                      <td className="px-4 py-3 text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">{s.label}</td>
                      <td className="px-4 py-3 text-[#525252] dark:text-[#A3A3A3] font-mono border-b border-[#E5E5E5] dark:border-[#2A2A2A]">{s.w}</td>
                      <td className="px-4 py-3 text-[#525252] dark:text-[#A3A3A3] font-mono border-b border-[#E5E5E5] dark:border-[#2A2A2A]">{s.h}</td>
                      <td className="px-4 py-3 font-medium text-[#171717] dark:text-[#E5E5E5] font-mono border-b border-[#E5E5E5] dark:border-[#2A2A2A]">{s.w} × {s.h}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Calculator */}
      <section id="calculator" className="px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-0 mb-1 flex items-center gap-2">
            <Ruler className="h-4 w-4 text-[#525252]" strokeWidth={1.5} />
            {rl} aspect ratio calculator
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-6">
            Convert a ratio to pixels, pixels to a ratio, or resize while keeping {rl} locked.
          </p>
        </div>
        <AspectRatioClient />
      </section>

      {/* Crop CTA band — funnel to the converting tool */}
      <section className="px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
              Need to crop an image to {rl}?
            </p>
            <p className="text-sm text-[#737373] leading-relaxed">
              Use the free{" "}
              <Link href={`/crop/${slug}`} className="underline underline-offset-2 hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors">
                {rl} crop tool
              </Link>{" "}
              — it locks the crop box to {rl} so the proportions are always exact.
            </p>
          </div>
          <Link
            href={`/crop/${slug}`}
            className="inline-flex items-center gap-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md px-4 py-2 text-sm font-medium hover:bg-[#262626] dark:hover:bg-white transition-colors flex-shrink-0"
          >
            Crop to {rl}
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-0 mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} className="py-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-0">
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{faq.q}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related ratios */}
      {related.length > 0 && (
        <section className="px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-0 mb-4">
              Related aspect ratios
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/aspect-ratio/${rel.slug}`}
                  className="group p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] dark:hover:border-[#404040] transition-colors"
                >
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                    {rel.ratioLabel} in pixels
                  </p>
                  <p className="text-xs text-[#A3A3A3] line-clamp-2">{rel.useCase}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All ratios sibling grid */}
      <section className="px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Other aspect ratios in pixels
          </h2>
          <div className="flex flex-wrap gap-2">
            {getAllRatios()
              .filter((sib) => sib.slug !== slug)
              .map((sib) => (
                <Link
                  key={sib.slug}
                  href={`/aspect-ratio/${sib.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
                >
                  {sib.ratioLabel}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* More tools */}
      <section className="px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">More tools</h2>
          <div className="flex flex-wrap gap-2">
            <Link href={`/crop/${slug}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#6366F1]/30 dark:border-[#6366F1]/20 rounded-md text-[#6366F1] hover:bg-[#6366F1]/5 bg-white dark:bg-[#1E1E1E] transition-colors">
              <Crop className="h-3 w-3" strokeWidth={1.5} /> Crop to {rl}
            </Link>
            <Link href="/crop" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              All crop ratios
            </Link>
            <Link href="/resize/instagram" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Resize for platforms
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
