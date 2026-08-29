"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// SSR must be disabled here (and ONLY here, never in a Server Component)
// because ReactFlow uses browser APIs (ResizeObserver, DOM measurements).
const StudioCanvas = dynamic(() => import("./StudioCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-[#6366F1]" strokeWidth={1.5} />
    </div>
  ),
});

export default function StudioClientWrapper() {
  return <StudioCanvas />;
}
