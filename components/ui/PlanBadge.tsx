"use client";
import { useSession } from "next-auth/react";

export default function PlanBadge() {
  const { data: session } = useSession();
  const isPro = (session?.user as { plan?: string })?.plan === "pro";

  if (isPro) {
    return (
      <span className="text-[10px] font-semibold text-white bg-[#171717] px-2 py-0.5 rounded-full">
        PRO
      </span>
    );
  }
  return (
    <span className="text-[10px] font-medium text-white bg-[#171717] px-2 py-0.5 rounded-full">
      Free
    </span>
  );
}
