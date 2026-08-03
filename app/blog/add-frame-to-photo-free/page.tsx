import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Add a Frame to a Photo Free (Any Color) [2026]",
  description:
    "Add a frame or border to any photo free — white for Instagram, black for print, Polaroid-style, or any custom color. No upload, no server, runs in your browser via Canvas. Batch + ZIP. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/add-frame-to-photo-free`,
  },
  keywords: [
    "add frame to photo free",
    "add frame to photo",
    "photo border maker",
    "polaroid border",
    "white border instagram",
    "instagram white border photo",
    "add frame to photo online",
    "photo frame maker free",
    "add border to photo for instagram",
    "polaroid photo border free",
    "add white frame to photo",
    "print passepartout online",
    "add frame to image free",
    "batch add border photos",
    "photo border generator free",
  ],
  openGraph: {
    title: "How to Add a Frame to a Photo Free (Any Color) [2026]",
    description:
      "Add a white, black, Polaroid-style, or custom-color frame to any photo free in your browser. No upload, no server. Batch 20 photos, ZIP download. Instagram white border, print passepartout, uniform batch borders.",
    url: `${APP_URL}/blog/add-frame-to-photo-free`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Add a Frame to a Photo Free (Any Color) [2026]",
    description:
      "Photo frame tool that runs 100% in your browser via Canvas. White Instagram border, Polaroid, print passepartout, any color. Batch 20 photos, ZIP. Free, no upload.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/add-frame-to-photo-free`;
const POST_TITLE = "How to Add a Frame to a Photo Free (Any Color) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Adding a frame or border to a photo should not require a paid app or a server that keeps a copy of your image. SammaPix Add Border runs entirely in your browser using the Canvas API — no upload, no signup, no server. This guide covers the most popular photo framing use cases: Instagram white borders, Polaroid-style borders, print passepartout, and batch-uniform borders, all achievable in minutes with any color.",
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
    "add frame to photo free",
    "photo border maker",
    "polaroid border",
    "white border instagram",
    "instagram white border",
    "print passepartout",
    "add frame to photo online",
  ],
};

// ── Breadcrumb schema ─────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${APP_URL}/blog` },
    {
      "@type": "ListItem",
      position: 3,
      name: POST_TITLE,
      item: POST_URL,
    },
  ],
};

// ── HowTo schema ──────────────────────────────────────────────────────────────

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Add a Frame to a Photo Free",
  description:
    "Add a white, black, Polaroid-style, or custom-color frame to one or more photos in your browser with no file upload, using SammaPix Add Border powered by the HTML Canvas API. Supports Instagram white borders, print passepartout, batch processing, and ZIP download.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Add Border (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Add Border tool",
      text: "Go to sammapix.com/tools/add-border in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your photos onto the tool",
      text: "Drag one or more photos onto the dropzone or click to browse. You can load up to 20 files at once. The files are read locally by your browser — nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Choose your frame color",
      text: "Pick white (#FFFFFF) for Instagram or Polaroid, black (#000000) for a dramatic frame, or any custom HEX color for brand or print use. The color picker accepts any CSS color value.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Set the frame thickness",
      text: "For Instagram white borders, 15 to 30px works well on standard photo sizes. For a Polaroid effect, use 30 to 50px on top and sides with 80 to 120px at the bottom. For fine art print passepartout, 80 to 150px per side is standard.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Select expand mode",
      text: "For framing effects where you want the full photo visible, choose expand mode. The canvas grows by the border thickness, your entire original image remains untouched. Use inset only when you need the output to stay at the same dimensions.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Click Add Border and download",
      text: "The tool draws each photo onto an HTML Canvas element with the frame applied and exports it. Download each framed photo individually or click Download All as ZIP to get all files in a single archive.",
    },
  ],
};

// ── FAQ schema ────────────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I add a white border to a photo for Instagram without uploading it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go to sammapix.com/tools/add-border in your browser. Drop your photo onto the tool, set the color to white (#FFFFFF), choose a thickness (15 to 30px for a standard Instagram border), select expand mode so the full image is preserved, and click Add Border. Download the result. The entire process runs in your browser via the Canvas API — nothing is uploaded to any server. You can verify by opening the Network inspector (F12) and watching for outgoing requests while the tool processes your image. You will see none.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create a Polaroid-style border on a photo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Polaroid border has a wider bottom strip than the sides (the classic instant photo look). With SammaPix Add Border, use expand mode and a white border at 30 to 40px thickness for the uniform surround — this handles the top and sides. For a more authentic Polaroid effect with a distinctly wider bottom, the tool currently applies uniform borders; to get the asymmetric bottom you can add a uniform border and then use an image editor to extend the bottom further. For a clean symmetric Polaroid look (equal borders all around), 30 to 50px white in expand mode on a square-cropped photo works perfectly.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I add a white border to Instagram photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Instagram crops photos to square (1:1) in the profile grid view. When you post a landscape photo (16:9 or 4:3), Instagram shows only the center portion in the grid, hiding the left and right sides of your composition. Adding a white border using expand mode pads the image so the full photo is visible without any cropping. The white padding fills the square frame. This technique is widely used by photographers who prioritize showing the full image as composed, rather than letting Instagram auto-crop their work. It also creates a consistent, editorial grid aesthetic that many photography accounts use intentionally.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add a frame to multiple photos at once for uniform results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix Add Border supports batch processing of up to 20 photos per session. Drop all your photos at once, set your frame color and thickness, choose expand or inset mode, and click Add Border. The same settings are applied identically to every photo in the batch. This ensures consistent framing across a product catalog, event gallery, or social media set. Download all framed photos as a single ZIP archive, assembled in-browser without any server upload.",
      },
    },
    {
      "@type": "Question",
      name: "What is a passepartout and how do I create one for print?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A passepartout (also called a mat or window mat) is the border of solid-color material — usually white or off-white — placed between a photo and its frame in print display. It creates visual breathing room around the image and is a standard component of framed fine art photography. To create a digital passepartout for print using SammaPix Add Border: choose expand mode, set the color to white (#FFFFFF) or off-white (#FAF7F2 for a warmer cream), and set the thickness. For an A4 print at 300 DPI (2480x3508 pixels), 150 to 200px corresponds to approximately 12 to 17mm — a standard passepartout width. For larger prints, scale up proportionally. The output file with the expanded canvas can go directly to a print lab.",
      },
    },
    {
      "@type": "Question",
      name: "Does adding a frame change my photo's file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, in expand mode. Since the canvas grows by the border thickness on all sides, the output image has more pixels than the input, and the file size increases proportionally. For a 1200x900 photo with a 30px white border in expand mode, the output is 1260x960 — about 11% more pixels. The file size increase depends on the format: JPEG files re-encode at ~92% quality, and the solid-color border area compresses very efficiently (flat areas compress well in both JPEG and PNG), so the actual file size increase is often less than the pixel count increase suggests. In inset mode, the output dimensions match the input exactly, so file size stays roughly the same.",
      },
    },
    {
      "@type": "Question",
      name: "What image formats does the Add Border tool support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool accepts JPEG, PNG, WebP, GIF, and AVIF — any format that modern browsers can decode natively. The output is exported as the same format as the input where possible. JPEG inputs produce JPEG output (re-encoded at ~92% quality). PNG inputs produce PNG output with zero quality loss. WebP inputs produce WebP output in browsers that support WebP canvas export (Chrome, Edge, Safari 14+). If you need the framed image in a different format after adding the border, use the SammaPix convert tools to convert between formats.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AddFrameToPhotoFreePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="add-frame-to-photo-free"
        description="Adding a white border for Instagram, a Polaroid-style frame for social posts, or a print passepartout for framed wall art all come down to the same tool: SammaPix Add Border. It runs entirely in your browser via the Canvas API — no upload, no signup, no server. This guide covers every major photo framing use case with exact settings for each."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Creative"]}
        readingTime={9}
        headings={[
          { id: "why-add-a-frame", title: "Why photographers add frames and borders to photos" },
          { id: "instagram-white-border", title: "Instagram white border: show the full photo without cropping" },
          { id: "polaroid-border", title: "Polaroid-style border: the classic instant photo look" },
          { id: "print-passepartout", title: "Print passepartout: museum-style framing for wall art" },
          { id: "batch-uniform-frames", title: "Batch-uniform frames: consistent look across a full gallery" },
          { id: "step-by-step", title: "How to add a frame to a photo free, step by step" },
          { id: "color-guide", title: "Which frame color to use for each purpose" },
          { id: "quality-and-file-size", title: "How framing affects quality and file size" },
          { id: "comparison-table", title: "Honest comparison: SammaPix vs paid border tools" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-image-tools", title: "Other image tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Adding a frame or border to a photo is one of the most common photo editing tasks — for Instagram white borders, Polaroid effects, and print passepartout.",
          "Most tools that do this upload your photo to a server. SammaPix Add Border runs entirely in your browser using the Canvas API. Your file never leaves your device.",
          "The Instagram white border technique keeps your full landscape or portrait composition visible in the feed grid without Instagram cropping it.",
          "Polaroid-style borders and print passepartout effects are both achievable with white borders in expand mode, with specific thickness values for each look.",
          "Batch-process up to 20 photos in one session and download all framed files as a ZIP — entirely in-browser.",
          "You can verify no upload happens by watching the Network inspector in DevTools while the tool runs.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1647972/pexels-photo-1647972.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A collection of printed photos with white borders laid out on a wooden surface, illustrating the classic bordered photo aesthetic used on Instagram and in print."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A white border gives photos an editorial, intentional look — whether for Instagram or a printed album.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Add a frame to your photos right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Add Border runs entirely in your browser via the Canvas API. White, black, or any custom color.
              Expand or inset mode. Batch 20 photos at once. Download individually or as ZIP. Free, no signup.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/add-border"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Add Border, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/croproatio"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Crop to Ratio <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/resizepack"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Resize Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Why add a frame ────────────────────────────────── */}

        <h2 id="why-add-a-frame" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why photographers add frames and borders to photos
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Borders and frames serve specific, practical purposes in photography — not just aesthetic ones. Here are the most common reasons you might need to add a frame to a photo:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Instagram white border:</strong> prevent Instagram from cropping your landscape or portrait photo in the grid view by adding white padding that absorbs the crop.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Polaroid effect:</strong> add a classic thick white border to create the look of an instant photo print — a format that has seen a strong revival in social media photography aesthetics.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Print passepartout:</strong> create a digital mat border around a photo before sending it to a print lab, replicating the museum-style framing that makes prints look more substantial on a wall.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Consistent grid aesthetic:</strong> apply a uniform border to every photo in a social media set, product catalog, or portfolio to create a cohesive visual identity.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Brand border:</strong> add a border in a specific brand color to a batch of product images — useful for catalogs, presentations, and e-commerce listings.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Each of these use cases has different requirements for color, thickness, and mode. This guide covers each one with specific settings and explains how to achieve the result using{" "}
          <Link href="/tools/add-border" className="text-[#6366F1] hover:underline">SammaPix Add Border</Link>{" "}
          — a tool that processes everything in your browser with no upload required.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What &ldquo;no upload&rdquo; actually means
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop a photo into SammaPix Add Border, your browser reads the file using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API for reading local files without network access. The photo is decoded into pixel data, composited with the frame on an{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">HTML Canvas element</a>,{" "}
          and exported as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL downloaded directly from browser memory. Zero network requests carry your photo to any remote server.
        </p>

        {/* ── Section 2: Instagram white border ───────────────────────────── */}

        <h2 id="instagram-white-border" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Instagram white border: show the full photo without cropping
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Instagram&apos;s profile grid displays every post cropped to a square thumbnail. When you post a landscape photo — shot at 16:9 from a camera, or 4:3 from most smartphones — the grid shows only the center square portion. The left and right edges of your image, where you often have important subject matter or deliberate negative space, are invisible in the grid.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The white border technique is the standard solution. By adding white padding to the top and bottom of a landscape photo (or left and right of a portrait), you expand the canvas until it becomes square. Instagram then crops the square, and since the padding is white, no image content is lost — the full original photo is visible inside the white frame.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Exact settings for Instagram white borders
        </h3>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Photo aspect ratio</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Color</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Thickness</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Mode</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">4:3 (standard phone)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">White</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">20 to 30px + adjust to square</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Expand</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full image visible in grid with clean white padding</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">16:9 (camera/drone)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">White</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">20px + adjust to square</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Expand</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Wide shot fully visible with significant white above and below</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Any (aesthetic grid)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">White</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">20px uniform</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Expand</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Consistent editorial border across all grid posts</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Many photographers simply add 20px of white border to every single post, regardless of the aspect ratio. This creates a consistent visual signature in the grid — every photo has the same white strip around it, making the feed look intentional and polished. The 20px border is small enough that it does not dominate the image but large enough to be clearly visible as a deliberate design choice.
        </p>

        {/* ── Section 3: Polaroid border ───────────────────────────────────── */}

        <h2 id="polaroid-border" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Polaroid-style border: the classic instant photo look
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Polaroid format — a wide white border with an especially thick bottom strip — has become one of the most recognizable photo aesthetics in social media. It evokes instant film photography, nostalgia, and a casual but curated aesthetic that works especially well for travel, lifestyle, and food photography.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The classic Polaroid OneStep camera produced a 3.1 x 3 inch image area within a 3.5 x 4.2 inch frame — meaning the bottom border is approximately 60% wider than the top and sides. This asymmetry is the signature of the format.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Creating a Polaroid-style look with a uniform border
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix Add Border applies a uniform border — equal thickness on all four sides. For a symmetric Polaroid-inspired look (cleaner than the asymmetric original), use these settings:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Color:</strong> white (#FFFFFF)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Thickness:</strong> 30 to 50px for a photo at around 1200px wide. Scale up proportionally for larger images — try 60 to 80px for a 2400px photo.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Mode:</strong> expand — so the full square image is preserved inside the border.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Starting photo:</strong> crop to 1:1 (square) first using{" "}
            <Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">SammaPix Crop to Ratio</Link>{" "}
            before adding the Polaroid border. A square photo with a uniform white border looks most like the Polaroid format.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The result is a photo that appears to float in a white print border, with clear visual separation between the image and its surroundings — the hallmark of the Polaroid aesthetic.
        </p>

        {/* ── Section 4: Print passepartout ─────────────────────────────────── */}

        <h2 id="print-passepartout" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Print passepartout: museum-style framing for wall art
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A passepartout (or mat board, or window mat) is the thick white or off-white border placed between a printed photo and its frame in museum and gallery display. Its practical purpose is to prevent the print from touching the glass, which causes condensation damage. Its visual purpose is to give the eye space to settle on the image before it hits the frame — creating what photographers call &ldquo;visual breathing room.&rdquo;
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You can create a digital passepartout by adding a wide white border to your photo before sending it to a print lab. The lab prints the entire image including the border, and you frame it with a simple frame — no separate mat board required.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Passepartout thickness reference by print size
        </h3>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Print size</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Resolution</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Border thickness (10mm passepartout)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Border thickness (20mm passepartout)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">A4 (21 x 29.7 cm)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">300 DPI: 2480x3508 px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">118px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">236px</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">A3 (29.7 x 42 cm)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">300 DPI: 3508x4961 px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">118px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">236px</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">8x10 in (20 x 25 cm)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">300 DPI: 2400x3000 px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">118px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">236px</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For fine art prints, off-white or cream (#FAF7F2 or #F5F0E8) rather than pure white (#FFFFFF) tends to look more sophisticated and avoids the harsh brightness that pure white can produce under gallery lighting.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Add a frame to your photos right now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Instagram white border, Polaroid look, or print passepartout. Batch 20 photos. Any color. Download as ZIP.
            No upload. No signup. Free.
          </p>
          <Link
            href="/tools/add-border"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Add Border, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: Batch uniform frames ──────────────────────────────── */}

        <h2 id="batch-uniform-frames" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Batch-uniform frames: consistent look across a full gallery
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most powerful use of a border tool is not adding a frame to one photo — it is adding the same frame to an entire set of photos in one batch. This is the workflow that saves hours for photographers who deliver cohesive sets: event galleries, product catalogs, wedding albums, real estate photo sets, or social media content batches.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix Add Border supports up to 20 photos per batch. Drop them all at once, set your color and thickness once, choose expand or inset once, and click Add Border. Every photo in the batch receives identically configured borders. Download all as a ZIP and deliver directly.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Common batch workflows:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Product catalog:</strong> 15 to 20 product shots, all needing the same thin black border for a consistent e-commerce listing look. One batch, one download.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Instagram month batch:</strong> 20 posts prepared in advance, all with 20px white borders applied uniformly before scheduling.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Event gallery delivery:</strong> 20 selected hero shots from a wedding or event, all framed identically for a client album with consistent white passepartout borders.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Portfolio print set:</strong> 15 prints for a gallery submission, all requiring the same cream passepartout border at the exact same thickness.
          </li>
        </ul>

        {/* ── Section 6: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to add a frame to a photo free, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process for a single photo or a batch of 20 takes under a minute:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/add-border</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your photos onto the dropzone</strong> or click to browse. Select multiple files at once for batch processing. Accepted formats include JPEG, PNG, WebP, GIF, and AVIF.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose your frame color.</strong> White (#FFFFFF) for Instagram or Polaroid. Black (#000000) for a dramatic frame. Off-white (#FAF7F2) for fine art passepartout. Or enter any HEX code.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set the frame thickness.</strong> 20px for Instagram borders. 30 to 50px for Polaroid. 120 to 200px for print passepartout at 300 DPI.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select expand mode</strong> in almost all framing use cases. This grows the canvas so the full photo is preserved. Use inset only when the output must match the input dimensions exactly.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Add Border.</strong> Each photo is processed through the Canvas pipeline in sequence. Previews appear below. Processing is nearly instant on modern hardware.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download individually or as ZIP.</strong> Click the download icon next to any image, or click Download All as ZIP. Files are served from browser memory — no network request occurs.
          </li>
        </ol>

        {/* ── Section 7: Color guide ─────────────────────────────────────── */}

        <h2 id="color-guide" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Which frame color to use for each purpose
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The color of a border changes the feel of a photo significantly. Here is a reference guide:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Color</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">HEX</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Feel</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">White</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">#FFFFFF</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Clean, editorial, modern, airy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Instagram grids, Pinterest, Polaroid, lifestyle photography</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Black</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">#000000</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Dramatic, bold, cinematic, film-like</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Dark-tone photography, concert images, street photography, moodier aesthetics</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Off-white / cream</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">#FAF7F2</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Warm, organic, museum-quality, sophisticated</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Fine art print passepartout, wedding photos, warm-tone portraits</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Gray</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">#9E9E9E</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Neutral, minimal, understated</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Portfolio presentation, professional document images, product shoots with neutral backgrounds</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Brand color</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-mono text-xs">Any HEX</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Branded, cohesive, recognizable</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Product catalogs, e-commerce, branded social posts, press materials</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 8: Quality and file size ──────────────────────────────── */}

        <h2 id="quality-and-file-size" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How framing affects quality and file size
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Adding a frame using SammaPix Add Border involves two considerations: image quality and file size.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Image quality
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The original image is composited onto the canvas using the browser&apos;s built-in image decoder, which preserves source pixel values exactly. The border pixels are new solid-color values drawn precisely by the Canvas API. The only quality consideration is the JPEG re-encoding step at export — approximately 92% quality, which is visually indistinguishable from the original at any normal viewing size. PNG inputs are exported losslessly.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          File size
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In expand mode, the output has more pixels than the input (the canvas grows), so the file size increases. However, solid-color border areas compress extremely efficiently in both JPEG and PNG — flat regions of uniform color take very few bits to encode. A 30px white border on a 1200px photo increases pixel count by about 10%, but the actual file size increase is often only 2 to 5% because the border compresses to almost nothing. Thick passepartout borders (150px+) may add more file size but still compress far more efficiently than photographic content.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If file size is a concern after framing, use{" "}
          <Link href="/tools/compress" className="text-[#6366F1] hover:underline">SammaPix Compress</Link>{" "}
          to reduce the bordered file before uploading. See{" "}
          <Link href="/blog/compress-images-without-losing-quality" className="text-[#6366F1] hover:underline">Compress images without losing quality</Link>{" "}
          for the full approach.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your photos stay on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. JPEG, PNG, WebP, GIF, AVIF. Batch 20 photos. White, black, or any HEX.
            Expand or inset. ZIP download. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/add-border"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Add Border, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/add-border-to-image-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Full technical guide (expand vs inset, Canvas API) <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Honest comparison: SammaPix vs paid border tools
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is how SammaPix Add Border compares to tools typically used for adding frames and borders to photos:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Dimension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Canva / Adobe Express (upload-based)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">SammaPix Add Border (browser-based)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Privacy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Photo uploaded to their server. Stored in your account.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Photo never leaves your device. Verifiable via DevTools.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Batch processing</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free plans process one at a time. Batch requires subscription.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Up to 20 photos per session. ZIP download. Free.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Custom color</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Available in paid plans. Free often limited to presets.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Any HEX color, full spectrum. Free.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Speed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Upload time + server queue. Slow on mobile or slow connections.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Instant. No network latency. Runs on your device CPU.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">No watermark</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free plans often add watermarks to output.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No watermark. Never. Free.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Required. Account creation mandatory.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No account required. Open the tool and start.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 10: Verify no upload ──────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not need to take my word for it. Here is how to verify this yourself in under two minutes:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac) in your browser. On Safari, enable the Develop menu first in Settings → Advanced.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Click the Network panel. Clear any existing requests.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your photos and click Add Border.</strong> Watch the Network panel as the tool processes each file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests.</strong> No network activity occurs during processing or download. Only the initial page load (JavaScript, CSS) generates requests. Your photo bytes never leave your device.
          </li>
        </ol>

        {/* ── Section 11: Related tools ─────────────────────────────────── */}

        <h2 id="related-image-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other image tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based image tools, all with no upload and no server processing. Here are the ones that pair most naturally with Add Border:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/add-border" className="text-[#6366F1] hover:underline">Add Border</Link></strong>: add a white, black, or custom-color frame to any photo. Expand or inset mode, batch up to 20 files, download as ZIP. This is the tool this article is about.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">Crop to Ratio</Link></strong>: crop to 1:1 before adding a Polaroid border, or to 4:5 before adding an Instagram white border. See{" "}
            <Link href="/blog/crop-photos-perfect-ratios" className="text-[#6366F1] hover:underline">How to crop photos to perfect ratios</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/compress" className="text-[#6366F1] hover:underline">Compress Images</Link></strong>: reduce the file size of framed photos before uploading to Instagram, a print lab, or a client delivery system. See{" "}
            <Link href="/blog/compress-images-without-losing-quality" className="text-[#6366F1] hover:underline">Compress images without losing quality</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/rotate-image" className="text-[#6366F1] hover:underline">Rotate Image</Link></strong>: correct orientation before framing. If a photo is sideways, rotate it first, then add the border. See{" "}
            <Link href="/blog/rotate-image-online-no-upload" className="text-[#6366F1] hover:underline">Rotate an Image Online Without Uploading It</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/resizepack" className="text-[#6366F1] hover:underline">Resize Images</Link></strong>: resize the framed photo to a specific output size required by a print lab or platform. Use after Add Border.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/flip-image" className="text-[#6366F1] hover:underline">Flip Image</Link></strong>: mirror a photo horizontally or vertically before framing, if the composition needs the subject facing a different direction.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your image editing needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Frame, crop, resize, rotate, compress, and flip without uploading your photos anywhere.
            All tools run locally in your browser via Canvas API. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/add-border"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Add Border / Frame <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/croproatio"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Crop to Ratio <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Compress Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/resizepack"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Resize Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}

        <section id="faq">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
            FAQ
          </h2>
          {faqSchema.mainEntity.map((item, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-base font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>

      </BlogArticleLayout>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
