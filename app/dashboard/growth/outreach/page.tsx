"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ExternalLink,
  Plus,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  MessageSquare,
} from "lucide-react";
import type { OutreachTarget, DirectorySubmission } from "@/lib/db/schema";

type OutreachStatus = "to_send" | "sent" | "replied" | "linked" | "rejected";
type DirStatus = "to_submit" | "submitted" | "listed" | "rejected";

const STATUS_BADGE: Record<OutreachStatus, string> = {
  to_send: "bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#737373] dark:text-[#737373]",
  sent: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  replied: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  linked: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  rejected: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
};

const DIR_STATUS_BADGE: Record<DirStatus, string> = {
  to_submit: "bg-[#F5F5F5] dark:bg-[#2A2A2A] text-[#737373]",
  submitted: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
  listed: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  rejected: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
};

const STATUS_OPTIONS: OutreachStatus[] = ["to_send", "sent", "replied", "linked", "rejected"];
const DIR_STATUS_OPTIONS: DirStatus[] = ["to_submit", "submitted", "listed", "rejected"];

function StatusBadge({ status }: { status: OutreachStatus }) {
  const cls = STATUS_BADGE[status] ?? STATUS_BADGE.to_send;
  return (
    <span
      className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] ${cls}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

function DirStatusBadge({ status }: { status: DirStatus }) {
  const cls = DIR_STATUS_BADGE[status] ?? DIR_STATUS_BADGE.to_submit;
  return (
    <span
      className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] ${cls}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

function isOverdue(followUpAt: Date | string | null): boolean {
  if (!followUpAt) return false;
  return new Date(followUpAt) < new Date();
}

function buildEmailTemplate(target: OutreachTarget): string {
  const articleTitle = target.articleTitle ?? "[article title]";
  const contactName = target.contactName ?? "there";
  return `Subject: Quick addition for your "${articleTitle}" list

Hi ${contactName},

I came across your article "${articleTitle}" — great roundup.

Wanted to flag SammaPix (sammapix.com), a free browser-based tool that handles image compression, HEIC conversion, AI-powered file renaming, and EXIF removal — no signup, no upload limits, privacy-first.

Would it fit in your list?

Luca
sammapix.com`;
}

interface AddTargetModalProps {
  onClose: () => void;
  onAdd: (target: OutreachTarget) => void;
}

function AddTargetModal({ onClose, onAdd }: AddTargetModalProps) {
  const [form, setForm] = useState({
    siteName: "",
    articleTitle: "",
    articleUrl: "",
    contactName: "",
    contactEmail: "",
    contactLinkedin: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.siteName) return;
    setSaving(true);
    try {
      const res = await fetch("/api/growth/outreach/targets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json() as { target?: OutreachTarget };
      if (data.target) {
        onAdd(data.target);
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
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
          Aggiungi target outreach
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { key: "siteName", label: "Nome sito", required: true },
            { key: "articleTitle", label: "Titolo articolo" },
            { key: "articleUrl", label: "URL articolo" },
            { key: "contactName", label: "Nome contatto" },
            { key: "contactEmail", label: "Email contatto" },
            { key: "contactLinkedin", label: "LinkedIn contatto" },
          ].map(({ key, label, required }) => (
            <div key={key}>
              <label className="block text-xs text-[#525252] mb-1">{label}</label>
              <input
                type="text"
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                required={required}
                className="w-full text-sm px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#252525] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1]"
              />
            </div>
          ))}
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
              {saving ? "Aggiunta..." : "Aggiungi target"}
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

function OutreachRow({
  target,
  onUpdate,
}: {
  target: OutreachTarget;
  onUpdate: (id: number, data: Partial<OutreachTarget>) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [replyDraft, setReplyDraft] = useState(target.replyText ?? "");
  const [savingReply, setSavingReply] = useState(false);

  async function patchTarget(data: Record<string, unknown>) {
    setSaving(true);
    try {
      const res = await fetch(
        `/api/growth/outreach/targets/${target.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const json = await res.json() as { target?: OutreachTarget };
      if (json.target) onUpdate(target.id, json.target);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  async function saveReply() {
    setSavingReply(true);
    try {
      const res = await fetch(`/api/growth/outreach/targets/${target.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replyText: replyDraft }),
      });
      const json = await res.json() as { target?: OutreachTarget };
      if (json.target) onUpdate(target.id, json.target);
    } catch (e) {
      console.error(e);
    } finally {
      setSavingReply(false);
    }
  }

  function copyEmail() {
    const text = buildEmailTemplate(target);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const overdue = target.status === "sent" && isOverdue(target.followUpAt);

  return (
    <>
      <tr className="border-b border-[#F5F5F5] dark:border-[#2A2A2A] hover:bg-[#FAFAFA] dark:hover:bg-[#252525] transition-colors">
        <td className="py-2.5 px-3 text-sm text-[#171717] dark:text-[#E5E5E5] font-medium whitespace-nowrap">
          {target.siteName}
        </td>
        <td className="py-2.5 px-3 max-w-[200px]">
          {target.articleUrl ? (
            <a
              href={target.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-[#525252] dark:text-[#A3A3A3] hover:text-[#171717] dark:hover:text-[#E5E5E5] group truncate"
            >
              <span className="truncate">{target.articleTitle ?? target.articleUrl}</span>
              <ExternalLink
                className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100"
                strokeWidth={1.5}
              />
            </a>
          ) : (
            <span className="text-xs text-[#A3A3A3]">{target.articleTitle ?? "—"}</span>
          )}
        </td>
        <td className="py-2.5 px-3">
          <div className="text-xs text-[#525252] dark:text-[#A3A3A3]">
            <div>{target.contactName ?? "—"}</div>
            {target.contactEmail && (
              <div className="text-[10px] text-[#A3A3A3]">{target.contactEmail}</div>
            )}
            {target.contactLinkedin && (
              <a
                href={target.contactLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-[#6366F1] hover:underline"
              >
                LinkedIn
              </a>
            )}
          </div>
        </td>
        <td className="py-2.5 px-3">
          <select
            value={target.status ?? "to_send"}
            onChange={(e) => patchTarget({ status: e.target.value })}
            disabled={saving}
            className="text-[11px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] border-0 cursor-pointer focus:outline-none bg-transparent disabled:opacity-50"
            style={{ appearance: "none" }}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </select>
          <div className="mt-0.5">
            <StatusBadge status={(target.status ?? "to_send") as OutreachStatus} />
          </div>
        </td>
        <td className="py-2.5 px-3 text-xs text-[#A3A3A3] whitespace-nowrap">
          {target.sentAt ? new Date(target.sentAt).toLocaleDateString() : "—"}
        </td>
        <td className="py-2.5 px-3 whitespace-nowrap">
          {target.followUpAt ? (
            <span
              className={`text-xs ${
                overdue
                  ? "text-red-600 font-medium"
                  : "text-[#A3A3A3]"
              }`}
            >
              {new Date(target.followUpAt).toLocaleDateString()}
              {overdue && " (scaduto)"}
            </span>
          ) : (
            <span className="text-xs text-[#A3A3A3]">—</span>
          )}
        </td>
        <td className="py-2.5 px-3 text-center">
          <button
            onClick={() =>
              patchTarget({ backlinkVerified: !target.backlinkVerified })
            }
            disabled={saving}
            className={`w-5 h-5 rounded-[4px] border flex items-center justify-center transition-colors ${
              target.backlinkVerified
                ? "bg-green-500 border-green-500 text-white"
                : "border-[#D4D4D4] dark:border-[#404040] hover:border-green-400"
            }`}
          >
            {target.backlinkVerified && (
              <Check className="h-3 w-3" strokeWidth={2} />
            )}
          </button>
        </td>
        <td className="py-2.5 px-3 max-w-[160px]">
          {target.notes ? (
            <div>
              <button
                onClick={() => setNotesExpanded((v) => !v)}
                className="flex items-center gap-1 text-[11px] text-[#737373]"
              >
                Note
                {notesExpanded ? (
                  <ChevronUp className="h-3 w-3" strokeWidth={1.5} />
                ) : (
                  <ChevronDown className="h-3 w-3" strokeWidth={1.5} />
                )}
              </button>
              {notesExpanded && (
                <p className="text-xs text-[#525252] dark:text-[#A3A3A3] mt-1 whitespace-pre-wrap">
                  {target.notes}
                </p>
              )}
            </div>
          ) : (
            <span className="text-xs text-[#A3A3A3]">—</span>
          )}
        </td>
        {/* Actions column */}
        <td className="py-2.5 px-3 whitespace-nowrap">
          <div className="flex items-center gap-1.5">
            {/* Copy email button */}
            <button
              onClick={copyEmail}
              title="Copy outreach email"
              className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded-[4px] border transition-colors ${
                copied
                  ? "border-green-400 text-green-600 bg-green-50 dark:bg-green-900/20"
                  : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"
              }`}
            >
              {copied ? (
                <Check className="h-3 w-3" strokeWidth={2} />
              ) : (
                <Copy className="h-3 w-3" strokeWidth={1.5} />
              )}
              {copied ? "Copiato!" : "Email"}
            </button>
            {/* Reply expand button */}
            <button
              onClick={() => setExpanded((v) => !v)}
              title="Add reply"
              className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded-[4px] border transition-colors ${
                target.replyText
                  ? "border-blue-300 text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800"
                  : "border-[#E5E5E5] dark:border-[#2A2A2A] text-[#737373] hover:bg-[#F5F5F5] dark:hover:bg-[#252525]"
              }`}
            >
              <MessageSquare className="h-3 w-3" strokeWidth={1.5} />
              {target.replyText ? "Risposta" : "Risposta"}
              {expanded ? (
                <ChevronUp className="h-3 w-3" strokeWidth={1.5} />
              ) : (
                <ChevronDown className="h-3 w-3" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </td>
      </tr>

      {/* Expandable reply row */}
      {expanded && (
        <tr className="border-b border-[#F5F5F5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#252525]">
          <td colSpan={9} className="px-4 py-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">
                  Risposta ricevuta
                </label>
                {target.repliedAt && (
                  <span className="text-[10px] text-[#A3A3A3]">
                    Salvato {new Date(target.repliedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
              <textarea
                value={replyDraft}
                onChange={(e) => setReplyDraft(e.target.value)}
                rows={4}
                placeholder="Incolla qui la risposta ricevuta..."
                className="w-full text-sm px-3 py-2 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-white dark:bg-[#1E1E1E] text-[#171717] dark:text-[#E5E5E5] focus:outline-none focus:border-[#6366F1] resize-y"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={saveReply}
                  disabled={savingReply}
                  className="text-sm px-3 py-1.5 bg-[#171717] dark:bg-[#E5E5E5] text-white dark:text-[#171717] rounded-[6px] hover:bg-[#262626] disabled:opacity-50 transition-colors"
                >
                  {savingReply ? "Salvataggio..." : "Salva risposta"}
                </button>
                {replyDraft && replyDraft !== target.replyText && (
                  <span className="text-[10px] text-[#A3A3A3]">Modifiche non salvate</span>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function OutreachPage() {
  const [targets, setTargets] = useState<OutreachTarget[]>([]);
  const [directories, setDirectories] = useState<DirectorySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [tRes, dRes] = await Promise.all([
        fetch("/api/growth/outreach/targets"),
        fetch("/api/growth/directories"),
      ]);
      const [tData, dData] = await Promise.all([
        tRes.json() as Promise<{ targets?: OutreachTarget[] }>,
        dRes.json() as Promise<{ directories?: DirectorySubmission[] }>,
      ]);
      if (tData.targets) setTargets(tData.targets);
      if (dData.directories) setDirectories(dData.directories);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleTargetUpdate(id: number, updated: Partial<OutreachTarget>) {
    setTargets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  }

  async function handleDirUpdate(id: number, status: DirStatus) {
    try {
      const res = await fetch(`/api/growth/directories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json() as { directory?: DirectorySubmission };
      if (data.directory) {
        setDirectories((prev) =>
          prev.map((d) => (d.id === id ? { ...d, ...data.directory! } : d))
        );
      }
    } catch (e) {
      console.error(e);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-64 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse" />
        <div className="h-32 bg-[#F5F5F5] dark:bg-[#252525] rounded-[6px] animate-pulse" />
      </div>
    );
  }

  // ── Funnel stats ─────────────────────────────────────────────────────────
  const funnelSent = targets.filter((t) => t.sentAt != null).length;
  const funnelReplied = targets.filter(
    (t) => t.status === "replied" || t.status === "linked"
  ).length;
  const funnelLinked = targets.filter((t) => t.status === "linked").length;
  const funnelDirectories = directories.filter(
    (d) => d.status === "listed"
  ).length;

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="space-y-3">
        <div>
          <h1 className="text-base font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Link Building
          </h1>
          <p className="mt-1 text-xs text-[#737373] dark:text-[#A3A3A3] max-w-2xl">
            Gestisci il tuo funnel di link building: trova siti target &rarr; invia email &rarr; ottieni backlink. Le directory sono un altro canale per ottenere link.
          </p>
        </div>

        {/* Mini funnel summary */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] py-2 px-3 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] bg-[#FAFAFA] dark:bg-[#252525]">
          <span className="text-[#171717] dark:text-[#E5E5E5] font-semibold tabular-nums">
            {funnelSent}
          </span>
          <span className="text-[#A3A3A3]">email inviate</span>
          <span className="text-[#D4D4D4] dark:text-[#404040]">&rarr;</span>
          <span className="text-[#171717] dark:text-[#E5E5E5] font-semibold tabular-nums">
            {funnelReplied}
          </span>
          <span className="text-[#A3A3A3]">risposte</span>
          <span className="text-[#D4D4D4] dark:text-[#404040]">&rarr;</span>
          <span className="text-green-600 dark:text-green-400 font-semibold tabular-nums">
            {funnelLinked}
          </span>
          <span className="text-[#A3A3A3]">backlink ottenuti</span>
          <span className="text-[#D4D4D4] dark:text-[#404040] mx-1">|</span>
          <span className="text-[#6366F1] font-semibold tabular-nums">
            {funnelDirectories}
          </span>
          <span className="text-[#A3A3A3]">directory listate</span>
        </div>
      </div>

      {/* Outreach Targets */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Target outreach
            <span className="ml-2 text-xs font-normal text-[#A3A3A3]">
              {targets.length} totali
            </span>
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] text-[#525252] dark:text-[#A3A3A3] hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
            Aggiungi target
          </button>
        </div>

        <div className="overflow-x-auto border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px]">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#252525]">
                {[
                  "Sito",
                  "Articolo",
                  "Contatto",
                  "Stato",
                  "Inviato",
                  "Follow-up",
                  "Backlink",
                  "Note",
                  "Azioni",
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
              {targets.map((target) => (
                <OutreachRow
                  key={target.id}
                  target={target}
                  onUpdate={handleTargetUpdate}
                />
              ))}
              {targets.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="py-8 text-center text-sm text-[#A3A3A3]"
                  >
                    Nessun target outreach ancora
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Directory Submissions */}
      <div>
        <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5] mb-4">
          Invii directory
          <span className="ml-2 text-xs font-normal text-[#A3A3A3]">
            {directories.filter((d) => d.status === "listed").length} listati /{" "}
            {directories.length} totali
          </span>
        </h2>

        <div className="overflow-x-auto border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px]">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-[#FAFAFA] dark:bg-[#252525]">
                {["Directory", "URL", "Stato", "Inviato", "Listato"].map(
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
                      className="text-xs text-[#6366F1] hover:underline"
                    >
                      {dir.directoryUrl}
                    </a>
                  </td>
                  <td className="py-2.5 px-3">
                    <select
                      value={dir.status ?? "submitted"}
                      onChange={(e) =>
                        handleDirUpdate(dir.id, e.target.value as DirStatus)
                      }
                      className="text-[11px] cursor-pointer focus:outline-none bg-transparent border-0"
                      style={{ appearance: "none" }}
                    >
                      {DIR_STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                    <div className="mt-0.5">
                      <DirStatusBadge
                        status={(dir.status ?? "submitted") as DirStatus}
                      />
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
                </tr>
              ))}
              {directories.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-sm text-[#A3A3A3]"
                  >
                    Nessuna directory ancora
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <AddTargetModal
          onClose={() => setShowModal(false)}
          onAdd={(target) => setTargets((prev) => [...prev, target])}
        />
      )}
    </div>
  );
}
