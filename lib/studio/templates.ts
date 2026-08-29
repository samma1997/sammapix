"use client";

import type { Edge } from "@xyflow/react";
import { MarkerType } from "@xyflow/react";
import type { NodeKind } from "./nodes";
import type { StudioFlowNode, StudioNodeData } from "@/components/tools/studio/StudioNode";

// ── Template definition ────────────────────────────────────────────────────────

export interface TemplateStep {
  kind: NodeKind;
  config?: Record<string, unknown>;
}

export interface StudioTemplate {
  id: string;
  label: string;
  description: string;
  /** Ordered processing steps. Input and Output are added automatically. */
  steps: TemplateStep[];
}

// ── Template catalogue ─────────────────────────────────────────────────────────

export const STUDIO_TEMPLATES: StudioTemplate[] = [
  {
    id: "web-ready",
    label: "Web Ready",
    description: "Resize, compress and convert to WebP for fast loading.",
    steps: [
      { kind: "resize", config: { maxPx: 1080 } },
      { kind: "compress", config: { quality: 80 } },
      { kind: "webp", config: { quality: 85 } },
    ],
  },
  {
    id: "social-post",
    label: "Social Post",
    description: "4:5 crop, watermark and compress for Instagram.",
    steps: [
      { kind: "crop", config: { ratio: "4:5" } },
      { kind: "watermark", config: { text: "SammaPix", position: "bottom-right", opacity: 60 } },
      { kind: "compress", config: { quality: 82 } },
    ],
  },
  {
    id: "profile-picture",
    label: "Profile Picture",
    description: "Square crop then circle mask, ready for any avatar.",
    steps: [
      { kind: "crop", config: { ratio: "1:1" } },
      { kind: "round", config: { mode: "circle" } },
    ],
  },
  {
    id: "privacy-clean",
    label: "Privacy Clean",
    description: "Strip all EXIF metadata then compress.",
    steps: [
      { kind: "exif-strip", config: {} },
      { kind: "compress", config: { quality: 85 } },
    ],
  },
  {
    id: "print-border",
    label: "Print Border",
    description: "Add a white border and upscale for print quality.",
    steps: [
      { kind: "border", config: { color: "#FFFFFF", width: 30 } },
      { kind: "resize", config: { maxPx: 2048 } },
    ],
  },
];

// ── Edge style (mirrors StudioCanvas constants) ────────────────────────────────

const EDGE_STYLE = { stroke: "#10B981", strokeWidth: 2 };
const DEFAULT_EDGE_OPTIONS = {
  style: EDGE_STYLE,
  markerEnd: { type: MarkerType.ArrowClosed, color: "#10B981" },
};

// ── ID counter (local — avoids collision with StudioCanvas counter) ────────────

let _tplIdCounter = 100;
function nextTplId(): string {
  return `t${++_tplIdCounter}`;
}

// ── Expand template into ReactFlow nodes + edges ───────────────────────────────

/** Horizontal spacing between nodes (px). */
const NODE_GAP_X = 280;
/** Fixed Y position for all nodes in a linear template chain. */
const CHAIN_Y = 200;

export function expandTemplate(template: StudioTemplate): {
  nodes: StudioFlowNode[];
  edges: Edge[];
} {
  // Full chain: input -> ...steps... -> output
  const chain: { kind: NodeKind; config: Record<string, unknown> }[] = [
    { kind: "input", config: {} },
    ...template.steps.map((s) => ({ kind: s.kind, config: s.config ?? {} })),
    { kind: "output", config: {} },
  ];

  const nodeIds: string[] = chain.map(() => nextTplId());

  const nodes: StudioFlowNode[] = chain.map((step, i) => ({
    id: nodeIds[i],
    type: "studioNode" as const,
    position: { x: 40 + i * NODE_GAP_X, y: CHAIN_Y },
    data: {
      kind: step.kind,
      config: { ...step.config },
      status: "idle",
      files: step.kind === "input" ? [] : undefined,
      results: step.kind === "output" ? [] : undefined,
    } satisfies StudioNodeData,
  }));

  const edges: Edge[] = [];
  for (let i = 0; i < nodeIds.length - 1; i++) {
    edges.push({
      id: `te${nodeIds[i]}-${nodeIds[i + 1]}`,
      source: nodeIds[i],
      target: nodeIds[i + 1],
      ...DEFAULT_EDGE_OPTIONS,
    });
  }

  return { nodes, edges };
}
