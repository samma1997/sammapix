import { APP_URL } from "@/lib/constants";

export interface ImageSizeEntry {
  type: string;
  width: number;
  height: number;
  ratio: string;
  note?: string;
}

export interface ImageSizeFaq {
  q: string;
  a: string;
}

export interface ImageSizePlatform {
  slug: string;
  name: string;
  displayName: string;
  metaDescription: string;
  titleKeyword: string;
  keywords: string[];
  sizes: ImageSizeEntry[];
  faqs: ImageSizeFaq[];
  related: string[];
  ogDescription: string;
  lastUpdated: string;
}

const ALL_IMAGE_SIZE_PLATFORMS: ImageSizePlatform[] = [
  // ─── LINKEDIN POST ──────────────────────────────────────────────────────
  {
    slug: "linkedin-post",
    name: "LinkedIn Post",
    displayName: "LinkedIn",
    titleKeyword: "LinkedIn",
    lastUpdated: "March 2026",
    metaDescription:
      "What size image for LinkedIn in 2026? Complete guide to LinkedIn post, article, profile, banner and company logo image dimensions. Updated March 2026.",
    ogDescription:
      "Complete guide to LinkedIn image sizes in 2026. Every dimension for posts, articles, profile photos, banners and company logos — with pixel-perfect specs.",
    keywords: [
      "linkedin image size",
      "linkedin post image dimensions",
      "linkedin banner size 2026",
      "linkedin profile photo size",
      "linkedin article cover image",
      "linkedin company logo size",
      "linkedin image dimensions guide",
      "what size image for linkedin",
      "linkedin image resolution",
      "linkedin post photo dimensions",
    ],
    sizes: [
      {
        type: "Post Image",
        width: 1200,
        height: 627,
        ratio: "1.91:1",
        note: "Standard feed post — displays in full without cropping",
      },
      {
        type: "Article Cover",
        width: 1920,
        height: 1080,
        ratio: "16:9",
        note: "LinkedIn article header — also used as link preview when sharing",
      },
      {
        type: "Profile Photo",
        width: 400,
        height: 400,
        ratio: "1:1",
        note: "Circular crop applied — keep subject centered, minimum 200x200",
      },
      {
        type: "Background Banner",
        width: 1584,
        height: 396,
        ratio: "4:1",
        note: "Profile header banner — bottom 120px may be hidden by profile card on mobile",
      },
      {
        type: "Company Logo",
        width: 300,
        height: 300,
        ratio: "1:1",
        note: "Company page logo — displayed at 60x60 in search, upload at 300x300 for clarity",
      },
    ],
    faqs: [
      {
        q: "What is the best image size for a LinkedIn post in 2026?",
        a: "1200x627 px is the optimal size for LinkedIn feed posts. This 1.91:1 ratio displays in full without any cropping on both desktop and mobile. LinkedIn compresses images on upload, so start with a high-quality file compressed with SammaPix for the sharpest result.",
      },
      {
        q: "What size should my LinkedIn profile photo be?",
        a: "Upload at 400x400 px minimum. LinkedIn displays profile photos in a circular crop at various sizes (60px in comments, 120px on your profile). A 400x400 source gives sharp results everywhere. Keep the file under 8 MB — LinkedIn's upload limit.",
      },
      {
        q: "What are the LinkedIn banner dimensions?",
        a: "1584x396 px is the recommended size for LinkedIn profile banners. On mobile, the bottom ~120px may be partially covered by your profile card, so keep important content in the upper two-thirds. Compress to under 200 KB for fast loading.",
      },
      {
        q: "Does LinkedIn support WebP images?",
        a: "LinkedIn accepts JPEG, PNG and GIF uploads. While LinkedIn's CDN may serve images in WebP to supported browsers, you should upload in JPEG format for the best compatibility. Compress with SammaPix before uploading to minimize quality loss from LinkedIn's own recompression.",
      },
      {
        q: "How do I prevent LinkedIn from cropping my images?",
        a: "Use the exact recommended dimensions: 1200x627 for posts, 1920x1080 for articles, 1584x396 for banners. LinkedIn crops images that do not match these ratios. Use SammaPix Crop to Ratio tool to pre-crop to the exact aspect ratio before uploading.",
      },
    ],
    related: ["twitter-post", "facebook-ad", "instagram-ad", "youtube-channel"],
  },

  // ─── FACEBOOK AD ────────────────────────────────────────────────────────
  {
    slug: "facebook-ad",
    name: "Facebook Ad",
    displayName: "Facebook Ads",
    titleKeyword: "Facebook Ads",
    lastUpdated: "March 2026",
    metaDescription:
      "What size image for Facebook Ads in 2026? Complete specs for News Feed, Carousel, Story and Right Column ad images. Updated March 2026 with Meta's latest requirements.",
    ogDescription:
      "Complete guide to Facebook Ad image sizes in 2026. Every dimension for News Feed, Carousel, Story and Right Column ads — Meta's official specs.",
    keywords: [
      "facebook ad image size",
      "facebook news feed ad dimensions",
      "facebook carousel ad size",
      "facebook story ad dimensions",
      "facebook ad image specs 2026",
      "facebook right column ad size",
      "meta ads image dimensions",
      "facebook ad creative size",
      "what size image for facebook ads",
      "facebook advertising image requirements",
    ],
    sizes: [
      {
        type: "News Feed Ad",
        width: 1200,
        height: 628,
        ratio: "1.91:1",
        note: "Primary feed placement — minimum 600x315, recommended 1200x628",
      },
      {
        type: "Carousel Card",
        width: 1080,
        height: 1080,
        ratio: "1:1",
        note: "Each carousel card is square — all cards must use the same ratio",
      },
      {
        type: "Story Ad",
        width: 1080,
        height: 1920,
        ratio: "9:16",
        note: "Full-screen vertical — keep text in safe zone (top/bottom 14% is UI overlay)",
      },
      {
        type: "Right Column",
        width: 254,
        height: 133,
        ratio: "1.91:1",
        note: "Desktop only, small format — keep visuals simple and text minimal",
      },
    ],
    faqs: [
      {
        q: "What is the recommended image size for Facebook News Feed ads?",
        a: "1200x628 px at a 1.91:1 ratio is the standard for single-image News Feed ads. Meta recommends at least 600x315 px minimum, but higher resolution produces sharper results on retina displays. Compress with SammaPix to under 150 KB for fast ad loading — slow ads reduce click-through rates.",
      },
      {
        q: "What size are Facebook Carousel ad images?",
        a: "Each carousel card must be 1080x1080 px (1:1 square ratio). Facebook requires all cards in a carousel to use the same aspect ratio. You can have 2-10 cards per carousel. Use SammaPix Batch Resize to prepare all cards at once.",
      },
      {
        q: "What are the Facebook Story ad dimensions?",
        a: "1080x1920 px in 9:16 vertical format. Keep important content (text, logos, CTA) within the center 1080x1420 px safe zone — the top and bottom 14% are covered by the profile name bar and swipe-up UI on most devices.",
      },
      {
        q: "Does Facebook compress ad images?",
        a: "Yes, Facebook recompresses all uploaded images. Starting with a high-quality, pre-compressed image from SammaPix reduces the double-compression artifacts that make ads look blurry. Upload at the exact recommended dimensions to prevent Facebook from rescaling and compressing simultaneously.",
      },
      {
        q: "What is the maximum file size for Facebook ad images?",
        a: "Meta allows up to 30 MB per image for ads, but recommends keeping files under 1 MB. In practice, images compressed to 100-200 KB with SammaPix load faster in the auction preview and in users' feeds — which can improve your ad quality score and reduce CPM.",
      },
    ],
    related: ["instagram-ad", "tiktok-ad", "linkedin-post", "pinterest-pin"],
  },

  // ─── GOOGLE ADS ─────────────────────────────────────────────────────────
  {
    slug: "google-ads",
    name: "Google Ads",
    displayName: "Google Ads",
    titleKeyword: "Google Ads",
    lastUpdated: "March 2026",
    metaDescription:
      "What size image for Google Ads in 2026? Complete Display Network dimensions — 300x250, 728x90, 320x50, 250x250 and more. Updated March 2026.",
    ogDescription:
      "Complete guide to Google Ads display image sizes in 2026. Every dimension for Display, Leaderboard, Mobile, Square and Large Rectangle formats.",
    keywords: [
      "google ads image size",
      "google display ad dimensions",
      "google ads banner size",
      "google ads leaderboard dimensions",
      "google ads mobile banner size",
      "google display network image specs",
      "google ads 300x250 size",
      "google ads image requirements 2026",
      "what size image for google ads",
      "google ads creative dimensions",
    ],
    sizes: [
      {
        type: "Medium Rectangle",
        width: 300,
        height: 250,
        ratio: "6:5",
        note: "Most popular display format — works on desktop and mobile placements",
      },
      {
        type: "Leaderboard",
        width: 728,
        height: 90,
        ratio: "728:90",
        note: "Horizontal banner — typically placed above page content on desktop",
      },
      {
        type: "Mobile Banner",
        width: 320,
        height: 50,
        ratio: "32:5",
        note: "Standard mobile ad unit — keep text large and readable at small size",
      },
      {
        type: "Square",
        width: 250,
        height: 250,
        ratio: "1:1",
        note: "Versatile square format — works in sidebars and between content",
      },
      {
        type: "Large Rectangle",
        width: 336,
        height: 280,
        ratio: "6:5",
        note: "Larger version of medium rectangle — higher engagement rates on desktop",
      },
    ],
    faqs: [
      {
        q: "What are the most popular Google Ads display sizes?",
        a: "The top 5 Google Display Network sizes by impression volume are: 300x250 (Medium Rectangle), 728x90 (Leaderboard), 320x50 (Mobile Banner), 336x280 (Large Rectangle), and 160x600 (Wide Skyscraper). Creating ads for at least the first three covers 70%+ of available inventory.",
      },
      {
        q: "What is the maximum file size for Google Ads images?",
        a: "Google Ads allows a maximum of 150 KB per display ad image. This strict limit makes pre-compression with SammaPix essential — a typical high-quality 300x250 image can easily be 200+ KB before optimization. Compress to 80% quality to stay well under the limit.",
      },
      {
        q: "Does Google Ads support WebP format?",
        a: "Yes, Google Ads accepts JPEG, PNG, GIF and WebP for display ads. WebP typically produces 25-30% smaller files than JPEG at the same quality — which helps you stay under the 150 KB limit while maintaining sharper visuals. Convert with SammaPix before uploading.",
      },
      {
        q: "How do I create responsive display ads for Google?",
        a: "For Google Responsive Display Ads, upload images at 1200x628 (landscape), 1200x1200 (square), and optionally 1200x300 (logo landscape). Google automatically adapts these to fit available placements. Compress all three sizes with SammaPix to ensure fast rendering across all placements.",
      },
      {
        q: "What is the best image format for Google Display ads?",
        a: "JPEG for photographs and lifestyle imagery, PNG for graphics with sharp edges or transparency, WebP for the best compression. All must be under 150 KB. Use SammaPix to compress — the Compress tool lets you adjust quality until you hit the target file size.",
      },
    ],
    related: ["facebook-ad", "linkedin-post", "twitter-post", "tiktok-ad"],
  },

  // ─── PINTEREST PIN ──────────────────────────────────────────────────────
  {
    slug: "pinterest-pin",
    name: "Pinterest Pin",
    displayName: "Pinterest",
    titleKeyword: "Pinterest",
    lastUpdated: "March 2026",
    metaDescription:
      "What size image for Pinterest pins in 2026? Complete guide to Standard, Square, Long and Infographic pin dimensions. Updated March 2026.",
    ogDescription:
      "Complete guide to Pinterest image sizes in 2026. Every dimension for Standard, Square, Long and Infographic pins — optimized for maximum engagement.",
    keywords: [
      "pinterest pin size",
      "pinterest image dimensions",
      "pinterest pin dimensions 2026",
      "pinterest infographic size",
      "pinterest standard pin size",
      "what size image for pinterest",
      "pinterest long pin dimensions",
      "pinterest square pin size",
      "pinterest image resolution",
      "pinterest pin aspect ratio",
    ],
    sizes: [
      {
        type: "Standard Pin",
        width: 1000,
        height: 1500,
        ratio: "2:3",
        note: "Optimal pin ratio — best visibility in the Pinterest feed",
      },
      {
        type: "Square Pin",
        width: 1000,
        height: 1000,
        ratio: "1:1",
        note: "Works well but takes less feed space than 2:3 — lower visibility",
      },
      {
        type: "Long Pin",
        width: 1000,
        height: 2100,
        ratio: "10:21",
        note: "Extended pin — Pinterest may truncate in feed, full view on click",
      },
      {
        type: "Infographic Pin",
        width: 1000,
        height: 3000,
        ratio: "1:3",
        note: "Maximum useful length — ideal for step-by-step content and tutorials",
      },
    ],
    faqs: [
      {
        q: "What is the best image size for Pinterest pins in 2026?",
        a: "1000x1500 px (2:3 ratio) is the optimal standard pin size. This ratio gets the most feed real estate without being truncated. Pinterest's algorithm favors 2:3 pins because they display fully in the feed — other ratios may be cropped or shown smaller.",
      },
      {
        q: "Does Pinterest crop images that are too long?",
        a: "Yes, Pinterest truncates pins taller than a ~2.1:1 height-to-width ratio in the feed. Users see the full image only when they tap to expand. For maximum feed visibility, stick to the 2:3 standard ratio (1000x1500). For tutorials and infographics, the 1:3 ratio (1000x3000) is acceptable but will be cropped in feed view.",
      },
      {
        q: "What image resolution does Pinterest recommend?",
        a: "Pinterest recommends a minimum width of 600px, but 1000px is optimal for sharp display on retina screens and desktop monitors. Images wider than 1000px are downscaled by Pinterest and waste upload bandwidth. Use SammaPix Resize to hit exactly 1000px wide.",
      },
      {
        q: "What file formats does Pinterest support?",
        a: "Pinterest supports JPEG, PNG, WebP, GIF (animated) and TIFF. JPEG compressed with SammaPix is the best choice for most pins — it produces the smallest file size while maintaining vibrant colors. Use PNG only for graphics with text overlay that needs crisp edges.",
      },
      {
        q: "How do I make Pinterest pins load faster?",
        a: "Compress your pin images to under 300 KB with SammaPix before uploading. Pinterest applies its own compression, but starting with a smaller file produces better results. Faster-loading pins get higher engagement scores in Pinterest's algorithm, which leads to more distribution.",
      },
    ],
    related: ["instagram-ad", "facebook-ad", "tiktok-ad", "twitter-post"],
  },

  // ─── TWITTER POST ───────────────────────────────────────────────────────
  {
    slug: "twitter-post",
    name: "Twitter/X Post",
    displayName: "Twitter / X",
    titleKeyword: "Twitter (X)",
    lastUpdated: "March 2026",
    metaDescription:
      "What size image for Twitter (X) in 2026? Complete guide to tweet images, in-stream photos, profile headers and profile pictures. Updated March 2026.",
    ogDescription:
      "Complete guide to Twitter (X) image sizes in 2026. Every dimension for tweets, in-stream photos, profile headers and profile pictures.",
    keywords: [
      "twitter image size",
      "x image dimensions",
      "twitter post image size 2026",
      "twitter header image size",
      "twitter profile photo dimensions",
      "what size image for twitter",
      "x post image dimensions",
      "twitter image resolution",
      "twitter card image size",
      "twitter in stream photo size",
    ],
    sizes: [
      {
        type: "Single Image Tweet",
        width: 1600,
        height: 900,
        ratio: "16:9",
        note: "Displays in full in the timeline — most common tweet image format",
      },
      {
        type: "In-Stream Photo",
        width: 1600,
        height: 900,
        ratio: "16:9",
        note: "Same as single image — Twitter/X crops to 16:9 in the feed",
      },
      {
        type: "Profile Header",
        width: 1500,
        height: 500,
        ratio: "3:1",
        note: "Banner behind profile picture — bottom-left area covered by avatar on desktop",
      },
      {
        type: "Profile Picture",
        width: 400,
        height: 400,
        ratio: "1:1",
        note: "Circular crop — displayed at 48px in timeline, upload 400x400 for clarity",
      },
    ],
    faqs: [
      {
        q: "What is the best image size for a tweet in 2026?",
        a: "1600x900 px (16:9 ratio) is the optimal size for single-image tweets on Twitter/X. This displays in full without cropping in the timeline. Twitter recompresses all uploaded images — pre-compressing with SammaPix at 85% quality minimizes the double-compression blur that makes tweet images look muddy.",
      },
      {
        q: "What size is the Twitter/X profile header?",
        a: "1500x500 px (3:1 ratio). On desktop, the bottom-left corner is covered by your profile picture and name. On mobile, the header is cropped to roughly the center portion. Keep critical content centered and in the upper half. Compress to under 200 KB with SammaPix.",
      },
      {
        q: "Does Twitter/X support WebP images?",
        a: "Twitter/X accepts JPEG, PNG, GIF and WebP uploads. However, Twitter converts most images to JPEG on its servers regardless of upload format. Upload in JPEG compressed with SammaPix for the most predictable quality — this avoids the double-conversion from WebP to JPEG that can introduce artifacts.",
      },
      {
        q: "How does Twitter/X crop images in the timeline?",
        a: "Twitter/X crops single-image tweets to 16:9 in the timeline. Multi-image tweets use different crops depending on the number of images (2 images: vertical split, 3-4 images: grid layout). For predictable display, use SammaPix Crop to Ratio to pre-crop to 16:9 before tweeting.",
      },
      {
        q: "What is the maximum image file size on Twitter/X?",
        a: "Twitter/X allows up to 5 MB for photos (JPEG/PNG/WebP) and 15 MB for GIFs. However, larger files take longer to upload and are more aggressively recompressed by Twitter. Keeping images under 500 KB with SammaPix produces the sharpest final result after Twitter's server-side processing.",
      },
    ],
    related: ["linkedin-post", "facebook-ad", "instagram-ad", "pinterest-pin"],
  },

  // ─── YOUTUBE CHANNEL ────────────────────────────────────────────────────
  {
    slug: "youtube-channel",
    name: "YouTube Channel",
    displayName: "YouTube",
    titleKeyword: "YouTube",
    lastUpdated: "March 2026",
    metaDescription:
      "What size image for YouTube in 2026? Complete guide to thumbnails, channel art banners and profile pictures. Updated March 2026 with YouTube's latest specs.",
    ogDescription:
      "Complete guide to YouTube image sizes in 2026. Every dimension for thumbnails, channel art and profile pictures — pixel-perfect specs for maximum clicks.",
    keywords: [
      "youtube thumbnail size",
      "youtube channel art dimensions",
      "youtube profile picture size",
      "youtube banner size 2026",
      "youtube image dimensions guide",
      "what size image for youtube",
      "youtube video thumbnail dimensions",
      "youtube channel art safe area",
      "youtube image resolution",
      "youtube thumbnail dimensions 2026",
    ],
    sizes: [
      {
        type: "Video Thumbnail",
        width: 1280,
        height: 720,
        ratio: "16:9",
        note: "Custom thumbnail — minimum 640px wide, 2 MB max file size",
      },
      {
        type: "Channel Art / Banner",
        width: 2560,
        height: 1440,
        ratio: "16:9",
        note: "Safe area for all devices is 1546x423 px centered — text and logos must fit within this zone",
      },
      {
        type: "Profile Picture",
        width: 800,
        height: 800,
        ratio: "1:1",
        note: "Displayed as circle at 98px on desktop — upload 800x800 for retina clarity",
      },
    ],
    faqs: [
      {
        q: "What is the best YouTube thumbnail size in 2026?",
        a: "1280x720 px (16:9 ratio) is the standard YouTube custom thumbnail size. YouTube requires a minimum width of 640px and a maximum file size of 2 MB. Compress with SammaPix to keep thumbnails under 200 KB while maintaining the sharp, vibrant look that drives clicks.",
      },
      {
        q: "What is the YouTube channel art safe area?",
        a: "YouTube channel art should be 2560x1440 px, but the safe area (visible on all devices including mobile and TV) is only 1546x423 px centered within that canvas. Place your channel name, tagline and links within this safe zone. Use SammaPix Resize to create the exact canvas size.",
      },
      {
        q: "How do I make YouTube thumbnails that get more clicks?",
        a: "Three visual principles: (1) use high-contrast colors that stand out in the feed, (2) include a face with expressive emotion — thumbnails with faces get 38% higher CTR, (3) add 3-5 words of large, bold text. Compress the final image with SammaPix to under 200 KB so it loads instantly in search results.",
      },
      {
        q: "What format should YouTube thumbnails be?",
        a: "YouTube accepts JPEG, PNG, GIF and BMP for thumbnails. JPEG is the best choice for photo-based thumbnails (smaller file size), while PNG is better for graphic-heavy thumbnails with text overlay (sharper edges). Compress either format with SammaPix before uploading.",
      },
      {
        q: "Can I change my YouTube thumbnail after publishing?",
        a: "Yes, you can change custom thumbnails at any time in YouTube Studio. Many creators A/B test thumbnails to improve CTR. When creating multiple thumbnail versions, use SammaPix Batch Resize to prepare them all at 1280x720 and compress in one batch.",
      },
    ],
    related: ["tiktok-ad", "twitter-post", "instagram-ad", "facebook-ad"],
  },

  // ─── TIKTOK AD ──────────────────────────────────────────────────────────
  {
    slug: "tiktok-ad",
    name: "TikTok Ad",
    displayName: "TikTok Ads",
    titleKeyword: "TikTok Ads",
    lastUpdated: "March 2026",
    metaDescription:
      "What size image for TikTok Ads in 2026? Complete specs for In-Feed, TopView and Brand Takeover ad formats. Updated March 2026 with TikTok's latest requirements.",
    ogDescription:
      "Complete guide to TikTok Ad image sizes in 2026. Every dimension for In-Feed, TopView and Brand Takeover ad formats — TikTok's official specs.",
    keywords: [
      "tiktok ad image size",
      "tiktok in feed ad dimensions",
      "tiktok topview ad size",
      "tiktok brand takeover dimensions",
      "tiktok ad creative specs 2026",
      "what size image for tiktok ads",
      "tiktok advertising image size",
      "tiktok ad format dimensions",
      "tiktok ad image requirements",
      "tiktok ad creative size guide",
    ],
    sizes: [
      {
        type: "In-Feed Ad",
        width: 1080,
        height: 1920,
        ratio: "9:16",
        note: "Full-screen vertical — same as organic TikTok video format",
      },
      {
        type: "TopView Ad",
        width: 1080,
        height: 1920,
        ratio: "9:16",
        note: "First ad users see when opening TikTok — maximum impact placement",
      },
      {
        type: "Brand Takeover",
        width: 1080,
        height: 1920,
        ratio: "9:16",
        note: "Full-screen static or animated — displays for 3-5 seconds before feed loads",
      },
    ],
    faqs: [
      {
        q: "What is the recommended image size for TikTok In-Feed ads?",
        a: "1080x1920 px (9:16 vertical ratio) is the standard for TikTok In-Feed ads. This matches the full-screen mobile experience. While TikTok also supports 1:1 and 16:9 formats, 9:16 vertical produces the highest engagement because it fills the entire screen without black bars.",
      },
      {
        q: "What is the difference between TikTok TopView and Brand Takeover?",
        a: "Both use 1080x1920 px dimensions. TopView ads appear as the first in-feed post when users open TikTok (up to 60 seconds, video or static). Brand Takeover ads display a full-screen static or animated image for 3-5 seconds before any content loads. Brand Takeover is more intrusive and exclusive — only one advertiser per category per day.",
      },
      {
        q: "What file formats does TikTok accept for ad images?",
        a: "TikTok accepts JPEG and PNG for static image ads. For best results, use JPEG compressed with SammaPix — TikTok's ad platform recompresses uploads, so starting with an optimized file preserves more quality. Keep static images under 500 KB.",
      },
      {
        q: "How do I create TikTok ad images that convert?",
        a: "TikTok ads perform best when they look like organic content. Avoid polished, corporate-looking creatives. Use bright, high-contrast visuals with bold text overlays. Keep the safe zone in mind — TikTok's UI covers the bottom 150px and top 130px. Compress with SammaPix to ensure fast loading on mobile data connections.",
      },
      {
        q: "Does TikTok support carousel image ads?",
        a: "Yes, TikTok Carousel Ads support 2-35 images at 1080x1920 px each. Each card can have its own landing page URL. Use SammaPix Batch Resize to prepare all carousel images at once, then compress them under 500 KB each for the fastest swipe experience.",
      },
    ],
    related: ["instagram-ad", "facebook-ad", "pinterest-pin", "youtube-channel"],
  },

  // ─── INSTAGRAM AD ───────────────────────────────────────────────────────
  {
    slug: "instagram-ad",
    name: "Instagram Ad",
    displayName: "Instagram Ads",
    titleKeyword: "Instagram Ads",
    lastUpdated: "March 2026",
    metaDescription:
      "What size image for Instagram Ads in 2026? Complete specs for Feed, Story, Carousel and Reels ad images. Updated March 2026 with Meta's latest requirements.",
    ogDescription:
      "Complete guide to Instagram Ad image sizes in 2026. Every dimension for Feed, Story, Carousel and Reels ads — Meta's official specs for maximum engagement.",
    keywords: [
      "instagram ad image size",
      "instagram feed ad dimensions",
      "instagram story ad size",
      "instagram carousel ad dimensions",
      "instagram reels ad image size",
      "what size image for instagram ads",
      "instagram advertising image specs",
      "instagram ad creative dimensions 2026",
      "instagram ad image requirements",
      "instagram sponsored post image size",
    ],
    sizes: [
      {
        type: "Feed Ad",
        width: 1080,
        height: 1080,
        ratio: "1:1",
        note: "Square feed ad — highest engagement format, works in feed and Explore",
      },
      {
        type: "Story Ad",
        width: 1080,
        height: 1920,
        ratio: "9:16",
        note: "Full-screen vertical — keep CTA above bottom 250px (swipe-up zone)",
      },
      {
        type: "Carousel Ad",
        width: 1080,
        height: 1080,
        ratio: "1:1",
        note: "Each card must be the same ratio — square is default, 4:5 also supported",
      },
      {
        type: "Reels Ad",
        width: 1080,
        height: 1920,
        ratio: "9:16",
        note: "Full-screen vertical — same format as organic Reels, blends into feed",
      },
    ],
    faqs: [
      {
        q: "What is the best image size for Instagram feed ads?",
        a: "1080x1080 px (1:1 square) is the most versatile Instagram ad format — it works in Feed, Explore and Search placements. Instagram also supports 1080x1350 (4:5 portrait) which takes up more screen space in the feed and can increase engagement by 15-20% compared to square.",
      },
      {
        q: "What size are Instagram Story ads?",
        a: "1080x1920 px (9:16 ratio) for full-screen display. Keep important content within the center safe zone — the top 14% (username bar) and bottom 250px (swipe-up CTA) are covered by Instagram's UI. Compress with SammaPix to under 250 KB for instant loading between organic Stories.",
      },
      {
        q: "What is the Instagram Carousel ad image size?",
        a: "Each carousel card should be 1080x1080 px (1:1). Instagram requires all cards to use the same aspect ratio. You can use 2-10 cards per carousel. Use SammaPix Batch Resize to prepare all cards at the same dimensions and compress them simultaneously.",
      },
      {
        q: "How do I make Instagram ad images that stand out?",
        a: "Three principles: (1) use scroll-stopping visuals with high contrast against Instagram's white feed background, (2) keep text minimal — Instagram's old 20% text rule is relaxed but text-heavy images still perform worse, (3) include a clear focal point. Compress with SammaPix to ensure the image looks sharp after Instagram's recompression.",
      },
      {
        q: "Does Instagram compress ad images?",
        a: "Yes, Instagram recompresses all uploaded images regardless of original quality. This means pre-compressing with SammaPix at 85% quality actually produces a sharper final result — you control the compression instead of letting Instagram's aggressive algorithm decide. Upload at exact recommended dimensions to avoid rescaling artifacts.",
      },
    ],
    related: ["facebook-ad", "tiktok-ad", "pinterest-pin", "twitter-post"],
  },
];

// ─── Lookup map ──────────────────────────────────────────────────────────────

const IMAGE_SIZE_MAP = new Map<string, ImageSizePlatform>(
  ALL_IMAGE_SIZE_PLATFORMS.map((p) => [p.slug, p])
);

export function getAllImageSizePlatforms(): ImageSizePlatform[] {
  return ALL_IMAGE_SIZE_PLATFORMS;
}

export function getImageSizePlatform(
  slug: string
): ImageSizePlatform | undefined {
  return IMAGE_SIZE_MAP.get(slug);
}

export function getImageSizePlatformCanonical(slug: string): string {
  return `${APP_URL}/image-size/${slug}`;
}
