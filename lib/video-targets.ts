import { APP_URL } from "@/lib/constants";

export interface VideoTarget {
  slug: string; // URL segment, e.g. "whatsapp"
  platform: string; // "WhatsApp"
  /** Hard size limit in MB to pre-set the tool's target-size mode. null = open in quality mode. */
  targetMB: number | null;
  limitLabel: string; // "16 MB"
  titleKeyword: string; // "Compress Video for WhatsApp"
  metaDescription: string;
  ogDescription: string;
  useCase: string; // hero secondary line
  keywords: string[];
  faqs: { q: string; a: string }[];
  related: string[];
}

const TARGETS: VideoTarget[] = [
  {
    slug: "whatsapp",
    platform: "WhatsApp",
    targetMB: 16,
    limitLabel: "16 MB",
    titleKeyword: "Compress Video for WhatsApp",
    metaDescription:
      "Compress a video to send on WhatsApp without losing quality. Free, no upload, no signup. SammaPix shrinks your MP4 under WhatsApp's 16 MB limit right in your browser.",
    ogDescription:
      "Shrink any video under WhatsApp's 16 MB limit in your browser. No upload, no signup, before/after compare.",
    useCase:
      "WhatsApp rejects videos larger than 16 MB and compresses the rest into a blurry mess. Compress it yourself first to stay sharp and under the limit.",
    keywords: [
      "compress video for whatsapp",
      "whatsapp video size limit",
      "reduce video size for whatsapp",
      "compress video whatsapp online",
      "whatsapp 16mb video",
      "make video smaller for whatsapp",
    ],
    faqs: [
      {
        q: "What is the maximum video size for WhatsApp?",
        a: "WhatsApp limits videos to 16 MB for most accounts, which is roughly 90 seconds to 3 minutes depending on quality. Anything larger is rejected or heavily re-compressed by WhatsApp itself, which is what causes blurry sends. Compressing to 1080p with a small or balanced preset usually lands well under 16 MB.",
      },
      {
        q: "How do I compress a video for WhatsApp without losing quality?",
        a: "Use the target-size mode set to 16 MB and keep the 1080p downscale on. SammaPix re-encodes the video in your browser with WebCodecs and shows the estimated size live, so you can confirm it fits before downloading. Audio is kept untouched.",
      },
      {
        q: "Is my video uploaded anywhere?",
        a: "No. The entire compression happens locally in your browser. Your video is never sent to a server, which is faster and private. Nothing is stored.",
      },
      {
        q: "Why does WhatsApp make my videos blurry?",
        a: "When a video is over the limit, WhatsApp applies its own aggressive compression with no quality control. By compressing it yourself first, you decide the trade-off and keep it sharp.",
      },
    ],
    related: ["email", "discord", "instagram"],
  },
  {
    slug: "email",
    platform: "email",
    targetMB: 25,
    limitLabel: "25 MB",
    titleKeyword: "Compress Video for Email",
    metaDescription:
      "Compress a video to attach in an email. Free, no upload, no signup. SammaPix shrinks your MP4 under the 25 MB Gmail and Outlook limit right in your browser.",
    ogDescription:
      "Shrink any video under the 25 MB email attachment limit, in your browser. No upload, no signup.",
    useCase:
      "Gmail, Outlook and most email providers cap attachments at 25 MB. Compress your clip to fit instead of fighting with cloud links.",
    keywords: [
      "compress video for email",
      "email video size limit",
      "reduce video size for email",
      "compress video 25mb",
      "attach video to email",
      "gmail video attachment size",
    ],
    faqs: [
      {
        q: "What is the maximum video size for email?",
        a: "Gmail and Outlook both cap attachments at 25 MB. Larger files are usually offered as a cloud link instead. Compressing your video to 1080p under 25 MB lets you attach it directly so the recipient does not need to open a separate link.",
      },
      {
        q: "How do I make a video small enough to email?",
        a: "Set the target size to 25 MB and keep the 1080p downscale on. SammaPix re-encodes locally and shows the estimated size live so you can confirm it fits before downloading.",
      },
      {
        q: "Is my video uploaded to a server?",
        a: "No. Compression runs entirely in your browser with WebCodecs. The file never leaves your device.",
      },
      {
        q: "What if the video is still too big at 25 MB?",
        a: "Very long clips may not fit at a watchable quality. In that case, trim the video shorter rather than crushing the bitrate, which keeps the part you care about sharp.",
      },
    ],
    related: ["whatsapp", "discord", "telegram"],
  },
  {
    slug: "discord",
    platform: "Discord",
    targetMB: 25,
    limitLabel: "25 MB",
    titleKeyword: "Compress Video for Discord",
    metaDescription:
      "Compress a video to upload on Discord without Nitro. Free, no upload, no signup. SammaPix shrinks your MP4 under Discord's 25 MB limit right in your browser.",
    ogDescription:
      "Shrink any video under Discord's 25 MB upload limit, in your browser. No upload, no signup, no Nitro.",
    useCase:
      "Discord limits uploads to 25 MB without Nitro. Compress your clip to share it in any server or DM without paying for a subscription.",
    keywords: [
      "compress video for discord",
      "discord video size limit",
      "discord 25mb limit",
      "reduce video size for discord",
      "compress video discord no nitro",
      "upload video to discord",
    ],
    faqs: [
      {
        q: "What is the upload size limit on Discord?",
        a: "Discord allows uploads up to 25 MB on the free tier (larger with Nitro). Compressing your video to 1080p under 25 MB lets you post it in any channel or DM without Nitro.",
      },
      {
        q: "How do I compress a video for Discord?",
        a: "Set the target size to 25 MB and keep the 1080p downscale on. SammaPix re-encodes the video locally with WebCodecs and shows the estimated size live so you know it will upload.",
      },
      {
        q: "Does the video get uploaded to SammaPix?",
        a: "No. The whole process runs in your browser. Your clip is never sent anywhere.",
      },
      {
        q: "Will the quality drop a lot?",
        a: "You control it. The before and after player lets you compare both versions at the same frame so you can keep it sharp while still fitting under 25 MB.",
      },
    ],
    related: ["whatsapp", "email", "instagram"],
  },
  {
    slug: "instagram",
    platform: "Instagram",
    targetMB: null,
    limitLabel: "smaller, sharper",
    titleKeyword: "Compress Video for Instagram",
    metaDescription:
      "Compress a video for Instagram reels, stories and feed. Free, no upload, no signup. SammaPix re-encodes your MP4 to upload faster and look sharp, right in your browser.",
    ogDescription:
      "Compress video for Instagram in your browser. Faster uploads, sharp quality, no upload, no signup.",
    useCase:
      "Big files upload slowly and Instagram re-compresses them anyway. Compress to a clean 1080p MP4 first so it uploads fast and keeps its quality.",
    keywords: [
      "compress video for instagram",
      "instagram video size",
      "reduce video size for instagram",
      "compress reels video",
      "instagram video quality",
      "make video smaller for instagram",
    ],
    faqs: [
      {
        q: "What format does Instagram want for video?",
        a: "Instagram prefers MP4 with the H.264 codec at 1080p. SammaPix outputs exactly that by default, so your reels, stories and feed posts upload cleanly and avoid extra re-compression by Instagram.",
      },
      {
        q: "How do I compress a video for Instagram?",
        a: "Drop your clip, keep the 1080p downscale on for 4K footage, and pick the balanced quality preset. SammaPix re-encodes it locally and shows a before and after compare before you download.",
      },
      {
        q: "Is my video uploaded to a server?",
        a: "No. Everything runs in your browser with WebCodecs. Your video never leaves your device.",
      },
      {
        q: "Why compress before uploading to Instagram?",
        a: "Smaller files upload faster and, by giving Instagram a clean 1080p MP4, you reduce how much its own compression degrades the final result.",
      },
    ],
    related: ["whatsapp", "discord", "telegram"],
  },
  {
    slug: "telegram",
    platform: "Telegram",
    targetMB: null,
    limitLabel: "smaller, faster",
    titleKeyword: "Compress Video for Telegram",
    metaDescription:
      "Compress a video for Telegram to send and download faster. Free, no upload, no signup. SammaPix shrinks your MP4 right in your browser, nothing uploaded.",
    ogDescription:
      "Compress video for Telegram in your browser. Smaller files, faster sends, no upload, no signup.",
    useCase:
      "Telegram allows large files, but big videos are slow to send and download. Compress first so your clip moves fast without a visible quality drop.",
    keywords: [
      "compress video for telegram",
      "telegram video size",
      "reduce video size for telegram",
      "compress video telegram online",
      "make video smaller for telegram",
      "telegram large video",
    ],
    faqs: [
      {
        q: "What is the file size limit on Telegram?",
        a: "Telegram allows files up to 2 GB (4 GB with Premium), so the issue is rarely the limit. The real problem is that huge videos are slow to send and download. Compressing to 1080p makes the file a fraction of the size with no visible quality loss.",
      },
      {
        q: "How do I compress a video for Telegram?",
        a: "Drop your clip, keep the 1080p downscale on, and pick a balanced quality preset. SammaPix re-encodes it locally with WebCodecs and shows the estimated size live.",
      },
      {
        q: "Does SammaPix upload my Telegram video?",
        a: "No. The compression runs entirely in your browser. Nothing is uploaded or stored.",
      },
      {
        q: "Will it stay sharp?",
        a: "Yes. The before and after player lets you compare both versions at the same frame, so you keep the quality you want while making the file far smaller.",
      },
    ],
    related: ["whatsapp", "email", "instagram"],
  },
];

export function getAllVideoTargets(): VideoTarget[] {
  return TARGETS;
}

export function getVideoTarget(slug: string): VideoTarget | undefined {
  return TARGETS.find((t) => t.slug === slug);
}

export function getVideoTargetCanonical(slug: string): string {
  return `${APP_URL}/compress-video/${slug}`;
}
