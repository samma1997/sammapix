import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "Aspect Ratio in Pixels: 9:16, 16:9, 4:3 and More [2026]",
  description:
    "Complete reference for aspect ratio pixel sizes. 9:16 = 1080x1920, 16:9 = 1920x1080, 4:3 = 1024x768. Includes per-platform sizes for Reels, TikTok, YouTube, Instagram feed. How to calculate any ratio from dimensions.",
  alternates: { canonical: `${APP_URL}/blog/aspect-ratio-in-pixels-guide` },
  keywords: [
    "aspect ratio in pixels",
    "9:16 in pixels",
    "16:9 in pixels",
    "4:3 in pixels",
    "9:16 size",
    "16:9 size",
    "aspect ratio calculator",
    "9:16 resolution",
    "what is 9:16 in pixels",
    "image aspect ratio pixels",
    "ratio to pixels",
    "1080x1920 ratio",
  ],
  openGraph: {
    title: "Aspect Ratio in Pixels: 9:16, 16:9, 4:3 and More [2026]",
    description:
      "9:16 = 1080x1920. 16:9 = 1920x1080. 4:3 = 1024x768. Complete reference for aspect ratio pixel sizes with per-platform guide.",
    url: `${APP_URL}/blog/aspect-ratio-in-pixels-guide`,
    type: "article",
    publishedTime: "2026-08-25",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aspect Ratio in Pixels: 9:16, 16:9, 4:3 and More [2026]",
    description:
      "9:16 = 1080x1920. 16:9 = 1920x1080. Complete pixel reference for every common aspect ratio.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-08-25";
const POST_DATE_FORMATTED = "August 25, 2026";
const POST_URL = `${APP_URL}/blog/aspect-ratio-in-pixels-guide`;
const POST_TITLE = "Aspect Ratio in Pixels: 9:16, 16:9, 4:3 and More [2026]";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Complete reference for converting aspect ratios to pixel dimensions. Covers 9:16, 16:9, 4:3, 1:1, 4:5, 3:2, 2:3, 5:4, 21:9 with per-platform sizes and GCD calculation method.",
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
  keywords: ["aspect ratio in pixels", "9:16 in pixels", "16:9 in pixels", "4:3 in pixels", "ratio calculator"],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",  item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog",  item: `${APP_URL}/blog` },
    { "@type": "ListItem", position: 3, name: POST_TITLE, item: POST_URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is 9:16 in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "9:16 in pixels depends on the base size you choose. The most common sizes are: 720x1280 (HD), 1080x1920 (Full HD, the standard for Reels and TikTok), and 1440x2560 (2K). The rule is: height = width times (16/9), so a width of 1080 gives 1080 x (16/9) = 1920.",
      },
    },
    {
      "@type": "Question",
      name: "What is 16:9 in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "16:9 in pixels: 1280x720 (HD), 1920x1080 (Full HD / 1080p), 2560x1440 (2K / QHD), and 3840x2160 (4K UHD). The rule is: height = width divided by (16/9). For 1920: 1920 / 1.778 = 1080.",
      },
    },
    {
      "@type": "Question",
      name: "What is 4:3 in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "4:3 in pixels: 800x600, 1024x768, 1280x960, 1920x1440, 2048x1536. Width divided by height always equals 1.333. This ratio is standard for iPads, older monitors, and many phone cameras in their native capture mode.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate an aspect ratio from any width and height?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Divide both numbers by their greatest common divisor (GCD). Example: 1920 and 1080 have a GCD of 120. 1920/120 = 16 and 1080/120 = 9, so the ratio is 16:9. Use the SammaPix Aspect Ratio Calculator to do this automatically.",
      },
    },
    {
      "@type": "Question",
      name: "What ratio is 1080x1920?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1080x1920 is a 9:16 image. This is the standard portrait resolution for Instagram Reels and Stories, TikTok, YouTube Shorts, and Snapchat. Width 1080 divided by GCD 120 = 9, height 1920 divided by 120 = 16.",
      },
    },
  ],
};

export default function AspectRatioInPixelsGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlogArticleLayout
        title={POST_TITLE}
        slug="aspect-ratio-in-pixels-guide"
        description="What is 9:16 in pixels? What about 16:9, 4:3, or 4:5? This guide gives you the exact numbers for every common ratio, explains per-platform sizes, and shows how to calculate any ratio from width and height."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Workflow", "Tools"]}
        readingTime={7}
        headings={[
          { id: "what-is-aspect-ratio", title: "What an aspect ratio actually means" },
          { id: "ratio-table",          title: "Every ratio in pixels: full reference table" },
          { id: "9-16",                 title: "9:16 in pixels (Reels, TikTok, Shorts)" },
          { id: "16-9",                 title: "16:9 in pixels (YouTube, HD monitors)" },
          { id: "4-3",                  title: "4:3 in pixels (iPad, classic cameras)" },
          { id: "social-platforms",     title: "Per-platform size guide" },
          { id: "how-to-calculate",     title: "How to calculate ratio from dimensions" },
          { id: "crop-resize",          title: "Cropping and resizing to a ratio" },
          { id: "faq",                  title: "FAQ" },
        ]}
        summary={[
          "9:16 in pixels: 720x1280 (HD), 1080x1920 (Full HD), 1440x2560 (2K). Used for Reels, TikTok, Shorts.",
          "16:9 in pixels: 1280x720, 1920x1080, 3840x2160. Used for YouTube, HD displays, presentations.",
          "4:3 in pixels: 1024x768, 1920x1440, 2048x1536. Used for iPads, older monitors, many phone cameras.",
          "Instagram feed portrait max is 4:5 (1080x1350). Square is 1:1 (1080x1080).",
          "Calculate any ratio by dividing width and height by their greatest common divisor (GCD).",
          "Use the free Aspect Ratio Calculator to convert any ratio to pixels instantly.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Phone screen showing vertical video framing in 9:16 ratio"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              9:16 is the dominant vertical format for Reels, TikTok, and YouTube Shorts. 1080x1920 px is the standard export size.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Calculate any aspect ratio to pixels instantly
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              The SammaPix Aspect Ratio Calculator converts any ratio to pixel dimensions and back.
              Pick 9:16, enter width 1080, get 1080x1920 in one click. No signup, no upload.
            </p>
            <Link
              href="/tools/aspect-ratio"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Aspect Ratio Calculator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >

        {/* Quick Answer */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border-l-4 border-[#6366F1] rounded-r-md">
          <p className="text-xs font-semibold text-[#6366F1] mb-1.5 uppercase tracking-wide">
            Quick Reference
          </p>
          <ul className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed space-y-1">
            <li><strong className="text-gray-900 dark:text-[#E5E5E5]">9:16 in pixels:</strong> 1080 x 1920 (standard), 720 x 1280 (HD), 1440 x 2560 (2K)</li>
            <li><strong className="text-gray-900 dark:text-[#E5E5E5]">16:9 in pixels:</strong> 1920 x 1080 (1080p), 1280 x 720 (720p), 3840 x 2160 (4K)</li>
            <li><strong className="text-gray-900 dark:text-[#E5E5E5]">4:3 in pixels:</strong> 1024 x 768 (XGA), 1920 x 1440, 2048 x 1536 (iPad retina)</li>
            <li><strong className="text-gray-900 dark:text-[#E5E5E5]">1:1 in pixels:</strong> 1080 x 1080 (Instagram square), 720 x 720, 3000 x 3000</li>
            <li><strong className="text-gray-900 dark:text-[#E5E5E5]">4:5 in pixels:</strong> 1080 x 1350 (Instagram portrait feed)</li>
          </ul>
        </div>

        {/* What is an aspect ratio */}
        <h2 id="what-is-aspect-ratio">What an aspect ratio actually means</h2>
        <p>
          An aspect ratio is the relationship between the width and height of an image or screen, expressed as two numbers separated by a colon. The ratio 16:9 means the image is 16 units wide for every 9 units tall. It says nothing about how many pixels the image contains — only the proportions.
        </p>
        <p>
          Two images can have the same aspect ratio and very different resolutions. A 1280x720 image and a 3840x2160 image are both 16:9, but one has four times as many pixels. The ratio tells you the shape; the resolution tells you the size.
        </p>
        <p>
          To convert a ratio to pixel dimensions, you choose a base size. For 9:16 and a width of 1080:
        </p>
        <ul>
          <li>Height = 1080 x (16/9) = <strong>1920</strong></li>
          <li>Result: <strong>1080 x 1920 px</strong></li>
        </ul>
        <p>
          The{" "}
          <Link href="/tools/aspect-ratio">
            Aspect Ratio Calculator
          </Link>{" "}
          does this automatically for any ratio and any base dimension.
        </p>

        {/* Full reference table */}
        <h2 id="ratio-table">Every ratio in pixels: full reference table</h2>
        <p>
          The table below lists every common aspect ratio with its standard pixel sizes, the decimal equivalent, and the main use cases.
        </p>

        <div className="overflow-x-auto my-6">
          <table>
            <thead>
              <tr>
                <th>Ratio</th>
                <th>Common pixel sizes</th>
                <th>Decimal</th>
                <th>Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>9:16</strong></td>
                <td>720x1280, 1080x1920, 1440x2560</td>
                <td>0.5625</td>
                <td>Reels, TikTok, YouTube Shorts, Stories</td>
              </tr>
              <tr>
                <td><strong>16:9</strong></td>
                <td>1280x720, 1920x1080, 3840x2160</td>
                <td>1.778</td>
                <td>YouTube, HD displays, presentations</td>
              </tr>
              <tr>
                <td><strong>1:1</strong></td>
                <td>720x720, 1080x1080, 3000x3000</td>
                <td>1.000</td>
                <td>Instagram square, profile photos, album art</td>
              </tr>
              <tr>
                <td><strong>4:5</strong></td>
                <td>864x1080, 1080x1350, 1440x1800</td>
                <td>0.800</td>
                <td>Instagram portrait feed (tallest allowed)</td>
              </tr>
              <tr>
                <td><strong>3:4</strong></td>
                <td>768x1024, 1200x1600, 1536x2048</td>
                <td>0.750</td>
                <td>Mobile portrait, e-commerce products</td>
              </tr>
              <tr>
                <td><strong>4:3</strong></td>
                <td>1024x768, 1920x1440, 2048x1536</td>
                <td>1.333</td>
                <td>iPad, classic cameras, older screens</td>
              </tr>
              <tr>
                <td><strong>3:2</strong></td>
                <td>1800x1200, 2400x1600, 6000x4000</td>
                <td>1.500</td>
                <td>DSLR cameras, 4x6 prints</td>
              </tr>
              <tr>
                <td><strong>2:3</strong></td>
                <td>800x1200, 1000x1500, 1200x1800</td>
                <td>0.667</td>
                <td>Pinterest pins, portrait prints</td>
              </tr>
              <tr>
                <td><strong>5:4</strong></td>
                <td>1280x1024, 2500x2000, 3000x2400</td>
                <td>1.250</td>
                <td>8x10 photo prints, framed portraits</td>
              </tr>
              <tr>
                <td><strong>21:9</strong></td>
                <td>2560x1080, 3440x1440, 5120x2160</td>
                <td>2.333</td>
                <td>Ultrawide monitors, cinematic banners</td>
              </tr>
              <tr>
                <td><strong>2:1</strong></td>
                <td>1200x600, 2000x1000, 2400x1200</td>
                <td>2.000</td>
                <td>Twitter/X cards, web banners</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 9:16 */}
        <h2 id="9-16">9:16 in pixels</h2>
        <p>
          9:16 is the dominant vertical format for social media video and stories. The ratio means the height is 16/9 times the width. At a width of 1080 px, height = 1080 x (16/9) = <strong>1920 px</strong>.
        </p>
        <p>
          The three standard 9:16 sizes are:
        </p>
        <ul>
          <li><strong>720 x 1280 px</strong> (HD): minimum recommended for TikTok and YouTube Shorts</li>
          <li><strong>1080 x 1920 px</strong> (Full HD): the universal standard for Instagram Reels, Stories, TikTok, and Snapchat</li>
          <li><strong>1440 x 2560 px</strong> (2K): premium quality; larger than most platforms encode at</li>
        </ul>
        <p>
          For any platform, export at <strong>1080 x 1920 px</strong> unless you have a specific reason to go higher. The platforms transcode to lower resolutions anyway. Keep text and faces away from the top and bottom 10% of the frame, where UI overlays appear.
        </p>
        <p>
          Use the{" "}
          <Link href="/crop/9-16">
            crop to 9:16 tool
          </Link>{" "}
          to trim any image to this ratio, then export at 1080x1920.
        </p>

        {/* 16:9 */}
        <h2 id="16-9">16:9 in pixels</h2>
        <p>
          16:9 is the standard widescreen format for YouTube, HD and 4K television, desktop monitors, and presentation slides. The ratio means the width is 16/9 times the height.
        </p>
        <p>
          The three standard 16:9 sizes are:
        </p>
        <ul>
          <li><strong>1280 x 720 px</strong> (720p HD): the minimum for YouTube HD streaming</li>
          <li><strong>1920 x 1080 px</strong> (1080p Full HD): the most common video resolution</li>
          <li><strong>3840 x 2160 px</strong> (4K UHD): used for 4K YouTube uploads and professional production</li>
        </ul>
        <p>
          For YouTube thumbnails, the recommended size is <strong>1280 x 720 px</strong> at 16:9, with a minimum width of 640 px and a file size under 2 MB.
        </p>
        <p>
          Use the{" "}
          <Link href="/crop/16-9">
            crop to 16:9 tool
          </Link>{" "}
          to trim a portrait photo to the widescreen format.
        </p>

        {/* 4:3 */}
        <h2 id="4-3">4:3 in pixels</h2>
        <p>
          4:3 is the classic display ratio used by older monitors, iPads, standard-definition television, Micro Four Thirds cameras, and many phone cameras in their default capture mode. The width is 4/3 times the height.
        </p>
        <p>
          Common 4:3 pixel sizes:
        </p>
        <ul>
          <li><strong>640 x 480 px</strong> (VGA): legacy web and video standard</li>
          <li><strong>1024 x 768 px</strong> (XGA): older laptop and monitor standard</li>
          <li><strong>1920 x 1440 px</strong>: high-resolution 4:3, used for some digital cameras</li>
          <li><strong>2048 x 1536 px</strong>: iPad Retina display resolution (older models)</li>
        </ul>
        <p>
          For iPad wallpapers, crop to 4:3 and export at 2048 x 1536 px for the sharpest result.
          Use the{" "}
          <Link href="/crop/4-3">
            crop to 4:3 tool
          </Link>
          {" "}to trim any image to this format.
        </p>

        {/* Social platforms */}
        <h2 id="social-platforms">Per-platform size guide</h2>
        <p>
          Each platform has specific recommended sizes. Using the exact recommended size prevents the platform from compressing or cropping your image. Here are the definitive sizes for 2026:
        </p>

        <h3>Instagram</h3>
        <ul>
          <li><strong>Reels and Stories:</strong> 9:16, <strong>1080 x 1920 px</strong>. This is full-screen portrait video.</li>
          <li><strong>Portrait feed post:</strong> 4:5, <strong>1080 x 1350 px</strong>. The tallest ratio Instagram allows in the feed. Takes up more scroll space than square.</li>
          <li><strong>Square feed post:</strong> 1:1, <strong>1080 x 1080 px</strong>. Still supported and clean.</li>
          <li><strong>Landscape feed post:</strong> 1.91:1, <strong>1080 x 566 px</strong>. Maximum width post.</li>
        </ul>

        <h3>TikTok</h3>
        <ul>
          <li><strong>Video (standard):</strong> 9:16, <strong>1080 x 1920 px</strong> at 60 fps for best quality.</li>
          <li><strong>Thumbnail:</strong> 9:16, <strong>1080 x 1920 px</strong> or any 9:16 crop.</li>
          <li><strong>Photo mode:</strong> 9:16 recommended; square 1:1 also accepted.</li>
        </ul>

        <h3>YouTube</h3>
        <ul>
          <li><strong>Video:</strong> 16:9, <strong>1920 x 1080 px</strong> (1080p) or <strong>3840 x 2160 px</strong> (4K).</li>
          <li><strong>Thumbnail:</strong> 16:9, <strong>1280 x 720 px</strong> minimum, under 2 MB.</li>
          <li><strong>Shorts:</strong> 9:16, <strong>1080 x 1920 px</strong>.</li>
          <li><strong>Channel art / banner:</strong> 2560 x 1440 px (safe zone 1546 x 423 px center).</li>
        </ul>

        <h3>Pinterest</h3>
        <ul>
          <li><strong>Standard pin:</strong> 2:3, <strong>1000 x 1500 px</strong>. Anything taller is truncated.</li>
          <li><strong>Square pin:</strong> 1:1, 1000 x 1000 px.</li>
          <li><strong>Story pin:</strong> 9:16, 1080 x 1920 px.</li>
        </ul>

        <h3>Twitter / X</h3>
        <ul>
          <li><strong>In-stream photo:</strong> 2:1, <strong>1200 x 600 px</strong>. Shown at this ratio in the feed.</li>
          <li><strong>Profile photo:</strong> 400 x 400 px minimum.</li>
          <li><strong>Header:</strong> 1500 x 500 px (3:1 ratio).</li>
        </ul>

        {/* How to calculate */}
        <h2 id="how-to-calculate">How to calculate ratio from dimensions</h2>
        <p>
          To find the aspect ratio of any pair of pixel dimensions, divide both by their greatest common divisor (GCD). The GCD is the largest number that divides both values without a remainder.
        </p>
        <p>
          <strong>Example: what ratio is 1920 x 1080?</strong>
        </p>
        <ol>
          <li>Find GCD(1920, 1080). The GCD is 120.</li>
          <li>Divide: 1920 / 120 = 16, 1080 / 120 = 9.</li>
          <li>Result: <strong>16:9</strong>.</li>
        </ol>
        <p>
          <strong>Example: what ratio is 1080 x 1920?</strong>
        </p>
        <ol>
          <li>GCD(1080, 1920) = 120.</li>
          <li>Divide: 1080 / 120 = 9, 1920 / 120 = 16.</li>
          <li>Result: <strong>9:16</strong>.</li>
        </ol>
        <p>
          <strong>Example: what ratio is 1200 x 628?</strong>
        </p>
        <ol>
          <li>GCD(1200, 628) = 4.</li>
          <li>Divide: 1200 / 4 = 300, 628 / 4 = 157.</li>
          <li>Result: <strong>300:157</strong> (not a standard ratio; this is a non-standard Open Graph image size).</li>
        </ol>
        <p>
          When the simplified ratio does not match a standard name, the image is a non-standard proportion. The{" "}
          <Link href="/tools/aspect-ratio">
            Pixels to ratio tab
          </Link>{" "}
          in the calculator handles this automatically, showing you both the simplified form and whether it matches a standard name.
        </p>

        {/* Crop and resize */}
        <h2 id="crop-resize">Cropping and resizing to a ratio</h2>
        <p>
          Knowing the pixel dimensions is only the first step. To actually change your image to the correct ratio:
        </p>
        <ul>
          <li>
            <strong>Crop (change the shape):</strong> Use the SammaPix crop tools. Each ratio has its own page with a live crop box locked to that ratio. The crop removes pixels outside the selection without changing the remaining pixel quality.
          </li>
          <li>
            <strong>Resize (change the total pixel count):</strong> After cropping, use the{" "}
            <Link href="/tools/resize">
              image resizer
            </Link>{" "}
            to scale the cropped image to the exact pixel dimensions you need (e.g. 1080 x 1920 px for a 9:16 Reel).
          </li>
        </ul>
        <p>
          The crop tools available for each standard ratio:
        </p>
        <ul>
          <li><Link href="/crop/9-16">Crop to 9:16</Link> (Reels, Stories, TikTok, Shorts)</li>
          <li><Link href="/crop/16-9">Crop to 16:9</Link> (YouTube, presentations)</li>
          <li><Link href="/crop/1-1">Crop to 1:1</Link> (Instagram square, profile photos)</li>
          <li><Link href="/crop/4-5">Crop to 4:5</Link> (Instagram portrait feed)</li>
          <li><Link href="/crop/3-4">Crop to 3:4</Link> (mobile portrait, products)</li>
          <li><Link href="/crop/4-3">Crop to 4:3</Link> (iPad, classic cameras)</li>
          <li><Link href="/crop/3-2">Crop to 3:2</Link> (DSLR, 4x6 prints)</li>
          <li><Link href="/crop/2-3">Crop to 2:3</Link> (Pinterest, portrait prints)</li>
          <li><Link href="/crop/5-4">Crop to 5:4</Link> (8x10 prints)</li>
          <li><Link href="/crop/21-9">Crop to 21:9</Link> (ultrawide, banners)</li>
        </ul>
        <p>
          Prefer to look up the numbers first? Each ratio has a dedicated{" "}
          <Link href="/aspect-ratio">aspect ratio in pixels</Link> page with the exact sizes and a
          full dimensions table:
        </p>
        <ul>
          <li><Link href="/aspect-ratio/9-16">9:16 in pixels</Link> (1080 x 1920 and more)</li>
          <li><Link href="/aspect-ratio/16-9">16:9 in pixels</Link> (1280 x 720, 1920 x 1080, 4K)</li>
          <li><Link href="/aspect-ratio/1-1">1:1 in pixels</Link> (square sizes)</li>
          <li><Link href="/aspect-ratio/4-5">4:5 in pixels</Link> (Instagram portrait)</li>
          <li><Link href="/aspect-ratio/3-4">3:4 in pixels</Link> (mobile portrait, products)</li>
          <li><Link href="/aspect-ratio/4-3">4:3 in pixels</Link> (iPad, classic cameras)</li>
          <li><Link href="/aspect-ratio/3-2">3:2 in pixels</Link> (DSLR, 4x6 prints)</li>
          <li><Link href="/aspect-ratio/21-9">21:9 in pixels</Link> (ultrawide, banners)</li>
          <li><Link href="/aspect-ratio/a4">A4 in pixels</Link> (72 / 150 / 300 DPI print sizes)</li>
        </ul>

        {/* FAQ */}
        <h2 id="faq">FAQ</h2>

        {faqSchema.mainEntity.map((q) => (
          <div key={q.name} className="mb-6">
            <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">{q.name}</h3>
            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{q.acceptedAnswer.text}</p>
          </div>
        ))}

      </BlogArticleLayout>
    </>
  );
}
