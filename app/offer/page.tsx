import type { Metadata } from "next";
import OfferClient from "./OfferClient";

// Landing campagna subscriber (broadcast annuale $29). NON indicizzare: è per chi
// arriva dall'email, non deve comparire su Google.
export const metadata: Metadata = {
  title: "Your first year of Pro for $29 | SammaPix",
  description:
    "A one-time offer for SammaPix subscribers: your first year of Pro for $29 instead of $108.",
  robots: { index: false, follow: false },
};

export default function OfferPage() {
  return <OfferClient />;
}
