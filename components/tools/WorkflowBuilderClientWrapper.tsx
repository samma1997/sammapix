"use client";

import dynamic from "next/dynamic";

/**
 * Client wrapper — carica WorkflowBuilderClient senza SSR.
 * `ssr: false` è ammesso solo dentro un Client Component (non nella page server),
 * per questo esiste questo wrapper sottile.
 */
const WorkflowBuilderClient = dynamic(
  () => import("@/components/tools/WorkflowBuilderClient"),
  { ssr: false }
);

export default function WorkflowBuilderClientWrapper() {
  return <WorkflowBuilderClient />;
}
