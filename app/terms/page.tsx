import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service - SammaPix",
  description:
    "SammaPix terms of service. Free and Pro plans, payment terms, intellectual property, and governing law (Italy).",
  alternates: {
    canonical: `${APP_URL}/terms`,
  },
  openGraph: {
    title: "Terms of Service - SammaPix",
    description:
      "SammaPix terms of service. Free and Pro plans, payment terms, intellectual property, and governing law (Italy).",
    type: "website",
    url: `${APP_URL}/terms`,
  },
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-sm text-[#A3A3A3] dark:text-[#737373]">
          Last updated: March 19, 2026
        </p>
      </div>

      {/* Body */}
      <div className="space-y-10 text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">

        {/* 1. Acceptance */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using SammaPix at{" "}
            <a
              href="https://sammapix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              sammapix.com
            </a>{" "}
            (the &ldquo;Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, you may not use the Service.
          </p>
          <p className="mt-3">
            These Terms constitute a legally binding agreement between you (&ldquo;User&rdquo;, &ldquo;you&rdquo;) and Luca Sammarco (&ldquo;SammaPix&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), an individual operator based in Italy. By creating an account or using any feature of the Service, you represent that you are at least 16 years old and have the legal capacity to enter into this agreement.
          </p>
        </section>

        {/* 2. Description of service */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            2. Description of Service
          </h2>
          <p>
            SammaPix is a web-based image optimization platform offering a suite of tools for compressing, converting, resizing, renaming, and otherwise processing image files. The Service operates on a freemium model comprising a Free plan and a paid Pro plan.
          </p>
          <p className="mt-3">
            Key characteristics of the Service:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>The majority of tools process files entirely within your web browser. Image data for these tools is never transmitted to our servers.</li>
            <li>AI-powered tools (AI Rename, AI Alt Text, SmartSort) send a reduced-resolution thumbnail to Google&apos;s Gemini API for analysis. A signed-in account is required to use these tools.</li>
            <li>The Transcribe tool sends audio files to Google Gemini for speech-to-text conversion.</li>
            <li>Optional integrations with Google Drive (read-only) and Dropbox allow you to import files from your cloud storage directly into the browser.</li>
          </ul>
          <p className="mt-3">
            We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice where practicable, though we will make reasonable efforts to maintain continuity of the core tools.
          </p>
        </section>

        {/* 3. Account responsibilities */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            3. Account Responsibilities
          </h2>
          <p>
            Certain features of the Service require you to create an account. When you register, you agree to:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Provide accurate, current, and complete information.</li>
            <li>Keep your account credentials secure and not share them with third parties.</li>
            <li>Notify us promptly at{" "}
              <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
                luca@sammapix.com
              </a>{" "}
              if you suspect unauthorised access to your account.
            </li>
            <li>Accept responsibility for all activity that occurs under your account.</li>
          </ul>
          <p className="mt-3">
            We reserve the right to suspend or terminate accounts that we reasonably believe are being used in violation of these Terms or applicable law.
          </p>
        </section>

        {/* 4. Acceptable use */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            4. Acceptable Use
          </h2>
          <p>
            You agree to use the Service only for lawful purposes and in a manner consistent with these Terms. You must not:
          </p>
          <ul className="mt-3 pl-5 list-disc space-y-1">
            <li>Process, upload, or transmit images or content that is unlawful, harmful, abusive, defamatory, obscene, or that infringes the rights of any third party.</li>
            <li>Use the Service to process content that violates any applicable law, including child protection legislation.</li>
            <li>Attempt to circumvent usage limits, rate limits, or plan restrictions through technical means, including the use of automated scripts, bots, or multiple accounts.</li>
            <li>Reverse engineer, decompile, or attempt to extract the source code of the Service.</li>
            <li>Use the Service in a manner that imposes an unreasonable load on our infrastructure.</li>
            <li>Resell, sublicense, or otherwise commercialise access to the Service without our prior written consent.</li>
            <li>Use the Service to develop or train a competing product or service.</li>
          </ul>
          <p className="mt-3">
            We reserve the right to investigate suspected violations and to take action, including account suspension, at our reasonable discretion.
          </p>
        </section>

        {/* 5. Free vs Pro plans */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            5. Free Plan and Pro Plan
          </h2>
          <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">Free Plan</p>
          <p className="mt-2">
            The Free plan is available to all users without charge. Free plan users may use the Service subject to the usage limits in effect at the time of use, including but not limited to daily limits on AI operations and batch file counts. Free plan users may see advertising served by Google AdSense.
          </p>
          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Pro Plan</p>
          <p className="mt-2">
            The Pro plan is a paid subscription priced at USD 7 per month (or the annual equivalent where offered). Pro plan subscribers receive higher usage limits, removal of advertising, ZIP batch downloads, and other benefits as described on the{" "}
            <Link href="/pricing" className="text-[#6366F1] hover:underline">
              Pricing page
            </Link>
            . The features and limits of each plan are subject to change with reasonable notice.
          </p>
          <p className="mt-3">
            We reserve the right to adjust plan features and pricing. Where we make changes that reduce the value of a plan you have already paid for, we will provide at least 30 days&apos; notice and, where applicable, offer a pro-rated credit or refund.
          </p>
        </section>

        {/* 6. Payment and refunds */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            6. Payment and Refunds
          </h2>
          <p>
            Pro subscriptions are processed by Stripe, Inc. By subscribing, you authorise Stripe to charge your chosen payment method on a recurring monthly (or annual) basis until you cancel.
          </p>
          <p className="mt-3">
            All fees are stated in US dollars and are exclusive of any applicable taxes. If taxes are required by your jurisdiction, they will be added to the amount charged.
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Cancellation.</strong> You may cancel your Pro subscription at any time from your account dashboard or by contacting us. Upon cancellation, your subscription will remain active until the end of the current billing period, after which your account will revert to the Free plan. We do not charge cancellation fees.
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Refunds.</strong> We offer a 7-day money-back guarantee for new Pro subscribers. If you are not satisfied within the first 7 days of your initial subscription, contact us at{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>{" "}
            for a full refund. Outside of this period, fees are generally non-refundable except where required by applicable consumer protection law or at our sole discretion.
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">EU/EEA consumers.</strong> If you are a consumer resident in the European Union or European Economic Area, you may have additional statutory cancellation and refund rights under applicable consumer protection directives, including the right to withdraw from a distance contract within 14 days of purchase (cooling-off period). By using the Pro features immediately after purchase you acknowledge that you are requesting performance of the service before the cooling-off period expires. If you exercise your right of withdrawal within 14 days, you agree that we may charge a proportionate amount for the service provided up to the point of withdrawal.
          </p>
        </section>

        {/* 7. Intellectual property */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            7. Intellectual Property
          </h2>
          <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">Your content</p>
          <p className="mt-2">
            You retain full ownership of all images, audio files, and other content you process through the Service (&ldquo;Your Content&rdquo;). These Terms do not grant us any ownership over Your Content.
          </p>
          <p className="mt-3">
            By using the AI tools, you grant us a limited, non-exclusive, royalty-free licence to transmit the relevant thumbnail or audio data to our AI processing partners solely for the purpose of generating the requested output on your behalf. This licence is strictly limited to what is technically necessary and does not include any right to store, display, or use Your Content for any other purpose.
          </p>
          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Our intellectual property</p>
          <p className="mt-2">
            The Service, including its design, code, trademarks, branding, and all content we create (&ldquo;SammaPix IP&rdquo;), is owned by Luca Sammarco and protected by applicable intellectual property law. Nothing in these Terms transfers any ownership of SammaPix IP to you. You are granted a limited, non-exclusive, non-transferable licence to access and use the Service for your personal or business purposes, subject to these Terms.
          </p>
        </section>

        {/* 8. Third-party services */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            8. Third-Party Services
          </h2>
          <p>
            The Service integrates with third-party services including Google (Gemini API, OAuth, Drive, AdSense, Ads), GitHub (OAuth), Stripe (payments), Dropbox (file import), Vercel (hosting), and Meta (advertising). Your use of these third-party services is subject to their respective terms of service and privacy policies. We are not responsible for the practices of third-party service providers.
          </p>
          <p className="mt-3">
            We make no warranties regarding the availability, accuracy, or reliability of third-party AI outputs (e.g. filenames, alt text, transcriptions generated by Google Gemini). You are responsible for reviewing and editing AI-generated content before use.
          </p>
        </section>

        {/* 9. Disclaimers */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            9. Disclaimer of Warranties
          </h2>
          <p>
            The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, or uninterrupted availability.
          </p>
          <p className="mt-3">
            We do not warrant that:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>The Service will be error-free or continuously available.</li>
            <li>Results obtained through the Service (including AI-generated outputs) will be accurate, complete, or suitable for any particular purpose.</li>
            <li>Any defects in the Service will be corrected.</li>
          </ul>
          <p className="mt-3">
            Nothing in these Terms excludes or limits warranties or rights that cannot be excluded or limited under mandatory applicable consumer protection law.
          </p>
        </section>

        {/* 10. Limitation of liability */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            10. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, SammaPix (Luca Sammarco) shall not be liable for any indirect, incidental, consequential, special, or punitive damages, or for any loss of profits, revenue, data, or goodwill, arising out of or in connection with your use of or inability to use the Service, even if we have been advised of the possibility of such damages.
          </p>
          <p className="mt-3">
            Our total aggregate liability to you for any claims arising out of or relating to these Terms or the Service shall not exceed the greater of (a) the total fees paid by you to SammaPix in the 12 months immediately preceding the event giving rise to the claim, or (b) EUR 10.
          </p>
          <p className="mt-3">
            These limitations apply regardless of the theory of liability (contract, tort, statute, or otherwise). Some jurisdictions do not allow the exclusion or limitation of certain liabilities; in such jurisdictions, our liability is limited to the maximum extent permitted by law.
          </p>
        </section>

        {/* 11. Indemnification */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            11. Indemnification
          </h2>
          <p>
            You agree to indemnify and hold harmless Luca Sammarco and any contributors to the Service from and against any claims, damages, losses, costs, and expenses (including reasonable legal fees) arising from: (a) your use of the Service in violation of these Terms; (b) Your Content; or (c) your violation of any applicable law or the rights of any third party.
          </p>
        </section>

        {/* 12. Termination */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            12. Termination
          </h2>
          <p>
            You may stop using the Service and delete your account at any time. Account deletion requests can be submitted from your account settings or by emailing{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>
            . Upon deletion, your personal data will be erased within 30 days in accordance with our Privacy Policy.
          </p>
          <p className="mt-3">
            We may suspend or terminate your access to the Service immediately and without prior notice if we reasonably determine that you have violated these Terms, used the Service in a manner that poses a risk to us or other users, or for other legitimate operational reasons. Where we terminate your account without cause, we will refund any unused portion of a prepaid Pro subscription on a pro-rated basis.
          </p>
          <p className="mt-3">
            Sections 7 (Intellectual Property), 9 (Disclaimer of Warranties), 10 (Limitation of Liability), 11 (Indemnification), and 13 (Governing Law) survive termination.
          </p>
        </section>

        {/* 13. Governing law */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            13. Governing Law and Dispute Resolution
          </h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of Italy, without regard to conflict of law principles. The courts of Italy shall have exclusive jurisdiction over any dispute arising from or relating to these Terms or the Service.
          </p>
          <p className="mt-3">
            If you are a consumer resident in the European Union, you may also have access to the EU Online Dispute Resolution platform at{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              ec.europa.eu/consumers/odr
            </a>
            . Our email address for the purposes of that platform is{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>
            .
          </p>
          <p className="mt-3">
            Nothing in this section affects any mandatory rights you may have as a consumer under the law of your country of residence that cannot be derogated from by agreement.
          </p>
        </section>

        {/* 14. Changes to terms */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            14. Changes to These Terms
          </h2>
          <p>
            We may update these Terms from time to time. We will update the &ldquo;Last updated&rdquo; date at the top of this page and, for material changes, notify registered users by email or by a prominent notice within the Service at least 14 days before the changes take effect. Your continued use of the Service after the effective date constitutes acceptance of the updated Terms. If you do not agree to the updated Terms, you must stop using the Service before they take effect.
          </p>
        </section>

        {/* 15. Miscellaneous */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            15. Miscellaneous
          </h2>
          <ul className="pl-5 list-disc space-y-2">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Entire agreement.</strong> These Terms, together with our{" "}
              <Link href="/privacy" className="text-[#6366F1] hover:underline">
                Privacy Policy
              </Link>
              , constitute the entire agreement between you and SammaPix regarding the Service and supersede any prior agreements.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Severability.</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">No waiver.</strong> Our failure to enforce any right or provision of these Terms does not constitute a waiver of that right or provision.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Assignment.</strong> You may not assign or transfer your rights under these Terms without our prior written consent. We may assign our rights and obligations under these Terms without restriction.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Language.</strong> These Terms are written in English. In the event of any conflict between an English version and a translation, the English version shall prevail.
            </li>
          </ul>
        </section>

        {/* 16. Contact */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            16. Contact
          </h2>
          <p>
            For questions about these Terms or the Service:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>
              Email:{" "}
              <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
                luca@sammapix.com
              </a>
            </li>
            <li>Website:{" "}
              <a
                href="https://sammapix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6366F1] hover:underline"
              >
                sammapix.com
              </a>
            </li>
            <li>Operator: Luca Sammarco, Italy</li>
          </ul>
        </section>

        {/* Disclaimer */}
        <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] pt-6 text-xs text-[#A3A3A3] dark:text-[#737373]">
          <p>
            This Terms of Service document is provided for informational purposes and reflects our current policies. This document does not constitute legal advice. Consult with a qualified attorney for legal advice specific to your situation.
          </p>
        </div>

      </div>
    </div>
  );
}
