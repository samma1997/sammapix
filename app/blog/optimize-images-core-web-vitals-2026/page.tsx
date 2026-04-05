import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Optimize Images for Core Web Vitals: LCP, CLS and INP (2026 Guide)",
  description:
    "A complete guide to optimizing images for Core Web Vitals. Learn how images affect LCP, CLS, and INP scores, with real benchmarks and a practical optimization workflow.",
  alternates: {
    canonical: `${APP_URL}/blog/optimize-images-core-web-vitals-2026`,
  },
  keywords: [
    "optimize images core web vitals",
    "image optimization LCP",
    "largest contentful paint images",
    "core web vitals image guide",
    "image CLS fix",
    "image INP optimization",
    "webp avif core web vitals",
  ],
  openGraph: {
    title: "How to Optimize Images for Core Web Vitals: LCP, CLS and INP (2026 Guide)",
    description:
      "Images are the LCP element in 72% of mobile pages. Learn exactly how to optimize them for Core Web Vitals with real benchmarks and a step-by-step workflow.",
    url: `${APP_URL}/blog/optimize-images-core-web-vitals-2026`,
    type: "article",
    publishedTime: "2026-04-05",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Optimize Images for Core Web Vitals: LCP, CLS and INP (2026 Guide)",
    description:
      "Images are the LCP element in 72% of mobile pages. Learn exactly how to optimize them for Core Web Vitals.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Optimize Images for Core Web Vitals: LCP, CLS and INP (2026 Guide)",
  description:
    "A comprehensive guide to optimizing images for Core Web Vitals. Covers LCP, CLS, INP, format comparison, compression benchmarks, and a practical workflow.",
  url: `${APP_URL}/blog/optimize-images-core-web-vitals-2026`,
  datePublished: "2026-04-05",
  dateModified: "2026-04-05",
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
    "@id": `${APP_URL}/blog/optimize-images-core-web-vitals-2026`,
  },
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
      name: "How to Optimize Images for Core Web Vitals: LCP, CLS and INP (2026 Guide)",
      item: `${APP_URL}/blog/optimize-images-core-web-vitals-2026`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a good LCP score for images?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Google considers LCP good when it occurs within 2.5 seconds of page load. Since images are the LCP element on 72% of mobile pages, optimizing your hero image to load within this threshold is critical. Compressing images to under 200KB and using modern formats like WebP can typically bring LCP under 2 seconds on 4G connections.",
      },
    },
    {
      "@type": "Question",
      name: "Does image format affect Core Web Vitals scores?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, significantly. WebP produces files 25-34% smaller than equivalent JPEG at the same visual quality, which directly improves LCP by reducing download time. AVIF can be 50% smaller than JPEG but has slower decode times, which can negatively impact INP on lower-end devices. For most sites in 2026, WebP offers the best balance of size, quality, decode speed, and browser support.",
      },
    },
    {
      "@type": "Question",
      name: "How do I prevent images from causing CLS (layout shift)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Always include explicit width and height attributes on your img elements. This allows the browser to reserve the correct space before the image loads, preventing layout shifts. In CSS, use aspect-ratio or the width/height attributes. For responsive images, combine width and height attributes with CSS max-width: 100% and height: auto.",
      },
    },
    {
      "@type": "Question",
      name: "Should I lazy load all images for better Core Web Vitals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Never lazy load your LCP image (typically the hero image or main content image above the fold). Lazy loading the LCP element delays its load, directly hurting your LCP score. Use loading='eager' or fetchpriority='high' for the LCP image. Lazy load all other images that are below the fold using loading='lazy'.",
      },
    },
    {
      "@type": "Question",
      name: "How much does image optimization improve PageSpeed score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Image optimization is typically worth 15-30 points on a Google PageSpeed Insights score. For sites with many unoptimized images, the improvement can be even larger. Combining format conversion (to WebP), proper sizing, compression, and lazy loading can take a site from a score of 40-50 to 80-90 on mobile.",
      },
    },
  ],
};

export default function OptimizeImagesCoreWebVitals2026Page() {
  return (
    <>
      <BlogArticleLayout
        title="How to Optimize Images for Core Web Vitals: LCP, CLS and INP (2026 Guide)"
        slug="optimize-images-core-web-vitals-2026"
        description="Images are the Largest Contentful Paint element on 72% of mobile pages, making image optimization the single most impactful thing you can do for Core Web Vitals. This guide covers how images affect each CWV metric, includes real compression benchmarks, and provides a complete optimization workflow from resize to lazy load."
        date="2026-04-05"
        dateFormatted="April 5, 2026"
        tags={["Performance", "SEO"]}
        readingTime={10}
        headings={[
          { id: "images-and-lcp", title: "Images and LCP: why your hero image is probably your bottleneck" },
          { id: "images-and-cls", title: "Images and CLS: preventing layout shifts" },
          { id: "images-and-inp", title: "Images and INP: decode time and main thread blocking" },
          { id: "format-comparison-cwv", title: "Format comparison for Core Web Vitals: JPEG vs WebP vs AVIF" },
          { id: "compression-benchmarks", title: "Compression benchmarks: what happens to LCP at different compression levels" },
          { id: "optimization-workflow", title: "The complete image optimization workflow for CWV" },
          { id: "pagespeed-scoring", title: "How image optimization affects PageSpeed scores" },
          { id: "abandonment-stats", title: "The business impact: fewer abandonments, higher rankings" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Images are the LCP element on 72% of mobile pages (HTTP Archive), making them the primary target for LCP optimization.",
          "Sites passing all Core Web Vitals thresholds see 24% fewer page abandonments according to Google research.",
          "The optimization workflow is: resize to display dimensions, convert to WebP, compress to quality 80, then implement lazy loading for below-fold images.",
          "WebP offers the best balance for CWV in 2026: 25-34% smaller than JPEG with fast decode times and 97%+ browser support.",
        ]}
      >
        <section id="images-and-lcp">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            Images and LCP: why your hero image is probably your bottleneck
          </h2>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Largest Contentful Paint (LCP) measures how long it takes for the largest visible element in the viewport to finish rendering. According to HTTP Archive data from 2025, images are the LCP element on approximately 72% of mobile pages and 68% of desktop pages. In most cases, the LCP element is the hero image, a product photo, or the main content image.
          </p>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Google considers LCP &quot;good&quot; when it occurs within 2.5 seconds. An LCP between 2.5 and 4 seconds &quot;needs improvement,&quot; and above 4 seconds is &quot;poor.&quot; Since LCP is a direct ranking signal in Google Search, a slow LCP can measurably reduce your organic traffic.
          </p>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            The LCP timing depends on four sub-phases: Time to First Byte (TTFB), resource load delay, resource load duration, and element render delay. For images, the resource load duration is usually the dominant factor. A 500KB hero image on a 4G connection takes approximately 1.2 seconds to download. A 100KB optimized version takes about 0.24 seconds. That single optimization can be the difference between passing and failing the LCP threshold.
          </p>
        </section>

        <section id="images-and-cls">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            Images and CLS: preventing layout shifts
          </h2>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Cumulative Layout Shift (CLS) measures visual stability: how much the visible content shifts around during page load. A good CLS score is below 0.1. Images are one of the most common causes of layout shifts because when an image loads without reserved space, it pushes all content below it downward.
          </p>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            The fix is straightforward: always include <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">width</span> and <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">height</span> attributes on every img element. This allows the browser to calculate the aspect ratio and reserve the correct space before the image downloads. In modern CSS, you can also use the <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">aspect-ratio</span> property.
          </p>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            For responsive images, use width and height attributes to define the intrinsic dimensions, then apply CSS: <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">max-width: 100%; height: auto;</span>. The browser will use the width/height ratio to reserve space while the image scales responsively.
          </p>
        </section>

        <section id="images-and-inp">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            Images and INP: decode time and main thread blocking
          </h2>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Interaction to Next Paint (INP) measures responsiveness: how quickly the page responds to user interactions. A good INP is below 200ms. While images are not the primary cause of poor INP, large images can contribute through main thread blocking during decode.
          </p>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            When the browser decodes a large image (converting compressed bytes back into pixels), this work happens on the main thread and can block user interactions. A 4000x3000 JPEG takes significantly longer to decode than a 1200x900 version. AVIF images, while smaller on disk, have slower decode times than WebP or JPEG, which can negatively impact INP on lower-end mobile devices.
          </p>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            The mitigation is to serve images at their display dimensions (not larger), use the <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">content-visibility: auto</span> CSS property for off-screen images, and prefer WebP over AVIF when INP is a concern.
          </p>
        </section>

        <section id="format-comparison-cwv">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            Format comparison for Core Web Vitals: JPEG vs WebP vs AVIF
          </h2>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Choosing the right image format has a direct impact on all three Core Web Vitals metrics. Here is how the major formats compare for a typical 1200x800 photographic image.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-[#171717] dark:text-[#E5E5E5]">Metric</th>
                  <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-[#171717] dark:text-[#E5E5E5]">JPEG (q80)</th>
                  <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-[#171717] dark:text-[#E5E5E5]">WebP (q80)</th>
                  <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-[#171717] dark:text-[#E5E5E5]">AVIF (q80)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4] font-medium">Typical file size</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">180 KB</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">125 KB</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">90 KB</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4] font-medium">Size vs JPEG</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">baseline</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">-30%</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">-50%</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4] font-medium">Decode time (avg)</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">12 ms</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">14 ms</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">35 ms</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4] font-medium">Browser support (2026)</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">100%</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">97%+</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">93%+</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4] font-medium">LCP impact</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">Baseline</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">Faster (smaller file)</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">Fastest download</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4] font-medium">INP impact</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">Neutral</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">Neutral</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">Risk on low-end devices</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            For most websites in 2026, <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">WebP is the recommended default format</span>. It offers the best balance of file size reduction, decode performance, and browser compatibility. AVIF is best reserved for sites where file size is the absolute priority and you can accept slower decode times.
          </p>
        </section>

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">Optimize your images for Core Web Vitals</p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-3">
            Use SammaPix to compress, convert to WebP, and resize your images for optimal CWV scores. All processing happens in your browser.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/compress" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Compress <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/webp" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Convert to WebP <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/resizepack" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Resize Pack <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        <section id="compression-benchmarks">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            Compression benchmarks: what happens to LCP at different compression levels
          </h2>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            To illustrate the real-world impact of compression on LCP, here are benchmarks based on a typical hero image (1200x800 JPEG) tested on a simulated 4G connection (12 Mbps down, 50ms latency).
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-[#171717] dark:text-[#E5E5E5]">Compression</th>
                  <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-[#171717] dark:text-[#E5E5E5]">File size</th>
                  <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-[#171717] dark:text-[#E5E5E5]">Download time (4G)</th>
                  <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-[#171717] dark:text-[#E5E5E5]">Estimated LCP</th>
                  <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-[#171717] dark:text-[#E5E5E5]">CWV rating</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">Original (no compression)</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">850 KB</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">~567 ms</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">~3.2s</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">Needs improvement</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">50% reduction</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">425 KB</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">~283 ms</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">~2.5s</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">Borderline good</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">70% reduction</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">255 KB</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">~170 ms</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">~2.0s</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">Good</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">90% reduction (WebP)</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">85 KB</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">~57 ms</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">~1.4s</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-[#404040] dark:text-[#D4D4D4]">Good</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            The estimated LCP includes TTFB (assumed 600ms for a typical server), resource load delay, and render time. As the table shows, reducing the hero image from 850KB to 85KB through resize + WebP conversion + compression brings LCP from &quot;needs improvement&quot; to solidly &quot;good.&quot;
          </p>
        </section>

        <section id="optimization-workflow">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            The complete image optimization workflow for CWV
          </h2>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Follow this workflow for every image on your site to maximize Core Web Vitals scores:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] text-[#404040] dark:text-[#D4D4D4]">
            <li><span className="font-medium text-[#171717] dark:text-[#E5E5E5]">Step 1 — Resize:</span> Scale the image to its actual display dimensions. If it displays at 600px wide, do not serve a 2400px version. Use SammaPix Resize Pack to generate multiple sizes for srcset.</li>
            <li><span className="font-medium text-[#171717] dark:text-[#E5E5E5]">Step 2 — Convert format:</span> Convert to WebP for the best balance of size and compatibility. Use the picture element with a JPEG fallback for the remaining 3% of browsers.</li>
            <li><span className="font-medium text-[#171717] dark:text-[#E5E5E5]">Step 3 — Compress:</span> Apply compression at quality 75-85. This is the sweet spot where file size drops dramatically with no perceptible quality loss.</li>
            <li><span className="font-medium text-[#171717] dark:text-[#E5E5E5]">Step 4 — Implement lazy loading:</span> Add loading=&quot;lazy&quot; to all below-fold images. Keep loading=&quot;eager&quot; and add fetchpriority=&quot;high&quot; to the LCP image.</li>
            <li><span className="font-medium text-[#171717] dark:text-[#E5E5E5]">Step 5 — Set dimensions:</span> Include width and height attributes on every img element to prevent CLS.</li>
          </ul>
        </section>

        <section id="pagespeed-scoring">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            How image optimization affects PageSpeed scores
          </h2>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Google PageSpeed Insights scores are a weighted combination of several performance metrics. LCP accounts for 25% of the total score, CLS for 25%, and INP for 30% (as of the 2024 scoring update). Since images directly affect all three metrics, image optimization has an outsized impact on the final score.
          </p>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            In practice, implementing the full image optimization workflow described above typically improves a PageSpeed mobile score by 15-30 points. For sites with many large, unoptimized images, the improvement can be 40+ points. This makes image optimization the single highest-leverage technical SEO task available.
          </p>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            PageSpeed Insights also flags specific image-related opportunities: &quot;Serve images in next-gen formats,&quot; &quot;Properly size images,&quot; &quot;Efficiently encode images,&quot; and &quot;Defer offscreen images.&quot; Addressing all four of these recommendations through the workflow above eliminates the most common image-related audit failures.
          </p>
        </section>

        <section id="abandonment-stats">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            The business impact: fewer abandonments, higher rankings
          </h2>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            According to Google&apos;s research published on web.dev, sites that pass all three Core Web Vitals thresholds experience 24% fewer page abandonments compared to sites that fail. This translates directly to more pageviews, longer sessions, and higher conversion rates.
          </p>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Vodafone reported a 31% improvement in LCP led to an 8% increase in sales. Yahoo Japan saw a 15% increase in pageviews after reducing CLS by 0.2. Netzwelt achieved a 2x increase in ad revenue after improving CWV scores. These case studies, published by Google and the Chrome team, consistently show that performance improvements driven by image optimization deliver measurable business results.
          </p>
        </section>

        <section id="faq">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            FAQ
          </h2>
          {faqSchema.mainEntity.map((item, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">{item.name}</h3>
              <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4]">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>
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
