import React from "react";
import type { Metadata } from "next";
import {
  ArrowLeft,
  FileText,
  Upload,
  Copy,
  CheckCircle2,
  Shield,
  Globe,
  Sparkles,
  Camera,
  ScanText,
  FileImage,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import ImageToTextClient from "@/components/tools/ImageToTextClient";
import RelatedTools from "@/components/tools/RelatedTools";
import { APP_URL } from "@/lib/constants";
import MetaViewContent from "@/components/tracking/MetaViewContent";

export const metadata: Metadata = {
  title: "Free Image to Text Converter (OCR) Online — Extract Text Instantly",
  description:
    "Convert images to text with AI-powered OCR. Extract text from photos, screenshots, documents, and scanned papers. Free, instant, no signup.",
  keywords: [
    "image to text converter",
    "image to text",
    "ocr online free",
    "extract text from image",
    "photo to text converter",
    "screenshot to text",
    "picture to text",
    "text recognition online",
    "ocr converter free",
    "scan to text online",
    "image text extractor",
    "copy text from image",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/image-to-text`,
  },
  openGraph: {
    title: "Free Image to Text Converter (OCR) Online — Extract Text Instantly",
    description:
      "Convert images to text with AI-powered OCR. Extract text from photos, screenshots, documents, and scanned papers. Free, instant, no signup.",
    url: `${APP_URL}/tools/image-to-text`,
    siteName: "SammaPix",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SammaPix — Free Image to Text Converter (OCR)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image to Text Converter (OCR) Online — Extract Text Instantly",
    description:
      "Convert images to text with AI-powered OCR. Extract text from photos, screenshots, documents, and scanned papers. Free, instant, no signup.",
  },
};

/* ------------------------------------------------------------------ */
/*  FAQ data (used in both UI and JSON-LD)                            */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "How do I extract text from an image?",
    answer:
      "Upload any image containing text to SammaPix. Our AI-powered OCR engine analyses every pixel of your image, detects text regions, and converts them into editable, copy-paste-ready text. The entire process takes just a few seconds. Simply drag and drop your image, wait for the AI to process it, and copy or download the extracted text.",
  },
  {
    question: "Is image to text conversion accurate?",
    answer:
      "SammaPix uses Google Gemini, one of the most advanced AI models available, for text recognition. Accuracy depends on the quality of the source image: clear, high-resolution images with printed text yield near-perfect results. Low-resolution photos, unusual fonts, or heavy background noise may reduce accuracy. For best results, ensure your image is well-lit and the text is in focus.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "SammaPix accepts all major image formats including JPG/JPEG, PNG, WebP, HEIC (iPhone photos), GIF, BMP, and TIFF. You can also extract text from screenshots taken on any device, scanned documents saved as images, and photos of printed text or signs.",
  },
  {
    question: "Can I extract text from handwritten notes?",
    answer:
      "Yes, with some limitations. The AI can recognize most legible handwriting, but accuracy is highest with printed or typed text. Neat, clearly written handwriting works well, while cursive or messy handwriting may produce less accurate results. For critical documents, always review the extracted text.",
  },
  {
    question: "Is this free?",
    answer:
      "Yes. Free accounts get 10 AI operations per day after signing in, which is enough for casual use. Pro accounts ($7/month) get 200 AI operations per day. Each image-to-text extraction uses one AI operation from your daily allowance.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default function ImageToTextPage() {
  return (
    <main>
      <MetaViewContent contentName="Image to Text" contentId="image-to-text" />

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        {/* Back link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs text-[#A3A3A3] dark:text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5] transition-colors mb-5"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All tools
        </Link>

        {/* Icon + H1 */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: "#6366F115",
              border: "1px solid #6366F130",
            }}
            aria-hidden="true"
          >
            <FileText
              className="h-[18px] w-[18px]"
              style={{ color: "#6366F1" }}
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight">
            Image to Text Converter
          </h1>
          <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded border bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-400 dark:border-violet-900 uppercase tracking-wide">
            AI
          </span>
        </div>

        {/* Subtext */}
        <p className="text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed mb-3 max-w-xl">
          Extract text from any image using AI-powered OCR. Upload a photo,
          screenshot, or scanned document and get editable text in seconds.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#525252] dark:text-[#A3A3A3]">
          <span className="inline-flex items-center gap-1">
            <CheckCircle2
              className="h-3.5 w-3.5 text-[#16A34A]"
              strokeWidth={2}
            />
            Free to use
          </span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2
              className="h-3.5 w-3.5 text-[#16A34A]"
              strokeWidth={2}
            />
            AI-powered accuracy
          </span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2
              className="h-3.5 w-3.5 text-[#16A34A]"
              strokeWidth={2}
            />
            50+ languages
          </span>
          <span className="inline-flex items-center gap-1">
            <CheckCircle2
              className="h-3.5 w-3.5 text-[#16A34A]"
              strokeWidth={2}
            />
            Instant results
          </span>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TOOL — TranscribeClient                                     */}
      {/* ============================================================ */}
      <ImageToTextClient />

      {/* ============================================================ */}
      {/*  HOW IT WORKS — 3 steps                                      */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            How image to text conversion works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
              <div className="h-9 w-9 rounded-md border border-[#C7D2FE] bg-white dark:bg-[#1E1E1E] flex items-center justify-center mb-4">
                <Upload className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                1. Upload your image
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Drag and drop a photo, screenshot, or scanned document. Supports JPG, PNG, WebP, HEIC, and more.
              </p>
            </div>
            {/* Step 2 */}
            <div className="p-5 border border-[#C7D2FE] bg-[#EEF2FF]/30 rounded-md">
              <div className="h-9 w-9 rounded-md border border-[#C7D2FE] bg-white dark:bg-[#1E1E1E] flex items-center justify-center mb-4">
                <ScanText className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                2. AI extracts text
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Google Gemini analyses your image, detects all text regions, and converts them to editable text with high accuracy.
              </p>
            </div>
            {/* Step 3 */}
            <div className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
              <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                <Copy className="h-5 w-5 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                3. Copy or download
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Copy the extracted text to your clipboard or download it as a text file. Edit inline before exporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  USE CASES                                                    */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            What you can extract text from
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: <FileImage className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />,
                title: "Scanned documents",
                desc: "Extract text from scanned contracts, invoices, receipts, and PDFs saved as images. Digitize paper documents without retyping.",
              },
              {
                icon: <Smartphone className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />,
                title: "Screenshots",
                desc: "Pull text from screenshots of chat messages, error logs, web pages, or social media posts. Stop retyping what you can see.",
              },
              {
                icon: <Camera className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />,
                title: "Photos of text",
                desc: "Read text from photos of signs, menus, whiteboards, book pages, labels, and packaging. Works with any readable text in images.",
              },
              {
                icon: <FileText className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />,
                title: "Printed documents",
                desc: "Digitize printed letters, articles, and forms. Convert physical text into editable digital content you can search, copy, and share.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]"
              >
                <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHY SAMMAPIX — 3 value prop cards                          */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Why SammaPix for OCR?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="p-5 border border-[#C7D2FE] bg-[#EEF2FF]/30 rounded-md">
              <div className="h-9 w-9 rounded-md border border-[#C7D2FE] bg-white dark:bg-[#1E1E1E] flex items-center justify-center mb-4">
                <Sparkles
                  className="h-5 w-5 text-[#6366F1]"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                AI-powered accuracy
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Powered by Google Gemini, our OCR goes beyond traditional character recognition. It understands context, layout, and formatting to deliver highly accurate results.
              </p>
            </div>
            {/* Card 2 */}
            <div className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
              <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                <Globe
                  className="h-5 w-5 text-gray-700 dark:text-gray-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                50+ languages
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Extract text in English, Spanish, French, German, Italian, Chinese, Japanese, Arabic, Korean, Russian, and dozens more. Language is detected automatically.
              </p>
            </div>
            {/* Card 3 */}
            <div className="p-5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md bg-white dark:bg-[#1E1E1E]">
              <div className="h-9 w-9 rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center mb-4">
                <Shield
                  className="h-5 w-5 text-gray-700 dark:text-gray-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">
                Privacy-first
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed">
                Your image is sent to Google Gemini for AI analysis and immediately discarded after processing. Nothing is stored permanently on our servers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedTools toolId="image-to-text" />

      {/* ============================================================ */}
      {/*  FAQ                                                          */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-6">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-sm font-medium text-[#171717] dark:text-[#E5E5E5] hover:text-[#6366F1] transition-colors [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="flex-shrink-0 text-[#A3A3A3] group-open:rotate-45 transition-transform text-lg leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed pr-8">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SEO long-form content                                       */}
      {/* ============================================================ */}
      <section className="py-12 px-4 sm:px-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            What is OCR and how does image to text conversion work?
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            OCR stands for Optical Character Recognition — a technology that converts different types of documents, such as scanned paper documents, photographs of text, or images containing text, into editable and searchable digital text. Traditional OCR systems work by analysing the shapes of characters and matching them against known patterns. Modern AI-based OCR, like the one used by SammaPix, goes much further: it understands the context of the text, recognises complex layouts, and handles multiple languages within the same image.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed mb-6">
            When you upload an image to SammaPix, the AI model processes the entire image at once. Unlike older OCR engines that scan line by line, Gemini understands the visual layout of the document — including columns, tables, headers, and paragraphs — and reconstructs the text in a logical reading order. This results in significantly more accurate text extraction, especially for complex documents like invoices, multi-column articles, or photographs with text at various angles.
          </p>

          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Tips for better text extraction results
          </h2>
          <ul className="text-sm text-[#737373] leading-relaxed space-y-2 list-none pl-0 mb-6">
            {[
              "Use high-resolution images — the clearer the text, the better the result",
              "Ensure good lighting when photographing documents — avoid shadows across text",
              "Crop the image to focus on the text area and reduce background noise",
              "Keep the camera parallel to the document to avoid perspective distortion",
              "For handwritten text, ensure each character is clearly separated and legible",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-[#6366F1] mt-0.5"> - </span>
                {item}
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
            Common use cases for image to text conversion
          </h2>
          <p className="text-sm text-[#737373] leading-relaxed mb-4">
            Students use OCR to digitize notes from textbooks and whiteboards. Professionals use it to extract data from business cards, receipts, and invoices without manual data entry. Developers use it to pull text from UI screenshots and error messages. Researchers convert scanned academic papers into searchable text for easier citation and reference.
          </p>
          <p className="text-sm text-[#737373] leading-relaxed">
            Content creators extract text from social media screenshots to repurpose quotes and captions. Translators use image-to-text conversion as the first step before translating text from signs, menus, or documents in foreign languages. No matter the use case, SammaPix provides fast, accurate text extraction powered by state-of-the-art AI.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STRUCTURED DATA                                              */}
      {/* ============================================================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "SammaPix Image to Text Converter (OCR)",
                url: `${APP_URL}/tools/image-to-text`,
                description:
                  "Free AI-powered OCR tool that extracts text from images, photos, screenshots, and scanned documents. Supports 50+ languages. Powered by Google Gemini.",
                applicationCategory: "UtilitiesApplication",
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
                  "AI-powered OCR text extraction",
                  "50+ language support",
                  "JPG, PNG, WebP, HEIC format support",
                  "Screenshot text extraction",
                  "Scanned document digitization",
                  "Handwriting recognition",
                  "Copy to clipboard",
                  "Download as text file",
                  "Inline text editing",
                ],
              },
              {
                "@type": "HowTo",
                name: "How to Extract Text from an Image Online",
                description:
                  "Step-by-step guide to convert images to text using SammaPix free OCR tool. Works with photos, screenshots, and scanned documents.",
                totalTime: "PT1M",
                tool: {
                  "@type": "SoftwareApplication",
                  name: "SammaPix Image to Text Converter",
                  url: `${APP_URL}/tools/image-to-text`,
                },
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Upload your image",
                    text: "Drag and drop an image containing text onto the SammaPix upload area, or click to browse your device. Supported formats include JPG, PNG, WebP, HEIC, GIF, BMP, and TIFF.",
                    url: `${APP_URL}/tools/image-to-text`,
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "AI extracts the text",
                    text: "Google Gemini AI analyses your image, detects all text regions including headings, paragraphs, and labels, and converts them into editable text within seconds.",
                    url: `${APP_URL}/tools/image-to-text`,
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Copy or download the text",
                    text: "Copy the extracted text to your clipboard with one click, or download it as a plain text file. You can also edit the text inline before exporting.",
                    url: `${APP_URL}/tools/image-to-text`,
                  },
                ],
              },
              {
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                  },
                })),
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
                    name: "Image to Text Converter",
                    item: `${APP_URL}/tools/image-to-text`,
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
