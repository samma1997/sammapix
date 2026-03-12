import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";
import { Check, X, ArrowRight, Sparkles, Lock, Globe, DollarSign, Camera } from "lucide-react";
import SiteGroundBanner from "@/components/ads/SiteGroundBanner";

export const metadata: Metadata = {
  title: "SammaPix vs VSCO: Best Photo Editor for Travel Photographers (2026)",
  description:
    "SammaPix vs VSCO: honest comparison for travel photographers. Free browser-based tool vs paid mobile app. Batch processing, EXIF removal, AI rename, WebP export — all compared.",
  keywords: [
    "vsco alternative free",
    "sammapix vs vsco",
    "vsco competitor",
    "free photo editor for travel",
    "vsco without subscription",
    "browser photo editor",
  ],
  alternates: {
    canonical: `${APP_URL}/vs/vsco`,
  },
  openGraph: {
    title: "SammaPix vs VSCO — Best Photo Editor for Travel Photographers (2026)",
    description:
      "VSCO costs $19.99/year and is mobile-only. SammaPix is free, browser-based, and built for batch workflows. See the full comparison.",
    type: "website",
  },
};

const tableRows = [
  { feature: "Price",                       sammapix: "Free + $59/yr Pro",  vsco: "$19.99/year" },
  { feature: "Browser-based (no install)",   sammapix: true,                 vsco: false },
  { feature: "Mobile app",                   sammapix: false,                vsco: true },
  { feature: "Batch processing",             sammapix: true,                 vsco: false },
  { feature: "EXIF / metadata strip",        sammapix: true,                 vsco: false },
  { feature: "AI image renaming",            sammapix: true,                 vsco: false },
  { feature: "WebP export",                  sammapix: true,                 vsco: false },
  { feature: "Film presets / filters",       sammapix: true,                 vsco: true },
  { feature: "No file upload to server",     sammapix: true,                 vsco: false },
  { feature: "Free plan available",          sammapix: true,                 vsco: "Limited trial" },
  { feature: "Bulk ZIP download",            sammapix: true,                 vsco: false },
  { feature: "SEO alt text generation",      sammapix: true,                 vsco: false },
  { feature: "Desktop-friendly UX",          sammapix: true,                 vsco: false },
  { feature: "Image compression",            sammapix: true,                 vsco: false },
  { feature: "No account required (core)",   sammapix: true,                 vsco: false },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} />;
  if (value === false) return <X className="h-4 w-4 text-gray-300 mx-auto" strokeWidth={2} />;
  return <span className="text-xs text-gray-600 font-medium">{value}</span>;
}

export default function VsVscoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-10">
        <Link href="/" className="hover:text-gray-600 transition-colors">SammaPix</Link>
        <span>/</span>
        <span>vs VSCO</span>
      </div>

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-500 font-medium mb-6">
          Honest comparison — no sponsored ranking
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
          SammaPix vs VSCO
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          VSCO is a beautiful mobile photo editor. SammaPix is a free, browser-based workflow tool. For travel photographers who need to export, compress, rename, and publish photos fast — they solve very different problems.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
              Try SammaPix free
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </Link>
          <Link href="/pricing">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              See pricing
            </button>
          </Link>
        </div>
      </div>

      {/* Quick verdict */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        <div className="p-5 border border-indigo-200 bg-indigo-50/40 rounded-md">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">Choose SammaPix if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need to process dozens of photos after a trip</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want WebP export for fast-loading travel blogs</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need AI-generated SEO filenames and alt text</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want to strip GPS/EXIF data before publishing</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Work on a laptop and prefer a browser tool</li>
          </ul>
        </div>
        <div className="p-5 border border-gray-200 bg-gray-50/60 rounded-md">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Choose VSCO if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Edit photos on your phone and share to Instagram</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Love VSCO&apos;s curated film presets for aesthetic editing</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Want a community feed and social discovery</li>
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
                <th className="text-center px-4 py-3 font-medium text-gray-500 w-1/4">VSCO</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-gray-600">{row.feature}</td>
                  <td className="px-4 py-3 text-center"><Cell value={row.sammapix} /></td>
                  <td className="px-4 py-3 text-center"><Cell value={row.vsco} /></td>
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
              VSCO is a mobile app — SammaPix is a browser tool
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              VSCO lives on your phone. It&apos;s great for on-the-go editing and sharing directly to Instagram or the VSCO community feed. SammaPix runs in any desktop or mobile browser — no download, no install. When you get home from a trip with 80 RAW exports and need to optimize them for your travel blog, a browser-based batch tool is the right choice. These two tools genuinely serve different moments in a photographer&apos;s workflow.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Camera className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Batch processing — VSCO doesn&apos;t have it
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              VSCO is designed for one photo at a time. You can copy and paste settings between photos, but there&apos;s no true batch processing or bulk export. SammaPix lets you drop up to 20 images at once (free plan) or 100 on Pro, compress them all, convert to WebP, rename with AI, and download a ZIP — in one session. For travel photographers publishing to WordPress or a static site, this difference alone saves hours per week.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              EXIF removal — strip GPS before you publish
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every photo from your camera or phone embeds GPS coordinates, device model, and timestamp in the EXIF metadata. When you publish those photos to your travel blog, that data is public. VSCO does not offer EXIF stripping. SammaPix removes all metadata client-side — your files never leave your browser, and you get clean, private images ready to publish. This is especially valuable for travel photographers who photograph sensitive locations or want to protect their home coordinates.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" strokeWidth={1.5} />
              AI rename — from IMG_4829.jpg to lisbon-sunset-alfama-rooftop.webp
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Search engines cannot see images — they read filenames and alt text. A file named <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">IMG_4829.jpg</code> contributes nothing to your SEO. SammaPix uses Google Gemini to analyze each image and generate a descriptive, keyword-rich filename and alt text automatically. Upload your Lisbon trip photos, get back <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">lisbon-sunset-alfama-rooftop-golden-hour.webp</code> with a full alt description. VSCO has no SEO features whatsoever — it&apos;s not built for web publishing.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Price — SammaPix free plan vs VSCO subscription
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              VSCO requires a paid subscription ($19.99/year) to access its full preset library and features. There is a very limited free tier, but most of what makes VSCO appealing — the X-Series and A-Series film presets — requires payment. SammaPix&apos;s core tools (compress, convert to WebP, EXIF remover, resize) are completely free with no account required. AI rename and batch above 20 files require either a free account or Pro ($59/year). For travel bloggers on a budget, SammaPix is the obvious choice for the optimization workflow.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Where VSCO genuinely wins — mobile editing and film aesthetics
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              VSCO&apos;s film presets are exceptional. The A4, A6, HB1, and HB2 presets replicate analog film grain, color shifts, and fading in ways that are difficult to match elsewhere. If you want to give your travel photos a warm, film-inspired look and share them on Instagram, VSCO is one of the best tools available. The two tools actually complement each other: edit and style in VSCO on mobile, then bring your exports into SammaPix on desktop to optimize, rename, and publish.
            </p>
          </div>
        </div>
      </div>

      {/* Use case section */}
      <div className="mb-14 p-6 border border-gray-200 rounded-md bg-gray-50/40">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">The travel photographer&apos;s workflow</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Most travel photographers who use VSCO also need a separate tool for web publishing. Here&apos;s a workflow that combines the best of both:
        </p>
        <ol className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center font-medium mt-0.5">1</span>
            <span>Shoot on your camera or phone. Import to VSCO for color grading and film preset styling.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center font-medium mt-0.5">2</span>
            <span>Export full-resolution JPGs from VSCO to your desktop.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center font-medium mt-0.5">3</span>
            <span>Drop all photos into SammaPix. Enable EXIF strip, convert to WebP, run AI rename.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center font-medium mt-0.5">4</span>
            <span>Download ZIP and upload directly to WordPress, Webflow, or your static site generator.</span>
          </li>
        </ol>
        <p className="text-sm text-gray-500 mt-4">
          This workflow takes about 3 minutes for a full batch. No manual renaming, no Photoshop export settings, no server uploads.
        </p>
      </div>

      {/* Internal links */}
      <div className="mb-14">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Explore SammaPix tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/tools" className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">All tools</p>
              <p className="text-xs text-gray-500 mt-0.5">Compress, convert, rename, resize, EXIF strip</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
          <Link href="/pricing" className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">Pricing</p>
              <p className="text-xs text-gray-500 mt-0.5">Free forever — Pro at $59/year for power users</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border border-gray-200 rounded-md p-8 text-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Optimize your travel photos in minutes</h2>
        <p className="text-sm text-gray-500 mb-6">
          Batch compress, convert to WebP, strip EXIF, and rename with AI — all in the browser, all free.
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
            headline: "SammaPix vs VSCO: Best Photo Editor for Travel Photographers (2026)",
            description:
              "Detailed feature comparison between SammaPix and VSCO for travel photographers. Covers batch processing, EXIF removal, AI rename, WebP export, and pricing.",
            author: { "@type": "Person", name: "Luca Sammarco" },
            publisher: { "@type": "Organization", name: "SammaPix", url: APP_URL },
            datePublished: "2026-03-08",
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
            name: "SammaPix vs VSCO",
            description: "Feature-by-feature comparison between SammaPix and VSCO photo editing tools",
            url: `${APP_URL}/vs/vsco`,
            mainEntity: {
              "@type": "ItemList",
              name: "Feature Comparison",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Price", description: "SammaPix: Free + Pro $59/yr | VSCO: $19.99/year" },
                { "@type": "ListItem", position: 2, name: "Browser-based", description: "SammaPix: Yes — no install required | VSCO: No — mobile app only" },
                { "@type": "ListItem", position: 3, name: "Batch processing", description: "SammaPix: Yes, up to 20 files free | VSCO: No" },
                { "@type": "ListItem", position: 4, name: "EXIF metadata strip", description: "SammaPix: Yes — client-side | VSCO: No" },
                { "@type": "ListItem", position: 5, name: "AI image renaming", description: "SammaPix: Yes (Google Gemini) | VSCO: No" },
                { "@type": "ListItem", position: 6, name: "WebP export", description: "SammaPix: Yes | VSCO: No" },
                { "@type": "ListItem", position: 7, name: "Film presets", description: "SammaPix: Yes | VSCO: Yes — core strength" },
              ],
            },
          }),
        }}
      />
    </div>
  );
}
