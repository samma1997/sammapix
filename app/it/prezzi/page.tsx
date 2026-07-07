import type { Metadata } from "next";
import { APP_URL } from "@/lib/constants";
import PrezziClient from "@/components/it/PrezziClient";

const URL = `${APP_URL}/it/prezzi`;

export const metadata: Metadata = {
  title: "Prezzi SammaPix — Gratis per sempre, Pro $9/mese | SammaPix",
  description:
    "Tutti gli strumenti foto gratis nel browser, senza upload. Passa a Pro ($9/mese) per batch da 500 file, download ZIP e 200 crediti AI al giorno. Nessuna carta per provare.",
  alternates: {
    canonical: URL,
    languages: { it: URL, en: `${APP_URL}/pricing`, "x-default": `${APP_URL}/pricing` },
  },
  openGraph: {
    title: "Prezzi SammaPix — Gratis per sempre, Pro $9/mese",
    description:
      "Strumenti foto gratis nel browser. Pro per più potenza. Nessuna carta per provare.",
    url: URL,
    type: "website",
    locale: "it_IT",
  },
};

export default function PrezziPage() {
  return <PrezziClient />;
}
