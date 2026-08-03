import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Add a Border to an Image Online Free [2026]",
  description:
    "Add a white, black, or custom-color border to any image online — entirely in your browser via Canvas. No upload, no server, no signup. Choose expand or inset, pick any color and thickness. Batch + ZIP. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/add-border-to-image-online`,
  },
  keywords: [
    "add border to image online",
    "add border to image free",
    "image border online",
    "add white border to photo",
    "add black border to photo",
    "add border to photo online",
    "photo border maker",
    "image border generator",
    "add frame to image online",
    "border image free",
    "add border to picture online",
    "add border to jpg online",
    "add border to png online",
    "add border without uploading",
    "image border no upload",
  ],
  openGraph: {
    title: "Add a Border to an Image Online Free [2026]",
    description:
      "Add a border to any image in your browser via Canvas. No upload, no server, no signup. Choose color, thickness, expand or inset mode. Batch 20 images, ZIP download. Free.",
    url: `${APP_URL}/blog/add-border-to-image-online`,
    type: "article",
    publishedTime: "2026-08-03",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Add a Border to an Image Online Free [2026]",
    description:
      "Image border tool that runs 100% in your browser via Canvas. No upload, no server. Custom color, thickness, expand or inset. Batch 20 photos, ZIP download. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-03";
const POST_DATE_FORMATTED = "August 3, 2026";
const POST_URL = `${APP_URL}/blog/add-border-to-image-online`;
const POST_TITLE = "Add a Border to an Image Online Free [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Most online border tools upload your image to a remote server. SammaPix Add Border runs entirely in your browser using the Canvas API — the file never leaves your device. This guide explains how browser-based border addition works, the difference between expand and inset modes, how to pick any color, how to batch-process multiple images, and how to verify no upload happens.",
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
    "add border to image online",
    "add border to photo free",
    "image border online",
    "add white border to photo",
    "add black border to image",
    "photo border maker",
    "image border generator",
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
  name: "How to Add a Border to an Image Online Without Uploading It",
  description:
    "Add a custom-color border to one or more images in your browser with no file upload, using SammaPix Add Border powered by the HTML Canvas API. Choose expand mode (canvas grows) or inset mode (border fits inside original dimensions). Supports batch processing and ZIP download.",
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
      name: "Drop your images onto the tool",
      text: "Drag one or more images onto the dropzone or click to browse. You can load up to 20 files at once. The files are read locally by your browser — nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Choose border color and thickness",
      text: "Pick any color using the color picker (white, black, or a custom HEX/RGB value). Set the border thickness in pixels — for example, 20px for a standard Instagram white border or 40px for a thick print passepartout.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Select expand or inset mode",
      text: "Expand mode grows the canvas by the border thickness, keeping your image content 100% intact. Inset mode draws the border inside the existing dimensions, slightly cropping the edges. Choose expand for print or framing, inset when the final file size must stay fixed.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Click Add Border",
      text: "The tool draws each image onto an HTML Canvas element with the chosen border applied and exports it back as a JPEG or PNG. Processing happens entirely on your device in milliseconds.",
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Download individually or as a ZIP",
      text: "Download each bordered image on its own, or click Download All as ZIP to get all processed files in a single archive. Everything is served from browser memory — no file ever touches a server.",
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
      name: "Does adding a border to an image online mean uploading it to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With most tools, yes. Canva, Adobe Express, and similar services upload your image to their servers for processing. With SammaPix Add Border, no. The border is drawn entirely in your browser using the HTML Canvas API — a built-in browser technology for drawing and compositing images locally. Your file never leaves your device. You can verify this yourself by opening your browser's Network inspector (F12) and watching for outgoing requests while the tool processes your image. You will see none.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between expand mode and inset mode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Expand mode increases the total canvas size by adding the border thickness to the edges. If your image is 1200x900 pixels and you add a 20px border, the output will be 1240x940 pixels. Your original image content is completely unchanged — not cropped at all. Inset mode draws the border inside the existing dimensions. The output stays at 1200x900, but 20px of image content on each edge is covered by the border. Use expand for print, framing, and passepartout effects where you want the full image visible. Use inset when you must keep the output at the exact same dimensions as the input.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add a white border to a photo to share it on Instagram without cropping?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Adding a white border is one of the most popular uses for this tool. When you take a landscape photo (16:9) and Instagram wants a square (1:1) or portrait (4:5) crop, you lose significant parts of the image. Adding a white border using expand mode keeps the entire photo visible and adds white padding to fill the required aspect ratio. A 20 to 40px white border on a portrait or landscape photo makes it look clean and intentional on the Instagram grid — the same style used by many photography accounts to maintain a consistent look without sacrificing composition.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add a border to multiple images at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix Add Border supports batch processing of up to 20 images per session. Drop all your files at once onto the dropzone, choose your border color and thickness, and click Add Border. Each image is processed independently through the same Canvas pipeline. When done, you can download each bordered file individually or click Download All as ZIP to get every bordered image in a single archive — all from browser memory, with no upload.",
      },
    },
    {
      "@type": "Question",
      name: "What border colors can I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can use any color the browser can render. The color picker supports white (#FFFFFF), black (#000000), and any custom HEX or RGB color. Popular choices include white for Instagram and Pinterest posts, black for dramatic framing effects, off-white or cream for print-style passepartout borders, and brand colors for consistent watermarked photo sets. The Canvas API accepts any valid CSS color value, so the full spectrum of 16 million colors is available.",
      },
    },
    {
      "@type": "Question",
      name: "Does adding a border affect image quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The border itself is drawn precisely with no quality loss — it is new solid-color pixels added to or drawn over the image. The only quality consideration is the JPEG re-encoding step at export. JPEG is a lossy format, so exporting a JPEG as JPEG involves one generation of re-compression. The default quality used by the browser's canvas.toBlob is typically around 92 percent, which is visually indistinguishable from the original for all practical purposes. If you start with a PNG and add a border, the output PNG is fully lossless. The original image pixels are faithfully reproduced; only the new border pixels are added.",
      },
    },
    {
      "@type": "Question",
      name: "How do I verify no upload happens when adding a border to my image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open your browser developer tools (F12 on Windows/Linux, Command Option I on Mac), click the Network tab, then drop your image into the SammaPix Add Border tool and click Add Border. Watch the network panel. You will see requests for static page assets (JavaScript, CSS) when the tool first loads. During border processing and download, you will see zero outgoing requests. The image is read by the FileReader API, processed entirely in memory via the Canvas API, and the bordered output is downloaded via a blob: URL — no network call is made.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AddBorderToImageOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="add-border-to-image-online"
        description="Adding a border to an image should not require handing your photo to a third-party server. SammaPix Add Border runs entirely in your browser via the Canvas API — no upload, no signup, no server. Choose any color, any thickness, expand or inset mode, and batch-process up to 20 images at once. Here is everything about how it works and when to use each option."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Creative", "Tools"]}
        readingTime={9}
        headings={[
          { id: "the-upload-problem", title: "The problem: most image border tools upload your photo" },
          { id: "how-browser-border-works", title: "How browser-based border addition actually works" },
          { id: "expand-vs-inset", title: "Expand mode vs inset mode: which one do you need?" },
          { id: "color-and-thickness", title: "Choosing border color and thickness" },
          { id: "batch-processing", title: "How to add a border to multiple images at once" },
          { id: "step-by-step", title: "How to add a border to an image online, step by step" },
          { id: "white-border-instagram", title: "Adding a white border for Instagram: show the full photo" },
          { id: "quality-impact", title: "Does adding a border affect image quality?" },
          { id: "comparison-table", title: "Browser-based vs upload-based image border tools: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-image-tools", title: "Other image tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most online image border tools (Canva, Adobe Express, FotoJet) upload your file to a remote server. For personal photos, product shots, and sensitive images, that is an unnecessary risk.",
          "SammaPix Add Border runs entirely in your browser using the HTML Canvas API. Your file never leaves your device.",
          "Supports expand mode (canvas grows to accommodate the border, full image preserved) and inset mode (border drawn inside existing dimensions, no size change).",
          "Pick any color — white, black, or any custom HEX/RGB value — and any pixel thickness.",
          "Batch-process up to 20 images in one session and download all bordered files as a ZIP — entirely in-browser.",
          "You can verify no upload happens by watching the Network inspector in DevTools while the tool runs.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A photographer reviewing photos on a tablet, representing the need to add borders and frames to images for print and social media without uploading to unknown servers."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Adding a border to a photo should not require handing it to a server you do not control.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Add a border to your images right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Add Border runs entirely in your browser via the Canvas API. Choose any color and thickness.
              Expand or inset mode. Batch 20 images at once. Download individually or as ZIP. Free, no signup.
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

        {/* ── Section 1: The upload problem ──────────────────────────────── */}

        <h2 id="the-upload-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The problem: most image border tools upload your photo
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You want to add a white border to a landscape photo for your Instagram grid. Or add a thin black frame to a product shot. Or apply a consistent 30px border to a batch of 15 event photos before printing. You search for &ldquo;add border to image online&rdquo; and you land on one of the popular tools.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You drag the image in. A progress bar fills. The file uploads to their server, gets processed remotely, and you get the bordered version back. Drawing a solid-color rectangle around an image is one of the simplest Canvas operations that exist. There is no reason it needs a server.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a photo of a product this is a minor inconvenience. But what if the image is a scanned document with sensitive content, a family photo you would rather not share with an ad-funded service, or a private image intended for a specific recipient? Every upload to an unknown service is a risk you are accepting unnecessarily.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built{" "}
          <Link href="/tools/add-border" className="text-[#6366F1] hover:underline">SammaPix Add Border</Link>{" "}
          to add borders to images entirely inside your browser. No server is involved at any point. The tool uses the HTML Canvas API — a built-in browser technology that has been available in every modern browser for over a decade. Drawing a border is a drawing operation, and modern browsers handle drawing operations locally and instantly.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What &ldquo;no upload&rdquo; actually means
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you drop an image into SammaPix Add Border, your browser reads the file using the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FileReader API</a>{" "}
          — a standard browser API for reading local files without network access. The image is decoded into pixel data, passed to an{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">HTML Canvas element</a>,{" "}
          composited with the border, and exported as a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL downloaded directly from browser memory. Zero network requests carry your image to any remote server.
        </p>

        {/* ── Section 2: How browser border works ──────────────────────────── */}

        <h2 id="how-browser-border-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based border addition actually works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the mechanism helps you trust the result and know exactly what the output will look like. Here is what happens under the hood when you click Add Border:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">FileReader reads the image from your device.</strong> The file is loaded into browser memory as an ArrayBuffer. No network request is made. The read is entirely local — the same mechanism your device&apos;s photo app uses to open an image file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The browser decodes the image into a bitmap.</strong> The compressed image file (JPEG, PNG, WebP, etc.) is decoded into a raw pixel array — an ImageBitmap object in browser memory.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">A Canvas element is created with the correct output dimensions.</strong> In expand mode, the canvas is wider and taller than the source image by twice the border thickness (once for each side). In inset mode, the canvas matches the original dimensions exactly.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The border is filled first.</strong> The canvas 2D context fills the entire canvas with the chosen border color using{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">fillRect</code>.
            This sets the background color for every pixel, including the border region.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The original image is drawn on top at the correct offset.</strong> In expand mode, the image is drawn at position (borderThickness, borderThickness) — offset by the border width from each edge. In inset mode, the image is drawn at (0, 0) and the border is drawn over the edges using four filled rectangles.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The result is exported and offered for download.</strong> The canvas is converted to a Blob using the same format as the input where possible. The Blob is served via a temporary{" "}
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code> URL and downloaded directly. Nothing leaves your device.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Canvas API has been a browser standard since HTML5 (2014) and is available in every modern browser including Chrome, Safari, Firefox, and Edge. It is the same technology used by browser-based image editors, games, and data visualizations. Drawing and compositing images is one of its core design purposes — no server needed.
        </p>

        {/* ── Section 3: Expand vs inset ────────────────────────────────────── */}

        <h2 id="expand-vs-inset" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Expand mode vs inset mode: which one do you need?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The most important decision when adding a border is whether you want the canvas to grow (expand) or the border to be drawn inside the existing space (inset). Each has a clear use case, and choosing the wrong one produces an unexpected result.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Expand mode: the canvas grows, your image is untouched
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In expand mode, the output dimensions are larger than the input. A 1200x900 image with a 30px border in expand mode produces a 1260x960 image. Your original image content is 100% preserved — not one pixel is cropped or overwritten. The border appears as solid-color padding around the full image.
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Best for print and framing.</strong> When you need a passepartout effect or a frame border around a photo intended for printing, expand mode preserves every detail of the original shot while adding the white or colored frame.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Best for Instagram white borders.</strong> When you want to show a landscape photo in its full aspect ratio on Instagram without cropping, adding a white border using expand mode lets the full image be visible. Instagram will still crop the display to square or 4:5, but the white padding fills the difference so no content is lost.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Best for batch uniformity.</strong> If you have a mixed set of landscape and portrait photos and want them all to have the same white border thickness around each shot, expand mode ensures the original composition of each is preserved.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Inset mode: the border fits inside, dimensions stay fixed
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In inset mode, the output has exactly the same dimensions as the input. The border is drawn over the outermost pixels of the image. A 1200x900 image with a 30px inset border stays at 1200x900, but the outermost 30px strip on each edge is replaced by the border color.
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Best when output dimensions must stay fixed.</strong> If you are preparing images for a platform that requires an exact pixel size and you cannot change those dimensions, inset mode keeps your file at the required size.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Best for thin decorative borders.</strong> A 2 to 5px thin border drawn as inset is often imperceptible in terms of content loss but adds a clean visual boundary, especially useful for web product images.
          </li>
        </ul>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Mode</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Output dimensions</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Image content</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Expand</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Larger than input (width + 2x border, height + 2x border)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">100% preserved, not cropped</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Print, framing, Instagram white borders, batch uniformity</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Inset</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Same as input (unchanged)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Outermost edge covered by border color</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Fixed-size output requirements, thin decorative borders</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 4: Color and thickness ────────────────────────────────── */}

        <h2 id="color-and-thickness" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Choosing border color and thickness
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The two parameters that define the look of a border are color and thickness. Here is how to choose them for common use cases:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Border color
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The color picker accepts any color the browser can render. Common choices and their use cases:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">White (#FFFFFF).</strong> The most popular choice for Instagram grids, Pinterest boards, and Polaroid-style photo presentations. White borders make any subject pop and give photos a clean editorial look.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Black (#000000).</strong> Classic for dramatic framing. Black borders work especially well for high-contrast photography, film-emulation edits, and prints intended to be displayed against light walls without a physical frame.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Off-white or cream.</strong> For a warmer, more organic look — common in fine art print presentation. Try #FAF7F2 or #F5F0E8 for a soft cream passepartout.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Brand color.</strong> If you are watermarking a product catalog or creating consistent social assets, use your brand&apos;s HEX color as the border. This creates a cohesive look across all images without any additional design work.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Border thickness
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Thickness is specified in pixels. Here are reference values for common use cases:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Thickness</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Visual result</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Recommended for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">1 to 3px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Very thin line. Barely visible at small sizes, more apparent at full resolution.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Web product images, subtle separators in gallery layouts.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">10 to 20px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Visible thin border. Clean and modern look on social posts.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Instagram grid white border, Pinterest images, consistent social media sets.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">30 to 60px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Substantial border. Resembles a classic photo print white border or Polaroid-style frame.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Polaroid effects, printed photo albums, presentation prints.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">80 to 150px</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Wide passepartout. Museum-style matting effect for fine art print presentation.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Fine art prints, gallery-wall compositions, framed prints for interior design.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For reference: an A4 print at 300 DPI is 2480x3508 pixels. A 100px white border at that resolution represents approximately 8.5mm — a standard passepartout width for small-format fine art prints. At screen resolution (72 DPI), the same 100px represents about 35mm, which is much wider visually.
        </p>

        {/* ── Section 5: Batch processing ───────────────────────────────────── */}

        <h2 id="batch-processing" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to add a border to multiple images at once
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Adding a border to one image is straightforward on any tool. The time savings become significant when you have 10, 15, or 20 images that all need the same treatment — a consistent white border on every photo in a product catalog, the same black frame on every image in an event gallery, or matching 40px cream borders on a batch of prints.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix Add Border supports batch processing natively. Drop up to 20 images at once onto the dropzone. All files are loaded into browser memory simultaneously. You choose your border settings — color, thickness, expand or inset — once, and those settings are applied identically to every image in the batch. The Canvas pipeline processes each file sequentially in milliseconds.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When all borders are applied, you can:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download each file individually.</strong> Click the download button next to any image to save it on its own.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download all as a ZIP.</strong> Click Download All as ZIP to get every bordered image packaged into a single archive, ready to upload to your platform, send to a print lab, or deliver to a client. The ZIP is assembled in-browser using the JSZip library — no server involved.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For photographers who need to deliver a full product catalog with consistent white borders, or for event photographers providing a gallery with uniform black frames, this saves the kind of repetitive manual work that otherwise requires opening each image in a desktop editor and applying the same operation twenty times.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Add borders to your images in your browser now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Batch-process up to 20 images. Any color, any thickness, expand or inset mode. Download all as ZIP.
            No upload. No signup. Free.
          </p>
          <Link
            href="/tools/add-border"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Add Border, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 6: Step by step ───────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to add a border to an image online, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under a minute for a batch of 20 images:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/add-border</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your images onto the dropzone</strong> or click to browse. You can select multiple files at once. Accepted formats include JPEG, PNG, WebP, GIF, and AVIF. Files are loaded into browser memory immediately.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose your border color.</strong> Click the color picker to select white, black, or any custom color. You can type a HEX code directly (for example, #F5F0E8 for cream).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set the border thickness in pixels.</strong> Type a value or use the slider. For Instagram white borders, 20px is a good starting point. For print passepartout, try 80 to 120px.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select expand or inset mode.</strong> Expand to keep the full image and grow the canvas. Inset to keep output dimensions fixed and draw the border over the edges.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Add Border.</strong> Each image is processed through the Canvas pipeline in sequence. A preview of each bordered image appears below. Processing is nearly instant on modern hardware.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download individually or as ZIP.</strong> Click the download icon next to any image, or click Download All as ZIP to get everything in one archive. No network request occurs. Files are served from browser memory.
          </li>
        </ol>

        {/* ── Section 7: White border Instagram ────────────────────────────── */}

        <h2 id="white-border-instagram" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Adding a white border for Instagram: show the full photo without cropping
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          One of the most practical uses for this tool is adding a white border to photos before posting to Instagram. Here is the problem it solves and the most effective way to use it.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Instagram displays feed posts in a square grid when viewing a profile. When you share a landscape photo (say, 16:9 from a camera), Instagram crops the preview to a square, cutting off the sides. When you share a portrait photo (9:16 from a phone vertical video), it crops the top and bottom. You lose significant parts of the composition you spent time getting right.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The white border technique is widely used by photography accounts to solve this. By adding a white border using expand mode, you turn your landscape or portrait image into a square (or near-square) composition where the full original photo is visible. The white padding fills the difference. When Instagram displays the grid, the entire photo is visible without cropping.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How much white border to add for Instagram
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The approach depends on your photo&apos;s aspect ratio and the target feed format:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Landscape to square (1:1):</strong> If your photo is 1200x900 (4:3), add 150px top and bottom in expand mode to get 1200x1200. The tool handles this naturally — set thickness to 150px and the canvas grows by 150px on each side. For a 1200x675 (16:9) photo, you need 262px top/bottom to reach 1200x1200.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Portrait to 4:5 (Instagram standard):</strong> Instagram&apos;s native feed format is 4:5 (1080x1350). If you have a landscape photo, adding white borders to make it 4:5 maximizes your visible area in the feed. This requires more precise calculation, which you can do after adding a uniform border and then using{" "}
            <Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">SammaPix Crop to Ratio</Link>{" "}
            to finalize the 4:5 frame.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Uniform thin border for aesthetics:</strong> Many photography accounts simply add a consistent 20px white border to every post — regardless of aspect ratio — for a clean, editorial grid look. The border creates a visual pause between photos in the grid, which many audiences find more pleasing than edge-to-edge images.
          </li>
        </ul>

        {/* ── Section 8: Quality impact ──────────────────────────────────── */}

        <h2 id="quality-impact" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Does adding a border affect image quality?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Adding a border through the Canvas API introduces only one quality consideration: the JPEG re-encoding step at export. The border itself is perfect — it is new solid-color pixels drawn by the browser. The original image is composited onto the canvas using the browser&apos;s built-in image decoder, which preserves source pixel values faithfully.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For JPEG inputs, the output JPEG is re-encoded at approximately 92 percent quality (the browser default for{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">canvas.toBlob(&apos;image/jpeg&apos;)</code>).
          This is one generation of re-compression. At 92 percent quality, JPEG artefacts are essentially invisible for typical photography at normal viewing sizes. You would need to zoom in to 200 to 300 percent and specifically look for compression blocks to notice any difference from the original.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For PNG inputs, there is zero quality loss. PNG is a lossless format, and the canvas exports PNG losslessly. The original pixel values in the image area are reproduced exactly, and the border pixels are new solid-color values. The result is a mathematically faithful representation of the bordered image.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Input format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Quality impact</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">JPEG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">One re-compression cycle at ~92% quality. Visually negligible.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Sufficient for web, social media, and standard print. Imperceptible at normal viewing sizes.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">PNG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Zero pixel-level quality loss. PNG is lossless.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Ideal for design assets, screenshots, graphics with text or transparency.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">WebP</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">One re-encoding cycle at high quality. Well supported in Chrome, Edge, Safari 14+.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Good for web-optimized bordered images that need small file size.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your images stay on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. Supports JPEG, PNG, WebP, GIF, AVIF. Batch 20 files.
            Any color, expand or inset mode. ZIP download. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/add-border"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Add Border, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/add-frame-to-photo-free"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Polaroid border and print frame guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Comparison table ───────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs upload-based image border tools: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison across the dimensions that matter when choosing a tool for adding borders to images online:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Dimension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Upload-based (Canva, Adobe Express, FotoJet)</th>
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
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Expand vs inset control</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Varies — many tools only offer one mode, often inset or a fixed canvas with cropping.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Both expand and inset modes available. Your choice, per batch.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Color flexibility</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Some tools limit presets (white, black, a few colors). Custom HEX often requires a paid plan.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Any CSS color — full 16 million color spectrum. White, black, or any custom HEX. Free.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Batch processing</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Most free plans process one image at a time. Batch requires a paid subscription.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Up to 20 images per session. Download all as ZIP. Free.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Speed</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Depends on upload speed and server load. Slow on large images or poor connections.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Instant on modern hardware. No network latency. Processing runs on your device CPU/GPU.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Signup required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Often required beyond basic free use. ZIP downloads frequently gated behind accounts.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No account required. No signup. No watermark on output.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works offline</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No — requires internet to upload and process.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">After the page loads, border addition works without an internet connection.</td>
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
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac) in your browser. On Safari you may need to enable the Develop menu first in Settings → Advanced.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab.</strong> Click the Network panel in DevTools. If you see existing requests, clear them.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your images and click Add Border.</strong> Watch the Network panel as the tool processes each file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests.</strong> You will see no network activity during processing or download. The only requests that appear are the initial page load assets (JavaScript, CSS). Nothing carries your image to any server.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you want to be extra thorough, enable the &ldquo;Preserve log&rdquo; option in the Network tab before starting. You will still see zero outgoing requests carrying your image bytes. The image is read by FileReader, composited in canvas memory, and the bordered result is served via a{" "}
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">blob:</code>{" "}
          URL — entirely local.
        </p>

        {/* ── Section 11: Related tools ─────────────────────────────────── */}

        <h2 id="related-image-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other image tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based image tools, all with no upload and no server processing. Here is when to use each in combination with Add Border:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/add-border" className="text-[#6366F1] hover:underline">Add Border</Link></strong>: add a white, black, or custom-color border to any image. Expand or inset mode, batch up to 20 files, download as ZIP. This is the tool this article is about.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/croproatio" className="text-[#6366F1] hover:underline">Crop to Ratio</Link></strong>: crop images to exact aspect ratios — 1:1, 4:5, 16:9. Use this before or after adding a border to hit your target platform dimensions. See{" "}
            <Link href="/blog/crop-photos-perfect-ratios" className="text-[#6366F1] hover:underline">How to crop photos to perfect ratios</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/resizepack" className="text-[#6366F1] hover:underline">Resize Images</Link></strong>: resize bordered images to exact pixel dimensions. Use after adding a border when you need the output at a specific pixel width for a platform like Shopify or a print lab.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/rotate-image" className="text-[#6366F1] hover:underline">Rotate Image</Link></strong>: rotate images 90/180/270 degrees or any custom angle. If your photo is sideways before adding a border, rotate it first. See the guide{" "}
            <Link href="/blog/rotate-image-online-no-upload" className="text-[#6366F1] hover:underline">Rotate an Image Online Without Uploading It</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/compress" className="text-[#6366F1] hover:underline">Compress Images</Link></strong>: reduce the file size of bordered images before uploading to a platform. Useful after adding a border in expand mode, which increases file size. See{" "}
            <Link href="/blog/compress-images-without-losing-quality" className="text-[#6366F1] hover:underline">Compress images without losing quality</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/flip-image" className="text-[#6366F1] hover:underline">Flip Image</Link></strong>: mirror images horizontally or vertically. Apply before adding a border when the content needs to face the opposite direction.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your image editing needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Add borders, crop, resize, rotate, compress, and flip without uploading your images anywhere.
            All tools run locally in your browser via Canvas API. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/add-border"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Add Border <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Compress Images <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
