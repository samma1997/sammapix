import { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import { TOOLS } from "@/lib/tools-metadata";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";
import dynamic from "next/dynamic";

const InstagramGridSplitterClient = dynamic(
  () => import("@/components/tools/InstagramGridSplitterClient")
);

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Instagram Grid Splitter: Split Photo into Grid Free",
  description:
    "Split any photo into an Instagram puzzle grid (3×1, 3×2, 3×3 or custom). Download numbered tiles as ZIP in the correct posting order. 100% in-browser, files never uploaded.",
  keywords: [
    "instagram grid splitter",
    "split photo for instagram",
    "instagram puzzle feed",
    "instagram grid maker",
    "split image into grid",
    "instagram carousel grid",
    "photo grid splitter",
    "instagram puzzle post",
    "split image for instagram free",
    "instagram grid layout maker",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/instagram-grid-splitter`,
  },
  openGraph: {
    type: "website",
    url: `${APP_URL}/tools/instagram-grid-splitter`,
    title: "Instagram Grid Splitter: Split Photo into Grid Free",
    description:
      "Split any photo into an Instagram puzzle grid (3×1, 3×2, 3×3 or custom). Download numbered tiles as ZIP in the correct posting order. 100% in-browser, files never uploaded.",
    siteName: "SammaPix",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Grid Splitter: Split Photo into Grid Free",
    description:
      "Split any photo into an Instagram puzzle grid (3×1, 3×2, 3×3 or custom). Download numbered tiles as ZIP in the correct posting order. 100% in-browser, files never uploaded.",
  },
};

// ── Schema JSON-LD ────────────────────────────────────────────────────────────

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Instagram Grid Splitter · SammaPix",
  description:
    "Free browser-based tool to split a photo into an Instagram puzzle grid. Choose 3×1, 3×2, 3×3 or a custom grid, preview the cut lines, then download numbered tiles as a ZIP ready to post.",
  url: `${APP_URL}/tools/instagram-grid-splitter`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
  },
  creator: {
    "@type": "Organization",
    name: "SammaPix",
    url: APP_URL,
  },
  featureList: [
    "Split photos into 3×1, 3×2, 3×3 or custom grid",
    "Live preview with grid lines overlaid on the image",
    "Tiles automatically numbered in Instagram posting order",
    "Download all tiles as a single ZIP file",
    "100% client-side, files never uploaded to any server",
    "Works on mobile and desktop",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I split a photo for an Instagram grid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Drop your photo onto the tool, choose a grid layout (3×1, 3×2, or 3×3 are the most popular for Instagram puzzle feeds), preview the cut lines, and click Split. Download the ZIP and post the tiles to Instagram starting from file 01.",
      },
    },
    {
      "@type": "Question",
      name: "In what order do I upload the tiles to Instagram?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Instagram fills the profile grid from left to right, top to bottom, but posts appear in reverse chronological order. So you must post the bottom-right tile first and the top-left tile last. The ZIP files are numbered accordingly: file 01 is the first post (bottom-right), and the highest-numbered file is the last post (top-left). Just upload them in numerical order.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Instagram Grid Splitter free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely free. No signup, no watermark, no limit on image size. Everything runs in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Are my photos uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The tool uses the Canvas API directly in your browser. Your image never leaves your device and is never sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "What image formats are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JPG, PNG, and WebP. Output tiles are saved as JPG (quality 92%) for optimal file size when posting to Instagram.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work for a 3×3 Instagram puzzle grid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Select the 3×3 preset and you get 9 tiles numbered 01 through 09 in posting order. The tool works equally well for 3×1 (a single row of 3 posts), 3×2 (6 posts), and custom grids up to 9×9.",
      },
    },
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
      name: "Tools",
      item: `${APP_URL}/tools`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Instagram Grid Splitter",
      item: `${APP_URL}/tools/instagram-grid-splitter`,
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to split a photo for an Instagram puzzle grid",
  description:
    "Use SammaPix Instagram Grid Splitter to cut any photo into equally-sized tiles and post them as a puzzle grid on Instagram.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Drop your photo",
      text: "Drag and drop a JPG, PNG, or WebP image onto the tool, or click to browse.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose a grid layout",
      text: "Pick 3×1, 3×2, or 3×3 for a standard Instagram puzzle feed, or enter a custom number of columns and rows.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Preview and split",
      text: "Check the preview with grid lines overlaid, then click Split. The image is cut into equal tiles instantly in your browser.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download and post",
      text: "Download the ZIP. The tiles are numbered 01, 02, 03... in Instagram posting order. Upload them to Instagram starting from 01.",
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function InstagramGridSplitterPage() {
  const tool = TOOLS["instagram-grid-splitter"];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <main className="min-h-screen bg-white dark:bg-[#191919]">
        {/* Hero */}
        <section className="px-4 sm:px-6 pt-10 pb-4 max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Instagram Grid Splitter · Free
          </h1>
          <p className="text-sm sm:text-base text-[#737373] dark:text-[#A3A3A3] max-w-xl mx-auto mb-2">
            Split any photo into a perfect Instagram puzzle grid. Choose 3&times;1, 3&times;2, 3&times;3
            or a custom layout, then download numbered tiles as a ZIP ready to post.{" "}
            <strong className="text-[#171717] dark:text-[#E5E5E5]">
              Files never leave your device.
            </strong>
          </p>
          <p className="text-xs text-[#A3A3A3] dark:text-[#525252]">
            Supports JPG, PNG, WebP &middot; tiles numbered in correct Instagram posting order
          </p>
        </section>

        {/* Tool */}
        <InstagramGridSplitterClient />

        {/* SEO content */}
        <section className="px-4 sm:px-6 py-10 max-w-3xl mx-auto">
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How it works
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4 leading-relaxed">
            This tool uses the{" "}
            <strong className="text-[#525252] dark:text-[#A3A3A3]">Canvas API</strong> to slice
            your image into equal tiles directly in your browser. There is no server involved,
            your photo is never uploaded, and there is no watermark. You get clean JPG tiles
            numbered in the exact order Instagram requires.
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            After splitting, crop or resize your original image with{" "}
            <Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">
              Crop to Ratio
            </Link>{" "}
            before splitting if you want a perfectly square or rectangular source. To compress
            the tiles before uploading, use{" "}
            <Link href="/tools/compress" className="text-[#6366F1] hover:underline">
              Image Compressor
            </Link>
            .
          </p>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Instagram posting order explained
          </h2>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-4 leading-relaxed">
            Instagram displays posts on a profile grid from left to right, starting at the top.
            But posts are shown in reverse chronological order, so the most recent post appears
            in the top-left slot. For a 3&times;3 puzzle to look correct, you must post the
            bottom-right tile first and the top-left tile last.
          </p>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed">
            The ZIP tiles are numbered so you never have to think about this: file{" "}
            <strong className="text-[#525252] dark:text-[#A3A3A3]">01</strong> is the first post
            (bottom-right), and the highest-numbered file is the last post (top-left). Just post
            them in order.
          </p>

          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Tips for a great Instagram puzzle feed
          </h2>
          <ul className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 leading-relaxed space-y-2 list-disc list-inside">
            <li>
              Use a high-resolution image. Instagram compresses uploads, so start with at least
              1080px width per column (3240px+ for a 3-column grid).
            </li>
            <li>
              Square grids (1:1 aspect ratio per tile) work best. Crop your image to a 3:1, 3:2,
              or 1:1 ratio before splitting, depending on your grid choice.
            </li>
            <li>
              Post all tiles as close together as possible so followers see the puzzle take shape
              as they scroll.
            </li>
            <li>
              Add a consistent caption or CTA on each post so the tiles make sense individually
              as well as together.
            </li>
          </ul>

          {/* FAQ */}
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((q) => (
              <div
                key={q.name}
                className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-xl p-4"
              >
                <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1">
                  {q.name}
                </p>
                <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
                  {q.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related tools */}
        {tool && <RelatedTools toolId="instagram-grid-splitter" />}
      </main>
    </>
  );
}
