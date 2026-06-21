"use client";

/**
 * Thin client wrapper for the blur-censor page.
 * Renders BlurCensorClient + NextStepSuggestions as a single client subtree so
 * the parent page can stay a Server Component (ssr:false dynamic imports are
 * only allowed inside Client Components).
 */

import BlurCensorClient from "@/components/tools/BlurCensorClient";
import dynamic from "next/dynamic";

const NextStepSuggestions = dynamic(
  () => import("@/components/tools/NextStepSuggestions"),
  { ssr: false }
);

export default function BlurCensorClientWrap() {
  return (
    <>
      <BlurCensorClient />

      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="blur-censor" />
        </div>
      </section>
    </>
  );
}
