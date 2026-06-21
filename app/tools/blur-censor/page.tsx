import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  EyeOff,
  ShieldCheck,
  Droplets,
  CheckCircle2,
  Grid2x2,
  Square,
} from "lucide-react";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import MetaViewContent from "@/components/tracking/MetaViewContent";
import { APP_URL } from "@/lib/constants";
// Client wrapper renders the editor + next-step suggestions, keeping this page
// a Server Component (the editor + ssr:false suggestions live client-side).
import BlurCensorClientWrap from "@/components/tools/BlurCensorClientWrap";
import BlurCensorHeroDemo from "@/components/tools/BlurCensorHeroDemo";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Blur & Censor Photos Online Free, No Upload (Faces, Plates, Data)",
  description:
    "Blur faces, censor images and hide sensitive info free. Blur a license plate, redact text, pixelate or block any region. Runs 100% in your browser · no upload · no signup · privacy-first.",
  keywords: [
    "blur faces online",
    "censor image",
    "blur license plate",
    "hide sensitive info photo",
    "redact image",
    "pixelate photo",
    "blur image online free",
    "blur part of image",
    "blur faces in photo",
    "censor photo no upload",
    "blur personal data image",
    "black out text in image",
    "pixelate face online",
    "blur image privacy",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/blur-censor`,
  },
  openGraph: {
    title: "Blur & Censor Photos Online Free, No Upload (Faces, Plates, Data)",
    description:
      "Blur faces, censor images and hide sensitive info free. Pixelate or black out any region. Runs 100% in your browser · no upload · no signup · privacy-first.",
    url: `${APP_URL}/tools/blur-censor`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Blur & Censor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blur & Censor Photos Online Free, No Upload (Faces, Plates, Data)",
    description:
      "Blur faces, censor images and hide sensitive info free. Pixelate or black out any region. 100% in your browser · no upload · no signup.",
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
      "Your image never leaves your device. Every blur, pixel and block is rendered locally with the Canvas API. Nothing is uploaded, stored or seen by SammaPix or anyone else.",
  },
  {
    icon: (
      <Droplets
        className="h-5 w-5 text-gray-700 dark:text-gray-400"
        strokeWidth={1.5}
      />
    ),
    title: "Blur, pixelate or block",
    description:
      "Pick the censor style per job: a soft Gaussian blur, a mosaic pixelation, or a solid black or white block. An intensity slider controls how strong the effect is.",
  },
  {
    icon: (
      <EyeOff
        className="h-5 w-5 text-gray-700 dark:text-gray-400"
        strokeWidth={1.5}
      />
    ),
    title: "Permanently destroyed",
    description:
      "The censored pixels are baked into the exported file, not laid over it as an overlay. The original data is genuinely gone, so it cannot be recovered from the download.",
  },
];

const faqs = [
  {
    q: "Is it really private? Does my image get uploaded?",
    a: "No upload happens. The entire tool runs inside your browser using the Canvas API. Your image is read from disk into browser memory, censored locally, and saved straight back to your disk. No bytes travel over the network, so neither SammaPix nor anyone else ever sees your photo. You can even disconnect from the internet after the page loads and the tool still works.",
  },
  {
    q: "Can someone un-blur or recover the hidden parts later?",
    a: "No. Unlike a CSS overlay or a separate mask layer, this tool destroys the underlying pixels in the actual exported bitmap. The blur, pixelation or block is rendered directly into the image data before the file is saved, so there is no hidden original to recover. For a solid block the area becomes a flat fill; for blur and pixelate the source detail is downscaled away. Use a strong setting or a black block for the most sensitive data.",
  },
  {
    q: "What is the difference between blur, pixelate and block?",
    a: "Blur smears the region with a soft Gaussian effect, useful for faces where you still want a natural look. Pixelate replaces the region with large mosaic squares, a familiar TV-style censor that reads clearly as redaction. Block fills the region with a solid color (black or white), the strongest and most unambiguous option for text, IBANs, addresses or document numbers.",
  },
  {
    q: "Does it work on a phone?",
    a: "Yes. The editor supports touch, so you can drag rectangles over faces, plates or text directly on a phone or tablet screen. Very large images may use more memory on mobile, but typical photos from a phone camera work smoothly.",
  },
  {
    q: "Is it free?",
    a: "Yes, fully free. There is no signup, no watermark and no limit on how many images you censor. Because everything runs in your browser, there are no server costs to pass on, so the tool stays free.",
  },
  {
    q: "Can I use it to blur faces and license plates?",
    a: "Yes. Blurring or pixelating faces and license plates are the two most common uses. Drag a rectangle over each face or plate, choose blur or pixelate, set the intensity, and download. For documents you can use the block mode to black out names, numbers and addresses before sharing.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BlurCensorPage() {
  return (
    <main>
      <MetaViewContent contentName="Blur & Censor" contentId="blur-censor" />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-center">
          {/* ── LEFT: Title + copy + trust badges ── */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#47556915", border: "1px solid #47556930" }}
                aria-hidden="true"
              >
                <EyeOff
                  className="h-4 w-4"
                  style={{ color: "#475569" }}
                  strokeWidth={1.5}
                />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Blur &amp; Censor Image
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Hide{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">
                faces, license plates and sensitive data
              </strong>{" "}
              in any photo. Draw a box over a region, then{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">
                blur, pixelate or black it out
              </strong>
              . Everything runs in your browser, so your image never leaves your
              device: no upload, no signup, no trace.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Blur · pixelate · block
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Faces · plates · text
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Pixels truly destroyed
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% private · no upload
              </span>
            </div>
          </div>

          {/* ── RIGHT: Auto-cycling censor demo ── */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <BlurCensorHeroDemo />
          </div>
        </div>
      </section>

      {/* Tool + next-step suggestions (client subtree) */}
      <BlurCensorClientWrap />

      {/* How to use */}
      <HowToUse
        toolName="Blur & Censor"
        steps={[
          {
            title: "Open your image",
            desc: "Drag and drop a JPG, PNG or WebP onto the editor, or click to browse. The image is loaded into the browser only · nothing is uploaded anywhere.",
          },
          {
            title: "Draw over what you want to hide",
            desc: "Drag a rectangle over each face, license plate or piece of sensitive text. Add as many regions as you need, and remove any with one click or undo the last.",
          },
          {
            title: "Choose blur, pixelate or block, then download",
            desc: "Pick a censor style and set the intensity. Hit download to save a JPG or PNG with the regions permanently censored into the pixels.",
          },
        ]}
        proTip={{
          text: "Need to scrub hidden GPS coordinates and camera info too? Strip the EXIF metadata after censoring so the file shares nothing extra.",
          linkLabel: "Remove EXIF data",
          linkHref: "/tools/exif",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why censor images with SammaPix?
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

      {/* Censor styles explainer */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Blur vs pixelate vs block
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="px-4 py-4 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-4 w-4 text-[#475569]" strokeWidth={1.5} />
                <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                  Blur
                </span>
              </div>
              <p className="text-xs text-[#737373] leading-relaxed">
                A soft, natural-looking smear. Ideal for faces in candid photos
                where you want to hide identity without an obvious black box.
              </p>
            </div>
            <div className="px-4 py-4 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
              <div className="flex items-center gap-2 mb-2">
                <Grid2x2 className="h-4 w-4 text-[#475569]" strokeWidth={1.5} />
                <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                  Pixelate
                </span>
              </div>
              <p className="text-xs text-[#737373] leading-relaxed">
                A mosaic of large squares, the classic TV-style censor. Reads
                clearly as redaction and works well for faces and plates alike.
              </p>
            </div>
            <div className="px-4 py-4 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#1A1A1A]">
              <div className="flex items-center gap-2 mb-2">
                <Square className="h-4 w-4 text-[#475569]" strokeWidth={1.5} />
                <span className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
                  Block
                </span>
              </div>
              <p className="text-xs text-[#737373] leading-relaxed">
                A solid black or white rectangle. The strongest option, best for
                text, IBANs, addresses and document numbers you must fully hide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Long-form SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            How to blur a face or license plate in a photo
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Whether you are posting a street photo, a car listing, a screenshot or
            a document, there is almost always something you should hide before it
            goes public: a stranger&apos;s face, a number plate, a home address, a
            bank detail. The SammaPix Blur &amp; Censor tool lets you drag a box
            over each of those regions and censor them with a blur, a pixelation or
            a solid block, then download the result in seconds.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            The key difference from many online blur tools is that nothing is
            uploaded. People censoring sensitive images, by definition, do not want
            to hand those images to a server. SammaPix runs everything in your
            browser with the Canvas API, so the photo is read locally, edited
            locally, and saved locally. No account, no upload, no copy left behind.
          </p>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3 mt-6">
            Why a real, destructive censor matters
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            A surprising number of redaction methods are reversible. Drawing a
            semi-transparent shape, lowering opacity, or laying a mask in a tool
            that keeps layers can all leave the original pixels intact underneath.
            SammaPix avoids this entirely: when you download, the blur, pixelation
            or block is rendered directly into the image bitmap before the file is
            written. There is no separate layer and no hidden original, so the
            censored area cannot be peeled back.
          </p>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Common uses
          </h3>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-[#475569] mt-0.5"> · </span>
              Blur bystanders&apos; faces before posting street or event photos
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#475569] mt-0.5"> · </span>
              Hide license plates in a car sale listing or an accident photo
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#475569] mt-0.5"> · </span>
              Black out names, IBANs and addresses on a document screenshot
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#475569] mt-0.5"> · </span>
              Redact private messages, emails or order numbers in a screenshot
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#475569] mt-0.5"> · </span>
              Pixelate a child&apos;s face before sharing a family photo online
            </li>
          </ul>

          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Censor first, then strip metadata
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Censoring the visible content is half the job. Photos also carry EXIF
            metadata, which can include the GPS coordinates where a shot was taken
            and the device that took it. After you blur or block the sensitive
            regions, run the file through the EXIF remover to scrub that hidden data
            so the image you share gives away nothing at all.
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

      <RelatedTools toolId="blur-censor" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix Blur & Censor",
                url: `${APP_URL}/tools/blur-censor`,
                description:
                  "Free online tool to blur faces, censor images and hide sensitive info. Blur a license plate, redact text, pixelate or block any region, entirely in your browser. No upload, no signup.",
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
                  "Blur faces and license plates",
                  "Pixelate or black out any region",
                  "Draw multiple censor regions",
                  "Adjustable intensity",
                  "Pixels permanently destroyed in export",
                  "100% browser-based · no upload",
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
                name: "How to blur or censor an image online",
                description:
                  "Blur faces, censor license plates and hide sensitive data in a photo free using SammaPix. Runs entirely in your browser · no upload required.",
                totalTime: "PT1M",
                tool: {
                  "@type": "SoftwareApplication",
                  name: "SammaPix Blur & Censor",
                  url: `${APP_URL}/tools/blur-censor`,
                },
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Open your image",
                    text: "Drag and drop a JPG, PNG or WebP onto the editor, or click to browse. The image stays in your browser and is never uploaded.",
                    url: `${APP_URL}/tools/blur-censor`,
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Draw over sensitive regions",
                    text: "Drag a rectangle over each face, license plate or piece of sensitive text. Add multiple regions and remove any you do not want.",
                    url: `${APP_URL}/tools/blur-censor`,
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Choose a censor style and download",
                    text: "Pick blur, pixelate or block, adjust the intensity, then download a JPG or PNG with the regions permanently censored.",
                    url: `${APP_URL}/tools/blur-censor`,
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
                    name: "Blur & Censor",
                    item: `${APP_URL}/tools/blur-censor`,
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
