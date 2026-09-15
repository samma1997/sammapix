"use client";

import React, { useState } from "react";
import { Copy, Check, Bot, Terminal } from "lucide-react";

export default function ConnectSnippets({ appUrl }: { appUrl: string }) {
  const [tab, setTab] = useState<"mcp" | "rest">("mcp");
  const [copied, setCopied] = useState(false);

  const mcp = `{
  "mcpServers": {
    "sammapix": {
      "url": "${appUrl}/api/mcp"
    }
  }
}`;

  const curl = `curl -X POST ${appUrl}/api/v1/pipeline \\
  -H "Authorization: Bearer sk_live_YOUR_KEY" \\
  -F "file=@photo.jpg" \\
  -F 'steps=[
        {"op":"resize","params":{"width":1200}},
        {"op":"convert","params":{"format":"webp","quality":80}}
      ]' \\
  -o optimized.webp`;

  const code = tab === "mcp" ? mcp : curl;

  return (
    <div className="rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] overflow-hidden">
      <div className="flex items-center gap-1 border-b border-[#E5E5E5] dark:border-[#2A2A2A] px-2 py-1.5 bg-[#FAFAFA] dark:bg-[#161616]">
        <button
          onClick={() => setTab("mcp")}
          className={`inline-flex items-center gap-1.5 text-xs rounded-md px-2.5 py-1.5 transition-colors ${tab === "mcp" ? "bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717]" : "text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5]"}`}
        >
          <Bot className="h-3.5 w-3.5" strokeWidth={1.5} /> MCP (AI agents)
        </button>
        <button
          onClick={() => setTab("rest")}
          className={`inline-flex items-center gap-1.5 text-xs rounded-md px-2.5 py-1.5 transition-colors ${tab === "rest" ? "bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717]" : "text-[#737373] hover:text-[#171717] dark:hover:text-[#E5E5E5]"}`}
        >
          <Terminal className="h-3.5 w-3.5" strokeWidth={1.5} /> REST API
        </button>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="ml-auto inline-flex items-center gap-1 text-xs text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] px-2 py-1"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="text-xs sm:text-[13px] font-mono text-[#E5E5E5] bg-[#0A0A0A] p-4 overflow-x-auto whitespace-pre leading-relaxed">{code}</pre>
      <p className="text-xs text-[#A3A3A3] px-4 py-2.5 bg-[#FAFAFA] dark:bg-[#161616] border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
        {tab === "mcp"
          ? "Add this to your MCP client (Claude, Cursor, …). On first use you'll sign in with Google and approve access — no API key to paste."
          : "Prefer a raw API? Grab a key from your dashboard and call any endpoint directly."}
      </p>
    </div>
  );
}
