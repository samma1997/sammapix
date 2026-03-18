"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle, XCircle, X, MapPin, FileText, Tag, AlignLeft } from "lucide-react";
import { ADMIN_EMAILS } from "@/lib/constants";

// ── Types ────────────────────────────────────────────────────────────────────

interface PhotoContext {
  caption: string;
  description: string;
  alt: string;
  location: string;
}

interface PortfolioPhoto {
  publicId: string;
  url: string;
  thumbUrl: string;
  context: PhotoContext;
}

type SaveStatus = "idle" | "saving" | "saved" | "error";

// ── Photo Card ───────────────────────────────────────────────────────────────

const PhotoCard = ({
  photo,
  isSelected,
  onSelect,
}: {
  photo: PortfolioPhoto;
  isSelected: boolean;
  onSelect: () => void;
}) => (
  <button
    onClick={onSelect}
    className={`group relative w-full text-left rounded-md overflow-hidden border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] ${
      isSelected
        ? "border-[#6366F1] ring-1 ring-[#6366F1]"
        : "border-[#2A2A2A] hover:border-[#404040]"
    }`}
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={photo.thumbUrl}
      alt={photo.context.alt || photo.publicId}
      className="w-full aspect-[4/3] object-cover bg-[#252525]"
      loading="lazy"
    />
    <div className="p-2 bg-[#1E1E1E]">
      <p className="text-xs text-[#A3A3A3] truncate leading-snug">
        {photo.context.caption || (
          <span className="text-[#525252] italic">No caption</span>
        )}
      </p>
    </div>
  </button>
);

// ── Edit Panel ───────────────────────────────────────────────────────────────

const EditPanel = ({
  photo,
  onSave,
  onCancel,
}: {
  photo: PortfolioPhoto;
  onSave: (publicId: string, ctx: PhotoContext) => Promise<void>;
  onCancel: () => void;
}) => {
  const [form, setForm] = useState<PhotoContext>({ ...photo.context });
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Reset form when photo changes
  useEffect(() => {
    setForm({ ...photo.context });
    setStatus("idle");
    setErrorMsg("");
  }, [photo.publicId, photo.context]);

  const handleSave = async () => {
    setStatus("saving");
    setErrorMsg("");
    try {
      await onSave(photo.publicId, form);
      setStatus("saved");
      // Auto-reset success indicator after 2.5s
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Save failed");
    }
  };

  const field = (
    key: keyof PhotoContext,
    label: string,
    icon: React.ReactNode,
    multiline = false
  ) => (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-1.5 text-xs font-medium text-[#737373] uppercase tracking-wide">
        {icon}
        {label}
      </label>
      {multiline ? (
        <textarea
          rows={4}
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className="w-full rounded-md border border-[#2A2A2A] bg-[#252525] px-3 py-2 text-sm text-[#E5E5E5] placeholder-[#525252] focus:outline-none focus:border-[#6366F1] resize-none transition-colors"
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      ) : (
        <input
          type="text"
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className="w-full rounded-md border border-[#2A2A2A] bg-[#252525] px-3 py-2 text-sm text-[#E5E5E5] placeholder-[#525252] focus:outline-none focus:border-[#6366F1] transition-colors"
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      )}
    </div>
  );

  // Short public_id display (last segment)
  const shortId = photo.publicId.split("/").slice(-2).join("/");

  return (
    <div className="col-span-full border border-[#2A2A2A] rounded-md bg-[#1E1E1E] overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A]">
        <p className="text-xs text-[#525252] font-mono truncate max-w-[60%]">{shortId}</p>
        <button
          onClick={onCancel}
          className="p-1 rounded text-[#525252] hover:text-[#E5E5E5] hover:bg-[#2A2A2A] transition-colors"
          aria-label="Close panel"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 p-5">
        {/* Thumbnail */}
        <div className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.thumbUrl}
            alt={form.alt || photo.publicId}
            className="w-full lg:w-48 aspect-[4/3] object-cover rounded-md border border-[#2A2A2A] bg-[#252525]"
          />
          <a
            href={photo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-center text-[11px] text-[#525252] hover:text-[#A3A3A3] transition-colors"
          >
            View full size
          </a>
        </div>

        {/* Fields */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {field("caption", "Caption", <Tag className="h-3 w-3" />)}
          {field("description", "Description", <AlignLeft className="h-3 w-3" />, true)}
          {field("alt", "Alt text", <FileText className="h-3 w-3" />)}
          {field("location", "Location", <MapPin className="h-3 w-3" />)}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={handleSave}
              disabled={status === "saving"}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#E5E5E5] text-[#171717] text-sm font-medium rounded-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === "saving" && (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              )}
              {status === "saving" ? "Saving..." : "Save changes"}
            </button>

            <button
              onClick={onCancel}
              disabled={status === "saving"}
              className="px-4 py-2 text-sm text-[#737373] hover:text-[#E5E5E5] transition-colors"
            >
              Cancel
            </button>

            {/* Status feedback */}
            {status === "saved" && (
              <span className="inline-flex items-center gap-1.5 text-sm text-[#16A34A]">
                <CheckCircle className="h-4 w-4" />
                Saved
              </span>
            )}
            {status === "error" && (
              <span className="inline-flex items-center gap-1.5 text-sm text-[#DC2626]">
                <XCircle className="h-4 w-4" />
                {errorMsg || "Error- try again"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPortfolioPage() {
  const { data: session, status } = useSession();
  const [photos, setPhotos] = useState<PortfolioPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const email = session?.user?.email ?? "";
  const isAdmin = email ? ADMIN_EMAILS.includes(email) : false;

  // Fetch photos
  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/admin/portfolio");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Failed to fetch");
      }
      const data = (await res.json()) as { photos: PortfolioPhoto[] };
      setPhotos(data.photos);
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated" && isAdmin) {
      fetchPhotos();
    }
  }, [status, isAdmin, fetchPhotos]);

  // Save handler- updates local state on success
  const handleSave = async (publicId: string, ctx: PhotoContext) => {
    const res = await fetch("/api/admin/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId, ...ctx }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error((data as { error?: string }).error ?? "Save failed");
    }

    // Update local state so caption in grid refreshes
    setPhotos((prev) =>
      prev.map((p) => (p.publicId === publicId ? { ...p, context: ctx } : p))
    );
  };

  const selectedPhoto = photos.find((p) => p.publicId === selectedId) ?? null;

  // ── Auth states ──────────────────────────────────────────────────────────

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#191919] flex items-center justify-center">
        <Loader2 className="h-5 w-5 text-[#525252] animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated" || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#191919] flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-[#737373] text-sm">Access denied.</p>
        <Link
          href="/auth/signin"
          className="text-sm text-[#E5E5E5] underline underline-offset-2"
        >
          Sign in
        </Link>
      </div>
    );
  }

  // ── Main UI ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#191919] px-4 sm:px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-[#E5E5E5] tracking-tight">
              Portfolio Admin
            </h1>
            <p className="text-xs text-[#525252] mt-0.5">
              {photos.length > 0 ? `${photos.length} photos` : ""}
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#E5E5E5] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to site
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-5 w-5 text-[#525252] animate-spin" />
          </div>
        )}

        {/* Fetch error */}
        {!loading && fetchError && (
          <div className="flex flex-col items-center gap-3 py-20">
            <p className="text-sm text-[#DC2626]">{fetchError}</p>
            <button
              onClick={fetchPhotos}
              className="text-sm text-[#737373] hover:text-[#E5E5E5] underline underline-offset-2 transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !fetchError && photos.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-[#525252]">No photos found in sammapix/portfolio.</p>
          </div>
        )}

        {/* Photo grid */}
        {!loading && photos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((photo) => (
              <React.Fragment key={photo.publicId}>
                <PhotoCard
                  photo={photo}
                  isSelected={selectedId === photo.publicId}
                  onSelect={() =>
                    setSelectedId((prev) =>
                      prev === photo.publicId ? null : photo.publicId
                    )
                  }
                />

                {/* Edit panel- inserted after the selected card, full-width */}
                {selectedId === photo.publicId && selectedPhoto && (
                  <EditPanel
                    photo={selectedPhoto}
                    onSave={handleSave}
                    onCancel={() => setSelectedId(null)}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
