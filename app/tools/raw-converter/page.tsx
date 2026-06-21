import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  ShieldCheck,
  Layers,
  CheckCircle2,
  FileImage,
} from "lucide-react";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import MetaViewContent from "@/components/tracking/MetaViewContent";
import { APP_URL } from "@/lib/constants";
// Client wrapper renders the converter + next-step suggestions. libraw-wasm is a
// browser-only WASM module; the wrapper keeps this page a Server Component.
import RawClient from "@/components/tools/RawClient";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "RAW Converter: CR2, NEF, ARW, DNG to JPG/WebP · Free, No Upload",
  description:
    "Convert camera RAW files (CR2, CR3, NEF, ARW, DNG, RAF, ORF, RW2, PEF, SRW) to JPG or WebP free. Runs 100% in your browser · no upload · no signup · privacy-first.",
  keywords: [
    "raw converter",
    "cr2 to jpg",
    "nef to jpg",
    "arw to jpg",
    "dng to jpg",
    "convert raw to jpg",
    "raw to jpg online free",
    "raw to webp",
    "camera raw converter online",
    "convert cr2 online",
    "convert nef online",
    "convert arw online",
    "dng converter",
    "raf to jpg",
    "orf to jpg",
    "rw2 to jpg",
    "raw photo converter no upload",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/raw-converter`,
  },
  openGraph: {
    title: "RAW Converter: CR2, NEF, ARW, DNG to JPG/WebP · Free, No Upload",
    description:
      "Convert camera RAW files to JPG or WebP free. Runs 100% in your browser · no upload · no signup · privacy-first.",
    url: `${APP_URL}/tools/raw-converter`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix RAW Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RAW Converter: CR2, NEF, ARW, DNG to JPG/WebP · Free, No Upload",
    description:
      "Convert camera RAW files to JPG or WebP free. Runs 100% in your browser · no upload · no signup.",
  },
};

// ── Feature cards ─────────────────────────────────────────────────────────────

const features = [
  {
    icon: (
      <ShieldCheck
        className="h-5 w-5 text-gray-700 dark:text-gray-400"
        strokeWidth={1.5}
      />
    ),
    title: "True privacy · no upload",
    description:
      "Your RAW files never leave your device. All decoding happens inside the browser using a compiled C library (libraw) via WebAssembly. Not even SammaPix can see your photos.",
  },
  {
    icon: (
      <Layers
        className="h-5 w-5 text-gray-700 dark:text-gray-400"
        strokeWidth={1.5}
      />
    ),
    title: "Batch conversion",
    description:
      "Convert up to 20 RAW files at once on the free plan, up to 500 on Pro. Files are processed sequentially to keep memory usage manageable for large sensor cameras.",
  },
  {
    icon: (
      <FileImage
        className="h-5 w-5 text-gray-700 dark:text-gray-400"
        strokeWidth={1.5}
      />
    ),
    title: "JPG or WebP output",
    description:
      "Choose JPG for maximum compatibility or WebP for smaller files. Adjustable quality from 60 to 100. Default is 90, which preserves all visible detail from the RAW decode.",
  },
];

// ── Supported formats ─────────────────────────────────────────────────────────

const SUPPORTED_FORMATS = [
  { ext: "CR2 / CR3", brand: "Canon" },
  { ext: "NEF", brand: "Nikon" },
  { ext: "ARW", brand: "Sony" },
  { ext: "DNG", brand: "Adobe / Leica / Google" },
  { ext: "RAF", brand: "Fujifilm" },
  { ext: "ORF", brand: "Olympus / OM System" },
  { ext: "RW2", brand: "Panasonic" },
  { ext: "PEF", brand: "Pentax / Ricoh" },
  { ext: "SRW", brand: "Samsung" },
  { ext: "3FR", brand: "Hasselblad" },
  { ext: "MRW", brand: "Minolta / Konica Minolta" },
  { ext: "X3F", brand: "Sigma Foveon" },
  { ext: "RAW", brand: "Leica / Panasonic (generic)" },
];

const faqs = [
  {
    q: "Which RAW formats are supported?",
    a: "SammaPix supports CR2, CR3 (Canon), NEF (Nikon), ARW (Sony), DNG (Adobe, Leica, Google Pixel), RAF (Fujifilm), ORF (Olympus), RW2 (Panasonic), PEF (Pentax), SRW (Samsung), 3FR (Hasselblad), MRW (Minolta), X3F (Sigma) and generic .RAW files. The underlying decoder is libraw, one of the most widely used RAW parsing libraries, covering 1,000+ camera models.",
  },
  {
    q: "Is it really no-upload? How does browser decoding work?",
    a: "Yes. The tool uses WebAssembly (WASM) to run libraw, a compiled C library, directly inside your browser. Your RAW file is read from disk into browser memory, decoded there, and the resulting JPG or WebP is saved back to your disk. No bytes travel over the network. You can even disconnect from the internet after the page loads and the tool still works.",
  },
  {
    q: "Will I lose quality converting RAW to JPG?",
    a: "Converting from RAW to JPG always applies some lossy compression, but at quality 90 (the default) the result is visually indistinguishable from a high-quality export. The RAW decode uses the camera white balance metadata and 8-bit output, which matches what most RAW converters produce for sharing. For archival work you may prefer lossless formats, but for sharing, printing, or web use, JPG at 90 is excellent.",
  },
  {
    q: "Is there a maximum file size?",
    a: "There is no file size limit imposed by SammaPix because nothing is uploaded. The practical limit is your device RAM. A 45 MP RAW file (e.g. Sony A7R V .ARW) expands to roughly 130 MB of uncompressed RGB data in memory during decode. Modern laptops handle this fine. On mobile devices with limited RAM, very large RAW files may cause the browser tab to crash · a desktop or laptop is recommended for files above 30 MB.",
  },
  {
    q: "Why use this instead of Lightroom or Capture One?",
    a: "Lightroom and Capture One are professional tools with full color grading pipelines, lens corrections, and non-destructive editing. SammaPix RAW Converter is a quick utility: drop a file, get a JPG in seconds, no software to install, no subscription required. It is ideal for sharing a few shots quickly, extracting frames for web use, or converting files on a machine where Lightroom is not installed.",
  },
  {
    q: "Is the converter free? Are there limits?",
    a: "The free plan converts up to 20 RAW files per session and lets you download each output individually. SammaPix Pro (starting at $9/mo) raises the batch limit to 500 files and adds ZIP batch download. There is also a Day Pass ($2.99) for one-time large jobs.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RawConverterPage() {
  return (
    <main>
      <MetaViewContent contentName="RAW Converter" contentId="raw-converter" />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="max-w-3xl">
          <div className="flex items-start gap-3 mb-2">
            <div
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
              style={{ backgroundColor: "#6366F115", border: "1px solid #6366F130" }}
              aria-hidden="true"
            >
              <Camera
                className="h-4 w-4"
                style={{ color: "#6366F1" }}
                strokeWidth={1.5}
              />
            </div>
            <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
              RAW to JPG · Camera RAW Converter
            </h1>
          </div>

          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
            Convert{" "}
            <strong className="text-[#171717] dark:text-[#E5E5E5]">
              CR2, CR3, NEF, ARW, DNG, RAF, ORF, RW2, PEF, SRW
            </strong>{" "}
            and more to JPG or WebP instantly. Powered by{" "}
            <strong className="text-[#171717] dark:text-[#E5E5E5]">libraw</strong> compiled to WebAssembly,
            so decoding runs entirely in your browser · no upload, no signup, no file size cap on our side.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
              CR2 · CR3 · NEF · ARW · DNG
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
              JPG · WebP output
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
              Batch up to 20 free
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
              100% private · no upload
            </span>
          </div>
        </div>
      </section>

      {/* Tool + next-step suggestions (client subtree) */}
      <RawClient />

      {/* How to use */}
      <HowToUse
        toolName="RAW Converter"
        steps={[
          {
            title: "Drop your RAW files",
            desc: "Drag and drop CR2, NEF, ARW, DNG or any supported RAW file onto the converter, or click to browse. Batch convert up to 20 files at once on the free plan.",
          },
          {
            title: "Choose output format and quality",
            desc: "Select JPG for universal compatibility or WebP for smaller file sizes. Adjust the quality slider from 60 to 100 · 90 is the default and preserves all visible detail.",
          },
          {
            title: "Download your converted images",
            desc: "Download each JPG or WebP individually with one click, or download the full batch as a ZIP archive (Pro). Files are saved directly from your browser.",
          },
        ]}
        proTip={{
          text: "After converting RAW to JPG, compress your images further to cut file size by 50-80% without visible quality loss.",
          linkLabel: "Compress images",
          linkHref: "/tools/compress",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why use SammaPix to convert RAW files?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported formats table */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Supported RAW formats
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-5">
            The converter is powered by{" "}
            <strong className="text-[#525252] dark:text-[#A3A3A3]">libraw</strong>, the same C library used by Darktable,
            RawTherapee, and digiKam. It supports 1,000+ camera models across all major brands.
            Below is a list of the primary format extensions covered.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SUPPORTED_FORMATS.map(({ ext, brand }) => (
              <div
                key={ext}
                className="flex items-center gap-3 px-3 py-2 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]"
              >
                <span className="text-[11px] font-mono font-semibold text-[#6366F1] w-28 shrink-0">
                  {ext}
                </span>
                <span className="text-xs text-[#737373]">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long-form SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            What is a camera RAW file?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            A RAW file is the unprocessed data captured directly by your camera&apos;s image sensor.
            Unlike JPG, which applies in-camera sharpening, noise reduction, and color processing before
            saving, a RAW file stores the raw sensor readings. This gives photographers maximum flexibility
            for post-processing: you can change exposure, white balance, highlights, and shadows
            non-destructively in software like Lightroom, Darktable, or Capture One.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Each camera manufacturer uses a proprietary RAW format: Canon uses CR2 and CR3, Nikon uses NEF,
            Sony uses ARW, Fujifilm uses RAF, and so on. Adobe&apos;s DNG (Digital Negative) is an open
            standard that many cameras and apps now use directly. Because RAW formats are proprietary,
            not all software can open every format, which is where a universal RAW converter becomes useful.
          </p>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3 mt-6">
            Why convert RAW to JPG?
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Share photos instantly without requiring the recipient to have RAW-capable software
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Upload to social media, e-commerce platforms, or CMS that only accept JPG or PNG
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Submit to print labs, photo contests, or stock agencies that require universal formats
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Reduce storage: a 45 MB RAW file becomes a 4-8 MB JPG at quality 90
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6366F1] mt-0.5"> - </span>
              Preview a shoot quickly without opening Lightroom
            </li>
          </ul>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How browser-based RAW decoding works
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            SammaPix uses{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1.5 py-0.5 rounded border border-[#E5E5E5] dark:border-[#2A2A2A] dark:text-[#E5E5E5]">
              libraw-wasm
            </code>
            , the official WebAssembly build of libraw. When you drop a RAW file, the browser reads it
            into memory, the WASM module demosaics the Bayer sensor data into an RGB image, applies
            the camera white balance metadata, and hands the pixel data to a Canvas element. The Canvas
            then encodes the result as JPG or WebP and offers it for download, entirely without any
            network request.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            This approach is fundamentally more private than any server-based converter. Online tools
            that convert RAW by uploading your file cannot guarantee what happens to that data.
            SammaPix&apos;s browser-based approach makes that question irrelevant: your photos stay
            on your device at all times.
          </p>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            RAW to JPG vs RAW to WebP: which should you choose?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Choose JPG if you need the widest compatibility: every device, browser, operating system,
            and application can open a JPG. Choose WebP if you are publishing images to a website or
            web app, as WebP files are typically 25-40% smaller than equivalent JPGs at the same
            visual quality. All modern browsers support WebP, and it is the recommended format for
            web performance. If you are printing or sharing with clients, JPG is the safer choice.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-5">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {q}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedTools toolId="raw-converter" />

      {/* JSON-LD: SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix RAW Converter",
                url: `${APP_URL}/tools/raw-converter`,
                description:
                  "Free online RAW converter. Convert CR2, CR3, NEF, ARW, DNG, RAF, ORF, RW2, PEF, SRW to JPG or WebP entirely in your browser. No upload, no signup.",
                applicationCategory: "PhotographyApplication",
                operatingSystem: "Web Browser",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                author: {
                  "@type": "Person",
                  name: "Luca Sammarco",
                  url: "https://lucasammarco.com",
                },
                creator: {
                  "@type": "Organization",
                  name: "SammaPix",
                  url: `${APP_URL}`,
                },
                featureList: [
                  "CR2, CR3, NEF, ARW, DNG, RAF, ORF, RW2, PEF, SRW support",
                  "JPG and WebP output",
                  "Batch conversion up to 20 files (free)",
                  "100% browser-based · no upload",
                  "Camera white balance applied automatically",
                  "Quality slider 60-100",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: faqs.map(({ q, a }) => ({
                  "@type": "Question",
                  name: q,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: a,
                  },
                })),
              },
              {
                "@type": "HowTo",
                name: "How to convert RAW to JPG online",
                description:
                  "Convert CR2, NEF, ARW, DNG and other camera RAW files to JPG or WebP free using SammaPix. Runs entirely in your browser · no upload required.",
                totalTime: "PT2M",
                tool: {
                  "@type": "SoftwareApplication",
                  name: "SammaPix RAW Converter",
                  url: `${APP_URL}/tools/raw-converter`,
                },
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Drop your RAW files",
                    text: "Drag and drop your CR2, NEF, ARW, DNG or other RAW files onto the SammaPix converter, or click to browse. You can batch convert up to 20 files at once on the free plan.",
                    url: `${APP_URL}/tools/raw-converter`,
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Choose format and quality",
                    text: "Select JPG for maximum compatibility or WebP for smaller files. Adjust the quality slider from 60 to 100. The default of 90 preserves all visible detail.",
                    url: `${APP_URL}/tools/raw-converter`,
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Download converted images",
                    text: "Download each converted JPG or WebP individually, or use Download ZIP to get all files in a single archive (Pro feature).",
                    url: `${APP_URL}/tools/raw-converter`,
                  },
                ],
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: `${APP_URL}`,
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
                    name: "RAW Converter",
                    item: `${APP_URL}/tools/raw-converter`,
                  },
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
