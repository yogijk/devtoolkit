import { getAgentsGuide } from "@/lib/agents";
import AgentsClient from "./AgentsClient";

export default function AgentsPage() {
  const guide = getAgentsGuide();
  if (!guide) return <div>No content</div>;
  return <AgentsClient guide={guide} />;
}
