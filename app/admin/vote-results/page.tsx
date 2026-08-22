import type { Metadata } from "next";
import VoteResultsClient from "./VoteResultsClient";

export const metadata: Metadata = {
  title: "Vote results (admin)",
  robots: { index: false, follow: false },
};

export default function VoteResultsPage() {
  return <VoteResultsClient />;
}
