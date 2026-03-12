import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, Zap, Sparkles, Lock, FileImage } from "lucide-react";
import SiteGroundBanner from "@/components/ads/SiteGroundBanner";

export const metadata: Metadata = {
  title: "SammaPix vs Canva — Image Compression & Photo Tools Comparison 2026",
  description: "SammaPix vs Canva for image compression and photo tools. SammaPix is faster, fully browser-based, and built specifically for image optimization — not graphic design.",
  keywords: [
    "canva image compress",
    "canva alternative for photo tools",
    "canva vs sammapix",
    "sammapix vs canva",
    "canva image optimizer",
  ],
  alternates: {
    canonical: "https://sammapix.com/vs/canva",
  },
  openGraph: {
    title: "SammaPix vs Canva — Photo Tools Comparison 2026",
    description: "Canva is great for design. For image compression, WebP conversion, and AI rename, SammaPix is the dedicated tool that does it faster and for free.",
    type: "website",
    url: "https://sammapix.com/vs/canva",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix vs Canva comparison",
      },
    ],
  },
};

const tableRows = [
  { feature: "JPG / PNG compression", sammapix: true, canva: "Limited" },
  { feature: "WebP conversion", sammapix: true, canva: false },
  { feature: "Batch file compression", sammapix: true, canva: false },
  { feature: "AI-powered image renaming", sammapix: true, canva: false },
  { feature: "AI alt text generation", sammapix: true, canva: false },
  { feature: "Processes entirely in browser", sammapix: true, canva: false },
  { feature: "No file upload to server", sammapix: true, canva: false },
  { feature: "EXIF data removal", sammapix: true, canva: false },
  { feature: "Quality control slider", sammapix: true, canva: false },
  { feature: "Bulk ZIP download", sammapix: true, canva: "Pro only" },
  { feature: "No account required (compress)", sammapix: true, canva: false },
  { feature: "Graphic design / templates", sammapix: false, canva: true },
  { feature: "Brand kits / team collaboration", sammapix: false, canva: true },
  { feature: "Video editing", sammapix: false, canva: true },
  { feature: "Free plan available", sammapix: true, canva: true },
  { feature: "Price for paid plan", sammapix: "$7/mo", canva: "$15/mo" },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} />;
  if (value === false) return <X className="h-4 w-4 text-gray-300 mx-auto" strokeWidth={2} />;
  return <span className="text-xs text-gray-600 font-medium">{value}</span>;
}

export default function VsCanvaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-10">
        <Link href="/" className="hover:text-gray-600 transition-colors">SammaPix</Link>
        <span>/</span>
        <span>vs Canva</span>
      </div>

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-500 font-medium mb-6">
          Honest comparison — no sponsored ranking
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
          SammaPix vs Canva
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Canva is an excellent design platform. But if you need to compress images, convert to WebP, or rename files with AI for SEO, SammaPix is the dedicated tool built specifically for that — faster, free, and with no upload required.
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
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need to compress or convert images for the web</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want batch WebP conversion with one click</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need AI-generated filenames and alt text for SEO</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want files processed privately in-browser (no upload)</li>
          </ul>
        </div>
        <div className="p-5 border border-gray-200 bg-gray-50/60 rounded-md">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Choose Canva if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Create social media graphics, presentations, or branded content</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Collaborate with a team on design assets</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Need a built-in template library and stock photos</li>
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
                <th className="text-center px-4 py-3 font-medium text-gray-500 w-1/4">Canva</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-gray-600">{row.feature}</td>
                  <td className="px-4 py-3 text-center"><Cell value={row.sammapix} /></td>
                  <td className="px-4 py-3 text-center"><Cell value={row.canva} /></td>
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
              <FileImage className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Different tools for different jobs
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Canva is a graphic design platform built around templates, layouts, and visual creation. SammaPix is an image optimization tool built around compression, format conversion, and SEO metadata. Using Canva to compress images is like using Photoshop to send an email — technically possible, but awkward and slow. SammaPix does this one thing exceptionally well.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Privacy — Canva stores your uploads in the cloud
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              When you upload images to Canva, they are stored on Canva&apos;s servers as part of your media library. SammaPix compresses and converts entirely inside your browser — nothing is uploaded, nothing is stored remotely. For confidential photos, client work, or personally identifiable images, this is an important distinction.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" strokeWidth={1.5} />
              AI rename — zero clicks from upload to SEO-ready filename
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              SammaPix uses Google Gemini to look at each image and generate a descriptive, SEO-optimized filename and alt text. Drop in a folder of product photos with names like <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">photo_001.jpg</code>, and get back <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">red-leather-handbag-womens-fashion.webp</code> with matching alt text. Canva has no equivalent feature — it preserves the original filename you uploaded.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              WebP conversion — Canva doesn&apos;t export WebP on the free plan
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              WebP is 25-34% smaller than JPEG at comparable quality and is now supported by all modern browsers. Canva&apos;s free plan does not export WebP directly. SammaPix converts any image to WebP in-browser for free, with no account required. For anyone optimizing web performance or Core Web Vitals, this is a significant advantage.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Price — SammaPix is free where it matters most
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Canva Pro is $15/month and unlocks premium templates, brand kits, and expanded export options. SammaPix Pro is $7/month and unlocks 100-file batch processing, unlimited AI rename (200/day), ZIP download, and no ads. The core compression and WebP tools on SammaPix are free forever with no account required — Canva requires an account for most workflows.
            </p>
          </div>
        </div>
      </div>

      {/* Internal links */}
      <div className="mb-14">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Explore SammaPix tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/tools/webp" className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">Convert to WebP</p>
              <p className="text-xs text-gray-500 mt-0.5">Convert any image to WebP — free, in-browser, no upload</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
          <Link href="/tools/ai-rename" className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">AI Rename</p>
              <p className="text-xs text-gray-500 mt-0.5">Generate SEO filenames and alt text with Gemini</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border border-gray-200 rounded-md p-8 text-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Need image optimization, not graphic design?</h2>
        <p className="text-sm text-gray-500 mb-6">
          SammaPix compresses, converts, and renames images — free, private, no account required.
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
            headline: "SammaPix vs Canva — Which Tool Should You Use for Image Optimization in 2026?",
            description: "Detailed comparison between SammaPix and Canva for image compression, WebP conversion, and photo optimization.",
            author: { "@type": "Person", name: "Luca Sammarco" },
            publisher: { "@type": "Organization", name: "SammaPix", url: "https://sammapix.com" },
            datePublished: "2026-03-12",
            dateModified: "2026-03-12",
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
            name: "SammaPix vs Canva",
            description: "Feature-by-feature comparison between SammaPix and Canva for image optimization",
            url: "https://sammapix.com/vs/canva",
            mainEntity: {
              "@type": "ItemList",
              name: "Feature Comparison",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Primary purpose", description: "SammaPix: Image optimization | Canva: Graphic design" },
                { "@type": "ListItem", position: 2, name: "WebP conversion", description: "SammaPix: Yes, free | Canva: Not on free plan" },
                { "@type": "ListItem", position: 3, name: "No upload required", description: "SammaPix: Yes — 100% browser-based | Canva: No — cloud storage" },
                { "@type": "ListItem", position: 4, name: "AI image renaming", description: "SammaPix: Yes (Google Gemini) | Canva: No" },
                { "@type": "ListItem", position: 5, name: "Batch compression", description: "SammaPix: Yes, free up to 20 files | Canva: No dedicated compression" },
                { "@type": "ListItem", position: 6, name: "Price", description: "SammaPix: Free (Pro $7/mo) | Canva: Free (Pro $15/mo)" },
                { "@type": "ListItem", position: 7, name: "No account required", description: "SammaPix: Yes (for compression) | Canva: No" },
              ],
            },
          }),
        }}
      />
    </div>
  );
}
