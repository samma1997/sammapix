import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Extract an ISO File Online Free (No Upload) [2026]",
  description:
    "Extract files from any ISO disc image in your browser — no upload, no mounting, no burning. ISO9660 supported. Browse files, download individually or as ZIP. Free, no signup.",
  alternates: {
    canonical: `${APP_URL}/blog/extract-iso-online`,
  },
  keywords: [
    "extract iso",
    "extract iso online",
    "extract iso file",
    "iso extractor",
    "open iso file online",
    "iso to zip",
    "extract iso free",
    "iso file extractor",
    "iso extractor online free",
    "extract iso without mounting",
  ],
  openGraph: {
    title: "Extract an ISO File Online Free (No Upload) [2026]",
    description:
      "Extract files from an ISO disc image entirely in your browser. No upload, no mounting, no burning. ISO9660 supported. Free.",
    url: `${APP_URL}/blog/extract-iso-online`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Extract an ISO File Online Free (No Upload) [2026]",
    description:
      "Extract any ISO disc image in your browser. No upload, no mounting, no burning software. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/extract-iso-online`;
const POST_TITLE = "Extract an ISO File Online Free (No Upload) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "ISO disc images are a common way to distribute software, operating systems, and game installers — but opening one without mounting or burning it requires either a virtual drive tool or a dedicated extractor. This guide explains how to extract files from an ISO entirely in your browser using a client-side ISO9660 parser, with no file upload, no software install, and no need to mount or burn the disc image.",
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
    "extract iso",
    "extract iso online",
    "iso extractor",
    "open iso file online",
    "iso to zip",
    "extract iso free",
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
  name: "How to Extract an ISO File Online Without Mounting or Uploading",
  description:
    "Extract files from an ISO disc image in your browser — no upload, no virtual drive, no burning software. Supports ISO9660. Download individual files or all contents as a ZIP.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix ISO Extractor (browser-based, free)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the ISO Extractor tool",
      text: "Go to sammapix.com/tools/iso-extractor in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your ISO file onto the tool",
      text: "Drag your .iso file onto the dropzone or click to browse for it. The file is read locally by your browser via the File API. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Browse the file tree",
      text: "The tool parses the ISO9660 filesystem and displays the complete file and folder tree from the disc image. You can see every file inside the ISO without extracting anything yet.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download individual files or export as ZIP",
      text: "Click any file to download it directly from the ISO, or click Export as ZIP to download all contents as a single ZIP archive. Your data stays on your device throughout.",
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
      name: "Can I extract an ISO file without mounting it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The SammaPix ISO Extractor reads the ISO9660 filesystem directly in your browser without mounting the disc image as a virtual drive. You can browse the full file tree and download individual files or all contents as a ZIP — no virtual drive software like Daemon Tools, WinCDEmu, or macOS Disk Utility required.",
      },
    },
    {
      "@type": "Question",
      name: "Is my ISO file uploaded to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The ISO file is read entirely in your browser using the File API. A client-side ISO9660 parser processes the disc image locally in browser memory. No data is sent to any server at any point. You can verify this by opening your browser's Network panel (F12) and watching for outgoing requests while the tool processes your file — you will see none carrying your file data.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between ISO9660 and UDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ISO9660 is the original CD-ROM filesystem standard from 1988. It is widely supported and used for software installers, Linux distributions, and many game discs. UDF (Universal Disc Format) is a newer standard used primarily for DVDs, Blu-rays, and some modern disc images. The browser-based ISO extractor supports ISO9660 disc images. If your ISO uses UDF exclusively, the browser tool may not be able to read it — use 7-Zip or IsoBuster on the desktop for UDF-only disc images.",
      },
    },
    {
      "@type": "Question",
      name: "Can I extract a Linux ISO or Windows installer ISO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for the purposes of extracting files from inside the image. Linux distribution ISOs (Ubuntu, Debian, Fedora) and Windows installer ISOs use ISO9660 or a hybrid ISO9660/UDF filesystem. The browser tool can read the ISO9660 layer and let you access individual files — useful for grabbing a driver file, a config file, or checking the contents without burning or mounting. Note: extracting files from an ISO does not install the operating system or make the installer run.",
      },
    },
    {
      "@type": "Question",
      name: "What is the maximum ISO file size the browser tool handles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no artificial file size limit because no server is involved. The practical limit is your device's available RAM. The ISO9660 parser reads the directory tree from the disc image header without loading the entire file into memory — so even large ISOs (several GB) can have their file trees browsed quickly. Downloading a large file from the ISO does load that file's bytes into memory. For very large ISO images on low-RAM devices, a desktop application like 7-Zip is more reliable.",
      },
    },
    {
      "@type": "Question",
      name: "Can I extract a game ISO with this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the game ISO. PC game disc images that use standard ISO9660 can be browsed and extracted — you can pull out individual files such as setup executables, configuration files, or assets. Console game ISOs (PlayStation, Xbox, GameCube, Wii) use proprietary or modified filesystems that are not ISO9660. The browser tool cannot parse those. For console disc images, use dedicated tools like IsoBuster or the specific extractor for that console's format.",
      },
    },
    {
      "@type": "Question",
      name: "How does this compare to 7-Zip or IsoBuster for extracting ISOs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "7-Zip and IsoBuster are desktop applications with broader format support. 7-Zip handles ISO9660 and some UDF. IsoBuster is the most comprehensive disc image tool, supporting dozens of formats including UDF, HFS+, and proprietary console filesystems. The browser-based ISO extractor handles ISO9660 and does not require installation — ideal for quickly grabbing a file from a standard software or Linux ISO without installing anything. For complex or proprietary disc images, 7-Zip or IsoBuster are the better choice.",
      },
    },
    {
      "@type": "Question",
      name: "Can I extract a single file from the ISO without downloading everything?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool displays the full file and folder tree inside the ISO. You can click any individual file to download just that one file — useful when you need a specific driver, config file, or installer from a large disc image without downloading the entire contents. If you want everything, click Export as ZIP to get all files in a single archive.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ExtractIsoOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="extract-iso-online"
        description="ISO disc images contain full filesystem snapshots of a CD, DVD, or disc drive. You do not need to burn them to a disc or mount them as a virtual drive to access the files inside. Here is how to extract any file from an ISO entirely in your browser — no upload, no install, no virtual drive software."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={9}
        headings={[
          { id: "what-is-an-iso-file", title: "What is an ISO file and why can you not just open it?" },
          { id: "iso9660-vs-udf", title: "ISO9660 vs UDF: filesystem formats explained honestly" },
          { id: "how-browser-extraction-works", title: "How browser-based ISO extraction works" },
          { id: "step-by-step", title: "How to extract an ISO file online, step by step" },
          { id: "use-cases", title: "Real use cases: when you need to extract files from an ISO" },
          { id: "comparison-table", title: "Browser-based vs desktop apps: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "when-to-use-alternatives", title: "When to use a desktop tool instead" },
          { id: "related-tools", title: "Other archive tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "An ISO file is a complete disc image — a byte-for-byte snapshot of a CD, DVD, or other optical disc, including its filesystem. You do not need to burn it or mount it to access the files inside.",
          "ISO9660 is the standard filesystem used for software installers, Linux distributions, and many game discs. UDF is a newer standard used for DVDs and Blu-rays — UDF-only ISOs may not open in the browser tool.",
          "The SammaPix ISO Extractor parses ISO9660 directly in your browser using a client-side filesystem reader. No upload, no virtual drive, no install.",
          "You can browse the full file and folder tree, download individual files, or export everything as a ZIP archive.",
          "Console game ISOs and proprietary disc formats are not ISO9660 — use dedicated desktop tools for those.",
          "Verify no upload occurs with your browser DevTools: open the Network panel and watch zero outgoing requests while the tool runs.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Computer screen showing file management and disc image contents, representing the process of extracting files from an ISO disc image without burning or mounting software."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              An ISO is a complete disc snapshot. You do not need to burn or mount it — extract individual files directly in your browser.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Extract files from your ISO right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix ISO Extractor parses ISO9660 disc images entirely in your browser. Browse the file tree,
              download individual files, or export everything as a ZIP. No mounting. No burning. No upload. Free, no signup.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/iso-extractor"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open ISO Extractor, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/blog/open-iso-file-online"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                How to open an ISO without burning <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/unrar"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Extract RAR <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: What is an ISO file ─────────────────────────────── */}

        <h2 id="what-is-an-iso-file" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What is an ISO file and why can you not just open it?
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          An ISO file is a disc image — a byte-for-byte copy of an entire optical disc, including the disc filesystem, all files and folders, and the boot sector if the disc was bootable. The name comes from the ISO 9660 filesystem standard that governs how data is arranged on CD-ROMs, though the term is used colloquially for any disc image regardless of the filesystem.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          ISO files are widely used for distributing software, operating systems, and game installers. A Linux distribution, a Windows install image, a software application shipped on a CD — all commonly distributed as .iso files. They are also used for backup and archival: disc collections that would otherwise require physical media can be stored as ISO images.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The reason you cannot just double-click an ISO and have it open like a folder is that the .iso extension is associated with mounting behavior, not extraction. When you double-click an ISO on Windows 10/11 or macOS, the operating system mounts it as a virtual disc drive. That is useful if you want to run the installer. It is not what you want if you just need to grab one file out of the image.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          I built the{" "}
          <Link href="/tools/iso-extractor" className="text-[#6366F1] hover:underline">SammaPix ISO Extractor</Link>{" "}
          to solve the extraction case directly. The tool reads the ISO9660 filesystem in your browser, shows you the full file tree, and lets you download individual files or all contents as a ZIP — without mounting, without burning, and without uploading your disc image to any server.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          When extraction beats mounting
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Mounting a disc image spins up a virtual drive in your operating system and presents the ISO as if it were a physical disc. That is what you need to run an installer or boot from the image. But it has overhead: you need mounting software (or use the built-in OS mounting), the virtual drive shows up in File Explorer or Finder, and you need to unmount it afterwards.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For the common case where you simply need a file out of the image — a driver, a config file, a specific asset — extraction is faster and more direct. No virtual drive, no unmounting, no OS-level side effects. Just the files you need.
        </p>

        {/* ── Section 2: ISO9660 vs UDF ───────────────────────────────────── */}

        <h2 id="iso9660-vs-udf" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          ISO9660 vs UDF: filesystem formats explained honestly
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Not all disc images use the same filesystem. Understanding the difference helps you know when the browser tool will work and when you need a desktop application.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Filesystem</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Common uses</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser tool support</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">ISO9660</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Software installers, Linux distributions, classic game discs, Windows XP/Vista ISOs.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Supported. The browser parser reads ISO9660 directory entries and extracts files.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">ISO9660 + Joliet extension</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Windows software discs with long file names and Unicode characters. Joliet extends ISO9660 for Windows compatibility.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Supported. Joliet is a well-known extension of ISO9660.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">ISO9660 + Rock Ridge</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Linux live discs and installers. Rock Ridge adds Unix permissions and symlinks on top of ISO9660.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Supported for file extraction. Symlinks and Unix permissions metadata are not preserved on download.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">UDF (Universal Disc Format)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">DVDs, Blu-rays, modern Windows 7/10/11 install ISOs. Some are hybrid ISO9660+UDF.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not supported if UDF-only. Hybrid ISOs with both ISO9660 and UDF layers work via the ISO9660 layer. Use 7-Zip or IsoBuster for UDF-only images.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Proprietary console filesystems</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">PlayStation (PSX/PS2 CDXA), GameCube/Wii GCM, Xbox XDVDFS. Not ISO9660.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Not supported. Use dedicated console disc tools for these formats.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The honest summary: if your ISO came from a software installer, a Linux distribution, or a classic PC game, the browser tool will almost certainly work. If it came from a modern DVD or Blu-ray authoring workflow, or from a game console, check whether it is a hybrid ISO9660+UDF (which works) or UDF-only (which requires a desktop tool). When in doubt, try the browser tool first — it will tell you if it cannot parse the filesystem.
        </p>

        {/* ── Section 3: How browser extraction works ──────────────────────── */}

        <h2 id="how-browser-extraction-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based ISO extraction works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the mechanism explains why extraction can happen entirely in the browser without a server. ISO9660 has a well-documented, stable binary format that a JavaScript library can parse from browser memory without needing to mount anything.
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Your browser reads the ISO file locally.</strong> The File API passes the raw bytes of the .iso to the tool. No data leaves your device. The ISO file may be several gigabytes, but the filesystem metadata — the directory tree — is a small fraction of the total size.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The ISO9660 filesystem is parsed in browser memory.</strong> ISO9660 stores its directory tree starting from a fixed offset known as the Primary Volume Descriptor, which is always at sector 16 of the disc image. The JavaScript parser reads this structure to discover all files and folders in the image, their sizes, and their byte offsets within the ISO file — without reading the entire disc image into memory.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The file tree is displayed.</strong> Every file and folder from the disc image appears in the tool UI. You can explore nested folders exactly as they existed on the original disc.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Individual files are extracted on demand.</strong> When you click a file to download it, the tool reads only the bytes for that specific file from the ISO — jumping to the correct byte offset in the disc image. The file is served as a download directly from browser memory. No network request. No server.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">ZIP export packages all files at once.</strong> If you choose to export the entire ISO as a ZIP, JSZip assembles a ZIP archive in browser memory from all the extracted file entries, preserving the folder structure. The ZIP is then downloaded as a blob URL.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The ISO9660 specification has been public since 1988 and is thoroughly documented. Parsing it in JavaScript is well-understood and reliable for standard disc images. The parser does not decompress anything — unlike ZIP or 7Z archives, ISO9660 stores files uncompressed, so extraction is a straightforward byte copy from the disc image to the output file.
        </p>

        {/* ── Tool CTA #1 ──────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Extract files from your ISO now, in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            ISO9660 parsed locally. Browse the file tree, download individual files, or export everything as ZIP.
            No upload, no mounting, no install. Free.
          </p>
          <Link
            href="/tools/iso-extractor"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open ISO Extractor, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: Step by step ───────────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to extract an ISO file online, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The process takes under a minute for most ISO files:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/iso-extractor</strong> in Chrome, Safari, Firefox, or Edge. No account or signup required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your ISO file onto the dropzone</strong> or click to browse for it. The tool displays the filename and size. No upload occurs — the file is in browser memory only.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Wait for the filesystem to be parsed.</strong> The tool reads the ISO9660 directory tree and displays the complete file and folder structure from the disc image. For large ISOs this is fast because only the metadata, not the file content, is read at this stage.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Browse the file tree.</strong> Explore folders and files exactly as they existed on the disc. You can see file sizes and the complete path of every entry.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download what you need.</strong> Click any individual file to download it directly. Or click Export as ZIP to package all ISO contents into a single downloadable archive. Individual file downloads happen instantly because the byte offset in the ISO is already known.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the tool cannot parse the disc image, it will display an error indicating the filesystem was not recognised as ISO9660. In that case, see the section below on when to use a desktop tool.
        </p>

        {/* ── Section 5: Use cases ───────────────────────────────────────────── */}

        <h2 id="use-cases" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Real use cases: when you need to extract files from an ISO
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          These are the situations where extracting from an ISO directly is the right workflow:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Grabbing a driver or INF file from a hardware installer ISO
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Hardware manufacturers still distribute driver packages as ISO images. If you need a specific .inf or .sys file from the driver disc — perhaps to manually update a device in Device Manager without running the full installer — extracting the single file is faster and cleaner than mounting the entire disc image.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Getting a specific file from a Linux distribution ISO
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Linux installer ISOs contain configuration files, package indexes, and sometimes useful scripts or tools. If you need the preseed.cfg, the package list, or a file from the filesystem image inside the ISO, extracting it directly saves you from burning the disc or setting up a virtual machine just to access one file.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Checking what is inside a software installer before running it
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Downloaded an ISO from an unfamiliar source and want to inspect the contents before running the installer? Extracting the file tree lets you see every file in the disc image without executing anything. A useful security practice before running software from less-established distributors.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Archiving old software or game discs
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Disc image archives of old software or PC games let you preserve the original files in a ZIP that is easier to manage than a raw ISO. The browser-based extractor lets you pull the contents out and repackage them without any specialised software on your computer.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Pulling assets from an old application disc
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Fonts, textures, documentation, help files — older application discs often contain assets that are useful independently. Extracting those specific files from the ISO is straightforward when the disc image uses ISO9660.
        </p>

        {/* ── Section 6: Comparison table ────────────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser-based vs desktop apps: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is an objective comparison between extracting ISO files in the browser and doing it with a desktop application:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Dimension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Desktop app (7-Zip, IsoBuster)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Browser-based (SammaPix)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Installation required</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes. Download and install the application first.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Open in any modern browser and start immediately.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Filesystem support</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">7-Zip: ISO9660, UDF. IsoBuster: ISO9660, UDF, HFS+, console formats, and dozens more.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">ISO9660 (+ Joliet and Rock Ridge extensions). UDF-only not supported.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Privacy</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File stays on your device. No network involved.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">File stays on your device. No upload. Verifiable via DevTools.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Large ISO files (10+ GB)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Handles arbitrarily large ISOs using disk I/O.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Directory browsing works on large ISOs. Full ZIP export of many GBs may be limited by device RAM.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Works on locked/shared computers</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Only if you have permission to install software.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — any browser, no install, no admin rights needed.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Download individual files</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — right-click or drag the file out of the archive view.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — click any file in the tree to download it directly.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Export all as ZIP</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes, by extracting to a folder and then creating a ZIP.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes — one-click Export as ZIP packages everything.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The browser tool covers the vast majority of everyday ISO extraction tasks. Desktop applications are necessary for UDF-only discs, console ISOs, and very large archives where RAM is constrained.
        </p>

        {/* ── Section 7: Verify no upload ───────────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not need to take the no-upload claim on trust. Here is how to verify it in under two minutes using your browser&apos;s built-in developer tools:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 on Windows or Linux. Press Command Option I on Mac. On Safari, enable the Develop menu first in Settings → Advanced.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click the Network tab.</strong> Clear existing requests with the clear button. Enable Preserve log to keep the history during the session.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your ISO and use the tool.</strong> Browse the file tree, download a file, or export as ZIP.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: zero outgoing file requests.</strong> You will see the initial page load (JavaScript, CSS). You will see no POST or PUT request carrying your ISO data. The tool operates entirely in browser memory.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The Network inspector does not lie. If data were being uploaded, you would see a clearly visible network request. There is none. The privacy guarantee is architectural: the File API reads files locally, the parser runs in browser memory, and downloads are served via blob URLs — no network path for your file data.
        </p>

        {/* ── Tool CTA #2 ──────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your ISO file never leaves your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            ISO9660 parsed locally in browser memory. No upload, no mounting, no install required.
            Verify with DevTools. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/iso-extractor"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open ISO Extractor, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/open-iso-file-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Open ISO without burning or mounting <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: When to use alternatives ──────────────────────────── */}

        <h2 id="when-to-use-alternatives" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When to use a desktop tool instead
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The browser-based ISO extractor is the right choice for most standard disc images. Here is when to reach for a desktop application instead:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          UDF-only disc images
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Some modern DVD and Blu-ray images use UDF exclusively, without an ISO9660 layer. The browser tool cannot read these. Use 7-Zip (free, Windows and Linux) or IsoBuster (Windows, has a free tier) to extract UDF disc images. On macOS, the built-in Disk Utility can mount UDF images and give you access to the files.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Console game disc images
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          PlayStation, Xbox, GameCube, Wii, and other console disc images use proprietary or modified filesystems. These are not ISO9660. Use platform-specific tools: for example, wit (Wiimms ISO Tools) for Wii images, or IsoBuster for PS1/PS2 CDXA. The browser tool will not be able to parse these.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Very large ISO files where you need to extract everything
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Browsing the file tree of a 10 GB ISO works fine in the browser — only the directory metadata is loaded. But if you want to export all 10 GB of content as a ZIP, the browser tool needs to hold all that data in RAM simultaneously. On devices with 8 GB RAM or less, this may be impractical. Use 7-Zip or IsoBuster for full extraction of very large disc images.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          You need to extract a RAR or 7Z archive (not an ISO)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the file you need to extract is a .rar or .7z archive rather than an ISO disc image, the ISO extractor is not the right tool. Use the{" "}
          <Link href="/tools/unrar" className="text-[#6366F1] hover:underline">SammaPix Unrar tool</Link>{" "}
          for RAR archives or the{" "}
          <Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">Open 7Z tool</Link>{" "}
          for 7-Zip archives. Both run entirely in the browser with the same no-upload architecture.
        </p>

        {/* ── Section 9: Related tools ───────────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other archive tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based archive tools, all with no upload and no server processing:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/iso-extractor" className="text-[#6366F1] hover:underline">ISO Extractor</Link></strong>: extract files from ISO9660 disc images in your browser. The tool covered in this article.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/unrar" className="text-[#6366F1] hover:underline">Unrar</Link></strong>: extract RAR archives (RAR4 and RAR5) directly in your browser. Preview file list, download individually, or grab everything as ZIP. No WinRAR install needed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/open-7z" className="text-[#6366F1] hover:underline">Open 7Z</Link></strong>: open 7-Zip archives in your browser. Powered by libarchive.wasm. Browse files, download individually, or export as ZIP.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/tar-gz" className="text-[#6366F1] hover:underline">Extract TAR.GZ</Link></strong>: open .tar.gz and .tgz archives — the standard compressed format for Linux and macOS software releases — without a terminal.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/rar-to-zip" className="text-[#6366F1] hover:underline">RAR to ZIP</Link></strong>: convert a RAR archive to a universally compatible ZIP entirely in the browser. No WinRAR needed.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/zip-creator" className="text-[#6366F1] hover:underline">ZIP Creator</Link></strong>: create a new ZIP archive from any set of files — drag files in and download the ZIP. No upload, no server.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a guide focused on opening an ISO file without burning or mounting it, see{" "}
          <Link href="/blog/open-iso-file-online" className="text-[#6366F1] hover:underline">How to Open an ISO File Online Without Burning or Mounting</Link>.
        </p>

        {/* ── Tool CTA #3 ──────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your archive needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Extract ISO, open RAR, extract 7Z, open TAR.GZ, create ZIPs — without uploading files anywhere.
            All tools run locally. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/iso-extractor"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              ISO Extractor <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
              href="/tools/tar-gz"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Extract TAR.GZ <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/rar-to-zip"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              RAR to ZIP <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/tools/zip-creator"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Create ZIP <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
