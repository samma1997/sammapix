"use client";

import { SessionProvider } from "next-auth/react";
import AdBlockBanner from "@/components/ads/AdBlockBanner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <AdBlockBanner />
    </SessionProvider>
  );
}
