import { checkGrowthAuth } from "@/lib/growth/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  growthContentCalendar,
  growthOutreachTargets,
  growthDirectorySubmissions,
} from "@/lib/db/schema";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const authorized = await checkGrowthAuth();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { suggestion } = (await request.json()) as { suggestion: string };
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
    const prompt = `Sei l'assistente operativo di SammaPix.com (tool per ottimizzare immagini).

Data questa azione strategica, genera gli ITEM CONCRETI da creare nel sistema.

Azione: "${suggestion}"

Rispondi in JSON con questa struttura:
{
  "type": "content" | "outreach" | "directory" | "reddit",
  "items": [
    // Per type "content": { "title": "Titolo articolo", "keyword": "keyword target" }
    // Per type "outreach": { "siteName": "Nome sito", "articleTitle": "Titolo articolo da contattare", "contactName": "Nome contatto o Team" }
    // Per type "directory": { "directoryName": "Nome directory", "directoryUrl": "https://..." }
    // Per type "reddit": { "action": "scrape" }
  ]
}

REGOLE:
- Genera item SPECIFICI e realistici, non generici
- Per content: genera 2-3 titoli articolo con keyword SEO reali
- Per outreach: genera 3-5 siti reali del settore image tools/web dev con URL reali che esistono
- Per directory: genera solo directory software/tool reali (ProductHunt, G2, Capterra, ecc.)
- Per reddit: rispondi solo con action "scrape"
- Se l'azione non rientra in nessuna categoria, usa "content" e crea task generici
- Rispondi SOLO con il JSON, nessun altro testo`;

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
      created.push("Scraping Reddit avviato");
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
