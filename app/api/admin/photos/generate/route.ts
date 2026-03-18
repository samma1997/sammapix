import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "REDACTED";
const GEMINI_KEY = process.env.GEMINI_API_KEY ?? "REDACTED_GEMINI_KEY";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req: NextRequest) {
  const key = req.headers.get("x-admin-key") ?? "";
  if (key !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { imageUrl, locale = "en" } = (await req.json()) as { imageUrl: string; locale?: string };
  if (!imageUrl) {
    return NextResponse.json({ error: "Missing imageUrl" }, { status: 400 });
  }

  const langMap: Record<string, string> = {
    it: "Italian", fr: "French", es: "Spanish", de: "German", pt: "Portuguese",
  };
  const language = langMap[locale] ?? "English";

  try {
    const imageResp = await fetch(imageUrl);
    if (!imageResp.ok) throw new Error("Failed to fetch image");
    const buffer = await imageResp.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    const prompt = `You are a travel photography curator writing for a high-end portfolio website.
Write ALL text in ${language}.

Analyze this travel photo and provide:

1. CAPTION: Short poetic caption in ${language} (max 8 words, no period). Format: "Place- poetic description". E.g. "Sigiriya- the lion rock at dawn"

2. DESCRIPTION: Vivid, evocative 60-80 word description in ${language} for SEO. Present tense. Specific details about light, atmosphere, cultural/geographical context. No first-person.

3. ALT: Precise, keyword-rich alt text in ${language} for accessibility and SEO (max 125 chars). Describe what is visually in the image. Include place name if identifiable.

4. LOCATION: Specific location name (place, city/region, country). Keep location names in their original/English form.

Respond ONLY with valid JSON:
{"caption":"...","description":"...","alt":"...","location":"..."}`;

    const result = await model.generateContent([
      prompt,
      { inlineData: { mimeType: "image/jpeg", data: base64 } },
    ]);

    const text = result.response.text().trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in Gemini response");

    const data = JSON.parse(jsonMatch[0]);

    return NextResponse.json(data);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[admin/photos/generate]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
