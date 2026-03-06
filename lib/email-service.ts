import { resend } from "./resend";
import { render } from "@react-email/render";

const FROM = "SammaPix <hello@sammapix.com>";

export async function sendWelcomeEmail(to: string, name: string | null) {
  const { WelcomeEmail } = await import("@/emails/WelcomeEmail");
  const html = await render(WelcomeEmail({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Your AI rename credits are ready 🎨",
    html,
  });
}

export async function sendDay2Email(to: string, name: string | null) {
  const { Day2Email } = await import("@/emails/Day2Email");
  const html = await render(Day2Email({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "1 trick to make your images 30% lighter",
    html,
  });
}

export async function sendDay4Email(to: string, name: string | null) {
  const { Day4Email } = await import("@/emails/Day4Email");
  const html = await render(Day4Email({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "How to rank higher on Google with better image names",
    html,
  });
}

export async function sendDay7Email(to: string, name: string | null) {
  const { Day7Email } = await import("@/emails/Day7Email");
  const html = await render(Day7Email({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Process 20 images at once — here's how",
    html,
  });
}

export async function sendDay14Email(to: string, name: string | null) {
  const { Day14Email } = await import("@/emails/Day14Email");
  const html = await render(Day14Email({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Two weeks in — quick question",
    html,
  });
}

export async function sendDay21Email(to: string, name: string | null) {
  const { Day21Email } = await import("@/emails/Day21Email");
  const html = await render(Day21Email({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "What Pro users can do that you can't (yet)",
    html,
  });
}

export async function sendDay30Email(to: string, name: string | null) {
  const { Day30Email } = await import("@/emails/Day30Email");
  const html = await render(Day30Email({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "1 month with SammaPix — a thank you (+ something for you)",
    html,
  });
}
