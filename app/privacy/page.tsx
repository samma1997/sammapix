import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy - SammaPix",
  description:
    "SammaPix privacy policy. Most image processing happens entirely in your browser. Learn what data we collect, how we use it, and your rights under GDPR.",
  alternates: {
    canonical: `${APP_URL}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy - SammaPix",
    description:
      "SammaPix privacy policy. Most image processing happens entirely in your browser. Learn what data we collect, how we use it, and your rights under GDPR.",
    type: "website",
    url: `${APP_URL}/privacy`,
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
          Last updated: March 19, 2026
        </p>
      </div>

      {/* Body */}
      <div className="space-y-10 text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">

        {/* 1. Overview */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            1. Overview
          </h2>
          <p>
            SammaPix (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;the Service&rdquo;) is a free web-based image optimization platform operated by Luca Sammarco, an individual based in Italy. This Privacy Policy explains what personal data we collect, why we collect it, how it is processed, and the rights you hold over it.
          </p>
          <p className="mt-3">
            We are committed to processing personal data lawfully, fairly, and transparently in accordance with the General Data Protection Regulation (EU) 2016/679 (&ldquo;GDPR&rdquo;) and applicable Italian data protection law.
          </p>
          <p className="mt-3">
            The data controller is:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Luca Sammarco</li>
            <li>Italy</li>
            <li>
              <a
                href="mailto:luca@sammapix.com"
                className="text-[#6366F1] hover:underline"
              >
                luca@sammapix.com
              </a>
            </li>
            <li>
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
        </section>

        {/* 2. Image processing */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            2. Image Processing
          </h2>
          <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">
            For the majority of tools, your images never leave your device.
          </p>
          <p className="mt-3">
            The following tools process files entirely within your web browser using local CPU and browser APIs. No image data is transmitted to our servers or any third party:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Compress (JPG, PNG, WebP, GIF, AVIF)</li>
            <li>Convert to WebP</li>
            <li>Batch Resize</li>
            <li>EXIF Viewer (metadata remover)</li>
            <li>Film Filters (film effects)</li>
            <li>Watermark</li>
            <li>Crop & Ratio</li>
            <li>Find Duplicates</li>
            <li>Photo Cull</li>
            <li>HEIC Converter</li>
            <li>PDF to Image</li>
            <li>Batch Rename</li>
            <li>Web Optimize</li>
            <li>Blog Ready</li>
          </ul>
          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">
            AI tools: limited data transmission to Google Gemini
          </p>
          <p className="mt-3">
            Three tools send a reduced-resolution thumbnail (maximum 512 pixels on the longest side) to Google&apos;s Gemini API for analysis:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">AI Rename</strong> &mdash; generates a descriptive SEO filename from visual content
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">AI Alt Text</strong> &mdash; generates an accessibility description from visual content
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">AI Photo Sort</strong> &mdash; categorises images by visual content for batch organisation
            </li>
          </ul>
          <p className="mt-3">
            The thumbnail is transmitted solely for the purpose of generating the output text. SammaPix does not retain a copy of the thumbnail after the API call completes. Google&apos;s handling of data submitted to the Gemini API is governed by the{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              Google Privacy Policy
            </a>{" "}
            and the{" "}
            <a
              href="https://ai.google.dev/gemini-api/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              Gemini API Additional Terms of Service
            </a>
            .
          </p>
          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">
            Transcribe: audio data transmission to Google Gemini
          </p>
          <p className="mt-3">
            The <strong className="text-[#404040] dark:text-[#D4D4D4]">Transcribe</strong> tool sends audio files to Google Gemini for speech-to-text analysis. Audio is not stored by SammaPix after processing completes.
          </p>
        </section>

        {/* 3. Cloud storage integrations */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            3. Cloud Storage Integrations
          </h2>
          <p>
            SammaPix offers optional integrations with Google Drive and Dropbox to allow you to import files directly from your cloud storage.
          </p>
          <ul className="mt-3 pl-5 list-disc space-y-2">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Google Drive</strong> &mdash; Files are accessed via the Google Picker API using the{" "}
              <code className="text-xs bg-[#F5F5F5] dark:bg-[#262626] text-[#525252] dark:text-[#A3A3A3] px-1.5 py-0.5 rounded">drive.readonly</code>{" "}
              OAuth scope. SammaPix only reads the files you explicitly select. We do not browse your entire Drive, store your files, or retain your Google access token beyond the duration of the session.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Dropbox</strong> &mdash; Files are accessed via the Dropbox Chooser widget. As with Google Drive, only the files you select are loaded into your browser. SammaPix does not store your Dropbox credentials or retain your files.
            </li>
          </ul>
          <p className="mt-3">
            Once imported, files are processed locally in your browser in the same way as files you upload directly. The same privacy guarantees apply.
          </p>
        </section>

        {/* 4. Account data */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            4. Account Data
          </h2>
          <p>
            An account is required to use AI tools (AI Rename, AI Alt Text, AI Photo Sort, Transcribe) and to access Pro plan features. When you create an account, we collect:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Your email address</li>
            <li>Your display name and profile picture (provided by your OAuth provider: Google, GitHub, or email)</li>
            <li>Authentication method used</li>
            <li>Account creation timestamp</li>
            <li>Daily AI operation counts (used to enforce usage limits per plan)</li>
            <li>Plan status (Free or Pro) and Stripe customer ID if you subscribe</li>
          </ul>
          <p className="mt-3">
            The legal basis for processing this data is the performance of a contract (Article 6(1)(b) GDPR) &mdash; specifically, the provision of the Service under these terms.
          </p>
          <p className="mt-3">
            We do not sell your personal data to third parties. We do not use your email address for marketing communications without your explicit prior consent.
          </p>
        </section>

        {/* 5. Authentication */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            5. Authentication
          </h2>
          <p>
            Authentication is handled by NextAuth.js. You may sign in using Google OAuth, GitHub OAuth, or email (magic link). When you sign in via Google or GitHub, we request only the minimum scopes necessary: your email address and public profile. We do not request access to your Google Drive, Gmail, GitHub repositories, or any other services beyond identity verification.
          </p>
          <p className="mt-3">
            Session tokens are stored as secure, HTTP-only cookies and expire after 30 days of inactivity or immediately upon sign-out.
          </p>
        </section>

        {/* 6. Usage analytics */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            6. Usage Analytics
          </h2>
          <p>
            We use the following analytics services to understand how the Service is used and to improve it:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-2">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Vercel Analytics</strong> &mdash; collects anonymised page view data and web vital metrics. No personally identifiable information is transmitted. Data is processed by Vercel Inc. (USA) subject to the{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6366F1] hover:underline"
              >
                Vercel Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Meta Pixel</strong> &mdash; used for measuring the effectiveness of advertising campaigns on Meta platforms (Facebook, Instagram). The Pixel may collect your IP address, browser information, and interactions with the Service. You can opt out via{" "}
              <a
                href="https://www.facebook.com/privacy/policies/cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6366F1] hover:underline"
              >
                Meta&apos;s cookie controls
              </a>
              .
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Google Ads (gtag)</strong> &mdash; used for conversion tracking and ad measurement. Data is processed by Google LLC (USA) subject to the{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6366F1] hover:underline"
              >
                Google Privacy Policy
              </a>
              .
            </li>
          </ul>
          <p className="mt-3">
            The legal basis for analytics processing is our legitimate interest in understanding usage patterns to improve the Service (Article 6(1)(f) GDPR), balanced against your privacy interests.
          </p>
        </section>

        {/* 7. Advertising */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            7. Advertising
          </h2>
          <p>
            Users on the Free plan may see advertisements served by Google AdSense. Google may use cookies and similar technologies to display personalised ads based on your browsing history and interests. You can manage your ad personalisation preferences via{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              Google Ad Settings
            </a>
            .
          </p>
          <p className="mt-3">
            Users on the Pro plan do not see AdSense advertisements.
          </p>
        </section>

        {/* 8. Cookies */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            8. Cookie Policy
          </h2>
          <p>
            We use the following categories of cookies:
          </p>

          <div className="mt-4 space-y-4">
            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4">
              <p className="font-medium text-[#404040] dark:text-[#D4D4D4] mb-1">Strictly Necessary</p>
              <ul className="pl-5 list-disc space-y-1">
                <li>
                  <code className="text-xs bg-[#F5F5F5] dark:bg-[#262626] px-1.5 py-0.5 rounded">next-auth.session-token</code> &mdash; stores your authenticated session. Required for login to function. Expires after 30 days or on sign-out.
                </li>
                <li>
                  <code className="text-xs bg-[#F5F5F5] dark:bg-[#262626] px-1.5 py-0.5 rounded">next-auth.csrf-token</code> &mdash; CSRF protection token. Session-scoped.
                </li>
              </ul>
            </div>

            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4">
              <p className="font-medium text-[#404040] dark:text-[#D4D4D4] mb-1">Preferences</p>
              <ul className="pl-5 list-disc space-y-1">
                <li>
                  <code className="text-xs bg-[#F5F5F5] dark:bg-[#262626] px-1.5 py-0.5 rounded">theme</code> &mdash; stores your light/dark mode preference in <code className="text-xs bg-[#F5F5F5] dark:bg-[#262626] px-1.5 py-0.5 rounded">localStorage</code>. Contains no personal data.
                </li>
              </ul>
            </div>

            <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4">
              <p className="font-medium text-[#404040] dark:text-[#D4D4D4] mb-1">Analytics and Advertising</p>
              <ul className="pl-5 list-disc space-y-1">
                <li>Vercel Analytics uses no persistent cookies and does not fingerprint users.</li>
                <li>Meta Pixel sets cookies to measure ad conversions (e.g. <code className="text-xs bg-[#F5F5F5] dark:bg-[#262626] px-1.5 py-0.5 rounded">_fbp</code>).</li>
                <li>Google Ads (gtag) sets cookies for conversion tracking (e.g. <code className="text-xs bg-[#F5F5F5] dark:bg-[#262626] px-1.5 py-0.5 rounded">_gcl_au</code>).</li>
                <li>Google AdSense sets cookies for ad personalisation (e.g. <code className="text-xs bg-[#F5F5F5] dark:bg-[#262626] px-1.5 py-0.5 rounded">__gads</code>). Applicable to Free plan users only.</li>
              </ul>
            </div>
          </div>

          <p className="mt-4">
            Strictly necessary cookies are used on the basis of your contractual relationship with us. Analytics and advertising cookies are set on the basis of your consent where required by applicable law, or our legitimate interest. You may disable non-essential cookies through your browser settings; however, doing so may affect functionality.
          </p>
        </section>

        {/* 9. Payments */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            9. Payments
          </h2>
          <p>
            Payment processing for Pro subscriptions is handled by Stripe, Inc. When you subscribe to Pro, you provide your payment details directly to Stripe. SammaPix does not receive or store your full card number, CVV, or bank account details. We receive a Stripe customer ID and subscription status only.
          </p>
          <p className="mt-3">
            Stripe&apos;s handling of payment data is governed by the{" "}
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
        </section>

        {/* 10. Third-party services */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            10. Third-Party Services Summary
          </h2>
          <p>
            The following third-party processors may handle data in connection with the Service:
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
                  <th className="text-left py-2 pr-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Service</th>
                  <th className="text-left py-2 pr-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Purpose</th>
                  <th className="text-left py-2 font-medium text-[#404040] dark:text-[#D4D4D4]">Data location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5] dark:divide-[#2A2A2A]">
                <tr>
                  <td className="py-2 pr-4">Google Gemini API</td>
                  <td className="py-2 pr-4">AI image and audio analysis</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Google OAuth</td>
                  <td className="py-2 pr-4">Sign-in authentication</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">GitHub OAuth</td>
                  <td className="py-2 pr-4">Sign-in authentication</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Stripe</td>
                  <td className="py-2 pr-4">Payment processing</td>
                  <td className="py-2">USA / EU</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Vercel</td>
                  <td className="py-2 pr-4">Hosting and analytics</td>
                  <td className="py-2">USA / global edge</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Meta (Pixel)</td>
                  <td className="py-2 pr-4">Ad measurement</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Google Ads</td>
                  <td className="py-2 pr-4">Ad measurement</td>
                  <td className="py-2">USA</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Google AdSense</td>
                  <td className="py-2 pr-4">Ad serving (Free plan)</td>
                  <td className="py-2">USA</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            Where personal data is transferred to the United States or other countries outside the EEA, such transfers are made on the basis of Standard Contractual Clauses (SCCs) or an adequacy decision, in accordance with Chapter V of the GDPR.
          </p>
        </section>

        {/* 11. Data retention */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            11. Data Retention
          </h2>
          <ul className="pl-5 list-disc space-y-2">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Account data</strong> (email, name, profile picture, usage counts) is retained for as long as your account is active. If you delete your account, this data is permanently erased within 30 days.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">AI thumbnails and audio</strong> are not stored by SammaPix. They exist only for the duration of the API call to Google Gemini.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Payment records</strong> (Stripe customer ID, subscription status) are retained for as long as required by applicable accounting and tax law (typically 10 years in Italy under the Civil Code).
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Analytics data</strong> is retained in accordance with the retention policies of the respective analytics providers.
            </li>
          </ul>
        </section>

        {/* 12. GDPR rights */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            12. Your Rights Under GDPR
          </h2>
          <p>
            If you are located in the European Economic Area, the United Kingdom, or Switzerland, you have the following rights in relation to your personal data:
          </p>
          <ul className="mt-3 pl-5 list-disc space-y-2">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Right of access</strong> &mdash; request a copy of the personal data we hold about you.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Right to rectification</strong> &mdash; request correction of inaccurate or incomplete data.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Right to erasure</strong> &mdash; request deletion of your personal data where there is no legitimate ground for continued processing.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Right to data portability</strong> &mdash; receive your data in a structured, commonly used, machine-readable format.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Right to restriction of processing</strong> &mdash; request that we limit processing of your data in certain circumstances.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Right to object</strong> &mdash; object to processing based on legitimate interests or for direct marketing purposes.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Right to withdraw consent</strong> &mdash; where processing is based on consent, withdraw it at any time without affecting the lawfulness of prior processing.
            </li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>
            . We will respond within 30 days. If you believe your rights have not been adequately addressed, you have the right to lodge a complaint with your national supervisory authority. In Italy, this is the{" "}
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              Garante per la protezione dei dati personali
            </a>
            .
          </p>
        </section>

        {/* 13. Children */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            13. Children&apos;s Privacy
          </h2>
          <p>
            The Service is not directed at children under the age of 16. We do not knowingly collect personal data from children under 16. If we become aware that we have inadvertently collected such data, we will take steps to delete it promptly. If you are a parent or guardian and believe your child has provided personal data to us, please contact us at{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>
            .
          </p>
        </section>

        {/* 14. Changes */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            14. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in the Service, legal requirements, or our data practices. When we make material changes, we will update the &ldquo;Last updated&rdquo; date at the top of this page. Where required by law, we will notify you by email or by a prominent notice within the Service. Continued use of the Service after a policy update constitutes acceptance of the revised terms.
          </p>
        </section>

        {/* 15. Contact */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            15. Contact
          </h2>
          <p>
            For privacy-related questions, requests to exercise your rights, or any other data protection enquiries:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>
              Email:{" "}
              <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
                luca@sammapix.com
              </a>
            </li>
            <li>Data controller: Luca Sammarco, Italy</li>
          </ul>
        </section>

        {/* Disclaimer */}
        <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] pt-6 text-xs text-[#A3A3A3] dark:text-[#737373]">
          <p>
            This Privacy Policy is provided for informational purposes and reflects our current data practices. This document does not constitute legal advice. Consult with a qualified attorney for legal advice specific to your situation.
          </p>
        </div>

      </div>
    </div>
  );
}
