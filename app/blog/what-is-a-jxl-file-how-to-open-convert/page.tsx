import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "What Is a JXL File? How to Open & Convert JXL to JPG (Free)",
  description:
    "A .jxl file is JPEG XL, a modern image format. Here is why it will not open in Chrome or Windows, how to convert JXL to JPG, PNG or WebP free in your browser (no upload), and how JXL compares to JPEG, WebP and AVIF.",
  alternates: { canonical: `${APP_URL}/blog/what-is-a-jxl-file-how-to-open-convert` },
  keywords: [
    "what is a jxl file",
    "how to open jxl file",
    "jxl to jpg",
    "jxl converter",
    "convert jxl to jpg",
    "jpeg xl",
    "jxl vs webp",
    "jxl browser support",
  ],
  openGraph: {
    title: "What Is a JXL File? How to Open & Convert JXL to JPG (Free)",
    description:
      "Why .jxl will not open in Chrome, how to convert JXL to JPG/PNG/WebP free in your browser, and JXL vs JPEG vs WebP vs AVIF. Updated 2026.",
    url: `${APP_URL}/blog/what-is-a-jxl-file-how-to-open-convert`,
    type: "article",
    publishedTime: "2026-06-30",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is a JXL File? How to Open & Convert It (Free)",
    description: "Why .jxl will not open in Chrome and how to convert it to JPG in your browser. Updated 2026.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-06-30";
const POST_DATE_FORMATTED = "June 30, 2026";
const POST_URL = `${APP_URL}/blog/what-is-a-jxl-file-how-to-open-convert`;
const POST_TITLE = "What Is a JXL File? How to Open & Convert It";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A .jxl file is JPEG XL, a modern royalty-free image format. This guide explains why it will not open in Chrome or Windows, how to convert JXL to JPG, PNG or WebP in your browser with no upload, and how JXL compares to JPEG, WebP and AVIF.",
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
  keywords: ["what is a jxl file", "jxl to jpg", "jxl converter", "jpeg xl"],
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
      name: "What is a JXL file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A .jxl file is an image saved in the JPEG XL format, a modern royalty-free format created by the JPEG committee. It offers smaller files than JPEG at the same quality, true lossless mode, HDR, transparency, and animation. It is the successor JPEG was meant to have, but patchy browser support means many people receive a .jxl they cannot open.",
      },
    },
    {
      "@type": "Question",
      name: "Why won't my JXL file open?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because most software has not adopted JPEG XL yet. As of 2026, Safari on macOS and iOS opens .jxl natively, but Google Chrome removed its experimental JXL support, and Windows Photos does not handle it without an add-on. So if you are on Chrome or Windows, double-clicking a .jxl does nothing. The simplest fix is to convert it to JPG or PNG.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert a JXL file to JPG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the SammaPix JXL Converter at sammapix.com/tools/jxl. Drop your .jxl file, choose JPG (or PNG or WebP), and download the result. It runs entirely in your browser, so the image is never uploaded to a server.",
      },
    },
    {
      "@type": "Question",
      name: "Is JXL better than WebP or AVIF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Technically JPEG XL is excellent: it matches or beats AVIF on many photos, has a true lossless mode, supports progressive decoding, and can losslessly recompress existing JPEGs to roughly 20 percent smaller. Its weakness is adoption. WebP and AVIF are supported in every major browser, while JXL is not, so for the web today WebP or AVIF are the safer choice.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert JPG or PNG to JXL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The SammaPix JXL Converter works both ways: it converts .jxl to JPG, PNG and WebP, and also converts JPG, PNG and WebP into .jxl. This is useful for archiving photos at a smaller size if your own workflow supports JPEG XL.",
      },
    },
    {
      "@type": "Question",
      name: "Does converting JXL to JPG lose quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Converting to JPG re-encodes the image with lossy compression, so there is a small quality change, usually invisible at high quality settings. If you want to preserve the image perfectly, convert to PNG instead, which is lossless. For sharing and compatibility, JPG is almost always fine.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to convert a JXL file to JPG",
  description: "Open and convert a .jxl file to JPG in your browser without installing software.",
  totalTime: "PT1M",
  step: [
    { "@type": "HowToStep", position: 1, name: "Open the JXL converter", text: "Go to sammapix.com/tools/jxl in any browser." },
    { "@type": "HowToStep", position: 2, name: "Drop your .jxl file", text: "Drag the file onto the page or click to select it." },
    { "@type": "HowToStep", position: 3, name: "Choose JPG and download", text: "Pick JPG, PNG or WebP as the output and download the converted image." },
  ],
};

export default function WhatIsJxlPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="what-is-a-jxl-file-how-to-open-convert"
        description="You received a .jxl file and it will not open. This guide explains what JPEG XL is, why Chrome and Windows cannot open it, how to convert it to JPG, PNG or WebP in your browser with no upload, and whether JXL is worth using over JPEG, WebP or AVIF."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Performance"]}
        readingTime={10}
        headings={[
          { id: "what-is-jxl", title: "What a JXL file actually is" },
          { id: "why-wont-open", title: "Why your .jxl file will not open" },
          { id: "convert-to-jpg", title: "How to convert JXL to JPG (no upload)" },
          { id: "other-conversions", title: "JXL to PNG, WebP, and back to JXL" },
          { id: "jxl-vs", title: "JXL vs JPEG vs WebP vs AVIF" },
          { id: "browser-support", title: "JXL browser support in 2026" },
          { id: "should-you-use", title: "Should you use JXL?" },
          { id: "quality", title: "Does converting lose quality?" },
          { id: "errors", title: "Common problems and fixes" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A .jxl file is JPEG XL, a modern royalty-free image format that beats JPEG on size and quality.",
          "It will not open in Chrome or Windows Photos. Safari on Mac and iPhone opens it natively.",
          "The quickest fix is to convert it to JPG or PNG. The SammaPix JXL Converter does it in your browser with no upload.",
          "JXL is technically excellent but poorly supported. For the web, WebP or AVIF are the safer choice today.",
          "Convert to PNG to keep the image lossless, or to JPG for the smallest, most compatible file.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"
              alt="Laptop showing image files, representing modern image formats"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              JPEG XL (.jxl) is a powerful format, but adoption is the catch
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Open your JXL file now, convert it to JPG
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              The SammaPix JXL Converter opens .jxl files and converts them to JPG, PNG or WebP right in your
              browser. Nothing is installed, nothing is uploaded. It also converts JPG, PNG and WebP into JXL.
            </p>
            <Link
              href="/tools/jxl"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Convert JXL to JPG, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <h2 id="what-is-jxl" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What a JXL file actually is
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A file ending in .jxl is an image saved in the <strong className="text-gray-800 dark:text-[#E5E5E5]">JPEG XL</strong> format. It was created by the same standards group behind the original JPEG, the JPEG committee, and finalised in 2021 as a royalty-free, open format. The goal was ambitious: a single modern format that could replace JPEG, PNG, and GIF at once, with dramatically better compression.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          On paper it succeeds. JPEG XL produces smaller files than JPEG at the same visual quality, has a true mathematically lossless mode like PNG, supports transparency, high dynamic range (HDR), wide colour, animation, and progressive decoding (the image sharpens as it loads). It can even take an existing JPEG and recompress it losslessly to roughly 20 percent smaller, with the ability to restore the exact original. By almost every technical measure, it is the format JPEG always wanted to be.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          So why have most people never heard of it? Because the thing that makes a format useful is not how good it is, but how many programs can open it. And that is exactly where JPEG XL has struggled.
        </p>

        <h2 id="why-wont-open" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why your .jxl file will not open
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you double-click a .jxl file and nothing happens, or you get an error, the file is not broken. Your software simply does not support JPEG XL. The support picture as of 2026 is frustratingly uneven:
        </p>
        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Safari (Mac and iPhone):</strong> opens .jxl natively since Safari 17 / macOS Sonoma in 2023. If you are on an Apple device, .jxl often just works.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Google Chrome:</strong> had experimental JXL support behind a flag, then removed it. Chrome and Chrome-based browsers (Edge, Brave, Opera) do not display .jxl. This is the single biggest reason people get stuck.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Firefox:</strong> support exists only behind a flag in Nightly builds, off by default.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Windows:</strong> the built-in Photos app does not open .jxl without installing a separate codec add-on.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          So if someone on a Mac exported a photo as JPEG XL and sent it to you on Windows or in Chrome, you are stuck. You do not need to install codecs or learn the command line. The fastest path is to convert the .jxl to a universal format like JPG.
        </p>

        <h2 id="convert-to-jpg" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to convert JXL to JPG (no upload)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The{" "}
          <Link href="/tools/jxl" className="text-[#6366F1] hover:underline">SammaPix JXL Converter</Link>{" "}
          decodes JPEG XL directly in your browser using WebAssembly. There is no server, so your image is never uploaded. This matters for private photos and client work, and it also means it works the same on any device, including the Windows and Chrome setups that cannot open .jxl natively.
        </p>
        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Open sammapix.com/tools/jxl</strong> in any browser.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your .jxl file</strong> onto the page, or click to select it.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Choose JPG</strong> as the output format (or PNG, or WebP).</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Download</strong> the converted image. It is decoded and re-encoded locally and downloads instantly.</li>
        </ol>

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Convert your .jxl in a few seconds</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">Drop the file, pick JPG, PNG or WebP, download. 100% in your browser, nothing uploaded.</p>
          <Link href="/tools/jxl" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Open the JXL Converter, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <h2 id="other-conversions" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          JXL to PNG, WebP, and back to JXL
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          JPG is the most compatible choice, but it is not always the right one. Pick the output based on what you need:
        </p>
        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">JXL to JPG:</strong> smallest, opens everywhere. Best for sharing photos. Slight lossy re-encode.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">JXL to PNG:</strong> lossless, keeps transparency. Best when the image has an alpha channel or you cannot afford any quality change.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">JXL to WebP:</strong> a good middle ground, smaller than PNG, supported in all browsers, keeps transparency.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The converter also works in reverse, turning JPG, PNG or WebP into .jxl, which can be useful if your own archive workflow supports JPEG XL and you want the smaller lossless storage. If your goal is simply a lighter image for the web, our{" "}
          <Link href="/tools/webp" className="text-[#6366F1] hover:underline">WebP converter</Link> and{" "}
          <Link href="/tools/compress" className="text-[#6366F1] hover:underline">Image Compressor</Link> are the more practical tools today.
        </p>

        <h2 id="jxl-vs" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          JXL vs JPEG vs WebP vs AVIF
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Compression</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Lossless mode</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser support</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">JPEG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Baseline (oldest)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Universal</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">WebP</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">~25-30% smaller than JPEG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">All major browsers</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">AVIF</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Excellent, best at low sizes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">All major browsers</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">JPEG XL</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Excellent, great at high quality</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes (true lossless)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Safari only</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The pattern is clear. On pure technical merit, JPEG XL is at the front of the pack, especially for high-quality photos and lossless archiving. But WebP and AVIF won the adoption race because every browser supports them. For anything that needs to display on the open web, that makes WebP or AVIF the pragmatic pick, and JXL a format you mostly encounter as files to convert.
        </p>

        <h2 id="browser-support" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          JXL browser support in 2026
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The short story of JPEG XL is a story about politics, not technology. Chrome added experimental support, then removed it in 2023, citing a lack of ecosystem interest, a decision that frustrated many image engineers who considered JXL the strongest option available. Apple then went the other way and shipped native JXL support in Safari in 2023. Firefox keeps it behind a Nightly flag. The result is a format that is genuinely excellent but cannot be relied on to display in a browser, which is why most JXL files you meet need converting.
        </p>

        <h2 id="should-you-use" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Should you use JXL?
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a website or anything you share publicly: no. Use WebP or AVIF, which look just as good and display everywhere. For personal archiving where you control the software, JXL can be a smart choice, because its lossless JPEG recompression shrinks an existing photo library by around 20 percent with no quality loss and the option to restore the originals byte-for-byte. Just remember that you, and only you, may be able to open those files later, so keep the originals or a conversion path handy.
        </p>

        <h2 id="quality" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Does converting lose quality?
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          It depends on the target. Converting JXL to <strong className="text-gray-800 dark:text-[#E5E5E5]">PNG</strong> is lossless: the result is pixel-for-pixel identical, just in a more compatible (and larger) file. Converting to <strong className="text-gray-800 dark:text-[#E5E5E5]">JPG</strong> or WebP re-encodes with lossy compression, so there is a tiny quality change, almost always invisible at high quality. For sharing a photo so someone can finally see it, JPG is the right call. If the image is a logo, screenshot, or anything with sharp edges and transparency, choose PNG.
        </p>

        <h2 id="errors" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Common problems and fixes
        </h2>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">Double-clicking the .jxl does nothing</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">Your OS or browser does not support JPEG XL. Convert it to JPG or PNG with the browser tool above instead of installing codecs.</p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">It opens on my iPhone but not my PC</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">That is expected. Apple supports JXL, Windows and Chrome do not. Convert the file once to JPG and it will open on every device.</p>
        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">The converted image looks soft</h3>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">If you converted to JPG at a low quality, try PNG for a lossless result, or re-export the JPG at higher quality.</p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3 mt-6">
          Once your image is in JPG or PNG, you can do anything with it: shrink it with the{" "}
          <Link href="/tools/compress" className="text-[#6366F1] hover:underline">Image Compressor</Link>, convert it to{" "}
          <Link href="/tools/webp" className="text-[#6366F1] hover:underline">WebP</Link> for the web, or strip location data with the{" "}
          <Link href="/tools/exif" className="text-[#6366F1] hover:underline">EXIF Viewer</Link>.
        </p>

        <section id="faq">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">FAQ</h2>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </>
  );
}
