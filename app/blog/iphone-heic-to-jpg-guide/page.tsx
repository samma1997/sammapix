import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "How to Convert iPhone HEIC Photos to JPG Free (No Software) | SammaPix Blog",
  description:
    "Learn how to convert HEIC to JPG free without installing any software. Step-by-step guide covering iPhone camera settings, Mac Preview, and the fastest browser-based method.",
  alternates: {
    canonical: `${APP_URL}/blog/iphone-heic-to-jpg-guide`,
  },
  keywords: [
    "convert heic to jpg free",
    "heic to jpg",
    "iphone heic photos",
    "heic converter online",
    "convert heic to jpeg",
    "heic to jpg no software",
    "what is heic format",
    "iphone photo format",
    "heic vs jpg",
  ],
  openGraph: {
    title: "How to Convert iPhone HEIC Photos to JPG Free (No Software)",
    description:
      "HEIC files not opening on your PC or Windows app? This guide shows every method to convert HEIC to JPG free- from iPhone settings to a browser tool that needs zero installs.",
    url: `${APP_URL}/blog/iphone-heic-to-jpg-guide`,
    type: "article",
    publishedTime: "2026-02-12",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Convert iPhone HEIC Photos to JPG Free (No Software)",
    description:
      "HEIC files not opening? Learn the fastest way to convert iPhone HEIC photos to JPG- free, no software, works entirely in your browser.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-02-12";
const POST_DATE_FORMATTED = "February 12, 2026";
const POST_URL = `${APP_URL}/blog/iphone-heic-to-jpg-guide`;
const POST_TITLE = "How to Convert iPhone HEIC Photos to JPG Free (No Software)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Learn how to convert HEIC to JPG free without installing any software. Step-by-step guide covering iPhone camera settings, Mac Preview, and the fastest browser-based method.",
  url: POST_URL,
  datePublished: POST_DATE,
  dateModified: POST_DATE,
  author: {
    "@type": "Person",
    name: "Luca Sammarco",
    url: "https://lucasammarco.com",
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
  image: {
    "@type": "ImageObject",
    url: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&q=80",
  },
  keywords: [
    "convert heic to jpg free",
    "heic to jpg",
    "iphone heic photos",
    "heic converter online",
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
      name: "What is a HEIC file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "HEIC (High Efficiency Image Container) is Apple's default photo format for iPhones running iOS 11 and later. It uses HEVC compression to store photos at roughly half the file size of JPEG while maintaining comparable visual quality.",
      },
    },
    {
      "@type": "Question",
      name: "Why can't I open HEIC files on my PC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Windows does not natively support HEIC without an optional codec installed from the Microsoft Store. Most non-Apple software- including older versions of Photoshop, web browsers, and most social platforms- requires JPG. Converting HEIC to JPG solves the compatibility issue immediately.",
      },
    },
    {
      "@type": "Question",
      name: "Does converting HEIC to JPG reduce quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Converting HEIC to JPG at a high quality setting (80–90%) produces output that is visually indistinguishable from the original on any standard display. The visual difference is negligible for sharing, social media, and web use.",
      },
    },
    {
      "@type": "Question",
      name: "How do I stop my iPhone from taking HEIC photos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go to Settings > Camera > Formats and select 'Most Compatible'. Your iPhone will then save photos as JPG instead of HEIC. Note that this uses more storage space since JPEG files are roughly twice the size of equivalent HEIC files.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a free way to convert HEIC to JPG without software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SammaPix HEIC Converter runs entirely in your browser- no downloads, no account, no upload to any server. Drop your HEIC files and download JPGs instantly. It supports batch conversion and processes files locally on your device.",
      },
    },
  ],
};

export default function IphoneHeicToJpgGuidePage() {
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(POST_TITLE)}&url=${encodeURIComponent(POST_URL)}&via=lucasammarco`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(POST_URL)}`;

  return (
    <div className="py-12 px-4 sm:px-6 bg-white dark:bg-[#191919] min-h-screen">
      <div className="max-w-2xl mx-auto">

        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-[#737373] hover:text-gray-700 dark:hover:text-[#E5E5E5] mb-8 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          Back to Blog
        </Link>

        <article>
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-medium bg-[#F5F5F5] dark:bg-[#252525] text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded border border-[#E5E5E5] dark:border-[#333] uppercase tracking-wide">
                Guide
              </span>
              <span className="text-[10px] text-[#A3A3A3] dark:text-[#737373]">&middot;</span>
              <time className="text-[10px] text-[#A3A3A3] dark:text-[#737373]" dateTime={POST_DATE}>
                {POST_DATE_FORMATTED}
              </time>
              <span className="text-[10px] text-[#A3A3A3] dark:text-[#737373]">&middot;</span>
              <span className="text-[10px] text-[#A3A3A3] dark:text-[#737373]">10 min read</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-[#E5E5E5] leading-snug tracking-tight mb-4">
              {POST_TITLE}
            </h1>

            <p className="text-base text-gray-500 dark:text-[#A3A3A3] leading-relaxed">
              You just transferred photos from your iPhone and now nothing will open them.
              The .heic extension is Apple&apos;s default since iOS 11- and while it saves
              storage on your phone, it breaks compatibility with nearly everything else.
              This guide covers every method to convert HEIC to JPG free, including a
              browser-based option that requires zero software and zero uploads.
            </p>
          </header>

          {/* Hero image */}
          <figure className="mb-10">
            <img
              src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=900&q=80&auto=format&fit=crop"
              alt="iPhone camera interface showing photo capture"
              className="w-full rounded-md object-cover"
              style={{ aspectRatio: "16/9", objectPosition: "center" }}
              loading="lazy"
            />
            <figcaption className="mt-2 text-xs text-gray-400 dark:text-[#737373] text-center">
              iPhones have used HEIC as the default photo format since iOS 11 in 2017.
              Photo by{" "}
              <a
                href="https://unsplash.com/photos/photo-1556656793-08538906a9f8"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                Unsplash
              </a>
            </figcaption>
          </figure>

          <div className="prose-content">

            {/* Section 1 */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              What is HEIC and why does Apple use it?
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              HEIC stands for High Efficiency Image Container. It is Apple&apos;s implementation
              of the HEIF (High Efficiency Image File Format) standard, which was developed
              by the Moving Picture Experts Group (MPEG) and adopted by Apple in iOS 11 in 2017.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              At its core, HEIC uses{" "}
              <a
                href="https://support.apple.com/en-us/102586"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                HEVC (H.265) compression
              </a>
              {" "} - the same video codec used for 4K video- to compress still images. The
              result is a file that is typically 40–50% smaller than an equivalent JPEG while
              maintaining the same perceptual quality. A 3 MB JPEG photo taken on an iPhone
              might be stored as a 1.5 MB HEIC file with no visible difference.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Apple uses HEIC for three practical reasons. First, it saves storage on devices
              where 64 GB can fill quickly with 12-megapixel photos. Second, it supports
              advanced features like 16-bit color depth (versus JPEG&apos;s 8-bit), HDR image data,
              depth maps from Portrait Mode, and multiple images in a single file (used for
              Live Photos and burst sequences). Third, it is the container used for Apple&apos;s
              ProRAW and ProRes workflows.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The problem is compatibility. Despite being a technically superior format, HEIC
              has limited support outside the Apple ecosystem. Windows requires a paid or
              separately installed codec. Android does not support it natively. Most web
              platforms, social networks, and professional photo editing workflows still expect
              JPEG as the universal standard. That gap is the entire reason you need to convert.
            </p>

            {/* Section 2 */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              HEIC vs JPG: an honest comparison
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Understanding the difference between these two formats helps you decide when
              converting is worth it and when you might want to shoot in JPG from the start.
            </p>

            <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
              <table className="w-full text-xs border-collapse min-w-[480px]">
                <thead>
                  <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">Feature</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">HEIC</th>
                    <th className="text-center py-2 px-3 font-semibold text-gray-700 dark:text-[#E5E5E5] bg-[#FAFAFA] dark:bg-[#1E1E1E]">JPG</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "File size (same quality)", heic: "Smaller (40–50%)", jpg: "Baseline" },
                    { feature: "Color depth", heic: "Up to 16-bit", jpg: "8-bit" },
                    { feature: "HDR support", heic: "Yes", jpg: "No" },
                    { feature: "Transparency (alpha)", heic: "Yes", jpg: "No" },
                    { feature: "Multiple images in one file", heic: "Yes (Live Photos, bursts)", jpg: "No" },
                    { feature: "Windows compatibility", heic: "Requires codec", jpg: "Universal" },
                    { feature: "macOS compatibility", heic: "Native (macOS 10.13+)", jpg: "Universal" },
                    { feature: "Android compatibility", heic: "Not native", jpg: "Universal" },
                    { feature: "Web browser support", heic: "Safari only", jpg: "Universal" },
                    { feature: "Social media upload", heic: "Often rejected", jpg: "Universal" },
                    { feature: "Editing software support", heic: "Limited", jpg: "Universal" },
                  ].map((row, i) => (
                    <tr key={row.feature} className={`border-b border-[#E5E5E5] dark:border-[#2A2A2A] ${i % 2 === 0 ? "" : "bg-[#FAFAFA] dark:bg-[#1A1A1A]"}`}>
                      <td className="py-2 px-3 text-gray-600 dark:text-[#A3A3A3]">{row.feature}</td>
                      <td className="py-2 px-3 text-center text-gray-500 dark:text-[#737373]">{row.heic}</td>
                      <td className="py-2 px-3 text-center text-gray-500 dark:text-[#737373]">{row.jpg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The verdict is clear: HEIC wins on technical quality and storage efficiency.
              JPG wins on compatibility. For any use case involving sharing, uploading, or
              working in cross-platform environments, JPG remains the practical standard.
            </p>

            {/* Section 3 */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              Method 1: Change your iPhone camera settings (prevent HEIC at source)
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              If you regularly transfer photos to Windows PCs or non-Apple devices, the simplest
              long-term solution is to stop your iPhone from saving in HEIC. This does not help
              existing HEIC photos already on your device, but it means all future shots are
              saved as JPG.
            </p>

            <div className="space-y-4 mb-6">
              {[
                {
                  step: "1",
                  title: "Open Settings",
                  body: "On your iPhone, tap the Settings app (the grey icon with gears).",
                },
                {
                  step: "2",
                  title: "Navigate to Camera",
                  body: "Scroll down and tap Camera. This is typically about halfway down the main Settings list.",
                },
                {
                  step: "3",
                  title: "Tap Formats",
                  body: "At the top of the Camera settings menu you will see Formats. Tap it.",
                },
                {
                  step: "4",
                  title: "Select Most Compatible",
                  body: "Under Camera Capture, tap Most Compatible. Your iPhone will now save new photos as JPG and videos as H.264, maximising compatibility with non-Apple devices.",
                },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#333] flex items-center justify-center mt-0.5">
                    <span className="text-[11px] font-semibold text-gray-600 dark:text-[#A3A3A3]">{step}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mb-1">{title}</p>
                    <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              The trade-off is storage. HEIC&apos;s efficiency means that switching to Most
              Compatible will roughly double the space used per photo. On a 64 GB iPhone
              that fills up quickly, this may not be practical. The better approach for
              most people is to keep shooting in HEIC (best quality for the storage cost)
              and convert to JPG at the point of sharing or transferring.
            </p>

            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md px-4 py-3 mb-6">
              <p className="text-xs font-semibold text-gray-800 dark:text-[#E5E5E5] mb-1">
                Bonus: automatic conversion on transfer
              </p>
              <p className="text-xs text-gray-500 dark:text-[#737373] leading-relaxed">
                iOS has a built-in option to automatically convert HEIC to JPG when transferring
                to a Mac or PC. Go to Settings &gt; Photos and under Transfer to Mac or PC, select
                Automatic. This converts files during AirDrop or USB transfer without changing
                how photos are stored on your iPhone.
              </p>
            </div>

            {/* Section 4 */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              Method 2: Convert using Mac Preview (no extra software)
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              If you are on a Mac, Preview- the built-in image viewer- can convert HEIC to JPG
              directly. macOS has supported HEIC natively since macOS High Sierra (10.13).
            </p>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Convert a single file
            </h3>
            <div className="space-y-3 mb-5">
              {[
                { step: "1", text: "Double-click the .heic file to open it in Preview." },
                { step: "2", text: "Go to File > Export in the menu bar." },
                { step: "3", text: "In the Format dropdown, select JPEG." },
                { step: "4", text: "Adjust the Quality slider if needed (80–85 is a good default for web use)." },
                { step: "5", text: "Click Save. The JPG is saved alongside the original HEIC file." },
              ].map(({ step, text }) => (
                <div key={step} className="flex gap-3">
                  <span className="flex-shrink-0 text-[11px] font-semibold text-gray-400 dark:text-[#737373] mt-0.5 w-4">{step}.</span>
                  <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-semibold text-gray-800 dark:text-[#D4D4D4] mt-6 mb-2">
              Batch convert multiple HEIC files in Preview
            </h3>
            <div className="space-y-3 mb-5">
              {[
                { step: "1", text: "Select all the HEIC files you want to convert in Finder (Cmd+A to select all, or Cmd+click for a selection)." },
                { step: "2", text: "Right-click the selection and choose Open With > Preview. All files open in a single Preview window." },
                { step: "3", text: "In Preview, press Cmd+A to select all thumbnails in the sidebar." },
                { step: "4", text: "Go to File > Export Selected Images..." },
                { step: "5", text: "Choose a destination folder, set Format to JPEG, adjust quality, and click Choose. All files are converted and saved." },
              ].map(({ step, text }) => (
                <div key={step} className="flex gap-3">
                  <span className="flex-shrink-0 text-[11px] font-semibold text-gray-400 dark:text-[#737373] mt-0.5 w-4">{step}.</span>
                  <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Preview batch conversion works well for occasional use, but it has limitations:
              you need to have the HEIC files on your Mac first, it does not give you a progress
              indicator for large batches, and there is no ZIP download- you get individual
              JPG files in the folder you specified.
            </p>

            {/* Second image */}
            <figure className="my-8">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80&auto=format&fit=crop"
                alt="Smartphone showing a gallery of photos"
                className="w-full rounded-md object-cover"
                style={{ aspectRatio: "16/9", objectPosition: "center" }}
                loading="lazy"
              />
              <figcaption className="mt-2 text-xs text-gray-400 dark:text-[#737373] text-center">
                Modern iPhones store thousands of HEIC photos that need converting before sharing
                or transferring to non-Apple devices. Photo by{" "}
                <a
                  href="https://unsplash.com/photos/photo-1512941937669-90a1b58e7e9c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  Unsplash
                </a>
              </figcaption>
            </figure>

            {/* Section 5 */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              Method 3: Convert HEIC to JPG free in your browser (no software, no upload)
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              For Windows users, non-Mac users, or anyone who wants to convert HEIC to JPG
              free without installing anything, a browser-based converter is the most practical
              option. The key word is <em>browser-based</em>- not every online tool is equal.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Most online HEIC converters upload your files to a remote server for processing.
              That means your photos- which may contain personal content, location data, and
              identifiable information- leave your device and are stored on a third-party server,
              even if temporarily. For a family album or travel photos, this is a privacy concern
              worth taking seriously.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              According to the{" "}
              <a
                href="https://web.dev/articles/browser-filesystem-access"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                Web File System Access API
              </a>
              {" "}documentation and modern browser capabilities, client-side image processing
              is now fully practical in the browser without any server involvement. File decoding,
              pixel transformation, and re-encoding to JPEG can all happen locally using
              JavaScript APIs- your files never leave your device.
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              This is exactly how{" "}
              <Link
                href="/tools/heic"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix HEIC Converter
              </Link>
              {" "}works. Processing is done entirely on your device inside the browser tab.
              No account required. No file size limit imposed by server bandwidth. No waiting
              for upload progress bars.
            </p>

            {/* Section 6: Step by step SammaPix */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              Step-by-step: convert HEIC to JPG with SammaPix
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              This method works on Windows, Mac, Linux, Android, and any device with a modern
              browser. No installation, no account, no file upload.
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  step: "1",
                  title: "Open the HEIC Converter",
                  body: "Go to sammapix.com/tools/heic in any modern browser (Chrome, Firefox, Safari, Edge). The converter loads instantly- there is no installation or plugin required.",
                },
                {
                  step: "2",
                  title: "Add your HEIC files",
                  body: "Drag and drop your .heic files onto the drop zone, or click to browse and select files from your device. You can add a single file or an entire batch at once- there is no per-session file limit.",
                },
                {
                  step: "3",
                  title: "Choose output quality (optional)",
                  body: "Use the quality slider to set your JPG output quality. The default setting of 85 is a well-tested balance between file size and visual quality that suits most sharing and web use cases. Increase to 90–95 for print-ready output.",
                },
                {
                  step: "4",
                  title: "Convert",
                  body: "Click Convert. All processing happens locally in your browser tab. For a batch of 20–30 photos, conversion typically completes in a few seconds depending on your device speed.",
                },
                {
                  step: "5",
                  title: "Download your JPG files",
                  body: "Download converted files individually, or use the Download All as ZIP button to get everything in one archive. Files are named identically to your originals- just with the .jpg extension.",
                },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#333] flex items-center justify-center mt-0.5">
                    <span className="text-[11px] font-semibold text-gray-600 dark:text-[#A3A3A3]">{step}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mb-1">{title}</p>
                    <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Inline CTA */}
            <Link
              href="/tools/heic"
              className="flex items-center justify-between gap-4 bg-[#171717] text-white rounded-md px-6 py-5 hover:bg-[#262626] transition-colors group mt-2 mb-10"
            >
              <div>
                <p className="text-xs font-medium text-[#A3A3A3] uppercase tracking-wide mb-1">
                  Free- no upload, no account
                </p>
                <p className="text-sm font-semibold text-white leading-snug">
                  Convert HEIC to JPG now - SammaPix HEIC Converter
                </p>
              </div>
              <ArrowRight
                className="h-4 w-4 text-[#737373] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
                strokeWidth={1.5}
              />
            </Link>

            {/* Section 7: Why SammaPix */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              Why use SammaPix to convert HEIC to JPG free?
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              There are dozens of online HEIC converters. Here is what makes the SammaPix
              approach meaningfully different.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 mt-4">
              {[
                {
                  title: "No upload- total privacy",
                  detail: "Your files never leave your device. Conversion happens locally in your browser tab using JavaScript APIs. SammaPix cannot see, store, or access your photos.",
                },
                {
                  title: "Batch conversion",
                  detail: "Convert your entire iPhone photo library in one session. Drop hundreds of files at once, convert, and download as a single ZIP archive.",
                },
                {
                  title: "No file size limits",
                  detail: "Server-based tools cap file sizes to control bandwidth costs. Since SammaPix processes files locally, there is no per-file size restriction imposed by a server.",
                },
                {
                  title: "No account required",
                  detail: "The HEIC converter is completely free with no registration, no email, and no account. Open the tool and start converting immediately.",
                },
                {
                  title: "Quality control",
                  detail: "Adjust output quality per batch. Get the exact balance of file size and visual quality you need- whether that is a compact 70 for social media or a crisp 90 for printing.",
                },
                {
                  title: "Works everywhere",
                  detail: "Windows, Mac, Linux, Chromebook, Android, iPad. Any modern browser works. No platform-specific software or codec installation required.",
                },
              ].map(({ title, detail }) => (
                <div
                  key={title}
                  className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md px-4 py-3"
                >
                  <p className="text-xs font-semibold text-gray-800 dark:text-[#E5E5E5] mb-1">{title}</p>
                  <p className="text-xs text-gray-500 dark:text-[#737373] leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>

            {/* Section 8: After converting */}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3">
              What to do with your JPG files after converting
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              Once you have converted your HEIC photos to JPG, a few additional optimisation
              steps can make a significant difference depending on your use case.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-5 mb-1">
              Compress before uploading to a website or social media
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              A direct HEIC-to-JPG conversion preserves full resolution. A photo from an
              iPhone 15 Pro is 48 megapixels- the JPG output will be several megabytes even
              at quality 85. Before uploading to a blog, e-commerce site, or portfolio, run
              the files through{" "}
              <Link
                href="/tools/compress"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix Compress
              </Link>
              {" "}to reduce file size by up to 70% without visible quality loss. Smaller images
              load faster, rank better, and cost less to host.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-5 mb-1">
              Convert to WebP for web delivery
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              If you are publishing photos to a website, consider converting from JPG to WebP
              instead of- or after - HEIC conversion. WebP delivers 25–35% smaller files than
              JPEG at equivalent quality, and browser support is now above 97% globally. You can
              use{" "}
              <Link
                href="/tools/webp"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                SammaPix WebP Converter
              </Link>
              {" "}to convert your JPGs to WebP in a second step, or read the{" "}
              <Link
                href="/blog/complete-guide-webp-format"
                className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#525252] hover:decoration-gray-600 dark:hover:decoration-[#A3A3A3] transition-colors"
              >
                Complete Guide to WebP
              </Link>
              {" "}to understand when it is the right choice.
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mt-5 mb-1">
              Remove location and privacy metadata
            </p>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
              iPhone photos embed GPS coordinates, device model, and capture timestamp in their
              EXIF metadata. When you convert HEIC to JPG, this metadata typically transfers to
              the output file. Before sharing photos publicly- on a website, social media, or
              with people you do not know- consider stripping the EXIF data. This is a
              meaningful privacy step that prevents recipients from knowing exactly where a
              photo was taken.
            </p>

            {/* FAQ Section */}
            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-[#E5E5E5] mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "What is a HEIC file?",
                    a: "HEIC (High Efficiency Image Container) is Apple's default photo format for iPhones running iOS 11 and later. It uses HEVC compression to store photos at roughly half the file size of JPEG while maintaining comparable visual quality. The format also supports advanced features like 16-bit color depth, HDR data, and multiple images in a single file.",
                  },
                  {
                    q: "Why can't I open HEIC files on my PC?",
                    a: "Windows does not natively support HEIC without an optional codec installed from the Microsoft Store. Most non-Apple software- including older versions of Photoshop, web browsers, and most social platforms- requires JPG. Converting HEIC to JPG solves the compatibility issue immediately without changing how photos look.",
                  },
                  {
                    q: "Does converting HEIC to JPG reduce quality?",
                    a: "Converting HEIC to JPG at a high quality setting (80–90%) produces output that is visually indistinguishable from the original on any standard display. You will lose the advanced HEIC features (16-bit color, HDR data) but the visual difference is negligible for sharing, social media, and web use.",
                  },
                  {
                    q: "How do I stop my iPhone from taking HEIC photos?",
                    a: "Go to Settings > Camera > Formats and select 'Most Compatible'. Your iPhone will then save photos as JPG instead of HEIC. Note that this uses roughly twice the storage space per photo since JPEG files are larger than equivalent HEIC files.",
                  },
                  {
                    q: "Is there a free way to convert HEIC to JPG without software?",
                    a: "Yes. SammaPix HEIC Converter runs entirely in your browser- no downloads, no account, no upload to any server. Drop your HEIC files and download JPGs instantly. It supports batch conversion and processes files locally on your device.",
                  },
                  {
                    q: "Can I convert HEIC to JPG on Windows without downloading anything?",
                    a: "Yes. A browser-based converter like SammaPix works on Windows without any installation. Open the tool in Chrome, Edge, or Firefox, drop your HEIC files, and download the JPGs. No codec, no software, no Microsoft Store download required.",
                  },
                ].map(({ q, a }) => (
                  <div key={q}>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-[#E5E5E5] mb-1.5">{q}</h3>
                    <p className="text-sm text-gray-500 dark:text-[#737373] leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Share section */}
          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-[#2A2A2A]">
            <p className="text-sm font-medium text-gray-700 dark:text-[#E5E5E5] mb-3">
              Share this article
            </p>
            <div className="flex items-center gap-3">
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] rounded-md text-sm text-gray-600 dark:text-[#A3A3A3] hover:bg-gray-50 dark:hover:bg-[#252525] hover:text-gray-900 dark:hover:text-[#E5E5E5] transition-colors"
              >
                <svg role="img" viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-label="Share on X (Twitter)">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
                Share on X
              </a>
              <a
                href={linkedinShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-[#2A2A2A] rounded-md text-sm text-gray-600 dark:text-[#A3A3A3] hover:bg-gray-50 dark:hover:bg-[#252525] hover:text-gray-900 dark:hover:text-[#E5E5E5] transition-colors"
              >
                <svg role="img" viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-label="Share on LinkedIn">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Share on LinkedIn
              </a>
            </div>
          </div>

          {/* End CTA */}
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
                Convert HEIC to JPG free- right now
              </h3>
              <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
                Drop your iPhone HEIC photos into SammaPix and get JPGs instantly.
                Batch conversion, ZIP download, no upload, no account. Files never leave your browser.
              </p>
              <Link
                href="/tools/heic"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open HEIC Converter
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          {/* Related articles */}
          <div className="mt-10 pt-8 border-t border-gray-100 dark:border-[#2A2A2A]">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-[#E5E5E5] mb-4">
              Related articles
            </h3>
            <div className="space-y-3">
              {[
                {
                  href: "/blog/complete-guide-webp-format",
                  tag: "Formats",
                  tagColor: "text-blue-700 dark:text-blue-400",
                  title: "The Complete Guide to WebP: Why Every Photographer Should Use It",
                },
                {
                  href: "/blog/compress-images-without-losing-quality",
                  tag: "Optimization",
                  tagColor: "text-green-700 dark:text-green-500",
                  title: "Compress Images Without Losing Quality (2026)",
                },
                {
                  href: "/blog/remove-exif-protect-privacy",
                  tag: "Privacy",
                  tagColor: "text-orange-700 dark:text-orange-400",
                  title: "How to Remove EXIF Data from Photos to Protect Your Privacy",
                },
              ].map(({ href, tag, tagColor, title }) => (
                <Link key={href} href={href} className="flex items-start gap-3 group">
                  <span className={`text-xs font-medium uppercase tracking-wide shrink-0 mt-0.5 ${tagColor}`}>
                    {tag}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-[#A3A3A3] group-hover:text-gray-900 dark:group-hover:text-[#E5E5E5] transition-colors">
                    {title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </article>

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </div>
  );
}
