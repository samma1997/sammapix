import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, Zap, Sparkles, Lock, FileImage } from "lucide-react";
import SiteGroundBanner from "@/components/ads/SiteGroundBanner";

export const metadata: Metadata = {
  title: "SammaPix vs TinyPNG — Which Free Image Compressor is Better in 2026?",
  description: "SammaPix vs TinyPNG: detailed comparison of features, quality, limits, and AI capabilities. Find out which free image compressor is right for you.",
  keywords: [
    "tinypng alternative",
    "sammapix vs tinypng",
    "best free image compressor",
    "tinypng competitor",
    "image compression tool comparison",
  ],
  alternates: {
    canonical: "https://sammapix.com/vs/tinypng",
  },
  openGraph: {
    title: "SammaPix vs TinyPNG — Honest Comparison 2026",
    description: "TinyPNG is good. SammaPix is better. See the feature-by-feature comparison.",
    type: "website",
  },
};

const tableRows = [
  { feature: "JPG / PNG compression", sammapix: true, tinypng: true },
  { feature: "WebP conversion", sammapix: true, tinypng: false },
  { feature: "AI-powered image renaming", sammapix: true, tinypng: false },
  { feature: "AI alt text generation", sammapix: true, tinypng: false },
  { feature: "Processes entirely in browser", sammapix: true, tinypng: false },
  { feature: "No file upload to server", sammapix: true, tinypng: false },
  { feature: "Free plan file limit", sammapix: "20 files", tinypng: "20 files/month" },
  { feature: "Free plan max file size", sammapix: "10 MB", tinypng: "5 MB" },
  { feature: "Batch download as ZIP", sammapix: true, tinypng: "Pro only" },
  { feature: "Quality control slider", sammapix: true, tinypng: false },
  { feature: "EXIF data removal", sammapix: true, tinypng: false },
  { feature: "No account required (compress)", sammapix: true, tinypng: true },
  { feature: "API access", sammapix: "Pro", tinypng: "Paid" },
  { feature: "WordPress plugin", sammapix: false, tinypng: true },
  { feature: "Price for Pro", sammapix: "$7/mo", tinypng: "$25/mo" },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} />;
  if (value === false) return <X className="h-4 w-4 text-gray-300 mx-auto" strokeWidth={2} />;
  return <span className="text-xs text-gray-600 font-medium">{value}</span>;
}

export default function VsTinyPngPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-10">
        <Link href="/" className="hover:text-gray-600 transition-colors">SammaPix</Link>
        <span>/</span>
        <span>vs TinyPNG</span>
      </div>

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-500 font-medium mb-6">
          Honest comparison — no sponsored ranking
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
          SammaPix vs TinyPNG
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Both are free. Both compress images. But only one converts to WebP, renames files with AI, and never uploads your photos to a server.
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
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want WebP conversion built-in</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need AI-generated SEO filenames</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Care about privacy (100% client-side)</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want a quality slider (not fixed)</li>
          </ul>
        </div>
        <div className="p-5 border border-gray-200 bg-gray-50/60 rounded-md">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Choose TinyPNG if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Use WordPress and need a plugin</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Need API integration for automated pipelines</li>
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
                <th className="text-center px-4 py-3 font-medium text-gray-500 w-1/4">TinyPNG</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-gray-600">{row.feature}</td>
                  <td className="px-4 py-3 text-center"><Cell value={row.sammapix} /></td>
                  <td className="px-4 py-3 text-center"><Cell value={row.tinypng} /></td>
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
              Privacy — your files never leave your device
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              TinyPNG uploads your images to their servers for compression. SammaPix compresses and converts everything locally in your browser using WebAssembly and the Canvas API. Your files are never sent anywhere — this matters if you work with client photos, confidential screenshots, or private images.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <FileImage className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              WebP conversion — TinyPNG doesn&apos;t do it for free
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              WebP is 25-34% smaller than JPEG at equivalent quality. It&apos;s supported by all modern browsers and improves Core Web Vitals. TinyPNG supports WebP input but doesn&apos;t convert JPG/PNG to WebP. SammaPix converts any image to WebP in one click, in-browser, for free.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" strokeWidth={1.5} />
              AI rename — a feature TinyPNG doesn&apos;t have at all
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              SammaPix uses Google Gemini to analyze each image and generate an SEO-optimized filename and alt text. Upload <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">IMG_4829.jpg</code>, get back <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">golden-retriever-puppy-playing-grass.webp</code> — automatically. This feature is free with a login (5/day), or unlimited on Pro.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Price — SammaPix Pro is 3x cheaper
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              TinyPNG Pro starts at $25/month. SammaPix Pro is $7/month and includes unlimited AI rename (200/day), bulk processing up to 100 files, ZIP download, and no ads. For most users, the free plan is enough forever.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border border-gray-200 rounded-md p-8 text-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready to try a better alternative?</h2>
        <p className="text-sm text-gray-500 mb-6">
          No signup required for compression. Free forever for the core tools.
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

      {/* Schema.org — Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "SammaPix vs TinyPNG — Which Free Image Compressor is Better in 2026?",
            description: "Detailed feature comparison between SammaPix and TinyPNG image compression tools.",
            author: { "@type": "Person", name: "Luca Sammarco" },
            publisher: { "@type": "Organization", name: "SammaPix", url: "https://sammapix.com" },
            datePublished: "2026-03-05",
            dateModified: "2026-03-08",
          }),
        }}
      />

      {/* Schema.org — WebPage + ItemList comparison */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "SammaPix vs TinyPNG",
            description: "Feature-by-feature comparison between SammaPix and TinyPNG",
            url: "https://sammapix.com/vs/tinypng",
            mainEntity: {
              "@type": "ItemList",
              name: "Feature Comparison",
              itemListElement: [
                { "@type": "ListItem", "position": 1, name: "Price", description: "SammaPix: Free (Pro $7/mo) | TinyPNG: Free (Pro $25/mo)" },
                { "@type": "ListItem", "position": 2, name: "Batch processing", description: "SammaPix: Yes, up to 20 files free | TinyPNG: Yes, 20 files/month free" },
                { "@type": "ListItem", "position": 3, name: "No upload required", description: "SammaPix: Yes — 100% browser-based | TinyPNG: No — uploads to server" },
                { "@type": "ListItem", "position": 4, name: "WebP conversion", description: "SammaPix: Yes | TinyPNG: No" },
                { "@type": "ListItem", "position": 5, name: "AI image renaming", description: "SammaPix: Yes (Google Gemini) | TinyPNG: No" },
                { "@type": "ListItem", "position": 6, name: "EXIF metadata removal", description: "SammaPix: Yes | TinyPNG: No" },
                { "@type": "ListItem", "position": 7, name: "Quality slider", description: "SammaPix: Yes | TinyPNG: No (fixed algorithm)" },
              ],
            },
          }),
        }}
      />
    </div>
  );
}
