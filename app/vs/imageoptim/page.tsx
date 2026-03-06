import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, Zap, Sparkles, Globe } from "lucide-react";
import SiteGroundBanner from "@/components/ads/SiteGroundBanner";

export const metadata: Metadata = {
  title: "SammaPix vs ImageOptim — Which Image Optimizer is Better in 2026?",
  description:
    "SammaPix vs ImageOptim: compare features, web vs desktop, AI capabilities, and batch processing. Find the best free image optimizer for your workflow.",
  keywords: [
    "imageoptim alternative",
    "sammapix vs imageoptim",
    "imageoptim web alternative",
    "image optimizer mac",
    "online image optimizer vs desktop",
  ],
  alternates: {
    canonical: "https://sammapix.com/vs/imageoptim",
  },
  openGraph: {
    title: "SammaPix vs ImageOptim — Honest Comparison 2026",
    description:
      "ImageOptim is Mac-only. SammaPix works everywhere with WebP conversion and AI features. See the full comparison.",
    type: "website",
  },
};

const tableRows = [
  { feature: "Works in browser (no install)", sammapix: true, imageoptim: false },
  { feature: "Works on Windows / Linux", sammapix: true, imageoptim: false },
  { feature: "WebP conversion", sammapix: true, imageoptim: false },
  { feature: "AI-powered image renaming", sammapix: true, imageoptim: false },
  { feature: "AI alt text generation", sammapix: true, imageoptim: false },
  { feature: "Batch processing", sammapix: true, imageoptim: true },
  { feature: "ZIP download", sammapix: true, imageoptim: false },
  { feature: "EXIF metadata removal", sammapix: true, imageoptim: true },
  { feature: "JPG / PNG compression", sammapix: true, imageoptim: true },
  { feature: "Lossless compression", sammapix: true, imageoptim: true },
  { feature: "Free to use", sammapix: true, imageoptim: true },
  { feature: "No file upload to server", sammapix: true, imageoptim: true },
  { feature: "Mobile-friendly", sammapix: true, imageoptim: false },
  { feature: "Actively maintained", sammapix: true, imageoptim: true },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} />;
  if (value === false) return <X className="h-4 w-4 text-gray-300 mx-auto" strokeWidth={2} />;
  return <span className="text-xs text-gray-600 font-medium">{value}</span>;
}

export default function VsImageOptimPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-10">
        <Link href="/" className="hover:text-gray-600 transition-colors">SammaPix</Link>
        <span>/</span>
        <span>vs ImageOptim</span>
      </div>

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-500 font-medium mb-6">
          Honest comparison — no sponsored ranking
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
          SammaPix vs ImageOptim
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          ImageOptim is the gold standard Mac desktop app. But it&apos;s desktop-only, has no AI features, and can&apos;t convert to WebP. Here&apos;s how they compare.
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
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Use Windows, Linux, or any non-Mac device</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need WebP conversion built-in</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want AI-generated SEO filenames</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Work in the browser with no installs</li>
          </ul>
        </div>
        <div className="p-5 border border-gray-200 bg-gray-50/60 rounded-md">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Choose ImageOptim if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Are on Mac and prefer a native desktop app</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Need deep lossless optimization (MozJPEG, Zopfli, SVGO)</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Want to integrate with your local file system workflow</li>
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
                <th className="text-center px-4 py-3 font-medium text-gray-500 w-1/4">ImageOptim</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-gray-600">{row.feature}</td>
                  <td className="px-4 py-3 text-center"><Cell value={row.sammapix} /></td>
                  <td className="px-4 py-3 text-center"><Cell value={row.imageoptim} /></td>
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
              <Globe className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              ImageOptim is Mac-only — SammaPix works everywhere
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              ImageOptim is a native macOS application. If you&apos;re on Windows, Linux, ChromeOS, or a mobile device, it&apos;s simply not an option. SammaPix runs entirely in your browser — open the URL and it works instantly, on any operating system, with no download or installation required.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              WebP conversion — ImageOptim doesn&apos;t support it
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              ImageOptim compresses JPG, PNG, and GIF files but cannot convert them to WebP. WebP is 25-34% smaller than JPEG at equivalent quality and is now supported by all modern browsers. SammaPix converts any image to WebP in one click, entirely in-browser — no server upload required.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" strokeWidth={1.5} />
              AI rename — ImageOptim has none
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              SammaPix uses Google Gemini to analyze each image and generate an SEO-optimized filename and alt text. Upload <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">IMG_0042.jpg</code>, get back <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">red-ceramic-coffee-mug-wooden-table.webp</code> — automatically. ImageOptim has no equivalent feature; it only compresses, never renames.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Where ImageOptim wins — lossless depth
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              ImageOptim chains multiple compression engines together — MozJPEG, Zopfli, SVGO, AdvPNG, Pngcrush — achieving some of the highest lossless compression ratios available. If you need the absolute maximum lossless optimization for a native Mac workflow and don&apos;t need WebP or AI, ImageOptim is hard to beat.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border border-gray-200 rounded-md p-8 text-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Need a web-based ImageOptim alternative?</h2>
        <p className="text-sm text-gray-500 mb-6">
          SammaPix works on any device, converts to WebP, and renames your files with AI — free.
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
            headline: "SammaPix vs ImageOptim — Which Image Optimizer is Better in 2026?",
            description:
              "SammaPix vs ImageOptim: compare features, web vs desktop, AI capabilities, and batch processing.",
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
