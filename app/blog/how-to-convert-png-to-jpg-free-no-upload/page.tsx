import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

export const metadata: Metadata = {
  title: "How to Convert PNG to JPG (Free, No Upload), and When Not To",
  description:
    "Convert PNG to JPG free in your browser with no upload, in bulk. Plus the transparency gotcha to watch for, the built-in Windows and Mac methods, and when you should keep PNG instead. Updated 2026.",
  alternates: { canonical: `${APP_URL}/blog/how-to-convert-png-to-jpg-free-no-upload` },
  keywords: [
    "png to jpg",
    "convert png to jpg",
    "png to jpg free",
    "bulk convert png to jpg",
    "change png to jpg",
    "png to jpg no upload",
    "batch png to jpg",
    "png vs jpg",
  ],
  openGraph: {
    title: "How to Convert PNG to JPG (Free, No Upload), and When Not To",
    description:
      "Convert PNG to JPG free in your browser, in bulk, no upload. The transparency gotcha, Windows and Mac methods, and when to keep PNG. Updated 2026.",
    url: `${APP_URL}/blog/how-to-convert-png-to-jpg-free-no-upload`,
    type: "article",
    publishedTime: "2026-06-30",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Convert PNG to JPG (Free, No Upload)",
    description: "Convert PNG to JPG in your browser, in bulk, no upload. Plus the transparency gotcha. Updated 2026.",
    creator: "@lucasammarco",
  },
};

const POST_DATE = "2026-06-30";
const POST_DATE_FORMATTED = "June 30, 2026";
const POST_URL = `${APP_URL}/blog/how-to-convert-png-to-jpg-free-no-upload`;
const POST_TITLE = "How to Convert PNG to JPG (Free, No Upload)";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "How to convert PNG to JPG free in your browser with no upload, including bulk conversion, the transparency gotcha, the built-in Windows and Mac methods, and when to keep PNG instead.",
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
  keywords: ["png to jpg", "convert png to jpg", "bulk convert png to jpg", "png vs jpg"],
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
      name: "How do I convert PNG to JPG for free without uploading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the SammaPix PNG to JPG converter at sammapix.com/tools/png-to-jpg. Drag your PNG files in, choose a quality, and download the JPGs. It runs entirely in your browser, so your images are never uploaded to a server. You can convert many files at once.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my PNG have a white background after converting to JPG?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JPG does not support transparency. When you convert a PNG with a transparent background, the transparent areas have to be filled with a solid colour, usually white. If you need to keep transparency, do not convert to JPG. Convert to WebP or keep the PNG instead.",
      },
    },
    {
      "@type": "Question",
      name: "Does converting PNG to JPG reduce file size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usually a lot. PNG is lossless, so photos saved as PNG are very large. Converting a photographic PNG to JPG often cuts the size by 70 to 90 percent. For flat graphics, logos, and screenshots the saving is smaller, and PNG may actually be smaller, so it depends on the image.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert many PNGs to JPG at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Drop all the PNGs into the SammaPix converter and they are all converted in one pass, with a single download as a ZIP. Windows and Mac can also batch convert, but the browser tool is the simplest cross-platform option and never uploads your files.",
      },
    },
    {
      "@type": "Question",
      name: "Is PNG or JPG better?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Neither is better overall, they are for different jobs. Use JPG for photographs, where its compression is efficient and the lack of transparency does not matter. Use PNG for logos, icons, screenshots, and anything with text, sharp edges, or transparency, where JPG would look blocky.",
      },
    },
    {
      "@type": "Question",
      name: "Does converting lose quality?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JPG is lossy, so converting always discards some data, but at high quality settings the difference is invisible for photos. The bigger risk is converting a graphic with sharp edges or text to JPG, which creates visible artefacts around the edges. For those images, keep PNG.",
      },
    },
  ],
};

export default function HowToConvertPngToJpgPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="how-to-convert-png-to-jpg-free-no-upload"
        description="Converting PNG to JPG can shrink a file by 90 percent, but it can also wreck a logo. This guide shows the fastest no-upload way to convert PNG to JPG (in bulk), the transparency gotcha to watch for, the built-in Windows and Mac methods, and when you should keep PNG instead."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Performance"]}
        readingTime={9}
        headings={[
          { id: "why-convert", title: "Why convert PNG to JPG (and the cost)" },
          { id: "transparency", title: "The transparency gotcha" },
          { id: "method-online", title: "Method 1: Online, no upload (SammaPix)" },
          { id: "bulk", title: "Convert PNG to JPG in bulk" },
          { id: "windows", title: "Method 2: Windows (Paint & Photos)" },
          { id: "mac", title: "Method 3: Mac (Preview)" },
          { id: "png-vs-jpg", title: "PNG vs JPG: when to use which" },
          { id: "dont-convert", title: "When you should NOT convert" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Converting a photographic PNG to JPG often cuts the file size by 70 to 90 percent.",
          "The fastest no-install way is a browser tool. SammaPix converts PNG to JPG with no upload, in bulk.",
          "Watch the transparency gotcha: a transparent PNG becomes a white background in JPG.",
          "Windows: open in Paint, Save As JPEG. Mac: open in Preview, Export as JPEG.",
          "Keep PNG for logos, icons, screenshots, and anything with text or sharp edges.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80"
              alt="Colorful image files representing PNG and JPG formats"
              className="w-full rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              JPG is smaller, but only right for the right kind of image
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Convert PNG to JPG now, no install
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              The SammaPix PNG to JPG converter runs in your browser. Drop your PNGs, pick a quality, and
              download smaller JPGs, in bulk. Nothing is uploaded to a server.
            </p>
            <Link
              href="/tools/png-to-jpg"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Convert PNG to JPG, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        }
      >
        <h2 id="why-convert" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why convert PNG to JPG (and the cost)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          PNG is a <strong className="text-gray-800 dark:text-[#E5E5E5]">lossless</strong> format: it stores every pixel exactly, which is wonderful for quality but terrible for size when the image is a photo. A photograph saved as PNG can be five to ten times larger than the same photo as JPG. That is why a screenshot of a photo, or an image exported as PNG by accident, balloons your storage and slows down web pages and emails.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          JPG (also written JPEG) is <strong className="text-gray-800 dark:text-[#E5E5E5]">lossy</strong>. It throws away detail the eye barely notices in exchange for dramatically smaller files. For a photographic image, converting PNG to JPG typically cuts the size by 70 to 90 percent with no visible quality loss. The cost is twofold: JPG cannot store transparency, and it is the wrong choice for sharp-edged graphics. Both matter, and we cover them below.
        </p>

        <h2 id="transparency" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The transparency gotcha
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the single thing that surprises people most. PNG supports transparency: a logo can have no background, so it sits cleanly on any colour. JPG has <strong className="text-gray-800 dark:text-[#E5E5E5]">no transparency at all</strong>. When you convert a transparent PNG to JPG, every transparent pixel must be filled with a solid colour, and that colour is almost always white.
        </p>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          So a logo that looked perfect floating on your website suddenly has an ugly white rectangle behind it. If your PNG has a transparent background and you need to keep it, do not convert to JPG. Keep the PNG, or convert to{" "}
          <Link href="/tools/webp" className="text-[#6366F1] hover:underline">WebP</Link>, which is smaller than PNG and keeps transparency. Convert to JPG only when a solid background is fine, such as a full-frame photo that has no transparency to begin with.
        </p>

        <h2 id="method-online" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 1: Online, no upload (SammaPix)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The{" "}
          <Link href="/tools/png-to-jpg" className="text-[#6366F1] hover:underline">SammaPix PNG to JPG converter</Link>{" "}
          does the conversion in your browser using the Canvas API. Nothing is uploaded, which keeps private images private and means it works the same on any device, including a Chromebook or a locked-down work laptop.
        </p>
        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Open sammapix.com/tools/png-to-jpg</strong> in any browser.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Drop your PNG files</strong> onto the page, one or many.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Choose a quality</strong> if you want, then convert.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal"><strong className="text-gray-800 dark:text-[#E5E5E5]">Download</strong> the JPGs individually or as a ZIP.</li>
        </ol>

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Convert PNG to JPG in seconds</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">Drop your PNGs, pick a quality, download smaller JPGs. In bulk, 100% in your browser, nothing uploaded.</p>
          <Link href="/tools/png-to-jpg" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Open the PNG to JPG Converter, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <h2 id="bulk" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Convert PNG to JPG in bulk
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Converting one image is easy anywhere. The pain is a folder of fifty PNGs. The browser tool handles the whole batch in one pass: drop them all in, convert, and download a single ZIP. Because it runs locally, there is no per-file upload wait and no daily limit to bump into. If you also want to shrink the JPGs further afterwards, send them through the{" "}
          <Link href="/tools/compress" className="text-[#6366F1] hover:underline">Image Compressor</Link>.
        </p>

        <h2 id="windows" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 2: Windows (Paint and Photos)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a single file with no extra tools, open the PNG in <strong className="text-gray-800 dark:text-[#E5E5E5]">Paint</strong>, click File, then Save As, then JPEG picture. Paint fills any transparency with white. The Photos app can also export, but Paint is the quickest. Windows has no simple built-in way to batch convert a whole folder to JPG, which is where the browser tool wins.
        </p>

        <h2 id="mac" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Method 3: Mac (Preview)
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          On a Mac, open the PNG in <strong className="text-gray-800 dark:text-[#E5E5E5]">Preview</strong>, choose File, then Export, and pick JPEG from the Format menu. A quality slider lets you trade size for fidelity. Preview can also convert several at once: select multiple PNGs in Finder, open them together in Preview, select all in the sidebar, and Export. As always, transparency becomes white.
        </p>

        <h2 id="png-vs-jpg" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          PNG vs JPG: when to use which
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Use case</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Best format</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Why</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Photographs</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">JPG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Much smaller, no visible loss</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Logos, icons</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">PNG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Transparency, sharp edges</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Screenshots with text</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">PNG</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Crisp text, no artefacts</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Web photo, smallest size</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">WebP or AVIF</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Smaller than JPG, keeps transparency</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="dont-convert" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          When you should NOT convert
        </h2>
        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Skip the conversion if the image is a logo, an icon, a screenshot with text, or any graphic with hard edges and flat colour. JPG compression smears these with visible halos and blocks, and you lose any transparency. In those cases, if the PNG is too big, the right move is not JPG. Either keep the PNG, or convert to{" "}
          <Link href="/tools/webp" className="text-[#6366F1] hover:underline">WebP</Link>, which is smaller and keeps transparency and crispness. For photos, JPG is the right call, and you can shrink it even more with the{" "}
          <Link href="/tools/compress" className="text-[#6366F1] hover:underline">Image Compressor</Link>.
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
