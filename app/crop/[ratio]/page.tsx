import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Crop, Zap, Shield, Download } from "lucide-react";
import { getAllRatios, getRatio, getRatioCanonical } from "@/lib/crop-ratios";
import { APP_URL } from "@/lib/constants";
import CropRatioToolEmbed from "@/components/tools/CropRatioToolEmbed";

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

  const title = `${r.titleKeyword} — Free Online, No Upload`;
  const canonical = getRatioCanonical(slug);

  return {
    title,
    description: r.metaDescription,
    keywords: r.keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description: r.ogDescription,
      url: canonical,
      siteName: "SammaPix",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `SammaPix - ${r.titleKeyword}`,
        },
      ],
    },
  };
}

// ─── JSON-LD ────────────────────────────────────────────────────────────────

function buildJsonLd(slug: string) {
  const r = getRatio(slug)!;
  const canonical = getRatioCanonical(slug);

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${canonical}#app`,
    name: `SammaPix - ${r.titleKeyword}`,
    description: r.metaDescription,
    url: canonical,
    applicationCategory: "PhotographyApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: {
      "@type": "Person",
      name: "Luca Sammarco",
      url: "https://lucasammarco.com",
    },
    creator: {
      "@type": "Organization",
      name: "SammaPix",
      url: APP_URL,
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: r.faqs.map((faq) => ({
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Crop",
        item: `${APP_URL}/crop`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `To ${r.ratioLabel}`,
        item: canonical,
      },
    ],
  };

  return [softwareApp, faqPage, breadcrumb];
}

// ─── Common output sizes for a given ratio ──────────────────────────────────

function commonSizes(r: { slug: string }): { use: string; px: string }[] {
  const map: Record<string, { use: string; px: string }[]> = {
    "16-9": [
      { use: "YouTube thumbnail", px: "1280 × 720" },
      { use: "Full HD video / slide", px: "1920 × 1080" },
      { use: "4K frame", px: "3840 × 2160" },
    ],
    "9-16": [
      { use: "Story / Reel / TikTok", px: "1080 × 1920" },
      { use: "Snapchat", px: "1080 × 1920" },
      { use: "Half-res preview", px: "540 × 960" },
    ],
    "1-1": [
      { use: "Instagram square", px: "1080 × 1080" },
      { use: "Profile picture", px: "320 × 320" },
      { use: "Album cover", px: "3000 × 3000" },
    ],
    "4-5": [
      { use: "Instagram portrait", px: "1080 × 1350" },
      { use: "Pinterest standard", px: "1000 × 1250" },
    ],
    "3-2": [
      { use: "4×6 print (300 DPI)", px: "1800 × 1200" },
      { use: "DSLR full frame", px: "6000 × 4000" },
    ],
    "2-3": [
      { use: "Pinterest pin", px: "1000 × 1500" },
      { use: "8×12 print (300 DPI)", px: "2400 × 3600" },
    ],
    "4-3": [
      { use: "iPad wallpaper", px: "2048 × 1536" },
      { use: "SD / classic display", px: "1024 × 768" },
    ],
    "3-4": [
      { use: "Product photo", px: "1200 × 1600" },
      { use: "Mobile portrait", px: "1080 × 1440" },
    ],
    "5-4": [
      { use: "8×10 print (300 DPI)", px: "3000 × 2400" },
      { use: "16×20 print", px: "6000 × 4800" },
    ],
    "21-9": [
      { use: "Ultrawide wallpaper", px: "3440 × 1440" },
      { use: "Cinematic banner", px: "2560 × 1080" },
    ],
    "2-1": [
      { use: "X (Twitter) card", px: "1200 × 600" },
      { use: "Web banner", px: "1600 × 800" },
    ],
    a4: [
      { use: "A4 print (300 DPI)", px: "2480 × 3508" },
      { use: "A4 draft (150 DPI)", px: "1240 × 1754" },
    ],
  };
  return map[r.slug] ?? [];
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function CropToRatioPage({
  params,
}: {
  params: Promise<{ ratio: string }>;
}) {
  const { ratio: slug } = await params;
  const r = getRatio(slug);
  if (!r) notFound();

  const relatedRatios = r.related
    .map((x) => getRatio(x))
    .filter(Boolean) as NonNullable<ReturnType<typeof getRatio>>[];

  const schemas = buildJsonLd(slug);
  const sizes = commonSizes(r);

  return (
    <main className="min-h-screen bg-white dark:bg-[#191919]">
      {/* JSON-LD */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="px-4 sm:px-6 pt-6 pb-0">
        <div className="max-w-3xl mx-auto">
          <ol className="flex items-center gap-1.5 text-xs text-[#A3A3A3]">
            <li>
              <Link href="/" className="hover:text-[#525252] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/crop" className="hover:text-[#525252] transition-colors">
                Crop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#525252]">To {r.ratioLabel}</li>
          </ol>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pt-10 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-4">
            {r.titleKeyword} — Free Online, No Upload
          </h1>
          <p className="text-sm text-[#737373] leading-relaxed mb-3 max-w-xl">
            {r.metaDescription}
          </p>
          <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-6 max-w-xl">
            {r.useCase}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#tool"
              className="inline-flex items-center gap-2 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md px-4 py-2 text-sm font-medium hover:bg-[#262626] dark:hover:bg-white transition-colors"
            >
              Crop to {r.ratioLabel} now
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
            <Link
              href="/crop"
              className="inline-flex items-center gap-2 border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] rounded-md px-4 py-2 text-sm hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              All aspect ratios
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Embedded crop tool ─────────────────────────────────────────── */}
      <section id="tool" className="border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <CropRatioToolEmbed initialRatio={r.ratioLabel} />
      </section>

      {/* ── Quick answer — AI citation hook ───────────────────────────── */}
      <section className="px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h3 id="quick-answer" className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Quick answer
          </h3>
          <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5">
            <p className="text-sm text-[#525252] dark:text-[#E5E5E5] leading-relaxed">
              To crop an image to a <strong>{r.ratioLabel}</strong> aspect ratio for free, open the{" "}
              <a href="/tools/croproatio" className="underline underline-offset-2 hover:text-[#171717] dark:hover:text-white">SammaPix Crop tool</a>, select the {r.ratioLabel} preset, drag the crop box over the part of the image you want to keep, and download. The crop box locks to {r.ratioLabel} so the proportions are always exact. Everything runs 100% in your browser — no upload, no signup, no watermark — and cropping removes only the pixels outside the frame, so there is no quality loss.
            </p>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-0 mb-4">
            How to Crop to {r.ratioLabel}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                step: 1,
                text: `Open the SammaPix Crop tool and drop your image in. Supports JPEG, PNG, and WebP.`,
              },
              {
                step: 2,
                text: `Choose the ${r.ratioLabel} ratio. The crop box locks to ${r.ratioLabel} — drag and resize it over the area you want to keep.`,
              },
              {
                step: 3,
                text: `Download your perfectly cropped ${r.ratioLabel} image instantly. Everything stays in your browser — nothing is uploaded.`,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <div className="h-7 w-7 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center mb-4">
                  <span className="text-xs font-semibold text-[#525252]">{item.step}</span>
                </div>
                <p className="text-sm text-[#737373] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Common sizes ─────────────────────────────────────────────────── */}
      {sizes.length > 0 && (
        <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-0 mb-4">
              Common {r.ratioLabel} Sizes
            </h2>
            <p className="text-sm text-[#737373] leading-relaxed mb-6">
              {r.ratioLabel} is an aspect ratio — these are the pixel sizes people most often export after cropping. See the full{" "}
              <Link
                href={`/aspect-ratio/${r.slug}`}
                className="underline underline-offset-2 hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
              >
                {r.ratioLabel} pixel dimensions table
              </Link>
              .
            </p>
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F5F5F5] dark:bg-[#1E1E1E]">
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                      Use
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                      Pixels (W × H)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((s, i) => (
                    <tr
                      key={s.use}
                      className={i % 2 === 0 ? "bg-white dark:bg-[#191919]" : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"}
                    >
                      <td className="px-4 py-3 font-medium text-[#171717] dark:text-[#E5E5E5] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                        {s.use}
                      </td>
                      <td className="px-4 py-3 text-[#525252] dark:text-[#A3A3A3] font-mono border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                        {s.px}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── Tips ─────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-0 mb-4">
            Tips for Cropping to {r.ratioLabel}
          </h2>
          <div className="space-y-3">
            {r.tips.map((tip, i) => (
              <div
                key={i}
                className="flex gap-3 p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center mt-0.5">
                  <Zap className="h-3 w-3 text-[#525252]" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-[#737373] leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tool CTA band ────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
              Ready to crop?
            </p>
            <p className="text-sm text-[#737373] leading-relaxed">
              Use the{" "}
              <Link
                href="/tools/croproatio"
                className="underline underline-offset-2 hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
              >
                Crop tool
              </Link>{" "}
              to crop your image to {r.ratioLabel}, or browse{" "}
              <Link
                href="/crop"
                className="underline underline-offset-2 hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
              >
                all aspect ratios
              </Link>
              .
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Link
              href="/tools/croproatio"
              className="inline-flex items-center gap-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md px-4 py-2 text-sm font-medium hover:bg-[#262626] dark:hover:bg-white transition-colors"
            >
              Crop
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-0 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-0">
            {r.faqs.map((faq, i) => (
              <div
                key={i}
                className="py-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-0"
              >
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {faq.q}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related ratios ───────────────────────────────────────────────── */}
      {relatedRatios.length > 0 && (
        <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-0 mb-4">
              Crop to Other Ratios
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedRatios.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/crop/${rel.slug}`}
                  className="group p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] dark:hover:border-[#404040] transition-colors"
                >
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#171717] dark:group-hover:text-white mb-1">
                    Crop to {rel.ratioLabel}
                  </p>
                  <p className="text-xs text-[#A3A3A3] line-clamp-2">{rel.useCase}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Why SammaPix ──────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Why SammaPix?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Shield,
                title: "100% private",
                desc: "All cropping happens in your browser. Your images never leave your device — nothing is uploaded to any server.",
              },
              {
                icon: Zap,
                title: "Exact ratios",
                desc: "The crop box locks to the exact aspect ratio, so your output proportions are always perfect — no manual math.",
              },
              {
                icon: Download,
                title: "Free, no limits",
                desc: "Crop as many images as you want. No watermarks, no sign-up, no daily caps on the free plan.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <item.icon className="h-4 w-4 text-[#525252] mb-3" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {item.title}
                </p>
                <p className="text-sm text-[#737373] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── All aspect ratios (sibling grid, internal linking) ───────────── */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Crop to another aspect ratio
          </h2>
          <div className="flex flex-wrap gap-2">
            {getAllRatios()
              .filter((sib) => sib.slug !== slug)
              .map((sib) => (
                <Link
                  key={sib.slug}
                  href={`/crop/${sib.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
                >
                  {sib.slug.replace("-", ":")}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ── More tools ───────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            More tools
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/crop"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#6366F1]/30 dark:border-[#6366F1]/20 rounded-md text-[#6366F1] hover:bg-[#6366F1]/5 bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              All aspect ratios
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/resize/instagram"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Resize for platforms
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/compress-to"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Compress to exact size
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/croproatio"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              <Crop className="h-3 w-3" strokeWidth={1.5} /> Crop tool
            </Link>
          </div>
        </div>
      </section>

      {/* ── Portfolio teaser ───────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-8 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto flex items-center justify-end">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] hover:text-[#525252] dark:hover:text-[#737373] transition-colors"
          >
            Travel photography by Luca Sammarco
            <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
