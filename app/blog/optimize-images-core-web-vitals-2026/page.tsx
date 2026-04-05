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
    "pagespeed image optimization",
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
      "Images are the LCP element in 72% of mobile pages. Optimize them for LCP, CLS and INP with this complete guide.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Optimize Images for Core Web Vitals: LCP, CLS and INP (2026 Guide)",
  description:
    "A complete guide to optimizing images for Core Web Vitals with real benchmarks, format comparisons, and a step-by-step workflow.",
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
    logo: { "@type": "ImageObject", url: "https://sammapix.com/og-image.png" },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${APP_URL}/blog/optimize-images-core-web-vitals-2026` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    { "@type": "ListItem", position: 3, name: "Optimize Images for Core Web Vitals (2026)", item: `${APP_URL}/blog/optimize-images-core-web-vitals-2026` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What image format is best for Core Web Vitals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WebP is the best default format for Core Web Vitals in 2026. It offers 25-34% smaller file sizes than JPEG at equivalent quality with fast decode times and 97%+ browser support. AVIF produces even smaller files (50% smaller than JPEG) but has slower decode times that can hurt INP on low-end devices. Use WebP as default with AVIF for high-traffic hero images where file size matters most.",
      },
    },
    {
      "@type": "Question",
      name: "How do images affect LCP score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Images are the Largest Contentful Paint element on 72% of mobile pages. The LCP timing depends on how long it takes to download and render the largest visible image. A 500KB hero image on a 4G connection takes about 1.2 seconds to download, while a 100KB optimized version takes about 0.24 seconds. This single optimization can be the difference between passing and failing the 2.5-second LCP threshold.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use AVIF or WebP for my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most websites, WebP is the better choice in 2026. WebP has 97%+ browser support, fast decode times (14ms average for a 1200x800 image), and 25-34% file size reduction versus JPEG. AVIF offers 50% reduction versus JPEG but has slower decode times (35ms average) and only 93% browser support. If INP is a concern on mobile, WebP is safer. Use the picture element to serve AVIF with WebP fallback if you want both.",
      },
    },
    {
      "@type": "Question",
      name: "Should I lazy load my hero image?",
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
        text: "Image optimization is typically worth 15-30 points on a Google PageSpeed Insights mobile score. For sites with many unoptimized images, the improvement can exceed 40 points. Combining format conversion (to WebP), proper sizing, compression at quality 80, and lazy loading can take a site from a score of 40-50 to 80-90 on mobile.",
      },
    },
    {
      "@type": "Question",
      name: "How do I fix the 'Properly size images' audit in PageSpeed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This audit flags images that are served at dimensions larger than their display size. For example, serving a 2400px wide image that displays at 600px wastes 75% of the bytes. The fix is to resize images to their actual display dimensions before uploading. Use srcset and sizes attributes to serve different sizes for different viewport widths. Tools like SammaPix Resize Pack can generate multiple sizes in one batch operation.",
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
        description="Images are the Largest Contentful Paint element on 72% of mobile pages, making image optimization the single most impactful thing you can do for Core Web Vitals. This guide covers how images affect each CWV metric with real data, includes compression benchmarks showing exactly what happens to LCP at different optimization levels, and provides a complete workflow from resize to lazy load."
        date="2026-04-05"
        dateFormatted="April 5, 2026"
        tags={["Performance", "SEO"]}
        readingTime={14}
        headings={[
          { id: "images-and-lcp", title: "Images and LCP: why your hero image is probably your bottleneck" },
          { id: "images-and-cls", title: "Images and CLS: preventing layout shifts" },
          { id: "images-and-inp", title: "Images and INP: decode time and main thread blocking" },
          { id: "format-comparison-cwv", title: "Format comparison for Core Web Vitals: JPEG vs WebP vs AVIF" },
          { id: "compression-benchmarks", title: "Compression benchmarks: what happens to LCP at different levels" },
          { id: "optimization-workflow", title: "The complete image optimization workflow for CWV" },
          { id: "html-implementation", title: "HTML implementation: srcset, sizes, and the picture element" },
          { id: "pagespeed-scoring", title: "How image optimization affects PageSpeed scores" },
          { id: "pagespeed-audits", title: "Fixing common PageSpeed image audits" },
          { id: "abandonment-stats", title: "The business impact: fewer abandonments, higher rankings" },
          { id: "monitoring", title: "Monitoring image performance over time" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Images are the LCP element on 72% of mobile pages (HTTP Archive), making them the single most important target for performance optimization.",
          "Sites passing all Core Web Vitals thresholds see 24% fewer page abandonments (Google). Vodafone reported a 31% LCP improvement led to 8% more sales.",
          "The optimization workflow is: resize to display dimensions, convert to WebP, compress to quality 80, add width/height attributes, lazy load below-fold images.",
          "WebP is the recommended default format for 2026: 25-34% smaller than JPEG with fast decode and 97%+ browser support. AVIF is smaller but decodes 2.5x slower.",
          "Image optimization alone typically improves PageSpeed mobile score by 15-30 points. For image-heavy sites, 40+ points.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
              alt="Dashboard showing website performance metrics and Core Web Vitals scores"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Core Web Vitals scores are heavily influenced by image optimization- the single highest-leverage performance improvement
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Optimize your images for Core Web Vitals- free
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Compress, convert to WebP, and resize your images in one workflow.
              Everything runs in your browser- no upload, no signup. Supports
              JPEG, PNG, WebP, GIF, AVIF, and HEIC.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/compress"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Compress <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/webp"
                className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-[#444] text-gray-700 dark:text-[#D4D4D4] text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
              >
                Convert to WebP <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >
        {/* ── Section 1: LCP ───────────────────────────────── */}

        <h2 id="images-and-lcp" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Images and LCP: why your hero image is probably your bottleneck
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Largest Contentful Paint (LCP) measures how long it takes for the largest visible element in the viewport to finish rendering. According to{" "}
          <a href="https://httparchive.org/reports/loading-speed" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">HTTP Archive data from 2025</a>, images are the LCP element on approximately <strong className="text-gray-800 dark:text-[#E5E5E5]">72% of mobile pages</strong> and 68% of desktop pages. In most cases, the LCP element is the hero image, a product photo, or the main content image.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Google considers LCP &quot;good&quot; when it occurs within <strong className="text-gray-800 dark:text-[#E5E5E5]">2.5 seconds</strong>. An LCP between 2.5 and 4 seconds &quot;needs improvement,&quot; and above 4 seconds is &quot;poor.&quot; Since LCP is a direct{" "}
          <a href="https://developers.google.com/search/docs/appearance/page-experience" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">ranking signal in Google Search</a>, a slow LCP can measurably reduce your organic traffic.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The four sub-phases of LCP
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The LCP timing depends on four sub-phases, as{" "}
          <a href="https://web.dev/articles/optimize-lcp" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">documented by web.dev</a>:
        </p>

        <ol className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Time to First Byte (TTFB)</strong> - how long until the server responds
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Resource load delay</strong> - time between TTFB and when the browser starts downloading the image
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Resource load duration</strong> - how long the image takes to download (this is where image optimization matters most)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Element render delay</strong> - time between download complete and paint on screen
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For images, the resource load duration is usually the dominant factor. A 500KB hero image on a 4G connection (12 Mbps) takes approximately 333ms to download. A 100KB optimized version takes about 67ms. That 266ms saving, compounded with server response time and render delay, can be the difference between passing and failing the 2.5-second LCP threshold.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Critical: do not lazy load your LCP image
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          One of the most common mistakes is adding <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">loading=&quot;lazy&quot;</code> to all images, including the hero image. Lazy loading delays the start of the image download until it enters the viewport, which is exactly the opposite of what you want for LCP. For the LCP image, use <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">loading=&quot;eager&quot;</code> (the default) and add <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">fetchpriority=&quot;high&quot;</code> to tell the browser to prioritize this image above other resources.
        </p>

        {/* ── Section 2: CLS ───────────────────────────────── */}

        <h2 id="images-and-cls" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Images and CLS: preventing layout shifts
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Cumulative Layout Shift (CLS) measures visual stability: how much the visible content shifts around during page load. A good CLS score is below <strong className="text-gray-800 dark:text-[#E5E5E5]">0.1</strong>. Images are one of the most common causes of layout shifts because when an image loads without reserved space, it pushes all content below it downward.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The fix: always set width and height
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Always include <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">width</code> and <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">height</code> attributes on every <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">img</code> element. This allows the browser to calculate the aspect ratio and reserve the correct space before the image downloads. Modern browsers use these attributes to compute an{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">intrinsic aspect ratio</a>, preventing layout shifts even before the image loads.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For responsive images, set the intrinsic width and height attributes to the image&apos;s actual pixel dimensions, then apply CSS: <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">max-width: 100%; height: auto;</code>. The browser uses the width/height ratio to reserve space while the image scales responsively. This approach works in all modern browsers and eliminates image-caused CLS entirely.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Common CLS trap: client-side image loading
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you load images dynamically via JavaScript (for example, in a React app that renders images after hydration), the space is not reserved in the initial HTML. This causes a layout shift when the component renders. The fix is to either server-render the image markup or use a placeholder skeleton with the exact same dimensions as the final image.
        </p>

        {/* ── Section 3: INP ───────────────────────────────── */}

        <h2 id="images-and-inp" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Images and INP: decode time and main thread blocking
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Interaction to Next Paint (INP) measures responsiveness: how quickly the page responds to user interactions like clicks, taps, and keyboard input. A good INP is below <strong className="text-gray-800 dark:text-[#E5E5E5]">200ms</strong>. While images are not the primary cause of poor INP (JavaScript is), large images can contribute through main thread blocking during decode.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When the browser decodes a large image (converting compressed bytes back into pixel data), this work happens on the main thread and can block user interactions. A 4000x3000 JPEG takes significantly longer to decode than a 1200x900 version because the decoded bitmap is proportional to pixel count, not file size.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          AVIF decode time warning
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          AVIF images, while smaller on disk, have <strong className="text-gray-800 dark:text-[#E5E5E5]">2.5x slower decode times</strong> than JPEG or WebP on average. On low-end mobile devices, a complex AVIF image can take 50-80ms to decode versus 15-20ms for the equivalent WebP. If your site has many images loading simultaneously (e-commerce grids, image galleries), this decode overhead can push INP above the 200ms threshold. Prefer WebP when INP is a concern.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Additional mitigations: serve images at display dimensions (not larger), use <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">content-visibility: auto</code> for off-screen images, and use <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">decoding=&quot;async&quot;</code> to move decode work off the main thread where supported.
        </p>

        {/* ── Section 4: Format comparison ─────────────────── */}

        <h2 id="format-comparison-cwv" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Format comparison for Core Web Vitals: JPEG vs WebP vs AVIF
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Choosing the right image format has a direct impact on all three Core Web Vitals metrics. Here is how the major formats compare for a typical 1200x800 photographic image. For a deeper format comparison, see our{" "}
          <Link href="/blog/webp-vs-avif-vs-jpeg-comparison" className="text-[#6366F1] hover:underline">WebP vs AVIF vs JPEG comparison</Link>.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Metric</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">JPEG (q80)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">WebP (q80)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">AVIF (q80)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Typical file size</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">180 KB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">125 KB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">90 KB</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Size vs JPEG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Baseline</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">-30%</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">-50%</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Decode time (avg)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">12 ms</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">14 ms</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">35 ms</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Browser support</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">100%</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">97%+</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">93%+</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">LCP impact</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Baseline</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Faster (smaller download)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Fastest download, slower render</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">INP risk</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Low</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Low</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Medium (slow decode on mobile)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Transparency</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For most websites in 2026, <strong className="text-gray-800 dark:text-[#E5E5E5]">WebP is the recommended default format</strong>. It offers the best balance of file size reduction, decode performance, and browser compatibility. AVIF is best reserved for hero images on high-traffic pages where every kilobyte matters and you can accept slower decode times, or for sites already using the <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">&lt;picture&gt;</code> element with JPEG fallback.
        </p>

        {/* ── Tool CTA #1 ──────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Convert your images to WebP for better CWV scores</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Drop your JPEG or PNG files into SammaPix WebP Converter. 25-34% smaller files with no visible quality loss. Runs in your browser.
          </p>
          <Link href="/tools/webp" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Open WebP Converter <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: Benchmarks ────────────────────────── */}

        <h2 id="compression-benchmarks" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Compression benchmarks: what happens to LCP at different levels
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          To illustrate the real-world impact of compression on LCP, here are benchmarks based on a typical hero image (1200x800 JPEG) tested on a simulated 4G connection (12 Mbps down, 50ms latency). The estimated LCP includes TTFB (assumed 600ms for a typical server), resource load delay, and render time.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Optimization</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">File size</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Download (4G)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Est. LCP</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">CWV rating</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Original (no optimization)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">850 KB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">~567 ms</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">~3.2s</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400 font-medium">Needs improvement</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">JPEG q80 (50% reduction)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">425 KB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">~283 ms</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">~2.5s</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-yellow-600 dark:text-yellow-400 font-medium">Borderline</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">JPEG q80 + resize (70%)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">255 KB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">~170 ms</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">~2.0s</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Good</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">WebP q80 + resize (90%)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">85 KB</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">~57 ms</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">~1.4s</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Good</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The takeaway: resize + format conversion + compression together bring LCP from &quot;needs improvement&quot; to solidly &quot;good.&quot; Compression alone (50% reduction) barely passes. You need all three steps. For detailed benchmarks with more formats, see our{" "}
          <Link href="/blog/image-compression-benchmark-2026" className="text-[#6366F1] hover:underline">image compression benchmark</Link>.
        </p>

        {/* ── Section 6: Workflow ──────────────────────────── */}

        <h2 id="optimization-workflow" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The complete image optimization workflow for CWV
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Follow this workflow for every image on your site to maximize Core Web Vitals scores:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Resize to display dimensions.</strong> If an image displays at 600px wide, do not serve a 2400px version. This alone saves 75% of bytes. Use{" "}
            <Link href="/tools/resizepack" className="text-[#6366F1] hover:underline">SammaPix Resize Pack</Link>{" "}
            to batch resize to exact dimensions or social media presets.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Convert to WebP.</strong> Use{" "}
            <Link href="/tools/webp" className="text-[#6366F1] hover:underline">SammaPix WebP Converter</Link>{" "}
            for 25-34% additional savings over JPEG. Use the <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">&lt;picture&gt;</code> element with JPEG fallback for the 3% of browsers without WebP support.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Compress at quality 75-85.</strong>{" "}
            <Link href="/tools/compress" className="text-[#6366F1] hover:underline">SammaPix Compress</Link>{" "}
            with quality 80 delivers 50-80% file size reduction with imperceptible quality loss.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set width and height on every img.</strong> This prevents CLS. Use the image&apos;s actual pixel dimensions as the attribute values.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Lazy load below-fold images.</strong> Add <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">loading=&quot;lazy&quot;</code> to all images below the fold. Keep <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">fetchpriority=&quot;high&quot;</code> on the LCP image.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Strip EXIF metadata.</strong> EXIF data adds 10-100KB per image and serves no purpose on the web. Use{" "}
            <Link href="/tools/exif" className="text-[#6366F1] hover:underline">SammaPix EXIF Remover</Link>.
          </li>
        </ol>

        {/* ── Tool CTA #2 ──────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Complete CWV image optimization workflow</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Resize, convert to WebP, compress, and strip EXIF- all in your browser, all free. No signup needed.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/resizepack" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Resize <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/webp" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              WebP Convert <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/compress" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Compress <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/exif" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              EXIF Remover <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 7: HTML implementation ────────────────── */}

        <h2 id="html-implementation" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          HTML implementation: srcset, sizes, and the picture element
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Optimizing the image file itself is only half the work. The HTML markup determines which image the browser actually downloads for each device.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The srcset attribute
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">srcset</code> attribute lets you provide multiple image files at different sizes. The browser picks the best one based on viewport width and device pixel ratio. This prevents mobile devices from downloading desktop-sized images:
        </p>

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-6 overflow-x-auto">
          <code className="text-xs text-gray-700 dark:text-[#D4D4D4] block whitespace-pre">{`<img
  src="hero-800.webp"
  srcset="hero-400.webp 400w,
          hero-800.webp 800w,
          hero-1200.webp 1200w"
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 80vw,
         800px"
  width="1200" height="800"
  alt="Descriptive alt text"
  loading="eager"
  fetchpriority="high"
/>`}</code>
        </div>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The picture element for format switching
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Use the <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">&lt;picture&gt;</code> element to serve AVIF or WebP with automatic JPEG fallback. The browser uses the first <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">&lt;source&gt;</code> it supports:
        </p>

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-4 mb-6 overflow-x-auto">
          <code className="text-xs text-gray-700 dark:text-[#D4D4D4] block whitespace-pre">{`<picture>
  <source srcset="hero.avif" type="image/avif" />
  <source srcset="hero.webp" type="image/webp" />
  <img src="hero.jpg" width="1200" height="800"
       alt="Descriptive alt text" loading="eager" />
</picture>`}</code>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This pattern serves AVIF to browsers that support it (93%), WebP to those that support WebP but not AVIF (4%), and JPEG as the universal fallback (3%). For more on generating optimized alt text for all these images, see our{" "}
          <Link href="/blog/ai-image-renaming-seo-guide" className="text-[#6366F1] hover:underline">AI image renaming and SEO guide</Link>.
        </p>

        {/* ── Section 8: PageSpeed ─────────────────────────── */}

        <h2 id="pagespeed-scoring" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How image optimization affects PageSpeed scores
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Google{" "}
          <a href="https://web.dev/articles/performance-scoring" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">PageSpeed Insights</a>{" "}
          scores are a weighted combination of performance metrics. As of the 2024 scoring update: LCP accounts for 25% of the total score, CLS for 25%, and INP for 30%. Since images directly affect all three metrics, image optimization has an outsized impact on the final score.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In practice, implementing the full optimization workflow typically improves a PageSpeed mobile score by <strong className="text-gray-800 dark:text-[#E5E5E5]">15-30 points</strong>. For sites with many large, unoptimized images, the improvement can exceed 40 points. This makes image optimization the single highest-leverage technical SEO task available.
        </p>

        {/* ── Section 9: Audits ─────────────────────────────── */}

        <h2 id="pagespeed-audits" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Fixing common PageSpeed image audits
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          PageSpeed flags specific image-related opportunities. Here is how to fix each one:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          &quot;Serve images in next-gen formats&quot;
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Convert JPEG and PNG images to WebP or AVIF. Use the <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">&lt;picture&gt;</code> element with fallbacks. The{" "}
          <Link href="/tools/webp" className="text-[#6366F1] hover:underline">SammaPix WebP Converter</Link>{" "}
          handles batch conversion in your browser.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          &quot;Properly size images&quot;
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Resize images to their actual display dimensions. If an image renders at 600x400, do not serve a 2400x1600 original. Use <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">srcset</code> with multiple sizes. The{" "}
          <Link href="/tools/resizepack" className="text-[#6366F1] hover:underline">SammaPix Resize Pack</Link>{" "}
          generates multiple sizes in one batch.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          &quot;Efficiently encode images&quot;
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Apply compression at quality 75-85. This audit fires when images could be smaller without visible quality loss.{" "}
          <Link href="/tools/compress" className="text-[#6366F1] hover:underline">SammaPix Compress</Link>{" "}
          at quality 80 typically satisfies this audit. For more on finding the right quality setting, see our{" "}
          <Link href="/blog/compress-images-without-losing-quality" className="text-[#6366F1] hover:underline">compression quality guide</Link>.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          &quot;Defer offscreen images&quot;
        </h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Add <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">loading=&quot;lazy&quot;</code> to all images that are not visible in the initial viewport. This delays their download until the user scrolls near them, freeing bandwidth for above-fold content. Remember: never lazy load the LCP image.
        </p>

        {/* ── Section 10: Business impact ──────────────────── */}

        <h2 id="abandonment-stats" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The business impact: fewer abandonments, higher rankings
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          According to{" "}
          <a href="https://web.dev/articles/vitals-business-impact" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">Google&apos;s research published on web.dev</a>, sites that pass all three Core Web Vitals thresholds experience <strong className="text-gray-800 dark:text-[#E5E5E5]">24% fewer page abandonments</strong> compared to sites that fail. This translates directly to more pageviews, longer sessions, and higher conversion rates.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Case studies published by the Chrome team demonstrate consistent business results from CWV optimization:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Vodafone:</strong> 31% improvement in LCP led to an 8% increase in sales
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Yahoo Japan:</strong> 15% increase in pageviews after reducing CLS by 0.2
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Netzwelt:</strong> 2x increase in ad revenue after improving CWV scores
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Tokopedia:</strong> 35% increase in click-through rates with 55% better LCP
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          These results are consistent across industries: performance improvements driven by image optimization deliver measurable business outcomes. The ROI of spending a few hours optimizing images is almost always positive, especially for e-commerce and content sites where images dominate the page weight.
        </p>

        {/* ── Section 11: Monitoring ───────────────────────── */}

        <h2 id="monitoring" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Monitoring image performance over time
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Image optimization is not a one-time task. New content gets added, designs change, and new images can undo previous gains. Set up ongoing monitoring:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Google Search Console:</strong> The{" "}
            <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">Core Web Vitals report</a>{" "}
            shows CWV pass rates across your entire site based on real user data (CrUX)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">PageSpeed Insights:</strong> Run spot checks on key pages after adding new images or making design changes
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Lighthouse CI:</strong> Automate PageSpeed checks in your CI/CD pipeline to catch regressions before they reach production
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Image audit tools:</strong> Periodically audit your site for oversized, uncompressed, or improperly formatted images using Lighthouse or browser DevTools
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a complete checklist covering all aspects of image optimization (not just CWV), read our{" "}
          <Link href="/blog/image-optimization-checklist-2026" className="text-[#6366F1] hover:underline">Image Optimization Checklist for 2026</Link>.
        </p>

        {/* ── Tool CTA #3 ──────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Need AI-generated alt text for accessibility and SEO?</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Alt text helps search engines understand your images and improves accessibility. SammaPix AI generates descriptive, SEO-friendly alt text automatically.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/alt-text" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              AI Alt Text <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/ai-rename" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              AI Rename <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────── */}

        <section id="faq">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
            FAQ
          </h2>
          {faqSchema.mainEntity.map((item, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-base font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>
      </BlogArticleLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
