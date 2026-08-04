import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Convert WebP to JPG (Free, No Upload), and Why Your Downloads Are WebP",
  description:
    "Saved an image and got a .webp file your software will not open? Here is how to convert WebP to JPG free in your browser, in bulk, with no upload. Plus the Photoshop and Mac methods, the transparency catch, and why everything you download is WebP now. Updated 2026.",
  alternates: { canonical: `${APP_URL}/blog/how-to-convert-webp-to-jpg-free-no-upload` },
  keywords: [
    "webp to jpg",
    "convert webp to jpg",
    "webp to jpg free",
    "convert webp to jpg photoshop",
    "webp to jpg mac",
    "webp to jpg transparent",
    "webp to jpg no upload",
    "why are my downloads webp",
  ],
  openGraph: {
    title: "How to Convert WebP to JPG (Free, No Upload), and Why Your Downloads Are WebP",
    description:
      "Convert WebP to JPG free in your browser, in bulk, no upload. The Photoshop and Mac methods, the transparency catch, and why your downloads are WebP. Updated 2026.",
    url: `${APP_URL}/blog/how-to-convert-webp-to-jpg-free-no-upload`,
    type: "article",
    publishedTime: "2026-06-30",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Convert WebP to JPG (Free, No Upload)",
    description: "Convert WebP to JPG in your browser, in bulk, no upload. Plus the Photoshop method and why your downloads are WebP. Updated 2026.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-06-30";
const POST_DATE_FORMATTED = "June 30, 2026";
const POST_URL = `${APP_URL}/blog/how-to-convert-webp-to-jpg-free-no-upload`;
const POST_TITLE = "How to Convert WebP to JPG (Free, No Upload)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "How to convert WebP to JPG free in your browser with no upload, including bulk conversion, the Photoshop and Mac methods, the transparency catch, and why everything you download is WebP now.",
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
  keywords: ["webp to jpg", "convert webp to jpg", "webp to jpg photoshop", "why are my downloads webp"],
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
      name: "Why are the images I download saved as WebP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most large websites now serve images in WebP because it is smaller than JPG and PNG, which makes pages load faster. Chrome, Android, and Google sites lead this. So when you right-click and save, you get the WebP your browser was handed, even though you expected a JPG.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert WebP to JPG for free without uploading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the SammaPix WebP to JPG converter at sammapix.com/tools/webp-to-jpg. Drop your WebP files in, and download JPGs. It runs entirely in your browser, so nothing is uploaded to a server, and you can convert many files at once.",
      },
    },
    {
      "@type": "Question",
      name: "Why will Photoshop not open my WebP file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Older Photoshop versions do not read WebP without a plugin. Photoshop 23.2 from 2022 and later open WebP natively. If yours is older, the fastest fix is to convert the WebP to JPG first in your browser, then open the JPG normally.",
      },
    },
    {
      "@type": "Question",
      name: "What happens to a transparent WebP when I convert it to JPG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WebP can store transparency, but JPG cannot. When you convert a transparent WebP to JPG, the transparent areas are filled with a solid colour, usually white. If you need to keep transparency, convert to PNG instead, or keep the WebP.",
      },
    },
    {
      "@type": "Question",
      name: "Does converting WebP to JPG lose quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both WebP and JPG are lossy, so a tiny amount of data is discarded, but at a high quality setting the difference is invisible for photos. You are not going back to the original, you are making a usable, universally compatible copy, which is normally what you need.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert many WebP files to JPG at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Drop all the WebP files into the SammaPix converter and they are converted in one pass, with a single ZIP download. Because it runs locally in your browser, there is no per-file upload wait and no daily cap.",
      },
    },
  ],
};

export default function HowToConvertWebpToJpgPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-convert-webp-to-jpg-free-no-upload"
        description="You saved an image and got a .webp file that Photoshop will not open and your client cannot use. This guide shows the fastest no-upload way to convert WebP to JPG (in bulk), why your downloads are WebP in the first place, the Photoshop and Mac methods, and the transparency catch to watch for."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Performance"]}
        readingTime={9}
        headings={[
          { id: "why-webp", title: "Why your downloads are WebP now" },
          { id: "method-online", title: "Method 1: Online, no upload (SammaPix)" },
          { id: "transparency", title: "The transparency catch" },
          { id: "photoshop", title: "Method 2: Photoshop" },
          { id: "mac-windows", title: "Method 3: Mac and Windows" },
          { id: "bulk", title: "Convert WebP to JPG in bulk" },
          { id: "keep-webp", title: "When you should keep WebP" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most big sites now serve WebP because it is smaller, so your saved images arrive as .webp.",
          "The fastest fix is a browser converter. SammaPix converts WebP to JPG with no upload, in bulk.",
          "Old Photoshop needs version 23.2 or later, or a plugin, to open WebP. Converting first is quicker.",
          "Watch the transparency catch: a transparent WebP becomes a white background in JPG.",
          "Keep WebP when the image is for your own website, where smaller and faster is the goal.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
              alt="A laptop with image files being downloaded and converted"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              WebP loads fast on the web, but you often need a plain JPG to actually use it
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Convert WebP to JPG now, no install
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              The SammaPix WebP to JPG converter runs in your browser. Drop your .webp files and download
              usable JPGs, in bulk. Nothing is uploaded to a server.
            </p>
            <Link
              href="/tools/webp-to-jpg"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Convert WebP to JPG, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >

        {/* ── Quick Answer ──────────────────────────────────────────────── */}
        <div className="mb-8 p-4 bg-gray-50 dark:bg-[#1E1E1E] border-l-4 border-[#6366F1] rounded-r-md">
          <p className="text-xs font-semibold text-[#6366F1] mb-1.5 uppercase tracking-wide">
            Quick Answer
          </p>
          <p className="text-sm text-gray-700 dark:text-[#A3A3A3] leading-relaxed">
            To convert WebP to JPG free without uploading, use{" "}
            <Link href="/tools/webp-to-jpg" className="text-gray-900 dark:text-[#E5E5E5] underline underline-offset-2">
              SammaPix WebP to JPG
            </Link>
            : drop the .webp file in your browser and download a JPG instantly — conversion runs locally, no file leaves your device. WebP is a modern format (25-35% smaller than JPG) used by Google and most CDNs, which is why downloaded images often end in .webp instead of .jpg and refuse to open in older software.
          </p>
        </div>

        <h2 id="why-webp" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why your downloads are WebP now
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You right-clicked an image, hit Save, and expected a JPG. Instead you got a file ending in <strong className="text-gray-800 dark:text-[#E5E5E5]">.webp</strong> that your usual software refuses to open. You did nothing wrong. WebP is a modern image format Google created to be smaller than JPG and PNG, typically 25 to 35 percent smaller at the same quality. That makes web pages load faster, so most large sites, especially Google properties and anything served through a modern CDN, now hand your browser WebP instead of JPG.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Great for page speed, annoying for you. You cannot drop a WebP into an old version of Photoshop, some print services reject it, certain CMS uploads choke on it, and a colleague on older software just sees a broken file. The fix is simple: convert it to JPG, the format every piece of software on earth understands.
        </p>

        <h2 id="method-online" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 1: Online, no upload (SammaPix)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The{" "}
          <Link href="/tools/webp-to-jpg" className="text-[#6366F1] hover:underline">SammaPix WebP to JPG converter</Link>{" "}
          does the whole job in your browser. The image never leaves your device, which matters when it is a private photo or client work, and it means the tool works the same on any machine, including a locked-down work laptop or a Chromebook.
        </p>
        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Open sammapix.com/tools/webp-to-jpg</strong> in any browser.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your .webp files</strong> onto the page, one or many.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Convert</strong>, which happens instantly on your device.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Download</strong> the JPGs individually or as a ZIP.</li>
        </ol>

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Turn that .webp into a usable JPG</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">Drop your WebP files, download JPGs. In bulk, 100% in your browser, nothing uploaded.</p>
          <Link href="/tools/webp-to-jpg" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Open the WebP to JPG Converter, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <h2 id="transparency" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The transparency catch
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          WebP, like PNG, can have a transparent background. JPG cannot. So if your WebP is a logo or a cut-out with no background, converting to JPG fills the transparent area with a solid colour, almost always white, and you get a white box behind the graphic.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For ordinary photos this never matters, because they have no transparency. But if you need to preserve a transparent background, do not convert to JPG. Convert the WebP to{" "}
          <Link href="/tools/webp-to-png" className="text-[#6366F1] hover:underline">PNG</Link>{" "}
          instead, which keeps transparency, and use JPG only when a solid background is fine.
        </p>

        <h2 id="photoshop" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 2: Photoshop
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A lot of people search for &quot;convert WebP to JPG Photoshop&quot; because Photoshop threw an error opening the file. Here is the situation: <strong className="text-gray-800 dark:text-[#E5E5E5]">Photoshop 23.2 (2022) and newer open WebP natively</strong>, so you can just open the WebP and choose File, then Save As or Export As, then JPEG. If your Photoshop is older, it needs the WebPShop plugin installed first, which is fiddly. When you only need the JPG and not a full edit, it is genuinely faster to convert the WebP to JPG in your browser and open the JPG normally.
        </p>

        <h2 id="mac-windows" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 3: Mac and Windows
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          On a <strong className="text-gray-800 dark:text-[#E5E5E5]">Mac</strong>, open the WebP in Preview, choose File, then Export, and pick JPEG from the Format menu. Preview can also handle several at once: select the files in Finder, open them together, select all in the sidebar, and Export.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          On <strong className="text-gray-800 dark:text-[#E5E5E5]">Windows</strong>, recent versions of Paint and the Photos app can open a WebP and Save As or export to JPEG. Neither offers a clean way to batch a whole folder, which is where the browser tool wins, since it converts the entire set in one pass without uploading anything.
        </p>

        <h2 id="bulk" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Convert WebP to JPG in bulk
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Converting one file is easy anywhere. A folder of fifty WebP images is the real pain. Drop the whole batch into the browser tool, convert, and download a single ZIP. Because everything runs locally, there is no per-file upload wait and no daily limit. If the resulting JPGs are still larger than you want, run them through the{" "}
          <Link href="/tools/compress" className="text-[#6366F1] hover:underline">Image Compressor</Link>{" "}
          afterwards.
        </p>

        <h2 id="keep-webp" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When you should keep WebP
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Converting to JPG is about compatibility, not quality, so do not convert out of habit. If the image is destined for your own website, keep it as WebP, or even convert your JPGs and PNGs <em>to</em> WebP, because smaller files mean faster pages and better Core Web Vitals. Every modern browser displays WebP. You only need JPG when something downstream cannot read WebP: old software, a print service, a strict upload form, or a colleague on older tools. For everything else, see when each format wins in our guide to the{" "}
          <Link href="/blog/best-image-format-for-web-2026" className="text-[#6366F1] hover:underline">best image format for the web</Link>.
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
