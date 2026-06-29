import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Batch Rename Photos & Files (Windows, Mac & Online)",
  description:
    "Rename hundreds of photos or files at once. The fastest no-install method (browser, no upload), how to rename by EXIF date, plus the built-in Windows and Mac bulk rename tricks. Updated 2026.",
  alternates: { canonical: `${APP_URL}/blog/how-to-batch-rename-photos-and-files-online` },
  keywords: [
    "batch rename files online",
    "batch rename photos",
    "bulk rename images",
    "rename multiple files at once",
    "batch rename by date",
    "rename photos by exif date",
    "mass rename images",
    "online file renamer",
  ],
  openGraph: {
    title: "How to Batch Rename Photos & Files (Windows, Mac & Online)",
    description:
      "Rename hundreds of files at once: the no-upload browser method, EXIF date renaming, plus Windows and Mac built-in tricks. Updated 2026.",
    url: `${APP_URL}/blog/how-to-batch-rename-photos-and-files-online`,
    type: "article",
    publishedTime: "2026-06-30",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Batch Rename Photos & Files (Windows, Mac & Online)",
    description: "Rename hundreds of files at once, including by EXIF date. No upload. Updated 2026.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-06-30";
const POST_DATE_FORMATTED = "June 30, 2026";
const POST_URL = `${APP_URL}/blog/how-to-batch-rename-photos-and-files-online`;
const POST_TITLE = "How to Batch Rename Photos & Files";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "How to batch rename hundreds of photos or files at once: the no-upload browser method, renaming by EXIF capture date, sequential numbering and find-and-replace, plus the built-in Windows and Mac bulk rename tools.",
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
  keywords: ["batch rename files online", "batch rename photos", "rename photos by exif date", "bulk rename images"],
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
      name: "How do I batch rename files online without uploading them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the SammaPix Batch Rename tool at sammapix.com/tools/batchname. Drop your files, build a naming pattern (sequential numbers, EXIF date, find and replace, or fixed text), preview the result, and download the renamed files. Everything runs in your browser, so nothing is uploaded.",
      },
    },
    {
      "@type": "Question",
      name: "How do I rename photos by their date taken?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a tool that reads EXIF metadata. The SammaPix Batch Rename tool can insert each photo's capture date and time into the filename, turning IMG_1234.jpg into something like 2026-05-29-143022.jpg, so your library sorts in true chronological order. It reads the EXIF date locally in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "How do I batch rename files on Windows?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Select all the files in File Explorer, press F2, type a base name and press Enter. Windows appends (1), (2), (3) automatically. For advanced patterns and find-and-replace, install Microsoft PowerToys and use PowerRename, which adds regex and search-and-replace renaming.",
      },
    },
    {
      "@type": "Question",
      name: "How do I batch rename files on Mac?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Select the files in Finder, right-click and choose Rename. A panel lets you Replace Text, Add Text, or apply a Format with a base name and sequential numbers. It is quick for simple jobs but cannot rename by EXIF date.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add sequential numbers when renaming?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All the methods here support sequential numbering, for example wedding-001.jpg, wedding-002.jpg. The SammaPix tool lets you set the start number and padding (001 vs 1) and combine numbers with dates and fixed text.",
      },
    },
    {
      "@type": "Question",
      name: "Is batch renaming online safe for private files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the tool. Many online renamers upload your files to their servers. The SammaPix Batch Rename tool processes everything in your browser with no upload, so private photos and documents never leave your device.",
      },
    },
  ],
};

export default function HowToBatchRenamePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-batch-rename-photos-and-files-online"
        description="Renaming files one by one is painful. This guide shows the fastest way to batch rename hundreds of photos or files at once, including by EXIF capture date, with the no-upload browser method plus the built-in Windows and Mac tricks."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Workflow"]}
        readingTime={9}
        headings={[
          { id: "why-batch", title: "Why batch rename (and how to name well)" },
          { id: "method-comparison", title: "3 ways to batch rename, compared" },
          { id: "method-online", title: "Method 1: Online, no upload (SammaPix)" },
          { id: "by-exif-date", title: "Rename photos by EXIF date (the killer trick)" },
          { id: "patterns", title: "Numbering, find-and-replace and case" },
          { id: "windows", title: "Method 2: Windows (Explorer & PowerRename)" },
          { id: "mac", title: "Method 3: Mac (Finder rename)" },
          { id: "scenarios", title: "Real scenarios: weddings, events, SEO" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Batch renaming bundles a whole folder into one consistent, sortable naming scheme in seconds.",
          "Fastest no-install option: the SammaPix Batch Rename tool builds names in your browser with no upload.",
          "Rename photos by EXIF capture date so they sort in true chronological order, something Finder cannot do.",
          "Windows: select all, press F2. For patterns, use PowerToys PowerRename.",
          "Mac: select files, right-click, Rename, with Replace, Add Text or Format options.",
          "Good filenames help SEO too: descriptive names beat IMG_1234 when photos are published online.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
              alt="Organised folders and files on a laptop, ready for batch renaming"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              One naming scheme across a whole folder, in seconds
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Batch rename your files right now, no install
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              The SammaPix Batch Rename tool renames hundreds of files at once with sequential numbers, EXIF
              dates, find-and-replace and fixed text, all in your browser. Nothing is uploaded.
            </p>
            <Link
              href="/tools/batchname"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Batch Rename Files, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <h2 id="why-batch" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why batch rename (and how to name well)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A folder full of IMG_4821.jpg, DSC00342.jpg and screenshot copies is a mess to search, sort, or hand to a client. Batch renaming applies one consistent scheme to every file at once: a clear base name, a date, and a sequence number. Done well, the folder sorts itself and every file says what it is at a glance.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A good naming scheme usually has three parts: <strong className="text-gray-800 dark:text-[#E5E5E5]">what</strong> (a base name like rossi-wedding), <strong className="text-gray-800 dark:text-[#E5E5E5]">when</strong> (the date, ideally the photo's real capture date), and <strong className="text-gray-800 dark:text-[#E5E5E5]">order</strong> (a zero-padded number like 001). For example: <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">rossi-wedding-2026-05-29-001.jpg</code>. That name sorts correctly, never collides, and is instantly readable.
        </p>

        <h2 id="method-comparison" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          3 ways to batch rename, compared
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Method</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Install</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Rename by EXIF date</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Find &amp; replace</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium"><Link href="/tools/batchname" className="text-[#6366F1] hover:underline">SammaPix online</Link></td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">None (browser)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Windows Explorer</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Built-in</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No (PowerRename yes)</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Mac Finder</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Built-in</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The built-in tools are great for simple jobs. The thing neither Windows nor Mac can do natively is rename by the photo's EXIF capture date, which is the single most useful trick for photographers. For that, use the browser tool.
        </p>

        <h2 id="method-online" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 1: Online, no upload (SammaPix Batch Rename)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The{" "}
          <Link href="/tools/batchname" className="text-[#6366F1] hover:underline">SammaPix Batch Rename tool</Link>{" "}
          builds new filenames from a pattern and reads each file's metadata locally in your browser. Nothing is uploaded, so it is safe for client work, and it offers things the OS tools do not: EXIF date tokens, padded sequence numbers, find-and-replace, and case changes, with a live preview before you commit.
        </p>
        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Open sammapix.com/tools/batchname</strong> in any browser.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Add your files.</strong> Drag in the photos or files you want to rename.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Build the pattern.</strong> Combine fixed text, a date token, and a sequence number. Watch the live preview update.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Download.</strong> Grab the renamed files individually or as a ZIP.</li>
        </ol>

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Rename a whole folder in one go</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">Sequential numbers, EXIF dates, find-and-replace, live preview. 100% in your browser, nothing uploaded.</p>
          <Link href="/tools/batchname" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Open the Batch Renamer, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <h2 id="by-exif-date" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Rename photos by EXIF date (the killer trick)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Every photo your camera or phone takes stores the exact capture date and time in its EXIF metadata. Renaming files to start with that date is the single best thing you can do to organise a photo library, because the files then sort in true chronological order in any file browser, regardless of which camera produced them.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For example, a folder mixing IMG_0042.jpg from a phone and DSC00871.jpg from a camera will not sort by time. Rename both to the EXIF date and they line up perfectly:
        </p>
        <pre className="text-xs bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded p-4 mb-4 overflow-x-auto leading-relaxed text-gray-800 dark:text-[#D4D4D4]">{`IMG_0042.jpg   ->   2026-05-29-091523.jpg
DSC00871.jpg   ->   2026-05-29-094710.jpg`}</pre>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Neither Windows Explorer nor Mac Finder can do this. The{" "}
          <Link href="/tools/batchname" className="text-[#6366F1] hover:underline">SammaPix Batch Rename tool</Link>{" "}
          reads the EXIF date locally and inserts it for you. If you would rather describe the content of each photo, the{" "}
          <Link href="/tools/ai-rename" className="text-[#6366F1] hover:underline">AI Rename tool</Link> names files by what is in them.
        </p>

        <h2 id="patterns" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Numbering, find-and-replace and case
        </h2>
        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Sequential numbers:</strong> add a counter with padding, like 001, 002. Set the start number to continue an existing series.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Find and replace:</strong> swap a string across every filename, for example turning DSC into a project name, or removing a prefix.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Case:</strong> force lowercase (best for the web, where servers are case-sensitive) or tidy up mixed-case names.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-1.5 list-disc"><strong className="text-gray-800 dark:text-[#E5E5E5]">Fixed text:</strong> a base name that says what the batch is, like product or vacation.</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The power comes from combining them: fixed text, then date, then number, gives you a name that is descriptive, chronological, and collision-proof in one pass.
        </p>

        <h2 id="windows" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 2: Windows (Explorer and PowerRename)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For the simplest case, open File Explorer, select all the files, press <code className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-[#2A2A2A] rounded text-gray-800 dark:text-[#E5E5E5]">F2</code>, type a base name and press Enter. Windows turns them into name (1).jpg, name (2).jpg and so on. It is fast but offers no padding, no date, and no find-and-replace.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For anything more, install <a href="https://learn.microsoft.com/windows/powertoys/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2 decoration-gray-300 dark:decoration-[#444] hover:decoration-gray-700 dark:hover:decoration-[#A3A3A3] transition-colors">Microsoft PowerToys</a> and use PowerRename. Right-click your files, choose PowerRename, and you get search-and-replace with regular expressions, a live preview, and numbering. It still cannot rename by EXIF date, but it covers most text-based renaming.
        </p>

        <h2 id="mac" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 3: Mac (Finder rename)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          macOS has a genuinely good built-in batch renamer. Select the files in Finder, right-click, and choose <strong className="text-gray-800 dark:text-[#E5E5E5]">Rename</strong>. The panel offers three modes: <strong className="text-gray-800 dark:text-[#E5E5E5]">Replace Text</strong> (swap a string), <strong className="text-gray-800 dark:text-[#E5E5E5]">Add Text</strong> (prefix or suffix), and <strong className="text-gray-800 dark:text-[#E5E5E5]">Format</strong> (a base name plus an index or counter). It handles numbering and find-and-replace well. Its one gap is the same as Windows: it cannot read the EXIF capture date, so for date-based photo naming use the browser tool.
        </p>

        <h2 id="scenarios" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Real scenarios: weddings, events, SEO
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Wedding or event photographer:</strong> rename the whole shoot to clientname-date-001 so the gallery is sorted, branded, and easy to deliver. Pair it with the{" "}
          <Link href="/tools/cull" className="text-[#6366F1] hover:underline">culling tool</Link> to drop the rejects first.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Travel library:</strong> rename by EXIF date so years of photos from different cameras and phones merge into one clean timeline.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Publishing online:</strong> descriptive, lowercase, hyphenated filenames help image SEO. blue-summer-dress.jpg tells Google more than IMG_4821.jpg. Rename before you upload, then{" "}
          <Link href="/tools/compress" className="text-[#6366F1] hover:underline">compress</Link> the images so the page loads fast.
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
    </>
  );
}
