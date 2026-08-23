import type { Metadata } from "next";
import CoffeeStatsClient from "./CoffeeStatsClient";

export const metadata: Metadata = {
  title: "Coffee popup stats (admin)",
  robots: { index: false, follow: false },
};

export default function CoffeeStatsPage() {
  return <CoffeeStatsClient />;
}
