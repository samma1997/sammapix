import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title:
    "The Complete Guide to WebP: Why Every Photographer Should Use It",
  description:
    "WebP delivers smaller file sizes than JPEG and PNG without visible quality loss. Learn how WebP works, when to use it, browser support in 2026, and how to convert your photos for free.",
  alternates: {
    canonical: `${APP_URL}/blog/complete-guide-webp-format`,
  },
  keywords: [
    "webp format",
    "webp vs jpeg",
    "convert to webp",
    "webp for photographers",
    "webp browser support 2026",
    "webp vs png",
    "webp image format guide",
  ],
  openGraph: {
    title: "The Complete Guide to WebP: Why Every Photographer Should Use It",
    description:
      "WebP images load faster, rank better, and look identical to JPEG. Here is everything you need to know about the format- and how to convert your entire library for free.",
    url: `${APP_URL}/blog/complete-guide-webp-format`,
    type: "article",
    publishedTime: "2026-01-28",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Complete Guide to WebP: Why Every Photographer Should Use It",
    description:
      "WebP delivers 25–35% smaller files than JPEG at the same quality. Learn what it is, when to use it, and how to convert for free.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-01-28";
const POST_DATE_FORMATTED = "January 28, 2026";
const POST_URL = `${APP_URL}/blog/complete-guide-webp-format`;
const POST_TITLE = "The Complete Guide to WebP: Why Every Photographer Should Use It";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "WebP delivers smaller file sizes than JPEG and PNG without visible quality loss. Learn how WebP works, when to use it, browser support in 2026, and how to convert your photos for free.",
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
    "webp format",
    "webp vs jpeg",
    "convert to webp",
    "webp for photographers",
    "webp browser support 2026",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    { "@type": "ListItem", position: 3, name: POST_TITLE, item: POST_URL },
  ],
};


export default function CompleteGuideWebpFormatPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="complete-guide-webp-format"
        description="WebP delivers smaller file sizes than JPEG and PNG without visible quality loss. Learn how WebP works, when to use it, browser support in 2026, and how to convert your photos for free."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Performance"]}
        readingTime={9}
        headings={[
          { id: "what-is-webp", title: "What is WebP?" },
          { id: "capabilities", title: "WebP capabilities: what makes it versatile" },
          { id: "browser-support", title: "WebP browser support in 2026" },
          { id: "webp-vs-jpeg-png", title: "WebP vs JPEG vs PNG: when to use which" },
          { id: "format-comparison", title: "Format comparison at a glance" },
          { id: "avif-comparison", title: "What about AVIF? Is it better than WebP?" },
          { id: "convert-with-sammapix", title: "How to convert photos to WebP using SammaPix" },
          { id: "serving-webp", title: "Serving WebP on your website" },
          { id: "photography-tips", title: "WebP and photography workflows: practical tips" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "WebP delivers 25-35% smaller files than JPEG at equivalent visual quality, with support for both lossy and lossless compression plus transparency.",
          "Browser support for WebP exceeds 98% globally in 2026, making it a safe default for virtually all web publishing workflows.",
          "WebP uses VP8 predictive coding which is fundamentally more efficient than JPEG DCT-based compression for photographic content.",
          "Convert your entire image library to WebP for free using SammaPix - processing happens 100% in your browser with no uploads.",
        ]}
        heroImage={
          <figure className="my-8">
                        <img
                          src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80"
                          alt="Web developer working on responsive design at a modern desk setup"
                          className="w-full rounded-lg"
                          loading="eager"
                        />
                        <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                          Modern web development workflows increasingly default to WebP for image delivery - Photo by Domenico Loia on Unsplash
                        </figcaption>
                      </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
                          Convert your photos to WebP- free
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
                          Drop your JPEGs, PNGs, and GIFs into <Link href="/" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">SammaPix</Link> and get WebP files instantly. Batch processing, ZIP download, no upload required. Files never leave your browser.
                        </p>
                        <Link
                          href="/tools/webp"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                        >
                          Open WebP Converter
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </Link>
                      </div>
        }
      >
        {/* Article body content */}
            <h2 id="what-is-webp" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              What is WebP?
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              WebP is an image format developed by Google and first released in 2010. It was designed as a direct replacement for JPEG, PNG, and GIF- combining the strengths of all three into a single modern format optimized for the web.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The format is based on the VP8 video codec (for lossy compression) and uses a dedicated lossless mode derived from VP8L. Both modes use predictive coding- the encoder analyzes nearby pixel values and only stores the difference from the prediction, rather than raw pixel data. This is fundamentally more efficient than the DCT-based compression JPEG uses.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The result: at the same perceptual quality, WebP files are consistently smaller than JPEG. In Google&apos;s own benchmarks- published in{" "}
              <a
                href="https://developers.google.com/speed/webp/docs/webp_study"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                the WebP compression study
              </a>
              {" "} - lossy WebP files were 25–34% smaller than JPEG at equivalent quality. Lossless WebP files were 26% smaller than PNG. You can read more about the format on the official{" "}
              <a href="https://developers.google.com/speed/webp" target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">Google WebP developer page</a>.
            </p>

            

            <h2 id="capabilities" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              WebP capabilities: what makes it versatile
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Unlike JPEG (lossy only, no transparency) and PNG (lossless only, transparency), WebP covers every use case in a single format.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 mt-4">
              {[
                {
                  title: "Lossy compression",
                  detail: "Like JPEG but smaller at equivalent quality. Ideal for photos and complex images where some data can be discarded invisibly.",
                },
                {
                  title: "Lossless compression",
                  detail: "Like PNG but 26% smaller. Every pixel is preserved exactly. Ideal for logos, screenshots, and graphics with transparency.",
                },
                {
                  title: "Transparency (alpha channel)",
                  detail: "Lossy WebP supports transparency- something JPEG cannot do. Replace PNG for transparent web graphics and get dramatically smaller files.",
                },
                {
                  title: "Animation",
                  detail: "WebP supports animated images like GIF, but with much better compression. An animated WebP is typically 64% smaller than the equivalent GIF.",
                },
              ].map(({ title, detail }) => (
                <div
                  key={title}
                  className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md px-4 py-3"
                >
                  <p className="text-xs font-semibold text-gray-800 dark:text-[#E5E5E5] mb-1">{title}</p>
                  <p className="text-xs text-gray-500 dark:text-[#737373] leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>

            <h2 id="browser-support" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              WebP browser support in 2026
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              WebP support is now universal. As of early 2026, global browser support is above 97% according to{" "}
              <a
                href="https://caniuse.com/webp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                Can I Use
              </a>
              . The last major holdout was Safari on iOS and macOS - Apple added full WebP support in Safari 14 (released September 2020). Every iPhone running iOS 14 or later supports WebP natively.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The era of needing fallback JPEG alternatives for Safari is over. If you are still serving JPEG to all users out of caution, you are leaving significant performance gains on the table for no practical reason. Check the latest compatibility data on{" "}
              <a href="https://caniuse.com/webp" target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">Can I Use: WebP</a>.
            </p>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
                alt="Developer coding on a laptop with multiple browser windows open"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                WebP is now supported by every major browser- no fallbacks needed in 2026 - Photo by Christopher Gower on Unsplash
              </figcaption>
            </figure>

            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A] mb-6">
              {[
                { browser: "Chrome", support: "Since v23 (2012)", status: true },
                { browser: "Firefox", support: "Since v65 (2019)", status: true },
                { browser: "Safari", support: "Since v14 (2020)", status: true },
                { browser: "Edge", support: "Since v18 (2018)", status: true },
                { browser: "Opera", support: "Since v12 (2012)", status: true },
                { browser: "Samsung Internet", support: "Since v4 (2016)", status: true },
              ].map(({ browser, support, status }) => (
                <div key={browser} className="flex items-center justify-between px-4 py-2.5">
                  <div>
                    <span className="text-xs font-medium text-gray-800 dark:text-[#E5E5E5] mr-3">{browser}</span>
                    <span className="text-xs text-gray-400 dark:text-[#737373]">{support}</span>
                  </div>
                  {status
                    ? <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-500" strokeWidth={2} />
                    : <X className="h-3.5 w-3.5 text-red-500" strokeWidth={2} />
                  }
                </div>
              ))}
            </div>

            <h2 id="webp-vs-jpeg-png" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              WebP vs JPEG vs PNG: when to use which
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The choice between formats is not about which is objectively better- it is about matching the format to the content and use case. Here is the practical breakdown.
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Use WebP when
            </h3>
            <ul className="space-y-2 mb-4 pl-4">
              {[
                "Publishing photos or images to a website or web application in 2026- universal browser support makes this the clear default.",
                "You need transparent images for web use- lossy WebP with transparency is dramatically smaller than PNG.",
                "You are serving animated images- animated WebP replaces GIF with far better compression.",
                "You need both quality modes - WebP handles lossy and lossless in one format, simplifying your pipeline.",
                "Core Web Vitals matter - Google explicitly recommends next-gen formats (WebP, AVIF) in Lighthouse audits.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-400 dark:bg-indigo-600 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Stick with JPEG when
            </h3>
            <ul className="space-y-2 mb-4 pl-4">
              {[
                "Delivering photos to print labs or print-ready workflows - JPEG is the universal standard in print production.",
                "Sending photos to clients who need to work with files in software that may not support WebP (some older editing tools).",
                "Archiving originals - JPEG has 30+ years of universal support. For long-term storage, format longevity matters.",
                "Some email clients still do not reliably render WebP in HTML emails - JPEG remains safer for email contexts.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Stick with PNG when
            </h3>
            <ul className="space-y-2 mb-4 pl-4">
              {[
                "Working with graphics that contain text, hard edges, or flat areas of color- lossless encoding (both PNG and lossless WebP) preserves these perfectly, while lossy formats introduce artifacts.",
                "The receiving system does not support WebP- though in 2026 this is increasingly rare.",
                "You need maximum compatibility with image editing software for layered or lossless workflows.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Format comparison table */}
            <h2 id="format-comparison" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-4">
              Format comparison at a glance
            </h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
              <table className="w-full text-xs border-collapse min-w-[520px]">
                <thead>
                  <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">Feature</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">JPEG</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">PNG</th>
                    <th className="text-center py-2 px-3 font-semibold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30">WebP</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Lossy compression", jpeg: true, png: false, webp: true },
                    { feature: "Lossless compression", jpeg: false, png: true, webp: true },
                    { feature: "Transparency (alpha)", jpeg: false, png: true, webp: true },
                    { feature: "Animation", jpeg: false, png: "Limited", webp: true },
                    { feature: "File size vs JPEG", jpeg: "Baseline", png: "Larger", webp: "25–35% smaller" },
                    { feature: "Browser support 2026", jpeg: "100%", png: "100%", webp: "97%+" },
                    { feature: "Print production", jpeg: true, png: true, webp: false },
                    { feature: "Email clients", jpeg: true, png: true, webp: "Partial" },
                  ].map((row, i) => (
                    <tr key={row.feature} className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${i % 2 === 0 ? "" : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"}`}>
                      <td className="py-2 px-3 text-gray-600 dark:text-[#A3A3A3]">{row.feature}</td>
                      <td className="py-2 px-3 text-center text-gray-500 dark:text-[#737373]">
                        {typeof row.jpeg === "boolean"
                          ? row.jpeg
                            ? <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mx-auto" strokeWidth={2} />
                            : <X className="h-3.5 w-3.5 text-red-500 mx-auto" strokeWidth={2} />
                          : row.jpeg}
                      </td>
                      <td className="py-2 px-3 text-center text-gray-500 dark:text-[#737373]">
                        {typeof row.png === "boolean"
                          ? row.png
                            ? <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mx-auto" strokeWidth={2} />
                            : <X className="h-3.5 w-3.5 text-red-500 mx-auto" strokeWidth={2} />
                          : row.png}
                      </td>
                      <td className="py-2 px-3 text-center text-indigo-700 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/10 font-medium">
                        {typeof row.webp === "boolean"
                          ? row.webp
                            ? <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mx-auto" strokeWidth={2} />
                            : <X className="h-3.5 w-3.5 text-red-500 mx-auto" strokeWidth={2} />
                          : row.webp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="avif-comparison" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              What about AVIF? Is it better than WebP?
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              AVIF (AV1 Image File Format) is a newer format that achieves even better compression than WebP- often 30–50% smaller than WebP at equivalent quality. Browser support reached approximately 90%+ globally in 2024, with the main gap being Safari on older iOS versions.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The trade-off is encoding time. AVIF is significantly slower to encode than WebP, which matters for server-side on-the-fly conversion. For static assets and photographers converting files manually, this is less of a concern.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The practical recommendation for 2026: WebP is the safe, universal default. Use it for everything. If you want to push further, serve AVIF with a WebP fallback using the HTML{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-700 dark:text-[#D4D4D4]">&lt;picture&gt;</code> element. SammaPix currently focuses on WebP conversion as the production-ready default; AVIF support is on the roadmap.
            </p>

            <h2 id="convert-with-sammapix" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              How to convert photos to WebP using SammaPix
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              <Link
                href="/tools/webp"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix WebP Converter
              </Link>{" "}
              converts JPEG, PNG, GIF, and AVIF files to WebP entirely in your browser. No upload, no server processing, no account required.
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  step: "1",
                  title: "Open the WebP Converter",
                  body: "Go to sammapix.com/tools/webp. The converter runs entirely client-side- your files are processed locally and never sent to any server.",
                },
                {
                  step: "2",
                  title: "Drop your images",
                  body: "Drag one or multiple files onto the drop zone. You can convert an entire folder in one go. Supported input formats: JPG, JPEG, PNG, GIF, AVIF.",
                },
                {
                  step: "3",
                  title: "Adjust quality (optional)",
                  body: "Use the quality slider to control the compression level. The default of 80% is a well-tested balance for most web images. If you are working with graphics or logos, consider the lossless mode for pixel-perfect results.",
                },
                {
                  step: "4",
                  title: "Download your WebP files",
                  body: "Download individual files or use ZIP download to batch-export everything at once. The converted files are named identically to the originals, just with the .webp extension.",
                },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#333] flex items-center justify-center mt-0.5">
                    <span className="text-[11px] font-semibold text-gray-600 dark:text-[#A3A3A3]">{step}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mb-1">{title}</p>
                    <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA inline */}
            <Link
              href="/tools/webp"
              className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8"
            >
              <div>
                <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">
                  Free tool- no upload, no signup
                </p>
                <p className="text-sm font-semibold text-white leading-snug">
                  Convert your images to WebP now - SammaPix WebP Converter
                </p>
              </div>
              <ArrowRight
                className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
                strokeWidth={1.5}
              />
            </Link>

            <h2 id="serving-webp" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              Serving WebP on your website
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Converting your images is only the first step. Here is how to deliver them correctly on different platforms.
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              HTML: the &lt;picture&gt; element
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The safest approach for any HTML page- serves WebP to browsers that support it, falls back to JPEG automatically:
            </p>
            <pre className="text-xs bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 overflow-x-auto mb-4 text-gray-700 dark:text-[#D4D4D4]">{`<picture>
  <source srcset="photo.webp" type="image/webp" />
  <img src="photo.jpg" alt="Description" />
</picture>`}</pre>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              WordPress
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              WordPress 5.8+ natively accepts WebP uploads. You can upload .webp files directly via the Media Library. Plugins like ShortPixel, Imagify, or WebP Converter for Media can automate on-the-fly WebP conversion and serving with{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded">Accept: image/webp</code> header detection.
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Next.js
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Next.js automatically serves WebP when you use the built-in{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded">next/image</code> component. It detects browser support via the{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded">Accept</code> header and converts images at request time, caching the result. No manual conversion needed if you use{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded">&lt;Image /&gt;</code>.
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Squarespace and Webflow
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Squarespace automatically converts uploaded images to WebP since 2022. Webflow serves WebP via its CDN for all images uploaded after mid-2023. If you are on either platform, your images may already be served as WebP- check your network tab in browser DevTools to confirm.
            </p>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
                alt="Code on a computer screen showing web development in progress"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                Implementing WebP in your site is straightforward with modern frameworks - Photo by Clement Helardot on Unsplash
              </figcaption>
            </figure>

            <h2 id="photography-tips" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              WebP and photography workflows: practical tips
            </h2>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
              Never use WebP as your master archive format
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Keep original RAW or high-quality JPEG masters for archiving. Convert to WebP only for the specific web deliverables that will be published. The smaller file size comes at the cost of some discarded data- fine for web delivery, not appropriate for long-term photo archiving where you want every pixel preserved.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
              Convert during your export step, not at source
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              A clean workflow: edit in Lightroom, Capture One, or your preferred software &rarr; export full-quality JPEG or TIFF &rarr; batch-convert to WebP in SammaPix before uploading to your website. This keeps your editing workflow using well-supported formats and adds the WebP conversion as a final, fast step.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
              Pair WebP conversion with compression
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Converting to WebP already reduces file size, but combining format conversion with quality compression gives you the largest gains. Use{" "}
              <Link
                href="/tools/compress"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix Compress
              </Link>{" "}
              alongside the WebP converter to do both in your workflow- so a 10 MB camera JPEG becomes a sub-300 KB WebP ready for web delivery.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
              Check your EXIF metadata after conversion
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              WebP does not use the EXIF standard in the same way JPEG does. Most conversion tools strip EXIF metadata during the WebP conversion, which is usually the desired behavior for web images. If you need to verify what metadata (if any) survives the conversion, drop the output file into{" "}
              <Link
                href="/tools/exif"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix EXIF Viewer
              </Link>{" "}
              to check.
            </p>

            {/* FAQ */}
            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
              <h2 id="faq" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mb-6">
                FAQ
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Is WebP better than JPEG for photographs?",
                    a: "For web delivery, yes. WebP achieves 25–35% smaller file sizes than JPEG at equivalent visual quality, which means faster page loads and better Core Web Vitals scores. For print or archiving, JPEG remains the standard due to universal software support. Use WebP for web output, JPEG for everything else.",
                  },
                  {
                    q: "Can I open WebP files in Photoshop and Lightroom?",
                    a: "Photoshop added native WebP support in version 23.2 (February 2022). Lightroom Classic added import support for WebP in 2022 as well. If you are running a current version of Adobe software, you can open, edit, and export WebP files natively. Older versions may require a plugin.",
                  },
                  {
                    q: "Does converting to WebP reduce quality?",
                    a: "Converting to lossy WebP at a high quality setting (80%+) produces output that is visually indistinguishable from the JPEG source for most content. Converting to lossless WebP preserves every pixel. The key is choosing the right mode for your content- lossy for photos, lossless for logos and graphics.",
                  },
                  {
                    q: "Can I convert WebP back to JPEG?",
                    a: "Yes, but be aware that each lossy conversion introduces a small amount of additional quality loss. If you converted JPEG to WebP and then convert back to JPEG, the result will have slightly lower quality than the original JPEG. This is why you should always keep the original master file and only convert to WebP for the web deliverable.",
                  },
                  {
                    q: "Does Google rank WebP pages higher?",
                    a: "Google does not directly reward WebP use in rankings. However, page speed and Core Web Vitals (particularly LCP - Largest Contentful Paint) are ranking signals, and serving WebP instead of JPEG can significantly improve those metrics. Lighthouse explicitly flags unoptimized images and recommends WebP or AVIF as next-gen alternatives.",
                  },
                ].map(({ q, a }) => (
                  <div key={q}>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mb-1.5">{q}</h3>
                    <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed">{a}</p>
                  </div>
                ))}


              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mt-6">
              Converting from a specific source format? See the{" "}
              <Link
                href="/blog/png-to-jpg-vs-webp-2026"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                PNG to JPG vs WebP benchmark
              </Link>
              {" "}and the{" "}
              <Link
                href="/blog/heic-to-webp-converter-guide"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                HEIC to WebP guide
              </Link>
              .
            </p>

      </BlogArticleLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
