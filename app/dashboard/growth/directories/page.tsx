"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, ExternalLink } from "lucide-react";
import type { DirectorySubmission } from "@/lib/db/schema";

type DirStatus = "to_submit" | "submitted" | "listed" | "rejected";

const STATUS_BADGE: Record<DirStatus, string> = {
  to_submit: "bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#737373]",
  submitted: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  listed: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  rejected: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
};

const STATUS_OPTIONS: DirStatus[] = ["to_submit", "submitted", "listed", "rejected"];

function StatusBadge({ status }: { status: DirStatus }) {
  const cls = STATUS_BADGE[status] ?? STATUS_BADGE.submitted;
  return (
    <span
      className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] ${cls}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

interface AddDirModalProps {
  onClose: () => void;
  onAdd: (dir: DirectorySubmission) => void;
}

function AddDirModal({ onClose, onAdd }: AddDirModalProps) {
  const [form, setForm] = useState({
    directoryName: "",
    directoryUrl: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.directoryName || !form.directoryUrl) return;
    setSaving(true);
    try {
      const res = await fetch("/api/growth/directories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.directory) {
        onAdd(data.directory);
        onClose();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] w-full max-w-md p-6">
        <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
          Add Directory
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs text-[#525252] mb-1">Directory Name</label>
            <input
              type="text"
              value={form.directoryName}
              onChange={(e) => setForm({ ...form, directoryName: e.target.value })}
              required
              className="w-full text-sm px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1]"
            />
          </div>
          <div>
            <label className="block text-xs text-[#525252] mb-1">URL</label>
            <input
              type="url"
              value={form.directoryUrl}
              onChange={(e) => setForm({ ...form, directoryUrl: e.target.value })}
              required
              className="w-full text-sm px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1]"
            />
          </div>
          <div>
            <label className="block text-xs text-[#525252] mb-1">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full text-sm px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1] resize-none"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 text-sm px-4 py-2 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] disabled:opacity-50 transition-colors"
            >
              {saving ? "Adding..." : "Add Directory"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-sm px-4 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DirectoriesPage() {
  const [directories, setDirectories] = useState<DirectorySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchDirs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/growth/directories");
      const data = await res.json();
      if (data.directories) setDirectories(data.directories);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDirs();
  }, [fetchDirs]);

  async function handleStatusUpdate(id: number, status: DirStatus) {
    try {
      const res = await fetch(`/api/growth/directories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.directory) {
        setDirectories((prev) =>
          prev.map((d) => (d.id === id ? { ...d, ...data.directory } : d))
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  const listed = directories.filter((d) => d.status === "listed").length;
  const total = directories.length;

  if (loading) {
    return (
      <div className="h-64 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse" />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex gap-4 text-sm text-[#737373]">
          <span>
            <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">
              {listed}
            </span>{" "}
            listed
          </span>
          <span>
            <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">
              {total - listed}
            </span>{" "}
            pending
          </span>
          <span>
            <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">
              {total}
            </span>{" "}
            total
          </span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
          Add Directory
        </button>
      </div>

      <div className="overflow-x-auto border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px]">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#252525]">
              {[
                "Directory",
                "URL",
                "Status",
                "Submitted",
                "Listed",
                "Backlink",
                "Notes",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left py-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {directories.map((dir) => (
              <tr
                key={dir.id}
                className="border-b border-[#F5F5F5] dark:border-[#2A2A2A] hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors"
              >
                <td className="py-2.5 px-3 text-sm text-[#171717] dark:text-[#E5E5E5] font-medium">
                  {dir.directoryName}
                </td>
                <td className="py-2.5 px-3">
                  <a
                    href={dir.directoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-[#6366F1] hover:underline"
                  >
                    <span className="truncate max-w-[160px]">
                      {dir.directoryUrl}
                    </span>
                    <ExternalLink className="h-3 w-3 shrink-0" strokeWidth={1.5} />
                  </a>
                </td>
                <td className="py-2.5 px-3">
                  <select
                    value={dir.status ?? "submitted"}
                    onChange={(e) =>
                      handleStatusUpdate(dir.id, e.target.value as DirStatus)
                    }
                    className="text-[11px] cursor-pointer focus:outline-none bg-transparent border-0"
                    style={{ appearance: "none" }}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                  <div className="mt-0.5">
                    <StatusBadge status={(dir.status ?? "submitted") as DirStatus} />
                  </div>
                </td>
                <td className="py-2.5 px-3 text-xs text-[#A3A3A3]">
                  {dir.submittedAt
                    ? new Date(dir.submittedAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="py-2.5 px-3 text-xs text-[#A3A3A3]">
                  {dir.listedAt
                    ? new Date(dir.listedAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="py-2.5 px-3">
                  {dir.backlinkUrl ? (
                    <a
                      href={dir.backlinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#6366F1] hover:underline"
                    >
                      Link
                    </a>
                  ) : (
                    <span className="text-xs text-[#A3A3A3]">—</span>
                  )}
                </td>
                <td className="py-2.5 px-3 text-xs text-[#A3A3A3] max-w-[160px]">
                  <span className="line-clamp-2">{dir.notes ?? "—"}</span>
                </td>
              </tr>
            ))}
            {directories.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-8 text-center text-sm text-[#A3A3A3]"
                >
                  No directories yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddDirModal
          onClose={() => setShowModal(false)}
          onAdd={(dir) => setDirectories((prev) => [...prev, dir])}
        />
      )}
    </div>
  );
}
