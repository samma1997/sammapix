"use client";
import { useEffect, useState } from "react";

export default function FoundingSpotsCounter() {
  const [data, setData] = useState<{ spotsLeft: number; totalSpots: number; active: boolean } | null>(null);

  useEffect(() => {
    fetch("/api/billing/founding-status")
      .then(r => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data || !data.active) return null;

  const percentage = ((data.totalSpots - data.spotsLeft) / data.totalSpots) * 100;

  return (
    <div className="text-center mt-3">
      <div className="inline-flex items-center gap-2 text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
        <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        {data.spotsLeft} of {data.totalSpots} founding spots remaining
      </div>
      <div className="mt-1.5 w-48 mx-auto h-1.5 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#6366F1] rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
