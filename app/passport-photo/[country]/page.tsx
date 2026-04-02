import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Shield, Camera, CheckCircle2, Globe } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import { getAllPassportPresets, getPassportPresetByCountry } from "@/lib/passport-presets";
import PassportPhotoClient from "@/components/tools/PassportPhotoClient";
import RelatedTools from "@/components/tools/RelatedTools";
import MetaViewContent from "@/components/tracking/MetaViewContent";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return getAllPassportPresets().map((p) => ({ country: p.country }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

function countryTitle(label: string): string {
  // Extract country name from label like "US Passport (2×2″)" → "US"
  // or "Germany (35×45 mm)" → "Germany"
  return label.replace(/\s*\(.*\)/, "").trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await params;
  const preset = getPassportPresetByCountry(country);
  if (!preset) return {};

  const name = countryTitle(preset.label);
  const dims = preset.label.match(/\(([^)]+)\)/)?.[1] || "";

  const title = `${name} Passport Photo Online Free — ${dims}`;
  const description = `Create a ${name} passport photo (${dims}, ${preset.widthPx}×${preset.heightPx}px). Auto background removal & smart crop. 100% free, browser-based — your photo stays private.`;

  return {
    title,
    description,
    keywords: [
      `${name.toLowerCase()} passport photo`,
      `${name.toLowerCase()} passport photo online`,
      `${name.toLowerCase()} visa photo`,
      `${name.toLowerCase()} passport photo size`,
      `${dims} passport photo`,
      `${name.toLowerCase()} passport photo maker free`,
      `${name.toLowerCase()} id photo`,
      "passport photo online free",
      "passport photo maker",
    ],
    alternates: {
      canonical: `${APP_URL}/passport-photo/${country}`,
    },
    openGraph: {
      title,
      description,
      url: `${APP_URL}/passport-photo/${country}`,
      siteName: "SammaPix",
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function PassportPhotoCountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  const preset = getPassportPresetByCountry(country);
  if (!preset) return notFound();

  const name = countryTitle(preset.label);
  const dims = preset.label.match(/\(([^)]+)\)/)?.[1] || "";
  const widthMm = Math.round(preset.widthPx / 11.81);
  const heightMm = Math.round(preset.heightPx / 11.81);

  // Related countries (same region or popular)
  const allPresets = getAllPassportPresets();
  const otherCountries = allPresets
    .filter((p) => p.country !== country)
    .slice(0, 8);

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `SammaPix ${name} Passport Photo Maker`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (browser-based)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: `Create ${name} passport photos (${dims}) online for free. Auto background removal, smart crop, exact dimensions.`,
    url: `${APP_URL}/passport-photo/${country}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What size is a ${name} passport photo?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `A ${name} passport photo must be ${dims} (${preset.widthPx}×${preset.heightPx} pixels at 300 DPI). SammaPix automatically crops and resizes your photo to these exact dimensions.`,
        },
      },
      {
        "@type": "Question",
        name: `Does a ${name} passport photo need a white background?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, most ${name} passport and visa photos require a plain white or off-white background. SammaPix automatically removes the background and replaces it with pure white.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I make a ${name} passport photo at home?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Take a photo with your phone against any background, upload it to SammaPix, and the AI will remove the background, center your face, and resize to the exact ${name} passport photo dimensions. No need to visit a photo studio.`,
        },
      },
      {
        "@type": "Question",
        name: "Is this passport photo tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, SammaPix passport photo maker is 100% free with no watermarks. The processing happens entirely in your browser — your photo never leaves your device.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MetaViewContent contentName={`Passport Photo ${name}`} contentCategory="tool" />

      <main className="min-h-screen bg-white dark:bg-[#191919]">
        {/* Nav */}
        <div className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
            <Link
              href="/tools/passport-photo"
              className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors"
            >
              <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
              Passport Photo Tool
            </Link>
          </div>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center">
          <p className="text-3xl mb-3">{preset.flag}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-3">
            {name} Passport Photo Maker
          </h1>
          <p className="text-sm text-[#737373] max-w-lg mx-auto leading-relaxed">
            Create a {name} passport photo ({dims}) in seconds.
            Auto background removal, smart crop, and exact pixel dimensions.
            100% free, private, and browser-based.
          </p>

          {/* Specs badges */}
          <div className="flex items-center justify-center gap-4 mt-5 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[11px] text-[#737373] bg-[#F5F5F5] dark:bg-[#252525] px-2.5 py-1 rounded-full">
              <Camera className="h-3 w-3" strokeWidth={1.5} />
              {dims}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#737373] bg-[#F5F5F5] dark:bg-[#252525] px-2.5 py-1 rounded-full">
              {preset.widthPx}×{preset.heightPx} px
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#737373] bg-[#F5F5F5] dark:bg-[#252525] px-2.5 py-1 rounded-full">
              <Shield className="h-3 w-3" strokeWidth={1.5} />
              100% Private
            </span>
          </div>
        </div>

        {/* Tool */}
        <PassportPhotoClient />

        {/* Requirements section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            {name} Passport Photo Requirements
          </h2>
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <td className="px-4 py-3 font-medium text-[#525252] dark:text-[#A3A3A3] bg-[#FAFAFA] dark:bg-[#1E1E1E] w-1/3">Size</td>
                  <td className="px-4 py-3 text-[#171717] dark:text-[#E5E5E5]">{dims}</td>
                </tr>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <td className="px-4 py-3 font-medium text-[#525252] dark:text-[#A3A3A3] bg-[#FAFAFA] dark:bg-[#1E1E1E]">Pixels</td>
                  <td className="px-4 py-3 text-[#171717] dark:text-[#E5E5E5]">{preset.widthPx} × {preset.heightPx} px (300 DPI)</td>
                </tr>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <td className="px-4 py-3 font-medium text-[#525252] dark:text-[#A3A3A3] bg-[#FAFAFA] dark:bg-[#1E1E1E]">Background</td>
                  <td className="px-4 py-3 text-[#171717] dark:text-[#E5E5E5]">Plain white</td>
                </tr>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <td className="px-4 py-3 font-medium text-[#525252] dark:text-[#A3A3A3] bg-[#FAFAFA] dark:bg-[#1E1E1E]">Format</td>
                  <td className="px-4 py-3 text-[#171717] dark:text-[#E5E5E5]">JPEG (95% quality)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-[#525252] dark:text-[#A3A3A3] bg-[#FAFAFA] dark:bg-[#1E1E1E]">Use for</td>
                  <td className="px-4 py-3 text-[#171717] dark:text-[#E5E5E5]">{preset.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <details
                key={i}
                className="group border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md"
              >
                <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:bg-[#FAFAFA] dark:hover:bg-[#1E1E1E] rounded-md">
                  {faq.name}
                  <span className="text-[#A3A3A3] group-open:rotate-45 transition-transform text-lg leading-none">
                    +
                  </span>
                </summary>
                <div className="px-4 pb-4 text-xs text-[#737373] leading-relaxed">
                  {faq.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Other countries */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Other Countries
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {otherCountries.map((p) => (
              <Link
                key={p.country}
                href={`/passport-photo/${p.country}`}
                className="flex items-center gap-2 px-3 py-2.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md hover:border-[#A3A3A3] hover:bg-[#FAFAFA] dark:hover:bg-[#1E1E1E] transition-colors"
              >
                <span className="text-base">{p.flag}</span>
                <span className="text-xs font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                  {countryTitle(p.label)}
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-3 text-center">
            <Link
              href="/tools/passport-photo"
              className="text-xs text-[#6366F1] hover:text-[#4F46E5] font-medium"
            >
              View all {allPresets.length} countries &rarr;
            </Link>
          </p>
        </section>

        {/* Related tools */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <RelatedTools toolId="passport-photo" />
        </div>
      </main>
    </>
  );
}
