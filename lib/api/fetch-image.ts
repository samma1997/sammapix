/**
 * SSRF-safe remote fetch for agent-supplied image/PDF URLs.
 *
 * Agents usually have a URL, not a file. Fetching arbitrary URLs server-side is
 * a classic SSRF vector (cloud metadata 169.254.169.254, localhost, internal
 * ranges, file://, redirect-to-internal). This module defends against all of
 * them: https/http only, DNS resolved and checked against private/link-local
 * ranges BEFORE connecting, redirects followed manually with a re-check each
 * hop, hard timeout, and a size cap.
 *
 * Residual risk: DNS rebinding between the DNS check and the actual connect is
 * NOT fully closed here (pinning to the IP would break HTTPS TLS/SNI). The
 * common SSRF targets — cloud metadata, localhost, private ranges — are blocked
 * at resolution time, which covers the realistic threats. Full rebinding
 * protection needs a custom connect-time validating dispatcher (future work).
 */

import dns from "dns/promises";
import net from "net";
import { MAX_FILE_BYTES, PayloadTooLarge } from "@/lib/api/limits";

export class UnsafeUrlError extends Error {}

const MAX_REDIRECTS = 3;
const FETCH_TIMEOUT_MS = 10_000;

/** True for loopback, private, link-local, CGNAT and other non-public ranges. */
export function isPrivateIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const p = ip.split(".").map(Number);
    if (p[0] === 10) return true; // 10/8
    if (p[0] === 127) return true; // loopback
    if (p[0] === 0) return true; // 0.0.0.0/8
    if (p[0] === 169 && p[1] === 254) return true; // link-local / cloud metadata
    if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return true; // 172.16/12
    if (p[0] === 192 && p[1] === 168) return true; // 192.168/16
    if (p[0] === 100 && p[1] >= 64 && p[1] <= 127) return true; // CGNAT 100.64/10
    if (p[0] >= 224) return true; // multicast / reserved
    return false;
  }
  if (net.isIPv6(ip)) {
    const low = ip.toLowerCase();
    if (low === "::1" || low === "::") return true; // loopback / unspecified
    if (low.startsWith("fe80")) return true; // link-local
    if (low.startsWith("fc") || low.startsWith("fd")) return true; // unique-local fc00::/7
    if (low.startsWith("::ffff:")) return isPrivateIp(low.replace("::ffff:", "")); // v4-mapped
    return false;
  }
  return true; // not a recognizable IP -> refuse
}

async function assertPublicHost(hostname: string): Promise<string> {
  // Resolve to the IP we will actually connect to and validate it.
  let addr: { address: string };
  try {
    addr = await dns.lookup(hostname);
  } catch {
    throw new UnsafeUrlError("could not resolve host");
  }
  if (isPrivateIp(addr.address)) throw new UnsafeUrlError("URL resolves to a private/internal address");
  return addr.address;
}

/**
 * Fetch a remote file safely. Returns its bytes, or throws UnsafeUrlError /
 * PayloadTooLarge / Error. Follows up to MAX_REDIRECTS, re-checking each hop.
 */
export async function fetchRemoteFile(rawUrl: string, depth = 0): Promise<Buffer> {
  if (depth > MAX_REDIRECTS) throw new UnsafeUrlError("too many redirects");

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new UnsafeUrlError("invalid URL");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new UnsafeUrlError("only http/https URLs are allowed");
  }

  await assertPublicHost(url.hostname); // blocks internal/private targets

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    // Fetch by hostname (keeps HTTPS TLS/SNI valid). Redirects are followed
    // manually so every hop is re-validated against the private-IP blocklist.
    const res = await fetch(url.toString(), {
      redirect: "manual",
      signal: ctrl.signal,
      headers: { Accept: "image/*,application/pdf,*/*" },
    });

    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get("location");
      if (!loc) throw new UnsafeUrlError("redirect without location");
      return fetchRemoteFile(new URL(loc, url).toString(), depth + 1);
    }
    if (!res.ok) throw new Error(`remote returned ${res.status}`);

    const len = Number(res.headers.get("content-length") ?? "0");
    if (len && len > MAX_FILE_BYTES) throw new PayloadTooLarge("remote file too large");

    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > MAX_FILE_BYTES) throw new PayloadTooLarge("remote file too large");
    if (buf.length < 10) throw new Error("remote file is empty or invalid");
    return buf;
  } finally {
    clearTimeout(timer);
  }
}
