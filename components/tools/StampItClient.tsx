"use client";

/**
 * Thin client wrapper for the stampit page.
 * Renders StampIt + NextStepSuggestions as a single client subtree
 * so the parent stampit page can remain a Server Component.
 */

import StampIt from "@/components/tools/StampIt";
import dynamic from "next/dynamic";

const NextStepSuggestions = dynamic(() => import("@/components/tools/NextStepSuggestions"), { ssr: false });

export default function StampItClient() {
  return (
    <>
      <StampIt />

      {/* Next-step suggestions- shown automatically when all files are done */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="stampit" />
        </div>
      </section>
    </>
  );
}
