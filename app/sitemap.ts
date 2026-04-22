import { MetadataRoute } from "next";
import { BLOG_SLUGS, APP_URL } from "@/lib/constants";
import { getAllPlatforms } from "@/lib/resize-platforms";
import { getAllOptimizePlatforms } from "@/lib/optimize-platforms";
import { getAllImageSizePlatforms } from "@/lib/image-size-platforms";
import { getAllTargets } from "@/lib/compress-targets";
import { getAllPassportPresets } from "@/lib/passport-presets";

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
    "/tools/passport-photo",
    "/tools/jpg-to-pdf",
    "/tools/jxl",
  ].map((route) => ({
    url: `${APP_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
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
  const portfolioPages: MetadataRoute.Sitemap = [
    {
      url: `${APP_URL}/about/sri-lanka-2025`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ];

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
    "/convert/raw-to-jpg",
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

  return [
    ...staticPages,
    ...toolPages,
    ...vsPages,
    ...blogPages,
    ...portfolioPages,
    ...resizePages,
    ...convertPages,
    ...compressToPages,
    ...optimizeForPages,
    ...imageSizePages,
    ...passportPhotoPages,
  ];
}
