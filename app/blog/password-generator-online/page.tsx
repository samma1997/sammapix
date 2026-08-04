import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Free Password Generator Online — No Upload [2026]",
  description:
    "Generate strong random passwords in your browser. No upload, no server. crypto.getRandomValues, strength meter, custom options. Free.",
  alternates: {
    canonical: `${APP_URL}/blog/password-generator-online`,
  },
  keywords: [
    "password generator",
    "password generator online",
    "strong password generator",
    "random password generator",
    "secure password generator",
    "free password generator",
    "password generator no upload",
    "crypto password generator",
    "browser password generator",
    "password strength meter",
  ],
  openGraph: {
    title: "Free Password Generator Online — No Upload [2026]",
    description:
      "Generate strong random passwords in your browser. crypto.getRandomValues runs locally — no server, no upload, no account. Strength meter with entropy. Free.",
    url: `${APP_URL}/blog/password-generator-online`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Password Generator Online — No Upload [2026]",
    description:
      "Generate strong random passwords locally in your browser. No upload, no server. crypto.getRandomValues, strength meter, entropy display. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/password-generator-online`;
const POST_TITLE = "Free Password Generator Online — No Upload [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A complete guide to generating strong, random passwords entirely in your browser. Covers what makes a password strong (entropy in bits, length vs complexity), why crypto.getRandomValues is the only correct source of randomness, how to read a strength meter, which character sets to choose, how to use the passwords with a password manager, and why generating locally — with nothing sent to a server — is the only safe approach for a free online tool.",
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
    "password generator online",
    "strong password generator",
    "random password generator",
    "crypto.getRandomValues",
    "password entropy",
    "password strength meter",
    "browser password generator no upload",
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
  name: "How to Generate a Strong Password Online",
  description:
    "Generate a cryptographically random, strong password entirely in your browser using the SammaPix Password Generator. No password is ever sent to a server. crypto.getRandomValues runs locally. Free.",
  totalTime: "PT1M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Password Generator (browser-based, free)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Open the Password Generator",
      text: "Go to sammapix.com/tools/password-generator in any modern browser. No account, no extension, no install required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Set your length",
      text: "Drag the length slider or type a value. For general accounts use 16 characters minimum. For high-value accounts (banking, email, cloud storage) use 20 or more.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Choose character sets",
      text: "Enable uppercase letters, lowercase letters, numbers, and symbols. The more sets you include, the higher the entropy and the harder the password is to crack.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Optionally exclude ambiguous characters",
      text: "Toggle the exclude-ambiguous option to remove characters like 0, O, l, 1, I that look similar. Useful when you need to type the password by hand.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Copy the password into your password manager",
      text: "Click Copy. Open your password manager, create a new entry for the site, and paste. Never store the password in a text file, email, or browser note.",
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
      name: "What makes a password strong?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two factors dominate: length and randomness. A 16-character password drawn from all printable ASCII characters has roughly 105 bits of entropy — enough to make brute-force attacks computationally infeasible even with modern GPU clusters. Adding a 17th character roughly doubles the search space. Complexity (mixing upper, lower, digits, symbols) matters, but it amplifies length rather than replacing it. A 20-character lowercase-only random password is far stronger than an 8-character one with symbols. The word 'P@ssw0rd' has very low effective entropy because humans follow predictable substitution patterns that attackers model explicitly.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to generate a password in a browser?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, if and only if the generator uses crypto.getRandomValues — the Web Crypto API — and does not send anything to a server. The SammaPix Password Generator uses crypto.getRandomValues exclusively for all randomness. No password is transmitted. You can verify this by opening browser DevTools (F12), going to the Network tab, and generating passwords. You will see zero outgoing requests carrying password data. The computation happens entirely in your browser tab's JavaScript engine. The risk with other online generators is that they may log generated passwords on their server, use Math.random() (which is not cryptographically secure), or both.",
      },
    },
    {
      "@type": "Question",
      name: "What is entropy in the context of passwords?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Entropy measures unpredictability in bits. For a password generated uniformly at random from a character set of size N and length L, the entropy is L × log2(N) bits. A 16-character password using all 94 printable ASCII characters has 16 × log2(94) ≈ 104.9 bits of entropy. At 10^12 guesses per second (a high-end GPU cluster), cracking a 105-bit password would take approximately 10^17 years. The strength meter in the SammaPix generator displays the computed entropy in bits so you can see the exact mathematical strength of each password configuration.",
      },
    },
    {
      "@type": "Question",
      name: "How long should my password be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "16 characters is the minimum for any account you care about. 20 characters is a comfortable general-purpose target. 24 or more for master passwords of password managers, email accounts, and cloud storage — these are high-value targets. For throwaway registrations you do not care about, 12 is fine. The rationale: at current cracking speeds, a properly salted and hashed 16-character random password from a full character set is beyond practical attack. At 12 characters the margin is comfortable but not extreme. At 8 characters you are depending entirely on the site's hashing algorithm being slow enough — something you cannot verify.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use all character sets (upper, lower, digits, symbols)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Using all four sets increases the effective character set from 26 (lowercase only) to 94 (full printable ASCII), increasing entropy per character from 4.7 bits to 6.5 bits. For a 16-character password this is the difference between 75 and 104 bits — significant. However, some sites reject certain symbols or have a maximum allowed set. In that case, use what the site allows and compensate by increasing length. The exclude-ambiguous option (which removes 0, O, l, 1, I) very slightly reduces entropy but makes typing by hand much easier — a reasonable tradeoff for the rare cases where you type passwords manually.",
      },
    },
    {
      "@type": "Question",
      name: "What is crypto.getRandomValues and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "crypto.getRandomValues is the browser's cryptographically secure random number generator, part of the Web Crypto API. It draws entropy from the operating system's secure entropy pool (e.g. /dev/urandom on Linux), which collects unpredictable noise from hardware events. This makes its output statistically indistinguishable from true randomness for cryptographic purposes. By contrast, Math.random() — the alternative available in JavaScript — is a pseudo-random number generator with a small internal state that is not designed for security. A determined attacker who observes a few outputs of Math.random() can reconstruct the internal state and predict all future values. Any password generator that uses Math.random() is fundamentally unsafe, regardless of how it looks on screen.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a password manager to use these passwords?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, practically speaking. A 20-character random password like 'k#9Lm@Xq2vPwB!rZ8nFc' is impossible to memorize across hundreds of sites. The entire point of a random password generator is to produce passwords too strong to remember — and delegate storage to a dedicated manager. Good free options include Bitwarden (open-source, audited) and KeePassXC (local, no cloud). Paid options include 1Password and Dashlane. The workflow: generate a password here, immediately copy it into a new entry in your manager, save. Never paste it into a note, email, or text file.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from the password my browser suggests?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Browser-generated passwords (Safari, Chrome, Firefox) are also cryptographically random and safe — they use the same underlying OS entropy source. The SammaPix Password Generator adds configurability: custom length, symbol inclusion, ambiguous-character exclusion, and an explicit entropy display. Browser suggestions are opinionated (typically 20 characters, mixed case, digits) and tied to the browser's password manager. If you use a third-party manager like Bitwarden or 1Password, generating passwords here and pasting them into your manager is the equivalent workflow, with full control over the output format.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PasswordGeneratorOnlinePage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="password-generator-online"
        description="Every security guide tells you to use a strong, unique password. Fewer explain what that actually means, why the common advice about symbols is mostly misplaced, and how to generate truly random passwords without trusting a server with the output. This guide covers all of it — including how to verify that the generator never sends anything anywhere."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Privacy"]}
        readingTime={10}
        headings={[
          { id: "what-makes-password-strong", title: "What makes a password strong" },
          { id: "entropy-explained", title: "Entropy explained in bits" },
          { id: "length-vs-complexity", title: "Why length beats complexity" },
          { id: "crypto-getrandomvalues", title: "crypto.getRandomValues: why it matters" },
          { id: "character-sets", title: "Choosing character sets" },
          { id: "strength-meter", title: "How to read a strength meter" },
          { id: "privacy-no-server", title: "Why local generation is the only safe option" },
          { id: "password-manager", title: "Using these passwords with a password manager" },
          { id: "how-to-generate", title: "How to generate a password, step by step" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "Password strength is primarily a function of length and randomness. A 16-character random password from a full character set has over 100 bits of entropy — computationally uncrackable by current standards.",
          "The only safe randomness source for browser-based password generation is crypto.getRandomValues (Web Crypto API), which draws from the OS entropy pool. Math.random() is not cryptographically secure and should never be used.",
          "The SammaPix Password Generator generates passwords entirely in your browser. No password is ever transmitted. Verifiable via browser DevTools Network tab.",
          "Complexity (symbols, mixed case) amplifies length but does not replace it. 'P@ssw0rd' has far lower effective entropy than a 16-character random string because humans follow predictable substitution patterns.",
          "Random passwords are intended to be stored in a password manager (Bitwarden, 1Password, KeePassXC), not memorized. Generate, copy, paste into your manager immediately.",
          "The exclude-ambiguous option (removes 0/O/l/1/I) slightly reduces entropy but makes manual entry much easier — a reasonable tradeoff when you must type a password by hand.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Lock on a laptop keyboard symbolizing online password security and cryptographic random password generation."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              A strong password is not memorable — it is random, long, and stored in a manager. Here is how to generate one without trusting a server.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Generate a strong password — runs entirely in your browser
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              crypto.getRandomValues for true randomness. Custom length, character sets, ambiguous-character exclusion, entropy display. No server, no upload, no account.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <Link
                href="/tools/password-generator"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                Open Password Generator, Free
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/blog/strong-password-generator"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Why length wins: the full guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tools/hash-generator"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Hash Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: What makes a password strong ───────────────────────── */}

        <h2 id="what-makes-password-strong" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          What makes a password strong
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Password strength is a mathematical property, not a feeling. A password is strong when an attacker who knows your generation method — the character set and length you used — cannot feasibly try all possibilities in any reasonable timeframe. The measure is called entropy, expressed in bits.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Three factors control strength: length, character set size, and randomness. Randomness is the foundational one. A password that looks complex but follows a pattern — keyboard walks like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">qwerty123</code>, substitutions like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">P@ssw0rd</code>, or names with birth years — has far lower practical entropy than its character set suggests, because attackers specifically model these patterns in their attack dictionaries.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A truly random password — generated by a cryptographically secure source with no human input shaping the output — has full mathematical entropy. Every character position is independent of every other. There is no pattern to exploit, no dictionary to check, no substitution list that shortens the search. The only attack is brute force across the entire search space.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is why using a proper random password generator is not optional advice — it is the only way to guarantee that the password you create has the strength implied by its length and character set.
        </p>

        {/* ── Section 2: Entropy explained ──────────────────────────────────── */}

        <h2 id="entropy-explained" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Entropy explained in bits
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Entropy for a randomly generated password is simple to calculate: <strong className="text-gray-800 dark:text-[#E5E5E5]">entropy (bits) = length × log₂(character set size)</strong>. Each additional character multiplies the search space by the character set size. Each additional bit of entropy doubles the work required to crack the password.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Length</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Character set</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Entropy (bits)</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Time to crack at 10¹² guesses/sec</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">8</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Lowercase only (26)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">37.6</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400 font-medium">~0.2 seconds</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">8</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full ASCII (94)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">52.4</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-orange-600 dark:text-orange-400 font-medium">~1.5 hours</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">12</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full ASCII (94)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">78.6</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-yellow-600 dark:text-yellow-400 font-medium">~9.5 million years</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">16</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full ASCII (94)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">104.9</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">~10¹⁷ years</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">20</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Full ASCII (94)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">131.1</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Heat death of the universe</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The jump from 8 to 12 characters is enormous — from hours to millions of years. The jump from 12 to 16 adds another 26 bits, pushing the crack time to astronomical levels. Beyond 16 characters with a full character set, you are in territory where brute force is physically impossible regardless of foreseeable increases in computing power.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          These numbers assume the attacker is attacking the hash of your password — the form it is stored in if the site uses proper hashing. They also assume your password is truly random. A human-chosen 16-character password with common patterns could have an effective entropy of only 30–40 bits despite its length.
        </p>

        {/* ── Section 3: Length vs complexity ───────────────────────────────── */}

        <h2 id="length-vs-complexity" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why length beats complexity
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The conventional advice — uppercase, lowercase, number, symbol — is not wrong, but it is incomplete and frequently misapplied. Requiring symbols without requiring length results in passwords like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">S3cur3!</code>. This password has 7 characters and about 43 bits of entropy — crackable in minutes even with symbols included.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The math: adding symbols expands the character set from 62 (upper + lower + digits) to 94 characters. That increases entropy per character from 5.95 bits to 6.55 bits — an improvement of 0.6 bits per character. Adding one extra character of length increases entropy by 6.55 bits. Length is roughly 10 times more impactful per unit of user effort than adding a character class.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The deeper issue with human-chosen "complex" passwords is pattern predictability. When people add symbols to passwords, they follow predictable rules: substitute @ for a, ! for i, 0 for o, $ for s. Attackers include these substitution rules in their attack dictionaries. The word <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">P@ssw0rd</code> is cracked within seconds by any modern attack tool — despite containing uppercase, lowercase, digit, and symbol.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The NIST Digital Identity Guidelines (SP 800-63B) revised in 2024 explicitly deprioritize complexity requirements in favor of length, noting that complexity rules lead to predictable workarounds and reduced usability without improving security. The practical upshot: a 20-character random password using only lowercase letters is stronger than a 10-character password with all four character classes, if both are generated randomly.
        </p>

        {/* ── Section 4: crypto.getRandomValues ─────────────────────────────── */}

        <h2 id="crypto-getrandomvalues" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          crypto.getRandomValues: why it matters
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Not all randomness is equal. JavaScript provides two sources of random numbers: <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Math.random()</code> and <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">crypto.getRandomValues()</code>. For password generation, only the second is acceptable.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Math.random()</code> is a pseudo-random number generator — an algorithm that produces sequences that appear random but are fully deterministic given the initial seed. Most browser implementations use a variant of xorshift128+ with a 128-bit state. An attacker who observes a few output values can reconstruct the internal state and predict every future value. This makes any password generated with <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Math.random()</code> theoretically predictable.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">crypto.getRandomValues()</code> is the Web Crypto API's cryptographically secure random number generator. It draws entropy from the operating system's secure entropy source — on Linux this is <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">/dev/urandom</code>, which collects unpredictable noise from hardware events (disk timing, network interrupts, CPU jitter). The output is statistically indistinguishable from true randomness for all practical cryptographic purposes.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The SammaPix Password Generator uses <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">crypto.getRandomValues()</code> exclusively. Every character in every generated password is drawn from this source. This guarantees that the mathematical entropy of your password is its actual effective entropy — no reduction due to predictable patterns.
        </p>

        {/* ── Section 5: Character sets ──────────────────────────────────────── */}

        <h2 id="character-sets" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Choosing character sets
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The character set controls how many symbols are available at each position. Larger sets mean more entropy per character. Here is how the available options compare:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Character set</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Size</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Bits per char</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Lowercase only</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">26</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">4.70</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Weakest per character. Compensate with 20+ length.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Upper + Lower</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">52</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">5.70</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Easier to type manually than symbols.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">Upper + Lower + Digits</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">62</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">5.95</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Good balance. Compatible with all sites.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">All printable ASCII</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">94</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">6.55</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Maximum entropy per character. Some sites block certain symbols.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4] font-medium">All ASCII minus ambiguous</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">~88</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">6.46</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Removes 0/O/l/1/I. Tiny entropy loss, much easier manual entry.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The practical recommendation: use all four character classes (upper, lower, digits, symbols) at 16 characters minimum for password-manager-stored passwords. For the rare cases where you must type manually, enable the exclude-ambiguous option and increase length by 2 to compensate.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Some sites impose character restrictions — maximum length, no symbols, or only specific symbols. In these cases, match the site's constraints and increase length as far as the site allows. If a site limits passwords to 10 characters, consider whether you trust it with sensitive data at all: short password limits often indicate poor security practices or plaintext storage.
        </p>

        {/* ── CTA Block #1 ─────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Generate a strong random password — 100% in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            crypto.getRandomValues, custom length, all character sets, exclude ambiguous, entropy display. No upload. No server. Verifiable via DevTools.
          </p>
          <Link
            href="/tools/password-generator"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Password Generator, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 6: Strength meter ─────────────────────────────────────── */}

        <h2 id="strength-meter" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to read a strength meter
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most password strength meters use a combination of heuristics: length, character variety, and absence of dictionary words. These are useful but imprecise. A meter that shows "strong" for <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">Tr0ub4dor&3</code> is misleading — that specific password is now famous from the XKCD comic and appears in attack wordlists.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The SammaPix Password Generator displays the computed entropy in bits alongside the visual meter. This is more meaningful than a color bar. You can read the exact mathematical strength of your configuration before generating. The thresholds:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Under 40 bits</strong>: weak. Crackable in seconds to minutes by offline attack.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">40–60 bits</strong>: marginal. Crackable in hours to days with dedicated hardware.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">60–80 bits</strong>: moderate. Years with current hardware. Sufficient for low-value accounts.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">80–100 bits</strong>: strong. Beyond practical attack for the foreseeable future.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">100+ bits</strong>: excellent. Use for all accounts you care about.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          These thresholds assume the password is stored as a properly salted hash (bcrypt, Argon2, scrypt). If a site stores passwords in plaintext or with a fast unsalted hash (MD5, SHA-1 without bcrypt), any password can be exposed in a breach regardless of strength — another reason to use a unique password for every site, so one breach does not cascade.
        </p>

        {/* ── Section 7: Privacy, no server ─────────────────────────────────── */}

        <h2 id="privacy-no-server" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why local generation is the only safe option
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          An online password generator that sends requests to a server has a fundamental problem: the server operator could log every generated password, paired with your IP address and timestamp. Even if the operator is trustworthy, the server is an attack surface. A breach of the server's logs could expose generated passwords that are still actively in use.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is not a hypothetical concern. In 2023, LastPass disclosed that encrypted password vaults were stolen in a breach — and the attacker had access to unencrypted metadata. A generator that logs output is structurally similar: the sensitive data exists on a server you do not control.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The SammaPix Password Generator generates passwords entirely in your browser tab. The process:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The JavaScript code loads once</strong> when the page loads. After that, no server communication is needed for generation.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">crypto.getRandomValues()</strong> is called in-browser. The OS provides entropy. No request leaves your device.
          </li>
          <li className="text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc text-sm">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">The generated password is displayed locally.</strong> It never touches a network request.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          You can verify this yourself. Open browser DevTools (F12), go to the Network tab, filter by "XHR" or "Fetch", and generate several passwords. Watch the network log. You will see no outgoing requests during or after generation.
        </p>

        {/* ── Section 8: Password manager ───────────────────────────────────── */}

        <h2 id="password-manager" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Using these passwords with a password manager
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          A random 20-character password is impossible to memorize. This is a feature, not a bug. The entire security model of random password generation assumes that storage is delegated to a dedicated manager. The workflow is:
        </p>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Create an account on a new site.</strong> Reach the "choose password" step.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open the Password Generator.</strong> Set your length (16 minimum, 20+ preferred) and character sets.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Copy the generated password.</strong> Paste it into the password field on the site.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Immediately save it to your password manager.</strong> Do not complete the site registration first. Save before anything can go wrong.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Complete the registration.</strong> The password is now secured in your manager, tied to the correct site URL.
          </li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Good password manager options at a range of price points: <strong className="text-gray-800 dark:text-[#E5E5E5]">Bitwarden</strong> (free tier, open-source, independently audited), <strong className="text-gray-800 dark:text-[#E5E5E5]">KeePassXC</strong> (free, local-only, no cloud), <strong className="text-gray-800 dark:text-[#E5E5E5]">1Password</strong> (paid, strong audit history, Travel Mode), <strong className="text-gray-800 dark:text-[#E5E5E5]">Dashlane</strong> (paid, dark web monitoring included).
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          One critical note: your password manager master password should itself be strong and memorable — this is the one exception to the "never memorize" rule. Use a long passphrase of 5–6 random words (diceware), which achieves 65–78 bits of entropy while remaining possible to memorize. Do not generate your master password with a random character generator — you need to be able to enter it from memory.
        </p>

        {/* ── CTA Block #2 ─────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Generate and copy a strong password now</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Set your length, pick your character sets, see the entropy in bits. Paste into your password manager. No server, no upload.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/password-generator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Password Generator, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/strong-password-generator"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              Why password length wins <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 9: How to generate step by step ───────────────────────── */}

        <h2 id="how-to-generate" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to generate a password online, step by step
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open the generator.</strong> Go to <Link href="/tools/password-generator" className="text-[#6366F1] hover:underline">sammapix.com/tools/password-generator</Link>. No login, no extension.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set the length.</strong> Use the slider or input field. Start at 16. Go to 20+ for important accounts.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Enable character sets.</strong> Turn on uppercase, lowercase, digits, and symbols for maximum entropy.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Check the entropy display.</strong> Confirm you have 100+ bits for accounts you care about.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Copy.</strong> The password is copied to clipboard and has never left your browser.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Paste into your password manager immediately.</strong> Do not paste into a text editor first.
          </li>
        </ol>

        {/* ── Section 10: Related tools ─────────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/password-generator" className="text-[#6366F1] hover:underline">Password Generator</Link></strong>: the tool covered in this article. Custom length, character sets, exclude ambiguous, entropy display. No upload. See also: <Link href="/blog/strong-password-generator" className="text-[#6366F1] hover:underline">Why password length wins — the full guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/hash-generator" className="text-[#6366F1] hover:underline">Hash Generator</Link></strong>: compute MD5, SHA-1, SHA-256, SHA-384, or SHA-512 from text or a file. Entirely in-browser. See: <Link href="/blog/hash-generator-online" className="text-[#6366F1] hover:underline">Hash Generator guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/url-encode-decode" className="text-[#6366F1] hover:underline">URL Encode / Decode</Link></strong>: encode or decode percent-encoded URLs in your browser. See: <Link href="/blog/url-encode-decode-online" className="text-[#6366F1] hover:underline">URL encode / decode guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/exif" className="text-[#6366F1] hover:underline">EXIF Viewer</Link></strong>: check what metadata is embedded in your photos before sharing. GPS coordinates, camera settings, timestamps — all readable without upload.
          </li>
        </ul>

        {/* ── CTA Block #3 ─────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Browser-based security and privacy tools</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Generate passwords, hash files, encode URLs — all in your browser. No upload, no server, no account.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/password-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Password Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/hash-generator" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              Hash Generator <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link href="/tools/url-encode-decode" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              URL Encode / Decode <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
