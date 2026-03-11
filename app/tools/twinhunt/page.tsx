import { Metadata } from "next";
import { Copy, Search, Zap, HardDrive, ArrowRight } from "lucide-react";
import Link from "next/link";
import TwinHunt from "@/components/tools/TwinHunt";
import ToolHeader from "@/components/tools/ToolHeader";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Find Duplicate Photos Free Online | Perceptual Hashing | SammaPix",
  description:
    "Find duplicate photos free online using perceptual hashing. Identify similar images, save disk space. Browser-based, no upload needed.",
  keywords: [
    "find duplicate photos",
    "duplicate photo finder",
    "similar image finder",
    "phash tool",
    "photo deduplicator",
    "find similar images",
  ],
  alternates: { canonical: `${APP_URL}/tools/twinhunt` },
  openGraph: {
    title: "Find Duplicate Photos Free Online | SammaPix",
    description:
      "Find duplicate photos free online using perceptual hashing. Identify similar images, save disk space. Browser-based, no upload.",
    url: `${APP_URL}/tools/twinhunt`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Duplicate Photo Finder",
      },
    ],
  },
};

const features = [
  {
    icon: <Search className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Perceptual hashing",
    description:
      "Uses pHash (Discrete Cosine Transform) to compare images by visual content, not file bytes. Finds duplicates even after resizing, re-saving, or minor edits.",
  },
  {
    icon: <Copy className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Near-duplicate detection",
    description:
      "Adjustable sensitivity finds exact copies (Hamming distance 0–5), very similar images (6–10), and looser matches (11–20). Tune it to your library.",
  },
  {
    icon: <Zap className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "100% client-side",
    description:
      "Every pixel is processed in your browser using Canvas API and DCT. No photo ever leaves your device. Works offline once the page is loaded.",
  },
  {
    icon: <HardDrive className="h-5 w-5 text-gray-700 dark:text-[#A3A3A3]" strokeWidth={1.5} />,
    title: "Reclaim disk space",
    description:
      "TwinHunt shows you which photos to delete and how much space you would free. Actual deletion is done in your file manager — we never touch your files.",
  },
];

const steps = [
  {
    n: "1",
    title: "Drop your photos",
    desc: "Select or drag up to 50 images (free) or 500 (Pro). JPG, PNG, WebP, and HEIC are all supported.",
  },
  {
    n: "2",
    title: "Analysis runs in browser",
    desc: "A perceptual hash is computed for each photo using DCT. Then every pair is compared. Processing is fast — around 50ms per image.",
  },
  {
    n: "3",
    title: "Review duplicate groups",
    desc: "Duplicates are shown side-by-side with file names, sizes, and similarity badges. Check which ones to delete and export a report.",
  },
];

const faqs = [
  {
    q: "What is perceptual hashing (pHash)?",
    a: "pHash is an algorithm that generates a 64-bit fingerprint for an image based on its visual content, not its raw bytes. Two images with the same visual content — even if saved differently, resized, or lightly edited — will have fingerprints that are close together (low Hamming distance). TwinHunt uses a DCT-based pHash: the image is reduced to 32×32 grayscale, the Discrete Cosine Transform extracts frequency components, and the top-left 8×8 block encodes the visual signature.",
  },
  {
    q: "Will it find photos that are slightly cropped or colour-adjusted?",
    a: "It depends on the degree of change. Minor colour adjustments, small crops, and re-compression artefacts are usually within the 'Very similar' threshold (Hamming ≤ 10). Heavy crops, filters, or significant edits will produce a higher Hamming distance and may not be matched at the Normal sensitivity setting. Use the Loose setting to cast a wider net.",
  },
  {
    q: "Are my photos uploaded to a server?",
    a: "No. TwinHunt processes everything in your browser using the Canvas API and JavaScript. No image data is transmitted to any server. The tool works completely offline once the page has loaded.",
  },
  {
    q: "Does it work with HEIC files from iPhone?",
    a: "Yes. For preview thumbnails, TwinHunt uses the embedded JPEG thumbnail inside the HEIC file (extracted via exifr) — this is fast and requires no conversion library. The pHash is computed from the full image data via a standard canvas draw, which browsers support for HEIC on macOS and iOS.",
  },
  {
    q: "Can TwinHunt delete my files?",
    a: "No. Browsers cannot delete files from your filesystem. TwinHunt only identifies duplicates and lets you download a plain-text report listing the files you selected for removal. Actual deletion must be done in your file manager or Finder.",
  },
];

export default function TwinHuntPage() {
  return (
    <main>
      <ToolHeader
        title="TwinHunt"
        description="Find duplicate and near-duplicate photos in your browser. Perceptual hashing compares visual content — not file bytes. Nothing uploaded, nothing stored."
        icon={Copy}
        accentColor="#F97316"
      />

      <TwinHunt />

      {/* What is TwinHunt */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">What is TwinHunt?</h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            TwinHunt is a free browser-based duplicate photo finder that uses perceptual hashing (pHash) technology to detect visually similar and identical images. Unlike byte-level comparison, pHash finds duplicates even when photos have been resized, re-saved, or lightly edited. Processing runs at approximately 50ms per image — entirely in your browser.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed">
            Sensitivity is adjustable: strict mode catches exact duplicates (Hamming distance 0–5), normal mode catches very similar images (6–10), and loose mode catches broader matches (11–20). No photo data is ever uploaded to any server. TwinHunt works offline once the page is loaded.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {steps.map((s) => (
              <div key={s.n} className="p-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
                <div className="h-7 w-7 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center justify-center mb-3">
                  <span className="text-xs font-semibold text-[#525252]">{s.n}</span>
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">{s.title}</h3>
                <p className="text-xs text-[#737373] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">What TwinHunt does</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.title} className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{f.title}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">Common questions</h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.q} className="pb-5 border-b border-[#E5E5E5] dark:border-[#2A2A2A] last:border-0">
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{faq.q}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related guide */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg p-4 bg-[#FAFAFA]">
            <p className="text-xs text-[#A3A3A3] uppercase tracking-wide mb-1">Related guide</p>
            <a href="/blog/find-duplicate-photos-free" className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] flex items-center gap-1">
              Find and Remove Duplicate Photos Free →
            </a>
          </div>
        </div>
      </section>

      {/* Related tools */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            More free image tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Compress Images", href: "/tools/compress" },
              { name: "Cull Photos Fast", href: "/tools/cull" },
              { name: "All tools", href: "/tools" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors"
              >
                {tool.name}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SammaPix TwinHunt",
            description:
              "Find visually similar and duplicate photos using perceptual hashing technology. Works entirely in-browser with no file uploads.",
            url: `${APP_URL}/tools/twinhunt`,
            applicationCategory: "PhotographyApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            author: {
              "@type": "Person",
              name: "Luca Sammarco",
              url: "https://lucasammarco.com",
            },
            creator: {
              "@type": "Organization",
              name: "SammaPix",
              url: `${APP_URL}`,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.7",
              ratingCount: "70",
            },
            featureList: [
              "Perceptual hash comparison",
              "Adjustable sensitivity",
              "Zero uploads",
              "Visual similarity detection",
            ],
          }),
        }}
      />
    </main>
  );
}
