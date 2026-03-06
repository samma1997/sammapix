import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, Zap, Sparkles, Lock } from "lucide-react";
import SiteGroundBanner from "@/components/ads/SiteGroundBanner";

export const metadata: Metadata = {
  title: "SammaPix vs Compressor.io — Free Image Compressor Comparison 2026",
  description:
    "SammaPix vs Compressor.io: compare batch processing, AI features, file limits, and privacy. Find out which free image compressor fits your workflow.",
  keywords: [
    "compressor.io alternative",
    "sammapix vs compressor.io",
    "better than compressor io",
    "free image compressor comparison",
    "compressor io replacement",
  ],
  alternates: {
    canonical: "https://sammapix.com/vs/compressor-io",
  },
  openGraph: {
    title: "SammaPix vs Compressor.io — Honest Comparison 2026",
    description:
      "Compressor.io is limited to one file at a time and uploads to their servers. SammaPix does batch, stays private. See the full comparison.",
    type: "website",
  },
};

const tableRows: { feature: string; sammapix: boolean | string; compressorio: boolean | string }[] = [
  { feature: "Processes in browser (no upload)", sammapix: true, compressorio: false },
  { feature: "Batch / multiple files at once", sammapix: true, compressorio: false },
  { feature: "Max file size", sammapix: "50 MB (Pro)", compressorio: "10 MB" },
  { feature: "WebP conversion", sammapix: true, compressorio: "Limited" },
  { feature: "AI-powered image renaming", sammapix: true, compressorio: false },
  { feature: "AI alt text generation", sammapix: true, compressorio: false },
  { feature: "EXIF metadata removal", sammapix: true, compressorio: false },
  { feature: "ZIP download", sammapix: true, compressorio: false },
  { feature: "JPG / PNG / WebP compression", sammapix: true, compressorio: true },
  { feature: "Free plan available", sammapix: true, compressorio: true },
  { feature: "No account required", sammapix: true, compressorio: true },
  { feature: "File privacy (client-side)", sammapix: true, compressorio: false },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} />;
  if (value === false) return <X className="h-4 w-4 text-gray-300 mx-auto" strokeWidth={2} />;
  return <span className="text-xs text-gray-600 font-medium">{value}</span>;
}

export default function VsCompressorIoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-10">
        <Link href="/" className="hover:text-gray-600 transition-colors">SammaPix</Link>
        <span>/</span>
        <span>vs Compressor.io</span>
      </div>

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-500 font-medium mb-6">
          Honest comparison — no sponsored ranking
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
          SammaPix vs Compressor.io
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Compressor.io is clean and fast, but limited to 10 MB files, one at a time, with files uploaded to their servers. Here&apos;s the full comparison.
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
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need to compress more than one file at a time</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Privacy matters — files never leave your browser</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need files larger than 10 MB</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want AI-generated SEO filenames</li>
          </ul>
        </div>
        <div className="p-5 border border-gray-200 bg-gray-50/60 rounded-md">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Choose Compressor.io if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Need to compress a single image quickly</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Want a very simple, minimal interface</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> File size is under 10 MB</li>
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
                <th className="text-center px-4 py-3 font-medium text-gray-500 w-1/4">Compressor.io</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-gray-600">{row.feature}</td>
                  <td className="px-4 py-3 text-center"><Cell value={row.sammapix} /></td>
                  <td className="px-4 py-3 text-center"><Cell value={row.compressorio} /></td>
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
              Files never leave your browser — Compressor.io uploads to their server
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every image you compress with Compressor.io is uploaded to their servers for processing. SammaPix runs entirely client-side using WebAssembly and the Canvas API — your files are processed locally and never transmitted anywhere. This matters for client photos, confidential screenshots, or any image containing sensitive information.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Batch processing — Compressor.io only does one file
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Compressor.io processes a single image per session. If you have 15 product photos to optimize, you repeat the process 15 times. SammaPix processes up to 20 files at once on the free plan, with a single ZIP download at the end. This alone saves significant time for any real-world workflow.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" strokeWidth={1.5} />
              AI rename — Compressor.io has none
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              SammaPix uses Google Gemini to analyze each image and generate an SEO-optimized filename and alt text. Upload <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">photo_2024.jpg</code>, get back <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">blue-denim-jacket-product-photo.webp</code> — automatically. Compressor.io has no AI features whatsoever; it only compresses.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Where Compressor.io wins — pure simplicity
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Compressor.io has an extremely minimal interface — drag one file, see the result. If you just need to quickly compress a single image and don&apos;t need batch, privacy, or AI features, its simplicity is a genuine advantage. It also offers lossy and lossless modes side by side for easy comparison.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border border-gray-200 rounded-md p-8 text-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Need batch compression with full privacy?</h2>
        <p className="text-sm text-gray-500 mb-6">
          SammaPix processes up to 20 files at once — entirely in your browser. Zero uploads.
        </p>
        <Link href="/">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
            Open SammaPix
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </Link>
      </div>

      {/* Affiliate banner */}
      <div className="mt-8 space-y-3">
        <SiteGroundBanner variant="web-hosting" />
      </div>

      {/* Schema.org comparison */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "SammaPix vs Compressor.io — Free Image Compressor Comparison 2026",
            description:
              "SammaPix vs Compressor.io: compare batch processing, AI features, file limits, and privacy.",
            author: { "@type": "Person", name: "Luca Sammarco" },
            publisher: { "@type": "Organization", name: "SammaPix", url: "https://sammapix.com" },
            datePublished: "2026-03-06",
            dateModified: "2026-03-06",
          }),
        }}
      />
    </div>
  );
}
