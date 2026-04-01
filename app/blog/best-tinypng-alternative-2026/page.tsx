import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "TinyPNG Alternative: Why Photographers Switch to SammaPix (2026)",
  description:
    "Looking for a TinyPNG alternative? SammaPix compresses JPG, PNG, WebP, GIF and AVIF in your browser — no uploads, no file limits, 25 tools free. See the full comparison.",
  alternates: {
    canonical: `${APP_URL}/blog/best-tinypng-alternative-2026`,
  },
  keywords: [
    "tinypng alternative",
    "tinypng vs sammapix",
    "best image compressor free",
    "compress images online free",
    "free image optimizer 2026",
    "browser image compression no upload",
    "tinypng vs",
  ],
  openGraph: {
    title: "TinyPNG Alternative: Why Photographers Switch to SammaPix (2026)",
    description:
      "TinyPNG is trusted and excellent at one thing. But if you need batch processing, privacy, format conversion, or AI renaming — SammaPix does more, free. Honest 2026 comparison.",
    url: `${APP_URL}/blog/best-tinypng-alternative-2026`,
    type: "article",
    publishedTime: "2026-03-19",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TinyPNG Alternative: Why Photographers Switch to SammaPix (2026)",
    description:
      "Honest comparison of TinyPNG vs SammaPix — privacy, batch limits, pricing, formats, and 25 tools vs 1. Which free image compressor is actually better in 2026?",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-03-19";
const POST_DATE_FORMATTED = "March 19, 2026";
const POST_URL = `${APP_URL}/blog/best-tinypng-alternative-2026`;
const POST_TITLE =
  "TinyPNG Alternative: Why Photographers Switch to SammaPix (2026)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Looking for a TinyPNG alternative? SammaPix compresses images in your browser with no uploads, no file limits, and 25 tools — all free. Honest 2026 comparison.",
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://www.sammapix.com/about",
    image: "https://www.sammapix.com/luca-sammarco.jpg",
    sameAs: ["https://lucasammarco.com", "https://github.com/samma1997"],
  },
  publisher: {
    "@type": "Organization",
    name: "SammaPix",
    url: APP_URL,
    logo: {
      "@type": "ImageObject",
      url: "https://sammapix.com/og-image.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": POST_URL,
  },
  keywords: [
    "tinypng alternative",
    "tinypng vs",
    "best image compressor free",
    "compress images online free",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: APP_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${APP_URL}/blog`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: POST_TITLE,
      item: POST_URL,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is SammaPix a good TinyPNG alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix compresses JPG, PNG, WebP, GIF, and AVIF with no file size caps and no batch limits, entirely inside your browser. Unlike TinyPNG, your files are never uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Does TinyPNG upload my files to its servers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, TinyPNG uploads your images to its servers for processing. TinyPNG states that files are automatically deleted after processing, but the upload does occur. SammaPix processes everything locally in your browser — nothing ever leaves your device.",
      },
    },
    {
      "@type": "Question",
      name: "What is TinyPNG's free tier limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TinyPNG's free tier allows up to 20 images per session with a maximum file size of 5 MB per file. The paid API plan starts at $39 per year.",
      },
    },
    {
      "@type": "Question",
      name: "Can I compress images online for free without uploading them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix compresses images entirely inside your browser using JavaScript — no upload, no server, no account required. Files never leave your device.",
      },
    },
  ],
};

export default function BestTinyPNGAlternative2026Page() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="best-tinypng-alternative-2026"
        description="TinyPNG has been the default free image compressor for over a decade. It is genuinely good at what it does. But if you have ever hit the 20-image cap, worried about uploading client photos to a third-party server, or needed to rename, resize, or convert images in the same workflow — you already know the problem. Here is an honest look at where TinyPNG falls short in 2026, and whether SammaPix is the right alternative for your workflow."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={8}
        headings={[
          { id: "what-tinypng-does-well", title: "What TinyPNG genuinely does well" },
          { id: "where-tinypng-falls-short", title: "Where TinyPNG falls short in 2026" },
          { id: "what-sammapix-does-differently", title: "What SammaPix does differently" },
          { id: "head-to-head", title: "Head-to-head: SammaPix vs TinyPNG" },
          { id: "pricing", title: "Pricing: the honest breakdown" },
          { id: "verdict", title: "Verdict: which tool should you use?" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "TinyPNG is a trusted, well-executed single-purpose compressor - but its free tier limits (20 images, 5 MB max) create friction for real workflows.",
          "SammaPix processes everything in your browser - your files never leave your device, with no batch cap and no file size ceiling on the free tier.",
          "Beyond compression, SammaPix offers 25 tools including WebP conversion, EXIF removal, AI renaming, and batch resize in one workflow.",
          "TinyPNG's paid API at $39/year targets developers; SammaPix Pro at $9/month is designed for individual photographers and creators.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80"
              alt="Photographer reviewing images on laptop — choosing an image compression tool"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Choosing the right image compressor affects your entire workflow, not just file sizes - Photo by Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Compress images free — no upload, no limits
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drag in your JPG, PNG, WebP, GIF, or AVIF files and compress them in seconds. Files never leave your browser. No account, no watermarks, no batch cap.
            </p>
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Compress tool
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        {/* Article body content */}

        <h2 id="what-tinypng-does-well" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
          What TinyPNG genuinely does well
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          TinyPNG deserves its reputation. It has been compressing PNG and JPEG files since 2011 and has processed billions of images. The compression quality for PNGs in particular is excellent — it uses smart lossy compression that reduces color palettes in a way the human eye barely perceives, often shrinking a PNG by 60–80% without visible degradation.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The interface is about as simple as a tool can get. Drag your files onto the panda, watch the progress bars fill, download. There is no learning curve whatsoever. For a developer who needs to compress a handful of PNGs before a deployment, TinyPNG is a fast, reliable choice with zero friction.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Its API and Photoshop plugin also have genuine utility. Teams with automated pipelines use TinyPNG at scale. Its place in the ecosystem is legitimate and earned. This article is not here to dismiss that.
        </p>

        <h2 id="where-tinypng-falls-short" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
          Where TinyPNG falls short in 2026
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The limitations of TinyPNG&apos;s free tier are well documented — but they have not changed in years while the use cases around them have shifted considerably.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-5 mb-1">
          The 20-image cap.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          TinyPNG&apos;s free tier limits you to 20 images per session, each under 5 MB. For a photographer culling a 200-image shoot, or a developer optimizing a full asset library, this creates constant friction. You can work around it by refreshing the page, but you should not have to.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-5 mb-1">
          Files leave your device.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Every image you compress with TinyPNG is uploaded to their servers. TinyPNG states files are deleted after processing, and there is no reason to doubt that. But for photographers handling client work under NDA, images with embedded GPS coordinates, or sensitive business assets, uploading to a third-party server is a meaningful consideration — not a paranoid one.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-5 mb-1">
          It only does one thing.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          TinyPNG compresses images. That is it. There is no format conversion to WebP, no EXIF stripping, no batch renaming, no resizing. After compressing, you still have to open a different tool for every other step in your image workflow.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-5 mb-1">
          No AVIF or GIF support.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          TinyPNG handles PNG, JPEG, and WebP. AVIF — the format delivering 20–30% better compression than WebP at equivalent quality — is not supported. GIF optimization is also absent.
        </p>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-5 mb-1">
          Paid plan is steep for individuals.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Removing TinyPNG&apos;s limits requires purchasing API access at $39 per year. That price point is designed for teams and development pipelines — not the individual photographer or content creator who just needs to compress more than 20 files at a time.
        </p>

        <h2 id="what-sammapix-does-differently" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
          What SammaPix does differently
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix was built to solve exactly these gaps. The compression engine runs entirely inside your browser — your files are never uploaded anywhere. Open the{" "}
          <Link
            href="/tools/compress"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Compress tool
          </Link>
          , drop in 200 photos, get 200 compressed files back in a ZIP. No session limit. No 5 MB cap. No account required.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Beyond compression, SammaPix is a full image workflow suite. After compressing, you can convert directly to{" "}
          <Link
            href="/tools/webp"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            WebP
          </Link>
          {" "}for modern web delivery, strip EXIF metadata to protect client privacy, batch resize for different platform dimensions, or use{" "}
          <Link
            href="/tools/ai-rename"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            AI Rename
          </Link>
          {" "}to generate SEO-optimized filenames automatically — all without switching tabs.
        </p>

        <figure className="my-8">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
            alt="Dashboard showing image processing workflow with multiple tools"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            A full image workflow in one place saves more time than raw compression speed alone - Photo by Luke Chesser on Unsplash
          </figcaption>
        </figure>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The privacy angle is not a marketing claim — it is an architectural fact. Because processing happens in-browser using JavaScript and WebAssembly, there is no server to receive your files. The images exist only on your device, in your browser&apos;s memory, until you download the output. This matters for travel photographers embedding GPS data, professionals handling client NDAs, or anyone who simply does not want their photos handled by a third party.
        </p>

        <h2 id="head-to-head" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-4">
          Head-to-head: SammaPix vs TinyPNG
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-5">
          Here is how the two tools compare across every dimension that matters to photographers and web professionals. See also the{" "}
          <Link
            href="/vs/tinypng"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            full TinyPNG vs SammaPix comparison page
          </Link>
          {" "}for a detailed technical breakdown.
        </p>

        <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
          <table className="w-full text-xs border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <th className="text-left py-2.5 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
                  Feature
                </th>
                <th className="text-center py-2.5 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
                  SammaPix
                </th>
                <th className="text-center py-2.5 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">
                  TinyPNG
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: "Files stay in your browser",
                  sammapix: true,
                  tinypng: false,
                  sammapixText: null,
                  tinypngText: null,
                },
                {
                  feature: "Free batch limit",
                  sammapix: null,
                  tinypng: null,
                  sammapixText: "Unlimited",
                  tinypngText: "20 files",
                },
                {
                  feature: "Max file size (free)",
                  sammapix: null,
                  tinypng: null,
                  sammapixText: "No limit",
                  tinypngText: "5 MB",
                },
                {
                  feature: "Formats supported",
                  sammapix: null,
                  tinypng: null,
                  sammapixText: "JPG, PNG, WebP, GIF, AVIF",
                  tinypngText: "PNG, JPG, WebP",
                },
                {
                  feature: "Convert to WebP",
                  sammapix: true,
                  tinypng: false,
                  sammapixText: null,
                  tinypngText: null,
                },
                {
                  feature: "EXIF / metadata removal",
                  sammapix: true,
                  tinypng: false,
                  sammapixText: null,
                  tinypngText: null,
                },
                {
                  feature: "AI image renaming",
                  sammapix: true,
                  tinypng: false,
                  sammapixText: null,
                  tinypngText: null,
                },
                {
                  feature: "Batch resize",
                  sammapix: true,
                  tinypng: false,
                  sammapixText: null,
                  tinypngText: null,
                },
                {
                  feature: "Film / color filters",
                  sammapix: true,
                  tinypng: false,
                  sammapixText: null,
                  tinypngText: null,
                },
                {
                  feature: "ZIP batch download",
                  sammapix: true,
                  tinypng: false,
                  sammapixText: null,
                  tinypngText: null,
                },
                {
                  feature: "Account required (free tier)",
                  sammapix: false,
                  tinypng: false,
                  sammapixText: null,
                  tinypngText: null,
                },
                {
                  feature: "Pro / paid plan",
                  sammapix: null,
                  tinypng: null,
                  sammapixText: "$9 / month",
                  tinypngText: "$39 / year (API only)",
                },
                {
                  feature: "Number of tools",
                  sammapix: null,
                  tinypng: null,
                  sammapixText: "20",
                  tinypngText: "1",
                },
              ].map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${
                    i % 2 === 0 ? "" : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"
                  }`}
                >
                  <td className="py-2.5 px-3 text-gray-700 dark:text-[#A3A3A3] font-medium">
                    {row.feature}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {row.sammapixText ? (
                      <span className="text-gray-800 dark:text-[#E5E5E5] font-medium">
                        {row.sammapixText}
                      </span>
                    ) : row.sammapix === true ? (
                      <Check
                        className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mx-auto"
                        strokeWidth={2}
                      />
                    ) : (
                      <X
                        className="h-3.5 w-3.5 text-red-500 mx-auto"
                        strokeWidth={2}
                      />
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {row.tinypngText ? (
                      <span className="text-gray-500 dark:text-[#737373]">
                        {row.tinypngText}
                      </span>
                    ) : row.tinypng === true ? (
                      <Check
                        className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mx-auto"
                        strokeWidth={2}
                      />
                    ) : (
                      <X
                        className="h-3.5 w-3.5 text-red-500 mx-auto"
                        strokeWidth={2}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="pricing" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
          Pricing: the honest breakdown
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Both tools are free for casual use. The gap opens when you need to go beyond the basic tier.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          TinyPNG&apos;s paid product is developer-focused API access, starting at $39 per year. There is no mid-tier for the individual user who simply wants to remove the 20-image cap without integrating an API. You either stay on the free tier or pay for a developer product.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix Pro is $9 per month — designed for the individual who uses the tool regularly. It removes all limits, unlocks 200 AI renames per day, enables bulk ZIP downloads for large batches, and removes ads. For a solo photographer or content creator processing hundreds of images a week, the cost is a rounding error against the time saved.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Worth noting: SammaPix&apos;s free tier has no batch cap and no file size ceiling. The free experience is already more capable than TinyPNG&apos;s free tier for most use cases.
        </p>

        <h2 id="verdict" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
          Verdict: which tool should you use?
        </h2>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-5 mb-1">
          Stay with TinyPNG if...
        </p>
        <ul className="space-y-2 mb-5">
          {[
            "You need to compress 1–5 PNGs quickly and have no other requirements",
            "You use the TinyPNG API in an existing build pipeline",
            "You work with a team already using the Photoshop plugin",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check
                className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mt-0.5 shrink-0"
                strokeWidth={2}
              />
              <span className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-5 mb-1">
          Switch to SammaPix if...
        </p>
        <ul className="space-y-2 mb-5">
          {[
            "You regularly compress more than 20 images at a time",
            "You need your files to stay private — on your device only",
            "You want to compress, convert to WebP, strip EXIF, and rename in one workflow",
            "You are a photographer handling client work or images with GPS data",
            "You find $39/year steep for what is ultimately a single-function tool",
            "You need AVIF or GIF support",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check
                className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mt-0.5 shrink-0"
                strokeWidth={2}
              />
              <span className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The underlying compression quality of both tools is excellent. The difference is not in the output — it is in everything else. TinyPNG is a focused, well-executed single-purpose tool. SammaPix is an image workflow built for the full picture: compression, conversion, metadata, renaming, and batch processing, all running locally in your browser.
        </p>

        <Link
          href="/tools/compress"
          className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-8 mb-8"
        >
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">
              Free — no signup, no file limits
            </p>
            <p className="text-sm font-semibold text-white leading-snug">
              Try SammaPix Compress — batch compress in your browser, zero uploads
            </p>
          </div>
          <ArrowRight
            className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
            strokeWidth={1.5}
          />
        </Link>

        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
          <h2 id="faq" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mb-6">
            FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Is SammaPix a good TinyPNG alternative?",
                a: "Yes — particularly if you need to compress more than 20 images at a time, want your files to stay private, or need additional tools like WebP conversion, EXIF removal, or AI-powered renaming. SammaPix processes everything in your browser with no file size caps and no batch limits, all free.",
              },
              {
                q: "Does TinyPNG upload my files to its servers?",
                a: "Yes. TinyPNG uploads your images to its own servers for compression. The company states that files are automatically deleted after processing, and there is no indication of misuse. However, the upload does happen — which matters for photographers handling client work, images with GPS metadata, or anything sensitive. SammaPix compresses entirely in-browser: your files never leave your device.",
              },
              {
                q: "What is TinyPNG's free tier limit?",
                a: "TinyPNG's free web interface allows up to 20 images per session, with a maximum of 5 MB per file. Removing these limits requires purchasing API access starting at $39 per year — a developer-oriented product with no middle tier for individual users.",
              },
              {
                q: "Can I compress images online for free without uploading them?",
                a: "Yes. SammaPix runs the compression engine entirely inside your browser using JavaScript — no upload, no server, no third party. Drop your files in, adjust quality, download the results. Nothing ever leaves your device. This works for JPG, PNG, WebP, GIF, and AVIF with no file size restrictions.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mb-1.5">
                  {q}
                </h3>
                <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </BlogArticleLayout>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
