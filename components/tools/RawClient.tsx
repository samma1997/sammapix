"use client";

/**
 * Thin client wrapper for the raw-converter page.
 * Renders RawConverterClient + NextStepSuggestions as a single client subtree
 * so the parent page can remain a Server Component (ssr:false dynamic imports
 * are only allowed inside Client Components).
 */

import RawConverterClient from "@/components/tools/RawConverterClient";
import dynamic from "next/dynamic";

const NextStepSuggestions = dynamic(
  () => import("@/components/tools/NextStepSuggestions"),
  { ssr: false }
);

export default function RawClient() {
  return (
    <>
      <RawConverterClient />

      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="raw-converter" />
        </div>
      </section>
    </>
  );
}
