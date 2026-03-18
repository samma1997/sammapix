import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Make Images Load Faster: 7 Proven Methods (2026) | SammaPix",
  description:
    "Speed up your website with 7 image optimization techniques. Compress, convert to WebP, lazy load, use CDN, and more- improve Core Web Vitals and LCP scores.",
  alternates: {
    canonical: `${APP_URL}/blog/make-images-load-faster-website`,
  },
  keywords: [
    "make images load faster",
    "image optimization website speed",
    "improve lcp score images",
    "website image performance",
    "lazy loading images",
    "webp images faster",
    "responsive images srcset",
    "image cdn performance",
  ],
  openGraph: {
    title: "Make Images Load Faster: 7 Proven Methods (2026)",
    description:
      "Speed up your website with 7 image optimization techniques. Compress, convert to WebP, lazy load, use CDN, and more- improve Core Web Vitals and LCP scores.",
    url: `${APP_URL}/blog/make-images-load-faster-website`,
    type: "article",
    publishedTime: "2026-01-18",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Make Images Load Faster: 7 Proven Methods (2026)",
    description:
      "Compress, convert to WebP, lazy load, use CDN, and more. 7 techniques to cut image load times and improve Core Web Vitals.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Make Images Load Faster: 7 Proven Methods (2026)",
  description:
    "Speed up your website with 7 image optimization techniques. Compress, convert to WebP, lazy load, use CDN, and more- improve Core Web Vitals and LCP scores.",
  url: `${APP_URL}/blog/make-images-load-faster-website`,
  datePublished: "2026-01-18",
  dateModified: "2026-01-18",
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://lucasammarco.com",
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
    "@id": `${APP_URL}/blog/make-images-load-faster-website`,
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
      name: "Make Images Load Faster: 7 Proven Methods (2026)",
      item: `${APP_URL}/blog/make-images-load-faster-website`,
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Make Images Load Faster on Your Website",
  description:
    "A step-by-step guide to speed up image loading using compression, next-gen formats, lazy loading, responsive images, CDN, and the picture element.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Compress your images",
      text: "Reduce file size using lossy or lossless compression before publishing. Target under 200 KB for most web images.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Convert to WebP or AVIF",
      text: "Convert JPEG and PNG assets to WebP for 25-34% smaller files at equivalent visual quality.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Resize to correct display dimensions",
      text: "Never serve a 4000px wide image in a 800px column. Resize to the actual display size before uploading.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Add native lazy loading",
      text: 'Add loading="lazy" to all below-the-fold img elements to defer loading until the image is near the viewport.',
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Use responsive images with srcset",
      text: "Use the srcset and sizes attributes to serve the correctly sized image for each device and screen density.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Serve images from a CDN",
      text: "Distribute image assets via Cloudflare, CloudFront, or Bunny CDN to reduce latency for global users.",
    },
    {
      "@type": "HowToStep",
      position: 7,
      name: "Use the picture element for format fallbacks",
      text: "Wrap img tags in a picture element to serve WebP or AVIF with a JPEG fallback for older browsers.",
    },
  ],
};

const POST_DATE = "2026-01-18";
const POST_DATE_FORMATTED = "January 18, 2026";
const POST_URL = `${APP_URL}/blog/make-images-load-faster-website`;
const POST_TITLE = "Make Images Load Faster: 7 Proven Methods (2026)";

export default function MakeImagesLoadFasterPage() {
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(POST_TITLE)}&url=${encodeURIComponent(POST_URL)}&via=lucasammarco`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(POST_URL)}`;

  return (
    <div className="py-12 px-4 sm:px-6 bg-white dark:bg-[#191919] min-h-screen">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-[#737373] hover:text-gray-700 dark:hover:text-[#E5E5E5] mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          Back to Blog
        </Link>

        <article>
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium uppercase tracking-wide text-blue-700">
                Performance
              </span>
              <span className="text-gray-200 dark:text-[#333]">·</span>
              <time
                className="text-xs text-gray-400 dark:text-[#737373]"
                dateTime={POST_DATE}
              >
                {POST_DATE_FORMATTED}
              </time>
              <span className="text-gray-200 dark:text-[#333]">·</span>
              <span className="text-xs text-gray-400 dark:text-[#737373]">
                11 min read
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[#E5E5E5] tracking-tight leading-tight mb-4">
              {POST_TITLE}
            </h1>

            <p className="text-base text-gray-500 dark:text-[#A3A3A3] leading-relaxed mb-5">
              Images are almost always the single largest contributor to slow
              page loads. A page with unoptimized images can take 5+ seconds to
              show its main content- costing rankings, conversions, and users.
              This guide covers 7 proven, practical methods to make images load
              faster on any website, with code examples you can use today.
            </p>
          </header>

          <div className="prose-content">

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                alt="Website performance dashboard showing load time metrics and Core Web Vitals"
                className="w-full rounded-lg"
                loading="eager"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                Image weight is the number one cause of poor LCP scores- optimizing it is the highest-leverage performance win available - Photo by Carlos Muza on Unsplash
              </figcaption>
            </figure>

            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Why image load speed matters more than ever
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Google ranks pages using Core Web Vitals, and the most important
              metric - Largest Contentful Paint (LCP)- is dominated by images.
              According to{" "}
              <a
                href="https://web.dev/articles/lcp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                web.dev&apos;s LCP documentation
              </a>
              , the LCP element is an image in approximately 70% of all web
              pages. To score &ldquo;Good&rdquo; on LCP, that image must finish
              loading within 2.5 seconds of navigation start.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Beyond rankings, the business case is equally strong. A 1-second
              improvement in page load time correlates with a 7% increase in
              conversions, according to studies from Akamai and Deloitte.
              Mobile users on slower connections are even more sensitive- if
              your images are not optimized, you are actively losing customers.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              The good news: image optimization does not require a complete site
              rebuild. Each of the 7 methods below can be implemented
              independently, and even applying two or three of them will produce
              measurable improvements in load time, LCP score, and user
              experience. The{" "}
              <a
                href="https://web.dev/learn/images"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                web.dev image learning path
              </a>{" "}
              is an excellent companion resource for going deeper on any of
              these techniques.
            </p>

            <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

            {/* Method 1 */}
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Method 1 - Compress your images before publishing
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Compression is the most immediate, highest-impact action you can
              take to make images load faster. A raw photograph from a modern
              smartphone often weighs 4–8 MB. The same image, correctly
              compressed for web display, should be under 200 KB- a reduction
              of 95% or more with no visible quality loss at normal screen sizes.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              There are two types of compression. Lossless compression
              re-encodes the data more efficiently without discarding any pixels
             - useful for logos, screenshots, and UI elements. Lossy
              compression discards image data that the human eye is unlikely to
              notice, which is appropriate for photographs and any continuous-
              tone image. For web photos, a JPEG or WebP quality setting of
              78–82 is indistinguishable from quality 100 at normal display
              sizes, while producing files that are 60–80% smaller.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              The key rule: always compress from the original source file, not
              from a previously compressed version. Re-compressing already-
              lossy images stacks artifacts and degrades quality without
              recovering file size. Work from originals, compress once, store
              both versions.
            </p>

            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 my-6">
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">
                Compress your images in seconds- no upload required
              </p>
              <p className="text-sm text-[#737373] mb-3">
                The{" "}
                <Link
                  href="/tools/compress"
                  className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
                >
                  SammaPix Compress tool
                </Link>{" "}
                runs entirely in your browser. Drag in a batch of images, adjust
                the quality slider, and download- your files never leave your
                device.
              </p>
              <Link
                href="/tools/compress"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Compress Tool
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>

            {/* Method 2 */}
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Method 2 - Convert to next-gen formats (WebP and AVIF)
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              JPEG and PNG served most of the web for decades, but they are no
              longer the best options for file size. WebP, developed by Google,
              produces files that are 25–34% smaller than JPEG at equivalent
              perceptual quality. AVIF- based on the AV1 video codec- can
              compress even further, often 40–50% smaller than JPEG, though
              encoding is slower and browser support, while growing, is slightly
              behind WebP.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Browser support for WebP now exceeds 97% globally. For the vast
              majority of websites, you can safely default to WebP for all
              photographic content with zero compatibility concerns. AVIF support
              sits above 90% and continues to grow- it is appropriate if you
              want to push file sizes as low as possible for a modern audience.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Converting existing JPEG or PNG assets to WebP is a one-time
              operation with permanent returns. Every user who downloads the
              WebP version instead of the JPEG version transfers fewer bytes- 
              and arrives at a fully-loaded page faster. For a site with
              hundreds of images, this single step can cut total image payload
              by a third.
            </p>

            <div className="bg-[#F5F5F5] dark:bg-[#1E1E1E] rounded-lg p-4 my-6">
              <p className="text-xs font-medium text-gray-500 dark:text-[#737373] mb-2 uppercase tracking-wide">
                Real-world savings at equivalent quality
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#737373]">Original JPEG (quality 90)</span>
                  <span className="font-medium text-gray-800 dark:text-[#E5E5E5]">420 KB</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#737373]">WebP (quality 82)</span>
                  <span className="font-medium text-green-700">290 KB &mdash; 31% smaller</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#737373]">AVIF (quality 70)</span>
                  <span className="font-medium text-green-700">240 KB &mdash; 43% smaller</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-100 dark:border-[#2A2A2A] rounded-md p-5 my-6">
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">
                Convert JPEG and PNG to WebP instantly
              </p>
              <p className="text-sm text-[#737373] mb-3">
                Use the{" "}
                <Link
                  href="/tools/webp"
                  className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
                >
                  SammaPix WebP converter
                </Link>{" "}
                to batch-convert your existing image library. Client-side,
                private, and free.
              </p>
              <Link
                href="/tools/webp"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-sm font-medium rounded-md text-gray-700 dark:text-[#E5E5E5] hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
              >
                Convert to WebP
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>

            {/* Method 3 */}
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Method 3 - Resize images to the correct display dimensions
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Serving an oversized image is one of the most common- and most
              wasteful- image performance mistakes. A photo from a modern
              smartphone is 4000 pixels wide or more. If that image displays in
              a 800px blog column, the browser downloads roughly 25 times more
              pixels than it ever renders. Every extra pixel is wasted bandwidth,
              wasted memory, and wasted milliseconds.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              The rule is simple: resize every image to the maximum width at
              which it will be displayed before publishing it. For a standard
              blog article column of 800px, a 1600px wide image (2x for retina
              displays) is the absolute maximum you should ever serve. For
              thumbnails at 200px, serve a 400px image. Going beyond this
              produces zero visual improvement on any real device.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Resizing before compression also multiplies the effect of the
              compression step. A 6000px photo compressed to quality 80 is still
              a large file because it carries an enormous number of pixels. The
              same image resized to 1200px first, then compressed, can be 90% or
              more smaller than the unresized, uncompressed original.
            </p>

            <div className="border border-gray-100 dark:border-[#2A2A2A] rounded-md p-5 my-6">
              <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">
                Resize a batch of images to exact dimensions
              </p>
              <p className="text-sm text-[#737373] mb-3">
                The{" "}
                <Link
                  href="/tools/resizepack"
                  className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
                >
                  SammaPix Resize Pack tool
                </Link>{" "}
                lets you set a target width and resize a whole folder of images
                at once- then download them as a ZIP. No upload, no account.
              </p>
              <Link
                href="/tools/resizepack"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-sm font-medium rounded-md text-gray-700 dark:text-[#E5E5E5] hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
              >
                Open Resize Pack
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85f1d7?w=800&q=80"
                alt="Developer reviewing website code on a laptop with performance tools open"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                Implementing these techniques in code takes minutes- the performance gains last permanently - Photo by Fotis Fotopoulos on Unsplash
              </figcaption>
            </figure>

            {/* Method 4 */}
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Method 4 - Lazy load below-the-fold images
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              By default, browsers download every image on a page immediately,
              including images the user may never scroll down to see. Lazy
              loading defers the download of off-screen images until the user
              scrolls near them. On a long article page with 10 images, lazy
              loading the 8 below-the-fold images can cut initial page weight
              by 70% or more- dramatically improving LCP and Time to
              Interactive.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-3">
              Native lazy loading (recommended)
            </h3>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Since 2019, all major browsers support the native{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">loading</code>{" "}
              attribute on{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">img</code>{" "}
              elements. It requires a single attribute change and zero
              JavaScript:
            </p>

            <div className="bg-[#F5F5F5] dark:bg-[#1E1E1E] rounded-lg p-4 my-4 overflow-x-auto">
              <pre className="text-xs font-mono text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
{`<!-- Load immediately- use for hero/above-the-fold images -->
<img
  src="hero.webp"
  alt="Hero image"
  loading="eager"
  width="1200"
  height="600"
/>

<!-- Defer loading- use for all below-the-fold images -->
<img
  src="article-photo.webp"
  alt="Article photo"
  loading="lazy"
  width="800"
  height="500"
/>`}
              </pre>
            </div>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Two important rules when using native lazy loading. First, always
              include{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">width</code>{" "}
              and{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">height</code>{" "}
              attributes so the browser can reserve space and avoid layout
              shifts (which hurt Cumulative Layout Shift scores). Second, never
              apply{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">loading=&quot;lazy&quot;</code>{" "}
              to your hero or above-the-fold image- that would delay the LCP
              element and actively hurt your score.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-3">
              Intersection Observer for advanced control
            </h3>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              For more control over when lazy loading triggers- or for
              frameworks that do not support the native attribute- the
              Intersection Observer API provides a JavaScript-based alternative:
            </p>

            <div className="bg-[#F5F5F5] dark:bg-[#1E1E1E] rounded-lg p-4 my-4 overflow-x-auto">
              <pre className="text-xs font-mono text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
{`// Lazy load images using Intersection Observer
const lazyImages = document.querySelectorAll('img[data-src]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement;
      img.src = img.dataset.src ?? '';
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '200px 0px', // start loading 200px before entering viewport
});

lazyImages.forEach((img) => observer.observe(img));`}
              </pre>
            </div>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              The{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">rootMargin: &apos;200px&apos;</code>{" "}
              setting starts loading the image 200 pixels before it enters
              the viewport, eliminating any visible pop-in for users who
              scroll at normal speed. Adjust this value based on your image
              sizes and typical scroll speed.
            </p>

            {/* Method 5 */}
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Method 5 - Use responsive images with srcset and sizes
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Serving one fixed-width image to all devices is inefficient. A
              desktop user with a 1400px viewport gets a huge image- which is
              appropriate. But a mobile user with a 390px viewport receives the
              same massive file, even though their browser will downsample it to
              fit. Responsive images solve this by letting the browser select
              the best image size for the current display context.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              The{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">srcset</code>{" "}
              attribute provides multiple image sources at different widths. The{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">sizes</code>{" "}
              attribute tells the browser how wide the image will actually be
              displayed at each viewport breakpoint. Together, they allow the
              browser to download exactly the right image:
            </p>

            <div className="bg-[#F5F5F5] dark:bg-[#1E1E1E] rounded-lg p-4 my-4 overflow-x-auto">
              <pre className="text-xs font-mono text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
{`<img
  src="photo-800.webp"
  srcset="
    photo-400.webp   400w,
    photo-800.webp   800w,
    photo-1200.webp 1200w,
    photo-1600.webp 1600w
  "
  sizes="
    (max-width: 640px)  100vw,
    (max-width: 1024px)  80vw,
    800px
  "
  alt="Responsive product photograph"
  loading="lazy"
  width="800"
  height="500"
/>`}
              </pre>
            </div>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              In this example, a mobile user at 390px viewport width receives
              the 400px image (roughly 40 KB). A desktop user at 1400px receives
              the 1200px or 1600px version. The browser makes the decision
              automatically, factoring in device pixel ratio as well- so
              retina users get the higher-resolution image without you needing
              to write any JavaScript.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              When writing the{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">sizes</code>{" "}
              value, work from smallest viewport to largest and describe the
              actual rendered width of the image- not the viewport. The final
              value (with no media condition) is the fallback. Be specific: a
              vague{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">100vw</code>{" "}
              fallback tells the browser to download the full-width image on
              all screens, defeating the purpose of{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">srcset</code>.
            </p>

            {/* Method 6 */}
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Method 6 - Serve images from a CDN
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Even a perfectly optimized image takes time to travel from your
              server to your user. If your server is in New York and your user
              is in Tokyo, that round trip adds 150–200ms of latency before the
              first byte of image data arrives. A Content Delivery Network (CDN)
              solves this by caching your assets on servers distributed globally
             - so every user downloads from a data center near them, not from
              your origin.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              For images in particular, CDN benefits are compounded: CDNs serve
              assets over HTTP/2 or HTTP/3 (which efficiently multiplexes
              multiple image downloads over a single connection), apply gzip or
              Brotli compression to headers, and often include image
              transformation features built in.
            </p>

            <ul className="mb-4">
              <li className="text-sm text-[#737373] ml-5 mb-2 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Cloudflare CDN (free tier):</strong> Automatic caching on 300+ global PoPs with zero configuration changes to your site. Works by proxying your domain through Cloudflare&apos;s network. Includes image optimization via Polish (converts to WebP automatically on the edge).
              </li>
              <li className="text-sm text-[#737373] ml-5 mb-2 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Amazon CloudFront:</strong> AWS&apos;s CDN, tightly integrated with S3 for static asset hosting. Strong choice if your infrastructure is already on AWS. Pricing is usage-based with a generous free tier.
              </li>
              <li className="text-sm text-[#737373] ml-5 mb-2 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Bunny CDN:</strong> Performance-focused CDN with transparent pricing and excellent support. Particularly cost-effective for media-heavy sites. Includes Bunny Optimizer for on-the-fly image resizing and format conversion.
              </li>
            </ul>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              If your site has global traffic, adding a CDN is non-negotiable
              for image load speed. For domestic-only traffic, a CDN still
              improves performance by reducing load on your origin server and
              enabling HTTP/2 multiplexing- but the impact is less dramatic.
              The good news is that Cloudflare&apos;s free tier covers most use
              cases and requires no code changes.
            </p>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
                alt="Global network map representing CDN distribution points across continents"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                A CDN distributes your images to servers near every user, eliminating the latency of cross-continental downloads - Photo by NASA on Unsplash
              </figcaption>
            </figure>

            {/* Method 7 */}
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Method 7 - Use the picture element for format fallbacks
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Even though WebP support exceeds 97% globally, the right approach
              for production websites is to serve WebP (or AVIF) to supported
              browsers while providing a JPEG or PNG fallback for the rare cases
              where support is absent. The{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">&lt;picture&gt;</code>{" "}
              element makes this possible with no JavaScript required.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              The{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">&lt;picture&gt;</code>{" "}
              element contains one or more{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">&lt;source&gt;</code>{" "}
              elements listing alternative formats, followed by a standard{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">&lt;img&gt;</code>{" "}
              element as the fallback. The browser walks through the{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">&lt;source&gt;</code>{" "}
              elements in order and uses the first one it supports:
            </p>

            <div className="bg-[#F5F5F5] dark:bg-[#1E1E1E] rounded-lg p-4 my-4 overflow-x-auto">
              <pre className="text-xs font-mono text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
{`<picture>
  <!-- AVIF: best compression, ~90% browser support -->
  <source
    type="image/avif"
    srcset="
      photo-400.avif   400w,
      photo-800.avif   800w,
      photo-1200.avif 1200w
    "
    sizes="(max-width: 640px) 100vw, 800px"
  />

  <!-- WebP: great compression, 97%+ browser support -->
  <source
    type="image/webp"
    srcset="
      photo-400.webp   400w,
      photo-800.webp   800w,
      photo-1200.webp 1200w
    "
    sizes="(max-width: 640px) 100vw, 800px"
  />

  <!-- JPEG fallback: universal support -->
  <img
    src="photo-800.jpg"
    alt="Product photograph with format fallback chain"
    loading="lazy"
    width="800"
    height="500"
    decoding="async"
  />
</picture>`}
              </pre>
            </div>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              A browser that supports AVIF downloads the AVIF source. A browser
              that supports WebP but not AVIF downloads the WebP source. Any
              browser that supports neither (a vanishingly small fraction of
              users today) downloads the JPEG fallback. Every user gets the
              most compressed format their browser can handle, automatically.
            </p>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Note the{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">decoding=&quot;async&quot;</code>{" "}
              attribute on the fallback{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">img</code>.{" "}
              This tells the browser to decode the image off the main thread,
              keeping the page responsive during heavy image loads. Use this on
              all large images alongside{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">loading=&quot;lazy&quot;</code>{" "}
              for maximum performance benefit.
            </p>

            <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              Putting it all together: the practical optimization checklist
            </h2>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              You do not need to implement all 7 methods at once. Start with
              the highest-impact items and work down the list. Here is the
              priority order based on typical impact across most websites:
            </p>

            <div className="space-y-3 mb-6">
              {[
                {
                  step: "1",
                  action: "Compress all existing images",
                  impact: "Often 60–80% size reduction",
                },
                {
                  step: "2",
                  action: "Resize to actual display dimensions",
                  impact: "Can eliminate 90%+ of wasted pixels",
                },
                {
                  step: "3",
                  action: "Convert to WebP",
                  impact: "25–34% additional size reduction",
                },
                {
                  step: "4",
                  action: "Add loading='lazy' to below-fold images",
                  impact: "Cuts initial page weight dramatically",
                },
                {
                  step: "5",
                  action: "Add srcset and sizes for responsive images",
                  impact: "Reduces mobile bandwidth by 50–75%",
                },
                {
                  step: "6",
                  action: "Deploy a CDN",
                  impact: "Cuts latency for global users",
                },
                {
                  step: "7",
                  action: "Wrap images in picture element",
                  impact: "Ensures best format per browser",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-3 p-3 border border-gray-100 dark:border-[#2A2A2A] rounded-md"
                >
                  <span className="text-xs font-mono font-medium text-[#737373] bg-[#F5F5F5] dark:bg-[#1E1E1E] px-2 py-1 rounded shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-[#E5E5E5]">
                      {item.action}
                    </p>
                    <p className="text-xs text-[#737373] mt-0.5">{item.impact}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              After implementing these changes, test your pages with Google
              PageSpeed Insights or Lighthouse (available in Chrome DevTools
              under the Performance tab). Your LCP score should drop
              significantly, and the Opportunities section will confirm which
              image-related improvements have been applied. Aim for a LCP under
              2.5 seconds for a &ldquo;Good&rdquo; score- a target that is
              entirely achievable once images are properly optimized.
            </p>

            <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

            {/* FAQ */}
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
              FAQ
            </h2>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              What is the single most effective way to make images load faster?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Resizing to the correct display dimensions combined with
              compression. Serving a 4000px photo in a 800px column wastes more
              bandwidth than almost any other optimization mistake. Resize first,
              then compress- this combination typically reduces file size by
              90%+ compared to a raw camera file, with no visible difference on
              screen.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Does lazy loading hurt SEO?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              No - Google&apos;s crawler supports native lazy loading via the{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">loading=&quot;lazy&quot;</code>{" "}
              attribute and will index lazily loaded images correctly. The one
              exception: do not lazy-load your hero or primary content image.
              Deferring the LCP element delays Google&apos;s measurement of your
              LCP score and can actively hurt rankings.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Should I use WebP or AVIF in 2026?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Use both with a fallback chain via the{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#1E1E1E] px-1.5 py-0.5 rounded font-mono text-gray-700 dark:text-[#E5E5E5]">&lt;picture&gt;</code>{" "}
              element: AVIF as the first source (best compression), WebP as
              the second (excellent compression, near-universal support), and
              JPEG as the fallback. If you can only generate one format, WebP
              is the safe, high-value default.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              How do I know if my images are slowing down my site?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Run your URL through Google PageSpeed Insights (free, no account
              required). Look at the Opportunities section- it will specifically
              flag oversized images, next-gen format suggestions, and images
              that are not lazy loaded. The Diagnostics section shows exactly
              which images are contributing most to page weight and load time.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              What is a good target image file size for the web?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              For full-width hero images: under 200 KB. For article body images
              at 800px display width: under 100 KB. For thumbnails at 300px or
              less: under 30 KB. These are practical targets that balance visual
              quality with performance. At quality 80 WebP, most photographs
              easily hit these targets after proper resizing.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Do I need to use all 7 methods?
            </h3>
            <p className="text-sm text-[#737373] leading-relaxed mb-4">
              Not necessarily. Methods 1–4 (compress, convert to WebP, resize,
              and lazy load) alone will produce dramatic improvements for most
              sites. Methods 5–7 (responsive images, CDN, and picture element)
              add meaningful additional gains and are worth implementing for any
              site with significant traffic or a global audience. Even applying
              just the first two methods- compress and convert to WebP- will
              measurably improve your LCP score.
            </p>
          </div>

          {/* Share section */}
          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-[#2A2A2A]">
            <p className="text-sm font-medium text-gray-700 dark:text-[#E5E5E5] mb-3">
              Share this article
            </p>
            <div className="flex items-center gap-3">
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] rounded-md text-sm text-gray-600 dark:text-[#A3A3A3] hover:bg-gray-50 dark:hover:bg-[#252525] hover:text-gray-900 dark:hover:text-[#E5E5E5] transition-colors"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-label="Share on X (Twitter)"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
                Share on X
              </a>
              <a
                href={linkedinShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] rounded-md text-sm text-gray-600 dark:text-[#A3A3A3] hover:bg-gray-50 dark:hover:bg-[#252525] hover:text-gray-900 dark:hover:text-[#E5E5E5] transition-colors"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current"
                  aria-label="Share on LinkedIn"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Share on LinkedIn
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
                Start optimizing your images right now
              </h3>
              <p className="text-sm text-[#737373] mb-5">
                SammaPix tools run entirely in your browser- compress, convert
                to WebP, and resize images without uploading a single file to
                any server. Free, fast, and private.
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
                  href="/tools/webp"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-sm font-medium rounded-md text-gray-700 dark:text-[#E5E5E5] hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                >
                  Convert to WebP
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/tools/resizepack"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] text-sm font-medium rounded-md text-gray-700 dark:text-[#E5E5E5] hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                >
                  Resize Images
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>

          {/* Related articles */}
          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-4">
              Related articles
            </h3>
            <div className="space-y-3">
              <Link
                href="/blog/compress-images-without-losing-quality"
                className="flex items-start gap-3 group"
              >
                <span className="text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 text-green-700">
                  Optimization
                </span>
                <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                  Compress Images Without Losing Quality (2026)
                </span>
              </Link>
              <Link
                href="/blog/best-image-format-for-web-2026"
                className="flex items-start gap-3 group"
              >
                <span className="text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 text-green-700">
                  Optimization
                </span>
                <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                  Best Image Format for Web in 2026: WebP vs AVIF vs JPEG vs PNG
                </span>
              </Link>
              <Link
                href="/blog/complete-guide-webp-format"
                className="flex items-start gap-3 group"
              >
                <span className="text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 text-blue-700">
                  Guides
                </span>
                <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                  The Complete Guide to WebP Format
                </span>
              </Link>
              <Link
                href="/blog/optimize-images-wordpress-guide"
                className="flex items-start gap-3 group"
              >
                <span className="text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 text-green-700">
                  Optimization
                </span>
                <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                  How to Optimize Images in WordPress (Complete Guide)
                </span>
              </Link>
            </div>
          </div>
        </article>

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      </div>
    </div>
  );
}
