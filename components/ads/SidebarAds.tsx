"use client";

import { useSession } from "next-auth/react";
import AdUnit from "@/components/ads/AdUnit";

/**
 * Due annunci laterali su desktop largo (xl+), ai lati del contenuto centrato
 * (i tool sono max-w ~768px, su schermi >=1280px restano ~250px per lato).
 * Nascosti sotto xl (tablet/mobile) per non schiacciare il tool.
 * Solo utenti anonimi. Fissi ai bordi, z-index basso: non coprono header,
 * modali o il tool. La versione loggata (/dashboard) non li riceve.
 */
export default function SidebarAds() {
  const { status } = useSession();
  if (status !== "unauthenticated") return null;

  return (
    <>
      <div className="hidden xl:block fixed left-3 top-1/2 -translate-y-1/2 w-[160px] z-10">
        <AdUnit adSlot="2928846393" adFormat="vertical" />
      </div>
      <div className="hidden xl:block fixed right-3 top-1/2 -translate-y-1/2 w-[160px] z-10">
        <AdUnit adSlot="2928846393" adFormat="vertical" />
      </div>
    </>
  );
}
