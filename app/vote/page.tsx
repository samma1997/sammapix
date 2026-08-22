import type { Metadata } from "next";
import VoteClient from "./VoteClient";

export const metadata: Metadata = {
  title: "Vote for the next SammaPix tool",
  description:
    "You use SammaPix. Help us pick the next free tool we build. One click, that is it.",
  robots: { index: false, follow: false },
};

export default function VotePage() {
  return <VoteClient />;
}
