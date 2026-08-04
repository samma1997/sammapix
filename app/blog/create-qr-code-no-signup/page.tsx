import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Create a QR Code Without Signing Up — No Account, No Expiry [2026]",
  description:
    "Create a QR code without an account, email, or registration. Your data stays in your browser — no upload, no server. Download PNG or SVG. Free, no expiry. Find out why most generators require signup and why this one does not.",
  alternates: {
    canonical: `${APP_URL}/blog/create-qr-code-no-signup`,
  },
  keywords: [
    "qr code no signup",
    "qr code generator no registration",
    "create qr code without account",
    "qr code no login",
    "qr code generator free no sign up",
    "qr code without email",
    "private qr code generator",
    "qr code no account required",
    "browser qr code generator",
    "qr code free no watermark",
  ],
  openGraph: {
    title: "Create a QR Code Without Signing Up — No Account, No Expiry [2026]",
    description:
      "No account, no email, no registration. QR code generated entirely in your browser — data never leaves your device. PNG and SVG. No expiry. Free.",
    url: `${APP_URL}/blog/create-qr-code-no-signup`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create a QR Code Without Signing Up — No Account, No Expiry [2026]",
    description:
      "QR code generator — no signup, no account, no upload. Data stays in your browser. PNG + SVG. Free, no expiry.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/create-qr-code-no-signup`;
const POST_TITLE = "Create a QR Code Without Signing Up — No Account, No Expiry [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "Almost every QR code generator online requires an email address or account before you can download your code. This guide explains why that is — the business model behind 'free' QR code SaaS — and how to generate a QR code for any data type entirely in your browser without creating an account, without your data touching a server, and with no expiry date.",
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
    "qr code no signup",
    "qr code generator no registration",
    "create qr code without account",
    "qr code no login",
    "private qr code generator",
    "browser qr code generator",
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
  name: "How to Create a QR Code Without Signing Up",
  description:
    "Generate a QR code for any URL, text, Wi-Fi network, email address, or vCard contact without creating an account or providing an email address. The code is generated entirely in your browser — no data upload, no server, no expiry.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix QR Code Generator (browser-based, no signup required)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the tool in your browser",
      text: "Go to sammapix.com/tools/qr-code-generator in Chrome, Firefox, Safari, or Edge. No email, no account, no registration.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Select your data type and enter your content",
      text: "Choose URL, text, Wi-Fi, email, or vCard. Enter the data in the fields. The QR code preview updates live — scan the preview to verify correctness before downloading.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Select PNG or SVG",
      text: "PNG for digital use (screens, email, presentations). SVG for print (business cards, menus, posters). Both are free and available without an account.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Download the QR code",
      text: "Click Download. The file is generated in browser memory and saved to your device. Your data never leaves your browser. No account is required to keep the code or use it commercially.",
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
      name: "Why do most QR code generators require an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most QR code generators are SaaS businesses built around dynamic QR codes — codes that route through the generator's own server before reaching your destination. An account is required because the service needs to associate your codes with your subscription. If you cancel, they can disable your codes. The account requirement is also used to capture email addresses for marketing. A generator that creates static QR codes entirely in the browser does not need an account because no server infrastructure is involved.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to enter my Wi-Fi password in a QR code generator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on whether the generator processes your data in the browser or on a server. If the QR code is generated on a server, your Wi-Fi password travels over the network to that server — and is stored there, at least temporarily. The SammaPix QR Code Generator encodes the Wi-Fi credentials entirely in your browser using client-side JavaScript. The password is never sent over the network. You can verify this by opening browser DevTools (F12), going to the Network tab, and watching for outgoing requests while you type your credentials — you will see none carrying your data.",
      },
    },
    {
      "@type": "Question",
      name: "Will my QR code expire if I do not have an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The SammaPix QR Code Generator creates static QR codes, which encode your data directly into the module pattern. They are not hosted on any server and do not depend on any account or subscription. The QR code will work as long as the destination you encoded — a URL, for example — continues to exist. There is no expiry date, no scan limit, and no account required to keep using it.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create a QR code for a restaurant menu without a paid plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Generate a URL QR code pointing to your online menu (a Google Drive PDF, a website page, a Notion page, or any URL). Download it as SVG for print-ready quality. Place it on your tables. No account, no monthly fee, no expiry. If the menu URL ever changes, you will need to generate a new QR code and reprint — but for most small restaurants with a stable menu URL, static codes work perfectly for years.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between generating a QR code in the browser versus on a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When a QR code is generated on a server, your input data (URL, Wi-Fi password, contact details) is sent over the network to the server, which creates the QR image and returns it. The server operator can log what you submitted. When a QR code is generated in your browser, all computation happens in your local browser using JavaScript — no network request carries your data. The resulting image is assembled in browser memory and downloaded directly. For most data types, the output is identical. The difference is entirely about where the processing happens and who can see your input.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this tool on my phone without creating an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The SammaPix QR Code Generator works on mobile browsers — Chrome on Android, Safari on iOS, and Firefox on both. No app download, no account. Open sammapix.com/tools/qr-code-generator in your mobile browser, enter your data, and download the PNG or SVG directly to your phone's storage.",
      },
    },
    {
      "@type": "Question",
      name: "Can I generate a QR code for a vCard without uploading my contact details?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The vCard data — name, phone number, email, address, website — is encoded entirely in your browser. Nothing is sent to any server. The vCard format is a plain-text standard (RFC 6350) that phones recognize natively. When someone scans the QR code, their contacts app reads the vCard data from the pattern and offers to add the contact. No server communication is involved at any point in this process.",
      },
    },
    {
      "@type": "Question",
      name: "What are the main use cases for no-signup QR codes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most common use cases where a no-signup, no-expiry static QR code is the right choice: restaurant and cafe menus (link to a PDF or web page), hotel and Airbnb Wi-Fi access (encode SSID and password so guests scan to connect), business cards (URL to website or vCard contact), event posters and flyers (link to event page or registration form), product packaging (link to usage instructions or warranty registration), conference name badges (vCard or LinkedIn URL), and office visitor check-in (link to a reception form).",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CreateQrCodeNoSignupPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="create-qr-code-no-signup"
        description="You want a QR code for your menu, your business card, or your Wi-Fi. You open a generator. It asks for your email. Then it asks you to create an account. Then it tells you the SVG download requires a paid plan. Here is why that happens — and how to generate a QR code privately in your browser without any of it."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Design"]}
        readingTime={8}
        headings={[
          { id: "why-signup-required", title: "Why most QR code generators require an account" },
          { id: "dark-patterns", title: "The dark patterns: expiry, SVG paywalls, scan limits" },
          { id: "what-we-dont-do", title: "What the SammaPix generator does not do" },
          { id: "browser-generation", title: "How browser-based generation keeps your data private" },
          { id: "use-cases", title: "Use cases: poster, Wi-Fi, business card, restaurant menu" },
          { id: "step-by-step", title: "Step by step: create a QR code without an account" },
          { id: "verify-no-upload", title: "How to verify your data never leaves your browser" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Most QR code generators require an account because they generate dynamic QR codes hosted on their servers. The account ties your codes to your subscription — cancel and your codes break.",
          "Common dark patterns: codes that expire after 30-90 days on free plans, SVG locked behind a paywall, scan limits, and mandatory email capture.",
          "The SammaPix QR Code Generator creates static QR codes entirely in your browser. No account, no email, no upload, no expiry.",
          "Supports URL, text, Wi-Fi credentials, email, and vCard. PNG and SVG both free.",
          "Wi-Fi passwords and contact details never leave your browser — verifiable with DevTools.",
          "Free for commercial use: menus, business cards, posters, product packaging.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Person scanning a QR code at a restaurant table with their smartphone, representing the practical everyday uses for QR codes without requiring an account."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A QR code for a menu, a Wi-Fi network, or a business card should not require a monthly subscription to keep working.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Create a QR code right now — no account, no expiry
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              URL, text, Wi-Fi, email, vCard — generated entirely in your browser. No data upload, no server, no signup.
              PNG and SVG download. Free for commercial use.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/qr-code-generator"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Generate QR Code, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/blog/qr-code-generator-online"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Static vs dynamic QR codes explained <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Why signup required ────────────────────────────────── */}

        <h2 id="why-signup-required" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why most QR code generators require an account
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You land on a QR code generator website. You enter your URL, the preview looks good, you click Download. A modal appears: &quot;Sign up to download your QR code.&quot; You enter your email. Now you are in a drip email sequence and your QR code is tied to a free account that expires in 30 days.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is not a coincidence. The vast majority of QR code generator businesses are built on the same architecture: dynamic QR codes hosted on their servers. Understanding why explains the account requirement.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A dynamic QR code does not encode your destination URL directly. Instead, it encodes a short redirect URL on the generator&apos;s own domain — something like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">qrco.de/abc123</code>. Every time someone scans the code, their phone hits that redirect URL, which then forwards to your actual destination. The QR generator&apos;s server is in the middle of every single scan.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This architecture has real business value: you can change the destination URL without reprinting the code, and the server can log every scan for analytics. But it also means the service needs to maintain a database of redirect records, each associated with a user account. The account is not there to protect you — it is there to bind your QR codes to a paying customer relationship.
        </p>

        {/* ── Section 2: Dark patterns ──────────────────────────────────────── */}

        <h2 id="dark-patterns" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The dark patterns: expiry, SVG paywalls, scan limits
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Once you understand the business model, the dark patterns become predictable. Here are the most common ones:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">QR codes that expire.</strong> Free dynamic codes are deleted after 30 to 90 days, or when the account downgrades. If your printed menu, brochure, or packaging still exists — those QR codes now scan to a broken page.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">SVG locked behind a paywall.</strong> The free download is a 72 dpi low-resolution PNG. For print at 300 dpi or higher, you need SVG. SVG is a paid feature. For a business card or menu, you are forced to upgrade to get a usable file.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Scan limits on free plans.</strong> Free accounts are capped at a certain number of scans per month (e.g. 50 or 100). Exceed the limit and scans fail — or redirect to an upgrade page — until the billing cycle resets.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Watermarks on free downloads.</strong> Some generators add a watermark or logo to the PNG on free plans. This is unusable for any professional context.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Mandatory email capture for any download.</strong> Even generators that advertise &quot;free&quot; prominently require email verification before download. This captures your address for marketing regardless of whether you pay.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          None of these constraints apply to a static QR code generator that runs entirely in your browser. Because there is no server infrastructure, no redirect database, and no account system, there is nothing to meter, expire, or lock behind a paywall.
        </p>

        {/* ── Section 3: What we don&apos;t do ─────────────────────────────────── */}

        <h2 id="what-we-dont-do" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What the SammaPix generator does not do
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What we do NOT do</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Why not</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What this means for you</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Require an account</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No server stores your codes. Nothing to associate with an account.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No registration, no email, no password. Open and use immediately.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Expire your QR codes</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Static codes encode data directly. No redirect server to take offline.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Your QR code works forever, as long as the destination URL exists.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Upload your data to a server</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">QR generation runs entirely in the browser via client-side JavaScript.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Wi-Fi passwords, contact details, and URLs never leave your device.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Limit scans on free plans</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No redirect server = no scan counter. Scans go directly to destination.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Unlimited scans. No monthly cap.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Lock SVG behind a paywall</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">SVG is generated in browser just like PNG. No server cost difference.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">SVG download is free. Use it for print without upgrading.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Add a watermark</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No branding agenda. The output is a clean, scannable QR code.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Clean output usable on any professional or commercial material.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Track your scans</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">No redirect server = no scan data. Scans go directly to destination.</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Complete privacy for the people who scan your codes.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The trade-off is that we also cannot offer scan analytics or the ability to edit the destination after printing. If those features matter to your use case, a paid dynamic QR code service is the right choice. For the majority of uses — menus, business cards, Wi-Fi access, posters — the constraints of a static code are not constraints at all.
        </p>

        {/* ── Section 4: Browser generation privacy ────────────────────────── */}

        <h2 id="browser-generation" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How browser-based generation keeps your data private
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The <Link href="/tools/qr-code-generator" className="text-[#6366F1] hover:underline">SammaPix QR Code Generator</Link> uses a JavaScript QR encoding library that runs entirely in your browser tab. When you type a URL, Wi-Fi password, or contact details, the data is processed locally by your browser — it is never sent over the network.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Here is what happens technically when you generate a QR code:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">You type your data.</strong> The input field value is read by a JavaScript event handler in your browser. Nothing is sent anywhere — the data exists only in your browser&apos;s memory.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The QR encoder runs locally.</strong> A QR code generation library (running entirely in your browser tab as JavaScript) converts the text into the matrix of modules. No server request is made.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The QR code is rendered in your browser.</strong> The module matrix is drawn to an HTML Canvas element or converted to SVG paths. The preview is displayed using local browser rendering — no image is fetched from a server.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The download is served from browser memory.</strong> Clicking Download PNG creates a PNG from the Canvas element in memory. Clicking Download SVG serializes the SVG path data. The file is offered as a download via a temporary blob URL — no network request carries file data.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This matters most for Wi-Fi QR codes and vCard QR codes. A Wi-Fi QR code encodes your network password. A vCard QR code encodes your phone number, email address, and home or office address. Sending that data to a third-party server is an unnecessary privacy risk that browser-based generation eliminates entirely.
        </p>

        {/* ── Tool CTA #1 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Your QR code data stays in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload, no server, no account. Wi-Fi passwords and contact details processed locally.
            PNG and SVG download. Free, no expiry.
          </p>
          <Link
            href="/tools/qr-code-generator"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open QR Code Generator, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: Use cases ──────────────────────────────────────────── */}

        <h2 id="use-cases" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Use cases: poster, Wi-Fi, business card, restaurant menu
        </h2>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Restaurant or cafe menu
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Generate a URL QR code pointing to your menu PDF (hosted on Google Drive, Dropbox, or your website) or your online ordering page. Download as SVG and place it on table cards, window stickers, or printed placemats. No monthly fee to keep it working — the code scans directly to your URL with no intermediary.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Guest Wi-Fi access
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Generate a Wi-Fi QR code with your guest network name and password. Print it and mount it at reception, on coffee tables, or in guest rooms. Guests scan and connect automatically — no password typing, no misreading handwritten notes. Because the code is generated in the browser, the password is never sent to any server. When you change the Wi-Fi password, generate a new code and reprint.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Business card
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A vCard QR code on a business card lets people scan your contact details directly into their phone — name, company, phone, email, website. No app required, no manual entry. Download SVG for vector-quality placement in your business card design file (Figma, Illustrator, InDesign, Canva). The code works forever with no account needed.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Event poster or flyer
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A URL QR code on an event poster links to your event registration page, ticket sales, or event details. Download SVG, place it at any size on the poster layout. Because it is a static code, it works as long as the event page URL stays live — no subscription needed between now and the event date.
        </p>

        <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mt-6 mb-2">
          Airbnb or hotel room
        </h3>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A printed card with Wi-Fi and checkout instructions is standard in short-term rental properties. A Wi-Fi QR code eliminates the most common guest friction point — connecting to Wi-Fi. Pair it with a URL code linking to your house rules or local recommendations PDF.
        </p>

        {/* ── Section 6: Step by step ───────────────────────────────────────── */}

        <h2 id="step-by-step" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Step by step: create a QR code without an account
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open sammapix.com/tools/qr-code-generator</strong> in Chrome, Firefox, Safari, or Edge — on desktop or mobile. No email, no account, no browser extension.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Select your data type.</strong> Choose URL, text, Wi-Fi, email, or vCard. The input form updates to show the relevant fields for the selected type.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Enter your data.</strong> Type or paste the URL, message, Wi-Fi SSID and password, email address, or vCard fields. The QR code preview updates in real time. Scan the preview with your phone camera to verify it decodes correctly before downloading.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Choose PNG or SVG.</strong> PNG for digital use. SVG for print. Both are free.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Download and use.</strong> The file is saved to your device directly from browser memory. Place it in your design, print it, or embed it on your website. No account required to keep using it. No expiry date.
          </li>
        </ol>

        {/* ── Section 7: Verify no upload ───────────────────────────────────── */}

        <h2 id="verify-no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to verify your data never leaves your browser
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You do not need to take this on faith. Browser developer tools let you audit network traffic in real time. Here is how to check:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open DevTools.</strong> Press F12 on Windows or Linux. Press Command Option I on Mac. On Safari, enable the Develop menu first: Settings &rarr; Advanced &rarr; Show features for web developers.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Go to the Network tab and clear it.</strong> Click the clear button (trash icon) to empty the request list. Enable &quot;Preserve log&quot; to prevent Chrome from clearing it on navigation.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Type your data and download the QR code.</strong> Watch the Network panel while you type and while the download happens.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Observe: no outgoing requests carry your data.</strong> The only network activity you will see is the initial page load (JavaScript, CSS, fonts). Your URL, Wi-Fi password, or contact details do not appear in any request body. The download is a local blob URL — it does not touch the network at all.
          </li>
        </ol>

        {/* ── Tool CTA #2 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Audit it yourself — no upload, guaranteed</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Open DevTools, watch the Network tab. Zero outgoing requests carrying your data. No account, no expiry, free for commercial use.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/qr-code-generator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open QR Code Generator, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/qr-code-generator-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Static vs dynamic QR codes — full guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: Related tools ──────────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/qr-code-generator" className="text-[#6366F1] hover:underline">QR Code Generator</Link></strong>: the tool covered in this guide. No account, no expiry, PNG and SVG free.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/blog/qr-code-generator-online" className="text-[#6366F1] hover:underline">Free QR Code Generator Online — No Signup, No Expiry</Link></strong>: the companion article. Explains static vs dynamic QR codes, PNG vs SVG, and all supported data types in detail.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/image-to-base64" className="text-[#6366F1] hover:underline">Image to Base64</Link></strong>: encode images to Base64 for embedding in HTML or CSS — useful when designing QR code landing pages with self-contained assets.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/add-text-to-image" className="text-[#6366F1] hover:underline">Add Text to Image</Link></strong>: add a label or call-to-action text to your QR code image before distributing — &quot;Scan for Wi-Fi&quot;, &quot;Scan to book&quot;, etc. No upload.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/pdf-merge" className="text-[#6366F1] hover:underline">PDF Merge</Link></strong>: combine menu PDFs or information sheets that your QR code links to. Merge PDFs privately in your browser without uploading them anywhere.
          </li>
        </ul>

        {/* ── Tool CTA #3 ────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">All in-browser — no account for any of these tools</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            QR codes, image encoding, text overlays, PDF merge — without creating an account for any of them.
            No server. No signup. No watermark.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/qr-code-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              QR Code Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/image-to-base64" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Image to Base64 <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/add-text-to-image" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Add Text to Image <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/pdf-merge" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              PDF Merge <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
