import { MetadataRoute } from "next";
import { BLOG_SLUGS, APP_URL } from "@/lib/constants";
import { getAllPlatforms } from "@/lib/resize-platforms";
import { getAllOptimizePlatforms } from "@/lib/optimize-platforms";
import { getAllImageSizePlatforms } from "@/lib/image-size-platforms";
import { getAllTargets } from "@/lib/compress-targets";
import { getAllVideoTargets } from "@/lib/video-targets";
import { getAllRatios } from "@/lib/crop-ratios";
import { getAllPassportPresets } from "@/lib/passport-presets";
import { getAllTrips } from "@/lib/destinations";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages with different priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${APP_URL}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${APP_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${APP_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${APP_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${APP_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/chrome`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${APP_URL}/glossary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${APP_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${APP_URL}/convert`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${APP_URL}/compress-to`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${APP_URL}/resize`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${APP_URL}/optimize-for`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${APP_URL}/image-size`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${APP_URL}/passport-photo`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${APP_URL}/vs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = [
    "/tools/compress",
    "/tools/webp",
    "/tools/png-to-jpg",
    "/tools/webp-to-jpg",
    "/tools/webp-to-png",
    "/tools/svg-to-png",
    "/tools/gif-to-mp4",
    "/tools/ico-generator",
    "/tools/pdf-merge",
    "/tools/color-picker",
    "/tools/ai-rename",
    "/tools/alt-text",
    "/tools/exif",
    "/tools/filmlab",
    "/tools/stampit",
    "/tools/croproatio",
    "/tools/twinhunt",
    "/tools/geosort",
    "/tools/travelmap",
    "/tools/resizepack",
    "/tools/cull",
    "/tools/heic",
    "/tools/transcribe",
    "/tools/weblift",
    "/tools/blogdrop",
    "/tools/batchname",
    "/tools/smartsort",
    "/tools/ai-organize",
    "/tools/image-to-text",
    "/tools/pdf-to-image",
    "/tools/remove-bg",
    "/tools/upscale",
    "/tools/photo-enhance",
    "/tools/color-match",
    "/tools/passport-photo",
    "/tools/jpg-to-pdf",
    "/tools/jxl",
    "/tools/unrar",
    "/tools/open-7z",
    "/tools/zip-creator",
    "/tools/tar-gz",
    "/tools/raw-converter",
    "/tools/pdf-split",
    "/tools/blur-censor",
    "/tools/redact-pdf",
    "/tools/compress-video",
    "/tools/convert-video",
    "/tools/video-to-gif",
    "/tools/mute-video",
    "/tools/resize-video",
    "/tools/trim-video",
    "/tools/extract-audio",
    "/tools/instagram-grid-splitter",
    "/tools/pdf-compress",
    "/tools/pdf-rotate",
    "/tools/pdf-unlock",
    "/tools/pdf-page-numbers",
    "/tools/pdf-protect",
    "/tools/rotate-image",
    "/tools/flip-image",
    "/tools/add-border",
    "/tools/round-image",
    "/tools/add-text-to-image",
    "/tools/image-to-base64",
    "/tools/collage-maker",
    "/tools/remove-pdf-pages",
    "/tools/pdf-watermark",
    "/tools/pdf-sign",
    "/tools/pdf-organize",
    "/tools/crop-pdf",
    "/tools/flatten-pdf",
    "/tools/txt-to-pdf",
  ].map((route) => ({
    url: `${APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Italian (it) translated pages. Additive: English URLs above are unchanged.
  // Each entry declares its language alternates for correct hreflang in the sitemap.
  const italianPages: MetadataRoute.Sitemap = [
    {
      en: "",
      it: "/it",
    },
    {
      en: "/tools/compress",
      it: "/it/tools/comprimere-immagini",
    },
    {
      en: "/compress-to",
      it: "/it/comprimi-a-dimensione",
    },
    {
      en: "/resize",
      it: "/it/ridimensionare-immagini",
    },
    {
      en: "/convert",
      it: "/it/convertire-immagini",
    },
    {
      en: "/about",
      it: "/it/chi-siamo",
    },
    {
      en: "/portfolio",
      it: "/it/portfolio",
    },
    {
      en: "/blog",
      it: "/it/blog",
    },
    {
      en: "/pricing",
      it: "/it/prezzi",
    },
    {
      en: "/privacy",
      it: "/it/privacy",
    },
    {
      en: "/terms",
      it: "/it/termini",
    },
    {
      en: "/passport-photo",
      it: "/it/foto-tessera",
    },
  ].map(({ en, it }) => ({
    url: `${APP_URL}${it}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
    alternates: {
      languages: {
        en: `${APP_URL}${en}`,
        it: `${APP_URL}${it}`,
      },
    },
  }));

  // Italian compress-to size leaf pages (programmatic, from getAllTargets)
  const italianCompressToLeaf: MetadataRoute.Sitemap = getAllTargets().map((t) => ({
    url: `${APP_URL}/it/comprimi-a/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
    alternates: {
      languages: {
        en: `${APP_URL}/compress-to/${t.slug}`,
        it: `${APP_URL}/it/comprimi-a/${t.slug}`,
      },
    },
  }));

  // Italian blog articles (net-new Italian content, no English equivalent)
  const italianBlog: MetadataRoute.Sitemap = [
    "come-cancellare-i-metadati-di-una-foto",
    "come-convertire-una-foto-in-pdf",
    "come-togliere-lo-sfondo-da-una-foto",
    "come-ridurre-peso-di-una-foto",
    "come-convertire-heic-in-jpg",
    "come-ridimensionare-una-foto",
    "come-convertire-webp-in-jpg",
    "come-fare-una-foto-tessera-a-casa",
  ].map((slug) => ({
    url: `${APP_URL}/it/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // VS comparison pages (12 total)
  const vsPages: MetadataRoute.Sitemap = [
    "/vs/tinypng",
    "/vs/squoosh",
    "/vs/imageoptim",
    "/vs/compressor-io",
    "/vs/iloveimg",
    "/vs/vsco",
    "/vs/filterpixel",
    "/vs/shortpixel",
    "/vs/canva",
    "/vs/photopea",
    "/vs/birme",
    "/vs/optimizilla",
  ].map((route) => ({
    url: `${APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog pages (14 total)
  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${APP_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Portfolio sub-pages
  // About/trip pages- driven from lib/destinations.ts (auto-include new trips)
  const portfolioPages: MetadataRoute.Sitemap = getAllTrips().map((t) => ({
    url: `${APP_URL}/about/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Programmatic resize pages- driven from lib/resize-platforms.ts
  const resizePages: MetadataRoute.Sitemap = getAllPlatforms().map((p) => ({
    url: `${APP_URL}/resize/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Convert sub-pages
  const convertPages: MetadataRoute.Sitemap = [
    "/convert/heic-to-jpg",
    "/convert/heic-to-png",
    "/convert/png-to-webp",
    "/convert/jpg-to-webp",
    "/convert/jpeg-to-webp",
    "/convert/webp-to-jpg",
    "/convert/png-to-jpg",
    "/convert/gif-to-webp",
    "/convert/webp-to-png",
    "/convert/avif-to-jpg",
    "/convert/tiff-to-jpg",
    "/convert/svg-to-png",
    "/convert/bmp-to-jpg",
    "/convert/jpg-to-png",
    "/convert/png-to-ico",
    "/convert/webp-to-gif",
    "/convert/arw-to-jpg",
    "/convert/nef-to-jpg",
    "/convert/dng-to-jpg",
    "/convert/raw-to-jpg",
    "/convert/cr2-to-jpg",
    "/convert/tiff-to-png",
    "/convert/bmp-to-png",
    "/convert/gif-to-jpg",
    "/convert/avif-to-png",
    "/convert/heic-to-webp",
    "/convert/svg-to-jpg",
    "/convert/jxl-to-jpg",
    "/convert/jxl-to-png",
    "/convert/jxl-to-webp",
    "/convert/jpg-to-jxl",
    "/convert/png-to-jxl",
    "/convert/webp-to-jxl",
    "/convert/mov-to-mp4",
    "/convert/avi-to-mp4",
    "/convert/mkv-to-mp4",
    "/convert/webm-to-mp4",
    "/convert/mp4-to-mp3",
    "/convert/mov-to-mp3",
    "/convert/webm-to-mp3",
    "/convert/video-to-mp3",
  ].map((route) => ({
    url: `${APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Programmatic compress-to pages — driven from lib/compress-targets.ts
  const compressToPages: MetadataRoute.Sitemap = getAllTargets().map((t) => ({
    url: `${APP_URL}/compress-to/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Programmatic compress-video-for pages — driven from lib/video-targets.ts
  // (compress-video-for pages are driven from the registry below)
  const compressVideoForPages: MetadataRoute.Sitemap = getAllVideoTargets().map((t) => ({
    url: `${APP_URL}/compress-video/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Programmatic optimize-for pages — driven from lib/optimize-platforms.ts
  const optimizeForPages: MetadataRoute.Sitemap = getAllOptimizePlatforms().map(
    (p) => ({
      url: `${APP_URL}/optimize-for/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })
  );

  // Programmatic image-size pages — driven from lib/image-size-platforms.ts
  const imageSizePages: MetadataRoute.Sitemap = getAllImageSizePlatforms().map(
    (p) => ({
      url: `${APP_URL}/image-size/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })
  );

  // Programmatic passport-photo pages — driven from lib/passport-photo.ts
  const passportPhotoPages: MetadataRoute.Sitemap = getAllPassportPresets().map(
    (p) => ({
      url: `${APP_URL}/passport-photo/${p.country}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  // Programmatic crop pages — driven from lib/crop-ratios.ts
  const cropPages: MetadataRoute.Sitemap = [
    {
      url: `${APP_URL}/crop`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...getAllRatios().map((r) => ({
      url: `${APP_URL}/crop/${r.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  return [
    ...staticPages,
    ...toolPages,
    ...italianPages,
    ...italianCompressToLeaf,
    ...italianBlog,
    ...vsPages,
    ...blogPages,
    ...portfolioPages,
    ...resizePages,
    ...convertPages,
    ...compressToPages,
    ...compressVideoForPages,
    ...optimizeForPages,
    ...imageSizePages,
    ...passportPhotoPages,
    ...cropPages,
  ];
}
