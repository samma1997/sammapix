import { v2 as cloudinary } from "cloudinary";
import { getTripBySlug, getAllTrips, type Trip, type TripPhoto } from "./destinations";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? "do9hrcwn1",
  api_key: process.env.CLOUDINARY_API_KEY ?? "REDACTED_CLOUDINARY",
  api_secret: process.env.CLOUDINARY_API_SECRET ?? "",
});

/** Extract Cloudinary public_id from a full URL */
function extractPublicId(url: string): string {
  const match = url.match(/\/v\d+\/(.+)$/);
  return match ? match[1] : "";
}

/**
 * Fetch a trip with photo texts enriched from Cloudinary context metadata.
 * Falls back to destinations.ts defaults if Cloudinary is unreachable or
 * if the trip uses placeholder images.
 */
export async function getEnrichedTrip(slug: string): Promise<Trip | undefined> {
  const trip = getTripBySlug(slug);
  if (!trip) return undefined;

  // Only enrich trips with real Cloudinary photos
  if (!trip.photos[0]?.src.includes("cloudinary.com")) {
    return trip;
  }

  const firstPublicId = extractPublicId(trip.photos[0].src);
  const folder = firstPublicId.split("/").slice(0, -1).join("/");

  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .with_field("context")
      .sort_by("public_id", "asc")
      .max_results(200)
      .execute();

    const contextMap = new Map<string, Record<string, string>>();
    for (const resource of result.resources ?? []) {
      contextMap.set(
        resource.public_id,
        (resource.context?.custom as Record<string, string>) ?? {}
      );
    }

    const enrichedPhotos: TripPhoto[] = trip.photos.map((photo) => {
      const publicId = extractPublicId(photo.src);
      const ctx = contextMap.get(publicId);
      if (!ctx) return photo;

      return {
        ...photo,
        caption: ctx.caption || photo.caption,
        description: ctx.description || photo.description,
        alt: ctx.alt || photo.alt,
        location: ctx.location || photo.location,
      };
    });

    return { ...trip, photos: enrichedPhotos };
  } catch (err) {
    console.error("[getEnrichedTrip]", err);
    return trip;
  }
}

export { getAllTrips, getTripBySlug };
