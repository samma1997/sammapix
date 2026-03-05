/**
 * Ambient type declaration for piexifjs.
 * The package ships no TypeScript types and there is no @types/piexifjs on npm.
 */
declare module "piexifjs" {
  /** Load EXIF data from a base-64 data-URL or binary string. */
  export function load(data: string): Record<string, Record<number, unknown>>;

  /** Serialise an EXIF object back to a binary string. */
  export function dump(exifObj: Record<string, unknown>): string;

  /** Insert a serialised EXIF string into a JPEG data-URL or binary string. */
  export function insert(exifStr: string, jpegData: string): string;

  /** Remove all EXIF data from a JPEG binary string. */
  export function remove(jpegData: string): string;
}
