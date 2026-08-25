import { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import { TOOLS } from "@/lib/tools-metadata";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";
import dynamic from "next/dynamic";

const AspectRatioClient = dynamic(() => import("@/components/tools/AspectRatioClient"));

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Aspect Ratio Calculator: 9:16, 16:9, 4:3 in Pixels",
  description:
    "Convert any aspect ratio to exact pixel dimensions instantly. Enter 9:16 and a width to get 1080x1920. Find pixels for 16:9, 4:3, 1:1, 4:5, 3:2, 21:9 and more. Also converts pixels back to a ratio.",
  keywords: [
    "aspect ratio calculator",
    "9:16 in px",
    "9:16 size",
    "16:9 size",
    "4:3 in pixels",
    "ratio to pixels",
    "pixels to ratio",
    "9:16 resolution",
    "16:9 pixels",
    "aspect ratio in pixels",
    "1080x1920 ratio",
    "image aspect ratio",
    "9 16 in pixels",
    "aspect ratio converter",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/aspect-ratio`,
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/aspect-ratio`,
    title: "Aspect Ratio Calculator: 9:16, 16:9, 4:3 in Pixels",
    description:
      "Convert any aspect ratio to pixel dimensions instantly. Enter 9:16 and a width to get 1080x1920. Supports 16:9, 4:3, 1:1, 4:5, 3:2, 21:9. Also converts pixels back to a ratio.",
    siteName: "SammaPix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aspect Ratio Calculator: 9:16, 16:9, 4:3 in Pixels",
    description:
      "Convert any aspect ratio to pixel dimensions instantly. Enter 9:16 and a width to get 1080x1920. Free, no upload.",
  },
};

// ─── JSON-LD schemas ──────────────────────────────────────────────────────────

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Aspect Ratio Calculator · SammaPix",
  description:
    "Free browser-based aspect ratio calculator. Convert any ratio (9:16, 16:9, 4:3, 1:1, 4:5, 3:2, 2:3, 5:4, 21:9) to exact pixel dimensions, convert pixels back to a simplified ratio, and resize keeping the same ratio. 100% in-browser, no file upload.",
  url: `${APP_URL}/tools/aspect-ratio`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: { "@type": "Person", name: "Luca Sammarco" },
  creator: { "@type": "Organization", name: "SammaPix", url: APP_URL },
  featureList: [
    "Convert any aspect ratio to pixel dimensions",
    "Convert pixel dimensions to simplified ratio",
    "Resize keeping aspect ratio with one dimension",
    "Common preset sizes for every ratio",
    "Links to crop and resize tools for each ratio",
    "100% in-browser, no file upload needed",
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
        text: "9:16 is a vertical aspect ratio used for Instagram Reels, Stories, TikTok, YouTube Shorts, and Snapchat. The most common 9:16 pixel sizes are 720x1280 (HD), 1080x1920 (Full HD), and 1440x2560 (2K). Any width-to-height pair where height divided by width equals approximately 1.778 is a 9:16 image.",
      },
    },
    {
      "@type": "Question",
      name: "What is 16:9 in pixels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "16:9 is the standard widescreen ratio for YouTube videos, HD displays, and presentations. Common 16:9 pixel sizes are 1280x720 (HD), 1920x1080 (Full HD / 1080p), and 3840x2160 (4K UHD). The ratio means width is approximately 1.778 times the height.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate aspect ratio from width and height?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Divide both width and height by their greatest common divisor (GCD). For example, 1920 and 1080 share a GCD of 120, so 1920/120 = 16 and 1080/120 = 9, giving you 16:9. This calculator does that automatically: enter your width and height in the Pixels to ratio tab.",
      },
    },
    {
      "@type": "Question",
      name: "What aspect ratio is 1920x1080?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1920x1080 is 16:9. It is the standard Full HD resolution used for YouTube videos, TV screens, desktop monitors, and presentation slides. Dividing both by their GCD of 120 gives 16 and 9.",
      },
    },
    {
      "@type": "Question",
      name: "What is the most common vertical ratio for social media?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "9:16 is the dominant vertical format for social media video: Instagram Reels and Stories, TikTok, YouTube Shorts, and Snapchat all use 9:16 full-screen. The recommended export size is 1080x1920 px. For Instagram feed portrait posts, 4:5 (1080x1350 px) is the recommended format.",
      },
    },
    {
      "@type": "Question",
      name: "Is any data uploaded when I use this calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The aspect ratio calculator is a pure math tool that runs entirely in your browser. There is no file upload and no data sent to any server. All calculations happen locally the moment you type a number.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",  item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Tools", item: `${APP_URL}/tools` },
    { "@type": "ListItem", position: 3, name: "Aspect Ratio Calculator", item: `${APP_URL}/tools/aspect-ratio` },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to find pixel dimensions for an aspect ratio",
  description: "Convert any aspect ratio to exact pixel dimensions using the SammaPix Aspect Ratio Calculator.",
  totalTime: "PT30S",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Select the ratio",
      text: "Open the Ratio to pixels tab and pick your target ratio from the dropdown, such as 9:16 for vertical video or 16:9 for widescreen.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Enter one dimension",
      text: "Type either the width or the height in pixels. The calculator instantly computes the other dimension to maintain the exact ratio.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy or use the result",
      text: "Copy the result with one click, or follow the link directly to the crop or resize tool for that ratio.",
    },
  ],
};

// ─── Reference table data ─────────────────────────────────────────────────────

const REFERENCE_TABLE = [
  {
    ratio: "9:16",
    cropSlug: "9-16",
    sizes: "720x1280, 1080x1920, 1440x2560",
    bestFor: "Instagram Reels, TikTok, YouTube Shorts, Snapchat Stories",
  },
  {
    ratio: "16:9",
    cropSlug: "16-9",
    sizes: "1280x720, 1920x1080, 3840x2160",
    bestFor: "YouTube videos, presentations, desktop wallpapers, TV displays",
  },
  {
    ratio: "1:1",
    cropSlug: "1-1",
    sizes: "720x720, 1080x1080, 3000x3000",
    bestFor: "Instagram square posts, profile photos, album covers",
  },
  {
    ratio: "4:5",
    cropSlug: "4-5",
    sizes: "864x1080, 1080x1350, 1440x1800",
    bestFor: "Instagram portrait feed posts (tallest format allowed)",
  },
  {
    ratio: "3:4",
    cropSlug: "3-4",
    sizes: "768x1024, 1200x1600, 1536x2048",
    bestFor: "Mobile portrait photos, e-commerce product shots",
  },
  {
    ratio: "4:3",
    cropSlug: "4-3",
    sizes: "1024x768, 1920x1440, 2048x1536",
    bestFor: "Classic photos, iPad wallpapers, older presentation templates",
  },
  {
    ratio: "3:2",
    cropSlug: "3-2",
    sizes: "1800x1200, 2400x1600, 6000x4000",
    bestFor: "DSLR photography, 4x6 photo prints, mirrorless cameras",
  },
  {
    ratio: "2:3",
    cropSlug: "2-3",
    sizes: "800x1200, 1000x1500, 1200x1800",
    bestFor: "Pinterest pins, portrait photo prints, posters",
  },
  {
    ratio: "5:4",
    cropSlug: "5-4",
    sizes: "1280x1024, 2500x2000, 3000x2400",
    bestFor: "8x10 inch prints, framed portrait photography",
  },
  {
    ratio: "21:9",
    cropSlug: "21-9",
    sizes: "2560x1080, 3440x1440, 5120x2160",
    bestFor: "Cinematic photography, ultrawide wallpapers, website banners",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AspectRatioPage() {
  const tool = TOOLS["aspect-ratio"];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <main className="min-h-screen bg-white dark:bg-[#191919]">
        {/* Hero */}
        <section className="px-4 sm:px-6 pt-10 pb-4 max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Aspect Ratio Calculator
          </h1>
          <p className="text-sm sm:text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto mb-2">
            Convert any aspect ratio to exact pixel dimensions. Pick 9:16, enter width 1080 and get{" "}
            <strong className="text-[#171717] dark:text-[#E5E5E5]">1080 x 1920 px</strong> instantly.
          </p>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
            9:16, 16:9, 4:3, 1:1, 4:5, 3:2, 21:9 and more · Ratio to pixels, pixels to ratio, resize keeping ratio · Free
          </p>
        </section>

        {/* Calculator */}
        <AspectRatioClient />

        {/* Content section */}
        <section className="px-4 sm:px-6 py-10 max-w-3xl mx-auto">

          {/* Common ratios in pixels (exact query answers) */}
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Common aspect ratios in pixels
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4 leading-relaxed">
            Here are the most searched ratios and their exact pixel dimensions:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4">
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">9:16 in pixels</p>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                The 9:16 vertical format is used for Instagram Reels, TikTok, YouTube Shorts, and Stories.
                The standard sizes are <strong className="text-[#525252] dark:text-[#A3A3A3]">1080 x 1920 px</strong> (Full HD),
                720 x 1280 px (HD), and 1440 x 2560 px (2K). Height is always 16/9 times the width.
              </p>
            </div>
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4">
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">16:9 in pixels</p>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                The 16:9 widescreen format is used for YouTube videos, HD monitors, and presentations.
                Standard sizes: <strong className="text-[#525252] dark:text-[#A3A3A3]">1920 x 1080 px</strong> (1080p),
                1280 x 720 px (720p), and 3840 x 2160 px (4K). Width is always 16/9 times the height.
              </p>
            </div>
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4">
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">4:3 in pixels</p>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                The classic 4:3 ratio is used for iPads, older monitors, and photo prints.
                Common sizes: <strong className="text-[#525252] dark:text-[#A3A3A3]">1024 x 768 px</strong>,
                1920 x 1440 px, and 2048 x 1536 px. Width is 4/3 times the height.
              </p>
            </div>
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4">
              <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">4:5 in pixels</p>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                The 4:5 portrait ratio is the tallest format Instagram allows in the feed.
                The recommended export size is <strong className="text-[#525252] dark:text-[#A3A3A3]">1080 x 1350 px</strong>.
                Height is 5/4 times the width.
              </p>
            </div>
          </div>

          {/* Reference table */}
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Aspect ratio reference table
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#F5F5F5] dark:bg-[#222222]">
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-tl-lg">Ratio</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A]">Common pixel sizes</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A]">Best for</th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-tr-lg">Crop tool</th>
                </tr>
              </thead>
              <tbody>
                {REFERENCE_TABLE.map((row, i) => (
                  <tr key={row.ratio} className={i % 2 === 0 ? "bg-white dark:bg-[#191919]" : "bg-[#FAFAFA] dark:bg-[#1E1E1E]"}>
                    <td className="px-3 py-2.5 font-mono font-semibold text-[#171717] dark:text-[#E5E5E5] border border-[#E5E5E5] dark:border-[#2A2A2A] whitespace-nowrap">{row.ratio}</td>
                    <td className="px-3 py-2.5 text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] whitespace-nowrap">{row.sizes}</td>
                    <td className="px-3 py-2.5 text-[#737373] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A]">{row.bestFor}</td>
                    <td className="px-3 py-2.5 border border-[#E5E5E5] dark:border-[#2A2A2A] whitespace-nowrap">
                      <Link
                        href={`/crop/${row.cropSlug}`}
                        className="text-[#6366F1] hover:underline text-xs font-medium"
                      >
                        Crop to {row.ratio}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Internal links */}
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Crop to an exact ratio
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4 leading-relaxed">
            Once you know the pixel dimensions you need, use the SammaPix crop tools to trim your image to the exact ratio:
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { href: "/crop/9-16",  label: "Crop to 9:16" },
              { href: "/crop/16-9",  label: "Crop to 16:9" },
              { href: "/crop/1-1",   label: "Crop to 1:1" },
              { href: "/crop/4-5",   label: "Crop to 4:5" },
              { href: "/crop/3-4",   label: "Crop to 3:4" },
              { href: "/crop/4-3",   label: "Crop to 4:3" },
              { href: "/crop/3-2",   label: "Crop to 3:2" },
              { href: "/crop/2-3",   label: "Crop to 2:3" },
              { href: "/crop/5-4",   label: "Crop to 5:4" },
              { href: "/crop/21-9",  label: "Crop to 21:9" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] text-sm text-[#525252] dark:text-[#A3A3A3] hover:border-[#6366F1] hover:text-[#6366F1] transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            Need to resize after cropping? Use the{" "}
            <Link href="/tools/resize" className="text-[#6366F1] hover:underline">
              image resizer
            </Link>{" "}
            to scale to any exact pixel size. For compressing the result, see{" "}
            <Link href="/tools/compress" className="text-[#6366F1] hover:underline">
              Image Compress
            </Link>
            . Learn more in the{" "}
            <Link href="/blog/aspect-ratio-in-pixels-guide" className="text-[#6366F1] hover:underline">
              aspect ratio in pixels guide
            </Link>
            .
          </p>

          {/* FAQ */}
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((q) => (
              <div key={q.name} className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4">
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">{q.name}</p>
                <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">{q.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {tool && <RelatedTools toolId="aspect-ratio" />}
      </main>
    </>
  );
}
