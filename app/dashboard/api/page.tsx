"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Key, Copy, Check, Trash2, Plus, Zap, Bot, Terminal, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";

interface KeyMeta {
  id: string;
  createdAt: number;
  label: string;
}

export default function ApiKeysPage() {
  const { status } = useSession();
  const [keys, setKeys] = useState<KeyMeta[]>([]);
  const [balance, setBalance] = useState<number | null>(null);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [freeGranted, setFreeGranted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [tab, setTab] = useState<"mcp" | "rest">("mcp");

  const refresh = useCallback(async () => {
    try {
      const [k, b] = await Promise.all([
        fetch("/api/v1/keys").then((r) => r.json()),
        fetch("/api/credits/balance").then((r) => r.json()).catch(() => null),
      ]);
      if (k?.keys) setKeys(k.keys);
      const bal = b?.credits ?? b?.balance;
      if (typeof bal === "number") setBalance(bal);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") refresh();
  }, [status, refresh]);

  const createKey = async () => {
    setCreating(true);
    setNewKey(null);
    try {
      const res = await fetch("/api/v1/keys", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ label: "default" }) });
      const data = await res.json();
      if (data?.key) {
        setNewKey(data.key);
        setFreeGranted(data.freeCreditsGranted ?? 0);
        await refresh();
      } else {
        alert(data?.detail ?? "Could not create key");
      }
    } finally {
      setCreating(false);
    }
  };

  const revoke = async (id: string) => {
    if (!confirm("Revoke this key? Apps using it will stop working.")) return;
    await fetch(`/api/v1/keys?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  const copy = (text: string, tag: string) => {
    navigator.clipboard.writeText(text);
    setCopied(tag);
    setTimeout(() => setCopied(null), 1500);
  };

  const KEY_PLACEHOLDER = newKey ?? "sk_live_YOUR_KEY";
  const mcpConfig = `{
  "mcpServers": {
    "sammapix": {
      "url": "${APP_URL}/api/mcp",
      "headers": { "Authorization": "Bearer ${KEY_PLACEHOLDER}" }
    }
  }
}`;
  const curlExample = `curl -X POST ${APP_URL}/api/v1/pipeline \\
  -H "Authorization: Bearer ${KEY_PLACEHOLDER}" \\
  -F "file=@photo.jpg" \\
  -F 'steps=[{"op":"resize","params":{"width":1200}},{"op":"convert","params":{"format":"webp","quality":80}}]' \\
  -o out.webp`;

  if (status === "loading" || (loading && status === "authenticated")) {
    return <div className="p-8 text-sm text-[#737373]">Loading…</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#171717] dark:text-[#E5E5E5] flex items-center gap-2">
            <Bot className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} /> API &amp; MCP for AI Agents
          </h1>
          <p className="text-sm text-[#737373] dark:text-[#A3A3A3] mt-1 max-w-xl">
            Let AI agents run SammaPix image &amp; PDF tools directly. Generate a key, drop it into your agent, and it can compress, convert, resize, crop and chain operations. Files are processed and discarded (zero-retention).
          </p>
        </div>
        <div className="flex-shrink-0 text-right">
          <div className="text-xs text-[#A3A3A3] uppercase tracking-wide">Credits</div>
          <div className="text-2xl font-semibold text-[#171717] dark:text-[#E5E5E5]">{balance ?? "—"}</div>
          <Link href="/dashboard/credits" className="text-xs text-[#6366F1] hover:underline">Buy more</Link>
        </div>
      </div>

      {/* Newly created key banner */}
      {newKey && (
        <div className="mb-6 rounded-lg border border-[#6366F1]/30 bg-[#6366F1]/5 p-4">
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] mb-1 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#6366F1]" strokeWidth={1.5} /> Your new key — copy it now
          </p>
          <p className="text-xs text-[#737373] mb-3">
            This is the only time it is shown. {freeGranted > 0 && <span className="text-[#16a34a] font-medium">+{freeGranted} free credits added. </span>}Store it somewhere safe.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs font-mono bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded px-3 py-2 overflow-x-auto">{newKey}</code>
            <button onClick={() => copy(newKey, "newkey")} className="flex-shrink-0 inline-flex items-center gap-1 text-xs bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded px-3 py-2 hover:bg-[#262626]">
              {copied === "newkey" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} Copy
            </button>
          </div>
        </div>
      )}

      {/* Keys list */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">Your API keys</h2>
          <button onClick={createKey} disabled={creating} className="inline-flex items-center gap-1.5 text-sm bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md px-3 py-1.5 hover:bg-[#262626] disabled:opacity-50">
            <Plus className="h-3.5 w-3.5" strokeWidth={2} /> {creating ? "Generating…" : "Generate key"}
          </button>
        </div>
        {keys.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[#E5E5E5] dark:border-[#2A2A2A] p-6 text-center text-sm text-[#A3A3A3]">
            <Key className="h-5 w-5 mx-auto mb-2 text-[#A3A3A3]" strokeWidth={1.5} />
            No keys yet. Generate one to get <span className="text-[#16a34a] font-medium">50 free credits + 25 free ops/day</span> and start calling the API.
          </div>
        ) : (
          <div className="space-y-2">
            {keys.map((k) => (
              <div key={k.id} className="flex items-center justify-between rounded-md border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] px-3 py-2.5">
                <div className="flex items-center gap-3 min-w-0">
                  <Key className="h-4 w-4 text-[#A3A3A3] flex-shrink-0" strokeWidth={1.5} />
                  <div className="min-w-0">
                    <code className="text-xs font-mono text-[#171717] dark:text-[#E5E5E5]">{k.id}…</code>
                    <span className="text-xs text-[#A3A3A3] ml-2">{k.label}</span>
                  </div>
                </div>
                <button onClick={() => revoke(k.id)} className="flex-shrink-0 text-[#A3A3A3] hover:text-red-500 transition-colors" title="Revoke">
                  <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Usage */}
      <section>
        <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-3">How to use it</h2>
        <div className="flex gap-1 mb-3">
          <button onClick={() => setTab("mcp")} className={`inline-flex items-center gap-1.5 text-sm rounded-md px-3 py-1.5 ${tab === "mcp" ? "bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717]" : "text-[#737373] hover:bg-[#F5F5F5] dark:hover:bg-[#1E1E1E]"}`}>
            <Bot className="h-3.5 w-3.5" strokeWidth={1.5} /> MCP (AI agents)
          </button>
          <button onClick={() => setTab("rest")} className={`inline-flex items-center gap-1.5 text-sm rounded-md px-3 py-1.5 ${tab === "rest" ? "bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717]" : "text-[#737373] hover:bg-[#F5F5F5] dark:hover:bg-[#1E1E1E]"}`}>
            <Terminal className="h-3.5 w-3.5" strokeWidth={1.5} /> REST API
          </button>
        </div>
        <div className="rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#0A0A0A] dark:bg-[#0A0A0A] p-4 relative">
          <button onClick={() => copy(tab === "mcp" ? mcpConfig : curlExample, tab)} className="absolute top-3 right-3 inline-flex items-center gap-1 text-xs text-[#A3A3A3] hover:text-white">
            {copied === tab ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
          <pre className="text-xs font-mono text-[#E5E5E5] overflow-x-auto whitespace-pre">{tab === "mcp" ? mcpConfig : curlExample}</pre>
        </div>
        <p className="text-xs text-[#A3A3A3] mt-3 flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-[#6366F1]" strokeWidth={1.5} />
          {tab === "mcp"
            ? "Add this to your agent's MCP config. The agent discovers 20+ tools including a pipeline that chains operations in one call."
            : "Every op costs credits (1 for most, 1/step for pipelines). A failed op is refunded automatically."}
        </p>
      </section>

      {/* Buy credits CTA */}
      <div className="mt-8 flex items-center justify-between rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] p-4">
        <div>
          <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">Need more credits?</p>
          <p className="text-xs text-[#737373]">Credits are shared across the website and the API/MCP.</p>
        </div>
        <Link href="/dashboard/credits" className="inline-flex items-center gap-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-md px-4 py-2 text-sm hover:bg-[#262626]">
          Buy credits <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
