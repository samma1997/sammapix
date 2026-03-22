import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  growthContentCalendar,
  growthOutreachTargets,
  growthDirectorySubmissions,
} from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const TODO_PATH = path.join(process.cwd(), "GROWTH_TODO.md");

export async function POST(request: NextRequest) {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { suggestion, allSuggestions } = (await request.json()) as {
    suggestion: string;
    allSuggestions?: string[];
  };
  if (!suggestion) {
    return NextResponse.json({ error: "No suggestion provided" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY not set" }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    const prompt = `Sei l'assistente operativo di SammaPix.com (tool gratuito per ottimizzare immagini: compress, convert, resize, HEIC, EXIF, AI rename. Modello freemium $7/mese. Competitor: TinyPNG, Squoosh, iLoveIMG, ShortPixel).

Data questa azione strategica, genera gli ITEM CONCRETI da creare nel sistema.

Azione: "${suggestion}"

Rispondi in JSON con questa struttura:
{
  "type": "content" | "outreach" | "directory" | "reddit" | "code_needed",
  "items": [
    // Per type "content": { "title": "Titolo articolo specifico per SammaPix", "keyword": "keyword SEO reale" }
    // Per type "outreach": { "siteName": "Nome sito REALE", "articleTitle": "Titolo articolo esistente", "contactName": "Nome o Team", "articleUrl": "URL reale" }
    // Per type "directory": { "directoryName": "Nome directory REALE", "directoryUrl": "URL reale" }
    // Per type "reddit": { "action": "scrape" }
    // Per type "code_needed": { "description": "Descrizione di cosa va fatto nel codice" }
  ]
}

REGOLE:
- Per content: genera titoli SPECIFICI per SammaPix con keyword reali (es. "Come comprimere immagini per WordPress senza perdere qualità", keyword: "comprimere immagini wordpress")
- Per outreach: usa siti REALI del settore web dev/design/tools (es. Smashing Magazine, CSS-Tricks, DEV.to, ecc.)
- type "code_needed" per azioni che richiedono modifiche al codice del sito (meta tag, nuove pagine, schema markup, ecc.)
- Rispondi SOLO con il JSON`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      return NextResponse.json({ error: "AI response parsing failed" }, { status: 500 });
    }

    const parsed = JSON.parse(match[0]) as {
      type: string;
      items: Record<string, string>[];
    };

    const created: string[] = [];

    if (parsed.type === "content") {
      for (const item of parsed.items) {
        await db.insert(growthContentCalendar).values({
          title: item.title || suggestion.slice(0, 100),
          targetKeyword: item.keyword || null,
          status: "idea",
          notes: `Auto-generato dalla strategia: "${suggestion.slice(0, 200)}"`,
        });
        created.push(`Contenuto: "${item.title}"`);
      }
    } else if (parsed.type === "outreach") {
      for (const item of parsed.items) {
        await db.insert(growthOutreachTargets).values({
          siteName: item.siteName || "Unknown",
          articleTitle: item.articleTitle || null,
          articleUrl: item.articleUrl || null,
          contactName: item.contactName || "Team",
          contactEmail: item.contactEmail || null,
          status: "to_send",
          notes: `Auto-generato dalla strategia`,
        });
        created.push(`Outreach: "${item.siteName}"`);
      }
    } else if (parsed.type === "directory") {
      for (const item of parsed.items) {
        await db.insert(growthDirectorySubmissions).values({
          directoryName: item.directoryName || "Unknown",
          directoryUrl: item.directoryUrl || "",
          status: "to_submit",
          notes: `Auto-generato dalla strategia`,
        });
        created.push(`Directory: "${item.directoryName}"`);
      }
    } else if (parsed.type === "reddit") {
      created.push("Vai alla tab Reddit per cercare nuovi post");
    } else if (parsed.type === "code_needed") {
      // Save to GROWTH_TODO.md for Claude Code to pick up
      const todoItems = parsed.items.map(i => `- [ ] ${i.description}`).join("\n");
      const date = new Date().toISOString().slice(0, 10);
      const todoEntry = `\n### ${date} — Dalla strategia\n${todoItems}\n> Azione originale: "${suggestion.slice(0, 200)}"\n`;

      try {
        let content = "";
        try { content = fs.readFileSync(TODO_PATH, "utf8"); } catch { /* file may not exist */ }
        const updated = content.replace(
          /## Azioni Pendenti\n[\s\S]*$/,
          `## Azioni Pendenti\n${todoEntry}\n`
        );
        fs.writeFileSync(TODO_PATH, updated || `# Growth TODO\n\n## Azioni Pendenti\n${todoEntry}\n`);
      } catch { /* non-critical */ }

      for (const item of parsed.items) {
        created.push(`TODO per Claude Code: "${item.description}"`);
      }
    }

    return NextResponse.json({
      success: true,
      type: parsed.type,
      created,
      count: created.length,
    });
  } catch (err) {
    console.error("[strategy/resolve]", err);
    return NextResponse.json({ error: "Resolve failed: " + String(err) }, { status: 500 });
  }
}
