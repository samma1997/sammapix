"use client";

import { SessionProvider } from "next-auth/react";
import DayPassSuccessModal from "@/components/ui/DayPassSuccessModal";
import DayPassBadge from "@/components/ui/DayPassBadge";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      {/* Momento celebrativo post-acquisto Day Pass (globale, si attiva su ?daypass=active) */}
      <DayPassSuccessModal />
      {/* Badge "Pro · Xh rimaste" durante il Day Pass attivo */}
      <DayPassBadge />
    </SessionProvider>
  );
}
