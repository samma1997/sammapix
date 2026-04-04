"use client";

import { useState, useRef, useEffect, KeyboardEvent, FormEvent } from "react";
import {
  Bot,
  ArrowUp,
  BarChart3,
  FileText,
  MessageSquare,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

/* ─── Types ─── */

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

/* ─── Markdown-like renderer ─── */

function renderContent(raw: string) {
  // Split into blocks by double newline
  const blocks = raw.split(/\n{2,}/);

  return blocks.map((block, bi) => {
    // Code block
    if (block.startsWith("```")) {
      const lines = block.split("\n");
      const code = lines.slice(1, lines.length - (lines[lines.length - 1] === "```" ? 1 : 0)).join("\n");
      return (
        <pre
          key={bi}
          className="bg-[#F5F5F5] dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] p-3 text-xs font-mono overflow-x-auto my-1.5"
        >
          {code}
        </pre>
      );
    }

    // Unordered list
    if (/^[-*] /.test(block.trim())) {
      const items = block.split("\n").filter((l) => l.trim());
      return (
        <ul key={bi} className="list-disc list-inside space-y-0.5 my-1">
          {items.map((item, ii) => (
            <li key={ii}>{inlineFormat(item.replace(/^[-*]\s*/, ""))}</li>
          ))}
        </ul>
      );
    }

    // Ordered list
    if (/^\d+\.\s/.test(block.trim())) {
      const items = block.split("\n").filter((l) => l.trim());
      return (
        <ol key={bi} className="list-decimal list-inside space-y-0.5 my-1">
          {items.map((item, ii) => (
            <li key={ii}>{inlineFormat(item.replace(/^\d+\.\s*/, ""))}</li>
          ))}
        </ol>
      );
    }

    // Heading
    if (block.startsWith("### ")) {
      return <p key={bi} className="font-semibold text-sm mt-2 mb-0.5">{inlineFormat(block.slice(4))}</p>;
    }
    if (block.startsWith("## ")) {
      return <p key={bi} className="font-semibold text-sm mt-2 mb-0.5">{inlineFormat(block.slice(3))}</p>;
    }

    // Paragraph — handle inline newlines
    const lines = block.split("\n");
    return (
      <p key={bi} className="my-1">
        {lines.map((line, li) => (
          <span key={li}>
            {li > 0 && <br />}
            {inlineFormat(line)}
          </span>
        ))}
      </p>
    );
  });
}

function inlineFormat(text: string): string | (string | JSX.Element)[] {
  // Bold, italic, inline code
  const parts: (string | JSX.Element)[] = [];
  const regex = /(\*\*(.+?)\*\*|`(.+?)`|_(.+?)_)/g;
  let last = 0;
  let match;
  let idx = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[2]) {
      parts.push(<strong key={idx++} className="font-semibold">{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(
        <code key={idx++} className="bg-[#F5F5F5] dark:bg-[#252525] px-1 py-0.5 rounded text-xs font-mono">
          {match[3]}
        </code>
      );
    } else if (match[4]) {
      parts.push(<em key={idx++}>{match[4]}</em>);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : parts;
}

/* ─── Typing indicator ─── */

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 bg-[#A3A3A3] rounded-full animate-bounce"
          style={{ animationDelay: `${i * 150}ms`, animationDuration: "0.8s" }}
        />
      ))}
    </div>
  );
}

/* ─── Suggested prompts ─── */

const SUGGESTED_PROMPTS = [
  {
    text: "Come sta andando il sito questa settimana?",
    icon: BarChart3,
  },
  {
    text: "Suggeriscimi un articolo blog da scrivere",
    icon: FileText,
  },
  {
    text: "Trova domande su Reddit per SammaPix",
    icon: MessageSquare,
  },
  {
    text: "Quali keyword stanno salendo?",
    icon: TrendingUp,
  },
];

/* ─── Main page ─── */

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  }, [input]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const history = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/growth/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (!res.ok) {
        throw new Error(`Errore ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();

      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Errore nella risposta. ${err instanceof Error ? err.message : "Riprova tra poco."}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-3xl mx-auto">
      {/* ─── Header ─── */}
      <div className="flex-shrink-0 px-4 pt-6 pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[6px] bg-[#F5F5F5] dark:bg-[#252525] flex items-center justify-center">
            <Bot size={18} className="text-[#737373]" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-[#171717] dark:text-[#FAFAFA]">
              Assistente AI
            </h1>
            <p className="text-xs text-[#A3A3A3]">
              Chiedi qualsiasi cosa sul tuo progetto
            </p>
          </div>
          <span className="ml-auto text-[10px] font-medium text-[#A3A3A3] bg-[#F5F5F5] dark:bg-[#252525] px-2 py-0.5 rounded-[4px] border border-[#E5E5E5] dark:border-[#2A2A2A] uppercase tracking-wide">
            Powered by Gemini
          </span>
        </div>
      </div>

      {/* ─── Messages area ─── */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && !isLoading ? (
          /* ─── Suggested prompts ─── */
          <div className="flex items-center justify-center h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {SUGGESTED_PROMPTS.map((prompt) => {
                const Icon = prompt.icon;
                return (
                  <button
                    key={prompt.text}
                    onClick={() => sendMessage(prompt.text)}
                    className="flex items-start gap-3 p-3.5 rounded-[6px] border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#252525] hover:bg-[#FAFAFA] dark:hover:bg-[#2A2A2A] transition-colors text-left group"
                  >
                    <Icon
                      size={16}
                      className="text-[#A3A3A3] group-hover:text-[#737373] mt-0.5 flex-shrink-0"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm text-[#737373] dark:text-[#A3A3A3] group-hover:text-[#171717] dark:group-hover:text-[#FAFAFA] transition-colors">
                      {prompt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[85%] sm:max-w-[75%]">
                  {msg.role === "user" ? (
                    <div className="bg-[#171717] dark:bg-[#FAFAFA] text-white dark:text-[#171717] px-4 py-2.5 rounded-[12px] rounded-br-[4px] text-sm leading-relaxed">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] px-4 py-2.5 rounded-[12px] rounded-bl-[4px] text-sm leading-relaxed text-[#171717] dark:text-[#FAFAFA]">
                      {msg.content.startsWith("Errore") ? (
                        <div className="flex items-start gap-2 text-red-600 dark:text-red-400">
                          <AlertCircle size={14} className="mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                          <span>{msg.content}</span>
                        </div>
                      ) : (
                        renderContent(msg.content)
                      )}
                    </div>
                  )}
                  <p
                    className={`text-[10px] text-[#A3A3A3] mt-1 ${
                      msg.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[12px] rounded-bl-[4px]">
                  <TypingDots />
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ─── Input area ─── */}
      <div className="flex-shrink-0 border-t border-[#E5E5E5] dark:border-[#2A2A2A] px-4 py-3 bg-white dark:bg-[#191919]">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrivi un messaggio..."
            disabled={isLoading}
            rows={1}
            className="flex-1 resize-none bg-[#F5F5F5] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] px-3 py-2 text-sm text-[#171717] dark:text-[#FAFAFA] placeholder-[#A3A3A3] focus:outline-none focus:border-[#6366F1] disabled:opacity-50 transition-colors leading-relaxed"
            style={{ maxHeight: 120 }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-[#171717] dark:bg-[#FAFAFA] flex items-center justify-center disabled:opacity-30 hover:bg-[#262626] dark:hover:bg-[#E5E5E5] transition-colors"
          >
            <ArrowUp size={16} className="text-white dark:text-[#171717]" strokeWidth={2} />
          </button>
        </form>
        <p className="text-[10px] text-[#A3A3A3] mt-1.5 text-center">
          Enter per inviare · Shift+Enter per nuova riga
        </p>
      </div>
    </div>
  );
}
