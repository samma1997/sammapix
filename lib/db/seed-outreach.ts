import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {
  growthOutreachTargets,
  growthDirectorySubmissions,
} from "./schema";

async function seed() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");

  const sql = neon(url);
  const db = drizzle(sql);

  console.log("Seeding outreach targets...");

  const outreachTargets = [
    {
      siteName: "BloggingWizard",
      articleTitle: "10 Best Image Compression Tools 2026",
      articleUrl: "https://bloggingwizard.com/contact",
      contactName: "Adam Connell",
      contactEmail: null,
      contactLinkedin: null,
      status: "to_send",
    },
    {
      siteName: "ThemeIsle",
      articleTitle: "11 Best Online Image Optimizer Tools",
      articleUrl: "https://themeisle.com/contact",
      contactName: "Priya",
      contactEmail: null,
      contactLinkedin: null,
      status: "to_send",
    },
    {
      siteName: "DEV Community",
      articleTitle: "7 Best Image Compressors 2026",
      articleUrl: "https://dev.to/isuatfurkan",
      contactName: "Suat Furkan",
      contactEmail: null,
      contactLinkedin: null,
      status: "to_send",
    },
    {
      siteName: "Aftershoot",
      articleTitle: "8 Best Lossless Compression Tools",
      articleUrl: null,
      contactName: "Team",
      contactEmail: "hello@aftershoot.com",
      contactLinkedin: null,
      status: "to_send",
    },
    {
      siteName: "TinyIMG",
      articleTitle: "15 Best TinyPNG Alternatives",
      articleUrl: "https://tiny-img.com",
      contactName: "Vita Klimaite",
      contactEmail: null,
      contactLinkedin: null,
      status: "to_send",
    },
    {
      siteName: "Aiarty",
      articleTitle: "Top 10 TinyPNG Alternatives",
      articleUrl: "https://aiarty.com",
      contactName: "Brenda Peng",
      contactEmail: null,
      contactLinkedin: null,
      status: "to_send",
    },
    {
      siteName: "ShortPixel",
      articleTitle: "Best PNG Compressor Alternatives",
      articleUrl: null,
      contactName: "Andrei Alba",
      contactEmail: "aalba@shortpixel.com",
      contactLinkedin: null,
      status: "to_send",
    },
    {
      siteName: "IORiver",
      articleTitle: "Best 10 Image Optimization Tools",
      articleUrl: "https://ioriver.io/contact",
      contactName: "Rostyslav",
      contactEmail: null,
      contactLinkedin: null,
      status: "to_send",
    },
    {
      siteName: "DEV Community",
      articleTitle: "11 Free Image Tools for Frontend",
      articleUrl: "https://dev.to/joywinter90",
      contactName: "Joy Winter",
      contactEmail: null,
      contactLinkedin: null,
      status: "to_send",
    },
    {
      siteName: "Shrink.media",
      articleTitle: "20 Best Compression Tools",
      articleUrl: "https://shrink.media",
      contactName: "PixelBin",
      contactEmail: null,
      contactLinkedin: null,
      status: "to_send",
    },
    {
      siteName: "Showit",
      articleTitle: "Best Image Optimization Tools 2025",
      articleUrl: "https://showit.com",
      contactName: "Team",
      contactEmail: null,
      contactLinkedin: null,
      status: "to_send",
    },
    {
      siteName: "Wondershare",
      articleTitle: "7 Best HEIC Converter Online",
      articleUrl: "https://wondershare.com",
      contactName: "Axel Nash",
      contactEmail: null,
      contactLinkedin: null,
      status: "to_send",
    },
    {
      siteName: "Coolmuster",
      articleTitle: "12 Best HEIC to JPG Converter",
      articleUrl: "https://coolmuster.com/contact",
      contactName: "Brandon Wood",
      contactEmail: null,
      contactLinkedin: null,
      status: "to_send",
    },
    {
      siteName: "OPT-IMG",
      articleTitle: "Best Batch Processing Tools 2026",
      articleUrl: "https://opt-img.com",
      contactName: "Team",
      contactEmail: null,
      contactLinkedin: null,
      status: "to_send",
    },
    {
      siteName: "ClippingPathExperts",
      articleTitle: "Best Free Batch Image Resizer",
      articleUrl: null,
      contactName: "Ahmed Efaz",
      contactEmail: "info@clippingpathexperts.com",
      contactLinkedin: null,
      status: "to_send",
    },
    {
      siteName: "WhatSoftware",
      articleTitle: "10 Best Free Batch Image Resizer",
      articleUrl: "https://whatsoftware.com/contact",
      contactName: "HAL9000",
      contactEmail: null,
      contactLinkedin: null,
      status: "to_send",
    },
    {
      siteName: "QuickToolsHQ",
      articleTitle: "Best Free Compression Tools 2025",
      articleUrl: null,
      contactName: "Team",
      contactEmail: "hello@quicktoolshq.com",
      contactLinkedin: null,
      status: "to_send",
    },
  ];

  for (const target of outreachTargets) {
    await db
      .insert(growthOutreachTargets)
      .values(target)
      .onConflictDoNothing();
  }

  console.log(`Inserted ${outreachTargets.length} outreach targets`);

  console.log("Seeding directory submissions...");

  const directories = [
    {
      directoryName: "G2",
      directoryUrl: "https://g2.com",
      status: "listed",
    },
    {
      directoryName: "SaaSHub",
      directoryUrl: "https://saashub.com",
      status: "listed",
    },
    {
      directoryName: "AlternativeTo",
      directoryUrl: "https://alternativeto.net",
      status: "submitted",
    },
    {
      directoryName: "Uneed",
      directoryUrl: "https://uneed.best",
      status: "submitted",
    },
    {
      directoryName: "Capterra",
      directoryUrl: "https://capterra.com",
      status: "to_submit",
    },
    {
      directoryName: "Product Hunt",
      directoryUrl: "https://producthunt.com",
      status: "to_submit",
    },
  ];

  for (const dir of directories) {
    await db
      .insert(growthDirectorySubmissions)
      .values(dir)
      .onConflictDoNothing();
  }

  console.log(`Inserted ${directories.length} directory submissions`);
  console.log("Seed complete.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
