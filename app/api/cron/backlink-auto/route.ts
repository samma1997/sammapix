import { NextRequest, NextResponse } from "next/server";
import { POSTS } from "@/lib/blog-posts";

export const runtime = "nodejs";
export const maxDuration = 60;

// ─── API CREDENTIALS ───────────────────────────────────────────────
const TELEGRAPH_TOKEN = "929120b3d57af394bcc55f14a34d795643bcf898c9745d5d9f23bd926710";
const PASTEBIN_KEY = "WlC8C9dloEXfEPGVxejCTMmHi_vZedWX";
const IA_ACCESS = "NOWdp2DEmtRyQ2nM";
const IA_SECRET = "kgAZ2opM6EDeMIUw";
const TUMBLR_CONSUMER_KEY = "wxn2JaaEV7N52dPD4efuXtPflJ5pJtcKW6HJ2muXyS4CqZMihO";
const TUMBLR_CONSUMER_SECRET = "nv6bOMwiDNmVbLO6g01IRZOaUlpUHJRrdK6H8kaCbWo3d0fwor";
const TUMBLR_TOKEN = "1uVCf2SjBGRkjObm6JHlJzl5ir3T844uvB8fcsDYVDDJG00dIq";
const TUMBLR_TOKEN_SECRET = "xr0wqSkbHiw9AYbpAPvKhu8VM9jgwC8kxDIgdf5IVoHI6qhLX9";
const TUMBLR_BLOG = "piantala97-blog";
const LJ_USERNAME = "lucasammarcoweb";
const LJ_PASSWORD = "g9Ggb,-meLZGV3L";

// ─── TOOL ROTATION ─────────────────────────────────────────────────
const TOOL_PAGES = [
  { name: "Compress Images", path: "/tools/compress", desc: "Reduce image file size by 90% without visible quality loss. Batch up to 20 images. Browser-based, no upload." },
  { name: "WebP Converter", path: "/tools/webp", desc: "Convert any image to WebP format. 25-35% smaller than JPEG at the same quality. 97% browser support." },
  { name: "HEIC Converter", path: "/tools/heic", desc: "Convert iPhone HEIC photos to JPG or WebP. Skip JPG entirely — go straight to WebP for best results." },
  { name: "EXIF Remover", path: "/tools/exif", desc: "Strip GPS coordinates and metadata from photos before sharing. Protect your privacy." },
  { name: "Background Removal", path: "/tools/remove-bg", desc: "AI-powered background removal. Runs in your browser via ONNX. No upload to any server." },
  { name: "AI Rename", path: "/tools/ai-rename", desc: "Generate SEO-friendly filenames from image content using AI. IMG_3847.jpg becomes descriptive-name.webp." },
  { name: "Passport Photo", path: "/tools/passport-photo", desc: "Create compliant passport photos for 140+ countries. AI removes background, crops to exact dimensions." },
  { name: "Duplicate Finder", path: "/tools/twinhunt", desc: "Find and delete duplicate photos. Your phone has 15-25% duplicates eating storage." },
  { name: "Batch Resize", path: "/tools/resizepack", desc: "Resize images to exact dimensions for any platform. Shopify, Instagram, LinkedIn — all sizes." },
  { name: "Film Filters", path: "/tools/filmlab", desc: "Add vintage film effects to digital photos. Grain, color shifts, light leaks — all browser-based." },
  { name: "Watermark", path: "/tools/stampit", desc: "Add watermark to multiple photos at once. Protect your work with text or logo overlays." },
  { name: "Crop Ratio", path: "/tools/croproatio", desc: "Crop images to perfect aspect ratios. 1:1, 16:9, 4:3, custom — with visual guides." },
];

function getDayContent(dayIndex: number) {
  const toolIndex = dayIndex % TOOL_PAGES.length;
  const tool = TOOL_PAGES[toolIndex];
  const blogIndex = (dayIndex * 7) % Math.max(POSTS.length, 1);
  const blog = POSTS[blogIndex] || POSTS[0];
  return { tool, blog };
}

// ─── TUMBLR OAUTH 1.0a SIGNING ─────────────────────────────────────
async function tumblrSign(method: string, url: string): Promise<string> {
  const crypto = await import("crypto");
  const ts = Math.floor(Date.now() / 1000);
  const nonce = crypto.randomBytes(16).toString("hex");
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: TUMBLR_CONSUMER_KEY,
    oauth_nonce: nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: String(ts),
    oauth_token: TUMBLR_TOKEN,
    oauth_version: "1.0",
  };
  const baseString =
    method +
    "&" +
    encodeURIComponent(url) +
    "&" +
    encodeURIComponent(
      Object.keys(oauthParams)
        .sort()
        .map((k) => k + "=" + encodeURIComponent(oauthParams[k]))
        .join("&")
    );
  const signingKey =
    encodeURIComponent(TUMBLR_CONSUMER_SECRET) +
    "&" +
    encodeURIComponent(TUMBLR_TOKEN_SECRET);
  const sig = crypto
    .createHmac("sha1", signingKey)
    .update(baseString)
    .digest("base64");

  return (
    "OAuth " +
    Object.keys(oauthParams)
      .map((k) => k + '="' + encodeURIComponent(oauthParams[k]) + '"')
      .join(", ") +
    ', oauth_signature="' +
    encodeURIComponent(sig) +
    '"'
  );
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const dateStr = today.toISOString().slice(0, 10);
  const { tool, blog } = getDayContent(dayOfYear);
  const results: Record<string, string> = {};

  // ═══════════════════════════════════════════════════════════════
  // 1. TELEGRAPH (DA 80) — 1 page/day
  // ═══════════════════════════════════════════════════════════════
  try {
    const telegraphContent = [
      { tag: "p", children: [tool.desc] },
      { tag: "h3", children: ["How to use"] },
      { tag: "ul", children: [
        { tag: "li", children: ["Open the tool in your browser"] },
        { tag: "li", children: ["Drop your images (batch up to 20)"] },
        { tag: "li", children: ["Adjust settings if needed"] },
        { tag: "li", children: ["Download results — done"] },
      ]},
      { tag: "p", children: ["Everything runs client-side. Your images never leave your device."] },
      { tag: "p", children: [
        { tag: "a", attrs: { href: `https://www.sammapix.com${tool.path}` }, children: [`Try ${tool.name} free →`] },
      ]},
      { tag: "p", children: [
        "Related: ",
        { tag: "a", attrs: { href: `https://www.sammapix.com/blog/${blog.slug}` }, children: [blog.title] },
      ]},
    ];

    const res = await fetch("https://api.telegra.ph/createPage", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        access_token: TELEGRAPH_TOKEN,
        title: `${tool.name} — Free Online Tool | ${blog.title.substring(0, 30)}`,
        author_name: "Luca Sammarco",
        author_url: "https://www.sammapix.com",
        content: JSON.stringify(telegraphContent),
      }),
    });
    const data = await res.json();
    results.telegraph = data.result?.url || "error";
  } catch (e) {
    results.telegraph = `error: ${e}`;
  }

  // ═══════════════════════════════════════════════════════════════
  // 2. PASTEBIN (DA 91) — 1 paste/day
  // ═══════════════════════════════════════════════════════════════
  try {
    const pasteContent = `${tool.name} — Free Browser-Based Tool

${tool.desc}

How to use:
1. Open https://www.sammapix.com${tool.path}
2. Drop your images (batch up to 20)
3. Adjust settings
4. Download — done

All 27 tools: https://www.sammapix.com
Open source: https://github.com/samma1997/sammapix

Related guide: ${blog.title}
https://www.sammapix.com/blog/${blog.slug}`;

    const res = await fetch("https://pastebin.com/api/api_post.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        api_dev_key: PASTEBIN_KEY,
        api_option: "paste",
        api_paste_private: "0",
        api_paste_name: `${tool.name} — Free Tool (${dateStr})`,
        api_paste_expire_date: "N",
        api_paste_code: pasteContent,
      }),
    });
    results.pastebin = await res.text();
  } catch (e) {
    results.pastebin = `error: ${e}`;
  }

  // ═══════════════════════════════════════════════════════════════
  // 3. INTERNET ARCHIVE (DA 96) — 1 upload/day
  // ═══════════════════════════════════════════════════════════════
  try {
    const iaSlug = `sammapix-${tool.name.toLowerCase().replace(/\s+/g, "-")}-${dateStr}`;
    const iaContent = `${tool.name} — SammaPix Free Tool

${tool.desc}

Website: https://www.sammapix.com${tool.path}
All tools: https://www.sammapix.com
GitHub: https://github.com/samma1997/sammapix
License: MIT — free forever, open source

Related: ${blog.title}
https://www.sammapix.com/blog/${blog.slug}`;

    const res = await fetch(`https://s3.us.archive.org/${iaSlug}/${iaSlug}.txt`, {
      method: "PUT",
      headers: {
        Authorization: `LOW ${IA_ACCESS}:${IA_SECRET}`,
        "x-amz-auto-make-bucket": "1",
        "x-archive-meta01-title": `${tool.name} - SammaPix Free Tool Guide`,
        "x-archive-meta02-description": `Free browser-based ${tool.name.toLowerCase()} tool. ${tool.desc} https://www.sammapix.com`,
        "x-archive-meta03-subject": "image tools;browser-based;open source;sammapix;free",
        "x-archive-meta04-creator": "Luca Sammarco",
        "x-archive-meta05-mediatype": "texts",
        "x-archive-meta06-licenseurl": "https://opensource.org/licenses/MIT",
      },
      body: iaContent,
    });
    results.internetArchive = res.ok
      ? `https://archive.org/details/${iaSlug}`
      : `error: ${res.status}`;
  } catch (e) {
    results.internetArchive = `error: ${e}`;
  }

  // ═══════════════════════════════════════════════════════════════
  // 4. TUMBLR (DA 89) — 1 post/day
  // ═══════════════════════════════════════════════════════════════
  try {
    const tumblrUrl = `https://api.tumblr.com/v2/blog/${TUMBLR_BLOG}/posts`;
    const authHeader = await tumblrSign("POST", tumblrUrl);

    const res = await fetch(tumblrUrl, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: [
          {
            type: "link",
            url: `https://www.sammapix.com${tool.path}`,
            title: `${tool.name} — Free Online Tool`,
            description: tool.desc,
          },
          {
            type: "text",
            text: `${tool.desc}\n\nFree: https://www.sammapix.com\nOpen source: https://github.com/samma1997/sammapix`,
          },
        ],
        tags: "image tools,free tools,web development,open source,sammapix",
      }),
    });
    const data = await res.json();
    results.tumblr = data.response?.id
      ? `https://${TUMBLR_BLOG}.tumblr.com/post/${data.response.id}`
      : `error: ${JSON.stringify(data).substring(0, 100)}`;
  } catch (e) {
    results.tumblr = `error: ${e}`;
  }

  // ═══════════════════════════════════════════════════════════════
  // 5. LIVEJOURNAL (DA 80) — 1 post/day via XML-RPC
  // ═══════════════════════════════════════════════════════════════
  try {
    const now = new Date();
    const ljBody = `<?xml version="1.0"?><methodCall><methodName>LJ.XMLRPC.postevent</methodName><params><param><value><struct>` +
      `<member><name>username</name><value><string>${LJ_USERNAME}</string></value></member>` +
      `<member><name>password</name><value><string>${LJ_PASSWORD}</string></value></member>` +
      `<member><name>event</name><value><string>&lt;h2&gt;${tool.name} — Free Online Tool&lt;/h2&gt;&lt;p&gt;${tool.desc}&lt;/p&gt;&lt;p&gt;Try it free: &lt;a href=&quot;https://www.sammapix.com${tool.path}&quot;&gt;sammapix.com${tool.path}&lt;/a&gt;&lt;/p&gt;&lt;p&gt;All 27 tools: &lt;a href=&quot;https://www.sammapix.com&quot;&gt;sammapix.com&lt;/a&gt;&lt;/p&gt;&lt;p&gt;Related: &lt;a href=&quot;https://www.sammapix.com/blog/${blog.slug}&quot;&gt;${blog.title.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}&lt;/a&gt;&lt;/p&gt;</string></value></member>` +
      `<member><name>subject</name><value><string>${tool.name} — Free Browser-Based Tool</string></value></member>` +
      `<member><name>lineendings</name><value><string>unix</string></value></member>` +
      `<member><name>year</name><value><int>${now.getFullYear()}</int></value></member>` +
      `<member><name>mon</name><value><int>${now.getMonth() + 1}</int></value></member>` +
      `<member><name>day</name><value><int>${now.getDate()}</int></value></member>` +
      `<member><name>hour</name><value><int>${now.getHours()}</int></value></member>` +
      `<member><name>min</name><value><int>${now.getMinutes()}</int></value></member>` +
      `<member><name>props</name><value><struct><member><name>taglist</name><value><string>image tools, free tools, open source, web development, sammapix</string></value></member></struct></value></member>` +
      `</struct></value></param></params></methodCall>`;

    const res = await fetch("https://www.livejournal.com/interface/xmlrpc", {
      method: "POST",
      headers: { "Content-Type": "text/xml" },
      body: ljBody,
    });
    const text = await res.text();
    if (text.includes("itemid")) {
      const id = text.match(/<int>(\d+)<\/int>/)?.[1];
      results.livejournal = `https://${LJ_USERNAME}.livejournal.com/${id}.html`;
    } else {
      const err = text.match(/<string>([^<]+)<\/string>/)?.[1];
      results.livejournal = `error: ${err || "unknown"}`;
    }
  } catch (e) {
    results.livejournal = `error: ${e}`;
  }

  // ═══════════════════════════════════════════════════════════════
  // 6. RENTRY.CO (DA 50) — 1 page/day, zero auth
  // ═══════════════════════════════════════════════════════════════
  try {
    const csrfRes = await fetch("https://rentry.co");
    const csrfHtml = await csrfRes.text();
    const csrfToken = csrfHtml.match(/csrfmiddlewaretoken" value="([^"]+)/)?.[1];
    const cookies = csrfRes.headers.get("set-cookie") || "";
    const csrfCookie = cookies.match(/csrftoken=([^;]+)/)?.[1] || "";

    if (csrfToken) {
      const rentryContent = `# ${tool.name} — Free Browser-Based Tool

${tool.desc}

## How to use
1. Open [${tool.name}](https://www.sammapix.com${tool.path})
2. Drop your images (batch up to 20)
3. Adjust settings
4. Download — done

Everything runs client-side. Images never leave your device.

## Links
- **Free tool**: https://www.sammapix.com${tool.path}
- **All 27 tools**: https://www.sammapix.com
- **Open source**: https://github.com/samma1997/sammapix
- **Related**: [${blog.title}](https://www.sammapix.com/blog/${blog.slug})`;

      const res = await fetch("https://rentry.co/api/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: "https://rentry.co",
          Cookie: `csrftoken=${csrfCookie}`,
        },
        body: new URLSearchParams({
          csrfmiddlewaretoken: csrfToken,
          text: rentryContent,
          edit_code: `sammapix-${dateStr}`,
        }),
      });
      const data = await res.json();
      results.rentry = data.url || `error: ${JSON.stringify(data)}`;
    } else {
      results.rentry = "error: no csrf token";
    }
  } catch (e) {
    results.rentry = `error: ${e}`;
  }

  return NextResponse.json({
    ok: true,
    date: dateStr,
    dayOfYear,
    tool: tool.name,
    blog: blog.title,
    results,
  });
}
