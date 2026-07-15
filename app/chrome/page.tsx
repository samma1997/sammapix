import { Metadata } from "next";
import Link from "next/link";

// TODO: replace with the real Chrome Web Store listing URL once the extension is approved.
const STORE_URL = "https://chromewebstore.google.com/search/SammaPix";

export const metadata: Metadata = {
  title: "SammaPix for Chrome — Image Tools in Your Browser",
  description:
    "Compress, convert, crop and clean images, extract RAR/7z/ZIP archives, and grab every image from any page — right in your browser side panel. 100% private, no uploads.",
  alternates: { canonical: "https://www.sammapix.com/chrome" },
  openGraph: {
    title: "SammaPix for Chrome — Image Tools in Your Browser",
    description:
      "Compress, convert, crop and clean images, extract archives, and grab every image from any page. 100% in your browser.",
    url: "https://www.sammapix.com/chrome",
    type: "website",
  },
};

const LogoMark = ({ size = 40 }: { size?: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
    <rect width="32" height="32" rx="6" fill="#8B5CF6" />
    <g fill="#fff">
      <rect x="8" y="6" width="4" height="4" /><rect x="12" y="6" width="4" height="4" /><rect x="16" y="6" width="4" height="4" /><rect x="20" y="6" width="4" height="4" />
      <rect x="8" y="10" width="4" height="4" />
      <rect x="8" y="14" width="4" height="4" /><rect x="12" y="14" width="4" height="4" /><rect x="16" y="14" width="4" height="4" /><rect x="20" y="14" width="4" height="4" />
      <rect x="20" y="18" width="4" height="4" />
      <rect x="8" y="22" width="4" height="4" /><rect x="12" y="22" width="4" height="4" /><rect x="16" y="22" width="4" height="4" /><rect x="20" y="22" width="4" height="4" />
    </g>
  </svg>
);

const FEATURES = [
  { icon: "🗜️", title: "Compress & convert", text: "Shrink JPG, PNG and WebP with a live size preview, and convert between formats in one click." },
  { icon: "✂️", title: "Crop, watermark, blur", text: "Crop with draggable handles and undo, add a watermark, or blur and censor faces, plates and private info." },
  { icon: "🛡️", title: "Clean EXIF & GPS", text: "Strip metadata and location data before you share a photo. Nothing is uploaded." },
  { icon: "📦", title: "Extract archives", text: "Open RAR, 7z, ZIP and TAR right in the browser — no software to install." },
  { icon: "🖼️", title: "Grab images from any page", text: "See every image on the page you're visiting, then download, compress or rename them in bulk." },
  { icon: "🔒", title: "100% private", text: "All processing happens on your device. Your images never leave your browser." },
];

export default function ChromePage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SammaPix — Image Tools",
    applicationCategory: "BrowserApplication",
    operatingSystem: "Chrome",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Compress, convert, crop and clean images, extract archives, and grab every image from any page — in your browser side panel.",
    url: "https://www.sammapix.com/chrome",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#191919]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      {/* Hero */}
      <section className="px-4 sm:px-8 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ececec] dark:border-[#2b2b2b] bg-[#fafafa] dark:bg-[#1f1f1f] px-3 py-1.5 text-xs font-medium text-[#6366F1] mb-6">
            <LogoMark size={16} /> Chrome Extension
          </div>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#171717] dark:text-[#E5E5E5]">
            Your image toolbox,<br className="hidden sm:block" /> right in your browser
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[#737373] dark:text-[#A3A3A3] max-w-2xl mx-auto">
            Compress, convert, crop and clean images, extract RAR/7z/ZIP archives, and grab every image from any page — all from the browser side panel. 100% private, no uploads.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6366F1] hover:bg-[#4f46e5] text-white font-semibold px-6 py-3.5 text-sm transition-colors shadow-[0_6px_20px_rgba(99,102,241,0.3)]"
            >
              Add to Chrome — it's free
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-[#ececec] dark:border-[#2b2b2b] text-[#171717] dark:text-[#E5E5E5] font-semibold px-6 py-3.5 text-sm hover:bg-[#fafafa] dark:hover:bg-[#1f1f1f] transition-colors"
            >
              Or use the web app →
            </Link>
          </div>
          <p className="mt-4 text-xs text-[#a3a3a3] dark:text-[#737373]">Free · No account needed for single tools · Works on any page</p>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-8 py-12 sm:py-16 border-t border-[#f0f0f0] dark:border-[#232323]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-[#f0f0f0] dark:border-[#2b2b2b] bg-white dark:bg-[#1c1c1c] p-6">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5]">{f.title}</h3>
                <p className="mt-2 text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight: from page */}
      <section className="px-4 sm:px-8 py-14 sm:py-20 border-t border-[#f0f0f0] dark:border-[#232323]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171717] dark:text-[#E5E5E5]">
            The one thing a website can't do
          </h2>
          <p className="mt-4 text-base text-[#737373] dark:text-[#A3A3A3] max-w-2xl mx-auto leading-relaxed">
            Open the panel on any page — a shop, a gallery, a moodboard — and SammaPix shows you every image on it. Select the ones you want and download, compress or rename them in bulk. Free up to 50 images a day, unlimited with Pro.
          </p>
          <div className="mt-8">
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6366F1] hover:bg-[#4f46e5] text-white font-semibold px-6 py-3.5 text-sm transition-colors shadow-[0_6px_20px_rgba(99,102,241,0.3)]"
            >
              Add to Chrome — it's free
            </a>
          </div>
          <p className="mt-6 text-sm text-[#737373] dark:text-[#A3A3A3]">
            Prefer the web? All 52 tools live at{" "}
            <Link href="/" className="text-[#6366F1] font-medium hover:underline">sammapix.com</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
