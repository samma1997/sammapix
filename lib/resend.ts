import { Resend } from "resend";

let _resend: Resend | null = null;
export function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");
  }
  return _resend;
}
// Keep named export for backwards compat- lazy proxy
export const resend = new Proxy({} as Resend, {
  get(_target, prop) {
    return (getResend() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export async function addToAudience(
  email: string,
  name: string | null
): Promise<boolean> {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) return true; // assume new in dev
  try {
    await resend.contacts.create({
      audienceId,
      email,
      firstName: name?.split(" ")[0] ?? "",
      lastName: name?.split(" ").slice(1).join(" ") ?? "",
      unsubscribed: false,
    });
    return true; // new contact
  } catch {
    return false; // already exists
  }
}
