import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const VOICE = "en-US-GuyNeural"; // Natural male voice

export async function POST(req: NextRequest) {
  try {
    const { text } = (await req.json()) as { text?: string };

    if (!text || text.length < 10) {
      return NextResponse.json({ error: "Text too short" }, { status: 400 });
    }

    // Limit to ~5000 chars to keep audio generation fast
    const trimmed = text.slice(0, 5000);

    const { EdgeTTS } = await import("@andresaya/edge-tts");
    const tts = new EdgeTTS();
    await tts.synthesize(trimmed, VOICE);
    const buffer = tts.toBuffer();
    const uint8 = new Uint8Array(buffer);

    return new NextResponse(uint8, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (err) {
    console.error("[blog/tts] Error:", err);
    return NextResponse.json({ error: "TTS generation failed" }, { status: 500 });
  }
}
