import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Open an APK File Without Installing It [2026]",
  description:
    "View APK files in your browser. Browse app data. No upload. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/open-apk-file-online`,
  },
  keywords: [
    "open apk file",
    "view apk contents",
    "unzip apk",
    "what is inside an apk",
    "apk file viewer",
    "open apk without installing",
    "apk to zip",
    "apk contents browser",
    "open apk online",
    "apk file inspector",
  ],
  openGraph: {
    title: "How to Open an APK File Without Installing It [2026]",
    description:
      "An APK is a ZIP — open it in your browser to view AndroidManifest.xml, res/, assets/, and more. No install, no upload. Honest about what you can and cannot read. Free.",
    url: `${APP_URL}/blog/open-apk-file-online`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Open an APK File Without Installing It [2026]",
    description:
      "Open any APK in your browser. It is a ZIP — browse AndroidManifest.xml, res/, assets/ without installing anything. No upload. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/open-apk-file-online`;
const POST_TITLE = "How to Open an APK File Without Installing It [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "An APK (Android Package Kit) file is a renamed ZIP archive. You can open it in any browser, inspect its contents — AndroidManifest.xml, classes.dex, res/, assets/, lib/, META-INF/ — and download any file without installing the app on Android. This guide explains how APK is just a ZIP, what you can read directly and what remains binary, and how to open an APK file online for free with no file upload. Honest limitation: the manifest and XML layouts inside an APK are in binary AXML format; classes.dex is compiled bytecode. This tool extracts, it does not decompile.",
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
    "open apk file",
    "view apk contents",
    "unzip apk",
    "what is inside an apk",
    "apk to zip",
    "open apk without installing",
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
  name: "How to Open an APK File Without Installing It",
  description:
    "Open an APK file in your browser to browse its contents — AndroidManifest.xml, resources, assets — without installing the app on Android. Uses JSZip, no file upload, no server.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix APK Extractor (browser-based, free)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the APK Extractor tool",
      text: "Go to sammapix.com/tools/apk-extractor in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your APK file onto the tool",
      text: "Drag your .apk file onto the dropzone or click to browse for it. The file is read locally by your browser via the File API. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Browse the file list",
      text: "JSZip reads the archive entirely in browser memory and displays every file inside — AndroidManifest.xml, classes.dex, res/, assets/, lib/, META-INF/ — with names and sizes.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download the files you need",
      text: "Click any file to download it individually, or use Download All as ZIP to grab everything in a single archive. No upload occurs at any point.",
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
      name: "Is an APK file really just a ZIP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, completely. An APK (Android Package Kit) is a standard ZIP archive with an .apk file extension. If you rename any APK to .zip and open it with Windows Explorer, macOS Archive Utility, or any ZIP reader, it opens without error — because the internal format is identical. Google chose ZIP as the container format because it is open, universally supported, and well-tested. The .apk extension is just a naming convention that tells Android's package installer how to handle the file.",
      },
    },
    {
      "@type": "Question",
      name: "Can I read AndroidManifest.xml from an APK as plain text?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not directly from an extracted APK. Inside the APK, AndroidManifest.xml is stored in a compiled binary format called AXML (Android Binary XML). This is not human-readable plain text — it is an optimised binary encoding that Android's runtime parses efficiently. If you extract the file and open it in a text editor, you will see mostly binary data. To read it as plain-text XML, you need a tool like apktool (apktool d myapp.apk) or jadx, which decode the AXML format back to readable XML. The SammaPix APK Extractor gives you the raw binary file — readable decoding requires a dedicated desktop decoder.",
      },
    },
    {
      "@type": "Question",
      name: "How can I view an APK's permissions without an Android device?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are two approaches. The faster browser-based approach: open the APK with the SammaPix APK Extractor, download AndroidManifest.xml, and open it in a hex editor or AXML decoder — you can usually spot permission strings like android.permission.CAMERA or android.permission.ACCESS_FINE_LOCATION in the binary, even without full decoding. The more reliable approach: use apktool on your desktop (apktool d myapp.apk) which decodes the binary manifest to plain-text XML and lists every declared permission clearly in the decoded AndroidManifest.xml output.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between res/ and assets/ in an APK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both folders ship files with the app, but they serve different purposes. res/ contains compiled resources — images, layouts, drawables, and strings that are referenced by resource IDs in the code (like R.drawable.icon or R.string.app_name). The XML files in res/ are compiled to binary AXML inside the APK. PNG and WebP images in res/drawable/ remain as image files and are directly downloadable. assets/ contains raw files that the app accesses by file path at runtime — fonts, local HTML/JS for WebViews, SQLite database templates, JSON configs, game data. Files in assets/ are stored exactly as-is and are immediately readable after extraction. If you want fonts or bundled web content, look in assets/.",
      },
    },
    {
      "@type": "Question",
      name: "Is my APK file uploaded when I use the browser tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The file stays entirely in your browser's memory. JSZip processes the APK archive using the browser's File API — the raw bytes go from your filesystem into JavaScript memory without touching the network. You can verify this yourself: open DevTools (F12), go to the Network tab, drop your APK into the tool, and watch the panel. You will see no outgoing POST or PUT requests carrying file data. The only network activity is the initial page load.",
      },
    },
    {
      "@type": "Question",
      name: "What are split APKs and how do they differ from a regular APK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A split APK is part of a larger app delivery system called Android App Bundles (AAB). Instead of one monolithic APK containing resources for all device configurations, Android's Dynamic Delivery generates a base APK plus optional split APKs — separate packages for specific screen densities (hdpi, xhdpi, xxhdpi), CPU architectures (arm64, x86), and language packs. The base.apk contains the core app logic. Split APKs contain only the configuration-specific resources. When you download from the Play Store, you typically receive only the splits relevant to your device. If you download an XAPK from APKPure, you get all splits bundled into one XAPK archive.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool affiliated with Google or Android?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This is an independent browser tool that reads ZIP archives, including files with the .apk and .xapk extensions. Android is a trademark of Google LLC. The APK format is the file format specification published by Google for the Android operating system. This tool is not affiliated with, endorsed by, or connected to Google or Android in any way. It is built and maintained by Luca Sammarco independently of Google.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function OpenApkFileOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="open-apk-file-online"
        description="Most people think opening an APK requires an Android phone or a special app. It does not. An APK is a ZIP file with a different extension — and you can unzip it in your browser, inspect every file inside, and download what you need, all without touching an Android device or uploading the file anywhere."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Workflow"]}
        readingTime={9}
        headings={[
          { id: "apk-is-a-zip", title: "An APK is just a ZIP: the key insight that unlocks everything" },
          { id: "what-you-can-read", title: "What you can read directly and what requires a decompiler" },
          { id: "file-structure-guide", title: "A practical guide to every folder and file inside an APK" },
          { id: "step-by-step", title: "How to open an APK file online, step by step" },
          { id: "privacy-and-security", title: "Privacy and security: why opening an APK without installing matters" },
          { id: "comparison-table", title: "All the ways to open an APK: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-archive-tools", title: "Other archive tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "An APK is a standard ZIP archive with a renamed extension. Rename it to .zip and any OS file manager opens it. Any ZIP reader can open an APK.",
          "The SammaPix APK Extractor opens APK and XAPK files entirely in the browser using JSZip. Your file never leaves your device.",
          "Direct read: PNG/WebP images in res/, raw files in assets/ (fonts, HTML, JSON), signing metadata in META-INF/.",
          "Requires a desktop decoder: AndroidManifest.xml (binary AXML), XML layouts in res/layout/ (binary AXML), string resources.",
          "Requires a decompiler (jadx, apktool): classes.dex (compiled Dalvik bytecode). This browser tool does not decompile.",
          "This tool is independent from Google and Android. Not affiliated in any way.",
          "Verify with DevTools: open the Network panel and watch zero outgoing requests while the tool processes your file.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A developer inspecting files and code on a computer screen, representing the process of opening and viewing the contents of an Android APK file without installing the app."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              An APK is a ZIP in disguise — open it in your browser and browse AndroidManifest.xml, icons, and assets without installing a thing.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Open your APK file right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix APK Extractor reads APK and XAPK files entirely in your browser via JSZip. Browse AndroidManifest.xml, res/, assets/, and everything else.
              No Android required. No upload. Free, no signup.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/apk-extractor"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open APK Extractor, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/unrar"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Extract RAR <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/minecraft-extractor"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Open Minecraft Packs <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: APK is a ZIP ───────────────────────────────────────── */}

        <h2 id="apk-is-a-zip" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          An APK is just a ZIP: the key insight that unlocks everything
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          APK stands for Android Package Kit. Android&apos;s package installer reads APK files when you install an app on your phone. But what the installer actually receives is a ZIP archive — the .apk extension is a naming convention, not a fundamentally different file format.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You can verify this yourself right now: take any .apk file, rename it to .zip, and open it with your operating system&apos;s built-in ZIP handler. On Windows, double-click to open in Explorer. On macOS, double-click to extract with Archive Utility. You will see the full folder structure inside — classes.dex, res/, assets/, AndroidManifest.xml, META-INF/ — exactly as if you had used a dedicated tool.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is not a hack or an undocumented feature. Google publicly documented the APK format as a ZIP archive. The choice was deliberate: ZIP is an open, patent-free standard with tooling in every programming language and operating system. Building Android&apos;s package format on top of ZIP meant developers could use existing ZIP tools to inspect, build, and debug APKs without proprietary utilities.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The same principle applies in the browser: JSZip — which reads ZIP archives in JavaScript — can open an APK file just as well as any .zip. That is exactly what the{" "}
          <Link href="/tools/apk-extractor" className="text-[#6366F1] hover:underline">SammaPix APK Extractor</Link>{" "}
          does. No special APK-parsing code required. The file never needs to leave your device.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The ZIP magic bytes: how tools identify the format
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          File format identification does not rely on extensions alone. ZIP archives always start with the bytes <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">50 4B 03 04</code> (hex), which spell &quot;PK&quot; — the initials of Phil Katz, who invented the ZIP format. If you open an APK in a hex editor, you will see exactly those bytes at offset 0. This is why 7-Zip, WinRAR, and other archive tools can open APKs without any APK-specific support: they detect the ZIP signature and proceed normally. A file&apos;s extension is for the OS; a file&apos;s magic bytes are the real format fingerprint.
        </p>

        {/* ── Section 2: What you can read ─────────────────────────────────── */}

        <h2 id="what-you-can-read" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What you can read directly and what requires a decompiler
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Not every file inside an APK is immediately human-readable after extraction. Google chose to compile many resource files to binary formats at build time for performance. Here is an honest breakdown:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">File / folder</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Readable after extraction?</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">res/drawable/*.png, *.webp</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes, directly.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Image files are stored raw. Open with any image viewer after download.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">assets/ (fonts, HTML, JSON, SQLite)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes, directly.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Raw files, never compiled. Fonts, HTML/JS/CSS, JSON config, SQLite databases open as-is.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">META-INF/MANIFEST.MF, CERT.SF</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes, plain text.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Lists all files with their SHA digests. Readable in any text editor.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">AndroidManifest.xml</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Binary AXML — not plain XML.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Requires apktool or an AXML decoder. Permission strings may be partially visible in hex.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">res/layout/*.xml</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Binary AXML — not plain XML.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Compiled like the manifest. Requires apktool to decode to plain XML.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">resources.arsc</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Binary compiled resource table.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Maps resource IDs to values. Readable with aapt2 or apktool decode.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">classes.dex, classes2.dex</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Binary bytecode — not Java source.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Requires jadx or BytecodeViewer to decompile to approximate Java source code.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">lib/*.so</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Binary ELF native library.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Requires a disassembler (Ghidra, IDA Pro) to analyse native code.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The practical takeaway: if you need images, fonts, bundled HTML/JS, SQLite databases, or signing metadata — the browser extractor is all you need. If you need to read the app logic from source or decode the manifest to human-readable XML — add apktool or jadx to your workflow.
        </p>

        {/* ── Section 3: File structure guide ──────────────────────────────── */}

        <h2 id="file-structure-guide" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          A practical guide to every folder and file inside an APK
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you open an APK with the browser tool, the file list can look overwhelming. Here is what each entry is and why it matters:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          AndroidManifest.xml — the entry point
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the first file to look at when inspecting an APK. Even in binary form, it declares the app&apos;s package name, version, and permissions. A permission like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">android.permission.ACCESS_FINE_LOCATION</code> or <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">android.permission.READ_CONTACTS</code> will often be partially visible as a string in the binary, even without full decoding. For a fully structured read, use apktool to decode the AXML to plain XML.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          classes.dex — the compiled app logic
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The .dex file is the heart of the app. All the Java and Kotlin code the developer wrote was compiled, optimised, and translated into Dalvik bytecode stored here. Larger apps have multiple .dex files (classes.dex, classes2.dex, classes3.dex...) due to the 64k method limit per dex file, a constraint called multidex. This file is binary. You cannot read it directly. Decompiling it with jadx converts it to approximate Java source code — useful for security research or understanding an app&apos;s behaviour, but that is a separate workflow.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          res/ — compiled app resources
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">res/</code> folder contains resources generated by the Android build tools. Image files (PNG, WebP, JPEG) inside <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">res/drawable/</code> and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">res/mipmap/</code> are stored as raw images and open in any viewer. XML files — layouts in <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">res/layout/</code>, animators, drawables defined in XML — are compiled to binary AXML and require a decoder to read as text. The <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">resources.arsc</code> file at the APK root is the compiled resource table mapping resource IDs to their actual values.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          assets/ — raw bundled content
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the most accessible folder for inspection. Files in <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">assets/</code> are never compiled — they are copied verbatim from the developer&apos;s project into the APK. Common finds: TTF and OTF font files, HTML/CSS/JS bundles for WebView-based screens, JSON configuration files (API endpoints, feature flags), SQLite database schema files (.db, .sqlite), certificate files (.pem, .crt), and game data (maps, levels, audio). If you are a developer looking to understand how a competitor structured their app&apos;s bundled web content, this is where to look.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          lib/ — native CPU architecture libraries
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Apps using the Android NDK (C/C++ native code) ship compiled .so (shared object) files in <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">lib/</code>, organised by architecture. <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">lib/arm64-v8a/</code> contains 64-bit ARM libraries (modern Android phones). <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">lib/x86_64/</code> contains 64-bit x86 libraries (often used in emulators). These are ELF binaries. The presence of multiple architectures means the APK is universally compatible. A game-heavy APK may have large .so files here for its native rendering engine.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          META-INF/ — signing and integrity metadata
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">META-INF/</code> folder is what makes an APK trustworthy. It contains <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">MANIFEST.MF</code> (a list of every file in the APK and its SHA-1 or SHA-256 hash), <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">CERT.SF</code> (the signed version of the manifest), and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">CERT.RSA</code> (the developer&apos;s signing certificate). Android verifies these signatures during installation to confirm the APK has not been tampered with. MANIFEST.MF and CERT.SF are plain text — you can open them in a text editor and read the file list and hash values directly.
        </p>

        {/* ── Tool CTA #1 ──────────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Browse inside your APK right now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            JSZip reads the archive locally. Browse AndroidManifest.xml, res/, assets/, META-INF/. Download individual files or grab everything as a ZIP.
            No upload, no Android required, no signup. Free.
          </p>
          <Link
            href="/tools/apk-extractor"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open APK Extractor, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: Step by step ───────────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to open an APK file online, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under a minute for most APK files:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/apk-extractor</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your .apk or .xapk file onto the dropzone</strong> or click to browse for it. The file is read locally by the File API — nothing leaves your device.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Browse the file list.</strong> JSZip reads the archive and shows you every file inside — folder structure, names, and sizes. Identify the files you need: images in res/mipmap/ for the icon, fonts in assets/, or signing metadata in META-INF/.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download what you need.</strong> Click any file to download it individually. For images and assets, they open directly in your browser or image viewer. For binary files like classes.dex, the raw bytes download — you will need additional tools to process them further.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Or download everything as ZIP.</strong> Use the Download All as ZIP button to get the entire APK contents in a single archive with the original folder structure preserved.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Typical use cases for this workflow: extracting icon images (res/mipmap/ic_launcher.png) for documentation, pulling bundled font files from assets/, checking which split APKs are included in an XAPK, inspecting META-INF/MANIFEST.MF to verify file integrity, or confirming a specific file was included in a release build before distribution.
        </p>

        {/* ── Section 5: Privacy and security ──────────────────────────────── */}

        <h2 id="privacy-and-security" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Privacy and security: why opening an APK without installing matters
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Installing an unknown APK on an Android device carries real risk. Android&apos;s permission system contains the damage once an app is installed — but a malicious app installed from an unknown source can still send data to remote servers, read storage, or exploit vulnerabilities before you notice.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Inspecting an APK before installing it lets you do a preliminary check without any execution risk:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Check the permissions.</strong> Even in binary AXML, permission strings are often partially visible. Look for <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">android.permission.SEND_SMS</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">android.permission.READ_CONTACTS</code>, or <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">android.permission.ACCESS_FINE_LOCATION</code> in a hex viewer or via apktool decode. Permissions that do not match the app&apos;s stated purpose are a red flag.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Inspect assets/ for hardcoded endpoints.</strong> JSON config files or plain-text files in assets/ may contain API base URLs or server addresses. If an app claims to be a simple calculator but its assets/ contains references to a remote API collecting device data, that is worth investigating before installing.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Verify the signing certificate in META-INF/.</strong> CERT.RSA contains the developer&apos;s signing certificate. Tools like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">keytool -printcert -file CERT.RSA</code> display the certificate&apos;s subject, issuer, and validity period. An APK claiming to be from a major company but signed with an unknown certificate is suspicious.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Confirm the package name matches expectations.</strong> The binary AndroidManifest.xml contains the package name (e.g. <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">com.google.android.apps.maps</code>) as a readable string. A fake APK mimicking a legitimate app may use a slightly different package name.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Opening the APK in a browser tool carries zero execution risk: JSZip reads the archive structure and presents you with file names. Nothing in the APK runs. This is a passive inspection, not an installation.
        </p>

        {/* ── Section 6: Comparison table ──────────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          All the ways to open an APK: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective look at every approach to opening an APK and what each is suited for:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Method</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Install required</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Readable manifest</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Decompiles bytecode</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">SammaPix APK Extractor (browser)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Binary only (strings partially visible)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Rename to .zip + OS extractor</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No (extension rename only)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Binary only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">7-Zip or WinRAR (desktop)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Binary only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">apktool (desktop, open source)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes (Java required)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — decodes AXML to plain XML</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No (Smali disassembly only)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">jadx (desktop, open source)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes (Java required)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — decompiles .dex to Java source</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For most people — developers checking their own builds, designers extracting icon assets, or users doing a quick pre-install inspection — the browser-based approach covers everything needed. For security researchers or reverse engineers who need source-level insight, jadx is the tool to reach for after the initial inspection.
        </p>

        {/* ── Section 7: Verify no upload ──────────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not need to trust my word. Here is how to verify this yourself in under two minutes using your browser&apos;s built-in developer tools:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac). On Safari, enable the Develop menu first via Settings → Advanced.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click the Network tab.</strong> Clear any existing requests by clicking the clear button. Enable &quot;Preserve log&quot; to ensure no requests are hidden during processing.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your APK file and wait for the file list to appear.</strong> Watch the Network panel during the entire process.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: zero outgoing file requests.</strong> The only requests you will see are the initial page load assets (JavaScript, CSS). No request carries your APK data to any server. Your file stays entirely in browser memory.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the same verification method privacy researchers use to audit tools claiming to be client-side. If your file was being uploaded, you would see a POST or PUT request in the Network panel carrying its bytes. You will see none.
        </p>

        {/* ── Tool CTA #2 ──────────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your APK file stays on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. JSZip reads the archive locally. Browse files, download individually or as ZIP.
            Verify with DevTools. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/apk-extractor"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open APK Extractor, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/extract-apk-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Extract APK Online Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: Related archive tools ─────────────────────────────── */}

        <h2 id="related-archive-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other archive tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based archive tools, all with no upload and no server processing:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/apk-extractor" className="text-[#6366F1] hover:underline">APK Extractor</Link></strong>: open .apk and .xapk files in your browser. JSZip reads the ZIP-based archive locally. Browse, inspect, and download contents. The tool covered in this article.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/unrar" className="text-[#6366F1] hover:underline">Unrar</Link></strong>: extract the contents of a RAR archive directly in the browser. Preview file list, download individual files or grab everything as a ZIP. Powered by libarchive.wasm.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">Open 7Z</Link></strong>: extract 7-Zip archives in your browser. Same libarchive.wasm engine, no upload. Useful when you receive a .7z file and do not have 7-Zip installed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/rar-to-zip" className="text-[#6366F1] hover:underline">RAR to ZIP</Link></strong>: convert a RAR archive to a universally compatible ZIP, entirely in your browser. libarchive.wasm extracts, JSZip repackages.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/minecraft-extractor" className="text-[#6366F1] hover:underline">Minecraft Extractor</Link></strong>: open .mcpack, .mcworld, and .mctemplate files — all ZIP-based, all handled in browser memory. Like APK files, Minecraft packs are just ZIPs with custom extensions.
          </li>
        </ul>

        {/* ── Tool CTA #3 ──────────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your archive needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Open APK, extract RAR, open 7Z, convert RAR to ZIP, open Minecraft packs — without uploading files anywhere.
            All tools run locally in your browser. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/apk-extractor"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              APK Extractor <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/unrar"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Unrar <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/open-7z"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Open 7Z <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/rar-to-zip"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              RAR to ZIP <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/minecraft-extractor"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Minecraft Extractor <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── FAQ ────────────────────────────────────────────────────────────── */}

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
