import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Gauge } from "lucide-react";
import {
  getAllVideoTargets,
  getVideoTarget,
  getVideoTargetCanonical,
} from "@/lib/video-targets";
import { APP_URL } from "@/lib/constants";
import CompressVideoClient from "@/components/tools/CompressVideoClient";

// ─── Static params ─────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllVideoTargets().map((t) => ({ target: t.slug }));
}

// ─── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ target: string }>;
}): Promise<Metadata> {
  const { target: slug } = await params;
  const t = getVideoTarget(slug);
  if (!t) return {};

  const title = `${t.titleKeyword} — Free, No Upload, in Your Browser`;
  const canonical = getVideoTargetCanonical(slug);

  return {
    title,
    description: t.metaDescription,
    keywords: t.keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description: t.ogDescription,
      url: canonical,
      siteName: "SammaPix",
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `SammaPix - ${t.titleKeyword}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t.ogDescription,
    },
  };
}

// ─── JSON-LD ────────────────────────────────────────────────────────────────

function buildJsonLd(slug: string) {
  const t = getVideoTarget(slug)!;
  const canonical = getVideoTargetCanonical(slug);

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${canonical}#app`,
    name: `SammaPix - ${t.titleKeyword}`,
    description: t.metaDescription,
    url: canonical,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Person", name: "Luca Sammarco", url: "https://lucasammarco.com" },
    creator: { "@type": "Organization", name: "SammaPix", url: APP_URL },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
      { "@type": "ListItem", position: 2, name: "Compress Video", item: `${APP_URL}/tools/compress-video` },
      { "@type": "ListItem", position: 3, name: `For ${t.platform}`, item: canonical },
    ],
  };

  return [softwareApp, faqPage, breadcrumb];
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function CompressVideoForPage({
  params,
}: {
  params: Promise<{ target: string }>;
}) {
  const { target: slug } = await params;
  const t = getVideoTarget(slug);
  if (!t) notFound();

  const related = t.related
    .map((r) => getVideoTarget(r))
    .filter(Boolean) as VideoTargetType[];
  const schemas = buildJsonLd(slug);

  return (
    <main className="min-h-screen bg-white dark:bg-[#191919]">
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="px-4 sm:px-6 pt-6 pb-0">
        <div className="max-w-3xl mx-auto">
          <ol className="flex items-center gap-1.5 text-xs text-[#A3A3A3]">
            <li><Link href="/" className="hover:text-[#525252] transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/tools/compress-video" className="hover:text-[#525252] transition-colors">Compress Video</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-[#525252]">For {t.platform}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-4 sm:px-6 pt-8 pb-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-[#171717] dark:text-[#E5E5E5] mb-4">
            {t.titleKeyword} — Free, No Upload
          </h1>
          <p className="text-sm text-[#737373] leading-relaxed mb-3 max-w-xl">{t.metaDescription}</p>
          <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-5 max-w-xl">{t.useCase}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
            <span className="inline-flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-[#7C3AED]" strokeWidth={2} /> WebCodecs-fast</span>
            <span className="inline-flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-[#7C3AED]" strokeWidth={2} /> Nothing uploaded</span>
            <span className="inline-flex items-center gap-1"><Gauge className="h-3.5 w-3.5 text-[#7C3AED]" strokeWidth={2} /> Live size preview</span>
          </div>
        </div>
      </section>

      {/* Tool — pre-set to this target size when there is a hard limit */}
      <section id="tool">
        <CompressVideoClient initialTargetMB={t.targetMB ?? undefined} />
      </section>

      {/* How it works */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            How to compress a video for {t.platform}
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-[#737373] leading-relaxed">
            <li>Drop your MP4, MOV, WebM or MKV onto the tool above. It stays on your device.</li>
            <li>
              {t.targetMB
                ? `The target size is pre-set to ${t.limitLabel} for ${t.platform}. Keep the 1080p downscale on for 4K clips.`
                : `Pick a quality preset and keep the 1080p downscale on for 4K clips.`}
            </li>
            <li>Compress with WebCodecs, compare before and after, then download your MP4.</li>
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 py-12 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-5">
            {t.platform} video compression — FAQ
          </h2>
          {t.faqs.map((f) => (
            <div key={f.q} className="mb-5">
              <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">{f.q}</h3>
              <p className="text-sm text-[#737373] leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="px-4 sm:px-6 py-10 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">Compress video for other apps</h2>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/compress-video/${r.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] transition-colors"
                >
                  {r.titleKeyword.replace("Compress Video for ", "")}
                  <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                </Link>
              ))}
              <Link
                href="/tools/compress-video"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] dark:text-[#A3A3A3] hover:border-[#A3A3A3] transition-colors"
              >
                All sizes <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

type VideoTargetType = NonNullable<ReturnType<typeof getVideoTarget>>;
