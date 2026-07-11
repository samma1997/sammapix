import { writeFileSync, mkdirSync } from "fs";
import { getAllTrips } from "../lib/destinations";

const trips = getAllTrips();

type Row = {
  trip: string;
  tripSlug: string;
  photoId: string;
  location: string;
  date: string;
  alt: string;
  caption: string;
  description: string;
  src: string;
  width?: number;
  height?: number;
};

const rows: Row[] = [];
for (const t of trips) {
  for (const p of t.photos) {
    rows.push({
      trip: t.destination ?? t.slug,
      tripSlug: t.slug,
      photoId: p.id,
      location: p.location,
      date: p.date,
      alt: p.alt,
      caption: p.caption,
      description: p.description,
      src: p.src,
      width: p.width,
      height: p.height,
    });
  }
}

mkdirSync("export", { recursive: true });

// JSON
writeFileSync("export/portfolio-descriptions.json", JSON.stringify(rows, null, 2));

// CSV (escape virgolette e newline)
const cols = ["trip", "tripSlug", "photoId", "location", "date", "alt", "caption", "description", "src", "width", "height"] as const;
const esc = (v: unknown) => {
  const s = v === undefined || v === null ? "" : String(v);
  return `"${s.replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
};
const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => esc((r as Record<string, unknown>)[c])).join(","))].join("\n");
writeFileSync("export/portfolio-descriptions.csv", csv);

// riepilogo
console.log(`Trip: ${trips.length}`);
console.log(`Foto totali: ${rows.length}`);
const perTrip = trips.map((t) => `  ${t.slug}: ${t.photos.length} foto`).join("\n");
console.log(perTrip);
const emptyDesc = rows.filter((r) => !r.description || r.description.length < 10).length;
const emptyAlt = rows.filter((r) => !r.alt || r.alt.length < 5).length;
console.log(`\nQualità: description mancanti/corte: ${emptyDesc} · alt mancanti/corti: ${emptyAlt}`);
console.log(`\nScritti:\n  export/portfolio-descriptions.json\n  export/portfolio-descriptions.csv`);
