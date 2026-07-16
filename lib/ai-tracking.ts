/**
 * AI visibility tracking — misura la presenza di SammaPix nei motori AI.
 *
 * Due segnali, entrambi edge-safe (solo string ops + Upstash REST):
 *  1. FETCH dei bot AI sulle nostre pagine. Distinguiamo i bot "retrieval"
 *     (arrivano quando un utente sta interrogando l'AI in tempo reale → proxy
 *     di una citazione imminente) dai "crawler" di training (indicizzano e basta).
 *  2. REFERRER umano da un motore AI (l'utente ha cliccato il link nella
 *     risposta di ChatGPT/Perplexity/Gemini) → questo e' traffico reale che
 *     puo' convertire. E' il segnale piu' prezioso.
 *
 * Storage Redis (TTL 180gg): un hash al giorno per gli aggregati per-fonte,
 * un sorted set al giorno per le pagine piu' pescate.
 */
import { exec } from "@/lib/redis";

const TTL = 180 * 24 * 60 * 60; // 180 giorni

// Bot che indicano un retrieval/citazione LIVE (utente sta usando l'AI ora)
const RETRIEVAL_BOTS: Record<string, string> = {
  "chatgpt-user": "ChatGPT (retrieval)",
  "oai-searchbot": "ChatGPT Search",
  "perplexity-user": "Perplexity (retrieval)",
  perplexitybot: "Perplexity (index)",
  "claude-web": "Claude (retrieval)",
  "claude-user": "Claude (retrieval)",
  "mistralai-user": "Mistral (retrieval)",
  "cohere-ai": "Cohere",
  youbot: "You.com",
  "duckassistbot": "DuckAssist",
};

// Crawler di training (indicizzano per il modello, meno indicativi di citazione)
const TRAINING_BOTS: Record<string, string> = {
  gptbot: "GPTBot (training)",
  "claudebot": "ClaudeBot (training)",
  "anthropic-ai": "Anthropic (training)",
  "google-extended": "Google-Extended (training)",
  "applebot-extended": "Applebot (training)",
  bytespider: "Bytespider (training)",
  "meta-externalagent": "Meta AI (training)",
  amazonbot: "Amazon (training)",
  ccbot: "CommonCrawl (training)",
};

// Referrer umani da un motore AI (hostname → engine)
const AI_REFERRERS: { match: string; engine: string }[] = [
  { match: "chatgpt.com", engine: "ChatGPT" },
  { match: "chat.openai.com", engine: "ChatGPT" },
  { match: "perplexity.ai", engine: "Perplexity" },
  { match: "gemini.google.com", engine: "Gemini" },
  { match: "bard.google.com", engine: "Gemini" },
  { match: "copilot.microsoft.com", engine: "Copilot" },
  { match: "claude.ai", engine: "Claude" },
  { match: "you.com", engine: "You.com" },
  { match: "poe.com", engine: "Poe" },
];

export type AiSignal =
  | { type: "bot"; kind: "retrieval" | "training"; label: string }
  | { type: "referral"; label: string };

/** Rileva se lo user-agent e' un bot AI (retrieval o training). */
export function detectAiBot(ua: string): AiSignal | null {
  const lower = ua.toLowerCase();
  for (const [needle, label] of Object.entries(RETRIEVAL_BOTS)) {
    if (lower.includes(needle)) return { type: "bot", kind: "retrieval", label };
  }
  for (const [needle, label] of Object.entries(TRAINING_BOTS)) {
    if (lower.includes(needle)) return { type: "bot", kind: "training", label };
  }
  return null;
}

/** Rileva se il referrer e' un motore AI (utente arrivato da una risposta AI). */
export function detectAiReferrer(referer: string | null): AiSignal | null {
  if (!referer) return null;
  const lower = referer.toLowerCase();
  for (const { match, engine } of AI_REFERRERS) {
    if (lower.includes(match)) return { type: "referral", label: engine };
  }
  return null;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Registra un segnale AI su Redis. Fire-and-forget: non lancia mai, non blocca.
 * Chiamare via event.waitUntil() dal middleware.
 */
export async function trackAiHit(signal: AiSignal, path: string): Promise<void> {
  try {
    const day = today();
    // campo per-fonte: "referral:ChatGPT" | "retrieval:Perplexity (index)" | "training:GPTBot (training)"
    const field =
      signal.type === "referral" ? `referral:${signal.label}` : `${signal.kind}:${signal.label}`;
    const hitsKey = `ai:hits:${day}`;
    // Le pagine piu' pescate: teniamo separati i referral umani (piu' preziosi) dai bot
    const pagesKey = signal.type === "referral" ? `ai:refpages:${day}` : `ai:botpages:${day}`;

    await exec(["HINCRBY", hitsKey, field, 1]);
    await exec(["ZINCRBY", pagesKey, 1, path]);
    // TTL (reimpostato ad ogni hit del giorno, ok: i dati vivono 180gg dall'ultimo hit)
    exec(["EXPIRE", hitsKey, TTL]).catch(() => {});
    exec(["EXPIRE", pagesKey, TTL]).catch(() => {});
  } catch {
    // mai rompere una richiesta per il tracking
  }
}
