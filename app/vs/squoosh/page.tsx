import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";
import { Check, X, ArrowRight, Sparkles, Lock, Globe, Zap } from "lucide-react";
import SiteGroundBanner from "@/components/ads/SiteGroundBanner";

export const metadata: Metadata = {
  title: "SammaPix vs Squoosh - Image Optimizer Comparison 2026",
  description: "SammaPix vs Squoosh by Google. Both free, but SammaPix adds batch processing, AI rename, WebP conversion, and privacy (no uploads).",
  keywords: [
    "squoosh alternative",
    "sammapix vs squoosh",
    "squoosh replacement",
    "image optimizer comparison",
    "google squoosh vs",
  ],
  alternates: {
    canonical: `${APP_URL}/vs/squoosh`,
  },
  openGraph: {
    title: "SammaPix vs Squoosh - Image Optimizer Comparison 2026",
    description: "Squoosh is powerful but single-file only. SammaPix adds batch processing, AI rename, and no file upload to server.",
    type: "website",
    url: `${APP_URL}/vs/squoosh`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix vs Squoosh comparison",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SammaPix vs Squoosh - Image Optimizer Comparison 2026",
    description: "SammaPix vs Squoosh by Google. Both free, but SammaPix adds batch processing, AI rename, WebP conversion, and privacy (no uploads).",
  },
};

const tableRows = [
  { feature: "Price", sammapix: "Free (Pro $9/mo)", squoosh: "Free (no Pro plan)" },
  { feature: "Tools available", sammapix: "25+", squoosh: "1 (compress/convert)" },
  { feature: "Browser-based (no upload)", sammapix: true, squoosh: true },
  { feature: "AI features (rename, alt text, sort)", sammapix: true, squoosh: false },
  { feature: "Batch processing", sammapix: "20 free / 500 Pro", squoosh: "1 file at a time" },
  { feature: "Format support", sammapix: "JPEG, PNG, WebP, HEIC, GIF, AVIF", squoosh: "JPEG, PNG, WebP, AVIF" },
  { feature: "Max file size", sammapix: "20 MB free / 50 MB Pro", squoosh: "No limit (browser RAM)" },
  { feature: "JPG / PNG / WebP compression", sammapix: true, squoosh: true },
  { feature: "AVIF support", sammapix: true, squoosh: true },
  { feature: "WebP conversion", sammapix: true, squoosh: true },
  { feature: "Bulk ZIP download", sammapix: true, squoosh: false },
  { feature: "Quality slider", sammapix: true, squoosh: true },
  { feature: "Side-by-side preview", sammapix: false, squoosh: true },
  { feature: "Codec-level settings (MozJPEG, OxiPNG)", sammapix: false, squoosh: true },
  { feature: "EXIF data removal", sammapix: true, squoosh: false },
  { feature: "No account required", sammapix: true, squoosh: true },
  { feature: "Actively maintained", sammapix: true, squoosh: "Archived 2023" },
  { feature: "Mobile-friendly UX", sammapix: true, squoosh: false },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} />;
  if (value === false) return <X className="h-4 w-4 text-gray-300 mx-auto" strokeWidth={2} />;
  return <span className="text-xs text-gray-600 font-medium">{value}</span>;
}

export default function VsSquooshPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-10">
        <Link href="/" className="hover:text-gray-600 transition-colors">SammaPix</Link>
        <span>/</span>
        <span>vs Squoosh</span>
      </div>

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-500 font-medium mb-6">
          Honest comparison- no sponsored ranking
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
          SammaPix vs Squoosh
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Squoosh by Google is technically impressive. But it&apos;s single-file only, was archived in 2023, and has zero AI features. Here&apos;s how they compare.
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
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need to process multiple files at once</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want AI-generated SEO filenames and alt text</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want a tool that&apos;s actively maintained</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Work on mobile or need a simple UX</li>
          </ul>
        </div>
        <div className="p-5 border border-gray-200 bg-gray-50/60 rounded-md">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Choose Squoosh if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Need advanced codec settings (MozJPEG, OxiPNG, AVIF)</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Want side-by-side before/after preview</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Only need to process one image at a time</li>
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
                <th className="text-center px-4 py-3 font-medium text-gray-500 w-1/4">Squoosh</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-gray-600">{row.feature}</td>
                  <td className="px-4 py-3 text-center"><Cell value={row.sammapix} /></td>
                  <td className="px-4 py-3 text-center"><Cell value={row.squoosh} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-world compression benchmark */}
      <div className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Real-world compression test</h2>
        <p className="text-sm text-gray-500 mb-4">
          We tested both tools with the same 5 MB JPEG photo (4000x3000px, landscape). Quality set to 80. Results:
        </p>
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-500">Metric</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-900">SammaPix</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">Squoosh</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="px-4 py-3 text-gray-600">Original file</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium">5.0 MB JPEG</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium">5.0 MB JPEG</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-4 py-3 text-gray-600">Compressed JPEG output</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium">812 KB (84% smaller)</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium">780 KB (84% smaller)</td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-3 text-gray-600">WebP output</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium">624 KB (87% smaller)</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium">610 KB (88% smaller)</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-4 py-3 text-gray-600">AVIF output</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium">480 KB (90% smaller)</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium">460 KB (91% smaller)</td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-3 text-gray-600">Batch 20 images?</td>
                <td className="px-4 py-3 text-center text-xs text-green-600 font-medium">~24s total</td>
                <td className="px-4 py-3 text-center text-xs text-gray-400 font-medium">N/A (1 file at a time)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Test performed March 2026. Both tools run in-browser. Squoosh uses MozJPEG codec. Results may vary depending on image content.
        </p>
      </div>

      {/* Verdict */}
      <div className="mb-14 p-6 border border-indigo-200 bg-indigo-50/30 rounded-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Verdict: SammaPix vs Squoosh</h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          <strong>SammaPix is better for</strong> batch workflows (process 20+ images at once), AI-powered renaming and alt text, EXIF removal, mobile use, and anyone who needs an actively maintained tool with 25+ features. Compression quality is comparable.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          <strong>Squoosh is better for</strong> developers who need fine-grained codec control (MozJPEG, OxiPNG, AVIF encoder settings) and a side-by-side before/after preview on a single image. However, Squoosh was archived by Google in 2023 and receives no updates.
        </p>
      </div>

      {/* Key differences */}
      <div className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">The key differences</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Squoosh was archived by Google in 2023
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Google&apos;s Chrome team archived the Squoosh repository in late 2023. The tool still works- browser APIs haven&apos;t changed- but it receives no new features, no security updates, and no bug fixes. SammaPix is actively developed and deployed on a modern Next.js stack.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Batch processing - Squoosh only does one file at a time
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Squoosh is designed as a single-image editor with a detailed before/after view. SammaPix is designed for batch workflows- drop 20 images at once, compress and convert them all, download a ZIP. For content creators and developers, this is a significant practical difference.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" strokeWidth={1.5} />
              AI features - Squoosh has none
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              SammaPix uses Google Gemini to analyze images and generate SEO-optimized filenames and alt text. Upload <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">DSC_1042.jpg</code>, get back <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">sunset-amalfi-coast-italy.webp</code> with a full alt text description. Squoosh has no AI features and no plans to add them.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Where Squoosh wins- codec control
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Squoosh exposes low-level codec settings: MozJPEG chroma subsampling, OxiPNG filter strategies, AVIF encoder settings. If you&apos;re a developer who needs to squeeze every byte and tune codec-level parameters, Squoosh&apos;s advanced controls are unmatched. SammaPix focuses on the 95% use case: good quality, small size, fast workflow.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              EXIF removal- a privacy feature Squoosh skips
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Squoosh preserves EXIF metadata in your output files. That metadata contains GPS coordinates, device model, lens info, and timestamps. For photographers who publish images to the web, this can be a significant privacy leak- especially if you photograph from home or work locations. SammaPix&apos;s EXIF Remover strips all metadata client-side before you download the file. No server needed, no data sent anywhere.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Price- both free, but SammaPix has a Pro tier for power users
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Squoosh is completely free with no plans or tiers- it&apos;s a Google open-source project. SammaPix is also free for core tools, with a Pro plan at $59/year that adds 100-file batch processing, unlimited AI rename (200/day), ZIP download, and no ads. For most users, both tools are free. The difference is that SammaPix is actively evolving its feature set, while Squoosh is archived and frozen.
            </p>
          </div>
        </div>
      </div>

      {/* Who should switch */}
      <div className="mb-14 p-6 border border-gray-200 rounded-md bg-gray-50/40">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Who should switch from Squoosh to SammaPix?</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          Squoosh is not going away- it still works. But it is no longer maintained, and it has never supported batch workflows or AI features. You should consider switching if:
        </p>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You process more than one image at a time.</strong> Squoosh&apos;s one-file-at-a-time design becomes painful fast when you have 20+ images to optimize for a blog post or product launch.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You publish to a website and care about SEO.</strong> AI rename generates descriptive filenames and alt text that Squoosh cannot produce.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You want EXIF data removed.</strong> Squoosh outputs files with full metadata intact.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You need a tool that will receive updates.</strong> Squoosh was archived by Google in 2023. SammaPix ships new features regularly.</span>
          </li>
        </ul>
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
              <p className="text-xs text-gray-500 mt-0.5">Free forever - Pro at $59/year for power users</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border border-gray-200 rounded-md p-8 text-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Need batch processing + AI rename?</h2>
        <p className="text-sm text-gray-500 mb-6">
          SammaPix handles up to 20 files at once- free, no signup for compression.
        </p>
        <Link href="/">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
            Open SammaPix
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </Link>
      </div>

      {/* Related tools and pages */}
      <div className="mb-14">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Try SammaPix tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/tools/compress" className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">Compress Images</p>
              <p className="text-xs text-gray-500 mt-0.5">JPG, PNG, WebP with quality slider</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
          <Link href="/tools/ai-rename" className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">AI Rename</p>
              <p className="text-xs text-gray-500 mt-0.5">Squoosh feature exclusive: AI filenames</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
          <Link href="/tools/resizepack" className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">Batch Resize</p>
              <p className="text-xs text-gray-500 mt-0.5">Resize multiple images at once</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
        </div>
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
            headline: "SammaPix vs Squoosh - Which Image Optimizer Should You Use in 2026?",
            description: "Detailed feature comparison between SammaPix and Squoosh image optimization tools.",
            author: { "@type": "Person", name: "Luca Sammarco" },
            publisher: { "@type": "Organization", name: "SammaPix", url: APP_URL },
            datePublished: "2026-03-05",
            dateModified: "2026-03-28",
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
            name: "SammaPix vs Squoosh",
            description: "Feature-by-feature comparison between SammaPix and Squoosh",
            url: `${APP_URL}/vs/squoosh`,
            mainEntity: {
              "@type": "ItemList",
              name: "Feature Comparison",
              itemListElement: [
                { "@type": "ListItem", "position": 1, name: "Price", description: "SammaPix: Free (Pro $9/mo) | Squoosh: Free (no Pro plan)" },
                { "@type": "ListItem", "position": 2, name: "Tools available", description: "SammaPix: 25+ tools | Squoosh: 1 (compress/convert)" },
                { "@type": "ListItem", "position": 3, name: "Browser-based (no upload)", description: "SammaPix: Yes | Squoosh: Yes — both process in-browser" },
                { "@type": "ListItem", "position": 4, name: "AI features", description: "SammaPix: Yes (AI rename, alt text, smart sort via Google Gemini) | Squoosh: No AI features" },
                { "@type": "ListItem", "position": 5, name: "Batch processing", description: "SammaPix: 20 free / 500 Pro | Squoosh: 1 file at a time only" },
                { "@type": "ListItem", "position": 6, name: "Format support", description: "SammaPix: JPEG, PNG, WebP, HEIC, GIF, AVIF | Squoosh: JPEG, PNG, WebP, AVIF" },
                { "@type": "ListItem", "position": 7, name: "Max file size", description: "SammaPix: 20 MB free / 50 MB Pro | Squoosh: No limit (browser RAM)" },
                { "@type": "ListItem", "position": 8, name: "Compression benchmark", description: "5 MB JPEG test at quality 80: SammaPix 812 KB | Squoosh 780 KB (MozJPEG). WebP: SammaPix 624 KB | Squoosh 610 KB. Very similar results." },
                { "@type": "ListItem", "position": 9, name: "Actively maintained", description: "SammaPix: Yes, actively developed | Squoosh: Archived by Google in 2023, no updates" },
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
              { "@type": "ListItem", position: 3, name: "SammaPix vs Squoosh", item: `${APP_URL}/vs/squoosh` },
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
                name: "Is SammaPix better than Squoosh?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SammaPix and Squoosh are both excellent free image optimizers that process images entirely in your browser. However, SammaPix offers more modern features including batch processing, AI-powered image renaming, and continuous updates. Squoosh was archived by Google in 2023, while SammaPix is actively maintained and regularly improved.",
                },
              },
              {
                "@type": "Question",
                name: "Is Squoosh free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Squoosh by Google is completely free and has no premium plans. However, it is no longer maintained - Google archived the project in 2023.",
                },
              },
              {
                "@type": "Question",
                name: "What can SammaPix do that Squoosh can't?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SammaPix offers 25+ tools vs Squoosh's single compress/convert tool. Key features Squoosh lacks: batch processing of 20+ files at once with ZIP download, AI-powered image renaming and alt text generation via Google Gemini, EXIF metadata removal for privacy, HEIC and GIF support, mobile-friendly interface, and active maintenance (Squoosh was archived in 2023).",
                },
              },
              {
                "@type": "Question",
                name: "Is Squoosh still maintained?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Google's Chrome team archived the Squoosh repository in late 2023. The tool still works in your browser, but it receives no new features, security patches, or bug fixes. SammaPix is actively developed and ships new features regularly.",
                },
              },
              {
                "@type": "Question",
                name: "Does Squoosh support batch processing?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Squoosh only processes one image at a time. If you need to compress or convert multiple images, SammaPix supports batch processing of up to 20 files on the free plan and 500 files on Pro, with bulk ZIP download.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
