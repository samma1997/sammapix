import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SammaPix Blog";

type BlogSlug =
  | "ai-image-renaming-seo"
  | "tinypng-alternative"
  | "remove-exif-data-photos"
  | "compress-images-for-website"
  | "jpg-to-webp-converter"
  | "reduce-image-size-without-losing-quality"
  | "best-image-format-for-web"
  | "image-seo-guide"
  | "compress-png-without-losing-quality";

const posts: Record<BlogSlug, { title: string; tag: string; tagColor: string; tagBg: string }> = {
  "ai-image-renaming-seo": {
    title: "How to Rename Images for SEO Automatically with AI",
    tag: "AI",
    tagColor: "#EDE9FE",
    tagBg: "#7C3AED",
  },
  "tinypng-alternative": {
    title: "TinyPNG vs SammaPix: Which Free Image Compressor is Better in 2026?",
    tag: "Comparison",
    tagColor: "#E0F2FE",
    tagBg: "#0369A1",
  },
  "remove-exif-data-photos": {
    title: "How to Remove EXIF Data from Photos Online (Free)",
    tag: "Privacy",
    tagColor: "#D1FAE5",
    tagBg: "#065F46",
  },
  "compress-images-for-website": {
    title: "How to Compress Images for Website Without Losing Quality",
    tag: "Performance",
    tagColor: "#FEF3C7",
    tagBg: "#B45309",
  },
  "jpg-to-webp-converter": {
    title: "JPG to WebP Converter: Why and How to Convert Your Images",
    tag: "WebP",
    tagColor: "#E0F2FE",
    tagBg: "#0369A1",
  },
  "reduce-image-size-without-losing-quality": {
    title: "How to Reduce Image Size Without Losing Quality",
    tag: "Performance",
    tagColor: "#FEF3C7",
    tagBg: "#B45309",
  },
  "best-image-format-for-web": {
    title: "Best Image Format for Web in 2026: JPEG, PNG, or WebP?",
    tag: "Guide",
    tagColor: "#F3F4F6",
    tagBg: "#374151",
  },
  "image-seo-guide": {
    title: "Image SEO Guide: How to Optimize Images for Google Search",
    tag: "SEO",
    tagColor: "#EDE9FE",
    tagBg: "#7C3AED",
  },
  "compress-png-without-losing-quality": {
    title: "How to Compress PNG Without Losing Quality",
    tag: "Performance",
    tagColor: "#FEF3C7",
    tagBg: "#B45309",
  },
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug as BlogSlug] ?? {
    title: "SammaPix Blog",
    tag: "Article",
    tagColor: "#F3F4F6",
    tagBg: "#374151",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px 72px",
          fontFamily: "system-ui, sans-serif",
          background: "linear-gradient(135deg, #0F0F23 0%, #1A1A3E 50%, #0D1117 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(124,58,237,0) 70%)",
            display: "flex",
          }}
        />
        {/* Glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-40px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)",
            display: "flex",
          }}
        />

        {/* Logo + domain top-left */}
        <div
          style={{
            position: "absolute",
            top: "48px",
            left: "72px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "900",
              color: "white",
            }}
          >
            S
          </div>
          <span style={{ fontSize: "22px", fontWeight: "700", color: "#E2E8F0", letterSpacing: "-0.3px" }}>
            sammapix.com
          </span>
        </div>

        {/* Category badge */}
        <div style={{ display: "flex", marginBottom: "22px" }}>
          <div
            style={{
              backgroundColor: post.tagBg,
              color: post.tagColor,
              fontSize: "18px",
              fontWeight: "600",
              padding: "6px 20px",
              borderRadius: "999px",
              display: "flex",
            }}
          >
            {post.tag}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: post.title.length > 55 ? "46px" : "54px",
            fontWeight: "800",
            color: "#F8FAFC",
            lineHeight: "1.18",
            letterSpacing: "-1px",
            maxWidth: "960px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {post.title}
        </div>

        {/* Bottom gradient line */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "4px",
            background: "linear-gradient(90deg, #7C3AED, #4F46E5, #06B6D4)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
