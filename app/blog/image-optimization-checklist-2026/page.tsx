import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "The Complete Image Optimization Checklist for 2026",
  description:
    "A definitive step-by-step image optimization checklist covering format selection, compression, EXIF removal, alt text, HTML implementation, CDN delivery, and monitoring.",
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
  ],
  openGraph: {
    title: "The Complete Image Optimization Checklist for 2026",
    description:
      "The definitive image optimization checklist for web developers and content creators. Every step from format selection to CDN monitoring, with tools and benchmarks.",
    url: `${APP_URL}/blog/image-optimization-checklist-2026`,
    type: "article",
    publishedTime: "2026-04-05",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Complete Image Optimization Checklist for 2026",
    description:
      "The definitive image optimization checklist: format selection, compression, EXIF, alt text, HTML, CDN, and monitoring.",
    creator: "@lucasammarco",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The Complete Image Optimization Checklist for 2026",
  description:
    "A comprehensive, step-by-step image optimization checklist for web developers and content creators. Covers every stage from pre-upload preparation to production monitoring.",
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
    logo: {
      "@type": "ImageObject",
      url: "https://sammapix.com/og-image.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${APP_URL}/blog/image-optimization-checklist-2026`,
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
      name: "The Complete Image Optimization Checklist for 2026",
      item: `${APP_URL}/blog/image-optimization-checklist-2026`,
    },
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
        text: "WebP is the best default format for web images in 2026. It offers 25-34% smaller file sizes than JPEG at equivalent quality, supports both lossy and lossless compression, handles transparency, and has 97%+ browser support. AVIF offers even smaller files but has slower decode times and 93% browser support. Use WebP as your default and consider AVIF for bandwidth-critical applications.",
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
        description="Images account for 42% of total page weight on the average website (HTTP Archive 2025). This is the definitive, step-by-step image optimization checklist covering everything from format selection and compression to HTML implementation, CDN delivery, and ongoing monitoring. Bookmark this page and use it every time you add images to a website."
        date="2026-04-05"
        dateFormatted="April 5, 2026"
        tags={["SEO", "Performance"]}
        readingTime={12}
        headings={[
          { id: "before-upload", title: "Section 1: Before upload — preparing your images" },
          { id: "html-implementation", title: "Section 2: HTML implementation — the code that serves your images" },
          { id: "server-cdn-delivery", title: "Section 3: Server and CDN delivery" },
          { id: "monitoring-auditing", title: "Section 4: Monitoring and auditing" },
          { id: "complete-checklist", title: "The complete checklist (summary)" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Images account for 42% of total page weight on the median website (HTTP Archive 2025), making image optimization the highest-leverage performance task.",
          "The pre-upload workflow: resize to display dimensions, choose the right format (WebP default), compress at quality 75-85, strip EXIF, and add alt text.",
          "HTML best practices: use srcset and sizes for responsive images, loading='lazy' for below-fold, explicit width and height to prevent CLS.",
          "Monitor continuously with PageSpeed Insights and Core Web Vitals reports in Search Console. Run full image audits quarterly.",
        ]}
      >
        <section id="before-upload">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            Section 1: Before upload — preparing your images
          </h2>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            The most impactful optimizations happen before an image ever touches your server. Every image you add to a website should go through these steps.
          </p>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            1. Resize to display dimensions
          </h3>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Never upload an image larger than its maximum display size. If an image displays at 800px wide on desktop, serving a 4000px original wastes bandwidth and processing time. Account for 2x DPR (device pixel ratio) for Retina displays: if the display size is 800px, serve a 1600px image. Going beyond 2x provides no visible benefit on any current display.
          </p>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            For responsive layouts, generate multiple sizes using srcset. Common breakpoints: 400px, 800px, 1200px, and 1600px. This ensures every device downloads only the pixels it needs.
          </p>

          <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">Generate responsive image sizes</p>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-3">
              SammaPix Resize Pack generates multiple sizes from a single image for srcset. All processing runs in your browser.
            </p>
            <Link href="/tools/resizepack" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Open Resize Pack <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            2. Choose the right format
          </h3>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Format selection has a dramatic impact on file size. Use this decision tree:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] text-[#404040] dark:text-[#D4D4D4]">
            <li><span className="font-medium text-[#171717] dark:text-[#E5E5E5]">Photographs and complex images:</span> WebP (lossy) as default. AVIF if you need maximum compression and your audience uses modern browsers.</li>
            <li><span className="font-medium text-[#171717] dark:text-[#E5E5E5]">Screenshots, text, UI elements:</span> PNG or WebP (lossless). These images have sharp edges that suffer under lossy compression.</li>
            <li><span className="font-medium text-[#171717] dark:text-[#E5E5E5]">Logos and icons:</span> SVG whenever possible. For raster logos, PNG with lossless WebP.</li>
            <li><span className="font-medium text-[#171717] dark:text-[#E5E5E5]">Animated content:</span> WebP animated (replaces GIF at 50-80% smaller file sizes).</li>
          </ul>

          <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">Convert images to WebP</p>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-3">
              Batch convert JPG, PNG, and other formats to WebP with SammaPix. Reduce file sizes by 25-34% with no visible quality loss.
            </p>
            <Link href="/tools/webp" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Open WebP Converter <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            3. Compress at the right quality level
          </h3>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            For lossy formats (JPEG, lossy WebP), quality 75-85 is the sweet spot. Below 75, artifacts become noticeable. Above 85, file size increases significantly with minimal visual improvement. Quality 80 is the best general-purpose setting, providing 60-70% file size reduction with imperceptible quality loss on screen-sized displays.
          </p>

          <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">Compress images with precision</p>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-3">
              SammaPix Compress lets you set exact quality levels and see the file size reduction in real time. Browser-based, no upload.
            </p>
            <Link href="/tools/compress" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Open Compress tool <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            4. Strip EXIF and metadata
          </h3>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Every photo from a smartphone or camera contains EXIF metadata: GPS coordinates, device model, camera settings, timestamps, and sometimes even the owner&apos;s name. This data typically adds 10-50KB per image and creates privacy risks. A photo posted online with GPS data reveals the exact location where it was taken.
          </p>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Strip all EXIF data before uploading images to any public-facing website. This reduces file size and eliminates privacy concerns in one step.
          </p>

          <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">Remove EXIF data from photos</p>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-3">
              SammaPix EXIF Remover strips all metadata including GPS coordinates. Runs entirely in your browser for maximum privacy.
            </p>
            <Link href="/tools/exif" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Open EXIF Remover <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            5. Add descriptive alt text
          </h3>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Alt text serves three purposes: accessibility (screen readers), SEO (search engines use alt text to understand image content), and fallback display when images fail to load. Every informational image should have descriptive alt text under 125 characters. Decorative images should have an empty alt attribute (<span className="font-medium text-[#171717] dark:text-[#E5E5E5]">alt=&quot;&quot;</span>).
          </p>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Good alt text describes the content of the image, not the image itself. &quot;Golden retriever catching a frisbee in a park&quot; is better than &quot;dog photo.&quot; Include relevant keywords naturally but never stuff keywords into alt text.
          </p>

          <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
            <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-2">Generate alt text with AI</p>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-3">
              SammaPix AI Alt Text analyzes your images and generates descriptive, SEO-friendly alt text automatically.
            </p>
            <Link href="/tools/alt-text" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Open AI Alt Text <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </section>

        <section id="html-implementation">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            Section 2: HTML implementation — the code that serves your images
          </h2>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            6. Use srcset and sizes for responsive images
          </h3>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            The srcset attribute tells the browser which image sizes are available, and the sizes attribute tells it how large the image will display at each viewport width. Together, they allow the browser to select the optimal image for the user&apos;s device, downloading only the pixels needed.
          </p>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            A common pattern is to generate images at 400w, 800w, 1200w, and 1600w. The browser then selects the most appropriate size based on viewport width and device pixel ratio. This can reduce image downloads by 40-60% on mobile devices compared to serving a single large image.
          </p>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            7. Set explicit width and height
          </h3>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Always include width and height attributes on img elements. This prevents Cumulative Layout Shift (CLS) by allowing the browser to reserve space before the image loads. Combine with CSS <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">max-width: 100%; height: auto;</span> for responsive behavior while maintaining the aspect ratio reservation.
          </p>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            8. Implement lazy loading correctly
          </h3>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Add <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">loading=&quot;lazy&quot;</span> to all images below the fold. This defers loading until the image is near the viewport, saving bandwidth and improving initial load time. Critical rule: never lazy load the LCP image (usually the hero image above the fold). Use <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">loading=&quot;eager&quot;</span> and <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">fetchpriority=&quot;high&quot;</span> for the LCP image to ensure it loads as fast as possible.
          </p>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            9. Use the picture element for format fallbacks
          </h3>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            The HTML picture element allows you to serve modern formats (WebP, AVIF) with automatic fallback to JPEG for older browsers. The browser evaluates source elements in order and uses the first format it supports. This ensures every user gets the best format their browser can handle.
          </p>
        </section>

        <section id="server-cdn-delivery">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            Section 3: Server and CDN delivery
          </h2>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            10. Set appropriate cache headers
          </h3>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Images rarely change after upload. Set aggressive cache headers: <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">Cache-Control: public, max-age=31536000, immutable</span> for versioned image URLs (URLs that include a hash or version number). This tells browsers and CDN edge servers to cache the image for one year without revalidation, eliminating repeat downloads entirely.
          </p>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            11. Enable content negotiation
          </h3>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Configure your server or CDN to serve different image formats based on the browser&apos;s Accept header. When a browser sends <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">Accept: image/webp</span>, serve WebP. When it sends <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">Accept: image/avif</span>, serve AVIF. Fall back to JPEG otherwise. Cloudflare, AWS CloudFront, and most modern CDNs support this natively through image transformation features.
          </p>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            12. Serve images from a CDN
          </h3>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            A Content Delivery Network serves images from edge servers geographically close to the user, dramatically reducing latency. For a user in Tokyo accessing a server in New York, a CDN can reduce image load time by 200-400ms. This directly improves LCP. Most CDNs also provide automatic image optimization (resize, format conversion, compression) at the edge.
          </p>
        </section>

        <section id="monitoring-auditing">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            Section 4: Monitoring and auditing
          </h2>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            13. Run PageSpeed Insights regularly
          </h3>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Google PageSpeed Insights provides both lab data (Lighthouse) and field data (CrUX) for your pages. Check your key pages monthly at minimum. Pay attention to the image-specific opportunities: &quot;Serve images in next-gen formats,&quot; &quot;Properly size images,&quot; &quot;Efficiently encode images,&quot; and &quot;Defer offscreen images.&quot; Each of these directly corresponds to a step in this checklist.
          </p>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            14. Monitor Core Web Vitals in Search Console
          </h3>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Google Search Console provides a Core Web Vitals report showing real-world performance data from Chrome users. Monitor the LCP trend over time. If LCP degrades after a content update, it is almost always because new images were added without optimization. Set up a process to review CWV data weekly.
          </p>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            15. Automate image optimization in your workflow
          </h3>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            For sites with frequent content updates, manual optimization is unsustainable. Integrate image optimization into your build pipeline using tools like sharp (Node.js), imagemin, or next/image (Next.js). For content teams without technical access, establish a pre-upload workflow using browser-based tools like SammaPix to ensure every image is optimized before it reaches the CMS.
          </p>
        </section>

        <section id="complete-checklist">
          <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
            The complete checklist (summary)
          </h2>
          <p className="text-[15px] leading-relaxed text-[#404040] dark:text-[#D4D4D4] mb-4">
            Here is every step in a single reference list. Bookmark this section for quick access.
          </p>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            Before upload
          </h3>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] text-[#404040] dark:text-[#D4D4D4]">
            <li>Resize images to display dimensions (2x for Retina)</li>
            <li>Choose the correct format (WebP for photos, PNG for screenshots/logos, SVG for icons)</li>
            <li>Compress at quality 75-85 for lossy formats</li>
            <li>Strip all EXIF metadata (especially GPS data)</li>
            <li>Write descriptive alt text for every informational image</li>
            <li>Use SEO-friendly file names (descriptive, hyphen-separated)</li>
          </ul>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            HTML implementation
          </h3>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] text-[#404040] dark:text-[#D4D4D4]">
            <li>Use srcset and sizes for responsive images</li>
            <li>Include width and height attributes on every img element</li>
            <li>Add loading=&quot;lazy&quot; to below-fold images</li>
            <li>Use loading=&quot;eager&quot; and fetchpriority=&quot;high&quot; for the LCP image</li>
            <li>Use the picture element for format fallbacks (WebP with JPEG fallback)</li>
            <li>Include alt attributes on all img elements (empty for decorative images)</li>
          </ul>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            Server and CDN
          </h3>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] text-[#404040] dark:text-[#D4D4D4]">
            <li>Set cache headers: Cache-Control: public, max-age=31536000, immutable</li>
            <li>Enable content negotiation for automatic format serving</li>
            <li>Serve images through a CDN for global edge delivery</li>
            <li>Enable HTTP/2 or HTTP/3 for parallel image downloads</li>
          </ul>

          <h3 className="text-base font-medium text-[#171717] dark:text-[#E5E5E5] mt-6 mb-2">
            Monitoring
          </h3>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-[15px] text-[#404040] dark:text-[#D4D4D4]">
            <li>Run PageSpeed Insights on key pages monthly</li>
            <li>Monitor Core Web Vitals in Google Search Console weekly</li>
            <li>Audit new content for unoptimized images after every publish</li>
            <li>Automate image optimization in CI/CD for developer teams</li>
          </ul>
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
