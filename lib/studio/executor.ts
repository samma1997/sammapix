"use client";

import { runNode, type NodeKind, type StudioImage } from "./nodes";

// ── Graph schema ───────────────────────────────────────────────────────────────

export interface GraphNode {
  id: string;
  kind: NodeKind;
  config: Record<string, unknown>;
}

export interface GraphEdge {
  /** Source node id */
  source: string;
  /** Target node id */
  target: string;
}

export interface StudioGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

// ── Callbacks ─────────────────────────────────────────────────────────────────

export interface RunCallbacks {
  onNodeStart?: (nodeId: string) => void;
  onNodeDone?: (nodeId: string, outputs: StudioImage[]) => void;
  onNodeError?: (nodeId: string, error: Error) => void;
}

// ── Topological sort (Kahn's algorithm) ───────────────────────────────────────

function topoSort(
  nodes: GraphNode[],
  edges: GraphEdge[]
): { order: string[]; hasCycle: boolean } {
  const nodeIds = nodes.map((n) => n.id);
  // in-degree counter
  const inDegree = new Map<string, number>();
  // adjacency list: source -> set of targets
  const adj = new Map<string, Set<string>>();

  for (const id of nodeIds) {
    inDegree.set(id, 0);
    adj.set(id, new Set());
  }

  for (const edge of edges) {
    // Guard: skip edges referencing nodes not in the graph
    if (!inDegree.has(edge.source) || !inDegree.has(edge.target)) continue;
    adj.get(edge.source)!.add(edge.target);
    inDegree.set(edge.target, (inDegree.get(edge.target) ?? 0) + 1);
  }

  // Queue starts with every node that has no predecessors
  const queue: string[] = [];
  for (const [id, deg] of inDegree.entries()) {
    if (deg === 0) queue.push(id);
  }

  const order: string[] = [];
  while (queue.length > 0) {
    const id = queue.shift()!;
    order.push(id);
    for (const neighbour of adj.get(id) ?? []) {
      const newDeg = (inDegree.get(neighbour) ?? 1) - 1;
      inDegree.set(neighbour, newDeg);
      if (newDeg === 0) queue.push(neighbour);
    }
  }

  const hasCycle = order.length !== nodeIds.length;
  return { order, hasCycle };
}

// ── Main executor ─────────────────────────────────────────────────────────────

export async function runGraph(
  graph: StudioGraph,
  uploaded: File[],
  callbacks: RunCallbacks = {}
): Promise<{ outputs: Record<string, StudioImage[]> }> {
  const { onNodeStart, onNodeDone, onNodeError } = callbacks;

  // 1. Topological sort
  const { order, hasCycle } = topoSort(graph.nodes, graph.edges);
  if (hasCycle) {
    throw new Error(
      "Cycle detected in the graph. Remove the circular connection before running."
    );
  }

  // 2. Build lookup maps
  const nodeById = new Map<string, GraphNode>(
    graph.nodes.map((n) => [n.id, n])
  );

  // predecessors: for each nodeId, which node ids feed into it
  const predecessors = new Map<string, string[]>();
  for (const node of graph.nodes) {
    predecessors.set(node.id, []);
  }
  for (const edge of graph.edges) {
    if (predecessors.has(edge.target)) {
      predecessors.get(edge.target)!.push(edge.source);
    }
  }

  // 3. Map uploaded files to StudioImage for use by "input" nodes.
  // originalSize is set here from the File and carried forward unchanged by every node.
  const uploadedImages: StudioImage[] = uploaded.map((f) => ({
    blob: f as Blob,
    name: f.name,
    originalSize: f.size,
  }));

  // 4. Per-node output accumulator
  const nodeOutputs = new Map<string, StudioImage[]>();
  // Track nodes that failed so downstream nodes can be skipped gracefully
  const failedNodes = new Set<string>();

  // 5. Execute in topological order
  for (const nodeId of order) {
    const node = nodeById.get(nodeId);
    if (!node) continue;

    // Gather inputs: concatenation of all predecessor outputs
    let inputs: StudioImage[];

    if (node.kind === "input") {
      // Input nodes always receive the uploaded files
      inputs = uploadedImages;
    } else {
      const preds = predecessors.get(nodeId) ?? [];

      // If every predecessor failed, mark this node failed too and skip
      const anySuccessfulPred = preds.some((pid) => !failedNodes.has(pid));
      if (preds.length > 0 && !anySuccessfulPred) {
        failedNodes.add(nodeId);
        const err = new Error("All predecessor nodes failed; skipping.");
        onNodeError?.(nodeId, err);
        nodeOutputs.set(nodeId, []);
        continue;
      }

      // Concatenate outputs from all successful predecessors
      inputs = preds
        .filter((pid) => !failedNodes.has(pid))
        .flatMap((pid) => nodeOutputs.get(pid) ?? []);
    }

    // Run the node
    onNodeStart?.(nodeId);
    try {
      const result = await runNode(node.kind, node.config, inputs);
      nodeOutputs.set(nodeId, result);
      onNodeDone?.(nodeId, result);
    } catch (rawErr) {
      const err =
        rawErr instanceof Error
          ? rawErr
          : new Error(String(rawErr));
      failedNodes.add(nodeId);
      nodeOutputs.set(nodeId, []);
      onNodeError?.(nodeId, err);
    }
  }

  // 6. Collect all output-kind node results
  const outputNodes = graph.nodes.filter((n) => n.kind === "output");
  const outputs: Record<string, StudioImage[]> = {};
  for (const node of outputNodes) {
    outputs[node.id] = nodeOutputs.get(node.id) ?? [];
  }

  return { outputs };
}
