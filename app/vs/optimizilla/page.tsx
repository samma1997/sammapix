import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";
import { Check, X, ArrowRight, Zap, Sparkles, Lock, FileImage } from "lucide-react";
import SiteGroundBanner from "@/components/ads/SiteGroundBanner";

export const metadata: Metadata = {
  title: "SammaPix vs Optimizilla - Free Image Compressor Comparison 2026",
  description: "SammaPix vs Optimizilla comparison. SammaPix is 100% browser-based with no upload, adds WebP conversion and AI rename, and has no 20-image session limit.",
  keywords: [
    "optimizilla alternative",
    "optimizilla vs tinypng",
    "free image compressor",
    "sammapix vs optimizilla",
    "optimizilla vs",
  ],
  alternates: {
    canonical: `${APP_URL}/vs/optimizilla`,
  },
  openGraph: {
    title: "SammaPix vs Optimizilla - Free Image Compressor Comparison 2026",
    description: "Optimizilla uploads your files and limits you to 20 per session. SammaPix is browser-based, unlimited, and adds WebP + AI rename- for free.",
    type: "website",
    url: `${APP_URL}/vs/optimizilla`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix vs Optimizilla comparison",
      },
    ],
  },
};

const tableRows = [
  { feature: "JPG / PNG compression", sammapix: true, optimizilla: true },
  { feature: "WebP conversion", sammapix: true, optimizilla: false },
  { feature: "AI-powered image renaming", sammapix: true, optimizilla: false },
  { feature: "AI alt text generation", sammapix: true, optimizilla: false },
  { feature: "Processes entirely in browser", sammapix: true, optimizilla: false },
  { feature: "No file upload to server", sammapix: true, optimizilla: false },
  { feature: "Files per session limit", sammapix: "20 free / 100 Pro", optimizilla: "20 files" },
  { feature: "Max file size (free)", sammapix: "10 MB", optimizilla: "~25 MB" },
  { feature: "Quality control slider", sammapix: true, optimizilla: true },
  { feature: "EXIF data removal", sammapix: true, optimizilla: false },
  { feature: "Batch download as ZIP", sammapix: true, optimizilla: true },
  { feature: "No account required", sammapix: true, optimizilla: true },
  { feature: "Mobile-friendly UX", sammapix: true, optimizilla: false },
  { feature: "Actively maintained", sammapix: true, optimizilla: "Minimal updates" },
  { feature: "Free to use", sammapix: true, optimizilla: true },
  { feature: "Price for Pro", sammapix: "$7/mo", optimizilla: "N/A" },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} />;
  if (value === false) return <X className="h-4 w-4 text-gray-300 mx-auto" strokeWidth={2} />;
  return <span className="text-xs text-gray-600 font-medium">{value}</span>;
}

export default function VsOptimizillaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-10">
        <Link href="/" className="hover:text-gray-600 transition-colors">SammaPix</Link>
        <span>/</span>
        <span>vs Optimizilla</span>
      </div>

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-500 font-medium mb-6">
          Honest comparison- no sponsored ranking
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
          SammaPix vs Optimizilla
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Optimizilla has been a reliable free image compressor for years. But it uploads your files to a server, caps you at 20 images per session, and offers no WebP conversion or AI features. SammaPix is the modern alternative- built entirely in-browser.
        </p>
        <div className="mt-8">
          <Link href="/">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
              Try SammaPix free
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </Link>
        </div>
      </div>

      {/* Quick verdict */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        <div className="p-5 border border-indigo-200 bg-indigo-50/40 rounded-md">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">Choose SammaPix if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Care about privacy (files processed 100% in-browser)</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want WebP conversion alongside compression</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need AI-generated filenames and alt text for SEO</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want EXIF metadata stripped from output files</li>
          </ul>
        </div>
        <div className="p-5 border border-gray-200 bg-gray-50/60 rounded-md">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Choose Optimizilla if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Prefer a familiar, established tool you&apos;ve used for years</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Only need basic JPEG and PNG compression with a slider</li>
          </ul>
        </div>
      </div>

      {/* Comparison table */}
      <div className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Feature comparison</h2>
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-500 w-1/2">Feature</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-900 w-1/4">SammaPix</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500 w-1/4">Optimizilla</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-gray-600">{row.feature}</td>
                  <td className="px-4 py-3 text-center"><Cell value={row.sammapix} /></td>
                  <td className="px-4 py-3 text-center"><Cell value={row.optimizilla} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key differences */}
      <div className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">The key differences</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Privacy - Optimizilla uploads every image to its servers
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Optimizilla&apos;s compression algorithm runs server-side, which means every image you compress is transmitted to and temporarily stored on their servers. For personal photos, client work, or any sensitive image content, this is a meaningful privacy risk. SammaPix compresses everything using WebAssembly and the Canvas API directly inside your browser. Nothing leaves your device.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <FileImage className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              WebP conversion- a format Optimizilla doesn&apos;t support
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Optimizilla compresses JPEG and PNG- it does not convert to WebP. WebP is now supported by all modern browsers and produces files 25-34% smaller than JPEG at equivalent quality. SammaPix converts any image to WebP in-browser in a single click, making it the better choice for anyone focused on web performance or improving Core Web Vitals.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" strokeWidth={1.5} />
              AI rename- the feature Optimizilla will never have
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              After compressing in Optimizilla, your files retain their original names- <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">DSC_0042-min.jpg</code> tells Google nothing about the image content. SammaPix&apos;s AI rename uses Google Gemini to analyze the image and suggest a descriptive, SEO-friendly filename like <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">mountain-lake-sunrise-reflection.webp</code>. This directly improves image search ranking and accessibility.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              20-image session limit - Optimizilla stops, SammaPix continues
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Optimizilla limits each session to 20 images. If you have 60 product photos to optimize, you need to reload the page and repeat the process three times. SammaPix&apos;s free plan also processes 20 files at once, but the Pro plan handles up to 100 files per batch. For high-volume workflows, SammaPix scales - Optimizilla does not.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              EXIF removal- protect location data Optimizilla leaves intact
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Optimizilla compresses images but does not strip EXIF metadata from the output. That metadata can include GPS coordinates precise to a few meters. SammaPix&apos;s EXIF Remover strips all sensitive metadata client-side before you download - GPS, device model, timestamps, and more. This is a feature Optimizilla has never offered.
            </p>
          </div>
        </div>
      </div>

      {/* Who should switch */}
      <div className="mb-14 p-6 border border-gray-200 rounded-md bg-gray-50/40">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Who should switch from Optimizilla to SammaPix?</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Optimizilla is a fine tool for occasional basic compression. SammaPix is the better choice if:
        </p>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You regularly compress more than 20 images.</strong> SammaPix Pro handles 100 files per batch, and even the free plan resets with each session without friction.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You work with sensitive or private images.</strong> Optimizilla uploads every file. SammaPix never sends anything outside your browser.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You publish images to a website.</strong> WebP conversion, AI rename, and EXIF removal are all part of a complete web image workflow- and SammaPix offers all three.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You care about Core Web Vitals.</strong> Smaller WebP files with descriptive filenames and stripped metadata improve both performance scores and image SEO simultaneously.</span>
          </li>
        </ul>
      </div>

      {/* Internal links */}
      <div className="mb-14">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Explore SammaPix tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/tools/compress" className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">Image Compressor</p>
              <p className="text-xs text-gray-500 mt-0.5">Compress JPG, PNG, WebP- 100% free, no upload</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
          <Link href="/tools/webp" className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">Convert to WebP</p>
              <p className="text-xs text-gray-500 mt-0.5">Convert any image to WebP- faster pages, smaller files</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border border-gray-200 rounded-md p-8 text-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Looking for a better free image compressor?</h2>
        <p className="text-sm text-gray-500 mb-6">
          SammaPix is faster, private, and does far more than Optimizilla- completely free.
        </p>
        <Link href="/">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
            Open SammaPix
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </Link>
      </div>

      {/* Affiliate banners */}
      <div className="mt-8 space-y-3">
        <SiteGroundBanner variant="web-hosting" />
      </div>

      {/* Schema.org - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "SammaPix vs Optimizilla - Which Free Image Compressor is Better in 2026?",
            description: "Detailed feature comparison between SammaPix and Optimizilla free image compression tools.",
            author: { "@type": "Person", name: "Luca Sammarco" },
            publisher: { "@type": "Organization", name: "SammaPix", url: APP_URL },
            datePublished: "2026-03-12",
            dateModified: "2026-03-12",
          }),
        }}
      />

      {/* Schema.org - WebPage + ItemList comparison */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "SammaPix vs Optimizilla",
            description: "Feature-by-feature comparison between SammaPix and Optimizilla",
            url: `${APP_URL}/vs/optimizilla`,
            mainEntity: {
              "@type": "ItemList",
              name: "Feature Comparison",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Price", description: "SammaPix: Free (Pro $7/mo) | Optimizilla: Free" },
                { "@type": "ListItem", position: 2, name: "No upload required", description: "SammaPix: Yes- 100% browser-based | Optimizilla: No- uploads to server" },
                { "@type": "ListItem", position: 3, name: "WebP conversion", description: "SammaPix: Yes | Optimizilla: No" },
                { "@type": "ListItem", position: 4, name: "AI image renaming", description: "SammaPix: Yes (Google Gemini) | Optimizilla: No" },
                { "@type": "ListItem", position: 5, name: "Session file limit", description: "SammaPix: 20 free / 100 Pro | Optimizilla: 20 per session" },
                { "@type": "ListItem", position: 6, name: "EXIF metadata removal", description: "SammaPix: Yes | Optimizilla: No" },
                { "@type": "ListItem", position: 7, name: "Quality slider", description: "SammaPix: Yes | Optimizilla: Yes" },
              ],
            },
          }),
        }}
      />

      {/* Schema.org - BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${APP_URL}` },
              { "@type": "ListItem", position: 2, name: "Comparisons", item: `${APP_URL}/vs` },
              { "@type": "ListItem", position: 3, name: "SammaPix vs Optimizilla", item: `${APP_URL}/vs/optimizilla` },
            ],
          }),
        }}
      />

      {/* Schema.org - FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is SammaPix better than Optimizilla?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, SammaPix is superior in almost every way. Both are free image compressors, but SammaPix offers privacy (no server uploads), WebP conversion, AI-powered image renaming, EXIF metadata removal, and batch processing without upload limits. Optimizilla uploads every image to their servers and lacks all of these modern features.",
                },
              },
              {
                "@type": "Question",
                name: "Is Optimizilla free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Optimizilla is completely free with no premium version or account required.",
                },
              },
              {
                "@type": "Question",
                name: "What can SammaPix do that Optimizilla can't?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SammaPix offers multiple capabilities that Optimizilla lacks: 100% in-browser processing with no server uploads, WebP conversion for modern image formats, AI-powered image renaming and alt text generation, EXIF metadata removal for privacy protection, and unlimited free batch processing without server file limits.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
