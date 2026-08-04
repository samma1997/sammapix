import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "How to Scan a QR Code from a Screenshot or Picture (No Camera) [2026]",
  description:
    "Scan and decode a QR code from a screenshot, picture, or photo — no camera needed, no upload. jsQR reads the image locally in your browser. Covers WhatsApp, email, PDF, and second-screen use cases. Free, no signup.",
  alternates: {
    canonical: `${APP_URL}/blog/scan-qr-code-from-image`,
  },
  keywords: [
    "scan qr from image",
    "qr code from screenshot",
    "read qr code from picture",
    "scan qr code without camera",
    "decode qr from photo",
    "qr code from image no camera",
    "scan qr code from file",
    "qr code screenshot reader",
    "decode qr code screenshot",
    "scan qr code from screen",
  ],
  openGraph: {
    title: "How to Scan a QR Code from a Screenshot or Picture (No Camera) [2026]",
    description:
      "Decode a QR code from a screenshot, photo, or image file — no camera needed, no upload. jsQR runs locally in your browser. Free, no signup.",
    url: `${APP_URL}/blog/scan-qr-code-from-image`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Scan a QR Code from a Screenshot or Picture (No Camera) [2026]",
    description:
      "Decode a QR code from any image or screenshot. No camera, no upload. jsQR in your browser. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/scan-qr-code-from-image`;
const POST_TITLE = "How to Scan a QR Code from a Screenshot or Picture (No Camera) [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Someone sent you a QR code in a chat. It is sitting in your camera roll as an image. You cannot scan it with your phone camera because the QR code is already on your phone. This guide explains every practical method to read a QR code from a screenshot or image file, why the browser-based approach is the fastest and most private option, and what to do when detection fails.",
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
    "scan qr from image",
    "qr code from screenshot",
    "read qr code from picture",
    "scan qr without camera",
    "qr code screenshot reader",
    "decode qr from photo no upload",
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
  name: "How to Scan a QR Code from a Screenshot or Image File",
  description:
    "Decode a QR code from any image file, screenshot, or photo using the SammaPix QR Code Reader — no camera, no upload, no signup. jsQR runs locally in your browser and displays the decoded URL, text, Wi-Fi credentials, or contact details instantly.",
  totalTime: "PT30S",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix QR Code Reader (browser-based, free)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Save or locate the image containing the QR code",
      text: "If the QR code was sent via WhatsApp, Telegram, or email, save it to your device first. If it is a screenshot, use your device's screenshot function (Cmd+Shift+4 on Mac, PrintScreen on Windows, side button + volume on iPhone, power + volume on Android). If it is in a PDF, take a screenshot of the relevant page.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Open the QR Code Reader",
      text: "Go to sammapix.com/tools/qr-code-reader in any modern browser. No account or signup required.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Upload the image or screenshot",
      text: "Click the upload area or drag and drop the image file. PNG, JPEG, WebP, GIF, and AVIF are all supported. The image is read locally by your browser — it is not sent to any server.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Read the decoded result",
      text: "jsQR analyzes the image and displays the decoded QR code content immediately. Copy the URL or text, or click Open to follow a link. For Wi-Fi QR codes, the SSID and password appear in plain text.",
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
      name: "How do I scan a QR code that was sent to me via WhatsApp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When someone sends you a QR code via WhatsApp, the code arrives as an image in your chat. You cannot scan your own WhatsApp screen with the same phone's camera. The fastest method: save the image to your camera roll or gallery, then open sammapix.com/tools/qr-code-reader in your mobile browser, upload the saved image, and the QR code is decoded instantly in your browser. The image is processed locally — it is not uploaded to any server. This works for Telegram, iMessage, Signal, and any other messaging app that delivers the QR code as an image file.",
      },
    },
    {
      "@type": "Question",
      name: "How do I read a QR code from a screenshot on my computer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Take a screenshot of the screen showing the QR code. On Mac, press Cmd+Shift+4 and drag to select the area (or Cmd+Shift+3 for the full screen). On Windows, press PrintScreen for the full screen or Windows+Shift+S for the Snipping Tool to select an area. Save the screenshot as a PNG file. Open sammapix.com/tools/qr-code-reader in your browser, upload the screenshot, and the QR code content is decoded immediately. No camera is needed because the QR code already exists as a pixel image on your computer.",
      },
    },
    {
      "@type": "Question",
      name: "Can I scan a QR code that is in a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, with one extra step. Open the PDF and navigate to the page containing the QR code. Take a screenshot of that page (or use your PDF viewer's built-in export-as-image feature if available). Upload the screenshot to sammapix.com/tools/qr-code-reader. jsQR will detect and decode the QR code from the image. If the QR code is very small in the document, try zooming into the PDF viewer first so the QR code occupies a larger area of the screen, then take the screenshot.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my phone camera not work to scan a QR code on my own screen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your phone's camera is a physical lens — it cannot see what is displayed on the same phone's screen because the camera faces outward. This is the most common reason people search for a QR code reader: the QR code was sent to their phone (via WhatsApp, email, a downloaded image), and they now need to decode it without using the camera. A browser-based QR code reader accepts the image as a file input rather than a camera feed, which solves this exact problem. Open the reader on the same device that has the QR code image, upload the file, and the decoding happens entirely in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to use an online QR code reader for Wi-Fi QR codes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only if the reader processes the image locally without uploading it. A Wi-Fi QR code encodes your network name (SSID) and password in the QR pattern. If you upload the image to a server-based decoder, the server reads and may log your Wi-Fi password. The SammaPix QR Code Reader uses jsQR, which runs entirely in your browser. The image file is read by your browser's local JavaScript engine — no network request carries the image or the decoded Wi-Fi password. You can verify this with browser DevTools (F12, Network tab) — you will see no outgoing request carrying your image data.",
      },
    },
    {
      "@type": "Question",
      name: "What should I do if the QR code in my screenshot is not being detected?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common fix is to crop the screenshot to focus on the QR code before uploading. Use the Photos app on iPhone, Google Photos on Android, the built-in Preview on Mac, or the Photos app on Windows to crop. A tighter crop gives jsQR more pixels per module to work with, making detection more reliable. Other fixes: increase the zoom level in the source app before taking the screenshot (more pixels per QR module), use PNG format rather than JPEG for the screenshot (avoids compression artifacts), and make sure the three finder pattern squares in the corners of the QR code are fully visible and not cut off.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this method on my iPhone without installing an app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. On iPhone, save the QR code image to your Photos library. Open Safari (or Chrome on iOS) and go to sammapix.com/tools/qr-code-reader. Tap the upload area and select the image from your Photos library. jsQR decodes the QR code in Safari's JavaScript engine — no app installation, no upload, no account. The result appears immediately. This also works on Android using Chrome or Firefox.",
      },
    },
    {
      "@type": "Question",
      name: "Are there alternatives built into iPhone and Android for reading QR codes from images?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "iPhone (iOS 16+): Open the Photos app, tap the image containing the QR code, and tap the Live Text button (the icon with lines and a frame). If iOS detects a QR code, it will offer to open the URL. This works for clear, well-lit QR code photos. Android: Google Lens, available in the Google app and many Android camera apps, can read QR codes from images in your gallery. Open Google Lens, tap the image icon to select from gallery, and Lens will detect and decode the QR code. These built-in methods are convenient but process images on Apple's or Google's servers respectively. The browser-based SammaPix reader is the private alternative that processes everything locally.",
      },
    },
    {
      "@type": "Question",
      name: "What does the decoded QR code look like for a Wi-Fi network?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Wi-Fi QR code encodes a string in the WIFI: format: WIFI:T:WPA;S:YourNetworkName;P:YourPassword;; — where T is the security type (WPA, WEP, or nopass), S is the SSID (network name), and P is the password. The SammaPix QR Code Reader displays this raw string, from which you can read the network name and password directly. This is useful for retrieving the password from a Wi-Fi QR code if you have forgotten the original password but still have the QR code image.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ScanQrCodeFromImagePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="scan-qr-code-from-image"
        description="Someone sent you a QR code via WhatsApp. It is sitting in your camera roll. You cannot scan it with your own phone camera because the code is already on your phone. This guide covers every method to read a QR code from a screenshot or image file — with a specific focus on the browser-based approach that requires no camera, no upload, and no app installation."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Privacy"]}
        readingTime={9}
        headings={[
          { id: "the-problem", title: "The core problem: a QR code on your own screen" },
          { id: "use-cases", title: "Common situations: WhatsApp, email, PDF, second screen" },
          { id: "methods-comparison", title: "All methods compared: browser, iOS, Android, desktop app" },
          { id: "browser-method", title: "The browser method: fastest, private, no install" },
          { id: "how-no-upload-works", title: "How no-upload processing works" },
          { id: "step-by-step", title: "Step by step: scan a QR code from an image" },
          { id: "platform-guides", title: "Platform guides: iPhone, Android, Mac, Windows" },
          { id: "tips-for-better-detection", title: "Tips for better QR code detection from images" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "You cannot use your phone camera to scan a QR code that is already on your phone screen. You need a reader that accepts an image file as input instead of a live camera feed.",
          "The most common scenarios: QR code received via WhatsApp, Telegram, or email; QR code in a PDF; QR code on a second screen you are working on.",
          "The SammaPix QR Code Reader decodes QR codes from any image file in your browser — no upload, no camera, no signup, no app installation.",
          "Works on iPhone (Safari), Android (Chrome/Firefox), and desktop browsers. Upload the image file or screenshot directly.",
          "jsQR processes the image locally. Wi-Fi passwords and private URLs are never sent to any server.",
          "Tips for better detection: crop the image tightly around the QR code, use PNG format, ensure all three finder pattern squares are visible.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Person holding a smartphone showing a QR code on screen, illustrating the common scenario of needing to decode a QR code that is already on your device."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              When a QR code arrives as an image on your phone, your camera cannot scan it — you need a reader that accepts the image file directly.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Scan a QR code from any image — no camera, no upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              Upload your screenshot, WhatsApp image, or photo. jsQR decodes the QR code locally in your browser.
              No signup, no server, no installation required.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/qr-code-reader"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open QR Code Reader, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/blog/qr-code-reader-online"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                How QR code readers work — full guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/qr-code-generator"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Generate a QR code free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: The core problem ───────────────────────────────────── */}

        <h2 id="the-problem" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The core problem: a QR code on your own screen
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Your phone&apos;s camera is designed to see the world in front of it. It cannot see what is displayed on its own screen. This creates a specific frustration that millions of people encounter: you receive a QR code as an image — via WhatsApp, email, or any messaging app — and you need to act on it, but you cannot scan what is already on your phone.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The workarounds people try and why they often fail:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Scanning the phone screen with a second phone.</strong> Works if you have a second phone, but requires awkward positioning and often results in screen glare or reflection causing scan failures. Not always available.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Forwarding the image to another device.</strong> Send the QR code image via email or AirDrop to a computer, then scan your computer screen with your phone. Adds multiple steps and delays.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Screenshotting and using the built-in iOS/Android QR recognition.</strong> Works sometimes on iOS 16+ (Live Text in Photos), but only for photos taken with the camera — not always for screenshots or chat-received images. Inconsistent.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The direct solution — one that works consistently on any device, requires no second phone, and adds zero steps — is a browser-based QR code reader that accepts an image file as input. You open the reader on the same device that has the image, upload the file, and the QR code is decoded in your browser in under a second.
        </p>

        {/* ── Section 2: Use cases ───────────────────────────────────────────── */}

        <h2 id="use-cases" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Common situations: WhatsApp, email, PDF, second screen
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          QR code received via WhatsApp or Telegram
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is the single most common scenario. A contact shares a QR code for an event, a login, a payment, or a Wi-Fi network. The QR code arrives in the chat as an image. You tap on it, it fills the screen, but you cannot scan your own screen with your own camera. Save the image to your gallery, open the browser-based reader, upload it, done.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          QR code in an email attachment or inline image
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Booking confirmations, event tickets, two-factor authentication setup emails, and loyalty program registrations frequently include QR codes. On desktop, you are reading the email on the same computer — you cannot point your phone at a second monitor with the QR code on it (or it is inconvenient). On mobile, the QR code is in the email on your phone. In both cases, saving the image and uploading it to the reader is faster than any other approach.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          QR code embedded in a PDF document
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Boarding passes, event tickets, invoices, contracts, and government documents often contain QR codes. On desktop, take a screenshot of the PDF page at a high zoom level. On mobile, use your screen recording / screenshot function while viewing the PDF at full zoom. Upload the screenshot to the reader to decode the QR code without printing anything.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          QR code displayed on another screen or monitor
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Authentication flows for desktop apps (WhatsApp Web, Telegram Desktop, two-factor authentication setup) often display a QR code on your computer screen that you are supposed to scan with your phone. But sometimes you want to inspect what the QR code contains — or you want to copy the URL it encodes. Take a screenshot of the QR code, upload it to the reader, and see the encoded data directly.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          QR code in a photo you took earlier
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You photographed a poster, product packaging, or business card containing a QR code but did not scan it at the time. Later, you want to retrieve the URL or contact details. Upload the photo to the reader — as long as the QR code is in focus and reasonably large in the image, jsQR will decode it.
        </p>

        {/* ── Section 3: Methods comparison ───────────────────────────────────── */}

        <h2 id="methods-comparison" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          All methods compared: browser, iOS, Android, desktop app
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Method</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Works on</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Privacy</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Install required</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Browser-based reader (SammaPix)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">iPhone, Android, Mac, Windows, Linux</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Complete. No upload. jsQR local only.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Browser only.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Fastest cross-platform method. Works for any image format.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">iOS Live Text (Photos app)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">iPhone / iPad (iOS 16+)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Apple processes detection on-device for photos; not all image types supported.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Built into iOS.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Inconsistent for screenshots. Works well for camera roll photos.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Google Lens (Android / iOS)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Android (built-in), iOS (Google app)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Image sent to Google servers for analysis.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No (Android). Google app on iOS.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Good detection. Privacy concern for sensitive QR codes (Wi-Fi, auth).</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Server-based online decoder</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Any device with a browser</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Low. Image uploaded to third-party server. Decoded content may be logged.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No. Browser only.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Works for non-sensitive QR codes. Avoid for Wi-Fi or authentication codes.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Second phone camera</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Any phone with a camera</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Complete. No data leaves the phones.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Inconvenient. Glare and reflection often cause failures. Not always available.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 4: Browser method ─────────────────────────────────────── */}

        <h2 id="browser-method" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The browser method: fastest, private, no install
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The <Link href="/tools/qr-code-reader" className="text-[#6366F1] hover:underline">SammaPix QR Code Reader</Link> uses <strong className="text-gray-800 dark:text-[#E5E5E5]">jsQR</strong> — an open-source JavaScript library that implements the ISO/IEC 18004 QR code decoding specification. It runs entirely inside your browser tab, processing the image you provide without sending anything to a server.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Why this is the best default method for scanning a QR code from an image:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Works on the same device.</strong> You do not need a second phone. You open the reader on the same device that has the QR code image. This is the key advantage over camera-based scanning.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">No app installation.</strong> Open the URL in any browser. On iPhone, on Android, on Mac, on Windows. No download from the App Store or Play Store.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Private by design.</strong> jsQR processes pixel data locally. Your image and its decoded content stay on your device. This matters especially for Wi-Fi passwords and authentication codes.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">No signup, no account, no expiry.</strong> Open it and use it. No email address, no registration.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Supports all common image formats.</strong> PNG, JPEG, WebP, GIF (first frame), AVIF — whatever format your screenshot or saved image is in.
          </li>
        </ul>

        {/* ── Section 5: How no-upload works ───────────────────────────────── */}

        <h2 id="how-no-upload-works" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How no-upload processing works
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          When you provide an image in a web browser, the browser can read the file directly using the <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">FileReader</code> API or an <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">&lt;input type=&quot;file&quot;&gt;</code> element. The file data is loaded into browser memory — it is never automatically transmitted over the network.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          jsQR then processes the image data in the same browser session:
        </p>

        <ol className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            The image is decoded into raw pixel data using the browser&apos;s Canvas API.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            jsQR scans the pixel array to detect finder patterns and locate the QR code.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            The module grid is sampled, error correction is applied, and the data payload is decoded.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            The decoded text string is displayed in the browser UI.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          To verify this yourself: open browser DevTools (F12 on desktop), go to the Network tab, clear the log, then upload your image and decode the QR code. The Network tab will show no request carrying your image data. The only network activity is the initial page load — JavaScript, CSS, and fonts. The image and decoded result do not appear in any outgoing request.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Scan your QR code image right now — no upload, no camera</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Upload a screenshot, WhatsApp image, or any photo. jsQR decodes the QR code locally. Copy or open the result.
            Free, no account.
          </p>
          <Link
            href="/tools/qr-code-reader"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open QR Code Reader, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 6: Step by step ────────────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Step by step: scan a QR code from an image
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Get the image file.</strong> If the QR code is in a chat message (WhatsApp, Telegram, iMessage), long-press or tap and hold the image and choose Save or Download to save it to your gallery or downloads folder. If it is a screenshot you have already taken, it is already saved.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open sammapix.com/tools/qr-code-reader.</strong> Open this URL in Chrome, Safari, Firefox, or Edge — on the same device that has the image. No account or signup required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Upload the image.</strong> Tap or click the upload area. On mobile, your gallery opens — select the QR code image. On desktop, your file picker opens — navigate to and select the image file. The image is read by your browser locally.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Read the decoded content.</strong> The QR code content appears immediately: a URL, plain text, Wi-Fi credentials, vCard data, or any other encoded information. Copy the text or open the URL using the provided buttons.
          </li>
        </ol>

        {/* ── Section 7: Platform guides ─────────────────────────────────────── */}

        <h2 id="platform-guides" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Platform guides: iPhone, Android, Mac, Windows
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          iPhone (iOS)
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the QR code arrived via iMessage or WhatsApp: long-press the image in the conversation, tap Save. Open Safari, go to sammapix.com/tools/qr-code-reader, tap the upload area, tap Photo Library, select the saved image. Done.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a QR code on screen (email, PDF, website): take a screenshot with the side button and volume up button simultaneously. Open Safari, go to sammapix.com/tools/qr-code-reader, upload the screenshot from Photos.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Android
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          If the QR code arrived via WhatsApp or Telegram: tap and hold the image, tap Save. Open Chrome or Firefox, go to sammapix.com/tools/qr-code-reader, tap the upload area, select the saved image from Downloads or Gallery. Done.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a QR code on screen: press power + volume down to take a screenshot. Open Chrome, go to sammapix.com/tools/qr-code-reader, upload the screenshot.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Mac
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          For a QR code on screen: press Cmd+Shift+4, drag to select the area around the QR code. A PNG screenshot saves to your Desktop. Open Chrome or Safari, go to sammapix.com/tools/qr-code-reader, drag the PNG into the upload area or click to select. Decoded in seconds.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Windows
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Press Windows+Shift+S to open the Snipping Tool. Drag to capture the area around the QR code. The image is copied to clipboard and saved to the Snipping Tool app (or you can paste into Paint and save as PNG). Open Edge or Chrome, go to sammapix.com/tools/qr-code-reader, upload the PNG.
        </p>

        {/* ── Section 8: Tips for better detection ──────────────────────────── */}

        <h2 id="tips-for-better-detection" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Tips for better QR code detection from images
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Crop tightly around the QR code.</strong> If the QR code is a small part of a large screenshot, crop the image to show mainly the QR code before uploading. This gives jsQR more pixels per module and improves detection reliability significantly.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Use PNG format when possible.</strong> PNG is lossless — no compression artifacts. JPEG compression can blur the module edges of a QR code, especially at low quality settings. Screenshots on iPhone and Mac save as PNG by default, which is ideal.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Make sure all three finder patterns are visible.</strong> The three large squares in the top-left, top-right, and bottom-left corners of the QR code must be fully visible and unobstructed. If any corner is cut off, jsQR cannot locate the code.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Take the screenshot with higher zoom first.</strong> If the QR code is small on screen — embedded in a long document or webpage — zoom in on it before taking the screenshot. More pixels per module means more reliable detection.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Straighten the image if it was photographed at an angle.</strong> jsQR handles moderate perspective distortion, but extreme angles cause failures. Use a photo editor to perspective-correct an angled photo before uploading.
          </li>
        </ul>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Works on iPhone, Android, Mac, and Windows</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Upload any screenshot or image. jsQR decodes the QR code in your browser with no upload, no account, no camera needed.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/qr-code-reader"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open QR Code Reader, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/qr-code-reader-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              How QR code decoding works — full technical guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: Related tools ──────────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/qr-code-reader" className="text-[#6366F1] hover:underline">QR Code Reader</Link></strong>: the tool covered in this guide. Decodes QR codes from images or live camera. No upload, no camera needed, no account.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/blog/qr-code-reader-online" className="text-[#6366F1] hover:underline">QR Code Reader Online — full guide</Link></strong>: covers how jsQR works, every data type a QR code can contain, and the difference between a reader and a scanner app. Recommended reading if you want to understand the technical details.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/qr-code-generator" className="text-[#6366F1] hover:underline">QR Code Generator</Link></strong>: generate a QR code for any URL, text, Wi-Fi network, email, or vCard in your browser. Download PNG or SVG. No upload, no account, no expiry. See{" "}
            <Link href="/blog/qr-code-generator-online" className="text-[#6366F1] hover:underline">free QR code generator guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/image-to-base64" className="text-[#6366F1] hover:underline">Image to Base64</Link></strong>: convert a QR code image to a Base64 Data URI for embedding directly in HTML or CSS — no external file reference. Useful when distributing QR codes in self-contained web pages or emails.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/heic" className="text-[#6366F1] hover:underline">HEIC Converter</Link></strong>: convert iPhone HEIC photos to JPEG or PNG before uploading to the QR code reader. Some older browser versions may not display HEIC images from the camera roll — convert to JPEG first for guaranteed compatibility.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All QR tools, all in your browser — no account for any</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Read QR codes from images, generate QR codes, convert HEIC to JPEG — without uploading anything anywhere.
            No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/qr-code-reader" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              QR Code Reader <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/qr-code-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              QR Code Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/image-to-base64" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Image to Base64 <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/heic" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              HEIC Converter <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
