import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title:
    "WordPress Image Optimization: Why You Should Compress Before Upload (2026 Guide)",
  description:
    "Stop paying for ShortPixel, Imagify, or Smush credits. Compress and convert images BEFORE uploading to WordPress — free, no plugin needed. Step-by-step tutorial with real benchmark data.",
  alternates: {
    canonical: `${APP_URL}/blog/wordpress-compress-images-before-upload`,
  },
  keywords: [
    "wordpress compress images before upload",
    "wordpress image optimization without plugin",
    "compress images before wordpress upload free",
    "wordpress image optimization 2026",
    "shortpixel alternative free",
  ],
  openGraph: {
    title: "WordPress Image Optimization: Why You Should Compress Before Upload (2026 Guide)",
    description:
      "Stop paying for plugin credits. Compress images before uploading to WordPress — free tutorial with benchmark data.",
    url: `${APP_URL}/blog/wordpress-compress-images-before-upload`,
    type: "article",
    publishedTime: "2026-04-08",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "WordPress Image Optimization: Compress Before Upload (2026 Guide)",
    description:
      "Stop paying for ShortPixel or Imagify credits. Compress images before uploading to WordPress — free, no plugin needed.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-04-08";
const POST_DATE_FORMATTED = "April 8, 2026";
const POST_URL = `${APP_URL}/blog/wordpress-compress-images-before-upload`;
const POST_TITLE = "WordPress Image Optimization: Why You Should Compress Before Upload (2026 Guide)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Stop paying for ShortPixel, Imagify, or Smush credits. Compress and convert images BEFORE uploading to WordPress — free, no plugin needed. Step-by-step tutorial with real benchmark data.",
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
    "wordpress compress images before upload",
    "wordpress image optimization without plugin",
    "compress images before wordpress upload free",
    "wordpress image optimization 2026",
    "shortpixel alternative free",
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
      name: "Do I still need an image optimization plugin if I compress before upload?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For new images, no. The plugin becomes redundant if you compress before uploading. For existing unoptimized images already on your server, a one-time plugin run can help batch-process them retroactively.",
      },
    },
    {
      "@type": "Question",
      name: "What quality setting should I use for WordPress?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "80% is the sweet spot for most photos. It reduces file size by around 90% with no visible quality loss on screen. Logos and graphics with text should use higher quality (90%+) or stay as PNG to preserve sharp edges.",
      },
    },
    {
      "@type": "Question",
      name: "Should I upload WebP or JPEG to WordPress?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WebP if your site uses WordPress 5.8 or later, which is every modern WordPress installation. WebP saves 25-35% more than optimized JPEG with no visible quality loss. WordPress has supported WebP natively since version 5.8.",
      },
    },
    {
      "@type": "Question",
      name: "How many images can I compress at once with SammaPix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "20 images per batch on the free tier, 500 on Pro. All processing happens in your browser — no upload to servers, so your images stay private.",
      },
    },
    {
      "@type": "Question",
      name: "Will compressing images affect my SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Positively. Smaller images mean faster page loads, which means better Core Web Vitals scores and higher Google rankings. Google has confirmed page speed is a ranking factor.",
      },
    },
  ],
};

export default function WordPressCompressImagesBeforeUploadPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="wordpress-compress-images-before-upload"
        description="WordPress plugins like ShortPixel, Imagify, and Smush charge per-image credits to compress photos you already uploaded. There&apos;s a better way: compress and convert BEFORE uploading. Your site loads faster, you pay nothing, and your server stores smaller files from day one."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Performance"]}
        readingTime={9}
        headings={[
          { id: "credit-based-plugin-trap", title: "The credit-based plugin trap" },
          { id: "compress-before-upload-workflow", title: 'The "compress before upload" workflow' },
          { id: "real-results", title: "Real results \u2014 3 test images before and after" },
          { id: "webp-conversion", title: "What about WebP? Should you convert too?" },
          { id: "lazy-loading-cdn", title: "But what about lazy loading and CDN?" },
          { id: "when-you-need-plugin", title: "When you DO need a plugin (and when you don\u2019t)" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Credit-based WordPress image plugins (ShortPixel, Imagify, Smush) charge monthly for something you can do for free before uploading.",
          "Compressing images to 80% quality before upload reduces file size by ~90% with no visible quality loss \u2014 no plugin needed.",
          "Converting to WebP saves an additional 25\u201335% over optimized JPEG, and WordPress has supported WebP natively since version 5.8.",
          "Lazy loading and CDNs do not reduce file size \u2014 only compression does. Best results come from compressing before upload + lazy loading + CDN.",
          "For existing images already on your server, a one-time plugin run makes sense. For new images going forward, compress before upload is always better.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
              alt="Laptop displaying website analytics dashboard representing WordPress performance optimization"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Faster WordPress sites start with smaller images &mdash; before they ever reach your server - Photo by Carlos Muza on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Compress your WordPress images &mdash; free, before upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop your images into SammaPix, compress to any quality level, optionally convert to WebP. Download and upload to WordPress. No plugin, no credits, no monthly fee.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/compress"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Compress Tool
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/webp"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                Convert to WebP
              </Link>
            </div>
          </div>
        }
      >
        {/* Section: The credit-based plugin trap */}
        <h2 id="credit-based-plugin-trap" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The credit-based plugin trap
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Most WordPress image optimization plugins use a credit system. You install the plugin, it compresses your images on their servers, and you pay per image or per megabyte. Here is what the major plugins actually give you for free:
        </p>
        <ul className="space-y-3 mb-6 pl-4">
          {[
            { label: "ShortPixel", detail: "100 images per month free, then you pay per credit. A single blog post with 5 images burns through your monthly allowance in a few weeks." },
            { label: "Imagify", detail: "20MB per month free \u2014 that is roughly 10 photos from a modern phone. One product shoot and you are done for the month." },
            { label: "Smush Pro", detail: "$49 per month as part of the WPMU DEV bundle. The free version caps compression at 5MB per image and strips lossy compression entirely." },
            { label: "WP-Optimize", detail: "Limited free tier with basic compression. Advanced features locked behind a paid plan." },
          ].map(({ label, detail }) => (
            <li key={label} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              <span><strong className="text-[#171717] dark:text-[#E5E5E5]">{label}</strong> &mdash; {detail}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The frustration is real. One Reddit thread with 46 upvotes and 71 comments is titled: <em>&ldquo;I am so tired of Credit Based Image Optimizers.&rdquo;</em> Another comment with 30 upvotes puts it bluntly: <em>&ldquo;I don&apos;t understand why people put image optimizers on their websites instead of optimizing before upload.&rdquo;</em>
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The core problem is simple: you are paying a monthly fee for something you can do once, for free, before you ever upload the image. Every image that hits your WordPress media library should already be optimized. The plugin becomes unnecessary.
        </p>

        {/* Section: The "compress before upload" workflow */}
        <h2 id="compress-before-upload-workflow" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          The &ldquo;compress before upload&rdquo; workflow
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Here is the step-by-step process. It takes about 30 seconds per batch of images:
        </p>
        <ol className="space-y-3 mb-6 pl-4 list-decimal list-inside">
          <li className="text-sm text-[#737373] leading-relaxed">
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Export your images as usual</strong> &mdash; JPG from your camera, PNG from Canva or Figma, screenshots from your phone
          </li>
          <li className="text-sm text-[#737373] leading-relaxed">
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Open{" "}
            <Link href="/tools/compress" className="underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
              SammaPix Compress
            </Link></strong> &mdash; no account needed, runs entirely in your browser
          </li>
          <li className="text-sm text-[#737373] leading-relaxed">
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Drop all images at once</strong> &mdash; batch up to 20 images in a single drop
          </li>
          <li className="text-sm text-[#737373] leading-relaxed">
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Set quality to 80%</strong> &mdash; this is the sweet spot for web. Visually identical, dramatically smaller files
          </li>
          <li className="text-sm text-[#737373] leading-relaxed">
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Download the compressed images</strong> &mdash; they are ready for WordPress
          </li>
          <li className="text-sm text-[#737373] leading-relaxed">
            <strong className="text-[#171717] dark:text-[#E5E5E5]">Upload to WordPress</strong> &mdash; your images are already optimized. No plugin processing, no credits spent, no waiting
          </li>
        </ol>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          <strong className="text-[#171717] dark:text-[#E5E5E5]">Optional bonus step:</strong> convert to WebP first using the{" "}
          <Link href="/tools/webp" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix WebP converter
          </Link>
          {" "}for an additional 25&ndash;35% file size reduction on top of the compression. More on this below.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Everything happens client-side &mdash; your images never leave your browser. There is no upload queue, no server processing, and no file size limits beyond what your browser can handle.
        </p>

        {/* Section: Real results */}
        <h2 id="real-results" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Real results &mdash; 3 test images before and after
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          We tested three typical WordPress images through{" "}
          <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix Compress
          </Link>
          {" "}at 80% quality, then converted the results to WebP. Here is what happened:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Image</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Original</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">After Compress (80%)</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">After WebP</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Total savings</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Product photo (iPhone 15)</td>
                <td className="px-4 py-2.5 text-xs">4.2 MB</td>
                <td className="px-4 py-2.5 text-xs">420 KB</td>
                <td className="px-4 py-2.5 text-xs">310 KB</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600">93%</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Blog header (Canva export)</td>
                <td className="px-4 py-2.5 text-xs">1.8 MB</td>
                <td className="px-4 py-2.5 text-xs">195 KB</td>
                <td className="px-4 py-2.5 text-xs">145 KB</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600">92%</td>
              </tr>
              <tr className="last:border-b-0">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Team photo (DSLR)</td>
                <td className="px-4 py-2.5 text-xs">8.7 MB</td>
                <td className="px-4 py-2.5 text-xs">680 KB</td>
                <td className="px-4 py-2.5 text-xs">490 KB</td>
                <td className="px-4 py-2.5 text-xs font-medium text-green-600">94%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          That product photo went from 4.2 MB to 310 KB &mdash; a 93% reduction. On a blog page with 5 similar images, that is the difference between loading 21 MB of images and loading 1.5 MB. Your visitors notice that difference, and so does Google.
        </p>
        <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-4 text-xs italic">
          Results vary depending on image content and complexity. Photos with lots of detail compress less than simple graphics. These are actual test results, not guarantees.
        </p>

        {/* Inline CTA */}
        <Link href="/tools/compress" className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8">
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">Free tool &mdash; no signup required</p>
            <p className="text-sm font-semibold text-white leading-snug">Compress your WordPress images now &mdash; batch up to 20 at once</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
        </Link>

        {/* Section: What about WebP? */}
        <h2 id="webp-conversion" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          What about WebP? Should you convert too?
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Short answer: yes, if your WordPress is version 5.8 or later (which is virtually every active WordPress site in 2026). WebP is a modern image format developed by Google that delivers 25&ndash;35% smaller files than optimized JPEG with no visible quality difference.
        </p>
        <ul className="space-y-3 mb-6 pl-4">
          {[
            "WebP has 97% browser support as of 2026 \u2014 every major browser including Safari, Chrome, Firefox, and Edge",
            "WordPress has supported WebP uploads natively since version 5.8 (released July 2021)",
            "WebP saves 25\u201335% more than an already-optimized JPEG \u2014 that is free performance on top of compression",
            "The only browsers that do not support WebP are Internet Explorer (discontinued) and very old Safari versions",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The ideal workflow is: compress with{" "}
          <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix Compress
          </Link>
          {" "}&rarr; convert to WebP with the{" "}
          <Link href="/tools/webp" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            WebP converter
          </Link>
          {" "}&rarr; upload to WordPress. Two steps, zero cost, maximum compression.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          You can also go directly from JPG or PNG to WebP using the{" "}
          <Link href="/convert/jpg-to-webp" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            JPG to WebP
          </Link>
          {" "}or{" "}
          <Link href="/convert/png-to-webp" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            PNG to WebP
          </Link>
          {" "}converters, which handle compression and format conversion in a single step.
        </p>

        {/* Section: But what about lazy loading and CDN? */}
        <h2 id="lazy-loading-cdn" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          But what about lazy loading and CDN?
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A common objection: &ldquo;I do not need to compress images because my CDN handles it&rdquo; or &ldquo;lazy loading takes care of performance.&rdquo; This is a misunderstanding of what each technology actually does.
        </p>
        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Lazy loading</strong> delays when an image loads, but does not reduce its file size. Your server still stores a 4 MB file, and the visitor still downloads 4 MB &mdash; just later in the page scroll.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">CDN (Content Delivery Network)</strong> caches your images on edge servers closer to the visitor, which reduces latency. But it serves exactly what you uploaded. A CDN does not compress your images &mdash; it delivers your 4 MB file faster from a closer location.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Image compression</strong> is the only thing that actually reduces the bytes transferred. A 4 MB image compressed to 400 KB saves 3.6 MB of bandwidth on every single page load, regardless of lazy loading or CDN.</span>
          </li>
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The best approach is all three together: compress before upload + lazy loading + CDN. Each solves a different problem. Compression reduces file size, lazy loading defers non-critical images, and CDN reduces latency. Skipping compression and relying on the other two is like putting racing tires on a truck &mdash; it helps, but you are still hauling unnecessary weight.
        </p>

        {/* Section: When you DO need a plugin */}
        <h2 id="when-you-need-plugin" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          When you DO need a plugin (and when you don&apos;t)
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Being honest: there are situations where a WordPress image optimization plugin makes sense. Here is when to use one and when to skip it:
        </p>
        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-400 shrink-0 mt-2" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">10,000+ existing unoptimized images</strong> &mdash; a plugin can batch-process your entire media library retroactively. Running ShortPixel once to optimize your backlog, then canceling, is a valid strategy.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-400 shrink-0 mt-2" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Non-technical editors uploading daily</strong> &mdash; if you have a team of content editors who will not follow a compression workflow, a plugin acts as a safety net to catch unoptimized uploads.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-400 shrink-0 mt-2" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Automatic WebP conversion on the fly</strong> &mdash; some plugins can serve WebP to supported browsers and fall back to JPEG for older ones. This is less relevant in 2026 with 97% WebP support, but still useful for edge cases.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0 mt-2" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">For new images going forward</strong> &mdash; compress before upload is always better. It is free, does not add a plugin dependency to your site, does not require server resources, and gives you full control over quality settings.</span>
          </li>
        </ul>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The sweet spot for most WordPress sites: use SammaPix to{" "}
          <Link href="/tools/compress" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            compress every new image before upload
          </Link>
          , and if you have a large backlog of unoptimized images, run a plugin once to clean them up. Then uninstall the plugin. You do not need it running permanently.
        </p>

        {/* Related guides & tools */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">Related guides &amp; tools</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/compress-to/200kb" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to 200KB
            </Link>
            <Link href="/compress-to/500kb" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to 500KB
            </Link>
            <Link href="/compress-to/1mb" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress to 1MB
            </Link>
            <Link href="/convert/png-to-webp" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Convert PNG to WebP
            </Link>
            <Link href="/convert/jpg-to-webp" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Convert JPG to WebP
            </Link>
            <Link href="/optimize-for/wordpress" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Optimize for WordPress
            </Link>
            <Link href="/blog/make-images-load-faster-website" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Guide: Make Images Load Faster
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
          <h2 id="faq" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Do I still need an image optimization plugin if I compress before upload?",
                a: "For new images, no. The plugin becomes redundant if you compress before uploading. For existing unoptimized images already on your server, a one-time plugin run can help batch-process them retroactively. After that, you can uninstall the plugin.",
              },
              {
                q: "What quality setting should I use for WordPress?",
                a: "80% is the sweet spot for most photos. It reduces file size by around 90% with no visible quality loss on screen. Logos and graphics with text should use higher quality (90%+) or stay as PNG to preserve sharp edges.",
              },
              {
                q: "Should I upload WebP or JPEG to WordPress?",
                a: "WebP if your site uses WordPress 5.8 or later, which is every modern WordPress installation. WebP saves 25\u201335% more than optimized JPEG with no visible quality loss. WordPress has supported WebP natively since version 5.8.",
              },
              {
                q: "How many images can I compress at once with SammaPix?",
                a: "20 images per batch on the free tier, 500 on Pro. All processing happens in your browser \u2014 no upload to servers, so your images stay private and compression is instant.",
              },
              {
                q: "Will compressing images affect my SEO?",
                a: "Positively. Smaller images mean faster page loads, which means better Core Web Vitals scores and higher Google rankings. Google has confirmed page speed is a ranking factor. A page that loads in 2 seconds instead of 5 seconds will rank better, all else being equal.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{q}</h3>
                <p className="text-sm text-[#737373] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </BlogArticleLayout>

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
