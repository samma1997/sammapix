import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Rotate an Image Online Without Uploading It [2026]",
  description:
    "Rotate images 90, 180, or 270 degrees — or any custom angle — entirely in your browser via Canvas. No upload, no server, no signup. Batch rotate 20 photos at once and download a ZIP. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/rotate-image-online-no-upload`,
  },
  keywords: [
    "rotate image online",
    "rotate photo online",
    "rotate image free",
    "rotate image no upload",
    "rotate image without uploading",
    "rotate image browser",
    "rotate picture online free",
    "rotate jpg online",
    "rotate png online",
    "rotate image 90 degrees",
    "rotate image 180 degrees",
    "rotate photo free no signup",
  ],
  openGraph: {
    title: "Rotate an Image Online Without Uploading It [2026]",
    description:
      "Rotate images entirely in your browser via Canvas. No upload, no server, no signup. Supports 90/180/270 and custom angle. Batch rotate 20 photos and download a ZIP. Free.",
    url: `${APP_URL}/blog/rotate-image-online-no-upload`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate an Image Online Without Uploading It [2026]",
    description:
      "Image rotation that runs 100% in your browser via Canvas. No upload, no server. Batch 20 photos, custom angle, ZIP download. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/rotate-image-online-no-upload`;
const POST_TITLE = "Rotate an Image Online Without Uploading It [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most online image rotators upload your photo to a remote server. SammaPix Rotate Image runs entirely in your browser using the Canvas API — the file never leaves your device. This guide explains how browser-based rotation works, what makes it genuinely private, how to rotate a batch of photos at once, and how to verify no upload happens.",
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
    "rotate image online",
    "rotate photo online",
    "rotate image free",
    "rotate image no upload",
    "rotate image browser",
    "rotate picture online free",
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
  name: "How to Rotate an Image Online Without Uploading It",
  description:
    "Rotate one or more images in your browser with no file upload, using SammaPix Rotate Image powered by the HTML Canvas API. Supports 90, 180, 270 degrees and any custom angle.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Rotate Image (browser-based, free, no upload)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Rotate Image tool",
      text: "Go to sammapix.com/tools/rotate-image in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your images onto the tool",
      text: "Drag one or more images onto the dropzone or click to browse. You can load up to 20 files at once. The files are read locally by your browser — nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Choose your rotation angle",
      text: "Select 90, 180, or 270 degrees for a standard rotation. Or type any custom angle between 0 and 360 for precise straightening of tilted photos.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Click Rotate",
      text: "The tool draws each image onto an HTML Canvas element at the chosen angle and exports it back as a JPEG or PNG. Processing happens entirely on your device in milliseconds.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Download individually or as a ZIP",
      text: "Download each rotated image on its own, or click Download All as ZIP to get all rotated files in a single archive. Everything is served from browser memory — no file ever touches a server.",
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
      name: "Does rotating an image online mean uploading it to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With most tools, yes. Canva, Adobe Express, iLoveIMG, and similar services upload your image to their servers for processing. With SammaPix Rotate Image, no. The rotation runs entirely in your browser using the HTML Canvas API — a built-in browser technology for drawing and transforming images locally. Your file never leaves your device. You can verify this yourself by opening your browser's Network inspector (F12) and watching for outgoing requests while the tool rotates your image. You will see none.",
      },
    },
    {
      "@type": "Question",
      name: "How does browser-based image rotation work technically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you drop an image into the tool, your browser reads it using the FileReader API (a standard, offline-capable browser API for local files). The image is decoded into a bitmap and drawn onto an HTML Canvas element. The canvas context is then rotated by the chosen angle using a CSS transform matrix before the image pixels are painted. The rotated result is exported from the canvas as a Blob (a binary file object in memory) and offered for download via a temporary blob: URL. The entire process — load, draw, rotate, export, download — happens in-browser memory with zero network requests carrying your image.",
      },
    },
    {
      "@type": "Question",
      name: "Can I rotate multiple images at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix Rotate Image supports batch rotation of up to 20 images per session. Drop all your files at once onto the dropzone, choose your angle, and click Rotate. Each image is processed independently through the same Canvas pipeline. When done, you can download each rotated file individually or click Download All as ZIP to get every rotated image in a single archive — all from browser memory, with no upload.",
      },
    },
    {
      "@type": "Question",
      name: "Does rotating an image change its quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For 90, 180, and 270 degree rotations, the quality impact is minimal. These are exact rotations: the pixel grid maps cleanly without interpolation artefacts. For custom angles (for example, 7.5 degrees to straighten a crooked scan), the browser applies bilinear interpolation to fill pixels that do not map exactly, which can introduce very slight softness at high magnification. This is the same trade-off you get in Photoshop, Lightroom, or any other image editor. For most practical uses — correcting a sideways phone photo, straightening a scanned document — the visual difference is negligible.",
      },
    },
    {
      "@type": "Question",
      name: "Why do my photos sometimes appear sideways even after shooting them correctly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Phones and cameras embed an Orientation tag in the EXIF metadata of each photo. This tag tells viewers which way to rotate the image when displaying it. Most modern apps (iOS Photos, Google Photos, Chrome) read and apply this tag automatically so the photo looks correct. But many platforms, browsers, and tools ignore it — particularly when you upload a photo to a service that strips EXIF, or open it in an older viewer. The result is that the underlying pixel data is sideways but the EXIF says to rotate it, and when the EXIF is ignored or stripped, you see a sideways image. Rotating the image and re-exporting it bakes the correct orientation directly into the pixel data, so no EXIF interpretation is needed.",
      },
    },
    {
      "@type": "Question",
      name: "What image formats does the rotate tool support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The tool accepts JPEG, PNG, WebP, GIF, and AVIF — any format that modern browsers can decode natively via the built-in image decoder. The output is exported as the same format as the input where possible. JPEG files produce JPEG output. PNG files produce PNG output. GIF and AVIF are decoded and re-exported as PNG to ensure full color fidelity. If you need the output in a different format after rotating, you can convert it using the SammaPix convert tools.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify no upload happens when rotating my image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open your browser developer tools (F12 on Windows/Linux, Command Option I on Mac), click the Network tab, then drop your image into the SammaPix Rotate Image tool and click Rotate. Watch the network panel. You will see requests for static page assets (JavaScript, CSS) when the tool first loads. During the rotation and download, you will see zero outgoing requests. The image is read by the FileReader API, processed entirely in memory via the Canvas API, and the rotated output is downloaded via a blob: URL — no network call is made.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RotateImageOnlineNoUploadPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="rotate-image-online-no-upload"
        description="Every popular image rotator uploads your photo to a server. SammaPix is different: it rotates images entirely in your browser via the Canvas API, with no upload, no signup, and no server involved. Here is exactly how it works, what angles it supports, and how to rotate a batch of photos at once."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Privacy", "Tools"]}
        readingTime={9}
        headings={[
          { id: "the-upload-problem", title: "The problem: most image rotators upload your photo" },
          { id: "how-browser-rotation-works", title: "How browser-based image rotation actually works" },
          { id: "rotation-angles", title: "Supported angles: 90, 180, 270, and any custom angle" },
          { id: "batch-rotation", title: "How to rotate a batch of images at once" },
          { id: "step-by-step", title: "How to rotate an image online without uploading it, step by step" },
          { id: "orientation-exif", title: "Why photos appear sideways: the EXIF Orientation tag explained" },
          { id: "quality-impact", title: "Does rotation affect image quality?" },
          { id: "comparison-table", title: "Browser-based vs upload-based image rotators: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-image-tools", title: "Other image tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most online image rotators (Canva, iLoveIMG, Adobe Express) upload your file to a remote server. For personal photos, product shots, and sensitive documents scanned as images, that is an unnecessary privacy risk.",
          "SammaPix Rotate Image runs entirely in your browser using the HTML Canvas API. Your file never leaves your device.",
          "Supports 90, 180, and 270 degree rotations with no quality loss, plus any custom angle for straightening crooked scans and tilted horizons.",
          "Batch rotate up to 20 images in one session and download all rotated files as a ZIP — entirely in-browser.",
          "Rotation is baked into the pixel data, fixing the EXIF orientation problem permanently regardless of which app opens the file.",
          "You can verify no upload happens by watching the Network inspector in DevTools while the tool runs.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1983032/pexels-photo-1983032.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A camera and printed photos on a wooden surface, representing the kind of photos people need to rotate online without uploading them to an unknown server."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Rotating a photo should not require handing it to a server you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Rotate your images right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Rotate Image runs entirely in your browser via the Canvas API. Choose 90, 180, 270 degrees or
              any custom angle. Batch rotate 20 photos at once. Download individually or as ZIP. Free, no signup.
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
                href="/tools/croproatio"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Crop to Ratio <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: The upload problem ──────────────────────────────── */}

        <h2 id="the-upload-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The problem: most image rotators upload your photo
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You took a photo in portrait mode and it opened sideways on your computer. Or you scanned a document and the scan came out upside down. You search for "rotate image online" and land on one of the big tools — Canva, iLoveIMG, Adobe Express, or one of dozens of smaller sites.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You drag the image in. A progress bar fills. The file uploads to their server, gets processed remotely, and you get the rotated version back. Rotation is one of the simplest image operations that exist — a mathematical transformation of pixel coordinates. There is no reason it needs a server.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a photo of a sunset this is a minor inconvenience. But what if the image is a scanned passport, a signed contract, a medical form, a photo of your home address, or a private document you need to rotate before sending? Every upload to an unknown server is a risk you are accepting unnecessarily.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built{" "}
          <Link href="/tools/rotate-image" className="text-[#6366F1] hover:underline">SammaPix Rotate Image</Link>{" "}
          to rotate images entirely inside your browser. No server is involved at any point. The tool uses the HTML Canvas API — a built-in browser technology that has been available in every modern browser for over a decade. Rotation is computation, and modern browsers are more than capable of doing it locally.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What &ldquo;no upload&rdquo; actually means
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop an image into SammaPix Rotate Image, your browser reads the file using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API for reading local files without network access. The image is decoded into pixel data and passed to an{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">HTML Canvas element</a>.{" "}
          The canvas applies the rotation transform and exports the result as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL downloaded directly from browser memory. Zero network requests carry your image to any remote server.
        </p>

        {/* ── Section 2: How browser rotation works ──────────────────────── */}

        <h2 id="how-browser-rotation-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based image rotation actually works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the mechanism helps you trust the result and understand what to expect. Here is what happens under the hood when you click Rotate:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">FileReader reads the image from your device.</strong> The file is loaded into browser memory as an ArrayBuffer. No network request is made. The read is entirely local — the same mechanism your device&apos;s photo app uses to open an image file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The browser decodes the image into a bitmap.</strong> The compressed image file (JPEG, PNG, WebP, etc.) is decoded into a raw pixel array — an ImageBitmap object in browser memory. This is the same operation that happens when a browser renders any image on a webpage.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">A Canvas element is created with the rotated dimensions.</strong> For a 90 or 270 degree rotation, the output canvas width and height are swapped (a portrait image becomes landscape). For 180 degree rotation, dimensions stay the same. For custom angles, the canvas is sized to fit the full rotated image without clipping any corners.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The canvas context is rotated and the image is drawn.</strong> The 2D canvas context&apos;s coordinate system is translated to the canvas center, rotated by the chosen angle, and the image is drawn centered at the origin. This mathematical transform maps every source pixel to its correct rotated position.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The result is exported and offered for download.</strong> The canvas is converted to a Blob using the same format as the input where possible. The Blob is served via a temporary{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code> URL and downloaded directly. Nothing leaves your device.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Canvas API has been a browser standard since HTML5 (2014) and is available in every modern browser including Chrome, Safari, Firefox, and Edge. It is the same technology used by browser-based image editors, games, and data visualizations. It is fast, well-tested, and requires no network access.
        </p>

        {/* ── Section 3: Rotation angles ─────────────────────────────────── */}

        <h2 id="rotation-angles" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Supported angles: 90, 180, 270, and any custom angle
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most image rotation tools offer only 90, 180, and 270 degree presets. That is enough for correcting a sideways phone photo. But it is not enough for:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Straightening a scanned document that came out at a slight angle (2 to 5 degrees off)
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Fixing a horizon line in a landscape photo that is tilted by a few degrees
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Correcting architectural photos where the building lines are not quite vertical
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Rotating a design asset to an exact non-standard angle for a creative layout
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix Rotate Image supports any angle between 0 and 360 degrees. You can type 7.5, 45, 112.3, or any other value. The Canvas API handles arbitrary rotation natively, so there is no technical reason to limit you to preset values.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Angle</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Effect</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Common use case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">90 degrees</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Quarter turn clockwise. Portrait becomes landscape (rotated right).</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Phone photo taken sideways and appearing in the wrong orientation.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">180 degrees</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Half turn. Image is flipped upside down and mirrored horizontally.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Scanner placed the page upside down. Aerial or drone photo with wrong orientation.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">270 degrees</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Three-quarter turn clockwise (equivalent to 90 degrees counterclockwise). Landscape becomes portrait rotated left.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Phone photo taken sideways in the other direction.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Custom (e.g. 3.5 degrees)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Any arbitrary rotation. Canvas expands to contain the full rotated image without clipping.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Straightening a slightly tilted scan or crooked horizon in a landscape photo.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For straightening crooked scans: a document that came out of the scanner at 2 to 3 degrees off is visually obvious and unprofessional. A 2.5 degree custom rotation will make it look perfectly aligned. The Canvas API handles sub-degree precision accurately.
        </p>

        {/* ── Section 4: Batch rotation ──────────────────────────────────── */}

        <h2 id="batch-rotation" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to rotate a batch of images at once
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Rotating one image is easy on any tool. The real inconvenience is when you have 10 or 20 photos that all came out in the wrong orientation — from a batch scan, a camera dump, or photos taken by someone holding the phone sideways throughout an event.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix Rotate Image supports batch rotation natively. Drop up to 20 images at once onto the dropzone. All files are loaded into browser memory simultaneously. You choose a single rotation angle, and that angle is applied to every image in the batch. The Canvas pipeline processes each file sequentially in milliseconds.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When all rotations are complete, you can:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download each file individually.</strong> Click the download button next to any image to save it on its own.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download all as a ZIP.</strong> Click Download All as ZIP to get every rotated image packaged into a single archive, ready to share or upload wherever you need them. The ZIP is assembled in-browser using the JSZip library — no server involved.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For photographers who received a batch of event photos all shot sideways, or for office workers who scanned a stack of documents and got half of them upside down, this saves the kind of repetitive manual work that otherwise takes 15 minutes and a desktop app.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Rotate your images in your browser now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Batch rotate up to 20 images. Choose 90, 180, 270 degrees or any custom angle. Download all as ZIP.
            No upload. No signup. Free.
          </p>
          <Link
            href="/tools/rotate-image"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Rotate Image, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to rotate an image online without uploading it, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under a minute for a batch of 20 images:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/rotate-image</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your images onto the dropzone</strong> or click to browse. You can select multiple files at once. Accepted formats include JPEG, PNG, WebP, GIF, and AVIF. Files are loaded into browser memory immediately.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose your rotation angle.</strong> Click 90, 180, or 270 for a standard preset. Or click the custom angle field and type any value between 0 and 360.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Rotate.</strong> Each image is processed through the Canvas pipeline in sequence. A preview of each rotated image appears below. Processing is nearly instant on modern hardware.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Review the results.</strong> The rotated previews are shown with the original filename and the new dimensions. If a 90 or 270 degree rotation swapped the width and height, you will see the new dimensions reflected.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download individually or as ZIP.</strong> Click the download icon next to any image, or click Download All as ZIP to get everything in one archive. No network request occurs. Files are served from browser memory.
          </li>
        </ol>

        {/* ── Section 6: EXIF orientation ───────────────────────────────── */}

        <h2 id="orientation-exif" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why photos appear sideways: the EXIF Orientation tag explained
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          To understand why this tool is genuinely useful beyond &ldquo;just rotate it,&rdquo; you need to understand how cameras and phones handle orientation.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you take a photo in portrait mode on a modern smartphone, the camera sensor is physically oriented in landscape — the long dimension of the sensor captures the horizontal axis. The phone embeds an{" "}
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Orientation tag in the EXIF metadata</strong> of the file. This tag (a number from 1 to 8) tells viewers: &ldquo;display this image rotated 90 degrees clockwise.&rdquo;
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Apps that read and apply EXIF Orientation — iOS Photos, Google Photos, Windows Photos, macOS Preview, Chrome — show the photo correctly. But many systems do not:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Many upload systems strip EXIF when you upload a photo, removing the orientation tag. The raw pixel data is sideways, and without the tag, every app shows it sideways.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Older applications, some CMS platforms, and many web developers&apos; custom image pipelines ignore EXIF Orientation entirely.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            Thumbnail generators and image processing libraries sometimes produce thumbnails that ignore the orientation tag.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The permanent fix is to <strong className="text-gray-800 dark:text-[#E5E5E5]">bake the rotation directly into the pixel data</strong> and strip (or reset) the EXIF Orientation tag to 1 (normal). After that, every viewer — regardless of whether it reads EXIF — sees the image correctly because the pixels themselves are in the right orientation. SammaPix Rotate Image does exactly this: it applies the rotation to the canvas and exports the result with a reset orientation flag.
        </p>

        {/* ── Section 7: Quality impact ──────────────────────────────────── */}

        <h2 id="quality-impact" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Does rotation affect image quality?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the most common concern people have about online image tools, and the honest answer here is nuanced:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          90, 180, and 270 degree rotations: essentially lossless
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          These exact-multiple rotations map every source pixel to exactly one destination pixel. No interpolation is needed — the pixel grid aligns perfectly after rotation. The only quality impact comes from the JPEG re-encoding step at export. JPEG is a lossy format, so exporting a JPEG as JPEG involves one generation of re-compression. The default quality used by the browser&apos;s canvas.toBlob is typically 92 percent, which is visually indistinguishable from the original for all practical purposes. If you start with a PNG and rotate it, the output PNG is mathematically identical to the input with rotated coordinates — there is zero quality loss.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Custom angles: slight interpolation softness
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you rotate by a non-multiple-of-90 angle (say 7.3 degrees), the source pixels do not map exactly to integer destination coordinates. The browser uses bilinear interpolation to compute intermediate pixel values, which introduces very slight softness. This is identical to what Photoshop, GIMP, Lightroom, and all other image editors do for arbitrary-angle rotation. For straightening a tilted document by 2 to 5 degrees, the softness is imperceptible when viewing the image at normal size. At 300 percent zoom you might notice it on sharp edges. For web display and screen use, this is never an issue.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Rotation type</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Quality impact</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">90 / 180 / 270 degrees (JPEG input)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">One re-compression cycle. Visually negligible at default quality (92%).</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Correcting EXIF orientation, fixing sideways phone photos, most everyday use.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">90 / 180 / 270 degrees (PNG input)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Zero pixel-level quality loss. PNG is lossless; the pixel grid maps exactly.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Screenshots, design assets, graphics where pixel precision matters.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Custom angle (any format)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Slight bilinear interpolation softness on sharp edges. Imperceptible at screen viewing size.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Straightening scans, correcting horizon lines, creative angle adjustments.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your images stay on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. Supports JPEG, PNG, WebP, GIF, AVIF. Batch 20 files. Custom angle.
            ZIP download. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/rotate-image"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Rotate Image, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/how-to-rotate-a-photo-free"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Batch rotate + custom angle guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based image rotators: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison across the dimensions that matter when choosing a tool for rotating images online:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Dimension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Upload-based (iLoveIMG, Canva, Adobe Express)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser-based (SammaPix)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Privacy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File uploaded to a remote server. You trust their security and deletion policies.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File never leaves your device. Verifiable via browser Network inspector.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Custom angle support</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Many tools offer only 90/180/270 presets. Some offer a limited slider.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Any angle 0 to 360 degrees. Type any decimal value. Canvas handles it natively.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Batch processing</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Many free plans limit batch size or require a subscription for bulk rotation.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Up to 20 images per session. Download all as ZIP. Free.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Speed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on upload speed and server load. Slow on large images or poor connections.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Instant on modern hardware. No network latency. Processing is done by your device CPU/GPU.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">File size limits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Free plans often cap at 5 to 25 MB per file.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Limited by device memory. No artificial cap imposed by the tool.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required beyond very basic free use. Some require an account for ZIP downloads.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No account required. No signup. No watermark on output.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works offline</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — requires internet to upload and process.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">After the page loads, rotation works without an internet connection.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">EXIF orientation fix</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies. Some tools reapply EXIF; others do not reset the orientation tag.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Rotation is baked into pixel data. EXIF Orientation is reset to 1. Every viewer sees the correct orientation.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 9: Verify no upload ───────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not need to take my word for it. Here is how to verify this yourself in under two minutes:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac) in your browser. On Safari you may need to enable the Develop menu first in Settings → Advanced.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Click the Network panel in DevTools. If you see existing requests, clear them.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your images and click Rotate.</strong> Watch the Network panel as the tool processes each file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests.</strong> You will see no network activity during rotation or download. The only requests that appear are the initial page load assets (JavaScript, CSS). Nothing carries your image to any server.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you want to be extra thorough, enable the &ldquo;Preserve log&rdquo; option in the Network tab before starting — this ensures all requests are recorded even across page navigation. You will still see zero outgoing requests carrying your image bytes.
        </p>

        {/* ── Section 10: Related tools ─────────────────────────────────── */}

        <h2 id="related-image-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other image tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based image tools, all with no upload and no server processing. Here is when to use each:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/rotate-image" className="text-[#6366F1] hover:underline">Rotate Image</Link></strong>: rotate any image 90/180/270 or a custom angle. Batch up to 20 files, download as ZIP. This is the tool this article is about.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/compress" className="text-[#6366F1] hover:underline">Compress Images</Link></strong>: reduce file size by re-encoding at a lower quality level. Batch compress for web, email, or social media. Also see the guide{" "}
            <Link href="/blog/compress-images-without-losing-quality" className="text-[#6366F1] hover:underline">Compress images without losing quality</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">Crop to Ratio</Link></strong>: crop images to exact aspect ratios — 1:1, 4:3, 16:9, 4:5 for Instagram. After rotating, use this to crop to the right dimensions for your target platform. See{" "}
            <Link href="/blog/crop-photos-perfect-ratios" className="text-[#6366F1] hover:underline">How to crop photos to perfect ratios</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/remove-bg" className="text-[#6366F1] hover:underline">Remove Background</Link></strong>: AI-powered background removal for product photos and portraits. Useful before rotating a subject to a specific orientation.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/resizepack" className="text-[#6366F1] hover:underline">Resize Images</Link></strong>: resize rotated images to exact pixel dimensions or a percentage. Useful after rotating a portrait to landscape if you need a specific output width.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your image editing needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Rotate, compress, crop, resize, and remove backgrounds without uploading your images anywhere.
            All tools run locally in your browser via Canvas API. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/rotate-image"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Rotate Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Compress Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
