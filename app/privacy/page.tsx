import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — SammaPix",
  description:
    "SammaPix privacy policy. Image compression happens in your browser only. Files never leave your device unless you use AI Rename.",
  alternates: {
    canonical: "https://sammapix.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy — SammaPix",
    description:
      "Learn how SammaPix protects your privacy. All processing happens in your browser. No server uploads for compression.",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          ← Back to SammaPix
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: March 5, 2026</p>

      <div className="prose prose-sm prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Overview</h2>
          <p>
            SammaPix (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the service&rdquo;) is a free online image optimization tool.
            We take your privacy seriously. This policy explains what data we collect, how we use it,
            and what rights you have.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Image Processing</h2>
          <p>
            <strong>Your images never leave your browser</strong> for compression, WebP conversion,
            or resize operations. All processing happens locally using your device&apos;s CPU and browser APIs.
            We never upload, store, or access your image files for these features.
          </p>
          <p className="mt-3">
            <strong>AI Rename</strong> is the only exception. When you use AI Rename, a small compressed
            thumbnail (max 1024px) of your image is sent to Google&apos;s Gemini API for visual analysis.
            This thumbnail is used solely to generate a descriptive filename and alt text — it is not
            stored by SammaPix and is processed according to{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Google&apos;s Privacy Policy
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Account Data</h2>
          <p>
            If you create an account (required for AI Rename), we collect:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Your email address (from Google or GitHub sign-in)</li>
            <li>Your name and profile picture (from your OAuth provider)</li>
            <li>Usage data: number of AI Rename calls per day (to enforce free plan limits)</li>
          </ul>
          <p className="mt-3">
            We do not sell your personal data to third parties. We do not use your email for marketing
            without explicit consent.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Authentication</h2>
          <p>
            We use NextAuth.js for authentication. Sign-in is handled via Google OAuth or GitHub OAuth.
            We only request the minimum scopes required: your email address and public profile.
            We do not access your Google Drive, Gmail, or any other services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Cookies</h2>
          <p>
            We use the following cookies:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Session cookie</strong> (next-auth.session-token) — required for login. Expires when you close your browser or after 30 days.</li>
            <li><strong>Language preference</strong> (NEXT_LOCALE) — stores your detected language preference. No personal data.</li>
            <li><strong>Analytics</strong> — we use Cloudflare Web Analytics, which is privacy-first and does not use cookies or fingerprinting.</li>
          </ul>
          <p className="mt-3">
            If you use AdSense-served ads, Google may set cookies for ad personalization. You can
            opt out via{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Google Ad Settings
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Data Retention</h2>
          <p>
            Account data is retained as long as your account is active. You can request deletion at
            any time by contacting us. Upon deletion, your email, name, and usage data are permanently
            removed within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Rights (GDPR)</h2>
          <p>
            If you are located in the European Economic Area, you have the following rights:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Access</strong> — request a copy of the data we hold about you</li>
            <li><strong>Rectification</strong> — request correction of inaccurate data</li>
            <li><strong>Erasure</strong> — request deletion of your account and associated data</li>
            <li><strong>Portability</strong> — receive your data in a machine-readable format</li>
            <li><strong>Objection</strong> — object to processing based on legitimate interests</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, contact us at the email below.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Third-Party Services</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Google Gemini API</strong> — processes AI Rename thumbnails</li>
            <li><strong>Google OAuth</strong> — optional sign-in provider</li>
            <li><strong>GitHub OAuth</strong> — optional sign-in provider</li>
            <li><strong>Stripe</strong> — payment processing for Pro subscriptions</li>
            <li><strong>Vercel</strong> — hosting and edge infrastructure</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact</h2>
          <p>
            For privacy requests or questions, contact:{" "}
            <a href="mailto:privacy@sammapix.com" className="text-indigo-600 hover:underline">
              privacy@sammapix.com
            </a>
          </p>
          <p className="mt-2">
            Data controller: Luca Sammarco, sammapix.com
          </p>
        </section>

      </div>
    </div>
  );
}
