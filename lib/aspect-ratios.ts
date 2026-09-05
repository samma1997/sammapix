import { APP_URL } from "@/lib/constants";
import { getAllRatios, getRatio, type CropRatio } from "@/lib/crop-ratios";

// Reuse the exact same ratio list/slugs as the crop cluster so the two
// clusters stay in sync (crop = editing intent, aspect-ratio = definitional/
// "in pixels" intent). These pages must NOT cannibalise the crop pages: the
// titles, H1s and copy target "X:Y in pixels / what size is X:Y", not "crop".

export { getAllRatios, getRatio };
export type { CropRatio };

export function getAspectCanonical(slug: string): string {
  return `${APP_URL}/aspect-ratio/${slug}`;
}

// Real-world, named pixel sizes people actually export at each ratio.
// (Definitional intent: "what size is 9:16" → 1080×1920, etc.)
const NAMED_SIZES: Record<string, { use: string; px: string }[]> = {
  "16-9": [
    { use: "HD (720p)", px: "1280 × 720" },
    { use: "Full HD (1080p)", px: "1920 × 1080" },
    { use: "4K UHD", px: "3840 × 2160" },
    { use: "YouTube thumbnail", px: "1280 × 720" },
  ],
  "9-16": [
    { use: "Story / Reel / TikTok", px: "1080 × 1920" },
    { use: "HD portrait", px: "720 × 1280" },
    { use: "4K portrait", px: "2160 × 3840" },
  ],
  "1-1": [
    { use: "Instagram square", px: "1080 × 1080" },
    { use: "Profile picture", px: "320 × 320" },
    { use: "Album cover", px: "3000 × 3000" },
  ],
  "4-5": [
    { use: "Instagram portrait", px: "1080 × 1350" },
    { use: "Pinterest standard", px: "1000 × 1250" },
  ],
  "3-2": [
    { use: "4×6 print (300 DPI)", px: "1800 × 1200" },
    { use: "DSLR full frame", px: "6000 × 4000" },
  ],
  "2-3": [
    { use: "Pinterest pin", px: "1000 × 1500" },
    { use: "8×12 print (300 DPI)", px: "2400 × 3600" },
  ],
  "4-3": [
    { use: "iPad wallpaper", px: "2048 × 1536" },
    { use: "SD / classic display", px: "1024 × 768" },
  ],
  "3-4": [
    { use: "Product photo", px: "1200 × 1600" },
    { use: "Mobile portrait", px: "1080 × 1440" },
  ],
  "5-4": [
    { use: "8×10 print (300 DPI)", px: "3000 × 2400" },
    { use: "16×20 print", px: "6000 × 4800" },
  ],
  "21-9": [
    { use: "Ultrawide wallpaper", px: "3440 × 1440" },
    { use: "Cinematic banner", px: "2560 × 1080" },
  ],
  "2-1": [
    { use: "X (Twitter) card", px: "1200 × 600" },
    { use: "Web banner", px: "1600 × 800" },
  ],
  a4: [
    { use: "A4 print (300 DPI)", px: "2480 × 3508" },
    { use: "A4 draft (150 DPI)", px: "1240 × 1754" },
    { use: "A4 screen (72 DPI)", px: "595 × 842" },
  ],
};

export function namedSizes(slug: string): { use: string; px: string }[] {
  return NAMED_SIZES[slug] ?? [];
}

// Computed pixel table: anchor on the SHORT side with standard values so the
// numbers come out recognisable (16:9 → 1280×720, 1920×1080; 9:16 → 1080×1920).
export function pixelRows(
  aspectW: number,
  aspectH: number,
): { w: number; h: number; label: string }[] {
  const bases = [360, 480, 720, 1080, 1440, 2160];
  const landscape = aspectW >= aspectH;
  const seen = new Set<string>();
  const rows: { w: number; h: number; label: string }[] = [];
  for (const b of bases) {
    let w: number, h: number;
    if (landscape) {
      h = b;
      w = Math.round((b * aspectW) / aspectH);
    } else {
      w = b;
      h = Math.round((b * aspectH) / aspectW);
    }
    if (w > 8000 || h > 8000) continue;
    const key = `${w}x${h}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const long = Math.max(w, h);
    const label =
      long >= 3840 ? "4K" : long >= 2160 ? "QHD+" : long >= 1080 ? "Full HD" : long >= 720 ? "HD" : "SD";
    rows.push({ w, h, label });
  }
  return rows;
}

// The decimal value of the ratio, e.g. 16:9 → 1.78
export function ratioDecimal(aspectW: number, aspectH: number): string {
  return (aspectW / aspectH).toFixed(2).replace(/\.00$/, "");
}
