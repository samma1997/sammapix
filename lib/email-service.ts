import { resend } from "./resend";
import { render } from "@react-email/render";
import type { MilestoneType } from "@/emails/MilestoneEmail";
import type { WeeklyDigestContent } from "@/emails/WeeklyDigestEmail";

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
    subject: "Process 20 images at once- here's how",
    html,
  });
}

export async function sendDay14Email(to: string, name: string | null) {
  const { Day14Email } = await import("@/emails/Day14Email");
  const html = await render(Day14Email({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Two weeks in- quick question",
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
    subject: "1 month with SammaPix- a thank you (+ something for you)",
    html,
  });
}

export async function sendDay35Email(to: string, name: string | null) {
  const { Day35Email } = await import("@/emails/Day35Email");
  const html = await render(Day35Email({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "5 tools you probably haven't tried yet",
    html,
  });
}

export async function sendDay49Email(to: string, name: string | null) {
  const { Day49Email } = await import("@/emails/Day49Email");
  const html = await render(Day49Email({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "How a travel photographer uses SammaPix to save hours",
    html,
  });
}

export async function sendDay63Email(to: string, name: string | null) {
  const { Day63Email } = await import("@/emails/Day63Email");
  const html = await render(Day63Email({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Your images by the numbers",
    html,
  });
}

export async function sendDay77Email(to: string, name: string | null) {
  const { Day77Email } = await import("@/emails/Day77Email");
  const html = await render(Day77Email({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "What's new in SammaPix",
    html,
  });
}

export async function sendReEngageDay14Email(to: string, name: string | null) {
  const { ReEngageDay14Email } = await import("@/emails/ReEngageDay14Email");
  const html = await render(ReEngageDay14Email({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "We miss you! Here's what's new in SammaPix",
    html,
  });
}

export async function sendReEngageDay30Email(to: string, name: string | null) {
  const { ReEngageDay30Email } = await import("@/emails/ReEngageDay30Email");
  const html = await render(ReEngageDay30Email({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Your free AI rename credits are still waiting",
    html,
  });
}

export async function sendProUpgradeEmail(to: string, name: string | null) {
  const { ProUpgradeEmail } = await import("@/emails/ProUpgradeEmail");
  const html = await render(ProUpgradeEmail({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Welcome to SammaPix Pro! Here's what's unlocked",
    html,
  });
}

export async function sendProCancelEmail(to: string, name: string | null) {
  const { ProCancelEmail } = await import("@/emails/ProCancelEmail");
  const html = await render(ProCancelEmail({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "We're sorry to see you go",
    html,
  });
}

export async function sendPaymentFailedEmail(to: string, name: string | null) {
  const { PaymentFailedEmail } = await import("@/emails/PaymentFailedEmail");
  const html = await render(PaymentFailedEmail({ name: name ?? "there" }));
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Action needed: your SammaPix Pro payment didn't go through",
    html,
  });
}

export async function sendMilestoneEmail(
  to: string,
  name: string | null,
  milestoneType: MilestoneType
) {
  const { MilestoneEmail, getMilestoneSubject } = await import(
    "@/emails/MilestoneEmail"
  );
  const html = await render(
    MilestoneEmail({ name: name ?? "there", milestoneType })
  );
  await resend.emails.send({
    from: FROM,
    to,
    subject: getMilestoneSubject(milestoneType),
    html,
  });
}

export async function sendWeeklyDigestEmail(
  to: string,
  name: string | null,
  content: WeeklyDigestContent
) {
  const { WeeklyDigestEmail } = await import("@/emails/WeeklyDigestEmail");
  const subject = `${content.tipTitle} + what's new in SammaPix`;
  const html = await render(
    WeeklyDigestEmail({ name: name ?? "there", subject, content })
  );
  await resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
  });
}
