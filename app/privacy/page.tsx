import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy - SammaPix",
  description:
    "SammaPix privacy policy. Most image processing happens entirely in your browser. Learn what data we collect, how we use it, and your GDPR rights.",
  alternates: {
    canonical: `${APP_URL}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy - SammaPix",
    description:
      "SammaPix privacy policy. Most image processing happens entirely in your browser. Learn what data we collect, how we use it, and your GDPR rights.",
    type: "website",
    url: `${APP_URL}/privacy`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix" }],
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-[#A3A3A3] dark:text-[#737373] hover:text-[#525252] dark:hover:text-[#A3A3A3] transition-colors"
        >
          &larr; Back to SammaPix
        </Link>
      </div>

      {/* Page header */}
      <div className="mb-10 pb-8 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <h1 className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#A3A3A3] dark:text-[#737373]">
          Last updated: March 20, 2026
        </p>
      </div>

      {/* Body */}
      <div className="space-y-10 text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">

        {/* 1. Overview and data controller */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            1. Overview and Data Controller
          </h2>
          <p>
            SammaPix (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;the Service&rdquo;) is a browser-based image optimisation platform operated by Luca Sammarco, an individual based in Italy. This Privacy Policy explains what personal data we collect about you, why and on what legal basis we process it, who we share it with, and the rights you hold over it.
          </p>
          <p className="mt-3">
            We are committed to processing personal data lawfully, fairly, and transparently in accordance with the General Data Protection Regulation (EU) 2016/679 (&ldquo;GDPR&rdquo;), the Italian Personal Data Protection Code (Legislative Decree No. 196/2003 as amended by Legislative Decree No. 101/2018), and other applicable data protection laws.
          </p>
          <p className="mt-3">
            The data controller for all personal data processed in connection with the Service is:
          </p>
          <div className="mt-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 space-y-1">
            <p><strong className="text-[#404040] dark:text-[#D4D4D4]">Luca Sammarco</strong></p>
            <p>Italy</p>
            <p>
              Email:{" "}
              <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
                luca@sammapix.com
              </a>
            </p>
            <p>
              Website:{" "}
              <a
                href="https://sammapix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6366F1] hover:underline"
              >
                sammapix.com
              </a>
            </p>
          </div>
        </section>

        {/* 2. A note about your images */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            2. Image and File Processing — What Leaves Your Device and What Does Not
          </h2>

          <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">
            For the vast majority of tools, your images never leave your device.
          </p>
          <p className="mt-2">
            The following tools process all image data entirely within your web browser using local CPU and browser APIs. No image data is transmitted to SammaPix&apos;s servers or to any third party at any point during processing:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1 columns-2">
            <li>Compress (JPG, PNG, WebP, GIF, AVIF)</li>
            <li>Convert to WebP</li>
            <li>HEIC Converter</li>
            <li>Batch Resize</li>
            <li>Crop &amp; Ratio</li>
            <li>Watermark</li>
            <li>Film Filters</li>
            <li>EXIF Viewer</li>
            <li>Find Duplicates</li>
            <li>Photo Cull</li>
            <li>PDF to Image</li>
            <li>Batch Rename</li>
            <li>Web Optimize</li>
            <li>Blog Ready</li>
          </ul>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">
            AI tools: limited and temporary transmission to Google Gemini
          </p>
          <p className="mt-2">
            The following tools require a signed-in account and send data to Google&apos;s Gemini 2.5 Flash API for AI analysis. In each case, only a reduced-resolution thumbnail (maximum 512 pixels on the longest side) is transmitted, not the full original file:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">AI Rename</strong> — generates a descriptive, SEO-friendly filename from the visual content of the thumbnail.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">AI Alt Text</strong> — generates an accessibility description from the visual content of the thumbnail.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">AI Photo Sort / AI Organize</strong> — categorises images by visual content for batch organisation.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Transcribe</strong> — sends the audio file (not a thumbnail) to Google Gemini for speech-to-text conversion.
            </li>
          </ul>
          <p className="mt-3">
            SammaPix does not retain any copy of the thumbnail or audio file after the API call to Google Gemini completes. The thumbnail or audio exists transiently in server memory solely for the purpose of making the API request and is not logged, cached, or stored.
          </p>
          <p className="mt-3">
            Google&apos;s handling of data submitted to the Gemini API is governed by Google&apos;s own privacy policy and the{" "}
            <a
              href="https://ai.google.dev/gemini-api/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              Gemini API Additional Terms of Service
            </a>
            . We are not responsible for Google&apos;s data handling practices. You should review Google&apos;s documentation before using AI tools if you have concerns about the data you are submitting.
          </p>
          <p className="mt-3">
            The legal basis for transmitting thumbnail data to Google Gemini is the performance of the contract with you (Article 6(1)(b) GDPR) — specifically, the provision of the AI tool features you have requested.
          </p>
        </section>

        {/* 3. Cloud storage integrations */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            3. Optional Cloud Storage Integrations
          </h2>
          <p>
            SammaPix offers optional integrations with Google Drive and Dropbox to allow you to import files directly from your cloud storage into the browser for processing.
          </p>
          <ul className="mt-3 pl-5 list-disc space-y-2">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Google Drive</strong> — Files are accessed via the Google Picker API using the{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#262626] text-[#525252] dark:text-[#A3A3A3] px-1.5 py-0.5 rounded">drive.readonly</code>{" "}
              OAuth scope. SammaPix reads only the files you explicitly select. We do not browse your entire Drive, store your files, or retain your Google access token beyond the active browser session.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Dropbox</strong> — Files are accessed via the Dropbox Chooser widget. Only the files you explicitly select are loaded into your browser. SammaPix does not store your Dropbox credentials or retain your files.
            </li>
          </ul>
          <p className="mt-3">
            Once imported, files are processed locally in your browser in exactly the same way as files you upload directly. No additional data is transmitted as a result of using these integrations (except for AI tools, where the thumbnail-only policy described in Section 2 applies).
          </p>
        </section>

        {/* 4. Account data */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            4. Account Data
          </h2>
          <p>
            A signed-in account is required to use AI tools and to access Pro plan features. When you create an account, we collect and store the following personal data:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Your email address</li>
            <li>Your display name and profile picture URL (as provided by your OAuth provider: Google or GitHub)</li>
            <li>The authentication method used (Google OAuth, GitHub OAuth, or magic link email)</li>
            <li>Account creation timestamp and last sign-in timestamp</li>
            <li>Daily AI operation counts (used to enforce plan usage limits)</li>
            <li>Plan status (Free or Pro), subscription start date, and Stripe customer ID (if you subscribe to Pro)</li>
          </ul>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Legal basis:</strong> Performance of a contract (Article 6(1)(b) GDPR) — specifically, the provision of the Service and the enforcement of plan limits under these Terms of Service.
          </p>
          <p className="mt-3">
            We do not sell your personal data to any third party. We do not use your email address for marketing communications without your prior explicit consent or a separate legal basis under applicable law.
          </p>
        </section>

        {/* 5. Authentication */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            5. Authentication and Session Management
          </h2>
          <p>
            Authentication is handled by NextAuth.js. You may sign in using Google OAuth, GitHub OAuth, or email (magic link). When you sign in via Google or GitHub, we request only the minimum OAuth scopes necessary for identity verification: your email address and public profile information. We do not request access to your Google Drive, Gmail, GitHub repositories, or any other services beyond what is needed to authenticate your identity.
          </p>
          <p className="mt-3">
            Session tokens are stored as secure, HTTP-only, same-site cookies and expire after 30 days of inactivity or immediately upon sign-out. These cookies are strictly necessary for authenticated access to the Service and are set on the legal basis of contract performance (Article 6(1)(b) GDPR).
          </p>
          <p className="mt-3">
            The specific session cookies set by NextAuth are:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#262626] px-1.5 py-0.5 rounded">next-auth.session-token</code> — stores your authenticated session. Required for login to function. Expires after 30 days of inactivity or on sign-out.
            </li>
            <li>
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#262626] px-1.5 py-0.5 rounded">next-auth.csrf-token</code> — cross-site request forgery protection token. Session-scoped.
            </li>
            <li>
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#262626] px-1.5 py-0.5 rounded">next-auth.callback-url</code> — stores the redirect URL during the OAuth flow. Session-scoped.
            </li>
          </ul>
        </section>

        {/* 6. Payments */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            6. Payment Processing
          </h2>
          <p>
            Payment processing for Pro plan subscriptions is handled entirely by Stripe, Inc. When you subscribe to Pro, you provide your payment details directly to Stripe through their hosted payment interface. SammaPix does not receive, process, or store your full card number, CVV, bank account details, or any other raw payment credentials. The only payment-related data we store is your Stripe customer ID and your subscription status (active, cancelled, trialing, etc.), which are necessary to determine your plan entitlements.
          </p>
          <p className="mt-3">
            Stripe processes your payment data as an independent data processor subject to PCI DSS compliance. Stripe&apos;s handling of your payment information is governed by the{" "}
            <a
              href="https://stripe.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              Stripe Privacy Policy
            </a>
            .
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Legal basis:</strong> Performance of a contract (Article 6(1)(b) GDPR) for processing related to subscription management; compliance with a legal obligation (Article 6(1)(c) GDPR) for retention of payment records required by Italian and EU tax law.
          </p>
        </section>

        {/* 7. Analytics */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            7. Analytics
          </h2>

          <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">Vercel Analytics (always active, cookieless)</p>
          <p className="mt-2">
            We use Vercel Analytics to collect anonymised, aggregated page view data and web vital metrics (such as page load times). Vercel Analytics is cookieless and does not use fingerprinting or any other technique to identify individual users. No personally identifiable information is transmitted. This service is active for all users without requiring cookie consent and operates on our legitimate interest in maintaining and improving the Service (Article 6(1)(f) GDPR).
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Google Analytics 4 (GA4) — behind cookie consent</p>
          <p className="mt-2">
            We use Google Analytics 4 to understand how users interact with the Service. GA4 may collect your IP address (which Google partially anonymises), browser type, device type, geographic region, pages visited, and events such as tool usage. GA4 sets persistent cookies to distinguish users across sessions. GA4 is only activated after you grant cookie consent through our consent banner.
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Legal basis:</strong> Your consent (Article 6(1)(a) GDPR), which you may withdraw at any time by updating your cookie preferences.
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Meta Pixel (Facebook Pixel) — behind cookie consent</p>
          <p className="mt-2">
            We use the Meta Pixel to measure the effectiveness of our advertising campaigns on Meta platforms (Facebook and Instagram). The Pixel may collect your IP address, browser information, the URL of pages you visit, and actions you take on the Service (such as signing up or starting a trial). The Pixel sets persistent cookies in your browser. The Meta Pixel is only activated after you grant cookie consent.
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Legal basis:</strong> Your consent (Article 6(1)(a) GDPR), which you may withdraw at any time. You may also manage Meta&apos;s use of your data through{" "}
            <a
              href="https://www.facebook.com/privacy/policies/cookies"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              Meta&apos;s cookie controls
            </a>
            .
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Meta Conversions API (server-side)</p>
          <p className="mt-2">
            In addition to the client-side Meta Pixel, we also use Meta&apos;s Conversions API to send certain conversion events (such as account registration and subscription purchase) directly from our server to Meta for advertising attribution purposes. This server-side integration transmits:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Your hashed (SHA-256) email address</li>
            <li>Your IP address (hashed before transmission)</li>
            <li>The event type (e.g., &ldquo;CompleteRegistration&rdquo;, &ldquo;Subscribe&rdquo;)</li>
            <li>A timestamp and event ID for deduplication with the browser-side Pixel</li>
          </ul>
          <p className="mt-3">
            The Conversions API is activated only when you have granted cookie consent. Your email and IP address are hashed before transmission and Meta receives only the hashed values, not the originals. Despite hashing, this constitutes processing of personal data and is subject to your consent.
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Legal basis:</strong> Your consent (Article 6(1)(a) GDPR).
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Google Ads — behind cookie consent</p>
          <p className="mt-2">
            We use Google Ads conversion tracking (via the Google tag / gtag.js) to measure the effectiveness of our Google advertising campaigns. Google Ads may collect your IP address and set cookies to attribute conversions (such as Pro plan subscriptions) to ad clicks. Google Ads tracking is only activated after you grant cookie consent.
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Legal basis:</strong> Your consent (Article 6(1)(a) GDPR).
          </p>
        </section>

        {/* 8. Advertising */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            8. Advertising (Free Plan)
          </h2>
          <p>
            Users on the Free plan may see advertisements served by Google AdSense. Google AdSense uses cookies and similar tracking technologies to display advertisements that may be personalised based on your browsing history, interests, and inferred demographics. AdSense is only activated after you grant cookie consent through our consent banner.
          </p>
          <p className="mt-3">
            You can manage your ad personalisation preferences at any time through{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              Google Ad Settings
            </a>
            {" "}or by opting out of personalised advertising via the{" "}
            <a
              href="https://optout.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              Digital Advertising Alliance opt-out
            </a>
            .
          </p>
          <p className="mt-3">
            Users on the Pro plan do not see AdSense advertisements.
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Legal basis:</strong> Your consent (Article 6(1)(a) GDPR).
          </p>
        </section>

        {/* 9. Email communications */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            9. Email Communications
          </h2>
          <p>
            Email delivery is handled by Resend, Inc., a transactional email service provider. We use Resend to send two categories of email:
          </p>

          <p className="mt-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Transactional emails</p>
          <p className="mt-1">
            These emails are necessary for the operation of the Service and your account. They include: account verification and magic link sign-in emails, password change notifications, subscription confirmation and payment receipts, subscription cancellation confirmations, and material notices about changes to these Terms or our Privacy Policy. These emails are sent on the legal basis of contract performance (Article 6(1)(b) GDPR) and cannot be unsubscribed from while you have an active account.
          </p>

          <p className="mt-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Marketing emails</p>
          <p className="mt-1">
            If you have opted in to marketing communications, or where permitted by applicable law (such as the soft opt-in provision for existing customers under the Italian Privacy Code and the ePrivacy Directive), we may send you product updates, new feature announcements, tips, and promotional offers. These emails are sent on the legal basis of your consent or legitimate interest (Article 6(1)(a) or (f) GDPR). You may unsubscribe from marketing emails at any time by clicking the unsubscribe link in any marketing email or by contacting us at{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>
            . Unsubscribing from marketing emails does not affect your receipt of transactional emails.
          </p>
          <p className="mt-3">
            Resend processes your email address and email delivery data as a data processor on our behalf. Resend&apos;s privacy practices are described in the{" "}
            <a
              href="https://resend.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              Resend Privacy Policy
            </a>
            .
          </p>
        </section>

        {/* 10. Cookies */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            10. Cookie Policy
          </h2>
          <p>
            We use a cookie consent banner to give you control over non-essential cookies. The categories below explain which cookies we set and on what basis.
          </p>

          <div className="mt-4 space-y-4">

            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4">
              <p className="font-medium text-[#404040] dark:text-[#D4D4D4] mb-2">Strictly Necessary — No consent required</p>
              <p className="mb-2 text-xs text-[#737373] dark:text-[#525252]">These cookies are essential for the Service to function and cannot be switched off. They are set on the basis of contract performance.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                      <th className="text-left py-1.5 pr-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Cookie name</th>
                      <th className="text-left py-1.5 pr-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Purpose</th>
                      <th className="text-left py-1.5 font-medium text-[#404040] dark:text-[#D4D4D4]">Expiry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">next-auth.session-token</code></td>
                      <td className="py-1.5 pr-3">Authenticated session management</td>
                      <td className="py-1.5">30 days / on sign-out</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">next-auth.csrf-token</code></td>
                      <td className="py-1.5 pr-3">CSRF attack prevention</td>
                      <td className="py-1.5">Session</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">next-auth.callback-url</code></td>
                      <td className="py-1.5 pr-3">OAuth redirect flow</td>
                      <td className="py-1.5">Session</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">cookie-consent</code></td>
                      <td className="py-1.5 pr-3">Stores your cookie consent preference</td>
                      <td className="py-1.5">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4">
              <p className="font-medium text-[#404040] dark:text-[#D4D4D4] mb-2">Preferences — No consent required</p>
              <p className="mb-2 text-xs text-[#737373] dark:text-[#525252]">These store your display preferences locally and contain no personal data.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                      <th className="text-left py-1.5 pr-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Key (localStorage)</th>
                      <th className="text-left py-1.5 pr-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Purpose</th>
                      <th className="text-left py-1.5 font-medium text-[#404040] dark:text-[#D4D4D4]">Expiry</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">theme</code></td>
                      <td className="py-1.5 pr-3">Light / dark mode preference</td>
                      <td className="py-1.5">Persistent (localStorage)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4">
              <p className="font-medium text-[#404040] dark:text-[#D4D4D4] mb-2">Analytics and Advertising — Consent required</p>
              <p className="mb-2 text-xs text-[#737373] dark:text-[#525252]">These cookies are only set after you grant consent via our cookie banner. You may withdraw consent at any time.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                      <th className="text-left py-1.5 pr-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Cookie name</th>
                      <th className="text-left py-1.5 pr-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Provider</th>
                      <th className="text-left py-1.5 pr-3 font-medium text-[#404040] dark:text-[#D4D4D4]">Purpose</th>
                      <th className="text-left py-1.5 font-medium text-[#404040] dark:text-[#D4D4D4]">Expiry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">_fbp</code></td>
                      <td className="py-1.5 pr-3">Meta</td>
                      <td className="py-1.5 pr-3">Identifies browsers for ad attribution; set by Meta Pixel on page load</td>
                      <td className="py-1.5">90 days</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">_fbc</code></td>
                      <td className="py-1.5 pr-3">Meta</td>
                      <td className="py-1.5 pr-3">Stores the Meta click ID (fbclid) when arriving from a Facebook or Instagram ad</td>
                      <td className="py-1.5">90 days</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">_gcl_au</code></td>
                      <td className="py-1.5 pr-3">Google</td>
                      <td className="py-1.5 pr-3">Google Ads conversion linker cookie; tracks ad conversion events</td>
                      <td className="py-1.5">90 days</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">_ga</code></td>
                      <td className="py-1.5 pr-3">Google</td>
                      <td className="py-1.5 pr-3">Google Analytics 4 — distinguishes unique users</td>
                      <td className="py-1.5">2 years</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">_ga_*</code></td>
                      <td className="py-1.5 pr-3">Google</td>
                      <td className="py-1.5 pr-3">Google Analytics 4 — session state persistence</td>
                      <td className="py-1.5">2 years</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">__gads</code></td>
                      <td className="py-1.5 pr-3">Google</td>
                      <td className="py-1.5 pr-3">Google AdSense — ad personalisation and frequency capping (Free plan only)</td>
                      <td className="py-1.5">13 months</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 pr-3"><code className="bg-[#F5F5F5] dark:bg-[#262626] px-1 rounded">__gpi</code></td>
                      <td className="py-1.5 pr-3">Google</td>
                      <td className="py-1.5 pr-3">Google AdSense — ad personalisation (Free plan only)</td>
                      <td className="py-1.5">13 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <p className="mt-4">
            You may withdraw or change your cookie consent at any time by clicking &ldquo;Cookie Settings&rdquo; in the footer of any page. You may also disable cookies through your browser settings, but doing so may impair the functionality of certain features of the Service. Withdrawing consent does not affect the lawfulness of processing carried out before withdrawal.
          </p>
        </section>

        {/* 11. Third-party services table */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            11. Third-Party Data Processors and Sub-Processors
          </h2>
          <p>
            The following third-party services may process personal data in connection with the Service. All international transfers of personal data outside the EEA are made on the basis of Standard Contractual Clauses (SCCs) adopted under Article 46(2)(c) GDPR, adequacy decisions, or other appropriate safeguards under Chapter V of the GDPR.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <th className="text-left py-2 pr-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Service</th>
                  <th className="text-left py-2 pr-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Provider</th>
                  <th className="text-left py-2 pr-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Purpose</th>
                  <th className="text-left py-2 pr-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Data processed</th>
                  <th className="text-left py-2 font-medium text-[#404040] dark:text-[#D4D4D4]">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                <tr>
                  <td className="py-2 pr-4">Gemini 2.5 Flash API</td>
                  <td className="py-2 pr-4">Google LLC</td>
                  <td className="py-2 pr-4">AI image and audio analysis</td>
                  <td className="py-2 pr-4">Image thumbnails, audio files</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Google OAuth</td>
                  <td className="py-2 pr-4">Google LLC</td>
                  <td className="py-2 pr-4">Sign-in authentication</td>
                  <td className="py-2 pr-4">Email, name, profile picture</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">GitHub OAuth</td>
                  <td className="py-2 pr-4">GitHub, Inc.</td>
                  <td className="py-2 pr-4">Sign-in authentication</td>
                  <td className="py-2 pr-4">Email, username, profile picture</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Stripe</td>
                  <td className="py-2 pr-4">Stripe, Inc.</td>
                  <td className="py-2 pr-4">Payment processing</td>
                  <td className="py-2 pr-4">Payment card data, billing name, email</td>
                  <td className="py-2">USA / EU</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Vercel</td>
                  <td className="py-2 pr-4">Vercel, Inc.</td>
                  <td className="py-2 pr-4">Hosting, infrastructure, serverless functions, cookieless analytics</td>
                  <td className="py-2 pr-4">IP addresses (transient, in request logs), anonymised page metrics</td>
                  <td className="py-2">USA / global edge</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Meta Pixel</td>
                  <td className="py-2 pr-4">Meta Platforms, Inc.</td>
                  <td className="py-2 pr-4">Ad conversion measurement (consent-gated)</td>
                  <td className="py-2 pr-4">IP address, browser info, page events, cookies (_fbp, _fbc)</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Meta Conversions API</td>
                  <td className="py-2 pr-4">Meta Platforms, Inc.</td>
                  <td className="py-2 pr-4">Server-side ad attribution (consent-gated)</td>
                  <td className="py-2 pr-4">Hashed email, hashed IP address, event type</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Google Ads (gtag)</td>
                  <td className="py-2 pr-4">Google LLC</td>
                  <td className="py-2 pr-4">Ad conversion tracking (consent-gated)</td>
                  <td className="py-2 pr-4">IP address, cookies (_gcl_au), conversion events</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Google Analytics 4</td>
                  <td className="py-2 pr-4">Google LLC</td>
                  <td className="py-2 pr-4">Behavioural analytics (consent-gated)</td>
                  <td className="py-2 pr-4">Anonymised IP, browser, device, pages, events, cookies (_ga, _ga_*)</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Google AdSense</td>
                  <td className="py-2 pr-4">Google LLC</td>
                  <td className="py-2 pr-4">Ad serving — Free plan only (consent-gated)</td>
                  <td className="py-2 pr-4">Browser info, interest profiles, cookies (__gads, __gpi)</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Resend</td>
                  <td className="py-2 pr-4">Resend, Inc.</td>
                  <td className="py-2 pr-4">Transactional and marketing email delivery</td>
                  <td className="py-2 pr-4">Email address, name, email open/click events</td>
                  <td className="py-2">USA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 12. Data retention */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            12. Data Retention
          </h2>
          <ul className="pl-5 list-disc space-y-2">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Account data</strong> (email address, display name, profile picture, usage counts, plan status) is retained for as long as your account remains active. Upon account deletion, this data is permanently and irreversibly erased within 30 days of your deletion request, except where retention is required by law.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Image thumbnails and audio files</strong> (AI tools) are not stored by SammaPix in any persistent storage. They exist transiently in server memory only for the duration of the API call to Google Gemini and are immediately discarded after the response is received.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">User-uploaded files (client-side tools)</strong> are processed entirely in your browser and never transmitted to or stored on SammaPix&apos;s servers. There is no retention period because no server-side copy is ever created.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Payment records</strong> (Stripe customer ID, subscription history, invoice data) are retained for the period required by applicable Italian tax and accounting law — generally 10 years from the date of the transaction under Article 2220 of the Italian Civil Code — even after account deletion.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Email marketing records</strong> (consent records, unsubscribe records) are retained for as long as necessary to demonstrate compliance with applicable email marketing law.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Analytics data</strong> is retained in accordance with the retention policies of the respective third-party analytics providers (e.g., GA4 default retention: 14 months).
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Server access logs</strong> (generated by Vercel) contain transient IP addresses and request metadata and are retained for the period specified in Vercel&apos;s data retention policy.
            </li>
          </ul>
        </section>

        {/* 13. GDPR rights */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            13. Your Rights Under GDPR
          </h2>
          <p>
            If you are located in the European Economic Area, the United Kingdom, Switzerland, or another jurisdiction with equivalent data protection laws, you have the following rights in relation to your personal data:
          </p>
          <ul className="mt-3 pl-5 list-disc space-y-2">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Right of access (Article 15 GDPR)</strong> — You may request a copy of the personal data we hold about you, along with information about how we process it, the categories of data processed, and the recipients to whom it has been disclosed.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Right to rectification (Article 16 GDPR)</strong> — You may request that we correct inaccurate or incomplete personal data we hold about you without undue delay.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Right to erasure / &lsquo;right to be forgotten&rsquo; (Article 17 GDPR)</strong> — You may request the deletion of your personal data where: (a) the data is no longer necessary for the purposes for which it was collected; (b) you withdraw consent and there is no other legal basis for processing; (c) you object to processing and there are no overriding legitimate grounds; or (d) the data has been unlawfully processed. This right is subject to legal obligations to retain data (e.g., tax records).
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Right to data portability (Article 20 GDPR)</strong> — You may request your personal data in a structured, commonly used, machine-readable format (such as JSON or CSV) and, where technically feasible, request that we transmit it directly to another data controller.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Right to restriction of processing (Article 18 GDPR)</strong> — You may request that we limit our processing of your personal data in certain circumstances, such as when you contest the accuracy of the data or have objected to processing pending verification of legitimate grounds.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Right to object (Article 21 GDPR)</strong> — You may object at any time to the processing of your personal data based on our legitimate interests (Article 6(1)(f) GDPR), including for direct marketing purposes. Upon receiving an objection to direct marketing, we will cease processing immediately.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Right to withdraw consent (Article 7(3) GDPR)</strong> — Where processing is based on your consent, you may withdraw that consent at any time. Withdrawal of consent does not affect the lawfulness of processing carried out before withdrawal.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Rights related to automated decision-making (Article 22 GDPR)</strong> — SammaPix does not make solely automated decisions that produce legal or similarly significant effects about you.
            </li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>
            . We will acknowledge your request within 72 hours and respond substantively within 30 days. Where requests are complex or numerous, we may extend the response period by a further two months, in which case we will notify you within the initial 30-day period.
          </p>
          <p className="mt-3">
            We will not charge a fee for exercising your rights unless requests are manifestly unfounded or excessive, in which case we may charge a reasonable fee or refuse to act, as permitted by Article 12(5) GDPR.
          </p>
          <p className="mt-3">
            If you believe we have not adequately addressed your rights, you have the right to lodge a complaint with your competent supervisory authority. In Italy, the supervisory authority is the{" "}
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              Garante per la protezione dei dati personali
            </a>{" "}
            (Italian Data Protection Authority). EU residents may also contact the supervisory authority in their country of habitual residence.
          </p>
        </section>

        {/* 14. Children */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            14. Children&apos;s Privacy
          </h2>
          <p>
            The Service is not directed at or intended for use by children under the age of 16. We do not knowingly collect personal data from children under 16 years of age. If we become aware that we have inadvertently collected personal data from a child under 16 without verifiable parental consent, we will take prompt steps to delete that data from our systems.
          </p>
          <p className="mt-3">
            If you are a parent or legal guardian and you believe your child under 16 has provided personal data to us, please contact us immediately at{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>
            {" "}and we will take appropriate action.
          </p>
        </section>

        {/* 15. Security */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            15. Security
          </h2>
          <p>
            We implement appropriate technical and organisational measures to protect personal data against accidental or unlawful destruction, loss, alteration, unauthorised disclosure, or access. These measures include HTTPS encryption for all data in transit, HTTP-only and same-site session cookies, server-side rate limiting on API endpoints, input validation and sanitisation, and access controls on systems that process personal data.
          </p>
          <p className="mt-3">
            However, no method of transmission over the internet or method of electronic storage is completely secure. While we use commercially reasonable efforts to protect your personal data, we cannot guarantee absolute security. You are responsible for maintaining the security of your account credentials.
          </p>
          <p className="mt-3">
            In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, we will notify the relevant supervisory authority within 72 hours of becoming aware of the breach (Article 33 GDPR) and, where required, will notify affected users without undue delay (Article 34 GDPR).
          </p>
        </section>

        {/* 16. Changes */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            16. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in the Service, applicable law, or our data practices. When we make material changes — particularly changes that expand the categories of data we collect, change the legal basis for processing, or introduce new third-party processors — we will update the &ldquo;Last updated&rdquo; date at the top of this page and, where required by applicable law or where the change materially affects your rights, notify registered users by email or by a prominent notice within the Service at least 14 days before the change takes effect.
          </p>
          <p className="mt-3">
            Continued use of the Service after the effective date of an updated Privacy Policy constitutes acceptance of the revised policy. If you do not accept material changes to this policy, you must stop using the Service and may request deletion of your account.
          </p>
        </section>

        {/* 17. Contact */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            17. Contact and Data Subject Requests
          </h2>
          <p>
            For privacy-related questions, requests to exercise your GDPR rights, or any other data protection enquiries, please contact us:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>
              Email:{" "}
              <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
                luca@sammapix.com
              </a>
            </li>
            <li>Data controller: Luca Sammarco, Italy</li>
            <li>
              Website:{" "}
              <a
                href="https://sammapix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6366F1] hover:underline"
              >
                sammapix.com
              </a>
            </li>
          </ul>
          <p className="mt-3">
            Please include your name, email address associated with your account, and a clear description of your request or concern. We may need to verify your identity before processing certain requests to protect against fraudulent access to your data.
          </p>
        </section>

        {/* Disclaimer */}
        <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] pt-6 text-xs text-[#A3A3A3] dark:text-[#737373]">
          <p>
            This Privacy Policy is provided for informational purposes and reflects our current data practices as of the date shown above. This document does not constitute legal advice. Consult with a qualified attorney for legal advice specific to your situation.
          </p>
        </div>

      </div>
    </div>
  );
}
