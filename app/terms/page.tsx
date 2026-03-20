import type { Metadata } from "next";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service - SammaPix",
  description:
    "SammaPix terms of service. Free and Pro plans, payment terms, file processing disclaimers, AI tool usage, and governing law (Italy / EU).",
  alternates: {
    canonical: `${APP_URL}/terms`,
  },
  openGraph: {
    title: "Terms of Service - SammaPix",
    description:
      "SammaPix terms of service. Free and Pro plans, payment terms, file processing disclaimers, AI tool usage, and governing law (Italy / EU).",
    type: "website",
    url: `${APP_URL}/terms`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SammaPix" }],
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
          Last updated: March 20, 2026
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
            (the &ldquo;Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms in their entirety, you may not access or use the Service.
          </p>
          <p className="mt-3">
            These Terms constitute a legally binding agreement between you (&ldquo;User&rdquo;, &ldquo;you&rdquo;) and Luca Sammarco (&ldquo;SammaPix&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), an individual operator based in Italy. By creating an account or using any feature of the Service, you represent that you are at least 16 years old and have the legal capacity to enter into this agreement under applicable law.
          </p>
          <p className="mt-3">
            If you are using the Service on behalf of a business or organisation, you represent that you are authorised to bind that entity to these Terms, and references to &ldquo;you&rdquo; include that entity.
          </p>
        </section>

        {/* 2. Description of service */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            2. Description of Service
          </h2>
          <p>
            SammaPix is a browser-based image optimisation platform offering a suite of tools for compressing, converting, resizing, cropping, renaming, watermarking, and otherwise processing image files. The Service operates on a freemium model comprising a Free plan and a paid Pro plan.
          </p>
          <p className="mt-3">
            Key technical characteristics of the Service:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Client-side processing.</strong> The majority of tools — including Compress, Convert to WebP, HEIC Convert, Batch Resize, Crop, Watermark, Film Filters, Find Duplicates, Photo Cull, EXIF Viewer, PDF to Image, Batch Rename, Web Optimize, Blog Ready, and AI Organize (local sort) — process all image data entirely within your web browser. For these tools, no image data is transmitted to our servers or any third party at any point.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">AI tools requiring data transmission.</strong> The AI Rename, AI Alt Text, AI Photo Sort, AI Organize (cloud-assisted), and Transcribe tools send a reduced-resolution thumbnail (or, for Transcribe, the audio file) to Google&apos;s Gemini API for analysis. A signed-in account is required to use these tools. See Section 8 for more detail.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">No server-side file storage.</strong> SammaPix does not store any user-uploaded files on its servers, whether for client-side or AI tools. All file processing is ephemeral. Once your browser session ends or you navigate away, your files are no longer accessible through the Service. We provide no backup or recovery mechanism for your files. See Section 6 for the critical disclaimer regarding file liability.
            </li>
          </ul>
          <p className="mt-3">
            We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with reasonable notice where practicable. We will make reasonable efforts to communicate significant changes to registered users.
          </p>
        </section>

        {/* 3. Account responsibilities */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            3. Account Responsibilities
          </h2>
          <p>
            Certain features of the Service — including all AI tools and Pro plan features — require you to create an account. When you register, you agree to:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Provide accurate, current, and complete information at registration and keep that information updated.</li>
            <li>Keep your account credentials secure and not share them with any third party.</li>
            <li>Notify us promptly at{" "}
              <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
                luca@sammapix.com
              </a>{" "}
              if you become aware of or suspect any unauthorised access to your account.
            </li>
            <li>Accept full responsibility for all activity that occurs under your account, whether authorised by you or not.</li>
            <li>Maintain only one account per person. Creating multiple accounts to circumvent usage limits is a material breach of these Terms.</li>
          </ul>
          <p className="mt-3">
            We reserve the right to suspend or terminate accounts that we reasonably believe are being used in violation of these Terms, applicable law, or in a manner that is harmful to the Service or other users.
          </p>
        </section>

        {/* 4. Acceptable use */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            4. Acceptable Use
          </h2>
          <p>
            You agree to use the Service only for lawful purposes and in a manner fully consistent with these Terms and all applicable laws and regulations. You must not:
          </p>
          <ul className="mt-3 pl-5 list-disc space-y-1">
            <li>Process, upload, or transmit images, audio, or other content that is unlawful, harmful, threatening, abusive, defamatory, obscene, or that infringes the intellectual property or privacy rights of any third party.</li>
            <li>Use the Service to process content that violates any applicable law, including child protection legislation or laws prohibiting the distribution of non-consensual intimate images.</li>
            <li>Use automated scripts, bots, crawlers, scrapers, or other automated means to access or use the Service in a manner that exceeds normal human usage patterns or places excessive load on our infrastructure.</li>
            <li>Attempt to circumvent usage limits, rate limits, or plan restrictions through any technical means, including the creation of multiple accounts or the use of proxy services.</li>
            <li>Reverse engineer, decompile, disassemble, or otherwise attempt to extract the source code of the Service or any component thereof.</li>
            <li>Resell, sublicense, white-label, or otherwise commercialise access to the Service or any output thereof without our prior written consent.</li>
            <li>Use output from the Service&apos;s AI tools to train, develop, or improve any machine learning model or competing product.</li>
            <li>Interfere with, disrupt, or damage the integrity or performance of the Service, its infrastructure, or the systems of any third party connected to the Service.</li>
            <li>Misrepresent your identity or affiliation with any person or entity in connection with your use of the Service.</li>
          </ul>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">Fair Use and Abuse Prevention.</strong> SammaPix reserves the right, at its sole discretion, to limit, throttle, suspend, or permanently restrict access to the Service — including access to specific tools or the Service as a whole — for any user who we determine is abusing the Service. Abuse includes but is not limited to: excessive API call volumes inconsistent with legitimate personal or business use, automated scraping of the platform, attempts to reverse-engineer proprietary algorithms, or any pattern of use that imposes disproportionate costs or load on the Service. Such action may be taken without prior notice and without liability to you.
          </p>
        </section>

        {/* 5. Free vs Pro plans */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            5. Free Plan and Pro Plan
          </h2>
          <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">Free Plan</p>
          <p className="mt-2">
            The Free plan is available to all users without charge. Free plan users may use the Service subject to the usage limits in effect at the time of use, including but not limited to daily limits on AI credits and batch file counts. Free plan users may see advertising served by Google AdSense. The specific limits applicable to the Free plan are described on the{" "}
            <Link href="/pricing" className="text-[#6366F1] hover:underline">
              Pricing page
            </Link>
            {" "}and may be updated at any time.
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Pro Plan</p>
          <p className="mt-2">
            The Pro plan is a paid subscription currently priced at USD 9 per month or USD 79 per year (where the annual plan is offered). Pro plan subscribers receive higher usage limits, removal of advertising, ZIP batch downloads, and additional benefits as described on the{" "}
            <Link href="/pricing" className="text-[#6366F1] hover:underline">
              Pricing page
            </Link>
            . New Pro subscribers receive a 7-day free trial. After the trial period, your payment method will be charged automatically unless you cancel before the trial ends.
          </p>
          <p className="mt-3">
            The features and limits of each plan are subject to change. Changes that expand plan benefits may be made immediately. Changes that reduce plan benefits will be communicated with at least 30 days&apos; advance notice to active subscribers.
          </p>
        </section>

        {/* 6. CRITICAL: File liability and no storage */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            6. File Processing — Critical Disclaimers
          </h2>

          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 space-y-3">
            <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">
              6.1 No Liability for File Damage or Loss
            </p>
            <p>
              SammaPix processes image and audio files using browser-based APIs and, for AI tools, third-party cloud APIs. File processing operations — including compression, format conversion, resizing, cropping, watermarking, filter application, and AI analysis — inherently carry a risk of unexpected output, corruption, data loss, or unintended modification.
            </p>
            <p>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">SammaPix bears absolutely no responsibility or liability for any damage to, corruption of, loss of, or alteration of your files that occurs during or after processing through the Service</strong>, whether caused by software bugs, browser compatibility issues, network interruptions, third-party API failures, or any other cause. This exclusion applies regardless of whether SammaPix was informed of the possibility of such loss.
            </p>
            <p>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">You are solely responsible for maintaining complete and current backups of all original files before using the Service.</strong> We strongly recommend that you never process your only copy of any file through SammaPix or any online tool.
            </p>
          </div>

          <div className="border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md p-4 space-y-3 mt-4">
            <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">
              6.2 No File Storage — No Recovery
            </p>
            <p>
              SammaPix does not store any file you process through the Service on its servers or any persistent storage medium. All processing is ephemeral: files exist in your browser&apos;s memory for the duration of the processing operation and are not retained by SammaPix in any form after processing completes or your session ends.
            </p>
            <p>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">SammaPix provides no backup mechanism, no file recovery service, and no guarantee of access to processed files after download.</strong> If you fail to download a processed file before navigating away, refreshing the page, or closing your browser, that file is permanently inaccessible through the Service and SammaPix has no ability to restore it.
            </p>
            <p>
              This is a deliberate architectural and privacy-protective design choice, not a limitation we can waive. Contacting support to recover lost files is not possible and such requests cannot be fulfilled.
            </p>
          </div>
        </section>

        {/* 7. Payment and refunds */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            7. Payment, Pricing, and Refunds
          </h2>

          <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">Payment Processing</p>
          <p className="mt-2">
            Pro subscriptions are processed by Stripe, Inc. By subscribing, you authorise Stripe to charge your chosen payment method on a recurring monthly or annual basis until you cancel. All fees are stated in US dollars and may be exclusive of applicable local taxes. Where taxes are required by your jurisdiction, they will be added to the amount charged.
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Right to Change Pricing</p>
          <p className="mt-2">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">SammaPix reserves the right to change subscription prices at any time.</strong> For existing active subscribers, any price increase will be communicated by email to the address associated with your account at least 30 days before the new price takes effect. If you do not cancel your subscription within that 30-day notice period, you will be deemed to have accepted the new price, and your next billing cycle will be charged at the updated rate. Price changes do not apply to the current paid billing period already in progress.
          </p>
          <p className="mt-3">
            Price reductions or promotional pricing may be applied at any time without notice and may not be retroactively applied to current billing cycles.
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Cancellation</p>
          <p className="mt-2">
            You may cancel your Pro subscription at any time from your account dashboard or by contacting us at{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>
            . Upon cancellation, your subscription will remain active and you will retain Pro features until the end of the current paid billing period, after which your account will automatically revert to the Free plan. We do not charge cancellation fees.
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">Refunds</p>
          <p className="mt-2">
            We offer a 7-day money-back guarantee for new Pro subscribers on their first subscription. If you are not satisfied within the first 7 days of your initial paid subscription (not the free trial), contact us at{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>{" "}
            for a full refund. Outside of this period, subscription fees are non-refundable except where required by mandatory consumer protection law applicable in your jurisdiction, or at our sole discretion.
          </p>

          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">EU / EEA Consumer Rights</p>
          <p className="mt-2">
            If you are a consumer resident in the European Union or European Economic Area, you may have additional statutory cancellation rights under applicable consumer protection directives, including a 14-day right of withdrawal from distance contracts (cooling-off period). By requesting and accessing Pro features immediately after purchase, you expressly consent to the performance of the contract commencing before the cooling-off period expires, and you acknowledge that this may affect your right of withdrawal. If you exercise your right of withdrawal within 14 days, we may charge a proportionate amount for the service provided up to the point of withdrawal, consistent with Article 14 of Directive 2011/83/EU.
          </p>
          <p className="mt-3">
            Nothing in these Terms excludes or limits any rights you have as a consumer under mandatory consumer protection law in your country of residence that cannot be derogated from by contract.
          </p>
        </section>

        {/* 8. AI tools disclaimer */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            8. AI Tools — Disclaimer and Limitations
          </h2>
          <p>
            The following tools are powered by the Google Gemini 2.5 Flash API: AI Rename, AI Alt Text, AI Organize, AI Photo Sort, and Transcribe. When you use these tools, a reduced-resolution thumbnail of your image (or, for Transcribe, the audio file) is transmitted to Google&apos;s servers for processing. A signed-in account is required.
          </p>
          <p className="mt-3">
            <strong className="text-[#404040] dark:text-[#D4D4D4]">AI outputs are provided strictly &ldquo;as is&rdquo; and without warranty of any kind.</strong> SammaPix makes no representations and provides no guarantees regarding the accuracy, completeness, relevance, suitability, or fitness for any particular purpose of any AI-generated output, including but not limited to:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Filenames generated by AI Rename</li>
            <li>Accessibility descriptions generated by AI Alt Text</li>
            <li>Category labels or sort orders generated by AI Photo Sort or AI Organize</li>
            <li>Transcriptions generated by Transcribe</li>
          </ul>
          <p className="mt-3">
            AI-generated outputs may contain errors, hallucinations, inaccuracies, culturally insensitive language, or outputs that are factually incorrect. <strong className="text-[#404040] dark:text-[#D4D4D4]">You are solely responsible for reviewing, editing, and verifying all AI-generated content before relying on or publishing it.</strong> SammaPix is not liable for any loss, harm, or consequences arising from your use of or reliance on AI-generated outputs.
          </p>
          <p className="mt-3">
            Google&apos;s processing of data submitted to the Gemini API is governed by Google&apos;s own terms and privacy policies. We are not responsible for Google&apos;s data handling practices.
          </p>
        </section>

        {/* 9. Subscription termination rights */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            9. Right to Terminate or Suspend Subscriptions
          </h2>
          <p>
            <strong className="text-[#404040] dark:text-[#D4D4D4]">SammaPix reserves the right to terminate, suspend, or restrict any user&apos;s account or subscription at any time, at its sole discretion, with or without cause, and with or without prior notice.</strong>
          </p>
          <p className="mt-3">
            Reasons for termination or suspension may include, but are not limited to:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Violation of these Terms or any applicable law.</li>
            <li>Abusive use of the Service, including patterns consistent with automated scraping or excessive API consumption.</li>
            <li>Fraudulent or suspicious payment activity.</li>
            <li>Conduct that poses a risk to the Service, its infrastructure, or other users.</li>
            <li>Operational, commercial, or legal reasons at our discretion, including the discontinuation of the Service or a particular plan.</li>
          </ul>
          <p className="mt-3">
            Where we terminate a subscription without cause, we will refund a pro-rated portion of any prepaid subscription fees for the unused period. Where we terminate due to a violation of these Terms, no refund will be issued. Termination does not release you from any obligations accrued prior to the termination date.
          </p>
          <p className="mt-3">
            You may terminate your account at any time from your account settings or by contacting us. Upon account deletion, your personal data will be erased within 30 days in accordance with our{" "}
            <Link href="/privacy" className="text-[#6366F1] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        {/* 10. Intellectual property */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            10. Intellectual Property
          </h2>
          <p className="font-medium text-[#404040] dark:text-[#D4D4D4]">Your Content</p>
          <p className="mt-2">
            You retain full ownership of all images, audio files, and other content you process through the Service (&ldquo;Your Content&rdquo;). These Terms do not grant SammaPix any ownership interest in Your Content.
          </p>
          <p className="mt-3">
            By using the AI tools, you grant SammaPix a limited, non-exclusive, royalty-free, temporary licence to transmit the relevant thumbnail or audio data to our AI processing partners (Google Gemini) solely for the purpose of generating the requested output on your behalf. This licence is strictly limited to what is technically necessary to provide the Service and does not include any right to store, display, sublicense, or use Your Content for any other purpose.
          </p>
          <p className="mt-4 font-medium text-[#404040] dark:text-[#D4D4D4]">SammaPix Intellectual Property</p>
          <p className="mt-2">
            The Service, including its design, code, trademarks, branding, product names, domain names, and all content created by SammaPix (&ldquo;SammaPix IP&rdquo;), is owned by Luca Sammarco and protected by applicable intellectual property laws, including Italian and EU copyright law. Nothing in these Terms transfers any ownership of SammaPix IP to you.
          </p>
          <p className="mt-3">
            You are granted a limited, non-exclusive, non-transferable, revocable licence to access and use the Service for your personal or internal business purposes, subject to these Terms. This licence does not include the right to reproduce, distribute, create derivative works from, publicly display, or sublicense any SammaPix IP.
          </p>
        </section>

        {/* 11. Third-party services */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            11. Third-Party Services
          </h2>
          <p>
            The Service integrates with and relies upon third-party services including:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li><strong className="text-[#404040] dark:text-[#D4D4D4]">Google</strong> — Gemini API (AI processing), OAuth (authentication), Drive (optional file import), AdSense (advertising on Free plan), Google Ads (conversion tracking), Google Analytics 4 (analytics behind cookie consent)</li>
            <li><strong className="text-[#404040] dark:text-[#D4D4D4]">GitHub</strong> — OAuth (authentication)</li>
            <li><strong className="text-[#404040] dark:text-[#D4D4D4]">Stripe, Inc.</strong> — Payment processing and subscription management</li>
            <li><strong className="text-[#404040] dark:text-[#D4D4D4]">Vercel, Inc.</strong> — Hosting, infrastructure, and cookieless analytics</li>
            <li><strong className="text-[#404040] dark:text-[#D4D4D4]">Meta Platforms, Inc.</strong> — Meta Pixel and Conversions API for advertising attribution</li>
            <li><strong className="text-[#404040] dark:text-[#D4D4D4]">Resend</strong> — Transactional and marketing email delivery</li>
            <li><strong className="text-[#404040] dark:text-[#D4D4D4]">Dropbox</strong> — Optional file import integration</li>
          </ul>
          <p className="mt-3">
            Your use of these third-party services in connection with SammaPix is subject to their respective terms of service and privacy policies. SammaPix is not responsible for the availability, accuracy, privacy practices, or terms of any third-party service provider.
          </p>
          <p className="mt-3">
            Links to third-party websites or services appearing within the Service are provided for your convenience only and do not constitute an endorsement. We have no control over and accept no responsibility for third-party content.
          </p>
        </section>

        {/* 12. Disclaimers */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            12. Disclaimer of Warranties
          </h2>
          <p>
            The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied. To the fullest extent permitted by applicable law, SammaPix expressly disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, completeness, or uninterrupted availability.
          </p>
          <p className="mt-3">
            Without limiting the foregoing, SammaPix does not warrant that:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>The Service will be continuously available, error-free, or free from interruptions, delays, or security vulnerabilities.</li>
            <li>Results obtained through the Service — including AI-generated outputs such as filenames, alt text, categories, and transcriptions — will be accurate, complete, reliable, or suitable for any particular purpose.</li>
            <li>Any defects, bugs, or errors in the Service will be identified or corrected.</li>
            <li>The Service will be compatible with your browser, device, or operating system.</li>
            <li>Files processed through the Service will be free from corruption, data loss, or unintended alteration.</li>
          </ul>
          <p className="mt-3">
            Nothing in these Terms excludes or limits warranties or rights that cannot be excluded or limited under mandatory applicable consumer protection law, including Italian consumer law (Codice del Consumo, Legislative Decree No. 206/2005) and applicable EU consumer protection directives.
          </p>
        </section>

        {/* 13. Limitation of liability */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            13. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, SammaPix (Luca Sammarco) shall not be liable for any indirect, incidental, consequential, special, exemplary, or punitive damages, or for any loss of profits, revenue, data, goodwill, business opportunity, or anticipated savings, arising out of or in connection with your use of or inability to use the Service, regardless of whether such damages were foreseeable and even if SammaPix has been advised of the possibility of such damages.
          </p>
          <p className="mt-3">
            This limitation of liability applies specifically and without restriction to:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>Loss, damage, or corruption of files processed through the Service.</li>
            <li>Loss arising from your failure to maintain backups of original files.</li>
            <li>Errors, inaccuracies, or harmful outputs generated by AI tools.</li>
            <li>Downtime, service interruptions, or data loss caused by third-party providers.</li>
            <li>Unauthorised access to your account.</li>
            <li>Any action taken under the fair use and abuse prevention provisions of these Terms.</li>
          </ul>
          <p className="mt-3">
            SammaPix&apos;s total aggregate liability to you for all claims arising out of or relating to these Terms or the Service shall not exceed the greater of: (a) the total fees actually paid by you to SammaPix in the 12 months immediately preceding the event giving rise to the claim, or (b) EUR 10.
          </p>
          <p className="mt-3">
            These limitations apply regardless of the theory of liability (contract, tort, statute, or otherwise). Some jurisdictions do not permit the exclusion or limitation of certain liabilities; in such jurisdictions, our liability is limited to the maximum extent permitted by applicable law.
          </p>
        </section>

        {/* 14. Indemnification */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            14. Indemnification
          </h2>
          <p>
            You agree to indemnify, defend, and hold harmless Luca Sammarco, his contractors, and any contributors to the Service from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising from or relating to: (a) your use of the Service in violation of these Terms or applicable law; (b) Your Content, including any claim that Your Content infringes the rights of any third party; (c) your violation of any third party&apos;s rights; or (d) any dispute between you and a third party arising from your use of the Service.
          </p>
        </section>

        {/* 15. Email communications */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            15. Email Communications
          </h2>
          <p>
            By creating an account, you agree to receive transactional emails from SammaPix necessary for the operation of the Service, such as account verification emails, password reset links, subscription confirmations, payment receipts, and material notices regarding these Terms or our Privacy Policy. These transactional emails cannot be unsubscribed from while you have an active account, as they are essential for account and subscription management.
          </p>
          <p className="mt-3">
            Marketing and promotional emails — including product updates, feature announcements, and tips — will be sent only where you have opted in or where permitted by applicable law. You may unsubscribe from marketing emails at any time by clicking the unsubscribe link in any such email or by contacting us. Unsubscribing from marketing emails does not affect delivery of transactional emails.
          </p>
          <p className="mt-3">
            Email delivery is handled by Resend, Inc. See our{" "}
            <Link href="/privacy" className="text-[#6366F1] hover:underline">
              Privacy Policy
            </Link>{" "}
            for details on how your email address is processed.
          </p>
        </section>

        {/* 16. Governing law */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            16. Governing Law and Dispute Resolution
          </h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of the Republic of Italy, including but not limited to the Italian Civil Code (Codice Civile), the Italian Consumer Code (Codice del Consumo, Legislative Decree No. 206/2005), and applicable EU regulations, without regard to conflict of law principles.
          </p>
          <p className="mt-3">
            Subject to mandatory consumer protection provisions that cannot be derogated from by contract, any dispute arising from or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the competent courts of Italy.
          </p>
          <p className="mt-3">
            If you are a consumer resident in the European Union, you may also access the EU Online Dispute Resolution platform at{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:underline"
            >
              ec.europa.eu/consumers/odr
            </a>
            . Our contact email for that platform is{" "}
            <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
              luca@sammapix.com
            </a>
            .
          </p>
          <p className="mt-3">
            Nothing in this section affects any mandatory rights you may have as a consumer under the law of your country of residence.
          </p>
        </section>

        {/* 17. Changes to terms */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            17. Changes to These Terms
          </h2>
          <p>
            We may update these Terms from time to time to reflect changes in the Service, applicable law, or our business practices. We will update the &ldquo;Last updated&rdquo; date at the top of this page with each revision. For material changes — including changes that significantly affect your rights or obligations — we will notify registered users by email or by a prominent notice within the Service at least 14 days before the changes take effect.
          </p>
          <p className="mt-3">
            Your continued use of the Service after the effective date of any updated Terms constitutes your acceptance of those updated Terms. If you do not agree to the updated Terms, you must stop using the Service before the effective date.
          </p>
        </section>

        {/* 18. Miscellaneous */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            18. Miscellaneous
          </h2>
          <ul className="pl-5 list-disc space-y-2">
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Entire agreement.</strong> These Terms, together with our{" "}
              <Link href="/privacy" className="text-[#6366F1] hover:underline">
                Privacy Policy
              </Link>
              , constitute the entire agreement between you and SammaPix with respect to the Service and supersede all prior and contemporaneous agreements, representations, and understandings.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Severability.</strong> If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, that provision will be modified to the minimum extent necessary to make it enforceable, and the remaining provisions will continue in full force and effect.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">No waiver.</strong> Our failure or delay in enforcing any right or provision of these Terms does not constitute a waiver of that right or provision. Any waiver must be in writing and signed by an authorised representative of SammaPix.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Assignment.</strong> You may not assign, transfer, or sublicense your rights or obligations under these Terms without our prior written consent. SammaPix may freely assign these Terms in connection with a merger, acquisition, reorganisation, or sale of all or substantially all of its assets without your consent.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Force majeure.</strong> SammaPix will not be liable for any failure or delay in performance resulting from causes beyond our reasonable control, including natural disasters, acts of government, internet infrastructure failures, or third-party service outages.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Survival.</strong> Sections 6 (File Processing Disclaimers), 10 (Intellectual Property), 12 (Disclaimer of Warranties), 13 (Limitation of Liability), 14 (Indemnification), and 16 (Governing Law) survive the termination or expiry of these Terms.
            </li>
            <li>
              <strong className="text-[#404040] dark:text-[#D4D4D4]">Language.</strong> These Terms are written in English. In the event of any conflict between an English version and a translation, the English version prevails.
            </li>
          </ul>
        </section>

        {/* 19. Contact */}
        <section>
          <h2 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">
            19. Contact
          </h2>
          <p>
            For questions, concerns, or legal notices regarding these Terms or the Service:
          </p>
          <ul className="mt-2 pl-5 list-disc space-y-1">
            <li>
              Email:{" "}
              <a href="mailto:luca@sammapix.com" className="text-[#6366F1] hover:underline">
                luca@sammapix.com
              </a>
            </li>
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
            <li>Operator: Luca Sammarco, Italy</li>
          </ul>
        </section>

        {/* Disclaimer */}
        <div className="border-t border-[#E5E5E5] dark:border-[#2A2A2A] pt-6 text-xs text-[#A3A3A3] dark:text-[#737373]">
          <p>
            This Terms of Service document is provided for informational purposes and reflects our current policies as of the date shown above. This document does not constitute legal advice. Consult with a qualified attorney for legal advice specific to your situation.
          </p>
        </div>

      </div>
    </div>
  );
}
