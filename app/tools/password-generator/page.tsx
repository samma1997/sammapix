import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import PasswordGeneratorClient from "@/components/tools/PasswordGeneratorClient";
import RelatedTools from "@/components/tools/RelatedTools";
import Link from "next/link";

const TOOL_URL = `${APP_URL}/tools/password-generator`;

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Free Password Generator: Strong & Secure, No Upload",
  description:
    "Generate strong, random passwords in your browser using crypto.getRandomValues — nothing is sent anywhere, ever. Choose length, character sets, and see entropy in bits.",
  keywords: [
    "password generator",
    "strong password generator",
    "random password generator",
    "secure password generator no signup",
    "password generator no upload",
    "online password generator",
    "crypto random password",
    "free password generator",
    "generate secure password",
    "strong password maker",
    "random strong password",
    "password entropy calculator",
  ],
  alternates: {
    canonical: TOOL_URL,
  },
  openGraph: {
    title: "Free Password Generator: Strong & Secure, No Upload",
    description:
      "Generate random, strong passwords instantly in your browser. Runs with crypto.getRandomValues — zero uploads, zero tracking.",
    url: TOOL_URL,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Password Generator: Strong & Secure, No Upload",
    description:
      "Strong random passwords generated locally in your browser. No upload, no account required.",
  },
};

// ── JSON-LD Schemas ───────────────────────────────────────────────────────────

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free Password Generator",
  description:
    "Generate cryptographically secure random passwords entirely in your browser using the Web Crypto API (crypto.getRandomValues). Choose length, uppercase, lowercase, numbers, symbols, and see the entropy in bits in real time. Nothing is ever uploaded.",
  url: TOOL_URL,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  browserRequirements: "Requires JavaScript",
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
    "Cryptographically secure randomness via crypto.getRandomValues (CSPRNG)",
    "Configurable length from 4 to 64 characters",
    "Uppercase, lowercase, numbers and symbols toggle",
    "Exclude ambiguous characters (l, 1, I, O, 0) option",
    "Real-time entropy estimator in bits (length × log2(pool size))",
    "Visual strength meter: Weak / Fair / Strong / Very strong",
    "Generate up to 10 passwords at once",
    "One-click copy per password and copy-all",
    "100% client-side — passwords never leave your browser",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are the passwords safe? Are they sent anywhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, they are safe. No, they are never sent anywhere. This tool uses the browser's native crypto.getRandomValues API (a CSPRNG — cryptographically secure pseudo-random number generator) to generate passwords entirely on your device. No data ever leaves your browser — not the passwords, not your settings, nothing.",
      },
    },
    {
      "@type": "Question",
      name: "How long should a password be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Security experts generally recommend at least 16 characters for important accounts, and 20+ for critical accounts like email, banking, and password managers. This tool uses 20 as the default. A 20-character password using uppercase, lowercase, numbers and symbols achieves roughly 130 bits of entropy — practically impossible to brute-force.",
      },
    },
    {
      "@type": "Question",
      name: "What does 'entropy in bits' mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Entropy measures how unpredictable a password is. It is calculated as: length × log₂(pool size). For example, a 20-character password using all four character sets (pool of ~88 symbols) has about 20 × log₂(88) ≈ 130 bits of entropy. 60+ bits is generally considered strong; 90+ bits is very strong; 128+ bits is practically unbreakable with current technology.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I exclude ambiguous characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Characters like l (lowercase L), 1 (one), I (uppercase i), O (uppercase o), and 0 (zero) look nearly identical in many fonts. Excluding them makes passwords easier to read and type manually when you cannot copy-paste — for example when entering a password on a device that doesn't have a clipboard. It slightly reduces the pool size (and thus entropy), so only enable this if you need to type the password by hand.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool better than using a password manager's built-in generator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Password manager generators are also excellent and safe. This tool is ideal when you need a quick, independent password without opening an app, or when you want to visually inspect the entropy and character composition. We still strongly recommend storing generated passwords in a password manager (Bitwarden, 1Password, etc.) — never reuse passwords or write them on paper.",
      },
    },
    {
      "@type": "Question",
      name: "What is crypto.getRandomValues and why is Math.random() not used?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Math.random() is a pseudo-random number generator (PRNG) that is NOT cryptographically secure — its output can be predicted if you observe enough values. crypto.getRandomValues is the browser's cryptographic RNG, seeded by the operating system's entropy source (hardware events, timing, etc.). It is the same source used for TLS key generation and is safe for security-sensitive purposes like password generation.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",   item: APP_URL },
    { "@type": "ListItem", position: 2, name: "Tools",  item: `${APP_URL}/tools` },
    { "@type": "ListItem", position: 3, name: "Password Generator", item: TOOL_URL },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to generate a strong password online for free",
  description:
    "Create a secure random password in seconds using this free browser-based generator — no upload, no account.",
  totalTime: "PT1M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Set your length and character options",
      text: "Use the slider to choose a password length from 4 to 64 characters (default: 20). Enable or disable uppercase, lowercase, numbers and symbols. Optionally exclude ambiguous characters like l, 1, I, O, 0.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Check the strength meter",
      text: "The strength meter shows an estimated entropy in bits and a label: Weak, Fair, Strong, or Very strong. Aim for at least 90 bits (Strong) for any important account.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy and save your password",
      text: "Click Copy next to the generated password to copy it to your clipboard. Immediately paste it into your password manager. Click Regenerate to get a new password at any time.",
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PasswordGeneratorPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* ── Hero split ── */}
      <div className="bg-white dark:bg-[#191919] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-10 pb-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[11px] text-[#A3A3A3] mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#525252] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-[#525252] transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-[#525252] dark:text-[#737373]">Password Generator</span>
          </nav>

          {/* Title block */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#6366F114" }}
              aria-hidden="true"
            >
              {/* Inline lock + scrolling chars icon */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <style>{`
                  @keyframes pg-chars {
                    0%   { transform: translateY(0px);  opacity: 1; }
                    78%  { transform: translateY(-14px); opacity: 0.2; }
                    79%  { transform: translateY(14px);  opacity: 0; }
                    100% { transform: translateY(0px);  opacity: 1; }
                  }
                  @keyframes pg-glow {
                    0%, 100% { opacity: 0.5; }
                    50%      { opacity: 1; }
                  }
                  .pg-chars { animation: pg-chars 2.6s cubic-bezier(0.4,0,0.2,1) infinite; }
                  .pg-glow  { animation: pg-glow 2.6s ease-in-out infinite; }
                `}</style>
                {/* Lock body */}
                <rect x="10" y="22" width="28" height="20" rx="4" fill="#6366F1" fillOpacity="0.15" stroke="#6366F1" strokeWidth="1.75"/>
                {/* Lock shackle */}
                <path d="M17 22V17a7 7 0 0114 0v5" stroke="#6366F1" strokeWidth="1.75" strokeLinecap="round" fill="none"/>
                {/* Keyhole */}
                <circle cx="24" cy="31" r="2.5" fill="#6366F1" fillOpacity="0.8"/>
                <rect x="22.75" y="31.5" width="2.5" height="4" rx="1" fill="#6366F1" fillOpacity="0.8"/>
                {/* Scrolling chars top-right */}
                <g className="pg-chars" style={{ clipPath: "inset(0 0 0 0)" }}>
                  <text x="34" y="11" fontSize="5" fill="#6366F1" fontWeight="700" fontFamily="monospace" fillOpacity="0.9">A#</text>
                  <text x="34" y="17" fontSize="5" fill="#6366F1" fontWeight="700" fontFamily="monospace" fillOpacity="0.65">9!</text>
                  <text x="34" y="23" fontSize="5" fill="#6366F1" fontWeight="700" fontFamily="monospace" fillOpacity="0.4">z@</text>
                </g>
                {/* Glow dot */}
                <circle className="pg-glow" cx="38" cy="6" r="3" fill="#6366F1" fillOpacity="0.6"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5] leading-tight mb-1">
                Free Password Generator
              </h1>
              <p className="text-sm text-[#737373] dark:text-[#A3A3A3] leading-relaxed">
                Generate strong, random passwords in your browser — nothing is sent anywhere, ever.
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {["100% Free", "No Upload", "No Signup", "CSPRNG", "Entropy Meter", "Up to 64 chars"].map((b) => (
              <span
                key={b}
                className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded border bg-gray-50 text-gray-500 border-gray-200 dark:bg-[#2A2A2A] dark:text-[#A3A3A3] dark:border-[#3A3A3A]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tool ── */}
      <div className="bg-white dark:bg-[#191919] py-8">
        <PasswordGeneratorClient />
      </div>

      {/* ── Related tools ── */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-8">
        <RelatedTools toolId="password-generator" />
      </div>

      {/* ── SEO content ── */}
      <div className="bg-[#FAFAFA] dark:bg-[#111] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-10">

          {/* About */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Cryptographically secure, entirely in your browser
            </h2>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed mb-3">
              This generator uses{" "}
              <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">
                crypto.getRandomValues
              </code>
              {" "}— the browser&apos;s built-in CSPRNG, seeded by the operating system&apos;s hardware entropy source. It is the same API used for TLS key generation, not the weaker{" "}
              <code className="text-xs font-mono bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded">
                Math.random()
              </code>
              {" "}which is predictable and NOT suitable for passwords.
            </p>
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              Rejection sampling is used to eliminate modulo bias — a subtle issue where naive implementations favor some characters slightly more than others. Every character in your pool has an exactly equal probability of being selected.
            </p>
          </section>

          {/* Strength guide */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              How much entropy do you need?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Weak",
                  bits: "< 40 bits",
                  color: "text-red-600 bg-red-50 dark:bg-red-900/10",
                  desc: "Vulnerable to brute force on consumer hardware within hours or days. Never use for real accounts.",
                },
                {
                  label: "Fair",
                  bits: "40-59 bits",
                  color: "text-amber-600 bg-amber-50 dark:bg-amber-900/10",
                  desc: "Acceptable for low-value, non-critical accounts. Could be cracked with sustained effort by determined attackers.",
                },
                {
                  label: "Strong",
                  bits: "60-89 bits",
                  color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10",
                  desc: "Good for most personal accounts. Resists all but the most determined adversaries with significant compute power.",
                },
                {
                  label: "Very strong",
                  bits: "90+ bits",
                  color: "text-[#6366F1] bg-[#6366F1]/10",
                  desc: "Recommended for critical accounts: email, banking, password managers. Practically unbreakable with current technology.",
                },
              ].map(({ label, bits, color, desc }) => (
                <div key={label} className="px-4 py-4 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E]">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">{label}</p>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${color}`}>{bits}</span>
                  </div>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Password security best practices
            </h2>
            <ul className="space-y-2 text-sm text-[#525252] dark:text-[#A3A3A3]">
              <li className="flex gap-2"><span className="text-[#6366F1] font-bold shrink-0">—</span><span><strong className="text-[#171717] dark:text-[#E5E5E5]">Use a unique password for every account.</strong> If one service is breached, attackers use credential stuffing to try the same password everywhere else.</span></li>
              <li className="flex gap-2"><span className="text-[#6366F1] font-bold shrink-0">—</span><span><strong className="text-[#171717] dark:text-[#E5E5E5]">Store passwords in a password manager.</strong> Bitwarden (free, open source), 1Password, or similar. Never in a plain text file or browser notes.</span></li>
              <li className="flex gap-2"><span className="text-[#6366F1] font-bold shrink-0">—</span><span><strong className="text-[#171717] dark:text-[#E5E5E5]">Enable 2FA on every account that supports it.</strong> A strong password + TOTP 2FA makes account takeover extremely difficult even if the password leaks.</span></li>
              <li className="flex gap-2"><span className="text-[#6366F1] font-bold shrink-0">—</span><span><strong className="text-[#171717] dark:text-[#E5E5E5]">Aim for 20+ characters.</strong> Length increases entropy faster than adding character sets. A 20-char lowercase-only password beats a 10-char mixed-set one.</span></li>
              <li className="flex gap-2"><span className="text-[#6366F1] font-bold shrink-0">—</span><span><strong className="text-[#171717] dark:text-[#E5E5E5]">Never share passwords over unencrypted channels.</strong> Use a password manager&apos;s sharing feature or a service like Bitwarden Send.</span></li>
            </ul>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
              Related tools
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: "/tools/hash-generator",    label: "Hash Generator",       desc: "MD5, SHA-256, SHA-512 from text or file" },
                { href: "/tools/url-encode-decode", label: "URL Encoder / Decoder", desc: "Percent-encode and decode URLs" },
                { href: "/tools/qr-code-generator", label: "QR Code Generator",    desc: "Generate QR codes client-side" },
              ].map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="px-3 py-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg bg-white dark:bg-[#1E1E1E] hover:border-[#6366F1]/60 transition-colors"
                >
                  <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] mb-0.5">{t.label}</p>
                  <p className="text-[11px] text-[#737373]">{t.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((q) => (
                <div key={q.name} className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-lg px-4 py-4 bg-white dark:bg-[#1E1E1E]">
                  <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1.5">{q.name}</p>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
