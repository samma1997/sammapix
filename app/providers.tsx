"use client";

import { SessionProvider } from "next-auth/react";
import DayPassSuccessModal from "@/components/ui/DayPassSuccessModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      {/* Momento celebrativo post-acquisto Day Pass (globale, si attiva su ?daypass=active) */}
      <DayPassSuccessModal />
    </SessionProvider>
  );
}
