import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { v2 as cloudinary } from "cloudinary";
import { ADMIN_EMAILS } from "@/lib/constants";
import { z } from "zod";

// ── Cloudinary config ────────────────────────────────────────────────────────

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? "do9hrcwn1",
  api_key: process.env.CLOUDINARY_API_KEY ?? "REDACTED_CLOUDINARY",
  api_secret: process.env.CLOUDINARY_API_SECRET ?? "",
});

// ── Types ────────────────────────────────────────────────────────────────────

export interface PortfolioPhoto {
  publicId: string;
  url: string;
  thumbUrl: string;
  context: {
    caption: string;
    description: string;
    alt: string;
    location: string;
  };
}

// ── Auth guard ───────────────────────────────────────────────────────────────

async function requireAdmin(): Promise<{ email: string } | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  if (!ADMIN_EMAILS.includes(session.user.email)) return null;
  return { email: session.user.email };
}

// ── GET — fetch all portfolio photos ────────────────────────────────────────

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Search all images inside sammapix/portfolio (recursive with **)
    const result = await cloudinary.search
      .expression("folder:sammapix/portfolio/*")
      .with_field("context")
      .sort_by("public_id", "asc")
      .max_results(500)
      .execute();

    const photos: PortfolioPhoto[] = (result.resources ?? []).map(
      (resource: {
        public_id: string;
        secure_url: string;
        context?: { custom?: Record<string, string> };
      }) => {
        const ctx = resource.context?.custom ?? {};
        return {
          publicId: resource.public_id,
          url: cloudinary.url(resource.public_id, {
            fetch_format: "auto",
            quality: "auto",
            width: 1200,
            crop: "limit",
            secure: true,
          }),
          thumbUrl: cloudinary.url(resource.public_id, {
            fetch_format: "auto",
            quality: "auto",
            width: 400,
            height: 300,
            crop: "fill",
            gravity: "auto",
            secure: true,
          }),
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
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[admin/portfolio GET]", message);
    return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 });
  }
}

// ── POST — update context metadata for one image ─────────────────────────────

const UpdateSchema = z.object({
  publicId: z.string().min(1).max(500),
  caption: z.string().max(500),
  description: z.string().max(2000),
  alt: z.string().max(500),
  location: z.string().max(500),
});

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
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
    return NextResponse.json(
      { error: "Validation error", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { publicId, caption, description, alt, location } = parsed.data;

  // Encode values — pipe separator used by Cloudinary context, escape pipes and = in values
  function escapeCtx(v: string) {
    return v.replace(/\|/g, "\\|").replace(/=/g, "\\=");
  }

  const contextString = [
    `caption=${escapeCtx(caption)}`,
    `description=${escapeCtx(description)}`,
    `alt=${escapeCtx(alt)}`,
    `location=${escapeCtx(location)}`,
  ].join("|");

  try {
    // Replace all existing context with new values
    await cloudinary.uploader.explicit(publicId, {
      type: "upload",
      resource_type: "image",
      context: contextString,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[admin/portfolio POST]", message);
    return NextResponse.json({ error: "Failed to update metadata" }, { status: 500 });
  }
}
