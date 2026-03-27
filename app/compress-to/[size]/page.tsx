import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Download, Zap, Shield, Image } from "lucide-react";
import {
  getAllTargets,
  getTarget,
  getTargetCanonical,
} from "@/lib/compress-targets";
import { APP_URL } from "@/lib/constants";

// ─── Static params ─────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllTargets().map((t) => ({ size: t.slug }));
}

// ─── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ size: string }>;
}): Promise<Metadata> {
  const { size: slug } = await params;
  const target = getTarget(slug);
  if (!target) return {};

  const title = `${target.titleKeyword} — Free, Instant, No Upload | SammaPix`;
  const canonical = getTargetCanonical(slug);

  return {
    title,
    description: target.metaDescription,
    keywords: target.keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description: target.ogDescription,
      url: canonical,
      siteName: "SammaPix",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `SammaPix - ${target.titleKeyword}`,
        },
      ],
    },
  };
}

// ─── JSON-LD ────────────────────────────────────────────────────────────────

function buildJsonLd(slug: string) {
  const target = getTarget(slug)!;
  const canonical = getTargetCanonical(slug);

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${canonical}#app`,
    name: `SammaPix - ${target.titleKeyword}`,
    description: target.metaDescription,
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
    mainEntity: target.faqs.map((faq) => ({
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
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: APP_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compress",
        item: `${APP_URL}/tools/compress`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `To ${target.sizeLabel}`,
        item: canonical,
      },
    ],
  };

  return [softwareApp, faqPage, breadcrumb];
}

// ─── Helper: human-readable file size ──────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function CompressToSizePage({
  params,
}: {
  params: Promise<{ size: string }>;
}) {
  const { size: slug } = await params;
  const target = getTarget(slug);
  if (!target) notFound();

  const relatedTargets = target.related
    .map((r) => getTarget(r))
    .filter(Boolean) as NonNullable<ReturnType<typeof getTarget>>[];

  const schemas = buildJsonLd(slug);

  // Example comparison data
  const exampleOriginal = target.sizeBytes * 15; // ~15x the target
  const qualityPercent =
    target.sizeBytes <= 25600
      ? "40-55%"
      : target.sizeBytes <= 102400
        ? "70-85%"
        : target.sizeBytes <= 512000
          ? "80-90%"
          : "88-95%";

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
              <Link
                href="/tools/compress"
                className="hover:text-[#525252] transition-colors"
              >
                Compress
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#525252]">To {target.sizeLabel}</li>
          </ol>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pt-10 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-4">
            {target.titleKeyword} — Free, Instant, No Upload
          </h1>
          <p className="text-sm text-[#737373] leading-relaxed mb-3 max-w-xl">
            {target.metaDescription}
          </p>
          <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-6 max-w-xl">
            {target.useCase}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-2 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md px-4 py-2 text-sm font-medium hover:bg-[#262626] dark:hover:bg-white transition-colors"
            >
              Open Compress Tool
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/webp"
              className="inline-flex items-center gap-2 border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] rounded-md px-4 py-2 text-sm hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Convert to WebP first
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-0 mb-4">
            How to Compress to {target.sizeLabel}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                step: 1,
                text: `Open the SammaPix Compress tool and drag your image into the drop zone. Supports JPEG, PNG, WebP, and GIF.`,
              },
              {
                step: 2,
                text: `Adjust the quality slider until the output size is at or below ${target.sizeLabel}. Lower quality = smaller file.`,
              },
              {
                step: 3,
                text: `Download your compressed image instantly. Everything runs in your browser — your photos never leave your device.`,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <div className="h-7 w-7 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center mb-4">
                  <span className="text-xs font-semibold text-[#525252]">
                    {item.step}
                  </span>
                </div>
                <p className="text-sm text-[#737373] leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison table ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-0 mb-4">
            Original vs Compressed
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-6">
            Typical results when compressing a photo to {target.sizeLabel}.
          </p>

          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F5F5F5] dark:bg-[#1E1E1E]">
                  <th className="text-left px-4 py-3 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    Property
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    Original
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    Compressed
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-[#191919]">
                  <td className="px-4 py-3 font-medium text-[#171717] dark:text-[#E5E5E5] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    File size
                  </td>
                  <td className="px-4 py-3 text-[#525252] dark:text-[#A3A3A3] font-mono border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    {formatBytes(exampleOriginal)}
                  </td>
                  <td className="px-4 py-3 text-[#525252] dark:text-[#A3A3A3] font-mono border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    {target.sizeLabel}
                  </td>
                </tr>
                <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                  <td className="px-4 py-3 font-medium text-[#171717] dark:text-[#E5E5E5] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    Quality
                  </td>
                  <td className="px-4 py-3 text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    100%
                  </td>
                  <td className="px-4 py-3 text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    {qualityPercent}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-[#191919]">
                  <td className="px-4 py-3 font-medium text-[#171717] dark:text-[#E5E5E5] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    Size reduction
                  </td>
                  <td className="px-4 py-3 text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    —
                  </td>
                  <td className="px-4 py-3 text-[#525252] dark:text-[#A3A3A3] font-mono border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    ~93%
                  </td>
                </tr>
                <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                  <td className="px-4 py-3 font-medium text-[#171717] dark:text-[#E5E5E5]">
                    Format
                  </td>
                  <td className="px-4 py-3 text-[#525252] dark:text-[#A3A3A3]">
                    JPEG / PNG
                  </td>
                  <td className="px-4 py-3 text-[#525252] dark:text-[#A3A3A3]">
                    JPEG / WebP
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Tips ─────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-0 mb-4">
            Tips for Compressing to {target.sizeLabel}
          </h2>
          <div className="space-y-3">
            {target.tips.map((tip, i) => (
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
              Ready to compress?
            </p>
            <p className="text-sm text-[#737373] leading-relaxed">
              Use{" "}
              <Link
                href="/tools/compress"
                className="underline underline-offset-2 hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
              >
                Compress
              </Link>{" "}
              to reduce your images to {target.sizeLabel} or below, or{" "}
              <Link
                href="/tools/webp"
                className="underline underline-offset-2 hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
              >
                Convert to WebP
              </Link>{" "}
              for even smaller files at the same quality.
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md px-4 py-2 text-sm font-medium hover:bg-[#262626] dark:hover:bg-white transition-colors"
            >
              Compress
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/webp"
              className="inline-flex items-center gap-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] rounded-md px-4 py-2 text-sm hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              WebP
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
            {target.faqs.map((faq, i) => (
              <div
                key={i}
                className="py-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-0"
              >
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {faq.q}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related sizes ────────────────────────────────────────────────── */}
      {relatedTargets.length > 0 && (
        <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-0 mb-4">
              Compress to Other Sizes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedTargets.map((related) => (
                <Link
                  key={related.slug}
                  href={`/compress-to/${related.slug}`}
                  className="group p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] dark:hover:border-[#404040] transition-colors"
                >
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#171717] dark:group-hover:text-white mb-1">
                    Compress to {related.sizeLabel}
                  </p>
                  <p className="text-xs text-[#A3A3A3]">{related.useCase}</p>
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
                desc: "All compression happens in your browser. Your images never leave your device — nothing is uploaded to any server.",
              },
              {
                icon: Zap,
                title: "Instant results",
                desc: "No waiting for server processing. Compress images in milliseconds using your device's own hardware.",
              },
              {
                icon: Download,
                title: "Free, no limits",
                desc: "Compress as many images as you want. No watermarks, no sign-up, no daily caps on the free plan.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <item.icon
                  className="h-4 w-4 text-[#525252] mb-3"
                  strokeWidth={1.5}
                />
                <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {item.title}
                </p>
                <p className="text-sm text-[#737373] leading-relaxed">
                  {item.desc}
                </p>
              </div>
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
              href="/tools/resizepack"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Batch Resize
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/webp"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Convert to WebP
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/exif"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Remove EXIF data
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
