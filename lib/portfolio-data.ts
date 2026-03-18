import { v2 as cloudinary } from "cloudinary";
import {
  getTripBySlug,
  getAllTrips,
  type Trip,
  type TripPhoto,
} from "./destinations";

function initCloudinary(): void {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  if (!cloudName) throw new Error("CLOUDINARY_CLOUD_NAME not configured");
  if (!apiKey) throw new Error("CLOUDINARY_API_KEY not configured");
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: process.env.CLOUDINARY_API_SECRET ?? "",
  });
}

/** Extract Cloudinary public_id from a full URL */
function extractPublicId(url: string): string {
  const match = url.match(/\/v\d+\/(.+)$/);
  return match ? match[1] : "";
}

/** Fetch context for a single photo (real-time, no index delay) */
async function fetchPhotoContext(
  publicId: string
): Promise<Record<string, string> | null> {
  try {
    const result = await cloudinary.api.resource(publicId, {
      context: true,
    });
    return (result.context?.custom as Record<string, string>) ?? null;
  } catch {
    return null;
  }
}

/**
 * Fetch a trip with photo texts enriched from Cloudinary context metadata.
 * Uses api.resource() per photo for real-time data (no search index delay).
 */
export async function getEnrichedTrip(
  slug: string
): Promise<Trip | undefined> {
  const trip = getTripBySlug(slug);
  if (!trip) return undefined;

  // Only enrich trips with real Cloudinary photos
  if (!trip.photos[0]?.src.includes("cloudinary.com")) {
    return trip;
  }

  try {
    initCloudinary();

    // Fetch context for all photos in parallel
    const contextResults = await Promise.all(
      trip.photos.map((photo) =>
        fetchPhotoContext(extractPublicId(photo.src))
      )
    );

    const enrichedPhotos: TripPhoto[] = trip.photos.map((photo, i) => {
      const ctx = contextResults[i];
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
