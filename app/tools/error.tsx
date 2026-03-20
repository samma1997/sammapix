"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ToolsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[tools] Error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <p className="text-6xl font-bold text-[#E5E5E5] dark:text-[#2A2A2A] mb-4">
        Oops
      </p>
      <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
        Something went wrong with this tool
      </h2>
      <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mb-6 text-center max-w-md">
        An unexpected error occurred. You can try again or head back to
        browse all tools.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#F5F5F5] transition-colors"
        >
          Try again
        </button>
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#525252] dark:text-[#A3A3A3] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-md hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
        >
          Back to tools
        </Link>
      </div>
    </div>
  );
}
