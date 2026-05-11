"use client";

import { useFoundingStatus } from "@/lib/hooks/useFoundingStatus";

export default function FoundingSpotsCounter() {
  const data = useFoundingStatus();
  if (!data || !data.active) return null;

  const percentage = ((data.totalSpots - data.spotsLeft) / data.totalSpots) * 100;
  const urgent = data.spotsLeft < 50;

  return (
    <div className="text-center mt-3">
      <div className="inline-flex items-center gap-2 text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
        <span className={`inline-block w-2 h-2 rounded-full animate-pulse ${urgent ? "bg-red-500" : "bg-green-500"}`} />
        <span className="tabular-nums">
          <span className={`font-bold ${urgent ? "text-red-600 dark:text-red-400" : "text-[#171717] dark:text-[#E5E5E5]"}`}>
            {data.spotsLeft}
          </span>{" "}
          of {data.totalSpots} founding spots left
        </span>
      </div>
      <div className="mt-1.5 w-48 mx-auto h-1.5 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${urgent ? "bg-red-500" : "bg-[#6366F1]"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
