import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, Zap, Sparkles, Lock, FileImage } from "lucide-react";
import SiteGroundBanner from "@/components/ads/SiteGroundBanner";

export const metadata: Metadata = {
  title: "SammaPix vs Photopea — Image Optimization Comparison 2026",
  description: "SammaPix vs Photopea. Photopea is a powerful free Photoshop alternative. SammaPix is the faster choice for compression, WebP conversion, and AI rename without the learning curve.",
  keywords: [
    "photopea alternative",
    "free photoshop alternative",
    "photopea vs sammapix",
    "photopea vs",
    "image compressor vs photopea",
  ],
  alternates: {
    canonical: "https://sammapix.com/vs/photopea",
  },
  openGraph: {
    title: "SammaPix vs Photopea — Image Optimization Comparison 2026",
    description: "Photopea is a full Photoshop clone. SammaPix is the dedicated tool for compression, WebP conversion, and AI rename — no learning curve, no upload.",
    type: "website",
    url: "https://sammapix.com/vs/photopea",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix vs Photopea comparison",
      },
    ],
  },
};

const tableRows = [
  { feature: "JPG / PNG compression", sammapix: true, photopea: "Manual export" },
  { feature: "WebP conversion", sammapix: true, photopea: "Manual export" },
  { feature: "Batch / multiple files at once", sammapix: true, photopea: false },
  { feature: "Bulk ZIP download", sammapix: true, photopea: false },
  { feature: "AI-powered image renaming", sammapix: true, photopea: false },
  { feature: "AI alt text generation", sammapix: true, photopea: false },
  { feature: "Quality control slider (compression)", sammapix: true, photopea: "On export" },
  { feature: "EXIF data removal", sammapix: true, photopea: false },
  { feature: "Processes in browser (no upload)", sammapix: true, photopea: true },
  { feature: "No account required", sammapix: true, photopea: true },
  { feature: "Layers / advanced photo editing", sammapix: false, photopea: true },
  { feature: "PSD file support", sammapix: false, photopea: true },
  { feature: "Brush / selection tools", sammapix: false, photopea: true },
  { feature: "Mobile-friendly UX", sammapix: true, photopea: false },
  { feature: "Free to use", sammapix: true, photopea: "Ad-supported" },
  { feature: "Price for ad-free", sammapix: "$7/mo", photopea: "$5/mo" },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-4 w-4 text-green-500 mx-auto" strokeWidth={2} />;
  if (value === false) return <X className="h-4 w-4 text-gray-300 mx-auto" strokeWidth={2} />;
  return <span className="text-xs text-gray-600 font-medium">{value}</span>;
}

export default function VsPhotopeaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-10">
        <Link href="/" className="hover:text-gray-600 transition-colors">SammaPix</Link>
        <span>/</span>
        <span>vs Photopea</span>
      </div>

      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-500 font-medium mb-6">
          Honest comparison — no sponsored ranking
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 leading-tight">
          SammaPix vs Photopea
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Photopea is an impressive free Photoshop alternative built into the browser. But if your goal is to compress a batch of images, convert them to WebP, and rename them with AI for SEO — SammaPix does that in seconds, without the learning curve.
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
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Need to compress or convert multiple images quickly</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Want AI-generated filenames and alt text for SEO</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Don&apos;t need layers or advanced photo manipulation</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} /> Work on mobile or need a minimal, fast interface</li>
          </ul>
        </div>
        <div className="p-5 border border-gray-200 bg-gray-50/60 rounded-md">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Choose Photopea if you…</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Need to edit PSD, XCF, or Sketch files in the browser</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Need layers, masks, brushes, or advanced selection tools</li>
            <li className="flex items-start gap-2"><Check className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" strokeWidth={2} /> Want a full Photoshop-like experience without paying for Adobe</li>
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
                <th className="text-center px-4 py-3 font-medium text-gray-500 w-1/4">Photopea</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-gray-600">{row.feature}</td>
                  <td className="px-4 py-3 text-center"><Cell value={row.sammapix} /></td>
                  <td className="px-4 py-3 text-center"><Cell value={row.photopea} /></td>
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
              Compressing in Photopea requires many manual steps
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              To compress an image in Photopea, you open the file, go to File, then Export As, choose the format, adjust quality, and save. For a single image that is manageable. For 20 product photos, you repeat those steps 20 times. SammaPix lets you drop all 20 images at once, set quality once, and download a ZIP. The workflow difference is enormous in practice.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Both are browser-based — but only SammaPix removes EXIF
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Photopea runs entirely in the browser and does not upload your files, which is excellent for privacy. SammaPix shares this approach. The difference is that SammaPix includes a dedicated EXIF Remover that strips GPS coordinates, device model, timestamps, and other metadata from your output files before download — Photopea does not offer this feature.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" strokeWidth={1.5} />
              AI rename — purpose-built for SEO workflows
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              After compressing an image in Photopea, you manually type a filename in the save dialog. SammaPix can analyze each image with Google Gemini and suggest a descriptive SEO filename automatically. For content creators, bloggers, and e-commerce teams who publish dozens of images per week, this saves significant time and improves search visibility.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Where Photopea wins — full image editing power
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Photopea is technically remarkable — it supports PSD, XCF, and Sketch files in the browser, with full layer support, adjustment layers, blending modes, and advanced selection tools. No image optimizer, including SammaPix, comes close. If you need to edit, retouch, or composite images, Photopea is the right choice. SammaPix is for optimizing images that are already ready to publish.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
              Mobile experience — SammaPix is built for it
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Photopea&apos;s complex interface — panels, menus, toolbars — is not practical on a phone screen. SammaPix&apos;s simple drop-and-download interface works well on mobile, so you can quickly compress and convert images you&apos;ve shot on your phone without switching to a desktop.
            </p>
          </div>
        </div>
      </div>

      {/* Who should switch */}
      <div className="mb-14 p-6 border border-gray-200 rounded-md bg-gray-50/40">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">When to use SammaPix instead of Photopea</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          These two tools solve different problems. Use SammaPix when:
        </p>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">Your images are already edited and ready to publish.</strong> SammaPix is the last step in your workflow — compress, convert, rename, download.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You have more than one image to process.</strong> Batch workflows in Photopea are manual and slow. SammaPix handles 20 files simultaneously.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You care about Core Web Vitals or page speed.</strong> AI rename, WebP conversion, and compression are all designed with web performance in mind.</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" strokeWidth={2} />
            <span><strong className="text-gray-800">You want EXIF data removed before sharing.</strong> SammaPix strips all metadata client-side — Photopea does not.</span>
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
              <p className="text-xs text-gray-500 mt-0.5">Compress up to 20 images at once — free, in-browser</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
          <Link href="/tools/exif" className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-900">EXIF Remover</p>
              <p className="text-xs text-gray-500 mt-0.5">Strip GPS, device, and timestamp metadata from photos</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border border-gray-200 rounded-md p-8 text-center bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready to optimize images in seconds?</h2>
        <p className="text-sm text-gray-500 mb-6">
          No Photoshop skills required. Drop, compress, convert, rename — done.
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
            headline: "SammaPix vs Photopea — Which Free Tool Should You Use for Image Optimization in 2026?",
            description: "Detailed comparison between SammaPix and Photopea for image compression, WebP conversion, and batch optimization.",
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
            name: "SammaPix vs Photopea",
            description: "Feature-by-feature comparison between SammaPix and Photopea",
            url: "https://sammapix.com/vs/photopea",
            mainEntity: {
              "@type": "ItemList",
              name: "Feature Comparison",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Batch processing", description: "SammaPix: Yes, up to 20 files | Photopea: No — one file at a time" },
                { "@type": "ListItem", position: 2, name: "AI image renaming", description: "SammaPix: Yes (Google Gemini) | Photopea: No" },
                { "@type": "ListItem", position: 3, name: "Browser-based (no upload)", description: "SammaPix: Yes | Photopea: Yes" },
                { "@type": "ListItem", position: 4, name: "EXIF metadata removal", description: "SammaPix: Yes | Photopea: No" },
                { "@type": "ListItem", position: 5, name: "Layers and photo editing", description: "SammaPix: No | Photopea: Yes" },
                { "@type": "ListItem", position: 6, name: "PSD file support", description: "SammaPix: No | Photopea: Yes" },
                { "@type": "ListItem", position: 7, name: "Mobile-friendly", description: "SammaPix: Yes | Photopea: No" },
              ],
            },
          }),
        }}
      />
    </div>
  );
}
