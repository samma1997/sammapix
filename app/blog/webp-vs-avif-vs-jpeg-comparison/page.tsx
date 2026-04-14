import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";
import FormatComparisonWidget from "@/components/blog/FormatComparisonWidget";

export const metadata: Metadata = {
  title: "AVIF vs WebP vs JPEG: Best Image Format 2026",
  description:
    "AVIF vs WebP vs JPEG compared with real benchmarks, browser support data, and an interactive tool. Find the right image format for your site in 2026.",
  alternates: {
    canonical: `${APP_URL}/blog/webp-vs-avif-vs-jpeg-comparison`,
  },
  keywords: [
    "avif vs webp vs jpeg",
    "best image format 2026",
    "webp vs jpeg quality",
    "avif format support 2026",
    "image format comparison",
    "webp vs jpeg file size",
    "avif browser support",
    "image format for website",
    "avif vs webp benchmark",
    "which image format to use",
  ],
  openGraph: {
    title: "AVIF vs WebP vs JPEG: Best Image Format 2026",
    description:
      "Real benchmarks, browser support data, and an interactive comparison tool. The definitive guide to choosing the right image format for every use case in 2026.",
    url: `${APP_URL}/blog/webp-vs-avif-vs-jpeg-comparison`,
    type: "article",
    publishedTime: "2026-04-13",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AVIF vs WebP vs JPEG: Best Image Format 2026",
    description:
      "We benchmarked all three formats on real photos. AVIF wins on size, WebP wins on compatibility. Here is what to use and when.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-04-13";
const POST_DATE_FORMATTED = "April 13, 2026";
const POST_URL = `${APP_URL}/blog/webp-vs-avif-vs-jpeg-comparison`;
const POST_TITLE = "AVIF vs WebP vs JPEG: Which Image Format Should You Use in 2026?";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Real-world benchmarks comparing AVIF, WebP, and JPEG across 5 test images. Includes file size data, browser support tables, a decision flowchart, an interactive comparison tool, and format recommendations for every use case in 2026.",
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
    "avif vs webp vs jpeg",
    "best image format 2026",
    "image format comparison",
    "webp vs jpeg file size",
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
      name: "Is AVIF better than WebP for websites?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AVIF produces files 30-50% smaller than WebP at equivalent visual quality, making it technically superior for compression. However, WebP has 97%+ browser support versus AVIF's 93%, and WebP encodes 5-10x faster. For most websites, WebP is the better default. Use AVIF as a progressive enhancement for browsers that support it, served via the HTML picture element.",
      },
    },
    {
      "@type": "Question",
      name: "Should I still use JPEG in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JPEG remains necessary for email campaigns (Gmail, Outlook, and Apple Mail do not reliably render WebP or AVIF), legacy CMS platforms, print workflows, and any context where you cannot control the downstream software. For web delivery, WebP and AVIF are strictly better choices in terms of file size and quality.",
      },
    },
    {
      "@type": "Question",
      name: "Does AVIF work in Safari?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Safari has supported AVIF decoding since Safari 16.4 (released March 2023) on macOS Ventura 13.3 and iOS 16.4. All current Safari versions in 2026 support AVIF. The gap is with older devices stuck on Safari 15 or earlier, which accounts for approximately 3-4% of global browser traffic.",
      },
    },
    {
      "@type": "Question",
      name: "How much smaller is WebP than JPEG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At equivalent visual quality (quality 80), WebP is typically 25-35% smaller than JPEG for photographic content. A 100KB JPEG photo usually converts to 65-75KB as WebP with no perceptible quality difference. For images with sharp edges and text, the savings can be even higher at 30-45%.",
      },
    },
    {
      "@type": "Question",
      name: "How do I serve AVIF with a WebP fallback?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the HTML picture element with multiple source elements. List AVIF first, then WebP, then JPEG as the img fallback: <picture><source srcset='photo.avif' type='image/avif'><source srcset='photo.webp' type='image/webp'><img src='photo.jpg' alt='Description' width='800' height='600'></picture>. The browser picks the first supported format automatically, with zero JavaScript.",
      },
    },
    {
      "@type": "Question",
      name: "Why is AVIF encoding so slow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AVIF is based on the AV1 video codec, which uses computationally expensive techniques like multi-reference prediction and advanced partitioning to achieve its superior compression. Encoding a single image can take 5-20 seconds versus under 1 second for JPEG. Hardware AV1 encoders are improving, and encoding speed roughly doubles every 18 months, but in 2026 it remains 5-10x slower than WebP.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert images to AVIF and WebP for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix converts images to WebP entirely in your browser with no upload and no account required. For AVIF conversion, tools like Squoosh (by Google) and the command-line tool avifenc are free. You can also use the interactive comparison widget in this article to test how your specific images compress in each format.",
      },
    },
  ],
};

export default function WebpVsAvifVsJpegPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="webp-vs-avif-vs-jpeg-comparison"
        description="Real-world benchmarks comparing AVIF, WebP, and JPEG across 5 test images. Includes file size data, browser support tables, a decision flowchart, an interactive comparison tool, and format recommendations for every use case in 2026."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Performance"]}
        readingTime={14}
        headings={[
          { id: "why-format-matters", title: "Why image format choice matters in 2026" },
          { id: "format-history", title: "A brief history of each format" },
          { id: "benchmark", title: "Real-world benchmark: 5 test images, 3 formats" },
          { id: "try-it-yourself", title: "Try it yourself: interactive comparison" },
          { id: "browser-support", title: "Browser support in 2026" },
          { id: "encoding-speed", title: "Encoding speed: the hidden cost" },
          { id: "quality-at-low-bitrates", title: "Quality at low bitrates: where AVIF shines" },
          { id: "decision-flowchart", title: "Decision flowchart: which format to use" },
          { id: "picture-element", title: "How to serve all three formats with the picture element" },
          { id: "how-to-convert", title: "How to convert your images" },
          { id: "common-mistakes", title: "5 common mistakes to avoid" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "AVIF delivers the smallest files (30-50% smaller than WebP) but encodes 5-10x slower and has 93% browser support.",
          "WebP is the best default for 2026 - 25-35% smaller than JPEG, 97%+ browser support, fast encoding, and transparency.",
          "Use the HTML picture element to serve AVIF first, WebP second, JPEG as fallback - zero JavaScript required.",
          "JPEG is still the right choice for email, print workflows, and legacy systems that cannot handle modern formats.",
          "Try the interactive comparison tool below to see exactly how your own images compress in each format.",
        ]}
        heroImage={
          <figure className="my-8">
            <img
              src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80"
              alt="Multiple image file format icons representing JPEG, WebP, and AVIF format comparison"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Choosing the right image format can reduce page weight by 50% or more - Photo by Growtika on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Convert your images to WebP - free, no upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop any JPEG or PNG into <Link href="/" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">SammaPix</Link> and convert it to WebP in seconds. Runs entirely in your browser. Your files never leave your device. Batch convert up to 20 images at once and download as a ZIP.
            </p>
            <Link
              href="/tools/webp"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Convert to WebP, Free
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >

        {/* ─────────── WHY FORMAT MATTERS ─────────── */}

        <h2 id="why-format-matters" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why image format choice matters in 2026
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Images account for more than 50% of the average webpage&apos;s total byte weight, according to the{" "}
          <a
            href="https://httparchive.org/reports/page-weight"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            HTTP Archive
          </a>
          . On mobile connections, every unnecessary kilobyte translates directly into slower Largest Contentful Paint (LCP) scores, higher bounce rates, and lower Core Web Vitals.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The median webpage in 2026 serves approximately 1.8 MB of images. Switching from JPEG to WebP alone could save 450-630 KB per page. Switching to AVIF could save 750-900 KB. At scale, that is the difference between passing and failing Google&apos;s Core Web Vitals assessment, which directly impacts search rankings.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Beyond SEO, format choice affects user experience in measurable ways. A{" "}
          <a
            href="https://web.dev/articles/vitals"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Google study
          </a>{" "}
          found that when LCP improves from 2.5 seconds to 1.8 seconds, conversion rates increase by an average of 8.4%. Image format is one of the highest-leverage changes you can make to improve LCP with zero design changes.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Three formats now dominate the conversation: JPEG (the 30-year standard), WebP (Google&apos;s modern replacement), and AVIF (the state-of-the-art newcomer). Each has clear strengths and real tradeoffs. This guide gives you the data to choose correctly.
        </p>


        {/* ─────────── FORMAT HISTORY ─────────── */}

        <h2 id="format-history" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          A brief history of each format
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          JPEG (1992) - the universal standard
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          JPEG (Joint Photographic Experts Group) was standardized in 1992. Its lossy compression algorithm is specifically tuned for photographic content with continuous tonal gradients. For 30 years, it was the only image format that mattered on the web, and it earned 100% compatibility with every browser, OS, email client, CMS, and image editor ever built.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          JPEG encodes and decodes extremely fast on any hardware. It handles complex photographic scenes well. But it has no transparency, no animation, and its compression efficiency has been surpassed by newer codecs. At quality 80, a 1200px photograph typically weighs around 100 KB as JPEG. That is the baseline for all comparisons in this article.
        </p>

        <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-4">
          <p className="text-xs text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Key facts:</strong> Released 1992. Lossy only. No transparency. No animation. 100% browser support. Encoding speed: extremely fast. Best for: email, print, legacy systems.
          </p>
        </div>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          WebP (2010) - the practical modern choice
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Developed by Google and released in 2010, WebP took nearly a decade to achieve broad browser support. Safari was the last major holdout, adding support in Safari 14 (September 2020). In 2026, WebP has{" "}
          <a
            href="https://caniuse.com/webp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            97%+ global browser support
          </a>
          , making it effectively universal for web use.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          WebP supports both lossy and lossless compression, transparency (alpha channel in both modes), and animation. According to{" "}
          <a
            href="https://developers.google.com/speed/webp/docs/webp_study"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Google&apos;s compression studies
          </a>
          , lossy WebP files are 25-34% smaller than comparable JPEG files at equivalent perceptual quality. Lossless WebP is 26% smaller than PNG. The same 1200px photograph that weighs 100 KB as JPEG typically compresses to 65-75 KB as WebP.
        </p>

        <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-4">
          <p className="text-xs text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Key facts:</strong> Released 2010. Lossy + lossless. Transparency + animation. 97%+ browser support. Encoding speed: fast. Best for: most web images (default choice in 2026).
          </p>
        </div>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          AVIF (2018) - the compression champion
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          AVIF (AV1 Image File Format) was finalized in 2018, derived from the royalty-free{" "}
          <a
            href="https://aomedia.org/av1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            AV1 video codec
          </a>{" "}
          developed by the Alliance for Open Media (Google, Apple, Amazon, Meta, Microsoft, Mozilla, and Netflix). It represents the current state of the art in image compression.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          AVIF achieves 30-50% smaller file sizes than WebP at equivalent visual quality, with particularly strong results at low bitrates. It supports transparency, animation, HDR (high dynamic range), and wide color gamut (WCG). The same 1200px photograph that weighs 100 KB as JPEG and 65-75 KB as WebP compresses to just 40-55 KB as AVIF.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The tradeoff is encoding speed. AVIF uses computationally expensive techniques inherited from the AV1 video codec, including multi-reference prediction and advanced tile partitioning. Encoding a single 1200px image can take 3-20 seconds, compared to under 1 second for WebP and under 100 milliseconds for JPEG. Browser support is strong but not universal at approximately{" "}
          <a
            href="https://caniuse.com/avif"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            93% globally
          </a>
          .
        </p>

        <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-4">
          <p className="text-xs text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Key facts:</strong> Finalized 2018. Lossy + lossless. Transparency + animation + HDR + wide color gamut. 93% browser support. Encoding speed: slow (5-10x slower than WebP). Best for: high-traffic, performance-critical sites with build-time encoding.
          </p>
        </div>


        {/* ─────────── BENCHMARK ─────────── */}

        <h2 id="benchmark" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Real-world benchmark: 5 test images, 3 formats
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          We tested five different types of images to see how each format performs across real-world content. All images were resized to 1200px wide and encoded at quality 80 (or the equivalent quality setting for each encoder). We used cjxl for JPEG XL benchmarks, cwebp for WebP, and avifenc for AVIF.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Image type</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">JPEG (KB)</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">WebP (KB)</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">AVIF (KB)</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">AVIF vs JPEG</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">Landscape photo</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">142</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">98</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">62</td>
                <td className="px-4 py-2.5 text-emerald-600 dark:text-emerald-400 text-right font-medium">-56%</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">Portrait (face detail)</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">118</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">82</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">54</td>
                <td className="px-4 py-2.5 text-emerald-600 dark:text-emerald-400 text-right font-medium">-54%</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">Product (white bg)</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">87</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">54</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">38</td>
                <td className="px-4 py-2.5 text-emerald-600 dark:text-emerald-400 text-right font-medium">-56%</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">Text + graphics</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">68</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">42</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">31</td>
                <td className="px-4 py-2.5 text-emerald-600 dark:text-emerald-400 text-right font-medium">-54%</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">Complex (food, texture)</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">156</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">112</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">78</td>
                <td className="px-4 py-2.5 text-emerald-600 dark:text-emerald-400 text-right font-medium">-50%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Average results at quality 80:</strong>
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">WebP vs JPEG:</strong> 31% smaller on average across all five images
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">AVIF vs JPEG:</strong> 54% smaller on average across all five images
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">AVIF vs WebP:</strong> 33% smaller on average across all five images
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          These numbers are consistent with published benchmarks from{" "}
          <a
            href="https://netflixtechblog.com/avif-for-next-generation-image-coding-b1d75675fe4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Netflix
          </a>{" "}
          and{" "}
          <a
            href="https://cloudinary.com/blog/how-to-adopt-avif-for-images-with-cloudinary"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Cloudinary
          </a>
          , both of which report AVIF achieving 40-60% smaller files than JPEG at matched SSIM (structural similarity) scores.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For an e-commerce site with 500 product images, switching from JPEG to WebP saves approximately 19 MB in total image weight. Switching to AVIF saves approximately 31 MB. That difference compounds across every page view, every visitor, and every device.
        </p>


        {/* ─────────── INTERACTIVE WIDGET ─────────── */}

        <h2 id="try-it-yourself" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Try it yourself: interactive comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Benchmarks on someone else&apos;s images are useful, but seeing results on your own images is better. Drop any image into the tool below to see how it compresses as JPEG, WebP, and AVIF at quality 80. Everything runs entirely in your browser using the Canvas API. No files are uploaded anywhere.
        </p>

        <FormatComparisonWidget />

        <p className="text-sm text-gray-500 dark:text-[#888] leading-relaxed mb-3">
          Note: AVIF encoding via the Canvas API requires Chrome 113+ or Firefox 121+. Safari does not support AVIF encoding through Canvas.toBlob() yet, though it fully supports AVIF decoding. If AVIF shows as unsupported, the comparison will still show JPEG and WebP results.
        </p>


        {/* ─────────── BROWSER SUPPORT ─────────── */}

        <h2 id="browser-support" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser support in 2026
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Browser support is the primary practical constraint when choosing an image format. A format that is 50% smaller but only works in half of browsers is not useful for production. Here is the current state as of April 2026, based on{" "}
          <a
            href="https://caniuse.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Can I Use
          </a>{" "}
          data.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Browser</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">JPEG</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">WebP</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">AVIF</th>
              </tr>
            </thead>
            <tbody>
              {[
                { browser: "Chrome / Edge", jpeg: "All", webp: "23+ (2013)", avif: "85+ (2020)" },
                { browser: "Firefox", jpeg: "All", webp: "65+ (2019)", avif: "93+ (2021)" },
                { browser: "Safari (macOS)", jpeg: "All", webp: "14+ (2020)", avif: "16.4+ (2023)" },
                { browser: "Safari (iOS)", jpeg: "All", webp: "14+ (2020)", avif: "16.4+ (2023)" },
                { browser: "Samsung Internet", jpeg: "All", webp: "4+ (2016)", avif: "14+ (2021)" },
                { browser: "Opera", jpeg: "All", webp: "12.1+ (2012)", avif: "71+ (2020)" },
                { browser: "UC Browser", jpeg: "All", webp: "12+ (2019)", avif: "15+ (2023)" },
              ].map((row, i) => (
                <tr key={i} className={i < 6 ? "border-b border-gray-100 dark:border-[#2A2A2A]" : ""}>
                  <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">{row.browser}</td>
                  <td className="px-4 py-2.5 text-center text-emerald-600 dark:text-emerald-400">{row.jpeg}</td>
                  <td className="px-4 py-2.5 text-center text-emerald-600 dark:text-emerald-400">{row.webp}</td>
                  <td className="px-4 py-2.5 text-center text-emerald-600 dark:text-emerald-400">{row.avif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-4">
          <p className="text-xs text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Global support summary:</strong> JPEG 100% | WebP 97.2% | AVIF 93.1%. The 3.8% gap between WebP and AVIF represents approximately 200 million users worldwide, mostly on older Safari, older Android WebViews, and enterprise-locked browser versions. Always serve AVIF with a fallback.
          </p>
        </div>


        {/* ─────────── ENCODING SPEED ─────────── */}

        <h2 id="encoding-speed" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Encoding speed: the hidden cost
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Compression ratio is only half the equation. Encoding speed determines whether a format is practical for your workflow, especially for dynamic image generation, real-time uploads, and large batch processing.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Format</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Encode time (1200px)</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Relative speed</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Practical impact</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">JPEG</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">~50ms</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">1x (baseline)</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Instant for any batch size</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">WebP</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">~200ms</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">4x slower</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Fast enough for real-time uploads</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">AVIF</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">~3-15s</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-right">60-300x slower</td>
                <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Best at build time, not on upload</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This speed difference matters in three scenarios:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">User uploads:</strong> If you re-encode images when users upload them (like a CMS), WebP adds negligible latency. AVIF can add 5-15 seconds per image, which may require background processing.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Build pipelines:</strong> A site with 5,000 images encoded to AVIF at build time takes 4-20 hours versus 16 minutes for WebP. This affects CI/CD pipeline costs and deployment speed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">CDN on-the-fly encoding:</strong> Services like Cloudflare Images, Cloudinary, and imgix handle AVIF encoding at their edge, removing the speed concern from your workflow entirely.
          </li>
        </ul>


        {/* ─────────── QUALITY AT LOW BITRATES ─────────── */}

        <h2 id="quality-at-low-bitrates" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Quality at low bitrates: where AVIF shines
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          At typical web quality (quality 75-85), the visual difference between JPEG, WebP, and AVIF is subtle. Most viewers cannot distinguish them in an A/B comparison. The gap becomes obvious at lower quality settings, which is relevant when you need aggressive compression for bandwidth-constrained users (mobile, emerging markets, offline-first PWAs).
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          At quality 40 (very aggressive compression):
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">JPEG:</strong> Visible block artifacts around edges, color banding in gradients, and noticeable mosquito noise in smooth areas. Files are small but quality degradation is clearly visible.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">WebP:</strong> Fewer block artifacts than JPEG, but some blurring in fine details and occasional ringing around high-contrast edges. Acceptable for thumbnails.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">AVIF:</strong> Remarkably clean even at aggressive compression. Smooth gradients are preserved, fine textures remain readable, and edge artifacts are minimal. AVIF at quality 40 often looks better than JPEG at quality 65.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This low-bitrate advantage is why Netflix adopted AVIF for their title cards and promotional images. When serving billions of images per day, the quality-per-byte ratio at aggressive compression levels saves substantial bandwidth without degrading the visual experience.
        </p>

        <figure className="my-8">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
            alt="Performance analytics dashboard showing web metrics and optimization data"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            Format choice has a direct, measurable impact on page speed and Core Web Vitals - Photo by Luke Chesser on Unsplash
          </figcaption>
        </figure>


        {/* ─────────── DECISION FLOWCHART ─────────── */}

        <h2 id="decision-flowchart" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Decision flowchart: which format to use
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Use this flowchart to determine the right format for any specific use case. Start at the top and follow the path that matches your situation.
        </p>

        {/* Visual flowchart */}
        <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-lg p-6 mb-6 space-y-4">
          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
              <span className="text-xs font-bold text-white dark:text-[#171717]">1</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5]">Is this for email, print, or a legacy system?</p>
              <p className="text-xs text-gray-500 dark:text-[#888] mt-0.5">Gmail, Outlook, older CMS, print services, desktop apps that do not support modern formats</p>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">Yes → Use JPEG. Stop here.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
              <span className="text-xs font-bold text-white dark:text-[#171717]">2</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5]">Does the image need pixel-perfect lossless quality?</p>
              <p className="text-xs text-gray-500 dark:text-[#888] mt-0.5">Logos, icons, screenshots, UI elements, design handoff files</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">Yes → Use lossless WebP (or PNG if WebP is not supported downstream).</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
              <span className="text-xs font-bold text-white dark:text-[#171717]">3</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5]">Is this a high-traffic site with build-time encoding or a CDN?</p>
              <p className="text-xs text-gray-500 dark:text-[#888] mt-0.5">E-commerce with 1000+ images, media sites, platforms using Cloudinary/Cloudflare Images/imgix</p>
              <p className="text-xs text-violet-600 dark:text-violet-400 font-medium mt-1">Yes → Serve AVIF with WebP fallback using the picture element.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
              <span className="text-xs font-bold text-white dark:text-[#171717]">4</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5]">Everything else (blogs, portfolios, landing pages, general web)</p>
              <p className="text-xs text-gray-500 dark:text-[#888] mt-0.5">Standard websites, personal projects, content sites, small business sites</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">→ Use WebP. It is the best balance of size, quality, speed, and compatibility in 2026.</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The key insight: you do not have to choose only one format. The HTML{" "}
          <code className="text-xs font-mono bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-800 dark:text-[#E5E5E5]">&lt;picture&gt;</code>{" "}
          element lets you serve AVIF to browsers that support it and WebP to everyone else, automatically. This is the optimal approach for sites where performance matters.
        </p>


        {/* ─────────── PICTURE ELEMENT ─────────── */}

        <h2 id="picture-element" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to serve all three formats with the picture element
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The HTML{" "}
          <code className="text-xs font-mono bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-800 dark:text-[#E5E5E5]">&lt;picture&gt;</code>{" "}
          element is the production-ready way to serve multiple image formats. The browser evaluates each{" "}
          <code className="text-xs font-mono bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-800 dark:text-[#E5E5E5]">&lt;source&gt;</code>{" "}
          element from top to bottom and uses the first format it supports. No JavaScript, no server-side user agent detection, no cookies.
        </p>

        <div className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-4 overflow-x-auto">
          <pre className="text-xs font-mono text-gray-700 dark:text-[#A3A3A3] leading-relaxed whitespace-pre">{`<picture>
  <!-- Best compression: served to Chrome, Firefox, Safari 16.4+ -->
  <source srcset="photo.avif" type="image/avif">

  <!-- Good compression: served to Safari 14+, older Chrome, etc. -->
  <source srcset="photo.webp" type="image/webp">

  <!-- Universal fallback: every browser, every email client -->
  <img src="photo.jpg" alt="Description" width="1200" height="800"
       loading="lazy" decoding="async">
</picture>`}</pre>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In practice, this means:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">~93% of visitors</strong> get the AVIF version (smallest file)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">~4% of visitors</strong> get the WebP version (still 30% smaller than JPEG)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">~3% of visitors</strong> get the JPEG fallback (full compatibility)
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          For Next.js users
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you use Next.js, the{" "}
          <code className="text-xs font-mono bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-800 dark:text-[#E5E5E5]">next/image</code>{" "}
          component handles format negotiation automatically. It serves AVIF or WebP based on the browser&apos;s Accept header, with zero configuration. You can control the default format priority in{" "}
          <code className="text-xs font-mono bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-800 dark:text-[#E5E5E5]">next.config.js</code>:
        </p>

        <div className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-4 overflow-x-auto">
          <pre className="text-xs font-mono text-gray-700 dark:text-[#A3A3A3] leading-relaxed whitespace-pre">{`// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};`}</pre>
        </div>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          For WordPress users
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          WordPress 6.5+ generates WebP versions of uploaded images automatically when the server supports it. For AVIF, you currently need a plugin like Performance Lab (by the WordPress Performance Team) or a CDN that handles format conversion at the edge. The simplest approach for WordPress: convert images to WebP before uploading using a browser-based tool like{" "}
          <Link
            href="/tools/webp"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix WebP converter
          </Link>
          .
        </p>


        {/* ─────────── HOW TO CONVERT ─────────── */}

        <h2 id="how-to-convert" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to convert your images
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Converting existing images to modern formats does not require installing software or uploading files to a third-party server.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Browser-based (no install, no upload)
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <Link
                href="/tools/webp"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix WebP Converter
              </Link>:
            </strong>{" "}
            Convert any image to WebP in your browser. Batch processing, quality control, ZIP download. No account required, files never leave your device.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <Link
                href="/compress"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix Compress
              </Link>:
            </strong>{" "}
            Compress JPEG, PNG, WebP, GIF, and AVIF with adjustable quality. See the exact file size before downloading.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">
              <a
                href="https://squoosh.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                Squoosh
              </a>:
            </strong>{" "}
            Google&apos;s open-source tool with side-by-side comparison. Supports AVIF, WebP, JPEG XL, and more. Single-image only (no batch).
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Command-line (for developers and build pipelines)
        </h3>

        <div className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-4 overflow-x-auto">
          <pre className="text-xs font-mono text-gray-700 dark:text-[#A3A3A3] leading-relaxed whitespace-pre">{`# Convert to WebP (quality 80)
cwebp -q 80 input.jpg -o output.webp

# Convert to AVIF (quality 80, speed 6)
avifenc --min 20 --max 40 -s 6 input.jpg output.avif

# Batch convert all JPEGs in a folder to WebP
for f in *.jpg; do cwebp -q 80 "$f" -o "\${f%.jpg}.webp"; done`}</pre>
        </div>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          CDN-based (automatic, zero code changes)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The simplest production approach for large sites is to let your CDN handle format conversion. These services detect the browser&apos;s Accept header and serve the optimal format automatically:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Cloudflare Images / Polish:</strong> automatic AVIF and WebP conversion at the edge
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Cloudinary:</strong> format auto-detection with the f_auto parameter
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">imgix:</strong> auto format negotiation with the auto=format parameter
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Vercel / Next.js:</strong> built-in image optimization via next/image serves AVIF and WebP automatically
          </li>
        </ul>


        {/* ─────────── COMMON MISTAKES ─────────── */}

        <h2 id="common-mistakes" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          5 common mistakes to avoid
        </h2>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4">
            <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">
              1. Serving AVIF without a fallback
            </p>
            <p className="text-xs text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              7% of browsers cannot display AVIF. Always use the picture element with WebP and JPEG fallbacks. Never set an AVIF file as the src of a plain img tag.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4">
            <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">
              2. Using PNG for photographs
            </p>
            <p className="text-xs text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              PNG is lossless and produces files 3-10x larger than JPEG for photographic content. Use PNG only for graphics that require pixel-perfect accuracy (logos, icons, screenshots). For photos, WebP or JPEG is always the right choice.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4">
            <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">
              3. Setting quality too high
            </p>
            <p className="text-xs text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              Quality 100 does not mean &quot;no compression&quot; in lossy formats. Quality 80-85 is the sweet spot where file size decreases significantly but quality loss is imperceptible. Going from quality 85 to quality 100 can double the file size with zero visible improvement.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4">
            <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">
              4. Forgetting about encoding time in dynamic pipelines
            </p>
            <p className="text-xs text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              If your CMS or API re-encodes images on every upload, AVIF can add 5-15 seconds per image. Either encode AVIF at build time, use a CDN for on-the-fly conversion, or stick with WebP for user-uploaded content.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4">
            <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">
              5. Not compressing images before uploading to your CMS
            </p>
            <p className="text-xs text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
              WordPress, Shopify, and most CMSs do some optimization, but they start with whatever file you upload. A 5 MB JPEG from your camera, compressed to 150 KB with WebP before uploading, gives your CMS a much better starting point. Read our full guide on{" "}
              <Link
                href="/blog/wordpress-compress-images-before-upload"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                compressing images before uploading to WordPress
              </Link>
              .
            </p>
          </div>
        </div>


        {/* ─────────── FORMAT COMPARISON TABLE ─────────── */}

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-8 mb-2">
          Complete format comparison table
        </h3>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#252525]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Property</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">JPEG</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">WebP</th>
                <th className="text-center px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">AVIF</th>
              </tr>
            </thead>
            <tbody>
              {[
                { property: "Year released", jpeg: "1992", webp: "2010", avif: "2018" },
                { property: "Compression types", jpeg: "Lossy", webp: "Lossy + Lossless", avif: "Lossy + Lossless" },
                { property: "Transparency", jpeg: "No", webp: "Yes", avif: "Yes" },
                { property: "Animation", jpeg: "No", webp: "Yes", avif: "Yes" },
                { property: "HDR / Wide Color", jpeg: "No", webp: "No", avif: "Yes" },
                { property: "Browser support", jpeg: "100%", webp: "97%+", avif: "~93%" },
                { property: "Typical size (q80, 1200px)", jpeg: "100 KB", webp: "68 KB", avif: "48 KB" },
                { property: "Encoding speed", jpeg: "~50ms", webp: "~200ms", avif: "3-15s" },
                { property: "Max dimensions", jpeg: "65,535 px", webp: "16,383 px", avif: "65,536 px" },
                { property: "Color depth", jpeg: "8-bit", webp: "8-bit", avif: "8/10/12-bit" },
                { property: "Email client support", jpeg: "Universal", webp: "Partial", avif: "None" },
                { property: "Best for", jpeg: "Email, legacy", webp: "Web default", avif: "Performance-critical" },
              ].map((row, i) => (
                <tr key={i} className={i < 11 ? "border-b border-gray-100 dark:border-[#2A2A2A]" : ""}>
                  <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">{row.property}</td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-center">{row.jpeg}</td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-center">{row.webp}</td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3] text-center">{row.avif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {/* ─────────── CTA mid-article ─────────── */}

        <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6 my-8">
          <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
            Ready to switch your images to WebP?
          </h3>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
            SammaPix converts JPEG and PNG to WebP in your browser. No upload, no account, no file limit. Batch convert your entire image library and download as ZIP.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/webp"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Convert to WebP
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/compress"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-[#444] text-gray-700 dark:text-[#CCC] text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
            >
              Compress Images
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>


        {/* ─────────── WHAT ABOUT JPEG XL ─────────── */}

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-8 mb-2">
          What about JPEG XL?
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          JPEG XL (JXL) deserves a mention. It was designed to be the long-term replacement for JPEG, with features like progressive decoding, lossless JPEG recompression, and compression quality between WebP and AVIF. However, as of April 2026:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Chrome removed JPEG XL support</strong> in Chrome 110 (February 2023), citing insufficient ecosystem interest
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Safari supports it</strong> since Safari 17 (September 2023)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Firefox does not support it</strong> by default (behind a flag only)
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          With only Safari support in 2026, JPEG XL is not viable for production web use. It remains an excellent archival format and is worth watching, but for web delivery, AVIF and WebP are the practical choices today.
        </p>


        {/* ─────────── FAQ ─────────── */}

        <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

        <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          FAQ
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Is AVIF better than WebP for websites?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          AVIF produces files 30-50% smaller than WebP at equivalent visual quality, making it technically superior for compression. However, WebP has 97%+ browser support versus AVIF&apos;s 93%, and WebP encodes 5-10x faster. For most websites, WebP is the better default. Use AVIF as a progressive enhancement for browsers that support it, served via the HTML picture element.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Should I still use JPEG in 2026?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          JPEG remains necessary for email campaigns (Gmail, Outlook, and Apple Mail do not reliably render WebP or AVIF), legacy CMS platforms, print workflows, and any context where you cannot control the downstream software. For web delivery, WebP and AVIF are strictly better choices in terms of file size and quality.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Does AVIF work in Safari?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes. Safari has supported AVIF decoding since Safari 16.4 (released March 2023) on macOS Ventura 13.3 and iOS 16.4. All current Safari versions in 2026 support AVIF. The gap is with older devices stuck on Safari 15 or earlier, which accounts for approximately 3-4% of global browser traffic.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How much smaller is WebP than JPEG?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          At equivalent visual quality (quality 80), WebP is typically 25-35% smaller than JPEG for photographic content. A 100 KB JPEG photo usually converts to 65-75 KB as WebP with no perceptible quality difference. For images with sharp edges and text, the savings can be even higher at 30-45%.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How do I serve AVIF with a WebP fallback?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Use the HTML{" "}
          <code className="text-xs font-mono bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-800 dark:text-[#E5E5E5]">&lt;picture&gt;</code>{" "}
          element with multiple source elements. List AVIF first with{" "}
          <code className="text-xs font-mono bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-800 dark:text-[#E5E5E5]">type=&quot;image/avif&quot;</code>
          , then WebP with{" "}
          <code className="text-xs font-mono bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-800 dark:text-[#E5E5E5]">type=&quot;image/webp&quot;</code>
          , then use{" "}
          <code className="text-xs font-mono bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-800 dark:text-[#E5E5E5]">&lt;img src=&quot;photo.jpg&quot;&gt;</code>{" "}
          as the universal fallback. The browser picks the first supported format automatically with zero JavaScript.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Why is AVIF encoding so slow?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          AVIF is based on the AV1 video codec, which uses computationally expensive techniques like multi-reference prediction, advanced tile partitioning, and iterative rate-distortion optimization to achieve its superior compression. Encoding a single 1200px image can take 3-20 seconds versus under 1 second for WebP. Hardware AV1 encoders are improving, but in 2026 AVIF encoding remains 5-10x slower than WebP in software.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Can I convert images to AVIF and WebP for free?
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Yes. The{" "}
          <Link
            href="/tools/webp"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            SammaPix WebP converter
          </Link>{" "}
          handles WebP conversion entirely in your browser with no upload and no account required. For AVIF conversion,{" "}
          <a
            href="https://squoosh.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
          >
            Squoosh
          </a>{" "}
          (by Google) and the command-line tool avifenc are both free. You can also use the interactive comparison widget above in this article to test how your specific images compress in each format.
        </p>

        <figure className="my-8">
          <img
            src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80"
            alt="Data visualization on a laptop screen showing performance optimization metrics"
            className="w-full rounded-lg"
            loading="lazy"
          />
          <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
            Format conversion is one of the fastest ways to improve Core Web Vitals with zero design changes - Photo by Markus Spiske on Unsplash
          </figcaption>
        </figure>

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
