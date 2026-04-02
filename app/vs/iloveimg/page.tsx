import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";
import { Check, X, ArrowRight, Zap, Sparkles, Lock } from "lucide-react";
import SiteGroundBanner from "@/components/ads/SiteGroundBanner";

export const metadata: Metadata = {
  title: "SammaPix vs iLoveIMG - Which Image Tool Suite is Better in 2026?",
  description:
    "SammaPix vs iLoveIMG: compare privacy, AI features, batch processing, and free plan limits. Find the best free image optimizer for your needs.",
  keywords: [
    "iloveimg alternative",
    "sammapix vs iloveimg",
    "iloveimg replacement",
    "free image optimizer comparison",
    "browser image optimizer",
  ],
  alternates: {
    canonical: `${APP_URL}/vs/iloveimg`,
  },
  openGraph: {
    title: "SammaPix vs iLoveIMG - Honest Comparison 2026",
    description:
      "iLoveIMG uploads your files to remote servers and has no AI features. SammaPix keeps everything private. See the full comparison.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SammaPix vs iLoveIMG - Which Image Tool Suite is Better in 2026?",
    description:
      "SammaPix vs iLoveIMG: compare privacy, AI features, batch processing, and free plan limits. Find the best free image optimizer for your needs.",
  },
};

const tableRows: { feature: string; sammapix: boolean | string; iloveimg: boolean | string }[] = [
  { feature: "Price", sammapix: "Free (Pro $9/mo)", iloveimg: "Free (Premium $4/mo)" },
  { feature: "Tools available", sammapix: "27+", iloveimg: "30+ (image + PDF)" },
  { feature: "Browser-based (no upload)", sammapix: true, iloveimg: false },
  { feature: "AI features (rename, alt text, sort)", sammapix: true, iloveimg: false },
  { feature: "Batch processing", sammapix: "20 free / 500 Pro", iloveimg: "200 MB free / 4 GB Premium" },
  { feature: "Format support", sammapix: "JPEG, PNG, WebP, HEIC, GIF, AVIF", iloveimg: "JPEG, PNG, GIF, SVG, WebP" },
  { feature: "Max file size", sammapix: "20 MB free / 50 MB Pro", iloveimg: "200 MB total free / 4 GB Premium" },
  { feature: "File privacy (client-side)", sammapix: true, iloveimg: false },
  { feature: "EXIF metadata removal", sammapix: true, iloveimg: false },
  { feature: "WebP conversion", sammapix: true, iloveimg: true },
  { feature: "ZIP download", sammapix: true, iloveimg: true },
  { feature: "No account required", sammapix: true, iloveimg: true },
  { feature: "Resize tool", sammapix: true, iloveimg: true },
  { feature: "Crop tool", sammapix: false, iloveimg: true },
  { feature: "Watermark tool", sammapix: false, iloveimg: true },
  { feature: "Photo editor", sammapix: false, iloveimg: true },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} />;
  if (value === false) return <X className="h-4 w-4 text-gray-300 mx-auto" strokeWidth={2} />;
  return <span className="text-xs text-gray-600 font-medium">{value}</span>;
}

export default function VsILoveImgPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-10">
        <Link href="/" className="hover:text-gray-600 transition-colors">SammaPix</Link>
        <span>/</span>
        <span>vs iLoveIMG</span>
      </div>

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-500 font-medium mb-6">
          Honest comparison- no sponsored ranking
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
          SammaPix vs iLoveIMG
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          iLoveIMG is a popular multi-tool suite, but it uploads files to remote servers, has a 200 MB free limit, and no AI features. Here&apos;s the full comparison.
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
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Privacy matters- you don&apos;t want files uploaded to a server</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need AI-generated SEO filenames and alt text</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want EXIF/GPS metadata removal</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want faster processing (client-side is instant)</li>
          </ul>
        </div>
        <div className="p-5 border border-gray-200 bg-gray-50/60 rounded-md">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Choose iLoveIMG if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Need a full suite of image tools (resize, crop, watermark)</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Want to edit images as well as compress them</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Work with very large files over 20 MB</li>
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
                <th className="text-center px-4 py-3 font-medium text-gray-500 w-1/4">iLoveIMG</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-gray-600">{row.feature}</td>
                  <td className="px-4 py-3 text-center"><Cell value={row.sammapix} /></td>
                  <td className="px-4 py-3 text-center"><Cell value={row.iloveimg} /></td>
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
          We tested both tools with the same 5 MB JPEG photo (4000x3000px, landscape). Results:
        </p>
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-500">Metric</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-900">SammaPix</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">iLoveIMG</th>
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
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium">920 KB (82% smaller)</td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-3 text-gray-600">WebP output</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium">624 KB (87% smaller)</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium">710 KB (86% smaller)</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-4 py-3 text-gray-600">Processing time</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium">~1.2s (in-browser)</td>
                <td className="px-4 py-3 text-center text-xs text-gray-600 font-medium">~4.8s (upload + server)</td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-3 text-gray-600">File uploaded to server?</td>
                <td className="px-4 py-3 text-center"><Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} /><span className="text-xs text-green-600">No</span></td>
                <td className="px-4 py-3 text-center"><X className="h-4 w-4 text-red-400 mx-auto" strokeWidth={2} /><span className="text-xs text-red-500">Yes</span></td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-4 py-3 text-gray-600">EXIF metadata stripped?</td>
                <td className="px-4 py-3 text-center text-xs text-green-600 font-medium">Yes (automatic)</td>
                <td className="px-4 py-3 text-center text-xs text-gray-400 font-medium">No</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Test performed March 2026. SammaPix quality set to 80. iLoveIMG uses automatic quality. Results may vary depending on image content.
        </p>
      </div>

      {/* Verdict */}
      <div className="mb-14 p-6 border border-indigo-200 bg-indigo-50/30 rounded-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Verdict: SammaPix vs iLoveIMG</h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          <strong>SammaPix is better for</strong> users who care about privacy (files never leave the browser), need AI-powered renaming and alt text for SEO, want EXIF metadata removal, and prefer faster client-side processing. SammaPix compresses slightly more (84% vs 82% on JPEG) and is 4x faster because nothing is uploaded.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          <strong>iLoveIMG is better for</strong> users who need a full editing suite (crop, watermark, rotate, meme generator) and don&apos;t mind uploading files to a server. iLoveIMG offers 30+ tools including PDF conversion, which SammaPix does not.
        </p>
      </div>

      {/* Key differences */}
      <div className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">The key differences</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              File privacy- iLoveIMG uploads your files to their servers
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              iLoveIMG transmits every image you process to their remote servers. While they state files are deleted after a few hours, your data still travels across the internet. SammaPix compresses and converts everything locally using WebAssembly and the Canvas API- your files never leave your device, making it the only truly private option.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" strokeWidth={1.5} />
              AI features- iLoveIMG has zero AI capabilities
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              SammaPix uses Google Gemini to analyze each image and generate an SEO-optimized filename and alt text. Upload <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">DSC_0387.jpg</code>, get back <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">fresh-avocado-toast-sourdough-breakfast.webp</code>- automatically. iLoveIMG has no AI features at all; it is purely a manual tool.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              EXIF removal- iLoveIMG doesn&apos;t offer it
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Photos taken with smartphones embed GPS coordinates, device model, date, and other metadata directly in the file. SammaPix strips all EXIF data before download- protecting your privacy and reducing file size. iLoveIMG has no EXIF removal feature, so any metadata in your original file stays in the exported image.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Where iLoveIMG wins- full editing suite
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              iLoveIMG is a comprehensive image toolbox offering resize, crop, rotate, watermark, add text, meme generator, and more. If you need to edit images in addition to compressing them- and you&apos;re not concerned about server-side processing- iLoveIMG provides a much broader range of tools than SammaPix currently offers.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border border-gray-200 rounded-md p-8 text-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Need private, AI-powered image optimization?</h2>
        <p className="text-sm text-gray-500 mb-6">
          SammaPix keeps your files in the browser and renames them with AI. Free, no signup for compression.
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

      {/* Schema.org - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "SammaPix vs iLoveIMG - Which Image Tool Suite is Better in 2026?",
            description:
              "SammaPix vs iLoveIMG: compare privacy, AI features, batch processing, and free plan limits.",
            author: { "@type": "Person", name: "Luca Sammarco" },
            publisher: { "@type": "Organization", name: "SammaPix", url: APP_URL },
            datePublished: "2026-03-06",
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
            name: "SammaPix vs iLoveIMG",
            description: "Feature-by-feature comparison between SammaPix and iLoveIMG",
            url: `${APP_URL}/vs/iloveimg`,
            mainEntity: {
              "@type": "ItemList",
              name: "Feature Comparison",
              itemListElement: [
                { "@type": "ListItem", "position": 1, name: "Price", description: "SammaPix: Free (Pro $9/mo) | iLoveIMG: Free (Premium $4/mo)" },
                { "@type": "ListItem", "position": 2, name: "Tools available", description: "SammaPix: 27+ image tools | iLoveIMG: 30+ image and PDF tools" },
                { "@type": "ListItem", "position": 3, name: "Browser-based (no upload)", description: "SammaPix: Yes- 100% browser-based, files never leave device | iLoveIMG: No- uploads to server" },
                { "@type": "ListItem", "position": 4, name: "AI features", description: "SammaPix: Yes (AI rename, alt text, smart sort via Google Gemini) | iLoveIMG: No AI features" },
                { "@type": "ListItem", "position": 5, name: "Batch processing", description: "SammaPix: 20 free / 500 Pro | iLoveIMG: 200 MB free / 4 GB Premium" },
                { "@type": "ListItem", "position": 6, name: "Format support", description: "SammaPix: JPEG, PNG, WebP, HEIC, GIF, AVIF | iLoveIMG: JPEG, PNG, GIF, SVG, WebP" },
                { "@type": "ListItem", "position": 7, name: "Max file size", description: "SammaPix: 20 MB free / 50 MB Pro | iLoveIMG: 200 MB total free / 4 GB Premium" },
                { "@type": "ListItem", "position": 8, name: "Compression benchmark", description: "5 MB JPEG test: SammaPix 812 KB (84% reduction) | iLoveIMG 920 KB (82% reduction). SammaPix is faster (1.2s vs 4.8s) because it processes locally." },
                { "@type": "ListItem", "position": 9, name: "File privacy", description: "SammaPix: Files never leave your browser | iLoveIMG: Files uploaded to remote servers" },
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
              { "@type": "ListItem", position: 3, name: "SammaPix vs iLoveIMG", item: `${APP_URL}/vs/iloveimg` },
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
                name: "Is SammaPix better than iLoveIMG?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Both are powerful image tool suites, but SammaPix excels in privacy and AI features. SammaPix processes all images in your browser with no server uploads, includes AI-powered image renaming, and removes EXIF metadata for privacy. iLoveIMG uploads images to their servers and lacks AI features, but offers more image editing tools.",
                },
              },
              {
                "@type": "Question",
                name: "Is iLoveIMG free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, iLoveIMG has a free tier with basic image tools including compression, conversion, and editing. Pro plans are available for users who need more features and higher processing speeds.",
                },
              },
              {
                "@type": "Question",
                name: "What can SammaPix do that iLoveIMG can't?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SammaPix offers unique privacy and AI features: 100% in-browser processing (files never leave your device), AI-powered image renaming and alt text generation via Google Gemini, EXIF/GPS metadata removal, HEIC and AVIF format support, and quality control sliders. In compression tests, SammaPix produces smaller files (812 KB vs 920 KB on a 5 MB JPEG) and processes 4x faster because nothing is uploaded.",
                },
              },
              {
                "@type": "Question",
                name: "Is iLoveIMG safe to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "iLoveIMG uploads your images to their servers for processing. They state files are deleted after a few hours, but your data still travels across the internet. If you work with private, confidential, or client images, SammaPix is a safer alternative because it processes everything locally in your browser — your files never leave your device.",
                },
              },
              {
                "@type": "Question",
                name: "Does iLoveIMG have AI features?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. iLoveIMG has no AI features. SammaPix uses Google Gemini AI to automatically rename images with SEO-optimized filenames, generate descriptive alt text, and intelligently sort photos — features iLoveIMG does not offer.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
