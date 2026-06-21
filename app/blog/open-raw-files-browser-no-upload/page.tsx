import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Open RAW Files in Your Browser (No Software, No Upload)",
  description:
    "Open CR2, NEF, ARW, RAF and other camera RAW files instantly in your browser. No Lightroom, no software install, no upload. Convert RAW to JPG locally with WebAssembly. Updated 2026.",
  alternates: {
    canonical: `${APP_URL}/blog/open-raw-files-browser-no-upload`,
  },
  keywords: [
    "open raw files",
    "how to open cr2 file",
    "how to open nef file",
    "how to open arw file",
    "open raw without software",
    "convert raw to jpg browser",
    "raw to jpg no upload",
    "view raw files online",
    "open raw files online free",
    "raw converter browser",
  ],
  openGraph: {
    title: "How to Open RAW Files in Your Browser (No Software, No Upload)",
    description:
      "CR2, NEF, ARW, RAF and more: open any camera RAW file in your browser without installing Lightroom or uploading your photos anywhere.",
    url: `${APP_URL}/blog/open-raw-files-browser-no-upload`,
    type: "article",
    publishedTime: "2026-06-21",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Open RAW Files in Your Browser (No Software, No Upload)",
    description:
      "Open CR2, NEF, ARW and 30+ RAW formats in seconds, no install, no upload. Converts locally via WebAssembly.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-06-21";
const POST_DATE_FORMATTED = "June 21, 2026";
const POST_URL = `${APP_URL}/blog/open-raw-files-browser-no-upload`;
const POST_TITLE =
  "How to Open RAW Files in Your Browser (No Software, No Upload)";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Camera RAW files (CR2, CR3, NEF, ARW, RAF, DNG, ORF, RW2) cannot be opened by a standard browser or Windows Photo Viewer. This guide explains what RAW files are, why they are hard to open, and how to convert them to JPG instantly in the browser without uploading to any server.",
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
    "open raw files",
    "how to open cr2 file",
    "how to open nef file",
    "how to open arw file",
    "convert raw to jpg browser",
    "raw to jpg no upload",
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

// ── FAQ schema ────────────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why can't I open a RAW file on my computer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RAW files are proprietary, camera-specific formats that contain unprocessed sensor data. They require a decoder that understands your specific camera model. Windows Photo Viewer and macOS Preview can open some RAW formats but not all, and they often show a low-quality thumbnail rather than the full-resolution image. Professional tools like Lightroom, Capture One, or SammaPix's browser-based RAW converter use the open-source LibRaw library to decode virtually every RAW format accurately.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a RAW file and a JPG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A RAW file contains the raw, unprocessed sensor data from your camera. No sharpening, no white balance baking, no noise reduction has been applied. This gives you maximum flexibility in post-processing. A JPG is a compressed, processed image where the camera has already applied its own tone curves, sharpening, and color science, then thrown away roughly 80 to 95 percent of the data to keep the file small. RAW files are typically 20 to 50 megabytes. JPGs of the same shot are 3 to 8 megabytes.",
      },
    },
    {
      "@type": "Question",
      name: "How do I open a CR2 file without Lightroom?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can open a CR2 file (Canon RAW format) in SammaPix's browser-based RAW converter at sammapix.com/tools/raw-converter. Drop your CR2 file, and the tool decodes it locally using LibRaw compiled to WebAssembly. Nothing is uploaded to any server. You can also use the free Canon Digital Photo Professional software, or convert via our dedicated page at sammapix.com/convert/cr2-to-jpg.",
      },
    },
    {
      "@type": "Question",
      name: "How do I open a NEF file without Lightroom?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NEF is Nikon's RAW format. You can open it in SammaPix's browser-based converter at sammapix.com/tools/raw-converter without installing any software. Alternatively, Nikon ViewNX-i is a free official app from Nikon that opens NEF files. On Windows 10 and 11, you can install the Microsoft RAW Image Extension from the Store for basic NEF preview support.",
      },
    },
    {
      "@type": "Question",
      name: "How do I open an ARW file from my Sony camera?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ARW is Sony's RAW format, used by cameras like the A7C II, A7R V, and ZV-E1. Drop your ARW file into SammaPix's RAW converter at sammapix.com/tools/raw-converter to convert it to JPG instantly, entirely in your browser. Sony Imaging Edge Desktop is Sony's official free tool for full ARW editing, but it requires installation. For quick sharing, the browser converter is faster.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to upload my RAW files to an online converter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many online converters upload your file to a remote server, which is a privacy risk, especially for client work, travel photos with GPS metadata, or personal images. SammaPix processes RAW files entirely inside your browser using LibRaw compiled to WebAssembly. Your file is read by JavaScript running locally on your device. It is never sent to any server, never stored, and never visible to SammaPix.",
      },
    },
    {
      "@type": "Question",
      name: "What RAW formats does SammaPix support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SammaPix supports over 30 RAW formats including: CR2 and CR3 (Canon), NEF (Nikon), ARW (Sony), RAF (Fujifilm), DNG (Adobe and many mirrorless cameras), ORF (Olympus/OM System), RW2 (Panasonic), PEF (Pentax), NRW (Nikon compact), SRW (Samsung), 3FR (Hasselblad), and more. The full list follows LibRaw's supported camera database at libraw.org.",
      },
    },
    {
      "@type": "Question",
      name: "Should I keep my RAW files after converting to JPG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, always keep your original RAW files. The JPG you create is a processed, lossy version of your image. You can always re-export a better JPG from the RAW later, but you cannot recover the original sensor data from a JPG. A 40 megabyte ARW file costs a few cents to store on a hard drive or in cloud storage. Delete JPGs when you no longer need them. Never delete the RAW.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function OpenRawFilesBrowserPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="open-raw-files-browser-no-upload"
        description="This morning in Bali I shot a frame on my Sony A7C II. It came off the card as a 40 MB ARW that my laptop's preview could not open. Here is exactly how I turn RAW files into shareable JPGs in seconds, in the browser, without uploading them anywhere."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Workflow", "Tools", "Privacy"]}
        readingTime={11}
        headings={[
          { id: "the-arw-that-wouldnt-open", title: "The 40 MB ARW that my laptop could not open" },
          { id: "what-is-a-raw-file", title: "What is a RAW file and why can't apps open it?" },
          { id: "raw-formats-by-brand", title: "RAW formats by camera brand: CR2, NEF, ARW, RAF and more" },
          { id: "how-to-open-raw-in-browser", title: "How to open and convert a RAW file in the browser" },
          { id: "how-to-open-cr2-file", title: "How to open a CR2 file (Canon)" },
          { id: "how-to-open-nef-file", title: "How to open a NEF file (Nikon)" },
          { id: "how-to-open-arw-file", title: "How to open an ARW file (Sony)" },
          { id: "raw-vs-jpg", title: "RAW vs JPG: which to keep?" },
          { id: "privacy-why-no-upload", title: "Why I never upload RAW files to random converters" },
          { id: "batch-conversion", title: "Batch RAW conversion: converting multiple files at once" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "RAW files (CR2, NEF, ARW, RAF, DNG, ORF, RW2) cannot be opened by most apps because they contain unprocessed sensor data that requires a brand-specific decoder.",
          "SammaPix's browser-based RAW converter decodes your files locally using LibRaw compiled to WebAssembly. Nothing is uploaded.",
          "Canon uses CR2 and CR3, Nikon uses NEF, Sony uses ARW, Fujifilm uses RAF, Olympus uses ORF, Panasonic uses RW2, and Adobe DNG is cross-brand.",
          "A 40 MB Sony ARW converts to a 3.8 MB JPG (91% smaller) in about 5 seconds, entirely in the browser.",
          "Always keep your original RAW files. The JPG is a compressed snapshot. The RAW is the negative.",
          "Photographers shooting client work should never upload RAW files to third-party servers. LibRaw in the browser decodes locally with no server round trip.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://res.cloudinary.com/do9hrcwn1/image/upload/c_limit,f_auto,q_auto,w_1200/v1/sammapix/blog/raw-converter-bali-sony-a7c2-luca-sammarco"
              alt="Portrait photograph shot in Bali on a Sony A7C II, exported directly from a 40 MB ARW RAW file. Photo by Luca Sammarco."
              className="w-full max-h-[520px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A frame I shot in Bali this morning on a Sony A7C II, straight from a RAW file. Photo by Luca Sammarco.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Open your RAW file right now, no installation needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix RAW Converter runs entirely in your browser using LibRaw. Drop any CR2, NEF, ARW, RAF,
              DNG, ORF or RW2 file, convert to JPG instantly. Your file never leaves your device.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/raw-converter"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open the RAW Converter, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/convert/cr2-to-jpg"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                CR2 to JPG <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/convert/raw-to-jpg"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                RAW to JPG <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: The ARW that would not open ─────────────────────── */}

        <h2 id="the-arw-that-wouldnt-open" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The 40 MB ARW that my laptop could not open
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This morning in Bali I shot the portrait above on my Sony A7C II with the{" "}
          <a href="https://www.sony.com/en/articles/fe-24-70mm-f-2-8-gm-ii" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">FE 24-70mm F2.8 GM II</a>{" "}
          at 70mm, f/2.8, 1/1600s, ISO 320. The file came off the CFexpress card as an ARW: 40.7 MB, 7008 pixels tall, completely unviewable in my laptop's built-in preview.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the situation every photographer faces: you have a card full of RAW files and you need to share one quickly, or send a selection to a client, or post a single frame somewhere. You do not want to open Lightroom and wait for the import. You definitely do not want to upload a 40 MB camera file to some random website that might keep it forever.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          What I do: drag the ARW into{" "}
          <Link href="/tools/raw-converter" className="text-[#6366F1] hover:underline">SammaPix's browser RAW converter</Link>.
          It decodes the file locally using LibRaw compiled to WebAssembly, converts it to a 3.8 MB JPG, and I download it in about 5 seconds. The original ARW never goes anywhere. I shot the photo you see above: it went from 40.7 MB ARW to 3.8 MB JPG, which is a 91% reduction in size, with no server involved.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Below I will explain why RAW files are hard to open, which format your camera uses, and how the conversion works, so you understand exactly what is happening to your files.
        </p>

        {/* ── Section 2: What is a RAW file ──────────────────────────────── */}

        <h2 id="what-is-a-raw-file" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What is a RAW file and why can&apos;t apps open it?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you press the shutter on a digital camera, the sensor captures light as raw electrical signals. In JPG mode, the camera's internal processor immediately converts those signals into a finished image: it applies a white balance, sharpens the edges, adds its own colour science, compresses everything by roughly 80 to 95 percent, and saves a JPG. Fast. Done. But a lot of information is permanently thrown away.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          In RAW mode, the camera skips all of that. It saves the raw sensor data directly: every photon count from every pixel, the colour filter array readings, the camera's measured settings, but no baked-in processing. That is your RAW file. It is essentially a digital negative.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Why most apps cannot open RAW files
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The problem is that there is no single universal RAW format. Canon invented their own (CR2, then CR3). Nikon invented theirs (NEF). Sony invented theirs (ARW). Fujifilm, Olympus, Panasonic, Pentax, Hasselblad, and more than 800 other camera models all have their own proprietary RAW formats with different sensor layouts, compression schemes, and metadata structures.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          To decode a Sony ARW from an A7C II correctly, software needs to know the exact sensor dimensions, the Bayer colour filter pattern Sony used on that sensor, the compression algorithm, how the white balance coefficients are stored, and more. A generic image viewer cannot guess any of this. It needs a decoder built specifically for that camera model.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is why macOS Preview shows a blurry thumbnail for some RAW files but a blank grey box for others, and why Windows Photo Viewer often refuses to open them entirely. They only support the RAW formats that camera makers have specifically licensed to Microsoft and Apple, and even then, support lags months or years behind new camera releases.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How LibRaw solves this
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The open-source{" "}
          <a href="https://www.libraw.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">LibRaw library</a>{" "}
          is a community-maintained database of decoders for more than 800 camera models. Lightroom, Capture One, Darktable, and RawTherapee all use it (or their own equivalent) to decode RAW files. SammaPix compiles LibRaw to WebAssembly, which means the decoder runs inside your browser tab, on your CPU, with no server round trip. The RAW file never leaves your machine.
        </p>

        {/* ── Section 3: RAW formats by brand ────────────────────────────── */}

        <h2 id="raw-formats-by-brand" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          RAW formats by camera brand: CR2, NEF, ARW, RAF and more
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is the complete reference table for the RAW format your camera uses, so you can look up the right converter or search term.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Brand</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">RAW Extension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Example Cameras</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Typical RAW Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Canon</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">.CR2 (older) · .CR3 (2018+)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">EOS R5, R6 II, 5D Mark IV, 90D</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">25 to 55 MB</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Nikon</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">.NEF · .NRW (compact)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Z8, Z9, Z6 III, D850, D780</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">30 to 100 MB</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Sony</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">.ARW</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">A7C II, A7R V, A7 IV, ZV-E1</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">20 to 60 MB</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Fujifilm</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">.RAF</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">X-T5, X100VI, GFX 100S, X-S20</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">25 to 130 MB</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Adobe / Cross-brand</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">.DNG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Leica M11, Sigma fp, DJI drones, many Ricoh</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">15 to 85 MB</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Olympus / OM System</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">.ORF</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">OM-5, OM-1 Mark II, E-M1X</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">15 to 30 MB</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Panasonic</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">.RW2</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Lumix S5 II, G9 II, S1R</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">20 to 45 MB</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Pentax</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">.PEF · .DNG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">K-3 III, K-1 Mark II</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">25 to 40 MB</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          All of the formats in this table are supported by{" "}
          <Link href="/tools/raw-converter" className="text-[#6366F1] hover:underline">SammaPix RAW Converter</Link>.
          For dedicated per-brand conversion pages, see{" "}
          <Link href="/convert/cr2-to-jpg" className="text-[#6366F1] hover:underline">CR2 to JPG</Link> and{" "}
          <Link href="/convert/raw-to-jpg" className="text-[#6366F1] hover:underline">RAW to JPG</Link>.
        </p>

        {/* ── Section 4: How to open RAW in browser ──────────────────────── */}

        <h2 id="how-to-open-raw-in-browser" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to open and convert a RAW file in the browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The workflow is the same regardless of whether your file is a CR2, NEF, ARW, or RAF. Here is the step-by-step process:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/raw-converter</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drag and drop your RAW file</strong> onto the converter, or click to browse. The tool auto-detects the format from the file header.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">LibRaw decodes the file locally.</strong> You will see a progress indicator. For a 40 MB ARW on a modern laptop, this takes 4 to 6 seconds.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Preview the converted image.</strong> You can verify the result before downloading.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download the JPG.</strong> The file is created in your browser and downloaded directly to your device. The RAW file is never sent anywhere.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          That is the entire process. You can also use the specific per-format converters at{" "}
          <Link href="/convert/cr2-to-jpg" className="text-[#6366F1] hover:underline">/convert/cr2-to-jpg</Link> or{" "}
          <Link href="/convert/raw-to-jpg" className="text-[#6366F1] hover:underline">/convert/raw-to-jpg</Link>{" "}
          if you prefer a more focused experience.
        </p>

        {/* ── Tool CTA #1 ──────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Open your RAW file right now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Drag your CR2, NEF, ARW, RAF, DNG or other RAW file into the converter. Decodes locally via LibRaw in WebAssembly. Nothing is uploaded. Free with no account required.
          </p>
          <Link
            href="/tools/raw-converter"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open the RAW Converter, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: CR2 ───────────────────────────────────────────────── */}

        <h2 id="how-to-open-cr2-file" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to open a CR2 file (Canon)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          CR2 is Canon&apos;s RAW format for cameras produced roughly between 2004 and 2018, including the 5D Mark series, 7D series, and EOS Rebel lineup. Newer Canon cameras (EOS R5, R6, R3 and anything released after 2018) use CR3, Canon&apos;s updated RAW format.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Why your Mac or Windows PC cannot open CR2
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          macOS Preview can open CR2 files from some Canon cameras but not all. The support depends on whether Apple has added a codec for that specific model. Windows Photo Viewer requires the Microsoft Camera Codec Pack or the newer Microsoft Raw Image Extension from the Store. Neither is installed by default on Windows 11.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How to convert CR2 to JPG without Lightroom
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The fastest method without installing software: go to{" "}
          <Link href="/convert/cr2-to-jpg" className="text-[#6366F1] hover:underline">sammapix.com/convert/cr2-to-jpg</Link>{" "}
          and drop your .cr2 file. LibRaw decodes it in the browser and outputs a full-resolution JPG. If you have CR3 files from a newer Canon body, the{" "}
          <Link href="/tools/raw-converter" className="text-[#6366F1] hover:underline">main RAW converter</Link>{" "}
          handles both CR2 and CR3.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Free software alternatives if you prefer a desktop app: Canon Digital Photo Professional (DPP) is Canon&apos;s own free RAW processor, available for both Mac and Windows. It produces excellent results because Canon builds in their own colour profiles, but it only works with Canon cameras. For cross-brand use, Darktable and RawTherapee are powerful free open-source options.
        </p>

        {/* ── Section 6: NEF ───────────────────────────────────────────────── */}

        <h2 id="how-to-open-nef-file" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to open a NEF file (Nikon)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          NEF is Nikon&apos;s RAW format, used across almost their entire camera line from the consumer D3xxx series up to the professional Z9 and D6. The format has been updated multiple times over the years, so a NEF from a Z9 is substantially different internally from a NEF from a D70 shot in 2004, though they share the same extension.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          NEF compression types
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Nikon cameras offer several NEF compression modes: uncompressed (largest, lossless), lossless compressed (smaller, fully reversible), and lossy compressed (smaller still, a very small amount of data is discarded). For most photographers, lossless compressed NEF is the right choice. It gives you all the editing latitude of a RAW file at roughly half the file size.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How to open a NEF file without Lightroom
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Open your .nef file in the{" "}
          <Link href="/tools/raw-converter" className="text-[#6366F1] hover:underline">SammaPix RAW converter</Link>{" "}
          with no installation required. Nikon ViewNX-i is Nikon&apos;s own free viewer and basic editor for NEF. On Windows 10 and 11, installing the Microsoft Raw Image Extension from the Microsoft Store adds NEF thumbnail and preview support to File Explorer, without a full photo app.
        </p>

        {/* ── Section 7: ARW ───────────────────────────────────────────────── */}

        <h2 id="how-to-open-arw-file" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to open an ARW file (Sony)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          ARW is Sony&apos;s RAW format, and it is the one I work with daily on my A7C II. My ARW files average 40 to 42 MB per shot at the camera&apos;s full 33 megapixel resolution. They are beautiful files to work with in post: the Sony sensor captures enormous dynamic range, easily 14 stops, which gives me shadow recovery and highlight control I simply cannot achieve with the camera&apos;s JPG output.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The problem with ARW on Windows
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Windows does not natively support ARW files from newer Sony cameras. Even Windows 11 with all updates installed will show a grey box for an ARW from the A7C II in File Explorer. You need either the Microsoft Raw Image Extension (free, from the Store), or a dedicated app. macOS handles ARW better, but Preview often renders with flat-looking colours because it uses a generic colour profile rather than Sony&apos;s own colour science.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How to open an ARW file without software
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The quickest option: drop the .arw file into{" "}
          <Link href="/tools/raw-converter" className="text-[#6366F1] hover:underline">SammaPix RAW Converter</Link>{" "}
          in your browser. It decodes using LibRaw and delivers a colour-accurate JPG in seconds. Sony Imaging Edge Desktop is Sony&apos;s own free application for full ARW editing, but it requires installation and an account for some features. For quickly converting one file to share after a shoot, the browser tool is faster.
        </p>

        {/* ── Tool CTA #2 ──────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Convert CR2, NEF, or ARW to JPG in seconds</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No Lightroom. No install. Drop your RAW file and download the JPG. Everything runs in your browser with LibRaw. The file never leaves your device.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/raw-converter"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open the RAW Converter <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/convert/cr2-to-jpg"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              CR2 to JPG <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: RAW vs JPG ────────────────────────────────────────── */}

        <h2 id="raw-vs-jpg" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          RAW vs JPG: which to keep?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I am sometimes asked whether it is worth shooting RAW at all if you just convert to JPG anyway. The answer is yes, unambiguously, if you care about your photos. Here is why.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          What the RAW file gives you that JPG cannot
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Shadow recovery:</strong> A slightly underexposed RAW file can often be lifted 3 to 4 stops in post with acceptable noise. A JPG lifted the same amount looks broken, with crushed blacks and ugly banding.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Highlight recovery:</strong> Blown highlights in a JPG are gone forever. In a RAW, the sensor data for those overexposed areas is often still present and can be recovered partially or fully.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">White balance:</strong> In a JPG, white balance is baked in. Changing it later means reprocessing and losing data. In a RAW, white balance is just a metadata tag that you can change freely with no quality loss.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Non-destructive editing:</strong> Every edit you make to a RAW is stored as instructions, not baked into the pixel data. You can always return to the original.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The storage question
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The honest tradeoff with RAW is storage. A full day of shooting on my A7C II produces around 800 files at roughly 40 MB each: that is 32 GB per day of shooting. Over a two-week trip, that adds up fast.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          My workflow: I cull the take first (delete the blurry frames, the misses, the duplicates), then archive the keepers to a NAS at home and a cloud backup. I never delete a RAW file from a shoot I care about. Hard drives are cheap. Reshooting a moment is impossible.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          When JPG-only is fine
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you are shooting casual events where speed matters more than post-processing control, or if you have very limited storage and cannot backup reliably, shooting JPG-only is a reasonable choice. Modern camera JPGs are much better than they were ten years ago. Just understand that you are making a permanent tradeoff: the editing latitude you give up never comes back.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You can see the kind of photos these RAW files produce in{" "}
          <Link href="/portfolio" className="text-[#6366F1] hover:underline">my portfolio</Link>{" "}
          , the travel photos these tools were built for.
        </p>

        {/* ── Section 9: Privacy ───────────────────────────────────────────── */}

        <h2 id="privacy-why-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why I never upload RAW files to random converters
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This matters more than most photographers realise. RAW files are large, but they are also information-dense. Your ARW or NEF contains:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">GPS coordinates</strong> (if your camera or phone has GPS enabled): exact location of where the photo was taken.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Camera serial number:</strong> identifies your specific camera body, which could be linked to your purchase records.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Timestamps:</strong> exact date and time to the second.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Full-resolution image data:</strong> for client portraits, that is your client&apos;s face in a 33 megapixel file, uncompressed.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you upload a RAW file to a random converter, you are handing all of that to a third-party server. Their privacy policy may say they delete files after 24 hours. But do they? Are those servers encrypted? Who else has access? You simply do not know.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          How SammaPix processes RAW files differently
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix compiles{" "}
          <a href="https://www.libraw.org/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">LibRaw</a>{" "}
          to WebAssembly and runs it inside your browser tab. When you drop an ARW into the converter, this is what happens: your browser reads the file bytes from your disk, passes them to the WebAssembly module running in your tab, LibRaw decodes them, and the output JPG is constructed entirely in JavaScript memory. The decoded image is then offered for download via a browser blob URL.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          At no point does the file travel over the network. There is no API call. There is no server receiving your image data. If you want to verify this yourself, open your browser&apos;s network inspector (F12, then the Network tab), then drop a RAW file into the converter. You will see zero outgoing requests containing your file.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built this tool for the same reason I use it: I shoot a lot of client work and personal portraits, and those files should not leave my control. If you want to strip GPS and other EXIF metadata from the JPG before sharing, you can also use{" "}
          <Link href="/tools/compress" className="text-[#6366F1] hover:underline">SammaPix Compress</Link>{" "}
          with EXIF stripping enabled, also entirely in-browser.
        </p>

        {/* ── Section 10: Batch conversion ─────────────────────────────────── */}

        <h2 id="batch-conversion" className="text-xl font-semibold text-gray-900 dark:text-[#A3A3A3] mt-10 mb-3 tracking-tight">
          <span className="text-gray-900 dark:text-[#E5E5E5]">Batch RAW conversion: converting multiple files at once</span>
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          After a shoot I typically need to convert not one file but a selection of 20 to 50 keepers quickly. The browser converter supports dropping multiple RAW files at once. They are processed sequentially, one at a time, each using your CPU via the WebAssembly module. On a MacBook Pro M3, converting a 40 MB ARW takes about 4 seconds, so a batch of 20 takes roughly 80 seconds total without leaving the browser.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          When to use desktop software instead
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For large batches of 100 or more files, a desktop application is faster. Lightroom Classic can export 100 RAW files to JPG in the background while you continue working. Adobe Bridge with Camera Raw, or Darktable with its export queue, also handle large batches efficiently. The browser converter is best for quick one-off conversions and small selections where you want speed and privacy without opening a full application.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Free desktop options for batch RAW conversion
        </h3>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Darktable</strong> (free, Mac/Windows/Linux): professional-grade RAW processor with batch export. Uses LibRaw internally.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">RawTherapee</strong> (free, Mac/Windows/Linux): highly configurable, excellent for technical users.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Canon DPP</strong> (free for Canon users): best colour accuracy for CR2 and CR3 files.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Nikon ViewNX-i</strong> (free for Nikon users): best results for NEF files.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Sony Imaging Edge Desktop</strong> (free for Sony users): handles ARW with Sony&apos;s own colour profiles.
          </li>
        </ul>

        {/* ── Tool CTA #3 ──────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Convert your RAW files, compress, or strip EXIF</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            After converting RAW to JPG, you may want to compress the result before sharing or strip GPS metadata. All three tools run locally in the browser with no upload.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/raw-converter"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              RAW Converter <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Compress JPGs <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/convert/raw-to-jpg"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              RAW to JPG converter <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
