import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Only allow fetching images from the trusted Cloudinary domain (SSRF prevention)
const ALLOWED_IMAGE_HOSTS = ["res.cloudinary.com"];

export async function POST(req: NextRequest) {
  const ADMIN_SECRET = process.env.ADMIN_SECRET;
  if (!ADMIN_SECRET) {
    return NextResponse.json({ error: "Service not configured" }, { status: 503 });
  }

  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_KEY) {
    return NextResponse.json({ error: "AI service not configured" }, { status: 503 });
  }

  const key = req.headers.get("x-admin-key") ?? "";
  if (key !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { imageUrl, locale = "en" } = (await req.json()) as { imageUrl: string; locale?: string };
  if (!imageUrl) {
    return NextResponse.json({ error: "Missing imageUrl" }, { status: 400 });
  }

  // SSRF prevention: validate that the URL belongs to an allowed host
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    return NextResponse.json({ error: "Invalid imageUrl" }, { status: 400 });
  }
  if (!ALLOWED_IMAGE_HOSTS.includes(parsedUrl.hostname)) {
    return NextResponse.json({ error: "Image host not allowed" }, { status: 400 });
  }

  const langMap: Record<string, string> = {
    it: "Italian", fr: "French", es: "Spanish", de: "German", pt: "Portuguese",
  };
  const language = langMap[locale] ?? "English";

  const genAI = new GoogleGenerativeAI(GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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
    return NextResponse.json({ error: "AI processing failed" }, { status: 500 });
  }
}
