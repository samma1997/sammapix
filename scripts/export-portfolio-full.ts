import { writeFileSync, mkdirSync } from "fs";
import { v2 as cloudinary } from "cloudinary";
import { getAllTrips } from "../lib/destinations";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const publicId = (url: string) => {
  const m = url.match(/\/v\d+\/(.+)$/);
  return m ? m[1] : "";
};

const trips = getAllTrips();
const flat: Array<Record<string, unknown>> = [];
for (const t of trips) {
  for (const p of t.photos) {
    flat.push({
      trip: t.destination ?? t.slug,
      tripSlug: t.slug,
      photoId: p.id,
      location: p.location,
      date: p.date,
      alt: p.alt,
      caption: p.caption,
      description: p.description,
      src: p.src,
      pid: publicId(p.src),
      width: p.width,
      height: p.height,
    });
  }
}

// EXIF fields to pull
const EXIF = ["Make","Model","LensModel","Lens","LensInfo","FocalLength","FocalLengthIn35mmFormat","FNumber","ApertureValue","ExposureTime","ShutterSpeedValue","ISO","ExposureProgram","ExposureMode","ExposureCompensation","MeteringMode","WhiteBalance","Flash","ColorSpace","DateTimeOriginal","GPSLatitude","GPSLongitude"];

async function pull(pid: string) {
  try {
    const r = await cloudinary.api.resource(pid, { image_metadata: true });
    const m = (r.image_metadata || {}) as Record<string, string>;
    const out: Record<string, string> = {};
    for (const k of EXIF) if (m[k] !== undefined) out[k] = m[k];
    return out;
  } catch {
    return {};
  }
}

// concurrency limit
async function run() {
  const CONC = 12;
  let i = 0, done = 0, withExif = 0;
  async function worker() {
    while (i < flat.length) {
      const idx = i++;
      const row = flat[idx];
      const ex = await pull(row.pid as string);
      Object.assign(row, ex);
      if (ex.FocalLength || ex.ISO) withExif++;
      done++;
      if (done % 50 === 0) process.stdout.write(`  ${done}/${flat.length}\n`);
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));
  return withExif;
}

async function main() {
  const withExif = await run();

  mkdirSync("export", { recursive: true });
  writeFileSync("export/portfolio-full.json", JSON.stringify(flat, null, 2));

  const cols = ["trip","tripSlug","photoId","location","date","alt","caption","description","Make","Model","LensModel","FocalLength","FocalLengthIn35mmFormat","FNumber","ExposureTime","ISO","ExposureProgram","MeteringMode","WhiteBalance","Flash","DateTimeOriginal","GPSLatitude","GPSLongitude","width","height","src"];
  const esc = (v: unknown) => `"${(v === undefined || v === null ? "" : String(v)).replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
  const csv = [cols.join(","), ...flat.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
  writeFileSync("export/portfolio-full.csv", csv);

  console.log(`\nFoto totali: ${flat.length}`);
  console.log(`Con EXIF (focale/ISO): ${withExif}`);
  console.log(`Senza EXIF: ${flat.length - withExif}`);
  console.log(`Scritti: export/portfolio-full.json  ·  export/portfolio-full.csv`);
}

main();
