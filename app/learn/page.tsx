// Server component — loads data from filesystem, renders client wrapper
import { getLearningPath } from "@/lib/learning";
import LearnClient from "./LearnClient";

export default function LearnPage() {
  const levels = getLearningPath();
  return <LearnClient levels={levels} />;
}
