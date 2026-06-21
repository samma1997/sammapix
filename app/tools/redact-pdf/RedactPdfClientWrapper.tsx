"use client";

/**
 * Thin client wrapper for the redact-pdf page.
 * Renders RedactPdfClient + NextStepSuggestions as a single client subtree
 * so the parent page can remain a Server Component (ssr:false dynamic imports
 * are only allowed inside Client Components).
 */

import dynamic from "next/dynamic";

const RedactPdfClient = dynamic(
  () => import("@/components/tools/RedactPdfClient"),
  { ssr: false }
);

const NextStepSuggestions = dynamic(
  () => import("@/components/tools/NextStepSuggestions"),
  { ssr: false }
);

export default function RedactPdfClientWrapper() {
  return (
    <>
      <RedactPdfClient />

      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-4xl mx-auto">
          <NextStepSuggestions currentTool="redact-pdf" />
        </div>
      </section>
    </>
  );
}
