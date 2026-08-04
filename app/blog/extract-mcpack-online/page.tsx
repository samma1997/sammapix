import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Open and Extract a .mcpack File Online Free [2026]",
  description:
    "Extract any .mcpack file in your browser — no upload, no Minecraft required. JSZip reads the ZIP-format archive locally. Browse textures, manifests, and assets. Free, no signup.",
  alternates: {
    canonical: `${APP_URL}/blog/extract-mcpack-online`,
  },
  keywords: [
    "extract mcpack",
    "open mcpack",
    "mcpack extractor",
    "open mcpack file",
    "mcpack file opener",
    "extract mcpack online",
    "mcpack to zip",
    "open mcpack without minecraft",
    "mcpack file contents",
    "mcpack extractor online free",
  ],
  openGraph: {
    title: "Open and Extract a .mcpack File Online Free [2026]",
    description:
      "Extract a .mcpack file entirely in your browser. No upload, no Minecraft install required. JSZip reads it locally — browse textures, manifests, sounds. Free.",
    url: `${APP_URL}/blog/extract-mcpack-online`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open and Extract a .mcpack File Online Free [2026]",
    description:
      "Open a .mcpack file in your browser. No Minecraft needed, no upload. JSZip runs locally. Browse and download the contents. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/extract-mcpack-online`;
const POST_TITLE = "Open and Extract a .mcpack File Online Free [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A .mcpack file is a renamed ZIP archive used by Minecraft: Bedrock Edition for resource packs and behavior packs. Because it is a ZIP, you can open and extract it in any browser using JSZip — no Minecraft installation needed, no file upload. This guide explains the .mcpack format, what is inside, and how to extract and browse the files using a free browser tool.",
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
    "extract mcpack",
    "open mcpack",
    "mcpack extractor",
    "open mcpack file",
    "mcpack to zip",
    "extract mcpack online",
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
  name: "How to Open and Extract a .mcpack File Online Without Minecraft",
  description:
    "Extract the contents of a .mcpack file in your browser using JSZip. No Minecraft installation required, no file upload, no server.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Minecraft Extractor (browser-based, free)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Minecraft Extractor tool",
      text: "Go to sammapix.com/tools/minecraft-extractor in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Drop your .mcpack file onto the tool",
      text: "Drag your .mcpack file onto the dropzone or click to browse for it. The file is read locally by your browser via the File API. Nothing is uploaded to any server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Browse the file list",
      text: "JSZip reads the archive entirely in browser memory and shows you a list of all files inside — textures, manifests, sounds, models, and any other assets bundled in the pack.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download files individually or as a ZIP",
      text: "Click any file to download it individually, or use the Download All as ZIP button to grab everything in a single archive. No upload occurs at any point.",
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
      name: "What is a .mcpack file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A .mcpack file is an archive format used by Minecraft: Bedrock Edition (the version on Windows 10/11, iOS, Android, and consoles) to distribute resource packs and behavior packs. Internally, it is a standard ZIP archive with a .mcpack extension. It contains a manifest.json file that describes the pack, plus assets like textures, sounds, models, and scripts depending on the pack type. The .mcpack extension is a convention used by the game's pack installer — it does not represent a proprietary binary format.",
      },
    },
    {
      "@type": "Question",
      name: "Can I open a .mcpack file without installing Minecraft?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Because a .mcpack file is a ZIP archive with a renamed extension, any tool that can read ZIP files can open it. The SammaPix Minecraft Extractor reads .mcpack files entirely in your browser using JSZip — no Minecraft, no installation, and no file upload required. You can browse the contents, inspect the manifest.json, and download individual files or the whole archive as a ZIP.",
      },
    },
    {
      "@type": "Question",
      name: "Is my .mcpack file uploaded to a server when I use this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The file never leaves your device. JSZip reads the .mcpack archive in browser memory using the File API. The file list and download links are generated entirely client-side. You can verify this by opening your browser's Network panel (F12) and watching for outgoing requests while the tool processes your file — you will see none that carry file data.",
      },
    },
    {
      "@type": "Question",
      name: "What files are typically inside a .mcpack?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The contents depend on whether the pack is a resource pack or a behavior pack. Resource packs (also called texture packs) typically contain: manifest.json (required metadata), textures/ folder with PNG images for blocks, items, and entities, sounds/ folder with audio files, texts/ folder with translation strings, and optionally models/ and animations/ for custom entity models. Behavior packs typically contain: manifest.json, entities/ folder with JSON behavior definitions, items/ folder, loot_tables/, recipes/, and scripts/ for GameTest or scripting API files.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between .mcpack, .mcworld, and .mctemplate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All three are renamed ZIP archives. .mcpack contains a resource pack or behavior pack (textures, sounds, behaviors). .mcworld contains a complete saved Minecraft world with all its chunks, player data, and level settings. .mctemplate is similar to .mcworld but intended as a starting template for new worlds — it includes a manifest that describes it as a template. The SammaPix Minecraft Extractor handles all three, since they share the same ZIP-based structure.",
      },
    },
    {
      "@type": "Question",
      name: "Can I edit the files inside a .mcpack and repackage it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool extracts and downloads the files. To repackage a modified pack, extract the files, make your edits locally, then create a new ZIP with the corrected contents. You can use the SammaPix ZIP Creator tool to build a ZIP from your files in the browser. Rename the resulting .zip to .mcpack and it can be imported back into Minecraft: Bedrock Edition by double-clicking or sharing it to the game.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool affiliated with Mojang or Microsoft?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This is an independent browser tool built to work with the ZIP-based archive format that Minecraft: Bedrock Edition uses. Minecraft is a trademark of Mojang Studios, a subsidiary of Microsoft. This tool is not affiliated with, endorsed by, or connected to Mojang or Microsoft in any way. It simply reads ZIP archives, including those with .mcpack, .mcworld, and .mctemplate extensions.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ExtractMcpackOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="extract-mcpack-online"
        description="Got a .mcpack file and no idea how to open it? You do not need Minecraft installed. A .mcpack is just a ZIP with a different extension — and you can extract its contents right in your browser, for free, with no file upload."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools"]}
        readingTime={9}
        headings={[
          { id: "what-is-mcpack", title: "What a .mcpack file actually is (and why it opens like a ZIP)" },
          { id: "inside-a-mcpack", title: "What is inside a .mcpack: textures, manifest, sounds, and more" },
          { id: "how-browser-extraction-works", title: "How browser-based .mcpack extraction works" },
          { id: "step-by-step", title: "How to open and extract a .mcpack file online, step by step" },
          { id: "resource-vs-behavior", title: "Resource pack vs behavior pack: what you will find inside" },
          { id: "edit-and-repackage", title: "How to edit and repackage a .mcpack after extracting" },
          { id: "comparison-table", title: "Browser extractor vs other methods: honest comparison" },
          { id: "verify-no-upload", title: "How to verify no upload happens" },
          { id: "related-archive-tools", title: "Other archive tools that run in your browser" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "A .mcpack file is a standard ZIP archive with a renamed extension. It is not a proprietary binary format — any ZIP reader can open it.",
          "The SammaPix Minecraft Extractor opens .mcpack files entirely in the browser using JSZip. Your file never leaves your device.",
          "Resource packs contain textures, sounds, and visual assets. Behavior packs contain JSON entity definitions, scripts, and game logic.",
          "You can download files individually or grab everything as a ZIP. To repackage after editing, use the ZIP Creator and rename .zip to .mcpack.",
          "This is an independent tool, not affiliated with Mojang or Microsoft.",
          "Verify with DevTools: open the Network panel and watch zero outgoing requests while the tool processes your file.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A computer screen showing code and file folders, representing the process of extracting and inspecting the files inside a Minecraft .mcpack archive."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A .mcpack file is a ZIP archive in disguise — extract it in your browser and browse every texture, manifest, and sound inside.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Open your .mcpack file right now, no upload needed
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              SammaPix Minecraft Extractor reads .mcpack, .mcworld, and .mctemplate files entirely in your browser via JSZip.
              Browse the file list, download individual assets, or grab everything as a ZIP. No Minecraft required. Free, no signup.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/minecraft-extractor"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Minecraft Extractor, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/unrar"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Extract RAR <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/zip-creator"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Create ZIP <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: What is a .mcpack ─────────────────────────────────── */}

        <h2 id="what-is-mcpack" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What a .mcpack file actually is (and why it opens like a ZIP)
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You downloaded a texture pack or add-on for Minecraft: Bedrock Edition and ended up with a .mcpack file. You try to open it on your computer and nothing happens — no application knows what to do with it. On mobile it might trigger the Minecraft app to import it automatically, but that only works if you have the game installed.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is the thing most guides do not tell you: a .mcpack file is a standard ZIP archive. The extension has been changed from .zip to .mcpack so that the operating system and the game can identify it as a Minecraft pack and trigger the correct import behavior. If you rename a .mcpack file to .zip, your operating system will open it like any other ZIP archive. Every .mcpack is a ZIP. Always.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This means any tool that can read ZIP archives can open a .mcpack — including browser-based tools like the{" "}
          <Link href="/tools/minecraft-extractor" className="text-[#6366F1] hover:underline">SammaPix Minecraft Extractor</Link>,
          which uses JSZip to read the archive entirely in your browser without uploading the file anywhere.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          The three Minecraft archive extensions and what they contain
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Minecraft: Bedrock Edition uses three ZIP-based extensions for different purposes:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Extension</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What it contains</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Underlying format</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">.mcpack</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">A resource pack (textures, sounds, UI) or behavior pack (entity logic, scripts, recipes).</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Standard ZIP archive.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">.mcworld</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">A complete Minecraft world — chunks, player data, level settings, structures.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Standard ZIP archive.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">.mctemplate</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">A world template for generating new worlds with a specific starting state.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Standard ZIP archive.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          All three share the same ZIP structure. The SammaPix Minecraft Extractor handles all three formats. Whether you need to open a texture pack, inspect a downloaded world, or examine a template, the process is identical.
        </p>

        {/* ── Section 2: What is inside ─────────────────────────────────────── */}

        <h2 id="inside-a-mcpack" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What is inside a .mcpack: textures, manifest, sounds, and more
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The contents of a .mcpack vary depending on whether it is a resource pack or a behavior pack. Here is a breakdown of the most common files and folders you will encounter:
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          manifest.json — the required metadata file
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Every valid .mcpack must contain a <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">manifest.json</code> at the root. This file identifies the pack to Minecraft. It includes a unique UUID, a version array, the pack name and description, the minimum engine version required, and the pack type (resources or data). If you want to know what a pack is before importing it, this is the file to read.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          textures/ — the visual heart of a resource pack
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Resource packs store their images in a <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">textures/</code> folder. Inside you will typically find:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">textures/blocks/</code> — PNG images for every block face (dirt, stone, grass, wood plank variants, and hundreds more).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">textures/items/</code> — item textures (swords, food, tools, armor pieces).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">textures/entity/</code> — mob skins (creepers, zombies, players, custom entities).
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">textures/ui/</code> — interface elements (inventory slots, hotbar, button textures).
          </li>
        </ul>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          sounds/ — audio assets
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Audio is stored in a <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">sounds/</code> folder as .ogg or .fsb files. A <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">sounds.json</code> file at the root maps event names to the specific audio files.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Behavior pack folders
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Behavior packs tend to contain JSON files rather than images. Common folders include <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">entities/</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">items/</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">loot_tables/</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">recipes/</code>, <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">scripts/</code>, and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">animation_controllers/</code>. These define how the game behaves: custom crafting recipes, entity AI, custom item attributes, and event triggers.
        </p>

        {/* ── Section 3: How browser extraction works ───────────────────────── */}

        <h2 id="how-browser-extraction-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based .mcpack extraction works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Understanding the mechanism explains why this runs entirely in your browser with no server involved. Here is what happens when you drop a .mcpack file into the tool:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Your browser reads the file locally.</strong> The File API passes the raw bytes of the .mcpack to JavaScript. Nothing leaves your device at this step or any step that follows.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">JSZip parses the ZIP structure.</strong>{" "}
            <a href="https://stuk.github.io/jszip/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">JSZip</a>{" "}
            is an open-source JavaScript library for reading and creating ZIP archives in the browser. It reads the central directory of the ZIP (which lists all file entries, their names, sizes, and offsets) and makes this information available to JavaScript without extracting the full content into memory upfront.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The file list is displayed.</strong> The tool shows you every file and folder inside the .mcpack — names, sizes, and paths — so you can see the full structure without downloading anything yet.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Individual files or full ZIP download.</strong> Clicking a file decompresses that specific entry from the archive in memory and downloads it via a blob URL. The Download All button uses JSZip to write a new ZIP with all entries and downloads that. No network request carries your data.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          JSZip has over 10 million weekly npm downloads and is one of the most battle-tested ZIP libraries in JavaScript. It handles the deflate compression used inside ZIP archives entirely in the browser. The processing speed depends on the archive size and your device CPU — most .mcpack files are under 50 MB and process in under a second on a modern device.
        </p>

        {/* ── Tool CTA #1 ──────────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Extract your .mcpack file in your browser now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            JSZip reads the archive locally. Browse the file list, download individual assets or grab everything as a ZIP.
            No upload, no Minecraft required, no signup. Free.
          </p>
          <Link
            href="/tools/minecraft-extractor"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Minecraft Extractor, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 4: Step by step ───────────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to open and extract a .mcpack file online, step by step
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The full process takes under a minute for most .mcpack files:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to sammapix.com/tools/minecraft-extractor</strong> in Chrome, Safari, Firefox, or Edge. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your .mcpack file onto the dropzone</strong> or click to browse for it. The tool also accepts .mcworld and .mctemplate files.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Browse the file list.</strong> JSZip reads the archive and displays every file inside — folder structure, file names, and sizes. You can see the manifest.json, textures folder, sounds, and any other assets at a glance.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download what you need.</strong> Click any file to download it individually, or use Download All as ZIP to get the full contents in a single archive. The ZIP preserves the original folder structure.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you want to verify the pack content before installing it in Minecraft — for example, to check that the manifest.json version matches your Minecraft version — this is the fastest way to do it without launching the game.
        </p>

        {/* ── Section 5: Resource vs behavior pack ─────────────────────────── */}

        <h2 id="resource-vs-behavior" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Resource pack vs behavior pack: what you will find inside
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Knowing what type of .mcpack you have tells you what to expect when you extract it. Here is a practical comparison:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Pack type</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">manifest.json type field</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Typical contents</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Resource pack (texture pack)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">resources</code></td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">textures/, sounds/, texts/, models/, animations/, particle/, font/, render_controllers/, pack_icon.png</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Behavior pack (add-on)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]"><code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">data</code></td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">entities/, items/, loot_tables/, recipes/, scripts/, spawn_rules/, animation_controllers/, blocks/</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Skin pack</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Contains <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">skins.json</code></td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">skins.json, skin PNG images, texts/en_US.lang for skin names</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          To identify which type you have, extract the pack and open <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">manifest.json</code>. The <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">modules</code> array will contain an object with a <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">type</code> field: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">resources</code> for a resource pack or <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">data</code> for a behavior pack.
        </p>

        {/* ── Section 6: Edit and repackage ─────────────────────────────────── */}

        <h2 id="edit-and-repackage" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to edit and repackage a .mcpack after extracting
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Extracting a .mcpack is often the first step in modifying it — swapping a texture, updating the manifest version, or changing a crafting recipe. Here is the full workflow:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Extract the .mcpack.</strong> Use the{" "}
            <Link href="/tools/minecraft-extractor" className="text-[#6366F1] hover:underline">Minecraft Extractor</Link>{" "}
            to download all files. Choose Download All as ZIP to get the full folder structure in one archive.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Extract the downloaded ZIP and make your edits.</strong> Open the ZIP on your computer, navigate to the files you want to change (for example, swap a texture PNG in <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">textures/blocks/</code>), and save the changes.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Repackage the files as a ZIP.</strong> Select all the modified files and folders — including <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">manifest.json</code> at the root — and compress them into a ZIP archive. On Windows you can right-click and choose Compress to ZIP folder. On macOS, select the files and choose Compress. Make sure the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">manifest.json</code> is at the root of the ZIP, not inside a subfolder.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Rename the .zip to .mcpack.</strong> Change the file extension from .zip to .mcpack. On Windows you may need to enable file extensions in File Explorer (View → Show → File name extensions). On macOS, rename in Finder and confirm that you want to change the extension.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Import into Minecraft.</strong> On Windows 10/11, double-click the .mcpack file to open it with Minecraft. On Android, share the file to the Minecraft app. On iOS, use the Files app to open it with Minecraft. The game will import the pack and add it to your pack library.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If you prefer to do everything in the browser, you can also use the{" "}
          <Link href="/tools/zip-creator" className="text-[#6366F1] hover:underline">SammaPix ZIP Creator</Link>{" "}
          to assemble your modified files into a ZIP without installing any software. Then rename the result to .mcpack.
        </p>

        {/* ── Section 7: Comparison table ──────────────────────────────────── */}

        <h2 id="comparison-table" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Browser extractor vs other methods: honest comparison
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          There are several ways to extract a .mcpack. Here is how they compare:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Method</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">How it works</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Limitations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Rename to .zip + OS extractor</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Rename .mcpack to .zip, then double-click to open with Windows Explorer or macOS Archive Utility.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Requires knowing the rename trick. Must enable file extensions on Windows. Does not work on mobile.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">7-Zip / WinRAR (desktop)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Right-click the .mcpack and open with 7-Zip or WinRAR. These tools recognise ZIP archives regardless of extension.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Requires installation. Windows/Linux only (7-Zip has no macOS GUI). Does not work on mobile.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">SammaPix Minecraft Extractor (browser)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Drop the .mcpack into the browser tool. JSZip reads it locally. Browse and download files individually or as ZIP.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No installation needed. Works on any device with a browser. Very large packs may be slow on low-RAM devices.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Minecraft itself (install pack and navigate files)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Import the .mcpack into Minecraft. The game extracts it to a local folder you can navigate.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Requires Minecraft installed. Packs go into a non-obvious folder path. Cannot inspect without importing first.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The browser-based approach is the best choice when you are on a device without 7-Zip or WinRAR, when you want to inspect a pack before deciding whether to install it, or when you are on a phone or tablet and cannot rename file extensions easily.
        </p>

        {/* ── Section 8: Verify no upload ──────────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify no upload happens
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not need to trust my word. Here is how to verify this yourself in under two minutes using your browser developer tools:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 (Windows/Linux) or Command Option I (Mac). On Safari, enable the Develop menu first via Settings → Advanced.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click the Network tab.</strong> Clear any existing requests. Enable Preserve log if you want to ensure nothing is hidden.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your .mcpack file and wait for the file list to appear.</strong> Watch the Network panel during the entire process.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: zero outgoing file requests.</strong> The only requests you will see are the initial page load assets (JavaScript, CSS). No request carries your .mcpack data to any server. Your file stays entirely in browser memory.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the same verification method privacy researchers use to audit tools claiming to be client-side. If your file was being uploaded, you would see a POST or PUT request in the Network panel carrying its bytes. You will see none.
        </p>

        {/* ── Tool CTA #2 ──────────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your .mcpack file stays on your device</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no account, no server. JSZip reads the archive locally. Browse files, download individually or as ZIP.
            Verify with DevTools. Free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/minecraft-extractor"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Minecraft Extractor, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/open-minecraft-mcworld-file"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              How to open .mcworld files <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Related archive tools ─────────────────────────────── */}

        <h2 id="related-archive-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Other archive tools that run in your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          SammaPix offers a full suite of browser-based archive tools, all with no upload and no server processing:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/minecraft-extractor" className="text-[#6366F1] hover:underline">Minecraft Extractor</Link></strong>: open .mcpack, .mcworld, and .mctemplate files in your browser. JSZip reads the ZIP-based archive locally. Browse, inspect, and download contents. The tool covered in this article.
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
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/zip-creator" className="text-[#6366F1] hover:underline">ZIP Creator</Link></strong>: create a ZIP archive from multiple files entirely in your browser. Useful for repackaging a modified .mcpack — create the ZIP, then rename to .mcpack.
          </li>
        </ul>

        {/* ── Tool CTA #3 ──────────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All your archive needs, all in-browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Open .mcpack, extract RAR, open 7Z, convert RAR to ZIP, create ZIPs — without uploading files anywhere.
            All tools run locally in your browser. No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/minecraft-extractor"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Minecraft Extractor <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
              href="/tools/zip-creator"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Create ZIP <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
