import React from "react";
import type { Metadata } from "next";
import { ArrowLeft, Code, Shield, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import ImageToBase64Client from "@/components/tools/ImageToBase64Client";
import ImageToBase64HeroDemo from "@/components/tools/ImageToBase64HeroDemo";
import HowToUse from "@/components/tools/HowToUse";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

const TOOL_URL = `${APP_URL}/tools/image-to-base64`;

export const metadata: Metadata = {
  title: "Image to Base64 Online Free: No Upload",
  description:
    "Convert any image to a Base64 / Data URI string instantly. Also decode Base64 back to an image. No upload, no account. Works in your browser.",
  keywords: [
    "image to base64",
    "base64 to image",
    "image to data uri",
    "encode image base64",
    "base64 image converter",
    "embed image css",
    "embed image html",
    "inline image base64",
    "base64 encode png",
    "base64 encode jpg",
    "data uri generator",
    "base64 decoder online",
    "image to base64 no upload",
    "convert image base64 free",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Image to Base64 Online Free — No Upload",
    description:
      "Convert any image to a Base64 Data URI — or decode Base64 back to an image. Copy as CSS, HTML or plain string. 100% private, no upload.",
    url: TOOL_URL,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix Image to Base64 Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to Base64 Online Free — No Upload",
    description:
      "Encode any image to a Base64 Data URI or decode Base64 back to an image. No upload, no account.",
  },
};

const features = [
  {
    icon: <Code className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "4 output formats",
    description:
      "Copy as a full Data URI (data:image/…), a plain base64 string (no prefix), a CSS background-image rule, or a ready-to-paste HTML <img> tag. One click to switch format.",
  },
  {
    icon: <Shield className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Fully private, no upload",
    description:
      "All encoding and decoding runs in your browser using native FileReader and the Clipboard API. Your images never touch a server.",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />,
    title: "Two-way conversion",
    description:
      "Switch to Base64 to Image mode and paste any base64 string or Data URI to preview the image instantly and download it as a file.",
  },
];

export default function ImageToBase64Page() {
  return (
    <main>
      <MetaViewContent contentName="Image to Base64" contentId="image-to-base64" />

      {/* Hero split layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 pb-6">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-center">
          {/* Left: copy */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{ backgroundColor: "#6366F115", border: "1px solid #6366F130" }}
                aria-hidden="true"
              >
                <Code className="h-4 w-4" style={{ color: "#6366F1" }} strokeWidth={1.5} />
              </div>
              <h1 className="text-xl sm:text-[26px] font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight leading-tight">
                Image to Base64. Free, No Upload
              </h1>
            </div>

            <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3">
              Encode any image to a{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">Base64 / Data URI string</strong>{" "}
              — ready to paste into CSS, HTML, JSON or email. Or switch to decode mode and convert a
              base64 string back to an image.{" "}
              <strong className="text-[#171717] dark:text-[#E5E5E5]">No upload required</strong> —
              everything runs in your browser.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#525252] dark:text-[#A3A3A3]">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Data URI, CSS, HTML output
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                Decode base64 to image
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                No account, no upload
              </span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#16A34A]" strokeWidth={2} />
                100% private
              </span>
            </div>
          </div>

          {/* Right: hero demo */}
          <div className="max-w-[460px] w-full mx-auto lg:mx-0 lg:ml-auto">
            <ImageToBase64HeroDemo />
          </div>
        </div>
      </section>

      {/* Tool */}
      <ImageToBase64Client />

      {/* How to use */}
      <HowToUse
        toolName="Image to Base64"
        steps={[
          {
            title: "Drop or select an image",
            desc: "Drag and drop any JPG, PNG, WebP, SVG or other image file onto the upload area (max 10 MB). No upload — the file stays on your device.",
          },
          {
            title: "Choose output format",
            desc: "Select from four formats: full Data URI, plain base64 string, CSS background-image rule, or an HTML <img> tag. The textarea updates instantly.",
          },
          {
            title: "Copy and use",
            desc: "Click Copy to send the string to your clipboard. Paste it directly into your CSS file, HTML template, API payload or email client.",
          },
        ]}
        proTip={{
          text: "Use the Base64 to Image tab to verify a base64 string you received from an API or email before embedding it.",
          linkLabel: "Try SVG to PNG",
          linkHref: "/tools/svg-to-png",
        }}
      />

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why convert images to Base64 in the browser?
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

      {/* SEO content */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            When do developers use Base64 for images?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Base64 encoding turns binary image data into a plain text string that can travel safely
            inside JSON payloads, HTML attributes, CSS files or email templates. Common uses include
            inlining small icons to eliminate a network request, embedding images in HTML emails
            where external URLs are blocked, or passing images through APIs that only accept text.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            A Data URI wraps the base64 string with a MIME type prefix such as{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 rounded font-mono">
              data:image/png;base64,
            </code>{" "}
            so browsers and apps know how to interpret the bytes. You can paste a Data URI directly
            into an{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 rounded font-mono">
              &lt;img src&gt;
            </code>{" "}
            attribute or a CSS{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 rounded font-mono">
              background-image
            </code>{" "}
            property without any additional file hosting.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Why is a base64 string 33% larger than the original file?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Base64 maps every 3 bytes of binary data to 4 ASCII characters (6 bits per character).
            That means 3 bytes become 4 characters, increasing the data volume by roughly one third.
            For small icons (under a few kilobytes) the overhead is negligible. For large photos,
            consider using a normal{" "}
            <Link href="/tools/compress" className="underline hover:text-[#525252]">
              compressed image
            </Link>{" "}
            served from a CDN instead.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            How does the Base64 to Image decoder work?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Paste any valid base64 string or full Data URI into the decode tab and click Preview.
            The tool normalizes the input — if you provide a plain base64 string without a prefix it
            assumes{" "}
            <code className="text-xs bg-[#F5F5F5] dark:bg-[#252525] px-1 rounded font-mono">
              image/png
            </code>{" "}
            — then renders the image directly in the browser. If the string is invalid, a clear
            error is shown. Once previewed, click Download to save the image as a file.
          </p>
          <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            Which image formats are supported?
          </h3>
          <p className="text-sm text-[#737373] leading-relaxed">
            Any format your browser can read: JPG, PNG, WebP, GIF, AVIF, BMP, and SVG. The base64
            output preserves the original format&apos;s MIME type in the Data URI prefix, so
            downstream decoders know exactly what type of image to expect.
          </p>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-8 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
            After encoding, you may want to{" "}
            <Link
              href="/tools/compress"
              className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]"
            >
              compress your image first
            </Link>{" "}
            to reduce the base64 string size,{" "}
            <Link
              href="/tools/svg-to-png"
              className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]"
            >
              convert an SVG to PNG
            </Link>{" "}
            before encoding, or use the{" "}
            <Link
              href="/tools/ico-generator"
              className="underline hover:text-[#525252] dark:hover:text-[#E5E5E5]"
            >
              Favicon Generator
            </Link>{" "}
            to create multi-size .ico files for your site.
          </p>
        </div>
      </section>

      <RelatedTools toolId="image-to-base64" />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Convert an Image to Base64 Online for Free",
            description:
              "Encode any image to a Base64 Data URI string in your browser with SammaPix. No upload required.",
            totalTime: "PT1M",
            tool: {
              "@type": "SoftwareApplication",
              name: "SammaPix Image to Base64",
              url: TOOL_URL,
            },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Drop or select your image",
                text: "Drag and drop any JPG, PNG, WebP, SVG or other image file onto the upload area (max 10 MB). No upload — everything stays in your browser.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Choose your output format",
                text: "Select from Data URI, plain base64, CSS background-image, or HTML img tag. The string updates instantly in the textarea.",
                url: TOOL_URL,
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Copy and use",
                text: "Click Copy to send the string to your clipboard. Paste it into CSS, HTML, JSON or your API payload.",
                url: TOOL_URL,
              },
            ],
          }),
        }}
      />

      {/* SoftwareApplication + FAQPage + BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix Image to Base64",
                description:
                  "Convert any image to a Base64 Data URI string — or decode Base64 back to an image. No upload, 100% browser-based.",
                url: TOOL_URL,
                applicationCategory: "DeveloperApplication",
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
                  url: APP_URL,
                },
                featureList: [
                  "Encode any image to Base64 Data URI",
                  "Output as plain base64, CSS background-image or HTML img tag",
                  "Decode base64 string back to image with preview",
                  "Download decoded image as file",
                  "Shows string size with large-file warning",
                  "Supports JPG, PNG, WebP, GIF, SVG, BMP and AVIF",
                  "Client-side only — files never leave your browser",
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Is this base64 converter free?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes, completely free. No signup, no watermark, no upload. There are no limits on the number of images you can encode.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are my images uploaded to a server?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. All processing happens in your browser using native FileReader and Clipboard APIs. Your images never leave your device.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is the difference between a Data URI and plain base64?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A Data URI includes the MIME type prefix (data:image/png;base64,) so it can be used directly in HTML and CSS. Plain base64 is just the encoded bytes without a prefix, useful for APIs or JSON payloads where you set the content type separately.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do I embed a base64 image in CSS?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Select the CSS output format in this tool. The string is formatted as background-image: url('data:image/...;base64,...'); ready to paste into your stylesheet.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Why is the base64 string so much larger than my image?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Base64 encoding maps 3 binary bytes to 4 ASCII characters, increasing data size by approximately 33%. For large photos this overhead is significant. Base64 is best for small icons and thumbnails. For large images, host the file and link to it instead.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do I convert base64 back to an image?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Switch to the Base64 to Image tab, paste your base64 string or full Data URI, and click Preview Image. The decoded image is shown in the browser. Click Download Image to save it as a file.",
                    },
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
                    item: APP_URL,
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
                    name: "Image to Base64",
                    item: TOOL_URL,
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
