import { APP_URL } from "@/lib/constants";

export interface CropRatio {
  slug: string; // URL-safe, e.g. "16-9"
  ratioLabel: string; // "16:9"
  aspectW: number;
  aspectH: number;
  metaDescription: string;
  ogDescription: string;
  titleKeyword: string; // "Crop Image to 16:9"
  keywords: string[];
  useCase: string;
  tips: string[];
  faqs: { q: string; a: string }[];
  related: string[];
}

const ALL_RATIOS: CropRatio[] = [
  // ─── 16:9 ──────────────────────────────────────────────────────────────────
  {
    slug: "16-9",
    ratioLabel: "16:9",
    aspectW: 16,
    aspectH: 9,
    metaDescription:
      "Crop any image to a 16:9 aspect ratio online for free. Perfect for YouTube thumbnails, video frames, presentation slides, and widescreen wallpapers. No upload — works in your browser.",
    ogDescription:
      "Free online tool to crop images to 16:9. Ideal for YouTube thumbnails, video, slides, and widescreen displays.",
    titleKeyword: "Crop Image to 16:9",
    keywords: [
      "crop image to 16:9",
      "16:9 cropper",
      "crop 16:9",
      "16:9 aspect ratio crop",
      "youtube thumbnail crop",
      "widescreen crop online",
      "crop photo for video",
    ],
    useCase:
      "The widescreen standard — perfect for YouTube thumbnails and videos (1280×720, 1920×1080), presentation slides, desktop wallpapers, and any 16:9 display or player.",
    tips: [
      "16:9 is the native frame for YouTube, so crop your thumbnail to 16:9 before uploading to avoid black bars or auto-cropping.",
      "Keep the key subject inside the central safe zone — YouTube overlays the duration badge in the bottom-right corner of the thumbnail.",
      "For a 1080p slide or video frame, crop to 16:9 then export at exactly 1920×1080 px for pixel-perfect output.",
      "If your source is a tall phone photo, you will lose top and bottom — reframe so the horizon and subject sit in the wider middle band.",
    ],
    faqs: [
      {
        q: "What size is a 16:9 image?",
        a: "16:9 is an aspect ratio, not a fixed size. Common 16:9 resolutions are 1280×720 (HD), 1920×1080 (Full HD), and 3840×2160 (4K). Any width and height that divide to 1.778 is 16:9 — for example 1600×900.",
      },
      {
        q: "How do I crop a photo to 16:9 for YouTube?",
        a: "Open the SammaPix crop tool, choose the 16:9 ratio, drag the crop box over the part of the image you want to keep, and export. For a thumbnail, target 1280×720 px — YouTube's recommended thumbnail size.",
      },
      {
        q: "Will cropping to 16:9 reduce my image quality?",
        a: "No. Cropping only removes pixels outside the frame — the pixels you keep are untouched, so there is no quality loss. Quality only drops if you then upscale the cropped result beyond its original resolution.",
      },
      {
        q: "16:9 vs 4:3 — which should I use?",
        a: "Use 16:9 for modern video, YouTube, and widescreen displays. Use 4:3 for older screens, classic photography, and some presentation templates. 16:9 is wider and more cinematic; 4:3 is taller and shows more vertical content.",
      },
    ],
    related: ["9-16", "1-1", "4-3", "21-9"],
  },

  // ─── 9:16 ──────────────────────────────────────────────────────────────────
  {
    slug: "9-16",
    ratioLabel: "9:16",
    aspectW: 9,
    aspectH: 16,
    metaDescription:
      "Crop any image to a 9:16 vertical aspect ratio online for free. Perfect for Instagram Reels, Stories, TikTok, YouTube Shorts, and Snapchat. No upload — works in your browser.",
    ogDescription:
      "Free online tool to crop images to 9:16. Ideal for Reels, Stories, TikTok, Shorts, and full-screen vertical video.",
    titleKeyword: "Crop Image to 9:16",
    keywords: [
      "crop image to 9:16",
      "9:16 cropper",
      "crop 9:16",
      "vertical crop online",
      "crop for instagram story",
      "crop for tiktok",
      "crop for reels",
    ],
    useCase:
      "The full-screen vertical standard — perfect for Instagram Reels and Stories, TikTok, YouTube Shorts, and Snapchat (typically 1080×1920 px).",
    tips: [
      "9:16 fills the entire phone screen — crop to it so your Reel, Story, or TikTok has no letterboxing bars.",
      "Keep text and faces away from the top and bottom 250 px — platforms overlay usernames, captions, and action buttons there.",
      "Cropping a landscape photo to 9:16 is aggressive — you keep only a narrow vertical slice, so reframe around a single subject.",
      "Export at 1080×1920 px for the sharpest result across Instagram, TikTok, and Snapchat.",
    ],
    faqs: [
      {
        q: "What is a 9:16 image used for?",
        a: "9:16 is the vertical full-screen format for mobile: Instagram Reels and Stories, TikTok videos, YouTube Shorts, and Snapchat. The most common resolution is 1080×1920 px.",
      },
      {
        q: "How do I crop a photo to 9:16 for a Story?",
        a: "Open the SammaPix crop tool, select the 9:16 ratio, position the crop box over the subject, and export. Target 1080×1920 px so the image fills the screen without upscaling.",
      },
      {
        q: "Why does my landscape photo look bad cropped to 9:16?",
        a: "A wide landscape photo has to lose most of its width to become a tall 9:16 frame, leaving only a narrow vertical strip. For 9:16, start from a portrait-orientation photo or one with a clear central subject.",
      },
      {
        q: "9:16 vs 4:5 for Instagram — what's the difference?",
        a: "9:16 is for full-screen Stories and Reels. 4:5 is the tallest format allowed in the regular Instagram feed. Use 9:16 for vertical video and Stories, 4:5 for portrait feed posts.",
      },
    ],
    related: ["16-9", "4-5", "1-1", "2-3"],
  },

  // ─── 1:1 ───────────────────────────────────────────────────────────────────
  {
    slug: "1-1",
    ratioLabel: "1:1",
    aspectW: 1,
    aspectH: 1,
    metaDescription:
      "Crop any image to a 1:1 square aspect ratio online for free. Perfect for Instagram posts, profile pictures, avatars, and album covers. No upload — works in your browser.",
    ogDescription:
      "Free online tool to crop images to 1:1 square. Ideal for Instagram posts, profile photos, avatars, and album art.",
    titleKeyword: "Crop Image to 1:1 Square",
    keywords: [
      "crop image to 1:1",
      "square crop online",
      "crop to square",
      "1:1 cropper",
      "crop profile picture",
      "crop for instagram square",
      "square photo crop",
    ],
    useCase:
      "The classic square — perfect for Instagram feed posts, profile pictures and avatars, album covers, and product thumbnails that display as a square.",
    tips: [
      "Center your subject before cropping to 1:1 — square crops draw the eye straight to the middle of the frame.",
      "For profile pictures, leave a little headroom; most platforms display the square inside a circle and clip the corners.",
      "Common square export sizes: 1080×1080 px for Instagram, 320×320 px for avatars, 3000×3000 px for album covers.",
      "Cropping a wide or tall photo to 1:1 trims the long edge equally on both sides — reframe if your subject is off-center.",
    ],
    faqs: [
      {
        q: "How do I crop an image into a perfect square?",
        a: "Open the SammaPix crop tool, choose the 1:1 ratio, and the crop box locks to a square. Drag it over the part you want to keep and export — the result is a perfectly square image.",
      },
      {
        q: "What size should a 1:1 Instagram post be?",
        a: "Instagram displays square posts at 1080×1080 px. Crop to 1:1 and export at 1080×1080 for the sharpest result. Instagram still supports square even though 4:5 portrait now takes more feed space.",
      },
      {
        q: "Is 1:1 good for profile pictures?",
        a: "Yes — almost every platform uses a square (1:1) source for profile photos, then masks it into a circle. Crop to 1:1 with a bit of margin around the face so nothing important gets clipped by the circular mask.",
      },
      {
        q: "Does cropping to square lose quality?",
        a: "No. Cropping removes pixels outside the square but leaves the kept pixels untouched, so there is no quality loss. Only upscaling a small crop to a larger size would soften the image.",
      },
    ],
    related: ["4-5", "16-9", "9-16", "4-3"],
  },

  // ─── 4:5 ───────────────────────────────────────────────────────────────────
  {
    slug: "4-5",
    ratioLabel: "4:5",
    aspectW: 4,
    aspectH: 5,
    metaDescription:
      "Crop any image to a 4:5 portrait aspect ratio online for free. The tallest format for Instagram feed posts and Pinterest. No upload — works in your browser.",
    ogDescription:
      "Free online tool to crop images to 4:5. Ideal for Instagram portrait posts and Pinterest pins that maximize feed space.",
    titleKeyword: "Crop Image to 4:5",
    keywords: [
      "crop image to 4:5",
      "4:5 cropper",
      "crop 4:5",
      "instagram portrait crop",
      "crop for instagram feed",
      "4:5 aspect ratio crop",
      "portrait crop online",
    ],
    useCase:
      "The tallest format Instagram allows in the feed — perfect for portrait feed posts (1080×1350 px) that take up maximum screen space, plus Pinterest and portrait layouts.",
    tips: [
      "4:5 occupies more vertical feed space than square, so it stops the scroll better — use it for portrait Instagram posts.",
      "Export at 1080×1350 px, Instagram's maximum portrait resolution, for the crispest feed appearance.",
      "Keep the subject slightly above center; the bottom of a 4:5 post sits near the caption and engagement icons.",
      "When cropping a horizontal photo to 4:5 you lose a lot of width — start from a portrait or square source when possible.",
    ],
    faqs: [
      {
        q: "What is the 4:5 aspect ratio used for?",
        a: "4:5 is the tallest aspect ratio Instagram permits in the main feed, displayed at 1080×1350 px. It is the go-to format for portrait feed posts because it occupies the most vertical space without being cropped.",
      },
      {
        q: "How do I crop a photo to 4:5 for Instagram?",
        a: "Open the SammaPix crop tool, choose the 4:5 ratio, frame your subject, and export at 1080×1350 px. This gives you a full-height portrait post with no auto-cropping by Instagram.",
      },
      {
        q: "4:5 vs 1:1 for Instagram — which performs better?",
        a: "4:5 takes up about 25% more vertical feed space than 1:1 square, which generally improves visibility and engagement. Use 4:5 for portrait-friendly subjects and 1:1 when a square composition looks stronger.",
      },
      {
        q: "Will Instagram crop my 4:5 image?",
        a: "No. 4:5 is within Instagram's allowed range, so a correctly cropped 4:5 image displays in full. Anything taller than 4:5 (like 9:16) gets cropped in the feed, which is why 4:5 is the portrait limit.",
      },
    ],
    related: ["1-1", "9-16", "2-3", "16-9"],
  },

  // ─── 3:2 ───────────────────────────────────────────────────────────────────
  {
    slug: "3-2",
    ratioLabel: "3:2",
    aspectW: 3,
    aspectH: 2,
    metaDescription:
      "Crop any image to a 3:2 aspect ratio online for free. The classic DSLR and 35mm photography ratio, perfect for 4×6 prints. No upload — works in your browser.",
    ogDescription:
      "Free online tool to crop images to 3:2. Ideal for DSLR photography, 35mm framing, and standard 4×6 photo prints.",
    titleKeyword: "Crop Image to 3:2",
    keywords: [
      "crop image to 3:2",
      "3:2 cropper",
      "crop 3:2",
      "3:2 aspect ratio crop",
      "crop for 4x6 print",
      "dslr aspect ratio crop",
      "35mm crop online",
    ],
    useCase:
      "The native ratio of most DSLR and mirrorless cameras and 35mm film — perfect for photography and standard photo prints (4×6, 6×9 inches).",
    tips: [
      "3:2 matches a standard 4×6 inch print exactly, so crop to 3:2 before sending photos to a print lab to avoid auto-trimming.",
      "Most DSLR and mirrorless cameras already shoot 3:2 — use this crop to re-frame or straighten without changing the native ratio.",
      "For a sharp 4×6 print, keep the cropped image at 300 DPI: that means at least 1800×1200 px.",
      "3:2 is slightly less wide than 16:9 — a good middle ground when 16:9 feels too cinematic for a photo.",
    ],
    faqs: [
      {
        q: "What is the 3:2 aspect ratio?",
        a: "3:2 is the classic photography ratio used by 35mm film and most DSLR/mirrorless cameras. Its width is 1.5× its height — for example 1800×1200 px or 6000×4000 px straight out of camera.",
      },
      {
        q: "How do I crop a photo for a 4×6 print?",
        a: "A 4×6 print is exactly 3:2. Open the SammaPix crop tool, choose 3:2, frame your shot, and export at 300 DPI (at least 1800×1200 px). This prints edge-to-edge with no cropping by the lab.",
      },
      {
        q: "3:2 vs 4:3 — what's the difference?",
        a: "3:2 is wider and is the standard for DSLR cameras and prints. 4:3 is taller and is common on phones, older cameras, and Micro Four Thirds. 3:2 suits classic photography; 4:3 captures more vertical detail.",
      },
      {
        q: "Does cropping to 3:2 affect resolution?",
        a: "Cropping removes pixels outside the frame, so the kept area keeps its original sharpness. As long as the remaining crop is at least 1800×1200 px, it prints beautifully at 4×6 inches and 300 DPI.",
      },
    ],
    related: ["2-3", "4-3", "16-9", "5-4"],
  },

  // ─── 2:3 ───────────────────────────────────────────────────────────────────
  {
    slug: "2-3",
    ratioLabel: "2:3",
    aspectW: 2,
    aspectH: 3,
    metaDescription:
      "Crop any image to a 2:3 portrait aspect ratio online for free. Perfect for Pinterest pins, portrait prints, and posters. No upload — works in your browser.",
    ogDescription:
      "Free online tool to crop images to 2:3. Ideal for Pinterest pins, portrait photo prints, and poster layouts.",
    titleKeyword: "Crop Image to 2:3",
    keywords: [
      "crop image to 2:3",
      "2:3 cropper",
      "crop 2:3",
      "2:3 aspect ratio crop",
      "crop for pinterest",
      "portrait print crop",
      "poster crop online",
    ],
    useCase:
      "The vertical version of 3:2 — perfect for Pinterest pins (1000×1500 px), portrait photo prints, and posters where height carries the composition.",
    tips: [
      "Pinterest recommends a 2:3 pin (1000×1500 px) — taller than that gets truncated in the feed, shorter loses prominence.",
      "2:3 matches portrait 4×6 and 8×12 inch prints, so crop to it before ordering vertical prints.",
      "Place the focal point in the upper-middle of a 2:3 frame so it stays visible if the bottom is cropped in a feed.",
      "Coming from a landscape photo, you keep only a narrow vertical band at 2:3 — reframe around a single tall subject.",
    ],
    faqs: [
      {
        q: "What is the best aspect ratio for Pinterest?",
        a: "Pinterest recommends 2:3 (for example 1000×1500 px). It is the tallest pin that displays in full without truncation, giving your image maximum vertical presence in the feed.",
      },
      {
        q: "How do I crop an image to 2:3?",
        a: "Open the SammaPix crop tool, select the 2:3 ratio, frame the subject vertically, and export. For Pinterest, target 1000×1500 px; for a portrait print, keep 300 DPI.",
      },
      {
        q: "2:3 vs 3:2 — when do I use each?",
        a: "2:3 is portrait (taller than wide) — use it for Pinterest, vertical prints, and posters. 3:2 is landscape (wider than tall) — use it for standard horizontal photos and 4×6 prints. They are the same ratio rotated 90°.",
      },
      {
        q: "Does cropping to 2:3 reduce quality?",
        a: "No. Cropping only discards pixels outside the frame; the remaining image keeps its original quality. Just make sure the cropped area is large enough for your output — 1000×1500 px for Pinterest, more for prints.",
      },
    ],
    related: ["3-2", "4-5", "9-16", "4-3"],
  },

  // ─── 4:3 ───────────────────────────────────────────────────────────────────
  {
    slug: "4-3",
    ratioLabel: "4:3",
    aspectW: 4,
    aspectH: 3,
    metaDescription:
      "Crop any image to a 4:3 aspect ratio online for free. Perfect for classic photos, iPad screens, presentations, and older displays. No upload — works in your browser.",
    ogDescription:
      "Free online tool to crop images to 4:3. Ideal for classic photography, iPad wallpapers, slides, and standard displays.",
    titleKeyword: "Crop Image to 4:3",
    keywords: [
      "crop image to 4:3",
      "4:3 cropper",
      "crop 4:3",
      "4:3 aspect ratio crop",
      "crop for ipad",
      "standard photo crop",
      "presentation crop online",
    ],
    useCase:
      "The classic standard — perfect for traditional photography, iPad and tablet screens, older monitors and TVs, and many presentation templates.",
    tips: [
      "4:3 is the default capture ratio on many phones and Micro Four Thirds cameras, so it often needs only light re-framing.",
      "For iPad wallpapers, crop to 4:3 then export at the device resolution (e.g. 2048×1536 px for older iPads).",
      "4:3 shows more vertical content than 16:9 — useful for full-body portraits or tall buildings in a horizontal frame.",
      "Many slide templates (especially older PowerPoint/Keynote) use 4:3 — crop images to match so they fill the slide.",
    ],
    faqs: [
      {
        q: "What is the 4:3 aspect ratio used for?",
        a: "4:3 is the classic display and photo ratio: standard-definition TV, older monitors, iPads, Micro Four Thirds cameras, and many presentation templates. Its width is 1.333× its height, like 1024×768 or 2048×1536.",
      },
      {
        q: "How do I crop a photo to 4:3?",
        a: "Open the SammaPix crop tool, select the 4:3 ratio, position the crop box, and export. For a presentation or iPad, match the target resolution after cropping (e.g. 2048×1536 px).",
      },
      {
        q: "4:3 vs 16:9 — which is better?",
        a: "4:3 is taller and shows more vertical content; 16:9 is wider and more cinematic. Use 4:3 for classic photos, iPads, and older slide templates; use 16:9 for modern video, YouTube, and widescreen displays.",
      },
      {
        q: "Does cropping to 4:3 lose image data?",
        a: "Cropping removes the pixels outside the 4:3 frame, but everything inside stays at full quality. There is no compression or quality loss — only the framing changes.",
      },
    ],
    related: ["3-4", "16-9", "1-1", "3-2"],
  },

  // ─── 3:4 ───────────────────────────────────────────────────────────────────
  {
    slug: "3-4",
    ratioLabel: "3:4",
    aspectW: 3,
    aspectH: 4,
    metaDescription:
      "Crop any image to a 3:4 portrait aspect ratio online for free. Perfect for mobile portraits, product photos, and vertical displays. No upload — works in your browser.",
    ogDescription:
      "Free online tool to crop images to 3:4. Ideal for mobile portrait shots, e-commerce product photos, and vertical layouts.",
    titleKeyword: "Crop Image to 3:4",
    keywords: [
      "crop image to 3:4",
      "3:4 cropper",
      "crop 3:4",
      "3:4 aspect ratio crop",
      "portrait crop online",
      "product photo crop",
      "vertical crop 3:4",
    ],
    useCase:
      "The portrait version of 4:3 — perfect for mobile portrait photos, e-commerce product shots, and vertical thumbnails that show more height than a square.",
    tips: [
      "3:4 is a popular e-commerce product ratio — taller than square, it shows clothing and full products without wasted space.",
      "Many phone cameras shoot 3:4 in portrait mode, so this crop usually needs only minor re-framing.",
      "Keep the product or subject centered with even margins; 3:4 grids look cleanest when subjects are consistent.",
      "Export at a consistent size across a product set (e.g. 1200×1600 px) so your gallery grid stays uniform.",
    ],
    faqs: [
      {
        q: "What is the 3:4 aspect ratio used for?",
        a: "3:4 is a portrait ratio common in mobile photography and e-commerce. It is taller than a square, making it ideal for product photos, full-body portraits, and vertical thumbnails. A typical size is 1200×1600 px.",
      },
      {
        q: "How do I crop a photo to 3:4?",
        a: "Open the SammaPix crop tool, choose the 3:4 ratio, frame your subject vertically, and export. For product galleries, pick one export size (like 1200×1600 px) and apply it to every image for a uniform grid.",
      },
      {
        q: "3:4 vs 4:5 for product photos — which is better?",
        a: "Both are portrait. 3:4 is slightly taller and is common on marketplaces and mobile. 4:5 is the Instagram feed limit. Choose 3:4 for store listings and 4:5 when posting the same product to Instagram.",
      },
      {
        q: "Does cropping to 3:4 affect quality?",
        a: "No. Cropping discards only the pixels outside the 3:4 frame; the remaining image keeps full quality. Ensure the cropped area is large enough for your needs — around 1200×1600 px works for most product galleries.",
      },
    ],
    related: ["4-3", "4-5", "2-3", "9-16"],
  },

  // ─── 5:4 ───────────────────────────────────────────────────────────────────
  {
    slug: "5-4",
    ratioLabel: "5:4",
    aspectW: 5,
    aspectH: 4,
    metaDescription:
      "Crop any image to a 5:4 aspect ratio online for free. The classic ratio for 8×10 photo prints and some monitors. No upload — works in your browser.",
    ogDescription:
      "Free online tool to crop images to 5:4. Ideal for 8×10 inch photo prints and large-format framing.",
    titleKeyword: "Crop Image to 5:4",
    keywords: [
      "crop image to 5:4",
      "5:4 cropper",
      "crop 5:4",
      "5:4 aspect ratio crop",
      "crop for 8x10 print",
      "8x10 photo crop",
      "large format crop",
    ],
    useCase:
      "The classic print ratio — perfect for 8×10 inch photo prints (the most common framed portrait size) and large-format photography.",
    tips: [
      "An 8×10 inch print is exactly 5:4, so crop to 5:4 before ordering to avoid the lab trimming your photo unexpectedly.",
      "5:4 is only slightly wider than square — a flattering, balanced frame for portraits and framed wall art.",
      "For a sharp 8×10 print, keep at least 3000×2400 px (300 DPI) after cropping.",
      "When cropping from a 3:2 camera photo, you trim a little width on each side — center the subject first.",
    ],
    faqs: [
      {
        q: "What print size is 5:4?",
        a: "5:4 matches the popular 8×10 inch print — the standard size for framed portraits. Other 5:4 prints include 10×8 and 16×20 inches. Its width is 1.25× its height.",
      },
      {
        q: "How do I crop a photo for an 8×10 print?",
        a: "Open the SammaPix crop tool, select the 5:4 ratio, frame your subject, and export at 300 DPI (at least 3000×2400 px). This fills an 8×10 print edge to edge without the lab cropping it.",
      },
      {
        q: "5:4 vs 3:2 for prints — which should I pick?",
        a: "5:4 (8×10) is a tighter, more classic portrait frame; 3:2 (4×6) is wider and matches camera output directly. Use 5:4 for framed portraits and wall art, 3:2 for quick standard prints.",
      },
      {
        q: "Does cropping to 5:4 reduce quality?",
        a: "No. Cropping removes only the pixels outside the 5:4 frame. As long as the remaining crop is at least 3000×2400 px, it prints sharply at 8×10 inches and 300 DPI.",
      },
    ],
    related: ["3-2", "4-3", "1-1", "2-3"],
  },

  // ─── 21:9 ──────────────────────────────────────────────────────────────────
  {
    slug: "21-9",
    ratioLabel: "21:9",
    aspectW: 21,
    aspectH: 9,
    metaDescription:
      "Crop any image to a 21:9 ultrawide aspect ratio online for free. Perfect for cinematic photos, ultrawide wallpapers, and website banners. No upload — works in your browser.",
    ogDescription:
      "Free online tool to crop images to 21:9. Ideal for cinematic framing, ultrawide monitor wallpapers, and web banners.",
    titleKeyword: "Crop Image to 21:9",
    keywords: [
      "crop image to 21:9",
      "21:9 cropper",
      "crop 21:9",
      "ultrawide crop online",
      "cinematic crop",
      "crop for ultrawide wallpaper",
      "21:9 aspect ratio crop",
    ],
    useCase:
      "The cinematic ultrawide format — perfect for film-style photos, ultrawide monitor wallpapers (3440×1440 px), and wide website hero banners.",
    tips: [
      "21:9 gives a dramatic, cinematic letterbox look — ideal for landscapes, panoramas, and hero banners.",
      "For an ultrawide monitor wallpaper, crop to 21:9 then export at 3440×1440 px (the common ultrawide resolution).",
      "You lose a lot of top and bottom at 21:9 — keep the horizon and subject within the narrow central band.",
      "Web hero banners often use 21:9 or wider — crop to it so the banner spans full width without vertical bulk.",
    ],
    faqs: [
      {
        q: "What is the 21:9 aspect ratio?",
        a: "21:9 is the ultrawide, cinematic ratio used by widescreen films and ultrawide monitors. Its width is about 2.33× its height. Common resolutions are 2560×1080 and 3440×1440 px.",
      },
      {
        q: "How do I crop a photo to 21:9?",
        a: "Open the SammaPix crop tool, choose the 21:9 ratio, and frame the scene within the wide band. Export at your target size — 3440×1440 px for ultrawide wallpaper, or a wide width for a web banner.",
      },
      {
        q: "What is 21:9 good for?",
        a: "21:9 suits cinematic landscape photos, panoramas, ultrawide monitor wallpapers, and full-width website hero banners. Its dramatic width creates a film-like, immersive feel.",
      },
      {
        q: "Will I lose a lot of the image cropping to 21:9?",
        a: "Yes — 21:9 is very wide, so cropping a standard photo to it removes significant top and bottom. Start from a wide landscape or panorama, and keep your subject and horizon centered vertically.",
      },
    ],
    related: ["16-9", "2-1", "4-3", "1-1"],
  },

  // ─── 2:1 ───────────────────────────────────────────────────────────────────
  {
    slug: "2-1",
    ratioLabel: "2:1",
    aspectW: 2,
    aspectH: 1,
    metaDescription:
      "Crop any image to a 2:1 aspect ratio online for free. Perfect for X (Twitter) cards, web banners, and panoramic headers. No upload — works in your browser.",
    ogDescription:
      "Free online tool to crop images to 2:1. Ideal for X/Twitter link cards, website banners, and panoramic headers.",
    titleKeyword: "Crop Image to 2:1",
    keywords: [
      "crop image to 2:1",
      "2:1 cropper",
      "crop 2:1",
      "2:1 aspect ratio crop",
      "twitter card image crop",
      "web banner crop online",
      "panoramic crop",
    ],
    useCase:
      "The wide banner format — perfect for X (Twitter) summary card images, website header banners, and panoramic compositions (commonly 1200×600 px).",
    tips: [
      "X (Twitter) large summary cards use a 2:1 image — crop to it so your link preview shows without awkward auto-cropping.",
      "For a Twitter card, export at 1200×600 px; for a wide site banner, scale the width to your layout while keeping 2:1.",
      "Keep logos and key text in the central two-thirds of a 2:1 banner so they survive responsive cropping on mobile.",
      "2:1 is wider than 16:9 but not as extreme as 21:9 — a clean choice for headers that need to feel wide but balanced.",
    ],
    faqs: [
      {
        q: "What image ratio does a Twitter/X card use?",
        a: "X large summary cards display a 2:1 image, commonly 1200×600 px. Cropping your image to 2:1 ensures the link preview shows the full intended frame instead of an auto-cropped slice.",
      },
      {
        q: "How do I crop an image to 2:1?",
        a: "Open the SammaPix crop tool, select the 2:1 ratio, frame the subject within the wide box, and export. For an X card, target 1200×600 px; for a banner, keep the 2:1 ratio at your layout width.",
      },
      {
        q: "2:1 vs 16:9 for banners — which is better?",
        a: "2:1 is slightly wider and shorter than 16:9, giving a cleaner banner look and matching X cards exactly. 16:9 is better for video and embedded players. For social link previews and headers, 2:1 is the safer choice.",
      },
      {
        q: "Does cropping to 2:1 reduce quality?",
        a: "No. Cropping only removes the pixels outside the 2:1 frame; the kept area stays at full quality. Make sure the crop is at least 1200×600 px for a crisp social card or banner.",
      },
    ],
    related: ["21-9", "16-9", "4-3", "1-1"],
  },

  // ─── A4 ────────────────────────────────────────────────────────────────────
  {
    slug: "a4",
    ratioLabel: "A4",
    aspectW: 210,
    aspectH: 297,
    metaDescription:
      "Crop any image to the A4 document aspect ratio online for free. Perfect for printable flyers, documents, and posters at 210×297 mm. No upload — works in your browser.",
    ogDescription:
      "Free online tool to crop images to A4 (210×297 mm). Ideal for printable flyers, documents, posters, and PDFs.",
    titleKeyword: "Crop Image to A4",
    keywords: [
      "crop image to a4",
      "a4 cropper",
      "crop to a4 size",
      "a4 aspect ratio crop",
      "crop image for printing a4",
      "a4 document crop online",
      "crop photo for flyer",
    ],
    useCase:
      "The A4 paper ratio (210×297 mm, ≈1:1.414 portrait) — perfect for printable flyers, single-page documents, posters, and images destined for an A4 PDF.",
    tips: [
      "A4 portrait is 210×297 mm — crop to this ratio so your flyer or poster fills the page without white margins or trimming.",
      "For crisp print, export the cropped A4 image at 300 DPI: that means about 2480×3508 px.",
      "Leave a small safe margin inside the A4 frame for important text — home and office printers often clip the very edges.",
      "For an A4 landscape layout, rotate your design and crop to 297×210 instead (the same ratio, sideways).",
    ],
    faqs: [
      {
        q: "What is the A4 aspect ratio?",
        a: "A4 paper is 210×297 mm, an aspect ratio of about 1:1.414 (the square root of 2) in portrait orientation. At 300 DPI for print, A4 is roughly 2480×3508 px.",
      },
      {
        q: "How do I crop an image to A4 size?",
        a: "Open the SammaPix crop tool, choose the A4 ratio, frame your content, and export at 300 DPI (about 2480×3508 px) for printing. This fills an A4 page edge to edge with no trimming.",
      },
      {
        q: "What resolution do I need for an A4 print?",
        a: "For sharp A4 printing, aim for 300 DPI, which is approximately 2480×3508 px in portrait. For on-screen or draft use, 150 DPI (1240×1754 px) is acceptable.",
      },
      {
        q: "Does cropping to A4 lose quality?",
        a: "Cropping itself only removes pixels outside the A4 frame and keeps the rest at full quality. Quality issues only arise if the remaining crop is smaller than the print needs — keep it near 2480×3508 px for 300 DPI A4.",
      },
    ],
    related: ["2-3", "3-4", "5-4", "4-3"],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getAllRatios(): CropRatio[] {
  return ALL_RATIOS;
}

export function getRatio(slug: string): CropRatio | undefined {
  return ALL_RATIOS.find((r) => r.slug === slug);
}

export function getRatioCanonical(slug: string): string {
  return `${APP_URL}/crop/${slug}`;
}
