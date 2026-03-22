"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, ExternalLink } from "lucide-react";
import type { ContentItem } from "@/lib/db/schema";

type ContentStatus = "idea" | "writing" | "published" | "needs_update";

const STATUS_BADGE: Record<ContentStatus, string> = {
  idea: "bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#737373]",
  writing: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  published: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  needs_update: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
};

const STATUS_OPTIONS: ContentStatus[] = ["idea", "writing", "published", "needs_update"];

function StatusBadge({ status }: { status: ContentStatus }) {
  const cls = STATUS_BADGE[status] ?? STATUS_BADGE.idea;
  return (
    <span
      className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] ${cls}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

interface AddContentModalProps {
  onClose: () => void;
  onAdd: (item: ContentItem) => void;
}

function AddContentModal({ onClose, onAdd }: AddContentModalProps) {
  const [form, setForm] = useState({
    title: "",
    targetKeyword: "",
    publishedUrl: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title) return;
    setSaving(true);
    try {
      const res = await fetch("/api/growth/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.item) {
        onAdd(data.item);
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
          Aggiungi contenuto
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs text-[#525252] mb-1">Titolo</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full text-sm px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1]"
            />
          </div>
          <div>
            <label className="block text-xs text-[#525252] mb-1">Keyword target</label>
            <input
              type="text"
              value={form.targetKeyword}
              onChange={(e) => setForm({ ...form, targetKeyword: e.target.value })}
              className="w-full text-sm px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1]"
            />
          </div>
          <div>
            <label className="block text-xs text-[#525252] mb-1">URL pubblicato</label>
            <input
              type="url"
              value={form.publishedUrl}
              onChange={(e) => setForm({ ...form, publishedUrl: e.target.value })}
              className="w-full text-sm px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1]"
            />
          </div>
          <div>
            <label className="block text-xs text-[#525252] mb-1">Note</label>
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
              {saving ? "Aggiunta..." : "Aggiungi"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-sm px-4 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
            >
              Annulla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ContentRow({
  item,
  onUpdate,
}: {
  item: ContentItem;
  onUpdate: (id: number, data: Partial<ContentItem>) => void;
}) {
  const [saving, setSaving] = useState(false);

  async function patchItem(data: Record<string, unknown>) {
    setSaving(true);
    try {
      const res = await fetch(`/api/growth/content/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.item) onUpdate(item.id, json.item);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  return (
    <tr className="border-b border-[#F5F5F5] dark:border-[#2A2A2A] hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors">
      <td className="py-2.5 px-3 text-sm text-[#171717] dark:text-[#E5E5E5]">
        {item.title}
      </td>
      <td className="py-2.5 px-3 text-xs text-[#737373] dark:text-[#737373]">
        {item.targetKeyword ? (
          <span className="bg-[#F5F5F5] dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded-[4px]">
            {item.targetKeyword}
          </span>
        ) : (
          "—"
        )}
      </td>
      <td className="py-2.5 px-3">
        <select
          value={item.status ?? "idea"}
          onChange={(e) => patchItem({ status: e.target.value })}
          disabled={saving}
          className="text-[11px] cursor-pointer focus:outline-none bg-transparent border-0 disabled:opacity-50"
          style={{ appearance: "none" }}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
        <div className="mt-0.5">
          <StatusBadge status={(item.status ?? "idea") as ContentStatus} />
        </div>
      </td>
      <td className="py-2.5 px-3">
        {item.publishedUrl ? (
          <a
            href={item.publishedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-[#6366F1] hover:underline"
          >
            <span className="truncate max-w-[180px]">{item.publishedUrl}</span>
            <ExternalLink className="h-3 w-3 shrink-0" strokeWidth={1.5} />
          </a>
        ) : (
          <span className="text-xs text-[#A3A3A3]">—</span>
        )}
      </td>
      <td className="py-2.5 px-3 text-xs text-[#A3A3A3] max-w-[200px]">
        <span className="line-clamp-2">{item.notes ?? "—"}</span>
      </td>
    </tr>
  );
}

export default function ContentPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/growth/content");
      const data = await res.json();
      if (data.items) setItems(data.items);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  function handleUpdate(id: number, updated: Partial<ContentItem>) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updated } : i))
    );
  }

  const byStatus = {
    idea: items.filter((i) => i.status === "idea").length,
    writing: items.filter((i) => i.status === "writing").length,
    published: items.filter((i) => i.status === "published").length,
    needs_update: items.filter((i) => i.status === "needs_update").length,
  };

  if (loading) {
    return (
      <div className="h-64 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse" />
    );
  }

  return (
    <div>
      {/* Stats + action */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex gap-4 text-sm text-[#737373]">
          {Object.entries(byStatus).map(([status, count]) => (
            <span key={status}>
              <span className="font-medium text-[#171717] dark:text-[#E5E5E5]">
                {count}
              </span>{" "}
              {status.replace("_", " ")}
            </span>
          ))}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
          Aggiungi contenuto
        </button>
      </div>

      <div className="overflow-x-auto border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px]">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#252525]">
              {["Titolo", "Keyword", "Stato", "URL pubblicato", "Note"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left py-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3]"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <ContentRow key={item.id} item={item} onUpdate={handleUpdate} />
            ))}
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-sm text-[#A3A3A3]"
                >
                  Nessun contenuto ancora
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddContentModal
          onClose={() => setShowModal(false)}
          onAdd={(item) => setItems((prev) => [item, ...prev])}
        />
      )}
    </div>
  );
}
