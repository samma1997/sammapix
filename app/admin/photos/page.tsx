"use client";

import React, { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  Loader2,
  CheckCircle,
  XCircle,
  X,
  MapPin,
  FileText,
  Tag,
  AlignLeft,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// ── Types ────────────────────────────────────────────────────────────────────

interface PhotoContext {
  caption: string;
  description: string;
  alt: string;
  location: string;
}

interface Photo {
  publicId: string;
  url: string;
  thumbUrl: string;
  width: number;
  height: number;
  context: PhotoContext;
}

type SaveStatus = "idle" | "saving" | "saved" | "error";

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPhotosPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#191919] flex items-center justify-center">
          <Loader2 className="h-5 w-5 text-[#525252] animate-spin" />
        </div>
      }
    >
      <AdminPhotosContent />
    </Suspense>
  );
}

function AdminPhotosContent() {
  const searchParams = useSearchParams();
  const adminKey = searchParams.get("key") ?? "";

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchPhotos = useCallback(async () => {
    if (!adminKey) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/photos", {
        headers: { "x-admin-key": adminKey },
      });
      if (!res.ok) throw new Error("Unauthorized or failed");
      const data = (await res.json()) as { photos: Photo[] };
      setPhotos(data.photos);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }, [adminKey]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const handleSave = async (publicId: string, ctx: PhotoContext) => {
    const res = await fetch("/api/admin/photos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify({ publicId, ...ctx }),
    });
    if (!res.ok) throw new Error("Save failed");
    setPhotos((prev) =>
      prev.map((p) => (p.publicId === publicId ? { ...p, context: ctx } : p))
    );
  };

  const selectedPhoto = photos.find((p) => p.publicId === selectedId) ?? null;

  if (!adminKey) {
    return (
      <div className="min-h-screen bg-[#191919] flex items-center justify-center">
        <p className="text-[#737373] text-sm">
          Add <code className="text-[#A3A3A3]">?key=YOUR_KEY</code> to access.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#191919] px-4 sm:px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-[#E5E5E5] tracking-tight">
              Edit Photo Texts
            </h1>
            <p className="text-xs text-[#525252] mt-0.5">
              {photos.length > 0
                ? `${photos.length} photos — changes go live in ~60s`
                : ""}
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#E5E5E5] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-5 w-5 text-[#525252] animate-spin" />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center gap-3 py-20">
            <p className="text-sm text-[#DC2626]">{error}</p>
            <button
              onClick={fetchPhotos}
              className="text-sm text-[#737373] hover:text-[#E5E5E5] underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        )}

        {/* Photo grid */}
        {!loading && photos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((photo) => (
              <React.Fragment key={photo.publicId}>
                <button
                  onClick={() =>
                    setSelectedId((prev) =>
                      prev === photo.publicId ? null : photo.publicId
                    )
                  }
                  className={`group relative w-full text-left rounded-md overflow-hidden border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] ${
                    selectedId === photo.publicId
                      ? "border-[#6366F1] ring-1 ring-[#6366F1]"
                      : "border-[#2A2A2A] hover:border-[#404040]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.thumbUrl}
                    alt={photo.context.alt || photo.publicId}
                    className="w-full object-cover bg-[#252525]"
                    style={{
                      aspectRatio: `${photo.width}/${photo.height}`,
                    }}
                    loading="lazy"
                  />
                  <div className="p-2 bg-[#1E1E1E]">
                    <p className="text-xs text-[#A3A3A3] truncate leading-snug">
                      {photo.context.caption || (
                        <span className="text-[#525252] italic">
                          No caption
                        </span>
                      )}
                    </p>
                  </div>
                </button>

                {selectedId === photo.publicId && selectedPhoto && (
                  <EditPanel
                    photo={selectedPhoto}
                    adminKey={adminKey}
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

// ── Edit Panel ───────────────────────────────────────────────────────────────

function EditPanel({
  photo,
  adminKey,
  onSave,
  onCancel,
}: {
  photo: Photo;
  adminKey: string;
  onSave: (publicId: string, ctx: PhotoContext) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<PhotoContext>({ ...photo.context });
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genLang, setGenLang] = useState("en");

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
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Save failed");
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      // Use a small version of the image for Gemini
      const analyzeUrl = photo.url.replace(
        /upload\/.*/,
        `upload/c_limit,f_jpg,q_auto,w_800/${photo.publicId}`
      );
      const res = await fetch("/api/admin/photos/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ imageUrl: analyzeUrl, locale: genLang }),
      });
      if (!res.ok) throw new Error("AI generation failed");
      const data = (await res.json()) as PhotoContext;
      setForm(data);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "AI error");
    } finally {
      setGenerating(false);
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

  const shortId = photo.publicId.split("/").slice(-1)[0];

  return (
    <div className="col-span-full border border-[#2A2A2A] rounded-md bg-[#1E1E1E] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A]">
        <p className="text-xs text-[#525252] font-mono truncate max-w-[70%]">
          {shortId}
        </p>
        <button
          onClick={onCancel}
          className="p-1 rounded text-[#525252] hover:text-[#E5E5E5] hover:bg-[#2A2A2A] transition-colors"
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
            className="w-full lg:w-48 object-cover rounded-md border border-[#2A2A2A] bg-[#252525]"
            style={{
              aspectRatio: `${photo.width}/${photo.height}`,
            }}
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
          {field(
            "description",
            "Description",
            <AlignLeft className="h-3 w-3" />,
            true
          )}
          {field("alt", "Alt text", <FileText className="h-3 w-3" />)}
          {field("location", "Location", <MapPin className="h-3 w-3" />)}

          <div className="flex items-center gap-3 pt-1 flex-wrap">
            <div className="inline-flex items-center gap-1.5">
              <select
                value={genLang}
                onChange={(e) => setGenLang(e.target.value)}
                className="text-xs bg-[#252525] border border-[#2A2A2A] rounded px-2 py-2 text-[#A3A3A3] focus:outline-none focus:border-[#6366F1] cursor-pointer"
              >
                <option value="en">🇬🇧 EN</option>
                <option value="it">🇮🇹 IT</option>
                <option value="es">🇪🇸 ES</option>
                <option value="fr">🇫🇷 FR</option>
                <option value="de">🇩🇪 DE</option>
                <option value="pt">🇵🇹 PT</option>
              </select>
              <button
                onClick={handleGenerate}
                disabled={generating || status === "saving"}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366F1] text-white text-sm font-medium rounded-md hover:bg-[#5558E6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {generating ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5" />
                )}
                {generating ? "Generating..." : "Generate with AI"}
              </button>
            </div>

            <button
              onClick={handleSave}
              disabled={status === "saving" || generating}
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

            {status === "saved" && (
              <span className="inline-flex items-center gap-1.5 text-sm text-[#16A34A]">
                <CheckCircle className="h-4 w-4" />
                Saved
              </span>
            )}
            {status === "error" && (
              <span className="inline-flex items-center gap-1.5 text-sm text-[#DC2626]">
                <XCircle className="h-4 w-4" />
                {errorMsg}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
