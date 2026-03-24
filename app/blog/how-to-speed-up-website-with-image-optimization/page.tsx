import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Speed Up Your Website with Image Optimization (Complete Guide)",
  description:
    "Images account for 50-75% of total page weight. Learn the 5-step image optimization workflow that directly improves Core Web Vitals, LCP scores, and conversions.",
  alternates: {
    canonical: `${APP_URL}/blog/how-to-speed-up-website-with-image-optimization`,
  },
  keywords: [
    "speed up website image optimization",
    "website speed images",
    "optimize images for page speed",
    "core web vitals images",
    "LCP optimization images",
    "image optimization for web",
    "reduce page load time images",
    "web performance images",
  ],
  openGraph: {
    title: "How to Speed Up Your Website with Image Optimization (Complete Guide)",
    description:
      "The complete guide to speeding up your website with image optimization: 5-step workflow, Core Web Vitals, WordPress tips, e-commerce bulk processing, and free tools.",
    url: `${APP_URL}/blog/how-to-speed-up-website-with-image-optimization`,
    type: "article",
    publishedTime: "2026-03-22",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Speed Up Your Website with Image Optimization (Complete Guide)",
    description:
      "Images are the #1 cause of slow websites. Learn the exact 5-step workflow to optimize images for page speed and improve Core Web Vitals scores.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "How to Speed Up Your Website with Image Optimization (Complete Guide)",
  description:
    "Images account for 50-75% of total page weight on most websites. Optimizing images is the single most impactful action to improve page speed, directly affecting Core Web Vitals scores like LCP (Largest Contentful Paint).",
  url: `${APP_URL}/blog/how-to-speed-up-website-with-image-optimization`,
  datePublished: "2026-03-22",
  dateModified: "2026-03-22",
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
    "@id": `${APP_URL}/blog/how-to-speed-up-website-with-image-optimization`,
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
      name: "How to Speed Up Your Website with Image Optimization",
      item: `${APP_URL}/blog/how-to-speed-up-website-with-image-optimization`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much can image optimization speed up my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Image optimization typically reduces page load time by 40-70%. The average webpage is 2.5MB, with images accounting for roughly 1.5MB of that weight. Compressing and resizing images to appropriate dimensions can reduce that payload to under 400KB, cutting load times by several seconds on average connections. Every 100ms improvement in load time correlates with approximately 1% more conversions, according to Google's research.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good image file size for web?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most web images, aim for under 200KB per image. Hero images and full-width banners should stay under 300KB. Blog post body images typically work well at 80-150KB. Product thumbnails should be under 50KB. These targets are achievable with WebP format at quality 80-82 and proper resizing to display dimensions. Images above 500KB are almost always unnecessarily large for web display.",
      },
    },
    {
      "@type": "Question",
      name: "Does image compression affect SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Image compression improves SEO. Smaller images mean faster page loads, which directly improves Core Web Vitals scores. Google uses page speed as a ranking signal, and LCP (Largest Contentful Paint) is an image in approximately 70% of web pages. Compressing your hero image and other large images is one of the fastest ways to improve your LCP score and search rankings. Compression does not affect alt text, filenames, or any other SEO metadata.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use WebP or JPEG for my website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use WebP as your primary format. WebP files are 25-34% smaller than equivalent JPEGs at the same perceptual quality, and browser support reached 97% in 2026, making it effectively universal. The only reason to keep JPEG is compatibility with legacy systems or email clients that do not support WebP. For any modern website, converting images to WebP before upload is the single fastest format change you can make to reduce page weight.",
      },
    },
    {
      "@type": "Question",
      name: "How do I optimize images for mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Optimize images for mobile by implementing responsive images using the srcset attribute to serve different sizes based on screen width. A mobile screen rarely exceeds 428px wide, so serving a 1200px image on mobile wastes significant bandwidth. Use sizes attribute to describe the image's display size at each breakpoint. Combine this with WebP format and quality 78-82 for maximum efficiency. Lazy loading images below the fold with loading='lazy' also prevents unnecessary downloads on initial page load.",
      },
    },
  ],
};

const POST_DATE = "2026-03-22";
const POST_DATE_FORMATTED = "March 22, 2026";
const POST_URL = `${APP_URL}/blog/how-to-speed-up-website-with-image-optimization`;
const POST_TITLE =
  "How to Speed Up Your Website with Image Optimization (Complete Guide)";

export default function SpeedUpWebsiteImageOptimizationPage() {
  return (
    <>
      <BlogArticleLayout
        title="How to Speed Up Your Website with Image Optimization (Complete Guide)" 
        slug="how-to-speed-up-website-with-image-optimization"
        description="Images account for 50-75% of total page weight on most websites. Optimizing images is the single most impactful action to improve page speed, directly affecting Core Web Vitals scores like LCP (Largest Contentful Paint). This guide gives you the exact workflow professionals use- from resizing to lazy loading- along with platform-specific tips for WordPress and e-commerce sites."
        date="2026-03-22"
        dateFormatted="March 22, 2026"
        tags={["Performance"]}
        readingTime={11}
        headings={[
          { id: "why-images-kill-speed", title: "Why images kill your page speed" },
          { id: "5-step-workflow", title: "The 5-step image optimization workflow" },
          { id: "core-web-vitals", title: "Core Web Vitals and images: what actually matters" },
          { id: "wordpress", title: "WordPress image optimization" },
          { id: "ecommerce", title: "E-commerce image optimization" },
          { id: "free-tools", title: "Free tools to optimize images for page speed" },
          { id: "faq", title: "FAQ" }
        ]}
        summary={[
          "Images account for roughly 1.5MB of the average 2.5MB webpage - optimizing them is the single highest-impact performance improvement available.",
          "Resize to display dimensions first (2x for retina), then convert to WebP, then compress at quality 78-82 for the maximum size reduction.",
          "Your hero image is almost certainly your LCP element - compress it under 150KB and add fetchpriority high for the biggest Core Web Vitals win.",
          "Use responsive images with srcset to avoid serving 1600px images to 375px mobile screens - a 94% reduction in pixel count.",
          "Apply loading lazy to all images below the fold but never to your hero image, which must load eagerly."
        ]}
        heroImage={
          <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                alt="Website performance dashboard showing page speed metrics and Core Web Vitals"
                className="w-full rounded-lg"
                loading="eager"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                Page speed is a direct ranking signal — and images are almost always the biggest bottleneck — Photo by Carlos Muza on Unsplash
              </figcaption>
            </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Optimize your images now — free, no upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Drop your images into SammaPix and reduce file sizes by up to 80% in seconds. Compress, convert to WebP, and batch process entire folders — all in your browser, with no server upload and no account required.
            </p>
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Try SammaPix — Free
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >


            <h2 id="why-images-kill-speed" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight" >
              Why images kill your page speed
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The average webpage in 2026 weighs approximately 2.5MB.{" "}
              <a
                href="https://httparchive.org/reports/page-weight"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                HTTP Archive data
              </a>{" "}
              consistently shows that images account for roughly 1.5MB of that
              total- more than all JavaScript, CSS, and HTML combined. When a
              page takes four seconds to load, images are the culprit in nearly
              every case.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The business impact is direct and measurable. Google&apos;s own
              research found that every 100ms of additional load time reduces
              conversions by approximately 1%. For an e-commerce store doing
              $50,000 per month, a two-second improvement in load time is worth
              roughly $12,000 in additional annual revenue- with zero additional
              traffic required.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The good news: image optimization is largely a solved problem. A
              systematic workflow applied once to your existing image library
              can cut your total page weight by 60-80%. This guide walks through
              that workflow step by step.
            </p>

            <h2 id="5-step-workflow" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight" >
              The 5-step image optimization workflow
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              These five steps, applied in order, produce the maximum page
              speed improvement with the least effort. Skip any step and you
              leave significant performance on the table.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Step 1 — Resize to display dimensions
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              This is the single highest-impact step and the most commonly
              skipped. A modern smartphone camera produces images at 4000-6000
              pixels wide. If your blog content column is 800px wide, you are
              serving 25-56 times more pixels than the browser will ever
              display.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The rule is simple: never upload an image wider than the maximum
              display size, multiplied by 2 for retina screens. For a standard
              blog post with an 800px column, the correct image width is 1600px.
              For a 1200px hero image, upload at 2400px. A photo resized from
              5000px to 1600px loses around 90% of its pixel count- and
              therefore 80-90% of its uncompressed file size- before any
              compression is even applied.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Step 2 — Choose the right format
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Use WebP as your default for everything. WebP is 25-34% smaller
              than JPEG at equivalent visual quality, supports transparency like
              PNG, and works in 97%+ of browsers as of 2026. There is no
              meaningful reason to serve JPEG on a new website.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The format decision tree is straightforward: photographs and
              editorial images go to WebP (lossy). Logos, screenshots, and UI
              elements with transparency also go to WebP (lossless mode), or
              PNG if you need maximum compatibility. Animated images use WebP
              animation or short MP4 video, which is dramatically more efficient
              than GIF.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              You can convert any JPG or PNG to WebP in seconds using the{" "}
              <Link
                href="/tools/webp"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix WebP converter
              </Link>
              . No upload required- conversion happens entirely in your browser.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Step 3 — Compress with optimal quality settings
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              After resizing and converting to WebP, compression is the final
              file size lever. Quality 78-82 is the proven sweet spot for web
              images. At quality 80, the output is visually indistinguishable
              from the original at normal viewing distances and screen sizes.
              At quality 95, the file is typically 2-3x larger with no visible
              improvement on screen.
            </p>
            <ul className="mb-4">
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Hero images and banners:</strong> quality 82, max 300KB target
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Blog post body images:</strong> quality 80, 80-150KB target
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Thumbnails and previews:</strong> quality 75, under 50KB target
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Product photos (e-commerce):</strong> quality 82, under 200KB target
              </li>
            </ul>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Step 4 — Use responsive images with srcset
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Even after resizing to a reasonable maximum width, you are still
              serving a 1600px image to users on a 375px mobile screen. The
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">srcset</code>
              and
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">sizes</code>
              attributes tell the browser which image size to download based
              on the actual display width.
            </p>
            <div className="my-4 rounded-md border border-gray-200 dark:border-[#2A2A2A] overflow-hidden">
              <div className="bg-gray-50 dark:bg-[#252525] px-4 py-2 border-b border-gray-200 dark:border-[#2A2A2A]">
                <span className="text-xs font-mono text-gray-500 dark:text-[#737373]">HTML</span>
              </div>
              <pre className="px-4 py-3 text-xs font-mono text-gray-700 dark:text-[#A3A3A3] overflow-x-auto leading-relaxed">
{`<img
  src="hero-800.webp"
  srcset="
    hero-400.webp  400w,
    hero-800.webp  800w,
    hero-1600.webp 1600w
  "
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 80vw,
         1200px"
  alt="Hero image description"
  width="1600"
  height="900"
/>`}
              </pre>
            </div>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              With this markup, a mobile user on a 375px screen downloads the
              400px image instead of the 1600px version- a 94% reduction in
              pixel count before compression is even counted.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Step 5 — Lazy load below-the-fold images
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Images below the visible viewport on page load do not need to
              download immediately. The native
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">loading=&quot;lazy&quot;</code>
              attribute defers loading until the user scrolls toward the image.
              This is now supported in all major browsers with zero JavaScript
              required.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              One critical rule: never apply lazy loading to your hero image or
              the first visible image on the page. The LCP element must load
              eagerly. Apply
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">loading=&quot;eager&quot;</code>
              and
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">fetchpriority=&quot;high&quot;</code>
              to your hero image, and
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">loading=&quot;lazy&quot;</code>
              to every other image on the page.
            </p>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
                alt="Developer reviewing website performance code on a laptop screen"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                A systematic image optimization workflow eliminates the most common source of slow page loads — Photo by Fotis Fotopoulos on Unsplash
              </figcaption>
            </figure>

            <h2 id="core-web-vitals" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight" >
              Core Web Vitals and images: what actually matters
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Google&apos;s{" "}
              <a
                href="https://web.dev/articles/vitals"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                Core Web Vitals
              </a>{" "}
              framework measures three user experience metrics that directly
              affect search rankings. Two of the three are directly controlled
              by how you handle images.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              LCP (Largest Contentful Paint): compress your hero image first
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              LCP measures how long it takes for the largest visible content
              element to render. According to web.dev, the LCP element is an
              image in approximately 70% of all web pages. A good LCP score is
              under 2.5 seconds. Anything above 4 seconds is classified as
              &ldquo;Poor&rdquo; and directly suppresses your search rankings.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Your hero image is almost certainly your LCP element. Compress it
              aggressively- target under 150KB if possible. Add
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">fetchpriority=&quot;high&quot;</code>
              to tell the browser to prioritize it above other resources. If
              your hero is set as a CSS background image, move it to an
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">&lt;img&gt;</code>
              tag so the browser can discover and preload it earlier.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              CLS (Cumulative Layout Shift): always set width and height
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              CLS measures visual stability- how much the page jumps around as
              content loads. Images without explicit
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">width</code>
              and
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">height</code>
              attributes cause the browser to reserve no space for them during
              initial layout. When the image finally loads, the entire page
              reflows- buttons move, text jumps, users accidentally click the
              wrong thing.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The fix is mechanical: always add
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">width</code>
              and
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">height</code>
              attributes to every image tag. Modern browsers use these values
              to calculate the correct aspect ratio and reserve space before
              the image loads, eliminating layout shift entirely.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              How to check your scores
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Use{" "}
              <a
                href="https://pagespeed.web.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                PageSpeed Insights
              </a>{" "}
              to measure your current Core Web Vitals scores. Enter any URL and
              it runs a real-device test from Google&apos;s servers, showing
              both field data (from real users in Chrome) and lab data
              (simulated). The Opportunities section will specifically flag
              oversized images, images missing
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">width</code>
              and
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">height</code>,
              and images not served in next-gen formats.
            </p>

            <h2 id="wordpress" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight" >
              WordPress image optimization
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              WordPress is the most common CMS in the world, and image handling
              is one of its most commonly misconfigured aspects. These
              WordPress-specific steps address the most impactful issues.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
              Convert images to WebP before uploading.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The cleanest approach is to convert and compress images before
              they ever enter the WordPress media library. This gives you full
              control over the output quality and avoids reliance on plugin
              behavior. Batch-convert your images to WebP using a tool like{" "}
              <Link
                href="/tools/webp"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix
              </Link>{" "}
              and upload the optimized files directly.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
              Disable WordPress&apos;s big image scaling if using pre-optimized images.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              WordPress 5.3 introduced automatic downscaling of images larger
              than 2560px. If you are uploading pre-optimized images at correct
              display sizes, this feature is irrelevant and can be disabled by
              adding
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">add_filter(&apos;big_image_size_threshold&apos;, &apos;__return_false&apos;);</code>
              to your theme&apos;s functions.php.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
              Use a CDN for image delivery.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Even perfectly optimized images load faster when served from a
              CDN edge node close to your visitors. Cloudflare&apos;s free tier
              is sufficient for most WordPress sites. Enable Cloudflare Polish
              (available on paid plans) to automatically convert images to WebP
              at the CDN level if you cannot pre-convert them.
            </p>

            <h2 id="ecommerce" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight" >
              E-commerce image optimization
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              E-commerce sites have a unique challenge: large product catalogs
              with dozens to thousands of images, all of which need to be
              high-quality enough to convert buyers while being small enough
              not to kill page speed. The stakes are higher because slow
              product pages directly reduce sales.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Product photo standards
            </h3>

            <ul className="mb-4">
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Main product images:</strong> WebP, quality 82, max 1200px wide, target under 200KB
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Product thumbnails (gallery, listing pages):</strong> WebP, quality 75, max 400px wide, target under 40KB
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Zoom views (if supported):</strong> WebP, quality 85, max 2400px, loaded only on user interaction
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">Background and lifestyle images:</strong> WebP, quality 80, max 1400px wide
              </li>
            </ul>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Bulk processing for large catalogs
            </h3>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              For catalogs with hundreds of product images, manual optimization
              is not practical. A batch workflow is essential. Organize your
              source images into folders by type (main images, thumbnails,
              lifestyle shots), then process each folder with a consistent
              preset: WebP conversion at the appropriate quality and maximum
              dimension for that image type.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The{" "}
              <Link
                href="/tools/compress"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix Compress tool
              </Link>{" "}
              handles batch processing directly in the browser- drag in an
              entire folder, set your quality target, and download a ZIP of
              all compressed images. No upload to a server, no API key, no
              monthly limits. For catalogs above 50 images at a time, the
              Pro plan removes the batch size limit entirely.
            </p>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80"
                alt="E-commerce product catalog with optimized images improving page load speed"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                E-commerce product pages with heavy image catalogs benefit most from a consistent optimization workflow — Photo by Markus Spiske on Unsplash
              </figcaption>
            </figure>

            <h2 id="free-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight" >
              Free tools to optimize images for page speed
            </h2>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Several reliable tools are available for image optimization. The
              right choice depends on your workflow and volume requirements.
            </p>

            <ul className="mb-4">
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">
                  <Link
                    href="/tools/compress"
                    className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
                  >
                    SammaPix
                  </Link>
                  :
                </strong>{" "}
                Browser-based, no upload required, batch processing, WebP
                conversion, quality slider with live file size preview.
                Your images never leave your device. Free for up to 20 files
                per batch.
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">
                  <a
                    href="https://squoosh.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
                  >
                    Squoosh
                  </a>
                  :
                </strong>{" "}
                Google&apos;s browser-based tool with side-by-side quality
                comparison. Excellent for single images where you want to
                fine-tune compression settings visually. No batch support.
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">
                  <a
                    href="https://tinypng.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
                  >
                    TinyPNG
                  </a>
                  :
                </strong>{" "}
                Server-based compression for PNG and JPEG. Simple interface,
                good compression ratios. Images are uploaded to their servers.
                Free tier limited to 20 images per month.
              </li>
              <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
                <strong className="text-gray-800 dark:text-[#E5E5E5]">
                  <a
                    href="https://imageoptim.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors"
                  >
                    ImageOptim
                  </a>
                  :
                </strong>{" "}
                macOS desktop app that applies multiple optimizers in sequence.
                Excellent for local batch processing. Mac-only, no WebP output.
              </li>
            </ul>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-gray-200 dark:border-[#2A2A2A] rounded-md overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#252525]">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Tool</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Upload required</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">WebP output</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-700 dark:text-[#E5E5E5] border-b border-gray-200 dark:border-[#2A2A2A]">Batch free</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                    <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">SammaPix</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">No</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Yes</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Up to 20 files</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                    <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">Squoosh</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">No</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Yes</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">No (single file)</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-[#2A2A2A]">
                    <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">TinyPNG</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Yes</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Paid only</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">20/month</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-800 dark:text-[#E5E5E5] font-medium">ImageOptim</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">No (desktop)</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">No</td>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-[#A3A3A3]">Yes (Mac only)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <hr className="my-8 border-gray-100 dark:border-[#2A2A2A]" />

            <h2 id="faq" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight" >
              FAQ
            </h2>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              How much can image optimization speed up my website?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Image optimization typically reduces page load time by 40-70%.
              The average webpage weighs 2.5MB, with images accounting for
              roughly 1.5MB. Compressing and resizing to appropriate dimensions
              can reduce that image payload to under 400KB, cutting load times
              by multiple seconds on average connections. Every 100ms
              improvement in load time correlates with approximately 1% more
              conversions, according to Google&apos;s research.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              What is a good image file size for web?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              For most web images, aim for under 200KB per image. Hero images
              and full-width banners should stay under 300KB. Blog post body
              images typically work well at 80-150KB. Product thumbnails should
              be under 50KB. These targets are achievable with WebP format at
              quality 80-82 and proper resizing to display dimensions. Any image
              above 500KB is almost always unnecessarily large for web display.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Does image compression affect SEO?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Image compression improves SEO. Smaller images mean faster page
              loads, which directly improves Core Web Vitals scores. Google
              uses page speed as a ranking signal, and LCP is an image in
              approximately 70% of web pages. Compressing your hero image is
              one of the fastest ways to improve your LCP score and search
              rankings. Compression does not affect alt text, filenames, or any
              other image SEO metadata.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              Should I use WebP or JPEG for my website?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Use WebP as your primary format. WebP files are 25-34% smaller
              than equivalent JPEGs at the same perceptual quality, and browser
              support reached 97% in 2026, making it effectively universal. The
              only reason to keep JPEG is compatibility with legacy systems or
              email clients that do not support WebP. For any modern website,
              converting images to WebP before upload is the single fastest
              format change to reduce page weight.
            </p>

            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
              How do I optimize images for mobile?
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Optimize images for mobile by implementing responsive images using
              the
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">srcset</code>
              attribute to serve different sizes based on screen width. A mobile
              screen rarely exceeds 428px wide, so serving a 1600px image on
              mobile wastes significant bandwidth. Combine this with WebP format
              at quality 78-82 for maximum efficiency. Lazy loading images
              below the fold with
              <code className="mx-1 px-1.5 py-0.5 bg-gray-100 dark:bg-[#252525] rounded text-xs font-mono text-gray-800 dark:text-[#E5E5E5]">loading=&quot;lazy&quot;</code>
              also prevents unnecessary downloads on initial page load.
            </p>
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
