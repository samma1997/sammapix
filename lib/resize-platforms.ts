import { APP_URL } from "@/lib/constants";

export interface ResizeSize {
  type: string;
  width: number;
  height: number;
  note?: string;
}

export interface ResizeFaq {
  q: string;
  a: string;
}

export interface ResizePlatform {
  slug: string;
  name: string;
  displayName: string;
  /** Short sentence used in the meta description */
  metaDescription: string;
  /** Used in page title */
  titleKeyword: string;
  keywords: string[];
  sizes: ResizeSize[];
  /** Three "How to resize" steps */
  steps: [string, string, string];
  faqs: ResizeFaq[];
  /** Slugs of the other platforms shown in the "Related platforms" section */
  related: string[];
  /** Open Graph description */
  ogDescription: string;
  /** Optional override of the generated `Resize Images for X Free Online` SEO title */
  seoTitle?: string;
}

function aspectRatio(w: number, h: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const d = gcd(w, h);
  return `${w / d}:${h / d}`;
}

export function getAspectRatio(w: number, h: number): string {
  return aspectRatio(w, h);
}

const ALL_PLATFORMS: ResizePlatform[] = [
  // ─── INSTAGRAM ────────────────────────────────────────────────────────────
  {
    slug: "instagram",
    name: "Instagram",
    displayName: "Instagram",
    titleKeyword: "Instagram",
    metaDescription:
      "Resize images for Instagram- square post 1080×1080, portrait 1080×1350, landscape 1080×566, Story 1080×1920. Free online, no upload.",
    ogDescription:
      "Free online tool to resize photos for every Instagram format. Square, portrait, landscape, Story and Reels- exact pixel dimensions in seconds.",
    keywords: [
      "resize image for instagram",
      "instagram image size",
      "instagram photo dimensions",
      "instagram post size 2026",
      "1080x1080 instagram",
      "instagram story size",
      "resize for instagram free",
      "instagram portrait size",
    ],
    sizes: [
      { type: "Square Post", width: 1080, height: 1080, note: "Recommended for feed posts" },
      { type: "Portrait Post", width: 1080, height: 1350, note: "Most space in feed" },
      { type: "Landscape Post", width: 1080, height: 566, note: "16:9 crop equivalent" },
      { type: "Story / Reels", width: 1080, height: 1920, note: "Full-screen vertical" },
    ],
    steps: [
      "Open ResizePack, drop your image and select the Instagram preset that matches your post type (Square, Portrait, Landscape or Story).",
      "Review the preview- use CropRatio to crop to the exact ratio first if your photo has the wrong proportions.",
      "Click Resize, then Download. Your image is ready to upload directly to Instagram without any quality loss from re-compression.",
    ],
    faqs: [
      {
        q: "What is the best Instagram image size in 2026?",
        a: "For feed posts, 1080×1350 px (4:5 portrait ratio) gives you the most vertical space in users' feeds. For Stories and Reels use 1080×1920 px (9:16). Square posts are 1080×1080 px.",
      },
      {
        q: "Will Instagram compress my photo if I resize it first?",
        a: "Instagram always re-encodes uploads, but providing an image at exactly the right dimensions (1080 px wide) prevents Instagram from upscaling or downscaling before its own compression- resulting in the sharpest possible output.",
      },
      {
        q: "What file format should I use for Instagram?",
        a: "JPEG for photos (Instagram re-encodes everything anyway) and PNG for graphics with transparency. Keep file size under 30 MB. Use our Compress tool to reduce file size without visible quality loss.",
      },
      {
        q: "Can I use the same image for a post and a Story?",
        a: "You can, but you should resize separately. A 1080×1080 square will have black bars on a 9:16 Story canvas. Use ResizePack to export both sizes at once.",
      },
    ],
    related: ["facebook", "tiktok", "pinterest"],
  },

  // ─── FACEBOOK ─────────────────────────────────────────────────────────────
  {
    slug: "facebook",
    name: "Facebook",
    displayName: "Facebook",
    titleKeyword: "Facebook",
    metaDescription:
      "Resize images for Facebook- post 1200×630, cover 820×312, profile 170×170, Story 1080×1920. Free online, no upload.",
    ogDescription:
      "Resize photos for every Facebook format instantly. Post, cover photo, profile picture, Story- exact pixel dimensions, free and private.",
    keywords: [
      "resize image for facebook",
      "facebook image size",
      "facebook cover photo dimensions",
      "facebook post size 2026",
      "1200x630 facebook",
      "facebook profile picture size",
      "resize for facebook free",
      "facebook story dimensions",
    ],
    sizes: [
      { type: "Post / Shared Image", width: 1200, height: 630, note: "Optimal link preview" },
      { type: "Cover Photo", width: 820, height: 312, note: "Desktop display size" },
      { type: "Profile Picture", width: 170, height: 170, note: "Displays at 32×32 in feed" },
      { type: "Story", width: 1080, height: 1920, note: "Full-screen vertical" },
    ],
    steps: [
      "Drop your image into ResizePack and choose the Facebook preset - Post, Cover, Profile or Story.",
      "If your cover or post image has important content near the edges, use CropRatio first to control exactly what gets included at 820×312 or 1200×630.",
      "Download the resized file and upload directly to Facebook. No extra steps needed- the image will display at full sharpness on both desktop and mobile.",
    ],
    faqs: [
      {
        q: "What size should a Facebook cover photo be?",
        a: "Facebook displays cover photos at 820×312 px on desktop and 640×360 px on mobile. Upload at 820×312 (or larger at the same ratio) to get a crisp result on both. Keep key content away from the bottom 50 px, which can be obscured on mobile.",
      },
      {
        q: "What is the best size for a Facebook post image?",
        a: "1200×630 px (roughly 1.91:1 ratio) is the recommended size for Facebook post images and Open Graph previews. This size also works perfectly for blog article thumbnails shared on Facebook.",
      },
      {
        q: "What resolution should a Facebook profile picture be?",
        a: "Upload at least 170×170 px. Facebook scales it down for display, but a higher-resolution source means sharper output when displayed at larger sizes- for example, when someone clicks your profile.",
      },
      {
        q: "Does Facebook compress uploaded images?",
        a: "Yes, Facebook re-encodes all images on upload. Providing an image at the exact recommended dimensions minimizes quality loss from Facebook's own compression pipeline.",
      },
    ],
    related: ["instagram", "linkedin", "twitter"],
  },

  // ─── TWITTER / X ──────────────────────────────────────────────────────────
  {
    slug: "twitter",
    name: "Twitter / X",
    displayName: "Twitter / X",
    titleKeyword: "Twitter and X",
    metaDescription:
      "Resize images for Twitter / X- post 1600×900, header 1500×500, profile 400×400. Free online, no upload required.",
    ogDescription:
      "Resize photos for Twitter and X in seconds. Post image, header banner, profile picture- all correct dimensions, processed locally in your browser.",
    keywords: [
      "resize image for twitter",
      "twitter image size 2026",
      "x post image dimensions",
      "twitter header size",
      "1600x900 twitter",
      "twitter profile picture size",
      "resize for twitter free",
      "x image dimensions",
    ],
    sizes: [
      { type: "Post Image", width: 1600, height: 900, note: "16:9 optimal ratio" },
      { type: "Header / Banner", width: 1500, height: 500, note: "Profile banner" },
      { type: "Profile Picture", width: 400, height: 400, note: "Displayed as circle" },
    ],
    steps: [
      "Drop your image into ResizePack and select the Twitter / X preset - Post, Header or Profile.",
      "For the header banner, use CropRatio at 3:1 first to frame the composition, then resize to 1500×500 for a pixel-perfect result.",
      "Download and upload to X. Your image will appear sharp on both desktop and mobile without any black bars or unwanted cropping.",
    ],
    faqs: [
      {
        q: "What is the best image size for a Twitter / X post?",
        a: "1600×900 px (16:9 ratio) is optimal for Twitter post images. It fills the maximum preview area in the feed without letterboxing. Twitter also supports 1:1 and 4:5 ratios for portrait posts.",
      },
      {
        q: "What size is the Twitter / X header banner?",
        a: "The recommended Twitter header size is 1500×500 px (3:1 ratio). Note that the top and bottom edges can be cropped on some devices, so keep key content centered vertically.",
      },
      {
        q: "What size should a Twitter profile picture be?",
        a: "Upload at least 400×400 px. Twitter displays profile pictures as circles, so make sure the subject is centered. Higher resolution uploads remain sharp when displayed at larger sizes.",
      },
      {
        q: "Does X / Twitter compress images?",
        a: "Yes. Twitter converts uploaded images to JPEG and WebP. Uploading at the correct dimensions and exporting with minimal JPEG compression (quality 90+) gives the best result after Twitter's encoding.",
      },
    ],
    related: ["instagram", "linkedin", "facebook"],
  },

  // ─── LINKEDIN ─────────────────────────────────────────────────────────────
  {
    slug: "linkedin",
    name: "LinkedIn",
    displayName: "LinkedIn",
    titleKeyword: "LinkedIn",
    metaDescription:
      "Resize images for LinkedIn- post 1200×627, cover 1584×396, profile 400×400. Free online, no upload required.",
    ogDescription:
      "Resize photos for LinkedIn posts, cover banners, and profile pictures. Correct dimensions for a professional appearance, processed locally in your browser.",
    keywords: [
      "resize image for linkedin",
      "linkedin image size 2026",
      "linkedin post dimensions",
      "linkedin cover photo size",
      "1200x627 linkedin",
      "linkedin profile picture size",
      "resize for linkedin free",
      "linkedin banner dimensions",
    ],
    sizes: [
      { type: "Post / Article Image", width: 1200, height: 627, note: "Recommended for articles" },
      { type: "Cover / Banner", width: 1584, height: 396, note: "Personal profile banner" },
      { type: "Profile Picture", width: 400, height: 400, note: "Recommended minimum" },
    ],
    steps: [
      "Open ResizePack, drop your image and choose the LinkedIn preset - Post, Cover or Profile.",
      "For the cover banner (1584×396, a 4:1 ratio), crop horizontally with CropRatio first so your subject is well-framed in the wide banner area.",
      "Download the resized image and upload to LinkedIn. Professional appearances matter on this network- exact dimensions prevent any blurriness from LinkedIn's scaling.",
    ],
    faqs: [
      {
        q: "What is the correct LinkedIn post image size?",
        a: "1200×627 px is the recommended LinkedIn post image size. It displays cleanly in the feed on both desktop and mobile. For documents and carousels, LinkedIn uses its own rendering so dimensions vary.",
      },
      {
        q: "What size is the LinkedIn cover photo?",
        a: "The recommended LinkedIn cover photo size is 1584×396 px (4:1 ratio). The bottom of the cover is partially hidden by your profile photo bubble, so keep important content in the upper half.",
      },
      {
        q: "Does image quality matter on LinkedIn?",
        a: "Yes - LinkedIn is a professional network where first impressions count. Blurry or oddly-cropped images signal a lack of attention to detail. Resizing to exact dimensions prevents LinkedIn from applying its own stretching or letterboxing.",
      },
      {
        q: "What format should I use for LinkedIn images?",
        a: "JPEG or PNG are both accepted. Keep file size under 5 MB for profile and cover images, and under 100 MB for post images. Use our Compress tool to reduce file size while retaining visual quality.",
      },
    ],
    related: ["twitter", "facebook", "youtube-thumbnail"],
  },

  // ─── YOUTUBE THUMBNAIL ────────────────────────────────────────────────────
  {
    slug: "youtube-thumbnail",
    name: "YouTube",
    displayName: "YouTube",
    titleKeyword: "YouTube Thumbnail",
    metaDescription:
      "Resize images for YouTube- thumbnail 1280×720, channel banner 2560×1440, profile 800×800. Free online, no upload required.",
    ogDescription:
      "Resize YouTube thumbnails, channel banners, and profile pictures to the exact dimensions YouTube requires. Free, fast, and processed locally in your browser.",
    keywords: [
      "youtube thumbnail size",
      "resize youtube thumbnail",
      "youtube thumbnail dimensions 2026",
      "1280x720 youtube",
      "youtube channel banner size",
      "youtube profile picture size",
      "resize for youtube free",
      "youtube thumbnail template",
    ],
    sizes: [
      { type: "Video Thumbnail", width: 1280, height: 720, note: "16:9- max 2 MB" },
      { type: "Channel Banner", width: 2560, height: 1440, note: "Safe area: 1546×423 px" },
      { type: "Profile Picture", width: 800, height: 800, note: "Minimum 98×98 px" },
    ],
    steps: [
      "Drop your thumbnail into ResizePack and choose the YouTube Thumbnail preset (1280×720 px, 16:9).",
      "Thumbnails need strong contrast and readable text at small sizes- crop tightly around the subject using CropRatio at 16:9, then resize.",
      "Keep the exported JPEG under 2 MB (YouTube's limit). Use the Compress tool to reduce file size if needed, then upload directly in YouTube Studio.",
    ],
    faqs: [
      {
        q: "What is the ideal YouTube thumbnail size?",
        a: "1280×720 px in 16:9 ratio is the ideal YouTube thumbnail size. It is displayed at multiple sizes- from tiny grid previews to full-width suggestions. Maximum file size is 2 MB. YouTube accepts JPG, PNG, GIF, and WebP.",
      },
      {
        q: "What size is the YouTube channel banner?",
        a: "Upload your channel banner at 2560×1440 px. The safe area visible on all devices is the central 1546×423 px zone. Keep your logo and key text within that area to avoid cropping on TV, desktop, and mobile.",
      },
      {
        q: "Can I use a vertical image as a YouTube thumbnail?",
        a: "No. YouTube thumbnails must be 16:9 (horizontal). If your source image is portrait, use CropRatio to crop it to 16:9 first, then resize to 1280×720 px.",
      },
      {
        q: "How do I make a YouTube thumbnail stand out?",
        a: "Use high contrast between the subject and background, a bold font for text overlays, and keep the most important element in the center-left third- that's where the eye naturally goes in thumbnail grids.",
      },
    ],
    related: ["instagram", "twitter", "linkedin"],
  },

  // ─── PINTEREST ────────────────────────────────────────────────────────────
  {
    slug: "pinterest",
    name: "Pinterest",
    displayName: "Pinterest",
    titleKeyword: "Pinterest",
    metaDescription:
      "Resize images for Pinterest- standard pin 1000×1500, square pin 1000×1000, long pin 1000×2100. Free online, no upload required.",
    ogDescription:
      "Resize photos for Pinterest pins in the right vertical dimensions. Standard, square, and long pin formats- free and processed locally in your browser.",
    keywords: [
      "resize image for pinterest",
      "pinterest pin size 2026",
      "pinterest image dimensions",
      "1000x1500 pinterest",
      "pinterest tall pin size",
      "square pinterest pin",
      "resize for pinterest free",
      "pinterest long pin dimensions",
    ],
    sizes: [
      { type: "Standard Pin", width: 1000, height: 1500, note: "2:3 ratio- most common" },
      { type: "Square Pin", width: 1000, height: 1000, note: "1:1 ratio" },
      { type: "Long Pin", width: 1000, height: 2100, note: "Infographic / step-by-step" },
    ],
    steps: [
      "Open ResizePack, drop your image and select the Pinterest preset - Standard Pin (2:3), Square Pin (1:1) or Long Pin.",
      "Pinterest is a visual discovery platform- taller images take up more feed space. For Standard Pins, crop to 2:3 first with CropRatio to frame your subject perfectly.",
      "Download and upload directly to Pinterest. Include keyword-rich alt text and a description when pinning for maximum SEO visibility on the platform.",
    ],
    faqs: [
      {
        q: "What is the best Pinterest pin size in 2026?",
        a: "The recommended Pinterest pin size is 1000×1500 px (2:3 ratio). Pinterest supports aspect ratios from 1:1 to 2:3- taller images perform better because they take up more vertical space in users' feeds.",
      },
      {
        q: "Are long pins (1000×2100) still effective on Pinterest?",
        a: "Long pins work well for step-by-step tutorials and infographics. However, Pinterest crops very long images in the feed preview to approximately 2:3. Include the most important information at the top 1500 px.",
      },
      {
        q: "What file format is best for Pinterest?",
        a: "JPEG is best for photographs. PNG is better for graphics, text-heavy pins, and infographics because it preserves sharp edges. Keep PNG files under 20 MB. Pinterest does not support animated GIFs.",
      },
      {
        q: "Does the pin image size affect Pinterest SEO?",
        a: "Correct image dimensions improve your pin's ranking on Pinterest because properly sized images get higher engagement rates (more saves and clicks), which Pinterest uses as a relevance signal.",
      },
    ],
    related: ["instagram", "facebook", "tiktok"],
  },

  // ─── TIKTOK ───────────────────────────────────────────────────────────────
  {
    slug: "tiktok",
    name: "TikTok",
    displayName: "TikTok",
    titleKeyword: "TikTok",
    metaDescription:
      "Resize images for TikTok- video frame 1080×1920, square 1080×1080, profile 200×200. Free online, no upload required.",
    ogDescription:
      "Resize photos for TikTok to the correct vertical and square dimensions. Video cover, photo mode, profile picture- free and processed locally in your browser.",
    keywords: [
      "resize image for tiktok",
      "tiktok image size 2026",
      "tiktok video dimensions",
      "1080x1920 tiktok",
      "tiktok photo size",
      "tiktok profile picture size",
      "resize for tiktok free",
      "tiktok square post size",
    ],
    sizes: [
      { type: "Video / Photo Mode", width: 1080, height: 1920, note: "9:16 full-screen vertical" },
      { type: "Square Format", width: 1080, height: 1080, note: "1:1 for photo posts" },
      { type: "Profile Picture", width: 200, height: 200, note: "Minimum recommended" },
    ],
    steps: [
      "Drop your image into ResizePack and select the TikTok preset - Video (9:16 vertical) or Square (1:1 photo mode).",
      "TikTok crops the top and bottom of vertical videos slightly on some devices- keep faces and key text within the central 1080×1500 px safe area. Use CropRatio first to adjust framing.",
      "Download and use as a video cover image or in TikTok's photo slideshow mode. For video uploads the cover image must match the video resolution.",
    ],
    faqs: [
      {
        q: "What is the correct TikTok video size?",
        a: "TikTok videos and photo slideshows should be 1080×1920 px (9:16 ratio). This fills the full screen vertically on all phone sizes. Horizontal or square videos will have black bars on TikTok.",
      },
      {
        q: "Can I post square images on TikTok?",
        a: "Yes. TikTok's photo mode supports both 1:1 square (1080×1080 px) and 9:16 vertical formats. Square images display with a blurred background fill on the sides in the app.",
      },
      {
        q: "What size should my TikTok profile picture be?",
        a: "Upload your TikTok profile picture at 200×200 px minimum. TikTok displays it as a circle, so make sure the key subject (usually your face or logo) is centered with some padding around the edges.",
      },
      {
        q: "Does TikTok compress uploaded images?",
        a: "Yes, TikTok re-encodes all uploaded media. Starting with an image at exactly 1080 px wide gives TikTok no reason to upscale or downscale before its own compression, producing the sharpest possible output.",
      },
    ],
    related: ["instagram", "pinterest", "youtube-thumbnail"],
  },

  // ─── DISCORD ──────────────────────────────────────────────────────────────
  {
    slug: "discord",
    name: "Discord",
    displayName: "Discord",
    titleKeyword: "Discord image sizes",
    metaDescription:
      "Resize images for Discord- server icon 512×512, banner 960×540, emoji 128×128, sticker 320×320. Free online, no upload required.",
    ogDescription:
      "Resize photos for Discord servers and profiles. Server icon, banner, avatar, emoji, sticker- exact pixel dimensions, free and processed locally.",
    keywords: [
      "discord image size",
      "discord server icon size",
      "discord banner size",
      "discord emoji size",
      "resize image for discord",
      "discord profile picture size",
      "discord sticker dimensions",
      "discord server splash size",
      "resize for discord free",
      "discord image dimensions 2026",
    ],
    sizes: [
      { type: "Server Icon", width: 512, height: 512, note: "Square, displayed as circle" },
      { type: "Banner", width: 960, height: 540, note: "Server or profile banner" },
      { type: "Profile Avatar", width: 128, height: 128, note: "Minimum recommended" },
      { type: "Emoji", width: 128, height: 128, note: "Custom server emoji" },
      { type: "Sticker", width: 320, height: 320, note: "Custom server sticker" },
      { type: "Server Splash", width: 1920, height: 1080, note: "Server invite background" },
    ],
    steps: [
      "Drop your image into ResizePack and select the Discord preset that matches your need - Server Icon, Banner, Emoji, Sticker or Splash.",
      "Discord crops server icons into circles, so center your subject. For emojis and stickers, make sure the design reads clearly at small sizes- use CropRatio first if needed.",
      "Download the resized file and upload directly to your Discord server settings. The image will display crisp on both desktop and mobile clients.",
    ],
    faqs: [
      {
        q: "What size should a Discord server icon be?",
        a: "The recommended Discord server icon size is 512×512 px. Discord displays it as a circle, so keep important content centered and avoid placing anything in the corners. Supported formats are JPG, PNG, and GIF (animated icons require Nitro Boost level 1+).",
      },
      {
        q: "What are the Discord emoji size limits?",
        a: "Discord custom emojis must be 128×128 px or smaller, with a maximum file size of 256 KB. For the sharpest result, design at exactly 128×128 px. Both static (PNG/JPG) and animated (GIF) formats are supported.",
      },
      {
        q: "What is the correct Discord banner size?",
        a: "Discord server banners and profile banners should be 960×540 px (16:9 ratio). Animated banners (GIF) are available for Nitro users. Keep key content centered since Discord may crop edges on smaller screens.",
      },
      {
        q: "What size are Discord stickers?",
        a: "Discord stickers should be 320×320 px with a maximum file size of 512 KB. They support PNG and APNG (animated) formats. Lottie stickers follow a different spec and require JSON files.",
      },
      {
        q: "What resolution is the Discord server splash?",
        a: "The server invite splash background should be 1920×1080 px (16:9 ratio). This image appears when someone receives an invite to your server. Only servers with Boost level 1 or higher can set a custom splash.",
      },
    ],
    related: ["slack", "twitch", "generic"],
  },

  // ─── SLACK ────────────────────────────────────────────────────────────────
  {
    slug: "slack",
    name: "Slack",
    displayName: "Slack",
    titleKeyword: "Slack image sizes",
    metaDescription:
      "Resize images for Slack- workspace icon 132×132, profile photo 512×512, shared image 2000×2000, emoji 128×128. Free online tool.",
    ogDescription:
      "Resize photos for Slack workspaces and profiles. Workspace icon, profile picture, shared images, custom emoji- exact dimensions, free and private.",
    keywords: [
      "slack image size",
      "slack workspace icon size",
      "slack profile photo size",
      "slack custom emoji size",
      "resize image for slack",
      "slack shared image dimensions",
      "resize for slack free",
      "slack image dimensions 2026",
      "slack profile picture dimensions",
      "slack emoji upload size",
    ],
    sizes: [
      { type: "Workspace Icon", width: 132, height: 132, note: "Square, displayed in sidebar" },
      { type: "Profile Photo", width: 512, height: 512, note: "Recommended resolution" },
      { type: "Shared Image", width: 2000, height: 2000, note: "Max dimensions for uploads" },
      { type: "Custom Emoji", width: 128, height: 128, note: "Square, max 128 KB" },
    ],
    steps: [
      "Open ResizePack, drop your image and choose the Slack preset - Workspace Icon, Profile Photo, Shared Image or Custom Emoji.",
      "For workspace icons, center your logo within the safe area since Slack rounds the corners. For emojis, ensure the design is legible at very small display sizes.",
      "Download and upload directly to Slack via workspace settings or your profile. Slack accepts JPG, PNG, and GIF formats for most image types.",
    ],
    faqs: [
      {
        q: "What size should a Slack workspace icon be?",
        a: "The recommended Slack workspace icon size is 132×132 px. Slack displays it with rounded corners in the sidebar. Upload a square image at 132×132 or larger for the crispest result across desktop and mobile apps.",
      },
      {
        q: "What is the ideal Slack profile photo size?",
        a: "Upload your Slack profile photo at 512×512 px for the best quality. Slack displays profile pictures at various sizes throughout the interface, from tiny avatars in threads to larger previews in profiles. A 512 px source ensures sharpness everywhere.",
      },
      {
        q: "What are Slack custom emoji requirements?",
        a: "Slack custom emojis should be 128×128 px or smaller, with a maximum file size of 128 KB. Square images work best. Slack supports JPG, PNG, and GIF formats for custom emojis. Non-square images will be stretched to fit.",
      },
      {
        q: "What is the maximum image size I can share in Slack?",
        a: "Slack supports shared images up to 2000×2000 px. Files can be up to 1 GB on paid plans (free plan limit is lower). For the best inline preview quality, keep images under 2000 px on the longest side. Slack generates thumbnails automatically.",
      },
    ],
    related: ["discord", "email", "generic"],
  },

  // ─── TWITCH ───────────────────────────────────────────────────────────────
  {
    slug: "twitch",
    name: "Twitch",
    displayName: "Twitch",
    titleKeyword: "Twitch image sizes",
    metaDescription:
      "Resize images for Twitch- profile 256×256, offline banner 1920×1080, panel 320×160, emote 112×112. Free online, no upload.",
    ogDescription:
      "Resize photos for your Twitch channel. Profile picture, offline banner, panels, emotes, overlays and thumbnails- exact pixel dimensions, free and private.",
    keywords: [
      "twitch image size",
      "twitch profile picture size",
      "twitch offline banner size",
      "twitch panel size",
      "twitch emote size",
      "resize image for twitch",
      "twitch overlay dimensions",
      "twitch thumbnail size",
      "resize for twitch free",
      "twitch image dimensions 2026",
    ],
    sizes: [
      { type: "Profile Picture", width: 256, height: 256, note: "Square, displayed as circle" },
      { type: "Offline Banner", width: 1920, height: 1080, note: "Shown when stream is offline" },
      { type: "Panel Image", width: 320, height: 160, note: "Below-stream info panels" },
      { type: "Emote", width: 112, height: 112, note: "Largest emote size (also 56×56, 28×28)" },
      { type: "Stream Overlay", width: 1920, height: 1080, note: "Full HD overlay frame" },
      { type: "Video Thumbnail", width: 1280, height: 720, note: "VOD and clip thumbnails" },
    ],
    steps: [
      "Drop your image into ResizePack and select the Twitch preset - Profile, Offline Banner, Panel, Emote, Overlay or Thumbnail.",
      "For emotes, design at 112×112 px but test readability at 28×28 px (the smallest display size). Use CropRatio first to frame the subject tightly for maximum impact at small sizes.",
      "Download and upload to your Twitch dashboard. Emotes require Affiliate or Partner status. Panels and banners can be updated by any streamer from the channel settings page.",
    ],
    faqs: [
      {
        q: "What size should a Twitch profile picture be?",
        a: "The recommended Twitch profile picture size is 256×256 px. Twitch displays it as a circle on your channel page and as a small square in chat. Upload at exactly 256×256 for the sharpest result. Supported formats are JPG, PNG, and GIF.",
      },
      {
        q: "What is the correct Twitch offline banner size?",
        a: "The recommended Twitch offline banner (offline screen) size is 1920×1080 px (16:9 ratio). This image is displayed when your stream is not live. Use it to show your schedule, social links, or branding. Keep file size under 10 MB.",
      },
      {
        q: "What are the Twitch emote size requirements?",
        a: "Twitch emotes must be uploaded in three sizes: 28×28, 56×56, and 112×112 px. The largest size (112×112) is the source- Twitch scales down from it. Maximum file size is 25 KB per emote. PNG with transparent background is recommended.",
      },
      {
        q: "What size are Twitch panels?",
        a: "Twitch info panels below the stream should be 320 px wide. Height is flexible but 160 px (2:1 ratio) is the most common. Keep text large and readable since panels are viewed on various screen sizes. PNG and JPG are both supported.",
      },
      {
        q: "What resolution should a Twitch stream overlay be?",
        a: "Stream overlays should match your broadcast resolution, typically 1920×1080 px (Full HD). Use PNG with transparency so the overlay frames your gameplay or camera feed. Keep the overlay lightweight to avoid impacting stream performance.",
      },
    ],
    related: ["youtube-thumbnail", "discord", "generic"],
  },

  // ─── TELEGRAM ─────────────────────────────────────────────────────────────
  {
    slug: "telegram",
    name: "Telegram",
    displayName: "Telegram",
    titleKeyword: "Telegram image sizes",
    metaDescription:
      "Resize images for Telegram- profile photo 512×512, channel photo 512×512, sticker 512×512, inline result 300×200. Free online tool.",
    ogDescription:
      "Resize photos for Telegram profiles, channels, and stickers. Exact pixel dimensions for every Telegram image type- free, fast, and processed locally.",
    keywords: [
      "telegram image size",
      "telegram profile photo size",
      "telegram sticker size",
      "telegram channel photo size",
      "resize image for telegram",
      "telegram sticker dimensions",
      "telegram inline bot image size",
      "resize for telegram free",
      "telegram image dimensions 2026",
      "telegram photo upload size",
    ],
    sizes: [
      { type: "Profile Photo", width: 512, height: 512, note: "Displayed as circle" },
      { type: "Channel Photo", width: 512, height: 512, note: "Group or channel avatar" },
      { type: "Sticker", width: 512, height: 512, note: "One side must be 512 px" },
      { type: "Inline Bot Result", width: 300, height: 200, note: "Thumbnail for inline results" },
    ],
    steps: [
      "Open ResizePack, drop your image and select the Telegram preset - Profile Photo, Channel Photo, Sticker or Inline Bot Result.",
      "Telegram displays profile photos as circles, so center your subject. For stickers, one side must be exactly 512 px- the other can be shorter. Use CropRatio to frame it first.",
      "Download and upload to Telegram. For stickers, use the @Stickers bot to create your sticker pack. Profile and channel photos are set directly in the app settings.",
    ],
    faqs: [
      {
        q: "What size should a Telegram profile photo be?",
        a: "The recommended Telegram profile photo size is 512×512 px. Telegram displays profile photos as circles in chats and as squares in the profile view. A 512 px source provides crisp quality at all display sizes across desktop and mobile.",
      },
      {
        q: "What are the Telegram sticker size requirements?",
        a: "Telegram stickers must have one side exactly 512 px, with the other side being 512 px or less. Static stickers use WebP format, animated stickers use TGS (Lottie), and video stickers use WebM. Maximum file size is 512 KB for static stickers.",
      },
      {
        q: "What size is a Telegram channel photo?",
        a: "Telegram channel and group photos should be 512×512 px. Like profile photos, they are displayed as circles in chat lists. Upload a square image centered on your logo or key visual for the best appearance across all Telegram clients.",
      },
      {
        q: "Does Telegram compress uploaded images?",
        a: "Yes, Telegram compresses images sent in chat. To send full-resolution images, use the 'Send as file' option instead of 'Send as photo'. Photos sent normally are compressed to approximately 1280 px on the longest side and converted to JPEG.",
      },
    ],
    related: ["whatsapp", "discord", "generic"],
  },

  // ─── THREADS ──────────────────────────────────────────────────────────────
  {
    slug: "threads",
    name: "Threads",
    displayName: "Threads",
    titleKeyword: "Threads image sizes",
    metaDescription:
      "Resize images for Threads- profile photo 320×320, image post 1080×1350, carousel 1080×1080. Free online, no upload required.",
    ogDescription:
      "Resize photos for Threads by Meta. Profile picture, image posts, and carousel images at the exact dimensions- free and processed locally in your browser.",
    keywords: [
      "threads image size",
      "threads profile photo size",
      "threads post dimensions",
      "threads carousel size",
      "resize image for threads",
      "threads image post size 2026",
      "threads photo dimensions",
      "resize for threads free",
      "threads by meta image size",
      "threads portrait post size",
    ],
    sizes: [
      { type: "Profile Photo", width: 320, height: 320, note: "Synced from Instagram by default" },
      { type: "Image Post", width: 1080, height: 1350, note: "Portrait optimal (4:5 ratio)" },
      { type: "Carousel Image", width: 1080, height: 1080, note: "Square format for carousels" },
    ],
    steps: [
      "Drop your image into ResizePack and choose the Threads preset - Profile Photo, Image Post (portrait) or Carousel Image (square).",
      "For image posts, 1080×1350 (4:5 portrait) takes up the most vertical space in the feed. Use CropRatio at 4:5 first, then resize for the perfect frame.",
      "Download and upload directly to Threads. Your image will display sharp on all devices. Threads shares the same image infrastructure as Instagram.",
    ],
    faqs: [
      {
        q: "What is the best image size for a Threads post?",
        a: "The optimal Threads image post size is 1080×1350 px (4:5 portrait ratio). This format takes up the most vertical screen space in users' feeds, maximizing engagement. Threads also supports square (1:1) and landscape formats.",
      },
      {
        q: "What size is the Threads profile photo?",
        a: "Threads profile photos are 320×320 px. By default, Threads syncs your profile picture from Instagram. If you want a different photo on Threads, you can update it separately in the app settings. The photo is displayed as a circle.",
      },
      {
        q: "What size should Threads carousel images be?",
        a: "Threads carousel images work best at 1080×1080 px (1:1 square). You can include up to 10 images in a carousel. All images in a carousel should use the same aspect ratio for a consistent look as users swipe through them.",
      },
      {
        q: "Does Threads compress uploaded images?",
        a: "Yes, Threads compresses images on upload, similar to Instagram. Uploading at exactly 1080 px wide with high-quality JPEG compression (90%+) gives the best result after Threads' own encoding. Avoid uploading images much larger than 1080 px wide.",
      },
    ],
    related: ["instagram", "twitter", "generic"],
  },

  // ─── MASTODON ─────────────────────────────────────────────────────────────
  {
    slug: "mastodon",
    name: "Mastodon",
    displayName: "Mastodon",
    titleKeyword: "Mastodon image sizes",
    metaDescription:
      "Resize images for Mastodon- avatar 400×400, header 1500×500, media attachment 1920×1080, custom emoji 50×50+. Free online tool.",
    ogDescription:
      "Resize photos for Mastodon profiles and posts. Avatar, header image, media attachments, custom emoji- exact dimensions, free and processed locally.",
    keywords: [
      "mastodon image size",
      "mastodon avatar size",
      "mastodon header image size",
      "mastodon media attachment size",
      "resize image for mastodon",
      "mastodon custom emoji size",
      "mastodon profile picture dimensions",
      "resize for mastodon free",
      "mastodon image dimensions 2026",
      "fediverse image size",
    ],
    sizes: [
      { type: "Profile Avatar", width: 400, height: 400, note: "Displayed as circle or rounded square" },
      { type: "Header Image", width: 1500, height: 500, note: "Profile banner (3:1 ratio)" },
      { type: "Media Attachment", width: 1920, height: 1080, note: "Max dimensions, 16 MB limit" },
      { type: "Custom Emoji", width: 50, height: 50, note: "Minimum 50×50, max 50 KB" },
    ],
    steps: [
      "Open ResizePack, drop your image and select the Mastodon preset - Avatar, Header, Media Attachment or Custom Emoji.",
      "For header images, use CropRatio at 3:1 first to frame your composition, then resize to 1500×500. For avatars, center your subject since some instances display them as circles.",
      "Download and upload to your Mastodon instance via Preferences > Profile. Media attachments are uploaded directly in the compose window when creating a new post.",
    ],
    faqs: [
      {
        q: "What size should a Mastodon profile avatar be?",
        a: "The recommended Mastodon avatar size is 400×400 px. Different Mastodon instances may display avatars as circles or rounded squares depending on their theme. Upload a square image with the subject centered to look good in both display styles.",
      },
      {
        q: "What is the correct Mastodon header image size?",
        a: "The recommended Mastodon header (banner) size is 1500×500 px (3:1 ratio). This is the same ratio as Twitter headers. Keep important content centered since mobile apps may crop the edges. Maximum file size is typically 2 MB.",
      },
      {
        q: "What are Mastodon media attachment limits?",
        a: "Mastodon supports media attachments up to 1920×1080 px with a maximum file size of 16 MB for images. Supported formats include JPG, PNG, GIF, and WebP. Images larger than the limit are automatically downscaled by the server.",
      },
      {
        q: "What size are Mastodon custom emojis?",
        a: "Mastodon custom emojis must be at least 50×50 px. The maximum file size is 50 KB. PNG format with transparency is recommended. Custom emojis are added by instance administrators and can be used by all members of that instance.",
      },
    ],
    related: ["twitter", "discord", "generic"],
  },

  // ─── PASSPORT ─────────────────────────────────────────────────────────────
  {
    slug: "passport",
    name: "Passport Photo",
    displayName: "Passport Photo",
    titleKeyword: "passport photo size",
    metaDescription:
      "Resize photos to passport size for any country. US 2x2\", EU 35x45mm, UK, India, China — free, instant, browser-based.",
    ogDescription:
      "Resize your photo to the exact passport dimensions for any country — US, EU, UK, India, China, Canada. Free and instant.",
    keywords: [
      "passport photo size",
      "passport photo dimensions",
      "resize photo for passport",
      "2x2 passport photo",
      "passport photo maker online",
      "passport photo resize free",
      "us passport photo size in pixels",
      "passport size photo",
      "35x45mm photo",
      "passport photo creator",
    ],
    sizes: [
      { type: "US Passport", width: 600, height: 600, note: "Required for US passport and visa applications" },
      { type: "EU/Schengen", width: 413, height: 531, note: "Standard for EU passports and ID cards" },
      { type: "UK Passport", width: 420, height: 540, note: "UK passport and driving licence" },
      { type: "India Passport", width: 413, height: 531, note: "Indian passport and visa applications" },
      { type: "China Visa", width: 390, height: 567, note: "Required for Chinese visa applications" },
      { type: "Canada Passport", width: 591, height: 827, note: "Canadian passport standard" },
      { type: "Australia Passport", width: 413, height: 531, note: "Australian passport applications" },
      { type: "Japan Visa", width: 413, height: 531, note: "Japanese visa applications" },
    ],
    steps: [
      "Upload your photo — drag it onto the tool or click to browse. Portraits with a plain background work best.",
      "Select your country — pick the passport standard you need. The tool automatically sets the correct pixel dimensions.",
      "Download your resized photo — save the perfectly-sized image. Ready to print or upload to your passport application.",
    ],
    faqs: [
      {
        q: "What size is a US passport photo in pixels?",
        a: "A US passport photo must be exactly 2x2 inches (51x51mm). At the standard 300 DPI print resolution, this translates to 600x600 pixels. SammaPix automatically resizes your photo to these exact dimensions.",
      },
      {
        q: "Can I use a phone photo for my passport?",
        a: "Yes, as long as the photo meets the requirements: plain white or light background, facing forward, neutral expression, and no glasses. SammaPix helps you resize it to the exact dimensions required.",
      },
      {
        q: "What's the difference between passport and visa photo sizes?",
        a: "Most countries use 35x45mm for passports, but some visa applications have different requirements. For example, US passport photos are 2x2 inches (51x51mm), while Chinese visa photos are 33x48mm. Always check the specific requirements for your application.",
      },
      {
        q: "Do I need to crop my photo before resizing?",
        a: "Not necessarily. SammaPix can resize and crop your photo to the exact aspect ratio required. For best results, start with a well-centered headshot where your face takes up about 70-80% of the frame.",
      },
      {
        q: "Is this free to use?",
        a: "Yes, SammaPix's passport photo resizer is completely free. No account required, no watermark, and your photos are processed entirely in your browser — they never leave your device.",
      },
    ],
    related: ["visa", "instagram", "linkedin"],
  },

  // ─── VISA ───────────────────────────────────────────────────────────────────
  {
    slug: "visa",
    name: "Visa Photo",
    displayName: "Visa Photo",
    titleKeyword: "visa photo size",
    metaDescription:
      "Resize photos to visa application size for any country. US, Schengen, UK, India, China, Japan — free, instant, browser-based.",
    ogDescription:
      "Get the exact visa photo dimensions for any country. Resize instantly in your browser — free, no upload.",
    keywords: [
      "visa photo size",
      "visa photo dimensions",
      "resize photo for visa",
      "visa photo requirements",
      "schengen visa photo size",
      "us visa photo size",
      "uk visa photo size",
      "india visa photo size pixels",
      "visa application photo size",
      "visa photo maker free",
    ],
    sizes: [
      { type: "US Visa (B1/B2)", width: 600, height: 600, note: "Same as US passport. Required for DS-160 application" },
      { type: "Schengen Visa", width: 413, height: 531, note: "Standard for all Schengen area visa applications" },
      { type: "UK Visa", width: 420, height: 540, note: "UK visa and BRP card applications" },
      { type: "India E-Visa", width: 413, height: 531, note: "Required for Indian e-Visa online application" },
      { type: "China Visa", width: 390, height: 567, note: "Specific size for Chinese visa — different from standard 35x45mm" },
      { type: "Japan Visa", width: 413, height: 531, note: "Japanese visa and residence permit" },
      { type: "Canada Visa", width: 420, height: 540, note: "Canadian visa applications" },
      { type: "Australia Visa", width: 413, height: 531, note: "Australian visa (subclass 600, 500, etc.)" },
    ],
    steps: [
      "Upload your photo — use a recent portrait with a white or light background. Make sure your face is clearly visible.",
      "Choose your visa type — select the country and visa category. Each has specific size requirements that we handle automatically.",
      "Download and submit — your photo is resized to the exact specifications. Ready to upload to the visa application portal or print.",
    ],
    faqs: [
      {
        q: "What photo size do I need for a Schengen visa?",
        a: "Schengen visa photos must be 35x45mm (413x531 pixels at 300 DPI). The face should occupy 70-80% of the photo. This size applies to all 27 Schengen area countries.",
      },
      {
        q: "Are visa photo and passport photo the same size?",
        a: "Often yes, but not always. Most countries use 35x45mm for both. However, the US uses 2x2 inches (51x51mm) for both, and China uses 33x48mm for visas specifically. Always check the specific requirements for your visa type.",
      },
      {
        q: "Can I take a visa photo with my phone?",
        a: "Yes. Use good lighting, stand against a white wall, and hold the camera at eye level. Then use SammaPix to resize to the exact dimensions required by your visa application.",
      },
      {
        q: "What background color is required for visa photos?",
        a: "Most visa applications require a white or off-white background. Some countries (like India for OCI cards) may accept a light blue background. Check your specific visa requirements.",
      },
      {
        q: "How many pixels should my visa photo be?",
        a: "This depends on the country. US visa: 600x600px, Schengen: 413x531px, China: 390x567px, UK: 420x540px. SammaPix automatically sets the correct dimensions when you select your visa type.",
      },
    ],
    related: ["passport", "instagram", "linkedin"],
  },

  // ─── SNAPCHAT ─────────────────────────────────────────────────────────────
  {
    slug: "snapchat",
    name: "Snapchat",
    displayName: "Snapchat",
    titleKeyword: "Snapchat",
    metaDescription:
      "Resize images for Snapchat — Story 1080×1920, Spotlight 1080×1920, Profile 320×320, Geofilter 1080×2340. Free online, no upload required.",
    ogDescription:
      "Resize photos for every Snapchat format instantly. Story, Spotlight, Profile picture, and Geofilter — exact pixel dimensions, free and private.",
    keywords: [
      "resize image for snapchat",
      "snapchat image size",
      "snapchat story dimensions",
      "snapchat spotlight size",
      "snapchat geofilter dimensions",
      "snapchat profile picture size",
      "resize for snapchat free",
      "1080x1920 snapchat",
    ],
    sizes: [
      { type: "Story", width: 1080, height: 1920, note: "Full-screen vertical snap" },
      { type: "Spotlight", width: 1080, height: 1920, note: "Vertical video/image for Spotlight feed" },
      { type: "Profile Picture", width: 320, height: 320, note: "Bitmoji circle overlay" },
      { type: "Geofilter", width: 1080, height: 2340, note: "Custom location-based overlay" },
    ],
    steps: [
      "Open ResizePack, drop your image and select the Snapchat preset — Story, Spotlight, Profile or Geofilter.",
      "For Geofilters (1080×2340), design with transparent areas where the camera feed shows through. Use CropRatio to frame your artwork at the tall 9:19.5 ratio before resizing.",
      "Download the resized image. Stories and Spotlights upload directly from your camera roll. Geofilters must be submitted through the Snapchat Creative Portal for approval.",
    ],
    faqs: [
      {
        q: "What size should a Snapchat Story image be?",
        a: "1080×1920 px (9:16 ratio) is the standard Snapchat Story size. This fills the entire screen on most smartphones without any cropping or black bars.",
      },
      {
        q: "What dimensions does Snapchat Spotlight require?",
        a: "Spotlight uses the same 1080×1920 px (9:16) format as Stories. Content can be photos or videos. For best results, fill the entire frame — Spotlight penalizes content with visible black bars in its recommendation algorithm.",
      },
      {
        q: "How big should a Snapchat Geofilter be?",
        a: "Snapchat Geofilters must be 1080×2340 px in PNG format with transparency. The file must be under 300 KB. Design your overlay elements around the edges, leaving the center transparent so the camera image shows through.",
      },
      {
        q: "What is the Snapchat profile picture size?",
        a: "Snapchat displays profile pictures at 320×320 px, rendered as a circle with the Bitmoji overlay. Upload at 320×320 or larger at a 1:1 ratio for the sharpest result.",
      },
      {
        q: "Does Snapchat compress uploaded images?",
        a: "Yes, Snapchat applies heavy compression to Stories and Snaps. Uploading at exactly 1080×1920 minimizes the quality loss because Snapchat does not need to rescale your image before its own compression.",
      },
    ],
    related: ["instagram", "tiktok", "whatsapp"],
  },

  // ─── WHATSAPP ─────────────────────────────────────────────────────────────
  {
    slug: "whatsapp",
    name: "WhatsApp",
    displayName: "WhatsApp",
    titleKeyword: "WhatsApp",
    seoTitle: "WhatsApp Image Size 2026: Status 1080×1920, Profile, Group — Free Resizer",
    metaDescription:
      "Exact WhatsApp image sizes for 2026: Status 1080×1920 (9:16), Profile 500×500, Group Icon 192×192. Resize in your browser — no upload, no signup.",
    ogDescription:
      "WhatsApp Status 1080×1920, Profile 500×500, Group Icon 192×192. Resize in browser, no upload required.",
    keywords: [
      "resize image for whatsapp",
      "whatsapp profile picture size",
      "whatsapp status image dimensions",
      "whatsapp group icon size",
      "whatsapp dp size",
      "resize for whatsapp free",
      "whatsapp image dimensions 2026",
      "500x500 whatsapp",
    ],
    sizes: [
      { type: "Profile Picture", width: 500, height: 500, note: "Displayed as circle at ~150 px" },
      { type: "Status", width: 1080, height: 1920, note: "Full-screen vertical story" },
      { type: "Group Icon", width: 192, height: 192, note: "Small circular group avatar" },
    ],
    steps: [
      "Drop your image into ResizePack and choose the WhatsApp preset — Profile Picture, Status, or Group Icon.",
      "For profile pictures, crop to a square (1:1) first using CropRatio — WhatsApp displays these as circles, so center your subject and leave margin around the edges.",
      "Download and set your profile picture directly in WhatsApp Settings, or upload a Status from your camera roll. Group icons are set in the group info screen.",
    ],
    faqs: [
      {
        q: "What size is a WhatsApp profile picture?",
        a: "WhatsApp profile pictures are stored at 500×500 px and displayed at approximately 150×150 px in chat lists. Upload at 500×500 for the best quality when someone taps to view your full profile photo.",
      },
      {
        q: "What dimensions should a WhatsApp Status image be?",
        a: "WhatsApp Status uses the same 1080×1920 px (9:16) format as most vertical story formats. Images that are not 9:16 will be zoomed and cropped to fill the screen.",
      },
      {
        q: "How do I make a WhatsApp group icon?",
        a: "Create or resize a square image to 192×192 px. WhatsApp displays group icons as small circles in chat lists, so keep the main content centered. Simple graphics and logos work better than detailed photos at this tiny display size.",
      },
      {
        q: "Does WhatsApp compress images I send in chat?",
        a: "Yes, WhatsApp heavily compresses images sent as regular messages (down to ~100 KB). To send full-quality images, use the Document attachment option instead. Profile pictures and Status images are also compressed but less aggressively.",
      },
      {
        q: "Why does my WhatsApp profile picture look blurry?",
        a: "WhatsApp crops and compresses profile photos. Upload a square image at exactly 500×500 px with the subject centered — this gives WhatsApp the least work to do and results in the sharpest profile picture.",
      },
    ],
    related: ["snapchat", "instagram", "facebook"],
  },

  // ─── EMAIL HEADER ─────────────────────────────────────────────────────────
  {
    slug: "email-header",
    name: "Email Header",
    displayName: "Email Header",
    titleKeyword: "Email Headers and Newsletters",
    metaDescription:
      "Resize images for email headers — Newsletter Banner 600×200, Email Banner 600×300, Signature Image 300×100. Free online, no upload required.",
    ogDescription:
      "Resize images for email newsletters, banners, and signatures. Exact dimensions for Mailchimp, ConvertKit, Gmail, and all major email clients.",
    keywords: [
      "resize image for email header",
      "email banner size",
      "newsletter image dimensions",
      "email signature image size",
      "mailchimp header image size",
      "email header dimensions 2026",
      "resize for email newsletter free",
      "600px email image",
    ],
    sizes: [
      { type: "Newsletter Header", width: 600, height: 200, note: "Standard email header banner" },
      { type: "Email Banner", width: 600, height: 300, note: "Wider banner for promotional emails" },
      { type: "Signature Image", width: 300, height: 100, note: "Logo or headshot for email signature" },
    ],
    steps: [
      "Open ResizePack, drop your image and select the Email Header preset — Newsletter Header, Email Banner, or Signature Image.",
      "For email signatures, keep the image under 50 KB after resizing — use our Compress tool to optimize further. Large signature images trigger spam filters and slow email loading.",
      "Download and insert into your email template. For Mailchimp, ConvertKit, or Brevo, upload the resized image to their media library. For Gmail signatures, paste or insert the image in Settings > Signature.",
    ],
    faqs: [
      {
        q: "What is the standard email header image size?",
        a: "600 px wide is the email standard because most email clients render at 600 px max width. Height varies — 200 px for compact headers, 300 px for promotional banners. Some modern templates use 640 or 700 px widths, but 600 px guarantees compatibility.",
      },
      {
        q: "What size should an email signature image be?",
        a: "300×100 px is the practical maximum for email signature logos. Larger images push content below the fold and can trigger spam filters. Keep file size under 30-50 KB — use JPEG for photos or PNG for logos with transparency.",
      },
      {
        q: "Do email clients support WebP images?",
        a: "No — many email clients (Outlook, older Gmail) do not support WebP. Always use JPEG for photographic email images and PNG for logos or graphics. This ensures your images render correctly across Gmail, Outlook, Apple Mail, and all other clients.",
      },
      {
        q: "Why does my email header look blurry in Outlook?",
        a: "Outlook on Windows renders images at 96 DPI regardless of the image resolution. To compensate, export at 2x size (1200×400 px) and set the HTML width to 600 px. SammaPix can resize to either standard or retina dimensions.",
      },
      {
        q: "How large should email images be in file size?",
        a: "Keep individual email images under 200 KB, and total email size under 100 KB of HTML plus 500 KB of images. Gmail clips emails over 102 KB of HTML. Use SammaPix Compress after resizing to hit optimal file sizes.",
      },
    ],
    related: ["linkedin", "blog-header", "facebook"],
  },

  // ─── EBAY ─────────────────────────────────────────────────────────────────
  {
    slug: "ebay",
    name: "eBay",
    displayName: "eBay",
    titleKeyword: "eBay Listings",
    metaDescription:
      "Resize images for eBay — Listing 1600×1600, Gallery 500×500, Zoom 1600×1600. Free online tool, no upload required.",
    ogDescription:
      "Resize product photos for eBay listings instantly. Listing images, gallery thumbnails, and zoom views — exact dimensions, free and private.",
    keywords: [
      "resize image for ebay",
      "ebay listing image size",
      "ebay photo dimensions",
      "ebay product image requirements",
      "1600x1600 ebay",
      "ebay gallery image size",
      "resize for ebay listing free",
      "ebay image guidelines 2026",
    ],
    sizes: [
      { type: "Listing Image", width: 1600, height: 1600, note: "Primary listing photo — enables zoom" },
      { type: "Gallery Thumbnail", width: 500, height: 500, note: "Search results grid" },
      { type: "Zoom Image", width: 1600, height: 1600, note: "Hover-to-zoom detail view" },
    ],
    steps: [
      "Drop your product photo into ResizePack and select the eBay preset — Listing, Gallery, or Zoom.",
      "eBay requires a white or neutral background for best results. If your photo has a busy background, use our Remove Background tool first, then resize.",
      "Download and upload to your eBay listing. eBay recommends at least 1600 px on the longest side to enable the zoom feature that increases buyer confidence and conversion rates.",
    ],
    faqs: [
      {
        q: "What size should eBay listing photos be?",
        a: "eBay recommends 1600×1600 px minimum for the primary listing image. This enables the hover-to-zoom feature in search results. The maximum is 12000×12000 px, but 1600-2000 px is the practical sweet spot for file size and quality.",
      },
      {
        q: "Does eBay require a white background?",
        a: "eBay does not strictly require white backgrounds for most categories, but listings with white or light neutral backgrounds consistently rank higher in search and convert better. The first image especially benefits from a clean background.",
      },
      {
        q: "How many images can I add to an eBay listing?",
        a: "eBay allows up to 24 free images per listing. Use SammaPix to batch-resize all product photos to 1600×1600 px at once. Show different angles, close-ups of details, packaging, and scale references.",
      },
      {
        q: "What file format does eBay accept?",
        a: "eBay accepts JPEG, PNG, TIFF, BMP, and GIF. JPEG is recommended for product photos — it produces the smallest file size while maintaining excellent quality. Keep individual images under 12 MB.",
      },
      {
        q: "Why is the zoom feature not working on my eBay listing?",
        a: "The zoom-on-hover feature requires images at least 800 px on the longest side, and works best at 1600 px or larger. If your images are under 800 px, eBay disables zoom. Resize to 1600×1600 with SammaPix to ensure zoom is always enabled.",
      },
    ],
    related: ["amazon", "shopify-product", "etsy-listing"],
  },

  // ─── AMAZON ───────────────────────────────────────────────────────────────
  {
    slug: "amazon",
    name: "Amazon",
    displayName: "Amazon",
    titleKeyword: "Amazon Product Listings",
    metaDescription:
      "Resize images for Amazon — Main Image 2000×2000, Swatch 250×250, Zoom 2000×2000. Free online tool, no upload required.",
    ogDescription:
      "Resize product photos for Amazon listings. Main image, swatch thumbnail, and zoom view — exact dimensions for maximum conversions.",
    keywords: [
      "resize image for amazon",
      "amazon product image size",
      "amazon listing photo dimensions",
      "amazon main image requirements",
      "2000x2000 amazon",
      "amazon swatch image size",
      "resize for amazon listing free",
      "amazon image guidelines 2026",
    ],
    sizes: [
      { type: "Main Image", width: 2000, height: 2000, note: "Pure white background required" },
      { type: "Swatch Image", width: 250, height: 250, note: "Color/variant selector thumbnail" },
      { type: "Zoom Image", width: 2000, height: 2000, note: "Hover-to-zoom on product detail page" },
    ],
    steps: [
      "Drop your product photo into ResizePack and select the Amazon preset — Main Image, Swatch, or Zoom.",
      "Amazon requires a pure white background (RGB 255,255,255) for the main image. Use our Remove Background tool first, then place the product on white before resizing.",
      "Download and upload through Amazon Seller Central. The main image must be at least 1000 px on the longest side for zoom, but 2000 px produces the sharpest zoom experience.",
    ],
    faqs: [
      {
        q: "What are Amazon's image requirements for product listings?",
        a: "The main image must have a pure white background (RGB 255,255,255), be at least 1000 px on the longest side (2000 px recommended), and show only the product without text, logos, or watermarks. Supplementary images have more flexibility.",
      },
      {
        q: "Why does Amazon require 2000×2000 px images?",
        a: "Images at 2000 px enable Amazon's zoom feature, which lets shoppers see fine product details. Listings with zoom-enabled images have significantly higher conversion rates because buyers feel more confident about product quality.",
      },
      {
        q: "What is an Amazon swatch image?",
        a: "Swatch images appear as tiny color or variant selectors on the product page (e.g., different colors of a t-shirt). They display at 250×250 px. Each should clearly show the variant difference — usually just the color or pattern.",
      },
      {
        q: "Can I use lifestyle images on Amazon?",
        a: "Yes, but only for supplementary images (positions 2-9). The main image (position 1) must show the product on a pure white background. Supplementary images can show the product in use, infographics, size charts, and packaging.",
      },
      {
        q: "What file format does Amazon accept?",
        a: "Amazon accepts JPEG (preferred), TIFF, PNG, and GIF. Use JPEG for photos at quality 90%+ to keep file size reasonable while maintaining the detail Amazon's zoom feature needs. Maximum file size is 10 MB per image.",
      },
    ],
    related: ["ebay", "shopify-product", "etsy-listing"],
  },

  // ─── SHOPIFY PRODUCT ──────────────────────────────────────────────────────
  {
    slug: "shopify-product",
    name: "Shopify Product",
    displayName: "Shopify Product",
    titleKeyword: "Shopify Product Images",
    metaDescription:
      "Resize images for Shopify — Product 2048×2048, Collection 1024×1024, Slideshow 1920×1080. Free online tool, no upload required.",
    ogDescription:
      "Resize product photos for Shopify stores. Product images, collection thumbnails, and slideshow banners — perfect dimensions for your theme.",
    keywords: [
      "resize image for shopify",
      "shopify product image size",
      "shopify collection image dimensions",
      "shopify slideshow banner size",
      "2048x2048 shopify",
      "shopify image requirements",
      "resize for shopify free",
      "shopify product photo dimensions 2026",
    ],
    sizes: [
      { type: "Product Image", width: 2048, height: 2048, note: "Square product photo for consistent grid" },
      { type: "Collection Image", width: 1024, height: 1024, note: "Category page featured image" },
      { type: "Slideshow Banner", width: 1920, height: 1080, note: "Homepage hero carousel" },
    ],
    steps: [
      "Open ResizePack, drop your product photo and select the Shopify preset — Product Image, Collection Image, or Slideshow Banner.",
      "Shopify displays products in grids, so consistent square images (1:1 ratio) create the cleanest layout. Use CropRatio to square-crop your photo before resizing to 2048×2048.",
      "Download and upload to Shopify via Products > Media. Shopify automatically generates responsive sizes from your uploaded image, so starting with the largest recommended size ensures sharp results at every breakpoint.",
    ],
    faqs: [
      {
        q: "What is the best product image size for Shopify?",
        a: "2048×2048 px square is the recommended size. Shopify's image CDN automatically generates smaller responsive versions from your upload. Starting at 2048 px ensures crisp display on retina devices and enables smooth pinch-to-zoom on mobile.",
      },
      {
        q: "Does Shopify compress my images?",
        a: "Yes, Shopify automatically processes and serves images via its CDN in optimized formats (including WebP and AVIF). Upload the highest quality source image — Shopify handles the optimization. Do not pre-compress to low quality.",
      },
      {
        q: "Should Shopify product images be square?",
        a: "Square (1:1) images are strongly recommended because they create consistent, professional-looking product grids regardless of your theme. Non-square images result in uneven rows with white space or cropping.",
      },
      {
        q: "What size should Shopify collection images be?",
        a: "1024×1024 px is ideal for collection (category) featured images. These appear on the Collections page and in navigation menus. Keep them visually distinct and representative of the products in each collection.",
      },
      {
        q: "How do I optimize Shopify slideshow banner images?",
        a: "Use 1920×1080 px (16:9) for slideshow banners. Keep text overlays in the center 60% of the image — different themes crop edges differently on mobile. Compress to under 500 KB with SammaPix for fast homepage loading.",
      },
    ],
    related: ["amazon", "ebay", "etsy-listing"],
  },

  // ─── ETSY LISTING ─────────────────────────────────────────────────────────
  {
    slug: "etsy-listing",
    name: "Etsy Listing",
    displayName: "Etsy Listing",
    titleKeyword: "Etsy Listings",
    metaDescription:
      "Resize images for Etsy — Listing 2000×2000, Thumbnail 570×456, Shop Banner 1200×300. Free online tool, no upload required.",
    ogDescription:
      "Resize photos for Etsy listings, thumbnails, and shop banners. Exact dimensions for maximum visibility in Etsy search results.",
    keywords: [
      "resize image for etsy",
      "etsy listing image size",
      "etsy thumbnail dimensions",
      "etsy shop banner size",
      "etsy product photo requirements",
      "2000x2000 etsy",
      "resize for etsy listing free",
      "etsy image guidelines 2026",
    ],
    sizes: [
      { type: "Listing Image", width: 2000, height: 2000, note: "Square product photo for listing gallery" },
      { type: "Thumbnail", width: 570, height: 456, note: "Search results and category pages" },
      { type: "Shop Banner", width: 1200, height: 300, note: "Storefront header image" },
    ],
    steps: [
      "Drop your product photo into ResizePack and select the Etsy preset — Listing Image, Thumbnail, or Shop Banner.",
      "For Etsy thumbnails, the first listing image is auto-cropped to 570×456 (5:4 ratio) in search results. Use CropRatio at 5:4 first to control exactly what appears in search — this is critical because the thumbnail drives click-through rates.",
      "Download and upload to your Etsy listing. Add all 10 allowed images — listings with more photos rank higher in Etsy search and convert better.",
    ],
    faqs: [
      {
        q: "What size should Etsy listing photos be?",
        a: "Etsy recommends at least 2000 px on the shortest side. For maximum quality, use 2000×2000 px square images. Etsy allows up to 10 images per listing — use all 10 slots for better search ranking and buyer confidence.",
      },
      {
        q: "How does Etsy crop thumbnails in search?",
        a: "Etsy crops listing thumbnails to a 5:4 ratio (570×456 px) in search results. The crop is center-aligned. If your product is not centered, it may be partially cut off in search. Pre-crop to 5:4 with SammaPix to control the composition.",
      },
      {
        q: "What size is the Etsy shop banner?",
        a: "The Etsy shop banner (big banner layout) is 1200×300 px. On mobile it may be cropped to a narrower height, so keep key content vertically centered. The mini banner layout is 1200×160 px.",
      },
      {
        q: "Does image quality affect Etsy search ranking?",
        a: "While Etsy does not directly rank by image quality, listings with high-quality, well-lit photos get more clicks and favorites, which are signals Etsy uses for ranking. Investing in good product photography pays off in search visibility.",
      },
      {
        q: "What file format should I use for Etsy?",
        a: "JPEG or PNG, under 20 MB per image. JPEG is best for product photos. PNG is useful for items with transparency needs (like digital downloads previews). Etsy does not support WebP uploads directly.",
      },
    ],
    related: ["shopify-product", "amazon", "ebay"],
  },

  // ─── BLOG HEADER ──────────────────────────────────────────────────────────
  {
    slug: "blog-header",
    name: "Blog Header",
    displayName: "Blog Header",
    titleKeyword: "Blog Header Images",
    metaDescription:
      "Resize images for blog headers — WordPress 1200×628, Medium 800×418, Ghost 1200×630. Free online tool, no upload required.",
    ogDescription:
      "Resize hero images for WordPress, Medium, Ghost, and any blog platform. Exact dimensions for beautiful featured images and Open Graph previews.",
    keywords: [
      "resize image for blog header",
      "wordpress featured image size",
      "medium blog image dimensions",
      "ghost blog header size",
      "blog hero image dimensions",
      "1200x628 blog image",
      "resize for blog post free",
      "blog featured image size 2026",
    ],
    sizes: [
      { type: "WordPress Featured", width: 1200, height: 628, note: "Standard featured image and OG preview" },
      { type: "Medium Header", width: 800, height: 418, note: "Medium.com article header" },
      { type: "Ghost Featured", width: 1200, height: 630, note: "Ghost CMS featured image" },
    ],
    steps: [
      "Open ResizePack, drop your image and select the Blog Header preset — WordPress, Medium, or Ghost.",
      "Blog headers also serve as Open Graph images when shared on social media. Make sure the key visual content is centered — Facebook and Twitter crop the edges slightly on different devices.",
      "Download and upload to your CMS. For WordPress, set as Featured Image in the post editor. For Medium, add as the first image in your draft. For Ghost, use the Feature Image field in post settings.",
    ],
    faqs: [
      {
        q: "What is the best WordPress featured image size?",
        a: "1200×628 px is the standard for WordPress featured images. This size works well as both the blog header and the Open Graph image when shared on Facebook (which uses 1.91:1 ratio). Many themes also display this size on archive and category pages.",
      },
      {
        q: "What size should a Medium article header be?",
        a: "Medium displays header images at 800 px wide with a height around 418 px (roughly 1.91:1). However, Medium crops differently on mobile vs desktop. Keep important content centered and avoid text in the image that might get cut off.",
      },
      {
        q: "Does the blog header image affect SEO?",
        a: "Indirectly, yes. A well-sized featured image becomes your Open Graph preview on social media, driving click-through rates. It also appears in Google Discover and image search. Add descriptive alt text and compress to under 200 KB for fast loading.",
      },
      {
        q: "Should I use the same image for blog header and social sharing?",
        a: "Yes — most CMS platforms use the featured image as the Open Graph image by default. Size it at 1200×628 px (WordPress) or 1200×630 px (Ghost) and it works perfectly for both the blog post and social media previews.",
      },
      {
        q: "How do I optimize blog header images for page speed?",
        a: "Resize to the exact dimensions your theme displays (usually 1200 px wide), compress to 100-200 KB with SammaPix, and use WebP format if your CMS supports it. This combination keeps your blog's Largest Contentful Paint (LCP) score fast.",
      },
    ],
    related: ["email-header", "linkedin", "facebook"],
  },
];

/** Map from slug to platform data */
const PLATFORMS_MAP = new Map<string, ResizePlatform>(
  ALL_PLATFORMS.map((p) => [p.slug, p])
);

export function getAllPlatforms(): ResizePlatform[] {
  return ALL_PLATFORMS;
}

export function getPlatform(slug: string): ResizePlatform | undefined {
  return PLATFORMS_MAP.get(slug);
}

export function getPlatformCanonical(slug: string): string {
  return `${APP_URL}/resize/${slug}`;
}
