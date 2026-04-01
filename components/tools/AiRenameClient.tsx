"use client";

/**
 * Thin client wrapper for the ai-rename page.
 * Renders ToolInterface + NextStepSuggestions as a single client subtree
 * so the parent ai-rename page can remain a Server Component.
 */

import ToolInterface from "@/components/tools/ToolInterface";
import dynamic from "next/dynamic";

const NextStepSuggestions = dynamic(() => import("@/components/tools/NextStepSuggestions"), { ssr: false });

export default function AiRenameClient() {
  return (
    <>
      <ToolInterface defaultMode="ai-rename" />

      {/* Next-step suggestions- shown automatically when all files are done */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="ai-rename" />
        </div>
      </section>
    </>
  );
}
