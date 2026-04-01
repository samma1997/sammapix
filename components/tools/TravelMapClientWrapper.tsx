"use client";

/**
 * Thin client wrapper for the travelmap page.
 * Renders TravelMap + NextStepSuggestions as a single client subtree
 * so the parent travelmap page can remain a Server Component.
 */

import TravelMapComponent from "@/components/tools/TravelMap";
import dynamic from "next/dynamic";

const NextStepSuggestions = dynamic(() => import("@/components/tools/NextStepSuggestions"), { ssr: false });

export default function TravelMapClientWrapper() {
  return (
    <>
      <TravelMapComponent />

      {/* Next-step suggestions- shown automatically when all files are done */}
      <section className="px-4 sm:px-6 pb-2">
        <div className="max-w-3xl mx-auto">
          <NextStepSuggestions currentTool="travelmap" />
        </div>
      </section>
    </>
  );
}
