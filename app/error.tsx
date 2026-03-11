"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <p className="text-6xl font-bold text-[#E5E5E5] dark:text-[#2A2A2A] mb-4">500</p>
      <h2 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] mb-2">
        Something went wrong
      </h2>
      <p className="text-sm text-[#737373] mb-6">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#171717] dark:bg-white text-white dark:text-[#171717] text-sm font-medium rounded-md hover:bg-[#262626] dark:hover:bg-[#F5F5F5] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
