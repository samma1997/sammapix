"use client";

import "@xyflow/react/dist/style.css";

import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  type Edge,
  type Connection,
  type OnConnect,
  type IsValidConnection,
  type OnNodesChange,
  type OnEdgesChange,
  MarkerType,
} from "@xyflow/react";
import { Play, Plus, Loader2, AlertTriangle, ChevronDown, LayoutTemplate, X as XIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import { NODE_SPECS, isProcessingKind, type NodeKind } from "@/lib/studio/nodes";
import { runGraph, type StudioGraph } from "@/lib/studio/executor";
import { STUDIO_TEMPLATES, expandTemplate } from "@/lib/studio/templates";
import {
  studioNodeTypes,
  StudioCallbacksContext,
  type StudioCallbacks,
  type StudioNodeData,
  type StudioFlowNode,
  type NodeStatus,
} from "./StudioNode";

// ── Constants ──────────────────────────────────────────────────────────────────

/** Max processing nodes (non-input, non-output) allowed on the free plan. */
const FREE_MAX_STEPS = 3;

// Green wire style
const EDGE_STYLE = {
  stroke: "#10B981",
  strokeWidth: 2,
};

const DEFAULT_EDGE_OPTIONS = {
  style: EDGE_STYLE,
  markerEnd: { type: MarkerType.ArrowClosed, color: "#10B981" },
};

// ── ID generator ───────────────────────────────────────────────────────────────

let _nodeIdCounter = 10;
function nextNodeId(): string {
  return `n${++_nodeIdCounter}`;
}

// ── Initial graph (Input -> Resize -> Compress -> Output) ──────────────────────

function buildInitialGraph() {
  const inputId = "n1";
  const resizeId = "n2";
  const compressId = "n3";
  const outputId = "n4";

  const nodes: StudioFlowNode[] = [
    {
      id: inputId,
      type: "studioNode",
      position: { x: 40, y: 200 },
      data: { kind: "input", config: {}, status: "idle", files: [] },
    },
    {
      id: resizeId,
      type: "studioNode",
      position: { x: 320, y: 200 },
      data: { kind: "resize", config: { maxPx: 1080 }, status: "idle" },
    },
    {
      id: compressId,
      type: "studioNode",
      position: { x: 600, y: 200 },
      data: { kind: "compress", config: { quality: 80 }, status: "idle" },
    },
    {
      id: outputId,
      type: "studioNode",
      position: { x: 880, y: 200 },
      data: { kind: "output", config: {}, status: "idle", results: [] },
    },
  ];

  const edges: Edge[] = [
    {
      id: "e1-2",
      source: inputId,
      target: resizeId,
      ...DEFAULT_EDGE_OPTIONS,
    },
    {
      id: "e2-3",
      source: resizeId,
      target: compressId,
      ...DEFAULT_EDGE_OPTIONS,
    },
    {
      id: "e3-4",
      source: compressId,
      target: outputId,
      ...DEFAULT_EDGE_OPTIONS,
    },
  ];

  return { nodes, edges };
}

// ── Cycle detection (DFS) for connection validation ────────────────────────────

function wouldCreateCycle(
  sourceId: string,
  targetId: string,
  edges: Edge[]
): boolean {
  const adj = new Map<string, string[]>();
  for (const e of edges) {
    if (!adj.has(e.source)) adj.set(e.source, []);
    adj.get(e.source)!.push(e.target);
  }
  if (!adj.has(sourceId)) adj.set(sourceId, []);
  adj.get(sourceId)!.push(targetId);

  const visited = new Set<string>();
  const stack = [targetId];
  while (stack.length > 0) {
    const cur = stack.pop()!;
    if (cur === sourceId) return true;
    if (visited.has(cur)) continue;
    visited.add(cur);
    for (const nbr of adj.get(cur) ?? []) {
      stack.push(nbr);
    }
  }
  return false;
}

// ── Palette button ─────────────────────────────────────────────────────────────

function PaletteButton({
  kind,
  onClick,
}: {
  kind: NodeKind;
  onClick: () => void;
}) {
  const spec = NODE_SPECS[kind];

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-left transition-colors hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] group"
    >
      <span
        className="w-2 h-2 rounded-full shrink-0 transition-transform group-hover:scale-125"
        style={{ background: spec.accent }}
      />
      <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] group-hover:text-[#171717] dark:group-hover:text-[#E5E5E5]">
        {spec.label}
      </span>
    </button>
  );
}

// ── Templates dropdown ─────────────────────────────────────────────────────────

function TemplatesDropdown({ onSelect }: { onSelect: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#6366F1] text-[#525252] dark:text-[#A3A3A3] hover:text-[#6366F1] dark:hover:text-[#6366F1] text-xs rounded-lg transition-colors"
      >
        <LayoutTemplate className="h-3.5 w-3.5" strokeWidth={1.75} />
        Templates
        <ChevronDown
          className="h-3 w-3 transition-transform"
          strokeWidth={2}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-1.5 right-0 w-56 rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] shadow-lg z-50 overflow-hidden">
          <div className="px-3 py-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
            <p className="text-[10px] font-semibold text-[#A3A3A3] uppercase tracking-widest">
              Load Template
            </p>
          </div>
          <div className="p-1.5 space-y-0.5">
            {STUDIO_TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => {
                  onSelect(tpl.id);
                  setOpen(false);
                }}
                className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A] group transition-colors"
              >
                <p className="text-xs font-semibold text-[#171717] dark:text-[#E5E5E5] group-hover:text-[#6366F1]">
                  {tpl.label}
                </p>
                <p className="text-[10px] text-[#A3A3A3] leading-snug mt-0.5">
                  {tpl.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Handle hover CSS (injected once) ──────────────────────────────────────────

const HANDLE_HOVER_CSS = `
.studio-handle:hover {
  transform: scale(1.35) !important;
  box-shadow: 0 0 0 3px rgba(16,185,129,0.35), 0 0 8px rgba(16,185,129,0.5) !important;
}
`;

function GlobalHandleStyles() {
  return <style>{HANDLE_HOVER_CSS}</style>;
}

// ── Main canvas ────────────────────────────────────────────────────────────────

export default function StudioCanvas() {
  const { data: session, status: sessionStatus } = useSession();
  const user = session?.user as { plan?: string } | undefined;
  const isPro = user?.plan === "pro";
  const isAuthenticated = sessionStatus === "authenticated";

  const { nodes: initNodes, edges: initEdges } = buildInitialGraph();
  const [nodes, setNodes, onNodesChangeRaw] = useNodesState<StudioFlowNode>(initNodes);
  const [edges, setEdges, onEdgesChangeRaw] = useEdgesState(initEdges);

  const [running, setRunning] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);

  // ── Dirty state ───────────────────────────────────────────────────────────────
  // `hasRun` tracks whether at least one run has produced results.
  // `dirty` becomes true only after a run when structural/config changes happen.
  const [hasRun, setHasRun] = useState(false);
  const [dirty, setDirty] = useState(false);

  // ── AI Rename auth warning ─────────────────────────────────────────────────
  const [showAiRenameWarning, setShowAiRenameWarning] = useState(false);

  // ── Onboarding overlay (FIX 5) ────────────────────────────────────────────────
  // Show only on the very first visit; localStorage key guards it.
  const ONBOARDING_KEY = "sammapix-studio-welcomed";
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !localStorage.getItem(ONBOARDING_KEY);
  });

  // When set to a node id, the InputConfig component for that node will
  // programmatically click its hidden file input via a custom DOM event.
  const [triggerPickerForNode, setTriggerPickerForNode] = useState<string | null>(null);

  const dismissOnboarding = useCallback(() => {
    localStorage.setItem(ONBOARDING_KEY, "1");
    setShowOnboarding(false);
  }, []);

  // Load a template from the onboarding overlay and open the file picker.
  const loadTemplateAndPick = useCallback(
    (templateId: string) => {
      const tpl = STUDIO_TEMPLATES.find((t) => t.id === templateId);
      if (!tpl) return;
      const { nodes: tplNodes, edges: tplEdges } = expandTemplate(tpl);
      setNodes(tplNodes);
      setEdges(tplEdges);
      setHasRun(false);
      setDirty(false);
      setShowAiRenameWarning(false);
      if (!isPro) {
        const tplSteps = tplNodes.filter((n) => isProcessingKind(n.data.kind)).length;
        if (tplSteps > FREE_MAX_STEPS) setShowUpsell(true);
      }
      dismissOnboarding();
      // Find the input node id so we can open its file picker.
      const inputNode = tplNodes.find((n) => n.data.kind === "input");
      if (inputNode) {
        setTriggerPickerForNode(inputNode.id);
      }
    },
    [setNodes, setEdges, isPro, dismissOnboarding]
  );

  // ── Auto-run (FIX 5) ──────────────────────────────────────────────────────────
  // True once the first auto-run has fired so we never repeat it.
  const autoRunFiredRef = useRef(false);

  // Ref to always read the latest node/edge snapshot in async callbacks
  const nodesRef = useRef(nodes);
  nodesRef.current = nodes;

  // ── Structural change wrappers (mark dirty after a run) ───────────────────────
  //
  // We intercept add/remove/connect/disconnect here.
  // Drag-position changes come through onNodesChange as "position" type events,
  // which we do NOT mark dirty.

  const onNodesChange: OnNodesChange<StudioFlowNode> = useCallback(
    (changes) => {
      onNodesChangeRaw(changes);
      if (!hasRun) return;
      // Only add/remove events mark dirty (not "position", "select", "dimensions")
      const structural = changes.some(
        (c) => c.type === "add" || c.type === "remove"
      );
      if (structural) setDirty(true);
    },
    [onNodesChangeRaw, hasRun]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      onEdgesChangeRaw(changes);
      if (!hasRun) return;
      // Edge add/remove = structural
      const structural = changes.some(
        (c) => c.type === "add" || c.type === "remove"
      );
      if (structural) setDirty(true);
    },
    [onEdgesChangeRaw, hasRun]
  );

  // ── Node data updater ────────────────────────────────────────────────────────

  const patchNodeData = useCallback(
    (id: string, patch: Partial<StudioNodeData>) => {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === id
            ? { ...n, data: { ...n.data, ...patch } }
            : n
        )
      );
    },
    [setNodes]
  );

  // ── Config change handler ────────────────────────────────────────────────────

  const handleConfigChange = useCallback(
    (nodeId: string, configPatch: Record<string, unknown>) => {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === nodeId
            ? {
                ...n,
                data: {
                  ...n.data,
                  config: {
                    ...n.data.config,
                    ...configPatch,
                  },
                },
              }
            : n
        )
      );
      // Config change marks dirty after a run
      if (hasRun) setDirty(true);
    },
    [setNodes, hasRun]
  );

  // ── Files change handler ──────────────────────────────────────────────────────

  // handleRun is defined below; we need a stable ref to call it from handleFilesChange
  // without a circular dependency. The ref is updated every render.
  const handleRunRef = useRef<() => void>(() => {});

  const handleFilesChange = useCallback(
    (nodeId: string, files: File[]) => {
      patchNodeData(nodeId, { files });
      // New file upload: only structural if we already ran (triggers re-run hint)
      if (hasRun) setDirty(true);

      // Auto-run: fire once on the first file upload if the graph has a valid path.
      // We check via a timeout so the state update for `files` has been flushed.
      if (!autoRunFiredRef.current && !hasRun) {
        autoRunFiredRef.current = true;
        // Defer to next tick to let React flush the files state update.
        setTimeout(() => {
          handleRunRef.current();
        }, 0);
      }
    },
    [patchNodeData, hasRun]
  );

  // Delete a node and every edge touching it.
  const handleDelete = useCallback(
    (nodeId: string) => {
      setNodes((prev) => prev.filter((n) => n.id !== nodeId));
      setEdges((prev) =>
        prev.filter((e) => e.source !== nodeId && e.target !== nodeId)
      );
      if (hasRun) setDirty(true);
    },
    [setNodes, setEdges, hasRun]
  );

  const callbacks = useMemo<StudioCallbacks>(
    () => ({
      onConfigChange: handleConfigChange,
      onFilesChange: handleFilesChange,
      onDelete: handleDelete,
    }),
    [handleConfigChange, handleFilesChange, handleDelete]
  );

  // Set the flowing-green animation on edges entering a node.
  const animateEdgesInto = useCallback(
    (nodeId: string, animated: boolean) => {
      setEdges((prev) =>
        prev.map((e) =>
          e.target === nodeId
            ? {
                ...e,
                animated,
                style: {
                  ...EDGE_STYLE,
                  strokeWidth: animated ? 3 : 2,
                },
              }
            : e
        )
      );
    },
    [setEdges]
  );

  // Reset all edges to the idle green style.
  const resetEdges = useCallback(() => {
    setEdges((prev) =>
      prev.map((e) => ({ ...e, animated: false, style: { ...EDGE_STYLE } }))
    );
  }, [setEdges]);

  // ── Connection validation ────────────────────────────────────────────────────

  const isValidConnection = useCallback<IsValidConnection>(
    (connection) => {
      const source: string = connection.source;
      const target: string = connection.target;
      if (!source || !target) return false;
      if (source === target) return false;
      if (wouldCreateCycle(source, target, edges)) return false;
      return true;
    },
    [edges]
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((prev) =>
        addEdge(
          { ...connection, ...DEFAULT_EDGE_OPTIONS },
          prev
        )
      );
      if (hasRun) setDirty(true);
    },
    [setEdges, hasRun]
  );

  // ── Add node ─────────────────────────────────────────────────────────────────

  const addNode = useCallback(
    (kind: NodeKind) => {
      // Gate: only processing nodes (non-input, non-output) count toward the free limit.
      if (!isPro && isProcessingKind(kind)) {
        const currentSteps = nodes.filter((n) => isProcessingKind(n.data.kind)).length;
        if (currentSteps >= FREE_MAX_STEPS) {
          setShowUpsell(true);
          return;
        }
      }
      const spec = NODE_SPECS[kind];
      const id = nextNodeId();
      const newNode: StudioFlowNode = {
        id,
        type: "studioNode",
        position: {
          x: 100 + Math.random() * 200,
          y: 100 + Math.random() * 200,
        },
        data: {
          kind,
          config: { ...spec.defaultConfig },
          status: "idle",
        },
      };
      setNodes((prev) => [...prev, newNode]);
      if (hasRun) setDirty(true);
    },
    [nodes, isPro, setNodes, hasRun]
  );

  // ── Load template ─────────────────────────────────────────────────────────────

  const loadTemplate = useCallback(
    (templateId: string) => {
      const tpl = STUDIO_TEMPLATES.find((t) => t.id === templateId);
      if (!tpl) return;
      const { nodes: tplNodes, edges: tplEdges } = expandTemplate(tpl);
      setNodes(tplNodes);
      setEdges(tplEdges);
      // Reset all run-state when a template loads
      setHasRun(false);
      setDirty(false);
      setShowAiRenameWarning(false);
      // Warn free users if the template contains more than FREE_MAX_STEPS processing nodes.
      if (!isPro) {
        const tplSteps = tplNodes.filter((n) => isProcessingKind(n.data.kind)).length;
        if (tplSteps > FREE_MAX_STEPS) {
          setShowUpsell(true);
        }
      }
    },
    [setNodes, setEdges, isPro]
  );

  // ── Run pipeline ─────────────────────────────────────────────────────────────

  const handleRun = useCallback(async (opts?: { silent?: boolean }) => {
    const currentNodes = nodesRef.current;

    // Check if any ai-rename node is in the graph and user is not authenticated
    const hasAiRename = currentNodes.some((n) => n.data.kind === "ai-rename");
    if (hasAiRename && !isAuthenticated) {
      if (!opts?.silent) setShowAiRenameWarning(true);
      return;
    }
    setShowAiRenameWarning(false);

    const uploaded: File[] = currentNodes
      .filter((n) => n.data.kind === "input")
      .flatMap((n) => n.data.files ?? []);

    if (uploaded.length === 0) {
      // Silent auto-run with no files: do nothing (no alert)
      if (!opts?.silent) alert("Upload images in the Input node first.");
      return;
    }

    // Reset all node statuses + clear stale previews
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        data: {
          ...n.data,
          status: "idle" as NodeStatus,
          errorMsg: undefined,
          previewBlob: undefined,
          previewCount: undefined,
          outdated: false,
          results: n.data.kind === "output" ? [] : n.data.results,
        },
      }))
    );

    setRunning(true);
    setDirty(false);
    resetEdges();

    const graph: StudioGraph = {
      nodes: currentNodes.map((n) => ({
        id: n.id,
        kind: n.data.kind,
        config: n.data.config,
      })),
      edges: edges.map((e) => ({ source: e.source, target: e.target })),
    };

    try {
      await runGraph(graph, uploaded, {
        onNodeStart: (nodeId) => {
          patchNodeData(nodeId, { status: "running" });
          animateEdgesInto(nodeId, true);
        },
        onNodeDone: (nodeId, outputs) => {
          const node = nodesRef.current.find((n) => n.id === nodeId);
          const isOutput = node?.data.kind === "output";
          patchNodeData(nodeId, {
            status: "done",
            previewBlob: outputs[0]?.blob,
            previewCount: outputs.length,
            outdated: false,
            ...(isOutput ? { results: outputs } : {}),
          });
          animateEdgesInto(nodeId, false);
        },
        onNodeError: (nodeId, error) => {
          patchNodeData(nodeId, {
            status: "error",
            errorMsg: error.message,
          });
          animateEdgesInto(nodeId, false);
        },
      });
      setHasRun(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(`Pipeline error: ${msg}`);
    } finally {
      setRunning(false);
    }
  }, [edges, setNodes, patchNodeData, animateEdgesInto, resetEdges, isAuthenticated]);

  // Keep the ref pointing to the latest handleRun so handleFilesChange can call it
  // without creating a circular dependency or stale closure.
  React.useEffect(() => {
    handleRunRef.current = () => handleRun({ silent: true });
  });

  // Emit custom event when a picker should open for a specific input node.
  React.useEffect(() => {
    if (!triggerPickerForNode) return;
    window.dispatchEvent(
      new CustomEvent("studio:open-picker", { detail: { nodeId: triggerPickerForNode } })
    );
    setTriggerPickerForNode(null);
  }, [triggerPickerForNode]);

  // When dirty becomes true, mark all nodes with existing previews as outdated
  const prevDirty = useRef(false);
  React.useEffect(() => {
    if (dirty && !prevDirty.current) {
      setNodes((prev) =>
        prev.map((n) =>
          n.data.previewBlob || (n.data.kind === "output" && (n.data.results?.length ?? 0) > 0)
            ? { ...n, data: { ...n.data, outdated: true } }
            : n
        )
      );
    }
    prevDirty.current = dirty;
  }, [dirty, setNodes]);

  // ── Render ────────────────────────────────────────────────────────────────────

  const allKinds: NodeKind[] = [
    "input",
    "resize",
    "crop",
    "rotate",
    "flip",
    "adjust",
    "filter",
    "convert",
    "compress",
    "webp",
    "border",
    "background",
    "round",
    "watermark",
    "exif-strip",
    "ai-rename",
    "output",
  ];

  return (
    <div className="flex h-full min-h-0 relative">
      <GlobalHandleStyles />

      {/* Onboarding overlay — shown once on first visit (FIX 5) */}
      {showOnboarding && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          style={{ transition: "opacity 0.2s cubic-bezier(0.32,0.72,0,1)" }}
        >
          <div className="relative w-full max-w-md mx-4 rounded-2xl border border-[#2A2A2A] bg-[#141414] shadow-2xl p-6">
            {/* Close */}
            <button
              onClick={dismissOnboarding}
              className="absolute top-3 right-3 flex items-center justify-center h-7 w-7 rounded-lg text-[#737373] hover:text-white hover:bg-[#2A2A2A] transition-colors"
              aria-label="Close"
            >
              <XIcon className="h-4 w-4" strokeWidth={2} />
            </button>

            <div className="mb-5">
              <p className="text-[10px] font-semibold text-[#6366F1] uppercase tracking-widest mb-1">
                Image Studio
              </p>
              <h2 className="text-lg font-bold text-white leading-snug">
                Build an image pipeline
              </h2>
              <p className="text-sm text-[#A3A3A3] mt-1 leading-relaxed">
                Chain nodes to resize, compress, watermark and more. Pick a starting point below.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {/* Web Ready */}
              <button
                onClick={() => loadTemplateAndPick("web-ready")}
                className="flex flex-col items-start gap-2 rounded-xl border border-[#2A2A2A] hover:border-[#6366F1] bg-[#1E1E1E] hover:bg-[#6366F1]/10 px-3 py-3 text-left transition-colors group"
              >
                <span className="text-lg">🌐</span>
                <span className="text-xs font-semibold text-white group-hover:text-[#6366F1] leading-tight">
                  Web Ready
                </span>
                <span className="text-[10px] text-[#737373] leading-snug">
                  Resize, compress, WebP
                </span>
              </button>

              {/* Social Post */}
              <button
                onClick={() => loadTemplateAndPick("social-post")}
                className="flex flex-col items-start gap-2 rounded-xl border border-[#2A2A2A] hover:border-[#10B981] bg-[#1E1E1E] hover:bg-[#10B981]/10 px-3 py-3 text-left transition-colors group"
              >
                <span className="text-lg">📸</span>
                <span className="text-xs font-semibold text-white group-hover:text-[#10B981] leading-tight">
                  Social Post
                </span>
                <span className="text-[10px] text-[#737373] leading-snug">
                  4:5, watermark
                </span>
              </button>

              {/* Start blank */}
              <button
                onClick={dismissOnboarding}
                className="flex flex-col items-start gap-2 rounded-xl border border-[#2A2A2A] hover:border-[#737373] bg-[#1E1E1E] hover:bg-[#2A2A2A] px-3 py-3 text-left transition-colors group"
              >
                <span className="text-lg">+</span>
                <span className="text-xs font-semibold text-white leading-tight">
                  Start blank
                </span>
                <span className="text-[10px] text-[#737373] leading-snug">
                  Empty canvas
                </span>
              </button>
            </div>

            <p className="text-[10px] text-[#525252] text-center">
              You can always load templates later from the Templates menu.
            </p>
          </div>
        </div>
      )}

      {/* Palette sidebar */}
      <div className="w-44 shrink-0 border-r border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] flex flex-col">
        <div className="px-3 pt-3 pb-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
          <p className="text-[10px] font-semibold text-[#A3A3A3] uppercase tracking-widest">
            Nodes
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {allKinds.map((kind) => (
            <PaletteButton
              key={kind}
              kind={kind}
              onClick={() => addNode(kind)}
            />
          ))}
        </div>

        {/* Step count */}
        <div className="px-3 py-2 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
          {isPro ? (
            <p className="text-[10px] text-[#A3A3A3]">unlimited steps</p>
          ) : (
            <>
              <p className="text-[10px] text-[#A3A3A3]">
                {nodes.filter((n) => isProcessingKind(n.data.kind)).length}/{FREE_MAX_STEPS} steps
              </p>
              {nodes.filter((n) => isProcessingKind(n.data.kind)).length >= FREE_MAX_STEPS && (
                <a
                  href="/dashboard/upgrade"
                  className="text-[10px] text-[#6366F1] hover:underline"
                >
                  Upgrade for more
                </a>
              )}
            </>
          )}
        </div>
      </div>

      {/* Canvas area */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-4 py-2 border-b border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A]">
          <p className="text-[11px] text-[#A3A3A3] flex-1">
            Drag from a node&apos;s green dot to another to connect. Upload images in the Input node, then Run.
          </p>

          {/* AI Rename auth warning */}
          {showAiRenameWarning && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EDE9FE] dark:bg-[#2E1065] border border-[#8B5CF6] dark:border-[#6D28D9]">
              <AlertTriangle
                className="h-3.5 w-3.5 text-[#6D28D9] dark:text-[#A78BFA] shrink-0"
                strokeWidth={2}
              />
              <p className="text-[11px] text-[#6D28D9] dark:text-[#A78BFA] font-medium">
                AI Rename requires login.{" "}
                <a href="/auth/signin" className="underline hover:no-underline">
                  Sign in
                </a>{" "}
                or remove the AI Rename node.
              </p>
              <button
                onClick={() => setShowAiRenameWarning(false)}
                className="text-[#6D28D9] dark:text-[#A78BFA] hover:opacity-70 text-xs font-bold leading-none ml-1"
              >
                x
              </button>
            </div>
          )}

          {/* Upsell banner */}
          {showUpsell && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FEF3C7] dark:bg-[#451A03] border border-[#FCD34D] dark:border-[#92400E]">
              <AlertTriangle
                className="h-3.5 w-3.5 text-[#92400E] dark:text-[#FCD34D] shrink-0"
                strokeWidth={2}
              />
              <p className="text-[11px] text-[#92400E] dark:text-[#FCD34D] font-medium">
                Free plan: 3 steps max.{" "}
                <a
                  href="/dashboard/upgrade"
                  className="underline hover:no-underline"
                >
                  Upgrade to Pro
                </a>{" "}
                for unlimited nodes and connections.
              </p>
              <button
                onClick={() => setShowUpsell(false)}
                className="text-[#92400E] dark:text-[#FCD34D] hover:opacity-70 text-xs font-bold leading-none ml-1"
              >
                x
              </button>
            </div>
          )}

          {/* Templates dropdown */}
          <TemplatesDropdown onSelect={loadTemplate} />

          {/* Run button — pulses with attention ring when dirty */}
          <div className="relative">
            {dirty && !running && (
              <span
                className="absolute inset-0 rounded-lg animate-ping"
                style={{ background: "#6366F1", opacity: 0.35 }}
              />
            )}
            <button
              onClick={() => handleRun()}
              disabled={running}
              className={[
                "relative flex items-center gap-1.5 px-4 py-1.5 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm",
                dirty && !running
                  ? "bg-[#4F46E5] hover:bg-[#4338CA]"
                  : "bg-[#6366F1] hover:bg-[#4F46E5] disabled:opacity-60",
              ].join(" ")}
            >
              {running ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
              ) : (
                <Play className="h-3.5 w-3.5" strokeWidth={2} />
              )}
              {running ? "Running..." : dirty ? "Run to update" : "Run"}
            </button>
          </div>

          <button
            onClick={() => addNode("resize")}
            className="flex items-center gap-1 px-2.5 py-1.5 border border-[#E5E5E5] dark:border-[#2A2A2A] hover:border-[#6366F1] text-[#525252] dark:text-[#A3A3A3] text-xs rounded-lg transition-colors"
            title="Add a node"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>

        {/* ReactFlow */}
        <div className="flex-1 min-h-0">
          <StudioCallbacksContext.Provider value={callbacks}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              isValidConnection={isValidConnection}
              nodeTypes={studioNodeTypes}
              defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
              connectionRadius={45}
              fitView
              fitViewOptions={{ padding: 0.25 }}
              minZoom={0.2}
              panOnScroll
              deleteKeyCode="Delete"
              proOptions={{ hideAttribution: true }}
            >
              <Background
                variant={BackgroundVariant.Dots}
                gap={18}
                size={1}
                color="#D4D4D4"
                className="dark:[--background-dot-color:#2A2A2A]"
              />
              <Controls
                className="!bg-white dark:!bg-[#1E1E1E] !border-[#E5E5E5] dark:!border-[#2A2A2A] !shadow-sm"
                showInteractive={false}
              />
            </ReactFlow>
          </StudioCallbacksContext.Provider>
        </div>
      </div>
    </div>
  );
}
