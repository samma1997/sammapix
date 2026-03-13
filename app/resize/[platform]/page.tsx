import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getAllPlatforms,
  getPlatform,
  getPlatformCanonical,
  getAspectRatio,
} from "@/lib/resize-platforms";
import { APP_URL } from "@/lib/constants";

// ─── Static params ─────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllPlatforms().map((p) => ({ platform: p.slug }));
}

// ─── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ platform: string }>;
}): Promise<Metadata> {
  const { platform: slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) return {};

  const title = `Resize Images for ${platform.displayName} Free Online | SammaPix`;
  const canonical = getPlatformCanonical(slug);

  return {
    title,
    description: platform.metaDescription,
    keywords: platform.keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description: platform.ogDescription,
      url: canonical,
      siteName: "SammaPix",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `SammaPix — Resize Images for ${platform.displayName}`,
        },
      ],
    },
  };
}

// ─── JSON-LD ────────────────────────────────────────────────────────────────

function buildJsonLd(slug: string) {
  const platform = getPlatform(slug)!;
  const canonical = getPlatformCanonical(slug);

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${canonical}#app`,
    name: `SammaPix — Resize for ${platform.displayName}`,
    description: platform.metaDescription,
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
    mainEntity: platform.faqs.map((faq) => ({
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
        name: "Resize",
        item: `${APP_URL}/resize`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: platform.displayName,
        item: canonical,
      },
    ],
  };

  return [softwareApp, faqPage, breadcrumb];
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function ResizePlatformPage({
  params,
}: {
  params: Promise<{ platform: string }>;
}) {
  const { platform: slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) notFound();

  const relatedPlatforms = platform.related
    .map((r) => getPlatform(r))
    .filter(Boolean) as NonNullable<ReturnType<typeof getPlatform>>[];

  const schemas = buildJsonLd(slug);

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
      <nav
        aria-label="Breadcrumb"
        className="px-4 sm:px-6 pt-6 pb-0"
      >
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
                href="/tools/resizepack"
                className="hover:text-[#525252] transition-colors"
              >
                Resize
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#525252]">{platform.displayName}</li>
          </ol>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pt-10 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Resize Images for {platform.displayName} Free Online
          </h1>
          <p className="text-sm text-[#737373] leading-relaxed mb-6 max-w-xl">
            {platform.metaDescription}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/resizepack"
              className="inline-flex items-center gap-2 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md px-4 py-2 text-sm font-medium hover:bg-[#262626] dark:hover:bg-white transition-colors"
            >
              Open ResizePack
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/croproatio"
              className="inline-flex items-center gap-2 border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] rounded-md px-4 py-2 text-sm hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              Crop to Ratio first
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Sizes table ────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-0 mb-4">
            {platform.displayName} Image Sizes
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-6">
            All recommended {platform.displayName} image dimensions for 2026.
            Upload at these exact sizes to avoid any quality loss from
            platform-side scaling.
          </p>

          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F5F5F5] dark:bg-[#1E1E1E]">
                  <th className="text-left px-4 py-3 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    Type
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    Width × Height
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    Aspect Ratio
                  </th>
                  <th className="hidden sm:table-cell text-left px-4 py-3 text-xs font-medium text-[#525252] dark:text-[#A3A3A3] uppercase tracking-wide border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {platform.sizes.map((size, i) => (
                  <tr
                    key={size.type}
                    className={
                      i % 2 === 0
                        ? "bg-white dark:bg-[#191919]"
                        : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"
                    }
                  >
                    <td className="px-4 py-3 font-medium text-[#171717] dark:text-[#E5E5E5] border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-0">
                      {size.type}
                    </td>
                    <td className="px-4 py-3 text-[#525252] dark:text-[#A3A3A3] font-mono border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-0 whitespace-nowrap">
                      {size.width} × {size.height} px
                    </td>
                    <td className="px-4 py-3 text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-0">
                      {getAspectRatio(size.width, size.height)}
                    </td>
                    <td className="hidden sm:table-cell px-4 py-3 text-[#737373] dark:text-[#737373] border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-0">
                      {size.note ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── How to resize ──────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            How to Resize Images for {platform.displayName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {platform.steps.map((step, i) => (
              <div
                key={i}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <div className="h-7 w-7 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center mb-4">
                  <span className="text-xs font-semibold text-[#525252]">
                    {i + 1}
                  </span>
                </div>
                <p className="text-sm text-[#737373] leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tool CTA band ──────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
              Ready to resize?
            </p>
            <p className="text-sm text-[#737373] leading-relaxed">
              Use{" "}
              <Link
                href="/tools/resizepack"
                className="underline underline-offset-2 hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
              >
                ResizePack
              </Link>{" "}
              for batch resizing with social media presets, or{" "}
              <Link
                href="/tools/croproatio"
                className="underline underline-offset-2 hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
              >
                CropRatio
              </Link>{" "}
              to crop to the exact aspect ratio first.
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Link
              href="/tools/resizepack"
              className="inline-flex items-center gap-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md px-4 py-2 text-sm font-medium hover:bg-[#262626] dark:hover:bg-white transition-colors"
            >
              ResizePack
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/croproatio"
              className="inline-flex items-center gap-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] text-[#525252] dark:text-[#A3A3A3] rounded-md px-4 py-2 text-sm hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
            >
              CropRatio
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-0">
            {platform.faqs.map((faq, i) => (
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

      {/* ── Related platforms ──────────────────────────────────────────── */}
      {relatedPlatforms.length > 0 && (
        <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Resize for Other Platforms
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedPlatforms.map((related) => (
                <Link
                  key={related.slug}
                  href={`/resize/${related.slug}`}
                  className="group p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E] hover:border-[#A3A3A3] dark:hover:border-[#404040] transition-colors"
                >
                  <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#171717] dark:group-hover:text-white mb-1">
                    Resize for {related.displayName}
                  </p>
                  <p className="text-xs text-[#A3A3A3]">
                    {related.sizes.length} size
                    {related.sizes.length !== 1 ? "s" : ""} —{" "}
                    {related.sizes.map((s) => s.type).join(", ")}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Blog reference ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            Complete Social Media Size Guide
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Need dimensions for every platform in one place? Read our complete
            2026 cheat sheet — every network, every format, updated for this
            year.
          </p>
          <Link
            href="/blog/image-sizes-social-media-2026"
            className="inline-flex items-center gap-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md px-4 py-2 text-sm text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
          >
            Social Media Image Sizes 2026
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
