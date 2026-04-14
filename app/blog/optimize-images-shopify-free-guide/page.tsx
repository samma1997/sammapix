import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

const SLUG = "optimize-images-shopify-free-guide";
const POST_TITLE = "Optimize Images for Shopify: Free Guide [2026]";
const POST_DESCRIPTION =
  "Learn how to optimize images for Shopify in 2026. Resize, compress, and convert to WebP for free — before uploading. Includes exact size specs and benchmarks.";
const POST_DATE = "2026-04-14";
const POST_DATE_FORMATTED = "April 14, 2026";
const POST_URL = `${APP_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: POST_TITLE,
  description: POST_DESCRIPTION,
  alternates: {
    canonical: POST_URL,
  },
  keywords: [
    "optimize images for shopify",
    "shopify image optimization",
    "shopify compress images",
    "image optimizer for shopify",
    "bulk resize images shopify",
    "shopify image optimizer free",
    "resize image for shopify slideshow",
    "shopify product image size",
  ],
  openGraph: {
    title: POST_TITLE,
    description: POST_DESCRIPTION,
    url: POST_URL,
    type: "article",
    publishedTime: POST_DATE,
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: POST_TITLE,
    description: POST_DESCRIPTION,
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description: POST_DESCRIPTION,
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
    logo: { "@type": "ImageObject", url: "https://sammapix.com/og-image.png" },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
  keywords: [
    "optimize images for shopify",
    "shopify image optimization",
    "shopify compress images",
    "image optimizer for shopify",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does Shopify automatically optimize images when I upload them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shopify generates multiple size variants from your uploaded image, but it does not significantly compress or convert your original file. If you upload a 4MB JPEG, Shopify stores a 4MB JPEG as the master file. Pre-compression before upload is the only way to reduce file sizes across all generated variants.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best image format for Shopify in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WebP is the best format for Shopify stores running Online Store 2.0 themes. WebP files are 25-35% smaller than JPEG at equivalent visual quality, and all major browsers support WebP. Shopify's CDN handles WebP delivery without additional configuration.",
      },
    },
    {
      "@type": "Question",
      name: "What dimensions should product images be for Shopify?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shopify recommends 2048 x 2048 pixels for product images. This square format renders consistently across all themes and provides enough resolution for Shopify's built-in zoom feature. Do not upload images smaller than 800 x 800 px if you want zoom to work.",
      },
    },
    {
      "@type": "Question",
      name: "How do I resize images for a Shopify slideshow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Shopify slideshow images should be 1920 x 1080 pixels (16:9 widescreen ratio). Use SammaPix ResizePack to resize to exactly 1920 x 1080. Keep file sizes under 300KB for above-the-fold banner images.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free Shopify image optimizer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix offers free browser-based tools for compressing, resizing, and converting images to WebP. Everything runs in your browser with no server uploads, no account required, and no monthly fee. It supports batch processing of up to 20 images at once.",
      },
    },
    {
      "@type": "Question",
      name: "How much can image optimization improve my Shopify store speed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Running product images through the resize-compress-WebP workflow reduces file sizes by 93-96%. A typical product page with 4-6 images goes from 12-18MB to under 1MB. On PageSpeed Insights, most unoptimized Shopify stores score 40-65 on mobile. After optimization, scores typically reach 75-90.",
      },
    },
  ],
};

export default function OptimizeImagesShopifyPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug={SLUG}
        description="Slow Shopify stores lose customers. A one-second delay in page load time can reduce conversions by up to 7%. For most merchants, oversized product images are the biggest culprit &mdash; and the easiest fix."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Performance"]}
        readingTime={11}
        headings={[
          { id: "why-image-optimization-matters", title: "Why image optimization matters for Shopify" },
          { id: "shopify-image-size-requirements", title: "Shopify image size requirements" },
          { id: "3-step-workflow", title: "The 3-step optimization workflow" },
          { id: "benchmark-data", title: "Real benchmark data: before and after" },
          { id: "shopify-specific-tips", title: "Shopify-specific tips most guides miss" },
          { id: "sammapix-vs-apps", title: "SammaPix vs. Shopify optimization apps" },
          { id: "check-speed", title: "How to check if your images are slowing you down" },
          { id: "checklist", title: "The Shopify image optimization checklist" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Uploading unoptimized images to Shopify means ALL generated size variants are bloated &mdash; Shopify does not compress your originals.",
          "The 3-step workflow: resize to correct dimensions, compress to 80% quality, convert to WebP. Takes under 2 minutes per batch.",
          "Real benchmark: product photos drop from 4.2MB to 180KB (96% savings). A product page goes from 12-18MB to under 1MB.",
          "Shopify optimization apps cost $4-40/month and compress AFTER upload. Pre-compression is free and reduces ALL generated variants.",
          "Square product images (2048x2048) perform best. Use descriptive filenames and alt text for Shopify SEO.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
              alt="E-commerce product photography setup representing Shopify image optimization"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Faster Shopify stores start with optimized images &mdash; before they reach your server - Photo by Roberto Cortese on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Optimize your Shopify images &mdash; free, before upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Resize, compress, and convert to WebP in your browser. No app install, no monthly fee, no server uploads. Batch up to 20 images at once.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/compress"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Compress Images
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/resizepack"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                Resize for Shopify
              </Link>
            </div>
          </div>
        }
      >
        {/* Section: Why it matters */}
        <h2 id="why-image-optimization-matters" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Why image optimization matters for Shopify stores
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Shopify is a well-built platform, but it cannot fix problems you create at the source. When you upload a 4MB product photo, Shopify stores that file and generates smaller versions from it. The problem: all those generated sizes are derived from your bloated original, and the server still holds the full file.
        </p>
        <ul className="space-y-3 mb-6 pl-4">
          {[
            ["Slower Time to First Contentful Paint (FCP)", "Google's Core Web Vitals measure this directly, and it affects your search ranking"],
            ["Higher bounce rates on mobile", "customers on 4G or slower connections abandon pages that take more than 3 seconds to load"],
            ["Wasted Shopify storage", "unoptimized images compound across hundreds of SKUs"],
          ].map(([label, detail]) => (
            <li key={label} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              <span><strong className="text-[#171717] dark:text-[#E5E5E5]">{label}</strong> &mdash; {detail}</span>
            </li>
          ))}
        </ul>

        {/* Section: Size requirements */}
        <h2 id="shopify-image-size-requirements" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Shopify image size requirements: the complete reference
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Using the wrong dimensions means either blurry images or wasted file size. Here are the current recommended dimensions for every Shopify image type:
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Image Type</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Dimensions</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Target Size</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Notes</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              {[
                ["Product images", "2048 x 2048 px", "Under 200KB", "Square format preferred"],
                ["Collection images", "1024 x 1024 px", "Under 150KB", "Used in collection grid"],
                ["Slideshow / Banner", "1920 x 1080 px", "Under 300KB", "16:9 ratio, above the fold"],
                ["Logo", "250 x 250 px max", "\u2014", "Transparent PNG recommended"],
                ["Favicon", "32 x 32 px", "\u2014", "ICO or PNG"],
                ["Background images", "1920 x 1080 px", "Under 300KB", "Compress aggressively"],
                ["Blog post images", "1200 x 628 px", "Under 200KB", "Also works for social sharing"],
              ].map(([type, dims, size, notes], i) => (
                <tr key={type} className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${i % 2 === 1 ? "bg-[#FAFAFA] dark:bg-[#1A1A1A]/50" : ""}`}>
                  <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">{type}</td>
                  <td className="px-4 py-2.5 text-xs font-mono">{dims}</td>
                  <td className="px-4 py-2.5 text-xs">{size}</td>
                  <td className="px-4 py-2.5 text-xs">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section: 3-step workflow */}
        <h2 id="3-step-workflow" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The 3-step optimization workflow (before you upload)
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This takes less than two minutes per batch and is entirely free. Everything runs in your browser &mdash; nothing is uploaded to external servers.
        </p>

        <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-3">Step 1: Resize to the correct Shopify dimensions</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Use{" "}
          <Link href="/tools/resizepack" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix ResizePack
          </Link>
          {" "}to resize images to exact pixel dimensions. For product images, set output to 2048 x 2048 px. For slideshow images, use 1920 x 1080 px. Do not upscale small images &mdash; always start from a high-resolution source.
        </p>

        <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-3">Step 2: Compress to 80% quality</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Use{" "}
          <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix Compress
          </Link>
          {" "}to reduce file size while maintaining visual quality. Set compression to 80% &mdash; the sweet spot for e-commerce photography. At 80%, the human eye cannot detect quality loss on a screen, but file sizes drop dramatically. Batch up to 20 images at once.
        </p>

        <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-3">Step 3: Convert to WebP</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Shopify Online Store 2.0 supports WebP natively. Use{" "}
          <Link href="/tools/webp" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix WebP Converter
          </Link>
          {" "}to convert your resized and compressed images. WebP files are typically 25&ndash;35% smaller than JPEG at the same visual quality. Upload the WebP files to Shopify &mdash; done.
        </p>

        {/* Inline CTA */}
        <Link href="/tools/compress" className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8">
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">Free tool &mdash; no Shopify app needed</p>
            <p className="text-sm font-semibold text-white leading-snug">Compress your Shopify product images now &mdash; batch up to 20</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
        </Link>

        {/* Section: Benchmark data */}
        <h2 id="benchmark-data" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Real benchmark data: before and after
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          These are real file size results using the 3-step workflow. Source images were typical e-commerce product shots exported from a camera at full resolution.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Image</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Before</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">After</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Savings</th>
              </tr>
            </thead>
            <tbody className="text-[#737373]">
              {[
                ["Product photo (white bg)", "4.2 MB", "180 KB", "96%"],
                ["Lifestyle shot (model)", "3.8 MB", "210 KB", "94%"],
                ["Model on white background", "2.1 MB", "95 KB", "95%"],
                ["Collection banner", "2.6 MB", "165 KB", "94%"],
                ["Blog post hero image", "1.9 MB", "140 KB", "93%"],
              ].map(([image, before, after, savings], i) => (
                <tr key={image} className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${i % 2 === 1 ? "bg-[#FAFAFA] dark:bg-[#1A1A1A]/50" : ""}`}>
                  <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">{image}</td>
                  <td className="px-4 py-2.5 text-xs">{before}</td>
                  <td className="px-4 py-2.5 text-xs">{after}</td>
                  <td className="px-4 py-2.5 text-xs font-medium text-green-600">{savings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A typical Shopify product page with 4&ndash;6 images goes from 12&ndash;18MB down to under 1MB. That is the difference between a 6-second load and a sub-2-second load on mobile.
        </p>

        {/* Section: Shopify-specific tips */}
        <h2 id="shopify-specific-tips" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Shopify-specific tips most guides miss
        </h2>

        <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-3">Shopify generates multiple sizes &mdash; optimize the source</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          When you upload an image, Shopify generates several size variants: thumbnail, small, medium, large, master. All of those variants are generated from your uploaded original. If your original is 4MB, every generated variant starts from that 4MB file. Optimizing before upload is the only way to reduce the weight of every variant.
        </p>

        <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-3">Filename and alt text are Shopify SEO signals</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A file named <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-700 dark:text-[#D4D4D4]">IMG_3847.jpg</code> gives Google nothing. A file named <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-700 dark:text-[#D4D4D4]">mens-leather-wallet-brown-bifold.jpg</code> tells Google exactly what the product is.{" "}
          <Link href="/tools/ai-rename" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix AI Rename
          </Link>
          {" "}generates descriptive, SEO-friendly filenames based on image content.
        </p>

        <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-3">Square product images perform best</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Non-square images get letterboxed or cropped unpredictably depending on the theme. Product images at 2048 x 2048 px (1:1 ratio) render consistently across all Shopify themes, on all devices, and avoid unexpected cropping.
        </p>

        {/* Section: SammaPix vs Apps */}
        <h2 id="sammapix-vs-apps" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          <Link href="/" className="text-[#171717] dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">SammaPix</Link> vs. Shopify image optimization apps
        </h2>

        <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-3">Paid Shopify apps (TinyIMG, Crush.pics, etc.)</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-2"><strong className="text-[#171717] dark:text-[#E5E5E5]">Cost:</strong> $4&ndash;40 per month.</p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          These apps compress images after you upload them. They access your images via Shopify API, compress on their servers, and push optimized versions back. The problem: Shopify&apos;s generated size variants may already exist unoptimized in the CDN cache. At $20/month, you pay $240/year indefinitely.
        </p>

        <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-3">SammaPix (free, browser-based)</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-2"><strong className="text-[#171717] dark:text-[#E5E5E5]">Cost:</strong> Free.</p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          You optimize locally in your browser before uploading. No data reaches a third-party server. Optimization happens before upload, so Shopify generates all variants from already-optimized source files. Works for any platform &mdash; Shopify, WooCommerce, Squarespace, anything.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Recommended approach:</strong> Use SammaPix for all new uploads. If your existing catalog has performance issues, run a one-time batch through the workflow, then continue with pre-upload optimization going forward.
        </p>

        {/* Section: Check speed */}
        <h2 id="check-speed" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          How to check if your Shopify images are slowing you down
        </h2>
        <ol className="space-y-3 mb-6 pl-4 list-decimal list-inside">
          <li className="text-sm text-[#737373] leading-relaxed">Go to PageSpeed Insights and run your Shopify homepage and a high-traffic product page</li>
          <li className="text-sm text-[#737373] leading-relaxed">Look for &ldquo;Serve images in next-gen formats&rdquo; and &ldquo;Properly size images&rdquo; recommendations</li>
          <li className="text-sm text-[#737373] leading-relaxed">Note the estimated savings in kilobytes next to each flagged image</li>
          <li className="text-sm text-[#737373] leading-relaxed">Prioritize images with the highest savings first &mdash; those are your biggest wins</li>
        </ol>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Most unoptimized Shopify stores score 40&ndash;65 on mobile PageSpeed. After the 3-step workflow, stores typically reach 75&ndash;90 &mdash; a meaningful improvement for both UX and Google ranking.
        </p>

        {/* Section: Checklist */}
        <h2 id="checklist" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The Shopify image optimization checklist
        </h2>
        <ul className="space-y-2 mb-6 pl-4">
          {[
            "Resize to correct dimensions (product: 2048x2048, banner: 1920x1080)",
            "Compress to 80% quality, targeting under 200KB for product images",
            "Convert to WebP if your theme supports Online Store 2.0",
            "Use descriptive filenames with relevant product keywords",
            "Write descriptive alt text after uploading in Shopify",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-1 text-green-500">&#10003;</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          All three optimization steps can be done for free at{" "}
          <Link href="/" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix
          </Link>
          , directly in your browser, with batch support for up to 20 images at a time.
        </p>

        {/* Related guides */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">Related guides &amp; tools</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/tools/compress" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress Images
            </Link>
            <Link href="/tools/resizepack" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Resize for Shopify
            </Link>
            <Link href="/tools/webp" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Convert to WebP
            </Link>
            <Link href="/tools/ai-rename" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              AI Rename for SEO
            </Link>
            <Link href="/blog/best-image-compression-tools-2026" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Best Compression Tools 2026
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <h2 id="faq" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 mb-6">
          {[
            { q: "Does Shopify automatically optimize images when I upload them?", a: "Shopify generates multiple size variants but does not significantly compress your original. If you upload a 4MB JPEG, Shopify stores a 4MB JPEG as the master. Pre-compression is the only way to reduce all generated variants." },
            { q: "What is the best image format for Shopify in 2026?", a: "WebP. It is 25-35% smaller than JPEG at the same quality, supported by all major browsers, and Shopify Online Store 2.0 handles it natively." },
            { q: "What dimensions should product images be?", a: "2048 x 2048 pixels (square). This renders consistently across all themes and supports Shopify's zoom feature. Do not go below 800 x 800 px." },
            { q: "How do I resize images for a Shopify slideshow?", a: "Use 1920 x 1080 px (16:9 ratio). Keep file sizes under 300KB for above-the-fold banners. SammaPix ResizePack handles exact dimension resizing." },
            { q: "Is there a free Shopify image optimizer?", a: "Yes. SammaPix compresses, resizes, and converts to WebP for free in your browser. No app install, no server uploads, no monthly fee. Batch up to 20 images at once." },
            { q: "How much faster will my Shopify store be after optimization?", a: "Product images typically drop 93-96% in file size. A page with 4-6 images goes from 12-18MB to under 1MB. PageSpeed scores typically jump from 40-65 to 75-90 on mobile." },
          ].map(({ q, a }) => (
            <details key={q} className="group border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md">
              <summary className="px-4 py-3 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] cursor-pointer hover:bg-[#FAFAFA] dark:hover:bg-[#1A1A1A] transition-colors">
                {q}
              </summary>
              <p className="px-4 pb-3 text-sm text-[#737373] leading-relaxed">{a}</p>
            </details>
          ))}
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
