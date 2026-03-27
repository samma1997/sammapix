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
