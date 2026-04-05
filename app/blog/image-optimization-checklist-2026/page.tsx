import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "The Complete Image Optimization Checklist for 2026 (22 Steps)",
  description:
    "A definitive 22-step image optimization checklist covering format selection, compression, EXIF removal, alt text, HTML implementation, CSS layout, CDN delivery, and monitoring.",
  alternates: {
    canonical: `${APP_URL}/blog/image-optimization-checklist-2026`,
  },
  keywords: [
    "image optimization checklist",
    "image optimization checklist 2026",
    "website image checklist",
    "image seo checklist",
    "image performance checklist",
    "web image best practices",
    "core web vitals images",
    "image optimization steps",
  ],
  openGraph: {
    title: "The Complete Image Optimization Checklist for 2026 (22 Steps)",
    description:
      "The definitive image optimization checklist for web developers and content creators. 22 steps from format selection to CDN monitoring, with tools and benchmarks.",
    url: `${APP_URL}/blog/image-optimization-checklist-2026`,
    type: "article",
    publishedTime: "2026-04-05",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Complete Image Optimization Checklist for 2026 (22 Steps)",
    description:
      "The definitive 22-step image optimization checklist: format selection, compression, EXIF, alt text, HTML, CSS, CDN, and monitoring.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Complete Image Optimization Checklist for 2026 (22 Steps)",
  description:
    "A comprehensive, 22-step image optimization checklist for web developers and content creators. Covers every stage from pre-upload preparation to production monitoring.",
  url: `${APP_URL}/blog/image-optimization-checklist-2026`,
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
  mainEntityOfPage: { "@type": "WebPage", "@id": `${APP_URL}/blog/image-optimization-checklist-2026` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    { "@type": "ListItem", position: 3, name: "The Complete Image Optimization Checklist for 2026", item: `${APP_URL}/blog/image-optimization-checklist-2026` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What percentage of page weight comes from images?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "According to HTTP Archive data from 2025, images account for approximately 42% of total page weight on the median web page. On image-heavy sites like e-commerce or photography portfolios, this percentage can be 60-70%. This makes images the single largest contributor to page size and the highest-leverage optimization target.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best image format for the web in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WebP is the best default format for web images in 2026. It offers 25-34% smaller file sizes than JPEG at equivalent quality, supports both lossy and lossless compression, handles transparency, and has 97%+ browser support. AVIF offers even smaller files (up to 50% smaller than JPEG) but has slower decode times and 93% browser support. Use WebP as your default and consider AVIF for bandwidth-critical applications.",
      },
    },
    {
      "@type": "Question",
      name: "Should I strip EXIF data from images before uploading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for two reasons. First, EXIF data can contain sensitive information including GPS coordinates, device serial numbers, and timestamps that reveal when and where photos were taken. Second, EXIF data adds unnecessary bytes to the file. A typical smartphone photo carries 10-50KB of EXIF metadata. Stripping it reduces file size and protects user privacy.",
      },
    },
    {
      "@type": "Question",
      name: "What quality level should I use when compressing images for the web?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For lossy formats like JPEG and WebP, quality 78-82 is the sweet spot for web use. Below 75, compression artifacts become noticeable on most images. Above 85, file size increases significantly with minimal visible improvement. Quality 80 is the best general-purpose setting, delivering 50-70% file size reduction with imperceptible quality loss on screen-sized displays.",
      },
    },
    {
      "@type": "Question",
      name: "How do I write good alt text for images?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Good alt text describes the content and function of the image concisely. Keep it under 125 characters. Describe what the image shows, not what it is (say 'Golden retriever catching a frisbee in a park' not 'dog photo'). Include relevant keywords naturally but avoid keyword stuffing. For decorative images that add no informational content, use an empty alt attribute (alt='').",
      },
    },
    {
      "@type": "Question",
      name: "How often should I audit my website's images?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Run a full image audit quarterly using Google PageSpeed Insights and Lighthouse. After any major content update or redesign, run an immediate audit. Monitor Core Web Vitals in Google Search Console continuously, paying attention to LCP trends. Set up alerts if LCP exceeds 2.5 seconds. For large sites with frequent content updates, consider automated image optimization in your CI/CD pipeline.",
      },
    },
  ],
};

export default function ImageOptimizationChecklist2026Page() {
  return (
    <>
      <BlogArticleLayout
        title="The Complete Image Optimization Checklist for 2026"
        slug="image-optimization-checklist-2026"
        description="Images account for 42% of total page weight on the average website (HTTP Archive 2025), and 72% of mobile pages have an image as the Largest Contentful Paint element. This is the definitive, 22-step image optimization checklist covering everything from format selection and compression to HTML implementation, CSS layout, CDN delivery, and ongoing monitoring. Bookmark this page and use it every time you add images to a website."
        date="2026-04-05"
        dateFormatted="April 5, 2026"
        tags={["SEO", "Performance"]}
        readingTime={16}
        headings={[
          { id: "before-upload", title: "Section 1: Before upload (8 steps)" },
          { id: "html-implementation", title: "Section 2: HTML implementation (5 steps)" },
          { id: "css-layout", title: "Section 3: CSS and layout (3 steps)" },
          { id: "server-cdn-delivery", title: "Section 4: Server and CDN (3 steps)" },
          { id: "monitoring-maintenance", title: "Section 5: Monitoring and maintenance (3 steps)" },
          { id: "complete-checklist", title: "The complete checklist (quick reference)" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Images account for 42% of total page weight on the median website (HTTP Archive 2025), making image optimization the highest-leverage performance task.",
          "72% of mobile pages have an image as the LCP element. Sites passing Core Web Vitals see 24% fewer user abandonments.",
          "The pre-upload workflow (8 steps): resize to display dimensions, choose format, compress at quality 78-82, convert to WebP/AVIF, strip EXIF, rename files, write alt text, generate srcset sizes.",
          "HTML, CSS, server, and monitoring add 14 more steps covering srcset, lazy loading, fetchpriority, aspect-ratio, CDN caching, and quarterly audits.",
          "28% of image bytes are wasted by serving oversized dimensions. WebP is 25-34% smaller than JPEG. AVIF is up to 50% smaller.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"
              alt="Checklist on a desk next to a laptop showing website performance metrics"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A complete image optimization checklist is the single highest-leverage performance tool for any website
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Start optimizing your images now- free, no upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Compress reduces file sizes by 50-80% with no visible quality loss.
              Everything runs in your browser- your files never leave your device.
              No signup required.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/compress"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Try SammaPix Compress, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/webp"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#252525] text-gray-900 dark:text-[#E5E5E5] text-sm font-medium rounded-md border border-gray-200 dark:border-[#2A2A2A] hover:bg-gray-50 dark:hover:bg-[#2A2A2A] transition-colors"
              >
                Convert to WebP
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >
        {/* ── Why this checklist exists ────────────────────── */}

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          According to the{" "}
          <a href="https://httparchive.org/reports/page-weight" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">HTTP Archive&apos;s 2025 Web Almanac</a>, images account for <strong className="text-gray-800 dark:text-[#E5E5E5]">42% of total page weight</strong> on the median web page. On image-heavy sites like e-commerce or photography portfolios, that number can reach 60-70%. Images are the single largest contributor to page size and the single highest-leverage optimization target.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The impact goes beyond page speed.{" "}
          <a href="https://web.dev/articles/vitals" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">Google&apos;s Core Web Vitals data</a>{" "}
          shows that <strong className="text-gray-800 dark:text-[#E5E5E5]">72% of mobile pages have an image as the Largest Contentful Paint (LCP) element</strong>. Sites that pass CWV thresholds see <strong className="text-gray-800 dark:text-[#E5E5E5]">24% fewer user abandonments</strong>. And <strong className="text-gray-800 dark:text-[#E5E5E5]">28% of image bytes on the web are wasted</strong> simply by serving images at dimensions larger than their display size.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This checklist covers every step of the image optimization process, from the moment you create an image to the moment a browser renders it on screen. It is organized into five sections with 22 actionable steps. Use it as a reference every time you add images to a website. For a deep dive into any individual topic, follow the linked guides throughout.
        </p>

        {/* ══════════════════════════════════════════════════ */}
        {/* ── SECTION 1: BEFORE UPLOAD ──────────────────── */}
        {/* ══════════════════════════════════════════════════ */}

        <section id="before-upload">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
            Section 1: Before upload- preparing your images (8 steps)
          </h2>

          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
            The most impactful optimizations happen before an image ever touches your server. Every image you add to a website should go through these eight steps. Skipping even one can undo the gains from the rest.
          </p>

          {/* Step 1 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">1</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Resize to display dimensions (not original resolution)</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                Never upload an image larger than its maximum display size. If an image displays at 800px wide on desktop, serving a 4000px original wastes bandwidth and processing time. <strong className="text-gray-800 dark:text-[#E5E5E5]">28% of image bytes on the web are wasted by oversized dimensions</strong> (HTTP Archive 2025). Account for 2x DPR for Retina displays: if the display size is 800px, serve a 1600px image. Going beyond 2x provides no visible benefit on any current display.
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
            For responsive layouts, generate multiple sizes. Common breakpoints are 400px, 800px, 1200px, and 1600px. This ensures every device downloads only the pixels it needs. Use{" "}
            <Link href="/tools/resizepack" className="text-[#6366F1] hover:underline">SammaPix Resize Pack</Link>{" "}
            to generate multiple sizes from a single source image.
          </p>

          {/* Step 2 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">2</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Choose the right format (WebP for photos, PNG for graphics, SVG for icons)</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                Format selection has a dramatic impact on file size. <strong className="text-gray-800 dark:text-[#E5E5E5]">WebP is 25-34% smaller than JPEG</strong> at equivalent quality with 97%+ browser support. <strong className="text-gray-800 dark:text-[#E5E5E5]">AVIF is up to 50% smaller than JPEG</strong> but has slower decode times and 93% browser support. For a detailed comparison, read{" "}
                <Link href="/blog/webp-vs-avif-vs-jpeg-comparison" className="text-[#6366F1] hover:underline">WebP vs AVIF vs JPEG: which format to use</Link>.
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
            Use this decision tree:
          </p>

          <ul className="mb-4">
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              <strong className="text-gray-800 dark:text-[#E5E5E5]">Photographs and complex images:</strong> WebP (lossy) as default. AVIF if you need maximum compression and your audience uses modern browsers.
            </li>
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              <strong className="text-gray-800 dark:text-[#E5E5E5]">Screenshots, text, UI elements:</strong> PNG or WebP (lossless). These images have sharp edges that suffer under lossy compression.
            </li>
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              <strong className="text-gray-800 dark:text-[#E5E5E5]">Logos and icons:</strong> SVG whenever possible. SVG is resolution-independent and typically a few KB.
            </li>
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              <strong className="text-gray-800 dark:text-[#E5E5E5]">Animated content:</strong> WebP animated replaces GIF at 50-80% smaller file sizes.
            </li>
          </ul>

          {/* Step 3 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">3</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Compress at quality 78-82 for web</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                For lossy formats (JPEG, lossy WebP), quality 78-82 is the sweet spot. Below 75, compression artifacts become noticeable. Above 85, file size increases significantly with minimal visual improvement. Quality 80 is the best general-purpose setting, providing 50-70% file size reduction with imperceptible quality loss on screen-sized displays. For a complete guide, read{" "}
                <Link href="/blog/compress-images-without-losing-quality" className="text-[#6366F1] hover:underline">how to compress images without losing quality</Link>.
              </p>
            </div>
          </div>

          {/* Tool CTA #1 */}
          <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
            <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Compress images with precision</p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
              SammaPix Compress lets you set exact quality levels and see the file size reduction in real time. Browser-based, no upload, no signup.
            </p>
            <Link href="/tools/compress" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
              Open Compress tool <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          {/* Step 4 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">4</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Convert to WebP or AVIF for modern browsers</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                If your images are still in JPEG or PNG, converting to WebP is the single easiest win. WebP delivers <strong className="text-gray-800 dark:text-[#E5E5E5]">25-34% smaller files</strong> with no visible quality loss and supports transparency. AVIF pushes savings even further at <strong className="text-gray-800 dark:text-[#E5E5E5]">up to 50% smaller than JPEG</strong>, but encode/decode is slower and browser support is at 93%. Use the{" "}
                <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">picture element</a>{" "}
                to serve AVIF with WebP and JPEG fallbacks. For details, read{" "}
                <Link href="/blog/best-image-format-for-web-2026" className="text-[#6366F1] hover:underline">the best image format for web in 2026</Link>.
              </p>
            </div>
          </div>

          <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
            <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Convert images to WebP</p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
              Batch convert JPG, PNG, and other formats to WebP with SammaPix. Reduce file sizes by 25-34% with no visible quality loss.
            </p>
            <Link href="/tools/webp" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Open WebP Converter <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          {/* Step 5 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">5</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Strip EXIF metadata for privacy and file size</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                Every photo from a smartphone or camera contains EXIF metadata: GPS coordinates, device model, camera settings, timestamps, and sometimes even the owner&apos;s name. This data typically adds 10-50KB per image and creates serious privacy risks. A photo posted online with GPS data reveals the exact location where it was taken. Strip all EXIF data before uploading images to any public-facing website. For a complete guide, read{" "}
                <Link href="/blog/remove-exif-protect-privacy" className="text-[#6366F1] hover:underline">how to remove EXIF data to protect privacy</Link>.
              </p>
            </div>
          </div>

          <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
            <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Remove EXIF data from photos</p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
              SammaPix EXIF Remover strips all metadata including GPS coordinates. Runs entirely in your browser for maximum privacy.
            </p>
            <Link href="/tools/exif" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Open EXIF Remover <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          {/* Step 6 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">6</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Generate descriptive filenames (not IMG_4521.jpg)</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                Search engines use filenames as a signal for image content. A file named <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">golden-retriever-playing-fetch.webp</code> tells Google far more than <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">IMG_4521.jpg</code>. Use descriptive, lowercase, hyphen-separated filenames that include relevant keywords naturally. For large batches, AI-powered renaming tools can analyze image content and generate SEO-friendly names automatically. Read{" "}
                <Link href="/blog/ai-image-renaming-seo-guide" className="text-[#6366F1] hover:underline">the AI image renaming guide for SEO</Link>{" "}
                for the full workflow.
              </p>
            </div>
          </div>

          <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
            <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Rename images with AI</p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
              SammaPix AI Rename analyzes your images and generates descriptive, SEO-friendly filenames automatically.
            </p>
            <Link href="/tools/ai-rename" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Open AI Rename <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          {/* Step 7 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">7</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Write meaningful alt text for every image</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                Alt text serves three purposes: accessibility (screen readers), SEO (search engines use it to understand image content), and fallback display when images fail to load. Every informational image should have descriptive alt text under 125 characters. Decorative images should have an empty alt attribute (<code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">alt=&quot;&quot;</code>). Good alt text describes the content, not the image itself. &quot;Golden retriever catching a frisbee in a park&quot; is better than &quot;dog photo.&quot;
              </p>
            </div>
          </div>

          <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
            <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Generate alt text with AI</p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
              SammaPix AI Alt Text analyzes your images and generates descriptive, SEO-friendly alt text automatically.
            </p>
            <Link href="/tools/alt-text" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Open AI Alt Text <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          {/* Step 8 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">8</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Create multiple sizes for responsive srcset</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                A single image size cannot serve every device optimally. A 1600px hero image is overkill for a 375px mobile screen. Generate multiple sizes- typically 400w, 800w, 1200w, and 1600w- so the browser can select the best match via <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">srcset</code>. This can reduce image downloads by 40-60% on mobile devices compared to serving a single large image.
              </p>
            </div>
          </div>

          <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
            <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Generate responsive image sizes</p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
              SammaPix Resize Pack generates multiple sizes from a single image for srcset. All processing runs in your browser.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tools/resizepack" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
                Open Resize Pack <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link href="/tools/heic" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
                HEIC Converter <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════ */}
        {/* ── SECTION 2: HTML IMPLEMENTATION ─────────────── */}
        {/* ══════════════════════════════════════════════════ */}

        <section id="html-implementation">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
            Section 2: HTML implementation- the code that serves your images (5 steps)
          </h2>

          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
            Optimized source files are only half the story. The HTML that delivers those images to the browser determines whether the user gets the right size, at the right time, in the right format. These five steps ensure your code matches your files.
          </p>

          {/* Step 9 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">9</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Add width and height attributes on every img element</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                Always include <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">width</code> and <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">height</code> attributes on <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">img</code> elements. This prevents Cumulative Layout Shift (CLS) by allowing the browser to reserve the correct space before the image loads. Without these attributes, the page layout jumps when each image finishes loading, creating a jarring experience. Combine with CSS <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">max-width: 100%; height: auto;</code> for responsive behavior while maintaining the aspect ratio reservation. See{" "}
                <a href="https://web.dev/articles/optimize-cls" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">web.dev&apos;s CLS optimization guide</a>{" "}
                for details.
              </p>
            </div>
          </div>

          {/* Step 10 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">10</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Use srcset and sizes for responsive images</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                The{" "}
                <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#srcset" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">srcset attribute</a>{" "}
                tells the browser which image sizes are available, and the <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">sizes</code> attribute tells it how large the image will display at each viewport width. Together, they allow the browser to select the optimal image for the user&apos;s device, downloading only the pixels needed. A common pattern: generate images at 400w, 800w, 1200w, and 1600w. The browser selects the best match based on viewport width and device pixel ratio.
              </p>
            </div>
          </div>

          {/* Step 11 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">11</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Use the picture element for format switching</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                The{" "}
                <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">HTML picture element</a>{" "}
                allows you to serve modern formats (AVIF, WebP) with automatic fallback to JPEG for older browsers. The browser evaluates <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">source</code> elements in order and uses the first format it supports. List AVIF first (smallest), then WebP, then JPEG as the final fallback. This ensures every user gets the best format their browser can handle without any JavaScript.
              </p>
            </div>
          </div>

          {/* Step 12 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">12</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Add loading=&quot;lazy&quot; to below-fold images</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                Native{" "}
                <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">lazy loading</a>{" "}
                defers loading until the image is near the viewport, saving bandwidth and improving initial load time. Add <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">loading=&quot;lazy&quot;</code> to all images below the fold. Critical rule: <strong className="text-gray-800 dark:text-[#E5E5E5]">never lazy load the LCP image</strong> (usually the hero image above the fold). Lazy loading the LCP image is one of the most common performance mistakes and directly harms your Core Web Vitals score.
              </p>
            </div>
          </div>

          {/* Step 13 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">13</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Add fetchpriority=&quot;high&quot; to the LCP image</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                The{" "}
                <a href="https://web.dev/articles/fetch-priority" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">fetchpriority attribute</a>{" "}
                tells the browser to prioritize downloading the LCP image over other resources. Since <strong className="text-gray-800 dark:text-[#E5E5E5]">72% of mobile pages have an image as their LCP element</strong>, adding <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">fetchpriority=&quot;high&quot;</code> to that image directly improves LCP time. Combine this with <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">loading=&quot;eager&quot;</code> (or simply omit the loading attribute, which defaults to eager). For a complete guide to optimizing LCP, read{" "}
                <Link href="/blog/optimize-images-core-web-vitals-2026" className="text-[#6366F1] hover:underline">how to optimize images for Core Web Vitals</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════ */}
        {/* ── SECTION 3: CSS AND LAYOUT ─────────────────── */}
        {/* ══════════════════════════════════════════════════ */}

        <section id="css-layout">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
            Section 3: CSS and layout (3 steps)
          </h2>

          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
            CSS controls how images are displayed and when the browser allocates resources for them. These three CSS techniques prevent layout shifts, improve perceived performance, and reduce rendering overhead.
          </p>

          {/* Step 14 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">14</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Set max-width: 100% and height: auto on all images</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                This is the foundation of responsive images in CSS. Without <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">max-width: 100%</code>, images overflow their containers on small screens. Without <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">height: auto</code>, the image distorts when the width is constrained. Together with the HTML <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">width</code> and <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">height</code> attributes from step 9, this preserves the aspect ratio while allowing the image to scale down responsively.
              </p>
            </div>
          </div>

          {/* Step 15 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">15</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Use aspect-ratio or padding-bottom hack for placeholders</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                While the image loads, the browser needs to reserve the correct amount of space. The modern approach is the CSS <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">aspect-ratio</code> property (e.g., <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">aspect-ratio: 16 / 9</code>), which is supported in all modern browsers. The legacy approach uses the padding-bottom percentage hack (e.g., <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">padding-bottom: 56.25%</code> for 16:9). Both approaches eliminate CLS by reserving the exact space before the image arrives. Combine with a low-contrast background color or a blurred placeholder for a polished loading experience.
              </p>
            </div>
          </div>

          {/* Step 16 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">16</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Use content-visibility: auto for off-screen images</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                The <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">content-visibility: auto</code> CSS property tells the browser to skip rendering elements that are far off-screen. When applied to image containers, the browser defers layout and paint work until the container is near the viewport. This reduces the initial rendering workload, especially on long pages with many images. Pair it with <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">contain-intrinsic-size</code> to provide a size estimate and prevent layout shifts when the element enters the viewport.
              </p>
            </div>
          </div>
        </section>

        {/* ── Tool CTA #2 ──────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Full image optimization workflow- all in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Resize, convert to WebP, compress, strip EXIF, rename for SEO, and generate alt text. All free, all private, no signup.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/compress" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Compress <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/webp" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              WebP Converter <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/resizepack" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Resize Pack <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/exif" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              EXIF Remover <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/ai-rename" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              AI Rename <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/alt-text" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              AI Alt Text <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════ */}
        {/* ── SECTION 4: SERVER AND CDN ─────────────────── */}
        {/* ══════════════════════════════════════════════════ */}

        <section id="server-cdn-delivery">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
            Section 4: Server and CDN delivery (3 steps)
          </h2>

          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
            Even perfectly optimized images need to be delivered efficiently. Server configuration and CDN setup determine how fast images reach the user and whether they get cached effectively for repeat visits.
          </p>

          {/* Step 17 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">17</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Set Cache-Control headers (max-age=31536000 for hashed filenames)</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                Images rarely change after upload. Set aggressive cache headers: <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">Cache-Control: public, max-age=31536000, immutable</code> for versioned image URLs (URLs that include a hash or version number). This tells browsers and CDN edge servers to cache the image for one year without revalidation, eliminating repeat downloads entirely. If your image URLs are not versioned, use shorter max-age values with ETag-based revalidation.
              </p>
            </div>
          </div>

          {/* Step 18 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">18</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Enable content negotiation (Accept header) for automatic format serving</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                Configure your server or CDN to serve different image formats based on the browser&apos;s Accept header. When a browser sends <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">Accept: image/avif</code>, serve AVIF. When it sends <code className="text-xs bg-gray-100 dark:bg-[#252525] px-1.5 py-0.5 rounded">Accept: image/webp</code>, serve WebP. Fall back to JPEG otherwise. Cloudflare, AWS CloudFront, and most modern CDNs support this natively through image transformation features. This approach serves optimal formats without requiring the picture element on every image.
              </p>
            </div>
          </div>

          {/* Step 19 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">19</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Use a CDN for global delivery</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                A Content Delivery Network serves images from edge servers geographically close to the user, dramatically reducing latency. For a user in Tokyo accessing a server in New York, a CDN can reduce image load time by 200-400ms. This directly improves LCP. Most CDNs also provide automatic image optimization (resize, format conversion, compression) at the edge. Cloudflare, Fastly, and AWS CloudFront all offer image transformation features that can handle format conversion and resizing automatically based on the request.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════ */}
        {/* ── SECTION 5: MONITORING AND MAINTENANCE ──────── */}
        {/* ══════════════════════════════════════════════════ */}

        <section id="monitoring-maintenance">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
            Section 5: Monitoring and maintenance (3 steps)
          </h2>

          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
            Image optimization is not a one-time task. New content is added, designs change, and standards evolve. These three steps keep your images optimized over time. Sites that pass{" "}
            <a href="https://web.dev/articles/vitals" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">Core Web Vitals</a>{" "}
            thresholds see <strong className="text-gray-800 dark:text-[#E5E5E5]">24% fewer user abandonments</strong> according to Google.
          </p>

          {/* Step 20 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">20</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Run PageSpeed Insights on key pages monthly</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">Google PageSpeed Insights</a>{" "}
                provides both lab data (Lighthouse) and field data (CrUX) for your pages. Check your key pages monthly at minimum. Pay attention to the image-specific opportunities: &quot;Serve images in next-gen formats,&quot; &quot;Properly size images,&quot; &quot;Efficiently encode images,&quot; and &quot;Defer offscreen images.&quot; Each of these directly corresponds to a step in this checklist.
              </p>
            </div>
          </div>

          {/* Step 21 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">21</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Check Core Web Vitals report in Search Console</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">Google Search Console</a>{" "}
                provides a Core Web Vitals report showing real-world performance data from Chrome users. Monitor the LCP trend over time. If LCP degrades after a content update, it is almost always because new images were added without optimization. Set up a process to review CWV data weekly and create alerts if LCP exceeds 2.5 seconds on any page group.
              </p>
            </div>
          </div>

          {/* Step 22 */}
          <div className="flex gap-3 mb-4">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-[#252525] flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-gray-500 dark:text-[#737373]">22</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-1">Audit new images before publishing (don&apos;t let your team upload unoptimized images)</p>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">
                For sites with content teams, unoptimized images uploaded by non-technical team members are the most common source of performance regression. Establish a pre-upload workflow: every image goes through resize, compress, format conversion, and alt text before it touches the CMS. For developer teams, integrate image optimization into your CI/CD pipeline using tools like sharp (Node.js), next/image (Next.js), or automated build-time optimization. For content teams without technical access, use browser-based tools like{" "}
                <Link href="/tools/compress" className="text-[#6366F1] hover:underline">SammaPix Compress</Link>{" "}
                to ensure every image is optimized before it reaches the CMS. Read{" "}
                <Link href="/blog/batch-compress-images-no-signup-free" className="text-[#6366F1] hover:underline">how to batch compress images with no signup</Link>{" "}
                for the full workflow.
              </p>
            </div>
          </div>
        </section>

        {/* ── Tool CTA #3 ──────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Optimize images before every publish</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Use SammaPix as your pre-upload workflow. Compress, convert, resize, strip metadata- all in your browser, all free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/compress" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Compress <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/webp" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              WebP Converter <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/resizepack" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Resize Pack <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════ */}
        {/* ── COMPLETE CHECKLIST (SUMMARY TABLE) ────────── */}
        {/* ══════════════════════════════════════════════════ */}

        <section id="complete-checklist">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
            The complete checklist (quick reference)
          </h2>

          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
            Here is every step in a single reference table. Bookmark this section for quick access during your image workflow.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">#</th>
                  <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Step</th>
                  <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Tool / Resource</th>
                </tr>
              </thead>
              <tbody>
                {/* Before Upload */}
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]" colSpan={3}>
                    <strong className="text-gray-800 dark:text-[#E5E5E5]">Before Upload</strong>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">1</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Resize to display dimensions (2x for Retina)</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><Link href="/tools/resizepack" className="text-[#6366F1] hover:underline">Resize Pack</Link></td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">2</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Choose the right format (WebP / PNG / SVG)</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><Link href="/blog/webp-vs-avif-vs-jpeg-comparison" className="text-[#6366F1] hover:underline">Format guide</Link></td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">3</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Compress at quality 78-82</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><Link href="/tools/compress" className="text-[#6366F1] hover:underline">Compress</Link></td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">4</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Convert to WebP or AVIF</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><Link href="/tools/webp" className="text-[#6366F1] hover:underline">WebP Converter</Link></td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">5</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Strip EXIF metadata</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><Link href="/tools/exif" className="text-[#6366F1] hover:underline">EXIF Remover</Link></td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">6</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Use descriptive filenames</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><Link href="/tools/ai-rename" className="text-[#6366F1] hover:underline">AI Rename</Link></td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">7</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Write meaningful alt text</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><Link href="/tools/alt-text" className="text-[#6366F1] hover:underline">AI Alt Text</Link></td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">8</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Generate multiple sizes for srcset</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><Link href="/tools/resizepack" className="text-[#6366F1] hover:underline">Resize Pack</Link></td>
                </tr>
                {/* HTML Implementation */}
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]" colSpan={3}>
                    <strong className="text-gray-800 dark:text-[#E5E5E5]">HTML Implementation</strong>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">9</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Add width and height on every img</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><a href="https://web.dev/articles/optimize-cls" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">web.dev CLS guide</a></td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">10</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Use srcset and sizes</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#srcset" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">MDN srcset</a></td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">11</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Use picture for format switching</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">MDN picture</a></td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">12</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Add loading=&quot;lazy&quot; to below-fold images</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">MDN loading</a></td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">13</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Add fetchpriority=&quot;high&quot; to LCP image</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><a href="https://web.dev/articles/fetch-priority" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">web.dev fetchpriority</a></td>
                </tr>
                {/* CSS and Layout */}
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]" colSpan={3}>
                    <strong className="text-gray-800 dark:text-[#E5E5E5]">CSS and Layout</strong>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">14</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Set max-width: 100% and height: auto</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">CSS baseline</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">15</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Use aspect-ratio for placeholders</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">CSS aspect-ratio</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">16</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Use content-visibility: auto for off-screen</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">CSS content-visibility</td>
                </tr>
                {/* Server and CDN */}
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]" colSpan={3}>
                    <strong className="text-gray-800 dark:text-[#E5E5E5]">Server and CDN</strong>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">17</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Set Cache-Control: max-age=31536000</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Server config</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">18</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Enable Accept-header content negotiation</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">CDN config</td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">19</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Use a CDN for global delivery</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Cloudflare / CloudFront / Fastly</td>
                </tr>
                {/* Monitoring */}
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]" colSpan={3}>
                    <strong className="text-gray-800 dark:text-[#E5E5E5]">Monitoring and Maintenance</strong>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">20</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Run PageSpeed Insights monthly</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">PageSpeed Insights</a></td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">21</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Check Core Web Vitals in Search Console</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">Search Console</a></td>
                </tr>
                <tr>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">22</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Audit new images before publishing</td>
                  <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><Link href="/tools/compress" className="text-[#6366F1] hover:underline">SammaPix</Link></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
            Key statistics to remember
          </h3>

          <ul className="mb-4">
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              <strong className="text-gray-800 dark:text-[#E5E5E5]">42%</strong> of total page weight comes from images (<a href="https://httparchive.org/reports/page-weight" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">HTTP Archive 2025</a>)
            </li>
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              <strong className="text-gray-800 dark:text-[#E5E5E5]">72%</strong> of mobile pages have an image as the LCP element
            </li>
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              Sites passing CWV see <strong className="text-gray-800 dark:text-[#E5E5E5]">24% fewer abandonments</strong>
            </li>
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              <strong className="text-gray-800 dark:text-[#E5E5E5]">28%</strong> of image bytes are wasted by oversized dimensions
            </li>
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              WebP is <strong className="text-gray-800 dark:text-[#E5E5E5]">25-34% smaller</strong> than JPEG at equivalent quality
            </li>
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              AVIF is <strong className="text-gray-800 dark:text-[#E5E5E5]">up to 50% smaller</strong> than JPEG
            </li>
          </ul>

          <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
            Related guides
          </h3>

          <ul className="mb-4">
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              <Link href="/blog/compress-images-without-losing-quality" className="text-[#6366F1] hover:underline">How to compress images without losing quality</Link>
            </li>
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              <Link href="/blog/webp-vs-avif-vs-jpeg-comparison" className="text-[#6366F1] hover:underline">WebP vs AVIF vs JPEG: the definitive comparison</Link>
            </li>
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              <Link href="/blog/optimize-images-core-web-vitals-2026" className="text-[#6366F1] hover:underline">How to optimize images for Core Web Vitals in 2026</Link>
            </li>
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              <Link href="/blog/remove-exif-protect-privacy" className="text-[#6366F1] hover:underline">Remove EXIF data to protect your privacy</Link>
            </li>
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              <Link href="/blog/ai-image-renaming-seo-guide" className="text-[#6366F1] hover:underline">AI image renaming for SEO: the complete guide</Link>
            </li>
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              <Link href="/blog/batch-compress-images-no-signup-free" className="text-[#6366F1] hover:underline">Batch compress images free- no signup, no upload</Link>
            </li>
            <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
              <Link href="/blog/best-image-format-for-web-2026" className="text-[#6366F1] hover:underline">The best image format for web in 2026</Link>
            </li>
          </ul>
        </section>

        {/* ══════════════════════════════════════════════════ */}
        {/* ── FAQ ──────────────────────────────────────────── */}
        {/* ══════════════════════════════════════════════════ */}

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
