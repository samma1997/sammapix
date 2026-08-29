import { redirect } from "next/navigation";

// The linear Workflow Builder has been consolidated into Node Studio.
// Keep this route as a permanent redirect so old links still work.
export default function WorkflowBuilderPage() {
  redirect("/dashboard/studio");
}
