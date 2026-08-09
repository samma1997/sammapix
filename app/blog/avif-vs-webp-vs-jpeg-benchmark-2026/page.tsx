import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "AVIF vs WebP vs JPEG: Real Benchmark (2026)",
  description:
    "We encoded 5 real photos to JPEG, WebP, and AVIF matching SSIM 0.98. AVIF is 27% smaller than JPEG and 29% smaller than WebP at equal visual quality.",
  alternates: {
    canonical: `${APP_URL}/blog/avif-vs-webp-vs-jpeg-benchmark-2026`,
  },
  keywords: [
    "avif vs webp vs jpeg",
    "avif vs webp",
    "image format benchmark 2026",
    "is avif smaller than webp",
    "best image format for web 2026",
    "avif file size comparison",
  ],
  openGraph: {
    title: "AVIF vs WebP vs JPEG: Real Benchmark (2026)",
    description:
      "Perceptual-quality benchmark: 5 real photos encoded with MozJPEG, WebP, and AVIF at SSIM 0.98. AVIF wins clearly. The WebP-vs-JPEG nuance most guides miss.",
    url: `${APP_URL}/blog/avif-vs-webp-vs-jpeg-benchmark-2026`,
    type: "article",
    publishedTime: "2026-08-09",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AVIF vs WebP vs JPEG: Real Benchmark (2026)",
    description:
      "Encoded 5 real photos at equal visual quality (SSIM 0.98). AVIF is 27% smaller than JPEG, 29% smaller than WebP. The honest nuance about WebP inside.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-08-09";
const POST_DATE_FORMATTED = "August 9, 2026";
const POST_SLUG = "avif-vs-webp-vs-jpeg-benchmark-2026";
const POST_URL = `${APP_URL}/blog/${POST_SLUG}`;
const POST_TITLE = "AVIF vs WebP vs JPEG: Real Benchmark (2026)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A reproducible perceptual-quality benchmark comparing AVIF, WebP, and JPEG across 5 real photos. Encoded with MozJPEG, libvips, and libavif, quality-matched at SSIM 0.98 using ffmpeg. AVIF is 27% smaller than JPEG and 29% smaller than WebP at equal visual quality.",
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
    "avif vs webp vs jpeg",
    "avif vs webp",
    "image format benchmark 2026",
    "is avif smaller than webp",
    "best image format for web 2026",
    "avif file size comparison",
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
      name: "Is AVIF smaller than WebP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, at equal perceptual quality (SSIM 0.98). In our benchmark of 5 real photos, AVIF files were 29% smaller than WebP on average. For the full 5-image set, AVIF totaled 602K versus WebP at 846K.",
      },
    },
    {
      "@type": "Question",
      name: "Why not compare JPEG, WebP, and AVIF at the same quality number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because the quality number means something different in each codec. Quality 75 in JPEG is not the same visual quality as quality 75 in WebP or AVIF. Comparing at the same number produces misleading results. The correct method is to match perceptual quality, for example by targeting the same SSIM score, and then compare file sizes.",
      },
    },
    {
      "@type": "Question",
      name: "Does AVIF lose quality compared to JPEG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. In this benchmark all three formats were matched to the same visual quality threshold (SSIM 0.98 versus the lossless source). AVIF achieves that quality at a smaller file size, not at lower quality.",
      },
    },
    {
      "@type": "Question",
      name: "Which browsers support AVIF in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AVIF is supported in Chrome (85+), Firefox (93+), Edge (121+), and Safari (16.4+). Global browser support is above 92% as of 2026. The recommended approach is to use the HTML picture element with an AVIF source and a JPEG fallback.",
      },
    },
    {
      "@type": "Question",
      name: "How can I convert images to AVIF for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix has a free client-side AVIF converter at sammapix.com/tools/convert-to-avif. It runs entirely in your browser using a real WASM encoder, so no image is uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Is my image uploaded when I use SammaPix to convert to AVIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The SammaPix convert-to-avif tool and the avif-to-jpg tool both run entirely in your browser. Your images never leave your device.",
      },
    },
    {
      "@type": "Question",
      name: "When does WebP still make sense over AVIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WebP encodes significantly faster than AVIF, which matters for on-the-fly image processing at scale. WebP also has a marginal advantage at medium quality settings (below SSIM 0.95) for some image types. For static assets served to modern browsers, AVIF is the better default.",
      },
    },
  ],
};

export default function AvifVsWebpVsJpegBenchmarkPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug={POST_SLUG}
        description={`Most image format comparisons online are wrong because they compare JPEG quality 75 against WebP quality 75 against AVIF quality 75. Those numbers are not the same thing. We did it the right way: matched perceptual quality across all three formats using SSIM, then measured file sizes. Here are the real numbers.`}
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Performance", "Tools"]}
        readingTime={9}
        headings={[
          { id: "results-first", title: "Results first: the data table" },
          { id: "why-same-quality-number-is-wrong", title: "Why comparing at the same quality number is wrong" },
          { id: "methodology", title: "Methodology (fully reproducible)" },
          { id: "per-image-results", title: "Per-image breakdown" },
          { id: "headline-findings", title: "Three headline findings" },
          { id: "nuance-when-webp", title: "Nuance: when WebP still makes sense" },
          { id: "browser-support-2026", title: "Browser support in 2026" },
          { id: "practical-takeaway", title: "Practical takeaway and tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "AVIF is 27% smaller than JPEG at equal visual quality (SSIM 0.98). Across 5 photos, AVIF totaled 602K versus JPEG at 823K.",
          "AVIF is 29% smaller than WebP. WebP totaled 846K, which is actually 3% larger than JPEG in our high-quality test set.",
          "WebP's advantage over JPEG is largest at medium quality, not at high quality. At SSIM 0.98, WebP and JPEG perform almost identically.",
          "Comparing formats at the same quality number (e.g. quality 75) is misleading because each codec uses a different quality scale.",
          "AVIF is supported in Chrome 85+, Firefox 93+, Edge 121+, and Safari 16.4+. Global coverage exceeds 92% in 2026.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
              alt="Camera and photo editing workspace representing image format benchmark comparing AVIF WebP and JPEG for web performance"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Which format actually delivers smaller files at the same visual quality? We measured it. Photo by ShareGrid on Unsplash
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Convert your images to AVIF, free, no upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix encodes your images to AVIF directly in your browser using a real WASM encoder. Nothing is uploaded. You can also open any AVIF file and convert it back to JPEG.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/convert-to-avif"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Convert to AVIF
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/avif-to-jpg"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-[#A3A3A3] text-sm font-medium rounded-md border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
              >
                Open AVIF (convert to JPG)
              </Link>
            </div>
          </div>
        }
      >
        {/* Quick answer callout */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border-l-4 border-[#6366F1] rounded-r-md">
          <p className="text-xs font-semibold text-[#6366F1] mb-1.5 uppercase tracking-wide">
            Quick Answer
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            At equal perceptual quality (SSIM 0.98 vs. lossless source), AVIF is 27% smaller than JPEG and 29% smaller than WebP. WebP and JPEG perform almost identically at this quality level: WebP was 3% larger than JPEG in our 5-photo set. To convert your images to AVIF now, use our free browser-based tool at{" "}
            <Link href="/tools/convert-to-avif" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              sammapix.com/tools/convert-to-avif
            </Link>
            {" "}(no upload, no signup).
          </p>
        </div>

        {/* Section 1: Results first */}
        <h2 id="results-first" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Results first: the data table
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The table below shows the smallest file size each format needed to reach SSIM 0.98 versus a lossless source. All three formats are compared at the same perceptual quality threshold, not at the same quality number. See the methodology section for the full procedure.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Image</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Dimensions</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">JPEG (MozJPEG)</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">WebP</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A] text-green-700 dark:text-green-400">AVIF</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Photo (landscape)</td>
                <td className="px-4 py-2.5 text-xs">1448x905</td>
                <td className="px-4 py-2.5 text-xs">211K</td>
                <td className="px-4 py-2.5 text-xs">220K</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-green-700 dark:text-green-400">148K</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Sunset</td>
                <td className="px-4 py-2.5 text-xs">600x600</td>
                <td className="px-4 py-2.5 text-xs">50K</td>
                <td className="px-4 py-2.5 text-xs">49K</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-green-700 dark:text-green-400">37K</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Wide 16:9</td>
                <td className="px-4 py-2.5 text-xs">1672x941</td>
                <td className="px-4 py-2.5 text-xs">243K</td>
                <td className="px-4 py-2.5 text-xs">235K</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-green-700 dark:text-green-400">154K</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Film / RAW look</td>
                <td className="px-4 py-2.5 text-xs">1448x905</td>
                <td className="px-4 py-2.5 text-xs">276K</td>
                <td className="px-4 py-2.5 text-xs">294K</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-green-700 dark:text-green-400">236K</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Warm portrait</td>
                <td className="px-4 py-2.5 text-xs">800x800</td>
                <td className="px-4 py-2.5 text-xs">43K</td>
                <td className="px-4 py-2.5 text-xs">48K</td>
                <td className="px-4 py-2.5 text-xs font-semibold text-green-700 dark:text-green-400">27K</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-[#1A1A1A] font-semibold">
                <td className="px-4 py-2.5 text-xs font-bold text-[#171717] dark:text-[#E5E5E5]">TOTAL</td>
                <td className="px-4 py-2.5 text-xs text-[#A3A3A3]">5 images</td>
                <td className="px-4 py-2.5 text-xs text-[#171717] dark:text-[#E5E5E5]">823K</td>
                <td className="px-4 py-2.5 text-xs text-[#171717] dark:text-[#E5E5E5]">846K</td>
                <td className="px-4 py-2.5 text-xs font-bold text-green-700 dark:text-green-400">602K</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-2">
          All sizes are the file output at the exact SSIM threshold (see methodology). Smaller is better. AVIF wins on every single image in the set.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Want to convert your own images to AVIF? The{" "}
          <Link href="/tools/convert-to-avif" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            SammaPix AVIF converter
          </Link>
          {" "}runs entirely in your browser. No upload. No account required.
        </p>

        {/* Section 2: Why same quality number is wrong */}
        <h2 id="why-same-quality-number-is-wrong" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Why comparing at the same quality number is wrong
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This is the most important methodological point in the article, and most comparisons online get it wrong.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          When you encode a JPEG at quality 80, you get a specific visual result. When you encode a WebP at quality 80, the number refers to a completely different internal parameter in a completely different codec. When you encode an AVIF at quality 80 (using the CRF or equivalent), the number maps to yet another perceptual model inside libavif or libaom.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Concretely: AVIF quality 80 produces images that look roughly similar to JPEG quality 90 or higher. If you compare "AVIF 80 vs JPEG 80 vs WebP 80," you are not comparing the same visual quality. You are comparing outputs that look very different from each other, and then measuring which file is smaller. That comparison is biased toward AVIF before you even start, because AVIF at quality 80 is encoding a much harder target than JPEG at quality 80.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The correct approach is to fix the visual quality target independently of the format, and then ask each encoder: what is the smallest file you can produce that meets this quality bar? We used SSIM as the quality metric and set the target at 0.98 (very high quality, close to indistinguishable from the source). Then we found the smallest file for each format that reaches that threshold.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          This is the only fair way to compare codecs. It is also why our WebP vs. JPEG finding is more nuanced than what most guides claim.
        </p>

        {/* Section 3: Methodology */}
        <h2 id="methodology" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Methodology (fully reproducible)
        </h2>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Source images</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          We used 5 real photographs covering a range of content types that behave differently under compression: a landscape shot, a saturated sunset, a wide cinematic 16:9 frame, a high-grain film-look RAW conversion, and a warm portrait. Diverse content gives a more honest average than using a single photo.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Each photo was decoded to a lossless PNG source first, so the starting point for all three encoders is identical and contains no prior compression artifacts.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Encoders</h3>
        <ul className="space-y-2 mb-4 pl-4">
          {[
            "JPEG: MozJPEG via sharp (libvips). MozJPEG is a more efficient JPEG encoder than the baseline libjpeg, making this a fair comparison against modern JPEG practice.",
            "WebP: libvips sharp WebP encoder (libwebp, lossy mode).",
            "AVIF: sharp AVIF encoder (libavif + libaom), speed 6 (balanced, not the slowest possible).",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Quality matching procedure</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For each format and each image, we ran a binary search over the quality parameter to find the lowest quality setting that produces SSIM at or above 0.98 when measured against the lossless PNG source. SSIM was computed with ffmpeg (libavfilter ssim filter). The file size reported is from that specific encode, with no further optimization applied.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          SSIM 0.98 corresponds to what most viewers would call high quality with no visible artifacts. It is a demanding threshold, deliberately chosen to reflect real production use cases (hero images, product photography, portfolio images) rather than thumbnails.
        </p>

        {/* Section 4: Per-image results */}
        <h2 id="per-image-results" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Per-image breakdown
        </h2>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Landscape (1448x905): JPEG 211K, WebP 220K, AVIF 148K</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A typical outdoor photo with sky, foliage, and mid-range detail. AVIF saves 30% over JPEG and 33% over WebP. WebP is 4% larger than JPEG here, a pattern we see again in the film-look image below. Both codecs struggle similarly with the high-frequency detail in the foliage at this quality threshold.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Sunset (600x600): JPEG 50K, WebP 49K, AVIF 37K</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The only image where WebP edges out JPEG slightly (1K smaller). This is a lower-resolution image with large smooth gradient areas, exactly the type of content where WebP performs best. AVIF still beats both by 26% versus JPEG.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Wide 16:9 (1672x941): JPEG 243K, WebP 235K, AVIF 154K</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The largest image by pixel count. WebP shows a small advantage over JPEG (3% smaller), while AVIF is 37% smaller than JPEG. This is a cinematic-style photograph with good lighting but significant fine detail across the full frame.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Film / RAW look (1448x905): JPEG 276K, WebP 294K, AVIF 236K</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The hardest image in the set. This is a high-grain, high-contrast RAW conversion with visible film grain. Grain is essentially noise, and noise is the worst case for every codec because it cannot be predicted or smoothed without visibly damaging the image. All three formats produce much larger files here. Notably, WebP is 6.5% larger than JPEG on this image, confirming that WebP does not generically beat JPEG at high quality. AVIF still compresses 14% better than JPEG.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Warm portrait (800x800): JPEG 43K, WebP 48K, AVIF 27K</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          AVIF's biggest win in the set. This portrait has soft skin tones, warm colors, and relatively low high-frequency detail. AVIF is 37% smaller than JPEG and 44% smaller than WebP. WebP is 12% larger than JPEG here. Portraits with smooth skin texture are an area where AVIF's intra-prediction model outperforms both older codecs significantly.
        </p>

        {/* Section 5: Three headline findings */}
        <h2 id="headline-findings" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Three headline findings
        </h2>

        <div className="space-y-4 mb-6">
          <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-md">
            <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1 uppercase tracking-wide">Finding 1</p>
            <p className="text-sm text-[#171717] dark:text-[#E5E5E5] font-semibold mb-1">AVIF is 27% smaller than JPEG at equal visual quality.</p>
            <p className="text-sm text-[#737373] leading-relaxed">
              Total across 5 images: AVIF 602K versus JPEG 823K. This 27% reduction applies at SSIM 0.98, a high-quality threshold appropriate for production images.
            </p>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-md">
            <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1 uppercase tracking-wide">Finding 2</p>
            <p className="text-sm text-[#171717] dark:text-[#E5E5E5] font-semibold mb-1">AVIF is 29% smaller than WebP.</p>
            <p className="text-sm text-[#737373] leading-relaxed">
              Total across 5 images: AVIF 602K versus WebP 846K. The gap between AVIF and WebP is slightly larger than the gap between AVIF and JPEG.
            </p>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-md">
            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1 uppercase tracking-wide">Finding 3 (the honest nuance)</p>
            <p className="text-sm text-[#171717] dark:text-[#E5E5E5] font-semibold mb-1">WebP is roughly tied with JPEG at high quality, and about 3% larger in our set.</p>
            <p className="text-sm text-[#737373] leading-relaxed">
              This contradicts the common claim that "WebP is always 25-35% smaller than JPEG." That figure is accurate at medium quality (around SSIM 0.93 to 0.96) for typical web images. At SSIM 0.98, the WebP advantage largely disappears for complex, high-detail, or grainy images. The sunset image (smooth gradients, low resolution) is where WebP performs most like the commonly cited benchmarks. On 3 out of 5 images in our set, WebP was actually larger than JPEG.
            </p>
          </div>
        </div>

        {/* Section 6: When WebP still makes sense */}
        <h2 id="nuance-when-webp" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Nuance: when WebP still makes sense
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          The results above do not mean WebP is useless. There are real scenarios where it remains the right choice.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Medium quality (SSIM below 0.96)</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          WebP's efficiency advantage over JPEG is real and meaningful at medium quality settings. If you are serving thumbnails, social sharing images, or any use case where file size matters more than maximum fidelity, WebP delivers genuine savings over JPEG. Our benchmark specifically targets the high-quality production use case, which is where the advantage narrows.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Encoding speed</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          AVIF encodes significantly slower than WebP or JPEG, even at speed 6 (a balanced setting). For static assets that are encoded once and cached, this does not matter. For on-the-fly image resizing at scale, AVIF's encode time is a real operational cost. WebP encodes faster than AVIF across the board.
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">Lossless and animated images</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          WebP supports lossless compression and animations. This benchmark covers only lossy still images. For animated graphics, WebP is generally the better choice over animated AVIF, which has limited tooling support as of 2026.
        </p>

        {/* Section 7: Browser support */}
        <h2 id="browser-support-2026" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Browser support in 2026
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          A common objection to using AVIF in production has been browser support. As of 2026, that objection is largely resolved.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[#FAFAFA] dark:bg-[#1A1A1A]">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">Browser</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">AVIF support since</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">WebP support since</th>
              </tr>
            </thead>
            <tbody className="text-[#737373] dark:text-[#737373]">
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Chrome</td>
                <td className="px-4 py-2.5 text-xs text-green-700 dark:text-green-400">85 (Aug 2020)</td>
                <td className="px-4 py-2.5 text-xs">32 (Jan 2014)</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Firefox</td>
                <td className="px-4 py-2.5 text-xs text-green-700 dark:text-green-400">93 (Sep 2021)</td>
                <td className="px-4 py-2.5 text-xs">65 (Jan 2019)</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Edge</td>
                <td className="px-4 py-2.5 text-xs text-green-700 dark:text-green-400">121 (Jan 2024)</td>
                <td className="px-4 py-2.5 text-xs">18 (2018)</td>
              </tr>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]/50">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Safari</td>
                <td className="px-4 py-2.5 text-xs text-amber-600 dark:text-amber-400">16.4 (Mar 2023)</td>
                <td className="px-4 py-2.5 text-xs">14 (Sep 2020)</td>
              </tr>
              <tr className="last:border-b-0">
                <td className="px-4 py-2.5 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">Samsung Internet</td>
                <td className="px-4 py-2.5 text-xs text-green-700 dark:text-green-400">14 (Apr 2021)</td>
                <td className="px-4 py-2.5 text-xs">4 (2016)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Global AVIF support exceeds 92% as of mid-2026. Safari support started with Safari 16.4 on macOS Ventura and iOS 16.4 in March 2023, meaning users on older Apple devices do not have AVIF support. This is the main reason to maintain a fallback.
        </p>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For more detail on the browser support landscape, see our dedicated article:{" "}
          <Link href="/blog/can-i-use-webp-avif-browser-support-2026" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            Can I use WebP and AVIF? Browser support in 2026
          </Link>
          .
        </p>

        <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mt-8 mb-3">The right implementation pattern</h3>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Use the HTML <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">picture</code> element with AVIF as the primary source and JPEG as the fallback. The browser picks the first format it supports, so users on older Safari get JPEG and everyone else gets AVIF automatically.
        </p>

        <div className="my-4 bg-[#1A1A1A] rounded-md p-4 overflow-x-auto">
          <pre className="text-xs text-[#A3A3A3] leading-relaxed font-mono whitespace-pre">{`<picture>
  <source srcset="photo.avif" type="image/avif" />
  <source srcset="photo.webp" type="image/webp" />
  <img src="photo.jpg" alt="Description" />
</picture>`}</pre>
        </div>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Next.js, Astro, and most modern image optimization libraries handle this automatically when you set <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">formats: ['image/avif', 'image/webp']</code> in your configuration. You do not need to manage the fallback manually.
        </p>

        {/* Section 8: Practical takeaway and tools */}
        <h2 id="practical-takeaway" className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mt-10 mb-4">
          Practical takeaway and tools
        </h2>
        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          Based on the benchmark data, here is a direct recommendation for different use cases.
        </p>

        <ul className="space-y-3 mb-6 pl-4">
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">New web projects:</strong> use AVIF with JPEG fallback. The 27% size reduction is meaningful for page speed, Core Web Vitals, and bandwidth costs. Browser support is sufficient to make it the default.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">High-volume on-the-fly encoding:</strong> WebP is a reasonable choice if AVIF encode time is a bottleneck. The file size difference is real but so is the CPU cost of AVIF at scale.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Grainy or film-look images:</strong> AVIF still wins but by a smaller margin (14% over JPEG for the film-look image). If encode time matters, WebP or JPEG are reasonable alternatives here specifically.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-[#737373] leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-[#525252] shrink-0" />
            <span><strong className="text-[#171717] dark:text-[#E5E5E5]">Existing JPEG-only pipelines:</strong> migrating to AVIF requires testing your encoding setup. The benchmark numbers are averages; individual images can vary. Always measure your actual images.</span>
          </li>
        </ul>

        {/* Inline CTA */}
        <Link href="/tools/convert-to-avif" className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-8">
          <div>
            <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">Free tool: no upload, no signup</p>
            <p className="text-sm font-semibold text-white leading-snug">Convert your images to AVIF now. Runs entirely in your browser.</p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" strokeWidth={1.5} />
        </Link>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          If you have received an AVIF file and need to open or convert it, use the{" "}
          <Link href="/tools/avif-to-jpg" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            AVIF to JPG converter
          </Link>
          . Both tools are free, client-side only, and require no account.
        </p>

        <p className="text-sm text-[#737373] leading-relaxed mb-4">
          For a broader look at format selection strategy, see our guide on{" "}
          <Link href="/blog/best-image-format-for-web-2026" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">
            the best image format for the web in 2026
          </Link>
          .
        </p>

        {/* Related pages */}
        <div className="mt-8 mb-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[#A3A3A3] mb-3">Related guides and tools</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/tools/convert-to-avif" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Convert to AVIF
            </Link>
            <Link href="/tools/avif-to-jpg" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              AVIF to JPG
            </Link>
            <Link href="/blog/best-image-format-for-web-2026" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Best Image Format 2026
            </Link>
            <Link href="/blog/can-i-use-webp-avif-browser-support-2026" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              AVIF Browser Support 2026
            </Link>
            <Link href="/tools/compress" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md text-[#525252] hover:border-[#A3A3A3] hover:text-[#171717] dark:text-[#E5E5E5] bg-white dark:bg-[#1E1E1E] transition-colors">
              Compress Images
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
                q: "Is AVIF smaller than WebP?",
                a: "Yes, at equal perceptual quality. In our benchmark of 5 real photos matched at SSIM 0.98, AVIF was 29% smaller than WebP in total (602K vs 846K). The gap is consistent across all image types tested, from portraits to landscapes to high-grain film images.",
              },
              {
                q: "Why not compare JPEG, WebP, and AVIF at the same quality number?",
                a: "Because the quality number means something different in each codec. Quality 75 in JPEG, quality 75 in WebP, and quality 75 in AVIF produce files at different visual quality levels. Comparing them at the same number is comparing apples to oranges. The correct method is to match perceptual quality (we used SSIM 0.98) and then compare file sizes.",
              },
              {
                q: "Does AVIF lose quality compared to JPEG?",
                a: "No. In this benchmark all three formats were matched to SSIM 0.98 against a lossless source. AVIF achieves that perceptual quality target at a smaller file size, not at lower quality. The output quality is equivalent across all three formats by design.",
              },
              {
                q: "Which browsers support AVIF in 2026?",
                a: "AVIF is supported in Chrome 85+, Firefox 93+, Edge 121+, and Safari 16.4+. Global browser coverage exceeds 92%. The recommended approach is the HTML picture element with an AVIF source and a JPEG fallback, so users on older browsers (particularly pre-16.4 Safari) receive a JPEG automatically.",
              },
              {
                q: "How can I convert images to AVIF for free?",
                a: "SammaPix has a free browser-based AVIF converter at sammapix.com/tools/convert-to-avif. It uses a real WASM encoder and runs entirely in your browser. No image is uploaded to any server, and no account is required.",
              },
              {
                q: "Is my image uploaded when I use SammaPix to convert to AVIF?",
                a: "No. Both the convert-to-avif tool and the avif-to-jpg tool run entirely client-side in your browser. Your images never leave your device. No file is sent to any server.",
              },
              {
                q: "When does WebP still make sense over AVIF?",
                a: "WebP encodes much faster than AVIF, which matters for on-the-fly image processing at high volume. WebP also has a real size advantage over JPEG at medium quality settings (below SSIM 0.96), and it is the better choice for animated images due to broader tooling support. For static high-quality images served to modern browsers, AVIF is the better default.",
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
