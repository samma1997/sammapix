"use client";

import React, { useState } from "react";
import { Bot, ShieldCheck, Zap, Image as ImageIcon } from "lucide-react";

interface Props {
  params: { client_id: string; redirect_uri: string; code_challenge: string; code_challenge_method: string; state: string; scope: string; resource: string };
  clientName: string;
  userEmail: string;
}

export default function ConsentScreen({ params, clientName, userEmail }: Props) {
  const [busy, setBusy] = useState<"approve" | "deny" | null>(null);

  const approve = async () => {
    setBusy("approve");
    try {
      const res = await fetch("/api/oauth/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (data?.redirect) window.location.href = data.redirect;
      else {
        alert(data?.error_description || data?.error || "Authorization failed");
        setBusy(null);
      }
    } catch {
      setBusy(null);
    }
  };

  const deny = () => {
    setBusy("deny");
    const url = new URL(params.redirect_uri);
    url.searchParams.set("error", "access_denied");
    if (params.state) url.searchParams.set("state", params.state);
    window.location.href = url.toString();
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-[#191919] px-4 py-10">
      <div className="max-w-md w-full rounded-2xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] p-7">
        <div className="flex items-center gap-2 mb-5">
          <div className="h-9 w-9 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
            <Bot className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">Authorize {clientName}</p>
            <p className="text-xs text-[#A3A3A3]">wants to connect to your SammaPix account</p>
          </div>
        </div>

        <p className="text-sm text-[#525252] dark:text-[#A3A3A3] mb-4">
          Signed in as <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">{userEmail}</span>. If you approve, this application will be able to:
        </p>

        <ul className="space-y-2.5 mb-6">
          {[
            { icon: ImageIcon, text: "Run SammaPix image & PDF tools (compress, convert, resize, crop, pipelines) on files you send it" },
            { icon: Zap, text: "Spend credits from your account for each operation" },
            { icon: ShieldCheck, text: "Files are processed and immediately discarded — zero-retention" },
          ].map((row, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <row.icon className="h-4 w-4 text-[#737373] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-sm text-[#525252] dark:text-[#A3A3A3]">{row.text}</span>
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <button
            onClick={deny}
            disabled={busy !== null}
            className="flex-1 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] px-4 py-2.5 text-sm font-medium text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] disabled:opacity-50"
          >
            {busy === "deny" ? "…" : "Deny"}
          </button>
          <button
            onClick={approve}
            disabled={busy !== null}
            className="flex-1 rounded-lg bg-[#171717] dark:bg-[#E5E5E5] px-4 py-2.5 text-sm font-medium text-white dark:text-[#171717] hover:bg-[#262626] dark:hover:bg-white disabled:opacity-50"
          >
            {busy === "approve" ? "Authorizing…" : "Approve"}
          </button>
        </div>

        <p className="text-[11px] text-[#A3A3A3] text-center mt-4">You can revoke access anytime from your SammaPix dashboard.</p>
      </div>
    </main>
  );
}
