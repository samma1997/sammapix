import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "How to Optimize Images for WordPress (2026 Guide) | SammaPix",
  description:
    "Step-by-step guide to optimize images for WordPress in 2026. Compress, convert to WebP, resize, and strip EXIF data before uploading- improve Core Web Vitals and LCP scores.",
  alternates: {
    canonical: `${APP_URL}/blog/optimize-images-wordpress-guide`,
  },
  keywords: [
    "optimize images wordpress",
    "wordpress image optimization",
    "wordpress webp images",
    "compress images for wordpress",
    "wordpress core web vitals images",
    "wordpress image sizes",
    "wordpress lcp optimization",
    "wordpress image compression plugin",
  ],
  openGraph: {
    title: "How to Optimize Images for WordPress (2026 Guide)",
    description:
      "Most WordPress sites fail Core Web Vitals because of unoptimized images. Here is the exact workflow to compress, convert, resize, and clean every image before it hits your media library.",
    url: `${APP_URL}/blog/optimize-images-wordpress-guide`,
    type: "article",
    publishedTime: "2026-01-10",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Optimize Images for WordPress (2026 Guide)",
    description:
      "Compress, convert to WebP, resize, and strip EXIF metadata before uploading to WordPress. The complete image optimization workflow for 2026.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-01-10";
const POST_DATE_FORMATTED = "January 10, 2026";
const POST_URL = `${APP_URL}/blog/optimize-images-wordpress-guide`;
const POST_TITLE = "How to Optimize Images for WordPress: The Complete 2026 Guide";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Step-by-step guide to optimize images for WordPress in 2026. Compress, convert to WebP, resize, and strip EXIF data before uploading- improve Core Web Vitals and LCP scores.",
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
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
    "@id": POST_URL,
  },
  keywords: [
    "optimize images wordpress",
    "wordpress image optimization",
    "wordpress webp images",
    "compress images for wordpress",
    "wordpress core web vitals images",
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

const pluginComparison = [
  {
    name: "SammaPix (pre-upload)",
    approach: "Client-side, before upload",
    compression: "Excellent",
    webp: true,
    exifStrip: true,
    resize: true,
    privacy: true,
    serverLoad: "None",
    cost: "Free",
    highlight: true,
  },
  {
    name: "Smush",
    approach: "Server-side, after upload",
    compression: "Good",
    webp: false,
    exifStrip: true,
    resize: true,
    privacy: false,
    serverLoad: "Medium",
    cost: "Free / $7.08/mo",
    highlight: false,
  },
  {
    name: "ShortPixel",
    approach: "Cloud API, after upload",
    compression: "Excellent",
    webp: true,
    exifStrip: true,
    resize: true,
    privacy: false,
    serverLoad: "Low",
    cost: "Free (100/mo) / Paid",
    highlight: false,
  },
  {
    name: "Imagify",
    approach: "Cloud API, after upload",
    compression: "Excellent",
    webp: true,
    exifStrip: true,
    resize: true,
    privacy: false,
    serverLoad: "Low",
    cost: "Free (200/mo) / Paid",
    highlight: false,
  },
];

const steps = [
  {
    number: "01",
    title: "Compress before uploading",
    tool: "SammaPix Compress",
    href: "/tools/compress",
    color: "text-orange-700 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900",
    description:
      "Camera JPEGs are often 4–15 MB. WordPress will accept them, but it will store the original alongside every thumbnail it generates, bloating your media library immediately. Compress the source file to under 200–500 KB before you ever open the media uploader.",
    details: [
      "Drop your images into SammaPix Compress- no upload, no account required",
      "Set quality to 80% for photos, 85–90% for product or portfolio shots",
      "Batch compress an entire folder and download as ZIP in one step",
      "Files never leave your browser- safe for client work and private content",
    ],
  },
  {
    number: "02",
    title: "Convert to WebP",
    tool: "SammaPix WebP Converter",
    href: "/tools/webp",
    color: "text-blue-700 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900",
    description:
      "WordPress 5.8 added native WebP support. Every modern browser supports WebP. Uploading WebP instead of JPEG reduces file size by an additional 25–35% at equal visual quality- meaning faster page loads, better LCP scores, and lower storage costs.",
    details: [
      "Convert JPEG, PNG, and GIF files to WebP before uploading",
      "Use quality 80 for lossy (photos)- indistinguishable from the original",
      "WordPress will generate WebP thumbnails automatically from a WebP source",
      "No plugin needed for WebP delivery when you upload WebP directly",
    ],
  },
  {
    number: "03",
    title: "Resize to correct dimensions",
    tool: "SammaPix ResizePack",
    href: "/tools/resizepack",
    color: "text-green-700 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900",
    description:
      "A WordPress blog content area is typically 800–1200 px wide. Uploading a 6000 × 4000 px camera photo and relying on WordPress thumbnails still stores the 6000 px original on your server. Resize to the largest size you actually need before uploading.",
    details: [
      "Resize to match your theme's content width- usually 1200 px or 1440 px maximum",
      "For featured images: check your theme's featured image dimensions",
      "For product images (WooCommerce): match your theme's product image size setting",
      "Use 2x dimensions for retina if needed, but not camera-original 6000 px",
    ],
  },
  {
    number: "04",
    title: "Remove EXIF data for privacy",
    tool: "SammaPix EXIF Viewer",
    href: "/tools/exif",
    color: "text-purple-700 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900",
    description:
      "Every photo taken with a smartphone or modern camera embeds EXIF metadata- including GPS coordinates, device model, and date/time. WordPress does not strip this by default. Anyone who downloads your images can see exactly where they were taken.",
    details: [
      "Use EXIF Viewer to inspect what metadata is embedded before uploading",
      "Strip GPS location data, device identifiers, and shooting conditions",
      "Especially important for home business owners, family bloggers, and client photographers",
      "EXIF removal also reduces file size by a small but measurable amount",
    ],
  },
];

export default function OptimizeImagesWordPressGuidePage() {
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(POST_TITLE)}&url=${encodeURIComponent(POST_URL)}&via=lucasammarco`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(POST_URL)}`;

  return (
    <div className="py-12 px-4 sm:px-6 bg-white dark:bg-[#191919] min-h-screen">
      <div className="max-w-2xl mx-auto">

        {/* Back link */}
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
              <span className="text-[10px] font-medium bg-[#F5F5F5] dark:bg-[#252525] text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded border border-[#E5E5E5] dark:border-[#333] uppercase tracking-wide">
                WordPress
              </span>
              <span className="text-[10px] text-[#A3A3A3] dark:text-[#737373]">
                {POST_DATE_FORMATTED}
              </span>
              <span className="text-[10px] text-[#A3A3A3] dark:text-[#737373]">
                &middot; 11 min read
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-[#E5E5E5] leading-snug tracking-tight mb-4">
              {POST_TITLE}
            </h1>
            <p className="text-base text-gray-500 dark:text-[#A3A3A3] leading-relaxed">
              Images are the single largest cause of poor Core Web Vitals scores on WordPress sites. Most tutorials tell you to install a plugin and let it handle everything. This guide shows you a better approach- optimize images before they ever touch your media library- then explains how WordPress itself handles the rest.
            </p>
          </header>

          <div className="prose-custom space-y-0">

            {/* Why image optimization matters */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              Why image optimization matters for WordPress
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              WordPress powers over 43% of all websites on the internet. It is the most common platform- and unoptimized images are the most common performance problem. When Google runs a Lighthouse audit on your site, images are almost always the first item flagged.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The reason is direct: most WordPress users upload photos straight from their camera or phone. A single iPhone 15 photo can be 8–15 MB. A post with five hero images at that size downloads 40–75 MB before the page renders. On a 4G connection, that is a 10–15 second load time - Google considers anything above 2.5 seconds a failing LCP score.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              According to{" "}
              <a
                href="https://web.dev/articles/lcp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                Google&apos;s Largest Contentful Paint guidance
              </a>
              , a &ldquo;good&rdquo; LCP score is under 2.5 seconds. LCP is almost always driven by the largest image on screen- typically a hero image, featured image, or product photo. The fastest path to a better LCP score is a smaller, properly formatted image delivered quickly.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Core Web Vitals are a direct Google ranking signal since 2021. A poor LCP score does not just hurt user experience- it measurably suppresses your search rankings relative to competitors whose pages load faster.
            </p>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                alt="Website analytics dashboard showing performance metrics and Core Web Vitals"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                Core Web Vitals scores are directly tied to image weight - Photo by Carlos Muza on Unsplash
              </figcaption>
            </figure>

            {/* Common mistakes */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              The most common WordPress image mistakes
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Before walking through the correct workflow, it helps to name what most people get wrong. These are the patterns that cause the most damage to WordPress performance:
            </p>

            <div className="space-y-3 mb-6">
              {[
                {
                  mistake: "Uploading camera originals directly",
                  impact: "A 5–15 MB camera JPEG becomes your media library's &ldquo;full size&rdquo; original. WordPress thumbnails are generated from this file and stored alongside it. Your server accumulates enormous files it should never have received.",
                },
                {
                  mistake: "Relying entirely on plugins to fix bad uploads",
                  impact: "Plugins like Smush or Imagify compress and convert images after upload, but the originals are still stored on your server. Every thumbnail generation on upload, every image edit in the media library, every backup- all operate on the oversized original.",
                },
                {
                  mistake: "Uploading JPEG when WebP is supported",
                  impact: "WordPress has accepted WebP uploads since version 5.8. Uploading JPEG in 2026 means serving files 25–35% larger than necessary to every visitor whose browser supports WebP- which is 97%+ of all browsers globally.",
                },
                {
                  mistake: "Uploading images much wider than the content area",
                  impact: "A 6000 px wide photo uploaded to a blog with a 900 px content column means WordPress serves a thumbnail from a 6000 px source. That source is stored on disk and used for every thumbnail crop- including retina sizes. Resize before uploading to match actual display dimensions.",
                },
                {
                  mistake: "Ignoring EXIF metadata",
                  impact: "GPS coordinates, device model, and timestamp are embedded in every phone photo. WordPress does not strip EXIF data on upload. Every image you publish potentially broadcasts your location.",
                },
              ].map(({ mistake, impact }) => (
                <div
                  key={mistake}
                  className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md px-4 py-3"
                >
                  <p className="text-xs font-semibold text-gray-800 dark:text-[#E5E5E5] mb-1 flex items-center gap-2">
                    <X className="h-3.5 w-3.5 text-red-500 dark:text-red-400 shrink-0" strokeWidth={2} />
                    {mistake}
                  </p>
                  <p
                    className="text-xs text-gray-500 dark:text-[#737373] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: impact }}
                  />
                </div>
              ))}
            </div>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"
                alt="Photographer reviewing images on camera screen with laptop nearby"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                Camera originals should never go straight into the WordPress media library - Photo by ShareGrid on Unsplash
              </figcaption>
            </figure>

            {/* The 4-step workflow */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-2">
              The correct workflow: optimize before you upload
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-6">
              The most effective approach is a four-step pre-upload workflow. Run these steps on every image before it touches your WordPress media library. All four can be done entirely in your browser- no uploads to third-party servers, no plugins required at this stage.
            </p>

            <div className="space-y-6 mb-4">
              {steps.map(({ number, title, tool, href, color, bg, description, details }) => (
                <div
                  key={number}
                  className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden"
                >
                  <div className={`px-5 py-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${bg}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-semibold text-gray-400 dark:text-[#737373] tracking-widest">
                            STEP {number}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5]">
                          {title}
                        </h3>
                        <Link
                          href={href}
                          className={`text-xs font-medium ${color} hover:underline`}
                        >
                          {tool} &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
                      {description}
                    </p>
                    <ul className="space-y-2">
                      {details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mt-0.5 shrink-0" strokeWidth={2} />
                          <span className="text-xs text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Inline CTA */}
            <Link
              href="/tools/compress"
              className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-6 mb-8"
            >
              <div>
                <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">
                  Free- no signup, no upload, no limits
                </p>
                <p className="text-sm font-semibold text-white leading-snug">
                  Start with SammaPix Compress- process all four steps before your next WordPress upload
                </p>
              </div>
              <ArrowRight
                className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
                strokeWidth={1.5}
              />
            </Link>

            {/* WordPress image settings */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              WordPress image settings you should configure
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Once your images are pre-optimized, there are several WordPress settings worth reviewing. These control how WordPress handles images after upload- including thumbnail generation, maximum upload size, and srcset behavior.
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Media settings (Settings &rarr; Media)
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              WordPress generates three default thumbnail sizes on every upload: thumbnail (150×150), medium (300×300), and large (1024×1024). It also keeps the full original. This means a single upload creates four files on disk.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Review these sizes and align them with what your theme actually uses. There is no benefit to generating sizes your theme never requests. You can disable unused sizes or adjust dimensions under Settings &rarr; Media in the WordPress admin. The official{" "}
              <a
                href="https://developer.wordpress.org/apis/handbook/file-header/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                WordPress developer documentation
              </a>{" "}
              covers media handling in detail.
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Responsive images and srcset
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              WordPress automatically adds <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-700 dark:text-[#D4D4D4]">srcset</code> attributes to images inserted via the block editor or <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-700 dark:text-[#D4D4D4]">wp_get_attachment_image()</code>. This tells the browser to download only the size appropriate for the current viewport- a mobile visitor gets a 480 px image rather than a 1400 px one.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              This system works best when you have uploaded images wider than the largest display size you need, so WordPress has something to downscale from. If you uploaded a 1200 px image and your theme requests a 1400 px thumbnail, WordPress will serve the 1200 px original with no downscaling- this is why correct pre-upload resizing matters.
            </p>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&q=80"
                alt="WordPress admin dashboard on a computer screen"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                WordPress generates multiple thumbnail sizes from every uploaded image - Photo by Stephen Phillips on Unsplash
              </figcaption>
            </figure>

            {/* Lazy loading */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              Lazy loading in WordPress
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              WordPress has added the <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-700 dark:text-[#D4D4D4]">loading=&quot;lazy&quot;</code> attribute to images automatically since version 5.5. This tells the browser to defer loading images that are below the fold- images not visible in the initial viewport are only downloaded when the user scrolls near them.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The one important exception: your hero image or the Largest Contentful Paint image should never be lazy loaded. WordPress applies <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-700 dark:text-[#D4D4D4]">loading=&quot;eager&quot;</code> to the first image in the content area since 6.3- but if your theme controls the hero image independently, verify that it is not lazy loaded.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              You can read the full implementation details and browser compatibility notes in{" "}
              <a
                href="https://web.dev/articles/browser-level-image-lazy-loading"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                Google&apos;s guide to browser-level lazy loading
              </a>
              .
            </p>

            {/* CDN for images */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              CDN for WordPress images
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Even perfectly compressed images load slowly if they are served from a single origin server far from the visitor. A Content Delivery Network (CDN) distributes your static assets- including images- across servers globally, so each visitor downloads images from a location geographically close to them.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              For WordPress, the simplest CDN path is Cloudflare. The free tier proxies your entire site through their global network, caching images at edge nodes worldwide. This alone can reduce image delivery latency by 50–80% for visitors outside your origin server&apos;s region.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Alternatives include Bunny CDN (very affordable, excellent for WordPress), KeyCDN, and the Jetpack CDN feature (free for WordPress.com-connected sites). If your hosting plan includes a CDN - WP Engine, Kinsta, and Cloudways all do- make sure it is enabled for the <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-700 dark:text-[#D4D4D4]">/wp-content/uploads/</code> path.
            </p>

            {/* WebP delivery: plugins vs pre-conversion */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              WebP delivery: plugins vs pre-conversion
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              There are two approaches to serving WebP on WordPress. Understanding the difference helps you choose the one that fits your workflow.
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Plugin-based server-side conversion
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Plugins like ShortPixel, Imagify, and WebP Express generate WebP versions of your uploaded JPEGs and PNGs on the server. They then serve the WebP version to browsers that support it (detected via the <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded text-gray-700 dark:text-[#D4D4D4]">Accept: image/webp</code> request header) and fall back to the original for browsers that do not.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The advantage: it handles conversion automatically. The disadvantage: your server stores both the original and the WebP version of every image and every thumbnail- potentially doubling your storage footprint. It also uses server CPU or an external API quota on every new upload.
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Pre-conversion before upload (recommended)
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The cleaner approach is to convert images to WebP before uploading. WordPress 5.8+ accepts WebP uploads natively and generates WebP thumbnails from a WebP source. No plugin needed for WebP delivery- you are serving WebP directly, not converting on the fly.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              This approach means your media library contains only WebP files. Smaller originals, smaller thumbnails, no duplicate storage, no server-side conversion overhead. The{" "}
              <Link
                href="/tools/webp"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix WebP Converter
              </Link>{" "}
              handles the conversion in your browser before anything reaches WordPress.
            </p>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85f1d7?w=800&q=80"
                alt="Developer reviewing website performance data on multiple screens"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                Pre-converting to WebP before upload eliminates the need for server-side conversion plugins - Photo by Ilya Pavlov on Unsplash
              </figcaption>
            </figure>

            {/* Plugin comparison */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-4">
              Comparison: SammaPix workflow vs Smush vs ShortPixel vs Imagify
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-4">
              All four approaches can produce well-optimized WordPress images. The differences come down to where optimization happens, what you store on disk, and what it costs.
            </p>

            <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
              <table className="w-full text-xs border-collapse min-w-[580px]">
                <thead>
                  <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">Tool</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">Approach</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">WebP</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">EXIF Strip</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">Privacy</th>
                    <th className="text-left py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {pluginComparison.map((row, i) => (
                    <tr
                      key={row.name}
                      className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${
                        row.highlight
                          ? "bg-indigo-50/50 dark:bg-indigo-950/10"
                          : i % 2 === 0
                          ? ""
                          : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"
                      }`}
                    >
                      <td className={`py-2 px-3 font-medium ${row.highlight ? "text-indigo-700 dark:text-indigo-400" : "text-gray-800 dark:text-[#E5E5E5]"}`}>
                        {row.name}
                        {row.highlight && (
                          <span className="ml-2 text-[10px] bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-800 uppercase tracking-wide font-medium">
                            Recommended
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-gray-500 dark:text-[#737373]">{row.approach}</td>
                      <td className="py-2 px-3 text-center">
                        {row.webp
                          ? <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mx-auto" strokeWidth={2} />
                          : <X className="h-3.5 w-3.5 text-red-500 mx-auto" strokeWidth={2} />}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {row.exifStrip
                          ? <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mx-auto" strokeWidth={2} />
                          : <X className="h-3.5 w-3.5 text-red-500 mx-auto" strokeWidth={2} />}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {row.privacy
                          ? <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mx-auto" strokeWidth={2} />
                          : <X className="h-3.5 w-3.5 text-red-500 mx-auto" strokeWidth={2} />}
                      </td>
                      <td className="py-2 px-3 text-gray-500 dark:text-[#737373]">{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              ShortPixel and Imagify are both excellent plugins for teams who need server-side automation- especially for large existing libraries with thousands of images already uploaded. The free quotas (100/month and 200/month respectively) are suitable for low-volume sites, but grow expensive at scale.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Smush from WPMU DEV is the most widely installed WordPress image optimization plugin with over one million active installs. Its free tier compresses and strips EXIF metadata, but WebP conversion requires the paid Smush Pro plan. For most new WordPress projects in 2026, the pre-upload workflow using SammaPix avoids both plugin complexity and recurring costs.
            </p>

            {/* Summary checklist */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              Complete WordPress image optimization checklist for 2026
            </h2>

            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A] mb-6">
              {[
                { text: "Compress images to under 200–500 KB before uploading", done: true },
                { text: "Convert to WebP format before uploading (WordPress 5.8+ accepts WebP natively)", done: true },
                { text: "Resize to match your theme's maximum display width- typically 1200–1440 px", done: true },
                { text: "Strip EXIF metadata, especially GPS location data", done: true },
                { text: "Review WordPress Media settings and remove unused thumbnail sizes", done: true },
                { text: "Verify your hero / LCP image is not lazy loaded", done: true },
                { text: "Enable a CDN for your uploads directory (Cloudflare, Bunny CDN, or hosting CDN)", done: true },
                { text: "Test Core Web Vitals with PageSpeed Insights after publishing image-heavy pages", done: true },
              ].map(({ text, done }) => (
                <div key={text} className="flex items-start gap-3 px-4 py-3">
                  <Check className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${done ? "text-green-600 dark:text-green-500" : "text-gray-300 dark:text-[#525252]"}`} strokeWidth={2} />
                  <span className="text-xs text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{text}</span>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Does WordPress automatically optimize images when I upload them?",
                    a: "WordPress resizes images to generate thumbnails and adds srcset attributes for responsive delivery. It does not compress the original, convert to WebP, or strip EXIF metadata. Those optimizations must be done before uploading or via a plugin after the fact.",
                  },
                  {
                    q: "What image size should I upload to WordPress?",
                    a: "Upload images no wider than the largest size your theme will display- typically 1200–1440 px for full-width images and 800–1200 px for content column images. Uploading camera originals at 6000+ px gives WordPress a source file it will never use at full size and stores needless data on disk.",
                  },
                  {
                    q: "Should I use WebP or JPEG for WordPress in 2026?",
                    a: "WebP. WordPress accepts WebP uploads natively since version 5.8, and over 97% of browsers support WebP globally. Uploading WebP instead of JPEG means your media library stores smaller originals and generates smaller thumbnails- no plugin needed for WebP delivery.",
                  },
                  {
                    q: "Does WordPress strip EXIF metadata on upload?",
                    a: "No. WordPress does not strip EXIF data by default. GPS coordinates, device model, and timestamp remain embedded in uploaded images. Use SammaPix EXIF Viewer to inspect and remove metadata before uploading, or configure a plugin like Imagify or ShortPixel to strip EXIF on upload.",
                  },
                  {
                    q: "Is Smush better than ShortPixel for WordPress?",
                    a: "Both are solid plugins, but they target different needs. Smush is a good free option for basic compression and EXIF stripping, but WebP conversion requires the paid plan. ShortPixel includes WebP on its free tier (100 images/month) and achieves slightly better compression ratios. For unlimited free optimization, the pre-upload approach using SammaPix outperforms both.",
                  },
                  {
                    q: "How do I check if my WordPress images are affecting Core Web Vitals?",
                    a: "Run your page URL through PageSpeed Insights (pagespeed.web.dev) or Google Search Console's Core Web Vitals report. Look for 'Properly size images', 'Serve images in next-gen formats', and 'Efficiently encode images' in the Opportunities section. These three flags together indicate unoptimized images are hurting your LCP score.",
                  },
                ].map(({ q, a }) => (
                  <div key={q}>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mb-1.5">{q}</h3>
                    <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>

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
                <svg role="img" viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-label="Share on X (Twitter)">
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
                <svg role="img" viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-label="Share on LinkedIn">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Share on LinkedIn
              </a>
            </div>
          </div>

          {/* End CTA */}
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
                Optimize your WordPress images before the next upload
              </h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
                Compress, convert to WebP, resize, and strip EXIF metadata in seconds- all in your browser, no upload required. Free with no limits.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/tools/compress"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  Compress images
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
                <Link
                  href="/tools/webp"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#333] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                >
                  Convert to WebP
                </Link>
                <Link
                  href="/tools/resizepack"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#333] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                >
                  Resize images
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
              {[
                {
                  href: "/blog/complete-guide-webp-format",
                  tag: "Formats",
                  tagColor: "text-blue-700",
                  title: "The Complete Guide to WebP: Why Every Photographer Should Use It",
                },
                {
                  href: "/blog/best-image-compression-tools-2026",
                  tag: "Comparison",
                  tagColor: "text-orange-700",
                  title: "Best Free Image Compression Tools in 2026 - Compared",
                },
                {
                  href: "/blog/remove-exif-protect-privacy",
                  tag: "Privacy",
                  tagColor: "text-purple-700",
                  title: "How to Remove EXIF Data and Protect Your Privacy Online",
                },
                {
                  href: "/blog/compress-images-without-losing-quality",
                  tag: "Performance",
                  tagColor: "text-green-700",
                  title: "How to Compress Images Without Losing Quality",
                },
              ].map(({ href, tag, tagColor, title }) => (
                <Link key={href} href={href} className="flex items-start gap-3 group">
                  <span className={`text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 ${tagColor}`}>
                    {tag}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                    {title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </article>

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </div>
    </div>
  );
}
