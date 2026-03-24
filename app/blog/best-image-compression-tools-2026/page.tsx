import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title:
    "Best Free Image Compression Tools in 2026 - Compared | SammaPix Blog",
  description:
    "Honest comparison of the best free image compression tools in 2026: SammaPix, TinyPNG, Squoosh, ImageOptim, Compressor.io, and iLoveIMG. Pros, cons, and our verdict.",
  alternates: {
    canonical: `${APP_URL}/blog/best-image-compression-tools-2026`,
  },
  keywords: [
    "best image compression tools 2026",
    "free image compressor online",
    "compress images online free",
    "tinypng alternative",
    "best image optimizer",
    "squoosh alternative",
    "online image compressor comparison",
  ],
  openGraph: {
    title: "Best Free Image Compression Tools in 2026 - Compared",
    description:
      "We tested every major free image compressor so you do not have to. Here is the honest breakdown- output quality, speed, privacy, and limits- for 2026.",
    url: `${APP_URL}/blog/best-image-compression-tools-2026`,
    type: "article",
    publishedTime: "2026-01-15",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Free Image Compression Tools in 2026 - Compared",
    description:
      "Honest comparison of SammaPix, TinyPNG, Squoosh, ImageOptim, Compressor.io, and iLoveIMG. Which one is actually the best free image compressor in 2026?",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-01-15";
const POST_DATE_FORMATTED = "January 15, 2026";
const POST_URL =
  `${APP_URL}/blog/best-image-compression-tools-2026`;
const POST_TITLE = "Best Free Image Compression Tools in 2026 - Compared";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Honest comparison of the best free image compression tools in 2026: SammaPix, TinyPNG, Squoosh, ImageOptim, Compressor.io, and iLoveIMG. Pros, cons, and our verdict.",
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
    "best image compression tools 2026",
    "free image compressor online",
    "compress images online free",
    "tinypng alternative",
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

const tools = [
  {
    name: "SammaPix",
    url: "/compress",
    tagline: "Client-side, no limits, no account",
    pros: [
      "100% client-side- files never leave your browser",
      "Supports JPG, PNG, WebP, GIF, AVIF in one tool",
      "Batch processing with ZIP download",
      "Strips EXIF metadata automatically",
      "Also converts to WebP and renames with AI",
      "No file size cap on free tier",
    ],
    cons: [
      "Newer tool- smaller community than TinyPNG",
      "AI Rename requires a free account",
    ],
    bestFor: "Privacy-conscious users, photographers, and web developers who need an all-in-one image workflow",
    rating: "Best Overall",
    ratingColor: "text-indigo-700 bg-indigo-50 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-950/30 dark:border-indigo-900",
  },
  {
    name: "TinyPNG",
    url: "https://tinypng.com",
    tagline: "The most popular free image compressor",
    pros: [
      "Excellent PNG and WebP compression quality",
      "Very simple, minimal interface",
      "Trusted by millions of developers",
      "Has a widely used Photoshop plugin and API",
    ],
    cons: [
      "Limited to 20 images per session on free tier",
      "Max 5 MB per file on free tier",
      "Files are uploaded to TinyPNG servers",
      "No EXIF stripping or renaming features",
      "No AVIF or GIF support",
    ],
    bestFor: "Simple PNG/JPG compression when you have a small batch",
    rating: "Best Known",
    ratingColor: "text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950/30 dark:border-yellow-900",
  },
  {
    name: "Squoosh",
    url: "https://squoosh.app",
    tagline: "Google's open-source image compression lab",
    pros: [
      "Supports virtually every modern format including AVIF and JXL",
      "Side-by-side before/after comparison",
      "Processes files locally in the browser",
      "Fine-grained codec control",
      "Open source (GitHub)",
    ],
    cons: [
      "One image at a time- no batch processing",
      "UI can feel overwhelming for casual users",
      "Slower compression on large files (WASM-based)",
      "No bulk download or ZIP",
    ],
    bestFor: "Technical users who want full codec control and format experimentation",
    rating: "Best for Geeks",
    ratingColor: "text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/30 dark:border-blue-900",
  },
  {
    name: "ImageOptim",
    url: "https://imageoptim.com",
    tagline: "The go-to Mac app for lossless optimization",
    pros: [
      "Lossless compression removes invisible bloat",
      "Strips metadata and hidden data",
      "Batch processes entire folders by drag-and-drop",
      "Native Mac app- fast, no browser needed",
    ],
    cons: [
      "Mac only- no Windows or Linux version",
      "Not available in the browser",
      "Lossless mode offers smaller file size reductions than lossy tools",
      "No format conversion",
    ],
    bestFor: "Mac users who want to optimize images without any quality loss before publishing",
    rating: "Best for Mac",
    ratingColor: "text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950/30 dark:border-green-900",
  },
  {
    name: "Compressor.io",
    url: "https://compressor.io",
    tagline: "Fast online compressor with a clean UI",
    pros: [
      "Supports JPEG, PNG, GIF, WebP, and SVG",
      "Offers both lossy and lossless modes",
      "Clean, fast interface",
    ],
    cons: [
      "Free tier limited to 10 MB per file",
      "Files uploaded to cloud servers",
      "No batch processing on free tier",
      "No EXIF inspection or metadata control",
    ],
    bestFor: "Quick one-off compressions when you need a clean, simple interface",
    rating: "Decent Runner-Up",
    ratingColor: "text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-[#252525] dark:border-[#333]",
  },
  {
    name: "iLoveIMG",
    url: "https://www.iloveimg.com",
    tagline: "Multi-tool platform with compression included",
    pros: [
      "Includes resize, crop, rotate, watermark, and more",
      "Supports many formats",
      "Familiar interface similar to iLovePDF",
    ],
    cons: [
      "Files uploaded to iLoveIMG servers",
      "Free tier has processing limits",
      "Ads throughout the UI",
      "Compression quality is average compared to dedicated tools",
      "No client-side processing- internet connection required",
    ],
    bestFor: "Users who want image editing tools (resize, crop) alongside basic compression",
    rating: "Feature-Rich but Average",
    ratingColor: "text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-[#252525] dark:border-[#333]",
  },
];


export default function BestImageCompressionTools2026Page() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="best-image-compression-tools-2026"
        description="Honest comparison of the best free image compression tools in 2026: SammaPix, TinyPNG, Squoosh, ImageOptim, Compressor.io, and iLoveIMG. Pros, cons, and our verdict."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={9}
        headings={[
          { id: "why-compression-matters", title: "Why image compression still matters in 2026" },
          { id: "testing-methodology", title: "What we tested and how" },
          { id: "the-tools", title: "The tools" },
          { id: "privacy-question", title: "The privacy question most comparisons ignore" },
          { id: "compression-quality", title: "Compression quality: what the numbers do not show" },
          { id: "which-tool", title: "Which tool should you use in 2026?" },
          { id: "feature-comparison", title: "Quick reference: feature comparison" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "SammaPix, TinyPNG, Squoosh, ImageOptim, Compressor.io, and iLoveIMG all produce good compression quality - the real differences are in privacy, batch limits, and workflow breadth.",
          "SammaPix is the only tool that processes entirely in-browser with no file uploads, no batch limits, and 20 tools beyond just compression.",
          "TinyPNG excels at PNG compression but limits free users to 20 files per session and uploads every image to its servers.",
          "Squoosh by Google is excellent for single-file compression with side-by-side quality comparison, but has no batch processing.",
        ]}
        heroImage={
          <figure className="my-8">
                        <img
                          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                          alt="Website performance metrics dashboard showing page load speed improvements"
                          className="w-full rounded-lg"
                          loading="eager"
                        />
                        <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                          Page speed is directly tied to image optimization - Photo by Carlos Muza on Unsplash
                        </figcaption>
                      </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
                          Try SammaPix Compress- free, no limits
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
                          Compress JPG, PNG, WebP, GIF, and AVIF in bulk. Files never leave your browser. No account, no watermarks, no file size caps.
                        </p>
                        <Link
                          href="/compress"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                        >
                          Open Compress tool
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </Link>
                      </div>
        }
      >
        {/* Article body content */}
            <h2 id="why-compression-matters" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              Why image compression still matters in 2026
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              A DSLR or modern smartphone produces files between 5 MB and 30 MB per shot. A product photo or portfolio page loaded with uncompressed originals can hit 100 MB before the user clicks past the fold. That translates directly into slower load times, worse Core Web Vitals scores, and higher bounce rates- especially on mobile.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              According to{" "}
              <a
                href="https://web.dev/articles/fast"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                Google Web Vitals guidance
              </a>
              , images are consistently the single largest contributor to page weight on most websites. Compressing them correctly- without visible quality degradation- is one of the highest-ROI optimizations available, and it costs nothing when you use the right free tool.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The challenge is that not every free compressor is created equal. File size limits, upload privacy concerns, batch caps, and output quality vary enormously. This comparison cuts through the noise. For a deeper dive into how browsers handle image formats, see the{" "}
              <a href="https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types" target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">MDN guide to image file types</a>.
            </p>

            

            <h2 id="testing-methodology" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              What we tested and how
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Each tool was tested with the same set of reference images: a 12 MP JPEG landscape photo from a mirrorless camera, a high-DPI PNG logo with transparency, a GIF animation, and a WebP banner image. We measured output file size reduction, visual quality at default settings, and any privacy or usability friction encountered along the way.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              We also paid attention to what happens to your files. Tools that upload images to cloud servers are noted clearly- because for many photographers and designers, that is a dealbreaker. Google&apos;s{" "}
              <a href="https://web.dev/learn/performance" target="_blank" rel="noopener noreferrer" className="text-[#6366F1] hover:underline">web.dev performance course</a>{" "}
              covers the fundamentals of why image optimization matters so much for page load times.
            </p>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
                alt="Laptop with code editor open showing web development workflow"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                Choosing the right compression tool is part of every web development workflow - Photo by Ilya Pavlov on Unsplash
              </figcaption>
            </figure>

            {/* Tools comparison */}
            <h2 id="the-tools" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-6">
              The tools
            </h2>

            <div className="space-y-8">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden"
                >
                  {/* Tool header */}
                  <div className="px-5 py-4 bg-[#FAFAFA] dark:bg-[#1E1E1E] border-b border-[#E5E5E5] dark:border-[#2A2A2A] flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5]">
                          {tool.name}
                        </h3>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded border uppercase tracking-wide ${tool.ratingColor}`}>
                          {tool.rating}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-[#737373]">{tool.tagline}</p>
                    </div>
                  </div>

                  {/* Pros and cons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                    <div className="px-5 py-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-[#737373] mb-3">
                        Pros
                      </p>
                      <ul className="space-y-2">
                        {tool.pros.map((pro) => (
                          <li key={pro} className="flex items-start gap-2">
                            <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mt-0.5 shrink-0" strokeWidth={2} />
                            <span className="text-xs text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-[#737373] mb-3">
                        Cons
                      </p>
                      <ul className="space-y-2">
                        {tool.cons.map((con) => (
                          <li key={con} className="flex items-start gap-2">
                            <X className="h-3.5 w-3.5 text-red-500 dark:text-red-400 mt-0.5 shrink-0" strokeWidth={2} />
                            <span className="text-xs text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Best for */}
                  <div className="px-5 py-3 bg-[#FAFAFA] dark:bg-[#1E1E1E] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-[#737373] mr-2">
                      Best for:
                    </span>
                    <span className="text-xs text-gray-600 dark:text-[#A3A3A3]">{tool.bestFor}</span>
                  </div>
                </div>
              ))}
            </div>

            <h2 id="privacy-question" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-12 mb-3">
              The privacy question most comparisons ignore
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Most image compressor comparisons focus entirely on output file size. They rarely mention where your files go during compression. This matters more than most people realize.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Tools like TinyPNG, Compressor.io, and iLoveIMG upload your images to their servers for processing. This is fine for many use cases- stock images, website graphics, public content. But if you are compressing client photos, product shots under NDA, family pictures, or anything with GPS metadata embedded, you are handing those files to a third party.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              SammaPix and Squoosh both process images entirely inside your browser using JavaScript and WebAssembly. The files never touch any server. For photographers dealing with client work, this is not a nice-to-have- it is a professional requirement.
            </p>

            <h2 id="compression-quality" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              Compression quality: what the numbers do not show
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Every tool in this comparison can achieve 60–80% file size reduction on a typical JPEG at default settings. The difference is in what you lose- or do not lose- along the way.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              TinyPNG uses smart lossy compression for PNGs that most people cannot perceive visually at all- it is genuinely impressive for that format. Squoosh gives you the most codec control and lets you tune quality with a side-by-side comparison until you find the exact tradeoff you want. SammaPix targets a sensible default (80% quality) that produces excellent results without any configuration needed.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              ImageOptim stands apart because it is fully lossless for its default mode- it removes invisible bloat and metadata without touching the pixel data at all. The file size reductions are smaller (typically 10–30% versus 50–80% for lossy tools), but there is genuinely zero quality impact.
            </p>

            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                alt="Data analytics dashboard showing metrics and performance charts"
                className="w-full rounded-lg"
                loading="lazy"
              />
              <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
                Compression ratios vary by tool- but the real differences go beyond the numbers - Photo by Luke Chesser on Unsplash
              </figcaption>
            </figure>

            <h2 id="which-tool" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              Which tool should you use in 2026?
            </h2>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
              For most photographers and web professionals
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Use{" "}
              <Link
                href="/compress"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix Compress
              </Link>
              . It handles every format, batch processes with ZIP download, strips EXIF metadata for privacy, and runs entirely in your browser. It is the only tool in this list that covers compression, format conversion, metadata removal, and AI renaming in a single workflow- all free.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
              For quick single PNG compression with no setup
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              TinyPNG is still excellent for a fast single-file PNG or JPEG. It has earned its reputation. Just be aware of the 20-image and 5 MB limits on the free tier, and the fact that your files are processed on their servers.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
              For codec experimentation and format research
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Squoosh is unmatched. If you want to compare MozJPEG versus AVIF versus WebP on a single image with full quality sliders, Squoosh is the right tool. It is maintained by the Google Chrome team and kept up to date with the latest codec implementations.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-4 mb-1">
              For Mac users optimizing a local folder losslessly
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              ImageOptim is the best Mac tool for lossless optimization. It is particularly useful for prepping images before committing them to version control or deploying a static site.
            </p>

            {/* Quick reference table */}
            <h2 id="feature-comparison" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-4">
              Quick reference: feature comparison
            </h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
              <table className="w-full text-xs border-collapse min-w-[560px]">
                <thead>
                  <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">Tool</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">Client-side</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">Batch</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">EXIF strip</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">WebP output</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">Free limit</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "SammaPix", clientSide: true, batch: true, exif: true, webp: true, limit: "Unlimited" },
                    { name: "TinyPNG", clientSide: false, batch: true, exif: false, webp: false, limit: "20 files / 5 MB" },
                    { name: "Squoosh", clientSide: true, batch: false, exif: false, webp: true, limit: "1 file" },
                    { name: "ImageOptim", clientSide: true, batch: true, exif: true, webp: false, limit: "Mac only" },
                    { name: "Compressor.io", clientSide: false, batch: false, exif: false, webp: true, limit: "10 MB" },
                    { name: "iLoveIMG", clientSide: false, batch: true, exif: false, webp: false, limit: "Monthly cap" },
                  ].map((row, i) => (
                    <tr key={row.name} className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${i % 2 === 0 ? "" : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"}`}>
                      <td className="py-2 px-3 font-medium text-gray-800 dark:text-[#E5E5E5]">{row.name}</td>
                      <td className="py-2 px-3 text-center">
                        {row.clientSide
                          ? <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mx-auto" strokeWidth={2} />
                          : <X className="h-3.5 w-3.5 text-red-500 mx-auto" strokeWidth={2} />}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {row.batch
                          ? <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mx-auto" strokeWidth={2} />
                          : <X className="h-3.5 w-3.5 text-red-500 mx-auto" strokeWidth={2} />}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {row.exif
                          ? <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mx-auto" strokeWidth={2} />
                          : <X className="h-3.5 w-3.5 text-red-500 mx-auto" strokeWidth={2} />}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {row.webp
                          ? <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-500 mx-auto" strokeWidth={2} />
                          : <X className="h-3.5 w-3.5 text-red-500 mx-auto" strokeWidth={2} />}
                      </td>
                      <td className="py-2 px-3 text-gray-500 dark:text-[#737373]">{row.limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CTA inline */}
            <Link
              href="/compress"
              className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-6 mb-8"
            >
              <div>
                <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">
                  Free tool- no signup, no limits
                </p>
                <p className="text-sm font-semibold text-white leading-snug">
                  Compress your images now with SammaPix- client-side, EXIF-clean, batch-ready
                </p>
              </div>
              <ArrowRight
                className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
                strokeWidth={1.5}
              />
            </Link>

            {/* FAQ */}
            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
              <h2 id="faq" className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mb-6">
                FAQ
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Is TinyPNG still the best free image compressor in 2026?",
                    a: "TinyPNG remains excellent for PNG compression specifically. But it is no longer the best overall option- it has a 20-image limit per session, a 5 MB per file cap, and uploads files to their servers. For privacy, batch processing, and a wider format range, SammaPix is now the stronger choice.",
                  },
                  {
                    q: "What is the best image compression tool that does not upload my files?",
                    a: "SammaPix and Squoosh both process images entirely inside your browser- nothing is uploaded to any server. For Mac users who prefer a native app, ImageOptim also works entirely locally.",
                  },
                  {
                    q: "Does compressing an image reduce its visual quality?",
                    a: "Lossy compression (the default in most tools) does reduce some quality, but at typical web settings (80% quality) the difference is invisible to the human eye. Lossless compression, used by tools like ImageOptim, removes redundant data without any quality impact at all.",
                  },
                  {
                    q: "Should I convert images to WebP before compressing?",
                    a: "WebP often achieves better file sizes than JPEG or PNG at equivalent quality settings. If your website targets modern browsers (which is nearly universal in 2026), converting to WebP during compression is a smart default. SammaPix lets you compress and convert to WebP in the same step.",
                  },
                  {
                    q: "How much can I realistically reduce a JPEG file without visible quality loss?",
                    a: "A typical camera JPEG (shot at high quality settings) can usually be reduced by 60–75% without perceptible quality loss when using a good lossy compressor at 80% quality. If you also convert to WebP, you can often achieve reductions of 70–85% compared to the original.",
                  },
                ].map(({ q, a }) => (
                  <div key={q}>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mb-1.5">{q}</h3>
                    <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed">{a}</p>
                  </div>
                ))}


              </div>
            </div>

      </BlogArticleLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
