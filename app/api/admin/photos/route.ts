import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import { incrWithTTL } from "@/lib/redis";

function initCloudinary(): void {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  if (!cloudName) throw new Error("CLOUDINARY_CLOUD_NAME not configured");
  if (!apiKey) throw new Error("CLOUDINARY_API_KEY not configured");
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: process.env.CLOUDINARY_API_SECRET ?? "",
  });
}

function checkAuth(req: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) throw new Error("ADMIN_SECRET not configured");
  const key = req.headers.get("x-admin-key") ?? "";
  return key === adminSecret;
}

// GET- fetch all portfolio photos with context
export async function GET(req: NextRequest) {
  // Rate limit: 20 requests per 5 minutes per IP
  const ip = (req as unknown as { ip?: string }).ip ?? req.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ?? "unknown";
  const rlCount = await incrWithTTL(`rl:admin-photos:${ip}`, 300);
  if (rlCount !== null && rlCount > 20) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    initCloudinary();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await cloudinary.search
      .expression("folder:sammapix/portfolio/*")
      .with_field("context")
      .sort_by("public_id", "asc")
      .max_results(500)
      .execute();

    const photos = (result.resources ?? []).map(
      (r: {
        public_id: string;
        secure_url: string;
        width: number;
        height: number;
        context?: { custom?: Record<string, string> };
      }) => {
        const ctx = r.context?.custom ?? {};
        return {
          publicId: r.public_id,
          url: r.secure_url,
          thumbUrl: cloudinary.url(r.public_id, {
            fetch_format: "auto",
            quality: "auto",
            width: 400,
            crop: "limit",
            secure: true,
          }),
          width: r.width,
          height: r.height,
          context: {
            caption: ctx.caption ?? "",
            description: ctx.description ?? "",
            alt: ctx.alt ?? "",
            location: ctx.location ?? "",
          },
        };
      }
    );

    return NextResponse.json({ photos });
  } catch (error) {
    console.error("[admin/photos GET]", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST- update context metadata
const UpdateSchema = z.object({
  publicId: z.string().min(1).max(500),
  caption: z.string().max(500),
  description: z.string().max(2000),
  alt: z.string().max(500),
  location: z.string().max(500),
});

export async function POST(req: NextRequest) {
  // Rate limit: 20 requests per 5 minutes per IP (shared window with GET)
  const ip = (req as unknown as { ip?: string }).ip ?? req.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ?? "unknown";
  const rlCount = await incrWithTTL(`rl:admin-photos:${ip}`, 300);
  if (rlCount !== null && rlCount > 20) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    if (!checkAuth(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    initCloudinary();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  const { publicId, caption, description, alt, location } = parsed.data;

  function esc(v: string) {
    return v.replace(/\|/g, "\\|").replace(/=/g, "\\=");
  }

  const contextString = [
    `caption=${esc(caption)}`,
    `description=${esc(description)}`,
    `alt=${esc(alt)}`,
    `location=${esc(location)}`,
  ].join("|");

  // Scope publicId to expected folder to prevent cross-folder writes
  if (!publicId.startsWith("sammapix/")) {
    return NextResponse.json({ error: "Invalid publicId" }, { status: 400 });
  }

  try {
    await cloudinary.uploader.explicit(publicId, {
      type: "upload",
      resource_type: "image",
      context: contextString,
    });

    // Invalidate all portfolio pages so changes appear immediately
    revalidatePath("/portfolio", "layout");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/photos POST]", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
