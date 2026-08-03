import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Rotate a Photo Free (Batch, Any Angle) [2026]",
  description:
    "Rotate one photo or a batch of 20 at any angle — 90, 180, 270, or a custom degree — free in your browser. No upload, no app install, no signup. Straighten scans, fix crooked horizons, correct EXIF orientation. ZIP download.",
  alternates: {
    canonical: `${APP_URL}/blog/how-to-rotate-a-photo-free`,
  },
  keywords: [
    "how to rotate a photo",
    "rotate multiple images",
    "rotate picture by angle",
    "rotate photo free",
    "rotate image batch",
    "rotate photo online free",
    "rotate multiple photos at once",
    "rotate image by custom angle",
    "rotate photo no app",
    "straighten photo online",
    "rotate jpg free",
    "how to rotate pictures free",
  ],
  openGraph: {
    title: "How to Rotate a Photo Free (Batch, Any Angle) [2026]",
    description:
      "Rotate a single photo or a batch of 20 at any angle, free in your browser. Supports custom angles for straightening scans. Download all as ZIP. No upload, no app, no signup.",
    url: `${APP_URL}/blog/how-to-rotate-a-photo-free`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Rotate a Photo Free (Batch, Any Angle) [2026]",
    description:
      "Rotate photos free, in your browser. Batch 20 at once, custom angle, ZIP download. No upload. Straighten scans, fix EXIF orientation, correct crooked horizons.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/how-to-rotate-a-photo-free`;
const POST_TITLE = "How to Rotate a Photo Free (Batch, Any Angle) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most tools that let you rotate a photo free either upload your images to a server or limit you to preset angles. SammaPix Rotate Image runs 100% in your browser via the Canvas API, supports any angle from 0 to 360 degrees, processes batches of up to 20 photos at once, and delivers all rotated files as a ZIP — with no upload and no signup. This guide covers every scenario: fixing sideways phone photos, straightening crooked scans, correcting tilted horizons, and batch-rotating entire event photo sets.",
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
    "how to rotate a photo",
    "rotate multiple images",
    "rotate picture by angle",
    "rotate photo free",
    "rotate image batch",
    "straighten photo online",
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
  name: "How to Rotate a Photo Free (Batch, Any Angle)",
  description:
    "Rotate one photo or a batch of up to 20 photos at any angle — 90, 180, 270 degrees or a custom decimal value — free in your browser using SammaPix Rotate Image. Download all rotated photos as a ZIP.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Rotate Image (browser-based, free, no upload, batch + custom angle)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Rotate Image tool",
      text: "Go to sammapix.com/tools/rotate-image in any modern browser. No account, no app install, no signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop all your photos onto the dropzone",
      text: "Drag up to 20 photos at once onto the dropzone, or click to browse and select multiple files. JPEG, PNG, WebP, GIF, and AVIF are accepted. Every file is loaded into browser memory — nothing is uploaded.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Choose a preset angle or type a custom value",
      text: "Click 90, 180, or 270 for standard rotation. Or click the custom angle field and type any value — for example 3.5 degrees to straighten a slightly tilted scan, or 45 degrees for a creative effect.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Click Rotate",
      text: "The tool processes every photo through the Canvas API in sequence. Each image is drawn onto a canvas at the chosen angle and exported back as an image file. Processing takes milliseconds per photo.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Download individually or as a ZIP",
      text: "Click the download button next to any photo to save it on its own. Or click Download All as ZIP to get all rotated photos in one archive. Everything is assembled and served from browser memory. No server contact.",
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
      name: "How do I rotate multiple photos at once for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go to sammapix.com/tools/rotate-image, drop up to 20 photos at once onto the dropzone, choose your rotation angle (90, 180, 270, or a custom value), and click Rotate. All photos are processed simultaneously in your browser via the Canvas API. When done, click Download All as ZIP to get every rotated photo in one archive. The entire batch runs in-browser — no upload, no account, free.",
      },
    },
    {
      "@type": "Question",
      name: "How do I rotate a photo by a specific angle, not just 90 degrees?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In SammaPix Rotate Image, click the custom angle input field and type any value between 0 and 360 degrees. You can use decimals — for example 3.5 degrees to straighten a slightly crooked scan, 7.2 degrees to level a tilted horizon, or 15 degrees for a deliberate creative tilt. The Canvas API handles arbitrary rotation angles natively with no restrictions on precision.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best free way to rotate a photo without an app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best free, app-free way to rotate a photo is using a browser-based tool like SammaPix Rotate Image. Open the page at sammapix.com/tools/rotate-image in any browser on any device — phone, tablet, or desktop. Drop your photo in, choose the angle, and download the result. No app install, no account, no upload to any server. The rotation runs entirely in your browser using the Canvas API. Works on Windows, Mac, iOS, and Android.",
      },
    },
    {
      "@type": "Question",
      name: "How do I straighten a crooked scan online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scanned documents often come out slightly tilted — 1 to 5 degrees off — because the paper was not placed perfectly flat on the scanner glass. To straighten a crooked scan online: go to sammapix.com/tools/rotate-image, drop your scanned image, and type a precise custom angle — for example 2.3 degrees clockwise to correct a counter-clockwise tilt. The Canvas API applies the exact rotation and the tool exports the straightened image. No upload needed. For a stack of similarly tilted scans, apply the same custom angle to the whole batch.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my phone photo look sideways when I open it on a computer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Smartphone cameras physically capture images in landscape orientation but embed an EXIF Orientation tag telling viewers to display the photo rotated. Apps that read this tag — iOS Photos, Google Photos, Windows Photos, macOS Preview — show the photo correctly. Many other systems ignore the EXIF tag: web upload tools that strip metadata, older CMS platforms, custom image pipelines, and some desktop applications. The result is that the pixel data is sideways but the tag telling viewers to correct it is missing. The permanent fix is to bake the rotation into the pixel data itself, which SammaPix Rotate Image does when you apply the appropriate rotation and re-export.",
      },
    },
    {
      "@type": "Question",
      name: "Can I rotate photos on my phone without an app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Open Chrome, Safari, or Firefox on your phone, go to sammapix.com/tools/rotate-image, and use the browser-based tool as you would on a desktop. The Canvas API is supported by all modern mobile browsers. Tap the dropzone to select photos from your camera roll, choose your angle, tap Rotate, and download the result. The tool works on iOS and Android without any app install.",
      },
    },
    {
      "@type": "Question",
      name: "Does rotating a photo reduce its quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For 90, 180, and 270 degree rotations, the quality impact is minimal. The pixel grid maps exactly with no interpolation artefacts. JPEG output involves one re-encoding cycle at the browser's default quality (around 92 percent), which is visually indistinguishable from the original. PNG output has zero quality loss since PNG is lossless. For custom angles (non-multiples of 90), the browser applies bilinear interpolation to fill pixels that do not map exactly, introducing very slight softness on sharp edges at high zoom. At normal viewing sizes for web and screen use, this is imperceptible. It is the same quality trade-off that Photoshop and Lightroom apply for arbitrary rotation.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HowToRotateAPhotoFreePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-rotate-a-photo-free"
        description="Rotate a single photo or a batch of 20 at any angle — 90, 180, 270, or a custom degree for straightening crooked scans and tilted horizons. Free, in your browser, no upload, no app install. Download all as ZIP."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={9}
        headings={[
          { id: "four-scenarios", title: "Four scenarios where you need to rotate photos free" },
          { id: "how-to-rotate-single", title: "How to rotate a single photo free, step by step" },
          { id: "batch-rotate-multiple", title: "How to rotate multiple photos at once (batch)" },
          { id: "custom-angle-straighten", title: "Custom angle: how to straighten crooked scans and tilted horizons" },
          { id: "rotate-on-phone", title: "How to rotate photos on your phone without an app" },
          { id: "exif-the-real-fix", title: "The permanent fix: why baking rotation into pixels beats EXIF" },
          { id: "format-quality", title: "Format and quality: JPEG vs PNG when rotating" },
          { id: "comparison", title: "Free rotation options compared: browser, app, OS built-in" },
          { id: "related-tools", title: "What to do after rotating: crop, compress, resize" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "SammaPix Rotate Image is a free, browser-based tool that rotates photos with no upload, no app install, and no signup required.",
          "Supports 90, 180, and 270 degree preset rotations plus any custom angle for straightening crooked scans and tilted horizons.",
          "Batch rotate up to 20 photos in one session and download all rotated files as a ZIP — entirely in-browser.",
          "Works on desktop and mobile: Chrome, Safari, Firefox, Edge on Windows, Mac, iOS, and Android.",
          "Rotation is baked into the pixel data, permanently fixing EXIF orientation issues regardless of which app opens the file.",
          "Custom angles use bilinear interpolation — identical to Photoshop — with negligible softness at normal viewing sizes.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/3761508/pexels-photo-3761508.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A person looking at a collection of photos on a table, some tilted and sideways, representing the common need to rotate and straighten photos for free."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Rotating a batch of sideways photos should be a 30-second job, not a 15-minute app workflow.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Rotate your photos free, right now
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Batch rotate up to 20 photos. Any angle: 90, 180, 270, or a custom decimal for straightening scans.
              Download individually or as ZIP. Runs in your browser — no upload, no app, no signup.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/rotate-image"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Rotate Image, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/compress"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Compress Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/remove-bg"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Remove Background <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Four scenarios ──────────────────────────────────── */}

        <h2 id="four-scenarios" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Four scenarios where you need to rotate photos free
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          There are four distinct situations that bring people to look for a free photo rotation tool, and each one has slightly different requirements:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          1. Phone photos appearing sideways on a computer
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You took a portrait photo on your phone and it looks fine in your photos app. But when you open it on Windows, share it to a web form, or upload it to a CMS, it appears sideways. The underlying pixel data is actually sideways — your phone compensated by embedding an EXIF Orientation tag. When a system ignores or strips that tag, you see the raw, sideways pixels. Fix: rotate 90 or 270 degrees to bake the correct orientation into the pixels.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          2. Scanned documents that came out tilted or upside down
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You scanned a stack of documents and some came out upside down (180 degrees off) or at a slight angle (2 to 5 degrees) because the page was not placed perfectly. Flat-angle scans need a custom rotation, not just a preset. Fix: use 180 degrees for upside-down pages, or a custom angle like 2.5 degrees for slightly tilted ones.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          3. A batch of event photos all shot in the wrong orientation
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Someone handed you 15 photos from an event where the photographer held the camera sideways the entire time. You could rotate them one by one in any photo app, but that takes 10 to 15 minutes of clicking. Fix: batch rotate all 15 at once, choose 90 degrees, and download a ZIP with all corrected photos.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          4. Landscape photos with a tilted horizon
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You took a landscape or ocean photo and the horizon is visibly tilted by 3 or 4 degrees. No preset fixes this. Fix: use a custom angle like 3.2 degrees to level the horizon. The Canvas API handles sub-degree precision accurately.
        </p>

        {/* ── Section 2: Single photo step-by-step ──────────────────────── */}

        <h2 id="how-to-rotate-single" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to rotate a single photo free, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This works on desktop and mobile browsers. No app install, no account, no upload:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/rotate-image</strong> in any modern browser — Chrome, Safari, Firefox, or Edge. On mobile: open your browser, type the URL, and proceed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your photo or tap to browse.</strong> On desktop, drag the file from your file manager. On mobile, tap the dropzone and your camera roll or files app will open. Select your photo. It loads into browser memory — no upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Pick your angle.</strong> Click 90 degrees (clockwise quarter turn), 180 degrees (upside down), or 270 degrees (counter-clockwise quarter turn). If you need a specific angle, click the custom field and type it.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Rotate.</strong> The Canvas API processes the image in milliseconds. A preview of the rotated photo appears immediately below.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the result.</strong> Click the download button. The rotated photo is saved to your downloads folder directly from browser memory. No network request occurs.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Total time from opening the tool to having the rotated photo saved: under 30 seconds for most users.
        </p>

        {/* ── Section 3: Batch rotation ──────────────────────────────────── */}

        <h2 id="batch-rotate-multiple" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to rotate multiple photos at once (batch)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Rotating photos one by one is fine for a single image. For a batch of 10 or 20, you need to process all of them with the same angle and download them together. Here is the workflow:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select all photos at once in your file browser.</strong> On Windows: Ctrl+A to select all, or Ctrl+click individual files. On Mac: Command+A or Command+click. On mobile: use the multi-select option in your photos app or Files app. Select up to 20 files.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drag all selected files onto the dropzone.</strong> Or click the dropzone and navigate to the folder, then select all files in the file picker dialog. All files load simultaneously into browser memory. You will see thumbnails of each photo appear in the queue.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose a single rotation angle for the whole batch.</strong> This applies uniformly to every photo. If some photos need a different angle from others, process them in separate batches.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Rotate.</strong> Each photo is processed through the Canvas pipeline in sequence. You will see each rotated preview appear as it completes. For 20 high-resolution photos, the full batch typically completes in 5 to 15 seconds on modern hardware.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Download All as ZIP.</strong> All rotated photos are packaged into a single ZIP archive in browser memory using the JSZip library, then downloaded to your device. No server contact. Original filenames are preserved.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For photographers who receive event photo dumps where every photo is in the wrong orientation, this workflow turns a 15-minute manual task into under 2 minutes — without installing any software.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Batch rotate up to 20 photos at once, free</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Drop 20 photos, choose your angle, click Rotate, download all as ZIP. Entirely in-browser. No upload. No signup.
          </p>
          <Link
            href="/tools/rotate-image"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Rotate Image, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: Custom angle ────────────────────────────────────── */}

        <h2 id="custom-angle-straighten" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Custom angle: how to straighten crooked scans and tilted horizons
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The custom angle feature is the part that separates this tool from a simple &ldquo;rotate 90 degrees&rdquo; button. Here is how to use it for the two most common real-world needs:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Straightening a crooked scan
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When a document comes out of the scanner at a slight tilt, the tell-tale sign is that the text lines are not parallel to the bottom edge of the image. To measure the tilt angle accurately:
        </p>

        <ol className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Open the scanned image in any viewer that shows ruler or grid lines (Windows Photos, macOS Preview, Google Photos).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Look at a long horizontal text line. Estimate by eye how many degrees it is tilted — a text line that drops 1 cm over 20 cm of width is tilted about 2.9 degrees.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            In SammaPix Rotate Image, type that angle in the custom field. If the text tilts downward to the right, rotate counterclockwise (type a negative value or use 360 minus your angle — for example 357 for a 3-degree counterclockwise rotation).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Click Rotate, check the preview, and adjust by 0.5 degree increments if needed. Most document scans need 1 to 4 degrees of correction.
          </li>
        </ol>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Leveling a tilted horizon in a landscape photo
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A tilted horizon is the most common composition problem in outdoor photography. The horizon line should be perfectly horizontal. To correct it:
        </p>

        <ol className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Look at the horizon line. Estimate whether it tilts up to the left or the right, and by roughly how much. A noticeable tilt is typically 2 to 5 degrees.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Type a small counterclockwise angle (354 to 358 degrees) to correct a left-tilting horizon, or a small clockwise angle (2 to 6 degrees) for a right-tilting horizon.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            After rotating, the canvas expands to contain the full rotated image, which means there will be small white or transparent triangles at the corners. After downloading, use{" "}
            <Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">SammaPix Crop to Ratio</Link>{" "}
            to trim those edges if needed.
          </li>
        </ol>

        {/* ── Section 5: Rotate on phone ─────────────────────────────────── */}

        <h2 id="rotate-on-phone" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to rotate photos on your phone without an app
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You can rotate photos on your iPhone or Android phone entirely in the browser — no app download needed:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          On iPhone (Safari or Chrome)
        </h3>

        <ol className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Open Safari or Chrome on your iPhone.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Go to sammapix.com/tools/rotate-image.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Tap the dropzone. iOS will show the standard file picker — tap &ldquo;Photo Library&rdquo; to select from your camera roll. You can select multiple photos using the multi-select option in the picker.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Choose your angle and tap Rotate. Tap Download or Download All as ZIP to save the result to your Files app or camera roll.
          </li>
        </ol>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          On Android (Chrome)
        </h3>

        <ol className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Open Chrome on your Android device.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Go to sammapix.com/tools/rotate-image.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Tap the dropzone to open the file picker. Select from your gallery or tap &ldquo;Files&rdquo; to browse. Android supports multi-select in the picker.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            Choose your angle, tap Rotate, and download. Rotated files save to your Downloads folder.
          </li>
        </ol>

        {/* ── Section 6: EXIF permanent fix ─────────────────────────────── */}

        <h2 id="exif-the-real-fix" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The permanent fix: why baking rotation into pixels beats EXIF
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When most built-in photo apps &ldquo;rotate&rdquo; a photo, they actually just update the EXIF Orientation tag and do not touch the underlying pixel data. This is fast and non-destructive, but it creates a fragile result: any system that does not read EXIF will show the photo in the wrong orientation again.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Systems that commonly ignore EXIF Orientation include:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Upload forms on web platforms (many strip EXIF on upload, leaving the pixel orientation as-is)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            CMS platforms including some versions of WordPress without EXIF-aware image handling
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Image processing pipelines that strip metadata for privacy (like WhatsApp, which strips EXIF on upload)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Email clients that render images without EXIF interpretation
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Older desktop software and image viewers
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix Rotate Image bakes the rotation into the pixel data and resets the EXIF Orientation tag to 1 (normal). After that, every system — regardless of EXIF support — displays the photo correctly because the pixels themselves are in the right orientation. This is the permanent, universal fix.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The only trade-off is that baking the rotation is technically &ldquo;destructive&rdquo; in the sense that it modifies the pixel data. For 90, 180, and 270 degree rotations this is effectively lossless for PNG and involves only a minor JPEG re-compression for JPEG inputs. This is a good trade for the universal compatibility it provides.
        </p>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Bake rotation into your photos permanently</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Fix EXIF orientation problems for good. Every viewer will see the correct orientation.
            No upload, no account. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/rotate-image"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Rotate Image, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/rotate-image-online-no-upload"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              How the no-upload rotation works <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 7: Format and quality ─────────────────────────────── */}

        <h2 id="format-quality" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Format and quality: JPEG vs PNG when rotating
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The output quality depends on the input format and the rotation type. Here is what to expect:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Input format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">90/180/270 rotation quality</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Custom angle quality</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Output format</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">JPEG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">One re-compression at ~92% quality. Visually negligible. File size similar to original.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Bilinear interpolation + one re-compression. Very slight softness at high zoom. Imperceptible at normal viewing size.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">JPEG</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">PNG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Lossless. Every pixel maps exactly. Zero quality loss.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Bilinear interpolation only. Very slight softness on sharp edges at extreme zoom. Lossless output encoding.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">PNG</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">WebP</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Decoded to bitmap, rotated, re-encoded. Quality depends on original compression setting.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Same as JPEG custom angle — bilinear plus re-encoding.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">PNG (for max fidelity)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">GIF</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Decoded as PNG, rotated, exported as PNG. Single frame only (animated GIFs export the first frame).</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Same as PNG custom angle.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">PNG</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 8: Comparison ─────────────────────────────────────── */}

        <h2 id="comparison" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Free rotation options compared: browser, app, OS built-in
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an honest comparison of the free options available for rotating photos:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Option</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Custom angle</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Batch</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">No upload</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">App install</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">SammaPix Rotate Image (this guide)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes — any decimal 0 to 360</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes — up to 20, ZIP download</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes — Canvas API, in-browser</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">No — browser only</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Windows Photos (right-click Rotate)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-600 dark:text-red-400">No — 90 degree only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-600 dark:text-red-400">No — one at a time</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Built-in on Windows</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">macOS Preview</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-600 dark:text-red-400">No — 90 degree only (EXIF update, not pixel bake)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-600 dark:text-red-400">No — one at a time</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Built-in on Mac</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">iOS Photos app</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes (Edit mode slider) — but writes EXIF only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-600 dark:text-red-400">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Built-in on iPhone</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">iLoveIMG (online, upload-based)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-600 dark:text-red-400">No — preset only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes (limited on free)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-600 dark:text-red-400">No — server upload</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">GIMP (desktop app)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes (Script-Fu)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-green-700 dark:text-green-400">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium text-red-600 dark:text-red-400">Yes — install required</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For the combination of custom angle + batch processing + no upload + no app install, the browser-based option is the only viable free choice.
        </p>

        {/* ── Section 9: After rotating ──────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What to do after rotating: crop, compress, resize
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          After rotating, you may need to do additional processing before the photo is ready for its intended use. All of these tools run in your browser with no upload:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">Crop to Ratio</Link></strong>: after rotating a landscape photo by a custom angle, there will be blank corners. Crop those away by setting a ratio (16:9, 4:3, etc.) and the tool crops to fill. Also see the guide{" "}
            <Link href="/blog/crop-photos-perfect-ratios" className="text-[#6366F1] hover:underline">How to crop photos to perfect ratios for print and social media</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/compress" className="text-[#6366F1] hover:underline">Compress Images</Link></strong>: reduce the file size of your rotated photos before uploading to a website, emailing, or sharing. See the guide{" "}
            <Link href="/blog/compress-images-without-losing-quality" className="text-[#6366F1] hover:underline">Compress images without losing quality</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/resizepack" className="text-[#6366F1] hover:underline">Resize Images</Link></strong>: after a 90 or 270 degree rotation, a portrait photo becomes landscape and the dimensions change. Resize to a specific target width and height before uploading.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/remove-bg" className="text-[#6366F1] hover:underline">Remove Background</Link></strong>: for product photos or portrait photos you rotated to the correct orientation, remove the background for use on a white-background e-commerce listing or presentation.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Rotate, then do everything else — all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Rotate, crop, compress, resize, and remove backgrounds without uploading your images anywhere.
            All tools run locally in your browser. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/rotate-image"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Rotate Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
