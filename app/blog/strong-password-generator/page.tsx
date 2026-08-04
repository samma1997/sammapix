import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import BlogArticleLayout from "@/components/blog/BlogArticleLayout";

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Strong Password Generator — Length Wins [2026]",
  description:
    "Why password length beats complexity. Generate secure 16+ char passwords in your browser. No upload, no server. Free, instantly.",
  alternates: {
    canonical: `${APP_URL}/blog/strong-password-generator`,
  },
  keywords: [
    "strong password generator",
    "how to create strong password",
    "secure password",
    "password length",
    "strong password",
    "create strong password",
    "password security",
    "passphrase vs password",
    "password manager",
    "16 character password",
  ],
  openGraph: {
    title: "Strong Password Generator — Length Wins [2026]",
    description:
      "Why length beats complexity in passwords, how to create a truly secure password, and how to generate one instantly in your browser. No upload, no server. Free.",
    url: `${APP_URL}/blog/strong-password-generator`,
    type: "article",
    publishedTime: "2026-08-04",
    authors: ["https://lucasammarco.com"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strong Password Generator — Length Wins [2026]",
    description:
      "Why length beats complexity. How to create a strong password and generate one instantly in your browser. No upload, no server. Free.",
    creator: "@lucasammarco",
  },
};

// ── Schema constants ──────────────────────────────────────────────────────────

const POST_DATE = "2026-08-04";
const POST_DATE_FORMATTED = "August 4, 2026";
const POST_URL = `${APP_URL}/blog/strong-password-generator`;
const POST_TITLE = "Strong Password Generator — Length Wins [2026]";

// ── Article schema ────────────────────────────────────────────────────────────

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: POST_TITLE,
  description:
    "A complete guide to creating strong passwords in 2026. Covers the rules that actually matter (length, uniqueness, randomness), the myths about complexity, the passphrase vs random string tradeoff, how to pair a password generator with a password manager, and how 2FA changes the calculus. Includes a table of weak vs strong password examples and a step-by-step guide to generating secure passwords entirely in your browser without uploading anything.",
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
    "strong password generator",
    "how to create strong password",
    "secure password",
    "password length vs complexity",
    "passphrase vs random password",
    "password manager",
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
  name: "How to Create a Strong Password",
  description:
    "Create a strong, unique, randomly generated password for any account. Use the SammaPix Password Generator in your browser — no upload, no server. Pairs with a password manager for secure storage.",
  totalTime: "PT2M",
  tool: [
    {
      "@type": "HowToTool",
      name: "SammaPix Password Generator (browser-based, free)",
    },
    {
      "@type": "HowToTool",
      name: "A password manager (Bitwarden, 1Password, KeePassXC)",
    },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Decide the password's role",
      text: "Is this a master password (must be memorizable), a regular account (store in manager), or a throwaway registration? This determines your approach: passphrase for master passwords, random 20-character string for everything else.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Open the Password Generator",
      text: "Go to sammapix.com/tools/password-generator. For regular accounts, set length to 20+, enable all character sets, and generate. The password is computed locally — nothing is sent to a server.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Copy and paste immediately",
      text: "Click Copy. Paste directly into the site's password field and simultaneously into your password manager. Never store the password in a note or email.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Enable 2FA on the account",
      text: "After setting the password, enable two-factor authentication if the site offers it. Use an authenticator app (not SMS) for best security. 2FA prevents credential-stuffing attacks even if your password is compromised in a breach.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Verify uniqueness",
      text: "Each account must have a different password. The manager handles this — you only need to remember one master password. If you reuse passwords, a single breach exposes every account sharing that password.",
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
      name: "How long should a strong password be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "16 characters minimum for any account you care about. 20 characters is a comfortable general target that provides over 130 bits of entropy with a full character set — beyond practical attack for decades. For master passwords of password managers, use a memorable 5-6 word passphrase rather than a random string, because you need to type it from memory. For everything else stored in a manager, 20-character random strings are the gold standard.",
      },
    },
    {
      "@type": "Question",
      name: "Is a passphrase better than a random password?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For passwords you must memorize — particularly password manager master passwords — a diceware passphrase (5-6 truly random words) provides 65-78 bits of entropy while remaining memorable. An example: 'correct horse battery staple pepper vine' is far stronger than 'P@ssw0rd!' despite looking simpler. For passwords stored in a manager (which is most passwords), a 20-character random string wins on entropy per character. The choice is memorability vs maximum strength: use passphrases where you need to remember, random strings where you do not.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a strong and a weak password?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Weak passwords share characteristics that attackers exploit: they are short (under 12 characters), based on dictionary words or names, use predictable substitutions (@ for a, 0 for o, ! at the end), reused across sites, or contain personal information (birth dates, pet names, street addresses). Strong passwords are long (16+), generated randomly from a large character set, unique per account, and stored in a manager rather than memorized. The single biggest failure mode is reuse — a 20-character password reused on 50 sites means one breach exposes all 50.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use special characters in every password?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most modern sites accept all printable ASCII symbols. A minority have restrictions: some reject certain symbols (quotes, backslashes, angle brackets) for historical reasons related to SQL injection protection or legacy form parsing. Some cap passwords at 20 characters — a red flag suggesting poor password handling. When a site rejects your generated password, try removing symbols first. If the site caps at a low number like 8-10 characters, the site's security practices are questionable regardless of what you put in the field.",
      },
    },
    {
      "@type": "Question",
      name: "Does 2FA make password strength less important?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "2FA significantly reduces the risk of credential-stuffing and phishing attacks — an attacker who has your password still cannot log in without the second factor. However, 2FA does not eliminate the need for a strong password. If a service suffers a database breach and passwords are stored weakly (MD5, SHA-1 without bcrypt), a short password can be cracked offline — before you are even notified of the breach. 2FA protects against login attempts; a strong password protects against offline cracking of stolen hashes. Both are necessary, not alternatives.",
      },
    },
    {
      "@type": "Question",
      name: "Should I change my passwords regularly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NIST SP 800-63B (2024 revision) explicitly recommends against mandatory periodic password rotation. Forced rotation leads to predictable patterns (users increment a number or change a symbol), weaker overall passwords, and user fatigue. The correct triggers for changing a password are: evidence of compromise (the site notifies you of a breach), you have reason to believe the password was exposed, or you shared it with someone who should no longer have access. Otherwise, a strong unique password generated randomly does not need to change on a schedule.",
      },
    },
    {
      "@type": "Question",
      name: "Is a password manager safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Password managers substantially improve security for the vast majority of users. The realistic alternative — memorizing unique passwords for hundreds of accounts — is impossible, so people reuse passwords instead. Reuse is catastrophically worse than using a well-designed manager. Well-audited managers (Bitwarden, 1Password) use zero-knowledge architecture: your master password never reaches their servers; only encrypted data does. Even if the manager's servers are breached, attackers get ciphertext they cannot decrypt without your master password. The single point of failure is your master password — protect it with a strong passphrase and 2FA on the manager account itself.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if a site I use suffers a data breach?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If the site used proper password hashing (bcrypt, Argon2, scrypt), a strong unique password is safe even after the breach — cracking it offline would take longer than the heat death of the universe. If the site used weak hashing (MD5, SHA-1, plaintext), your password for that site is potentially exposed, but only that one site — because you used a unique password. Change the breached site's password immediately. Check haveibeenpwned.com to see if your email appears in known breach datasets. This is the core argument for unique passwords: one breach only costs you one password.",
      },
    },
  ],
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function StrongPasswordGeneratorPage() {
  return (
    <>
      <BlogArticleLayout
        title={POST_TITLE}
        slug="strong-password-generator"
        description="Most password advice is wrong in the same direction: it focuses on complexity rules that are hard to follow and easy to game, while underemphasizing the two factors that actually matter — length and randomness. This guide covers the practical rules for creating passwords that are genuinely strong, explains the math behind them, and shows you how to generate one in your browser without trusting a server with the result."
        date={POST_DATE}
        dateFormatted={POST_DATE_FORMATTED}
        tags={["Tools", "Privacy"]}
        readingTime={10}
        headings={[
          { id: "rules-that-matter", title: "The rules that actually matter" },
          { id: "weak-vs-strong", title: "Weak vs strong: examples and why" },
          { id: "length-math", title: "The math: why length wins" },
          { id: "passphrase-vs-random", title: "Passphrase vs random string" },
          { id: "complexity-myth", title: "The complexity myth debunked" },
          { id: "password-manager", title: "Password manager: the missing piece" },
          { id: "two-factor", title: "2FA as a complement to strong passwords" },
          { id: "how-to-generate", title: "How to generate a strong password, step by step" },
          { id: "no-upload", title: "Why generating locally matters" },
          { id: "related-tools", title: "Related tools" },
          { id: "faq", title: "FAQ" },
        ]}
        summary={[
          "The two properties that determine password strength are length and randomness. Complexity (symbols, mixed case) amplifies length but cannot replace it.",
          "A 16-character password drawn randomly from all printable ASCII characters has over 100 bits of entropy — beyond practical brute-force attack with current and foreseeable hardware.",
          "Human-chosen 'complex' passwords like 'P@ssw0rd' have far lower effective entropy than they appear because attackers model substitution patterns explicitly.",
          "Use passphrases (5-6 random words) for passwords you must memorize. Use random 20-character strings for everything stored in a manager.",
          "Every account must have a unique password. Reuse means one breach exposes all accounts sharing that password.",
          "The SammaPix Password Generator uses crypto.getRandomValues in your browser. Nothing is sent to a server — verifiable via browser DevTools.",
          "2FA complements strong passwords but does not replace them. Both protect against different attack vectors.",
        ]}
        heroImage={
          <figure>
            <img
              src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Digital security padlock representing strong password creation and secure credential management."
              className="w-full max-h-[460px] object-cover rounded-lg"
              loading="eager"
            />
            <figcaption className="text-xs text-[#A3A3A3] mt-2 text-center">
              Strong passwords are not memorable — they are random, long, and unique per site. The right tool generates them; a manager stores them.
            </figcaption>
          </figure>
        }
        ctaBlock={
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#E5E5E5] mb-2">
              Generate a strong password now — entirely in your browser
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-4">
              20+ characters, all character sets, entropy display, no server. crypto.getRandomValues produces true cryptographic randomness. No upload, no account.
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
                href="/blog/password-generator-online"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
              >
                Entropy and crypto.getRandomValues explained <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        }
      >

        {/* ── Section 1: Rules that matter ──────────────────────────────────── */}

        <h2 id="rules-that-matter" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The rules that actually matter
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Most password advice comes in lists of complexity requirements: must have uppercase, lowercase, a number, a special character. These rules exist because they were easy to enforce in legacy systems and intuitively sound right. The problem is that they optimize for the wrong thing, produce predictable results, and create passwords that are hard for humans to use while being easier to attack than they appear.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The rules that genuinely determine password security are simpler:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Long enough to resist brute force.</strong> 16 characters minimum from a reasonable character set. 20+ for accounts you care about.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Truly random.</strong> Not invented by a human following any pattern. Generated by a cryptographic source of randomness.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Unique per account.</strong> Every site gets a different password. Reuse is the single most common catastrophic mistake.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Stored in a dedicated manager.</strong> Not in a browser note, a spreadsheet, an email draft, or a sticky note.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Everything else — the specific mix of uppercase, lowercase, digits, and symbols — is secondary to these four. An 8-character password with all four character classes is weaker than a 16-character lowercase-only random string. The character class advice is not wrong; it is just drastically less important than length and randomness, and it is frequently applied in ways that substitute for length rather than complementing it.
        </p>

        {/* ── Section 2: Weak vs strong examples ────────────────────────────── */}

        <h2 id="weak-vs-strong" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Weak vs strong: examples and why
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Real examples illustrate why conventional intuitions about passwords often fail:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Password</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Length</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Looks like</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">Actual security</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] font-mono text-xs text-gray-600 dark:text-[#D4D4D4]">password</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">8</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Obvious</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400 font-medium">Cracked instantly — top of every wordlist</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] font-mono text-xs text-gray-600 dark:text-[#D4D4D4]">P@ssw0rd!</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">9</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Complex</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400 font-medium">Cracked in seconds — substitution pattern in every wordlist</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] font-mono text-xs text-gray-600 dark:text-[#D4D4D4]">Michael1987!</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">11</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Personal, complex</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-red-600 dark:text-red-400 font-medium">Cracked in hours — name + birth year + ! is a known pattern</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] font-mono text-xs text-gray-600 dark:text-[#D4D4D4]">correct-horse-battery</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">21</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Simple words</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-yellow-600 dark:text-yellow-400 font-medium">Moderate — these specific words became famous via XKCD, may be in wordlists</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] font-mono text-xs text-gray-600 dark:text-[#D4D4D4]">vjump-pivot-cobalt-mesa</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">23</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Diceware passphrase</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Strong — 52 bits, very memorizable. Good for master passwords.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] font-mono text-xs text-gray-600 dark:text-[#D4D4D4]">k#9Lm@Xq2vPwB!rZ</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">16</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Random string</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Very strong — 105 bits. Store in manager, do not memorize.</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] font-mono text-xs text-gray-600 dark:text-[#D4D4D4]">Xn7!vQ2mK9pR@cLwFjY3</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">20</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Random string</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Excellent — 131 bits. Physically impossible to crack by brute force.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The key insight from this table: passwords that feel strong (mixed case, symbols, personal meaning) are often weak because attackers model exactly those patterns. Passwords that feel random and unwieldy are genuinely strong because there is no pattern to compress the search space.
        </p>

        {/* ── Section 3: Length math ─────────────────────────────────────────── */}

        <h2 id="length-math" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The math: why length wins
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Each additional character of length multiplies the search space by the size of the character set. Adding one character to a 94-character set increases the number of possible passwords by a factor of 94 — roughly 6.5 bits of entropy. Adding an additional character class (say, adding symbols to an alphanumeric set) goes from 62 to 94 characters — an increase from 5.95 to 6.55 bits per character, or 0.6 bits per character.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Practical implication: adding one character of length is ten times more effective than adding an additional character class, per unit of effort. A 17-character alphanumeric password is stronger than a 16-character password with symbols.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          This is why NIST SP 800-63B (updated 2024) recommends allowing passwords up to 64 characters minimum, encouraging length, and discontinuing forced complexity rules. The security community's consensus has shifted: length requirements produce more predictably strong passwords than complexity requirements.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The current state of GPU-based password cracking: modern rigs can attempt 10¹² (one trillion) SHA-1 hashes per second. Argon2 with a moderate difficulty setting drops this to around 10³ to 10⁵ attempts per second. At 10⁵ attempts per second, cracking a 16-character full-ASCII random password would take approximately 10²⁷ years. The password lifespan is not a concern — the concern is site breaches where your hash is exposed and the site used a fast unsalted algorithm. For strong hashing (bcrypt, Argon2), even 12-character random passwords are practically uncrackable.
        </p>

        {/* ── Section 4: Passphrase vs random ───────────────────────────────── */}

        <h2 id="passphrase-vs-random" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Passphrase vs random string
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The choice between a passphrase and a random character string depends entirely on whether you need to memorize the password.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Diceware passphrases</strong> work by selecting words randomly from a large word list (typically 7,776 words for EFF diceware). Each word adds log₂(7776) ≈ 12.9 bits. Five words gives 64.5 bits — strong enough for a master password. Six words gives 77.4 bits. The advantage is memorability: humans are far better at remembering a sequence of concrete words than a random character string. The requirement is that words are chosen truly randomly, not by you thinking of words that "feel random" — which always introduces predictable patterns.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          <strong className="text-gray-800 dark:text-[#E5E5E5]">Random character strings</strong> (generated by a tool using crypto.getRandomValues) provide more entropy per character — 6.55 bits vs 12.9 bits per word, but words are much longer. A 20-character random string achieves 131 bits. Its disadvantage is that it is impossible to memorize reliably. This is not a problem when stored in a password manager — but it means random strings are the wrong choice for master passwords.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Practical decision rule: use a 6-word diceware passphrase for your password manager master password and any other password you need to type from memory (device login, encryption key). Use 20-character random strings for everything else. Do not use human-invented passphrases ("my dog rex is 5") — the word count with random selection is what provides security; deliberate selection collapses entropy dramatically.
        </p>

        {/* ── CTA Block #1 ─────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Generate a strong 20-character password — no upload</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            crypto.getRandomValues, all character sets, entropy display. Runs entirely in your browser. No server, no account.
          </p>
          <Link
            href="/tools/password-generator"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Password Generator, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        {/* ── Section 5: Complexity myth ────────────────────────────────────── */}

        <h2 id="complexity-myth" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          The complexity myth debunked
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The requirement to include uppercase, lowercase, numbers, and symbols became standard because early password cracking tools attacked simple dictionaries. Adding a symbol requirement meant an attacker could not just run a wordlist — they had to account for substitutions. This was marginally helpful in the 1990s when computing power was limited.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Modern attackers have updated their tools. Rule-based attacks — where the cracking software automatically generates thousands of variations of each dictionary word (capitalize first letter, substitute common characters, add numbers at the end, append ! or 123) — are standard. <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">hashcat</code>, the dominant GPU cracking tool, has built-in rule sets specifically for human substitution patterns. A password like <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">S3cur3!</code> or <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">P@ssword2024!</code> is cracked by rule-based attacks almost as quickly as the base word.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The NIST guidance published in 2024 explicitly states: "Verifiers SHOULD NOT impose other composition rules (e.g. requiring mixtures of different character types) on passwords." The rationale is that complexity rules primarily harm usable security — they lead users to predictable workarounds while providing marginal protection against modern attacks.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Symbols and character variety are still worth including in randomly generated passwords — they add a modest amount of entropy per character and expand the attack surface slightly. But they should be a feature of a random generator, not a substitute for length.
        </p>

        {/* ── Section 6: Password manager ───────────────────────────────────── */}

        <h2 id="password-manager" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Password manager: the missing piece
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          All the advice about long, unique, random passwords is useless without a solution to the storage problem. A person with 200 online accounts cannot memorize 200 unique 20-character passwords. The only practical solution is a dedicated password manager.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Password managers work by encrypting your vault with a master key derived from your master password. On well-designed systems (Bitwarden, 1Password, KeePassXC), the master password never reaches the provider's servers — only encrypted ciphertext does. Even a complete server breach exposes nothing useful to an attacker without your master password.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The main categories available in 2026:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Bitwarden</strong>: open-source, independently audited, free tier for personal use, self-host option available. The most recommended free option.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">KeePassXC</strong>: fully local (no cloud), open-source, free. Database stored as a file you control. No synchronization unless you set it up via your own cloud storage.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">1Password</strong>: paid ($3/month), strong audit history, Travel Mode (hide sensitive vaults at borders), polished UX. The most frequently recommended paid option.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Dashlane</strong>: paid, includes dark web monitoring and a built-in VPN in the premium tier.
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          One concern people raise: "If all my passwords are in one place, one breach exposes everything." This concern is valid but misplaced when the alternative is password reuse. A properly secured manager is far safer than reusing passwords across 200 sites. The appropriate response to the single-point-of-failure concern is to protect the manager with a strong master password and 2FA — not to avoid using a manager.
        </p>

        {/* ── Section 7: 2FA ────────────────────────────────────────────────── */}

        <h2 id="two-factor" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          2FA as a complement to strong passwords
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Two-factor authentication (2FA) requires something you know (your password) plus something you have (a device). Even if an attacker has your correct password, they cannot log in without access to your second factor. This eliminates the most common attack vector: credential stuffing, where breached username-password pairs are tried across hundreds of other sites.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Authenticator apps (Google Authenticator, Authy, 1Password's built-in TOTP) are significantly stronger than SMS-based 2FA. SMS codes can be intercepted via SIM-swapping attacks — where an attacker convinces your carrier to transfer your number to their SIM. TOTP codes generated on-device cannot be intercepted this way.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          2FA does not replace strong passwords. The two protect against different threat models:
        </p>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Strong unique password</strong>: protects against offline cracking of breached hashes, and against credential stuffing.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-2 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">2FA</strong>: protects against an attacker who already has your correct password (phishing, credential stuffing from a previous breach where the password was stored in plaintext).
          </li>
        </ul>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          Enable 2FA on every account that supports it, particularly email (your email account is the recovery path for all other accounts), banking, and your password manager. Use an authenticator app, not SMS, wherever possible.
        </p>

        {/* ── CTA Block #2 ─────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Generate a strong password instantly — 100% in your browser</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            No upload. No server. crypto.getRandomValues. Custom length and character sets. Entropy displayed in bits.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/password-generator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Open Password Generator, Free <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/blog/password-generator-online"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]"
            >
              How entropy works — the full technical guide <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* ── Section 8: How to generate ────────────────────────────────────── */}

        <h2 id="how-to-generate" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          How to generate a strong password, step by step
        </h2>

        <ol className="mb-4 space-y-3">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Open the Password Generator.</strong> Go to <Link href="/tools/password-generator" className="text-[#6366F1] hover:underline">sammapix.com/tools/password-generator</Link>. No account required.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Set length to 20.</strong> Or 16 for sites with tight limits. Use the slider or type directly.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Enable all character sets.</strong> Uppercase, lowercase, digits, symbols. If the target site does not accept symbols, disable them and compensate with +4 characters of length.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Confirm 100+ bits of entropy.</strong> The meter shows the mathematical strength. Anything under 80 is insufficient for accounts you care about.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Click Copy.</strong> The password is in your clipboard. It has never left your browser.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Paste into the site and immediately save to your manager.</strong> Create a new entry in Bitwarden, 1Password, or KeePassXC before completing the registration.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">
            <strong className="text-gray-800 dark:text-[#E5E5E5]">Enable 2FA on the account.</strong> Once registered, go to the account's security settings and enable an authenticator app.
          </li>
        </ol>

        {/* ── Section 9: No-upload privacy ──────────────────────────────────── */}

        <h2 id="no-upload" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Why generating locally matters
        </h2>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          An online password generator that communicates with a server is fundamentally broken by design. The server operator could log every generated password paired with the requesting IP and timestamp. Even if the current operator is trustworthy, the logs become an attack target. A breach of those logs could expose passwords still in active use across thousands of users.
        </p>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The SammaPix Password Generator never sends generated passwords anywhere. The JavaScript runs once when the page loads, then operates entirely within your browser tab. <code className="text-xs bg-gray-100 dark:bg-[#2A2A2A] px-1 py-0.5 rounded font-mono">crypto.getRandomValues()</code> draws entropy from your OS. The output appears on screen and in your clipboard only. You can verify this yourself:
        </p>

        <ol className="mb-4 space-y-2">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">Open browser DevTools (F12 on most browsers).</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">Go to the Network tab.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">Generate several passwords on the tool page.</li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 list-decimal">Observe: no outgoing network requests during generation.</li>
        </ol>

        <p className="text-sm text-gray-600 dark:text-[#A3A3A3] leading-relaxed mb-3">
          The "What we do not do" table for clarity:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">What some generators do</th>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] font-medium text-gray-900 dark:text-[#E5E5E5]">SammaPix Password Generator</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Send generation requests to a server</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">No server communication during generation</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Log generated passwords with IP and timestamp</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">No logging — computation is local</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Use Math.random() (not cryptographically secure)</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Uses crypto.getRandomValues() exclusively</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Require account registration</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">No account, no email, no registration</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-gray-600 dark:text-[#D4D4D4]">Set expiry dates on free use</td>
                <td className="p-3 border border-gray-200 dark:border-[#2A2A2A] text-green-600 dark:text-green-400 font-medium">Free permanently, no expiry</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Section 10: Related tools ─────────────────────────────────────── */}

        <h2 id="related-tools" className="text-xl font-semibold text-gray-900 dark:text-[#E5E5E5] mt-10 mb-3 tracking-tight">
          Related tools
        </h2>

        <ul className="mb-4">
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/password-generator" className="text-[#6366F1] hover:underline">Password Generator</Link></strong>: the tool covered in this article. Custom length, all character sets, entropy display. No upload. See also: <Link href="/blog/password-generator-online" className="text-[#6366F1] hover:underline">entropy and crypto.getRandomValues explained</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/hash-generator" className="text-[#6366F1] hover:underline">Hash Generator</Link></strong>: compute SHA-256, MD5, SHA-512 and other hashes from text or a file. No upload. See: <Link href="/blog/hash-generator-online" className="text-[#6366F1] hover:underline">Hash Generator guide</Link>.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/url-encode-decode" className="text-[#6366F1] hover:underline">URL Encode / Decode</Link></strong>: encode or decode percent-encoded URLs entirely in your browser. Useful for working with API tokens, query parameters, and form data.
          </li>
          <li className="text-sm text-gray-600 dark:text-[#A3A3A3] ml-5 mb-3 list-disc">
            <strong className="text-gray-800 dark:text-[#E5E5E5]"><Link href="/tools/exif" className="text-[#6366F1] hover:underline">EXIF Viewer</Link></strong>: read metadata embedded in photos, including GPS coordinates. Check what data travels with a photo before sharing it.
          </li>
        </ul>

        {/* ── CTA Block #3 ─────────────────────────────────────────────────── */}

        <div data-tts-skip className="bg-gray-50 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] rounded-md p-5 mb-8">
          <p className="text-sm font-medium text-gray-900 dark:text-[#E5E5E5] mb-2">Browser-based security tools — no upload, no server, no account</p>
          <p className="text-sm text-gray-600 dark:text-[#A3A3A3] mb-3">
            Generate passwords, hash files, encode URLs, and check photo metadata — all without sending data anywhere.
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
            <Link href="/tools/exif" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1] hover:text-[#4F46E5]">
              EXIF Viewer <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
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
