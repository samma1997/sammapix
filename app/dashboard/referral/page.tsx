"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Gift,
  Copy,
  Check,
  Users,
  Zap,
  Crown,
  Calendar,
  ChevronDown,
  ChevronUp,
  Trophy,
  Star,
  Rocket,
  Target,
  Award,
  Share2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { APP_URL } from "@/lib/constants";

// ── Types ────────────────────────────────────────────────────────────────────

interface ReferralStats {
  totalReferrals: number;
  opsEarned: number;
  conversions: number;
  pendingMonths: number;
  recentReferrals: {
    id: string;
    name: string | null;
    email: string;
    date: string;
    status: "signed_up" | "active" | "converted";
  }[];
}

interface ReferralLink {
  code: string;
  link: string;
}

// ── Milestones ───────────────────────────────────────────────────────────────

const MILESTONES = [
  { count: 1, label: "First Friend", reward: "50 bonus AI credits", icon: Star },
  { count: 3, label: "Connector", reward: "150 bonus AI credits + badge", icon: Users },
  { count: 5, label: "Advocate", reward: "1 month free Pro", icon: Rocket },
  { count: 10, label: "Ambassador", reward: "3 months free Pro", icon: Target },
  { count: 25, label: "Legend", reward: "Lifetime Pro discount", icon: Award },
];

// ── Pre-written share messages ───────────────────────────────────────────────

const SHARE_MESSAGES = {
  twitter: (link: string) =>
    `If you edit photos for work, SammaPix is actually useful \u2014 AI rename, compress, HEIC convert, duplicate finder, all in the browser. Try it free (50 bonus AI credits): ${link}`,
  whatsapp: (link: string) =>
    `Hey \u2014 found this tool for photo/file management, it's solid. AI rename, compress, HEIC converter. Browser-based, no install. Use my link for 50 free AI credits: ${link}`,
  linkedin: (link: string) =>
    `I\u2019ve been using SammaPix to optimize images for web \u2014 AI-powered renaming, compression, HEIC conversion, all browser-based. If you work with images, it\u2019s worth trying. My referral link gives you 50 free AI credits: ${link}`,
  emailSubject: "A tool I've been using for photo workflows",
  emailBody: (link: string) =>
    `Hey,\n\nI've been using SammaPix for image optimization \u2014 AI rename, compress, HEIC convert, duplicate finder, all in the browser. No install needed.\n\nIf you sign up through my link, you get 50 free AI credits:\n${link}\n\nWorth checking out if you work with images regularly.`,
};

// ── Share helpers ─────────────────────────────────────────────────────────────

function shareTwitter(link: string) {
  const text = SHARE_MESSAGES.twitter(link);
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

function shareLinkedIn(link: string) {
  navigator.clipboard.writeText(SHARE_MESSAGES.linkedin(link));
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

function shareWhatsApp(link: string) {
  const text = SHARE_MESSAGES.whatsapp(link);
  window.open(
    `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

function shareEmail(link: string) {
  window.open(
    `mailto:?subject=${encodeURIComponent(SHARE_MESSAGES.emailSubject)}&body=${encodeURIComponent(SHARE_MESSAGES.emailBody(link))}`,
    "_self"
  );
}

async function shareNative(link: string) {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({
        title: "SammaPix \u2014 Free Image Optimizer",
        text: "Try SammaPix for free with 50 bonus AI credits.",
        url: link,
      });
    } catch {
      // User cancelled or share failed
    }
  }
}

// ── Copy button helper ───────────────────────────────────────────────────────

function CopyButton({
  text,
  label,
  className,
  variant = "default",
}: {
  text: string;
  label?: string;
  className?: string;
  variant?: "default" | "primary" | "small";
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  if (variant === "small") {
    return (
      <button
        onClick={handleCopy}
        className={`inline-flex items-center gap-1 text-xs text-[#8B5CF6] hover:text-[#7C3AED] transition-colors ${className ?? ""}`}
      >
        {copied ? <Check className="h-3 w-3" strokeWidth={2} /> : <Copy className="h-3 w-3" strokeWidth={1.5} />}
        {copied ? "Copied" : label ?? "Copy"}
      </button>
    );
  }

  if (variant === "primary") {
    return (
      <button
        onClick={handleCopy}
        className={`inline-flex items-center gap-2 px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-medium rounded-lg transition-colors ${className ?? ""}`}
      >
        {copied ? <Check className="h-4 w-4" strokeWidth={2} /> : <Copy className="h-4 w-4" strokeWidth={1.5} />}
        {copied ? "Copied!" : label ?? "Copy Link"}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E5E5] dark:border-[#333] rounded-lg text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors ${className ?? ""}`}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-green-500" strokeWidth={2} /> : <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />}
      {copied ? "Copied!" : label ?? "Copy"}
    </button>
  );
}

// ── Share buttons row ────────────────────────────────────────────────────────

function ShareButtons({ link }: { link: string }) {
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <CopyButton text={link} label="Copy Link" variant="primary" />

      <button
        onClick={() => shareTwitter(link)}
        className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#E5E5E5] dark:border-[#333] rounded-lg text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
        aria-label="Share on Twitter"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="hidden sm:inline">Twitter</span>
      </button>

      <button
        onClick={() => shareLinkedIn(link)}
        className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#E5E5E5] dark:border-[#333] rounded-lg text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
        aria-label="Share on LinkedIn"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        <span className="hidden sm:inline">LinkedIn</span>
      </button>

      <button
        onClick={() => shareWhatsApp(link)}
        className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#E5E5E5] dark:border-[#333] rounded-lg text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
        aria-label="Share on WhatsApp"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="hidden sm:inline">WhatsApp</span>
      </button>

      <button
        onClick={() => shareEmail(link)}
        className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#E5E5E5] dark:border-[#333] rounded-lg text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
        aria-label="Share via Email"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        <span className="hidden sm:inline">Email</span>
      </button>

      {canShare && (
        <button
          onClick={() => shareNative(link)}
          className="sm:hidden inline-flex items-center gap-1.5 px-3 py-2 border border-[#E5E5E5] dark:border-[#333] rounded-lg text-sm text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
          aria-label="Share using device share menu"
        >
          <Share2 className="h-4 w-4" strokeWidth={1.5} />
          Share...
        </button>
      )}
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function ReferralPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [linkData, setLinkData] = useState<ReferralLink | null>(null);
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const fetchedRef = useRef(false);

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin?callbackUrl=/referral");
    }
  }, [status, router]);

  // Fetch referral data
  useEffect(() => {
    if (status !== "authenticated" || fetchedRef.current) return;
    fetchedRef.current = true;

    async function fetchData() {
      try {
        const [linkRes, statsRes] = await Promise.all([
          fetch("/api/referral/generate"),
          fetch("/api/referral/stats"),
        ]);

        if (linkRes.ok) {
          const data = await linkRes.json();
          setLinkData(data);
        } else {
          // Fallback: generate a link from user email
          const email = session?.user?.email ?? "";
          const code = btoa(email).replace(/[^a-zA-Z0-9]/g, "").slice(0, 8);
          setLinkData({ code, link: `${APP_URL}?ref=${code}` });
        }

        if (statsRes.ok) {
          setStats(await statsRes.json());
        } else {
          setStats({
            totalReferrals: 0,
            opsEarned: 0,
            conversions: 0,
            pendingMonths: 0,
            recentReferrals: [],
          });
        }
      } catch {
        // Set defaults on network error
        const email = session?.user?.email ?? "";
        const code = btoa(email).replace(/[^a-zA-Z0-9]/g, "").slice(0, 8);
        setLinkData({ code, link: `${APP_URL}?ref=${code}` });
        setStats({
          totalReferrals: 0,
          opsEarned: 0,
          conversions: 0,
          pendingMonths: 0,
          recentReferrals: [],
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [status, session]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="h-5 w-5 rounded-full border-2 border-[#171717] dark:border-[#E5E5E5] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!linkData || !stats) return null;

  const referralLink = linkData.link;
  const totalReferrals = stats.totalReferrals;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 md:py-10 pb-20 space-y-8 md:space-y-12">

      {/* ─── A. Hero ─────────────────────────────────────────────────────── */}
      <section className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20 mb-5">
          <Gift className="h-7 w-7 text-[#8B5CF6]" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#171717] dark:text-[#E5E5E5] tracking-tight mb-2">
          Give 50 credits, get 25 back
        </h1>
        <p className="text-sm sm:text-base text-[#737373] dark:text-[#A3A3A3] max-w-md mx-auto leading-relaxed mb-8">
          Share your link with friends. They get 50 free AI credits when they sign up, and you earn 25 bonus credits for each signup.
        </p>

        {/* Referral link input */}
        <div className="max-w-lg mx-auto mb-5">
          <div className="flex items-center gap-2 p-1.5 bg-[#FAFAFA] dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#333] rounded-xl">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="flex-1 min-w-0 px-3 py-2 text-sm text-[#171717] dark:text-[#E5E5E5] bg-transparent border-none outline-none select-all font-mono"
              onClick={(e) => (e.target as HTMLInputElement).select()}
              aria-label="Your referral link"
            />
            <CopyButton text={referralLink} label="Copy" variant="primary" />
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex justify-center">
          <ShareButtons link={referralLink} />
        </div>
      </section>

      {/* ─── B. Stats dashboard ──────────────────────────────────────────── */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard icon={Users} label="Total signups" value={stats.totalReferrals} />
          <StatCard icon={Zap} label="AI credits earned" value={stats.opsEarned} accent />
          <StatCard icon={Crown} label="Pro conversions" value={stats.conversions} />
          <StatCard icon={Calendar} label="Free Pro months" value={stats.pendingMonths} />
        </div>

        {/* Referral history table */}
        <div className="mt-6 border border-[#E5E5E5] dark:border-[#333] rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-[#FAFAFA] dark:bg-[#1E1E1E] border-b border-[#E5E5E5] dark:border-[#333]">
            <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">Referral history</h3>
          </div>
          {stats.recentReferrals.length > 0 ? (
            <div className="divide-y divide-[#E5E5E5] dark:divide-[#333]">
              {stats.recentReferrals.map((ref) => (
                <div key={ref.id} className="flex items-center justify-between px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5] truncate">
                      {ref.name ?? ref.email}
                    </p>
                    <p className="text-xs text-[#A3A3A3]">
                      {new Date(ref.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <StatusBadge status={ref.status} />
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-10 text-center">
              <Users className="h-8 w-8 text-[#D4D4D4] dark:text-[#404040] mx-auto mb-3" strokeWidth={1.5} />
              <p className="text-sm text-[#737373] dark:text-[#737373]">No referrals yet</p>
              <p className="text-xs text-[#A3A3A3] mt-1">Share your link above to get started</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── C. How it works ─────────────────────────────────────────────── */}
      <section>
        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-5">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <HowItWorksStep
            step={1}
            title="Share your link"
            description="Copy your unique referral link and share it with friends, colleagues, or on social media."
          />
          <HowItWorksStep
            step={2}
            title="They sign up"
            description="When someone signs up through your link, they get 50 free AI credits as a welcome bonus."
          />
          <HowItWorksStep
            step={3}
            title="You earn rewards"
            description="You receive 25 bonus AI credits per signup. Hit milestones for even bigger rewards."
          />
        </div>
      </section>

      {/* ─── D. Milestones ───────────────────────────────────────────────── */}
      <section>
        <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5] mb-5">Milestones</h2>
        <div className="space-y-3">
          {MILESTONES.map((milestone, idx) => {
            const achieved = totalReferrals >= milestone.count;
            const prevCount = idx > 0 ? MILESTONES[idx - 1].count : 0;
            const progressInSegment = achieved
              ? 100
              : totalReferrals > prevCount
              ? ((totalReferrals - prevCount) / (milestone.count - prevCount)) * 100
              : 0;
            const MilestoneIcon = milestone.icon;

            return (
              <div
                key={milestone.count}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                  achieved
                    ? "border-[#8B5CF6]/30 bg-[#8B5CF6]/5 dark:bg-[#8B5CF6]/10"
                    : "border-[#E5E5E5] dark:border-[#333] bg-white dark:bg-[#191919]"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${
                    achieved
                      ? "bg-[#8B5CF6] text-white"
                      : "bg-[#F5F5F5] dark:bg-[#252525] text-[#A3A3A3]"
                  }`}
                >
                  <MilestoneIcon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className={`text-sm font-medium ${achieved ? "text-[#8B5CF6]" : "text-[#171717] dark:text-[#E5E5E5]"}`}>
                      {milestone.label}
                      <span className="text-xs text-[#A3A3A3] font-normal ml-2">
                        {milestone.count} referral{milestone.count !== 1 ? "s" : ""}
                      </span>
                    </p>
                    {achieved && (
                      <Check className="h-4 w-4 text-[#8B5CF6] shrink-0" strokeWidth={2} />
                    )}
                  </div>
                  <p className="text-xs text-[#737373] dark:text-[#A3A3A3] mb-2">{milestone.reward}</p>
                  {!achieved && (
                    <div className="w-full h-1.5 bg-[#F5F5F5] dark:bg-[#252525] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#8B5CF6] rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, progressInSegment)}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── E. Pre-written share messages ───────────────────────────────── */}
      <section>
        <button
          onClick={() => setMessagesOpen(!messagesOpen)}
          className="flex items-center justify-between w-full text-left group"
        >
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Pre-written share messages
          </h2>
          {messagesOpen ? (
            <ChevronUp className="h-5 w-5 text-[#A3A3A3] group-hover:text-[#737373] transition-colors" strokeWidth={1.5} />
          ) : (
            <ChevronDown className="h-5 w-5 text-[#A3A3A3] group-hover:text-[#737373] transition-colors" strokeWidth={1.5} />
          )}
        </button>

        {messagesOpen && (
          <div className="mt-4 space-y-4">
            <ShareMessageCard
              platform="Twitter / X"
              message={SHARE_MESSAGES.twitter(referralLink)}
            />
            <ShareMessageCard
              platform="LinkedIn"
              message={SHARE_MESSAGES.linkedin(referralLink)}
            />
            <ShareMessageCard
              platform="WhatsApp"
              message={SHARE_MESSAGES.whatsapp(referralLink)}
            />
            <ShareMessageCard
              platform="Email"
              message={`Subject: ${SHARE_MESSAGES.emailSubject}\n\n${SHARE_MESSAGES.emailBody(referralLink)}`}
            />
          </div>
        )}
      </section>
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="border border-[#E5E5E5] dark:border-[#333] rounded-xl p-4 bg-white dark:bg-[#191919]">
      <div className="flex items-center gap-2 mb-2">
        <Icon
          className={`h-4 w-4 ${accent ? "text-[#8B5CF6]" : "text-[#A3A3A3]"}`}
          strokeWidth={1.5}
        />
        <span className="text-xs text-[#737373] dark:text-[#A3A3A3]">{label}</span>
      </div>
      <p className={`text-2xl font-bold ${accent ? "text-[#8B5CF6]" : "text-[#171717] dark:text-[#E5E5E5]"}`}>
        {value}
      </p>
    </div>
  );
}

function HowItWorksStep({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="border border-[#E5E5E5] dark:border-[#333] rounded-xl p-5 bg-white dark:bg-[#191919]">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20 text-[#8B5CF6] text-sm font-bold mb-3">
        {step}
      </div>
      <h3 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-1">{title}</h3>
      <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed">{description}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: "signed_up" | "active" | "converted" }) {
  const config = {
    signed_up: { label: "Signed up", bg: "bg-[#F5F5F5] dark:bg-[#252525]", text: "text-[#737373]" },
    active: { label: "Active", bg: "bg-blue-50 dark:bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
    converted: { label: "Pro", bg: "bg-[#8B5CF6]/10", text: "text-[#8B5CF6]" },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}

function ShareMessageCard({
  platform,
  message,
}: {
  platform: string;
  message: string;
}) {
  return (
    <div className="border border-[#E5E5E5] dark:border-[#333] rounded-xl p-4 bg-white dark:bg-[#191919]">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">{platform}</p>
        <CopyButton text={message} variant="small" />
      </div>
      <p className="text-xs text-[#737373] dark:text-[#A3A3A3] leading-relaxed whitespace-pre-line">{message}</p>
    </div>
  );
}
